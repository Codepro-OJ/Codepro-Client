## Đề bài

Viết một hàm tính tổng chữ số của một số nguyên $n$. 
Định nghĩa:

- Tổng chữ số của một số nguyên $n$ là tổng của tất cả các chữ số trong biểu diễn thập phân của $n$.

- Nếu $n$ là số âm, chỉ tính tổng các chữ số (bỏ dấu âm).

Ví dụ:

- $n = 64589$ → Tổng chữ số: $6 + 4 + 5 + 8 + 9 = 32$.

- $n = -72$ → Tổng chữ số: $7 + 2 = 9$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để in tổng chữ số của từng số trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra tổng chữ số của từng số trong danh sách đã nhập.

- Các tổng chữ số được in trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

### Ví dụ

#### Input 1

```
5
64589
132
31
50
8
```

#### Output 1

```
32 6 4 5 8
```

#### Input 2

```
4
9034
-72
0
12
```

#### Output 2

```
16 9 0 3
```

📌📌 Link thảo luận trên Facebook tại đây