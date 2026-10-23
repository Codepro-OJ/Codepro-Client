## Đề bài

Viết một hàm đếm số ước dương của một số nguyên $n$.

Ví dụ:

- $n = 12$ → Các ước dương: $1, 2, 3, 4, 6, 12$ → Số lượng: $6$.

- $n = -15$  → Các ước dương: $1, 3, 5, 15$ → Số ước dương: $4$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để in số ước dương của từng số trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra số ước dương của từng số trong danh sách đã nhập.

- Các số ước dương được in trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

### Ví dụ

#### Input 1

```
5
10
8
9
12
5
```

#### Output 1

```
4 4 3 6 2
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
4 0 2 3
```

📌📌 Link thảo luận trên Facebook tại đây