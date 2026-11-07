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
  body { margin:0; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; background:var(--bg); color:#e2e8f0; transition: background .2s ease, color .2s ease; }
  body.light { --bg:#f8fafc; --card:#ffffff; --accent:#2563eb; --muted:#475569; --good:#16a34a; --bad:#dc2626; --warn:#d97706; color:#1e293b; }
  button, .chip, .tab { transition: transform .12s ease, background .2s ease, opacity .2s; }
  button:hover { transform: translateY(-1px); }
  .card { transition: transform .2s ease, box-shadow .2s ease, background .2s ease; border: 1px solid rgba(148,163,184,0.08); }
  .card:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,0.22); }
  header { background: linear-gradient(90deg, rgba(56,189,248,0.08), transparent); }
  body.light .card { border-color: rgba(15,23,42,0.08); }
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
  .board-wrap { display:flex; align-items:stretch; max-width:min(540px, 100%); margin:12px auto 4px; }
  .rank-labels { display:grid; grid-template-rows:repeat(8,1fr); width:20px; font-size:11px; color:var(--muted); text-align:center; margin-right:4px; flex-shrink:0; }
  .chess-board { display:grid; grid-template-columns: repeat(8, 1fr); gap:0; width:100%; max-width:min(500px, calc(100vw - 40px)); border:2px solid #334155; user-select:none; }
  .file-labels { display:grid; grid-template-columns:repeat(8,1fr); max-width:min(500px, calc(100vw - 40px)); margin:0 auto 0 24px; font-size:11px; color:var(--muted); text-align:center; }
  .square { aspect-ratio:1; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:clamp(24px, 7vw, 48px); }
  .confetti-dot { position:fixed; width:8px; height:8px; border-radius:50%; z-index:10000; pointer-events:none; animation: confettiFly 1s ease-out forwards; }
  @keyframes confettiFly { 0% { transform: translate(0,0) scale(1); opacity:1; } 100% { transform: translate(var(--dx), var(--dy)) scale(0.4); opacity:0; } }
  @media (max-width: 480px) {
    main { padding: 12px; }
    header { padding: 12px; flex-wrap: wrap; }
    header h1 { font-size: 16px; }
    .row { flex-direction: column; }
    .row > input, .row > select, .row > button { width: 100%; }
    .board-wrap { margin: 8px auto 2px; }
    .chess-board { max-width: calc(100vw - 32px); }
    .file-labels { max-width: calc(100vw - 32px); margin-left: 24px; }
  }
  .square.light { background:#f0d9b5; }
  .square.dark { background:#b58863; }
  .square.selected { outline:3px solid #facc15; }
  .square.last-move { background:#cdd26a; }
  .square.legal::after { content:''; width:12px; height:12px; border-radius:50%; background:rgba(0,0,0,0.25); }
  .square.legal-capture { box-shadow: inset 0 0 0 4px rgba(239,68,68,0.5); }
  .piece { width:82%; height:82%; pointer-events:none; }
  .flying-piece { position:absolute; z-index:20; pointer-events:none; transition: transform .18s ease-out, opacity .18s ease-out; }
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
  <button class="ghost" id="themeToggle" onclick="toggleTheme()" style="margin-left:8px;">Theme</button>
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
  <div class="card" id="profileCard" style="display:none;">
    <h2 id="profileName">Player Profile</h2>
    <div id="profileSummary" class="hint"></div>
    <div id="profileChart" style="margin:10px 0;"></div>
    <div id="profileHistory" class="scroll"></div>
    <button class="ghost" onclick="closeProfile()">Close profile</button>
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
  <div class="card">
    <h2>Play Online Chess</h2>
    <div id="gameCreate">
      <form class="row" onsubmit="createGame(event)">
        <select id="gameWhite" style="flex:1;min-width:120px"></select>
        <select id="gameBlack" style="flex:1;min-width:120px"></select>
        <select id="gameTime" style="flex:1;min-width:100px">
          <option value="0">No clock</option>
          <option value="180">3+0</option>
          <option value="300" selected>5+0</option>
          <option value="600">10+0</option>
          <option value="900">15+0</option>
        </select>
        <select id="gameInc" style="flex:1;min-width:90px">
          <option value="0" selected>+0</option>
          <option value="2">+2</option>
          <option value="5">+5</option>
          <option value="10">+10</option>
        </select>
        <select id="gameColor" style="flex:1;min-width:90px">
          <option value="w">I play White</option>
          <option value="b">I play Black</option>
        </select>
        <button class="primary" type="submit">Start game</button>
      </form>
      <div class="msg" id="gameCreateMsg"></div>
      <div id="gameQr" style="margin-top:8px;"></div>
    </div>
    <div id="activeGame" style="display:none;margin-top:12px;">
      <div id="gameWaiting" style="display:none; padding:6px 8px; border-radius:8px; background:rgba(250,204,21,0.15); color:#facc15; font-weight:600; margin-bottom:8px;">Waiting for the other player...</div>
      <div id="gameSpectators" class="hint" style="margin-bottom:6px;">Spectators: 0</div>
      <div id="openingName" class="hint" style="margin-bottom:6px; font-style:italic; color:var(--accent);"></div>
      <div class="row" style="align-items:center;justify-content:space-between;">
        <div style="font-weight:700;" id="gameStatus">Game</div>
        <div class="row">
          <span id="clockW" style="font-family:monospace;font-size:18px;">--:--</span>
          <span>&nbsp;vs&nbsp;</span>
          <span id="clockB" style="font-family:monospace;font-size:18px;">--:--</span>
        </div>
      </div>
      <div class="board-wrap">
        <div class="rank-labels" id="rankLabels">
          <span>8</span><span>7</span><span>6</span><span>5</span><span>4</span><span>3</span><span>2</span><span>1</span>
        </div>
        <div id="board" class="chess-board"></div>
      </div>
      <div class="file-labels" id="fileLabels">
        <span>a</span><span>b</span><span>c</span><span>d</span><span>e</span><span>f</span><span>g</span><span>h</span>
      </div>
      <div class="row" style="margin-top:8px;">
        <button class="ghost" onclick="abortGame()">Abort</button>
        <button class="danger" onclick="resignGame()">Resign</button>
        <button class="ghost" onclick="offerDrawGame()">Offer draw</button>
        <button class="primary" onclick="acceptDrawGame()">Accept draw</button>
        <button class="ghost" onclick="declineDrawGame()">Decline draw</button>
        <button class="ghost" onclick="claimTimeoutGame()">Claim timeout</button>
        <button class="ghost" onclick="downloadPGN(currentGameId)">Export PGN</button>
        <button class="primary" onclick="joinGame()">Join / Start clock</button>
        <button class="ghost" onclick="closeGame()">Close game</button>
      </div>
      <div class="hint" style="margin-top:4px;">Shortcuts: F flip board, M mute/unmute, R resign, A abort, arrows/Home/End for PGN replay.</div>
      <div class="msg" id="gameActionMsg"></div>
      <div id="moveList" class="hint" style="margin-top:8px;max-height:120px;overflow:auto;"></div>
    </div>
    <div style="margin-top:12px;">
      <h3 style="font-size:14px;margin:0 0 8px;">Recent games</h3>
      <div id="gamesList" class="scroll"></div>
    </div>
  </div>
  <div id="gameResultOverlay" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:9999; align-items:center; justify-content:center;">
    <div style="background:var(--card); padding:24px 32px; border-radius:16px; text-align:center; max-width:320px; box-shadow:0 20px 40px rgba(0,0,0,0.4);">
      <div id="gameResultTitle" style="font-size:24px; font-weight:800; margin-bottom:8px;"></div>
      <div id="gameResultDetail" style="color:var(--muted); margin-bottom:12px;"></div>
      <div id="confettiArea" style="position:relative; height:0;"></div>
      <button class="primary" onclick="closeGameResultOverlay()">OK</button>
    </div>
  </div>
  <div class="card">
    <h2>PGN Import / Replay</h2>
    <textarea id="pgnInput" placeholder="Paste PGN here..." style="width:100%;min-height:100px;background:var(--bg);color:var(--text,inherit);border:1px solid #334155;border-radius:8px;padding:8px;font-family:monospace;font-size:12px;"></textarea>
    <div class="row" style="margin-top:8px;">
      <button class="primary" onclick="loadPgnReplay()">Load PGN</button>
      <button class="ghost" onclick="replayFirst()">⏮ First</button>
      <button class="ghost" onclick="replayPrev()">◀ Prev</button>
      <button class="ghost" onclick="replayNext()">Next ▶</button>
      <button class="ghost" onclick="replayLast()">Last ⏭</button>
    </div>
    <div class="msg" id="pgnMsg"></div>
    <div class="board-wrap" style="max-width:min(420px,100%);">
      <div class="rank-labels" id="replayRankLabels"></div>
      <div id="replayBoard" class="chess-board"></div>
    </div>
    <div class="file-labels" id="replayFileLabels" style="max-width:min(400px,100%);"></div>
    <div id="replayMoveList" class="hint" style="margin-top:8px;max-height:100px;overflow:auto;"></div>
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
  html += \`<button class="ghost" id="soundToggleBtn" onclick="toggleSound()">\${soundEnabled ? 'Sound: On' : 'Sound: Off'}</button>\`;
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
  loadGamesList();
  renderAdminPlayers();
  renderTabRename();
}

let playersCache = [];
async function loadPlayers(){
  playersCache = await api('/api/groups/'+currentTab+'/players');
  renderChips();
  populateGameDropdowns();
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
    <td><a href="#" onclick="showProfile('\${p.id}');return false;" style="color:var(--accent);text-decoration:none;">\${escapeHtml(p.name)}</a></td>
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
async function resetPlayerElo(id, name){
  if(!confirm('Reset ELO for '+name+' to starting rating?')) return;
  try { await api('/api/admin/reset-player', { method:'POST', body: JSON.stringify({ group: currentTab, playerId: id }) }); await refreshAll(); }
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
    $('adminPlayers').innerHTML = ps.map(p=>{
      const pid = p._id || p.id;
      return \`<tr>
      <td>\${escapeHtml(p.name)}</td>
      <td>\${p.rating}</td>
      <td>\${p.games}</td>
      <td>
        <button class="ghost" style="padding:4px 8px;font-size:12px" onclick="resetPlayerElo('\${pid}','\${escapeHtml(p.name)}')">Reset ELO</button>
        <button class="danger" style="padding:4px 8px;font-size:12px" onclick="deleteUser('\${pid}','\${escapeHtml(p.name)}')">Delete</button>
      </td>
    </tr>\`;
    }).join('') || '<tr><td colspan="4" class="hint">none</td></tr>';
  } catch(e){ /* maybe token invalid */ }
}


// --- Online play (chess) ---
const PIECE_GLYPH = {
  w: { p:'♙', n:'♘', b:'♗', r:'♖', q:'♕', k:'♔' },
  b: { p:'♟', n:'♞', b:'♝', r:'♜', q:'♛', k:'♚' }
};
let ChessCtor = null;
async function ensureChess(){ if(!ChessCtor){ const m = await import('https://esm.sh/chess.js@1.4.0'); ChessCtor = m.Chess; } return ChessCtor; }
let currentGameId = localStorage.getItem('currentGameId') || null;
let currentGame = null;
let chess = null;
let pointerStartSquare = null;
let pointerMoved = false;
let selectedSquare = null;
let legalTargets = new Set();
let gamePollTimer = null;
let clockTimer = null;
let heartbeatTimer = null;
let mySide = localStorage.getItem(currentGameId ? 'gameSide::'+currentGameId : 'x') || null;
let claimingTimeout = false;
let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
let boardFlipped = false;
const lastMoveCounts = {};
function toggleSound(){ soundEnabled = !soundEnabled; localStorage.setItem('soundEnabled', soundEnabled); renderTabs(); }
function getAudio(){ if(!window._audioCtx) window._audioCtx = new (window.AudioContext || window.webkitAudioContext)(); return window._audioCtx; }
function beep(freq,dur,type='sine'){ try { const ctx=getAudio(); if(ctx.state==='suspended') ctx.resume(); const o=ctx.createOscillator(); const g=ctx.createGain(); o.type=type; o.frequency.value=freq; g.gain.setValueAtTime(0.0001,ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.14,ctx.currentTime+0.01); g.gain.exponentialRampToValueAtTime(0.0001,ctx.currentTime+dur); o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime+dur+0.05); } catch(e){} }
function playGameSound(game){ if(!soundEnabled || !game || !game.moves || !game.moves.length) return; const cnt = game.moves.length; const prev = lastMoveCounts[game._id] || 0; lastMoveCounts[game._id] = cnt; if (cnt <= prev) return; const last = game.moves[cnt-1]; if (last.includes('#')) { beep(880,0.15,'square'); setTimeout(()=>beep(1175,0.2,'square'),120); } else if (last.includes('x')) { beep(330,0.1,'sawtooth'); } else if (last.includes('+')) { beep(660,0.1,'triangle'); } else { beep(440,0.07,'sine'); } }
function updateSoundButton(){}

function formatClock(ms){ if(ms<0) ms=0; const total=Math.floor(ms/1000); const m=Math.floor(total/60); const s=total%60; return m+":"+String(s).padStart(2,'0'); }
function updateClocks(){
  if(!currentGame) return;
  const now=Date.now();
  if (currentGame.unlimited) {
    const elW=$('clockW'), elB=$('clockB');
    if (elW) elW.textContent = '∞';
    if (elB) elB.textContent = '∞';
    return;
  }
  let w=currentGame.whiteTimeMs, b=currentGame.blackTimeMs;
  if(currentGame.status==='active'){
    if(currentGame.turn==='w') w -= (now-currentGame.lastMoveAt);
    else b -= (now-currentGame.lastMoveAt);
  }
  const elW=$('clockW'), elB=$('clockB');
  if(elW) elW.textContent=formatClock(w);
  if(elB) elB.textContent=formatClock(b);
  if(currentGame.status==='active' && !claimingTimeout){
    if((currentGame.turn==='w' && w<=0) || (currentGame.turn==='b' && b<=0)){
      claimTimeoutGame();
    }
  }
}
async function claimTimeoutGame(){
  if(!currentGameId||claimingTimeout) return;
  if(currentGame && currentGame.unlimited) return;
  claimingTimeout=true;
  try { await api('/api/games/'+currentGameId+'/timeout', { method:'POST' }); await loadGame(); }
  catch(e){ console.error(e); }
  finally { claimingTimeout=false; }
}
function stopPolling(){ if(gamePollTimer) clearInterval(gamePollTimer); if(clockTimer) clearInterval(clockTimer); gamePollTimer=null; clockTimer=null; }
function startPolling(){
  stopPolling();
  gamePollTimer = setInterval(async ()=>{ if(currentGameId){ await loadGame(); } }, 1000);
  clockTimer = setInterval(updateClocks, 100);
}
function startHeartbeat(){
  stopHeartbeat();
  if(!currentGameId) return;
  const side = mySide || 'spectate';
  const beat = async ()=>{ try { await api('/api/games/'+currentGameId+'/heartbeat', { method:'POST', body: JSON.stringify({ side }) }); } catch(e){} };
  beat();
  heartbeatTimer = setInterval(beat, 10000);
}
function stopHeartbeat(){ if(heartbeatTimer) clearInterval(heartbeatTimer); heartbeatTimer=null; }
function populateGameDropdowns(){
  const w=$('gameWhite'), b=$('gameBlack');
  if(!w||!b) return;
  if(!playersCache.length){ w.innerHTML='<option value="">No players</option>'; b.innerHTML='<option value="">No players</option>'; return; }
  const opts = playersCache.map(p=>\`<option value="\${escapeHtml(p.name)}">\${escapeHtml(p.name)}</option>\`).join('');
  w.innerHTML=opts; b.innerHTML=opts;
  if (playersCache.length>1) b.value = playersCache[1].name;
}
async function loadGamesList(){
  const el=$('gamesList'); if(!el) return;
  try {
    const games = await api('/api/games');
    el.innerHTML = (games||[]).slice(0,15).map(g=>{
      let label = g._id.slice(0,8) + ' — ' + g.status;
      if (g.result) label += ' — ' + g.result;
      const canAbort = g.status === 'pending' || g.status === 'active';
      const abortBtn = canAbort ? \`<button class="danger" type="button" style="padding:4px 8px;font-size:12px" onclick="abortGameById('\${g._id}')">Abort</button>\` : '';
      const delBtn = adminToken ? \`<button class="danger" type="button" style="padding:4px 8px;font-size:12px" onclick="deleteGameById('\${g._id}')">Delete</button>\` : '';
      const pgnBtn = (g.moves && g.moves.length) ? \`<button class="ghost" type="button" style="padding:4px 8px;font-size:12px" onclick="downloadPGN('\${g._id}')">PGN</button>\` : '';
      return \`<div class="row" style="margin-bottom:6px;">
        <span style="flex:1">\${escapeHtml(label)}</span>
        <button class="ghost" type="button" onclick="openGameAs('\${g._id}','w')">White</button>
        <button class="ghost" type="button" onclick="openGameAs('\${g._id}','b')">Black</button>
        <button class="ghost" type="button" onclick="openGameAs('\${g._id}','spectate')">View</button>
        \${pgnBtn}
        \${abortBtn}
        \${delBtn}
      </div>\`;
    }).join('') || '<span class="hint">No games yet.</span>';
  } catch(e){ el.innerHTML = '<span class="hint">'+escapeHtml(e.message)+'</span>'; }
}
async function loadGame(){
  if(!currentGameId) return;
  try {
    const prevMoveCount = currentGame ? (currentGame.moves||[]).length : 0;
    const newGame = await api('/api/games/'+currentGameId);
    if (currentGame && (newGame.moves||[]).length > prevMoveCount) {
      await animateNewMove(newGame);
    }
    currentGame = newGame;
    const scEl=$('gameSpectators'); if(scEl) scEl.textContent='Spectators: '+(currentGame.spectatorCount||0);
    const onEl=$('openingName'); if(onEl){ const on=getOpeningName(currentGame.moves||[]); onEl.textContent = on ? ('Opening: '+on) : ''; }
    const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    if (mySide === 'spectate') {
      const sk = 'specJoined::'+currentGameId;
      if (!localStorage.getItem(sk)) {
        localStorage.setItem(sk,'1');
        api('/api/games/'+currentGameId+'/join', { method:'POST', body: JSON.stringify({ side:'spectate' }) }).then(()=>loadGame()).catch(()=>{});
      }
    }
    const C = await ensureChess();
    const fenToShow = (currentGame.status === 'cancelled') ? START_FEN : currentGame.fen;
    chess = new C(fenToShow);
    const active = $('activeGame');
    if(active) active.style.display='block';
    const wait = $('gameWaiting');
    if(wait){
      if(currentGame.status==='pending'){
        const wj = currentGame.whiteJoined ? 'White joined' : 'Waiting for White';
        const bj = currentGame.blackJoined ? 'Black joined' : 'Waiting for Black';
        wait.style.display='block';
        wait.textContent = 'Waiting for the other player... (' + wj + ', ' + bj + ')';
      } else {
        wait.style.display='none';
      }
    }
    renderBoard();
    updateGameStatus();
    playGameSound(currentGame);
    if(currentGame && (currentGame.status==='finished' || currentGame.status==='cancelled')) { showGameResultOverlay(currentGame); }
    updateClocks();
    renderMoveList();
  } catch(e){ console.error(e); }
}
function renderMoveList(){
  const el=$('moveList'); if(!el || !currentGame) return;
  if (currentGame.status === 'cancelled') { el.textContent = 'Aborted — starting position shown.'; return; }
  const moves = currentGame.moves||[];
  const out = moves.map((m,i)=>{
    const moveNo = (i%2===0) ? (Math.floor(i/2)+1)+'. ' : '';
    let col = 'color:inherit;';
    if (m.includes('#')) col = 'color:#ef4444;font-weight:700;';
    else if (m.includes('+')) col = 'color:#f59e0b;font-weight:600;';
    else if (m.includes('x')) col = 'color:#22c55e;';
    return \`<span style="\${col}">\${moveNo}\${escapeHtml(m)}</span>\`;
  }).join(' ');
  el.innerHTML = out || '<span class="hint">No moves yet.</span>';
}
function updateGameStatus(){
  const el=$('gameStatus'); if(!el || !currentGame) return;
  const now = Date.now();
  const wOn = currentGame.whiteLastSeen && (now - currentGame.whiteLastSeen < 45000);
  const bOn = currentGame.blackLastSeen && (now - currentGame.blackLastSeen < 45000);
  if(currentGame.status==='pending'){
    el.textContent = 'Pending — waiting for both players to join' + (wOn||bOn ? ' (online: ' + (wOn?'W':'') + (bOn?' B':'') + ')' : '');
  } else if(currentGame.status==='finished'){
    el.textContent = 'Finished: ' + (currentGame.result||'');
  } else if(currentGame.status==='cancelled'){
    el.textContent = 'Aborted';
  } else {
    el.textContent = (currentGame.turn==='w' ? 'White' : 'Black') + ' to move  ' + (wOn?'White●':'White○') + ' ' + (bOn?'Black●':'Black○') + (currentGame.spectatorLastSeen && (now-currentGame.spectatorLastSeen<45000) ? '  (spectators online)' : '');
  }
}
function boardOrientation(){ let base = (mySide === 'b') ? 'b' : 'w'; if (boardFlipped) base = base === 'b' ? 'w' : 'b'; return base; }
function renderBoard(){
  const container=$('board'); if(!container || !chess) return;
  const board = chess.board();
  const flipped = boardOrientation() === 'b';
  const files = flipped ? ['h','g','f','e','d','c','b','a'] : ['a','b','c','d','e','f','g','h'];
  const ranks = flipped ? [1,2,3,4,5,6,7,8] : [8,7,6,5,4,3,2,1];
  const hist = chess.history({ verbose: true });
  const last = hist && hist.length ? hist[hist.length-1] : null;
  const lastSquares = new Set(last ? [last.from, last.to] : []);
  let html='';
  for (const rank of ranks) {
    for (const file of files) {
      const square = file + rank;
      const rowIndex = 8 - rank;
      const colIndex = file.charCodeAt(0) - 97;
      const piece = board[rowIndex][colIndex];
      const dark = (rowIndex + colIndex) % 2 === 1;
      const classes = ['square', dark?'dark':'light'];
      if (lastSquares.has(square)) classes.push('last-move');
      if (selectedSquare===square) classes.push('selected');
      if (legalTargets.has(square)) classes.push('legal');
      const pieceImg = piece ? \`<img class="piece" alt="\${piece.color}\${piece.type}" src="https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/\${piece.color}\${piece.type.toUpperCase()}.svg">\` : '';
      html += \`<div class="\${classes.join(' ')}" data-square="\${square}">\${pieceImg}</div>\`;
    }
  }
  container.innerHTML=html;
  const rEl=$('rankLabels'), fEl=$('fileLabels');
  if(rEl) rEl.innerHTML = ranks.map(x=>\`<span>\${x}</span>\`).join('');
  if(fEl) fEl.innerHTML = files.map(x=>\`<span>\${x}</span>\`).join('');
}
function clearSelection(){ selectedSquare=null; legalTargets=new Set(); renderBoard(); }
function handleSquareSelect(square){
  if(!chess || !currentGame || currentGame.status!=='active') return;
  if(!mySide || mySide !== chess.turn()) return;
  const piece = chess.get(square);
  if(selectedSquare && selectedSquare!==square){
    if(legalTargets.has(square)){
      attemptMove(selectedSquare, square);
    } else {
      clearSelection();
      if(piece && piece.color === chess.turn()){ selectedSquare=square; legalTargets=new Set(chess.moves({square,verbose:true}).map(m=>m.to)); renderBoard(); }
    }
    return;
  }
  if(piece && piece.color === chess.turn()){
    selectedSquare = square;
    legalTargets = new Set(chess.moves({square,verbose:true}).map(m=>m.to));
    renderBoard();
  } else {
    clearSelection();
  }
}
async function attemptMove(from,to){
  if(!chess || !currentGame) return;
  const piece = chess.get(from);
  const local = chess.move({from,to,promotion: (piece && piece.type==='p' && (to[1]==='8'||to[1]==='1')) ? 'q' : undefined});
  if(!local){ clearSelection(); return; }
  chess.undo();
  try {
    await api('/api/games/'+currentGameId+'/move', { method:'POST', body: JSON.stringify({
      side: mySide,
      from,
      to,
      promotion: (piece && piece.type==='p' && (to[1]==='8'||to[1]==='1')) ? 'q' : undefined
    }) });
    selectedSquare=null; legalTargets=new Set();
    await loadGame();
  } catch(err){ alert(err.message); await loadGame(); }
  clearSelection();
}
async function createGame(e){
  e.preventDefault();
  const msg=$('gameCreateMsg'); msg.className='msg'; msg.textContent='';
  const qr=$('gameQr'); if(qr) qr.innerHTML='';
  const w=$('gameWhite').value, b=$('gameBlack').value;
  const side = $('gameColor').value;
  if(!w||!b||w===b){ msg.className='msg err'; msg.textContent='Choose two different players'; return; }
  try {
    const g = await api('/api/games', { method:'POST', body: JSON.stringify({
      whiteName: w,
      blackName: b,
      group: currentTab,
      timeSeconds: Number($('gameTime').value),
      incrementSeconds: Number($('gameInc').value),
      creatorSide: side
    }) });
    localStorage.setItem('gameSide::'+g._id, side);
    openGameAs(g._id, side);
    msg.className='msg ok';
    const code = g.shortCode || g._id;
    const shareUrl = location.origin + '/?g=' + code + '&side=' + (side==='w'?'b':'w');
    msg.textContent='Game created. Share with opponent: ' + shareUrl;
    const qr = $('gameQr');
    if (qr) qr.innerHTML = '<img alt="QR code" src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(shareUrl) + '" style="border:1px solid #334155;border-radius:8px;background:#fff;padding:6px;">';
    await loadGamesList();
  } catch(err){ msg.className='msg err'; msg.textContent=err.message; }
}
function openGameAs(id, side){
  currentGameId = id;
  localStorage.setItem('currentGameId', id);
  if(side && side!=='spectate'){
    mySide = side;
    localStorage.setItem('gameSide::'+id, side);
  } else {
    mySide = localStorage.getItem('gameSide::'+id) || null;
  }
  (async ()=>{ await loadGame(); startPolling(); startHeartbeat(); })();
}
function closeGame(){
  stopPolling();
  stopHeartbeat();
  currentGameId=null; currentGame=null; chess=null; mySide=null;
  localStorage.removeItem('currentGameId');
  const ag=$('activeGame'); if(ag) ag.style.display='none';
}
async function deleteGameById(id){
  if(!confirm('Delete game permanently (admin)?')) return;
  try {
    await api('/api/games/'+id, { method:'DELETE' });
    if (currentGameId === id) closeGame();
    await loadGamesList();
  } catch(e){ alert(e.message); }
}
async function abortGameById(id){
  if(!confirm('Abort this game without rating change?')) return;
  try {
    await api('/api/games/'+id+'/abort', { method:'POST', body: JSON.stringify({}) });
    if (currentGameId === id) { currentGameId = null; currentGame = null; chess = null; mySide=null; localStorage.removeItem('currentGameId'); const ag=$('activeGame'); if(ag) ag.style.display='none'; }
    await loadGamesList();
  } catch(e){ alert(e.message); }
}
async function abortGame(){
  if(!confirm('Abort game without result?')) return;
  try {
    await api('/api/games/'+currentGameId+'/abort', { method:'POST', body: JSON.stringify({}) });
    await loadGame();
    await loadGamesList();
  } catch(e){ alert(e.message); }
}
async function joinGame(){
  if(!currentGameId){ alert('Open a game first'); return; }
  if(!mySide || (mySide!=='w' && mySide!=='b')){ alert('Choose White or Black view first'); return; }
  try {
    await api('/api/games/'+currentGameId+'/join', { method:'POST', body: JSON.stringify({ side: mySide }) });
    await loadGame();
  } catch(e){ alert(e.message); }
}
async function resignGame(){
  if(!currentGameId || !mySide){ alert('You are spectating'); return; }
  if(!confirm('Resign?')) return;
  try { await api('/api/games/'+currentGameId+'/resign', { method:'POST', body: JSON.stringify({ side: mySide }) }); await loadGame(); }
  catch(e){ alert(e.message); }
}
async function offerDrawGame(){
  if(!currentGameId || !mySide){ alert('You are spectating'); return; }
  try { await api('/api/games/'+currentGameId+'/draw-offer', { method:'POST', body: JSON.stringify({ side: mySide }) }); await loadGame(); }
  catch(e){ alert(e.message); }
}
async function acceptDrawGame(){
  if(!currentGameId || !mySide){ alert('You are spectating'); return; }
  try { await api('/api/games/'+currentGameId+'/draw-accept', { method:'POST', body: JSON.stringify({ side: mySide }) }); await loadGame(); }
  catch(e){ alert(e.message); }
}
async function declineDrawGame(){
  if(!currentGameId || !mySide){ alert('You are spectating'); return; }
  try { await api('/api/games/'+currentGameId+'/draw-decline', { method:'POST', body: JSON.stringify({ side: mySide }) }); await loadGame(); }
  catch(e){ alert(e.message); }
}

// pointer events for drag/click
(function initBoardEvents(){
  const boardEl = $('board');
  if(!boardEl) return;
  boardEl.addEventListener('pointerdown', (e)=>{
    const sq = e.target && e.target.closest ? e.target.closest('.square') : null;
    if(!sq) return;
    pointerStartSquare = sq.dataset.square;
    pointerMoved = false;
  });
  boardEl.addEventListener('pointermove', ()=>{ if(pointerStartSquare) pointerMoved=true; });
  boardEl.addEventListener('pointerup', (e)=>{
    const sq = e.target && e.target.closest ? e.target.closest('.square') : null;
    const upSquare = sq ? sq.dataset.square : null;
    if(!pointerStartSquare) return;
    if(upSquare && upSquare !== pointerStartSquare && pointerMoved){
      attemptMove(pointerStartSquare, upSquare);
    } else {
      handleSquareSelect(pointerStartSquare);
    }
    pointerStartSquare = null;
    pointerMoved = false;
  });
})();

// open game from query param or last game
const qp = new URLSearchParams(location.search);
const qShort = qp.get('g') || qp.get('code');
const qGame = qp.get('game');
if (qShort) {
  const side = qp.get('side') === 'b' ? 'b' : (qp.get('side') === 'spectate' ? 'spectate' : 'w');
  (async () => {
    try {
      const g = await api('/api/games/resolve?code=' + encodeURIComponent(qShort));
      if (g && g._id) {
        localStorage.setItem('currentGameId', g._id);
        if (side !== 'spectate') localStorage.setItem('gameSide::'+g._id, side);
        mySide = (side === 'spectate') ? null : side;
        openGameAs(g._id, side);
      }
    } catch (e) { console.error(e); }
  })();
} else if (qGame) {
  const side = qp.get('side') === 'b' ? 'b' : (qp.get('side') === 'spectate' ? 'spectate' : 'w');
  openGameAs(qGame, side);
} else if (currentGameId) {
  const side = localStorage.getItem('gameSide::'+currentGameId);
  mySide = side || mySide;
  openGameAs(currentGameId, side || 'spectate');
}


// --- game result overlay / confetti ---
let lastResultKey = null;
function showGameResultOverlay(game){
  if(!game) return;
  const key = game._id + '::' + (game.status||'') + '::' + (game.result||'');
  if(lastResultKey === key) return;
  lastResultKey = key;
  const overlay=$('gameResultOverlay');
  const title=$('gameResultTitle');
  const detail=$('gameResultDetail');
  if(!overlay||!title||!detail) return;
  let t='Game over';
  if(game.status==='cancelled') t='Game aborted';
  else if(game.result==='1-0') t='White wins!';
  else if(game.result==='0-1') t='Black wins!';
  else if(game.result==='1/2-1/2') t='Draw!';
  title.textContent=t;
  detail.textContent = game.result ? 'Result: ' + game.result : (game.status==='cancelled' ? 'No rating change' : '');
  overlay.style.display='flex';
  launchConfetti(game.result);
}
function closeGameResultOverlay(){ const o=$('gameResultOverlay'); if(o) o.style.display='none'; }
function closeProfile(){ const c=$('profileCard'); if(c) c.style.display='none'; }
function showProfile(id){
  const p = playersCache.find(x=>String(x._id||x.id)===String(id));
  if(!p) return;
  $('profileName').textContent = p.name + ' — Profile';
  const delta = p.rating - (p.initial||1800);
  $('profileSummary').innerHTML = \`Rating: <b>\${p.rating}</b> (\${delta>=0?'+':''}\${delta}) · Games: \${p.games||0} (W \${p.wins||0} / D \${p.draws||0} / L \${p.losses||0}) · Started at \${p.initial||1800}\`;
  const hist = Array.isArray(p.history) ? [...p.history].reverse() : [];
  const ratings = [p.initial||1800].concat((p.history||[]).map(h=>h.rating));
  let svg = '<span class="hint">Play more games to see a rating graph.</span>';
  if(ratings.length >= 2){
    const W=420, H=90;
    const min=Math.min(...ratings), max=Math.max(...ratings), range=Math.max(1,max-min);
    const pts = ratings.map((r,i)=> {
      const x = 8 + (i/(ratings.length-1))*(W-16);
      const y = H-8 - ((r-min)/range)*(H-16);
      return x.toFixed(1)+','+y.toFixed(1);
    }).join(' ');
    svg = \`<svg width="100%" height="\${H}" viewBox="0 0 \${W} \${H}" preserveAspectRatio="none" style="background:rgba(0,0,0,0.15);border-radius:8px;">
      <polyline points="\${pts}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>\`;
  }
  const chart=$('profileChart'); if(chart) chart.innerHTML = svg;
  const el=$('profileHistory'); if(!el) return;
  if(!hist.length){ el.innerHTML = '<span class="hint">No rated games yet.</span>'; }
  else {
    el.innerHTML = \`<table><thead><tr><th>Date</th><th>Opponent</th><th>Score</th><th>Δ</th><th>New</th></tr></thead><tbody>\` +
      hist.map(h=>\`<tr>
        <td>\${new Date(h.date).toLocaleDateString()}</td>
        <td>\${escapeHtml(h.opponent||'?')}</td>
        <td>\${h.score}</td>
        <td class="delta \${h.delta>=0?'pos':'neg'}">\${h.delta>=0?'+':''}\${h.delta}</td>
        <td>\${h.rating}</td>
      </tr>\`).join('') + \`</tbody></table>\`;
  }
  const card=$('profileCard'); if(card){ card.style.display='block'; card.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
function launchConfetti(result){
  const colors = result==='1-0' ? ['#facc15','#f97316','#ef4444','#fde68a'] :
                  result==='0-1' ? ['#3b82f6','#8b5cf6','#10b981','#a7f3d0'] :
                  ['#94a3b8','#cbd5e1','#e2e8f0','#64748b'];
  const count = 60;
  for(let i=0;i<count;i++){
    const el=document.createElement('div');
    el.className='confetti-dot';
    el.style.left = (20 + Math.random()*60) + 'vw';
    el.style.top = (20 + Math.random()*20) + 'vh';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.setProperty('--dx', (Math.random()*260 - 130) + 'px');
    el.style.setProperty('--dy', (-40 - Math.random()*220) + 'px');
    document.body.appendChild(el);
    setTimeout(()=>{ if(el.parentNode) el.parentNode.removeChild(el); }, 1100);
  }
}

function downloadPGN(id){
  if(!id) return;
  const url = (API || '') + '/api/games/' + id + '/pgn';
  const a = document.createElement('a');
  a.href = url;
  a.download = 'game-' + String(id).slice(0,8) + '.pgn';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

let currentTheme = localStorage.getItem('theme') || 'dark';
function applyTheme(){ document.body.classList.toggle('light', currentTheme==='light'); const b=$('themeToggle'); if(b) b.textContent = currentTheme==='dark' ? 'Light mode' : 'Dark mode'; }
function toggleTheme(){ currentTheme = currentTheme==='dark' ? 'light' : 'dark'; localStorage.setItem('theme', currentTheme); applyTheme(); }


// --- move animation helpers ---
async function animateNewMove(game){
  const moves = game.moves || [];
  if(!moves.length) return;
  let lastMove = null;
  try {
    const C = await ensureChess();
    const tmp = new C();
    for(let i=0;i<moves.length;i++){
      const m = tmp.move(moves[i]);
      if(i === moves.length-1) lastMove = m;
    }
  } catch(e){ return; }
  if(!lastMove || !lastMove.from || !lastMove.to || lastMove.from === lastMove.to) return;
  await animatePieceSlide(lastMove.from, lastMove.to, lastMove.color, lastMove.piece, !!lastMove.captured);
}
function animatePieceSlide(from,to,color,pieceType,isCapture){
  return new Promise((resolve)=>{
    const boardEl=$('board');
    if(!boardEl){ resolve(); return; }
    const fromEl=boardEl.querySelector(\`[data-square="\${from}"]\`);
    const toEl=boardEl.querySelector(\`[data-square="\${to}"]\`);
    if(!fromEl||!toEl){ resolve(); return; }
    const boardRect=boardEl.getBoundingClientRect();
    const fromRect=fromEl.getBoundingClientRect();
    const toRect=toEl.getBoundingClientRect();
    const size=Math.min(fromRect.width,toRect.width)*0.82;
    const img=document.createElement('img');
    img.className='flying-piece';
    img.src=\`https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/\${color}\${String(pieceType).toUpperCase()}.svg\`;
    img.style.width=size+'px';
    img.style.height=size+'px';
    img.style.left=(fromRect.left-boardRect.left + (fromRect.width-size)/2)+'px';
    img.style.top=(fromRect.top-boardRect.top + (fromRect.height-size)/2)+'px';
    img.style.transform='translate(0,0)';
    boardEl.style.position='relative';
    boardEl.appendChild(img);
    const targetPiece=toEl.querySelector('.piece');
    if (targetPiece) { targetPiece.style.transition='opacity .15s'; targetPiece.style.opacity='0.35'; }
    const dx=toRect.left-fromRect.left;
    const dy=toRect.top-fromRect.top;
    requestAnimationFrame(()=>{ img.style.transform=\`translate(\${dx}px,\${dy}px)\`; });
    setTimeout(()=>{ img.remove(); if(targetPiece){ targetPiece.style.opacity=''; targetPiece.style.transition=''; } resolve(); },200);
  });
}


// --- PGN import / replay ---
let replayPositions = [];
let replayMoves = [];
let replayIndex = 0;
async function loadPgnReplay(){
  const msg=$('pgnMsg'); if(msg){ msg.className='msg'; msg.textContent=''; }
  const text = ($('pgnInput')||{}).value || '';
  if(!text.trim()){ if(msg){ msg.className='msg err'; msg.textContent='Paste a PGN first.'; } return; }
  try {
    const C = await ensureChess();
    const checker = new C();
    const loaded = checker.loadPgn(text, { sloppy: true });
    if (!loaded) { throw new Error('Could not parse PGN'); }
    const hist = checker.history({ verbose: true });
    const tmp = new C();
    replayPositions = [tmp.fen()];
    replayMoves = [];
    for (const m of hist) { tmp.move(m.san); replayMoves.push(m.san); replayPositions.push(tmp.fen()); }
    replayIndex = 0;
    if (msg){ msg.className='msg ok'; msg.textContent = 'Loaded ' + replayMoves.length + ' moves. Use Prev/Next.'; }
    renderReplayBoard();
    updateReplayMoveList();
  } catch(e){
    if(msg){ msg.className='msg err'; msg.textContent = e.message || 'Invalid PGN'; }
  }
}
async function renderReplayBoard(){
  const container=$('replayBoard'); if(!container) return;
  const C = await ensureChess();
  const fen = replayPositions.length ? replayPositions[replayIndex] : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  const chess = new C(fen);
  const board = chess.board();
  let lastMove = null;
  if (replayIndex > 0) {
    try {
      const tmp = new C();
      for (let i=0;i<replayIndex;i++){ const m = tmp.move(replayMoves[i]); if (i===replayIndex-1) lastMove=m; }
    } catch(e){}
  }
  const lastSquares = new Set(lastMove ? [lastMove.from, lastMove.to] : []);
  let html='';
  for (let r=0;r<8;r++){
    for (let c=0;c<8;c++){
      const dark=(r+c)%2===1;
      const square=String.fromCharCode(97+c)+(8-r);
      const piece=board[r][c];
      const classes=['square', dark?'dark':'light'];
      if (lastSquares.has(square)) classes.push('last-move');
      const pieceImg = piece ? \`<img class="piece" alt="\${piece.color}\${piece.type}" src="https://raw.githubusercontent.com/lichess-org/lila/master/public/piece/cburnett/\${piece.color}\${piece.type.toUpperCase()}.svg">\` : '';
      html += \`<div class="\${classes.join(' ')}" data-square="\${square}">\${pieceImg}</div>\`;
    }
  }
  container.innerHTML=html;
  // labels
  const rl=$('replayRankLabels'), fl=$('replayFileLabels');
  if (rl) rl.innerHTML = [8,7,6,5,4,3,2,1].map(x=>\`<span>\${x}</span>\`).join('');
  if (fl) fl.innerHTML = ['a','b','c','d','e','f','g','h'].map(x=>\`<span>\${x}</span>\`).join('');
}
function updateReplayMoveList(){
  const el=$('replayMoveList'); if(!el) return;
  if(!replayMoves.length){ el.textContent=''; return; }
  el.innerHTML = replayMoves.map((m,i)=>{
    const cls = (i === replayIndex-1) ? 'style="font-weight:bold;color:var(--accent);"' : '';
    return \`<span \${cls}>\${Math.floor(i/2)+1}\${i%2===0?'.':'...'} \${m}</span> \`;
  }).join('');
}
function replayFirst(){ replayIndex=0; renderReplayBoard(); updateReplayMoveList(); }
function replayPrev(){ if(replayIndex>0){ replayIndex--; renderReplayBoard(); updateReplayMoveList(); } }
function replayNext(){ if(replayIndex < replayPositions.length-1){ replayIndex++; renderReplayBoard(); updateReplayMoveList(); } }
function replayLast(){ replayIndex = Math.max(0,replayPositions.length-1); renderReplayBoard(); updateReplayMoveList(); }


// --- keyboard shortcuts ---
window.addEventListener('keydown', (e) => {
  const tag = document.activeElement && document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.key === 'f' || e.key === 'F') {
    boardFlipped = !boardFlipped;
    if (currentGame) renderBoard();
    e.preventDefault();
  } else if (e.key === 'm' || e.key === 'M') {
    toggleSound();
    e.preventDefault();
  } else if (e.key === 'ArrowLeft') {
    if (replayPositions.length) { replayPrev(); e.preventDefault(); }
  } else if (e.key === 'ArrowRight') {
    if (replayPositions.length) { replayNext(); e.preventDefault(); }
  } else if (e.key === 'Home') {
    if (replayPositions.length) { replayFirst(); e.preventDefault(); }
  } else if (e.key === 'End') {
    if (replayPositions.length) { replayLast(); e.preventDefault(); }
  } else if (e.key === 'r' || e.key === 'R') {
    if (currentGameId && mySide) resignGame();
  } else if (e.key === 'a' || e.key === 'A') {
    if (currentGameId) abortGame();
  }
});


const OPENING_MAP = {
  "e4 e5": "Open Game",
  "e4 e5 Nf3 Nc6 Bb5": "Ruy Lopez",
  "e4 e5 Nf3 Nc6 Bc4": "Italian Game",
  "e4 e5 Nf3 Nc6 Bc4 Bc5": "Giuoco Piano",
  "e4 e5 Nf3 Nc6 Bc4 Nf6": "Two Knights Defense",
  "e4 e5 Nf3 d6": "Philidor Defense",
  "e4 e5 f4": "King's Gambit",
  "e4 c5": "Sicilian Defense",
  "e4 c6": "Caro-Kann Defense",
  "e4 e6": "French Defense",
  "e4 d5": "Scandinavian Defense",
  "d4 d5": "Queen's Pawn Game",
  "d4 Nf6": "Indian Defense",
  "d4 d5 c4": "Queen's Gambit",
  "d4 f5": "Dutch Defense",
  "c4": "English Opening",
  "Nf3": "Reti Opening",
  "g3": "King's Fianchetto",
  "b3": "Larsen's Opening",
  "f4": "Bird's Opening"
};
function getOpeningName(moves){
  const list = moves || [];
  for (let len = Math.min(list.length, 6); len >= 2; len--) {
    const key = list.slice(0, len).join(' ');
    if (OPENING_MAP[key]) return OPENING_MAP[key];
  }
  if (list.length === 1) {
    const m = list[0];
    if (m.startsWith('e4')) return 'King\\'s Pawn Opening';
    if (m.startsWith('d4')) return 'Queen\\'s Pawn Opening';
    if (m.startsWith('c4')) return 'English Opening';
    if (m.startsWith('Nf3')) return 'Reti Opening';
  }
  if (list.length >= 2) return 'Developing...';
  return null;
}

// init
if(adminToken){ $('adminLogin').style.display='none'; $('adminPanel').classList.add('open'); }
applyTheme();
refreshAll();
</script>
</body>
</html>
`;
