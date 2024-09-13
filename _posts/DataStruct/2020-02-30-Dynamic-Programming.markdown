---
layout: post
title:  "动态规划（Dynamic Programming, DP）"
categories: dataStruct
---


### 动态规划（Dynamic Programming, DP）的概念和应用

#### 概念
**动态规划（Dynamic Programming，简称 DP）** 是一种通过将问题分解为更小的子问题来解决复杂问题的算法技术。它通过记忆已经解决的子问题来避免重复计算，从而提高效率。动态规划常用于解决具有 **重叠子问题（Overlapping Subproblems）** 和 **最优子结构（Optimal Substructure）** 的问题。

- **重叠子问题**：同一个子问题会被多次计算。
- **最优子结构**：问题的最优解可以通过子问题的最优解构造出来。

#### 核心思想
动态规划通过建立一个 **表格** 或使用 **递归+记忆化（Memoization）** 的方式，将已经求解的子问题结果存储起来，避免重复计算，从而将时间复杂度从指数级降低到多项式级。

动态规划通常有两种实现方式：
1. **自顶向下的递归+记忆化**：通过递归解决问题，并在递归过程中将已经求解的子问题结果存储起来。
2. **自底向上的迭代方法**：通过构建一个表格，从最小的子问题开始解决，逐步解决更大的子问题。

---

### 动态规划的常见问题

#### 1. **背包问题（Knapsack Problem）**

##### 1.1 0-1 背包问题
在 **0-1 背包问题** 中，给定一组物品，每个物品有一个重量和价值，你有一个容量为 `W` 的背包，问在不超过背包容量的前提下，能获得的最大价值是多少。每件物品只能选一次（要么选，要么不选）。

##### 代码实现（C语言）：
```c
#include <stdio.h>

#define max(a, b) ((a) > (b) ? (a) : (b))

// 0-1 背包问题
int knapsack(int W, int wt[], int val[], int n) {
    int dp[n + 1][W + 1];

    // 构建 DP 表格
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;  // 基础情况
            } else if (wt[i - 1] <= w) {
                // 取物品 i 或不取物品 i
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];  // 不取物品 i
            }
        }
    }

    return dp[n][W];  // 最大价值
}

int main() {
    int val[] = {60, 100, 120};
    int wt[] = {10, 20, 30};
    int W = 50;  // 背包容量
    int n = sizeof(val) / sizeof(val[0]);

    printf("Maximum value in Knapsack = %d\n", knapsack(W, wt, val, n));
    return 0;
}
```

#### 1.2 完全背包问题
与 0-1 背包不同，**完全背包问题** 允许每个物品选取无限次。实现方式与 0-1 背包类似，只是在状态转移时允许多次选取物品。

---

#### 2. **最长公共子序列（Longest Common Subsequence, LCS）**

**LCS 问题** 是给定两个字符串 `X` 和 `Y`，求它们的最长公共子序列的长度。子序列可以不连续，但顺序必须保持一致。

##### 代码实现（C语言）：
```c
#include <stdio.h>
#include <string.h>

#define max(a, b) ((a) > (b) ? (a) : (b))

// 最长公共子序列
int lcs(char* X, char* Y) {
    int m = strlen(X);
    int n = strlen(Y);
    int dp[m + 1][n + 1];

    // 构建 DP 表格
    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;  // 初始化
            } else if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;  // 字符相同，长度+1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);  // 字符不同，取较大值
            }
        }
    }

    return dp[m][n];  // LCS 的长度
}

int main() {
    char X[] = "ABCBDAB";
    char Y[] = "BDCAB";

    printf("Length of LCS is %d\n", lcs(X, Y));
    return 0;
}
```

#### 解释：
- **时间复杂度**：O(m * n)，其中 `m` 和 `n` 分别是两个字符串的长度。
- 该算法通过构建一个二维表格来存储两个字符串的所有子问题的解，从而避免重复计算。

---

#### 3. **最长递增子序列（Longest Increasing Subsequence, LIS）**

**LIS 问题** 是在给定的数组中，找到一个最长的递增子序列（不一定是连续的）。可以通过动态规划或贪心+二分查找来解决。

##### 代码实现（C语言，动态规划解法）：
```c
#include <stdio.h>

#define max(a, b) ((a) > (b) ? (a) : (b))

// 最长递增子序列
int lis(int arr[], int n) {
    int dp[n];
    for (int i = 0; i < n; i++) {
        dp[i] = 1;  // 每个元素都可以是长度为1的子序列
    }

    // 动态规划求解
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j]) {
                dp[i] = max(dp[i], dp[j] + 1);  // 更新 dp[i]
            }
        }
    }

    // 找到 dp[] 中的最大值，即 LIS 的长度
    int maxLIS = 0;
    for (int i = 0; i < n; i++) {
        maxLIS = max(maxLIS, dp[i]);
    }

    return maxLIS;
}

int main() {
    int arr[] = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Length of LIS is %d\n", lis(arr, n));
    return 0;
}
```

#### 解释：
- **时间复杂度**：O(n^2)，可以通过贪心 + 二分查找将其优化为 **O(n log n)**。
- `dp[i]` 表示以第 `i` 个元素结尾的最长递增子序列长度。通过从头到尾扫描数组，可以动态地更新每个子问题的解。

---

#### 4. **状态压缩动态规划（Bitmask DP）**

状态压缩 DP 是一种特殊的动态规划技巧，主要用于处理组合性质的问题。它通过使用位掩码（Bitmask）来表示状态，使得能够在 **O(2^n)** 的时间内解决一些看似复杂的问题。典型问题包括 **旅行商问题（TSP）**、**集合覆盖问题** 等。

##### 旅行商问题（TSP）的简单解法：
- 给定一组城市和它们之间的距离，要求找出一条访问每个城市恰好一次的路径，使得路径长度最短。可以使用状态压缩 DP 和位掩码来解决该问题。

---

### 总结

- **动态规划** 是一种通过记忆子问题来避免重复计算、提升效率的算法思想，广泛应用于许多复杂问题的求解。
- 常见的动态规划问题包括 **背包问题**、**最长公共子序列（LCS）**、**最长递增子序列（LIS）** 等。
- **状态压缩动态规划** 通过位掩码优化复杂状态空间，适用于组合问题和图论中的路径问题等。
