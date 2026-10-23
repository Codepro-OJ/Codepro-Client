## Đề bài

Viết một hàm kiểm tra một số nguyên $n$ có phải là số Chen hay không. 
Định nghĩa: Số $n$ được gọi là số Chen nếu:

- $n$ là số nguyên tố.

- $n+2$ cũng là số nguyên tố.

Ví dụ:

- $n = 5$ là số Chen vì $5 + 2 = 7$ cũng là số nguyên tố.

- $n = 17$ là số Chen vì $17 + 2 = 19$ cũng là số nguyên tố.

- $n = 13$ không là số Chen vì $13 + 2 = 15$ không phải là số nguyên tố.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để kiểm tra từng số trong danh sách và in ra các số Chen trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra danh sách các số Chen trong danh sách đã nhập, các số trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

- Nếu không có số nào là số Chen, in -.

### Ví dụ

#### Input 1

```
5
3
4
17
1
-7
```

#### Output 1

```
3 17
```

#### Input 2

```
2
0
4
```

#### Output 2

```
-
```

📌📌 Link thảo luận trên Facebook tại đây