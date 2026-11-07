# Chess Club ELO

Small web app for a chess club to track ELO ratings.

## Run

```bash
npm install
ADMIN_PASSWORD=yourpassword npm start
```

Then open http://localhost:3000

Default admin password (if `ADMIN_PASSWORD` not set): `chessadmin`.

## How it works

- Two tabs: **Tab 1** (real club) and **Tab 2** (testing). Each has its own players, matches and standings.
- Admin logs in with password, then creates players (start at 1800 ELO) in the current tab.
- Anyone can submit a result: `usera-userb 0.5-0.5` (also `1-0`, `0-1`). ELO (K=32) is recalculated for both.
- Top 20 leaderboard plus fastest improver, worst performer, most active and current hot streak.
- Recent match history is shown.

Data is stored in `data.json` next to `server.js`.
## Deploy to Fly.io (free-ish, persistent data)

1. Install flyctl: https://fly.io/docs/handyman/install-flyctl/
2. Sign up / login: `fly auth login`
3. From project root:
   ```bash
   fly launch --no-deploy
   # accept app name; choose region
   fly volumes create chessdata --region <REGION> --size 1
   fly deploy
   ```
4. Set admin password:
   ```bash
   fly secrets set ADMIN_PASSWORD=yourpassword
   ```
5. Open: `fly open`

Notes:
- `chessdata` volume keeps `data.json` across deploys/restarts. Volume storage is ~$0.15/GB/month (a 1GB volume is pennies).
- `auto_stop_machines = "stop"` sleeps when idle to save free allowance; first request wakes it.
- For a completely $0 setup with no volume charges, use the Oracle Cloud Always Free VM option instead.

## Deploy to Convex (free tier, persistent DB)

Convex hosts the backend (HTTP API + database). Host the static frontend (e.g. GitHub Pages / Netlify / Vercel) separately.

1. Create account/login:
   ```bash
   npx convex dev
   ```
   This configures the project, generates `convex/_generated`, and starts a dev deployment.
2. Set admin password:
   ```bash
   npx convex env set ADMIN_PASSWORD yourpassword
   ```
3. Deploy backend:
   ```bash
   npx convex deploy
   ```
   Your backend URL is `https://<deployment>.convex.site` (shown in dashboard).
4. Open the frontend; when prompted, paste the `.convex.site` URL. It is saved in localStorage.
   Or edit `public/index.html` / host env to prefill it.
5. (Optional) host `public/` on any static host.

Notes:
- Admin tokens are stored in the `adminSessions` table (7 day expiry).
- All players/matches persist in Convex (free tier).
- Local Express backend (`npm start`) still works for offline/dev use.
