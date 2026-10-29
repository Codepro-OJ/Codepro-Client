# CodeProOJ Client (Windows)

Ứng dụng desktop độc lập cho CodeProOJ. Mã được viết mới; gói TMATH 1.0.7 chỉ dùng để khảo sát chức năng.
Repository này được xuất bản tại [Codepro-OJ/Codepro-Client](https://github.com/Codepro-OJ/Codepro-Client). Web trực tuyến nằm tại [Codepro-Web](https://github.com/Codepro-OJ/Codepro-Web); hệ thống thi qua LAN nằm tại [Submit-Offline](https://github.com/Codepro-OJ/Submit-Offline).

## Chức năng bản 1.2.6

- Tìm và đọc bài tập công khai qua API v2 CodeProOJ.
- Nội dung đề bài được tải trực tiếp từ API của web mỗi khi mở hoặc nhận tín hiệu cập nhật; client không lưu đề bài vào tệp hay bộ nhớ đệm trên máy. Chỉ mã nguồn nháp được lưu cục bộ.
- Đăng nhập tài khoản người dùng hoặc quản trị viên theo luồng xác thực v1 của CodeProOJ; hỗ trợ xác thực 2 bước. Giới hạn IP của quản trị viên do máy chủ kiểm tra.
- Xem toàn bộ cuộc thi công khai, lịch thi, bài thi, tham gia/rời thi và bảng xếp hạng. Nộp bài trong ngữ cảnh cuộc thi.
- Nút “Tham gia” trên danh sách hoặc trang chi tiết đưa thí sinh vào bài A ngay khi đăng ký thành công. Không gian cuộc thi có thanh chuyển bài, đề bài và Compiler IDE; chuyển bài giữ bản nháp riêng, nút quay lại mở danh sách cuộc thi. Bài thi chưa mở trước khi tham gia hoặc trước giờ bắt đầu.
- Trang cuộc thi có tiêu đề nổi bật, tìm theo tên hoặc mã, lọc và nhóm theo trạng thái. Thanh bên có biểu tượng, tài khoản, cài đặt cỡ chữ trình soạn code và trạng thái kết nối.
- Quản trị viên chọn nơi hiển thị cho từng cuộc thi: chỉ client, chỉ web, hoặc cả hai. Tùy chọn “Công khai” vẫn dùng để giữ cuộc thi ở trạng thái bản nháp.
- Màn hình tạo/sửa cuộc thi có biểu mẫu riêng, tìm chọn bài thi theo mã hoặc tên, kiểm tra mã bài, thời gian và bài bị lặp trước khi lưu. Cuộc thi mới mặc định là bản nháp; khi công khai cần ít nhất một bài. Thời lượng tạo mới lấy từ giờ bắt đầu và kết thúc, còn chỉnh sửa giữ nguyên giới hạn làm bài đã đặt.
- Trang Tài khoản hiển thị hồ sơ cá nhân đầy đủ: tên, vai trò, hạng, thông tin giới thiệu, thống kê, tỉ lệ chấp nhận và bài nộp gần đây qua API profile v1.
- Thanh trên hiển thị avatar và tên từ hồ sơ web của tài khoản đang đăng nhập; màu tên và viền avatar theo ngưỡng rating CodeProOJ. Khi ảnh thiếu hoặc không tải được, client hiện chữ cái đầu của tên.
- Khi mở bất kỳ bài tập hoặc bài thi nào, danh sách “Khám phá bài tập” ẩn đi để đề và trình soạn code dùng toàn bộ chiều rộng. Khi quay lại danh sách, đề và khung code ẩn đi, còn danh sách mở rộng thành nhiều cột.
- Giao diện quản trị riêng cho tài khoản admin: số liệu tổng quan, tạo/sửa cuộc thi và bài tập, xem người dùng và phân vai trò.
- Soạn đề Markdown/LaTeX với khung xem trước; lưu đồng thời bản Markdown trong gói bài và nội dung hiển thị qua API statement v1. Công thức hợp lệ được hiển thị bằng KaTeX đóng gói cục bộ.
- Đề bài trên client dùng bộ phân tích Markdown đầy đủ cho tiêu đề, danh sách, ví dụ và khối mã; nội dung HTML được làm sạch trước khi hiển thị, còn công thức được xử lý bằng KaTeX. Ba bản ghi APLUS, KNAPSACK và MAXSUM bị mất biến trong dữ liệu đã được phục hồi bằng lệnh `python manage.py repair_corrupt_problem_statements --apply` (có bản sao nội dung cũ trong `problem-data/repairs/`).
- Nộp bài, xem bài nộp và theo dõi kết quả.
- Compiler IDE dùng CodeMirror để soạn C++/Python với tô màu cú pháp, số dòng, tự thụt lề, tìm kiếm, trạng thái con trỏ và terminal kết quả. `Ctrl+Enter` chạy thử, `Ctrl+S` lưu tệp. Bản nháp vẫn tự lưu trên máy, hỗ trợ mở/lưu tệp nguồn.
- Nút “Chia sẻ cho spectator” trong Compiler IDE tạo liên kết chỉ xem và đồng bộ mã đang viết. Chủ phiên có thể dừng chia sẻ; mục “Chia sẻ mã nguồn” trong trang quản trị liệt kê, sao chép liên kết và thu hồi các phiên đang mở. Liên kết tự hết hạn sau 24 giờ.
- Khi làm bài, kéo vạch giữa đề và IDE để chỉnh độ rộng hoặc dùng phím mũi tên khi vạch được chọn. Tỉ lệ được nhớ trên máy.
- Chạy thử C++17 bằng `g++` hoặc Python 3 bằng `py -3` (trên Windows) nếu công cụ đã có trong `PATH`.
- Trong Cài đặt, có thể chọn đường dẫn `g++.exe` và `python.exe`/`py.exe`, kiểm tra phiên bản rồi dùng các compiler đó để chạy thử. Để trống sẽ dùng công cụ trong `PATH`.
- Kết nối tự động tới máy chủ CodeProOJ; mặc định dùng gateway cục bộ và có thể đặt `CODEPRO_API_ORIGIN` thành địa chỉ web chính khi triển khai.
- WebSocket `/ws/live` tự kết nối lại và đồng bộ thay đổi cuộc thi, bài tập, bài nộp từ web sang client. Tín hiệu không chứa dữ liệu riêng tư; client tải dữ liệu mới qua API. Đề đang mở được cập nhật mà không ghi đè mã nguồn.

Liên kết spectator hiện dùng máy chủ cố định `http://127.0.0.1:8888`; chỉ thiết bị truy cập được máy chủ này mới xem được. Cần triển khai backend công khai trước khi chia sẻ cho người ở mạng khác.

Code chạy thử được thực thi trực tiếp trên máy người dùng theo thao tác bấm nút, chưa có sandbox. Chỉ chạy mã do chính bạn tin cậy. Client chưa có chế độ thi khóa máy hoặc đồng bộ bài học từ TMATH. Danh sách bài ẩn trong màn hình quản trị cần backend mới hỗ trợ `GET /api/v2/problems?all=1`.

## Phát triển và đóng gói

Trong thư mục gốc kho `Codepro-Client`:

```powershell
npm ci
npm start
npm run dist:win
npm run publish:local -- C:/path/Codepro-Web
```

`npm start` và `npm run dist:win` tự tạo bundle CodeMirror cục bộ bằng esbuild, nên IDE không cần mạng hoặc CDN khi mở ứng dụng.

`publish:local` đặt bản Windows portable và `client-manifest.json` trong `frontend/downloads/`. Trang `/client` chỉ bật nút tải khi manifest tồn tại. `/client/download/windows` stream tệp thực thi nên không bị giới hạn 2 MB của bộ phục vụ tệp tĩnh. Khi triển khai VPS, tải tệp đã build lên đúng đường dẫn ghi trong manifest cùng manifest. Docker Compose mount thư mục này vào frontend container nên có thể cập nhật binary mà không build lại image. Tệp `.exe` được bỏ qua bởi Git để tránh làm repository phình lớn. Bản portable chưa được ký số; cần ký trước khi phát hành rộng rãi.

Địa chỉ API mặc định là `http://127.0.0.1:8888`. Đặt `CODEPRO_API_ORIGIN=https://ten-mien-web` trước khi chạy hoặc đóng gói để client kết nối web chính; địa chỉ phải là gốc HTTP(S), không có đường dẫn hay thông tin đăng nhập. Client không dùng địa chỉ từng lưu trong `settings.json`.

Token tài khoản được lưu bằng Electron `safeStorage` khi hệ điều hành hỗ trợ; bản nháp nằm trong `app.getPath('userData')`.

## Kho mã liên quan

Máy chủ và web: https://github.com/Codepro-OJ/Codepro-Web

OJ độc lập cho kỳ thi qua LAN: https://github.com/Codepro-OJ/Submit-Offline

Chạy web trước tại cổng 8888. Xuất bản bản portable bằng đường dẫn kho web ở lệnh trên hoặc biến CODEPRO_WEB_ROOT.
