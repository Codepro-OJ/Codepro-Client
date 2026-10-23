## Đề bài

Nhập vào một mảng số nguyên $a: a_0, a_1, a_2, \dots$. Tạo mảng $b$ chứa tổng các chữ số của mỗi số trong mảng $a$ theo thứ tự xuất hiện.

Sử dụng một vòng lặp để in các số trong mảng $a$ cùng với tổng chữ số tương ứng trong mảng $b$ (Sử dụng map, zip).

### Input

- Một dòng chứa các số nguyên dương của mảng $a$ có giá trị không vượt quá $10^5$, cách nhau bởi dấu cách, có không quá $10^6$ số.

### Output

- In ra các số trong mảng $a$ và tổng chữ số tương ứng trong mảng $b$.

- Mỗi cặp giá trị được in trên một dòng, các số cách nhau bởi dấu cách.

### Gợi ý

- Tạo mảng $b$ bằng cách sử dụng hàm map() để tính tổng chữ số của mỗi số trong mảng $a$.

- Dùng hàm zip() để kết hợp mảng $a$ và $b$ lại và in chúng.

### Ví dụ

#### Input 1

```
12 34 56 78 90
```

#### Output 1

```
12 3
34 7
56 11
78 15
90 9
```

#### Input 2

```
5 10 15 20
```

#### Output 2

```
5 5
10 1
15 6
20 2
```

📌📌 Link thảo luận trên Facebook tại đây