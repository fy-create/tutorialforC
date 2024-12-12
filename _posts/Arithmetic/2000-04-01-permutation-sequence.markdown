---
layout: post
title:  "60. 排列序列"
categories: arithmetic
---

[60. 排列序列](https://leetcode.cn/problems/permutation-sequence)

## Permutation Sequence

**题目描述：**

给定数字 `n` 和 `k`，返回第 `k` 个排列。

**示例：**

1. 输入: n = 3, k = 3
   输出: "213"

2. 输入: n = 4, k = 9
   输出: "2314"

3. 输入: n = 3, k = 1
   输出: "123"

**提示：**

- `1 <= n <= 9`
- `1 <= k <= n!`

## 解题思路：

1. 将数字 `1` 到 `n` 组成一个数组 `numbers`，用于记录未使用的数字。
2. 计算从 0 开始的第 `k` 个排列的索引 `k`（即 `k-1`）。
3. 使用阶乘数组 `factorials` 来存储 0 到 `n-1` 的阶乘值。
4. 初始化一个空的字符串 `result`，用于存储第 `k` 个排列。
5. 遍历数字 `1` 到 `n`，在每一轮中确定当前数字的位置：
   - 使用阶乘数组确定当前数字的位置索引。
   - 将该数字添加到 `result` 中，并从 `numbers` 中移除该数字。
   - 更新 `k` 的值。
6. 返回 `result`，即第 `k` 个排列。

## C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 计算阶乘
void calculateFactorials(int* factorials, int n) {
    factorials[0] = 1;
    for (int i = 1; i < n; i++) {
        factorials[i] = factorials[i - 1] * i;
    }
}

// 获取第 k 个排列
char* getPermutation(int n, int k) {
    int* factorials = (int*)malloc(n * sizeof(int));
    calculateFactorials(factorials, n);

    int* numbers = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        numbers[i] = i + 1;
    }

    k--; // 将 k 调整为从 0 开始的索引
    char* result = (char*)malloc((n + 1) * sizeof(char));
    result[n] = '\0';

    for (int i = 0; i < n; i++) {
        int index = k / factorials[n - 1 - i];
        result[i] = numbers[index] + '0';

        for (int j = index; j < n - 1; j++) {
            numbers[j] = numbers[j + 1];
        }
        k %= factorials[n - 1 - i];
    }

    free(factorials);
    free(numbers);

    return result;
}

int main() {
    int n = 4;
    int k = 9;
    char* permutation = getPermutation(n, k);
    printf("The %d-th permutation of %d is: %s\n", k, n, permutation);
    free(permutation);
    return 0;
}
```

**代码解析：**

1. 使用 `calculateFactorials` 函数计算阶乘数组。
2. 初始化 `numbers` 数组和 `result` 字符串。
3. 在每一轮中确定当前数字的位置，并更新 `k` 的值。
4. 返回结果字符串 `result`。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> factorials(n, 1);
        vector<int> numbers;

        // 计算阶乘数组
        for (int i = 1; i < n; ++i) {
            factorials[i] = factorials[i - 1] * i;
        }

        // 初始化数字数组
        for (int i = 1; i <= n; ++i) {
            numbers.push_back(i);
        }

        k--; // 将 k 调整为从 0 开始的索引
        string result;

        // 确定每一位数字
        for (int i = n; i > 0; --i) {
            int index = k / factorials[i - 1];
            result += to_string(numbers[index]);
            numbers.erase(numbers.begin() + index);
            k %= factorials[i - 1];
        }

        return result;
    }
};

int main() {
    Solution sol;
    int n = 4;
    int k = 9;
    string permutation = sol.getPermutation(n, k);
    cout << "The " << k << "-th permutation of " << n << " is: " << permutation << endl;
    return 0;
}
```