# Repository instructions

This repository builds standalone Vietnamese stock-research HTML from public FireAnt data.

## Work by context

- Read `SPEC.md` when scope or product behavior changes.
- Read `docs/02-architecture.md` for module boundaries.
- Read `docs/03-data-pipeline.md` when changing FireAnt access or fields.
- Read `skills/fireant-stock-report/references/methodology.md` when changing calculations or scores.
- Read `docs/04-design-system.md` for report UI work.
- Read `docs/05-testing-and-qa.md` before release or broad refactors.
- Do not load every document for small, isolated edits.

## Commands

- Generate: `npm run report`
- Preview: `npm run serve`
- Unit tests: `npm test`
- Full verification: `npm run verify`

## Invariants

- Never persist, print, or commit a FireAnt bearer token.
- Do not bypass login, CAPTCHA, access controls, rate limits, or paid features.
- Keep the HTML standalone and readable offline after generation.
- Label rules-based sentiment and scoring as heuristic, not investment advice.
- Preserve Vietnamese copy and use a neutral visual system with one primary accent.
- Keep changes scoped; do not rewrite unrelated user work.

## Done means

The requested behavior works, affected tests pass, the generated HTML is inspected when presentation changes, documentation is updated when contracts change, and `STATUS.md` records material verification or known limitations.
