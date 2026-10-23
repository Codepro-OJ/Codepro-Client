## Đề bài

Viết một hàm kiểm tra một số nguyên $n$ có phải là số Pronic hay không. 
Định nghĩa:

- Số $n$ được gọi là số Pronic nếu $n = m \times (m+1)$, với $m$ là số tự nhiên.

- Nghĩa là $n$ phân tích được thành tích của hai số tự nhiên liên tiếp.

Ví dụ:

- $n = 6$ là số Pronic vì $6 = 2 \times 3$.

- $n = 20$ là số Pronic vì $20 = 4 \times 5$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để kiểm tra từng số trong danh sách và in ra các số Pronic trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra danh sách các số Pronic trong danh sách đã nhập, các số trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

- Nếu không có số nào là số Pronic, in -.

### Ví dụ

#### Input 1

```
5
2
6
4
12
7
```

#### Output 1

```
2 6 12
```

#### Input 2

```
3
-7
1
5
```

#### Output 2

```
-
```

📌📌 Link thảo luận trên Facebook tại đây