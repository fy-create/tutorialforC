---
layout: post
title:  "5. 最长回文子串"
categories: arithmetic
---

https://leetcode.cn/problems/longest-palindromic-substring/

**题目描述：**

给定一个字符串 `s`，找到 `s` 中最长的回文子串。

**示例 1：**

```
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
```

**示例 2：**

```
输入：s = "cbbd"
输出："bb"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 仅由数字和英文字母组成

---

**C 语言解法：**

```c
#include <stdio.h>
#include <string.h>

// 辅助函数：扩展中心，寻找以 left 和 right 为中心的最长回文子串
int expandAroundCenter(const char* s, int left, int right) {
    int L = left;
    int R = right;
    while (L >= 0 && R < strlen(s) && s[L] == s[R]) {
        L--;
        R++;
    }
    return R - L - 1; // 返回回文子串的长度
}

// 主函数：寻找最长回文子串
char* longestPalindrome(char* s) {
    int len = strlen(s);
    if (len < 1) return "";

    int start = 0, end = 0;
    for (int i = 0; i < len; i++) {
        int len1 = expandAroundCenter(s, i, i);   // 以单个字符为中心
        int len2 = expandAroundCenter(s, i, i + 1); // 以两个字符为中心
        int maxLen = len1 > len2 ? len1 : len2;
        if (maxLen > end - start) {
            start = i - (maxLen - 1) / 2;
            end = i + maxLen / 2;
        }
    }

    // 提取最长回文子串
    int substrLen = end - start + 1;
    char* result = (char*)malloc((substrLen + 1) * sizeof(char));
    strncpy(result, s + start, substrLen);
    result[substrLen] = '\0';
    return result;
}

// 测试函数
int main() {
    char s1[] = "babad";
    char s2[] = "cbbd";

    printf("输入：%s\n输出：%s\n", s1, longestPalindrome(s1)); // 输出："bab" 或 "aba"
    printf("输入：%s\n输出：%s\n", s2, longestPalindrome(s2)); // 输出："bb"

    return 0;
}
```

**C++ 语言解法：**

```cpp
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    // 辅助函数：扩展中心，寻找以 left 和 right 为中心的最长回文子串
    int expandAroundCenter(const string& s, int left, int right) {
        int L = left;
        int R = right;
        while (L >= 0 && R < s.length() && s[L] == s[R]) {
            L--;
            R++;
        }
        return R - L - 1; // 返回回文子串的长度
    }

    // 主函数：寻找最长回文子串
    string longestPalindrome(string s) {
        int len = s.length();
        if (len < 1) return "";

        int start = 0, end = 0;
        for (int i = 0; i < len; i++) {
            int len1 = expandAroundCenter(s, i, i);   // 以单个字符为中心
            int len2 = expandAroundCenter(s, i, i + 1); // 以两个字符为中心
            int maxLen = max(len1, len2);
            if (maxLen > end - start) {
                start = i - (maxLen - 1) / 2;
                end = i + maxLen / 2;
            }
        }
        return s.substr(start, end - start + 1);
    }
};

// 测试函数
int main() {
    Solution solution;
    string s1 = "babad";
    string s2 = "cbbd";

    cout << "输入：" << s1 << "\n输出：" << solution.longestPalindrome(s1) << endl; // 输出："bab" 或 "aba"
    cout << "输入：" << s2 << "\n输出：" << solution.longestPalindrome(s2) << endl; // 输出："bb"

    return 0;
}
```

**代码解析：**

1. **中心扩展法：**
   - **思想：** 回文子串的中心可能是一个字符（如 "aba"）或两个字符（如 "abba"）。遍历字符串中的每个字符，以其为中心向两边扩展，寻找最长的回文子串。
   - **步骤：**
     - 遍历字符串的每个字符，假设其为回文中心。
     - 分别考虑以单个字符和两个字符为中心的情况，向两边扩展，计算回文子串的长度。
     - 更新记录的最长回文子串的起始和结束位置。
   - **时间复杂度：** O(n²)，其中 n 是字符串的长度。

2. **辅助函数 `expandAroundCenter`：**
   - **功能：** 以指定的左右边界为中心，向两边扩展，寻找最长的回文子串。
   - **参数：**
     - `s`：输入字符串。
     - `left`：左边界索引。
     - `right`：右边界索引。
   - **返回值：** 回文子串的长度。

3. **主函数 `longestPalindrome`：**
   - **功能：** 寻找输入字符串中的最长回文子串。
   - **步骤：**
     - 初始化起始和结束索引。
     - 遍历字符串的每个字符，调用 `expandAroundCenter` 函数，计算以当前字符为中心的回文子串长度。
     - 更新最长回文子串的起始和结束索引。
     - 提取并返回最长的回文子串。

4. **测试函数 `main`：**
   - **功能：** 测试 `longestPalindrome` 函数的功能。
   - **步骤：**
     - 定义测试字符串。
     - 调用 `longestPalindrome` 函数，输出结果。

通过上述方法，可以有效地找到字符串中的最长回文子串。 