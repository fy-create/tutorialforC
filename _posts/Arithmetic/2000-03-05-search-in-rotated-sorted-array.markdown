---
layout: post
title:  "33. 搜索旋转排序数组"
categories: arithmetic
---

[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array)

### 题目描述

整数数组 `nums` 按升序排列，数组中的值 **互不相同**。

在传递给函数之前，`nums` 在预先未知的某个下标 `k`（`0 <= k < nums.length`）上进行了旋转，使数组变为 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`（下标从 0 开始计数）。例如，`[0,1,2,4,5,6,7]` 在下标 3 处经旋转后可能变为 `[4,5,6,7,0,1,2]`。

给你 **旋转后** 的数组 `nums` 和一个整数 `target`，如果 `nums` 中存在这个目标值 `target`，则返回它的下标，否则返回 `-1`。

你必须设计一个时间复杂度为 `O(log n)` 的算法解决此问题。

**示例 1:**

```
输入: nums = [4,5,6,7,0,1,2], target = 0
输出: 4
```

**示例 2:**

```
输入: nums = [4,5,6,7,0,1,2], target = 3
输出: -1
```

**示例 3:**

```
输入: nums = [1], target = 0
输出: -1
```

**提示:**

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 中的每个值都 **独一无二**
- `nums` 肯定会在某个点上旋转
- `-10^4 <= target <= 10^4`

---

### 解题思路

1. **二分查找**：
   - 旋转后的数组可以分为两个有序部分，前半部分和后半部分。
   - 通过二分查找，我们可以确定 `mid` 的位置是在前半部分还是后半部分。
   - 如果 `nums[mid]` 等于 `target`，直接返回 `mid`。
   - 如果 `nums[left] <= nums[mid]`，说明 `mid` 在前半部分：
     - 如果 `target` 在 `nums[left]` 和 `nums[mid]` 之间，则在左半部分继续查找。
     - 否则，在右半部分继续查找。
   - 如果 `nums[mid] <= nums[right]`，说明 `mid` 在后半部分：
     - 如果 `target` 在 `nums[mid]` 和 `nums[right]` 之间，则在右半部分继续查找。
     - 否则，在左半部分继续查找。

2. **时间复杂度**：
   - 由于每次都将搜索范围缩小一半，时间复杂度为 `O(log n)`。

---

### C语言实现

```c
#include <stdio.h>

int search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;  // 找到目标值，返回下标
        }

        // 判断 mid 在前半部分还是后半部分
        if (nums[left] <= nums[mid]) {
            // mid 在前半部分
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;  // 在左半部分继续查找
            } else {
                left = mid + 1;  // 在右半部分继续查找
            }
        } else {
            // mid 在后半部分
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;  // 在右半部分继续查找
            } else {
                right = mid - 1;  // 在左半部分继续查找
            }
        }
    }

    return -1;  // 未找到目标值
}

int main() {
    int nums[] = {4, 5, 6, 7, 0, 1, 2};
    int target = 0;
    int result = search(nums, sizeof(nums) / sizeof(nums[0]), target);
    printf("目标值 %d 的下标是: %d\n", target, result);  // 输出 4
    return 0;
}
```

---

### C++ 实现

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
                return mid;  // 找到目标值，返回下标
            }

            // 判断 mid 在前半部分还是后半部分
            if (nums[left] <= nums[mid]) {
                // mid 在前半部分
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;  // 在左半部分继续查找
                } else {
                    left = mid + 1;  // 在右半部分继续查找
                }
            } else {
                // mid 在后半部分
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;  // 在右半部分继续查找
                } else {
                    right = mid - 1;  // 在左半部分继续查找
                }
            }
        }

        return -1;  // 未找到目标值
    }
};

int main() {
    Solution solution;
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    int target = 0;
    int result = solution.search(nums, target);
    cout << "目标值 " << target << " 的下标是: " << result << endl;  // 输出 4
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
nums = [4,5,6,7,0,1,2], target = 0
```
#### 输出 1
```
4
```

#### 输入 2
```
nums = [4,5,6,7,0,1,2], target = 3
```
#### 输出 2
```
-1
```

#### 输入 3
```
nums = [1], target = 0
```
#### 输出 3
```
-1
```

---

### 复杂度分析

- **时间复杂度**：O(log n)，使用二分查找，每次将搜索范围缩小一半。
- **空间复杂度**：O(1)，只使用了常数级别的额外空间。

---

### 总结

通过二分查找的方法，我们可以高效地在旋转后的有序数组中查找目标值。关键在于判断 `mid` 的位置是在前半部分还是后半部分，并根据目标值的位置调整搜索范围。这种方法的时间复杂度为 `O(log n)`，满足题目要求。