---
layout: post
title:  "312. 戳气球"
categories: arithmetic
---

[312. 戳气球](https://leetcode.cn/problems/burst-balloons)

### 题目：**Burst Balloons**

#### 题目描述：

有 `n` 个气球排成一排，每个气球上标有一个数字，这些数字存在 `nums` 数组中，其中 `nums[i]` 代表第 `i` 个气球的数字。现在要求你从中选择一些气球进行爆破，选择的规则是：

- 你可以选择任意一个气球将其爆破。
- 如果你选择了气球 `i` 进行爆破，那么气球 `i-1` 和气球 `i+1` 会被影响，其中：
  - `nums[i-1]` 和 `nums[i+1]` 分别增加 `nums[i]` 的值。
  - 然后气球 `i` 被消除（即不再存在）。

每次爆破气球所获得的金币数量是 `nums[i-1] * nums[i] * nums[i+1]`（注意是邻近气球的数字相乘）。返回你能获得的最大金币数。

**示例 1：**
```plaintext
输入: [3, 1, 5, 8]
输出: 167
解释: 
  nums = [3, 1, 5, 8]
  我们可以爆破气球 1，获得 3 * 1 * 5 = 15 个金币。
  然后我们可以爆破气球 3，获得 3 * 5 * 8 = 120 个金币。
  最后爆破气球 2，获得 3 * 1 * 8 = 24 个金币。
  总金币数 = 15 + 120 + 24 = 167。
```

**示例 2：**
```plaintext
输入: [1, 2, 3, 4]
输出: 58
```

**提示：**
- `n == nums.length`
- `1 <= n <= 300`
- `0 <= nums[i] <= 100`

---

### 解题思路：

#### 1. **动态规划：**
   - **状态定义：**
     使用二维 DP 数组 `dp[i][j]` 来表示在 `i` 和 `j` 之间的子区间内（不包括 `i` 和 `j`）可以得到的最大金币数。

   - **状态转移方程：**
     对于每一对 `i, j`，其中 `i < j`，我们考虑在区间 `[i, j]` 内选择一个气球 `k`（`i < k < j`）来爆破，那么该子问题的最优解可以通过：
     \[
     dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] \times nums[k] \times nums[j])
     \]
     其中 `dp[i][k]` 表示在区间 `[i, k]` 内的最优解，`dp[k][j]` 表示在区间 `[k, j]` 内的最优解。`nums[i] * nums[k] * nums[j]` 是爆破气球 `k` 所带来的金币。

   - **初始化：**
     设定 `dp[i][i+1] = 0`，即单独一个气球时不能获得金币。

   - **最终目标：**
     计算 `dp[0][n-1]`，即从第一个气球到最后一个气球的最大金币数。

#### 2. **时间复杂度：**
   - 对于每一对 `(i, j)`，需要遍历 `k` 来计算 `dp[i][j]`。因此时间复杂度为 `O(n^3)`，其中 `n` 是气球的数量。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

int maxCoins(int* nums, int numsSize) {
    // 加入边界气球，方便处理
    int n = numsSize + 2;
    int* newNums = (int*)malloc(n * sizeof(int));
    newNums[0] = newNums[n - 1] = 1;
    
    for (int i = 0; i < numsSize; i++) {
        newNums[i + 1] = nums[i];
    }
    
    // dp[i][j] 表示区间 [i, j] 内能获得的最大金币数
    int dp[n][n];
    
    // 初始化所有 dp[i][j] 为 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            dp[i][j] = 0;
        }
    }
    
    // 动态规划计算
    for (int len = 2; len < n; len++) { // 区间长度
        for (int i = 0; i < n - len; i++) {
            int j = i + len;
            for (int k = i + 1; k < j; k++) {
                dp[i][j] = (dp[i][j] > dp[i][k] + dp[k][j] + newNums[i] * newNums[k] * newNums[j]) ? 
                           dp[i][j] : dp[i][k] + dp[k][j] + newNums[i] * newNums[k] * newNums[j];
            }
        }
    }
    
    return dp[0][n - 1];
}

int main() {
    int nums[] = {3, 1, 5, 8};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    printf("Maximum coins: %d\n", maxCoins(nums, numsSize));
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1); // 在数组的前端插入 1
        nums.push_back(1); // 在数组的后端插入 1
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        
        for (int len = 2; len < n + 2; len++) { // 区间长度
            for (int i = 0; i < n + 2 - len; i++) {
                int j = i + len;
                for (int k = i + 1; k < j; k++) {
                    dp[i][j] = max(dp[i][j], dp[i][k] + dp[k][j] + nums[i] * nums[k] * nums[j]);
                }
            }
        }
        
        return dp[0][n + 1];
    }
};

int main() {
    vector<int> nums = {3, 1, 5, 8};
    Solution sol;
    cout << "Maximum coins: " << sol.maxCoins(nums) << endl;
    return 0;
}
```

### 代码解释：

1. **初始化**：
   - 我们在原数组的两端插入 `1`，方便处理边界情况。
   
2. **动态规划表**：
   - `dp[i][j]` 表示在区间 `[i, j]` 内的最大金币数。
   
3. **遍历**：
   - 从子问题长度为 2 开始，逐步扩大到整个区间。对于每一个区间 `[i, j]`，我们尝试通过选择一个 `k` 来计算最大金币数。

4. **最终结果**：
   - 计算 `dp[0][n+1]`，即从第一个气球到最后一个气球的最大金币数。

### 总结：
通过动态规划的方式，利用子问题的最优解来构建更大范围的解。最终结果保存在 `dp[0][n+1]` 中，时间复杂度为 `O(n^3)`，适用于最大输入范围。