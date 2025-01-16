---
layout: post
title:  "121. 买卖股票的最佳时机"
categories: arithmetic
---

[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock)

### 题目描述

给定一个数组 `prices` ，其中 `prices[i]` 表示第 `i` 天的股票价格。你只能选择 **某一天** 买入这只股票，并选择 **某一天** 在未来的某个时间卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

**示例 1：**

```
输入：prices = [7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）买入，在第 5 天（股票价格 = 6）卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

**示例 2：**

```
输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有任何交易完成, 所以最大利润为 0。
```

**提示：**

- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

### 解题思路

要找到能获取的最大利润，可以采用一次遍历的方法，记录到目前为止的最低买入价格，并计算当前价格卖出所能获得的利润，更新最大利润值。具体步骤如下：

1. **初始化**：
   - 设置一个变量 `minPrice` 为第一个价格，表示当前找到的最低买入价格。
   - 设置一个变量 `maxProfit` 为 `0`，表示当前能获取的最大利润。

2. **遍历价格数组**：
   - 从第二天开始遍历，每天的价格为 `price`。
   - 对于每一天的价格，计算如果在 `minPrice` 时买入，在今天卖出的利润，即 `profit = price - minPrice`。
   - 更新 `maxProfit` 为 `profit` 和当前 `maxProfit` 中的较大值。
   - 更新 `minPrice` 为当前价格和 `minPrice` 中的较小值，确保 `minPrice` 始终是遍历到当前天为止的最低价格。

3. **返回结果**：
   - 遍历完成后，`maxProfit` 即为所能获取的最大利润。

**时间复杂度分析**：

- 该算法只需要一次遍历，时间复杂度为 `O(n)`，其中 `n` 是价格数组的长度。

**空间复杂度分析**：

- 只使用了常数级别的额外空间，空间复杂度为 `O(1)`。

通过上述方法，可以高效地找到能获取的最大利润，满足题目的要求。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */

// 函数功能：计算最大利润
int maxProfit(int* prices, int pricesSize) {
    if(pricesSize == 0) return 0;

    int minPrice = prices[0]; // 初始化最低价格
    int maxProfit = 0;        // 初始化最大利润

    for(int i = 1; i < pricesSize; i++) {
        if(prices[i] < minPrice) {
            minPrice = prices[i]; // 更新最低价格
        }
        else {
            int profit = prices[i] - minPrice; // 计算利润
            if(profit > maxProfit) {
                maxProfit = profit; // 更新最大利润
            }
        }
    }

    return maxProfit;
}

// 辅助函数：释放内存
void freePrices(int* prices) {
    free(prices);
}

// 简单的主函数调用示例
int main() {
    // 示例1
    int prices1[] = {7,1,5,3,6,4};
    int size1 = sizeof(prices1)/sizeof(prices1[0]);
    int profit1 = maxProfit(prices1, size1);
    printf("示例1的最大利润为：%d\n", profit1); // 输出应为5

    // 示例2
    int prices2[] = {7,6,4,3,1};
    int size2 = sizeof(prices2)/sizeof(prices2[0]);
    int profit2 = maxProfit(prices2, size2);
    printf("示例2的最大利润为：%d\n", profit2); // 输出应为0

    // 示例3
    int prices3[] = {1};
    int size3 = sizeof(prices3)/sizeof(prices3[0]);
    int profit3 = maxProfit(prices3, size3);
    printf("示例3的最大利润为：%d\n", profit3); // 输出应为0

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
    // 函数功能：计算最大利润
    int maxProfit(vector<int>& prices) {
        if(prices.empty()) return 0;

        int minPrice = prices[0]; // 初始化最低价格
        int maxProfit = 0;        // 初始化最大利润

        for(size_t i = 1; i < prices.size(); i++) {
            if(prices[i] < minPrice) {
                minPrice = prices[i]; // 更新最低价格
            }
            else {
                int profit = prices[i] - minPrice; // 计算利润
                maxProfit = max(maxProfit, profit); // 更新最大利润
            }
        }

        return maxProfit;
    }
};

// 简单的主函数调用示例
int main() {
    Solution solution;

    // 示例1
    vector<int> prices1 = {7,1,5,3,6,4};
    int profit1 = solution.maxProfit(prices1);
    cout << "示例1的最大利润为：" << profit1 << endl; // 输出应为5

    // 示例2
    vector<int> prices2 = {7,6,4,3,1};
    int profit2 = solution.maxProfit(prices2);
    cout << "示例2的最大利润为：" << profit2 << endl; // 输出应为0

    // 示例3
    vector<int> prices3 = {1};
    int profit3 = solution.maxProfit(prices3);
    cout << "示例3的最大利润为：" << profit3 << endl; // 输出应为0

    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们采用了一次遍历的方法来找到最大利润。具体步骤如下：

1. **初始化**：
   - 将 `minPrice` 初始化为数组的第一个价格，表示当前找到的最低买入价格。
   - 将 `maxProfit` 初始化为 `0`，表示当前能获取的最大利润。

2. **遍历价格数组**：
   - 从第二天开始，遍历每一天的价格。
   - 如果当前价格低于 `minPrice`，则更新 `minPrice`。
   - 否则，计算当前价格卖出所能获得的利润，即 `profit = prices[i] - minPrice`。
   - 如果 `profit` 大于当前的 `maxProfit`，则更新 `maxProfit`。

3. **返回结果**：
   - 遍历完成后，`maxProfit` 即为所能获取的最大利润。

**示例输出**：

```
示例1的最大利润为：5
示例2的最大利润为：0
示例3的最大利润为：0
```

对于C++示例：

```
示例1的最大利润为：5
示例2的最大利润为：0
示例3的最大利润为：0
```

这些输出与预期结果一致，证明了算法的正确性。通过一次遍历，我们能够高效地找到能够获取的最大利润，满足题目的要求。

通过以上步骤和代码实现，我们能够有效地解决“买卖股票的最佳时机”问题，确保在给定的时间和空间复杂度内获得正确的结果。