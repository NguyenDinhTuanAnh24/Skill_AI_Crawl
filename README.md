# FireAnt HPG — báo cáo 5 năm

Ứng dụng Node.js không cần cài package ngoài. Nó lấy dữ liệu công khai từ FireAnt, lưu snapshot JSON và tạo một báo cáo HTML độc lập có thể gửi hoặc mở offline.

## Quy trình triển khai

Đọc [WORKFLOW.md](WORKFLOW.md) trước. Dự án dùng bốn file để quản lý phạm vi và tiến độ:

- [SPEC.md](SPEC.md) — mục tiêu, phạm vi và tiêu chí hoàn thành.
- [PLAN.md](PLAN.md) — milestone và bằng chứng cần có.
- [IMPLEMENT.md](IMPLEMENT.md) — runbook thực thi.
- [STATUS.md](STATUS.md) — trạng thái, kết quả kiểm tra và giới hạn.

`AGENTS.md` chứa quy tắc repository. Mẫu mô tả công việc theo từng giai đoạn nằm trong [prompts/00-index.md](prompts/00-index.md). Tài liệu kiến trúc, dữ liệu, UI, QA và vận hành nằm trong `docs/`.

## Chạy ngay

Yêu cầu Node.js 20 trở lên.

```powershell
npm run report
npm run serve
```

Mở `http://localhost:4173`. Báo cáo cũng nằm tại `reports/HPG-5y-report.html` và có thể mở trực tiếp bằng trình duyệt.

Tùy chọn:

```powershell
node cli.mjs --symbol HPG --years 5 --news 100 --out reports/hpg.html
node cli.mjs --symbol FPT --years 3 --news 40
```

Nếu FireAnt thay đổi cơ chế bootstrap, có thể truyền token khách hợp lệ bằng biến môi trường `FIREANT_TOKEN`. Công cụ chỉ đọc endpoint công khai, giới hạn số trang và không tự động vượt đăng nhập/chống bot.

## Dùng như AI skill

Skill dự án nằm trong `skills/fireant-stock-report/`. Có thể sử dụng trực tiếp `skills/fireant-stock-report/SKILL.md`, hoặc sao chép thư mục đó vào thư mục skills cá nhân để tái sử dụng workflow.

## Kết quả và giới hạn

- Giá: lợi suất, CAGR, độ biến động, drawdown, MA50/MA200 và thống kê theo năm.
- Cơ bản: doanh thu, lợi nhuận sau thuế, biên lợi nhuận, ROE và đòn bẩy từ báo cáo năm.
- Tin tức: số lượng, nhịp xuất bản, nhóm chủ đề và sắc thái dựa trên từ khóa tiếng Việt.
- Điểm tổng hợp là mô hình quy tắc minh bạch, không phải dự báo giá hay khuyến nghị mua/bán.
- FireAnt có thể sửa API hoặc điều khoản sử dụng; hãy kiểm tra quyền khai thác trước khi chạy ở quy mô lớn hay dùng thương mại.

Chạy toàn bộ quality gate:

```powershell
npm run verify
```

## Cấu trúc chính

```text
AGENTS.md / WORKFLOW.md
SPEC.md / PLAN.md / IMPLEMENT.md / STATUS.md
prompts/                    Prompt theo từng giai đoạn
docs/                       Kiến trúc, data, UI, QA, vận hành
skills/fireant-stock-report Skill + references + runner
src/                        Fetch, analysis, HTML renderer
scripts/verify.mjs          Full quality gate
test/                       Unit tests
data/                       JSON snapshots
reports/                    HTML artifacts
```
