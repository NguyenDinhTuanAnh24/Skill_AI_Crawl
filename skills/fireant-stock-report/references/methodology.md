# Methodology

## Price

- Sort sessions ascending by date.
- Prefer `adjClose`; otherwise use `priceClose / adjRatio` (FireAnt's ratio converts the historical nominal quote to a comparable adjusted quote).
- Total return: `last / first - 1`.
- CAGR uses elapsed calendar years.
- Annualized volatility: sample standard deviation of daily log returns times `sqrt(252)`.
- Maximum drawdown: worst percentage fall from a running peak.
- MA50 and MA200 are simple averages of the latest 50 and 200 adjusted closes.

## Fundamentals

Use annual periods, ordered oldest to newest. Revenue prefers `NetSale`, then `TotalRevenue`. Profit prefers `ProfitAfterTax`, then parent-company profit. Preserve nulls instead of coercing unavailable fields to zero.

## News

The report classifies title plus description with an auditable Vietnamese keyword list. Treat neutral as "no decisive keyword", not proof of neutral meaning. Always link readers to the source.

## Rules-based score

The 100-point score combines momentum (30), trend (10), drawdown (15), revenue CAGR (15), profit CAGR (15), net margin (10), and leverage (5). Labels are descriptive data summaries, not buy/hold/sell recommendations.
