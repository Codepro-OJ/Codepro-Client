## Đề bài

Viết một hàm tính giá trị của $x^n$ (x mũ n) với $x$ là số nguyên và $n$ là số nguyên dương.

- $x^n$ là kết quả của phép nhân $x$ với chính nó $n$ lần.

- Ví dụ: 
$5^3=5.5.5=125$
$-2^5=(-2).(-2).(-2).(-2).(-2)=-32$

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ cặp số $(x, n)$, sử dụng hàm vừa viết để tính $x^n$ cho từng cặp số trong danh sách.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa hai số nguyên $x$ và $n$ $(|x| \leq 15, 0 < n \leq 15)$.

### Output

- In ra kết quả tính $x^n$ cho mỗi cặp $(x, n)$ đã nhập.

### Ví dụ

#### Input 1

```
3
2 3
5 2
10 0
```

#### Output 1

```
8 25 1
```

#### Input 2

```
4
1 2
3 4
2 3
6 1
```

#### Output 2

```
1 81 8 6
```

📌📌 Link thảo luận trên Facebook tại đây