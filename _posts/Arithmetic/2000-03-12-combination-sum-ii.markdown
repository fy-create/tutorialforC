---
layout: post
title:  "40. 组合总和 II"
categories: arithmetic
---

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii)

### 题目描述：
给定一个数组 `candidates` 和一个目标数 `target`，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

`candidates` 中的每个数字在每个组合中只能使用一次。

**注意：**
- 所有数字（包括目标数）都是正整数。
- 解集不能包含重复的组合。

**示例 1：**

**输入：** candidates = [10,1,2,7,6,1,5], target = 8

**输出：**
[[1,1,6],[1,2,5],[1,7],[2,6]]

**示例 2：**

**输入：** candidates = [2,5,2,1,2], target = 5

**输出：**
[[1,2,2],[5]]

### 解题思路：

1. **回溯法**：
   - 回溯是解决组合问题的一种经典方法。
   - 每次递归时，从当前数字开始向后探索，避免重复选择。

2. **排序 + 剪枝**：
   - 先对数组进行排序，便于剪枝。
   - 当当前数字大于目标值时，直接停止搜索。
   - 为了避免重复组合，跳过相同的数字。

3. **递归过程**：
   - 如果当前组合的和等于目标值，将其加入结果集。
   - 如果和超过目标值，停止递归。
   - 对于每个数字，尝试选择并递归。

4. **时间复杂度**：
   - 最坏情况下时间复杂度为 O(2^n)。

5. **空间复杂度**：
   - 递归深度最大为目标值 `target`。

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void backtrack(int* candidates, int candidatesSize, int target, int* current, int currentSize, int** result, int* returnSize, int* returnColumnSizes, int start) {
    if (target == 0) {
        result[*returnSize] = (int*)malloc(currentSize * sizeof(int));
        for (int i = 0; i < currentSize; i++) {
            result[*returnSize][i] = current[i];
        }
        returnColumnSizes[*returnSize] = currentSize;
        (*returnSize)++;
        return;
    }

    for (int i = start; i < candidatesSize; i++) {
        if (i > start && candidates[i] == candidates[i - 1]) continue; // 跳过重复
        if (candidates[i] > target) break; // 剪枝
        current[currentSize] = candidates[i];
        backtrack(candidates, candidatesSize, target - candidates[i], current, currentSize + 1, result, returnSize, returnColumnSizes, i + 1);
    }
}

int** combinationSum2(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    qsort(candidates, candidatesSize, sizeof(int), (int (*)(const void*, const void*))strcmp); // 排序
    int** result = (int**)malloc(500 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(500 * sizeof(int));
    int* current = (int*)malloc(target * sizeof(int));
    *returnSize = 0;

    backtrack(candidates, candidatesSize, target, current, 0, result, returnSize, *returnColumnSizes, 0);

    free(current);
    return result;
}

int main() {
    int candidates[] = {10, 1, 2, 7, 6, 1, 5};
    int target = 8;
    int returnSize = 0;
    int* returnColumnSizes;

    int** result = combinationSum2(candidates, 7, target, &returnSize, &returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\n");
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void backtrack(vector<int>& candidates, int target, vector<int>& current, vector<vector<int>>& result, int start) {
        if (target == 0) {
            result.push_back(current);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (i > start && candidates[i] == candidates[i - 1]) continue; // 跳过重复
            if (candidates[i] > target) break; // 剪枝
            current.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], current, result, i + 1);
            current.pop_back(); // 回溯
        }
    }

    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end()); // 排序
        vector<vector<int>> result;
        vector<int> current;
        backtrack(candidates, target, current, result, 0);
        return result;
    }
};

int main() {
    vector<int> candidates = {10, 1, 2, 7, 6, 1, 5};
    int target = 8;

    Solution sol;
    vector<vector<int>> result = sol.combinationSum2(candidates, target);

    for (const auto& combination : result) {
        for (int num : combination) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```
