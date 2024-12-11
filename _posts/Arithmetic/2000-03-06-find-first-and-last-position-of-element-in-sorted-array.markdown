---
layout: post
title:  "34. 在排序数组中查找元素的第一个和最后一个位置"
categories: arithmetic
---

[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array)

### 题目描述：
给你一个按照非递减顺序排列的整数数组 `nums`，和一个目标值 `target`。

请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值，返回 `[-1, -1]`。

你必须设计并实现时间复杂度为 `O(log n)` 的算法解决此问题。

**示例：**

**输入：** nums = [5,7,7,8,8,10], target = 8

**输出：** [3,4]

**输入：** nums = [5,7,7,8,8,10], target = 6

**输出：** [-1,-1]

**输入：** nums = [], target = 0

**输出：** [-1,-1]

### 解题思路：

1. **二分查找法**：
   - **目标：** 在 `O(log n)` 时间复杂度下找到目标值的起始位置和结束位置。
   - **步骤：**
     - 先使用二分查找找到目标值的左边界（第一个出现的位置）。
     - 再使用二分查找找到目标值的右边界（最后一个出现的位置）。

2. **具体实现**：
   - 定义一个函数 `findBoundary`，接收参数 `left` 表示是否寻找左边界。
   - 对数组执行二分查找，根据 `left` 参数调整条件。

3. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(log n)。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>
#include <stdlib.h>

void findBoundary(int* nums, int numsSize, int target, int* boundary, int left) {
    int low = 0, high = numsSize - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] > target || (left && nums[mid] == target)) {
            high = mid - 1; // 缩小右边界
        } else {
            low = mid + 1; // 缩小左边界
        }
    }
    *boundary = left ? low : high;
}

int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int)); // 动态分配结果数组
    *returnSize = 2; // 设置返回数组大小
    result[0] = -1; // 初始化结果
    result[1] = -1;

    if (numsSize == 0) return result; // 空数组直接返回

    findBoundary(nums, numsSize, target, &result[0], 1); // 找左边界
    if (result[0] >= numsSize || nums[result[0]] != target) { // 如果左边界无效
        result[0] = -1;
        return result;
    }

    findBoundary(nums, numsSize, target, &result[1], 0); // 找右边界
    return result;
}

int main() {
    int nums[] = {5, 7, 7, 8, 8, 10};
    int target = 8;
    int returnSize;

    int* result = searchRange(nums, 6, target, &returnSize);

    printf("结果: [%d, %d]\n", result[0], result[1]);

    free(result); // 释放动态分配的内存
    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result = {-1, -1}; // 初始化结果

        if (nums.empty()) return result;

        result[0] = findBoundary(nums, target, true); // 找左边界
        if (result[0] == -1) return result; // 如果左边界没找到，直接返回

        result[1] = findBoundary(nums, target, false); // 找右边界
        return result;
    }

private:
    int findBoundary(vector<int>& nums, int target, bool left) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > target || (left && nums[mid] == target)) {
                high = mid - 1; // 缩小右边界
            } else {
                low = mid + 1; // 缩小左边界
            }
        }
        int index = left ? low : high;
        if (index < 0 || index >= nums.size() || nums[index] != target) return -1;
        return index;
    }
};

int main() {
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    int target = 8;

    Solution sol;
    vector<int> result = sol.searchRange(nums, target);

    cout << "结果: [" << result[0] << ", " << result[1] << "]" << endl;

    return 0;
}
```
