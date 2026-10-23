## Đề bài

Nhập vào hai số nguyên $m$ và $n$, in các số nguyên tố từ $m$ đến $n$. 
Số nguyên tố là số tự nhiên lớn hơn $1$ và chỉ chia hết cho $1$ và chính nó (chỉ có đúng 2 ước).

#### Ví dụ:

- $n = 7$: $7$ là số nguyên tố vì $7$ chỉ chia hết cho $1$ và $7$.

- $n = 8$: $8$ không phải số nguyên tố vì ngoài chia hết cho $1$ và $8$, $8$ còn chia hết cho $2$ và $4$.

### Input

- Dòng một: Một số nguyên $m$.

- Dòng hai: Một số nguyên $n$ ($|m|, |n| < 10^2, m \leq n$).

### Output

- Một dòng chứa các số nguyên tố từ $m$ đến $n$, cách nhau bởi dấu cách. Nếu không có số nguyên tố nào thì in dấu "-"

### Ví dụ

#### Input 1

```
3  
15
```

#### Output 1

```
3 5 7 11 13
```

#### Input 2

```
12  
31
```

#### Output 2

```
13 17 19 23 29 31
```

📌📌 Link thảo luận trên Facebook tại đây