# Architecture

## Runtime flow

```text
cli.mjs
  ├─ src/fireant.mjs   fetch + bounded pagination
  ├─ src/analyze.mjs   pure transformations and metrics
  └─ src/report.mjs    escaped standalone HTML
        ↓
  data/<symbol>-<years>y.json
  reports/<symbol>-<years>y-report.html

server.mjs             local read-only preview
test/*.test.mjs        deterministic analysis tests
scripts/verify.mjs     end-to-end quality gate
```

## Module contracts

### `src/fireant.mjs`

Owns network I/O. It returns one raw object containing source metadata, company identity, selected profile fields, quotes, financials and normalized news metadata. It must not calculate investment metrics.

### `src/analyze.mjs`

Owns deterministic calculations. It accepts raw data and returns market, fundamental, news and assessment structures. It should remain testable without network access.

### `src/report.mjs`

Owns presentation. It accepts raw data plus analysis and returns one complete HTML string. External text must pass through HTML escaping. It must not fetch data.

### `cli.mjs`

Owns argument parsing and orchestration. It validates inputs, writes artifacts and returns a non-zero exit code on failure.

### `server.mjs`

Serves only files inside `reports/` on localhost. It is a preview utility, not a production server.

## Dependency policy

The current implementation uses only Node.js core and browser-native HTML/CSS/JS. Add a dependency only when the capability cannot be implemented safely and maintainably with the current stack. Record the reason, security impact and removal path.
