---
layout: post
title:  "97. 交错字符串"
categories: arithmetic
---

[97. 交错字符串](https://leetcode.cn/problems/interleaving-string)

### 题目描述

给定三个字符串 `s1`, `s2` 和 `s3`，请你判断 `s3` 是否是由 `s1` 和 `s2` 交错组成的。

**交错组成**：`s3` 可以被视为由 `s1` 和 `s2` 中的字符交替拼接而成，要求 `s1` 和 `s2` 的字符保持原有顺序。

### 示例

#### 示例 1:
```
输入: s1 = "abc", s2 = "def", s3 = "adbcef"
输出: true
```

#### 示例 2:
```
输入: s1 = "abc", s2 = "def", s3 = "abdecf"
输出: false
```

#### 示例 3:
```
输入: s1 = "", s2 = "", s3 = ""
输出: true
```

### 提示
- `0 <= s1.length, s2.length <= 100`
- `0 <= s3.length <= 200`
- `s1`, `s2`, `s3` 都只包含小写字母。

### 解题思路

这个问题可以通过动态规划（DP）来解决。我们要判断字符串 `s3` 是否能够由字符串 `s1` 和 `s2` 的字符交错组成。

#### 思路

1. **状态定义**：定义一个二维的 DP 数组 `dp[i][j]`，其中 `dp[i][j]` 表示 `s1` 的前 `i` 个字符和 `s2` 的前 `j` 个字符能否交错构成 `s3` 的前 `i+j` 个字符。

2. **转移方程**：
   - 初始状态：`dp[0][0] = true`，表示空字符串可以由两个空字符串交错构成。
   - 对于每一个 `dp[i][j]`：
     - 如果 `dp[i-1][j]` 为 `true` 且 `s1[i-1] == s3[i+j-1]`，则 `dp[i][j] = true`，表示可以从 `s1` 继续构成 `s3`。
     - 如果 `dp[i][j-1]` 为 `true` 且 `s2[j-1] == s3[i+j-1]`，则 `dp[i][j] = true`，表示可以从 `s2` 继续构成 `s3`。

3. **最终结果**：最后我们需要判断 `dp[s1.length()][s2.length()]` 是否为 `true`，如果为 `true`，则说明 `s3` 可以由 `s1` 和 `s2` 的字符交错组成，否则不能。

4. **空间优化**：由于 `dp[i][j]` 只依赖于上一行和当前行的元素，因此我们可以通过滚动数组将空间复杂度优化到 O(n)。

### C语言实现

```c
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// 判断s3是否是由s1和s2交错组成的
bool isInterleave(char *s1, char *s2, char *s3) {
    int len1 = strlen(s1), len2 = strlen(s2), len3 = strlen(s3);
    
    // 如果s1和s2的总长度不等于s3的长度，直接返回false
    if (len1 + len2 != len3) {
        return false;
    }

    // dp数组，用于记录状态
    bool dp[len2 + 1]; // dp[i]表示s1前i个字符和s2前j个字符能否交错组成s3前i+j个字符
    memset(dp, false, sizeof(dp));
    dp[0] = true; // 空字符串可以交错组成空字符串

    // 动态规划填充dp数组
    for (int i = 0; i <= len1; i++) {
        for (int j = 0; j <= len2; j++) {
            // 当前dp[j]值继承上一个状态
            if (i == 0 && j == 0) continue; // 跳过dp[0][0]
            
            if (i > 0 && s1[i-1] == s3[i+j-1]) {
                dp[j] = dp[j] || dp[j];
            }

            if (j > 0 && s2[j-1] == s3[i+j-1]) {
                dp[j] = dp[j] || dp[j-1];
            }
        }
    }

    // 返回最后一个状态
    return dp[len2];
}

int main() {
    char s1[] = "abc";
    char s2[] = "def";
    char s3[] = "adbcef";
    if (isInterleave(s1, s2, s3)) {
        printf("True\n");
    } else {
        printf("False\n");
    }
    return 0;
}
```

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    // 判断s3是否是由s1和s2交错组成的
    bool isInterleave(string s1, string s2, string s3) {
        int len1 = s1.size(), len2 = s2.size(), len3 = s3.size();

        // 如果s1和s2的总长度不等于s3的长度，直接返回false
        if (len1 + len2 != len3) {
            return false;
        }

        // dp数组，dp[i]表示s1的前i个字符和s2的前j个字符能否交错组成s3的前i+j个字符
        vector<bool> dp(len2 + 1, false);
        dp[0] = true; // 空字符串可以交错组成空字符串

        // 动态规划填充dp数组
        for (int i = 0; i <= len1; i++) {
            for (int j = 0; j <= len2; j++) {
                // 如果s1和s2的字符分别匹配s3中的字符
                if (i == 0 && j == 0) continue; // 跳过dp[0][0]
                
                if (i > 0 && s1[i-1] == s3[i+j-1]) {
                    dp[j] = dp[j] || dp[j];
                }

                if (j > 0 && s2[j-1] == s3[i+j-1]) {
                    dp[j] = dp[j] || dp[j-1];
                }
            }
        }

        return dp[len2];
    }
};

int main() {
    Solution sol;
    string s1 = "abc";
    string s2 = "def";
    string s3 = "adbcef";
    if (sol.isInterleave(s1, s2, s3)) {
        cout << "True" << endl;
    } else {
        cout << "False" << endl;
    }
    return 0;
}
```

### 代码说明

#### C语言版本

- 通过一个二维布尔数组 `dp` 来记录字符串 `s1` 和 `s2` 的前 `i` 和 `j` 个字符是否能够交错组成 `s3` 的前 `i+j` 个字符。
- 使用滚动数组优化空间复杂度，将 `dp` 数组从二维优化为一维。
- 动态规划的状态转移通过条件判断来更新 `dp` 数组的值。

#### C++版本

- 使用 `vector<bool>` 来存储状态，简化了二维数组的处理。
- 通过嵌套循环填充 `dp` 数组，判断每个位置是否满足交错条件。
- 代码中使用了 `std::string` 和 `std::vector` 来简化处理。

### 时间和空间复杂度

- **时间复杂度**：O(m * n)，其中 `m` 和 `n` 分别是字符串 `s1` 和 `s2` 的长度。由于我们需要遍历二维数组的每个元素。
- **空间复杂度**：O(n)，因为我们通过滚动数组优化了空间复杂度，只用了一维数组。