import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import kotlin.time.Duration.Companion.seconds

fun main() = with(BufferedReader(InputStreamReader(System.`in`))){
    val N = readLine().toInt()
    val dayList = MutableList<Pair<Int, Int>>(N){Pair(0,0)}

    // 입력받은 월과 일을 합쳐서 계산하기 위해 월*100을 하여 int로 표기
    repeat(N){
        val date = readLine().split(" ").map { it.toInt() }
        dayList[it] = Pair(date[0] * 100 + date[1], date[2] * 100 + date[3])
    }

    val bw = BufferedWriter(OutputStreamWriter(System.out))
    bw.write(countFlowers(dayList).toString())
    bw.flush()
    bw.close()
}

fun countFlowers(dayList: List<Pair<Int, Int>>): Int{
    var startDay = 301
    val finalEndDay = 1130

    var cnt = 0

    while (startDay <= finalEndDay){
        // 리스트 중에서 목표 시작일보다 이전에 시작하는 값 중 끝나는 날이 가장 긴 기간을 선택
        var temp = dayList.filter { it.first <= startDay }.maxByOrNull { it.second }

        // maxByOrNull의 경우 해당하는 값이 없으면 null을 반환.
        // Null(목표시작일보다 이전에 시작하는 값이 없음) or 시작일보다 이전에 끝나는경우는 return 0
        if (temp == null || temp.second <= startDay) return 0

        cnt++
        startDay = temp.second
    }

    return cnt
}
