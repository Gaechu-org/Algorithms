# 1644 소수의 합

import math

n = int(input())

# num_list : 소수의 배수일 때 False로 바뀌는 전체 수의 list
# prime num : 소수를 담을 list
num_list = [False, False] + [True] * (n-1)
prime_num = []

# 소수의 배수일때 False로 변경 False로 바뀌지 않은 수라면 소수(prime_num에 추가)
for i in range(2, n+1):
    if num_list[i]:
        prime_num.append(i)
        for j in range(2*i, n+1, i):
            num_list[j] = False

# 투포인터 (n 보다 작을 경우 end +1 , 클경우 start +1)
answer = 0
start = 0
end = 0
while end <= len(prime_num):
    temp_sum = sum(prime_num[start:end])
    if temp_sum == n:
        answer += 1
        end += 1
    elif temp_sum < n:
        end += 1
    else:
        start += 1

print(answer)
