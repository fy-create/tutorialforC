---
layout: post
title:  "38. 外观数列"
categories: arithmetic
---

[38. 外观数列](https://leetcode.cn/problems/count-and-say)

### 题目描述

给定一个正整数 `n`，输出外观数列的第 `n` 项。

「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。

你可以将其视作是由递归公式定义的数字字符串序列：

- `countAndSay(1) = "1"`
- `countAndSay(n)` 是对 `countAndSay(n-1)` 的描述，然后转换成另一个数字字符串。

**示例 1：**

输入：`n = 1`
输出：`"1"`
解释：这是一个基本情况。

**示例 2：**

输入：`n = 4`
输出：`"1211"`
解释：
- `countAndSay(1) = "1"`
- `countAndSay(2)` 对 `countAndSay(1)` 的描述是 "一个 1"，记作 `"11"`
- `countAndSay(3)` 对 `countAndSay(2)` 的描述是 "两个 1"，记作 `"21"`
- `countAndSay(4)` 对 `countAndSay(3)` 的描述是 "一个 2 一个 1"，记作 `"1211"`

**提示：**

- `1 <= n <= 30`

---

### 解题思路

外观数列的每一项是对前一项的描述。要生成第 `n` 项，需要从第 1 项开始，逐步生成直到第 `n` 项。具体步骤如下：

1. **初始化**：设定初始字符串为 `"1"`。
2. **迭代生成**：从第 2 项开始，直到第 `n` 项：
   - 对当前字符串进行遍历，统计连续字符的数量。
   - 将统计结果按 "数量+字符" 的格式拼接，生成新的字符串。
3. **返回结果**：最终得到的字符串即为所求的第 `n` 项。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 生成外观数列的第 n 项
char* countAndSay(int n) {
    // 初始项
    char* result = (char*)malloc(2 * sizeof(char));
    result[0] = '1';
    result[1] = '\0';

    // 临时字符串用于构建新项
    char* temp = NULL;

    // 迭代生成每一项
    for (int i = 1; i < n; i++) {
        int len = strlen(result);
        temp = (char*)malloc((len * 2 + 1) * sizeof(char)); // 最坏情况下长度翻倍
        int pos = 0;

        for (int j = 0; j < len; ) {
            char current_char = result[j];
            int count = 0;

            // 统计连续字符的数量
            while (j < len && result[j] == current_char) {
                count++;
                j++;
            }

            // 将数量和字符添加到临时字符串
            pos += sprintf(temp + pos, "%d%c", count, current_char);
        }

        // 释放旧的结果字符串
        free(result);
        result = temp;
    }

    return result;
}

// 测试函数
int main() {
    int n = 5;
    char* result = countAndSay(n);
    printf("外观数列的第 %d 项是: %s\n", n, result);
    free(result); // 释放动态分配的内存
    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    string countAndSay(int n) {
        // 初始项
        string result = "1";

        // 迭代生成每一项
        for (int i = 1; i < n; i++) {
            string temp;
            int len = result.length();

            for (int j = 0; j < len; ) {
                char current_char = result[j];
                int count = 0;

                // 统计连续字符的数量
                while (j < len && result[j] == current_char) {
                    count++;
                    j++;
                }

                // 将数量和字符添加到临时字符串
                temp += to_string(count) + current_char;
            }

            result = temp;
        }

        return result;
    }
};

// 测试函数
int main() {
    Solution solution;
    int n = 5;
    string result = solution.countAndSay(n);
    cout << "外观数列的第 " << n << " 项是: " << result << endl;
    return 0;
}
```

---

上述代码通过迭代方式生成外观数列的第 `n` 项，C 语言版本使用动态内存分配来处理字符串，C++ 版本则利用 `string` 类和相关的 STL 功能，代码清晰易读。 