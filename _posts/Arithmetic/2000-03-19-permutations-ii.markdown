---
layout: post
title:  "47. 全排列 II"
categories: arithmetic
---

[47. 全排列 II](https://leetcode.cn/problems/permutations-ii)

## Permutations II

**题目描述：**

给定一个可包含重复数字的序列 `nums`，返回所有不重复的全排列。

**示例：**

1. 输入: [1,1,2]
   输出: 
   \[
   [
     [1,1,2],
     [1,2,1],
     [2,1,1]
   ]
   \]

## 解题思路：

1. 回溯算法 + 去重：
   - 使用回溯算法生成所有可能的全排列，同时对重复元素进行去重。
   - 对 `nums` 进行排序，以便于在回溯过程中判断和跳过重复元素。
   - 定义一个辅助函数 `backtrack`，它接受当前排列 `curr`, 剩余可选元素 `remaining`，以及结果数组 `results`。
   - 如果 `remaining` 为空，则将 `curr` 加入结果数组中；否则，对 `remaining` 中的每个元素进行递归调用，在递归之前判断是否跳过重复元素。

## C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数，用于交换两个元素
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 回溯函数
void backtrack(int* nums, int numsSize, int** results, int* returnSize, int* curr, int currSize, int** returnColumnSizes, int* used) {
    if (currSize == numsSize) {
        // 将当前排列加入结果数组
        results[*returnSize] = (int*)malloc(numsSize * sizeof(int));
        for (int i = 0; i < numsSize; i++)
            results[*returnSize][i] = curr[i];
        (*returnColumnSizes)[*returnSize] = numsSize;
        (*returnSize)++;
        return;
    }
    for (int i = 0; i < numsSize; i++) {
        // 跳过已使用的元素和重复元素
        if (used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])) continue;
        used[i] = 1;
        curr[currSize] = nums[i];
        // 递归生成排列
        backtrack(nums, numsSize, results, returnSize, curr, currSize + 1, returnColumnSizes, used);
        used[i] = 0;
    }
}

// 主函数
int** permuteUnique(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int** results = (int**)malloc(1000 * sizeof(int*));
    int* curr = (int*)malloc(numsSize * sizeof(int));
    int* used = (int*)calloc(numsSize, sizeof(int));
    *returnSize = 0;
    *returnColumnSizes = (int*)malloc(1000 * sizeof(int));
    // 对nums进行排序
    qsort(nums, numsSize, sizeof(int), (int(*)(const void*, const void*))strcmp);
    backtrack(nums, numsSize, results, returnSize, curr, 0, returnColumnSizes, used);
    free(curr);
    free(used);
    return results;
}

int main() {
    int nums[] = {1, 1, 2};
    int returnSize;
    int* returnColumnSizes;
    int** results = permuteUnique(nums, 3, &returnSize, &returnColumnSizes);
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d ", results[i][j]);
        }
        printf("\n");
        free(results[i]);
    }
    free(results);
    free(returnColumnSizes);
    return 0;
}
```

**代码解析：**

1. 使用回溯算法生成所有可能的全排列。
2. `swap` 函数用于交换两个元素。
3. `backtrack` 函数递归生成当前排列，并将完整排列加入结果数组，同时更新 `returnColumnSizes`。
4. 对 `nums` 进行排序，以便于在回溯过程中跳过重复元素。
5. 主函数 `permuteUnique` 初始化结果数组和当前排列数组，并调用 `backtrack` 函数生成全排列。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<vector<int>> results;
        vector<int> curr;
        vector<bool> used(nums.size(), false);
        sort(nums.begin(), nums.end()); // 对nums进行排序
        backtrack(nums, curr, results, used);
        return results;
    }

private:
    void backtrack(vector<int>& nums, vector<int>& curr, vector<vector<int>>& results, vector<bool>& used) {
        if (curr.size() == nums.size()) {
            results.push_back(curr); // 将当前排列加入结果数组
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (used[i] || (i > 0 && nums[i] == nums[i-1] && !used[i-1])) continue; // 跳过已使用的元素和重复元素
            used[i] = true;
            curr.push_back(nums[i]);
            backtrack(nums, curr, results, used); // 递归生成排列
            used[i] = false;
            curr.pop_back();
        }
    }
};

int main() {
    vector<int> nums = {1, 1, 2};
    Solution sol;
    vector<vector<int>> results = sol.permuteUnique(nums);
    for (const auto& permutation : results) {
        for (int num : permutation) {
            cout << num << " ";
        }
        cout << endl;
    }
    return 0;
}
```

**代码解析：**

1. 使用回溯算法生成所有可能的全排列。
2. 对 `nums` 进行排序，以便于在回溯过程中跳过重复元素。
3. `permuteUnique` 函数初始化结果数组和当前排列数组，并调用 `backtrack` 函数生成全排列。
4. `backtrack` 函数递归生成当前排列，并将完整排列加入结果数组。如果当前排列已经包含当前数字，则跳过。
5. 主函数 `main` 中初始化输入数组，并调用 `permuteUnique` 函数生成全排列。最终打印结果。