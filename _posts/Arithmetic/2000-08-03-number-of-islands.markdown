---
layout: post
title:  "200. 岛屿数量"
categories: arithmetic
---

[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands)

### 题目描述

给你一个由 `'1'`（陆地）和 `'0'`（水）组成的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

**示例 1:**

```
输入:
[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出: 1
```

**示例 2:**

```
输入:
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出: 3
```

**提示:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` 的值为 `'0'` 或 `'1'`

---

### 解题思路

1. **深度优先搜索（DFS）**：
   - 遍历网格中的每个单元格，如果遇到 `'1'`，则从该单元格开始进行 DFS，标记所有与之相连的陆地单元格。
   - 每次 DFS 完成后，岛屿数量加 1。

2. **广度优先搜索（BFS）**：
   - 遍历网格中的每个单元格，如果遇到 `'1'`，则从该单元格开始进行 BFS，标记所有与之相连的陆地单元格。
   - 每次 BFS 完成后，岛屿数量加 1。

3. **优化**：
   - 在 DFS 或 BFS 过程中，将访问过的陆地单元格标记为 `'0'`，避免重复访问。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 深度优先搜索
void dfs(char** grid, int gridSize, int* gridColSize, int i, int j) {
    if (i < 0 || i >= gridSize || j < 0 || j >= gridColSize[i] || grid[i][j] == '0') {
        return;
    }

    // 标记当前单元格为已访问
    grid[i][j] = '0';

    // 递归访问上下左右四个方向
    dfs(grid, gridSize, gridColSize, i - 1, j);
    dfs(grid, gridSize, gridColSize, i + 1, j);
    dfs(grid, gridSize, gridColSize, i, j - 1);
    dfs(grid, gridSize, gridColSize, i, j + 1);
}

int numIslands(char** grid, int gridSize, int* gridColSize) {
    int count = 0;

    for (int i = 0; i < gridSize; i++) {
        for (int j = 0; j < gridColSize[i]; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, gridSize, gridColSize, i, j);
                count++;
            }
        }
    }

    return count;
}

int main() {
    char gridData[4][5] = {
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'}
    };
    int gridSize = 4;
    int gridColSize[4] = {5, 5, 5, 5};
    char* grid[4];
    for (int i = 0; i < gridSize; i++) {
        grid[i] = gridData[i];
    }

    int result = numIslands(grid, gridSize, gridColSize);
    printf("岛屿数量: %d\n", result); // 输出 1

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size();
        if (m == 0) return 0;
        int n = grid[0].size();

        int count = 0;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    dfs(grid, i, j);
                    count++;
                }
            }
        }

        return count;
    }

private:
    void dfs(vector<vector<char>>& grid, int i, int j) {
        int m = grid.size();
        int n = grid[0].size();

        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0') {
            return;
        }

        // 标记当前单元格为已访问
        grid[i][j] = '0';

        // 递归访问上下左右四个方向
        dfs(grid, i - 1, j);
        dfs(grid, i + 1, j);
        dfs(grid, i, j - 1);
        dfs(grid, i, j + 1);
    }
};

int main() {
    Solution solution;
    vector<vector<char>> grid = {
        {'1','1','1','1','0'},
        {'1','1','0','1','0'},
        {'1','1','0','0','0'},
        {'0','0','0','0','0'}
    };
    int result = solution.numIslands(grid);
    cout << "岛屿数量: " << result << endl; // 输出 1
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
[
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
```
#### 输出 1
```
1
```

#### 输入 2
```
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
```
#### 输出 2
```
3
```

---

### 复杂度分析

- **时间复杂度**：O(M * N)，其中 M 和 N 分别是网格的行数和列数。每个单元格最多被访问一次。
- **空间复杂度**：O(M * N)，用于递归调用栈（DFS）或队列（BFS）。

---

### 总结

通过 DFS 或 BFS 遍历网格中的每个单元格，我们可以高效地计算岛屿的数量。这种方法能够处理大规模数据，并确保结果的正确性。