---
layout: post
title:  "22. 括号生成"
categories: arithmetic
---

[22. 括号生成](https://leetcode.cn/problems/generate-parentheses)

### 题目描述：
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

**示例：**

**输入：** n = 3
**输出：** [
   "((()))",
   "(()())",
   "(())()",
   "()(())",
   "()()()"
]

### 解题思路：

1. **递归法：**
   - 使用递归函数生成所有可能的括号组合。
   - 设置两个计数器 `left` 和 `right`，分别表示剩余的左括号和右括号。
   - 每次递归时：
     - 如果 `left > 0`，添加一个左括号并递归。
     - 如果 `right > left`，添加一个右括号并递归。
     - 如果 `left == 0` 且 `right == 0`，将当前组合加入结果。

2. **回溯法：**
   - 本质上是递归法的一种实现，通过撤销上一步操作来回到之前的状态。
   - 遍历所有可能的括号组合，找到满足条件的解。

3. **时间和空间复杂度：**
   - 时间复杂度：O(4^n / \sqrt{n})，卡特兰数的复杂度。
   - 空间复杂度：O(n)，递归调用栈的深度。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void generate(char* current, int left, int right, char** result, int* returnSize) {
    if (left == 0 && right == 0) {
        result[*returnSize] = strdup(current); // 复制当前字符串到结果
        (*returnSize)++;
        return;
    }
    if (left > 0) {
        strcat(current, "(");
        generate(current, left - 1, right, result, returnSize);
        current[strlen(current) - 1] = '\0'; // 回溯
    }
    if (right > left) {
        strcat(current, ")");
        generate(current, left, right - 1, result, returnSize);
        current[strlen(current) - 1] = '\0'; // 回溯
    }
}

char** generateParenthesis(int n, int* returnSize) {
    char** result = (char**)malloc(sizeof(char*) * 1000);
    char* current = (char*)malloc(sizeof(char) * (2 * n + 1));
    current[0] = '\0';
    *returnSize = 0;
    generate(current, n, n, result, returnSize);
    free(current);
    return result;
}

int main() {
    int returnSize;
    char** result = generateParenthesis(3, &returnSize);
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
        free(result[i]);
    }
    free(result);
    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    void backtrack(string current, int left, int right, vector<string>& result) {
        if (left == 0 && right == 0) {
            result.push_back(current);
            return;
        }
        if (left > 0) {
            backtrack(current + "(", left - 1, right, result);
        }
        if (right > left) {
            backtrack(current + ")", left, right - 1, result);
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;
        backtrack("", n, n, result);
        return result;
    }
};

int main() {
    Solution sol;
    vector<string> result = sol.generateParenthesis(3);
    for (const string& s : result) {
        cout << s << endl;
    }
    return 0;
}
```
