---
layout: post
title:  "4. 寻找两个正序数组的中位数"
categories: arithmetic
---

https://leetcode.cn/problems/median-of-two-sorted-arrays/

**题目描述：**

给定两个大小分别为 `m` 和 `n` 的正序（从小到大）数组 `nums1` 和 `nums2`。请你找出并返回这两个正序数组的中位数。

算法的时间复杂度应该为 `O(log (m+n))`。

**示例 1：**

```
输入：nums1 = [1,3], nums2 = [2]
输出：2.00000
解释：合并数组 = [1,2,3] ，中位数 2
```

**示例 2：**

```
输入：nums1 = [1,2], nums2 = [3,4]
输出：2.50000
解释：合并数组 = [1,2,3,4] ，中位数 (2 + 3) / 2 = 2.5
```

**提示：**

- `nums1.length == m`
- `nums2.length == n`
- `0 <= m <= 1000`
- `0 <= n <= 1000`
- `1 <= m + n <= 2000`
- `-10^6 <= nums1[i], nums2[i] <= 10^6`

---

**C 语言解法：**

```c
#include <stdio.h>
#include <stdlib.h>

// 合并两个有序数组
void mergeArrays(int* nums1, int m, int* nums2, int n, int* merged) {
    int i = 0, j = 0, k = 0;
    while (i < m && j < n) {
        if (nums1[i] < nums2[j]) {
            merged[k++] = nums1[i++];
        } else {
            merged[k++] = nums2[j++];
        }
    }
    while (i < m) {
        merged[k++] = nums1[i++];
    }
    while (j < n) {
        merged[k++] = nums2[j++];
    }
}

// 寻找两个有序数组的中位数
double findMedianSortedArrays(int* nums1, int m, int* nums2, int n) {
    int* merged = (int*)malloc((m + n) * sizeof(int));
    mergeArrays(nums1, m, nums2, n, merged);
    int total = m + n;
    double median;
    if (total % 2 == 0) {
        median = (merged[total / 2 - 1] + merged[total / 2]) / 2.0;
    } else {
        median = merged[total / 2];
    }
    free(merged);
    return median;
}

// 主函数用于测试
int main() {
    int nums1[] = {1, 3};
    int nums2[] = {2};
    int m = sizeof(nums1) / sizeof(nums1[0]);
    int n = sizeof(nums2) / sizeof(nums2[0]);
    double median = findMedianSortedArrays(nums1, m, nums2, n);
    printf("中位数是: %.5f\n", median); // 输出: 2.00000
    return 0;
}
```

**C++ 语言解法：**

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 合并两个有序数组
    vector<int> mergeArrays(const vector<int>& nums1, const vector<int>& nums2) {
        vector<int> merged;
        int i = 0, j = 0;
        while (i < nums1.size() && j < nums2.size()) {
            if (nums1[i] < nums2[j]) {
                merged.push_back(nums1[i++]);
            } else {
                merged.push_back(nums2[j++]);
            }
        }
        while (i < nums1.size()) {
            merged.push_back(nums1[i++]);
        }
        while (j < nums2.size()) {
            merged.push_back(nums2[j++]);
        }
        return merged;
    }

    // 寻找两个有序数组的中位数
    double findMedianSortedArrays(const vector<int>& nums1, const vector<int>& nums2) {
        vector<int> merged = mergeArrays(nums1, nums2);
        int total = merged.size();
        if (total % 2 == 0) {
            return (merged[total / 2 - 1] + merged[total / 2]) / 2.0;
        } else {
            return merged[total / 2];
        }
    }
};

// 主函数用于测试
int main() {
    Solution solution;
    vector<int> nums1 = {1, 3};
    vector<int> nums2 = {2};
    double median = solution.findMedianSortedArrays(nums1, nums2);
    cout << "中位数是: " << median << endl; // 输出: 2.00000
    return 0;
}
```

**代码解析：**

1. **合并两个有序数组：**
   - 使用双指针方法遍历两个数组，将较小的元素依次加入到合并后的数组中，直到遍历完其中一个数组。
   - 将剩余未遍历完的数组元素直接加入到合并后的数组中。

2. **寻找中位数：**
   - 计算合并后数组的总长度。
   - 如果总长度为偶数，中位数为中间两个数的平均值。
   - 如果总长度为奇数，中位数为中间的那个数。

**注意事项：**

- 该方法的时间复杂度为 O(m + n)，不满足题目要求的 O(log (m+n))。要达到 O(log (m+n)) 的时间复杂度，需要使用二分查找的方法。

**进阶解法：**

要实现 O(log (m+n)) 的时间复杂度，可以采用二分查找的方法。基本思路是对较短的数组进行二分查找，找到一个分割点，使得左边部分的最大值小于右边部分的最小值，从而确定中位数。

**参考资料：**

- [LeetCode 4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- [Median of Two Sorted Arrays - In-Depth Explanation](https://algo.monster/liteproblems/4)

**视频讲解：**

- [Median of Two Sorted Arrays - Binary Search - Leetcode 4](https://www.youtube.com/watch?v=q6IEA26hvXc)

通过上述方法，可以找到两个有序数组的中位数。 