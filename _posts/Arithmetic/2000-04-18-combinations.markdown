---
layout: post
title:  "77. 组合"
categories: arithmetic
---

[77. 组合](https://leetcode.cn/problems/combinations)

### 题目要求：

给定两个整数 `n` 和 `k`，返回从 1 到 `n` 中所有可能的 `k` 个数的组合。

**示例 1**：
```
输入：n = 4, k = 2
输出：
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4]
]
```

**示例 2**：
```
输入：n = 1, k = 1
输出：
[[1]]
```

#### 提示：
- `1 <= n <= 20`
- `1 <= k <= n`
- 输入数据保证结果符合题意

### 解题思路：

该题目要求找出从 `1` 到 `n` 中的 `k` 个数的所有组合，经典的回溯算法（Backtracking）是解决该问题的有效方法。

#### 回溯法的基本思路：
1. **选择当前数字**：从 `1` 到 `n` 的数中选择一个数字，将其加入当前组合。
2. **递归探索**：在选定一个数字后，继续选取后续数字，递归生成更多的组合。
3. **剪枝**：一旦当前组合中的元素个数达到了 `k`，就将其保存到结果中。
4. **回溯**：撤销当前选择，继续尝试其他的组合。

通过回溯法，我们可以确保所有的组合都会被探索到，同时也保证组合的顺序是按照递增的顺序。

### C语言解法：

```c
#include <stdio.h>
#include <stdlib.h>

void backtrack(int* nums, int numsSize, int* temp, int tempSize, int start, int k, int*** result, int* returnSize, int* returnColumnSizes) {
    // 当temp的大小等于k时，说明找到一个符合条件的组合
    if (tempSize == k) {
        (*result)[*returnSize] = (int*)malloc(k * sizeof(int));
        for (int i = 0; i < k; i++) {
            (*result)[*returnSize][i] = temp[i];
        }
        returnColumnSizes[*returnSize] = k;
        (*returnSize)++;
        return;
    }
    
    // 从start位置开始递归，选取后续的元素
    for (int i = start; i < numsSize; i++) {
        temp[tempSize] = nums[i];
        backtrack(nums, numsSize, temp, tempSize + 1, i + 1, k, result, returnSize, returnColumnSizes);
    }
}

int** combine(int n, int k, int* returnSize, int** returnColumnSizes) {
    // 初始化结果数组
    int* nums = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        nums[i] = i + 1;
    }

    // 最大可能组合数
    int maxCombinations = 1;
    for (int i = 1; i <= k; i++) {
        maxCombinations = maxCombinations * (n - i + 1) / i;
    }

    // 结果和每一行的大小
    int** result = (int**)malloc(maxCombinations * sizeof(int*));
    *returnColumnSizes = (int*)malloc(maxCombinations * sizeof(int));
    *returnSize = 0;

    int* temp = (int*)malloc(k * sizeof(int));

    // 调用回溯函数
    backtrack(nums, n, temp, 0, 0, k, &result, returnSize, *returnColumnSizes);

    free(nums);
    free(temp);

    return result;
}

int main() {
    int n = 4, k = 2;
    int returnSize = 0;
    int* returnColumnSizes = NULL;
    
    // 获取组合结果
    int** result = combine(n, k, &returnSize, &returnColumnSizes);
    
    // 打印结果
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

### C++解法：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 回溯函数
    void backtrack(int start, int n, int k, vector<int>& temp, vector<vector<int>>& result) {
        // 如果temp的大小等于k，保存组合
        if (temp.size() == k) {
            result.push_back(temp);
            return;
        }
        
        // 从start开始递归选择后续的元素
        for (int i = start; i <= n; i++) {
            temp.push_back(i);
            backtrack(i + 1, n, k, temp, result); // 选择i后，继续选后续元素
            temp.pop_back(); // 撤销选择，回溯
        }
    }

    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> result;
        vector<int> temp;
        backtrack(1, n, k, temp, result);
        return result;
    }
};

int main() {
    Solution solution;
    int n = 4, k = 2;
    
    // 获取组合结果
    vector<vector<int>> result = solution.combine(n, k);
    
    // 打印结果
    for (const auto& combination : result) {
        cout << "[";
        for (size_t i = 0; i < combination.size(); i++) {
            cout << combination[i];
            if (i < combination.size() - 1) cout << ", ";
        }
        cout << "]" << endl;
    }
    
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **回溯函数 `backtrack`**：
   - `temp` 数组用于存储当前的组合，`tempSize` 表示当前组合的大小，`start` 是当前递归的起始位置。
   - 递归过程中，如果当前组合的大小达到了 `k`，则将其加入结果数组。
   - 递归的过程中，遍历所有可能的数并进行选择，选择后递归进入下一级，回溯时撤销选择。

2. **主函数 `combine`**：
   - 初始化数组 `nums` 存储从 1 到 `n` 的数字。
   - 计算最大可能的组合数来为 `result` 分配内存。
   - 使用回溯函数生成所有组合。

3. **打印和释放内存**：
   - 打印组合结果，并释放动态分配的内存。

#### C++实现：
1. **回溯函数 `backtrack`**：
   - `temp` 用来存储当前的组合。
   - 递归选择后续的数并形成组合，达到 `k` 个数时将其加入结果。
   - 使用 `push_back` 和 `pop_back` 来选择和撤销选择。

2. **主函数 `combine`**：
   - 初始化递归，并返回所有组合。
   - 打印每个组合。

### 时间和空间复杂度：
- **时间复杂度**：O(C(n, k))，其中 C(n, k) 是从 `n` 中选 `k` 的组合数，即 `n! / (k! * (n - k)!)`。
- **空间复杂度**：O(C(n, k))，存储所有组合所需要的空间。

### 示例输出：

```
[1, 2]
[1, 3]
[1, 4]
[2, 3]
[2, 4]
[3, 4]
```