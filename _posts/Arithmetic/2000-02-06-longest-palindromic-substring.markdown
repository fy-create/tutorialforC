---
layout: post
title:  "5. 最长回文子串"
categories: arithmetic
---

[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring)

### 题目：最长回文子串 (Longest Palindromic Substring)

#### 题目要求：
给定一个字符串 `s`，找到 `s` 中最长的回文子串。

你可以假设 `s` 的最大长度为 1000。

#### 示例：
**示例 1:**

输入:
```
"babad"
```

输出:
```
"bab"
```

注意: "aba" 也是一个有效答案。

**示例 2:**

输入:
```
"cbbd"
```

输出:
```
"bb"
```

#### 提示：
1. 1 <= s.length <= 1000
2. s 只包含数字和英文字母（大小写）。

---

### 解题思路：

回文子串是指正读和反读都一样的字符串。我们的目标是从给定字符串 `s` 中找到最长的回文子串。

#### 解题方法：
1. **暴力法**：
   - 通过穷举所有可能的子串，并检查它们是否是回文。时间复杂度为 O(n^3)，因为要枚举子串需要 O(n^2) 的时间，而每个子串检查是否回文需要 O(n) 的时间。这种方法不适用于大规模输入。
   
2. **中心扩展法（优化方案）**：
   - 回文子串的中心可以是一个字符（奇数长度回文）或者是两个字符之间（偶数长度回文）。
   - 对于每个字符（或每对相邻字符），扩展两边检查是否形成回文串。扩展的过程是对称的，时间复杂度为 O(n^2)，适合此问题。
   
3. **动态规划法**：
   - 通过动态规划存储子问题的解，避免重复计算。动态规划的状态转移方程为：`dp[i][j] = true`，当且仅当 `s[i] == s[j]` 并且 `dp[i+1][j-1] == true`。时间复杂度也是 O(n^2)，但需要 O(n^2) 的额外空间。

4. **Manacher 算法**（进阶）：
   - 该算法通过线性时间 O(n) 求解回文子串的问题，但相较于中心扩展法实现复杂。

对于此题，中心扩展法是最常见且易于实现的解法。

#### 具体步骤（中心扩展法）：
1. 对于字符串 `s` 中的每个字符，尝试将它作为回文的中心，分别扩展检查奇数长度和偶数长度的回文子串。
2. 每次扩展时，记录回文子串的起始位置和长度，最终找到最长的回文子串。

#### C 语言解法：

```c
#include <stdio.h>
#include <string.h>

// 中心扩展法：判断以 s[i] 为中心的回文子串
char* longestPalindrome(char* s) {
    int len = strlen(s);
    if (len <= 1) {
        return s; // 如果字符串长度为 1 或为空，直接返回
    }

    int start = 0, maxLength = 1;

    // 中心扩展法，从每个字符开始扩展
    for (int i = 0; i < len; ++i) {
        // 扩展奇数长度的回文串
        int left = i, right = i;
        while (left >= 0 && right < len && s[left] == s[right]) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                start = left;
            }
            left--;
            right++;
        }

        // 扩展偶数长度的回文串
        left = i;
        right = i + 1;
        while (left >= 0 && right < len && s[left] == s[right]) {
            if (right - left + 1 > maxLength) {
                maxLength = right - left + 1;
                start = left;
            }
            left--;
            right++;
        }
    }

    // 返回最长回文子串
    char* result = (char*)malloc(sizeof(char) * (maxLength + 1));
    strncpy(result, s + start, maxLength);
    result[maxLength] = '\0'; // 终止符
    return result;
}

int main() {
    char s[] = "babad";
    char* result = longestPalindrome(s);
    printf("Longest Palindromic Substring: %s\n", result);
    free(result);
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    string longestPalindrome(string s) {
        int len = s.length();
        if (len <= 1) {
            return s; // 如果字符串长度为 1 或为空，直接返回
        }

        int start = 0, maxLength = 1;

        // 中心扩展法：从每个字符开始扩展
        for (int i = 0; i < len; ++i) {
            // 扩展奇数长度的回文串
            int left = i, right = i;
            while (left >= 0 && right < len && s[left] == s[right]) {
                if (right - left + 1 > maxLength) {
                    maxLength = right - left + 1;
                    start = left;
                }
                left--;
                right++;
            }

            // 扩展偶数长度的回文串
            left = i;
            right = i + 1;
            while (left >= 0 && right < len && s[left] == s[right]) {
                if (right - left + 1 > maxLength) {
                    maxLength = right - left + 1;
                    start = left;
                }
                left--;
                right++;
            }
        }

        // 返回最长回文子串
        return s.substr(start, maxLength);
    }
};

int main() {
    Solution solution;
    string s = "babad";
    string result = solution.longestPalindrome(s);
    cout << "Longest Palindromic Substring: " << result << endl;
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 使用 `longestPalindrome` 函数，采用中心扩展法从每个字符开始，分别考虑奇数和偶数长度的回文子串。通过不断扩展检查回文并更新最长回文子串的起始位置和长度。
   - 最后返回最长的回文子串，使用 `malloc` 动态分配内存来存储结果。

2. **C++ 实现**：
   - 使用 `Solution` 类封装 `longestPalindrome` 函数，`string` 类型来表示字符串，利用 `substr` 方法提取最长回文子串。
   - 中心扩展法同样适用于 C++，只是在字符串操作上更加简洁。

#### 核心算法：
- 对于每个字符，尝试将它作为回文子串的中心，扩展两边检查是否形成回文串。返回最长的回文子串。

