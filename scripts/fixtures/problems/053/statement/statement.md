## Đề bài

Nhập vào tuổi $t$ của một người và xác định giai đoạn tuổi như sau:

- Nếu $t < 18$: Trẻ em 

Nếu $t \leq 6$: Trẻ mầm non 
Nếu $7 \leq t \leq 11$: Trẻ tiểu học 
Nếu $12 \leq t \leq 17$: Trẻ trung học

- Nếu $18 \leq t < 60$: Người trưởng thành 

Nếu $18 \leq t \leq 23$: Sinh viên 
Nếu $24 \leq t < 60$: Người đi làm

- Nếu $t \geq 60$: Người cao tuổi 

Nếu $60 \leq t \leq 62$: Sắp nghỉ hưu 
Nếu $t > 62$: Đã nghỉ hưu

### Input

- Một số nguyên $t$ $(0 < t \leq 10^2)$.

### Output

- Dòng 1: Tre em, Nguoi truong thanh, hoặc Nguoi cao tuoi.

- Dòng 2: Mô tả chi tiết (Tre mam non, Tre tieu hoc, Tre trung hoc, Sinh vien, Nguoi di lam, Sap nghi huu, hoặc Da nghi huu).

### Ví dụ

#### Input 1

```
10
```

#### Output 1

```
Tre em
Tre tieu hoc
```

#### Input 2

```
25
```

#### Output 2

```
Nguoi truong thanh
Nguoi di lam
```

📌📌 Link thảo luận trên Facebook tại đây