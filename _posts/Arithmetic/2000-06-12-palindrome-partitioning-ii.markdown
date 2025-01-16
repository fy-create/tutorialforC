---
layout: post
title:  "132. 分割回文串 II"
categories: arithmetic
---

[132. 分割回文串 II](https://leetcode.cn/problems/palindrome-partitioning-ii)

### 题目描述

给定一个字符串 `s`，要求将 `s` 分割成一些子串，使得每个子串都是回文串。返回完成此任务所需的**最小划分次数**。

#### 示例 1：
```
输入: "aab"
输出: 1
解释: 只需要将字符串分割成 "aa" 和 "b"，所以返回 1。
```

#### 示例 2：
```
输入: "a"
输出: 0
解释: 字符串 "a" 本身就是一个回文串，不需要进行任何划分，所以返回 0。
```

#### 提示：
- `1 <= s.length <= 1000`
- `s` 仅由小写英文字母组成。

---

### 解题思路

#### 思路分析：
这道题可以通过动态规划来解决。我们需要在字符串的每个位置计算出最小划分次数，并确保每个划分的子串都是回文串。

1. **回文串的判定**：
   - 首先，我们需要判断一个子串是否为回文串。这可以通过对比该子串的头尾字符，递归地进行判断来实现。

2. **动态规划解法**：
   - 使用动态规划，我们定义一个 `dp[i]` 来表示从 `s[0]` 到 `s[i]` 的最小回文划分次数。
   - 初始时，`dp[0]` 为 0，因为一个字符本身是回文的，不需要划分。
   - 对于每个位置 `i`，我们检查所有可能的结束位置 `j`，判断 `s[j:i+1]` 是否为回文。如果是回文，则更新 `dp[i]`。
   
   - 关键点：
     1. 如果 `s[j:i+1]` 是回文，则我们可以把问题拆分成两个部分：
        - 对于 `s[0:j-1]`，我们已经计算出最小划分次数，记为 `dp[j-1]`。
        - 对于 `s[j:i+1]`，它本身是一个回文串，不需要进一步划分。
     2. 每当发现一个回文串时，我们就可以更新 `dp[i]` 为 `dp[j-1] + 1`。

3. **优化**：
   - 如果我们能在计算 `dp` 的过程中直接判断出回文串，可以省去许多重复计算的步骤。我们可以使用一个辅助的二维布尔数组 `isPalindrome[i][j]` 来记录 `s[i:j]` 是否为回文串。

#### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

#define INF 10000

// 判断子串 s[start:end] 是否是回文串
bool isPalindrome(char* s, int start, int end) {
    while (start < end) {
        if (s[start] != s[end]) {
            return false;
        }
        start++;
        end--;
    }
    return true;
}

// 主函数，返回最小回文划分次数
int minCut(char* s) {
    int len = strlen(s);
    int dp[len + 1];  // dp[i] 表示从 s[0] 到 s[i-1] 的最小划分次数
    bool isPalindromeMemo[len][len]; // isPalindromeMemo[i][j] 表示 s[i:j] 是否是回文串

    // 初始化 dp 数组
    for (int i = 0; i <= len; i++) {
        dp[i] = INF;
    }
    dp[0] = -1;  // 空字符串不需要划分

    // 初始化 isPalindromeMemo 数组
    for (int i = 0; i < len; i++) {
        for (int j = 0; j < len; j++) {
            isPalindromeMemo[i][j] = false;
        }
    }

    // 填充 isPalindromeMemo 数组
    for (int i = len - 1; i >= 0; i--) {
        for (int j = i; j < len; j++) {
            if (s[i] == s[j] && (j - i <= 2 || isPalindromeMemo[i + 1][j - 1])) {
                isPalindromeMemo[i][j] = true;
            }
        }
    }

    // 计算 dp 数组
    for (int i = 1; i <= len; i++) {
        for (int j = 0; j < i; j++) {
            if (isPalindromeMemo[j][i - 1]) {
                dp[i] = fmin(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[len];
}

int main() {
    char s[] = "aab";
    printf("最小回文划分次数: %d\n", minCut(s));
    return 0;
}
```

#### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <climits>
using namespace std;

class Solution {
public:
    // 判断子串 s[start:end] 是否是回文串
    bool isPalindrome(const string& s, int start, int end) {
        while (start < end) {
            if (s[start] != s[end]) {
                return false;
            }
            start++;
            end--;
        }
        return true;
    }

    // 主函数，返回最小回文划分次数
    int minCut(string s) {
        int len = s.size();
        vector<int> dp(len + 1, INT_MAX);  // dp[i] 表示从 s[0] 到 s[i-1] 的最小划分次数
        vector<vector<bool>> isPalindromeMemo(len, vector<bool>(len, false)); // isPalindromeMemo[i][j] 表示 s[i:j] 是否是回文串

        dp[0] = -1;  // 空字符串不需要划分

        // 填充 isPalindromeMemo 数组
        for (int i = len - 1; i >= 0; i--) {
            for (int j = i; j < len; j++) {
                if (s[i] == s[j] && (j - i <= 2 || isPalindromeMemo[i + 1][j - 1])) {
                    isPalindromeMemo[i][j] = true;
                }
            }
        }

        // 计算 dp 数组
        for (int i = 1; i <= len; i++) {
            for (int j = 0; j < i; j++) {
                if (isPalindromeMemo[j][i - 1]) {
                    dp[i] = min(dp[i], dp[j] + 1);
                }
            }
        }

        return dp[len];
    }
};

int main() {
    Solution solution;
    string s = "aab";
    cout << "最小回文划分次数: " << solution.minCut(s) << endl;
    return 0;
}
```

### 解析

1. **回文子串判定**：通过一个 `isPalindromeMemo` 二维数组记录所有子串是否为回文串，避免重复计算。
2. **动态规划**：`dp[i]` 表示从 `s[0]` 到 `s[i-1]` 的最小回文划分次数。我们根据回文判定信息来更新 `dp[i]`。
3. **时间复杂度**：`isPalindromeMemo` 数组的填充时间复杂度是 O(n^2)，然后计算 `dp` 数组的时间复杂度也是 O(n^2)，因此总时间复杂度为 O(n^2)，其中 n 是字符串的长度。
4. **空间复杂度**：`isPalindromeMemo` 和 `dp` 数组的空间复杂度都是 O(n^2)，因此总空间复杂度为 O(n^2)。

