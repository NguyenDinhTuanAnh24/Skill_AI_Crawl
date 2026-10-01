#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ignored = new Set([".git", "data", "reports", "node_modules"]);

function markdownFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...markdownFiles(target));
    else if (entry.isFile() && entry.name.endsWith(".md")) files.push(target);
  }
  return files;
}

const failures = [];
let checked = 0;
for (const file of markdownFiles(root)) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const link = match[1].trim();
    if (/^(?:[a-z]+:|#)/i.test(link)) continue;
    const local = decodeURIComponent(link.split("#")[0]);
    const target = path.resolve(path.dirname(file), local);
    checked += 1;
    if (!fs.existsSync(target)) failures.push(`${path.relative(root, file)} -> ${link}`);
  }
}

if (failures.length) {
  console.error("Broken local Markdown links:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Documentation links: ${checked} checked, 0 broken.`);
}
