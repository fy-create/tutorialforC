---
layout: post
title:  "64. 最小路径和"
categories: arithmetic
---

[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum)

题目要求：

给定一个包含非负整数的 `m x n` 网格 `grid`，请找出一条从左上角到右下角的路径，使得路径上的数字总和最小。每次只能向下或向右移动。

### 示例：

**示例 1**：

输入：
```
grid = [
 [1,3,1],
 [1,5,1],
 [4,2,1]
]
```
输出：
```
7
```
解释：因为路径 1 → 3 → 1 → 1 → 1 最小。

**示例 2**：

输入：
```
grid = [
 [1,2,3],
 [4,5,6]
]
```
输出：
```
12
```
解释：因为路径 1 → 2 → 3 → 6 最小。

### 提示：
- 1 <= m, n <= 200
- 0 <= grid[i][j] <= 100

---

### 解题思路：

该问题可以用动态规划（Dynamic Programming, DP）来解决。我们需要通过状态转移方程来逐步计算每个格子的最小路径和。

1. **状态定义**：
   定义 `dp[i][j]` 为从起点 (0, 0) 到达 `(i, j)` 格子路径的最小和。

2. **状态转移方程**：
   - 每个格子只能从其左边 `(i, j-1)` 或者上方 `(i-1, j)` 过来。
   - `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`，其中 `grid[i][j]` 表示当前格子的值。
   - 边界条件：`dp[0][0] = grid[0][0]`，第一行只能从左边来，第一列只能从上面来。

3. **时间复杂度**：
   - 由于我们只遍历一次每个格子，时间复杂度是 `O(m * n)`，其中 `m` 和 `n` 分别是网格的行数和列数。

4. **空间复杂度**：
   - 如果使用额外的 `dp` 数组，空间复杂度是 `O(m * n)`。但也可以优化为 `O(n)`，通过只保存当前行的 `dp` 数组和上一行的 `dp` 数组。

---

### C语言解法：

```c
#include <stdio.h>
#include <stdlib.h>

#define MIN(x, y) ((x) < (y) ? (x) : (y))

int minPathSum(int** grid, int gridSize, int* gridColSize) {
    // 如果 grid 为空，则返回 0
    if (grid == NULL || gridSize == 0 || *gridColSize == 0) return 0;

    // 使用动态规划数组 dp 存储每个位置的最小路径和
    int m = gridSize;
    int n = *gridColSize;
    int dp[n];  // 只使用一维数组，节省空间

    // 初始化第一行的 dp 数组
    dp[0] = grid[0][0];
    for (int j = 1; j < n; j++) {
        dp[j] = dp[j - 1] + grid[0][j];
    }

    // 更新每行 dp 数组
    for (int i = 1; i < m; i++) {
        dp[0] += grid[i][0];  // 第一列只能从上面过来
        for (int j = 1; j < n; j++) {
            dp[j] = MIN(dp[j], dp[j - 1]) + grid[i][j];
        }
    }

    // 最后一个元素 dp[n-1] 就是答案
    return dp[n - 1];
}

int main() {
    int grid[3][3] = {
        {1, 3, 1},
        {1, 5, 1},
        {4, 2, 1}
    };
    int *gridPtr[3];
    for (int i = 0; i < 3; i++) {
        gridPtr[i] = grid[i];
    }

    int gridColSize = 3;
    int result = minPathSum(gridPtr, 3, &gridColSize);
    printf("Minimum Path Sum: %d\n", result);

    return 0;
}
```

### C++解法：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();

        // 使用一维数组 dp 来存储当前行的最小路径和
        vector<int> dp(n, 0);
        dp[0] = grid[0][0];

        // 初始化第一行
        for (int j = 1; j < n; ++j) {
            dp[j] = dp[j - 1] + grid[0][j];
        }

        // 更新每一行的最小路径和
        for (int i = 1; i < m; ++i) {
            dp[0] += grid[i][0]; // 第一列只能从上方过来
            for (int j = 1; j < n; ++j) {
                dp[j] = min(dp[j], dp[j - 1]) + grid[i][j];
            }
        }

        // 最终答案在 dp[n-1] 中
        return dp[n - 1];
    }
};

int main() {
    Solution solution;

    // 示例 1
    vector<vector<int>> grid1 = {
        {1, 3, 1},
        {1, 5, 1},
        {4, 2, 1}
    };
    cout << "Minimum Path Sum (Example 1): " << solution.minPathSum(grid1) << endl;

    // 示例 2
    vector<vector<int>> grid2 = {
        {1, 2, 3},
        {4, 5, 6}
    };
    cout << "Minimum Path Sum (Example 2): " << solution.minPathSum(grid2) << endl;

    return 0;
}
```

### 代码解释：

#### C语言解法：
1. 代码使用一个一维数组 `dp` 来存储每一列的最小路径和，只使用当前行和前一行的数据，从而优化了空间复杂度。
2. 我们首先初始化第一行的 `dp` 数组，因为第一行只能从左边过来。然后在后续的每一行更新 `dp` 数组。
3. 最终，`dp[n-1]` 存储了右下角格子的最小路径和。

#### C++解法：
1. 使用了 C++ 的 `vector` 来存储 `dp` 数组，`vector` 是一种动态数组，可以灵活地调整大小。
2. `dp` 数组用于存储当前行的最小路径和。在更新每一行时，首先更新第一列，然后更新每一列。
3. 通过 `min` 函数来取当前格子和上方格子的最小路径和。
4. 最终答案存储在 `dp[n-1]` 中。