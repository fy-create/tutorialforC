---
layout: post
title:  "40. 组合总和 II"
categories: arithmetic
---

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii)

### 题目描述

给定一个候选人编号的集合 `candidates` 和一个目标数 `target`，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用 **一次**。

注意：解集不能包含重复的组合。

**示例 1:**

```
输入: candidates = [10,1,2,7,6,1,5], target = 8
输出:
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]
```

**示例 2:**

```
输入: candidates = [2,5,2,1,2], target = 5
输出:
[
  [1,2,2],
  [5]
]
```

**提示:**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

---

### 解题思路

1. **回溯算法**：
   - 由于每个数字只能使用一次，我们需要在回溯时跳过重复的数字，以避免重复组合。
   - 首先对数组进行排序，方便剪枝和去重。
   - 使用递归函数进行回溯搜索，记录当前组合和剩余目标值。
   - 当剩余目标值为 0 时，将当前组合加入结果集。

2. **去重**：
   - 在递归时，如果当前数字与前一个数字相同且前一个数字未被使用，则跳过当前数字，以避免重复组合。

3. **实现步骤**：
   - 对数组进行排序。
   - 使用递归函数进行回溯搜索，记录当前组合和剩余目标值。
   - 当剩余目标值为 0 时，将当前组合加入结果集。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义结果集的最大长度
#define MAX_RESULT_SIZE 150
#define MAX_CANDIDATES_SIZE 100

// 比较函数，用于排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// 回溯函数
void backtrack(int* candidates, int candidatesSize, int target, int start, int* currentCombination, int currentSize, int** result, int* resultSize, int* returnColumnSizes) {
    if (target == 0) {
        // 当前组合的和等于 target，加入结果集
        result[*resultSize] = (int*)malloc(currentSize * sizeof(int));
        for (int i = 0; i < currentSize; i++) {
            result[*resultSize][i] = currentCombination[i];
        }
        returnColumnSizes[*resultSize] = currentSize;
        (*resultSize)++;
        return;
    }

    for (int i = start; i < candidatesSize; i++) {
        if (candidates[i] > target) {
            break;  // 剪枝：如果当前数字大于剩余目标值，停止搜索
        }
        // 去重：如果当前数字与前一个数字相同且前一个数字未被使用，跳过
        if (i > start && candidates[i] == candidates[i - 1]) {
            continue;
        }
        // 将当前数字加入组合
        currentCombination[currentSize] = candidates[i];
        // 递归搜索剩余目标值
        backtrack(candidates, candidatesSize, target - candidates[i], i + 1, currentCombination, currentSize + 1, result, resultSize, returnColumnSizes);
    }
}

int** combinationSum2(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    // 排序数组，方便剪枝和去重
    qsort(candidates, candidatesSize, sizeof(int), compare);

    // 初始化结果集
    int** result = (int**)malloc(MAX_RESULT_SIZE * sizeof(int*));
    *returnColumnSizes = (int*)malloc(MAX_RESULT_SIZE * sizeof(int));
    *returnSize = 0;

    // 当前组合
    int* currentCombination = (int*)malloc(MAX_CANDIDATES_SIZE * sizeof(int));

    // 回溯搜索
    backtrack(candidates, candidatesSize, target, 0, currentCombination, 0, result, returnSize, *returnColumnSizes);

    // 释放当前组合的内存
    free(currentCombination);
    return result;
}

int main() {
    int candidates[] = {10, 1, 2, 7, 6, 1, 5};
    int target = 8;
    int returnSize;
    int* returnColumnSizes;
    int** result = combinationSum2(candidates, 7, target, &returnSize, &returnColumnSizes);

    printf("组合结果:\n");
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\n");
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

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        // 排序数组，方便剪枝和去重
        sort(candidates.begin(), candidates.end());

        vector<vector<int>> result;
        vector<int> currentCombination;
        backtrack(candidates, target, 0, currentCombination, result);
        return result;
    }

private:
    void backtrack(vector<int>& candidates, int target, int start, vector<int>& currentCombination, vector<vector<int>>& result) {
        if (target == 0) {
            // 当前组合的和等于 target，加入结果集
            result.push_back(currentCombination);
            return;
        }

        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] > target) {
                break;  // 剪枝：如果当前数字大于剩余目标值，停止搜索
            }
            // 去重：如果当前数字与前一个数字相同且前一个数字未被使用，跳过
            if (i > start && candidates[i] == candidates[i - 1]) {
                continue;
            }
            // 将当前数字加入组合
            currentCombination.push_back(candidates[i]);
            // 递归搜索剩余目标值
            backtrack(candidates, target - candidates[i], i + 1, currentCombination, result);
            // 回溯：移除当前数字
            currentCombination.pop_back();
        }
    }
};

int main() {
    Solution solution;
    vector<int> candidates = {10, 1, 2, 7, 6, 1, 5};
    int target = 8;
    vector<vector<int>> result = solution.combinationSum2(candidates, target);

    cout << "组合结果:" << endl;
    for (const auto& combination : result) {
        for (int num : combination) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```

---

### 测试用例

#### 输入 1
```
candidates = [10,1,2,7,6,1,5], target = 8
```
#### 输出 1
```
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]
```

#### 输入 2
```
candidates = [2,5,2,1,2], target = 5
```
#### 输出 2
```
[
  [1,2,2],
  [5]
]
```

---

### 复杂度分析

- **时间复杂度**：O(2^n)，其中 n 是数组的长度。最坏情况下需要枚举所有可能的组合。
- **空间复杂度**：O(target)，递归栈的深度最多为 `target`。

---

### 总结

通过回溯算法，我们可以枚举所有可能的组合，并通过剪枝和去重优化搜索过程。排序数组后，可以提前终止无效的搜索路径，并避免重复组合。这种方法能够有效解决组合总和 II 问题。