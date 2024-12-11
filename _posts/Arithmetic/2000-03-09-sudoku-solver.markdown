---
layout: post
title:  "37. 解数独"
categories: arithmetic
---

[37. 解数独](https://leetcode.cn/problems/sudoku-solver)

### 题目描述：
编写一个程序，通过填充空格来解决数独问题。

数独的解法需 遵循如下规则：

1. 数字 1-9 在每一行只能出现一次。
2. 数字 1-9 在每一列只能出现一次。
3. 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）

空白格用 '.' 表示。

**示例：**
```
输入：
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]

输出：
[
  ["5","3","4","6","7","8","9","1","2"],
  ["6","7","2","1","9","5","3","4","8"],
  ["1","9","8","3","4","2","5","6","7"],
  ["8","5","9","7","6","1","4","2","3"],
  ["4","2","6","8","5","3","7","9","1"],
  ["7","1","3","9","2","4","8","5","6"],
  ["9","6","1","5","3","7","2","8","4"],
  ["2","8","7","4","1","9","6","3","5"],
  ["3","4","5","2","8","6","1","7","9"]
]
```
### 解题思路：

1. **回溯法**：
   - 遍历数独中的每个格子，尝试填入数字 1 到 9。
   - 检查是否满足行、列、3x3 宫的约束条件。
   - 如果满足条件，递归处理下一个格子；如果不满足条件，回溯。

2. **实现细节**：
   - 使用辅助函数 `isValid` 检查当前填入的数字是否合法。
   - 使用递归函数 `solve` 进行回溯。

3. **时间复杂度**：
   - 最坏情况下为 O(9^(n^2))，其中 n 是数独的大小（通常为 9）。

4. **空间复杂度**：
   - 递归深度为 n^2，空间复杂度为 O(n^2)。

```c
#include <stdbool.h>
#include <stdio.h>

bool isValid(char** board, int row, int col, char num) {
    for (int i = 0; i < 9; i++) {
        // 检查行和列
        if (board[row][i] == num || board[i][col] == num) {
            return false;
        }
        // 检查 3x3 宫格
        if (board[row / 3 * 3 + i / 3][col / 3 * 3 + i % 3] == num) {
            return false;
        }
    }
    return true;
}

bool solve(char** board) {
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == '.') {
                for (char num = '1'; num <= '9'; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solve(board)) {
                            return true;
                        }
                        board[row][col] = '.'; // 回溯
                    }
                }
                return false; // 无法填充合法数字
            }
        }
    }
    return true;
}

void solveSudoku(char** board, int boardSize, int* boardColSize) {
    solve(board);
}

int main() {
    char* board[9] = {
        "53..7....",
        "6..195...",
        ".98....6.",
        "8...6...3",
        "4..8.3..1",
        "7...2...6",
        ".6....28.",
        "...419..5",
        "....8..79"
    };
    int boardColSize = 9;

    solveSudoku(board, 9, &boardColSize);

    printf("Solved Sudoku:\n");
    for (int i = 0; i < 9; i++) {
        printf("%s\n", board[i]);
    }

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool isValid(vector<vector<char>>& board, int row, int col, char num) {
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num || board[i][col] == num ||
                board[row / 3 * 3 + i / 3][col / 3 * 3 + i % 3] == num) {
                return false;
            }
        }
        return true;
    }

    bool solve(vector<vector<char>>& board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    for (char num = '1'; num <= '9'; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) {
                                return true;
                            }
                            board[row][col] = '.'; // 回溯
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};

int main() {
    vector<vector<char>> board = {
        {'5', '3', '.', '.', '7', '.', '.', '.', '.'},
        {'6', '.', '.', '1', '9', '5', '.', '.', '.'},
        {'.', '9', '8', '.', '.', '.', '.', '6', '.'},
        {'8', '.', '.', '.', '6', '.', '.', '.', '3'},
        {'4', '.', '.', '8', '.', '3', '.', '.', '1'},
        {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
        {'.', '6', '.', '.', '.', '.', '2', '8', '.'},
        {'.', '.', '.', '4', '1', '9', '.', '.', '5'},
        {'.', '.', '.', '.', '8', '.', '.', '7', '9'}
    };

    Solution sol;
    sol.solveSudoku(board);

    for (const auto& row : board) {
        for (char cell : row) {
            cout << cell << " ";
        }
        cout << endl;
    }

    return 0;
}
```
