---
layout: post
title:  "153. 寻找旋转排序数组中的最小值"
categories: arithmetic
---

[153. 寻找旋转排序数组中的最小值](https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array)

### 题目描述

已知一个按升序排列的数组在某个未知的点上进行了旋转（例如，数组 `[0,1,2,4,5,6,7]` 可能变为 `[4,5,6,7,0,1,2]`）。请找出其中的最小元素。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

---

**示例 1：**

```
输入：nums = [3,4,5,1,2]
输出：1
解释：旋转后的数组最小值为 1。
```

**示例 2：**

```
输入：nums = [4,5,6,7,0,1,2]
输出：0
解释：旋转后的数组最小值为 0。
```

**示例 3：**

```
输入：nums = [11,13,15,17]
输出：11
解释：数组未旋转，最小值为第一个元素。
```

---

**提示：**

- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` 中的所有整数互不相同
- `nums` 是一个升序排序的数组，在预先未知的某个点上进行了旋转

---

### 解题思路

使用二分查找法：

1. **特性分析**：
   - 如果数组没有旋转，直接返回第一个元素。
   - 如果数组进行了旋转，最小值出现在中间某个位置。
   - 通过比较中间元素和右边界，可以判断最小值的位置：
     - 如果 `mid` 的值大于 `right` 的值，说明最小值在右半部分。
     - 如果 `mid` 的值小于或等于 `right` 的值，说明最小值在左半部分（包括当前 `mid`）。

2. **二分查找流程**：
   - 初始定义左右边界 `left` 和 `right`。
   - 计算中间位置 `mid`，根据上述规则调整左右边界。
   - 终止条件为 `left == right`，此时的元素为最小值。

3. **时间复杂度**：
   - 每次查找范围减半，总共进行 `log n` 次查找，时间复杂度为 O(log n)。

4. **空间复杂度**：
   - 使用常量额外空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>

// 使用二分查找找到数组的最小值
int findMin(int* nums, int numsSize) {
    int left = 0, right = numsSize - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;

        // 如果中间元素大于右边界，最小值在右半部分
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // 如果中间元素小于或等于右边界，最小值在左半部分
        else {
            right = mid;
        }
    }

    // 返回最小值
    return nums[left];
}

// 测试函数
int main() {
    int nums[] = {4, 5, 6, 7, 0, 1, 2};
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

            // 如果中间元素大于右边界，最小值在右半部分
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } 
            // 如果中间元素小于或等于右边界，最小值在左半部分
            else {
                right = mid;
            }
        }

        // 返回最小值
        return nums[left];
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};

    int result = sol.findMin(nums);
    cout << "最小值是: " << result << endl;

    return 0;
}
```

---

### 代码说明

1. **二分查找流程**：
   - 根据 `nums[mid]` 和 `nums[right]` 的比较关系调整 `left` 和 `right`，逐步缩小查找范围。

2. **时间复杂度**：
   - 每次查找范围减半，总共进行 `log n` 次查找，时间复杂度为 O(log n)。

3. **空间复杂度**：
   - 不使用额外空间，空间复杂度为 O(1)。