## Đề bài

Nhập vào ba cạnh $a$, $b$, $c$ của một tam giác, tính bán kính $R$ của đường tròn ngoại tiếp tam giác đó theo công thức:

$R = \frac{a.b.c}{4.S}$

Trong đó, $S$ là diện tích tam giác, được tính bằng công thức Heron:

$S = \sqrt{p.(p - a).(p - b).(p - c)}, \quad \text{với } p = \frac{a + b + c}{2}$

### Input

- Một dòng có ba số nguyên dương $a$, $b$, $c$ ($0 < a, b, c < 10^9$), cách nhau bởi dấu cách.

### Output

- Một số thực là bán kính $R$, có ba chữ số thập phân.

### Ví dụ

#### Input 1

```
2 3 4
```

#### Output 1

```
2.066
```

#### Input 2

```
3 4 5
```

#### Output 2

```
2.500
```