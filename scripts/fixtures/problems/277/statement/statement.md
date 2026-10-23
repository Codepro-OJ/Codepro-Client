## Đề bài

Cho ba điểm $ A(x_A, y_A) $, $ B(x_B, y_B) $ và $ C(x_C, y_C) $ trong mặt phẳng tọa độ Oxy.

### Yêu cầu:

- Định nghĩa cấu trúc dữ liệu để biểu diễn điểm trong mặt phẳng.

- Định nghĩa cấu trúc dữ liệu để biểu diễn tam giác.

- Xác định xem ba điểm có tạo thành một tam giác hay không? Ba điểm A, B, C tạo thành một tam giác khi: (AB + BC > CA) and (AB + CA > BC) and (BC + CA > AB)

- Nếu có, tính chu vi và diện tích tam giác theo công thức: 
$ CV = AB + BC + CA $ 
$ S = 0.5 \cdot |x_A(y_B-y_C) + x_B(y_C-y_A) + x_C(y_A-y_B)|$

### Input:

- Một dòng chứa sáu số thực $ x_A, y_A, x_B, y_B, x_C, y_C $.

- Các số có giá trị tuyệt đối không vượt quá $ 10^3 $.

### Output:

- Nếu ba điểm tạo thành tam giác, in chu vi với một chữ số thập phân và diện tích tam giác với hai chữ số thập phân cách nhau bởi dấu cách.

- Nếu ba điểm thẳng hàng (không tạo thành tam giác), in ra -1.

### Ví dụ

#### Input 1

```
0 1 0 3 0 4
```

#### Output 1

```
-1
```

#### Input 2

```
-1 0.5 0 3 1.5 0
```

#### Output 2

```
8.6 3.38
```

📌📌 Link thảo luận trên Facebook tại đây