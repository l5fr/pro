# 🌙 DaydreamX — Self-Hosted Proxy Browser

A browser-in-browser proxy using **Ultraviolet** + **WISP**, capable of loading YouTube, Discord, and most sites that block simple iframe embeds.

---

## How it works

- **Ultraviolet** — rewrites all URLs inside the proxied page so every request (JS, CSS, API calls, video streams) flows through your server
- **WISP** — a WebSocket-based TCP tunnel so the server can make real network connections on behalf of the browser
- **Service Worker** — intercepts all requests from the iframe and routes them through the proxy seamlessly

---

## Setup

### Requirements
- Node.js 18+
- npm

### Install & run

```bash
npm install
npm start
```

Then open **http://localhost:8080** in your browser.

For development with auto-restart:
```bash
npm run dev
```

---

## Deploy (free options)

### Railway
1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Set start command: `npm start`
4. Done — Railway gives you a public URL

### Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Build command: `npm install`
4. Start command: `npm start`
5. Free tier works fine

### Replit
1. Upload the files to a new Replit Node.js project
2. Click Run
3. Share the Replit URL

---

## Project structure

```
daydream/
├── src/
│   └── server.js          # Express + WISP + Bare server
├── public/
│   ├── index.html         # The browser UI
│   └── uv.config.js       # Ultraviolet configuration
├── package.json
└── README.md
```

---

## Notes

- YouTube, Twitch, Discord, Reddit all work via the WISP tunnel
- Some sites with very strict CSP headers may still block proxying
- For best results, deploy on a server with good bandwidth
