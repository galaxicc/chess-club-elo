# Code Architecture — Chess Club ELO

## Overview

`beam` is a small chess club ELO tracking system. It supports:
- Admin-created players starting at 1800 ELO
- Public result entry in text or dropdown form
- Top 20 leaderboard per tab
- Multiple isolated “tabs” (1–10), with admin-renamable labels
- Real-time online chess games with clocks, spectators, PGN export/import, analysis
- Play-vs-AI (random, greedy, and Stockfish/JS-engine options)
- Player profiles with rating history
- Announcements and latest-member greeting
- Optional Lichess cloud-eval analysis with local heuristic fallback

The project has two parallel backends:
1. **Convex** (`convex/*`) — used for the deployed app and recommended for production.
2. **Express** (`server.js`) — local fallback/offline backend using `data.json`.

---

## Tech Stack

### Convex backend
- **Language:** TypeScript
- **Runtime:** Convex serverless functions
- **Database:** Convex document database (`players`, `matches`, `games`, `adminSessions`, `config`)
- **Chess rules:** `chess.js` (UCI/FEN/SAN, move legality, game-over detection)
- **HTTP API:** Convex HTTP actions in `convex/http.ts`

### Frontend
- **Language:** Vanilla JavaScript in a single `public/index.html`
- **Styling:** Inline CSS with CSS variables and dark/light theme
- **Chess UI:** Custom HTML/CSS board (Lichess cburnett SVG pieces)
- **Libraries loaded at runtime:**
  - `chess.js` (for rules/PGN)
  - `js-chess-engine` (for difficult AI fallback)
  - Stockfish.js via CDN for UCI engine attempts
  - Lichess cloud eval API for analysis
  - QR-code API for game sharing

### Express fallback
- **Language:** JavaScript (Node.js)
- **Framework:** Express
- **Storage:** `data.json` (atomic write to `.tmp` then rename)
- **Admin auth:** in-memory session token (`Set`)

---

## Data Model (Convex)

### `players`
- `group`: string (`1`–`10`)
- `name`: string
- `rating`: number
- `initial`: 1800 or 2300 for `number1`
- `games`, `wins`, `draws`, `losses`: numbers
- `history`: optional array of `{ rating, delta, opponent, score, date }`
- Indexes:
  - `by_group`
  - `by_group_name`

### `matches`
- `group`, `a`, `b` (player IDs)
- `nameA`, `nameB`
- `scoreA`, `scoreB` (`1`, `0.5`, or `0`)
- `oldA`, `oldB`, `newA`, `newB`, `deltaA`, `deltaB`
- `date`
- Index: `by_group`

### `games`
- `whitePlayerId`, `blackPlayerId`
- `group`
- `status`: `pending`, `active`, `finished`, `cancelled`
- `turn`: `w` or `b`
- `fen`, `moves` (SAN array)
- `result`: `1-0`, `0-1`, `1/2-1/2`
- `initialTimeMs`, `incrementMs`, `whiteTimeMs`, `blackTimeMs`, `lastMoveAt`
- `winnerPlayerId`, `matchRecorded`, `drawOfferedBy`
- `whiteJoined`, `blackJoined`, `spectatorCount`
- `whiteLastSeen`, `blackLastSeen`, `spectatorLastSeen`
- `shortCode` for short invite links
- `unlimited` for no-clock games
- `matchId` (links to ELO `matches` doc when recorded)
- Indexes: `by_status`, `by_white`, `by_black`, `by_short_code`

### `adminSessions`
- `token`, `expiresAt`
- Index: `by_token`

### `config`
- Key/value store used for:
  - `adminPassword`
  - `motd`
  - `latestRegistered`
  - `tabName_<1..10>`

---

## Key Design Choices

### ELO model
- Starting rating: **1800**, or **2300** for a player named `number1`
- `K = 32`
- Draws supported: score `0.5-0.5`
- Expected score: standard ELO formula with 400-point scale
- Results must sum to 1

### Tabs
- 10 isolated groups (`1`–`10`)
- Default tab names: `Tab 1` … `Tab 10`
- Admins can rename tabs; names are stored in `config` and returned by `/api/tab-names`

### Admin authentication
- Password compared against DB config or `ADMIN_PASSWORD` env var
- A random session token is stored in `adminSessions` with a 7-day expiry
- Token is sent as `Authorization: Bearer <token>` by the frontend
- Admin capabilities: create/delete/reset players, reset ELO, set MOTD, rename tabs, delete games

### Online play
- Game creation is `pending` until the second/opposite color joins
- Clocks start only after both sides join
- Illegal moves and clock timeouts are validated server-side
- Finished games automatically create an ELO match entry
- Aborted games leave no ELO change
- Invite links use a short code (`?g=CODE`) for compact QR codes

### Play vs AI
- `beginner`: random legal move
- `intermediate`: one-ply greedy material search
- `difficult`: Stockfish UCI worker (depth 12), fallback to `js-chess-engine`, then greedy fallback
- Games are local only and do not affect ELO

### Analysis
- Uses Lichess cloud eval (`/api/cloud-eval`)
- Falls back to a local heuristic evaluation if rate limited/unavailable
- Terminal checkmates evaluate as forced mate (±9999)
- Move quality colors: blunder, mistake, inaccuracy, excellent, good
- Graph uses a sigmoid from centipawns to a -100% … +100% range

---

## Frontend Architecture

The entire UI lives in `public/index.html`. It is served by:
- Convex HTTP action at `/` in production
- Express static middleware in local mode

### Important frontend state variables
- `currentTab`: active tab (`1`–`10`)
- `playersCache`: loaded players
- `adminToken`: admin bearer token from localStorage
- `currentGameId`, `currentGame`, `chess`: active online game
- `mySide`: `w`, `b`, or `null`
- `aiGame`: local AI game state
- `boardFlipped`: orientation override
- `soundEnabled`, `soundVolume`: audio preferences
- `currentTheme`: `dark` or `light`

### Major UI sections
- Submit Result (text and dropdown methods)
- Top 20 leaderboard
- Highlights (fastest improver, worst performer, most active, hot streak)
- Recent matches
- Player profile modal/card with rating history
- Admin panel (login, create/delete/reset players, MOTD, rename tabs)
- Play Online Chess (create, board, clocks, game list)
- Play vs AI
- PGN Import / Replay
- PGN Analysis (Lichess cloud eval + fallback)

### Rendering notes
- Board uses Lichess cburnett SVG piece images
- `renderBoard()` supports flipped orientation and checkmate highlighting
- `renderAiBoard()` supports AI orientation
- Legal moves and last-move squares are highlighted
- Confetti/overlay effects are DOM-driven and auto-dismissed

---

## Backend Notes

### Convex (`convex/*`)
- `schema.ts`: table definitions and indexes
- `players.ts`: list/create/delete/reset players, latest-member tracking
- `matches.ts`: result submission + ELO recalculation, stats
- `games.ts`: online game lifecycle, clocks, timeout, resign, draw, abort, delete, PGN, join/presence, spectator count
- `admin.ts`: login, change password, set MOTD, rename tabs
- `site.ts`: tab names, MOTD, latest registered member
- `http.ts`: HTTP action routing and CORS

### Express fallback (`server.js`)
- Mirrors the Convex HTTP route shape as closely as possible
- Stores data in `data.json`
- Keeps admin session tokens in memory
- Supports the same core ELO, match, game, MOTD, and tab-name endpoints

---

## Environment Variables

- `ADMIN_PASSWORD`: initial admin password (default `chessadmin`)
- `PORT`: server port (default `3000`)
- `DATA_FILE`: optional override for Express data file path
- Convex CLI: `CONVEX_DEPLOYMENT`, `CONVEX_URL`, `CONVEX_SITE_URL`

Convex production env is managed via:
```bash
npx convex env set ADMIN_PASSWORD <password> --prod
```

---

## Deployment

### Convex
```bash
npm run gen:frontend
npx convex dev
npx convex env set ADMIN_PASSWORD <password>
npx convex deploy
```

### Express local fallback
```bash
npm install
ADMIN_PASSWORD=yourpassword npm start
```

---

## Security Considerations

See `sec.MD` for the full security review. Key points:
- Admin auth uses short-lived DB-backed session tokens
- Player names are escaped before HTML rendering
- Admin endpoints require tokens
- CORS is currently permissive (`*`) for development convenience
- Client-side game moves are not tied to player identity

---

## File Map

```text
beam/
├── code.MD
├── sec.MD
├── README.md
├── server.js
├── package.json
├── convex/
│   ├── schema.ts
│   ├── players.ts
│   ├── matches.ts
│   ├── games.ts
│   ├── admin.ts
│   ├── site.ts
│   └── http.ts
├── public/
│   └── index.html
├── scripts/
│   └── gen-frontend.js
└── convex/_generated/
```
