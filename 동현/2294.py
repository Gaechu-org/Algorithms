# 2294 동전 2

n, k = map(int, input().split())

coins = [int(input()) for _ in range(n)]

# 각 가격마다 최소 코인 갯수를 저장할 dp List
dp = [10001] * (k + 1)
dp[0] = 0

for coin in coins:
# 현재 가격에서 코인을 빼주었을 때의 코인 사용개수에 현재 코인 개수 하나를 더한 값
# 이전 코인들로만 조합했을 때 사용된 코인 갯수 중 최소값
   for i in range(coin, k+1):
       dp[i] = min(dp[i], dp[i-coin]+1)

if dp[k] == 10001:
   print(-1)
else:
   print(dp[k])
