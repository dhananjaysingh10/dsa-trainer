/*
             Timestamp  : 11:35 - Thursday  10,Jul 2025   
*/
#include <bits/stdc++.h>
using namespace std;
#define ll long long
#define mod 998244353

void solve(long long _case)
{
    int n;
    cin>>n;
    vector<int> a(n), b(n);
    for(int i = 0; i < n; i++) {
        cin >> a[i];
    }
    for(int i = 0; i < n; i++) {
        cin >> b[i];
    }
    auto dfs = [&](int i, auto &&dfs) -> int {
        if(i == n) return 1;
        int ans = 0;
        for(int i = a[i]; i <= b[i]; i++) {
            ans = (ans + dfs(i+1, dfs))%mod;
        }
        return ans;
    };
}


int main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    long long t = 1;
    // cin >> t; // comment this line if your problem has 1 test case

    for(long long _case = 1; _case <= t; ++_case)solve(_case);
    return 0;
}