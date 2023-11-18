# 알고스팟

from collections import deque

N, M = map(int, input().split())
board = [list(map(int, input())) for _ in range(M)]

broken = [[-1] * N for _ in range(M)]  # 벽을 깬 횟수를 저장

dx, dy = [1, 0, -1, 0], [0, 1, 0, -1]  

def bfs(a, b):
    q = deque()
    q.append([a, b])
    broken[0][0] = 0  # 처음 벽을 깬 횟수

    while q:
        x, y = q.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            # 다음 좌표가 범위 내에 있을 시
            if 0 <= nx < M and 0 <= ny < N:
                # 아직 해당 방을 방문하지 않았다면
                if broken[nx][ny] == -1:  
                    # 만약 벽이 없다면
                    if board[nx][ny] == 0:
                        broken[nx][ny] = broken[x][y]  # 전의 벽을 깬 횟수 전달
                        q.appendleft([nx, ny])  # 큐의 맨 왼쪽에 넣어 다음 회차에 돌도록 한다.

                    # 만약 벽이 있다면
                    else:
                        broken[nx][ny] = broken[x][y] + 1  # 전의 벽을 깬 횟수에서 +1 해준다.
                        q.append([nx, ny])  # 큐의 맨 오른쪽에 추가

bfs(0, 0)
print(broken[M - 1][N - 1])
