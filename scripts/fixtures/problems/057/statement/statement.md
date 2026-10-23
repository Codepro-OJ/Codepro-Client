## Đề bài

Nhập vào hai số $a, b$; kiểm tra xem $a, b$ có phải là chiều dài và chiều rộng của một hình chữ nhật hay không. Nếu có, tính chu vi $cv$ và diện tích $s$ của hình chữ nhật đó. Hai số $a, b$ là chiều dài và chiều rộng của một hình chữ nhật khi:  a > 0 and b > 0

Công thức:

- Chu vi: $cv = (a + b) \times 2$

- Diện tích: $s = a \times b$

### Input

- Một dòng chứa hai số nguyên $a, b$, cách nhau bởi dấu cách $(|a|, |b| < 10^9)$.

### Output

- Dòng 1: 

Thông báo: "Day khong phai la 2 kich thuoc cua mot hinh chu nhat" hoặc "Day la 2 kich thuoc cua mot hinh chu nhat".

- Nếu không phải là 2 kích thước của một hình chữ nhật: 

Dòng 2: Thông báo lý do, ví dụ: "a la so am", "b la so am", hoặc "a va b la so am".

- Nếu là 2 kích thước của một hình chữ nhật: 

Dòng 2: Chu vi và diện tích, cách nhau bởi dấu cách.

### Ví dụ

#### Input 1

```
-2 3
```

#### Output 1

```
Day khong phai la 2 kich thuoc cua mot hinh chu nhat
a la so am
```

#### Input 2

```
3 4
```

#### Output 2

```
Day la 2 kich thuoc cua mot hinh chu nhat
14 12
```

📌📌 Link thảo luận trên Facebook tại đây