---
layout: post
title:  "130. 被围绕的区域"
categories: arithmetic
---

[130. 被围绕的区域](https://leetcode.cn/problems/surrounded-regions)

### 题目描述

[LeetCode 原题链接 - 被围绕的区域](https://leetcode.cn/problems/surrounded-regions)

给定一个二维的矩阵，包含 `'X'` 和 `'O'`（字母 O）。

找到所有被 `'X'` 围绕的区域，并将这些区域里所有的 `'O'` 用 `'X'` 填充。

---

#### 示例 1：
```
输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
解释：
被围绕的区域不会存在于边界上，换句话说，任何边界上的 `'O'` 都不会被填充为 `'X'`。 任何不在边界上，或不与边界上的 `'O'` 相连的 `'O'` 最终都会被填充为 `'X'`。 如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
```

---

#### 提示：
1. `m == board.length`
2. `n == board[i].length`
3. `1 <= m, n <= 200`
4. `board[i][j]` 为 `'X'` 或 `'O'`

---

### 解题思路

该问题可以归结为寻找所有边界上 `'O'` 以及与边界 `'O'` 相连的区域。具体步骤如下：

1. **标记边界区域：**
   - 遍历矩阵的四条边（上下左右），找到所有的 `'O'`，并通过深度优先搜索（DFS）或广度优先搜索（BFS）标记所有与边界相连的 `'O'`。

2. **遍历矩阵并修改：**
   - 遍历整个矩阵：
     - 如果当前字符为标记的特殊符号（例如 `'#'`），恢复为 `'O'`。
     - 如果当前字符为 `'O'`（未标记），则修改为 `'X'`。

3. **时间复杂度：**
   - 遍历矩阵进行标记和修改，总体时间复杂度为 \(O(m \times n)\)。

---

### C语言实现

#### 函数原型
```c
void solve(char** board, int boardSize, int* boardColSize);
```

#### 完整代码
```c
#include <stdio.h>
#include <stdlib.h>

// 深度优先搜索（DFS）标记边界及其相连的 'O'
void dfs(char** board, int row, int col, int boardSize, int* boardColSize) {
    if (row < 0 || row >= boardSize || col < 0 || col >= boardColSize[row] || board[row][col] != 'O') {
        return;
    }
    board[row][col] = '#'; // 标记为特殊符号
    dfs(board, row - 1, col, boardSize, boardColSize);
    dfs(board, row + 1, col, boardSize, boardColSize);
    dfs(board, row, col - 1, boardSize, boardColSize);
    dfs(board, row, col + 1, boardSize, boardColSize);
}

// 主函数
void solve(char** board, int boardSize, int* boardColSize) {
    if (boardSize == 0) return;

    // 遍历边界并标记与边界相连的 'O'
    for (int i = 0; i < boardSize; ++i) {
        dfs(board, i, 0, boardSize, boardColSize); // 左边界
        dfs(board, i, boardColSize[i] - 1, boardSize, boardColSize); // 右边界
    }
    for (int j = 0; j < boardColSize[0]; ++j) {
        dfs(board, 0, j, boardSize, boardColSize); // 上边界
        dfs(board, boardSize - 1, j, boardSize, boardColSize); // 下边界
    }

    // 遍历矩阵进行修改
    for (int i = 0; i < boardSize; ++i) {
        for (int j = 0; j < boardColSize[i]; ++j) {
            if (board[i][j] == 'O') {
                board[i][j] = 'X'; // 未标记的 'O' 修改为 'X'
            } else if (board[i][j] == '#') {
                board[i][j] = 'O'; // 恢复被标记的 'O'
            }
        }
    }
}

// 测试函数
int main() {
    int rows = 4;
    int cols = 4;
    char* board[] = {
        "XXXX",
        "XOOX",
        "XXOX",
        "XOXX"
    };
    int boardColSize[] = {4, 4, 4, 4};

    solve(board, rows, boardColSize);

    printf("结果矩阵：\n");
    for (int i = 0; i < rows; ++i) {
        printf("%s\n", board[i]);
    }
    return 0;
}
```

---

### C++ 实现

#### 类定义
```cpp
#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size();
        if (m == 0) return;
        int n = board[0].size();

        // Lambda表达式实现DFS
        auto dfs = [&](int x, int y, auto&& dfs_ref) -> void {
            if (x < 0 || x >= m || y < 0 || y >= n || board[x][y] != 'O') return;
            board[x][y] = '#'; // 标记为特殊字符
            dfs_ref(x - 1, y, dfs_ref);
            dfs_ref(x + 1, y, dfs_ref);
            dfs_ref(x, y - 1, dfs_ref);
            dfs_ref(x, y + 1, dfs_ref);
        };

        // 遍历边界并标记
        for (int i = 0; i < m; ++i) {
            dfs(i, 0, dfs);
            dfs(i, n - 1, dfs);
        }
        for (int j = 0; j < n; ++j) {
            dfs(0, j, dfs);
            dfs(m - 1, j, dfs);
        }

        // 遍历矩阵进行修改
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X'; // 未标记的 'O' 修改为 'X'
                } else if (board[i][j] == '#') {
                    board[i][j] = 'O'; // 恢复标记的 'O'
                }
            }
        }
    }
};

int main() {
    vector<vector<char>> board = {
        {'X', 'X', 'X', 'X'},
        {'X', 'O', 'O', 'X'},
        {'X', 'X', 'O', 'X'},
        {'X', 'O', 'X', 'X'}
    };

    Solution sol;
    sol.solve(board);

    cout << "结果矩阵：" << endl;
    for (const auto& row : board) {
        for (const auto& c : row) {
            cout << c << " ";
        }
        cout << endl;
    }

    return 0;
}
```

这段代码展示了如何用 C 和 C++ 实现 "被围绕的区域" 问题，并包含详细注释及调用示例。如果有任何问题，欢迎继续讨论！