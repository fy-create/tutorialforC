---
layout: post
title:  "122. 买卖股票的最佳时机 II"
categories: arithmetic
---

[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii)

输入：prices = [7,1,5,3,6,4]
输出：7
解释：在第2天（价格=1）买入，第3天（价格=5）卖出，利润=5-1=4。
接着，第4天（价格=3）买入，第5天（价格=6）卖出，利润=6-3=3。
总利润=4+3=7。
题目描述：

给定一个数组 `prices`，它的第 `i` 个元素 `prices[i]` 是一支股票第 `i` 天的价格。

你可以选择一个交易时机多次买入和卖出股票，但必须遵守以下规则：
- 你可以在一天内进行至少一次交易（即买入后立刻卖出）。
- 你不能同时进行两笔交易，即必须在再次买入前卖出。

返回你能获得的最大利润。

**示例 1：**
```
输入: prices = [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（价格 = 1）买入，在第 3 天（价格 = 5）卖出，利润 = 5 - 1 = 4。
     然后，在第 4 天（价格 = 3）买入，在第 5 天（价格 = 6）卖出，利润 = 6 - 3 = 3。
     总利润 = 4 + 3 = 7。
```

**示例 2：**
```
输入: prices = [1,2,3,4,5]
输出: 4
解释: 在第 1 天（价格 = 1）买入，在第 5 天（价格 = 5）卖出，利润 = 5 - 1 = 4。
```

**示例 3：**
```
输入: prices = [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

**提示：**
- `1 <= prices.length <= 3 * 10^4`
- `0 <= prices[i] <= 10^4`

### 解题思路：

这个问题是一个典型的股票交易问题。要最大化利润，可以通过在股票价格上升时进行买入和卖出。具体的思路如下：
1. 我们可以把每一次“价格上涨”的区间视为一个利润累积的机会。当股票价格上涨时，表示可以买入并卖出获得差价。
2. 因为可以在多次买入和卖出中获得利润，所以我们只需要计算所有上涨的区间的总和即可。具体的做法是遍历所有的价格数组，对于每一对相邻的价格：
   - 如果 `prices[i] < prices[i+1]`，则说明我们在第 `i` 天买入，第 `i+1` 天卖出，这样的利润为 `prices[i+1] - prices[i]`。
3. 将所有的利润累加，即可得到最大利润。

### C 语言解答：

```c
#include <stdio.h>

int maxProfit(int* prices, int pricesSize) {
    int profit = 0;
    
    // 遍历所有的价格
    for (int i = 1; i < pricesSize; i++) {
        // 如果当前价格比前一天高，则进行卖出交易
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];  // 累加利润
        }
    }
    
    return profit;
}

int main() {
    int prices[] = {7, 1, 5, 3, 6, 4};
    int pricesSize = sizeof(prices) / sizeof(prices[0]);
    
    int result = maxProfit(prices, pricesSize);
    printf("Maximum profit: %d\n", result);
    
    return 0;
}
```

### C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 返回最大利润
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        
        // 遍历所有的价格
        for (int i = 1; i < prices.size(); i++) {
            // 如果当前价格比前一天高，则进行卖出交易
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];  // 累加利润
            }
        }
        
        return profit;
    }
};

int main() {
    Solution solution;
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    
    // 获取最大利润
    int result = solution.maxProfit(prices);
    
    cout << "Maximum profit: " << result << endl;
    
    return 0;
}
```

### 解释：
1. **C 语言解法：**
   - 遍历价格数组，逐对比较相邻的价格。
   - 如果当前价格大于前一个价格，说明可以在该点买入并卖出，计算这笔交易的利润并累加。
   - 最终返回总利润。

2. **C++ 语言解法：**
   - 使用 `vector<int>` 来表示价格数组，使得代码更加简洁。
   - 在 `Solution` 类中封装了求解最大利润的函数 `maxProfit`。
   - 逻辑与 C 语言解法相同，只是利用了 C++ 的标准库 `vector` 和 `size` 方法来简化代码。

### 总结：
本题的解法非常直接，核心思想是利用股票价格的上涨区间进行多次交易。在每次股票价格上涨时，我们通过差值来计算利润并将其累加。时间复杂度为 O(n)，其中 n 是价格数组的长度。