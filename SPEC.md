# Product specification — FireAnt Stock Report

## 1. Problem

Người dùng cần một công cụ có thể thu thập dữ liệu công khai về cổ phiếu trên FireAnt, phân tích nhiều năm và tạo báo cáo HTML tiếng Việt dễ đọc mà không cần cài framework hay dịch vụ bên ngoài.

## 2. Primary user

Người nghiên cứu chứng khoán muốn có một báo cáo định lượng có nguồn, chạy lại được và đủ rõ để trình bày nội bộ. Báo cáo không thay thế tư vấn đầu tư được cấp phép.

## 3. Goals

- Nhận mã cổ phiếu, số năm và số lượng tin từ CLI.
- Thu thập hồ sơ, giá, tài chính năm và tin từ luồng guest-access công khai của FireAnt.
- Lưu snapshot JSON để truy vết.
- Phân tích hiệu suất, rủi ro, xu hướng, tài chính và thống kê tin.
- Xuất một file HTML standalone, responsive, in được và mở offline.
- Cung cấp skill để AI tái thực hiện workflow nhất quán.

## 4. Non-goals

- Không đăng nhập, đặt lệnh hoặc truy cập dữ liệu trả phí.
- Không vượt CAPTCHA, rate limit hoặc cơ chế kiểm soát truy cập.
- Không dự báo giá mục tiêu hoặc đưa khuyến nghị cá nhân hóa.
- Không coi phân loại từ khóa là phân tích cảm xúc chính xác tuyệt đối.
- Không vận hành crawler quy mô lớn hoặc thương mại khi chưa rà soát điều khoản nguồn.

## 5. Inputs

| Input | Mặc định | Giới hạn |
|---|---:|---:|
| `symbol` | `HPG` | 2–10 ký tự chữ/số |
| `years` | `5` | 1–10 |
| `news` | `60` | 1–300 |
| `out` | `reports/<SYMBOL>-<N>y-report.html` | Đường dẫn local |

## 6. Deliverables

- CLI chạy bằng Node.js 20+.
- JSON snapshot trong `data/`.
- HTML report trong `reports/`.
- Local preview server.
- Unit tests và full verification command.
- Skill trong `skills/fireant-stock-report/`.
- Tài liệu quy trình và mẫu mô tả công việc theo từng giai đoạn.

## 7. Functional requirements

1. Token guest chỉ tồn tại trong bộ nhớ.
2. Request có timeout, phân trang hữu hạn và khoảng nghỉ giữa các trang.
3. Giá được sắp theo thời gian và điều chỉnh đúng theo dữ liệu FireAnt.
4. Null phải được giữ là thiếu dữ liệu, không âm thầm đổi thành 0 trong chỉ số tài chính.
5. Report phải hiển thị thời điểm lấy, nguồn, phương pháp và tuyên bố giới hạn.
6. Tin tức phải liên kết tới FireAnt và nguồn gốc khi có.
7. Danh sách tin mặc định thu gọn và có bộ lọc hoạt động bằng JavaScript nội tuyến.

## 8. Quality requirements

- Không phụ thuộc package runtime ngoài Node.js core.
- Không có token/API secret trong JSON, HTML, log hay Git.
- Bảng và biểu đồ đọc được ở desktop và mobile.
- Bảng màu trung tính, một màu xanh chủ đạo; màu cảnh báo chỉ dùng khi có ý nghĩa.
- Các phép tính cốt lõi có unit test.
- Báo cáo phải vượt audit trong `scripts/verify.mjs`.

## 9. Done when

```powershell
npm run verify
```

hoàn thành với exit code 0; báo cáo mở được tại `http://localhost:4173`; bộ lọc và “Xem thêm” hoạt động; các giới hạn dữ liệu/đầu tư hiện diện trong HTML; `STATUS.md` phản ánh đúng trạng thái.
