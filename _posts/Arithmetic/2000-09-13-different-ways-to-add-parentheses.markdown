---
layout: post
title:  "241. 为运算表达式设计优先级"
categories: arithmetic
---

[241. 为运算表达式设计优先级](https://leetcode.cn/problems/different-ways-to-add-parentheses)

### 题目描述

给定一个由数字和运算符组成的字符串 `expression`，通过添加括号来改变运算顺序，求出所有可能的结果。你需要返回所有可能的结果列表。

**注意：**
- 表达式中的运算符包括 `+`、`-` 和 `*`。
- 表达式中的数字都是正整数。

**示例 1:**

```
输入: expression = "2-1-1"
输出: [0, 2]
解释:
((2-1)-1) = 0 
(2-(1-1)) = 2
```

**示例 2:**

```
输入: expression = "2*3-4*5"
输出: [-34, -14, -10, -10, 10]
解释:
(2*(3-(4*5))) = -34 
((2*3)-(4*5)) = -14 
((2*(3-4))*5) = -10 
(2*((3-4)*5)) = -10 
(((2*3)-4)*5) = 10
```

**提示：**
- 表达式的长度范围是 [1, 20]。
- 表达式中的数字范围是 [1, 99]。
- 表达式中的运算符只有 `+`、`-` 和 `*`。

---

### 解题思路

这是一个典型的分治问题。我们可以通过递归的方式，将表达式根据运算符分成左右两部分，分别计算左右两部分的所有可能结果，然后根据当前运算符组合结果。

1. **递归终止条件：**
   - 如果表达式中没有运算符（即只有数字），则直接返回该数字。

2. **递归过程：**
   - 遍历表达式，找到每一个运算符。
   - 将表达式分为左半部分和右半部分，分别递归计算左半部分和右半部分的所有可能结果。
   - 根据当前运算符，将左半部分的结果和右半部分的结果进行组合，得到当前表达式的所有可能结果。

3. **结果合并：**
   - 将所有可能的结果存入结果列表中，最终返回。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 判断字符是否为运算符
int isOperator(char c) {
    return c == '+' || c == '-' || c == '*';
}

// 递归函数，计算表达式的所有可能结果
int* diffWaysToCompute(char* expression, int* returnSize) {
    int len = strlen(expression);
    int* results = (int*)malloc(1000 * sizeof(int)); // 假设结果最多 1000 个
    *returnSize = 0;

    // 如果表达式中没有运算符，直接返回数字
    int isNumber = 1;
    for (int i = 0; i < len; i++) {
        if (isOperator(expression[i])) {
            isNumber = 0;
            break;
        }
    }
    if (isNumber) {
        results[(*returnSize)++] = atoi(expression);
        return results;
    }

    // 遍历表达式，找到每一个运算符
    for (int i = 0; i < len; i++) {
        if (isOperator(expression[i])) {
            // 将表达式分为左半部分和右半部分
            char left[20], right[20];
            strncpy(left, expression, i);
            left[i] = '\0';
            strcpy(right, expression + i + 1);

            // 递归计算左半部分和右半部分的所有可能结果
            int leftSize, rightSize;
            int* leftResults = diffWaysToCompute(left, &leftSize);
            int* rightResults = diffWaysToCompute(right, &rightSize);

            // 根据当前运算符组合结果
            for (int j = 0; j < leftSize; j++) {
                for (int k = 0; k < rightSize; k++) {
                    switch (expression[i]) {
                        case '+':
                            results[(*returnSize)++] = leftResults[j] + rightResults[k];
                            break;
                        case '-':
                            results[(*returnSize)++] = leftResults[j] - rightResults[k];
                            break;
                        case '*':
                            results[(*returnSize)++] = leftResults[j] * rightResults[k];
                            break;
                    }
                }
            }

            // 释放内存
            free(leftResults);
            free(rightResults);
        }
    }

    return results;
}

// 测试代码
int main() {
    char expression[] = "2*3-4*5";
    int returnSize;
    int* results = diffWaysToCompute(expression, &returnSize);

    printf("所有可能的结果: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", results[i]);
    }
    printf("\n");

    free(results);
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        vector<int> results;

        // 遍历表达式，找到每一个运算符
        for (int i = 0; i < expression.size(); i++) {
            char c = expression[i];
            if (c == '+' || c == '-' || c == '*') {
                // 将表达式分为左半部分和右半部分
                string left = expression.substr(0, i);
                string right = expression.substr(i + 1);

                // 递归计算左半部分和右半部分的所有可能结果
                vector<int> leftResults = diffWaysToCompute(left);
                vector<int> rightResults = diffWaysToCompute(right);

                // 根据当前运算符组合结果
                for (int l : leftResults) {
                    for (int r : rightResults) {
                        switch (c) {
                            case '+':
                                results.push_back(l + r);
                                break;
                            case '-':
                                results.push_back(l - r);
                                break;
                            case '*':
                                results.push_back(l * r);
                                break;
                        }
                    }
                }
            }
        }

        // 如果表达式中没有运算符，直接返回数字
        if (results.empty()) {
            results.push_back(stoi(expression));
        }

        return results;
    }
};

// 测试代码
int main() {
    Solution solution;
    string expression = "2*3-4*5";
    vector<int> results = solution.diffWaysToCompute(expression);

    cout << "所有可能的结果: ";
    for (int result : results) {
        cout << result << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用递归方法遍历表达式，找到每一个运算符。
   - 将表达式分为左半部分和右半部分，分别递归计算所有可能结果。
   - 根据当前运算符组合结果，存入结果列表中。
   - 时间复杂度为指数级，因为每个运算符都会产生分支。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 存储结果。
   - 利用递归和分治法解决问题，代码简洁易读。
   - 时间复杂度与 C 语言实现相同。

3. **测试代码：**
   - 调用函数并输出所有可能的结果。

---

通过以上实现，可以高效地计算表达式中所有可能的括号组合结果。