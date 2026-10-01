# Testing and QA

## Quality pyramid

### Unit tests

`npm test` verifies deterministic calculations, including price adjustment. Add fixtures for every bug that could silently change financial meaning.

### Syntax checks

All executable `.mjs` files must pass `node --check`.

### End-to-end generation

`npm run report` proves guest bootstrap, API calls, analysis, JSON serialization and HTML generation work together.

### Artifact audit

`scripts/verify.mjs` checks meaningful invariants:

- minimum counts for default data;
- valid source timestamp and analysis fields;
- standalone HTML structure;
- no bearer token or embedded `accessToken`;
- no `undefined`, `NaN` or external script dependency;
- required source and limitation disclosures.

### Visual and interaction QA

When presentation changes:

1. Run `npm run serve`.
2. Inspect the hero, summary, chart, table, financial section and news section.
3. Click each news filter.
4. Verify eight initial results and progressive expansion.
5. Check a narrow viewport when the browser supports it.
6. Leave the report on “Tất cả” before handoff.

## Release gate

`npm run verify` must exit 0. A visual change also requires a real browser render; source inspection alone is insufficient.

## What not to test

Avoid tests that lock exact prose or visual pixel values without a product reason. Prefer behavioral invariants: correct calculation direction, safe escaping, bounded output and functioning controls.
