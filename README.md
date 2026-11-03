# Kết nối hợp tác cùng Rocky | VOS 2026 Đà Nẵng

Trang landing page đăng ký tư vấn và kết nối hợp tác đại lý tròng kính Rocky tại Hội nghị Nhãn khoa Việt Nam VOS 2026 (Ariyana Convention Centre Đà Nẵng).

- **Trực tiếp (GitHub Pages)**: [https://25phongsusu.github.io/vos-rocky/](https://25phongsusu.github.io/vos-rocky/)
- **Google Sheet lưu trữ thông tin đăng ký**: [Mở Google Sheet](https://docs.google.com/spreadsheets/d/1kbLysT60InOhoTPOYlwQVuwi11IUbrYh3vPaZXoHGQM/edit?gid=2037923750#gid=2037923750)

---

## 🚀 Hướng dẫn kích hoạt tự động đổ dữ liệu về Google Sheet (2 phút)

Để toàn bộ thông tin đối tác đăng ký từ website tự động ghi trực tiếp vào Google Sheet của bạn mà không cần server:

### Bước 1: Mở trình chỉnh sửa Google Apps Script
1. Mở file Google Sheet: [Link Google Sheet](https://docs.google.com/spreadsheets/d/1kbLysT60InOhoTPOYlwQVuwi11IUbrYh3vPaZXoHGQM/edit?gid=2037923750#gid=2037923750)
2. Trên thanh menu, chọn: **Tiện ích mở rộng (Extensions)** > **Apps Script**.

### Bước 2: Dán mã xử lý
1. Xóa toàn bộ nội dung mặc định trong file `Code.gs`.
2. Mở file [`Code.gs`](./Code.gs) trong thư mục này, sao chép toàn bộ nội dung và dán vào Apps Script.
3. Nhấn biểu tượng **Lưu (Save)** 💾 (hoặc phím `Ctrl + S`).

### Bước 3: Triển khai Web App
1. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải > chọn **Triển khai mới (New deployment)**.
2. Nhấn biểu tượng bánh răng ⚙️ bên cạnh "Chọn loại", chọn **Ứng dụng web (Web app)**.
3. Điền cấu hình như sau:
   - **Mô tả (Description)**: `VOS Rocky Lead Webhook`
   - **Thực thi dưới dạng (Execute as)**: **Tôi (Me)** (`email của bạn`)
   - **Ai có quyền truy cập (Who has access)**: **Bất kỳ ai (Anyone)** *(Rất quan trọng để khách từ website gửi về được)*
4. Nhấn **Triển khai (Deploy)**.
5. Google sẽ yêu cầu cấp quyền:
   - Nhấn **Ủy quyền truy cập (Authorize access)**.
   - Chọn tài khoản Google của bạn.
   - Nếu hiện màn hình cảnh báo "Google hasn't verified this app", chọn **Advanced (Nâng cao)** > chọn **Go to Untitled project (unsafe)** > Nhấn **Allow (Cho phép)**.
6. Sao chép đường dẫn **URL ứng dụng web (Web app URL)** (có định dạng `https://script.google.com/macros/s/.../exec`).

### Bước 4: Kích hoạt trên website
Có 2 cách cực kỳ nhanh:
- **Cách 1**: Mở link web [https://25phongsusu.github.io/vos-rocky/](https://25phongsusu.github.io/vos-rocky/), điền thử form rồi nhấn gửi, web sẽ hiện hộp thoại hỏi URL Web App, bạn chỉ cần dán link vừa copy vào là xong! Web sẽ ghi nhớ cho các lần tiếp theo.
- **Cách 2**: Mở file `index.html`, tìm biến:
  ```javascript
  const DEFAULT_SCRIPT_URL = 'DÁN_LINK_WEB_APP_VÀO_ĐÂY';
  ```
  Dán link vào, commit và push lên GitHub.

---

## 📋 Danh sách các trường thông tin lưu trữ

Mỗi lượt đăng ký sẽ tự động tạo một dòng mới trong sheet `gid=2037923750` gồm các cột:
1. **Thời gian đăng ký** (Timestamp GMT+7)
2. **Tên đơn vị / Phòng khám / Cửa hàng**
3. **Loại hình đơn vị** (Cửa hàng kính mắt, Phòng khám khúc xạ, Chuỗi bán lẻ...)
4. **Tỉnh / Thành phố**
5. **Địa chỉ chi tiết**
6. **Họ và tên người liên hệ**
7. **Số điện thoại / Zalo** (giữ nguyên số 0 ở đầu)
8. **Email**
9. **Sản phẩm quan tâm** (Tròng đổi màu, ánh sáng xanh, lão thị...)
10. **Ghi chú dòng tròng khác**
11. **Nhân viên Rocky hỗ trợ**
12. **Tên nhân viên khác**
13. **Ghi chú & Yêu cầu thêm**
14. **Đồng ý điều khoản**
