---
layout: post
title:  "123. 买卖股票的最佳时机 III"
categories: arithmetic
---

[123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii)

### 题目描述

给定一个整数数组 `prices` ，其中 `prices[i]` 表示某只股票第 `i` 天的价格。

你最多可以完成 **两笔交易** ，并且你可以在不同的交易之间进行买卖，并且必须遵守以下规则：
- 你必须先买入股票，然后才能卖出股票。
- 你不能在同一天买入和卖出。

请你计算并返回可以获得的最大利润。

### 示例：

#### 示例 1：
```
输入：prices = [3,2,6,5,0,3]
输出：6
解释：在第2天（价格=2）买入，第3天（价格=6）卖出，利润=6-2=4。
接着，第5天（价格=0）买入，第6天（价格=3）卖出，利润=3-0=3。
总利润=4+3=6。
```

#### 示例 2：
```
输入：prices = [1,2,3,4,5]
输出：4
解释：在第1天（价格=1）买入，第5天（价格=5）卖出，利润=5-1=4。
```

#### 示例 3：
```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
```

### 提示：
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^5`

---

### 解题思路

这是一个典型的股票交易问题，要求最多完成两笔交易。我们可以通过动态规划来求解此问题，分步解决。

**关键思路：**

1. **状态定义：**
   - `dp[i][0]` 表示第 `i` 天结束时不持有股票的最大利润。
   - `dp[i][1]` 表示第 `i` 天结束时持有股票的最大利润。
   
2. **状态转移：**
   - `dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])`：
     - 不持有股票的最大利润，可以是之前不持有股票的利润，或者是昨天持有股票今天卖出的利润。
   - `dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])`：
     - 持有股票的最大利润，可以是之前持有股票的利润，或者是昨天不持有股票今天买入的利润。
   
3. **优化空间：**
   - 由于 `dp[i]` 只依赖于 `dp[i-1]`，因此我们可以使用滚动数组来优化空间复杂度，从 O(n) 降到 O(1)。

4. **具体步骤：**
   - 使用两个变量来记录两笔交易的最大利润。
   - 从左到右遍历每一天，更新这些变量。

#### 时间复杂度：
- 时间复杂度为 O(n)，其中 n 是数组 `prices` 的长度，因为我们只需要遍历一遍数组。

#### 空间复杂度：
- 空间复杂度为 O(1)，使用常数空间来存储中间状态。

---

### C语言解答

```c
#include <stdio.h>

int maxProfit(int* prices, int pricesSize) {
    // 定义变量，记录两次交易的最大利润
    int first_buy = -prices[0], first_sell = 0;
    int second_buy = -prices[0], second_sell = 0;

    // 遍历每一天的价格
    for (int i = 1; i < pricesSize; i++) {
        // 更新第一次买入后的最大利润
        first_buy = (first_buy > -prices[i]) ? first_buy : -prices[i];
        // 更新第一次卖出的最大利润
        first_sell = (first_sell > first_buy + prices[i]) ? first_sell : first_buy + prices[i];
        // 更新第二次买入后的最大利润
        second_buy = (second_buy > first_sell - prices[i]) ? second_buy : first_sell - prices[i];
        // 更新第二次卖出的最大利润
        second_sell = (second_sell > second_buy + prices[i]) ? second_sell : second_buy + prices[i];
    }

    // 返回最大利润
    return second_sell;
}

int main() {
    int prices[] = {3, 2, 6, 5, 0, 3};
    int pricesSize = sizeof(prices) / sizeof(prices[0]);

    // 计算并输出最大利润
    printf("最大利润是: %d\n", maxProfit(prices, pricesSize));

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        // 定义变量，记录两次交易的最大利润
        int first_buy = -prices[0], first_sell = 0;
        int second_buy = -prices[0], second_sell = 0;

        // 遍历每一天的价格
        for (int i = 1; i < prices.size(); i++) {
            // 更新第一次买入后的最大利润
            first_buy = max(first_buy, -prices[i]);
            // 更新第一次卖出的最大利润
            first_sell = max(first_sell, first_buy + prices[i]);
            // 更新第二次买入后的最大利润
            second_buy = max(second_buy, first_sell - prices[i]);
            // 更新第二次卖出的最大利润
            second_sell = max(second_sell, second_buy + prices[i]);
        }

        // 返回最大利润
        return second_sell;
    }
};

int main() {
    Solution solution;
    vector<int> prices = {3, 2, 6, 5, 0, 3};

    // 计算并输出最大利润
    cout << "最大利润是: " << solution.maxProfit(prices) << endl;

    return 0;
}
```

### 代码解释

#### C语言版：
1. **`maxProfit` 函数**：
   - 使用四个变量 `first_buy`、`first_sell`、`second_buy` 和 `second_sell` 来记录两次交易过程中的最大利润。
   - 每次遍历时，更新这些变量，确保它们始终保存到当前位置的最大利润。

2. **`main` 函数**：
   - 创建一个 `prices` 数组，表示股票价格。
   - 调用 `maxProfit` 函数计算最大利润，并输出结果。

#### C++版：
1. **`maxProfit` 函数**：
   - 使用 `first_buy`、`first_sell`、`second_buy` 和 `second_sell` 变量来分别保存两笔交易过程中的最大利润。
   - 每次遍历价格数组时，更新这些变量以确保最大利润。

2. **`main` 函数**：
   - 创建一个 `Solution` 类对象，调用 `maxProfit` 函数来计算最大利润，并输出结果。

### 输出示例

对于输入：
```
prices = [3, 2, 6, 5, 0, 3]
```
输出：
```
最大利润是: 6
```

对于输入：
```
prices = [1, 2, 3, 4, 5]
```
输出：
```
最大利润是: 4
```

### 总结
- 通过使用动态规划，我们能够高效地计算出最多进行两次交易的最大利润。
- 时间复杂度为 O(n)，空间复杂度优化为 O(1)，非常高效。