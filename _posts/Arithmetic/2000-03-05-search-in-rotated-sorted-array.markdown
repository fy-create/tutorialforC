---
layout: post
title:  "33. 搜索旋转排序数组"
categories: arithmetic
---

[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array)

### 题目描述：
整数数组 `nums` 按升序排列，数组中的值 **互不相同**。

在预先未知的某个点上，数组在此点进行了 **旋转**，例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]` 。

请你在数组中搜索目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 `-1` 。

**示例：**

**输入：** nums = [4,5,6,7,0,1,2], target = 0

**输出：** 4

**输入：** nums = [4,5,6,7,0,1,2], target = 3

**输出：** -1

**输入：** nums = [1], target = 0

**输出：** -1

### 解题思路：

1. **二分查找**：
   - 数组被旋转后依然可以被分为两部分，其中至少一部分是有序的。
   - 通过中间值判断目标值是否在有序部分，如果是，则调整二分查找范围至有序部分，否则调整至无序部分。

2. **算法步骤**：
   - 初始化左右指针 `left` 和 `right`。
   - 循环至 `left <= right`。
     - 计算中间位置 `mid`。
     - 判断目标值是否等于 `nums[mid]`，是则返回 `mid`。
     - 判断哪部分有序：
       - 如果左半部分有序且目标值在左半部分范围内，调整 `right`。
       - 否则调整 `left`。
       - 如果右半部分有序且目标值在右半部分范围内，调整 `left`。
       - 否则调整 `right`。
   - 如果未找到目标值，返回 `-1`。

3. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(log n)，二分查找。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid; // 找到目标值
        }

        // 判断哪部分有序
        if (nums[left] <= nums[mid]) { // 左半部分有序
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1; // 目标值在左半部分
            } else {
                left = mid + 1; // 目标值在右半部分
            }
        } else { // 右半部分有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1; // 目标值在右半部分
            } else {
                right = mid - 1; // 目标值在左半部分
            }
        }
    }

    return -1; // 未找到目标值
}

int main() {
    int nums[] = {4, 5, 6, 7, 0, 1, 2};
    int target = 0;

    int result = search(nums, sizeof(nums) / sizeof(nums[0]), target);
    printf("结果: %d\n", result);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid; // 找到目标值
            }

            // 判断哪部分有序
            if (nums[left] <= nums[mid]) { // 左半部分有序
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1; // 目标值在左半部分
                } else {
                    left = mid + 1; // 目标值在右半部分
                }
            } else { // 右半部分有序
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1; // 目标值在右半部分
                } else {
                    right = mid - 1; // 目标值在左半部分
                }
            }
        }

        return -1; // 未找到目标值
    }
};

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    int target = 0;

    Solution sol;
    int result = sol.search(nums, target);
    cout << "结果: " << result << endl;

    return 0;
}
```
