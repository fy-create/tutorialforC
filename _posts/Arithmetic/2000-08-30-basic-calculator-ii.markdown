---
layout: post
title:  "227. 基本计算器 II"
categories: arithmetic
---

[227. 基本计算器 II](https://leetcode.cn/problems/basic-calculator-ii)

### 题目描述

给你一个字符串表达式 `s`，请你实现一个基本计算器来计算并返回它的值。

表达式仅包含非负整数、`+`、`-`、`*`、`/` 四种运算符和空格 `' '`。整数除法仅保留整数部分。

你可以假设给定的表达式总是有效的。

所有中间结果的范围保证是 `[−2³¹, 2³¹ − 1]`。

---

#### 示例 1：
```
输入：s = "3+2*2"
输出：7
```

#### 示例 2：
```
输入：s = " 3/2 "
输出：1
```

#### 示例 3：
```
输入：s = " 3+5 / 2 "
输出：5
```

---

#### 提示：
- `1 <= s.length <= 3 * 10⁵`
- `s` 由整数和算符 (`+`, `-`, `*`, `/`) 以及空格 `' '` 组成
- `s` 是一个有效表达式

---

### 解题思路

这道题目要求我们实现一个支持基本四则运算的计算器。解决思路如下：

1. **跳过空格**：
   - 表达式可能包含空格，可以在解析时跳过。

2. **逐字符扫描**：
   - 使用一个变量 `currentNumber` 来存储当前的数字。
   - 用 `lastOperator` 记录上一个操作符。

3. **处理四种运算**：
   - 当遇到加号 `+` 或减号 `-` 时，将 `currentNumber` 根据操作符存入一个栈中，并更新 `lastOperator`。
   - 当遇到乘号 `*` 或除号 `/` 时，从栈中取出上一个数字，与当前数字进行运算，并将结果重新压入栈。

4. **计算结果**：
   - 扫描完成后，将栈中所有数字相加，得到最终结果。

5. **复杂度分析**：
   - 时间复杂度：`O(n)`，每个字符只处理一次。
   - 空间复杂度：`O(n)`，最坏情况下需要一个栈存储所有数字。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

// 辅助函数：移除字符串中的空格
char *removeSpaces(const char *s) {
    int len = strlen(s);
    char *result = (char *)malloc(len + 1);
    int index = 0;
    for (int i = 0; i < len; i++) {
        if (s[i] != ' ') {
            result[index++] = s[i];
        }
    }
    result[index] = '\0';
    return result;
}

// 基本计算器函数
int calculate(char *s) {
    // 移除空格
    char *expr = removeSpaces(s);
    int len = strlen(expr);
    
    int stack[len];
    int top = -1;  // 模拟栈
    int currentNumber = 0;
    char lastOperator = '+';  // 上一个操作符
    
    for (int i = 0; i < len; i++) {
        char c = expr[i];
        
        // 如果是数字，累积到当前数字
        if (isdigit(c)) {
            currentNumber = currentNumber * 10 + (c - '0');
        }
        
        // 如果遇到操作符或到达字符串末尾
        if (!isdigit(c) || i == len - 1) {
            if (lastOperator == '+') {
                stack[++top] = currentNumber;
            } else if (lastOperator == '-') {
                stack[++top] = -currentNumber;
            } else if (lastOperator == '*') {
                stack[top] *= currentNumber;
            } else if (lastOperator == '/') {
                stack[top] /= currentNumber;
            }
            // 更新操作符
            lastOperator = c;
            currentNumber = 0;
        }
    }
    
    // 计算栈中所有元素的和
    int result = 0;
    for (int i = 0; i <= top; i++) {
        result += stack[i];
    }
    
    free(expr);
    return result;
}

// 测试主函数
int main() {
    char expression[] = " 3+5 / 2 ";
    printf("Result: %d\n", calculate(expression));  // 输出: 5
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <stack>
#include <cctype>
#include <string>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        stack<int> stk;  // 用于存储数字
        int currentNumber = 0;
        char lastOperator = '+';  // 初始操作符
        
        for (size_t i = 0; i < s.size(); ++i) {
            char c = s[i];
            
            // 如果是数字，累积当前数字
            if (isdigit(c)) {
                currentNumber = currentNumber * 10 + (c - '0');
            }
            
            // 如果是操作符或到达字符串末尾
            if ((!isdigit(c) && !isspace(c)) || i == s.size() - 1) {
                if (lastOperator == '+') {
                    stk.push(currentNumber);
                } else if (lastOperator == '-') {
                    stk.push(-currentNumber);
                } else if (lastOperator == '*') {
                    int top = stk.top();
                    stk.pop();
                    stk.push(top * currentNumber);
                } else if (lastOperator == '/') {
                    int top = stk.top();
                    stk.pop();
                    stk.push(top / currentNumber);
                }
                // 更新操作符
                lastOperator = c;
                currentNumber = 0;
            }
        }
        
        // 计算栈中所有元素的和
        int result = 0;
        while (!stk.empty()) {
            result += stk.top();
            stk.pop();
        }
        return result;
    }
};

// 测试主函数
int main() {
    Solution solution;
    string expression = " 3+5 / 2 ";
    cout << "Result: " << solution.calculate(expression) << endl;  // 输出: 5
    return 0;
}
```

---

### 代码解读
- **C语言**：
  - 使用栈数组模拟计算过程。
  - 通过字符串解析和移除空格，确保计算逻辑简单清晰。
- **C++**：
  - 利用 `stack` STL 容器管理数字栈。
  - 操作符解析逻辑简洁高效，易于扩展。
