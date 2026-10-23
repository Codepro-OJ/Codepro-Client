## Đề bài

Viết một hàm đảo ngược của một số nguyên $n$. 
Định nghĩa:

- Số đảo ngược của một số nguyên $n$ là số được tạo ra khi viết các chữ số của $n$ theo thứ tự ngược lại.

- Nếu $n$ là số âm, dấu trừ vẫn được giữ ở đầu.

- $n = 0$ có số đảo ngược là $0$.

Ví dụ:

- $n = 123$ → $321$.

- $n = -15$ → $-51$.

- $n = 3400$ → $43$.

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ số nguyên, sử dụng hàm vừa viết để in số đảo ngược của từng số trong danh sách đó.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một số nguyên $x_i$ $(-10^6 \leq x_i \leq 10^6)$.

### Output

- In ra số đảo ngược của từng số trong danh sách đã nhập.

- Các số đảo ngược được in trên một dòng, cách nhau bởi dấu cách, theo thứ tự xuất hiện trong input.

### Ví dụ

#### Input 1

```
5
123
450
2456
12
7
```

#### Output 1

```
321 54 6542 21 7
```

#### Input 2

```
4
-15
0
3400
-4
```

#### Output 2

```
-51 0 43 -4
```

📌📌 Link thảo luận trên Facebook tại đây