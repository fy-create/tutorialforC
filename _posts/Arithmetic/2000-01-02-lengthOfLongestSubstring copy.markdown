---
layout: post
title:  "3. 无重复字符的最长子串"
categories: arithmetic
---

https://leetcode.cn/problems/longest-substring-without-repeating-characters

**题目描述：**

给定一个字符串 `s`，请你找出其中不含有重复字符的最长子串的长度。

**示例：**

- 示例 1：
  - 输入：`s = "abcabcbb"`
  - 输出：`3`
  - 解释：无重复字符的最长子串是 `"abc"`，其长度为 3。

- 示例 2：
  - 输入：`s = "bbbbb"`
  - 输出：`1`
  - 解释：无重复字符的最长子串是 `"b"`，其长度为 1。

- 示例 3：
  - 输入：`s = "pwwkew"`
  - 输出：`3`
  - 解释：无重复字符的最长子串是 `"wke"`，其长度为 3。请注意，答案必须是子串的长度，`"pwke"` 是一个子序列，不是子串。

**提示：**

- `0 <= s.length <= 5 * 10^4`
- `s` 由英文字母、数字、符号和空格组成。

---

**C 语言解法：**

```c
#include <stdio.h>
#include <string.h>

int lengthOfLongestSubstring(char *s) {
    int n = strlen(s);
    int maxLen = 0;
    int start = 0;
    int index[128] = {0}; // ASCII 字符集大小

    for (int end = 0; end < n; end++) {
        char currentChar = s[end];
        // 如果当前字符在窗口中已存在，移动 start 指针
        if (index[currentChar] > start) {
            start = index[currentChar];
        }
        // 更新当前字符的最新位置
        index[currentChar] = end + 1;
        // 更新最大长度
        int currentLen = end - start + 1;
        if (currentLen > maxLen) {
            maxLen = currentLen;
        }
    }
    return maxLen;
}

// 主函数用于测试
int main() {
    char s1[] = "abcabcbb";
    char s2[] = "bbbbb";
    char s3[] = "pwwkew";

    printf("输入: \"%s\" 输出: %d\n", s1, lengthOfLongestSubstring(s1)); // 输出: 3
    printf("输入: \"%s\" 输出: %d\n", s2, lengthOfLongestSubstring(s2)); // 输出: 1
    printf("输入: \"%s\" 输出: %d\n", s3, lengthOfLongestSubstring(s3)); // 输出: 3

    return 0;
}
```

**C++ 语言解法：**

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(const string& s) {
        unordered_map<char, int> charIndexMap; // 存储字符及其最新位置
        int maxLen = 0;
        int start = 0; // 滑动窗口的起始位置

        for (int end = 0; end < s.length(); ++end) {
            char currentChar = s[end];
            // 如果当前字符已存在于窗口中，移动 start 指针
            if (charIndexMap.find(currentChar) != charIndexMap.end()) {
                start = max(charIndexMap[currentChar] + 1, start);
            }
            // 更新当前字符的最新位置
            charIndexMap[currentChar] = end;
            // 更新最大长度
            maxLen = max(maxLen, end - start + 1);
        }
        return maxLen;
    }
};

// 主函数用于测试
int main() {
    Solution solution;
    string s1 = "abcabcbb";
    string s2 = "bbbbb";
    string s3 = "pwwkew";

    cout << "输入: \"" << s1 << "\" 输出: " << solution.lengthOfLongestSubstring(s1) << endl; // 输出: 3
    cout << "输入: \"" << s2 << "\" 输出: " << solution.lengthOfLongestSubstring(s2) << endl; // 输出: 1
    cout << "输入: \"" << s3 << "\" 输出: " << solution.lengthOfLongestSubstring(s3) << endl; // 输出: 3

    return 0;
}
```

**代码解析：**

1. **滑动窗口技术：**
   - 使用两个指针 `start` 和 `end` 表示当前窗口的起始和结束位置。
   - `end` 指针向右移动遍历字符串。
   - 如果当前字符已在窗口中存在，移动 `start` 指针到重复字符的下一个位置，以确保窗口内无重复字符。

2. **字符位置记录：**
   - 使用数组（C 语言）或哈希表（C++ 语言）记录每个字符的最新位置。
   - 更新字符位置时，将其最新出现的位置存储起来。

3. **最大长度更新：**
   - 每次移动 `end` 指针时，计算当前窗口的长度，并更新最大长度。

**注意事项：**

- 在 C 语言中，使用大小为 128 的数组来记录 ASCII 字符的位置，初始化为 0。
- 在 C++ 语言中，使用 `unordered_map` 来记录字符及其最新位置。
- 当发现当前字符已在窗口中存在时，更新 `start` 指针到重复字符的下一个位置，以确保窗口内无重复字符。

通过上述方法，可以有效地找到字符串中无重复字符的最长子串长度。 