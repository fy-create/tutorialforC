---
layout: post
title:  "215. 数组中的第K个最大元素"
categories: arithmetic
---

[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array)

输入: nums = [3,2,3,1,2,4,5,5,6], k = 4
输出: 4
### 题目描述

#### 在数组中找到第 k 个最大的元素
在一个未排序的数组中，找到第 k 个最大的元素。请注意，你需要找的是数组排序后第 k 个最大的元素，而不是第 k 个不同的元素。

---

### 示例:
**输入:**  
```
nums = [3,2,1,5,6,4], k = 2
```
**输出:**  
```
5
```

**输入:**  
```
nums = [3,2,3,1,2,4,5,5,6], k = 4
```
**输出:**  
```
4
```

---

### 提示:
- 1 ≤ k ≤ 数组的长度 ≤ 10⁴
- -10⁴ ≤ 数组中的元素 ≤ 10⁴

---

### 解题思路
1. **问题分析**:
   - 找第 `k` 个最大的元素可以通过对数组进行部分排序解决。
   - 常用的方法包括：
     - 使用快速选择算法（快速排序的变体）。
     - 使用堆排序（维护一个大小为 `k` 的小顶堆）。

2. **快速选择方法**:
   - 基于快速排序的思想，利用分区函数将数组分为大于和小于某个枢轴的两部分。
   - 判断枢轴的位置是否是第 `k` 大的位置，若是则返回，否则递归处理左或右部分。

3. **堆排序方法**:
   - 使用一个大小为 `k` 的小顶堆。
   - 遍历数组时，若元素大于堆顶元素，则替换堆顶并调整堆。
   - 遍历结束后，堆顶即为第 `k` 大元素。

---

### C 语言解答
```c
#include <stdio.h>
#include <stdlib.h>

// 比较函数，用于qsort排序
int compare(const void *a, const void *b) {
    return (*(int *)b - *(int *)a); // 降序排序
}

// 找到第k个最大的元素
int findKthLargest(int* nums, int numsSize, int k) {
    // 使用快速排序对数组进行排序
    qsort(nums, numsSize, sizeof(int), compare);
    // 返回第k个最大的元素
    return nums[k - 1];
}

int main() {
    int nums[] = {3, 2, 1, 5, 6, 4};
    int k = 2;
    int size = sizeof(nums) / sizeof(nums[0]);
    printf("第 %d 个最大的元素是: %d\n", k, findKthLargest(nums, size, k));
    return 0;
}
```

---

### C++ 解答
```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 使用优先队列实现，时间复杂度 O(n log k)
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap; // 小顶堆

        // 遍历数组
        for (int num : nums) {
            minHeap.push(num); // 将当前元素加入堆
            if (minHeap.size() > k) { // 如果堆的大小超过k
                minHeap.pop(); // 弹出堆顶最小的元素
            }
        }
        return minHeap.top(); // 堆顶即第k大的元素
    }
};

int main() {
    vector<int> nums = {3, 2, 1, 5, 6, 4};
    int k = 2;
    Solution solution;
    cout << "第 " << k << " 个最大的元素是: " << solution.findKthLargest(nums, k) << endl;
    return 0;
}
```

### 代码说明:
1. **C 语言实现**:
   - 使用 `qsort` 函数进行降序排序。
   - 排序后直接返回第 `k-1` 个元素。
   - 时间复杂度为 \(O(n \log n)\)。

2. **C++ 实现**:
   - 使用 STL 的优先队列（小顶堆）。
   - 维护堆的大小为 `k`，遍历数组时动态调整堆内容。
   - 遍历完成后堆顶即为第 `k` 大的元素。
   - 时间复杂度为 \(O(n \log k)\)，空间复杂度为 \(O(k)\)。