## Đề bài

Viết một hàm tính tổng ước dương của một số nguyên $n$. 
Tổng ước dương của một số nguyên $n$ là tổng của tất cả các ước dương của $n$.

Ví dụ:

- $n = 12$ → Các ước dương: $1, 2, 3, 4, 6, 12$ → Tổng: $1 + 2 + 3 + 4 + 6 + 12 = 28$.

- $n = -15$ → Các ước dương: $1, 3, 5, 15$ → Tổng ước dương: $24$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để in tổng ước dương của từng số trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra tổng ước dương của từng số trong danh sách đã nhập.

- Các tổng ước dương được in trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

### Ví dụ

#### Input 1

```
5
18
15
13
28
6
```

#### Output 1

```
39 24 14 56 12
```

#### Input 2

```
4
-15
0
3
-4
```

#### Output 2

```
24 0 4 7
```

📌📌 Link thảo luận trên Facebook tại đây