## Đề bài

Viết một hàm kiểm tra một số nguyên $n$ có phải là số phong phú hay không. 
Định nghĩa:

- Số $n$ được gọi là số phong phú nếu n dương và tổng các ước dương của $n$ (không tính chính nó) lớn hơn $n$.

Ví dụ:

- $n = 12$ là số phong phú vì $12$ có tổng các ước là $1 + 2 + 3 + 4 + 6 = 15 > 12$.

- $n = 20$ là số phong phú vì $20$ có tổng các ước là $1 + 2 + 4 + 5 + 10 = 22 > 20$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để kiểm tra từng số trong danh sách và in ra các số phong phú trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra danh sách các số phong phú trong danh sách đã nhập, các số trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

- Nếu không có số nào là số phong phú, in -.

### Ví dụ

#### Input 1

```
5
2
20
4
12
7
```

#### Output 1

```
20 12
```

#### Input 2

```
4
-7
1
8
0
```

#### Output 2

```
-
```

📌📌 Link thảo luận trên Facebook tại đây