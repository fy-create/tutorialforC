---
layout: post
title:  "224. 基本计算器"
categories: arithmetic
---

[224. 基本计算器](https://leetcode.cn/problems/basic-calculator)

### 题目描述

#### 基本计算器
给你一个字符串表达式 `s`，请你实现一个基本计算器来计算并返回它的值。  
**注意：**  
- 表达式可以包含括号 `'('` 和 `')'`。
- 表达式仅包含整数、加号 `'+'` 和减号 `'-'`。
- 输入的表达式是有效的，且括号总是闭合的。

---

### 示例:

**示例 1:**  
```
输入: s = "1 + 1"
输出: 2
```

**示例 2:**  
```
输入: s = " 2-1 + 2 "
输出: 3
```

**示例 3:**  
```
输入: s = "(1+(4+5+2)-3)+(6+8)"
输出: 23
```

---

### 提示:
- `1 <= s.length <= 3 * 10⁵`
- `s` 由数字、`'+'`、`'-'`、`'('`、`')'` 和 `' '` 组成
- `s` 不包含任何无效的字符
- 输入表达式中的所有整数的取值范围为 `[-10⁵, 10⁵]`

---

### 解题思路
1. **问题分析**:
   - 需要处理的符号包括：
     - 加法 `'+'`
     - 减法 `'-'`
     - 括号 `'('` 和 `')'`
   - 空格需要跳过。
   - 需要正确处理括号优先级。

2. **栈的使用**:
   - 使用一个栈来保存当前计算结果和符号。
   - 遇到 `'('` 时，将当前的结果和符号压入栈中，并开始新的计算。
   - 遇到 `')'` 时，从栈中弹出之前的计算结果和符号，将括号内的结果合并到之前的结果。

3. **算法步骤**:
   1. 使用一个变量 `result` 保存当前的计算结果。
   2. 使用一个变量 `sign` 表示当前符号，初始为 `1`（表示正号）。
   3. 遍历字符串：
      - 遇到数字时，根据数字计算当前值。
      - 遇到 `'+'` 和 `'-'` 时更新符号。
      - 遇到 `'('` 时保存当前结果和符号，开始新的计算。
      - 遇到 `')'` 时结束当前计算，将括号内结果合并到外部结果。
   4. 返回最终计算结果。

---

### C 语言解答
```c
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h> // 用于isdigit函数

#define STACK_SIZE 10000

// 栈结构，用于保存结果和符号
typedef struct {
    int data[STACK_SIZE];
    int top;
} Stack;

// 初始化栈
void initStack(Stack* stack) {
    stack->top = -1;
}

// 判断栈是否为空
int isEmpty(Stack* stack) {
    return stack->top == -1;
}

// 入栈
void push(Stack* stack, int value) {
    stack->data[++(stack->top)] = value;
}

// 出栈
int pop(Stack* stack) {
    return stack->data[(stack->top)--];
}

// 基本计算器函数
int calculate(char* s) {
    Stack stack;
    initStack(&stack);
    int result = 0; // 当前计算结果
    int sign = 1;   // 当前符号，1为正，-1为负
    int i = 0;

    while (s[i] != '\0') {
        char c = s[i];
        if (isdigit(c)) {
            // 解析数字
            int num = 0;
            while (isdigit(s[i])) {
                num = num * 10 + (s[i] - '0');
                i++;
            }
            result += sign * num;
            continue;
        } else if (c == '+') {
            sign = 1;
        } else if (c == '-') {
            sign = -1;
        } else if (c == '(') {
            // 保存当前结果和符号
            push(&stack, result);
            push(&stack, sign);
            result = 0;
            sign = 1;
        } else if (c == ')') {
            // 合并括号内的结果
            int prevSign = pop(&stack);
            int prevResult = pop(&stack);
            result = prevResult + prevSign * result;
        }
        i++;
    }

    return result;
}

int main() {
    char expression[] = "(1+(4+5+2)-3)+(6+8)";
    printf("计算结果: %d\n", calculate(expression));
    return 0;
}
```

---

### C++ 解答
```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    int calculate(string s) {
        stack<int> stk; // 栈保存结果和符号
        int result = 0; // 当前计算结果
        int sign = 1;   // 当前符号，1为正，-1为负
        int i = 0;

        while (i < s.length()) {
            char c = s[i];
            if (isdigit(c)) {
                // 解析数字
                int num = 0;
                while (i < s.length() && isdigit(s[i])) {
                    num = num * 10 + (s[i] - '0');
                    i++;
                }
                result += sign * num;
                continue;
            } else if (c == '+') {
                sign = 1;
            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                // 保存当前结果和符号
                stk.push(result);
                stk.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                // 合并括号内的结果
                int prevSign = stk.top();
                stk.pop();
                int prevResult = stk.top();
                stk.pop();
                result = prevResult + prevSign * result;
            }
            i++;
        }

        return result;
    }
};

int main() {
    Solution solution;
    string expression = "(1+(4+5+2)-3)+(6+8)";
    cout << "计算结果: " << solution.calculate(expression) << endl;
    return 0;
}
```

### 代码说明:
1. **C 语言实现**:
   - 手动实现栈操作，使用数组模拟栈。
   - 通过遍历字符串处理括号优先级和符号。
   - 每次解析数字时将结果加入当前计算值。

2. **C++ 实现**:
   - 使用 STL 中的 `stack` 简化栈操作。
   - 将功能封装在 `Solution` 类中，主函数调用更加清晰。
   - 通过字符串和标准库方法简化字符解析和计算过程。