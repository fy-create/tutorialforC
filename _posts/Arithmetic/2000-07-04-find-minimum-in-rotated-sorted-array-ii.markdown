---
layout: post
title:  "154. 寻找旋转排序数组中的最小值 II"
categories: arithmetic
---

[154. 寻找旋转排序数组中的最小值 II](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array-ii)

### 题目描述

已知一个按升序排列的数组在某个未知的点上进行了旋转（例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]`）。请找出其中的最小元素。

数组中可能存在重复元素。

你必须尽可能设计一个时间复杂度为 O(log n) 的算法解决此问题。

---

**示例 1：**

```
输入：nums = [1,3,5]
输出：1
```

**示例 2：**

```
输入：nums = [2,2,2,0,1]
输出：0
```

---

**提示：**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` 中的所有整数是由范围 `[-5000, 5000]` 内的整数组成的
- `nums` 是一个升序排列的数组，在预先未知的某个点上进行了旋转

---

### 解题思路

这是一个经典的二分查找问题，考虑以下情况：

1. **重复元素处理**：
   - 如果 `nums[mid] == nums[right]`，无法确定最小值所在区间，可以安全地将 `right` 左移一位：`right--`。

2. **区间划分**：
   - 如果 `nums[mid] > nums[right]`，说明最小值在右半部分。
   - 如果 `nums[mid] < nums[right]`，说明最小值在左半部分（包括当前 `mid`）。

3. **终止条件**：
   - 当 `left == right` 时，`nums[left]` 即为最小值。

4. **时间复杂度**：
   - 在最坏情况下（所有元素相同），时间复杂度退化为 O(n)。

5. **空间复杂度**：
   - 使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>

// 使用二分查找找到数组的最小值
int findMin(int* nums, int numsSize) {
    int left = 0, right = numsSize - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;

        // 如果中间元素小于右边界，最小值在左半部分
        if (nums[mid] < nums[right]) {
            right = mid;
        } 
        // 如果中间元素大于右边界，最小值在右半部分
        else if (nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // 如果中间元素等于右边界，缩小右边界
        else {
            right--;
        }
    }

    // 返回最小值
    return nums[left];
}

// 测试函数
int main() {
    int nums[] = {2, 2, 2, 0, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    int result = findMin(nums, numsSize);
    printf("最小值是: %d\n", result);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;

        while (left < right) {
            int mid = left + (right - left) / 2;

            // 如果中间元素小于右边界，最小值在左半部分
            if (nums[mid] < nums[right]) {
                right = mid;
            } 
            // 如果中间元素大于右边界，最小值在右半部分
            else if (nums[mid] > nums[right]) {
                left = mid + 1;
            } 
            // 如果中间元素等于右边界，缩小右边界
            else {
                right--;
            }
        }

        // 返回最小值
        return nums[left];
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {2, 2, 2, 0, 1};

    int result = sol.findMin(nums);
    cout << "最小值是: " << result << endl;

    return 0;
}
```

---

### 代码说明

1. **重复元素处理**：
   - 当 `nums[mid] == nums[right]` 时，无法通过二分法进一步缩小区间，直接将 `right` 左移一位。

2. **区间划分**：
   - 使用 `nums[mid]` 和 `nums[right]` 的比较关系，调整左右边界。

3. **时间复杂度**：
   - 在没有重复元素时，时间复杂度为 O(log n)。
   - 在最坏情况下（所有元素相同），时间复杂度退化为 O(n)。

4. **空间复杂度**：
   - 使用常量空间，复杂度为 O(1)。