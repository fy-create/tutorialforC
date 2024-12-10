---
layout: post
title:  "8. 字符串转换整数 (atoi)"
categories: arithmetic
---

https://leetcode.cn/problems/string-to-integer-atoi

**题目描述：**

请你来实现一个 `myAtoi(string s)` 函数，使其能将字符串转换成一个 32 位有符号整数。

**函数 `myAtoi(string s)` 的算法如下：**

1. **读入并丢弃无用的前导空格**。
2. **检查下一个字符**（假设还未到字符串的末尾）**是否为正负号**，读取该字符（如果有）。确定最终结果是负数还是正数。如果两者都不存在，则假定结果为正。
3. **读入下一个字符**，直到到达下一个非数字字符或输入的末尾。将这些数字转换为整数，并将其附加到结果中。
4. **如果读取的数字超过了 32 位有符号整数的范围 [−2³¹, 2³¹ − 1]**，需要截断这个整数，使其保持在这个范围内。
5. **忽略**除上述步骤之外的所有其他字符。

**示例：**

1. 输入：`"42"`，输出：`42`
2. 输入：`"   -42"`，输出：`-42`
3. 输入：`"4193 with words"`，输出：`4193`
4. 输入：`"words and 987"`，输出：`0`
5. 输入：`"-91283472332"`，输出：`-2147483648`（超出范围，截断为最小值）

**C语言解答：**

```c
#include <stdio.h>
#include <ctype.h>
#include <limits.h>

int myAtoi(const char *s) {
    int i = 0;
    int sign = 1;
    long result = 0;

    // 跳过前导空格
    while (s[i] == ' ') {
        i++;
    }

    // 检查符号
    if (s[i] == '-' || s[i] == '+') {
        sign = (s[i] == '-') ? -1 : 1;
        i++;
    }

    // 读取数字并转换
    while (isdigit(s[i])) {
        result = result * 10 + (s[i] - '0');
        // 检查是否超出范围
        if (sign == 1 && result > INT_MAX) {
            return INT_MAX;
        }
        if (sign == -1 && -result < INT_MIN) {
            return INT_MIN;
        }
        i++;
    }

    return (int)(sign * result);
}

// 测试函数
int main() {
    const char *testCases[] = {
        "42",
        "   -42",
        "4193 with words",
        "words and 987",
        "-91283472332"
    };
    int expectedResults[] = {
        42,
        -42,
        4193,
        0,
        INT_MIN
    };
    int numTests = sizeof(testCases) / sizeof(testCases[0]);

    for (int i = 0; i < numTests; i++) {
        int result = myAtoi(testCases[i]);
        printf("Input: \"%s\" | Output: %d | Expected: %d\n",
               testCases[i], result, expectedResults[i]);
    }

    return 0;
}
```

**代码解析：**

1. **跳过前导空格**：使用循环跳过字符串开头的所有空格字符。
2. **确定符号**：检查当前字符是否为 '-' 或 '+'，并设置 `sign` 变量。如果是 '-'，则 `sign` 设为 -1；如果是 '+'，则 `sign` 设为 1。然后移动索引到下一个字符。
3. **转换数字**：使用 `isdigit` 函数检查当前字符是否为数字字符。如果是，将其转换为对应的整数值，并累积到 `result` 中。
4. **检查溢出**：在每次累积 `result` 时，检查其是否超出 32 位有符号整数的范围。如果超出，返回相应的边界值 `INT_MAX` 或 `INT_MIN`。
5. **返回结果**：最终返回 `sign` 与 `result` 的乘积，作为转换后的整数值。

**C++解答：**

```cpp
#include <iostream>
#include <string>
#include <cctype>
#include <climits>
#include <vector>

using namespace std;

class Solution {
public:
    int myAtoi(const string& s) {
        int i = 0;
        int sign = 1;
        long result = 0;

        // 跳过前导空格
        while (i < s.size() && isspace(s[i])) {
            i++;
        }

        // 检查符号
        if (i < s.size() && (s[i] == '-' || s[i] == '+')) {
            sign = (s[i] == '-') ? -1 : 1;
            i++;
        }

        // 读取数字并转换
        while (i < s.size() && isdigit(s[i])) {
            result = result * 10 + (s[i] - '0');
            // 检查是否超出范围
            if (sign == 1 && result > INT_MAX) {
                return INT_MAX;
            }
            if (sign == -1 && -result < INT_MIN) {
                return INT_MIN;
            }
            i++;
        }

        return static_cast<int>(sign * result);
    }
};

// 测试函数
int main() {
    vector<pair<string, int>> testCases = {
        {"42", 42},
        {"   -42", -42},
        {"4193 with words", 4193},
        {"words and 987", 0},
        {"-91283472332", INT_MIN}
    };

    Solution solution;
    for (const auto& testCase : testCases) {
        int result = solution.myAtoi(testCase.first);
        cout << "Input: \"" << testCase.first << "\" | Output: " << result
             << " | Expected: " << testCase.second << endl;
    }

    return 0;
}
```


1. **跳过前导空格**：使用 `isspace` 函数跳过所有的空格字符，定位到第一个非空字符。
2. **确定符号**：检查当前字符是否为 `+` 或 `-`，确定数字的符号。如果是 `+`，则结果为正；如果是 `-`，则结果为负。随后移动指针到下一个字符。
3. **读取数字并转换**：遍历后续的数字字符，将它们累积到结果中。每次累积后，检查结果是否超出 `INT_MAX` 或 `INT_MIN` 的范围。
4. **处理溢出**：在累积过程中，如果正数超出 `INT_MAX`，则返回 `INT_MAX`；如果负数小于 `INT_MIN`，则返回 `INT_MIN`。
5. **返回最终结果**：最终结果由数字部分与符号相乘后返回。

**主要功能亮点：**
- C++ 解法中使用了 STL 的 `vector` 和 `pair` 容器来处理测试用例，代码更加简洁。
- `Solution` 类将主要逻辑封装，使代码结构更加模块化、易于维护。

**运行结果示例：**

```plaintext
Input: "42" | Output: 42 | Expected: 42
Input: "   -42" | Output: -42 | Expected: -42
Input: "4193 with words" | Output: 4193 | Expected: 4193
Input: "words and 987" | Output: 0 | Expected: 0
Input: "-91283472332" | Output: -2147483648 | Expected: -2147483648
```

**总结：**
- C 语言版本直接操作字符串并处理边界情况，代码简洁高效。
- C++ 版本利用面向对象思想和 STL 容器，代码更具可读性和扩展性。适合大规模项目中集成和管理。