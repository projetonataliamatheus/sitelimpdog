import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(projectRoot, "src");
const distRoot = path.join(projectRoot, "dist");

const [template, styles, script] = await Promise.all([
  readFile(path.join(sourceRoot, "index.html"), "utf8"),
  readFile(path.join(sourceRoot, "styles.css"), "utf8"),
  readFile(path.join(sourceRoot, "script.js"), "utf8"),
]);

const styleMarker = '  <link rel="stylesheet" href="styles.css" data-build-inline>';
const scriptMarker = '  <script src="script.js" data-build-inline></script>';

if (!template.includes(styleMarker) || !template.includes(scriptMarker)) {
  throw new Error("Os marcadores de compilação não foram encontrados em src/index.html.");
}

const compiledHtml = template
  .replace(styleMarker, `  <style>\n${styles}\n  </style>`)
  .replace(scriptMarker, `  <script>\n${script}\n  </script>`);

await rm(distRoot, { recursive: true, force: true });
await mkdir(distRoot, { recursive: true });
await cp(path.join(sourceRoot, "assets"), path.join(distRoot, "assets"), {
  recursive: true,
});
await writeFile(path.join(distRoot, "index.html"), compiledHtml, "utf8");

console.log("Site compilado em dist/.");
