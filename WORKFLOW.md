# Project Delivery Workflow

Tài liệu này là điểm bắt đầu để triển khai và bàn giao thay đổi trong dự án một cách nhất quán, có phạm vi rõ ràng và có bằng chứng kiểm tra.

## Hệ thống file

| File/thư mục | Vai trò | Khi nào dùng |
|---|---|---|
| `AGENTS.md` | Quy tắc làm việc ngắn của repository | Luôn áp dụng |
| `SPEC.md` | Mục tiêu, phạm vi và tiêu chí hoàn thành | Khi thêm hoặc đổi tính năng |
| `PLAN.md` | Milestone và lệnh xác minh | Trước tác vụ nhiều bước |
| `IMPLEMENT.md` | Runbook thực thi | Khi bắt đầu triển khai |
| `STATUS.md` | Trạng thái, bằng chứng và hạn chế | Sau mỗi milestone lớn |
| `prompts/` | Mẫu mô tả công việc theo từng giai đoạn | Khi giao hoặc tiếp nhận công việc |
| `docs/` | Kiến trúc, dữ liệu, UI, QA và vận hành | Đọc theo ngữ cảnh |
| `skills/fireant-stock-report/` | Quy trình tái sử dụng chuyên biệt | Khi tạo báo cáo FireAnt |

## Quy trình 8 bước

### 1. Xác định kết quả

Viết rõ điều gì phải tồn tại khi hoàn thành, ai sử dụng và cách kiểm chứng. Dùng `prompts/01-discovery.md` nếu yêu cầu còn mơ hồ.

### 2. Khóa phạm vi

Cập nhật `SPEC.md`: mục tiêu, phần không thực hiện, ràng buộc, deliverable và “done when”. Không bắt đầu triển khai nếu tiêu chí thành công chưa thể kiểm tra.

### 3. Lập kế hoạch

Dùng `prompts/02-plan.md`. Ghi milestone vào `PLAN.md`; mỗi milestone phải có đầu ra và lệnh xác minh riêng.

### 4. Thực thi theo phạm vi

Dùng `prompts/03-implement.md`. Giữ thay đổi đúng phạm vi, sửa lỗi phát sinh từ thay đổi hiện tại và không tự mở rộng sản phẩm.

### 5. Kiểm tra dữ liệu

Dùng `prompts/04-data-audit.md` khi thay đổi crawler, trường dữ liệu, công thức hoặc nhận định. Phân biệt rõ dữ liệu nguồn, phép biến đổi và suy luận.

### 6. Kiểm tra giao diện

Dùng `prompts/05-ui-qa.md`. Kiểm tra bằng bản render thật, không kết luận chỉ từ HTML/CSS source.

### 7. Chạy quality gate

Chạy `npm run verify`. Nếu có lỗi, sửa và chạy lại trước khi bàn giao.

### 8. Bàn giao

Dùng `prompts/06-release.md`; cập nhật `STATUS.md` với file đầu ra, lệnh đã chạy, kết quả, giới hạn và bước tiếp theo.

## Cấu trúc một yêu cầu công việc

Một yêu cầu rõ ràng thường có sáu phần:

1. **Outcome** — trạng thái cuối cần đạt.
2. **Context** — file và dữ liệu cần dùng.
3. **Scope** — file hoặc chức năng được phép thay đổi.
4. **Constraints** — điều phải giữ nguyên hoặc không được làm.
5. **Acceptance criteria** — các điều kiện kiểm tra được.
6. **Verification** — lệnh, bản render hoặc artifact chứng minh kết quả.

Với việc nhỏ, mô tả ngắn là đủ. Với việc dài, dùng `SPEC.md` và `PLAN.md` để giữ phạm vi ổn định thay vì đưa toàn bộ chi tiết vào một yêu cầu duy nhất.

## Mẫu giao việc nhanh

```text
Mục tiêu: <trạng thái cuối>.
Bối cảnh: đọc <các file liên quan>.
Phạm vi: chỉ thay đổi <file/chức năng>.
Ràng buộc: giữ nguyên <hành vi>; không <điều cấm>.
Hoàn thành khi: <tiêu chí đo được>.
Xác minh bằng: <lệnh/test/render>.
Hãy thực hiện end-to-end, sửa lỗi phát sinh từ thay đổi này và bàn giao các file đã đổi cùng bằng chứng kiểm tra.
```

## Cách review kết quả bàn giao

- Có file đầu ra thực tế hay chỉ có mô tả?
- Có kết quả kiểm tra hay chỉ có tuyên bố “đã xong”? 
- Có thay đổi ngoài phạm vi không?
- Có nêu nguồn dữ liệu, thời điểm lấy và giới hạn không?
- Có thể chạy lại trên máy khác theo README không?
- Có ghi nhận rủi ro hoặc giả định còn lại không?
