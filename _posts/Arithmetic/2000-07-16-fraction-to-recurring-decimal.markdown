---
layout: post
title:  "166. 分数到小数"
categories: arithmetic
---

[166. 分数到小数](https://leetcode.cn/problems/fraction-to-recurring-decimal)

### 题目描述

给定两个整数，分别表示分数的分子 `numerator` 和分母 `denominator`，以字符串形式返回小数。如果小数部分为循环小数，则将循环的部分括在括号内。

**示例 1:**

```
输入: numerator = 1, denominator = 2
输出: "0.5"
```

**示例 2:**

```
输入: numerator = 2, denominator = 1
输出: "2"
```

**示例 3:**

```
输入: numerator = 2, denominator = 3
输出: "0.(6)"
```

**示例 4:**

```
输入: numerator = 4, denominator = 333
输出: "0.(012)"
```

**示例 5:**

```
输入: numerator = 1, denominator = 5
输出: "0.2"
```

**提示:**

- `-2^31 <= numerator, denominator <= 2^31 - 1`
- `denominator != 0`

---

### 解题思路

1. **处理符号**：
   - 判断分子和分母的符号，确定最终结果的符号。
   - 将分子和分母转换为正数，方便计算。

2. **整数部分**：
   - 计算整数部分，即 `numerator / denominator`。

3. **小数部分**：
   - 使用哈希表记录余数及其在小数部分的位置，以便检测循环。
   - 每次将余数乘以 10，然后除以分母，得到当前小数位。
   - 如果余数已经存在于哈希表中，则说明出现循环，将循环部分用括号括起来。

4. **边界条件**：
   - 如果分子为 0，直接返回 "0"。
   - 如果分母为 0，返回空字符串（根据题目提示，分母不会为 0）。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_RESULT_SIZE 10000

// 主函数
char* fractionToDecimal(int numerator, int denominator) {
    if (numerator == 0) return "0";

    char* result = (char*)malloc(MAX_RESULT_SIZE * sizeof(char));
    int index = 0;

    // 处理符号
    if ((numerator < 0) ^ (denominator < 0)) {
        result[index++] = '-';
    }

    // 转换为正数
    long num = labs((long)numerator);
    long den = labs((long)denominator);

    // 整数部分
    long integerPart = num / den;
    sprintf(result + index, "%ld", integerPart);
    index = strlen(result);

    // 余数
    long remainder = num % den;
    if (remainder == 0) return result;

    // 小数部分
    result[index++] = '.';

    // 哈希表记录余数及其位置
    char* decimalPart = (char*)malloc(MAX_RESULT_SIZE * sizeof(char));
    int decimalIndex = 0;
    long* remainderMap = (long*)malloc(MAX_RESULT_SIZE * sizeof(long));
    int mapIndex = 0;

    while (remainder != 0) {
        if (mapIndex >= MAX_RESULT_SIZE) break;

        // 检查余数是否已经存在
        for (int i = 0; i < mapIndex; i++) {
            if (remainderMap[i] == remainder) {
                // 找到循环部分
                for (int j = 0; j < i; j++) {
                    result[index++] = decimalPart[j];
                }
                result[index++] = '(';
                for (int j = i; j < decimalIndex; j++) {
                    result[index++] = decimalPart[j];
                }
                result[index++] = ')';
                result[index] = '\0';
                free(decimalPart);
                free(remainderMap);
                return result;
            }
        }

        // 记录余数及其位置
        remainderMap[mapIndex++] = remainder;

        // 计算当前小数位
        remainder *= 10;
        decimalPart[decimalIndex++] = (remainder / den) + '0';
        remainder %= den;
    }

    // 没有循环部分
    for (int i = 0; i < decimalIndex; i++) {
        result[index++] = decimalPart[i];
    }
    result[index] = '\0';

    free(decimalPart);
    free(remainderMap);
    return result;
}

int main() {
    int numerator = 4;
    int denominator = 333;
    char* result = fractionToDecimal(numerator, denominator);
    printf("分数转换为小数: %s\n", result); // 输出 "0.(012)"
    free(result);
    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <cmath>
using namespace std;

class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";

        string result;

        // 处理符号
        if ((numerator < 0) ^ (denominator < 0)) {
            result += '-';
        }

        // 转换为正数
        long num = labs((long)numerator);
        long den = labs((long)denominator);

        // 整数部分
        result += to_string(num / den);
        long remainder = num % den;
        if (remainder == 0) return result;

        // 小数部分
        result += '.';

        // 哈希表记录余数及其位置
        unordered_map<long, int> remainderMap;
        while (remainder != 0) {
            // 检查余数是否已经存在
            if (remainderMap.find(remainder) != remainderMap.end()) {
                // 找到循环部分
                result.insert(remainderMap[remainder], "(");
                result += ')';
                return result;
            }

            // 记录余数及其位置
            remainderMap[remainder] = result.size();

            // 计算当前小数位
            remainder *= 10;
            result += to_string(remainder / den);
            remainder %= den;
        }

        return result;
    }
};

int main() {
    Solution solution;
    int numerator = 4;
    int denominator = 333;
    string result = solution.fractionToDecimal(numerator, denominator);
    cout << "分数转换为小数: " << result << endl; // 输出 "0.(012)"
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
numerator = 1, denominator = 2
```
#### 输出 1
```
"0.5"
```

#### 输入 2
```
numerator = 2, denominator = 1
```
#### 输出 2
```
"2"
```

#### 输入 3
```
numerator = 2, denominator = 3
```
#### 输出 3
```
"0.(6)"
```

#### 输入 4
```
numerator = 4, denominator = 333
```
#### 输出 4
```
"0.(012)"
```

#### 输入 5
```
numerator = 1, denominator = 5
```
#### 输出 5
```
"0.2"
```

---

### 复杂度分析

- **时间复杂度**：O(N)，其中 N 是小数部分的长度。最坏情况下需要遍历所有小数位。
- **空间复杂度**：O(N)，用于存储哈希表和小数部分。

---

### 总结

通过处理符号、整数部分和小数部分，并使用哈希表检测循环，我们可以高效地将分数转换为小数。这种方法能够处理各种边界条件，并确保结果的正确性。
