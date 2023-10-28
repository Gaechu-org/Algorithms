const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  const [n, k] = input.shift().split(" ").map(Number);
  const coin = [...new Set(input.map(Number).filter((value) => value <= k))];

  solve(k, coin);
  process.exit();
});

const solve = (k, coin) => {
  // dp에 사용할 배열 생성 (k <= 10000)이라서 배열은 +1 길이로 생성해줌
  const dp = Array.from({ length: 10001 }, () => Infinity);

  // 첫번째 값 초기화
  dp[0] = 0;
  // coin을 순회하며 dp로직 실행
  coin.forEach((price) => {
    // dp[i] = 해당 금액을 만들 수 있는 동전의 최소 개수
    for (let i = price; i <= k; i += 1) {
      // dp[i]와 dp[i - price] + 1 비교하여 최솟값 선정
      dp[i] = Math.min(dp[i], dp[i - price] + 1);
    }
  });
  // Infinity면 경우의 수가 없는 것 이므로, 입력된 동전으로는 금액을 만들 수 없음
  console.log(dp[k] === Infinity ? -1 : dp[k]);
};
