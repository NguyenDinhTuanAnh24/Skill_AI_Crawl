function number(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function average(values) {
  const clean = values.filter(Number.isFinite);
  return clean.length ? clean.reduce((sum, value) => sum + value, 0) / clean.length : null;
}

function pctChange(from, to) {
  return from > 0 && Number.isFinite(to) ? (to / from - 1) * 100 : null;
}

function cagr(from, to, years) {
  return from > 0 && to > 0 && years > 0 ? (Math.pow(to / from, 1 / years) - 1) * 100 : null;
}

function stdDev(values) {
  if (values.length < 2) return null;
  const mean = average(values);
  return Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (values.length - 1));
}

function classifySentiment(item) {
  const text = `${item.title || ""} ${item.description || ""}`.toLocaleLowerCase("vi");
  const positive = ["tăng trưởng", "tăng mạnh", "lợi nhuận tăng", "kỷ lục", "tích cực", "bứt phá", "mua ròng", "hồi phục", "khởi sắc", "vượt kế hoạch"];
  const negative = ["sụt giảm", "giảm mạnh", "lợi nhuận giảm", "thua lỗ", "tiêu cực", "bán ròng", "điều tra", "xử phạt", "rủi ro", "suy yếu"];
  const score = positive.filter((term) => text.includes(term)).length - negative.filter((term) => text.includes(term)).length;
  return score > 0 ? "Tích cực" : score < 0 ? "Tiêu cực" : "Trung tính";
}

function topicOf(item) {
  const text = `${item.title || ""} ${item.description || ""}`.toLocaleLowerCase("vi");
  const topics = [
    ["Kết quả kinh doanh", ["lợi nhuận", "doanh thu", "kết quả kinh doanh", "quý"]],
    ["Sản xuất & dự án", ["dung quất", "sản lượng", "nhà máy", "đầu tư", "công suất"]],
    ["Thị trường thép", ["giá thép", "h(rc|rc)", "quặng", "thép xây dựng", "nhập khẩu"]],
    ["Dòng tiền", ["khối ngoại", "mua ròng", "bán ròng", "thanh khoản", "dòng tiền"]],
    ["Doanh nghiệp", ["cổ tức", "đại hội", "cổ đông", "lãnh đạo", "phát hành"]]
  ];
  return topics.find(([, terms]) => terms.some((term) => text.includes(term)))?.[0] || "Khác";
}

function points(value, thresholds) {
  for (const [minimum, score] of thresholds) if (value >= minimum) return score;
  return 0;
}

export function analyzeStock(raw) {
  const quotes = [...raw.quotes]
    .map((quote) => ({
      ...quote,
      closeAdjusted: number(quote.adjClose) ?? ((number(quote.priceClose) || 0) / (number(quote.adjRatio) || 1)),
      highAdjusted: (number(quote.priceHigh) || number(quote.priceClose) || 0) / (number(quote.adjRatio) || 1),
      lowAdjusted: (number(quote.priceLow) || number(quote.priceClose) || 0) / (number(quote.adjRatio) || 1)
    }))
    .filter((quote) => quote.closeAdjusted > 0 && quote.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const closes = quotes.map((quote) => quote.closeAdjusted);
  const first = quotes[0];
  const last = quotes.at(-1);
  const elapsedYears = Math.max((new Date(last.date) - new Date(first.date)) / 31_557_600_000, 1 / 365);
  const dailyReturns = closes.slice(1).map((close, index) => Math.log(close / closes[index])).filter(Number.isFinite);

  let peak = closes[0];
  let maxDrawdown = 0;
  for (const close of closes) {
    peak = Math.max(peak, close);
    maxDrawdown = Math.min(maxDrawdown, (close / peak - 1) * 100);
  }

  const byYear = new Map();
  for (const quote of quotes) {
    const year = new Date(quote.date).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push(quote);
  }
  const yearly = [...byYear.entries()].map(([year, rows]) => ({
    year,
    start: rows[0].closeAdjusted,
    end: rows.at(-1).closeAdjusted,
    returnPct: pctChange(rows[0].closeAdjusted, rows.at(-1).closeAdjusted),
    high: Math.max(...rows.map((row) => row.highAdjusted)),
    low: Math.min(...rows.map((row) => row.lowAdjusted)),
    averageVolume: average(rows.map((row) => number(row.totalVolume)))
  }));

  const financials = [...raw.financials].sort((a, b) => a.year - b.year);
  const financialSeries = financials.map((period) => {
    const f = period.financialValues || {};
    const revenue = number(f.NetSale) ?? number(f.TotalRevenue);
    const profit = number(f.ProfitAfterTax) ?? number(f.ParentCompanyShareholderProfitAfterTax);
    return {
      year: period.year,
      revenue,
      profit,
      grossMargin: number(f.GrossMargin) ?? (revenue ? number(f.GrossProfit) / revenue : null),
      netMargin: revenue ? profit / revenue : null,
      roe: number(f.ROE),
      debtToEquity: number(f.TotalDebtOverEquity),
      operatingCashFlow: number(f.CashflowFromOperatingActivity)
    };
  }).filter((period) => period.revenue);
  const fFirst = financialSeries[0];
  const fLast = financialSeries.at(-1);
  const fYears = fFirst && fLast ? Math.max(fLast.year - fFirst.year, 1) : 1;
  const fundamentals = {
    series: financialSeries,
    revenueCagr: fFirst && fLast ? cagr(fFirst.revenue, fLast.revenue, fYears) : null,
    profitCagr: fFirst && fLast ? cagr(fFirst.profit, fLast.profit, fYears) : null,
    latestGrossMargin: fLast?.grossMargin ?? null,
    latestNetMargin: fLast?.netMargin ?? null,
    latestRoe: fLast?.roe ?? null,
    latestDebtToEquity: fLast?.debtToEquity ?? null
  };

  const annotatedNews = raw.news.map((item) => ({ ...item, sentiment: classifySentiment(item), topic: topicOf(item) }));
  const sentiment = { "Tích cực": 0, "Trung tính": 0, "Tiêu cực": 0 };
  const topics = {};
  for (const item of annotatedNews) {
    sentiment[item.sentiment] += 1;
    topics[item.topic] = (topics[item.topic] || 0) + 1;
  }

  const oneYearStart = quotes.find((quote) => new Date(quote.date) >= new Date(new Date(last.date).setFullYear(new Date(last.date).getFullYear() - 1))) || first;
  const oneYearReturn = pctChange(oneYearStart.closeAdjusted, last.closeAdjusted);
  const sma50 = average(closes.slice(-50));
  const sma200 = average(closes.slice(-200));
  const scoreParts = {
    momentum: points(oneYearReturn ?? -999, [[25, 30], [10, 24], [0, 18], [-10, 10]]),
    trend: last.closeAdjusted > sma200 ? 10 : last.closeAdjusted > sma50 ? 6 : 2,
    drawdown: points(maxDrawdown, [[-15, 15], [-30, 10], [-45, 5]]),
    revenue: points(fundamentals.revenueCagr ?? -999, [[15, 15], [7, 12], [0, 8], [-5, 4]]),
    profit: points(fundamentals.profitCagr ?? -999, [[20, 15], [8, 12], [0, 8], [-10, 4]]),
    margin: points((fundamentals.latestNetMargin ?? -1) * 100, [[15, 10], [8, 8], [3, 5]]),
    leverage: points(fundamentals.latestDebtToEquity ?? 999, [[0, 5]])
  };
  if ((fundamentals.latestDebtToEquity ?? 999) > 0.6) scoreParts.leverage = 1;
  else if ((fundamentals.latestDebtToEquity ?? 999) > 0.35) scoreParts.leverage = 3;
  const score = Object.values(scoreParts).reduce((sum, value) => sum + value, 0);

  return {
    prices: quotes,
    market: {
      firstDate: first.date,
      lastDate: last.date,
      firstClose: first.closeAdjusted,
      lastClose: last.closeAdjusted,
      totalReturn: pctChange(first.closeAdjusted, last.closeAdjusted),
      cagr: cagr(first.closeAdjusted, last.closeAdjusted, elapsedYears),
      oneYearReturn,
      annualVolatility: (stdDev(dailyReturns) ?? 0) * Math.sqrt(252) * 100,
      maxDrawdown,
      sma50,
      sma200,
      averageDailyVolume: average(quotes.map((quote) => number(quote.totalVolume))),
      yearly
    },
    fundamentals,
    news: { items: annotatedNews, sentiment, topics },
    assessment: {
      score,
      scoreParts,
      label: score >= 70 ? "Tích cực" : score >= 50 ? "Cân bằng" : "Thận trọng",
      summary: score >= 70
        ? "Động lượng và nền tảng dữ liệu đang ở vùng thuận lợi theo mô hình quy tắc."
        : score >= 50
          ? "Các tín hiệu tích cực và rủi ro đang đan xen; cần theo dõi chu kỳ thép và biên lợi nhuận."
          : "Dữ liệu cho thấy rủi ro chu kỳ hoặc xu hướng còn đáng kể; ưu tiên quản trị rủi ro."
    }
  };
}
