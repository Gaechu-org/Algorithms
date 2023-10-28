const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];
const flower = [];
let answer = 0;

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  parse(input);
  process.exit();
});

function parse() {
  const amount = Number(input.shift());

  input.forEach((str) => {
    flower.push(str.split(' ').map(Number));
  });
  
  solve(amount);
}

function solve(amount) {
  const visit = Array.from({ length: amount }, () => false);
  const startDate = {
    month: 3,
    day: 1,
  };
  const endDate = {
    month: 0,
    day: 0,
  };
  let index = -1;

  while (true) {
    for (let i = 0; i < amount; i += 1) {
      const [startMonth, startDay, endMonth, endDay] = flower[i];

      // 이미 방문한 노드면 제낀다
      if (visit[i]) {
        continue ;
      }

      // 현재까지 조사한 개화시점보다 빠른지 여부 조사
      if (startMonth < startDate.month || startMonth === startDate.month && startDay <= startDate.day) {
        // 현재까지 조사한 낙화시점보다 늦는지 여부 조사
        if (endMonth > endDate.month || endMonth === endDate.month && endDay > endDate.day) {
          // 현재 값보다 개화가 더 빠르고 낙화가 더 늦다면 해당 index를 기억한다
          index = i;
          endDate.month = endMonth;
          endDate.day = endDay;
        }
      }
    }

    // index가 -1이라면 애초에 안되는 값들만 주어진거임
    if (index === -1) {
      console.log(0);
      break;
    }

    // index가 갱신되었다면, 적합한 값을 찾았다는 의미이므로 startDate를 갱신한다.
    startDate.month = flower[index][2];
    startDate.day = flower[index][3];

    // 갱신된 startDate의 시작 달이 12월이라면 더이상 조사할 필요 없으므로, 현재 계산된 값에 + 1 하고 종료
    if (startDate.month === 12) {
      console.log(answer + 1);
      break;
    }

    // 노드의 방문처리
    visit[index] = true;
    answer += 1;
    // 값 초기화
    endDate.month = 0;
    endDate.day = 0;
    index = -1;
  }
}
