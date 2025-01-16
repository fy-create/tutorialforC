---
layout: post
title:  "70. 爬楼梯"
categories: arithmetic
---

[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs)

### 题目要求：

你正在爬楼梯。需要 n 阶楼梯，你每次可以爬 1 步或者 2 步。请你计算一共有多少种不同的方法可以爬到楼顶。

#### 示例：

**示例 1**：
```
输入: n = 2
输出: 2
解释：有两种方法可以爬到楼顶：
1. 1 步 + 1 步
2. 2 步
```

**示例 2**：
```
输入: n = 3
输出: 3
解释：有三种方法可以爬到楼顶：
1. 1 步 + 1 步 + 1 步
2. 1 步 + 2 步
3. 2 步 + 1 步
```

#### 提示：
- 1 <= n <= 45

### 解题思路：

本题是典型的动态规划问题，可以通过状态转移方程来求解。

#### 动态规划分析：
1. **状态定义**：
   - 定义 `dp[i]` 表示到达第 `i` 阶楼梯的方法数。
   
2. **状态转移方程**：
   - 从第 `i` 阶楼梯上来，有两种可能：
     - 从第 `i-1` 阶上来，方法数为 `dp[i-1]`。
     - 从第 `i-2` 阶上来，方法数为 `dp[i-2]`。
   - 所以，`dp[i] = dp[i-1] + dp[i-2]`，这就是斐波那契数列的变种。

3. **边界条件**：
   - `dp[0] = 1`：到达第 0 阶（站在地面上）有 1 种方法，即什么都不做。
   - `dp[1] = 1`：到达第 1 阶有 1 种方法，即一步就到达。

4. **最终结果**：
   - `dp[n]` 就是我们需要的答案，表示到达第 `n` 阶的方法数。

### C语言实现：

```c
#include <stdio.h>

int climbStairs(int n) {
    // 边界情况：n = 0 或 n = 1
    if (n == 0) return 0;
    if (n == 1) return 1;

    // 定义 dp 数组，用来存储每一阶楼梯的爬法数
    int dp[n + 1];
    dp[0] = 1;  // 到达第 0 阶有 1 种方法（不动）
    dp[1] = 1;  // 到达第 1 阶有 1 种方法（一步）

    // 动态规划填充 dp 数组
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];  // 状态转移方程
    }

    // 返回到达第 n 阶的爬法数
    return dp[n];
}

int main() {
    int n = 3;
    int result = climbStairs(n);
    printf("There are %d ways to climb to the top of the stairs.\n", result);
    return 0;
}
```

### C++实现：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        // 边界条件：n = 0 或 n = 1
        if (n == 0) return 0;
        if (n == 1) return 1;

        // 使用两个变量来代替 dp 数组
        int prev2 = 1;  // dp[i-2]
        int prev1 = 1;  // dp[i-1]
        int current = 0;

        // 动态规划，计算每一阶楼梯的爬法数
        for (int i = 2; i <= n; i++) {
            current = prev1 + prev2;  // 状态转移方程
            prev2 = prev1;  // 更新 prev2
            prev1 = current;  // 更新 prev1
        }

        // 返回到达第 n 阶的爬法数
        return current;
    }
};

int main() {
    Solution solution;
    int n = 3;
    int result = solution.climbStairs(n);
    cout << "There are " << result << " ways to climb to the top of the stairs." << endl;
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **边界条件**：如果 `n == 0`，返回 0；如果 `n == 1`，返回 1。这是因为如果没有楼梯（`n == 0`），无法进行爬楼梯，而只有 1 阶楼梯时，只有一种爬法。
   
2. **动态规划数组**：定义一个数组 `dp` 来存储每一阶楼梯的爬法数。`dp[i]` 表示到达第 `i` 阶的不同爬法数。

3. **状态转移**：根据状态转移方程 `dp[i] = dp[i-1] + dp[i-2]` 来计算每一阶的爬法数。

4. **结果返回**：最终返回 `dp[n]`，即到达第 `n` 阶的爬法数。

#### C++实现：
1. **边界条件**：同样处理 `n == 0` 和 `n == 1` 的情况。
   
2. **优化空间**：由于只需要 `dp[i-1]` 和 `dp[i-2]` 来计算 `dp[i]`，因此我们用两个变量 `prev1` 和 `prev2` 来代替整个 `dp` 数组，节省空间。

3. **动态规划**：通过迭代更新 `prev1` 和 `prev2`，逐步计算每一阶的爬法数。

4. **返回结果**：最终返回 `current`，即到达第 `n` 阶的爬法数。

### 时间和空间复杂度：
- **时间复杂度**：O(n)，需要遍历从 2 到 `n` 的所有楼梯，进行一次线性的计算。
- **空间复杂度**：
  - C语言实现：O(n)，因为我们使用了一个 `dp` 数组来存储每阶的爬法数。
  - C++实现：O(1)，由于使用了两个变量来保存前两步的结果，空间复杂度被优化为常数级别。