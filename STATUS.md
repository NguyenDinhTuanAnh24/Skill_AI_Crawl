# Project status

Last updated: 2026-10-01

## Current state

- Product status: runnable end-to-end.
- Default report: `reports/HPG-5y-report.html`.
- Default snapshot: `data/HPG-5y.json`.
- Runtime: Node.js 20+ with no external package dependency.
- Source: public FireAnt guest-access flow.

## Latest verified evidence

- 1,246 historical sessions fetched for the five-year HPG run.
- Five annual financial periods and 60 news items fetched.
- Unit tests: 2 passed, 0 failed.
- Full `npm run verify` gate: passed, including syntax, documentation links, fresh crawl and artifact security checks.
- Project workflow documents and staged task templates are present.
- HTML visually inspected in the local browser.
- News filter showed 8 positive items initially and 16 after expansion in the latest interaction test.
- The historical adjustment rule divides nominal prices by `adjRatio` when `adjClose` is absent.

## Known limitations

- FireAnt can change its guest token or API contract without notice.
- News sentiment and topic tagging are keyword heuristics.
- The latest financial year may lag the latest market date.
- The score is a transparent rules-based summary, not valuation or personalized advice.
- The current report does not compare against a benchmark index.

## Next recommended check

Run `npm run verify` before presenting or committing a new report. For UI changes, additionally open `npm run serve` and inspect both the top summary and news interactions.
