# Prompt — Data audit

```text
Audit luồng dữ liệu/chỉ số sau: <endpoint, field hoặc công thức>.

Chỉ chẩn đoán và báo cáo; không sửa code trừ khi tôi yêu cầu rõ.

Đọc `docs/03-data-pipeline.md`, `skills/fireant-stock-report/references/fireant-data.md`, `skills/fireant-stock-report/references/methodology.md` và code liên quan.

Kiểm tra:
1. Dữ liệu gốc và timestamp nguồn.
2. Phân trang, thứ tự, null và kiểu số.
3. Công thức biến đổi, đơn vị và chiều của hệ số.
4. Rủi ro look-ahead, dữ liệu thiếu hoặc kỳ chưa đủ năm.
5. Một fixture nhỏ có kết quả tính tay.
6. Token/secret có bị ghi log hoặc serialize không.
7. Nhận định trong HTML có vượt quá bằng chứng không.

Trả findings theo mức độ nghiêm trọng, dẫn file/dòng và đề xuất test hồi quy.
```
