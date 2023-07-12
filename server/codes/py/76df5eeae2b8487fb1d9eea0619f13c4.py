from collections import deque

def solve():
    n, m = map(int, input().split())
    vis = [[0] * m for _ in range(n)]
    for i in range(n):
        s = input()
        for j in range(m):
            if s[j] == '#':
                vis[i][j] = 1
    
    ans = 0
    dx = [0, 0, 1, -1]
    dy = [1, -1, 0, 0]
    
    for i in range(n):
        for j in range(m):
            if vis[i][j] == 1:
                continue
            vis[i][j] = 1
            
            q = deque()
            q.append((i, j))
            
            while q:
                curr = q.popleft()
                
                for k in range(4):
                    new_x = curr[0] + dx[k]
                    new_y = curr[1] + dy[k]
                    
                    if new_x < 0 or new_x >= n or new_y < 0 or new_y >= m:
                        continue
                    
                    if vis[new_x][new_y] == 1:
                        continue
                    
                    q.append((new_x, new_y))
                    vis[new_x][new_y] = 1
            
            ans += 1
    
    print(ans)

if __name__ == "__main__":
    t = int(input())
    for _ in range(t):
        solve()