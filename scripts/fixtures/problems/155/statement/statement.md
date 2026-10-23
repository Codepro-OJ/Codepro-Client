## Đề bài

Nhập vào một mảng số nguyên $a: a_0, a_1, a_2, \dots$. Tạo bản sao của mảng $a$ sang mảng $b$. Sau đó, xóa tất cả các phần tử trong mảng $a$ (Sử dụng clear). Lưu các giá trị bé hơn giá trị trung bình trong mảng $b$ vào mảng $a$ đúng thứ tự xuất hiện từ trái sang phải trong mảng $b$.

### Input

- Một dòng chứa các số nguyên của mảng $a$ có giá trị tuyệt đối không vượt quá $10^5$, cách nhau bởi dấu cách, có không quá $10^6$ số.

### Output

- Dòng đầu tiên in mảng $a$ sau khi lưu các giá trị bé hơn giá trị trung bình từ mảng $b$.

- Dòng thứ hai in mảng $b$ sau khi đã tạo bản sao từ mảng $a$.

### Ví dụ

#### Input 1

```
5 3 8 2 5 1 4
```

#### Output 1

```
3 2 1
5 3 8 2 5 1 4
```

#### Input 2

```
10 20 30 20 40
```

#### Output 2

```
10 20 20  
10 20 30 20 40
```

📌📌 Link thảo luận trên Facebook tại đây