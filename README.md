# Unknown SMP Website

A clean, responsive landing page for **Unknown SMP**, built with plain HTML, CSS and JavaScript.

## Files

```text
unknown-smp-site/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── logo.png
```

## Run locally

No build step is required.

1. Upload the whole folder to GitHub.
2. Enable **GitHub Pages** from the repository settings, or use any static hosting provider.
3. Open `index.html` directly for a quick local preview.

## GitHub Pages

Recommended repository structure:

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── logo.png
```

In GitHub:

**Settings → Pages → Deploy from a branch → main → / (root)**

The site is static, so GitHub Pages can host it without a server.

## Customize

### Server IP
Find the **Server IP / Coming Soon** card in `index.html` and replace its text when the address is ready.

### Discord
Find the Discord card in `index.html` and replace it with your real invite link when available.

### Telegram
The Contact section currently points to a placeholder Telegram URL. Replace the `href` in `index.html` with your official community link.

### Top Players
The three placeholder player cards can be replaced with real player names, avatars and statistics.

### Rules
Edit the Rules section directly in `index.html`.

## Whitelist form

The whitelist form is fully styled and validates the following fields:

- Minecraft username
- Age
- Telegram (optional)
- Reason for joining
- Rules agreement

Because GitHub Pages is static, the form currently demonstrates a successful local submission and logs the application to the browser console.

To make it actually send applications to staff, replace the submit-handler section in `script.js` with one of:

- Your own backend/API endpoint
- A serverless function
- A form service
- A Discord webhook through a secure server-side proxy

**Do not put private Discord webhook URLs, API keys or bot tokens directly into `script.js`.**

## Design

- Dark modern visual system
- Glassmorphism cards
- Cyan + yellow Unknown SMP accent colors
- Smooth reveal animations
- Responsive navigation
- Mobile-first layout adjustments
- Reduced-motion support
- No framework or build dependency
