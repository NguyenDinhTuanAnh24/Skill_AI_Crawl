# Product overview

## What it does

The app turns public FireAnt data into a Vietnamese stock brief:

1. Bootstrap a guest token from the public symbol page.
2. Fetch company, profile, historical prices, annual financials and tagged news.
3. Normalize and analyze the data.
4. Save a JSON snapshot.
5. Render a standalone HTML report.

## User journey

```powershell
npm run report
npm run serve
```

The user opens `http://localhost:4173`, reads the summary, inspects price/fundamental tables, filters news and follows source links when deeper context is needed.

## Success indicators

- A non-technical user can understand the top summary without reading methodology first.
- A reviewer can trace every section to FireAnt data and the saved snapshot.
- A developer can regenerate and validate the report using documented commands.
- Failure is explicit: no fabricated fallback market data.
