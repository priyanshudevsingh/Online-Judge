// codex by freakingflux
#include <bits/stdc++.h>
using namespace std;
#define ull unsigned long long
#define fast()                        \
    ios_base::sync_with_stdio(false); \
    cin.tie(NULL);                    \
    cout.tie(NULL)
#define tc     \
    ll tt;     \
    cin >> tt; \
    while (tt--)
#define ll long long
#define loop(i, ini, n) for (ll i = ini; i < (ll)n; i++)
#define pool(i, n, last) for (ll i = (ll)n; i > last; i--)
#define all(x) x.begin(), x.end()
#define inf 1e17
#define ninf INT_MIN
#define pb push_back
#define po pop_back
#define sz size()
#define ed end()
#define be begin()
#define mi(x) min_element(all(x))
#define mx(x) max_element(all(x))
#define am accumulate
#define rv(x) reverse(all(x))
#define fi first
#define se second
#define lb lower_bound
#define ub upper_bound
#define vl vector<ll>
#define pl pair<ll, ll>
#define vll vector<vector<ll>>
#define vp vector<pl>
#define ml map<ll, ll>
#define sl set<ll>
#define msl multiset<ll>
#define mml multimap<ll, ll>
#define pq priority_queue<ll>
#define pi 3.1415926536
#define deb cout << "---\n";
#define py cout<<"YES\n";
#define pn cout<<"NO\n";
#define read  \
    ll n;     \
    cin >> n; \
    vl v(n);  \
    loop(i, 0, n) cin >> v[i];
ll mod = 1e9 + 7;
 
void rotate(vl &v, ll k)
{
    ll n = v.sz;
    k = k % n;
    reverse(v.be, v.be + k);
    reverse(v.be + k, v.ed);
    rv(v);
}
 
bool is_prime(ll n)
{
    // T.C sqrt(n)
    if (n == 0 || n == 1)
        return false;
 
    for (ll i = 2; i * i <= n; i++)
    {
        if (n % i == 0)
            return false;
    }
 
    return true;
}
 
vl prime_upto_n(ll n)
{
    // T.C n*log(log(n))
    vector<ll> isPrime(n + 1, 1), lp(n + 1, 0), hp(n + 1, 0);
    isPrime[0] = isPrime[1] = 0;
 
    for (ll i = 2; i <= n; i++)
    {
        if (isPrime[i])
        {
            lp[i] = hp[i] = i;
            for (ll x = i * i; x <= n; x += i)
            {
                isPrime[x] = 0;
                hp[x] = i;
                if (lp[x] == 0)
                    lp[x] = i;
            }
        }
    }
 
    return isPrime;
}
 
sl allFactors(ll n)
{
    // T.C sqrt(n)
    sl factors;
    for (ll i = 1; i * i <= n; i++)
    {
        if (n % i == 0)
        {
            factors.insert(i);
            if (n / i != i)
                factors.insert(n / i);
        }
    }
 
    return factors;
}
 
ml allPrimefactors(ll n)
{
    // T.C sqrt(n)
    ml primeFactors;
    for (ll i = 2; i * i <= n; i++)
    {
        while (n % i == 0)
        {
            primeFactors[i]++;
            n /= i;
        }
    }
    if (n > 1)
        primeFactors[n]++;
 
    return primeFactors;
}
 
pair<double, ll> sumCnt_of_divisors(ll n)
{
    // T.C sqrt(n)
    ll v = 1;
    double sum = 1;
    ml x = allPrimefactors(n);
 
    for (auto x : x)
    {
        v *= (x.se + 1);
        sum *= ((pow(x.fi, x.se + 1) - 1) / (x.fi - 1));
    }
 
    return {sum, v};
}
 
ll binpow(ll x, ll b)
{
    // T.C log(n)
    if (b == 0)
        return 1;
 
    ll ans = binpow(x, b / 2);
 
    if (b % 2)
        return ((ans % mod * ans % mod) % mod * x % mod) % mod;
    else
        return (ans % mod * ans % mod) % mod;
}
 
ll gcd(ll x, ll b)
{
    // T.C log(min(x, b));
    while (b)
    {
        x %= b;
        swap(x, b);
    }
 
    return x;
}
 
// void setIO(string s)
// {
//     freopen((s + ".in").c_str(), "r", stdin);
//     freopen((s + ".out").c_str(), "w", stdout);
// }
 
ll msb_finder(ll n)
{
    ll k = __builtin_clzll(n);
    return 1 << (64 - k);
}
 
bool is_palin(string s)
{
    string x = s;
    rv(x);
    if (x == s)
        return true;
    return false;
}
 
string base_changer(ll n, ll base)
{
    string s;
    while (n)
    {
        ll rem = n % base;
        s.pb(rem + '0');
        n /= base;
    }
    rv(s);
    return s;
}
 
ll modi(ll n, ll d){
    ll x=mod-2;
    while(x){
        if(x&1) n=(n%mod * d%mod)%mod;
        d=(d%mod * d%mod)%mod;
        x>>=1;
    }
 
    return n;
}
 
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//       --------------           ---------------           --------------           --------------
//       |                               |                  |            |           |            |
//       |                               |                  |            |           |            |
//       --------------                  |                  |            |           |-------------
//                    |                  |                  |            |           |
//                    |                  |                  |            |           |
//       --------------                  |                  --------------           |
//                                               SCROLLING
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
void solve()
{
    ll n, m;
    cin>>n>>m;
    vll vis(n,vl(m));
    loop(i,0,n) loop(j,0,m){
        char c;
        cin>>c;
        if(c=='#') vis[i][j]=1;
    }
 
    ll ans=0;
    loop(i,0,n) loop(j,0,m){
        if(vis[i][j]) continue;
        vis[i][j]=1;
 
        queue<pl>q;
        q.push({i,j});
        ll dx[]={0,0,1,-1}, dy[]={1,-1,0,0};
        while(!q.empty()){
            pl curr=q.front();
            q.pop();
 
            loop(i,0,4){
                ll new_x=curr.fi+dx[i], new_y=curr.se+dy[i];
                if(new_x<0 || new_x>=n || new_y<0 || new_y>=m) continue;
 
                if(vis[new_x][new_y]) continue;
                q.push({new_x,new_y});
                vis[new_x][new_y]=1;
            }
            
        }
 
        ans++;
    }
 
    cout<<ans<<"\n";
}
 
int main()
{
    // setIO("notlast");
    // freopen("input.txt", "r", stdin);
    // freopen("output.txt", "w", stdout);
    fast();
    tc
    {
        solve();
    }
}