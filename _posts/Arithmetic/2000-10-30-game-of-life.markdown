---
layout: post
title:  "289. 生命游戏"
categories: arithmetic
---

[289. 生命游戏](https://leetcode.cn/problems/game-of-life)

### 题目描述

给定一个 `m x n` 的二维数组 `board`，表示一个细胞面板。每个细胞的状态用一个整数表示：
- `1` 表示活细胞，
- `0` 表示死细胞。

每个细胞的下一个状态由其周围的 8 个细胞的当前状态决定（水平、垂直和对角线）。具体规则如下：

1. **活细胞的规则：**
   - 如果活细胞周围的活细胞数少于 2 个，则该细胞死亡（模拟人口不足）。
   - 如果活细胞周围的活细胞数为 2 个或 3 个，则该细胞继续存活。
   - 如果活细胞周围的活细胞数超过 3 个，则该细胞死亡（模拟人口过剩）。

2. **死细胞的规则：**
   - 如果死细胞周围的活细胞数恰好为 3 个，则该细胞复活（模拟繁殖）。

**注意：**
- 面板是无限的，所有边缘的细胞也被视为有 8 个邻居。
- 你需要原地修改面板，即直接修改输入的 `board`，而不是返回一个新的面板。

**示例 1:**

```
输入: board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
输出: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
```

**示例 2:**

```
输入: board = [[1,1],[1,0]]
输出: [[1,1],[1,1]]
```

**提示：**
- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 25`
- `board[i][j]` 为 `0` 或 `1`

---

### 解题思路

这是一个典型的模拟问题。我们需要根据当前细胞的状态和周围细胞的状态，计算下一个状态。为了原地修改面板，可以使用额外的状态标记：

1. **状态标记：**
   - 使用 `2` 表示从死细胞变为活细胞。
   - 使用 `-1` 表示从活细胞变为死细胞。

2. **遍历面板：**
   - 遍历每个细胞，统计其周围 8 个细胞的活细胞数。
   - 根据规则更新细胞的状态。

3. **更新面板：**
   - 再次遍历面板，将标记的状态转换为最终状态（`2` 变为 `1`，`-1` 变为 `0`）。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数：统计细胞周围的活细胞数
int countLiveNeighbors(int** board, int boardSize, int* boardColSize, int row, int col) {
    int liveCount = 0;
    for (int i = row - 1; i <= row + 1; i++) {
        for (int j = col - 1; j <= col + 1; j++) {
            if (i == row && j == col) continue; // 跳过自身
            if (i >= 0 && i < boardSize && j >= 0 && j < boardColSize[0] && (board[i][j] == 1 || board[i][j] == -1)) {
                liveCount++;
            }
        }
    }
    return liveCount;
}

// 主函数：更新细胞状态
void gameOfLife(int** board, int boardSize, int* boardColSize) {
    if (boardSize == 0 || boardColSize[0] == 0) return;

    // 第一遍遍历：标记细胞的下一个状态
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardColSize[i]; j++) {
            int liveNeighbors = countLiveNeighbors(board, boardSize, boardColSize, i, j);

            if (board[i][j] == 1) {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    board[i][j] = -1; // 活细胞死亡
                }
            } else {
                if (liveNeighbors == 3) {
                    board[i][j] = 2; // 死细胞复活
                }
            }
        }
    }

    // 第二遍遍历：更新细胞状态
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardColSize[i]; j++) {
            if (board[i][j] == 2) {
                board[i][j] = 1;
            } else if (board[i][j] == -1) {
                board[i][j] = 0;
            }
        }
    }
}

// 测试代码
int main() {
    int boardSize = 4;
    int boardColSize[] = {3, 3, 3, 3};
    int board[4][3] = { {0, 1, 0}, {0, 0, 1}, {1, 1, 1}, {0, 0, 0}};

    int* boardPtr[4];
    for (int i = 0; i < 4; i++) {
        boardPtr[i] = board[i];
    }

    gameOfLife(boardPtr, boardSize, boardColSize);

    printf("更新后的细胞面板:\n");
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardColSize[i]; j++) {
            printf("%d ", board[i][j]);
        }
        printf("\n");
    }

    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int m = board.size();
        if (m == 0) return;
        int n = board[0].size();

        // 第一遍遍历：标记细胞的下一个状态
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int liveNeighbors = countLiveNeighbors(board, i, j);

                if (board[i][j] == 1) {
                    if (liveNeighbors < 2 || liveNeighbors > 3) {
                        board[i][j] = -1; // 活细胞死亡
                    }
                } else {
                    if (liveNeighbors == 3) {
                        board[i][j] = 2; // 死细胞复活
                    }
                }
            }
        }

        // 第二遍遍历：更新细胞状态
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 2) {
                    board[i][j] = 1;
                } else if (board[i][j] == -1) {
                    board[i][j] = 0;
                }
            }
        }
    }

private:
    int countLiveNeighbors(const vector<vector<int>>& board, int row, int col) {
        int liveCount = 0;
        for (int i = row - 1; i <= row + 1; i++) {
            for (int j = col - 1; j <= col + 1; j++) {
                if (i == row && j == col) continue; // 跳过自身
                if (i >= 0 && i < board.size() && j >= 0 && j < board[0].size() && (board[i][j] == 1 || board[i][j] == -1)) {
                    liveCount++;
                }
            }
        }
        return liveCount;
    }
};

// 测试代码
int main() {
    vector<vector<int>> board = { {0, 1, 0}, {0, 0, 1}, {1, 1, 1}, {0, 0, 0}};
    Solution solution;
    solution.gameOfLife(board);

    cout << "更新后的细胞面板:" << endl;
    for (const auto& row : board) {
        for (int cell : row) {
            cout << cell << " ";
        }
        cout << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用辅助函数 `countLiveNeighbors` 统计每个细胞周围的活细胞数。
   - 使用状态标记 `2` 和 `-1` 表示细胞的下一个状态。
   - 时间复杂度为 O(m * n)，空间复杂度为 O(1)。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 存储细胞面板。
   - 利用辅助函数 `countLiveNeighbors` 统计活细胞数。
   - 代码简洁高效，符合 C++ 编程风格。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地模拟细胞生命游戏的演化过程。