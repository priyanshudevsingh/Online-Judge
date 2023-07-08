#include <bits/stdc++.h>
typedef long long ll;
using namespace std;

int n;
vector<int> graph[200001];
ll dp[200001], ans[200001];

void dfs1(int node = 1, int parent = 0, ll depth = 0)
{
	ans[1] += depth;
	dp[node] = 1;
	for (int i : graph[node])
		if (i != parent)
		{
			dfs1(i, node, depth + 1);
			dp[node] += dp[i];
		}
}

void dfs2(int node = 1, int parent = 0)
{
	for (int i : graph[node])
		if (i != parent)
		{
			ans[i] = ans[node] + n - 2 * dp[i];
			dfs2(i, node);
		}
}

int main()
{
	ios_base::sync_with_stdio(0);
	cin.tie(0);
	int t;
	cin >> t;
	while (t--)
	{
		cin >> n;
		for (int i = 1; i < n; i++)
		{
			int a, b;
			cin >> a >> b;
			graph[a].push_back(b);
			graph[b].push_back(a);
		}
		dfs1();
		dfs2();
		for (int i = 1; i <= n; i++)
			cout << ans[i] << ' ';
	}
}