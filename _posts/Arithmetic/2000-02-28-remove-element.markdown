---
layout: post
title:  "27. 移除元素"
categories: arithmetic
---

[27. 移除元素](https://leetcode.cn/problems/remove-element)

### 题目描述：
给你一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

**示例：**

**输入：** nums = [3,2,2,3], val = 3

**输出：** 2, nums = [2,2]

**输入：** nums = [0,1,2,2,3,0,4,2], val = 2

**输出：** 5, nums = [0,1,4,0,3]

### 解题思路：

1. **双指针法**：
   - 使用一个指针 `i` 表示存放有效元素的位置。
   - 遍历数组，当遇到不等于 `val` 的元素时，将其赋值到 `nums[i]`，然后移动指针。

2. **优化操作**：
   - 如果不关心数组中剩余元素的顺序，可以从后向前覆盖。
   - 遍历时遇到 `val`，将其与数组最后一个元素交换，然后缩短数组长度。

3. **返回结果**：
   - 最终返回有效元素的个数（`i`）。

4. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(n)，其中 n 是数组长度。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>

int removeElement(int* nums, int numsSize, int val) {
    int i = 0; // 慢指针，指向存放有效元素的位置
    for (int j = 0; j < numsSize; j++) { // 快指针，遍历数组
        if (nums[j] != val) { // 如果当前元素不等于 val
            nums[i] = nums[j]; // 赋值到有效位置
            i++;
        }
    }
    return i; // 返回新数组长度
}

int main() {
    int nums[] = {0, 1, 2, 2, 3, 0, 4, 2};
    int size = sizeof(nums) / sizeof(nums[0]);

    int newLength = removeElement(nums, size, 2);
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
    int removeElement(vector<int>& nums, int val) {
        int i = 0; // 慢指针，指向存放有效元素的位置
        for (int j = 0; j < nums.size(); j++) { // 快指针，遍历数组
            if (nums[j] != val) { // 如果当前元素不等于 val
                nums[i] = nums[j]; // 赋值到有效位置
                i++;
            }
        }
        return i; // 返回新数组长度
    }
};

int main() {
    vector<int> nums = {0, 1, 2, 2, 3, 0, 4, 2};

    Solution sol;
    int newLength = sol.removeElement(nums, 2);

    cout << "新数组长度: " << newLength << endl;
    cout << "新数组: ";
    for (int i = 0; i < newLength; i++) {
        cout << nums[i] << " ";
    }
    cout << endl;

    return 0;
}
```

