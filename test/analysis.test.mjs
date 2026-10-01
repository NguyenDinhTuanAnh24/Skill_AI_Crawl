import test from "node:test";
import assert from "node:assert/strict";
import { analyzeStock } from "../src/analyze.mjs";

test("computes price, fundamental, and news metrics deterministically", () => {
  const raw = {
    quotes: [
      { date: "2021-01-01", priceClose: 10, priceHigh: 11, priceLow: 9, adjRatio: 1, totalVolume: 100 },
      { date: "2022-01-01", priceClose: 12, priceHigh: 13, priceLow: 11, adjRatio: 1, totalVolume: 200 },
      { date: "2023-01-01", priceClose: 15, priceHigh: 16, priceLow: 12, adjRatio: 1, totalVolume: 300 }
    ],
    financials: [
      { year: 2023, financialValues: { NetSale: 150, ProfitAfterTax: 15, GrossMargin: 0.2, ROE: 0.15, TotalDebtOverEquity: 0.3 } },
      { year: 2021, financialValues: { NetSale: 100, ProfitAfterTax: 10, GrossMargin: 0.18, ROE: 0.1, TotalDebtOverEquity: 0.4 } }
    ],
    news: [{ title: "Lợi nhuận tăng mạnh", description: "Kết quả kinh doanh tích cực", date: "2023-01-01" }]
  };
  const result = analyzeStock(raw);
  assert.equal(Math.round(result.market.totalReturn), 50);
  assert.equal(result.market.yearly.length, 3);
  assert.ok(result.fundamentals.revenueCagr > 20);
  assert.equal(result.news.sentiment["Tích cực"], 1);
  assert.ok(result.assessment.score >= 0 && result.assessment.score <= 100);
});

test("divides FireAnt nominal prices by adjRatio", () => {
  const raw = {
    quotes: [
      { date: "2021-01-01", priceClose: 50, priceHigh: 52, priceLow: 48, adjRatio: 2, totalVolume: 100 },
      { date: "2022-01-01", priceClose: 30, priceHigh: 31, priceLow: 29, adjRatio: 1, totalVolume: 100 }
    ],
    financials: [],
    news: []
  };
  const result = analyzeStock(raw);
  assert.equal(result.market.firstClose, 25);
  assert.ok(Math.abs(result.market.totalReturn - 20) < 1e-9);
  assert.equal(result.market.yearly[0].high, 26);
});
