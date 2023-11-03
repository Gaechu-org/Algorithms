import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.util.*

private val br = BufferedReader(InputStreamReader(System.`in`))
private val nm = br.readLine().split(" ").map { it.toInt() }

private val graph = Array(nm[0]) { br.readLine().map { it.digitToInt() } }
private val visited = Array(nm[0]) { Array(nm[1]) { Array(2) { 0 } } }
private val stepX = listOf(0, 1, 0, -1)
private val stepY = listOf(1, 0, -1, 0)

fun main() {
    val bw = BufferedWriter(OutputStreamWriter(System.out))
    bw.write("${bfs()}")
    bw.flush()
    bw.close()
}

private fun bfs(): Int {
    val N = nm[0]
    val M = nm[1]

    // x좌표, y좌표, 벽을 뚫었는지 여부
    val queue = LinkedList<Triple<Int, Int, Int>>()

    queue.offer(Triple(0, 0, 1));
    visited[0][0][1] = 1

    while (queue.isNotEmpty()) {
        // 코틀린 구조분해 문법
        val (x, y, broken) = queue.poll()

        // 원하는 곳 도착
        if (x == N - 1 && y == M - 1) return visited[x][y][broken]

        for (step in 0 until 4) {
            val newPointX = x + stepX[step]
            val newPointY = y + stepY[step]

            if (newPointX < 0 || newPointX >= N)
                continue
            if (newPointY < 0 || newPointY >= M)
                continue

            val position = graph[newPointX][newPointY]

            if (position == 1 && broken == 1) {
                queue.offer(Triple(newPointX, newPointY, 0))
                visited[newPointX][newPointY][0] = visited[x][y][1] + 1
            }

            if (position == 0 && visited[newPointX][newPointY][broken] == 0) {
                queue.add(Triple(newPointX, newPointY, broken))
                visited[newPointX][newPointY][broken] = visited[x][y][broken] + 1
            }

        }
    }

    return -1
}