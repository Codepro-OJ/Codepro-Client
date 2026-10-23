## Đề bài

Nhập vào một ma trận có kích thước $n \times m$, tìm số chính phương nhỏ nhất trên cột $y$. Nếu không có số chính phương trên cột $y$, in ra $-1$. (Chú ý: dòng đầu tiên và cột đầu tiên trong ma trận được tính là dòng 0, cột 0).

### Input

- Dòng đầu tiên chứa hai số nguyên $n$ và $m$, phân tách nhau bởi dấu cách $(0 < n, m < 1000$).

- $n$ dòng tiếp theo, mỗi dòng chứa $m$ số nguyên có giá trị tuyệt đối không quá $10^6$.

- Dòng kế tiếp là một số nguyên $y$ $(0 \leq y < m$).

### Output

- Một số chính phương nhỏ nhất trên cột $y$. Nếu không có số chính phương nào, in ra $-1$.

### Ví dụ

#### Input 1

```
3 4
2 1 9 9
1 -3 25 8
-4 5 4 4
2
```

#### Output 1

```
4
```

📌📌 Link thảo luận trên Facebook tại đây