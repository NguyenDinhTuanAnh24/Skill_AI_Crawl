# Prompt — Release

```text
Chuẩn bị bàn giao phiên bản hiện tại của FireAnt Stock Report.

Đọc `docs/05-testing-and-qa.md`, `docs/06-operations.md` và `docs/08-handoff-checklist.md`.

Thực hiện:
1. Chạy `npm run verify`.
2. Nếu giao diện thay đổi, render và kiểm tra tương tác thật.
3. Kiểm tra artifact không chứa token, `undefined`, `NaN` hoặc external script dependency.
4. Cập nhật `STATUS.md` bằng kết quả thực tế, không dùng kết quả cũ.
5. Đối chiếu deliverable với `SPEC.md` và milestone trong `PLAN.md`.

Nếu quality gate lỗi, sửa lỗi trong phạm vi và chạy lại. Bàn giao ngắn gọn: outcome, artifact, record counts, tests, visual QA, limitations và lệnh chạy lại.
```
