# Workflow map

## File flow

```text
User request
   ↓
SPEC.md ── defines outcome, scope, constraints, done
   ↓
PLAN.md ── breaks work into verifiable milestones
   ↓
IMPLEMENT.md ── defines the execution runbook
   ↓
src/ + tests/ + skill/ ── implementation
   ↓
npm run verify ── evidence gate
   ↓
STATUS.md ── records result, evidence, limitations
```

`AGENTS.md` is the router across this flow. Keep it short. The `prompts/` folder contains reusable task descriptions; the skill contains FireAnt-specific operating knowledge.

## Change routing

| Change type | Read first | Required check |
|---|---|---|
| CLI/input | `SPEC.md`, `docs/02-architecture.md` | CLI smoke test + `npm test` |
| FireAnt endpoint/field | `docs/03-data-pipeline.md`, skill data reference | Fresh crawl + token leak audit |
| Calculation/score | Skill methodology reference | Unit tests with deterministic fixture |
| HTML/CSS/interaction | `docs/04-design-system.md` | Generate + browser inspection |
| Release/runbook | `docs/06-operations.md` | `npm run verify` |
| Security/legal | `docs/07-security-and-compliance.md` | Secret scan + scope review |

## Evidence hierarchy

From strongest to weakest:

1. Automated test or audit output.
2. Rendered artifact inspected in a browser.
3. Structured snapshot with source timestamp.
4. Source-code inspection.
5. Assumption or narrative description.

Completion claims should cite the strongest available evidence.
