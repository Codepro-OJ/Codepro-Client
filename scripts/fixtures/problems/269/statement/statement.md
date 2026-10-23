## Đề bài

Viết hàm draw_empty_rectangle(d, r, c) nhận vào 3 tham số:

- $d$: Chiều dài của hình chữ nhật (số ký tự trong mỗi hàng).

- $r$: Chiều rộng của hình chữ nhật (số hàng).

- $c$: Ký tự sẽ dùng để in hình chữ nhật.

Hàm này in ra hình chữ nhật rỗng, chỉ có ký tự $c$ ở các cạnh của hình chữ nhật. Hình chữ nhật có chiều dài $d$ và chiều rộng $r$.

### Input

- Dòng đầu chứa hai số nguyên $d, r$ $(1 \leq d, r \leq 100)$.

- Dòng thứ hai chứa một ký tự $c$.

### Output

- Vẽ hình chữ nhật rỗng theo yêu cầu.

### Ghi chú

- Hàm draw_empty_rectangle(d, r, c) không có giá trị trả về (return), được gọi là thủ tục (procedure) hoặc hàm void trong một số ngôn ngữ lập trình.

### Ví dụ

#### Input 1

```
5 4
*
```

#### Output 1

```
*****
*   *
*   *
*****
```

#### Input 2

```
6 3
#
```

#### Output 2

```
######
#    #
######
```

📌📌 Link thảo luận trên Facebook tại đây