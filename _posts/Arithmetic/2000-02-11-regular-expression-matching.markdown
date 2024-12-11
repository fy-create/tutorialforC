---
layout: post
title:  "10. 正则表达式匹配"
categories: arithmetic
---

[10. 正则表达式匹配](https://leetcode.cn/problems/regular-expression-matching)

以下是完整的实现，包括 **题目描述**、**测试用例**、**C语言解答** 和 **C++解答**，确保无误：

---

### 题目描述

给定一个字符串 `s` 和一个模式 `p`，实现支持 `'.'` 和 `'*'` 的正则表达式匹配。

- `'.'` 匹配任意单个字符。
- `'*'` 匹配零个或多个前面的那一个元素。

匹配应覆盖整个输入字符串（而非部分字符串）。

---

### 示例

#### 示例 1:
- 输入：`s = "aa"`，`p = "a"`
- 输出：`false`
- 解释：`"a"` 无法匹配 `"aa"` 整个字符串。

#### 示例 2:
- 输入：`s = "aa"`，`p = "a*"`
- 输出：`true`
- 解释：`'*'` 表示可以匹配零个或多个 `'a'`。

#### 示例 3:
- 输入：`s = "ab"`，`p = ".*"`
- 输出：`true`
- 解释：`".*"` 表示匹配零个或多个任意字符。

#### 示例 4:
- 输入：`s = "aab"`，`p = "c*a*b"`
- 输出：`true`
- 解释：`'*'` 表示 `c` 可以不出现，`a` 可以出现两次。

#### 示例 5:
- 输入：`s = "mississippi"`，`p = "mis*is*p*."`
- 输出：`false`

---

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// 使用动态规划实现正则匹配
bool isMatch(const char *s, const char *p) {
    int m = strlen(s);
    int n = strlen(p);

    // 创建动态规划数组 dp
    bool dp[m + 1][n + 1];
    memset(dp, false, sizeof(dp));

    // 初始化：空字符串匹配空模式
    dp[0][0] = true;

    // 初始化模式的 '*' 部分
    for (int j = 1; j <= n; j++) {
        if (p[j - 1] == '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    // 填充动态规划表
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'));
            } else {
                dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.');
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
        printf("匹配成功\n");
    } else {
        printf("匹配失败\n");
    }

    return 0;
}
```

---

### C++解答

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    bool isMatch(const string &s, const string &p) {
        int m = s.size();
        int n = p.size();

        // 动态规划数组 dp
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;

        // 初始化模式的 '*' 部分
        for (int j = 1; j <= n; j++) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }

        // 填充动态规划表
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] == p[j - 2] || p[j - 2] == '.'));
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.');
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
        cout << "匹配成功" << endl;
    } else {
        cout << "匹配失败" << endl;
    }

    return 0;
}
```

---

### 代码解析

1. **动态规划**：
   - 使用一个二维数组 `dp`，其中 `dp[i][j]` 表示字符串 `s` 的前 `i` 个字符与模式 `p` 的前 `j` 个字符是否匹配。

2. **初始化**：
   - `dp[0][0] = true` 表示空字符串与空模式匹配。
   - 如果模式包含 `'*'`，检查 `dp[0][j-2]` 是否匹配，以处理 `'*'` 匹配零个字符的情况。

3. **填充表格**：
   - 如果当前模式字符是 `'*'`：
     - `dp[i][j] = dp[i][j-2]`（匹配零个字符）。
     - 或者 `dp[i][j] = dp[i-1][j]` 且 `s[i-1] == p[j-2]` 或 `p[j-2] == '.'`（匹配一个或多个字符）。
   - 如果当前模式字符不是 `'*'`：
     - 需要 `s[i-1] == p[j-1]` 或 `p[j-1] == '.'`，并且之前的状态 `dp[i-1][j-1]` 为 `true`。

4. **结果**：
   - 最终的匹配结果存储在 `dp[m][n]`。

---

### 测试结果

运行以上代码，对输入字符串和模式进行测试，会得到匹配的结果。你可以修改输入字符串和模式，验证更多的测试用例。