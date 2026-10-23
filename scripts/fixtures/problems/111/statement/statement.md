## Đề bài

(Bài này sử dụng kiến thức về string, có thể sau khi làm xong bài 215 thì trở lại làm bài này)

Một số nguyên $n$ được gọi là số kỳ ảo nếu mọi số nguyên con của $n$, được tạo bằng cách lấy một số lượng chữ số liên tiếp từ bên trái của $n$, đều chia hết cho số lượng chữ số của chính số nguyên con đó.

### Quy tắc số nguyên con

- $n$ có chiều dài $k$.

- Các số nguyên con của $n$: 

Lấy 1 chữ số đầu tiên.  
Lấy 2 chữ số đầu tiên.  
Lấy 3 chữ số đầu tiên.  
...  
Lấy toàn bộ $n$.

### Input

- Một số nguyên dương $n$ ($0 < n < 10^9$).

### Output

- Yes nếu $n$ là số kỳ ảo.

- No nếu $n$ không phải là số kỳ ảo.

### Ví dụ

#### Input 1

```
4412
```

#### Output 1

```
Yes
```

#### Input 2

```
4413
```

#### Output 2

```
No
```

📌📌 Link thảo luận trên Facebook tại đây