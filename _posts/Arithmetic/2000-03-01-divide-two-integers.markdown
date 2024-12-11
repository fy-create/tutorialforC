---
layout: post
title:  "29. 两数相除"
categories: arithmetic
---

[29. 两数相除](https://leetcode.cn/problems/divide-two-integers)

### 题目描述：
给你两个整数，被除数 `dividend` 和除数 `divisor`。将两数相除，要求不使用乘法、除法和 mod 运算符。

返回被除数 `dividend` 除以除数 `divisor` 得到的商。

**示例：**

**输入：** dividend = 10, divisor = 3

**输出：** 3

**输入：** dividend = 7, divisor = -3

**输出：** -2

**说明：**

- 被除数和除数均为 32 位有符号整数。
- 除数不为 0。
- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2³¹,  2³¹ − 1]。本题中，如果除法结果溢出，则返回 2³¹ − 1。

### 解题思路：

1. **模拟除法运算：**
   - 使用减法和移位运算模拟除法。
   - 倍增法：通过移位操作快速找到可以减去的最大倍数。

2. **处理正负号：**
   - 结果的符号由被除数和除数的符号决定。
   - 使用异或运算来确定符号。

3. **溢出处理：**
   - 如果结果超过 32 位整数范围，返回 2³¹ − 1。



```c
#include <stdio.h>
#include <limits.h>

int divide(int dividend, int divisor) {
    // 处理特殊情况
    if (dividend == INT_MIN && divisor == -1) return INT_MAX;

    // 确定结果的符号
    int negative = (dividend < 0) ^ (divisor < 0);

    // 转换为负数避免溢出
    long long a = (dividend < 0) ? -(long long)dividend : dividend;
    long long b = (divisor < 0) ? -(long long)divisor : divisor;

    int result = 0;
    while (a >= b) {
        long long temp = b;
        int multiple = 1;
        while (a >= (temp << 1) && (temp << 1) <= a) {
            temp <<= 1;
            multiple <<= 1;
        }
        a -= temp;
        result += multiple;
    }

    return negative ? -result : result;
}

int main() {
    int dividend = 10, divisor = 3;
    printf("结果: %d\n", divide(dividend, divisor));

    dividend = 7; divisor = -3;
    printf("结果: %d\n", divide(dividend, divisor));

    return 0;
}
```

```cpp
#include <iostream>
#include <climits>
using namespace std;

class Solution {
public:
    int divide(int dividend, int divisor) {
        // 处理特殊情况
        if (dividend == INT_MIN && divisor == -1) return INT_MAX;

        // 确定结果的符号
        bool negative = (dividend < 0) ^ (divisor < 0);

        // 转换为正数避免溢出
        long long a = abs((long long)dividend);
        long long b = abs((long long)divisor);

        int result = 0;
        while (a >= b) {
            long long temp = b;
            int multiple = 1;
            while (a >= (temp << 1) && (temp << 1) > 0) {
                temp <<= 1;
                multiple <<= 1;
            }
            a -= temp;
            result += multiple;
        }

        return negative ? -result : result;
    }
};

int main() {
    Solution sol;

    int dividend = 10, divisor = 3;
    cout << "结果: " << sol.divide(dividend, divisor) << endl;

    dividend = 7; divisor = -3;
    cout << "结果: " << sol.divide(dividend, divisor) << endl;

    return 0;
}
```