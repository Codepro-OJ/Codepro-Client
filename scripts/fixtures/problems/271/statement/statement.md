## Đề bài

Nhập một ngày và giờ và in ra theo một định dạng tùy chỉnh, ví dụ: dd/M/yyyy hh:m:ss.

### Input

- Dòng đầu chứa ngày và giờ theo định dạng yyyy-MM-dd hh:mm:ss.

- Dòng tiếp theo chứa định dạng tùy ý, ví dụ: dd-MM-yyyy hh:mm:ss.

### Output

- In ra ngày và giờ theo định dạng tùy chỉnh.

Quy luật là:

- yyyy → năm 4 chữ số (2024)

- yy → 2 số cuối của năm (24)

- MM → tháng 2 chữ số (04)

- M → tháng không có số 0 đầu (4)

- dd → ngày 2 chữ số (03)

- d → ngày không có số 0 đầu (3)

- hh→ giờ 2 chữ số (03)

- h→ giờ 1 chữ số (3)

- mm→ phút 2 chữ số (05)

- m→ phút 1 chữ số (5)

- ss→ giây 2 chữ số (06)

- s→ giây 1 chữ số (6)

### Ví dụ

#### Input 1

```
2024-04-03 04:05:03
d-MM-yyyy hh:m:s
```

#### Output 1

```
3-04-2024 04:5:3
```

#### Input 2

```
2024-02-03 14:45:30
yyyy/M/dd
```

#### Output 2

```
2024/2/03
```

📌📌 Link thảo luận trên Facebook tại đây