## Đề bài

Nhập vào ba số nguyên $a, b, c$. Kiểm tra xem ba số nguyên này có tạo thành 3 cạnh của một tam giác hay không. Ba số $a$, $b$, $c$ là 3 cạnh của một tam giác khi: (a + b > c) and (a + c > b) and (b + c > a)

Nếu là 3 cạnh của một tam giác, xác định loại tam giác: đều, cân, vuông, hoặc thường:

- Tam giác đều là tam giác có 3 cạnh bằng nhau (a == b) and (b == c)

- Tam giác cân là tam giác có 2 cạnh bằng nhau (a == b) or (b == c) or (c == a)

- Tam giác vuông là tam giác có tổng bình phương 2 cạnh bằng bình phương cạnh thứ 3 (a*a + b*b == c*c) or (b*b + c*c == a*a) or (c*c + a*a == b*b)

### Input

- Ba số nguyên $a, b, c$ trên một dòng, cách nhau bởi dấu cách $(|a|, |b|, |c| \leq 10^9)$.

### Output

- Dòng 1: In Yes nếu 3 số tạo thành một tam giác, ngược lại in No.

- Dòng 2: Nếu dòng 1 là Yes, in ra loại tam giác: Deu, Can, Vuong, hoặc Thuong.

### Ví dụ

#### Input 1

```
2 3 4
```

#### Output 1

```
Yes
Thuong
```

#### Input 2

```
3 4 5
```

#### Output 2

```
Yes
Vuong
```

#### Input 3

```
1 2 3
```

#### Output 3

```
No
```

📌📌 Link thảo luận trên Facebook tại đây