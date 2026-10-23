## Đề bài

Nhập vào một mảng số nguyên $a: a_0, a_1, a_2, \dots$. Tạo bản sao của mảng $a$ sang mảng $b$ (Sử dụng copy). Sau đó, xóa tất cả các giá trị bằng giá trị nhỏ nhất trong mảng $b$ và in ra mảng $a$ và mảng $b$ sau khi đã xóa.

### Input

- Một dòng chứa các số nguyên của mảng $a$ có giá trị tuyệt đối không vượt quá $10^5$, cách nhau bởi dấu cách, có không quá $10^6$ số.

### Output

- Dòng đầu tiên in mảng $a$.

- Dòng thứ hai in mảng $b$ sau khi xóa các phần tử có giá trị bằng giá trị nhỏ nhất.

- Các số cách nhau bởi dấu cách.

### Ví dụ

#### Input 1

```
5 3 1 2 5 1 4
```

#### Output 1

```
5 3 1 2 5 1 4
5 3 2 5 4
```

#### Input 2

```
10 20 30 10 40
```

#### Output 2

```
10 20 30 10 40
20 30 40
```

📌📌 Link thảo luận trên Facebook tại đây