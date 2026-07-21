import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const prerenderDirectory = resolve(projectRoot, ".prerender");
const serverEntry = resolve(prerenderDirectory, "entry-server.js");
const outputHtml = resolve(projectRoot, "dist/index.html");

try {
  const [{ render }, template] = await Promise.all([
    import(pathToFileURL(serverEntry).href),
    readFile(outputHtml, "utf8"),
  ]);
  const appHtml = await render();

  if (!template.includes('<div id="root"></div>')) {
    throw new Error("Could not find the empty root element in dist/index.html");
  }

  const prerendered = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  );

  await writeFile(outputHtml, prerendered, "utf8");
  console.log(`Prerendered ${appHtml.length.toLocaleString()} characters into dist/index.html`);
} finally {
  await rm(prerenderDirectory, { recursive: true, force: true });
}
