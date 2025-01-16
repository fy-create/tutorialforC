---
layout: post
title:  "58. 最后一个单词的长度"
categories: arithmetic
---

[58. 最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word)

### 题目要求

**题目名称**: 最后一个单词的长度

**题目描述**:  
给定一个字符串 `s`，请你返回其中最后一个单词的长度。最后一个单词是由非空格字符组成的单词，单词之间由空格分隔。

**输入**:  
- 一个字符串 `s`，长度范围是 `[1, 10^4]`，字符串仅包含英文字母和空格。

**输出**:  
- 返回最后一个单词的长度。

**示例 1**:  
输入：`s = "Hello World"`  
输出：`5`  
解释：最后一个单词是 `"World"`，它的长度是 `5`。

**示例 2**:  
输入：`s = "   fly me   to   the moon  "`  
输出：`4`  
解释：最后一个单词是 `"moon"`，它的长度是 `4`。

**示例 3**:  
输入：`s = "luffy is still joyboy"`  
输出：`6`  
解释：最后一个单词是 `"joyboy"`，它的长度是 `6`。

**提示**:  
- 输入字符串 `s` 的长度范围是 `[1, 10^4]`。
- 字符串中仅包含英文字母和空格。

### 解题思路

1. **从后向前遍历**:  
   - 我们可以从字符串的末尾开始遍历，跳过结尾的空格，直到找到第一个非空格字符为止，这时我们已经找到了最后一个单词的结束位置。
   
2. **统计单词的长度**:  
   - 当找到一个非空格字符时，我们开始计算单词的长度，直到遇到空格或字符串的开头为止。
   
3. **空格处理**:  
   - 需要考虑字符串前后可能有空格，或字符串中间有多个连续空格的情况。

4. **时间复杂度**:  
   - 该方法的时间复杂度是 O(n)，其中 n 是字符串的长度，因为我们只遍历字符串一次。

---

### C 语言解答

```c
#include <stdio.h>
#include <string.h>

// 求字符串最后一个单词的长度
int lengthOfLastWord(char *s) {
    int length = 0;  // 用于记录当前单词的长度
    int i = strlen(s) - 1;  // 从字符串的末尾开始

    // 跳过末尾的空格
    while (i >= 0 && s[i] == ' ') {
        i--;
    }

    // 统计最后一个单词的长度
    while (i >= 0 && s[i] != ' ') {
        length++;
        i--;
    }

    return length;
}

int main() {
    // 示例输入
    char s[] = "   fly me   to   the moon  ";

    // 调用函数计算最后一个单词的长度
    int result = lengthOfLastWord(s);

    // 输出结果
    printf("Length of last word: %d\n", result);

    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    // 求字符串最后一个单词的长度
    int lengthOfLastWord(string s) {
        int length = 0;
        int i = s.size() - 1;

        // 跳过末尾的空格
        while (i >= 0 && s[i] == ' ') {
            i--;
        }

        // 统计最后一个单词的长度
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }

        return length;
    }
};

int main() {
    Solution solution;
    // 示例输入
    string s = "   fly me   to   the moon  ";

    // 调用函数计算最后一个单词的长度
    int result = solution.lengthOfLastWord(s);

    // 输出结果
    cout << "Length of last word: " << result << endl;

    return 0;
}
```

### 说明

1. **C语言解答**:
   - 使用 `strlen` 函数获取字符串的长度，然后从末尾开始遍历，跳过空格并统计最后一个单词的长度。
   - 返回计算出的最后一个单词的长度。

2. **C++解答**:
   - 使用 `string` 类型存储输入字符串，`size()` 函数获取字符串长度。
   - 使用 `while` 循环从末尾开始跳过空格，并统计最后一个单词的字符数。

两种语言的实现都遵循相同的基本思路：从字符串末尾开始向前查找，跳过尾部空格，找到最后一个单词并返回其长度。