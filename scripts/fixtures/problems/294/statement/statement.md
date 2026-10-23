## Đề bài

Viết chương trình nhập vào một chuỗi $ s $, sau đó tạo một từ điển $ b $ (kiểu dữ liệu map/dict), trong đó:

- Key là các ký tự xuất hiện trong chuỗi $ s $.

- Value là số lần xuất hiện tương ứng của mỗi ký tự trong $ s $.

Sau đó, in từng ký tự cùng với số lần xuất hiện theo thứ tự value tăng dần. Nếu có các ký tự với số lần xuất hiện bằng nhau thì xếp các key tăng dần theo mã ASCII

### Input:

- Một dòng chứa chuỗi $ s $ $( 1 \leq \text{len}(s) \leq 1000 $), gồm các ký tự chữ cái, chữ số và ký tự đặc biệt.

### Output:

- Mỗi dòng in ra một ký tự cùng với số lần xuất hiện của nó, cách nhau bởi một dấu cách.

- Các ký tự được in theo thứ tự số lần xuất hiện tăng dần.

### Ví dụ

#### Input 1

```
banana321
```

#### Output 1

```
1 1
2 1
3 1
b 1  
n 2  
a 3
```

📌📌 Link thảo luận trên Facebook tại đây