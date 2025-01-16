---
layout: post
title:  "322. 零钱兑换"
categories: arithmetic
---

[322. 零钱兑换](https://leetcode.cn/problems/coin-change)

### 题目：**Coin Change**

#### 题目描述：

给定不同面额的硬币和一个总金额 `amount`，找出可以用最少的硬币数凑成该金额。假设每种硬币都有无限个。

你可以假设每个硬币的面额是正整数。

如果没有任何方法能够凑成该金额，返回 `-1`。

#### 示例：

**示例 1：**
```plaintext
输入: coins = [1, 2, 5], amount = 11
输出: 3
解释: 11 = 5 + 5 + 1
```

**示例 2：**
```plaintext
输入: coins = [2], amount = 3
输出: -1
```

**示例 3：**
```plaintext
输入: coins = [1], amount = 0
输出: 0
```

#### 提示：
- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 5000`
- 如果没有任何方法能凑成该金额，返回 `-1`。

---

### 解题思路：

这是一个经典的 **动态规划** 问题，类似于 **背包问题**。我们需要找到一种方法来尽可能少地使用硬币来组合出目标金额。

#### 思路：
1. **定义状态**：
   - 用 `dp[i]` 表示凑成金额 `i` 所需的最小硬币数量。
   
2. **状态转移**：
   - 对于每个硬币 `coin` 和每个金额 `i`（从 `coin` 到 `amount`），我们尝试使用 `coin` 来凑成 `i`，即 `dp[i] = min(dp[i], dp[i - coin] + 1)`。
   
3. **初始化**：
   - `dp[0] = 0`，因为零金额不需要任何硬币。
   - 对于其他金额，我们初始化为一个较大的数（如 `amount + 1`），表示无法凑成该金额。
   
4. **目标**：
   - 最终我们返回 `dp[amount]`，如果它依然是初始化的值，则表示无法凑成该金额，返回 `-1`。

#### 复杂度分析：
- **时间复杂度**：O(n * m)，其中 `n` 是 `amount`，`m` 是 `coins` 数组的大小。我们需要遍历每个金额，并尝试每个硬币。
- **空间复杂度**：O(n)，我们使用一个一维数组来存储每个金额的最小硬币数。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int coinChange(int* coins, int coinsSize, int amount) {
    int dp[amount + 1];
    // 初始化dp数组，设为一个比amount还大的数
    for (int i = 0; i <= amount; i++) {
        dp[i] = amount + 1; // 代表无法凑成该金额
    }
    dp[0] = 0;  // 0金额需要0个硬币

    // 遍历每个金额
    for (int i = 1; i <= amount; i++) {
        // 遍历每个硬币
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i) {
                dp[i] = (dp[i] < dp[i - coins[j]] + 1) ? dp[i] : dp[i - coins[j]] + 1;
            }
        }
    }
    
    return dp[amount] == amount + 1 ? -1 : dp[amount];
}

int main() {
    int coins[] = {1, 2, 5};
    int coinsSize = sizeof(coins) / sizeof(coins[0]);
    int amount = 11;
    
    int result = coinChange(coins, coinsSize, amount);
    printf("Result: %d\n", result);  // Output: 3 (5 + 5 + 1)

    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // 创建一个dp数组，初始化为amount + 1
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;  // 0金额需要0个硬币

        // 遍历每个金额
        for (int i = 1; i <= amount; i++) {
            // 遍历每个硬币
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }

        // 如果dp[amount]没有变化，返回-1
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
};

int main() {
    Solution sol;
    vector<int> coins = {1, 2, 5};
    int amount = 11;

    int result = sol.coinChange(coins, amount);
    cout << "Result: " << result << endl;  // Output: 3 (5 + 5 + 1)

    return 0;
}
```

### 代码解释：
1. **C语言**：
   - `dp` 数组记录每个金额所需的最小硬币数。
   - 初始化时，`dp[0] = 0`，表示凑成金额 `0` 不需要硬币，其他的初始化为一个较大的数 `amount + 1`。
   - 通过两层循环遍历金额和硬币，更新 `dp[i]` 的值。
   - 最后返回 `dp[amount]`，如果它是初始化的值，说明无法凑成该金额，返回 `-1`。

2. **C++**：
   - 使用 `vector<int>` 动态数组来存储 `dp` 数组。
   - 和 C 语言解法类似，初始化 `dp[0] = 0`，其余的初始化为一个较大的数 `amount + 1`。
   - 遍历硬币数组和金额数组，更新 `dp` 数组。
   - 最后返回 `dp[amount]`，如果它是初始化的值，说明无法凑成该金额，返回 `-1`。

### 总结：
- **时间复杂度**：O(n * m)，其中 `n` 是 `amount`，`m` 是硬币数组的长度。
- **空间复杂度**：O(n)，需要一个长度为 `amount + 1` 的 `dp` 数组来存储每个金额的最小硬币数。