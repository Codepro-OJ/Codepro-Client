## Đề bài

Viết một hàm kiểm tra một số nguyên $n$ có phải là số Triangular hay không. 
Định nghĩa: Số $n$ được gọi là số Triangular nếu $n$ bằng tổng $m$ số nguyên dương đầu tiên.

Ví dụ:

- $n = 6$ là số tam giác vì $6 = 1 + 2 + 3$.

- $n = 15$ là số tam giác vì $15 = 1 + 2 + 3 + 4 + 5$.

- $n = 8$ không là số tam giác vì không có $m$ số nguyên đầu tiên cộng lại bằng $8$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để kiểm tra từng số trong danh sách và in ra các số Triangular trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra danh sách các số Triangular trong danh sách đã nhập, các số trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

- Nếu không có số nào là số Triangular, in -.

### Ví dụ

#### Input 1

```
5
6
4
10
7
-7
```

#### Output 1

```
6 10
```

#### Input 2

```
2
8
0
```

#### Output 2

```
-
```

📌📌 Link thảo luận trên Facebook tại đây