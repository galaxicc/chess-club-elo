const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const DATA_FILE = process.env.DATA_FILE || path.join(__dirname, 'data.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'chessadmin';
const K = 32;

function emptyGroup() { return { players: {}, matches: [] }; }
function loadData() {
  const makeDefault = () => {
    const _g = {};
    for (let i = 1; i <= 10; i++) _g[String(i)] = emptyGroup();
    return { groups: _g, adminPassword: null, motd: null, latestRegistered: null, tabNames: {} };
  };
  try {
    if (!fs.existsSync(DATA_FILE)) return makeDefault();
    const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    if (!raw || typeof raw !== 'object') throw new Error('bad data');
    if (!raw.groups || typeof raw.groups !== 'object') raw.groups = {};
    for (let i = 1; i <= 10; i++) {
      if (!raw.groups[String(i)]) raw.groups[String(i)] = emptyGroup();
      if (!raw.groups[String(i)].players) raw.groups[String(i)].players = {};
      if (!Array.isArray(raw.groups[String(i)].matches)) raw.groups[String(i)].matches = [];
    }
    if (typeof raw.adminPassword !== 'string') raw.adminPassword = null;
    if (typeof raw.motd !== 'string' && raw.motd !== null) raw.motd = null;
    if (typeof raw.latestRegistered !== 'string' && raw.latestRegistered !== null) raw.latestRegistered = null;
    if (!raw.tabNames || typeof raw.tabNames !== 'object') raw.tabNames = {};
    return raw;
  } catch (e) {
    console.error('load error', e.message);
    return makeDefault();
  }
}

function getConfigPassword() {
  if (data.adminPassword) return data.adminPassword;
  return process.env.ADMIN_PASSWORD || 'chessadmin';
}

let data = loadData();
const sessions = new Set();

function saveData() {
  const tmp = DATA_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2));
  fs.renameSync(tmp, DATA_FILE);
}

function grp(g) { return data.groups[g]; }
function findPlayerByName(g, name) {
  const group = grp(g);
  if (!group) return null;
  const lower = String(name).trim().toLowerCase();
  return Object.values(group.players).find(p => p.name.toLowerCase() === lower) || null;
}

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body || {};
  if (password === getConfigPassword()) {
    const token = crypto.randomBytes(24).toString('hex');
    sessions.add(token);
    return res.json({ token });
  }
  res.status(401).json({ error: 'bad password' });
});


app.post('/api/admin/change-password', auth, (req, res) => {
  const np = req.body && req.body.newPassword;
  if (!np || String(np).length < 4) return res.status(400).json({ error: 'password must be at least 4 characters' });
  data.adminPassword = String(np);
  saveData();
  res.json({ ok: true });
});

function auth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.replace(/^Bearer\s+/i, '').trim();
  if (sessions.has(token)) return next();
  res.status(401).json({ error: 'unauthorized' });
}

app.get('/api/groups/:g/players', (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  const players = Object.values(data.groups[g].players).map(p => {
    const { history, ...rest } = p;
    return rest;
  });
  res.json(players);
});

app.post('/api/groups/:g/players', auth, (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  const name = (req.body && req.body.name) ? String(req.body.name).trim() : '';
  if (!name) return res.status(400).json({ error: 'name required' });
  if (findPlayerByName(g, name)) return res.status(409).json({ error: 'player exists' });
  const startingRating = name.toLowerCase() === 'number1' ? 2300 : 1800;
  const id = crypto.randomUUID();
  data.groups[g].players[id] = {
    id, name, rating: startingRating, initial: startingRating, games: 0, wins: 0, draws: 0, losses: 0, history: []
  };
  data.latestRegistered = name;
  saveData();
  res.json(data.groups[g].players[id]);
});

app.delete('/api/groups/:g/players/:id', auth, (req, res) => {
  const g = req.params.g;
  const id = req.params.id;
  if (!data.groups[g] || !data.groups[g].players[id]) return res.status(404).json({ error: 'not found' });
  delete data.groups[g].players[id];
  saveData();
  res.json({ ok: true });
});

app.post('/api/groups/:g/reset', auth, (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  data.groups[g] = emptyGroup();
  saveData();
  res.json({ ok: true });
});

function parseResult(str) {
  const m = String(str || '').trim().match(/^(.+?)-(.+?)\s+(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
  if (!m) return null;
  return { a: m[1].trim(), b: m[2].trim(), sa: parseFloat(m[3]), sb: parseFloat(m[4]) };
}

app.post('/api/groups/:g/matches', (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  const parsed = parseResult(req.body && req.body.result);
  if (!parsed) return res.status(400).json({ error: 'format: usera-userb 0.5-0.5' });
  if (Math.abs((parsed.sa + parsed.sb) - 1) > 1e-9) return res.status(400).json({ error: 'scores must sum to 1' });
  if (parsed.sa < 0 || parsed.sb < 0 || parsed.sa > 1 || parsed.sb > 1) return res.status(400).json({ error: 'scores must be 0, 0.5 or 1' });

  const pa = findPlayerByName(g, parsed.a);
  const pb = findPlayerByName(g, parsed.b);
  if (!pa) return res.status(404).json({ error: 'player A not found: ' + parsed.a });
  if (!pb) return res.status(404).json({ error: 'player B not found: ' + parsed.b });
  if (pa.id === pb.id) return res.status(400).json({ error: 'same player' });

  const ra = pa.rating, rb = pb.rating;
  const ea = 1 / (1 + Math.pow(10, (rb - ra) / 400));
  const eb = 1 / (1 + Math.pow(10, (ra - rb) / 400));
  const da = K * (parsed.sa - ea);
  const db = K * (parsed.sb - eb);

  const oldA = ra, oldB = rb;
  pa.rating = Math.round(ra + da);
  pb.rating = Math.round(rb + db);
  pa.games++; pb.games++;
  if (parsed.sa > parsed.sb) { pa.wins++; pb.losses++; }
  else if (parsed.sa < parsed.sb) { pb.wins++; pa.losses++; }
  else { pa.draws++; pb.draws++; }

  const match = {
    id: crypto.randomUUID(), group: g,
    a: pa.id, b: pb.id, nameA: pa.name, nameB: pb.name,
    scoreA: parsed.sa, scoreB: parsed.sb,
    oldA, oldB, newA: pa.rating, newB: pb.rating,
    deltaA: pa.rating - oldA, deltaB: pb.rating - oldB,
    date: new Date().toISOString()
  };
  pa.history.push({ matchId: match.id, opp: pb.name, score: parsed.sa, newRating: pa.rating, date: match.date });
  pb.history.push({ matchId: match.id, opp: pa.name, score: parsed.sb, newRating: pb.rating, date: match.date });
  data.groups[g].matches.unshift(match);
  if (data.groups[g].matches.length > 500) data.groups[g].matches.length = 500;
  saveData();
  res.json({ match, playerA: pa, playerB: pb });
});

app.get('/api/groups/:g/matches', (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  const limit = Math.min(parseInt(req.query.limit || '50', 10) || 50, 500);
  res.json(data.groups[g].matches.slice(0, limit));
});

app.get('/api/groups/:g/stats', (req, res) => {
  const g = req.params.g;
  if (!data.groups[g]) return res.status(404).json({ error: 'no group' });
  const players = Object.values(data.groups[g].players);
  const sorted = [...players].sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
  const top20 = sorted.slice(0, 20).map((p, i) => ({
    rank: i + 1, id: p.id, name: p.name, rating: p.rating, games: p.games,
    wins: p.wins, draws: p.draws, losses: p.losses,
    delta: p.rating - p.initial
  }));

  let improver = null, worst = null, mostActive = null;
  for (const p of players) {
    const delta = p.rating - p.initial;
    if (!improver || delta > improver.delta) improver = { name: p.name, delta, rating: p.rating };
    if (!worst || delta < worst.delta) worst = { name: p.name, delta, rating: p.rating };
    if (!mostActive || p.games > mostActive.games) mostActive = { name: p.name, games: p.games };
  }
  let hotStreak = null;
  for (const p of players) {
    const pm = data.groups[g].matches.filter(m => m.a === p.id || m.b === p.id);
    let streak = 0;
    for (const m of pm) {
      const isA = m.a === p.id;
      const score = isA ? m.scoreA : m.scoreB;
      if (score === 1) streak++;
      else break;
    }
    if (!hotStreak || streak > hotStreak.streak) hotStreak = { name: p.name, streak };
  }

  res.json({
    top20, improver, worst, mostActive, hotStreak,
    totalPlayers: players.length, totalMatches: data.groups[g].matches.length
  });
});


app.get('/api/motd', (req, res) => res.json({ motd: data.motd || null }));
app.get('/api/latest-registered', (req, res) => res.json({ name: data.latestRegistered || null }));

app.post('/api/admin/motd', auth, (req, res) => {
  data.motd = (req.body && req.body.motd) ? String(req.body.motd) : null;
  if (data.motd === '') data.motd = null;
  saveData();
  res.json({ ok: true });
});


app.get('/api/tab-names', (req, res) => {
  const out = {};
  for (let i = 1; i <= 10; i++) {
    const g = String(i);
    out[g] = (data.tabNames && data.tabNames[g]) ? data.tabNames[g] : ('Tab ' + g);
  }
  res.json(out);
});
app.post('/api/admin/tab-name', auth, (req, res) => {
  const g = String(req.body && req.body.group);
  const name = req.body && req.body.name ? String(req.body.name).trim() : '';
  if (!['1','2','3','4','5','6','7','8','9','10'].includes(g)) return res.status(400).json({ error: 'bad group' });
  if (!name) return res.status(400).json({ error: 'name required' });
  if (!data.tabNames) data.tabNames = {};
  data.tabNames[g] = name;
  saveData();
  res.json({ ok: true });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Chess club ELO listening on http://localhost:' + PORT));
