## Đề bài

Nhập vào một số nguyên dương $n$. Kiểm tra xem $n$ có phải là số Smith hay không.

Một số nguyên dương $n$ được gọi là số Smith nếu:

- $n$ là hợp số (không phải số nguyên tố).

- Tổng các chữ số của $n$ bằng tổng các chữ số của các thừa số nguyên tố của $n$.

Ví dụ:

- n = 85 là số Smith vì n phân tích ra thành tích các thừa số nguyên tố là 85 = 5 x 17 mà tổng chữ số của 85 là 8 + 5 = 13, và tổng các chữ số của 5 và 17 là 5 + 1 + 7 = 13.

- n = 1086 là số Smith vì n phân tích ra thành tích các thừa số nguyên tố là 1086 = 2 x 3 x 181 mà tổng chữ số của 1086 là 1 + 0 + 8 + 6 = 15, và tổng các chữ số của 2, 3 và 181 là 2 + 3 + 1 + 8 + 1 = 15.

### Input

- Một số nguyên dương $n$ ($0 < n < 10^9$).

### Output

- Yes nếu $n$ là số Smith.

- No nếu $n$ không phải là số Smith.

### Ví dụ

#### Input 1

```
85
```

#### Output 1

```
Yes
```

#### Input 2

```
100
```

#### Output 2

```
No
```

📌📌 Link thảo luận trên Facebook tại đây