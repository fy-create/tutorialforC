---
layout: post
title:  "283. 移动零"
categories: arithmetic
---

[283. 移动零](https://leetcode.cn/problems/move-zeroes)

### 题目描述

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**注意：**
必须在原地修改数组，不能拷贝额外的数组。

**示例 1：**

```
输入：nums = [0,1,0,3,12]
输出：[1,3,12,0,0]
```

**示例 2：**

```
输入：nums = [0]
输出：[0]
```

**提示：**

- `1 <= nums.length <= 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`

---

### 解题思路

这道题要求在不使用额外数组的情况下，将数组中的所有 `0` 移动到末尾，同时保持非零元素的相对顺序。这需要我们在原地操作数组，尽量减少遍历次数和交换操作。

**关键点：**

1. **双指针法**：
   - 使用两个指针 `lastNonZeroFoundAt` 和 `current`。
   - `lastNonZeroFoundAt` 用于记录非零元素应该放置的位置。
   - `current` 用于遍历数组。

2. **遍历数组**：
   - 当 `current` 指向的元素非零时，将其与 `lastNonZeroFoundAt` 指向的元素交换，然后将 `lastNonZeroFoundAt` 向后移动一位。
   - 如果 `current` 指向的元素为零，则仅移动 `current`。

3. **保持相对顺序**：
   - 通过上述交换操作，非零元素会按照它们在原数组中的顺序依次排列在数组的前部，而零元素则被推到数组的后部。

4. **优化**：
   - 当 `lastNonZeroFoundAt` 和 `current` 指向同一位置时，不需要进行交换操作。
   - 这种方法只需要遍历数组一次，时间复杂度为 `O(n)`，空间复杂度为 `O(1)`。

通过这种方法，我们能够高效地在原地完成零元素的移动，同时保持非零元素的相对顺序。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 函数用于移动数组中的零元素到末尾
void moveZeroes(int* nums, int numsSize){
    // 初始化非零元素的插入位置
    int lastNonZeroFoundAt = 0;
    
    // 遍历数组
    for(int current = 0; current < numsSize; current++) {
        // 如果当前元素非零
        if(nums[current] != 0) {
            // 如果当前索引不等于插入位置，进行交换
            if(current != lastNonZeroFoundAt) {
                // 交换 nums[current] 和 nums[lastNonZeroFoundAt]
                int temp = nums[current];
                nums[current] = nums[lastNonZeroFoundAt];
                nums[lastNonZeroFoundAt] = temp;
            }
            // 插入位置后移
            lastNonZeroFoundAt++;
        }
    }
}

// 辅助函数用于打印数组
void printArray(int* nums, int numsSize) {
    printf("[");
    for(int i = 0; i < numsSize; i++) {
        printf("%d", nums[i]);
        if(i != numsSize -1) printf(", ");
    }
    printf("]\n");
}

// 测试主函数
int main(){
    // 示例 1
    int nums1[] = {0,1,0,3,12};
    int size1 = sizeof(nums1)/sizeof(nums1[0]);
    printf("输入: nums = ");
    printArray(nums1, size1);
    moveZeroes(nums1, size1);
    printf("输出: ");
    printArray(nums1, size1);
    printf("\n");
    
    // 示例 2
    int nums2[] = {0};
    int size2 = sizeof(nums2)/sizeof(nums2[0]);
    printf("输入: nums = ");
    printArray(nums2, size2);
    moveZeroes(nums2, size2);
    printf("输出: ");
    printArray(nums2, size2);
    printf("\n");
    
    // 示例 3
    int nums3[] = {1,0,1};
    int size3 = sizeof(nums3)/sizeof(nums3[0]);
    printf("输入: nums = ");
    printArray(nums3, size3);
    moveZeroes(nums3, size3);
    printf("输出: ");
    printArray(nums3, size3);
    printf("\n");
    
    return 0;
}
```

---

### C++ 解答

```cpp
#include <bits/stdc++.h>
using namespace std;

// 类 Solution 包含移动零的函数
class Solution {
public:
    // 移动零函数
    void moveZeroes(vector<int>& nums) {
        // 初始化非零元素的插入位置
        int lastNonZeroFoundAt = 0;
        
        // 遍历数组
        for(int current = 0; current < nums.size(); current++) {
            // 如果当前元素非零
            if(nums[current] != 0) {
                // 如果当前索引不等于插入位置，进行交换
                if(current != lastNonZeroFoundAt) {
                    swap(nums[current], nums[lastNonZeroFoundAt]);
                }
                // 插入位置后移
                lastNonZeroFoundAt++;
            }
        }
    }
};

// 辅助函数用于打印数组
void printArray(const vector<int>& nums) {
    cout << "[";
    for(int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if(i != nums.size() -1) cout << ", ";
    }
    cout << "]\n";
}

// 简单的主函数调用示例
int main(){
    Solution sol;
    
    // 示例 1
    vector<int> nums1 = {0,1,0,3,12};
    cout << "输入: nums = ";
    printArray(nums1);
    sol.moveZeroes(nums1);
    cout << "输出: ";
    printArray(nums1);
    cout << "\n";
    
    // 示例 2
    vector<int> nums2 = {0};
    cout << "输入: nums = ";
    printArray(nums2);
    sol.moveZeroes(nums2);
    cout << "输出: ";
    printArray(nums2);
    cout << "\n";
    
    // 示例 3
    vector<int> nums3 = {1,0,1};
    cout << "输入: nums = ";
    printArray(nums3);
    sol.moveZeroes(nums3);
    cout << "输出: ";
    printArray(nums3);
    cout << "\n";
    
    return 0;
}
```