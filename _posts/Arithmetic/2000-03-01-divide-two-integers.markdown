---
layout: post
title:  "29. 两数相除"
categories: arithmetic
---

[29. 两数相除](https://leetcode.cn/problems/divide-two-integers)

### 题目描述

给定两个整数 `dividend` 和 `divisor`，将两数相除，要求不使用乘法、除法和取余运算符。

整数除法的结果应当截去（truncate）其小数部分，例如：`truncate(8.345) = 8` 以及 `truncate(-2.7335) = -2`。

返回被除数 `dividend` 除以除数 `divisor` 得到的商。

**注意：**

- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2³¹, 2³¹ − 1]。本题中，如果商超过这个范围，返回 2³¹ − 1。

**示例 1：**

```
输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = 3.33333..，截断小数部分后得到 3。
```

**示例 2：**

```
输入: dividend = 7, divisor = -3
输出: -2
解释: 7/-3 = -2.33333..，截断小数部分后得到 -2。
```

**提示：**

- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设除法结果均可用 32 位有符号整数表示，且不会溢出。

---

**解题思路：**

1. **处理特殊情况：**
   - 如果 `divisor` 为 0，直接返回最大整数值（因为除数不能为 0）。
   - 如果 `dividend` 为 0，结果必然为 0。
   - 如果 `dividend` 是最小负数且 `divisor` 为 -1，结果会超出 32 位整数范围，应返回最大整数值。

2. **确定结果符号：**
   - 如果 `dividend` 和 `divisor` 的符号相同，结果为正；否则结果为负。

3. **使用位移操作进行除法：**
   - 将 `dividend` 和 `divisor` 转换为正数。
   - 通过左移操作找到最大的倍数，使得 `(divisor << x) <= dividend`。
   - 从 `dividend` 中减去这个倍数的值，并将对应的倍数加到结果中。
   - 重复上述步骤，直到 `dividend` 小于 `divisor`。

4. **返回结果：**
   - 根据之前确定的符号，返回正或负的结果。
   - 如果结果超出 32 位整数范围，返回最大整数值。

---

**C 语言实现：**

```c
#include <stdio.h>
#include <limits.h>

// 函数：实现两个整数的除法
int divide(int dividend, int divisor) {
    // 处理特殊情况
    if (divisor == 0) return INT_MAX; // 除数为0，返回最大整数
    if (dividend == 0) return 0;      // 被除数为0，结果为0
    if (dividend == INT_MIN && divisor == -1) return INT_MAX; // 溢出情况

    // 确定结果的符号
    int negative = (dividend > 0) ^ (divisor > 0);

    // 将被除数和除数转换为负数，避免溢出
    unsigned int dvd = (dividend > 0) ? -dividend : dividend;
    unsigned int dvs = (divisor > 0) ? -divisor : divisor;

    int result = 0;

    // 通过位移进行除法运算
    while (dvd <= dvs) {
        unsigned int temp = dvs;
        int multiple = 1;
        while (dvd <= (temp << 1) && (temp << 1) < temp) {
            temp <<= 1;
            multiple <<= 1;
        }
        dvd -= temp;
        result += multiple;
    }

    // 根据符号返回结果
    return negative ? -result : result;
}

// 测试函数
int main() {
    int dividend = 10;
    int divisor = 3;
    int quotient = divide(dividend, divisor);
    printf("商是: %d\n", quotient); // 输出：商是: 3
    return 0;
}
```

---

**C++ 语言实现：**

```cpp
#include <iostream>
#include <climits>

using namespace std;

class Solution {
public:
    // 函数：实现两个整数的除法
    int divide(int dividend, int divisor) {
        // 处理特殊情况
        if (divisor == 0) return INT_MAX; // 除数为0，返回最大整数
        if (dividend == 0) return 0;      // 被除数为0，结果为0
        if (dividend == INT_MIN && divisor == -1) return INT_MAX; // 溢出情况

        // 确定结果的符号
        bool negative = (dividend > 0) ^ (divisor > 0);

        // 将被除数和除数转换为负数，避免溢出
        unsigned int dvd = (dividend > 0) ? -dividend : dividend;
        unsigned int dvs = (divisor > 0) ? -divisor : divisor;

        int result = 0;

        // 通过位移进行除法运算
        while (dvd <= dvs) {
            unsigned int temp = dvs;
            int multiple = 1;
            while (dvd <= (temp << 1) && (temp << 1) < temp) {
                temp <<= 1;
                multiple <<= 1;
            }
            dvd -= temp;
            result += multiple;
        }

        // 根据符号返回结果
        return negative ? -result : result;
    }
};

// 测试函数
int main() {
    Solution solution;
    int dividend = 10;
    int divisor = 3;
    int quotient = solution.divide(dividend, divisor);
    cout << "商是: " << quotient << endl; // 输出：商是: 3
    return 0;
}
```

上述代码实现了在不使用乘法 