## Đề bài

Nhập vào số tiền đang có $a$, số tiền cần có $b$ để mua một chiếc Iphone 20 pro++. 
Biết rằng lãi suất ngân hàng là $2\%$ / tháng. 
Tính số tháng ít nhất gửi ngân hàng để có tiền lãi cộng tiền gốc lớn hơn hoặc bằng $b$. 
Lãi nhập vốn tính lãi cho tháng sau.

Ví dụ:

- $a = 1.000.000$: 

Sau 1 tháng, tiền lãi là: $20.000$, tiền $a = 1.000.000 + 20.000 = 1.020.000$.  
Sau 2 tháng, tiền lãi là: $20.400$, tiền $a = 1.040.400$.  
...

### Input

- Hai số nguyên $a$ và $b$ ($0 < a < b < 10^9$) trên cùng một dòng, cách nhau bởi dấu cách.

### Output

- Số tháng ít nhất cần gửi tiền để đạt được số tiền $b$.

### Ví dụ

#### Input 1

```
1000000 2000000
```

#### Output 1

```
36
```

#### Input 2

```
1500000 2000000
```

#### Output 2

```
15
```

📌📌 Link thảo luận trên Facebook tại đây