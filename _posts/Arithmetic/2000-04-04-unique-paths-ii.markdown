---
layout: post
title:  "63. 不同路径 II"
categories: arithmetic
---

[63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii)

### 题目要求

**题目名称**: 不同路径 II

**题目描述**:  
一个机器人位于一个 `m x n` 的网格的左上角（起始点 `(0, 0)`）。机器人每次只能向下或者向右移动一步。现在给定一个包含障碍物的网格，计算机器人到达右下角的不同路径的数量。

障碍物和空位置分别用 1 和 0 来表示。

**输入**:  
- 一个二维网格 `obstacleGrid`，其中每个元素的值为 0 或 1，表示该位置是否有障碍物。

**输出**:  
- 返回从左上角到右下角的不同路径的数量。  
- 只要存在障碍物的地方，机器人不能经过该点。

**示例 1**:  
输入:  
`obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]`  
输出:  
`2`  
解释:  
3x3 网格中有两条不同的路径，且都避开了中间的障碍物。

**示例 2**:  
输入:  
`obstacleGrid = [[0,1,0],[0,1,0],[0,0,0]]`  
输出:  
`0`  
解释:  
在这种情况下，机器人无法到达右下角，因为中间两行有障碍物。

**提示**:  
- `m == obstacleGrid.length`  
- `n == obstacleGrid[i].length`  
- `1 <= m, n <= 100`  
- `obstacleGrid[i][j]` 为 `0` 或 `1`。

### 解题思路

1. **动态规划**:
   - 这是一个典型的动态规划问题。我们可以定义 `dp[i][j]` 表示从 `(0,0)` 到达 `(i,j)` 的不同路径数。
   - 初始条件：
     - `dp[0][0] = 1`，因为起始点本身的路径数是 1。
     - 如果某个格子有障碍物，那么该格子的路径数应该是 0，因为机器人无法通过这个点。
   - 递推公式：
     - 对于每一个没有障碍物的格子 `(i, j)`，它的路径数是由它上面 `(i-1, j)` 和左边 `(i, j-1)` 的路径数之和：
       ```
       dp[i][j] = dp[i-1][j] + dp[i][j-1]  (若该点没有障碍物)
       ```
   - 注意：由于路径只能从上面或者左边到达，因此对第一行和第一列的特殊处理：
     - 如果第一行或者第一列的某个位置有障碍物，那么该行或该列后续的所有位置都无法到达。

2. **空间优化**:
   - 可以使用一个一维数组来代替二维数组。由于每一行的状态只依赖于上一行的状态，我们可以通过在每一行更新当前行的值，使用一维数组来存储当前行的路径数。

3. **时间复杂度**:
   - 时间复杂度为 O(m * n)，其中 `m` 是行数，`n` 是列数。
   - 空间复杂度为 O(n)，我们优化了空间，仅使用一维数组来存储当前行的路径数。

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 计算不同路径数的函数
int uniquePathsWithObstacles(int** obstacleGrid, int m, int n) {
    // 创建一个长度为n的一维数组，存储当前行的路径数
    int* dp = (int*)malloc(sizeof(int) * n);

    // 初始化第一行的路径数
    for (int i = 0; i < n; i++) {
        if (obstacleGrid[0][i] == 1) {
            dp[i] = 0;  // 如果第一行有障碍物，路径数为0
        } else {
            dp[i] = (i == 0) ? 1 : dp[i - 1];  // 第一行路径数是从左到右累加
        }
    }

    // 从第二行开始进行动态规划
    for (int i = 1; i < m; i++) {
        // 对每一行进行处理
        for (int j = 0; j < n; j++) {
            if (obstacleGrid[i][j] == 1) {
                dp[j] = 0;  // 如果当前格子有障碍物，路径数为0
            } else if (j > 0) {
                dp[j] += dp[j - 1];  // 累加上方和左方的路径数
            }
        }
    }

    // 返回最后一个位置的路径数
    int result = dp[n - 1];
    free(dp);  // 释放动态分配的内存
    return result;
}

int main() {
    int m = 3, n = 3;
    int obstacleGrid[3][3] = { {0,0,0},{0,1,0},{0,0,0}};
    
    // 将二维数组的指针传递给函数
    int** grid = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) {
        grid[i] = (int*)malloc(n * sizeof(int));
        for (int j = 0; j < n; j++) {
            grid[i][j] = obstacleGrid[i][j];
        }
    }

    printf("Unique paths with obstacles: %d\n", uniquePathsWithObstacles(grid, m, n));

    // 释放动态分配的内存
    for (int i = 0; i < m; i++) {
        free(grid[i]);
    }
    free(grid);
    
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 计算不同路径数的函数
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        
        // 创建一个长度为n的一维数组，存储当前行的路径数
        vector<int> dp(n, 0);

        // 初始化第一行的路径数
        for (int i = 0; i < n; i++) {
            if (obstacleGrid[0][i] == 1) {
                dp[i] = 0;  // 如果第一行有障碍物，路径数为0
            } else {
                dp[i] = (i == 0) ? 1 : dp[i - 1];  // 第一行路径数是从左到右累加
            }
        }

        // 从第二行开始进行动态规划
        for (int i = 1; i < m; i++) {
            // 对每一行进行处理
            for (int j = 0; j < n; j++) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0;  // 如果当前格子有障碍物，路径数为0
                } else if (j > 0) {
                    dp[j] += dp[j - 1];  // 累加上方和左方的路径数
                }
            }
        }

        // 返回最后一个位置的路径数
        return dp[n - 1];
    }
};

int main() {
    Solution solution;
    vector<vector<int>> obstacleGrid = { {0,0,0},{0,1,0},{0,0,0}};
    cout << "Unique paths with obstacles: " << solution.uniquePathsWithObstacles(obstacleGrid) << endl;
    return 0;
}
```

### 说明

1. **C语言解答**:
   - 我们使用动态规划的方法，维护一个一维数组 `dp` 来存储当前行的路径数。
   - 对于每一行，如果有障碍物，将当前格子的路径数设为 0，否则累加上方和左方的路径数。
   - 最终返回 `dp[n-1]`，即右下角的路径数。

2. **C++解答**:
   - 使用 `vector<int>` 来表示路径数数组，初始为 0。
   - 同样根据动态规划的原则，逐行更新路径数，考虑障碍物的影响。

3. **空间优化**:
   - 由于我们只需要前一行的路径数，因此可以使用一维数组来代替二维数组，从而节省空间。

这两种解法都使用了动态规划，并且优化了空间复杂度，通过使用一维数组来存储路径数，保证了代码的效率和简洁性。