const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
const directionX = [1, -1, 0, 0];
const directionY = [0, 0, 1, -1];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, m] = input.shift().split(" ").map(Number);
  const maze = input.map((row) => row.split("").map(Number));

  console.log(solve(n, m, maze));
  process.exit();
});

const solve = (n, m, maze) => {
  // 덱 자료구조를 사용 (배열로 구현)
  const dequeue = [];
  const visited = Array.from({ length: m }, () => new Array(n).fill(0));

  // 시작점 push
  dequeue.push({ x: 0, y: 0, cnt: 0 });
  visited[0][0] = 1;

  while (dequeue.length) {
    const { x, y, cnt } = dequeue.shift();

    // 목표 지점에 도달했는지 확인
    if (y === m - 1 && x === n - 1) {
      return cnt;
    }

    // 움직임 추가
    for (let i = 0; i < 4; i += 1) {
      const [moveX, moveY] = [x + directionX[i], y + directionY[i]];

      // 움직이는 좌표가 유효한 영역인지 확인
      if (moveX < 0 || moveX >= n || moveY < 0 || moveY >= m) {
        continue;
      }

      // 이미 방문한 노드인지 확인
      if (visited[moveY][moveX] === 1) {
        continue;
      }

      // 방문 처리
      visited[moveY][moveX] = 1;

      // 미로의 지점이 벽일 시
      if (maze[moveY][moveX] === 1) {
        maze[moveY][moveX] = 0;
        dequeue.push({ x: moveX, y: moveY, cnt: cnt + 1 });
      }
      // 미로의 지점이 벽이 아니라면 우선적으로 추가
      else {
        dequeue.unshift({ x: moveX, y: moveY, cnt });
      }
    }
  }
};
