## Đề bài

Nhập vào một số nguyên dương $n$. Kiểm tra xem $n$ có phải là số tam giác hay không.

- Một số $n$ được gọi là số tam giác nếu $n$ bằng tổng $m$ số nguyên dương đầu tiên: 
$n = 1 + 2 + 3 + \dots + m = \frac{m(m+1)}{2}$

- Tìm $m$ sao cho $\frac{m(m+1)}{2} = n$. Nếu tìm được $m$ là số nguyên dương thì $n$ là số tam giác. 
Vd:

- n = 6 là số tam giác vì có 3 số tự nhiên đầu tiên là 1 + 2 + 3 = 6

- n = 15 là số tam giác vì có 5 số tự nhiên đầu tiên là 1 + 2 + 3 + 4 + 5 = 15

- n = 8 không là số tam giác vì không có m số nguyên đầu tiên cộng lại bằng 8

### Input

- Một số nguyên dương $n$ ($0 < n < 10^9$).

### Output

- Yes nếu $n$ là số tam giác.

- No nếu $n$ không phải là số tam giác.

### Ví dụ

#### Input 1

```
15
```

#### Output 1

```
Yes
```

#### Input 2

```
8
```

#### Output 2

```
No
```

📌📌 Link thảo luận trên Facebook tại đây