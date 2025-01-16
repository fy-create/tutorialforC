---
layout: post
title:  "216. 组合总和 III"
categories: arithmetic
---

[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii)

### 题目描述

给定一个整数 `k` 和一个整数 `n`，找出所有可能的 `k` 个数的组合，使得这些数之和为 `n`，且这 `k` 个数必须是从 1 到 9 中选取的数字。

返回所有满足条件的数字组合，数字可以重复选取，但组合中的数字不能重复。

### 示例

**示例 1**:
```
输入: k = 3, n = 7
输出: [[1, 2, 4]]
解释: 1 + 2 + 4 = 7
```

**示例 2**:
```
输入: k = 3, n = 9
输出: [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
解释: 
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
```

### 提示
- `k` 的范围是 [1, 9]。
- `n` 的范围是 [1, 60]。
- 你可以假设题目存在的组合至少有一种。

### 解题思路

这道题是一个典型的组合问题，可以通过回溯算法来解决。我们需要在从1到9的数字中，选出`k`个数字，使得它们的和为`n`，而且每个组合中的数字不能重复。

1. **回溯思想**:
   - 每次选择一个数字，递归尝试选择下一个数字。
   - 选择的数字要保证不重复且总和不会超出`n`。
   - 一旦选择了`k`个数且其和等于`n`，就把这个组合加入结果列表。
   
2. **剪枝**:
   - 如果当前的数字和已经超出`n`，那么不再继续往下搜索。
   - 由于数字只能从1到9选取，所以如果剩余的数字不够填满`k`个数或者当前的和已经大于`n`，则不需要继续尝试。

3. **回溯实现**:
   - 使用一个辅助函数来进行深度优先搜索（DFS），传入当前的起始数字、当前的数字组合、当前的和以及当前选中的数字个数。
   - 每次递归时选择一个数字，向下递归直到满足条件或超出限制。

### C语言解法

```c
#include <stdio.h>

void findCombinations(int k, int n, int start, int currentSum, int currentLength, int* currentCombination, int** result, int* returnSize, int* returnColumnSizes) {
    // 如果当前组合的长度已达到 k 且和为 n，记录当前组合
    if (currentLength == k) {
        if (currentSum == n) {
            result[*returnSize] = (int*)malloc(sizeof(int) * k);
            for (int i = 0; i < k; i++) {
                result[*returnSize][i] = currentCombination[i];
            }
            returnColumnSizes[*returnSize] = k;
            (*returnSize)++;
        }
        return;
    }
    
    // 选择数字，从 start 开始，保证每个数字只出现一次
    for (int i = start; i <= 9; i++) {
        // 剪枝：如果当前和已经超出 n，就不用再往下递归了
        if (currentSum + i > n) break;
        
        currentCombination[currentLength] = i;
        findCombinations(k, n, i + 1, currentSum + i, currentLength + 1, currentCombination, result, returnSize, returnColumnSizes);
    }
}

int** combinationSum3(int k, int n, int* returnSize, int** returnColumnSizes) {
    // 结果存储
    int** result = (int**)malloc(sizeof(int*) * 100); // 最大可能有 100 个组合
    *returnColumnSizes = (int*)malloc(sizeof(int) * 100);
    
    // 当前组合存储
    int* currentCombination = (int*)malloc(sizeof(int) * k);
    
    // 递归回溯搜索
    *returnSize = 0;
    findCombinations(k, n, 1, 0, 0, currentCombination, result, returnSize, *returnColumnSizes);
    
    free(currentCombination);
    return result;
}

// 测试函数
int main() {
    int k = 3, n = 7;
    int returnSize = 0;
    int* returnColumnSizes = NULL;
    int** result = combinationSum3(k, n, &returnSize, &returnColumnSizes);
    
    // 输出结果
    for (int i = 0; i < returnSize; i++) {
        printf("[");
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d", result[i][j]);
            if (j < returnColumnSizes[i] - 1) printf(", ");
        }
        printf("]\n");
    }
    
    // 释放内存
    for (int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);
    
    return 0;
}
```

### C++ 解法

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 回溯函数，查找所有组合
    void findCombinations(int k, int n, int start, int currentSum, int currentLength,
                           vector<int>& currentCombination, vector<vector<int>>& result) {
        // 如果当前组合的长度已达到 k 且和为 n，记录当前组合
        if (currentLength == k) {
            if (currentSum == n) {
                result.push_back(currentCombination);
            }
            return;
        }

        // 选择数字，从 start 开始，保证每个数字只出现一次
        for (int i = start; i <= 9; i++) {
            // 剪枝：如果当前和已经超出 n，就不用再往下递归了
            if (currentSum + i > n) break;
            
            currentCombination.push_back(i);
            findCombinations(k, n, i + 1, currentSum + i, currentLength + 1, currentCombination, result);
            currentCombination.pop_back(); // 回溯
        }
    }

    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> result;
        vector<int> currentCombination;
        findCombinations(k, n, 1, 0, 0, currentCombination, result);
        return result;
    }
};

// 测试函数
int main() {
    Solution solution;
    int k = 3, n = 7;
    vector<vector<int>> result = solution.combinationSum3(k, n);

    // 输出结果
    for (const auto& comb : result) {
        cout << "[";
        for (int i = 0; i < comb.size(); i++) {
            cout << comb[i];
            if (i < comb.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
    }

    return 0;
}
```

### 代码说明
1. **C语言实现**:
   - 使用回溯函数`findCombinations`，递归地选择数字。通过`currentCombination`存储当前选中的数字，`result`存储所有符合条件的组合。
   - 每当组合满足条件时，将其加入`result`。

2. **C++实现**:
   - 与C语言版本相似，但是使用了`vector`代替数组，使得内存管理更加方便。
   - 使用`push_back`和`pop_back`操作来构建和回溯组合，避免了数组大小固定的问题。
   - 采用`class Solution`进行函数封装，符合题目的要求。

### 主函数
- 在C语言中，使用`combinationSum3`函数并返回结果。
- 在C++中，使用`Solution`类中的`combinationSum3`方法获取结果并输出。

