// Serve the production export locally, including a GitHub Pages repository prefix.
// This is a preview/test server, not a production hosting service.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, sep, extname } from "node:path";

const root = resolve("out");
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const port = Number(process.env.PREVIEW_PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

createServer(async (request, response) => {
  try {
    let path = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (prefix) {
      if (path !== prefix && !path.startsWith(`${prefix}/`)) {
        response.writeHead(404).end();
        return;
      }
      path = path.slice(prefix.length);
    }
    let file = resolve(root, `.${path || "/"}`);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end();
      return;
    }
    if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
    response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(resolve(root, "404.html")).catch(() => "Not found"));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Production preview: http://127.0.0.1:${port}${prefix}/`);
});
