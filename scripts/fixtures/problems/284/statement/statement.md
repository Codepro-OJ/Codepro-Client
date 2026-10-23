## Đề bài

Viết chương trình đọc bảng điểm học sinh, sau đó cộng mỗi học sinh 1 điểm, sử dụng pair/tuple để lưu trữ dữ liệu.

### Input:

- Dòng đầu tiên chứa số nguyên dương $ n $ $( 1 \leq n \leq 50 $), là số lượng học sinh.

- $ n $ dòng tiếp theo, mỗi dòng chứa: 

Họ tên học sinh (chuỗi, không quá 50 ký tự).  
Điểm số (số thực, từ 0.0 đến 10.0, có một chữ số thập phân).  
Hai thông tin này cách nhau bởi một dấu cách.

### Output:

- In ra $ n $ dòng, mỗi dòng chứa họ tên và điểm số của học sinh theo đúng thứ tự đã nhập sau khi được cộng 1 điểm.

- Điểm số được in với một chữ số thập phân.

### Ví dụ

#### Input 1

```
3  
Tran Phi Binh An 8.2  
Tran Phi An Binh 7.8  
Le Teo 8.6
```

#### Output 1

```
Tran Phi Binh An 9.2  
Tran Phi An Binh 8.8  
Le Teo 9.6
```

📌📌 Link thảo luận trên Facebook tại đây