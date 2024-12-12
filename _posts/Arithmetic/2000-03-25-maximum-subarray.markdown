---
layout: post
title:  "53. 最大子数组和"
categories: arithmetic
---

[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray)

### 题目描述：
给你一个整数数组 `nums` ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组 是数组中的一个连续部分。

**示例：**

**输入：** nums = [-2,1,-3,4,-1,2,1,-5,4]

**输出：** 6

**解释：** 连续子数组 [4,-1,2,1] 的和最大，为 6 。

**输入：** nums = [1]

**输出：** 1

**输入：** nums = [5,4,-1,7,8]

**输出：** 23

**提示：**
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

### 解题思路：

1. **动态规划：**
   - 使用动态规划求解，定义状态 `dp[i]` 表示以第 `i` 个元素为结尾的最大子数组和。
   - 状态转移方程：`dp[i] = max(dp[i-1] + nums[i], nums[i])`。
   - 最大值可以在每一步计算 `dp[i]` 时更新。

2. **空间优化：**
   - 因为当前状态只依赖于前一个状态，因此可以将空间复杂度优化为 O(1)。

3. **时间复杂度：**
   - 时间复杂度为 O(n)，其中 `n` 是数组的长度。

4. **空间复杂度：**
   - 空间复杂度为 O(1)。

```c
#include <stdio.h>
#include <limits.h>

int maxSubArray(int* nums, int numsSize) {
    int maxSum = INT_MIN; // 最大子数组和
    int currentSum = 0;   // 当前子数组和

    for (int i = 0; i < numsSize; i++) {
        if (currentSum < 0) {
            currentSum = nums[i]; // 如果当前和为负数，重新开始计算
        } else {
            currentSum += nums[i];
        }
        if (currentSum > maxSum) {
            maxSum = currentSum; // 更新最大子数组和
        }
    }

    return maxSum;
}

int main() {
    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    printf("Maximum Subarray Sum: %d\n", maxSubArray(nums, numsSize));
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
    int maxSubArray(vector<int>& nums) {
        int maxSum = INT_MIN; // 最大子数组和
        int currentSum = 0;   // 当前子数组和

        for (int num : nums) {
            if (currentSum < 0) {
                currentSum = num; // 如果当前和为负数，重新开始计算
            } else {
                currentSum += num;
            }
            maxSum = max(maxSum, currentSum); // 更新最大子数组和
        }

        return maxSum;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << "Maximum Subarray Sum: " << sol.maxSubArray(nums) << endl;
    return 0;
}
```
