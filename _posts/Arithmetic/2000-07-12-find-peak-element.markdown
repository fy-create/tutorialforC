---
layout: post
title:  "162. 寻找峰值"
categories: arithmetic
---

[162. 寻找峰值](https://leetcode.cn/problems/find-peak-element)

### 题目描述

**题目：寻找峰值元素**

峰值元素是指它的值大于左右相邻的值。给定一个整数数组 `nums`，编写一个函数 `findPeakElement` 来找到一个峰值元素并返回其索引。

**注意：**

- 数组 `nums` 的大小为 `n`，并且 `1 <= n <= 1000`。
- `nums[i] != nums[i+1]`。
- 可以假设 `nums[-1] = nums[n] = -∞`，即边界元素会有虚拟的 -∞ 作为它们的相邻元素。

### 示例

**示例 1：**
```plaintext
输入: nums = [1, 2, 3, 1]
输出: 2
解释: 3 是峰值元素，索引 2。
```

**示例 2：**
```plaintext
输入: nums = [1, 2, 1, 3, 5, 6, 4]
输出: 1 或 5
解释: 2 和 6 都是峰值元素，返回任意一个的索引即可。
```

### 提示

- `1 <= nums.length <= 1000`
- `-2^31 <= nums[i] <= 2^31 - 1`
- `nums[i] != nums[i + 1]`

---

### 解题思路

#### 思路一：暴力解法
我们可以通过遍历数组来寻找峰值元素。只需遍历 `nums` 数组，对于每个元素 `nums[i]`，检查其左右元素是否满足：
- `nums[i-1] < nums[i] > nums[i+1]`。

这个方法的时间复杂度是 O(n)，其中 n 是数组的长度，空间复杂度是 O(1)。

#### 思路二：二分查找优化
考虑到数组中存在多个峰值，我们可以用一种更高效的算法：**二分查找**。

1. 初始时，将搜索区间设置为整个数组。
2. 中间元素 `nums[mid]` 如果是峰值元素（即 `nums[mid-1] < nums[mid] > nums[mid+1]`），则返回其索引。
3. 如果 `nums[mid] < nums[mid+1]`，则峰值一定在 `mid+1` 右边，更新搜索区间为 `mid+1` 到 `right`。
4. 如果 `nums[mid] < nums[mid-1]`，则峰值一定在 `mid-1` 左边，更新搜索区间为 `left` 到 `mid-1`。

通过二分查找，能够将时间复杂度优化为 O(log n)。

---

### C语言解答

```c
#include <stdio.h>

int findPeakElement(int* nums, int numsSize) {
    int left = 0, right = numsSize - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        // 如果中间元素小于右边的元素，说明峰值一定在右边
        if (nums[mid] < nums[mid + 1]) {
            left = mid + 1;
        } else {
            // 否则峰值在左边或者就是中间元素
            right = mid;
        }
    }
    
    return left; // left == right 时，找到了峰值
}

int main() {
    int nums[] = {1, 2, 3, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    
    int peakIndex = findPeakElement(nums, numsSize);
    printf("Peak index: %d\n", peakIndex);  // 输出 2
    
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            // 如果中间元素小于右边的元素，说明峰值一定在右边
            if (nums[mid] < nums[mid + 1]) {
                left = mid + 1;
            } else {
                // 否则峰值在左边或者就是中间元素
                right = mid;
            }
        }
        
        return left; // left == right 时，找到了峰值
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 2, 3, 1};
    
    int peakIndex = solution.findPeakElement(nums);
    cout << "Peak index: " << peakIndex << endl;  // 输出 2
    
    return 0;
}
```

### 关键点说明

1. **二分查找优化：**
   - 通过比较中间元素与其右边的元素，确定搜索区间。
   - 这种方法的时间复杂度是 O(log n)，比暴力解法的 O(n) 要高效得多。

2. **返回值：**
   - 无论如何，返回的是峰值的索引，因为数组中一定存在一个峰值元素。

3. **边界条件：**
   - 由于 `nums[-1]` 和 `nums[n]` 被视作负无穷，所以可以有效避免越界的问题。

### 总结

通过二分查找，我们可以高效地找到峰值元素的索引。这个解法的时间复杂度是 O(log n)，相较于暴力解法 O(n) 提升显著，尤其在大规模数据的情况下，性能优势更加明显。