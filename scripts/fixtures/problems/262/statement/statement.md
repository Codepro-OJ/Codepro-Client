## Đề bài

Viết một hàm tính giai thừa của một số nguyên $n$. 
Định nghĩa:

- Giai thừa của một số nguyên $n$ $(n!$) là tích của tất cả các số nguyên dương từ $1$ đến $n$.

- Nếu $n = 0$, giai thừa được định nghĩa là $1$ $(0! = 1$).

Ví dụ:

- $n = 5$ → $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$.

- $n = 0$ → $0! = 1$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để in giai thừa của từng số trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 10)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(0 \leq x_i \leq 19)$.

### Output

- In ra giai thừa của từng số trong danh sách đã nhập.

### Ví dụ

#### Input 1

```
5
2
5
4
7
1
```

#### Output 1

```
2 120 24 5040 1
```

#### Input 2

```
4
1
0
3
6
```

#### Output 2

```
1 1 6 720
```

📌📌 Link thảo luận trên Facebook tại đây