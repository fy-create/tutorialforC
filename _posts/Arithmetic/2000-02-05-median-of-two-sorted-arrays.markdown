---
layout: post
title:  "4. 寻找两个正序数组的中位数"
categories: arithmetic
---

[4. 寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays)

### 题目：寻找两个有序数组的中位数 (Median of Two Sorted Arrays)

#### 题目要求：
给定两个大小为 m 和 n 的有序数组 `nums1` 和 `nums2`，请你找出这两个有序数组的中位数。

要求算法的时间复杂度为 O(log(min(m, n)))。

#### 示例：
**示例 1:**

输入:
```
nums1 = [1, 3]
nums2 = [2]
```

输出:
```
2.0
```

**示例 2:**

输入:
```
nums1 = [1, 2]
nums2 = [3, 4]
```

输出:
```
2.5
```

**示例 3:**

输入:
```
nums1 = [0, 0]
nums2 = [0, 0]
```

输出:
```
0.0
```

#### 提示：
1. nums1.length == m
2. nums2.length == n
3. 0 <= m <= 1000
4. 0 <= n <= 1000
5. 1 <= m + n <= 2000
6. nums1 和 nums2 均为有序数组

---

### 解题思路：

本题要求在两个已排序的数组中找到中位数，并且时间复杂度要求为 O(log(min(m, n)))。考虑到这种时间复杂度的要求，通常的方法是通过 **二分查找** 来进行优化。

#### 思路：
1. **中位数的定义**：如果合并两个数组得到的数组的长度是奇数，那么中位数就是中间那个数；如果是偶数，那么中位数是中间两个数的平均值。

2. **合并两个有序数组的思想**：可以通过合并两个数组来计算中位数，但是这种方法的时间复杂度是 O(m + n)，不符合题目要求的 O(log(min(m, n)))。因此，我们需要采用更高效的方法。

3. **二分查找**：我们可以通过二分查找在两个数组中找到一个合适的分割点，使得左边的所有元素都比右边的所有元素小。分割点的选择确保了左右两边的元素个数相等（或左右两边元素个数差为 1）。

4. **如何进行分割**：通过在较小的数组上进行二分查找来决定分割点。对于每个分割点，我们根据其在两个数组中的位置，找到另一个数组中对应的分割点。通过这种方式，可以实现 O(log(min(m, n))) 的时间复杂度。

5. **边界条件**：需要处理数组为空的情况，也需要考虑数组长度为奇数或偶数的情况。

---

### C 语言解法：

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数：计算较小的数
double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    // 保证 nums1 是较小的数组
    if (nums1Size > nums2Size) {
        int* temp = nums1;
        nums1 = nums2;
        nums2 = temp;
        int tempSize = nums1Size;
        nums1Size = nums2Size;
        nums2Size = tempSize;
    }

    // 二分查找的起始和结束位置
    int left = 0, right = nums1Size;
    while (left <= right) {
        // i 是 nums1 数组的分割位置
        int i = left + (right - left) / 2;
        // j 是 nums2 数组的分割位置
        int j = (nums1Size + nums2Size + 1) / 2 - i;

        // 边界值：nums1[i-1], nums1[i], nums2[j-1], nums2[j]
        int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
        int minRight1 = (i == nums1Size) ? INT_MAX : nums1[i];
        int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
        int minRight2 = (j == nums2Size) ? INT_MAX : nums2[j];

        // 检查是否找到了正确的分割点
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // 如果总长度是奇数，返回左半部分的最大值
            if ((nums1Size + nums2Size) % 2 == 1) {
                return fmax(maxLeft1, maxLeft2);
            }
            // 如果总长度是偶数，返回中间两个数的平均值
            return (fmax(maxLeft1, maxLeft2) + fmin(minRight1, minRight2)) / 2.0;
        }
        // 如果 nums1[i-1] > nums2[j]，需要移动 i
        else if (maxLeft1 > minRight2) {
            right = i - 1;
        }
        else {
            left = i + 1;
        }
    }

    // 如果没有找到结果，返回 0
    return 0.0;
}

int main() {
    int nums1[] = {1, 3};
    int nums2[] = {2};
    int nums1Size = 2;
    int nums2Size = 1;
    double median = findMedianSortedArrays(nums1, nums1Size, nums2, nums2Size);
    printf("Median: %.2f\n", median);

    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        // 保证 nums1 是较小的数组
        if (nums1.size() > nums2.size()) {
            swap(nums1, nums2);
        }

        int m = nums1.size(), n = nums2.size();
        int left = 0, right = m;

        while (left <= right) {
            // i 是 nums1 数组的分割位置
            int i = left + (right - left) / 2;
            // j 是 nums2 数组的分割位置
            int j = (m + n + 1) / 2 - i;

            // 边界值：nums1[i-1], nums1[i], nums2[j-1], nums2[j]
            int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
            int minRight1 = (i == m) ? INT_MAX : nums1[i];
            int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
            int minRight2 = (j == n) ? INT_MAX : nums2[j];

            // 检查是否找到了正确的分割点
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                // 如果总长度是奇数，返回左半部分的最大值
                if ((m + n) % 2 == 1) {
                    return max(maxLeft1, maxLeft2);
                }
                // 如果总长度是偶数，返回中间两个数的平均值
                return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
            }
            // 如果 nums1[i-1] > nums2[j]，需要移动 i
            else if (maxLeft1 > minRight2) {
                right = i - 1;
            }
            else {
                left = i + 1;
            }
        }

        // 如果没有找到结果，返回 0
        return 0.0;
    }
};

int main() {
    Solution solution;
    vector<int> nums1 = {1, 3};
    vector<int> nums2 = {2};
    double median = solution.findMedianSortedArrays(nums1, nums2);
    cout << "Median: " << median << endl;

    return 0;
}
```

### 代码解释：
1. **C 语言实现**：
   - 使用 `findMedianSortedArrays` 函数，首先确保 `nums1` 是较小的数组，然后在较小的数组上进行二分查找。通过不断调整分割点，直到找到符合条件的中位数。
   
2. **C++ 实现**：
   - 使用 `Solution` 类来封装函数 `findMedianSortedArrays`，并通过 `vector<int>` 来表示数组。
   - 采用与 C 语言相同的思路进行二分查找。

#### 核心算法：
- 使用二分查找在较小的数组中查找合适的分割点，使得左右两边的元素个数相等，确保找到合适的中位数。