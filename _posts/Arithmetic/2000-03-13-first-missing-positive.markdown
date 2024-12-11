---
layout: post
title:  "41. 缺失的第一个正数"
categories: arithmetic
---

[41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive)

### 题目描述：
给你一个未排序的整数数组 `nums`，请你找出其中没有出现的最小的正整数。

**说明：**
- 要求算法的时间复杂度为 O(n)，并且只能使用常数级别的额外空间。

**示例 1：**

**输入：** nums = [1,2,0]

**输出：** 3

**示例 2：**

**输入：** nums = [3,4,-1,1]

**输出：** 2

**示例 3：**

**输入：** nums = [7,8,9,11,12]

**输出：** 1

### 解题思路：

1. **交换法：**
   - 我们的目标是将数字 `i` 放在索引 `i-1` 的位置上（即 `nums[i-1] == i`）。
   - 遍历数组，对于每个数字 `nums[i]`，如果它属于范围 `[1, n]` 且 `nums[i] != nums[nums[i]-1]`，就交换它们。

2. **寻找最小正整数：**
   - 第二次遍历数组，检查 `nums[i]` 是否等于 `i+1`。
   - 如果不是，说明 `i+1` 是缺失的最小正整数。

3. **返回结果：**
   - 如果数组中所有数字都满足条件，则返回 `n+1`。

4. **时间和空间复杂度：**
   - 时间复杂度：O(n)，因为每个数字最多只被交换一次。
   - 空间复杂度：O(1)。

```c
#include <stdio.h>

int firstMissingPositive(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        while (nums[i] > 0 && nums[i] <= numsSize && nums[nums[i] - 1] != nums[i]) {
            // 交换 nums[i] 和 nums[nums[i] - 1]
            int temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }

    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != i + 1) {
            return i + 1; // 返回缺失的最小正整数
        }
    }

    return numsSize + 1; // 所有数字都满足条件
}

int main() {
    int nums[] = {3, 4, -1, 1};
    int size = sizeof(nums) / sizeof(nums[0]);

    int result = firstMissingPositive(nums, size);
    printf("缺失的最小正整数是: %d\n", result);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]); // 交换数字到正确的位置
            }
        }

        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) {
                return i + 1; // 返回缺失的最小正整数
            }
        }

        return n + 1; // 所有数字都满足条件
    }
};

int main() {
    vector<int> nums = {3, 4, -1, 1};

    Solution sol;
    int result = sol.firstMissingPositive(nums);

    cout << "缺失的最小正整数是: " << result << endl;

    return 0;
}
```
