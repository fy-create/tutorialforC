---
layout: post
title:  "31. 下一个排列"
categories: arithmetic
---

[31. 下一个排列](https://leetcode.cn/problems/next-permutation)

### 题目描述：
实现获取 **下一个排列** 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

必须**原地**修改，只允许使用额外常数空间。

**示例：**

**输入：** nums = [1,2,3]

**输出：** [1,3,2]

**输入：** nums = [3,2,1]

**输出：** [1,2,3]

**输入：** nums = [1,1,5]

**输出：** [1,5,1]

### 解题思路：

1. **从右到左找到第一个升序对**：
   - 从右向左遍历数组，找到第一个 `nums[i] < nums[i+1]` 的位置 `i`。
   - 如果未找到升序对，则说明数组已经是最大排列，直接反转整个数组即可。

2. **从右到左找到比 `nums[i]` 大的最小元素**：
   - 从右向左遍历，找到第一个比 `nums[i]` 大的元素，记作 `nums[j]`。

3. **交换 `nums[i]` 和 `nums[j]`**：
   - 交换这两个元素，使排列变大。

4. **反转 `nums[i+1:]` 部分**：
   - 将 `nums[i+1:]` 部分反转，使其成为最小的排列。

5. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(n)，n 为数组长度。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>

void reverse(int* nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

void nextPermutation(int* nums, int numsSize) {
    int i = numsSize - 2;
    // 找到第一个升序对
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    if (i >= 0) {
        // 找到比 nums[i] 大的最小元素
        int j = numsSize - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        // 交换 nums[i] 和 nums[j]
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    // 反转 nums[i+1:] 部分
    reverse(nums, i + 1, numsSize - 1);
}

void printArray(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");
}

int main() {
    int nums[] = {1, 2, 3};
    int size = sizeof(nums) / sizeof(nums[0]);

    nextPermutation(nums, size);
    printArray(nums, size);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = nums.size() - 2;
        // 找到第一个升序对
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        if (i >= 0) {
            // 找到比 nums[i] 大的最小元素
            int j = nums.size() - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            // 交换 nums[i] 和 nums[j]
            swap(nums[i], nums[j]);
        }

        // 反转 nums[i+1:] 部分
        reverse(nums.begin() + i + 1, nums.end());
    }
};

int main() {
    vector<int> nums = {1, 2, 3};

    Solution sol;
    sol.nextPermutation(nums);

    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```
