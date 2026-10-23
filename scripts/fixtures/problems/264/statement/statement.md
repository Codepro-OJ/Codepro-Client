## Đề bài

Viết một hàm kiểm tra xem chuỗi nhập vào có phải là chuỗi đối xứng hay không. 
Định nghĩa:

- Chuỗi đối xứng là chuỗi mà khi đọc ngược lại vẫn giống như chuỗi ban đầu (phân biệt chữ in hoa và chữ in thường).

Sau đó, nhập vào một số nguyên $m$ và danh sách $m$ chuỗi, sử dụng hàm vừa viết để kiểm tra chuỗi đối xứng cho từng chuỗi trong danh sách.

### Input

- Dòng đầu chứa một số nguyên $m$ $(1 \leq m \leq 100)$.

- $m$ dòng tiếp theo, mỗi dòng chứa một chuỗi $s$ $(1 \leq |s| \leq 100)$, có thể chứa các ký tự in hoa, in thường, chữ số và khoảng trắng.

### Output

- In ra YES nếu chuỗi là đối xứng, và NO nếu chuỗi không phải đối xứng tương ứng với mỗi dòng trong input.

### Ví dụ

#### Input 1

```
3
madam
hello
racecar
```

#### Output 1

```
YES
NO
YES
```

#### Input 2

```
4
Telet
abc cba
123432
12321
```

#### Output 2

```
NO
YES
NO
YES
```

📌📌 Link thảo luận trên Facebook tại đây