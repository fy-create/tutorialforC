---
layout: post
title:  "35. 搜索插入位置"
categories: arithmetic
---

[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position)

### 题目描述：
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用 O(log n) 的时间复杂度实现。

**示例：**

**输入：** nums = [1,3,5,6], target = 5

**输出：** 2

**输入：** nums = [1,3,5,6], target = 2

**输出：** 1

**输入：** nums = [1,3,5,6], target = 7

**输出：** 4

**输入：** nums = [1,3,5,6], target = 0

**输出：** 0

### 解题思路：

1. **二分查找法**：
   - 初始化左右指针 `left` 和 `right`，分别指向数组的起始和末尾。
   - 计算中间索引 `mid`。
   - 比较 `nums[mid]` 和 `target`：
     - 如果 `nums[mid] == target`，返回 `mid`。
     - 如果 `nums[mid] < target`，将 `left` 移动到 `mid + 1`。
     - 如果 `nums[mid] > target`，将 `right` 移动到 `mid - 1`。
   - 当 `left > right` 时，返回 `left`，即目标值应插入的位置。

2. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(log n)，二分查找的复杂度。
   - 空间复杂度：O(1)，只使用了指针变量。

```c
#include <stdio.h>

int searchInsert(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2; // 防止溢出
        if (nums[mid] == target) {
            return mid; // 找到目标值
        } else if (nums[mid] < target) {
            left = mid + 1; // 移动左指针
        } else {
            right = mid - 1; // 移动右指针
        }
    }

    return left; // 返回插入位置
}

int main() {
    int nums[] = {1, 3, 5, 6};
    int size = sizeof(nums) / sizeof(nums[0]);

    int target = 5;
    int position = searchInsert(nums, size, target);
    printf("目标值插入位置: %d\n", position);

    target = 2;
    position = searchInsert(nums, size, target);
    printf("目标值插入位置: %d\n", position);

    target = 7;
    position = searchInsert(nums, size, target);
    printf("目标值插入位置: %d\n", position);

    target = 0;
    position = searchInsert(nums, size, target);
    printf("目标值插入位置: %d\n", position);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2; // 防止溢出
            if (nums[mid] == target) {
                return mid; // 找到目标值
            } else if (nums[mid] < target) {
                left = mid + 1; // 移动左指针
            } else {
                right = mid - 1; // 移动右指针
            }
        }

        return left; // 返回插入位置
    }
};

int main() {
    vector<int> nums = {1, 3, 5, 6};

    Solution sol;
    cout << "目标值插入位置: " << sol.searchInsert(nums, 5) << endl;
    cout << "目标值插入位置: " << sol.searchInsert(nums, 2) << endl;
    cout << "目标值插入位置: " << sol.searchInsert(nums, 7) << endl;
    cout << "目标值插入位置: " << sol.searchInsert(nums, 0) << endl;

    return 0;
}
```
