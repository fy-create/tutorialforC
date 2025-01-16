---
layout: post
title:  "32. 最长有效括号"
categories: arithmetic
---

[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses)

以下是完整的输出内容，包括题目描述、解题思路、C语言和C++的代码实现，以及测试用例和复杂度分析。

---

### 题目描述

给定一个只包含 `'('` 和 `')'` 的字符串，找出最长的有效（格式正确且连续）括号子串的长度。

**示例 1:**

```
输入: "(()"
输出: 2
解释: 最长有效括号子串为 "()"
```

**示例 2:**

```
输入: ")()())"
输出: 4
解释: 最长有效括号子串为 "()()"
```

**提示:**

- 0 <= s.length <= 3 * 10^4
- `s[i]` 为 `'('` 或 `')'`

---

### 解题思路

1. **动态规划**：
   - 定义一个 `dp` 数组，其中 `dp[i]` 表示以 `s[i]` 结尾的最长有效括号子串的长度。
   - 如果 `s[i]` 是 `'('`，则 `dp[i] = 0`，因为有效括号子串不能以 `'('` 结尾。
   - 如果 `s[i]` 是 `')'`，则分为两种情况：
     - 如果 `s[i-1]` 是 `'('`，则 `dp[i] = dp[i-2] + 2`。
     - 如果 `s[i-1]` 是 `')'`，则需要检查 `s[i - dp[i-1] - 1]` 是否是 `'('`，如果是，则 `dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]`。
   - 最终结果为 `dp` 数组中的最大值。

2. **栈**：
   - 使用栈来记录未匹配的括号索引。
   - 遍历字符串时：
     - 如果遇到 `'('`，将其索引压入栈。
     - 如果遇到 `')'`，弹出栈顶元素。如果栈为空，说明当前 `')'` 没有匹配的 `'('`，将其索引压入栈；否则，计算当前有效括号子串的长度，并更新最大值。

---

### C语言实现

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int longestValidParentheses(char* s) {
    int n = strlen(s);
    if (n == 0) return 0;  // 如果字符串为空，直接返回 0

    int* dp = (int*)malloc(n * sizeof(int));  // 动态分配 dp 数组
    memset(dp, 0, n * sizeof(int));  // 初始化 dp 数组为 0

    int maxLen = 0;
    for (int i = 1; i < n; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {
                dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0);
            }
            maxLen = maxLen > dp[i] ? maxLen : dp[i];
        }
    }

    free(dp);  // 释放动态分配的内存
    return maxLen;
}

int main() {
    char s1[] = "(()";
    char s2[] = ")()())";
    char s3[] = "";
    char s4[] = "()(()";

    printf("输入: \"(()\"\n输出: %d\n", longestValidParentheses(s1));  // 输出 2
    printf("输入: \")()())\"\n输出: %d\n", longestValidParentheses(s2));  // 输出 4
    printf("输入: \"\"\n输出: %d\n", longestValidParentheses(s3));  // 输出 0
    printf("输入: \"()(()\"\n输出: %d\n", longestValidParentheses(s4));  // 输出 2

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.length();
        if (n == 0) return 0;  // 如果字符串为空，直接返回 0

        vector<int> dp(n, 0);  // 初始化 dp 数组为 0
        int maxLen = 0;

        for (int i = 1; i < n; i++) {
            if (s[i] == ')') {
                if (s[i - 1] == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == '(') {
                    dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0);
                }
                maxLen = max(maxLen, dp[i]);
            }
        }
        return maxLen;
    }
};

int main() {
    Solution solution;
    string s1 = "(()";
    string s2 = ")()())";
    string s3 = "";
    string s4 = "()(()";

    cout << "输入: \"(()\"\n输出: " << solution.longestValidParentheses(s1) << endl;  // 输出 2
    cout << "输入: \")()())\"\n输出: " << solution.longestValidParentheses(s2) << endl;  // 输出 4
    cout << "输入: \"\"\n输出: " << solution.longestValidParentheses(s3) << endl;  // 输出 0
    cout << "输入: \"()(()\"\n输出: " << solution.longestValidParentheses(s4) << endl;  // 输出 2

    return 0;
}
```

---

### 测试用例

#### 输入 1
```
"(()"
```
#### 输出 1
```
2
```

#### 输入 2
```
")()())"
```
#### 输出 2
```
4
```

#### 输入 3
```
""
```
#### 输出 3
```
0
```

#### 输入 4
```
"()(()"
```
#### 输出 4
```
2
```

---

### 复杂度分析

- **时间复杂度**：O(n)，其中 n 是字符串的长度。我们只需要遍历字符串一次。
- **空间复杂度**：O(n)，用于存储动态规划的 `dp` 数组。

---

### 总结

通过动态规划方法，我们可以高效地解决最长有效括号子串的问题。修复后的代码可以正确处理所有边界情况，包括空字符串和长度为 0 的情况。动态规划方法通过记录以每个字符结尾的最长有效括号子串的长度，最终得到全局最大值。