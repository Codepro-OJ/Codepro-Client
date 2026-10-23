## Đề bài

Viết hàm findMax để tìm giá trị lớn nhất và vị trí của giá trị lớn nhất trong mảng; Viết tiếp hàm findMin để tìm giá trị nhỏ nhất và vị trí của giá trị nhỏ nhất trong mảng. Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ mảng, sử dụng hàm vừa viết để tìm Max, Min và vị trí tương ứng trong từng mảng (vị trí đầu tiên trong mảng là 0).

Ghi chú khi sử dụng C++:  Khai báo int findMax(int a[], int n, int &vitriMax) để hiểu về tham số truyền tham chiếu và tham số truyền giá trị

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một mảng các số nguyên. 
Các số trong mảng cách nhau bởi dấu cách.

### Output

- In ra giá trị Max, vị trí Max đầu tiên; giá trị Min và vị trí Min đầu tiên tương ứng của chúng trong mảng cho từng mảng đã nhập.

### Ví dụ

#### Input 1

```
2
4 8 1 5
30 3 5 4
```

#### Output 1

```
Max: 8, Vi tri Max: 1; Min: 1, Vi tri Min: 2
Max: 30, Vi tri Max: 0; Min: 3, Vi tri Min: 1
```

#### Input 2

```
3
9 5 1 0
3 2 20 1
2 2 0
```

#### Output 2

```
Max: 9, Vi tri Max: 0; Min: 0, Vi tri Min: 3
Max: 20, Vi tri Max: 2; Min: 1, Vi tri Min: 3
Max: 2, Vi tri Max: 0; Min: 0, Vi tri Min: 2
```

📌📌 Link thảo luận trên Facebook tại đây