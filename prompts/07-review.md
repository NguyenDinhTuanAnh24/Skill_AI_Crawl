# Prompt — Review only

```text
Review thay đổi hiện tại so với mục tiêu: <mục tiêu/issue>.

Không sửa file và không thực hiện hành động bên ngoài. Đọc diff, `SPEC.md` và tài liệu theo ngữ cảnh trong `AGENTS.md`.

Tập trung vào lỗi có thể quan sát:
- sai dữ liệu hoặc công thức;
- rò rỉ token/secret;
- thay đổi hành vi ngoài phạm vi;
- lỗi escaping/XSS từ nội dung ngoài;
- regression CLI, report hoặc interaction;
- thiếu test cho logic tài chính quan trọng;
- tài liệu mâu thuẫn với code.

Liệt kê findings theo mức độ nghiêm trọng, mỗi finding có file/dòng, tình huống tái hiện và tác động. Nếu không có finding, nói rõ các rủi ro còn chưa kiểm chứng.
```
