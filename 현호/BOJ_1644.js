const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const input = [];

rl.on('line', (line) => {
  input.push(line);
}).on('close', () => {
  solution(input);
  process.exit();
});

const solution = function (input) {
  const target = Number(input);
  const primes = getPrimeNumbers(target);
  const current = {
    start: 0,
    end: 0,
  };
  let answer = 0;

  while (true) {
    let sum = 0;

    for (let i = current.start; i <= current.end; i += 1) {
      sum += primes[i];
    }
    // 투포인터 알고리즘을 활용한다.
    // 같으면 answer을 1 올려주고 시작점을 한칸 뒤로 이동시킨다
    if (sum === target) {
      answer += 1;
      current.start += 1;
    }
    // sum이 target보다 작고, 아직 종료 커서가 끝까지 가지 않았다면 end 인덱스를 1 올려준다.
    else if (sum < target && current.end < primes.length - 1) {
      current.end += 1;
    }
    // sum이 target보다 크고, 아직 시작 커서가 끝까지 가지 않았다면 start 인덱스를 1 올려준다.
    else if (sum > target && current.start < primes.length - 1) {
      current.start += 1;
    }
      // 1. sum이 target보다 작지만, 종료 커서가 끝까지 가있을 때 -> 더이상 구할 필요가 없음
    // 2. sum이 target보다 크지만, 시작 커서가 끝까지 가있을 때 -> 더이상 구할 필요가 없음
    else {
      break;
    }
  }
  console.log(answer);
};

// 에라토스테네스의 체 알고리즘을 활용해서 소수 배열 구하기
const getPrimeNumbers = function (n) {
  const prime = [];
  const numbers = Array.from({length: n + 1}, (v, i) => i);

  // 소수는 2부터 시작해서 n까지 확인한다
  for (let i = 2; i <= n; i += 1) {
    if (numbers[i] === 0) {
      continue;
    }
    prime.push(numbers[i]);
    numbers[i] = 0;
    // numbers[i]가 소수라면, numbers[i]의 배수들은 소수가 아니므로 0으로 바꿔준다
    for (let j = i * 2; j <= n; j += i) {
      if (numbers[j] === 0) {
        continue;
      }
      numbers[j] = 0;
    }
  }
  return prime;
}
