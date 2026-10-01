#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { crawlFireAnt } from "./src/fireant.mjs";
import { analyzeStock } from "./src/analyze.mjs";
import { renderReport } from "./src/report.mjs";

function readArgs(argv) {
  const options = { symbol: "HPG", years: 5, news: 60, out: null };
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i + 1];
    if (argv[i] === "--symbol") options.symbol = String(value || "").toUpperCase();
    if (argv[i] === "--years") options.years = Number(value);
    if (argv[i] === "--news") options.news = Number(value);
    if (argv[i] === "--out") options.out = value;
  }
  if (!/^[A-Z0-9]{2,10}$/.test(options.symbol)) throw new Error("Mã cổ phiếu không hợp lệ.");
  if (!Number.isInteger(options.years) || options.years < 1 || options.years > 10) throw new Error("--years phải từ 1 đến 10.");
  if (!Number.isInteger(options.news) || options.news < 1 || options.news > 300) throw new Error("--news phải từ 1 đến 300.");
  return options;
}

async function main() {
  const options = readArgs(process.argv.slice(2));
  const reportPath = path.resolve(options.out || `reports/${options.symbol}-${options.years}y-report.html`);
  const dataPath = path.resolve(`data/${options.symbol}-${options.years}y.json`);

  console.log(`Đang lấy dữ liệu ${options.symbol} từ FireAnt...`);
  const raw = await crawlFireAnt(options);
  const analysis = analyzeStock(raw, options);
  const html = renderReport(raw, analysis, options);

  await fs.mkdir(path.dirname(dataPath), { recursive: true });
  await fs.mkdir(path.dirname(reportPath), { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify({ raw, analysis }, null, 2), "utf8");
  await fs.writeFile(reportPath, html, "utf8");

  console.log(`✓ ${raw.quotes.length} phiên giá, ${raw.financials.length} năm tài chính, ${raw.news.length} tin.`);
  console.log(`✓ Báo cáo: ${reportPath}`);
  console.log(`✓ Dữ liệu: ${dataPath}`);
}

main().catch((error) => {
  console.error(`Không tạo được báo cáo: ${error.message}`);
  process.exitCode = 1;
});
