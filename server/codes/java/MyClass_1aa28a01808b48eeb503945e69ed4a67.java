import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class MyClass_1aa28a01808b48eeb503945e69ed4a67 {
    public static void main(String[] args) {
        FastReader reader = new FastReader();
        int t = reader.nextInt();
        while (t-- > 0) {
            solve(reader);
        }
    }

    static void solve(FastReader reader) {
        int n = reader.nextInt();
        int m = reader.nextInt();
        int[][] vis = new int[n][m];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                char c = reader.nextChar();
                if (c == '#') {
                    vis[i][j] = 1;
                }
            }
        }

        int ans = 0;
        int[] dx = { 0, 0, 1, -1 };
        int[] dy = { 1, -1, 0, 0 };

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                if (vis[i][j] == 1) {
                    continue;
                }
                vis[i][j] = 1;

                Queue<int[]> queue = new ArrayDeque<>();
                queue.offer(new int[] { i, j });

                while (!queue.isEmpty()) {
                    int[] curr = queue.poll();

                    for (int k = 0; k < 4; k++) {
                        int newX = curr[0] + dx[k];
                        int newY = curr[1] + dy[k];

                        if (newX < 0 || newX >= n || newY < 0 || newY >= m) {
                            continue;
                        }

                        if (vis[newX][newY] == 1) {
                            continue;
                        }

                        queue.offer(new int[] { newX, newY });
                        vis[newX][newY] = 1;
                    }
                }

                ans += 2;
            }
        }

        System.out.println(ans);
    }

    static class FastReader {
        BufferedReader reader;
        StringTokenizer tokenizer;

        FastReader() {
            reader = new BufferedReader(new InputStreamReader(System.in));
            tokenizer = null;
        }

        String next() {
            while (tokenizer == null || !tokenizer.hasMoreTokens()) {
                try {
                    String line = reader.readLine();
                    if (line == null || line.isEmpty()) {
                        return null;
                    }
                    tokenizer = new StringTokenizer(line);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            return tokenizer.nextToken();
        }

        int nextInt() {
            String nextToken = next();
            if (nextToken == null) {
                return 0;
            }
            return Integer.parseInt(nextToken);
        }

        char nextChar() {
            String nextToken = next();
            if (nextToken == null || nextToken.isEmpty()) {
                return '\0';
            }
            return nextToken.charAt(0);
        }
    }

}
