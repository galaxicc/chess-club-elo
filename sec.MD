# Security Review — Chess Club ELO

Date: 2026-11-07  
Scope: Frontend (`public/index.html`), Convex backend (`convex/*`), Express fallback (`server.js`)  
Latest reviewed commit: `e949483` (XSS hardening) plus current working tree

## Summary

This is a small-club application with intentionally public result/game submission and admin-only management. No dependencies currently report known vulnerabilities (`npm audit` = 0). The main attack surface is the browser frontend (XSS → admin token theft) and the public HTTP API (spam/abuse).

## Severity Legend

- **High** — could lead to account takeover, data corruption, or serious abuse
- **Medium** — real risk in a public deployment
- **Low** — hygiene/maturity issue

---

## Fixed / Hardened

| Issue | Severity | Status | Details |
|---|---|---|---|
| Inline handler injection via player names | Medium/High | Fixed in `e949483` | Names were interpolated into single-quoted `onclick` attributes. Switched chips/buttons to `data-*` attributes and JS readers (`insertNameFromChip`, `deleteUserFromBtn`, `resetPlayerEloFromBtn`). |
| Stored XSS via unescaped user data | Medium | Mitigated | Leaderboard, admin table, match history, profile, chips, tabs, and game list use `escapeHtml` or `textContent`. MOTD is rendered with `textContent`. |
| Unsanitized error display | Low | Mitigated | HTTP API normalizes Convex errors via `errMsg()`; frontend mostly uses `textContent`/`msg`. |
| Dependency vulnerabilities | — | Clean | `npm audit` reports 0 vulnerabilities. |

---

## Remaining Findings and Recommendations

### Medium

1. **Admin token stored in `localStorage`**
   - **Risk:** A future XSS bug, browser extension, or compromised dependency could read the admin token and take over management.
   - **Mitigation applied:** Reduced XSS surface; token is never placed in markup.
   - **Recommended next steps:** enforce a Content-Security-Policy, keep session lifetime short, and consider hashing/re-authenticating before destructive actions.

2. **Default / weak admin password**
   - Default is `chessadmin` (Express) and the same fallback in Convex.
   - The UI previously hinted at the default password.
   - **Recommendation:** require `ADMIN_PASSWORD` in production, remove hints, and hash the password instead of storing it in plaintext in `config`.

3. **Broad CORS policy**
   - Public API routes use `Access-Control-Allow-Origin: *`.
   - **Risk:** any website can call public read/write endpoints directly.
   - **Recommendation:** pin CORS to the deployed frontend origin in production.

4. **No app-level rate limiting**
   - Result submission, game creation, moves, heartbeat, and analysis triggers are not throttled.
   - **Risk:** spam/abuse can consume Convex free-tier quota.
   - **Recommendation:** store `lastActionAt` per client/game and enforce cooldowns; add basic exponential backoff.

5. **No per-player authentication**
   - Anyone can submit results for any players and move as either side in online games.
   - **Risk:** acceptable for a trusted club, but not for official tournaments.
   - **Recommendation:** issue per-player or per-game secret links and validate them server-side.

### Low

6. **Public game data**
   - Game states and moves are readable by anyone with a game ID.
   - This is expected for the current use case, but should be documented if privacy matters.

7. **Third-party QR generation**
   - `api.qrserver.com` receives the share URL.
   - **Recommendation:** only a non-sensitive share link is sent. If stricter privacy is desired, generate QR codes client-side.

8. **Express/local password storage**
   - `data.json` may contain plaintext admin password.
   - **Recommendation:** avoid committing `data.json`; it is already gitignored.

9. **Orphaned records after deletion**
   - Deleting a player does not remove related matches/games; deleting a game does not reverse ELO.
   - Not a security issue, but it can cause inconsistency.

10. **Missing security headers**
    - No Content-Security-Policy, HSTS, or frame-ancestors restrictions are set.
    - **Recommendation:** set a strict CSP on the frontend host and add defensive headers to Express.

---

## Suggested Security Roadmap

1. Add a strict **Content-Security-Policy** and remove remaining inline event handlers.
2. Require and **hash admin passwords**.
3. Add **origin allow-listing** and basic **rate limiting**.
4. Add **per-player/game secret tokens** if online play needs integrity.
5. Add **security headers** (CSP, HSTS, X-Frame-Options/Frame-Ancestors).
6. (Optional) Generate QR codes locally instead of via a third-party service.

## Notes

- Convex production uses a DB-stored admin password (set via the app), with `ADMIN_PASSWORD` env as fallback.
- Online play has no player identity beyond selected names; this is by design for a small club but should be revisited for competitive use.
