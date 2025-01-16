---
layout: post
title:  "88. 合并两个有序数组"
categories: arithmetic
---

[88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array)

### 题目描述

给定两个有序整数数组 `nums1` 和 `nums2`，以及两个整数 `m` 和 `n`，表示 `nums1` 和 `nums2` 中的元素数目。请你将 `nums2` 合并到 `nums1` 中，成为一个有序数组。

**说明：**

- 最终，合并后数组不应该由函数返回，而是存储在数组 `nums1` 中。
- 初始化 `nums1` 和 `nums2` 的元素数量分别为 `m` 和 `n`。
- 你可以假设 `nums1` 有足够的空间（空间大小大于或等于 `m + n`）来保存 `nums2` 中的元素。

**示例 1：**

```
输入：
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6], n = 3

输出：[1,2,2,3,5,6]
```

**示例 2：**

```
输入：
nums1 = [1], m = 1
nums2 = [], n = 0

输出：[1]
```

**提示：**

- `nums1.length == m + n`
- `nums2.length == n`
- `1 <= m, n <= 200`
- `1 <= nums1[i], nums2[j] <= 10^9`

### 解题思路

要将两个有序数组 `nums1` 和 `nums2` 合并为一个有序数组，并且要求在 `nums1` 中完成合并操作，可以采用双指针的方法。由于 `nums1` 有足够的空间来容纳 `nums2` 的元素，因此可以从后往前进行合并，这样可以避免覆盖 `nums1` 中尚未比较的元素。

**具体步骤如下：**

1. **初始化指针：**
   - `p1` 指向 `nums1` 中的最后一个有效元素，即 `m - 1`。
   - `p2` 指向 `nums2` 中的最后一个元素，即 `n - 1`。
   - `p` 指向 `nums1` 的最后一个位置，即 `m + n - 1`。

2. **从后往前比较并填充：**
   - 比较 `nums1[p1]` 和 `nums2[p2]` 的大小，将较大的值放入 `nums1[p]`。
   - 将对应的指针 `p1` 或 `p2` 向前移动一位，`p` 也向前移动一位。
   - 重复上述过程，直到其中一个数组的指针越界。

3. **处理剩余元素：**
   - 如果 `nums2` 中还有剩余元素（即 `p2` 未越界），则将其全部复制到 `nums1` 的前面。
   - 如果 `nums1` 中还有剩余元素，不需要处理，因为它们已经在正确的位置。

这种方法的时间复杂度为 `O(m + n)`，空间复杂度为 `O(1)`，因为只需要使用常数级别的额外空间。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 函数原型：将nums2合并到nums1中，结果保存在nums1中
void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n) {
    // 初始化指针，分别指向nums1和nums2的末尾
    int p1 = m - 1;          // nums1的最后一个有效元素
    int p2 = n - 1;          // nums2的最后一个元素
    int p = m + n - 1;       // nums1的最后一个位置

    // 从后往前比较，将较大的元素放到nums1的后面
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        }
        else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    // 如果nums2中还有剩余元素，全部复制到nums1中
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
}

// 辅助函数：打印数组
void printArray(int* nums, int size) {
    printf("[");
    for(int i = 0; i < size; i++) {
        printf("%d", nums[i]);
        if(i < size - 1) printf(",");
    }
    printf("]\n");
}

// 简单的主函数调用示例
int main() {
    // 示例1
    int nums1_1[] = {1,2,3,0,0,0};
    int m1 = 3;
    int nums2_1[] = {2,5,6};
    int n1 = 3;
    merge(nums1_1, sizeof(nums1_1)/sizeof(nums1_1[0]), m1, nums2_1, sizeof(nums2_1)/sizeof(nums2_1[0]), n1);
    printf("合并后的数组1：");
    printArray(nums1_1, m1 + n1); // 输出应为 [1,2,2,3,5,6]

    // 示例2
    int nums1_2[] = {1};
    int m2 = 1;
    int nums2_2[] = {};
    int n2 = 0;
    merge(nums1_2, sizeof(nums1_2)/sizeof(nums1_2[0]), m2, nums2_2, sizeof(nums2_2)/sizeof(nums2_2[0]), n2);
    printf("合并后的数组2：");
    printArray(nums1_2, m2 + n2); // 输出应为 [1]

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 函数原型：将nums2合并到nums1中，结果保存在nums1中
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        // 初始化指针，分别指向nums1和nums2的末尾
        int p1 = m - 1;          // nums1的最后一个有效元素
        int p2 = n - 1;          // nums2的最后一个元素
        int p = m + n - 1;       // nums1的最后一个位置

        // 从后往前比较，将较大的元素放到nums1的后面
        while (p1 >= 0 && p2 >= 0) {
            if (nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            }
            else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }

        // 如果nums2中还有剩余元素，全部复制到nums1中
        while (p2 >= 0) {
            nums1[p] = nums2[p2];
            p2--;
            p--;
        }
    }
};

// 辅助函数：打印数组
void printArray(const vector<int>& nums) {
    cout << "[";
    for(size_t i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if(i < nums.size() - 1) cout << ",";
    }
    cout << "]" << endl;
}

// 简单的主函数调用示例
int main() {
    Solution solution;

    // 示例1
    vector<int> nums1_1 = {1,2,3,0,0,0};
    int m1 = 3;
    vector<int> nums2_1 = {2,5,6};
    int n1 = 3;
    solution.merge(nums1_1, m1, nums2_1, n1);
    cout << "合并后的数组1：";
    printArray(nums1_1); // 输出应为 [1,2,2,3,5,6]

    // 示例2
    vector<int> nums1_2 = {1};
    int m2 = 1;
    vector<int> nums2_2 = {};
    int n2 = 0;
    solution.merge(nums1_2, m2, nums2_2, n2);
    cout << "合并后的数组2：";
    printArray(nums1_2); // 输出应为 [1]

    return 0;
}
```