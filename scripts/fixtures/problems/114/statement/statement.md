## Đề bài

Nhập vào một số nguyên dương $n$. Kiểm tra xem $n$ có phải là số phong phú hay không.

Một số nguyên $n$ được gọi là số phong phú nếu: Tổng các ước số của $n$ (không tính $n$) lớn hơn chính $n$.

#### Ví dụ:

- $n = 12$: Các ước của $12$ là $1, 2, 3, 4, 6$. Tổng $1 + 2 + 3 + 4 + 6 = 15 > 12$, nên $12$ là số phong phú.

- $n = 20$: Các ước của $20$ là $1, 2, 4, 5, 10$. Tổng $1 + 2 + 4 + 5 + 10 = 22 > 20$, nên $20$ là số phong phú.

### Input

- Một số nguyên dương $n$ ($0 < n < 10^9$).

### Output

- Yes nếu $n$ là số phong phú.

- No nếu $n$ không phải là số phong phú.

### Ví dụ

#### Input 1

```
20
```

#### Output 1

```
Yes
```

#### Input 2

```
21
```

#### Output 2

```
No
```

📌📌 Link thảo luận trên Facebook tại đây