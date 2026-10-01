#!/usr/bin/env node
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, "../../..");
const child = spawn(process.execPath, [path.join(projectRoot, "cli.mjs"), ...process.argv.slice(2)], {
  cwd: projectRoot,
  stdio: "inherit"
});
child.on("exit", (code) => process.exitCode = code ?? 1);
