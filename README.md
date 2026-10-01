# FireAnt Stock Report

Công cụ dòng lệnh dùng Node.js để lấy dữ liệu cổ phiếu công khai từ FireAnt, phân tích dữ liệu nhiều năm và xuất báo cáo HTML tiếng Việt.

Bản mặc định tạo báo cáo 5 năm cho mã HPG với 60 tin gần nhất. Công cụ cũng có thể chạy cho các mã khác bằng tham số CLI.

## Chức năng hiện có

- Giá lịch sử, lợi suất, CAGR, biến động, drawdown và MA50/MA200.
- Doanh thu, lợi nhuận, biên lợi nhuận và ROE theo báo cáo năm.
- Thống kê chủ đề và sắc thái tin tức bằng bộ từ khóa tiếng Việt.
- Snapshot JSON để kiểm tra lại dữ liệu và phép tính.
- Báo cáo HTML standalone, responsive, có bộ lọc và nút mở rộng tin.

## Yêu cầu

- Node.js 20 trở lên.
- Kết nối Internet khi tạo báo cáo mới.
- Không cần chạy `npm install` vì dự án không có package runtime bên ngoài.

Kiểm tra Node.js:

```powershell
node --version
```

## Cài đặt

```powershell
git clone https://github.com/NguyenDinhTuanAnh24/Skill_AI_Crawl.git
cd Skill_AI_Crawl
```

Nếu đã có source tại `E:\Project-Test`, chỉ cần mở PowerShell trong thư mục đó.

## Chạy trên Windows PowerShell

Tạo lại báo cáo HPG:

```powershell
npm.cmd run report
```

Kết quả:

```text
reports/HPG-5y-report.html
data/HPG-5y.json
```

Chạy server xem báo cáo:

```powershell
npm.cmd run serve
```

Mở [http://localhost:4173](http://localhost:4173). Nhấn `Ctrl+C` tại cửa sổ PowerShell để dừng server.

> Dùng `npm.cmd` thay cho `npm` nếu PowerShell báo `npm.ps1 cannot be loaded because running scripts is disabled`.

## Chạy trên macOS hoặc Linux

```bash
npm run report
npm run serve
```

## Tạo báo cáo tùy chỉnh

```powershell
node cli.mjs --symbol FPT --years 3 --news 40 --out reports/FPT-3y-report.html
```

| Tham số | Mặc định | Giới hạn | Ý nghĩa |
|---|---:|---:|---|
| `--symbol` | `HPG` | 2–10 ký tự | Mã cổ phiếu |
| `--years` | `5` | 1–10 | Số năm giá lịch sử |
| `--news` | `60` | 1–300 | Số tin gần nhất |
| `--out` | Tự sinh | Đường dẫn local | File HTML đầu ra |

Khi dùng tên file tùy chỉnh, truy cập trực tiếp qua server, ví dụ:

```text
http://localhost:4173/FPT-3y-report.html
```

## Các lệnh chính

| Lệnh Windows | Chức năng |
|---|---|
| `npm.cmd run report` | Lấy dữ liệu và tạo báo cáo HPG mặc định |
| `npm.cmd run serve` | Chạy preview server tại port 4173 |
| `npm.cmd test` | Chạy unit tests, không cần mạng |
| `npm.cmd run verify` | Chạy test, syntax check, crawl mới và audit artifact |

`npm.cmd run verify` cần Internet và sẽ tạo lại báo cáo HPG mặc định.

## Cách dữ liệu được xử lý

1. `src/fireant.mjs` mở trang mã cổ phiếu công khai để lấy guest token tạm thời.
2. Dữ liệu hồ sơ, giá, tài chính và tin tức được lấy từ FireAnt API với phân trang hữu hạn.
3. `src/analyze.mjs` tính các chỉ số và phân loại tin tức.
4. `src/report.mjs` tạo một file HTML hoàn chỉnh.
5. `cli.mjs` lưu cả HTML và snapshot JSON.

Guest token chỉ được giữ trong bộ nhớ, không được ghi vào JSON hoặc HTML.

## Cấu trúc repository

```text
cli.mjs                         CLI và điều phối luồng chạy
server.mjs                      Preview server local
src/fireant.mjs                 Thu thập dữ liệu FireAnt
src/analyze.mjs                 Tính toán và phân tích
src/report.mjs                  Sinh báo cáo HTML
test/analysis.test.mjs          Unit tests
scripts/verify.mjs              Quality gate end-to-end
data/                           Snapshot JSON, không commit lên Git
reports/                        Báo cáo HTML
```

## Lỗi thường gặp

### `npm.ps1 cannot be loaded`

PowerShell đang chặn script `npm.ps1`. Không cần đổi Execution Policy; sử dụng:

```powershell
npm.cmd run report
```

### `EADDRINUSE: 127.0.0.1:4173`

Port 4173 đã có server sử dụng. Thử mở `http://localhost:4173` trước. Hoặc chạy port khác:

```powershell
$env:PORT=4174
npm.cmd run serve
```

Sau đó mở `http://localhost:4174`.

### FireAnt trả về `401` hoặc `403`

Cơ chế guest-access có thể đã thay đổi. Không tự động vượt đăng nhập hoặc biện pháp kiểm soát truy cập. Chỉ dùng biến `FIREANT_TOKEN` khi có token hợp lệ và được phép sử dụng:

```powershell
$env:FIREANT_TOKEN="<token>"
npm.cmd run report
```

Không commit token vào repository.

## Giới hạn

- FireAnt có thể thay đổi API hoặc guest-access mà không báo trước.
- Dữ liệu tài chính năm có thể chậm hơn dữ liệu thị trường.
- Phân loại tin tức và điểm tổng hợp là quy tắc heuristic, không phải mô hình định giá.
- Báo cáo chỉ phục vụ nghiên cứu và minh họa kỹ thuật, không phải khuyến nghị mua hoặc bán.
- Cần kiểm tra điều khoản của FireAnt trước khi chạy định kỳ, quy mô lớn hoặc sử dụng thương mại.
