---
layout: post
title:  "8. 字符串转换整数 (atoi)"
categories: arithmetic
---

[8. 字符串转换整数 (atoi)](https://leetcode.cn/problems/string-to-integer-atoi)

### 题目：字符串转换整数 (String to Integer (atoi))

#### 题目要求：
实现一个 `myAtoi(string str)` 函数，模拟实现 `atoi` 函数，即将字符串转换为整数。

**注意：**
1. 先忽略掉输入的字符串中的前导空格，直到遇到第一个非空格字符为止。
2. 检查接下来的字符是否为正负号，如果是则记录下来，若不是则默认为正号。
3. 将接下来的数字字符转换为整数，直到遇到非数字字符或者字符串末尾。
4. 如果转换后的整数超出了 32 位有符号整数的范围 `[-2^31, 2^31 - 1]`，则返回 2^31 - 1 或 -2^31。
5. 如果没有数字字符，则返回 0。

#### 示例：
**示例 1:**

输入:
```
"42"
```

输出:
```
42
```

**示例 2:**

输入:
```
"   -42"
```

输出:
```
-42
```

**示例 3:**

输入:
```
"4193 with words"
```

输出:
```
4193
```

**示例 4:**

输入:
```
"words and 987"
```

输出:
```
0
```

**示例 5:**

输入:
```
"-91283472332"
```

输出:
```
-2147483648
```

#### 提示：
1. 字符串中可能包含前导和尾随空格。
2. 可能会有一个正负符号。
3. 只会包含数字字符。
4. 结果可能会超出 32 位有符号整数的范围。

---

### 解题思路：

要将字符串转换为整数，可以按照以下步骤进行：

1. **去除空格**：首先要忽略字符串前面的空格字符。
2. **处理符号**：接着，判断是否有正负号。如果有符号，则记录符号并准备进行后续的数字转换。
3. **转换数字**：将字符串中的数字字符逐个转换为整数，可以通过逐个字符的方式，将字符转换成数字，并累加到结果中。
4. **防止溢出**：在转换过程中，需要检查结果是否会超出 32 位整数的范围，如果超出则返回相应的最大值或最小值。
5. **结束条件**：如果遇到非数字字符，或者已经没有字符可供转换，则停止转换并返回结果。

#### 关键点：
- 需要考虑符号位。
- 需要处理溢出的情况。
- 需要正确处理无效的输入，例如没有数字或遇到非数字字符。

#### C 语言解法：

```c
#include <stdio.h>
#include <limits.h>
#include <ctype.h>

int myAtoi(char* str) {
    int i = 0, result = 0, sign = 1;
    
    // 1. 去掉前导空格
    while (str[i] == ' ') {
        i++;
    }
    
    // 2. 判断符号
    if (str[i] == '-' || str[i] == '+') {
        sign = (str[i] == '-') ? -1 : 1;
        i++;
    }

    // 3. 转换数字
    while (str[i] >= '0' && str[i] <= '9') {
        int digit = str[i] - '0';
        
        // 4. 防止溢出
        if (result > (INT_MAX - digit) / 10) {
            return sign == 1 ? INT_MAX : INT_MIN;
        }

        result = result * 10 + digit;
        i++;
    }

    return result * sign;
}

int main() {
    char str[] = "   -42";
    int result = myAtoi(str);
    printf("Converted Integer: %d\n", result);  // 输出 -42
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <climits>
#include <cctype>

using namespace std;

class Solution {
public:
    int myAtoi(string str) {
        int i = 0, result = 0, sign = 1;
        
        // 1. 去掉前导空格
        while (i < str.size() && str[i] == ' ') {
            i++;
        }

        // 2. 判断符号
        if (i < str.size() && (str[i] == '-' || str[i] == '+')) {
            sign = (str[i] == '-') ? -1 : 1;
            i++;
        }

        // 3. 转换数字
        while (i < str.size() && isdigit(str[i])) {
            int digit = str[i] - '0';
            
            // 4. 防止溢出
            if (result > (INT_MAX - digit) / 10) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }

            result = result * 10 + digit;
            i++;
        }

        return result * sign;
    }
};

int main() {
    Solution solution;
    string str = "   -42";
    int result = solution.myAtoi(str);
    cout << "Converted Integer: " << result << endl;  // 输出 -42
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - `myAtoi` 函数的核心思路是先跳过前导空格，再检查符号位（`+` 或 `-`），然后逐个字符地转换数字。
   - 防止溢出时，使用条件 `if (result > (INT_MAX - digit) / 10)` 来判断当前结果乘以 10 后是否会溢出。
   - 返回时根据符号返回正负整数。

2. **C++ 实现**：
   - 使用 `string` 类型来处理输入字符串，并通过 `isdigit` 函数判断是否为数字字符。
   - 同样地，通过 `if (result > (INT_MAX - digit) / 10)` 来判断是否溢出，并根据符号返回相应的整数。
   - C++ 中使用了 `INT_MAX` 和 `INT_MIN` 来代表 32 位整数的最大和最小值。

#### 核心算法：
- 去除空格、处理符号、逐位转换数字、检查溢出、返回结果。通过循环读取每个字符并构建结果，确保反应溢出的情况，并且处理无效输入。