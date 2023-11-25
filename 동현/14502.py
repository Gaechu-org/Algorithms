from collections import deque
import copy

n, m = map(int, input().split())
graph = []
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
def bfs():
    queue = deque()
    tmp_graph = copy.deepcopy(graph) # 얕은 복사 시 원본 배열이 흐트러짐

    # 바이러스 큐에 삽입
    for i in range(n):
        for j in range(m):
            if tmp_graph[i][j] == 2:
                queue.append((i, j))
    
    # 탐색
    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue
            if tmp_graph[nx][ny] == 0: # 감염이 안되었다면
                tmp_graph[nx][ny] = 2  # 감영
                queue.append((nx, ny))
    global answer
    cnt = 0
    for i in range(n):
        cnt += tmp_graph[i].count(0)
    
    answer = max(answer, cnt)


def makeWall(cnt):
    if cnt == 3:
        bfs()
        return
    for i in range(n):
        for j in range(m):
            if graph[i][j] == 0: # 빈 공간이라면
                graph[i][j] = 1 # 벽을 세우기
                makeWall(cnt+1) # 다음 벽 세우기
                graph[i][j] = 0 # 다시 벽허물기

for i in range(n):
    graph.append(list(map(int, input().split())))

answer = 0
makeWall(0)
print(answer)