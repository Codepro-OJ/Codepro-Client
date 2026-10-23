## Đề bài

Viết một hàm kiểm tra một số nguyên $n$ có phải là số hoàn hảo hay không. 
Định nghĩa: Một số $n$ được gọi là số hoàn hảo nếu $n$ bằng tổng tất cả các ước số dương nhỏ hơn $n$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để kiểm tra từng số trong danh sách và in ra các số hoàn hảo trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra danh sách các số hoàn hảo trong danh sách đã nhập, các số trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

- Nếu không có số nào là số hoàn hảo, in -.

### Ví dụ

#### Input 1

```
5
28
6
2
4
-7
```

#### Output 1

```
28 6
```

#### Input 2

```
3
2
4
5
```

#### Output 2

```
-
```

📌📌 Link thảo luận trên Facebook tại đây