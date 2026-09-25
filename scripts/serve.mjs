import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(sourceRoot, relativePath);

    if (!filePath.startsWith(`${sourceRoot}${path.sep}`) && filePath !== path.join(sourceRoot, "index.html")) {
      response.writeHead(403).end("Acesso negado");
      return;
    }

    if (!(await stat(filePath)).isFile()) throw new Error("Arquivo não encontrado");
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
    });
    response.end(await readFile(filePath));
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Arquivo não encontrado");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Site disponível em http://127.0.0.1:${port}`);
});
