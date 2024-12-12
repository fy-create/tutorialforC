---
layout: post
title:  "46. 全排列"
categories: arithmetic
---

[46. 全排列](https://leetcode.cn/problems/permutations)

## Permutations

**题目描述：**

给定一个没有重复数字的序列，返回其所有可能的全排列。

**示例：**

1. 输入: [1,2,3]
   输出: 
   \[
   [
     [1,2,3],
     [1,3,2],
     [2,1,3],
     [2,3,1],
     [3,1,2],
     [3,2,1]
   ]
   \]

## 解题思路：

1. 回溯算法：
   - 我们使用回溯算法生成所有可能的全排列。
   - 定义一个辅助函数 `backtrack`，它接受三个参数：当前排列 `curr`, 剩余可选元素 `remaining`，以及结果数组 `results`。
   - 如果 `remaining` 为空，则将 `curr` 加入结果数组中；否则，对 `remaining` 中的每个元素进行递归调用。

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
void backtrack(int* nums, int numsSize, int** results, int* returnSize, int* curr, int currSize) {
    if (currSize == numsSize) {
        results[*returnSize] = (int*)malloc(numsSize * sizeof(int));
        for (int i = 0; i < numsSize; i++)
            results[*returnSize][i] = curr[i];
        (*returnSize)++;
        return;
    }
    for (int i = currSize; i < numsSize; i++) {
        swap(&nums[currSize], &nums[i]);
        curr[currSize] = nums[currSize];
        backtrack(nums, numsSize, results, returnSize, curr, currSize + 1);
        swap(&nums[currSize], &nums[i]);
    }
}

// 主函数
int** permute(int* nums, int numsSize, int* returnSize) {
    int** results = (int**)malloc(1000 * sizeof(int*));
    int* curr = (int*)malloc(numsSize * sizeof(int));
    *returnSize = 0;
    backtrack(nums, numsSize, results, returnSize, curr, 0);
    free(curr);
    return results;
}

int main() {
    int nums[] = {1, 2, 3};
    int returnSize;
    int** results = permute(nums, 3, &returnSize);
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", results[i][j]);
        }
        printf("\n");
        free(results[i]);
    }
    free(results);
    return 0;
}
```

**代码解析：**

1. 使用回溯算法生成所有可能的全排列。
2. `swap` 函数用于交换两个元素。
3. `backtrack` 函数递归生成当前排列，并将完整排列加入结果数组。
4. 主函数 `permute` 初始化结果数组和当前排列数组，并调用 `backtrack` 函数生成全排列。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> results;
        vector<int> curr;
        backtrack(nums, curr, results);
        return results;
    }

private:
    void backtrack(vector<int>& nums, vector<int>& curr, vector<vector<int>>& results) {
        if (curr.size() == nums.size()) {
            results.push_back(curr);
            return;
        }
        for (int i = 0; i < nums.size(); i++) {
            if (find(curr.begin(), curr.end(), nums[i]) != curr.end()) continue;
            curr.push_back(nums[i]);
            backtrack(nums, curr, results);
            curr.pop_back();
        }
    }
};

int main() {
    vector<int> nums = {1, 2, 3};
    Solution sol;
    vector<vector<int>> results = sol.permute(nums);
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
2. `permute` 函数初始化结果数组和当前排列数组，并调用 `backtrack` 函数生成全排列。
3. `backtrack` 函数递归生成当前排列，并将完整排列加入结果数组。如果当前排列已经包含当前数字，则跳过。
4. 主函数 `main` 中初始化输入数组，并调用 `permute` 函数生成全排列。最终打印结果。