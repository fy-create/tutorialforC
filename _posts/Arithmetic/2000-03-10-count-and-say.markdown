---
layout: post
title:  "38. 外观数列"
categories: arithmetic
---

[38. 外观数列](https://leetcode.cn/problems/count-and-say)

### 题目描述：
给定一个正整数 n，输出报数序列的第 n 项。

"报数" 序列是一个整数序列，按如下方式生成：
- 第 1 项为 "1"。
- 第 n 项是对第 n-1 项的描述，表示为对其中连续数字进行计数后形成的字符串。

**示例：**

**输入：** n = 4

**输出：** "1211"

**解释：**
- 第 1 项是 "1"
- 第 2 项是 "11"（"1" 的个数为 1，记作 "11"）
- 第 3 项是 "21"（"1" 的个数为 2，记作 "21"）
- 第 4 项是 "1211"（"2" 的个数为 1，"1" 的个数为 1，记作 "1211"）

### 解题思路：

1. **递归或迭代**：
   - 从第 1 项开始逐步生成直到第 n 项。
   - 每次生成新的字符串时，对前一个字符串进行分组计数。

2. **字符串拼接**：
   - 使用一个计数器统计相邻字符的个数。
   - 当遇到不同字符或到达字符串末尾时，将计数和字符拼接到结果字符串中。

3. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(n \* m)，其中 n 是输入项数，m 是字符串的平均长度。
   - 空间复杂度：O(m)，用于存储当前生成的字符串。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* countAndSay(int n) {
    if (n == 1) {
        char* result = (char*)malloc(2);
        strcpy(result, "1");
        return result;
    }

    char* prev = countAndSay(n - 1); // 递归生成前一项
    int len = strlen(prev);
    char* result = (char*)malloc(len * 2 + 1); // 结果字符串，最大长度为前一项的两倍
    int count = 0, pos = 0;

    for (int i = 0; i < len; i++) {
        count++;
        if (i == len - 1 || prev[i] != prev[i + 1]) {
            result[pos++] = count + '0'; // 添加计数
            result[pos++] = prev[i];    // 添加字符
            count = 0;                  // 重置计数器
        }
    }
    result[pos] = '\0'; // 添加字符串结束符
    free(prev); // 释放前一项内存

    return result;
}

int main() {
    int n = 4;
    char* result = countAndSay(n);
    printf("报数序列第 %d 项: %s\n", n, result);
    free(result);

    return 0;
}
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string countAndSay(int n) {
        if (n == 1) return "1";

        string prev = countAndSay(n - 1); // 递归生成前一项
        string result = "";
        int count = 0;

        for (size_t i = 0; i < prev.size(); i++) {
            count++;
            if (i == prev.size() - 1 || prev[i] != prev[i + 1]) {
                result += to_string(count); // 添加计数
                result += prev[i];         // 添加字符
                count = 0;                 // 重置计数器
            }
        }

        return result;
    }
};

int main() {
    Solution sol;
    int n = 4;
    cout << "报数序列第 " << n << " 项: " << sol.countAndSay(n) << endl;

    return 0;
}
```

