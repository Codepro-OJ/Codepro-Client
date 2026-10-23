## Đề bài

Nhập vào một chuỗi s, một ký tự x, và số nguyên n. Thêm các ký tự x vào đầu và cuối chuỗi s sao cho tổng độ dài của chuỗi mới bằng n, và chuỗi s nằm ở giữa.

### Input

- Dòng 1: Chuỗi s có độ dài không quá 1000 ký tự.

- Dòng 2: Ký tự x.

- Dòng 3: Số nguyên n (n ≥ độ dài của s và n ≤ 2000).

### Output

- Chuỗi mới với s nằm ở giữa và đủ n ký tự.

- Nếu số lượng ký tự cần thêm là lẻ:

Nếu n lẻ thêm nhiều hơn vào bên trái.  
Nếu n chẵn thêm nhiều hơn vào bên phải.

### Ví dụ

#### Input 1

```
Tran Phi An Binh
@
21
```

#### Output 1

```
@@@Tran Phi An Binh@@
```

(Giải thích: Số ký tự thêm vào là 5 nên lẻ, n lẻ nên bên trái nhiều hơn)

#### Input 2

```
VinhKim
$
10
```

#### Output 2

```
$VinhKim$$
```

(Giải thích: Số ký tự thêm vào là 3 nên lẻ, n chẵn nên bên phải nhiều hơn)

#### Input 3

```
Tien Giang
!
18
```

#### Output 3

```
!!!!Tien Giang!!!!
```

📌📌 Link thảo luận trên Facebook tại đây