---
layout: post
title:  "26. 删除有序数组中的重复项"
categories: arithmetic
---

[26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array)

### 题目描述：
给定一个排序数组，原地删除重复出现的元素，使每个元素只出现一次，返回删除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组，并在使用 O(1) 额外空间的条件下完成。

**示例：**

**输入：** nums = [1,1,2]

**输出：** 2, nums = [1,2]

**输入：** nums = [0,0,1,1,1,2,2,3,3,4]

**输出：** 5, nums = [0,1,2,3,4]

### 解题思路：

1. **双指针法**：
   - 一个指针 `i` 表示慢指针，指向存放结果的位置。
   - 另一个指针 `j` 表示快指针，用于遍历整个数组。

2. **比较数组元素**：
   - 如果 `nums[i]` 与 `nums[j]` 不同，说明找到新的元素，将其存储在 `nums[i+1]`，然后移动慢指针。
   - 如果相同，则跳过。

3. **返回结果**：
   - 最终慢指针的索引加 1 即为新数组的长度。

4. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(n)，n 为数组长度。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>

int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0; // 空数组处理

    int i = 0; // 慢指针
    for (int j = 1; j < numsSize; j++) { // 快指针
        if (nums[i] != nums[j]) { // 发现新元素
            i++;
            nums[i] = nums[j]; // 更新结果数组
        }
    }
    return i + 1; // 返回新数组长度
}

int main() {
    int nums[] = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    int size = sizeof(nums) / sizeof(nums[0]);

    int newLength = removeDuplicates(nums, size);
    printf("新数组长度: %d\n", newLength);
    printf("新数组: ");
    for (int i = 0; i < newLength; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0; // 空数组处理

        int i = 0; // 慢指针
        for (int j = 1; j < nums.size(); j++) { // 快指针
            if (nums[i] != nums[j]) { // 发现新元素
                i++;
                nums[i] = nums[j]; // 更新结果数组
            }
        }
        return i + 1; // 返回新数组长度
    }
};

int main() {
    vector<int> nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};

    Solution sol;
    int newLength = sol.removeDuplicates(nums);

    cout << "新数组长度: " << newLength << endl;
    cout << "新数组: ";
    for (int i = 0; i < newLength; i++) {
        cout << nums[i] << " ";
    }
    cout << endl;

    return 0;
}
```