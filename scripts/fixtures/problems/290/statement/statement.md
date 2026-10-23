## Đề bài

Viết chương trình nhập vào hai tập hợp $ s1 $ và $ s2 $ chứa các số nguyên, sau đó in ra các số có trong $ s1 $ nhưng không có trong $ s2 $.

### Input:

- Dòng đầu tiên chứa số nguyên $ n $ $( 1 \leq n \leq 10^6 $) là số lượng phần tử trong tập hợp $ s1 $.

- Dòng thứ hai chứa $ n $ số nguyên (giá trị tuyệt đối không quá $ 10^6 $), các số cách nhau bởi một dấu cách.

- Dòng thứ ba chứa số nguyên $ m $ $( 1 \leq m \leq 10^6 $) là số lượng phần tử trong tập hợp $ s2 $.

- Dòng thứ tư chứa $ m $ số nguyên (giá trị tuyệt đối không quá $ 10^6 $), các số cách nhau bởi một dấu cách.

### Output:

- In ra các số có trong $ s1 $ nhưng không có trong $ s2 $, theo thứ tự xuất hiện ban đầu trong $ s1 $.

- Nếu không có số nào thỏa mãn, in EMPTY.

### Ví dụ

#### Input 1

```
5  
1 2 3 4 5  
3  
1 3 5
```

#### Output 1

```
2 4
```

#### Input 2

```
4  
1 2 3 4  
5  
1 2 3 4 5
```

#### Output 2

```
EMPTY
```

📌📌 Link thảo luận trên Facebook tại đây