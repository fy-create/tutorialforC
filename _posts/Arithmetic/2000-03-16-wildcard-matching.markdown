---
layout: post
title:  "44. 通配符匹配"
categories: arithmetic
---

[44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching)

好的，我来为你解答 LeetCode 第 44 题“通配符匹配”。

**题目要求:**

给定一个输入字符串 (s) 和一个字符模式 (p)，请你实现一个支持 `'?'` 和 `'*'` 匹配规则的通配符匹配：

*   `'?'` 可以匹配任何单个字符。
*   `'*'` 可以匹配任意字符序列（包括空字符序列）。

判定匹配成功的充要条件是：字符模式必须能够完全匹配输入字符串（而不是部分匹配）。

**测试用例:**

```
示例 1：
输入：s = "aa", p = "a"
输出：false
解释："a" 无法匹配 "aa" 整个字符串。

示例 2：
输入：s = "aa", p = "*"
输出：true
解释：'*' 可以匹配任意字符串。

示例 3：
输入：s = "cb", p = "?a"
输出：false
解释：'?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。

示例 4:
输入: s = "adceb", p = "*a*b"
输出: true
解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".

示例 5:
输入: s = "acdcb", p = "a*c?b"
输出: false
```

**解题思路 (动态规划):**

使用二维数组 `dp`，其中 `dp[i][j]` 表示字符串 `s` 的前 `i` 个字符是否与模式 `p` 的前 `j` 个字符匹配。

1.  **初始化:**
    *   `dp[0][0] = true`：空字符串与空模式匹配。
    *   如果 `p[j-1] == '*'`, 则 `dp[0][j] = dp[0][j-1]`：`*` 可以匹配空字符串。

2.  **状态转移方程:**

    *   如果 `p[j-1] == s[i-1] || p[j-1] == '?'`：`dp[i][j] = dp[i-1][j-1]`
    *   如果 `p[j-1] == '*'`：
        *   `dp[i][j] = dp[i][j-1]`：`*` 匹配空字符串。
        *   `dp[i][j] = dp[i-1][j]`：`*` 匹配至少一个字符。

**C 语言代码:**

```c
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

bool isMatch(char* s, char* p) {
    int m = strlen(s);
    int n = strlen(p);

    // 创建 dp 数组
    bool** dp = (bool**)malloc((m + 1) * sizeof(bool*));
    for (int i = 0; i <= m; i++) {
        dp[i] = (bool*)malloc((n + 1) * sizeof(bool));
        memset(dp[i], false, (n + 1) * sizeof(bool)); // 初始化为 false
    }

    dp[0][0] = true;

    // 初始化第一行 (p 的前 j 个字符匹配空串 s)
    for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    // 动态规划
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == s[i - 1] || p[j - 1] == '?') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            }
        }
    }

        bool res=dp[m][n];
        // 释放内存
        for (int i = 0; i <= m; i++) {
            free(dp[i]);
        }
        free(dp);
    return res;
}

//测试
int main() {
    char *s1 = "aa";
    char *p1 = "a";
    printf("%d\n", isMatch(s1, p1));//输出0

    char *s2 = "aa";
    char *p2 = "*";
    printf("%d\n", isMatch(s2, p2));//输出1

     char *s3 = "cb";
    char *p3 = "?a";
    printf("%d\n", isMatch(s3, p3));//输出0

    char *s4 = "adceb";
    char *p4 = "*a*b";
    printf("%d\n", isMatch(s4, p4));//输出1

    char *s5 = "acdcb";
    char *p5 = "a*c?b";
    printf("%d\n", isMatch(s5, p5));//输出0
    return 0;
}
```

**C++ 代码:**

```c++
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length();
        int n = p.length();

        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;

        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 1];
            }
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == s[i - 1] || p[j - 1] == '?') {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
                }
            }
        }

        return dp[m][n];
    }
};

int main() {
    Solution sol;
    cout << sol.isMatch("aa", "a") << endl;      // 输出 0
    cout << sol.isMatch("aa", "*") << endl;      // 输出 1
    cout << sol.isMatch("cb", "?a") << endl;     // 输出 0
    cout << sol.isMatch("adceb", "*a*b") << endl; // 输出 1
    cout << sol.isMatch("acdcb", "a*c?b") << endl; // 输出 0
    return 0;
}
```

**代码解析:**

两种语言的代码都使用了动态规划的思想。C++ 代码使用了 `std::vector` 来代替 C 语言中的手动内存分配，更加简洁和安全。同时，C++ 代码用 `class Solution` 封装了算法，更符合面向对象编程的规范。两种语言的代码逻辑是完全一致的。

希望以上解答能够帮助你理解和掌握这道题目！
