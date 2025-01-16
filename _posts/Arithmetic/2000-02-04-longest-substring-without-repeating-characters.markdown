---
layout: post
title:  "3. 无重复字符的最长子串"
categories: arithmetic
---

[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters)

### 题目描述

给定一个字符串 `s`，请你找出其中不含有重复字符的最长子串的长度。

**示例 1：**

输入：`s = "abcabcbb"`  
输出：`3`  
解释：因为无重复字符的最长子串是 `"abc"`，所以其长度为 3。

**示例 2：**

输入：`s = "bbbbb"`  
输出：`1`  
解释：因为无重复字符的最长子串是 `"b"`，所以其长度为 1。

**示例 3：**

输入：`s = "pwwkew"`  
输出：`3`  
解释：因为无重复字符的最长子串是 `"wke"`，所以其长度为 3。  
请注意，答案必须是子串的长度，`"pwke"` 是一个子序列，不是子串。

### 提示

- `0 <= s.length <= 5 * 10^4`
- `s` 由英文字母、数字、符号和空格组成

---

### 解题思路

本题的核心是寻找字符串中不含有重复字符的最长子串。我们可以通过滑动窗口技术来优化暴力解法。

#### 滑动窗口：
1. **定义窗口：** 使用两个指针 `left` 和 `right` 来表示当前子串的窗口范围，`left` 表示子串的起始位置，`right` 表示子串的结束位置。
2. **窗口扩展：** 从左到右遍历字符串，将每个字符添加到窗口中，同时更新窗口的右边界。
3. **检测重复：** 使用一个哈希表（或数组）来记录当前窗口中每个字符的位置。如果遇到重复字符，则需要移动左指针 `left`，直到窗口内不再有重复字符。
4. **计算最大长度：** 每次更新窗口时，计算当前窗口的长度并更新最大值。

#### 步骤：
1. 初始化 `left` 指针为 0，`maxLength` 为 0，使用一个哈希表来存储字符的最后出现位置。
2. 遍历字符串，当遇到重复字符时，更新 `left` 指针的值，以确保窗口内没有重复字符。
3. 通过不断调整窗口大小来获得最长的无重复子串。

### C 语言解答

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 哈希表的大小，假设字符集为ASCII码
#define MAX_CHAR 128

int lengthOfLongestSubstring(char* s) {
    int lastIndex[MAX_CHAR];  // 用于存储字符的最后出现位置
    memset(lastIndex, -1, sizeof(lastIndex));  // 初始化为-1表示字符没有出现过

    int maxLength = 0;  // 存储最长子串的长度
    int left = 0;  // 左指针，表示当前窗口的起始位置

    // 遍历字符串，right表示右指针
    for (int right = 0; s[right] != '\0'; ++right) {
        // 如果字符已经出现在窗口中，更新左指针
        if (lastIndex[s[right]] >= left) {
            left = lastIndex[s[right]] + 1;
        }

        // 更新字符的最后出现位置
        lastIndex[s[right]] = right;

        // 计算当前窗口的长度，并更新最大值
        int currentLength = right - left + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
        }
    }

    return maxLength;
}

int main() {
    char s[] = "abcabcbb";
    printf("Longest substring length: %d\n", lengthOfLongestSubstring(s));
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <unordered_map>
#include <string>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // 使用哈希表记录字符的最新位置
        unordered_map<char, int> lastIndex;
        
        int maxLength = 0;  // 存储最长子串的长度
        int left = 0;  // 左指针，表示当前窗口的起始位置

        // 遍历字符串，right表示右指针
        for (int right = 0; right < s.size(); ++right) {
            // 如果字符已经在当前窗口内，更新左指针
            if (lastIndex.find(s[right]) != lastIndex.end() && lastIndex[s[right]] >= left) {
                left = lastIndex[s[right]] + 1;
            }

            // 更新字符的最后出现位置
            lastIndex[s[right]] = right;

            // 计算当前窗口的长度，并更新最大值
            int currentLength = right - left + 1;
            maxLength = max(maxLength, currentLength);
        }

        return maxLength;
    }
};

int main() {
    Solution solution;
    string s = "abcabcbb";
    cout << "Longest substring length: " << solution.lengthOfLongestSubstring(s) << endl;
    return 0;
}
```

### 解释

1. **C 语言版本：**
   - 使用 `lastIndex` 数组来记录字符的最后出现位置，数组大小为 128（假设字符集为 ASCII）。
   - 使用两个指针：`left` 和 `right`，通过滑动窗口的方式来找出无重复字符的最长子串。
   - 每次遇到重复字符时，更新 `left` 指针，并计算当前窗口的长度，更新最大值。

2. **C++ 语言版本：**
   - 使用 `unordered_map` 来记录字符的最后位置，代替了 C 语言中的数组。
   - 逻辑与 C 语言版本一致，但借助 C++ STL 提供的哈希表，代码更加简洁和易于理解。

### 时间复杂度：
- 时间复杂度为 O(n)，其中 n 是字符串的长度。我们只遍历字符串一次，每次字符的查找和更新都在常数时间内完成。
- 空间复杂度为 O(k)，其中 k 是字符集的大小。在本题中，由于假设字符集为 ASCII，因此空间复杂度是 O(128) ≈ O(1)，即常数空间复杂度。