---
layout: post
title:  "22. 括号生成"
categories: arithmetic
---

[22. 括号生成](https://leetcode.cn/problems/generate-parentheses)

### 题目描述

给定一个正整数 `n`，代表括号对的数量，请你设计一个函数，生成所有可能的并且**有效的**括号组合。

**示例 1：**

```
输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
```

**示例 2：**

```
输入：n = 1
输出：["()"]
```

**提示：**

- `1 <= n <= 8`

---

### 解题思路

要生成所有可能的有效括号组合，可以使用**回溯法**。

**核心思路：**

1. **递归构建：** 使用递归函数构建括号字符串，维护当前的字符串以及已使用的左括号和右括号数量。

2. **有效性约束：** 在构建过程中，确保：
   - 左括号数量不超过 `n`。
   - 右括号数量不超过左括号数量，以保证括号序列的有效性。

3. **终止条件：** 当左右括号数量均达到 `n` 时，得到一个有效的括号组合，将其加入结果集中。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 动态数组结构体，用于存储结果
typedef struct {
    char **data;
    int size;
    int capacity;
} ResultArray;

// 初始化结果数组
void initResultArray(ResultArray *arr) {
    arr->size = 0;
    arr->capacity = 16;
    arr->data = (char **)malloc(arr->capacity * sizeof(char *));
}

// 向结果数组添加新字符串
void addToResultArray(ResultArray *arr, const char *str) {
    if (arr->size >= arr->capacity) {
        arr->capacity *= 2;
        arr->data = (char **)realloc(arr->data, arr->capacity * sizeof(char *));
    }
    arr->data[arr->size] = strdup(str);
    arr->size++;
}

// 递归生成括号组合
void generateParenthesisRecursive(int n, int left, int right, char *current, int index, ResultArray *result) {
    if (left == n && right == n) {
        current[index] = '\0';
        addToResultArray(result, current);
        return;
    }
    if (left < n) {
        current[index] = '(';
        generateParenthesisRecursive(n, left + 1, right, current, index + 1, result);
    }
    if (right < left) {
        current[index] = ')';
        generateParenthesisRecursive(n, left, right + 1, current, index + 1, result);
    }
}

// 主函数，生成括号组合
char **generateParenthesis(int n, int *returnSize) {
    ResultArray result;
    initResultArray(&result);
    char *current = (char *)malloc((2 * n + 1) * sizeof(char));
    generateParenthesisRecursive(n, 0, 0, current, 0, &result);
    free(current);
    *returnSize = result.size;
    return result.data;
}

// 测试函数
int main() {
    int n = 3;
    int returnSize;
    char **result = generateParenthesis(n, &returnSize);
    printf("有效的括号组合有：\n");
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
        free(result[i]); // 释放每个字符串的内存
    }
    free(result); // 释放结果数组的内存
    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 生成括号组合的主函数
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string current;
        generateParenthesisRecursive(n, 0, 0, current, result);
        return result;
    }

private:
    // 递归生成括号组合
    void generateParenthesisRecursive(int n, int left, int right, string &current, vector<string> &result) {
        if (left == n && right == n) {
            result.push_back(current);
            return;
        }
        if (left < n) {
            current.push_back('(');
            generateParenthesisRecursive(n, left + 1, right, current, result);
            current.pop_back(); // 回溯
        }
        if (right < left) {
            current.push_back(')');
            generateParenthesisRecursive(n, left, right + 1, current, result);
            current.pop_back(); // 回溯
        }
    }
};

// 测试函数
int main() {
    int n = 3;
    Solution solution;
    vector<string> result = solution.generateParenthesis(n);
    cout << "有效的括号组合有：" << endl;
    for (const string &s : result) {
        cout << s << endl;
    }
    return 0;
}
```

---

以上代码通过递归和回溯的方法，生成了所有可能的有效括号组合。在 C 语言实现中，使用了动态数组来存储结果，并进行了内存管理。在 C++ 实现中，利用了 STL 容器和字符串操作，使代码更加简洁和易于维护。 