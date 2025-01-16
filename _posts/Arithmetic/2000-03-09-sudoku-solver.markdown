---
layout: post
title:  "37. 解数独"
categories: arithmetic
---

[37. 解数独](https://leetcode.cn/problems/sudoku-solver)

### 题目描述

编写一个程序，通过填充空格来解决数独问题。

数独的解法需遵循如下规则：

1. 数字 1-9 在每一行只能出现一次。
2. 数字 1-9 在每一列只能出现一次。
3. 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

数独部分空格内已填入了数字，空白格用 `'.'` 表示。

---

**示例：**

输入：
```
board = [
  ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
]
```

输出：
```
[
  ['5', '3', '4', '6', '7', '8', '9', '1', '2'],
  ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
  ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
  ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
  ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
  ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
  ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
  ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
  ['3', '4', '5', '2', '8', '6', '1', '7', '9']
]
```

---

**提示：**

- `board.length == 9`
- `board[i].length == 9`
- `board[i][j]` 是一位数字或者 `'.'`
- 题目数据保证输入数独仅有一个解

---

### 解题思路

解决数独问题使用**回溯法**，逐个尝试空白位置的填入数字，并检查其有效性。如果发现冲突，回溯到上一个状态继续尝试。

1. **递归和回溯：**
   - 找到空白位置（即 `'.'`）。
   - 尝试填入数字 `1` 至 `9`。
   - 检查数字是否在当前行、列和 3x3 宫内重复。
   - 如果数字有效，则递归处理下一个空白位置。
   - 如果所有数字都不符合，回溯到上一个状态继续尝试。

2. **终止条件：**
   - 当所有空白位置都填满时，返回成功。
   - 如果在某一步骤所有数字均不合法，返回失败。

3. **复杂度分析：**
   - 每个空白格最多尝试 9 个数字，整体复杂度取决于空白位置的数量。

---

### C语言实现

```c
#include <stdio.h>
#include <stdbool.h>

#define SIZE 9

// 检查在 board[row][col] 位置填入 num 是否有效
bool isValid(char **board, int row, int col, char num) {
    for (int i = 0; i < SIZE; i++) {
        // 检查行
        if (board[row][i] == num) return false;
        // 检查列
        if (board[i][col] == num) return false;
        // 检查 3x3 宫
        int boxRow = 3 * (row / 3) + i / 3;
        int boxCol = 3 * (col / 3) + i % 3;
        if (board[boxRow][boxCol] == num) return false;
    }
    return true;
}

// 回溯解决数独
bool backtrack(char **board, int boardSize) {
    for (int row = 0; row < boardSize; row++) {
        for (int col = 0; col < boardSize; col++) {
            if (board[row][col] == '.') {
                // 尝试填入数字 '1' 到 '9'
                for (char num = '1'; num <= '9'; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        // 递归解决下一个空白格
                        if (backtrack(board, boardSize)) return true;
                        // 回溯
                        board[row][col] = '.';
                    }
                }
                return false; // 如果没有数字可填，返回 false
            }
        }
    }
    return true; // 如果没有空白格，说明数独已解决
}

// 解决数独问题的主函数
void solveSudoku(char **board, int boardSize, int *boardColSize) {
    backtrack(board, boardSize);
}

// 打印数独棋盘
void printBoard(char **board, int boardSize) {
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardSize; j++) {
            printf("%c ", board[i][j]);
        }
        printf("\n");
    }
}

// 测试函数
int main() {
    char *board[] = {
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

    int boardSize = SIZE;
    int boardColSize = SIZE;

    printf("输入的数独棋盘:\n");
    printBoard(board, boardSize);

    solveSudoku(board, boardSize, &boardColSize);

    printf("\n解决后的数独棋盘:\n");
    printBoard(board, boardSize);

    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void solveSudoku(vector<vector<char>>& board) {
        backtrack(board);
    }

private:
    bool isValid(vector<vector<char>>& board, int row, int col, char num) {
        for (int i = 0; i < 9; i++) {
            // 检查行
            if (board[row][i] == num) return false;
            // 检查列
            if (board[i][col] == num) return false;
            // 检查 3x3 宫
            int boxRow = 3 * (row / 3) + i / 3;
            int boxCol = 3 * (col / 3) + i % 3;
            if (board[boxRow][boxCol] == num) return false;
        }
        return true;
    }

    bool backtrack(vector<vector<char>>& board) {
        for (int row = 0; row < 9; row++) {
            for (int col = 0; col < 9; col++) {
                if (board[row][col] == '.') {
                    // 尝试填入数字 '1' 到 '9'
                    for (char num = '1'; num <= '9'; num++) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;
                            // 递归解决下一个空白格
                            if (backtrack(board)) return true;
                            // 回溯
                            board[row][col] = '.';
                        }
                    }
                    return false; // 如果没有数字可填，返回 false
                }
            }
        }
        return true; // 如果没有空白格，说明数独已解决
    }
};

// 打印数独棋盘
void printBoard(const vector<vector<char>>& board) {
    for (const auto& row : board) {
        for (char cell : row) {
            cout << cell << " ";
        }
        cout << endl;
    }
}

// 测试函数
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

    cout << "输入的数独棋盘:" << endl;
    printBoard(board);

    Solution solution;
    solution.solveSudoku(board);

    cout << "\n解决后的数独棋盘:" << endl;
    printBoard(board);

    return 0;
}
```