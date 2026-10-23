## Đề bài

Viết chương trình nhập vào một tập hợp $ s $ các số nguyên, sau đó xoá số nguyên $ x $ khỏi tập hợp $ s $ nếu nó tồn tại.

### Input:

- Dòng đầu tiên chứa số nguyên $ n $ $( 1 \leq n \leq 10^6 $) là số lượng phần tử trong tập hợp $ s $.

- Dòng thứ hai chứa $ n $ số nguyên (giá trị tuyệt đối không quá $ 10^6 $), các số cách nhau bởi một dấu cách.

- Dòng thứ ba chứa số nguyên $ x $ cần xoá (giá trị tuyệt đối không quá $ 10^6 $).

### Output:

- Nếu $ x $ có trong tập hợp, in ra tập hợp sau khi đã xoá $ x $, các số được in theo thứ tự ban đầu, mỗi số cách nhau bởi một dấu cách.

- Nếu $ x $ không có trong tập hợp, in NO CHANGE.

- Nếu tập hợp rỗng sau khi xoá, in EMPTY.

### Ví dụ

#### Input 1

```
5  
1 2 3 4 5  
3
```

#### Output 1

```
1 2 4 5
```

#### Input 2

```
4  
1 2 3 4  
6
```

#### Output 2

```
NO CHANGE
```

#### Input 3

```
1  
1  
1
```

#### Output 3

```
EMPTY
```

📌📌 Link thảo luận trên Facebook tại đây