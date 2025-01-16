---
layout: post
title:  "221. 最大正方形"
categories: arithmetic
---

[221. 最大正方形](https://leetcode.cn/problems/maximal-square)

### 题目描述

在一个由 `'0'` 和 `'1'` 组成的二维矩阵中，找到只包含 `'1'` 的最大正方形，并返回其面积。

---

**示例 1：**

```
输入：matrix = [
    ["1","0","1","0","0"],
    ["1","0","1","1","1"],
    ["1","1","1","1","1"],
    ["1","0","0","1","0"]
]
输出：4
```

**示例 2：**

```
输入：matrix = [
    ["0","1"],
    ["1","0"]
]
输出：1
```

**示例 3：**

```
输入：matrix = [["0"]]
输出：0
```

---

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 300`
- `matrix[i][j]` 为 `'0'` 或 `'1'`

---

### 解题思路

动态规划（Dynamic Programming, DP）是解决此问题的高效方法：

1. **定义状态**：
   - 使用二维数组 `dp`，其中 `dp[i][j]` 表示以 `matrix[i][j]` 为右下角的最大正方形的边长。

2. **状态转移方程**：
   - 如果 `matrix[i][j] == '1'`，则：
     ```
     dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
     ```
   - 如果 `matrix[i][j] == '0'`，则：
     ```
     dp[i][j] = 0
     ```

3. **初始条件**：
   - 第一行和第一列的值等于 `matrix` 的对应值（转为整数）。

4. **目标值**：
   - 遍历整个 `dp` 数组，找到最大的边长，并返回其平方作为面积。

5. **时间复杂度**：
   - 遍历矩阵一次，时间复杂度为 O(m * n)。

6. **空间复杂度**：
   - 使用额外的二维数组 `dp`，空间复杂度为 O(m * n)。
   - 可优化为 O(n) 的空间复杂度。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 找到最大正方形的面积
int maximalSquare(char** matrix, int matrixSize, int* matrixColSize) {
    if (matrixSize == 0 || matrixColSize[0] == 0) {
        return 0;
    }

    int rows = matrixSize;
    int cols = matrixColSize[0];
    int** dp = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        dp[i] = (int*)calloc(cols, sizeof(int));
    }

    int maxSide = 0;

    // 遍历矩阵
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (matrix[i][j] == '1') {
                if (i == 0 || j == 0) {
                    dp[i][j] = 1; // 第一行或第一列
                } else {
                    dp[i][j] = fmin(fmin(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
                }
                maxSide = fmax(maxSide, dp[i][j]);
            }
        }
    }

    // 释放内存
    for (int i = 0; i < rows; i++) {
        free(dp[i]);
    }
    free(dp);

    return maxSide * maxSide;
}

// 测试函数
int main() {
    char* matrix[] = {
        "10100",
        "10111",
        "11111",
        "10010"
    };
    int matrixSize = 4;
    int matrixColSize[] = {5, 5, 5, 5};

    int result = maximalSquare(matrix, matrixSize, matrixColSize);
    printf("最大正方形面积: %d\n", result);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) {
            return 0;
        }

        int rows = matrix.size();
        int cols = matrix[0].size();
        vector<vector<int>> dp(rows, vector<int>(cols, 0));
        int maxSide = 0;

        // 遍历矩阵
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (matrix[i][j] == '1') {
                    if (i == 0 || j == 0) {
                        dp[i][j] = 1; // 第一行或第一列
                    } else {
                        dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;
                    }
                    maxSide = max(maxSide, dp[i][j]);
                }
            }
        }

        return maxSide * maxSide;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<vector<char>> matrix = {
        {'1', '0', '1', '0', '0'},
        {'1', '0', '1', '1', '1'},
        {'1', '1', '1', '1', '1'},
        {'1', '0', '0', '1', '0'}
    };

    cout << "最大正方形面积: " << sol.maximalSquare(matrix) << endl;
    return 0;
}
```

---

### 代码说明

1. **动态规划**：
   - 使用状态转移公式计算以每个位置为右下角的正方形最大边长。

2. **边界处理**：
   - 第一行和第一列直接等于 `matrix` 的值。

3. **时间复杂度**：
   - 遍历矩阵一次，时间复杂度为 O(m * n)。

4. **空间优化**：
   - 可优化为一维数组存储当前行和上一行的状态，降低空间复杂度为 O(n)。