---
layout: post
title:  "273. 整数转换英文表示"
categories: arithmetic
---

[273. 整数转换英文表示](https://leetcode.cn/problems/integer-to-english-words)

### 题目描述

将非负整数 `num` 转换为其对应的英文单词表示。

**注意：**
- 0 <= num <= 2^31 - 1

**示例 1:**

```
输入: num = 123
输出: "One Hundred Twenty Three"
```

**示例 2:**

```
输入: num = 12345
输出: "Twelve Thousand Three Hundred Forty Five"
```

**示例 3:**

```
输入: num = 1234567
输出: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
```

**提示：**
- 输入的数字范围是 [0, 2^31 - 1]。

---

### 解题思路

这是一个典型的字符串处理问题。我们需要将数字逐段分解，并根据每段的大小转换为对应的英文单词。

1. **分段处理：**
   - 将数字分为三段：Billion（十亿）、Million（百万）、Thousand（千）和 Hundred（百）。
   - 每段单独处理，转换为对应的英文单词。

2. **辅助函数：**
   - 实现一个辅助函数 `helper`，用于将三位数转换为英文单词。
   - 实现一个辅助函数 `numberToWords`，用于将整个数字转换为英文单词。

3. **边界条件：**
   - 如果输入的数字为 0，直接返回 "Zero"。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 辅助函数：将三位数转换为英文单词
char* helper(int num) {
    char* units[] = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
    char* teens[] = {"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    char* tens[] = {"", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};

    char* result = (char*)malloc(100 * sizeof(char));
    result[0] = '\0';

    if (num >= 100) {
        strcat(result, units[num / 100]);
        strcat(result, " Hundred ");
        num %= 100;
    }

    if (num >= 20) {
        strcat(result, tens[num / 10]);
        strcat(result, " ");
        num %= 10;
    } else if (num >= 10) {
        strcat(result, teens[num - 10]);
        strcat(result, " ");
        num = 0;
    }

    if (num > 0) {
        strcat(result, units[num]);
        strcat(result, " ");
    }

    return result;
}

// 主函数：将数字转换为英文单词
char* numberToWords(int num) {
    if (num == 0) {
        return "Zero";
    }

    char* result = (char*)malloc(1000 * sizeof(char));
    result[0] = '\0';

    if (num >= 1000000000) {
        strcat(result, helper(num / 1000000000));
        strcat(result, "Billion ");
        num %= 1000000000;
    }

    if (num >= 1000000) {
        strcat(result, helper(num / 1000000));
        strcat(result, "Million ");
        num %= 1000000;
    }

    if (num >= 1000) {
        strcat(result, helper(num / 1000));
        strcat(result, "Thousand ");
        num %= 1000;
    }

    if (num > 0) {
        strcat(result, helper(num));
    }

    // 去除末尾的空格
    if (result[strlen(result) - 1] == ' ') {
        result[strlen(result) - 1] = '\0';
    }

    return result;
}

// 测试代码
int main() {
    int num = 123;
    char* result = numberToWords(num);

    printf("英文单词表示: \"%s\"\n", result);

    free(result); // 释放内存
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string numberToWords(int num) {
        if (num == 0) {
            return "Zero";
        }

        string result;

        if (num >= 1000000000) {
            result += helper(num / 1000000000) + "Billion ";
            num %= 1000000000;
        }

        if (num >= 1000000) {
            result += helper(num / 1000000) + "Million ";
            num %= 1000000;
        }

        if (num >= 1000) {
            result += helper(num / 1000) + "Thousand ";
            num %= 1000;
        }

        if (num > 0) {
            result += helper(num);
        }

        // 去除末尾的空格
        if (!result.empty() && result.back() == ' ') {
            result.pop_back();
        }

        return result;
    }

private:
    string helper(int num) {
        vector<string> units = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
        vector<string> teens = {"Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
        vector<string> tens = {"", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};

        string result;

        if (num >= 100) {
            result += units[num / 100] + " Hundred ";
            num %= 100;
        }

        if (num >= 20) {
            result += tens[num / 10] + " ";
            num %= 10;
        } else if (num >= 10) {
            result += teens[num - 10] + " ";
            num = 0;
        }

        if (num > 0) {
            result += units[num] + " ";
        }

        return result;
    }
};

// 测试代码
int main() {
    Solution solution;
    int num = 123;
    string result = solution.numberToWords(num);

    cout << "英文单词表示: \"" << result << "\"" << endl;

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用辅助函数 `helper` 将三位数转换为英文单词。
   - 使用主函数 `numberToWords` 将整个数字转换为英文单词。
   - 注意内存管理，避免内存泄漏。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 和 `string` 简化代码。
   - 利用辅助函数 `helper` 和主函数 `numberToWords` 实现功能。
   - 代码简洁高效，符合 C++ 编程风格。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地将数字转换为英文单词表示。