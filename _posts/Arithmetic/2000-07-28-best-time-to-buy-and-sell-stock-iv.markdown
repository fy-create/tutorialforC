---
layout: post
title:  "188. 买卖股票的最佳时机 IV"
categories: arithmetic
---

[188. 买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv)

### 题目描述：

**最佳买卖股票 IV**

给定一个整数数组 `prices` ，它的第 `i` 个元素 `prices[i]` 是一支给定股票第 `i` 天的价格。  
你最多可以完成 `k` 笔交易（即买入和卖出一支股票）。  
设计一个算法来计算你所能获取的最大利润。  
注意: 你不能同时参与多笔交易（你必须在再次买入前出售掉之前的股票）。

#### 示例 1：
```
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天买入，在第 2 天卖出, 最大利润 = 4-2 = 2。
```

#### 示例 2：
```
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天买入，在第 3 天卖出，利润 = 6-2 = 4。
         在第 4 天买入，在第 5 天卖出，利润 = 3-0 = 3。
         总利润 = 4 + 3 = 7。
```

#### 示例 3：
```
输入：k = 1, prices = [1,2,3,4,5]
输出：4
解释：在第 1 天买入，在第 5 天卖出，最大利润 = 5-1 = 4。
```

#### 提示：
- `0 <= k <= 100`
- `0 <= prices.length <= 1000`
- `0 <= prices[i] <= 1000`

### 解题思路：

#### 思路：
1. **动态规划（Dynamic Programming）**：
   - 我们使用动态规划来解决这个问题。假设我们有一个二维数组 `dp[k][n]`，其中 `dp[i][j]` 表示在第 `i` 笔交易后，且在第 `j` 天时的最大利润。
   
2. **状态转移**：
   - 对于第 `i` 笔交易，第 `j` 天，`dp[i][j]` 可以通过以下几种方式来转移：
     - 不进行任何操作：`dp[i][j] = dp[i][j-1]`
     - 卖出股票：`dp[i][j] = max(dp[i][j], prices[j] - prices[m] + dp[i-1][m])`，其中 `m < j`，表示在第 `m` 天买入股票。
     
3. **优化**：
   - 我们可以优化空间复杂度。由于在每一笔交易的过程中，`dp[i][j]` 只和上一笔交易的结果相关，因此我们可以用两个一维数组来代替二维数组。

4. **边界条件**：
   - 当 `k` 为 0 或者 `prices` 数组为空时，最大利润显然为 0。
   - 如果 `k` 大于 `prices.length / 2`，即理论上可以完成无数次交易，这时候可以看作是一个无限次交易的问题，可以直接通过求最大利润来解决。

### C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 动态规划实现
int maxProfit(int k, int* prices, int pricesSize) {
    if (pricesSize == 0 || k == 0) return 0;

    // 如果交易次数大于等于总天数的一半，等价于无限次交易
    if (k >= pricesSize / 2) {
        int profit = 0;
        for (int i = 1; i < pricesSize; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    // 动态规划数组
    int* dp = (int*)malloc(sizeof(int) * (pricesSize));
    memset(dp, 0, sizeof(int) * pricesSize);

    // 用于存储当前的最大利润
    int* dpPrev = (int*)malloc(sizeof(int) * pricesSize);
    memset(dpPrev, 0, sizeof(int) * pricesSize);

    for (int i = 1; i <= k; i++) {
        int maxDiff = -prices[0];  // 记录最大利润的差值
        for (int j = 1; j < pricesSize; j++) {
            dp[j] = fmax(dp[j-1], prices[j] + maxDiff);  // 比较不卖出和卖出的最大利润
            maxDiff = fmax(maxDiff, dpPrev[j] - prices[j]);  // 更新差值
        }
        memcpy(dpPrev, dp, sizeof(int) * pricesSize);  // 更新上一交易的最大利润
    }

    int result = dp[pricesSize - 1];
    free(dp);
    free(dpPrev);
    return result;
}

int main() {
    int prices[] = {2, 4, 1};
    int pricesSize = 3;
    int k = 2;
    printf("Max Profit: %d\n", maxProfit(k, prices, pricesSize));
    return 0;
}
```

### C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 主函数：计算最大利润
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;
        
        // 如果 k 大于等于价格天数的一半，等同于无限次交易
        if (k >= n / 2) {
            int profit = 0;
            for (int i = 1; i < n; ++i) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        // 动态规划数组，dp[i][j] 代表第 i 次交易，在第 j 天的最大利润
        vector<vector<int>> dp(k + 1, vector<int>(n, 0));

        // 对每一笔交易，进行动态规划
        for (int i = 1; i <= k; ++i) {
            int maxDiff = -prices[0];  // 初始值为负的第一天价格
            for (int j = 1; j < n; ++j) {
                dp[i][j] = max(dp[i][j - 1], prices[j] + maxDiff);  // 比较不操作和卖出的最大利润
                maxDiff = max(maxDiff, dp[i - 1][j] - prices[j]);  // 更新最大差值
            }
        }

        return dp[k][n - 1];
    }
};

int main() {
    Solution solution;
    vector<int> prices = {2, 4, 1};
    int k = 2;
    cout << "Max Profit: " << solution.maxProfit(k, prices) << endl;
    return 0;
}
```

### 解释：

1. **C 语言解法**：
   - `maxProfit` 函数通过动态规划求解最大利润。
   - 当 `k` 大于等于总天数的一半时，我们认为可以无限次交易，直接通过求每次上涨的利润来得到结果。
   - 否则，使用动态规划通过二维数组来记录每笔交易在每一天的最大利润。
   - 使用 `maxDiff` 来存储买入股票的最大差值，通过不断更新来优化利润。

2. **C++ 语言解法**：
   - 通过二维动态规划数组 `dp` 来存储每笔交易在每一天的最大利润。
   - 同样考虑了 `k` 大于等于总天数的一半时，直接用贪心算法计算最大利润。
   - 动态规划的核心思想是，计算每一笔交易在每一天卖出的最大利润，同时记录历史状态来优化选择。

### 总结：
该问题通过动态规划和贪心算法的结合来求解。时间复杂度为 `O(k * n)`，其中 `k` 为最大交易次数，`n` 为价格数组的长度。通过优化空间复杂度，减少不必要的存储。