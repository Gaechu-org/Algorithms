from collections import deque

n, m = map(int, input().split())
board = [list(map(int, input().rstrip())) for _ in range(n)]

# i:0 벽 파괴 가능
# i:1 벽 파괴 불가능 
visited = [[[0, 0] for _ in range(m)] for _ in range(n)]
visited[0][0][0] = 1

dx, dy = [-1, 1 ,0, 0], [0, 0, -1, 1]

def bfs(x, y, z) :
    q = deque()
    q.append((x, y, z))

    while q :
        x, y, z = q.popleft()

        # 최종 위치 도달 시 방문 수 반환
        if x == n - 1 and y == m - 1 :
            return visited[x][y][z]

        for i in range(4) :
            nextX = x + dx[i]
            nextY = y + dy[i]
            
            # 다음 좌표가 범위 내에 있을 시
            if 0 <= nextX < n and 0 <= nextY < m:
                
                # 다음 좌표가 벽인 경우 벽 부수기
                if board[nextX][nextY] == 1 and z == 0 :
                    visited[nextX][nextY][1] = visited[x][y][0] + 1
                    q.append((nextX, nextY, 1))

                # 다음 좌표가 벽이 아니고, 방문하지 않았을 경우
                elif board[nextX][nextY] == 0 and visited[nextX][nextY][z] == 0 :
                    visited[nextX][nextY][z] = visited[x][y][z] + 1
                    q.append((nextX, nextY, z))

    return -1

print(bfs(0, 0, 0))
