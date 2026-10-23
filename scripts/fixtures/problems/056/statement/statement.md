## Đề bài

Nhập vào ba số $a$, $b$, $c$; kiểm tra xem chúng có phải là 3 cạnh của một tam giác hay không. Nếu có, tính chu vi $cv$ và diện tích $s$ của tam giác đó. Ba số $a$, $b$, $c$ là 3 cạnh của một tam giác khi: (a + b > c) and (a + c > b) and (b + c > a)

Công thức:

- Chu vi: $cv = a + b + c$

- Diện tích: $s = \sqrt{p \cdot (p - a) \cdot (p - b) \cdot (p - c)} \quad \text{với } p = \frac{cv}{2}$

### Input

- Một dòng chứa 3 số nguyên $a$, $b$, $c$, cách nhau bởi dấu cách $(|a|, |b|, |c| \leq 10^9)$.

### Output

- Dòng 1: 

Thông báo: "Day khong phai la 3 canh cua mot tam giac" hoặc "Day la 3 canh cua mot tam giac".

- Nếu là 3 cạnh của một tam giác: 

Dòng 2: Chu vi và diện tích của tam giác, cách nhau bởi dấu cách. Chu vi in 0 chữ số thập phân, diện tích in 1 chữ số thập phân.

### Ví dụ

#### Input 1

```
1 2 3
```

#### Output 1

```
Day khong phai la 3 canh cua mot tam giac
```

#### Input 2

```
3 4 5
```

#### Output 2

```
Day la 3 canh cua mot tam giac
12 6.0
```

📌📌 Link thảo luận trên Facebook tại đây