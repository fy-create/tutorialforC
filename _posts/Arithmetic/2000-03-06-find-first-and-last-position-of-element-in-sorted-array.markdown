---
layout: post
title:  "34. 在排序数组中查找元素的第一个和最后一个位置"
categories: arithmetic
---

[34. 在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array)

## 题目要求

给定一个 **排序数组** `nums` 和一个目标值 `target`，找出 `target` 在 `nums` 中的 **第一个** 和 **最后一个** 位置。如果 `target` 不在数组中，返回 `[-1, -1]`。

### 示例 1:

**输入:**

```plaintext
nums = [5, 7, 7, 8, 8, 10], target = 8
```

**输出:**

```plaintext
[3, 4]
```

**解释:**  
目标值 `8` 出现的第一个位置是索引 `3`，最后一个位置是索引 `4`。

### 示例 2:

**输入:**

```plaintext
nums = [5, 7, 7, 8, 8, 10], target = 6
```

**输出:**

```plaintext
[-1, -1]
```

**解释:**  
目标值 `6` 不在数组中，因此返回 `[-1, -1]`。

### 示例 3:

**输入:**

```plaintext
nums = [], target = 0
```

**输出:**

```plaintext
[-1, -1]
```

**解释:**  
数组为空，返回 `[-1, -1]`。

## 提示:

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` 是一个非递减的排序数组。
- `-10^9 <= target <= 10^9`

## 解题思路

由于给定的数组是排序数组，我们可以利用二分查找的方法来高效地查找目标值 `target` 的第一个和最后一个位置。

### 步骤：

1. **找到第一个位置**：
   - 我们可以使用二分查找来查找 `target`。每次比较时，如果找到 `target`，我们继续向左搜索，直到找到第一个出现 `target` 的位置。

2. **找到最后一个位置**：
   - 同样地，我们可以利用二分查找来找到 `target` 的最后一个位置。如果找到 `target`，我们继续向右搜索，直到找到最后一个出现 `target` 的位置。

3. **边界情况**：
   - 如果数组为空或者 `target` 不存在于数组中，返回 `[-1, -1]`。

### C语言解法

```c
#include <stdio.h>

// 辅助函数：找到目标值的第一个位置
int findFirstPosition(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result = mid;
            right = mid - 1;  // 继续向左查找
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// 辅助函数：找到目标值的最后一个位置
int findLastPosition(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result = mid;
            left = mid + 1;  // 继续向右查找
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return result;
}

// 主函数：返回目标值的第一个和最后一个位置
int* searchRange(int* nums, int numsSize, int target, int* returnSize) {
    static int result[2];  // 用静态数组来返回结果，防止局部变量丢失
    *returnSize = 2;
    
    // 查找第一个位置
    result[0] = findFirstPosition(nums, numsSize, target);
    
    // 查找最后一个位置
    result[1] = findLastPosition(nums, numsSize, target);
    
    return result;
}

int main() {
    int nums[] = {5, 7, 7, 8, 8, 10};
    int target = 8;
    int returnSize;
    
    int* result = searchRange(nums, 6, target, &returnSize);
    printf("[%d, %d]\n", result[0], result[1]);  // 输出 [3, 4]
    
    target = 6;
    result = searchRange(nums, 6, target, &returnSize);
    printf("[%d, %d]\n", result[0], result[1]);  // 输出 [-1, -1]
    
    return 0;
}
```

### C++ 解法

在 C++ 中，我们可以通过使用 `std::vector` 来存储数组并使用 `std::lower_bound` 和 `std::upper_bound` 这两个 STL 函数来实现二分查找。

### C++ 代码实现：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result(2, -1);  // 初始化结果为 [-1, -1]
        
        // 使用 lower_bound 查找第一个位置
        auto first = lower_bound(nums.begin(), nums.end(), target);
        if (first == nums.end() || *first != target) {
            return result;  // 如果没有找到，直接返回 [-1, -1]
        }
        
        // 使用 upper_bound 查找最后一个位置
        auto last = upper_bound(nums.begin(), nums.end(), target);
        
        // 第一个位置是 first 的位置，最后一个位置是 last - 1 的位置
        result[0] = distance(nums.begin(), first);
        result[1] = distance(nums.begin(), last) - 1;
        
        return result;
    }
};

int main() {
    Solution solution;
    
    vector<int> nums = {5, 7, 7, 8, 8, 10};
    int target = 8;
    vector<int> result = solution.searchRange(nums, target);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;  // 输出 [3, 4]
    
    target = 6;
    result = solution.searchRange(nums, target);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;  // 输出 [-1, -1]
    
    return 0;
}
```

### 代码解析

#### C语言代码解析：
- 使用了 `findFirstPosition` 和 `findLastPosition` 两个辅助函数，分别通过二分查找找到目标值的第一个和最后一个位置。
- `searchRange` 函数通过调用这两个辅助函数，返回目标值在数组中的第一个和最后一个位置。
- 如果目标值不存在，则返回 `[-1, -1]`。

#### C++ 代码解析：
- C++ 中利用了 STL 的 `lower_bound` 和 `upper_bound` 来简化二分查找：
  - `lower_bound` 查找目标值第一次出现的位置。
  - `upper_bound` 查找目标值最后一次出现的下一个位置，因此目标值的最后位置是 `upper_bound - 1`。
- 通过 `distance` 函数计算迭代器之间的距离，得到目标值的第一个和最后一个位置。

### 时间复杂度分析：
- **时间复杂度：**
  - `lower_bound` 和 `upper_bound` 都是二分查找，时间复杂度为 O(log n)，其中 `n` 是数组的长度。
  - 整体的时间复杂度为 O(log n)，因为我们只做了两次二分查找。
  
- **空间复杂度：**
  - C语言解法中，我们只用了常数级别的额外空间 O(1)。
  - C++ 中使用了一个 `vector<int>` 来存储结果，空间复杂度为 O(1)。

### 总结：
- 通过二分查找可以高效地查找目标值的第一个和最后一个位置，避免了遍历数组的高时间复杂度。
- 在 C++ 中，利用 STL 函数 `lower_bound` 和 `upper_bound` 简化了二分查找的实现，代码更加简洁和高效。