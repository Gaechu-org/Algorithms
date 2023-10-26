import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.lang.Integer.min

fun main() = with(BufferedReader(InputStreamReader(System.`in`))){
    val (n, k) = readLine().split(" ").map { it.toInt() }

    val coinList = MutableList(n){0}
    val coinCountList = MutableList(k + 1){20001}

    repeat(n){
        val coin = readLine().toInt()

        coinList[it] = coin
        if(coin <= k)
            coinCountList[coin] = 1
    }

    for (i in coinList.min() .. k){
        coinCountList[i] = getMinCount(coinList, coinCountList, i)
    }

    val bw = BufferedWriter(OutputStreamWriter(System.out))
    bw.write("${
        if (coinCountList[k] == 20001) -1
        else coinCountList[k]
    }")
    bw.flush()
    bw.close()
}

fun getMinCount(coinList: MutableList<Int>, coinCountList: MutableList<Int>, now: Int): Int{
    val minList = mutableListOf<Int>()
    minList.add(coinCountList[now])

    coinList.forEach {
        var num = now - it

        if (num > 0)
            minList += coinCountList[num]
    }

    return min(minList.min() + 1, coinCountList[now])
}

/*
dp를 활용
내가 잘하는건 bottom up
지금까지 입력받은 값의 리스트를 만듬.
이 리스트를 정렬함. 그 후 제일 낮은 애 이전까지는 값을 0으로 초기화 -> 미리 초기화 해두자.
리스트에 있는 값들을 싹 1로 설정.
그렇게 해서 dp를 활용해서 값을 구함

그럼 dp를 어떻게 활용할거나...

현재값을 이전값들의 합으로 구하는 거니까
coinList에 있는 값들만큼 현재 index에서 뺀 값들중 최소값을 구하고 거기 +1 하기.
단, 이전 값이 0보다는 커야함.

 */