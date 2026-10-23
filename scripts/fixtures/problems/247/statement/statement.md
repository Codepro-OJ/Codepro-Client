## Đề bài

Nhập vào một ma trận có kích thước $n \times m$, in ra các số chính phương trên cột $y$. Nếu không có số chính phương trên cột $y$, in ra $-1$. 
Lưu ý: Dòng đầu tiên và cột đầu tiên trong ma trận được tính là dòng 0, cột 0.

### Input

- Dòng đầu tiên: Hai số nguyên $n$ và $m$, phân tách nhau bởi dấu cách $(0 < n, m < 1000$).

- $n$ dòng tiếp theo, mỗi dòng chứa $m$ số nguyên có giá trị tuyệt đối không quá $10^6$.

- Dòng kế tiếp là một số nguyên $y$ $(0 \leq y < m$).

### Output

- Các số chính phương trên cột $y$, phân tách nhau bởi dấu cách.

- Nếu không có số chính phương, in ra $-1$.

### Ví dụ

#### Input 1

```
3 4
2 1 5 7
2 -3 5 8
-4 4 -3 0
1
```

#### Output 1

```
1 4
```

📌📌 Link thảo luận trên Facebook tại đây