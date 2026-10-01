# Implementation runbook

Use this file when changing the product.

## Before editing

1. Restate the requested outcome and measurable acceptance criteria.
2. Read `AGENTS.md` and only the context-specific documents it routes to.
3. Inspect relevant code and existing user changes.
4. For multi-file work, update `PLAN.md` or state the small execution sequence in the task.

## During implementation

- Keep changes within the agreed files and behavior.
- Prefer Node.js core; justify any new dependency in `STATUS.md` and architecture docs.
- Preserve raw source values in the snapshot and make transformations explicit in analysis.
- Escape all external text before placing it into HTML.
- Never log or serialize the guest token.
- After each material milestone, run its narrowest relevant check.

## Stop-and-fix rule

Do not continue past a failed test, syntax check, data-contract check or broken render caused by the current change. Diagnose, repair and rerun the failed check. If the source is unavailable, record the exact blocker and do not fabricate data.

## Before completion

1. Run `npm run verify`.
2. If UI changed, inspect the served HTML and test interactive controls.
3. Update documentation when behavior, fields, calculations, commands or constraints changed.
4. Update `STATUS.md` with evidence and known limitations.
5. Report changed files, output artifact, commands run and any remaining risk.
