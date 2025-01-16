---
layout: post
title:  "198. 打家劫舍"
categories: arithmetic
---

[198. 打家劫舍](https://leetcode.cn/problems/house-robber)

### 题目要求

**题目名称：** House Robber (汉字：打家劫舍)

**题目描述：**

你是一个专业的小偷，计划偷窃沿街的房屋。每间房屋都有一定的现金，独特之处在于相邻的房屋会有保安系统连接， 如果两间相邻的房屋在同一时间被偷窃，系统会自动报警。

给定一个表示每间房屋存放现金的非负整数数组 `nums`，你不能偷窃相邻的两间房屋，请你计算能够偷窃到的最大金额。

**示例1：**
```
输入: [1,2,3,1]
输出: 4
解释: 偷窃 1 号和 3 号房屋的钱（总金额 = 1 + 3 = 4），而不是偷窃 2 号和 4 号房屋的钱（总金额 = 2 + 1 = 3）。
```

**示例2：**
```
输入: [2,7,9,3,1]
输出: 12
解释: 偷窃 1 号、3 号和 5 号房屋的钱（总金额 = 2 + 9 + 1 = 12），而不是偷窃 2 号和 4 号房屋的钱（总金额 = 7 + 3 = 10）。
```

**提示：**
- 0 <= nums.length <= 100
- 0 <= nums[i] <= 400

### 解题思路

这是一个经典的动态规划问题。我们可以用动态规划来解决，核心思路是：

- 假设我们有一个数组 `dp`，其中 `dp[i]` 表示偷窃从房屋 0 到房屋 i 所能获得的最大金额。
- 如果我们不偷第 i 家，那么最大金额就是 `dp[i-1]`。
- 如果我们偷第 i 家，那么最大金额就是 `dp[i-2] + nums[i]`。
- 所以，状态转移方程是：  
  `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`。

边界情况：
- `dp[0] = nums[0]`：如果只有一间房屋，偷窃的最大金额就是房屋中的现金。
- `dp[1] = max(nums[0], nums[1])`：如果有两间房屋，我们只能偷其中金额较大的那一间。

### C语言解答

```c
#include <stdio.h>

int rob(int* nums, int numsSize) {
    if (numsSize == 0) {
        return 0;  // 如果没有房屋，最大金额为0
    }
    if (numsSize == 1) {
        return nums[0];  // 如果只有一间房屋，偷窃的最大金额就是这间房屋的现金
    }
    
    // 初始化前两个值
    int prev2 = 0;  // dp[i-2]
    int prev1 = nums[0];  // dp[i-1]
    int current = 0;
    
    for (int i = 1; i < numsSize; i++) {
        // 当前房屋的最大偷窃金额 = max(不偷当前房屋, 偷当前房屋)
        current = (prev2 + nums[i] > prev1) ? prev2 + nums[i] : prev1;
        
        // 更新 prev2 和 prev1
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;  // 最终的最大值
}

int main() {
    int nums[] = {2, 7, 9, 3, 1};  // 示例输入
    int size = sizeof(nums) / sizeof(nums[0]);
    printf("Maximum amount that can be robbed: %d\n", rob(nums, size));  // 输出最大金额
    return 0;
}
```

### 代码解析：

1. **边界情况处理：**
   - 如果 `numsSize == 0`，没有房屋可偷，返回 0。
   - 如果 `numsSize == 1`，只有一间房屋，返回其金额。
   
2. **动态规划转移：**
   - 我们使用两个变量 `prev2` 和 `prev1` 来保存之前两次的结果，避免额外的空间开销。
   - 每次循环时，我们计算当前房屋偷窃的最大值，并更新 `prev2` 和 `prev1`。

3. **空间优化：**
   - 由于我们只关心 `dp[i-1]` 和 `dp[i-2]`，所以只使用两个变量保存状态，而不需要整个数组，优化了空间复杂度。

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 函数：计算最大偷窃金额
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) {
            return 0;  // 没有房屋可偷
        }
        if (n == 1) {
            return nums[0];  // 只有一间房屋，直接返回
        }

        // 初始化前两个值
        int prev2 = 0;  // dp[i-2]
        int prev1 = nums[0];  // dp[i-1]
        int current = 0;

        // 遍历数组，计算最大偷窃金额
        for (int i = 1; i < n; i++) {
            // 当前房屋的最大偷窃金额 = max(不偷当前房屋, 偷当前房屋)
            current = max(prev1, prev2 + nums[i]);
            
            // 更新 prev2 和 prev1
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;  // 最终的最大金额
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 7, 9, 3, 1};  // 示例输入
    cout << "Maximum amount that can be robbed: " << solution.rob(nums) << endl;  // 输出最大金额
    return 0;
}
```

### 代码解析：

1. **`rob` 方法：**
   - 通过 `prev2` 和 `prev1` 来记录前两个状态，从而避免使用额外的数组空间。
   - 每次计算当前房屋的最大偷窃金额，并更新 `prev2` 和 `prev1`。

2. **`main` 函数：**
   - 创建 `Solution` 类对象，调用 `rob` 方法计算最大偷窃金额。
   - 使用 C++ 的 `vector<int>` 来处理输入数据。

3. **使用 STL 容器：**
   - 使用 `vector<int>` 来表示房屋中的现金。
   - 使用 `max()` 函数来简化选择操作。

### 总结

- **时间复杂度：** O(n)，其中n是房屋数量。每个房屋仅遍历一次。
- **空间复杂度：** O(1)，我们只使用了常数空间来保存状态。

该解法是基于动态规划的最优解法，既高效又简洁。