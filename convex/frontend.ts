// Auto-generated from public/index.html. Run: npm run gen:frontend
export const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Chess Club ELO</title>
<style>
  :root { --bg:#0f172a; --card:#1e293b; --accent:#38bdf8; --muted:#94a3b8; --good:#22c55e; --bad:#ef4444; --warn:#f59e0b; }
  * { box-sizing:border-box; }
  body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:var(--bg); color:#e2e8f0; }
  header { padding:18px 20px; display:flex; align-items:center; gap:16px; border-bottom:1px solid #334155; }
  header h1 { margin:0; font-size:20px; }
  .tabs { display:flex; flex-wrap:wrap; gap:8px; margin-left:auto; max-width:100%; }
  .tab { padding:8px 18px; border-radius:8px; cursor:pointer; background:#334155; border:none; color:#e2e8f0; font-weight:600; }
  .tab.active { background:var(--accent); color:#0f172a; }
  .badge { font-size:11px; padding:2px 8px; border-radius:999px; background:#334155; color:var(--muted); margin-left:6px; vertical-align:middle; }
  main { max-width:1100px; margin:0 auto; padding:20px; display:grid; gap:16px; }
  .grid { display:grid; grid-template-columns: 1fr 1fr; gap:16px; }
  @media (max-width:760px){ .grid{grid-template-columns:1fr;} }
  .card { background:var(--card); border-radius:12px; padding:16px; }
  .card h2 { margin:0 0 12px; font-size:16px; }
  .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .stat { background:#0f172a; border-radius:8px; padding:10px; }
  .stat .label { font-size:11px; color:var(--muted); text-transform:uppercase; }
  .stat .val { font-size:18px; font-weight:700; margin-top:4px; }
  form.row { display:flex; gap:8px; flex-wrap:wrap; }
  input, button { padding:9px 12px; border-radius:8px; border:1px solid #334155; background:#0f172a; color:#e2e8f0; font-size:14px; }
  button.primary { background:var(--accent); color:#0f172a; border:none; font-weight:700; cursor:pointer; }
  button.danger { background:var(--bad); color:#fff; border:none; cursor:pointer; }
  button.ghost { background:transparent; border:1px solid #334155; cursor:pointer; }
  button:hover { opacity:0.9; }
  .msg { margin-top:8px; font-size:13px; min-height:18px; }
  .msg.ok { color:var(--good); }
  .msg.err { color:var(--bad); }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { padding:8px 6px; text-align:left; border-bottom:1px solid #334155; }
  th { color:var(--muted); font-weight:600; font-size:11px; text-transform:uppercase; }
  .rank { font-weight:700; color:var(--accent); }
  .delta.pos { color:var(--good); }
  .delta.neg { color:var(--bad); }
  .admin-section { display:none; }
  .admin-section.open { display:block; }
  .admin-bar { display:flex; gap:8px; align-items:center; flex-wrap:wrap; margin-bottom:10px; }
  .admin-bar .logged { color:var(--good); font-size:13px; }
  .scroll { max-height:320px; overflow:auto; }
  .hint { font-size:12px; color:var(--muted); }
  .players-list { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
  .welcome-name { font-weight:800; font-size:20px; background: linear-gradient(90deg,#ff595e,#ffca3a,#8ac926,#1982c4,#6a4c93,#ff595e); background-size:300% 300%; -webkit-background-clip:text; background-clip:text; color:transparent; animation: rainbowText 3s linear infinite; }
  .star { display:inline-block; margin:0 2px; animation: twinkle 1.4s ease-in-out infinite alternate; }
  @keyframes rainbowText { 0% { background-position:0% 50%; } 100% { background-position:300% 50%; } }
  @keyframes twinkle { 0% { transform: scale(1) rotate(0deg); opacity:0.65; } 100% { transform: scale(1.5) rotate(20deg); opacity:1; } }
  .star.rainbow { background: linear-gradient(90deg,#ff595e,#ffca3a,#8ac926,#1982c4,#6a4c93); -webkit-background-clip:text; background-clip:text; color:transparent; animation: rainbowText 2s linear infinite, twinkle 1.4s ease-in-out infinite alternate; }
  .chip { background:#0f172a; border:1px solid #334155; padding:4px 8px; border-radius:999px; font-size:12px; cursor:pointer; }
  .chip:hover { border-color:var(--accent); }
</style>
</head>
<body>
<header>
  <h1>♟ Chess Club ELO</h1>
  <div class="tabs" id="tabsBar">
    <button class="ghost" onclick="refreshAll()">Refresh</button>
  </div>
</header>
<main>
  <div class="card" id="motdCard" style="display:none;">
    <h2>Message of the Day</h2>
    <div id="motdText" style="white-space:pre-wrap;"></div>
  </div>
  <div class="card" id="latestMemberCard">
    <h2>Latest Member</h2>
    <div id="latestMemberText">No members yet.</div>
  </div>
  <div class="grid">
    <div class="card">
      <h2>Submit Result <span class="hint">(anyone)</span></h2>
      <form class="row" onsubmit="submitResult(event)">
        <input id="resultInput" placeholder="usera-userb 0.5-0.5" style="flex:1;min-width:200px" autocomplete="off">
        <button class="primary" type="submit">Submit</button>
      </form>
      <div class="msg" id="resultMsg"></div>
      <div class="hint" style="margin-top:6px">Format: <code>white-black 1-0</code>, <code>... 0-1</code> or <code>... 0.5-0.5</code>. Names must exist (admin creates them).</div>
      <div class="players-list" id="playersChips"></div>
      <div style="margin-top:12px;border-top:1px solid #334155;padding-top:12px;">
        <h3 style="font-size:14px;margin:0 0 8px">Or use dropdowns</h3>
        <form class="row" onsubmit="submitDropdownResult(event)">
          <select id="ddWhite" style="flex:1;min-width:140px" onchange="ensureDifferentDropdowns()"></select>
          <select id="ddBlack" style="flex:1;min-width:140px" onchange="ensureDifferentDropdowns()"></select>
          <select id="ddResult" style="flex:1;min-width:120px">
            <option value="1-0">White 1-0</option>
            <option value="0.5-0.5">Draw 0.5-0.5</option>
            <option value="0-1">Black 0-1</option>
          </select>
          <button class="primary" type="submit">Submit</button>
        </form>
        <div class="msg" id="dropdownMsg"></div>
      </div>
    </div>
    <div class="card">
      <h2>Highlights</h2>
      <div class="stats">
        <div class="stat"><div class="label">Fastest improver</div><div class="val" id="improverVal">—</div></div>
        <div class="stat"><div class="label">Worst performer</div><div class="val" id="worstVal">—</div></div>
        <div class="stat"><div class="label">Most active</div><div class="val" id="activeVal">—</div></div>
      </div>
      <div class="stats" style="margin-top:10px">
        <div class="stat"><div class="label">Hot streak</div><div class="val" id="hotVal">—</div></div>
        <div class="stat"><div class="label">Players</div><div class="val" id="playersCount">0</div></div>
        <div class="stat"><div class="label">Matches</div><div class="val" id="matchesCount">0</div></div>
      </div>
    </div>
  </div>

  <div class="card">
    <h2>Top 20</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>#</th><th>Name</th><th>Rating</th><th>Δ</th><th>G</th><th>W/D/L</th></tr></thead>
        <tbody id="leaderboard"></tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <h2>Recent Matches</h2>
    <div class="scroll">
      <table>
        <thead><tr><th>Date</th><th>White</th><th>Black</th><th>Score</th><th>Ratings</th></tr></thead>
        <tbody id="matches"></tbody>
      </table>
    </div>
  </div>

  <div class="card">
    <h2>Admin <span class="hint">(password protected)</span></h2>
    <div id="adminLogin" class="admin-bar">
      <input id="adminPass" type="password" placeholder="admin password">
      <button class="primary" onclick="adminLogin()">Login</button>
      <span class="hint">default password: chessadmin (set ADMIN_PASSWORD env to change)</span>
    </div>
    <div id="adminPanel" class="admin-section">
      <div class="admin-bar">
        <span class="logged">✓ logged in</span>
        <button class="ghost" onclick="adminLogout()">Logout</button>
        <button class="danger" onclick="resetGroup()">Reset current tab</button>
      </div>
      <form class="row" onsubmit="createUser(event)">
        <input id="newUserName" placeholder="new player name" style="flex:1;min-width:200px">
        <button class="primary" type="submit">Create user (1800 ELO)</button>
      </form>
      <div style="margin-top:12px;border-top:1px solid #334155;padding-top:12px">
        <h3 style="font-size:14px;margin:0 0 8px">Message of the Day</h3>
        <form class="row" onsubmit="setMotd(event)">
          <input id="motdInput" placeholder="announcement (leave empty to clear)" style="flex:1;min-width:200px">
          <button class="primary" type="submit">Set MOTD</button>
        </form>
        <div class="msg" id="motdMsg"></div>
      </div>
      <div style="margin-top:12px;border-top:1px solid #334155;padding-top:12px">
        <h3 style="font-size:14px;margin:0 0 8px">Rename Tabs</h3>
        <div id="tabRenameList"></div>
      </div>
      <div class="msg" id="adminMsg"></div>
      <div style="margin-top:12px;border-top:1px solid #334155;padding-top:12px">
        <h3 style="font-size:14px;margin:0 0 8px">Change admin password</h3>
        <form class="row" onsubmit="changePassword(event)">
          <input id="newPassword" type="password" placeholder="new password (min 4)" style="flex:1;min-width:200px">
          <button class="primary" type="submit">Change password</button>
        </form>
        <div class="msg" id="pwMsg"></div>
      </div>
      <div style="margin-top:12px">
        <h3 style="font-size:14px;margin:0 0 8px">Players in this tab</h3>
        <div class="scroll">
          <table>
            <thead><tr><th>Name</th><th>Rating</th><th>G</th><th>Action</th></tr></thead>
            <tbody id="adminPlayers"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</main>

<script>
function getApiBase() {
  const params = new URLSearchParams(location.search);
  const fromQuery = params.get('backend') || params.get('api');
  if (fromQuery) {
    localStorage.setItem('convexSiteUrl', fromQuery.trim());
    return fromQuery.trim().replace(/\\/+$/, '');
  }
  let base = localStorage.getItem('convexSiteUrl');
  if (!base) {
    if (/\\.convex\\.site$/.test(location.hostname)) base = '';
    else base = 'https://jovial-clam-679.convex.site';
  }
  if (base === '') return '';
  return String(base).trim().replace(/\\/+$/, '');
}
const API = getApiBase();
let currentTab = '1';
let adminToken = localStorage.getItem('adminToken') || '';

function $(id){return document.getElementById(id);}

let tabNamesCache = {};
function switchTab(t){
  currentTab = String(t);
  renderTabs();
  refreshAll();
}
async function loadTabNames(){
  try {
    tabNamesCache = await api('/api/tab-names');
  } catch(e){ tabNamesCache = {}; }
  renderTabs();
  renderTabRename();
}
function renderTabs(){
  const bar = $('tabsBar');
  if(!bar) return;
  let html = '';
  for (let i=1; i<=10; i++) {
    const g = String(i);
    const name = (tabNamesCache && tabNamesCache[g]) ? tabNamesCache[g] : ('Tab ' + g);
    const active = currentTab === g;
    html += \`<button class="tab \${active?'active':''}" data-tab="\${g}" onclick="switchTab('\${g}')">\${escapeHtml(name)}</button>\`;
  }
  html += '<button class="ghost" onclick="refreshAll()">Refresh</button>';
  bar.innerHTML = html;
}
function renderTabRename(){
  const el = $('tabRenameList');
  if(!el || !adminToken) return;
  let html = '';
  for (let i=1; i<=10; i++) {
    const g = String(i);
    const cur = (tabNamesCache && tabNamesCache[g]) ? tabNamesCache[g] : ('Tab ' + g);
    html += \`<div class="row" style="margin-bottom:6px;">
      <span style="min-width:56px">\${g}: \${escapeHtml(cur)}</span>
      <input id="tabNameInput_\${g}" value="\${escapeHtml(cur)}" style="flex:1;min-width:160px">
      <button class="primary" type="button" onclick="renameTab('\${g}')">Save</button>
    </div>\`;
  }
  el.innerHTML = html;
}
async function renameTab(g){
  const input = $('tabNameInput_'+g);
  if(!input) return;
  try {
    await api('/api/admin/tab-name', { method:'POST', body: JSON.stringify({ group: g, name: input.value }) });
    await loadTabNames();
    await refreshAll();
  } catch(err){ alert(err.message); }
}

function authHeaders(){
  return adminToken ? { 'Authorization': 'Bearer ' + adminToken } : {};
}

async function api(path, opts={}){
  opts.headers = Object.assign({'Content-Type':'application/json'}, opts.headers||{}, authHeaders());
  const r = await fetch(API+path, opts);
  const j = await r.json().catch(()=> ({}));
  if(!r.ok) throw new Error(j.error || ('HTTP '+r.status));
  return j;
}

async function loadMotd(){
  try {
    const d = await api('/api/motd');
    const card=$('motdCard'); const text=$('motdText');
    if(d.motd){ card.style.display='block'; text.textContent=d.motd; }
    else card.style.display='none';
  } catch(e){}
}
async function loadLatestRegistered(){
  try {
    const d = await api('/api/latest-registered');
    const text=$('latestMemberText');
    if(d.name){
      const starChars = ['★','✦','✧','✶','✴'];
      const colors = ['#ff595e','#ffca3a','#8ac926','#1982c4','#6a4c93'];
      const leftStars = [0,1,2].map(i=>\`<span class="star rainbow" style="animation-delay:\${i*0.2}s">\${starChars[i]}</span>\`).join('');
      const rightStars = [0,1,2].map(i=>\`<span class="star rainbow" style="animation-delay:\${(i+1)*0.15}s">\${starChars[(i+2)%starChars.length]}</span>\`).join('');
      text.innerHTML = \`\${leftStars} <span class="welcome-name">\${escapeHtml(d.name)}</span> \${rightStars}\`;
      const card=$('latestMemberCard');
      // keep a small subtitle
      let sub = card.querySelector('.latest-sub');
      if(!sub){ sub = document.createElement('div'); sub.className='latest-sub hint'; sub.style.marginTop='4px'; card.appendChild(sub); }
      sub.textContent = 'Latest registered member — welcome to the club!';
    } else {
      text.textContent = 'No members yet.';
      const sub = $('latestMemberCard').querySelector('.latest-sub');
      if(sub) sub.remove();
    }
  } catch(e){}
}
async function setMotd(e){
  e.preventDefault();
  const msg=$('motdMsg');
  msg.className='msg'; msg.textContent='';
  try {
    await api('/api/admin/motd', { method:'POST', body: JSON.stringify({ motd: $('motdInput').value }) });
    msg.className='msg ok'; msg.textContent = 'MOTD updated.';
    $('motdInput').value='';
    loadMotd();
  } catch(err){ msg.className='msg err'; msg.textContent = err.message; }
}
async function refreshAll(){
  await Promise.all([loadPlayers(), loadStats(), loadMatches(), loadMotd(), loadLatestRegistered(), loadTabNames()]);
  renderAdminPlayers();
  renderTabRename();
}

let playersCache = [];
async function loadPlayers(){
  playersCache = await api('/api/groups/'+currentTab+'/players');
  renderChips();
}

function renderChips(){
  const el = $('playersChips');
  if(!playersCache.length){ el.innerHTML = '<span class="hint">No players yet (admin creates them).</span>'; return; }
  el.innerHTML = playersCache.map(p=>\`<span class="chip" title="\${p.rating}" onclick="insertName('\${p.name}')">\${p.name}</span>\`).join('');
  populateDropdowns();
}
function populateDropdowns(){
  const w=$('ddWhite'), b=$('ddBlack');
  if(!w || !b) return;
  if(!playersCache.length){
    w.innerHTML = '<option value="">No players</option>';
    b.innerHTML = '<option value="">No players</option>';
    return;
  }
  const opts = playersCache.map(p=>\`<option value="\${escapeHtml(p.name)}">\${escapeHtml(p.name)}</option>\`).join('');
  const prevW = w.value, prevB = b.value;
  w.innerHTML = opts; b.innerHTML = opts;
  if (prevW && playersCache.some(p=>p.name===prevW)) w.value = prevW;
  else w.value = playersCache[0].name;
  if (prevB && playersCache.some(p=>p.name===prevB)) b.value = prevB;
  else b.value = playersCache.length>1 ? playersCache[1].name : playersCache[0].name;
  ensureDifferentDropdowns();
}
function ensureDifferentDropdowns(){
  const w=$('ddWhite'), b=$('ddBlack');
  if(!w||!b) return;
  if (w.value && w.value === b.value) {
    const diff = playersCache.map(p=>p.name).find(n=>n !== w.value);
    if (diff) b.value = diff;
  }
}
async function submitDropdownResult(e){
  e.preventDefault();
  const msg=$('dropdownMsg');
  msg.className='msg'; msg.textContent='';
  const w=$('ddWhite').value;
  const b=$('ddBlack').value;
  const res=$('ddResult').value;
  if (!w || !b) { msg.className='msg err'; msg.textContent='Select both players'; return; }
  if (w === b) { msg.className='msg err'; msg.textContent='Players must be different'; return; }
  try {
    const r = await api('/api/groups/'+currentTab+'/matches', { method:'POST', body: JSON.stringify({ result: \`\${w}-\${b} \${res}\` }) });
    msg.className='msg ok';
    msg.textContent = \`Recorded: \${r.match.nameA} \${r.match.scoreA}-\${r.match.scoreB} \${r.match.nameB}\`;
    await refreshAll();
  } catch(err){ msg.className='msg err'; msg.textContent = err.message; }
}
function insertName(n){
  const inp=$('resultInput');
  const v=inp.value.trim();
  if(!v){ inp.value = n+'-'; inp.focus(); }
  else if(v.indexOf(' ')>-1){ /* already has space */ }
  else if(v.endsWith('-')){ inp.value = v+n+' '; }
  else if(!v.includes(' ')){ inp.value = v+'-'+n+' '; }
  inp.focus();
}

async function loadStats(){
  const s = await api('/api/groups/'+currentTab+'/stats');
  const lb = $('leaderboard');
  lb.innerHTML = s.top20.map(p=>\`<tr>
    <td class="rank">\${p.rank}</td>
    <td>\${escapeHtml(p.name)}</td>
    <td><b>\${p.rating}</b></td>
    <td class="delta \${p.delta>=0?'pos':'neg'}">\${p.delta>=0?'+':''}\${p.delta}</td>
    <td>\${p.games}</td>
    <td>\${p.wins}/\${p.draws}/\${p.losses}</td>
  </tr>\`).join('') || '<tr><td colspan="6" class="hint">No players yet.</td></tr>';
  const fmt = (o)=> o ? \`\${escapeHtml(o.name)} (\${o.delta!=null? (o.delta>=0?'+':'')+o.delta : o.games+'g'})\` : '—';
  $('improverVal').innerHTML = s.improver ? \`\${escapeHtml(s.improver.name)} <small style="color:var(--good)">+\${s.improver.delta}</small>\` : '—';
  $('worstVal').innerHTML = s.worst ? \`\${escapeHtml(s.worst.name)} <small style="color:var(--bad)">\${s.worst.delta}</small>\` : '—';
  $('activeVal').innerHTML = s.mostActive ? \`\${escapeHtml(s.mostActive.name)} <small>(\${s.mostActive.games})</small>\` : '—';
  $('hotVal').innerHTML = (s.hotStreak && s.hotStreak.streak>0) ? \`\${escapeHtml(s.hotStreak.name)} <small>x\${s.hotStreak.streak}</small>\` : '—';
  $('playersCount').textContent = s.totalPlayers;
  $('matchesCount').textContent = s.totalMatches;
}

async function loadMatches(){
  const ms = await api('/api/groups/'+currentTab+'/matches?limit=30');
  const el = $('matches');
  el.innerHTML = ms.map(m=>{
    const d = new Date(m.date).toLocaleString();
    return \`<tr>
      <td>\${d}</td>
      <td>\${escapeHtml(m.nameA)}</td>
      <td>\${escapeHtml(m.nameB)}</td>
      <td>\${m.scoreA}-\${m.scoreB}</td>
      <td>\${m.oldA}→\${m.newA} / \${m.oldB}→\${m.newB}</td>
    </tr>\`;
  }).join('') || '<tr><td colspan="5" class="hint">No matches yet.</td></tr>';
}

function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

async function submitResult(e){
  e.preventDefault();
  const msg=$('resultMsg');
  msg.className='msg'; msg.textContent='';
  try {
    const r = await api('/api/groups/'+currentTab+'/matches', { method:'POST', body: JSON.stringify({ result: $('resultInput').value }) });
    msg.className='msg ok';
    msg.textContent = \`Recorded: \${r.match.nameA} \${r.match.scoreA}-\${r.match.scoreB} \${r.match.nameB} | \${r.match.nameA} \${r.match.deltaA>=0?'+':''}\${r.match.deltaA}, \${r.match.nameB} \${r.match.deltaB>=0?'+':''}\${r.match.deltaB}\`;
    $('resultInput').value='';
    await refreshAll();
  } catch(err){ msg.className='msg err'; msg.textContent = err.message; }
}

async function adminLogin(){
  const msg=$('adminMsg');
  try {
    const r = await api('/api/admin/login', { method:'POST', body: JSON.stringify({ password: $('adminPass').value }) });
    adminToken = r.token;
    localStorage.setItem('adminToken', adminToken);
    $('adminLogin').style.display='none';
    $('adminPanel').classList.add('open');
    await refreshAll();
  } catch(err){ /* show inline */ alert(err.message); }
}
function adminLogout(){
  adminToken=''; localStorage.removeItem('adminToken');
  $('adminLogin').style.display='flex';
  $('adminPanel').classList.remove('open');
}
async function createUser(e){
  e.preventDefault();
  const msg=$('adminMsg');
  msg.className='msg'; msg.textContent='';
  try {
    const p = await api('/api/groups/'+currentTab+'/players', { method:'POST', body: JSON.stringify({ name: $('newUserName').value }) });
    msg.className='msg ok'; msg.textContent = \`Created \${p.name} (\${p.rating} ELO)\`;
    $('newUserName').value='';
    await refreshAll();
  } catch(err){ msg.className='msg err'; msg.textContent = err.message; }
}
async function deleteUser(id, name){
  if(!confirm('Delete '+name+'?')) return;
  try { await api('/api/groups/'+currentTab+'/players/'+id, { method:'DELETE' }); await refreshAll(); }
  catch(err){ alert(err.message); }
}
async function changePassword(e){
  e.preventDefault();
  const msg=$('pwMsg');
  msg.className='msg'; msg.textContent='';
  try {
    await api('/api/admin/change-password', { method:'POST', body: JSON.stringify({ newPassword: $('newPassword').value }) });
    msg.className='msg ok'; msg.textContent = 'Password changed. Use the new password next login.';
    $('newPassword').value='';
  } catch(err){ msg.className='msg err'; msg.textContent = err.message; }
}
async function resetGroup(){
  if(!confirm('Reset ALL players and matches in tab '+currentTab+'?')) return;
  try { await api('/api/groups/'+currentTab+'/reset', { method:'POST' }); await refreshAll(); }
  catch(err){ alert(err.message); }
}
async function renderAdminPlayers(){
  if(!adminToken) return;
  try {
    const ps = await api('/api/groups/'+currentTab+'/players');
    $('adminPlayers').innerHTML = ps.map(p=>\`<tr>
      <td>\${escapeHtml(p.name)}</td>
      <td>\${p.rating}</td>
      <td>\${p.games}</td>
      <td><button class="danger" style="padding:4px 8px;font-size:12px" onclick="deleteUser('\${p.id}','\${escapeHtml(p.name)}')">Delete</button></td>
    </tr>\`).join('') || '<tr><td colspan="4" class="hint">none</td></tr>';
  } catch(e){ /* maybe token invalid */ }
}

// init
if(adminToken){ $('adminLogin').style.display='none'; $('adminPanel').classList.add('open'); }
refreshAll();
</script>
</body>
</html>
`;
