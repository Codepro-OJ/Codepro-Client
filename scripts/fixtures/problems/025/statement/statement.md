## Đề bài

Nhập vào ba cạnh $a$, $b$, $c$ của một tam giác, tính chu vi cv và diện tích s của tam giác đó.

- Chu vi được tính theo công thức: $cv = a + b + c$

- Diện tích được tính theo công thức Heron: $s = \sqrt{p.(p - a).(p - b).(p - c)}, \quad \text{với } p = \frac{cv}{2}$

### Input

- Một dòng có ba số nguyên $a$, $b$, $c$ cách nhau bởi dấu cách theo thứ tự, với $0 < a, b, c < 10^9$.

### Output

- Dòng 1: Chu vi.

- Dòng 2: Diện tích tam giác, in ra ba chữ số thập phân.

### Ví dụ

#### Input 1

```
2 3 4
```

#### Output 1

```
9
2.905
```

#### Input 2

```
3 4 6
```

#### Output 2

```
13
5.333
```