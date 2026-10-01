---
name: fireant-stock-report
description: Generate Vietnamese HTML stock research from public FireAnt data. Use when creating or refreshing a symbol report with price, fundamentals, and news; not for trading or personalized advice.
---

# FireAnt Stock Report

Create an evidence-backed, standalone HTML report from FireAnt's public guest-access data.

## Workflow

1. Confirm the requested symbol, time window, news count, and output path. When omitted, use `HPG`, 5 years, 60 news items, and `reports/HPG-5y-report.html`.
2. From the project root, run `node cli.mjs --symbol <SYMBOL> --years <1-10> --news <1-300>`. Do not paste, log, or persist the guest bearer token.
3. Check the command summary and open the generated HTML. Validate that price, financial, and news sections contain data, the retrieval timestamp is current, and the news controls work.
4. Report the absolute paths to the HTML and JSON snapshot. State that the score is rules-based and is not investment advice.

Use `FIREANT_TOKEN` only when the user supplies a valid token or the public bootstrap mechanism has changed. Do not bypass authentication, CAPTCHAs, rate limits, robots restrictions, or paid features. Stop after a repeated 401/403 instead of escalating scraping behavior.

Read only the reference needed for the task:

- [references/methodology.md](references/methodology.md) for calculations or scores.
- [references/fireant-data.md](references/fireant-data.md) for endpoints or response fields.
- [references/report-quality.md](references/report-quality.md) for HTML structure, visual changes or UI review.

For the bundled product, [scripts/run-report.mjs](scripts/run-report.mjs) runs the project CLI from any working directory.
