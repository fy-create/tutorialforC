---
layout: post
title:  "58. 最后一个单词的长度"
categories: arithmetic
---

[58. 最后一个单词的长度](https://leetcode.cn/problems/length-of-last-word)

## Length of Last Word

**题目描述：**

给你一个字符串 `s`，由若干单词组成，单词之间用空格隔开。返回字符串中最后一个单词的长度。

**示例：**

1. 输入：s = "Hello World"
   输出：5

2. 输入：s = "   fly me   to   the moon  "
   输出：4

3. 输入：s = "luffy is still joyboy"
   输出：6

**提示：**

- `1 <= s.length <= 10^4`
- `s` 仅包含英文字母和空格 `' '`
- `s` 中至少存在一个单词

## 解题思路：

1. 从字符串的末尾开始向前遍历，跳过所有的空格字符，找到最后一个单词的末尾。
2. 从最后一个单词的末尾开始，继续向前遍历，直到遇到空格字符或到达字符串的开头。此时，计算出最后一个单词的长度。

## C 语言解答：

```c
#include <stdio.h>
#include <string.h>

// 计算最后一个单词的长度
int lengthOfLastWord(char* s) {
    int length = 0;
    int i = strlen(s) - 1;

    // 跳过末尾的空格
    while (i >= 0 && s[i] == ' ') {
        i--;
    }

    // 计算最后一个单词的长度
    while (i >= 0 && s[i] != ' ') {
        length++;
        i--;
    }

    return length;
}

int main() {
    char s[] = "   fly me   to   the moon  ";
    printf("Length of last word: %d\n", lengthOfLastWord(s));
    return 0;
}
```

**代码解析：**

1. 从字符串的末尾开始向前遍历，跳过所有的空格字符，找到最后一个单词的末尾。
2. 从最后一个单词的末尾开始，继续向前遍历，直到遇到空格字符或到达字符串的开头。此时，计算出最后一个单词的长度。

## C++ 语言解答：

```cpp
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    int lengthOfLastWord(string s) {
        int length = 0;
        int i = s.size() - 1;

        // 跳过末尾的空格
        while (i >= 0 && s[i] == ' ') {
            i--;
        }

        // 计算最后一个单词的长度
        while (i >= 0 && s[i] != ' ') {
            length++;
            i--;
        }

        return length;
    }
};

int main() {
    Solution sol;
    string s = "   fly me   to   the moon  ";
    cout << "Length of last word: " << sol.lengthOfLastWord(s) << endl;
    return 0;
}
```