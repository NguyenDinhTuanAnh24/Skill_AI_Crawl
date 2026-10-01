#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function run(label, args) {
  console.log(`\n[verify] ${label}`);
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit" });
  if (result.status !== 0) throw new Error(`${label} thất bại với exit code ${result.status ?? "unknown"}.`);
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

run("Unit tests", ["--test"]);

for (const file of [
  "cli.mjs",
  "server.mjs",
  "src/fireant.mjs",
  "src/analyze.mjs",
  "src/report.mjs",
  "skills/fireant-stock-report/scripts/run-report.mjs",
  "scripts/check-doc-links.mjs",
  "scripts/verify.mjs"
]) run(`Syntax ${file}`, ["--check", file]);

run("Documentation links", ["scripts/check-doc-links.mjs"]);

run("Fresh HPG report", ["cli.mjs", "--symbol", "HPG", "--years", "5", "--news", "60"]);

const dataPath = path.join(root, "data", "HPG-5y.json");
const reportPath = path.join(root, "reports", "HPG-5y-report.html");
const dataText = fs.readFileSync(dataPath, "utf8");
const html = fs.readFileSync(reportPath, "utf8");
const snapshot = JSON.parse(dataText);

assert(snapshot.raw.quotes.length >= 1000, "Default report should contain at least 1,000 price sessions.");
assert(snapshot.raw.financials.length >= 5, "Default report should contain at least five annual periods.");
assert(snapshot.raw.news.length === 60, "Default report should contain exactly 60 requested news items.");
assert(Number.isFinite(Date.parse(snapshot.raw.source.retrievedAt)), "Source retrieval timestamp is invalid.");
assert(Number.isFinite(snapshot.analysis.market.totalReturn), "Total return is not finite.");
assert(snapshot.analysis.market.firstClose > 0 && snapshot.analysis.market.lastClose > 0, "Adjusted prices must be positive.");

for (const required of [
  '<html lang="vi">',
  "Tóm tắt nhanh",
  "Diễn biến giá",
  "Phương pháp & giới hạn",
  "không phải khuyến nghị đầu tư",
  "Xem thêm tin",
  "FireAnt"
]) assert(html.includes(required), `HTML is missing required content: ${required}`);

for (const forbidden of ["accessToken", "Bearer ", "undefined", "NaN", "<script src=", '<link rel="stylesheet"']) {
  assert(!html.includes(forbidden), `HTML contains forbidden content: ${forbidden}`);
  assert(!dataText.includes(forbidden), `Snapshot contains forbidden content: ${forbidden}`);
}

console.log("\n[verify] PASS");
console.log(`[verify] Quotes: ${snapshot.raw.quotes.length}`);
console.log(`[verify] Financial periods: ${snapshot.raw.financials.length}`);
console.log(`[verify] News: ${snapshot.raw.news.length}`);
console.log(`[verify] Report: ${reportPath}`);
