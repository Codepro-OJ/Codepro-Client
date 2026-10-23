## Đề bài

Viết một hàm xóa tất cả các ký tự trắng (khoảng trắng) thừa ở bên phải và bên trái của chuỗi. Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ chuỗi, sử dụng hàm vừa viết để xử lý từng chuỗi trong danh sách.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một chuỗi $s$ $(1 \leq |s| \leq 100)$, có thể chứa các ký tự in hoa, in thường, khoảng trắng và các ký tự đặc biệt.

### Output

- In ra các chuỗi đã được xử lý, với tất cả các ký tự trắng thừa ở đầu và cuối chuỗi bị xóa bỏ.

### Ví dụ

#### Input 1

```
3
Tran Phi An Binh    
   Vinh Kim
Tien Giang
```

#### Output 1

```
Tran Phi An Binh
Vinh Kim
Tien Giang
```

#### Input 2

```
2
   Tien Giang    
   Viet Nam
```

#### Output 2

```
Tien Giang
Viet Nam
```

📌📌 Link thảo luận trên Facebook tại đây