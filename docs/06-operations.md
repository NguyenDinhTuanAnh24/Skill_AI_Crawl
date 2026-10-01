# Operations runbook

## Standard generation

```powershell
npm run report
```

Custom run:

```powershell
node cli.mjs --symbol FPT --years 3 --news 40 --out reports/FPT-3y-report.html
```

## Preview

```powershell
npm run serve
```

Open `http://localhost:4173`. The server binds to `127.0.0.1` and serves only the `reports/` directory.

## Full verification

```powershell
npm run verify
```

This command runs unit tests, syntax checks, a fresh default report and artifact audits.

## Troubleshooting

### 401/403 from FireAnt

Guest access may have changed. Verify the public symbol page manually. Use `FIREANT_TOKEN` only when the user provides a valid token or has authorization. Never commit it.

### Empty prices

Confirm the symbol is listed and the requested date window contains sessions. Do not generate a success report with an empty chart.

### Report exists but preview is 404

Run the default `npm run report`, or pass an output filename that matches what `server.mjs` serves at `/`.

### Changed API fields

Capture a minimal sanitized example, update `docs/03-data-pipeline.md`, implementation and tests in one change.

## Handoff packet

Include:

- exact artifact path;
- retrieval timestamp;
- record counts;
- verification command and result;
- known data limitations;
- whether UI was visually inspected.
