# UNKNOWN SMP Website

Modern Minecraft SMP landing page for UNKNOWN SMP.

## Files

- `index.html` — page structure and Persian join request UI
- `style.css` — neon purple glassmorphism design
- `script.js` — mobile navigation and Discord join-request webhook

## Current changes

- Donate section removed
- Best Players section removed
- Telegram section kept
- Request Join section translated to Persian
- Added admin approval notice
- Join form sends username, age, Telegram ID and reason to Discord
- A successful Telegram ID is blocked from submitting again **on the same browser/device**

## Important: one-request limit

GitHub Pages is static, so it cannot enforce a truly global one-request-per-Telegram-ID rule by itself. The current code uses `localStorage`, which prevents normal repeat submissions from the same browser.

For a real server-side one-request limit that cannot be bypassed by clearing browser storage or changing device, use a Cloudflare Worker + KV/D1 (or another backend) and store the Telegram ID there.

## Discord Webhook

The current webhook is already placed in `script.js`.

Security note: a Discord webhook embedded in browser JavaScript is public. Anyone who inspects the site can obtain it. For production, rotate the webhook and put it behind a serverless proxy.
