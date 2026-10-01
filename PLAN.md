# Delivery plan

Mỗi milestone chỉ được đánh dấu hoàn thành khi có bằng chứng ở cột Verification. Nếu lệnh kiểm tra lỗi, sửa trước khi chuyển mốc.

| Milestone | Trạng thái | Đầu ra | Verification |
|---|---|---|---|
| M1 — Data access | Hoàn thành | Guest bootstrap, API client, bounded pagination | `npm run report` lấy được quote/financial/news |
| M2 — Analysis | Hoàn thành | Return, CAGR, volatility, drawdown, MA, fundamentals, news stats | `npm test` |
| M3 — HTML report | Hoàn thành | Standalone responsive report, concise news UI | Browser render + interaction smoke test |
| M4 — AI skill | Hoàn thành | `SKILL.md`, metadata, references, runner | Skill structure check + runner syntax check |
| M5 — Project workflow | Hoàn thành | AGENTS, spec, plan, runbook, status, docs, task templates | `npm run verify` + link audit |

## Future candidates

- Compare HPG with VNINDEX or an industry benchmark.
- Add an explicit offline regeneration mode from an existing snapshot.
- Add quarterly financial trends.
- Add export to PDF only if requested and visually verified.

Future candidates are not authorized scope until moved into `SPEC.md` and an active milestone.
