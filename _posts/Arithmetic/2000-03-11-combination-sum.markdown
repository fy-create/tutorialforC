---
layout: post
title:  "39. 组合总和"
categories: arithmetic
---

[39. 组合总和](https://leetcode.cn/problems/combination-sum)

### 题目描述

给你一个 **无重复元素** 的整数数组 `candidates` 和一个目标整数 `target`，找出 `candidates` 中可以使数字和为目标数 `target` 的所有 **不同组合**，并以列表形式返回。你可以按 **任意顺序** 返回这些组合。

`candidates` 中的 **同一个** 数字可以 **无限制重复被选取**。如果至少一个所选数字数量不同，则两种组合是不同的。

对于给定的输入，保证和为 `target` 的不同组合数少于 `150` 个。

**示例 1:**

```
输入: candidates = [2,3,6,7], target = 7
输出: [[2,2,3],[7]]
解释:
2 和 3 可以形成一组候选，2 + 2 + 3 = 7。注意，2 可以使用多次。
7 也是一个候选， 7 = 7。
所以共有两种组合。
```

**示例 2:**

```
输入: candidates = [2,3,5], target = 8
输出: [[2,2,2,2],[2,3,3],[3,5]]
解释:
2 + 2 + 2 + 2 = 8
2 + 3 + 3 = 8
3 + 5 = 8
```

**示例 3:**

```
输入: candidates = [2], target = 1
输出: []
```

**提示:**

- `1 <= candidates.length <= 30`
- `1 <= candidates[i] <= 200`
- `candidates` 中的每个元素都 **互不相同**
- `1 <= target <= 500`

---

### 解题思路

1. **回溯算法**：
   - 由于每个数字可以重复使用，我们可以通过回溯的方法枚举所有可能的组合。
   - 从数组的第一个元素开始，尝试将其加入当前组合，并递归地搜索剩余的目标值。
   - 如果当前组合的和等于 `target`，则将其加入结果集。
   - 如果当前组合的和超过 `target`，则停止继续搜索（剪枝）。

2. **去重**：
   - 为了避免重复组合，我们在递归时只从当前元素开始搜索，而不是从头开始搜索。

3. **实现步骤**：
   - 对数组进行排序，方便剪枝。
   - 使用递归函数进行回溯搜索，记录当前组合和剩余目标值。
   - 当剩余目标值为 0 时，将当前组合加入结果集。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义结果集的最大长度
#define MAX_RESULT_SIZE 150
#define MAX_CANDIDATES_SIZE 30

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
        // 将当前数字加入组合
        currentCombination[currentSize] = candidates[i];
        // 递归搜索剩余目标值
        backtrack(candidates, candidatesSize, target - candidates[i], i, currentCombination, currentSize + 1, result, resultSize, returnColumnSizes);
    }
}

int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    // 排序数组，方便剪枝
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
    int candidates[] = {2, 3, 6, 7};
    int target = 7;
    int returnSize;
    int* returnColumnSizes;
    int** result = combinationSum(candidates, 4, target, &returnSize, &returnColumnSizes);

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
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // 排序数组，方便剪枝
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
            // 将当前数字加入组合
            currentCombination.push_back(candidates[i]);
            // 递归搜索剩余目标值
            backtrack(candidates, target - candidates[i], i, currentCombination, result);
            // 回溯：移除当前数字
            currentCombination.pop_back();
        }
    }
};

int main() {
    Solution solution;
    vector<int> candidates = {2, 3, 6, 7};
    int target = 7;
    vector<vector<int>> result = solution.combinationSum(candidates, target);

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
candidates = [2,3,6,7], target = 7
```
#### 输出 1
```
[[2,2,3],[7]]
```

#### 输入 2
```
candidates = [2,3,5], target = 8
```
#### 输出 2
```
[[2,2,2,2],[2,3,3],[3,5]]
```

#### 输入 3
```
candidates = [2], target = 1
```
#### 输出 3
```
[]
```

---

### 复杂度分析

- **时间复杂度**：O(S)，其中 S 是所有可行解的长度之和。最坏情况下是 O(2^n)，因为每个数字都有选或不选两种可能。
- **空间复杂度**：O(target)，递归栈的深度最多为 `target`。

---

### 总结

通过回溯算法，我们可以枚举所有可能的组合，并通过剪枝优化搜索过程。排序数组后，可以提前终止无效的搜索路径，从而提高效率。这种方法能够有效解决组合总和问题。