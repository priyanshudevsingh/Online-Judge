import java.util.*;
import java.io.*;

public class MyClass_86a3ca7886cd4e588fb7422bfc56be80 {
    public static void random(char[][] c, int i, int j, boolean[][] visited) {
        int n = c.length;
        int m = c[0].length;
        if (i < 0 || j < 0 || i > n - 1 || j > m - 1 || c[i][j] == '#' || visited[i][j])
            return;
        visited[i][j] = true;
        random(c, i - 1, j, visited);
        random(c, i, j + 1, visited);
        random(c, i + 1, j, visited);
        random(c, i, j - 1, visited);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int t = Integer.parseInt(br.readLine());
        while (t-- > 0) {
            String s[] = br.readLine().split(" ");
            int n = Integer.parseInt(s[0]);
            int m = Integer.parseInt(s[1]);
            char c[][] = new char[n][m];
            for (int i = 0; i < n; i++) {
                c[i] = br.readLine().toCharArray();
            }
            int ans = 0;
            boolean[][] visited = new boolean[n][m];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < m; j++) {
                    if (!visited[i][j] && c[i][j] == '.') {
                        ans++;
                        random(c, i, j, visited);
                    }
                }
            }
            System.out.println(ans);
        }
    }
}
