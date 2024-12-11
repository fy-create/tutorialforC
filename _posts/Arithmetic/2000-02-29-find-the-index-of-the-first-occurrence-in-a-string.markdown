---
layout: post
title:  "28. 找出字符串中第一个匹配项的下标"
categories: arithmetic
---

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string)

### 题目描述：
实现 `strStr()` 函数。

给你两个字符串 `haystack` 和 `needle` ，请你在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  `-1` 。

**示例：**

**输入：** haystack = "sadbutsad", needle = "sad"

**输出：** 0

**输入：** haystack = "leetcode", needle = "leeto"

**输出：** -1

### 解题思路：

1. **暴力匹配**：
   - 遍历 `haystack` 字符串的每个起始点，尝试匹配 `needle`。
   - 如果匹配成功，返回起始位置。

2. **优化 - KMP 算法（可选）**：
   - 通过构建 `needle` 的部分匹配表（next 数组）来优化匹配过程。
   - 减少回溯次数。

3. **注意边界条件**：
   - `needle` 为空字符串时，返回 0。
   - `needle` 长度大于 `haystack` 时，返回 -1。

4. **时间复杂度**：
   - 暴力匹配：O(n * m)，其中 n 是 `haystack` 长度，m 是 `needle` 长度。
   - KMP 算法：O(n + m)。

```c
#include <stdio.h>
#include <string.h>

int strStr(char* haystack, char* needle) {
    int hLen = strlen(haystack);
    int nLen = strlen(needle);

    if (nLen == 0) return 0; // 如果 needle 为空，返回 0

    for (int i = 0; i <= hLen - nLen; i++) {
        int j;
        for (j = 0; j < nLen; j++) {
            if (haystack[i + j] != needle[j]) {
                break; // 如果字符不匹配，退出内层循环
            }
        }
        if (j == nLen) {
            return i; // 匹配成功，返回起始位置
        }
    }

    return -1; // 未找到匹配，返回 -1
}

int main() {
    char haystack[] = "sadbutsad";
    char needle[] = "sad";

    int index = strStr(haystack, needle);
    printf("匹配位置: %d\n", index);

    return 0;
}
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    int strStr(string haystack, string needle) {
        int hLen = haystack.size();
        int nLen = needle.size();

        if (nLen == 0) return 0; // 如果 needle 为空，返回 0

        for (int i = 0; i <= hLen - nLen; i++) {
            if (haystack.substr(i, nLen) == needle) { // 使用 substr 进行子串比较
                return i; // 匹配成功，返回起始位置
            }
        }

        return -1; // 未找到匹配，返回 -1
    }
};

int main() {
    string haystack = "sadbutsad";
    string needle = "sad";

    Solution sol;
    int index = sol.strStr(haystack, needle);
    cout << "匹配位置: " << index << endl;

    return 0;
}
```
