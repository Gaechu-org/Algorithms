import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.util.*

private val br = BufferedReader(InputStreamReader(System.`in`))
private val nm = br.readLine().split(" ").map { it.toInt() }
private val N = nm[0]
private val M = nm[1]

private val graph = Array(M) { br.readLine().map { it.digitToInt() }.toMutableList() }
private val visited = Array(M) { Array(N) { 0 } }
private val stepX = listOf(0, 1, 0, -1)
private val stepY = listOf(1, 0, -1, 0)

fun main() {
    val bw = BufferedWriter(OutputStreamWriter(System.out))
    bw.write("${bfs()}")
    bw.flush()
    bw.close()
}


private fun bfs(): Int {
    // x좌표, y좌표, 벽을 뚫은 횟수
    val queue = LinkedList<Triple<Int, Int, Int>>()

    queue.offer(Triple(0, 0, 0));
    visited[0][0] = 1

    var min = -1
    while (queue.isNotEmpty()) {
        // 코틀린 구조분해 문법
        val (x, y, cnt) = queue.poll()

        // 원하는 곳 도착
        if (x == M - 1 && y == N - 1) {
            min = cnt
            break
        }

        for (step in 0 until 4) {
            val newPointX = x + stepX[step]
            val newPointY = y + stepY[step]

            if (checkValidArea(newPointX, newPointY))
                continue

            visited[newPointX][newPointY] = 1

            val position = graph[newPointX][newPointY]

            if (position == 1) {
                queue.add(Triple(newPointX, newPointY, cnt + 1))
                graph[newPointX][newPointY] = 0
            } else {
                queue.addFirst(Triple(newPointX, newPointY, cnt))
            }
        }
    }
    return min
}

fun checkValidArea(newPointX: Int, newPointY: Int) =
    (newPointX !in 0 until M) && (newPointY !in 0 until N) && (visited[newPointX][newPointY] == 1)
