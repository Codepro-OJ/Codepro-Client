## Đề bài

Nhập vào một ma trận và chèn các giá trị vào cột thứ $k$ trong ma trận.

### Input

- Dòng đầu là ba số nguyên $m, n, k$ ($1 \leq m, n \leq 1000, 0 \leq k \leq n$), lần lượt là số dòng, số cột của ma trận và chỉ số cột cần chèn.

- $m$ dòng tiếp theo, mỗi dòng chứa $n$ số nguyên, biểu diễn hàng thứ $i$ của ma trận ($0 \leq \text{số nguyên} \leq 1000$).

- Dòng cuối cùng chứa $m$ số nguyên, biểu diễn các giá trị cần chèn vào cột $k$.

### Output

- In ra ma trận sau khi chèn các giá trị vào cột $k$.

- Mỗi dòng in ra các phần tử của ma trận sau khi thực hiện chèn.

### Ví dụ

#### Input 1

```
3 4 2
2 3 5 7
9 3 5 8
4 5 3 0
1 2 3
```

#### Output 1

```
2 3 1 5 7
9 3 2 5 8
4 5 3 3 0
```

📌📌 Link thảo luận trên Facebook tại đây