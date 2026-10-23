## Đề bài

Nhập vào một xâu ký tự và một số nguyên k. Đổi từng ký tự chữ cái trong xâu thành ký tự mới cách ký tự cũ k đơn vị trong bảng chữ cái.

### Quy tắc:

- k được đảm bảo sao cho dữ liệu mã hóa vẫn nằm trong bảng chữ cái (không có trường hợp mã ASCII sau khi mã hoá không phải là chữ cái).

- Xâu chỉ chứa các chữ cái (không có số hay ký hiệu).

### Input

- Dòng đầu chứa xâu ký tự s (độ dài không quá 100 ký tự, chỉ chứa chữ cái).

- Dòng thứ hai chứa số nguyên k ($1 \leq k \leq 25$).

### Output

- In ra xâu sau khi đã được mã hóa.

### Ví dụ

#### Input 1

```
abc
3
```

#### Output 1

```
def
```

#### Input 2

```
XYuv
1
```

#### Output 2

```
YZvw
```

📌📌 Link thảo luận trên Facebook tại đây