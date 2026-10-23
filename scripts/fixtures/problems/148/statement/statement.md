## Đề bài

Nhập vào một mảng số nguyên $a: a_0, a_1, a_2, \dots$, một số nguyên $x$ cần chèn và vị trí $k$ trong mảng. Chèn số $x$ vào vị trí $k$ và in ra mảng sau khi chèn (Sử dụng insert).

### Input

- Dòng đầu tiên chứa các số nguyên có giá trị tuyệt đối không vượt quá $10^5$, cách nhau bởi dấu cách. Số lượng phần tử không quá $10^6$.

- Dòng thứ hai chứa hai số nguyên $x$ và $k$ ($0 \leq k \leq$ độ dài mảng $a$).

### Output

- In mảng sau khi chèn, mỗi số trên một dòng.

### Ví dụ

#### Input 1

```
1 2 3 4 5
10 2
```

#### Output 1

```
1  
2  
10  
3  
4  
5
```

#### Input 2

```
7 8 9
5 1
```

#### Output 2

```
7  
5  
8  
9
```

📌📌 Link thảo luận trên Facebook tại đây