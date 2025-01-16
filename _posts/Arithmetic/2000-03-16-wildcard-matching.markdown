---
layout: post
title:  "44. 通配符匹配"
categories: arithmetic
---

[44. 通配符匹配](https://leetcode.cn/problems/wildcard-matching)

## 题目要求

### 描述：
给定一个字符串 `s` 和一个字符串 `p`，其中 `p` 包含字符 `?` 和 `*`。请你判断 `s` 是否与 `p` 匹配。

- `?` 可以匹配任何单个字符。
- `*` 可以匹配任意字符串（包括空字符串）。

请你实现一个支持 `?` 和 `*` 的通配符匹配算法。

### 示例 1：

**输入：**  
` s = "aa", p = "a*"`

**输出：**  
`true`

**解释：**  
`*` 可以匹配任意字符串，包括空字符串，因此匹配成功。

### 示例 2：

**输入：**  
` s = "mississippi", p = "mis*is*p*."`

**输出：**  
`false`

**解释：**  
`*` 不能匹配空字符串，所以无法匹配。

### 提示：
- 0 <= s.length, p.length <= 1000
- `s` 和 `p` 仅包含小写字母和字符 `?` 和 `*`。

## 解题思路

### 思路：
1. **动态规划（Dynamic Programming，DP）**：
   - 由于题目中有 `*` 和 `?` 两种匹配规则，`*` 需要匹配任意长度的字符串，而 `?` 仅匹配一个字符。因此，使用动态规划来模拟每个位置是否能够匹配。
   
2. **状态定义**：
   - 定义 `dp[i][j]` 为 `s[0..i-1]` 和 `p[0..j-1]` 是否匹配。
   - 初始条件：`dp[0][0] = true`，即空字符串和空模式是匹配的。
   
3. **状态转移**：
   - 如果 `p[j-1]` 是字符 `?`，那么 `dp[i][j]` 等于 `dp[i-1][j-1]`，即如果前一位的字符匹配成功，则当前字符也匹配。
   - 如果 `p[j-1]` 是字符 `*`，则可以考虑两种情况：
     - `*` 匹配空字符串，此时 `dp[i][j] = dp[i][j-1]`。
     - `*` 匹配至少一个字符，此时 `dp[i][j] = dp[i-1][j]`。
   
4. **空间优化**：
   - 由于状态转移只依赖于上一行的状态，可以将二维 DP 数组优化为一维数组，从而节省空间。

### 代码实现：

#### C语言解答

```c
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// 使用动态规划解决通配符匹配问题
bool isMatch(char *s, char *p) {
    int len_s = strlen(s);
    int len_p = strlen(p);
    
    // dp数组，dp[i]表示s的前i个字符是否与p的前j个字符匹配
    bool dp[len_s + 1];
    dp[0] = true; // 空字符串和空模式是匹配的

    for (int i = 1; i <= len_s; i++) {
        dp[i] = false;
    }

    for (int j = 1; j <= len_p; j++) {
        bool prev = dp[0]; // prev保存dp[0]的状态，用于处理*匹配空字符串的情况
        dp[0] = dp[0] && (p[j-1] == '*'); // p是*，那么dp[0]可以由dp[0]或者dp[1]推导

        for (int i = 1; i <= len_s; i++) {
            bool temp = dp[i]; // 用来保存当前dp[i]的状态
            if (p[j-1] == s[i-1] || p[j-1] == '?') {
                dp[i] = prev; // 当前字符匹配成功
            } else if (p[j-1] == '*') {
                dp[i] = dp[i] || dp[i-1]; // *匹配一个字符或者为空
            }
            prev = temp; // 更新prev为当前dp[i]的状态
        }
    }

    return dp[len_s];
}

int main() {
    char s[] = "aa";
    char p[] = "a*";
    
    bool result = isMatch(s, p);
    if (result) {
        printf("The string '%s' matches the pattern '%s'.\n", s, p);
    } else {
        printf("The string '%s' does not match the pattern '%s'.\n", s, p);
    }
    
    return 0;
}
```

#### C++解答

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    bool isMatch(string s, string p) {
        int len_s = s.length();
        int len_p = p.length();
        
        // dp[i] 表示s的前i个字符是否与p的前j个字符匹配
        vector<bool> dp(len_s + 1, false);
        dp[0] = true;  // 空字符串和空模式是匹配的
        
        for (int j = 1; j <= len_p; j++) {
            bool prev = dp[0];  // prev用于存储dp[0]的状态
            dp[0] = dp[0] && (p[j-1] == '*');  // 如果p是'*'，dp[0]可以由dp[0]推导

            for (int i = 1; i <= len_s; i++) {
                bool temp = dp[i];
                if (p[j-1] == s[i-1] || p[j-1] == '?') {
                    dp[i] = prev;  // 当前字符匹配成功
                } else if (p[j-1] == '*') {
                    dp[i] = dp[i] || dp[i-1];  // '*'匹配空字符串或至少一个字符
                }
                prev = temp;  // 更新prev为当前dp[i]的值
            }
        }

        return dp[len_s];  // 返回s和p的匹配结果
    }
};

int main() {
    Solution solution;
    string s = "aa";
    string p = "a*";
    
    bool result = solution.isMatch(s, p);
    if (result) {
        cout << "The string '" << s << "' matches the pattern '" << p << "'." << endl;
    } else {
        cout << "The string '" << s << "' does not match the pattern '" << p << "'." << endl;
    }
    
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **动态规划数组**：我们使用一个一维数组 `dp[]` 来记录当前匹配状态。`dp[i]` 表示字符串 `s` 的前 `i` 个字符是否与模式 `p` 的前 `j` 个字符匹配。
   
2. **初始化**：初始化 `dp[0] = true`，表示空字符串和空模式匹配。

3. **状态转移**：
   - 如果当前模式字符是 `?`，则它可以匹配任何字符，因此 `dp[i] = dp[i-1]`。
   - 如果当前模式字符是 `*`，则 `*` 可以匹配空字符串或者至少一个字符，所以下一状态 `dp[i]` 由两种方式更新：
     - `dp[i] = dp[i-1]`（`*` 匹配至少一个字符）。
     - `dp[i] = dp[i] || dp[i-1]`（`*` 匹配空字符串）。
   
4. **最终结果**：在循环结束后，`dp[len_s]` 存储了 `s` 和 `p` 是否匹配的结果。

#### C++解答：
- C++解法与C语言解法非常相似，只是使用了 `vector<bool>` 来表示动态规划数组，而不是固定大小的数组。

### 时间复杂度：
- **时间复杂度**：O(m * n)，其中 `m` 和 `n` 分别是字符串 `s` 和模式 `p` 的长度。我们需要遍历两者的每个字符进行匹配。
- **空间复杂度**：O(m)，由于我们使用一维数组来保存匹配状态，空间复杂度为 `O(m)`。

### 小结：
- 本题的关键在于如何模拟通配符的匹配过程，动态规划是一种高效的解决方案。
- 通过使用一维动态规划数组，并且针对 `*` 和 `?` 进行不同的状态转移，最终得出是否匹配的结果。