---
layout: post
title:  "213. 打家劫舍 II"
categories: arithmetic
---

[213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii)

### 题目描述

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，这些房屋形成一个**环形**排列。也就是说，第一个房屋和最后一个房屋是紧挨着的。这将对你偷窃某些房屋时产生限制。

每当你偷窃了相邻的两间房屋时，警报系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

---

**示例 1：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能同时偷窃第一个房屋和最后一个房屋，因此最高金额为 3。
```

**示例 2：**

```
输入：nums = [1,2,3,1]
输出：4
解释：你可以偷窃第 1 间房屋（金额 = 1）和第 3 间房屋（金额 = 3），最高金额 = 1 + 3 = 4。
```

**示例 3：**

```
输入：nums = [0]
输出：0
```

---

**提示：**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 1000`

---

### 解题思路

这是一个动态规划问题，主要特点是房屋形成了一个环形排列。

1. **拆分问题**：
   - 环形问题可以分解为两次线性问题：
     - 考虑不偷窃最后一间房屋（即范围为 `nums[0]` 到 `nums[n-2]`）。
     - 考虑不偷窃第一间房屋（即范围为 `nums[1]` 到 `nums[n-1]`）。
   - 最终结果为上述两种情况的最大值。

2. **线性动态规划**：
   - 定义 `dp[i]` 表示偷窃到第 `i` 间房屋时的最大金额。
   - 状态转移方程：
     ```
     dp[i] = max(dp[i-1], dp[i-2] + nums[i])
     ```
   - 初始条件：
     - 如果只有一间房，直接返回 `nums[0]`。
     - 如果两间房，返回 `max(nums[0], nums[1])`。

3. **时间复杂度**：
   - 每次线性遍历需要 O(n)，总时间复杂度为 O(n)。

4. **空间复杂度**：
   - 优化动态规划空间，使用两个变量存储前两个状态，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数：计算线性范围的最大偷窃金额
int robLinear(int* nums, int start, int end) {
    int prev2 = 0; // 表示 dp[i-2]
    int prev1 = 0; // 表示 dp[i-1]

    for (int i = start; i <= end; i++) {
        int current = (prev1 > (prev2 + nums[i])) ? prev1 : (prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

// 主函数：计算环形数组的最大偷窃金额
int rob(int* nums, int numsSize) {
    if (numsSize == 1) {
        return nums[0];
    }

    // 分别计算两种情况的最大值
    int excludeLast = robLinear(nums, 0, numsSize - 2);
    int excludeFirst = robLinear(nums, 1, numsSize - 1);

    return (excludeLast > excludeFirst) ? excludeLast : excludeFirst;
}

// 测试函数
int main() {
    int nums[] = {2, 3, 2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    printf("最大偷窃金额: %d\n", rob(nums, numsSize));
    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    // 辅助函数：计算线性范围的最大偷窃金额
    int robLinear(vector<int>& nums, int start, int end) {
        int prev2 = 0; // 表示 dp[i-2]
        int prev1 = 0; // 表示 dp[i-1]

        for (int i = start; i <= end; i++) {
            int current = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    // 主函数：计算环形数组的最大偷窃金额
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) {
            return nums[0];
        }

        // 分别计算两种情况的最大值
        int excludeLast = robLinear(nums, 0, n - 2);
        int excludeFirst = robLinear(nums, 1, n - 1);

        return max(excludeLast, excludeFirst);
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {2, 3, 2};

    cout << "最大偷窃金额: " << sol.rob(nums) << endl;
    return 0;
}
```

---

### 代码说明

1. **动态规划的核心**：
   - 对于环形问题，分为两种线性子问题。
   - 每次只需要存储前两个状态即可，节省空间。

2. **分治思想**：
   - 将复杂问题分解为简单的线性问题，再取最大值。

3. **时间复杂度**：
   - 两次线性遍历，总复杂度为 O(n)。

4. **空间复杂度**：
   - 使用两个变量存储状态，空间复杂度为 O(1)。