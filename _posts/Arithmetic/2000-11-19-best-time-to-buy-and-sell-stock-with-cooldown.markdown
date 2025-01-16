---
layout: post
title:  "309. 买卖股票的最佳时机含冷冻期"
categories: arithmetic
---

[309. 买卖股票的最佳时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown)

Here is the content of the problem from Leetcode:

### 题目描述

给定一个整数数组 `prices`，其中 `prices[i]` 表示股票第 `i` 天的价格。设计一个算法来计算最大利润。你可以在任何一天买入和卖出股票，销售后你有一个 cooldown（冷却期），即你必须等待一天才能再次进行买入操作。

注意:
- 你不能在同一天进行买入和卖出操作。
- 你必须遵守冷却期规则，即在完成一次卖出操作后，必须等一天才能进行下一次买入操作。

### 示例 1:

输入: `[1,2,3,0,2]`  
输出: `3`  
解释:  
- 在第 1 天（价格 = 1）买入股票.  
- 在第 3 天（价格 = 3）卖出股票.  
- 由于冷却期，我们必须等待 1 天才能进行下一次买入操作.  
- 在第 4 天（价格 = 0）买入股票.  
- 在第 5 天（价格 = 2）卖出股票.  
最大利润 = (3 - 1) + (2 - 0) = 3.

### 示例 2:

输入: `[1]`  
输出: `0`  
解释: 你不能进行任何买入和卖出操作。

### 提示:
- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

---

### 解题思路

此题要求在满足冷却期约束的情况下，找到最大的股票买卖利润。我们可以使用 **动态规划** 来解决这个问题。

我们定义三个状态：
1. `hold[i]`：在第 `i` 天持有股票的最大利润。
2. `sold[i]`：在第 `i` 天卖出股票的最大利润。
3. `rest[i]`：在第 `i` 天没有任何操作（即处于冷却期）的最大利润。

状态转移方程：
1. `hold[i] = max(hold[i-1], rest[i-1] - prices[i])`，即持有股票的最大利润要么是之前持有的状态，要么是从冷却期状态转移过来。
2. `sold[i] = hold[i-1] + prices[i]`，即卖出股票的最大利润是从持有股票的状态转移过来。
3. `rest[i] = max(rest[i-1], sold[i-1])`，即没有操作的状态要么是之前没有操作的状态，要么是从卖出状态转移过来。

最终的答案是 `max(sold[n-1], rest[n-1])`，即我们最终卖出或者没有操作的最大利润。

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 动态规划解决问题
int maxProfit(int* prices, int pricesSize) {
    if (pricesSize == 0) return 0;
    
    int* hold = (int*)malloc(pricesSize * sizeof(int));
    int* sold = (int*)malloc(pricesSize * sizeof(int));
    int* rest = (int*)malloc(pricesSize * sizeof(int));

    hold[0] = -prices[0]; // 第一天买入股票
    sold[0] = 0; // 第一天卖出股票无法获得利润
    rest[0] = 0; // 第一天没有操作

    for (int i = 1; i < pricesSize; i++) {
        hold[i] = (rest[i-1] - prices[i] > hold[i-1]) ? rest[i-1] - prices[i] : hold[i-1]; // 持有股票
        sold[i] = hold[i-1] + prices[i]; // 卖出股票
        rest[i] = (sold[i-1] > rest[i-1]) ? sold[i-1] : rest[i-1]; // 没有操作
    }

    int result = (sold[pricesSize-1] > rest[pricesSize-1]) ? sold[pricesSize-1] : rest[pricesSize-1];
    free(hold);
    free(sold);
    free(rest);
    
    return result;
}

int main() {
    int prices[] = {1, 2, 3, 0, 2};
    int size = sizeof(prices) / sizeof(prices[0]);
    printf("Maximum profit: %d\n", maxProfit(prices, size)); // 3
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int n = prices.size();
        if (n == 0) return 0;
        
        vector<int> hold(n, 0), sold(n, 0), rest(n, 0);
        
        hold[0] = -prices[0]; // 第一天买入股票
        sold[0] = 0; // 第一天卖出股票无法获得利润
        rest[0] = 0; // 第一天没有操作

        for (int i = 1; i < n; i++) {
            hold[i] = max(rest[i-1] - prices[i], hold[i-1]); // 持有股票
            sold[i] = hold[i-1] + prices[i]; // 卖出股票
            rest[i] = max(sold[i-1], rest[i-1]); // 没有操作
        }

        return max(sold[n-1], rest[n-1]); // 最终利润
    }
};

int main() {
    Solution solution;
    vector<int> prices = {1, 2, 3, 0, 2};
    cout << "Maximum profit: " << solution.maxProfit(prices) << endl; // 3
    return 0;
}
```

### 代码解释
1. **状态初始化**：
   - `hold[0]` 表示第0天买入的状态，初始为 `-prices[0]`。
   - `sold[0]` 表示第0天卖出的状态，初始为0。
   - `rest[0]` 表示第0天未进行任何操作的状态，初始为0。
   
2. **状态转移**：
   - 通过递推公式更新 `hold[i]`、`sold[i]` 和 `rest[i]` 的值，最终我们从 `sold` 和 `rest` 数组中得到最大的利润。

3. **时间复杂度**：O(n)，因为我们只遍历了一次 `prices` 数组。

4. **空间复杂度**：O(n)，因为我们使用了三个数组来存储状态。

两种语言的实现基本相同，C 语言通过数组模拟状态，C++ 通过 `vector` 来实现。