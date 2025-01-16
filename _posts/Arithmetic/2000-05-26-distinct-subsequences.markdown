---
layout: post
title:  "115. 不同的子序列"
categories: arithmetic
---

[115. 不同的子序列](https://leetcode.cn/problems/distinct-subsequences)

### 题目描述

给定一个字符串 `s` 和一个字符串 `t`，返回 `s` 中能由 `t` 的所有字符组成的不同子序列的个数。

一个子序列是通过删除字符串中的某些字符（可以不删除任何字符）来得到的字符串。  
例如，`"abc"` 的子序列有 `"a"`, `"b"`, `"c"`, `"ab"`, `"ac"`, `"bc"`, `"abc"`。

#### 示例 1：

输入：  
```plaintext
s = "rabbbit", t = "rabbit"
```

输出：  
```plaintext
3
```

解释：  
有 3 个不同的子序列 "rabbbit" 中包含 "rabbit"。  
如："rabbbit" -> "rabbit" (删除第 3 和第 6 个字符),  
      "rabbbit" -> "rabbit" (删除第 4 和第 6 个字符),  
      "rabbbit" -> "rabbit" (删除第 4 和第 5 个字符)。

#### 示例 2：

输入：  
```plaintext
s = "babgbag", t = "bag"
```

输出：  
```plaintext
5
```

解释：  
有 5 个不同的子序列 "babgbag" 中包含 "bag"。  
如："babgbag" -> "bag" (删除第 2, 4 和 7 个字符),  
      "babgbag" -> "bag" (删除第 1, 4 和 7 个字符),  
      "babgbag" -> "bag" (删除第 2, 5 和 6 个字符),  
      "babgbag" -> "bag" (删除第 3, 4 和 7 个字符),  
      "babgbag" -> "bag" (删除第 3, 5 和 6 个字符)。

#### 提示：

- 1 <= s.length, t.length <= 1000
- 字符串中的字符为英文字母。

### 解题思路

这个问题是经典的动态规划（Dynamic Programming）问题，可以通过构建一个二维 DP 数组来解决。

#### 动态规划定义：

我们定义 `dp[i][j]` 表示前 `i` 个字符的 `s` 中，能形成前 `j` 个字符的 `t` 的子序列的个数。

#### 状态转移方程：

1. 如果 `s[i-1] == t[j-1]`，那么有两种情况：
   - 不选择 `s[i-1]`，那么就等于 `dp[i-1][j]`；
   - 选择 `s[i-1]`，那么就加上 `dp[i-1][j-1]`。
   所以 `dp[i][j] = dp[i-1][j] + dp[i-1][j-1]`。

2. 如果 `s[i-1] != t[j-1]`，则不能选择 `s[i-1]` 来匹配 `t[j-1]`，所以 `dp[i][j] = dp[i-1][j]`。

#### 初始条件：

- `dp[0][0] = 1`：空字符串可以匹配空字符串，只有一种方式。
- `dp[i][0] = 1`：任意字符串 `s` 的前 `i` 个字符都可以形成空字符串 `t`。
- `dp[0][j] = 0`：空字符串 `s` 无法形成任何非空的 `t`。

最终的结果就是 `dp[s.length()][t.length()]`。

### C语言解答

```c
#include <stdio.h>
#include <string.h>

// 动态规划解法
int numDistinct(char * s, char * t) {
    int m = strlen(s), n = strlen(t);
    
    // 创建一个二维 dp 数组，dp[i][j] 表示 s 的前 i 个字符能组成 t 的前 j 个字符的子序列数量
    int dp[m + 1][n + 1];
    
    // 初始化 dp 数组
    for (int i = 0; i <= m; i++) {
        dp[i][0] = 1;  // 空字符串 t 可以通过 s 中的任何字符组成
    }
    for (int j = 1; j <= n; j++) {
        dp[0][j] = 0;  // 空字符串 s 无法组成任何非空的 t
    }

    // 填充 dp 数组
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s[i - 1] == t[j - 1]) {
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];  // 可以选择或不选择 s[i-1]
            } else {
                dp[i][j] = dp[i - 1][j];  // 只能选择不包含 s[i-1] 的子序列
            }
        }
    }

    return dp[m][n];  // 返回最终的结果
}

int main() {
    char s[] = "rabbbit";
    char t[] = "rabbit";
    printf("Number of distinct subsequences: %d\n", numDistinct(s, t));
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    // 动态规划解法
    int numDistinct(string s, string t) {
        int m = s.length(), n = t.length();
        
        // 创建一个二维 dp 数组，dp[i][j] 表示 s 的前 i 个字符能组成 t 的前 j 个字符的子序列数量
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        // 初始化 dp 数组
        for (int i = 0; i <= m; i++) {
            dp[i][0] = 1;  // 空字符串 t 可以通过 s 中的任何字符组成
        }

        // 填充 dp 数组
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i - 1] == t[j - 1]) {
                    dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];  // 可以选择或不选择 s[i-1]
                } else {
                    dp[i][j] = dp[i - 1][j];  // 只能选择不包含 s[i-1] 的子序列
                }
            }
        }

        return dp[m][n];  // 返回最终的结果
    }
};

int main() {
    Solution solution;
    string s = "rabbbit";
    string t = "rabbit";
    cout << "Number of distinct subsequences: " << solution.numDistinct(s, t) << endl;
    return 0;
}
```