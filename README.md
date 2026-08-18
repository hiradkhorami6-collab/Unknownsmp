# UNKNOWN SMP Website

A modern Minecraft SMP landing page for UNKNOWN SMP.

## Files

- `index.html` — page structure and content
- `style.css` — responsive neon-purple glassmorphism design
- `script.js` — mobile navigation, active navigation state and Discord application webhook

## GitHub Pages

Upload the three files to a GitHub repository and enable GitHub Pages from:

Settings → Pages → Deploy from branch

## Minecraft skins

The three player skins are loaded automatically from UUID-based `mc-heads.net` URLs. No `assets` folder is required.

## Discord webhook

Open `script.js` and replace:

`PASTE_YOUR_DISCORD_WEBHOOK_HERE`

with your Discord webhook URL.

### Important security note

A Discord webhook URL embedded in browser-side JavaScript is public to anyone who can inspect the website. For a production site, a serverless endpoint/proxy is safer. GitHub Pages itself cannot keep a webhook URL secret.

If you use the browser-side webhook exactly as implemented here, restrict/rotate the webhook if it becomes exposed or abused.
