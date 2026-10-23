## Đề bài

Viết chương trình quản lý danh sách học sinh bằng cách khai báo cấu trúc HọcSinh gồm các thông tin sau:

- Mã số

- Họ tên

- Năm sinh

- Giới tính

- Điểm Văn

- Điểm Toán

- Điểm Tiếng Anh

Chương trình nhập vào danh sách $ n $ học sinh và sắp xếp danh sách theo yêu cầu:

- Ưu tiên xếp theo tên theo thứ tự bảng chữ cái (ABC), nếu trùng tên thì xếp theo họ.

- Nếu trùng cả họ và tên, ưu tiên xếp theo điểm Toán giảm dần.

### Input:

- Dòng đầu tiên chứa số nguyên dương $ n $ $( 1 \leq n \leq 100 $), là số lượng học sinh.

- $ n $ dòng tiếp theo, mỗi dòng chứa thông tin của một học sinh theo định dạng: 

Mã|Họ Tên|Năm sinh|Giới tính|Điểm Văn|Điểm Toán|Điểm Tiếng Anh

- Các thông tin cách nhau bởi ký tự |.

- Điểm là số nguyên từ 0 đến 10.

### Output:

- In danh sách học sinh sau khi sắp xếp theo yêu cầu, mỗi học sinh trên một dòng với định dạng giữ nguyên như dữ liệu đầu vào.

### Ví dụ

#### Input 1

```
5
HS01|Nguyen An|2005|Nu|7|8|6
HS02|Tran An|2007|Nu|6|8|7
HS03|Le An|2004|Nam|8|7|8
HS04|Tran Phi Binh An|2003|Nam|7|8|7
HS05|Tran An|2006|Nam|6|9|7
```

#### Output 1

```
HS03|Le An|2004|Nam|8|7|8
HS01|Nguyen An|2005|Nu|7|8|6
HS05|Tran An|2006|Nam|6|9|7
HS02|Tran An|2007|Nu|6|8|7
HS04|Tran Phi Binh An|2003|Nam|7|8|7
```

📌📌 Link thảo luận trên Facebook tại đây