---
layout: post
title:  "10. 正则表达式匹配"
categories: arithmetic
---

[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching)

### 题目描述

请实现一个支持 `'.'` 和 `'*'` 的正则表达式匹配函数。

- `'.'` 匹配任意单个字符。
- `'*'` 匹配零个或多个前面的那一个元素。

匹配应该覆盖整个输入字符串（而非部分字符串）。

**函数原型：**

```c
bool isMatch(const char *s, const char *p);
```

**示例：**

- 示例 1:

  ```c
  输入:
  s = "aa"
  p = "a"
  输出: false
  解释: "a" 无法匹配 "aa" 整个字符串。
  ```

- 示例 2:

  ```c
  输入:
  s = "aa"
  p = "a*"
  输出: true
  解释: '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
  ```

- 示例 3:

  ```c
  输入:
  s = "ab"
  p = ".*"
  输出: true
  解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
  ```

**提示：**

- `s` 可能为空，且只包含从 `'a'` 到 `'z'` 的小写字母。
- `p` 可能为空，且只包含从 `'a'` 到 `'z'` 的小写字母，以及字符 `'.'` 和 `'*'`。

---

### 解题思路

我们可以使用动态规划（Dynamic Programming，DP）来解决这个问题。定义一个二维布尔数组 `dp`，其中 `dp[i][j]` 表示字符串 `s` 的前 `i` 个字符与模式 `p` 的前 `j` 个字符是否匹配。

**状态转移方程：**

1. 如果 `p[j-1]` 是普通字符或 `'.'`，则：
   - `dp[i][j] = dp[i-1][j-1] && (s[i-1] == p[j-1] || p[j-1] == '.')`

2. 如果 `p[j-1]` 是 `'*'`，则：
   - 如果将 `'*'` 和它前面的字符视为出现 0 次：
     - `dp[i][j] = dp[i][j-2]`
   - 如果将 `'*'` 和它前面的字符视为出现至少 1 次：
     - `dp[i][j] = dp[i-1][j] && (s[i-1] == p[j-2] || p[j-2] == '.')`

**初始化：**

- `dp[0][0] = true`，表示空字符串和空模式是匹配的。
- `dp[0][j]` 需要根据模式 `p` 的前 `j` 个字符进行初始化：
  - 如果 `p[j-1]` 是 `'*'`，且 `p[j-2]` 可以匹配空字符串，则 `dp[0][j] = dp[0][j-2]`。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// 判断字符串 s 和模式 p 是否匹配
bool isMatch(const char *s, const char *p) {
    int m = strlen(s);
    int n = strlen(p);
    // 创建 DP 表，初始化为 false
    bool dp[m + 1][n + 1];
    memset(dp, false, sizeof(dp));
    // 空字符串和空模式是匹配的
    dp[0][0] = true;
    // 初始化 dp[0][j]
    for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*' && j > 1) {
            dp[0][j] = dp[0][j - 2];
        }
    }
    // 填充 DP 表
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                // '*' 可以匹配零个或多个前面的那一个元素
                dp[i][j] = dp[i][j - 2] || ((s[i - 1] == p[j - 2] || p[j - 2] == '.') && dp[i - 1][j]);
            } else {
                // 普通字符或 '.'
                dp[i][j] = (s[i - 1] == p[j - 1] || p[j - 1] == '.') && dp[i - 1][j - 1];
            }
        }
    }
    return dp[m][n];
}

// 测试函数
int main() {
    const char *s = "aab";
    const char *p = "c*a*b";
    if (isMatch(s, p)) {
        printf("字符串 \"%s\" 和模式 \"%s\" 匹配。\n", s, p);
    } else {
        printf("字符串 \"%s\" 和模式 \"%s\" 不匹配。\n", s, p);
    }
    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 判断字符串 s 和模式 p 是否匹配
    bool isMatch(const string &s, const string &p) {
        int m = s.length();
        int n = p.length();
        // 创建 DP 表，初始化为 false
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        // 空字符串和空模式是匹配的
        dp[0][0] = true;
        // 初始化 dp[0][j]
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*' && j > 1) {
                dp[0][j] = dp[0][j - 2];
            }
        }
        // 填充 DP 表
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    // '*' 可以匹配零个或多个前面的那一个元素
                    dp[i][j] = dp[i][j - 2] || ((s[i - 1] == p[j - 2] || p[j - 2] == '.') && dp[i - 1][j]);
                } else {
                    // 普通字符或 '.'
                    dp[i][j] = (s[i - 1] == p[j - 1] || p[j - 1] == '.') && dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
};

int main() {
    Solution solution;
    string s = "aab";
    string p = "c*a*b";
    if (solution.isMatch(s, p)) {
        cout << "字符串 \"" << s << "\" 和模式 \"" << p << "\" 匹配。" << endl;
    } else {
        cout << "字符串 \"" << s << "\" 和模式 \"" << p << "\" 不匹配。" << endl;
    }
    return 0;
}
```
