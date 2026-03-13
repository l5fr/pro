import express from "express";
import { createServer } from "http";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createBareServer } from "@tomphttp/bare-server-node";
import wisp from "@mercuryworkshop/wisp-server-node";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 8080;

const app = express();
const server = createServer(app);
const bareServer = createBareServer("/bare/");

// Serve static files (UV bundle, HTML, etc.)
app.use(express.static(join(__dirname, "../public")));

// Serve UV config + bundle from node_modules
app.use(
  "/uv/",
  express.static(
    join(__dirname, "../node_modules/@titaniumnetwork-dev/ultraviolet/dist")
  )
);

// Catch-all → serve index.html (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../public/index.html"));
});

// Handle bare server (HTTP transport)
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  }
});

// Handle WISP (WebSocket transport — needed for YouTube etc.)
server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else if (req.url.startsWith("/wisp/")) {
    wisp.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

server.listen(PORT, () => {
  console.log(`\n🌙 DaydreamX is running!`);
  console.log(`   Open: http://localhost:${PORT}\n`);
});
