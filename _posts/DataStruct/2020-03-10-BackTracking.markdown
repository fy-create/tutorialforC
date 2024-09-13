---
layout: post
title:  "回溯算法（Backtracking）"
categories: dataStruct
---

### 回溯算法（Backtracking）的概念和应用

#### 概念
**回溯算法（Backtracking）** 是一种通过 **递归** 和 **试探** 来寻找问题解的算法。回溯算法逐步构建问题的解，当发现不满足问题的约束条件时，就返回上一步（即 **回溯**），尝试其他可能的路径。回溯算法常用于解决搜索和组合类问题。

其核心思想是：
1. **构建解空间树**：逐步构建可能的解。
2. **试探**：检查当前部分解是否满足问题的约束条件。如果满足，则继续扩展，否则进行回溯。
3. **回溯**：当发现当前路径无法得出合法解时，撤销之前的选择，尝试其他分支。

#### 回溯算法的基本框架
```c
bool backtrack(参数) {
    if (满足结束条件) {
        处理解并返回;
    }
    
    for (选择 in 选择列表) {
        做出选择;
        backtrack(路径);  // 递归进行下一步选择
        撤销选择;  // 回溯，撤销之前的选择
    }
}
```

回溯算法的关键在于：
1. **选择**：在每一步中进行选择，逐步构建解。
2. **条件判断**：每次选择后判断当前部分解是否满足条件，如果不满足则回溯。
3. **撤销选择**：当发现当前路径不合适时，撤销之前的选择，尝试其他路径。

---

### 回溯算法的常见问题

#### 1. **N 皇后问题**

##### 问题描述：
**N 皇后问题** 是经典的回溯算法问题，要求在 `N × N` 的棋盘上放置 `N` 个皇后，使得每个皇后都不能与其他皇后在同一行、同一列或同一对角线上。

##### 解法思路：
1. **构建解空间**：棋盘上的每一行都放置一个皇后。
2. **回溯判断**：在每一行放置皇后时，检查是否与前面的皇后冲突（列和对角线）。
3. **递归解决**：当所有行都放置完皇后时，即找到一个解；否则继续放置下一行。

##### 代码实现（C语言）：
```c
#include <stdio.h>
#include <stdbool.h>
#define N 8

// 打印棋盘
void printSolution(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%c ", board[i][j] ? 'Q' : '.');
        }
        printf("\n");
    }
}

// 检查是否可以在棋盘的 row 行 col 列放置皇后
bool isSafe(int board[N][N], int row, int col) {
    // 检查列
    for (int i = 0; i < row; i++) {
        if (board[i][col]) {
            return false;
        }
    }

    // 检查左上对角线
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j]) {
            return false;
        }
    }

    // 检查右上对角线
    for (int i = row, j = col; i >= 0 && j < N; i--, j++) {
        if (board[i][j]) {
            return false;
        }
    }

    return true;
}

// 使用回溯解决 N 皇后问题
bool solveNQueensUtil(int board[N][N], int row) {
    if (row >= N) {
        return true;  // 如果所有皇后都放置完毕，返回 true
    }

    // 在当前行的每一列尝试放置皇后
    for (int col = 0; col < N; col++) {
        if (isSafe(board, row, col)) {
            board[row][col] = 1;  // 放置皇后

            if (solveNQueensUtil(board, row + 1)) {
                return true;  // 如果能成功放置所有皇后，返回 true
            }

            board[row][col] = 0;  // 回溯，撤销放置
        }
    }

    return false;  // 无法放置皇后，返回 false
}

// 解决 N 皇后问题
bool solveNQueens() {
    int board[N][N] = {0};  // 初始化棋盘

    if (solveNQueensUtil(board, 0)) {
        printSolution(board);  // 打印解法
        return true;
    } else {
        printf("Solution does not exist\n");
        return false;
    }
}

int main() {
    solveNQueens();  // 解决 8 皇后问题
    return 0;
}
```

#### 输出：
```
. Q . . . . . .
. . . Q . . . .
. . . . . Q . .
. . . . . . . Q
. . Q . . . . .
. . . . Q . . .
Q . . . . . . .
. . . . . . Q .
```

#### 解释：
- 该算法逐行放置皇后，并检查是否与之前的皇后冲突。如果发现冲突，则回溯到上一行，尝试其他列。
- 通过递归解决每一行的放置问题，直到找到一种合法的放置方法。

---

#### 2. **数独问题**

##### 问题描述：
**数独（Sudoku）** 是一种经典的填字游戏。给定一个 `9x9` 的棋盘，其中部分格子填有数字，要求填满所有空格，满足每行、每列、每个 `3x3` 的小方块中，数字 `1~9` 不重复。

##### 解法思路：
1. **构建解空间**：依次填充空白格。
2. **回溯判断**：每次放置数字时，检查行、列和小方块内是否已经有相同数字。
3. **递归解决**：尝试所有可能的数字，遇到冲突则回溯。

##### 代码实现（C语言）：
```c
#include <stdio.h>
#include <stdbool.h>

#define N 9

// 检查是否可以在 board[row][col] 放置 num
bool isSafe(int board[N][N], int row, int col, int num) {
    // 检查当前行和列
    for (int i = 0; i < N; i++) {
        if (board[row][i] == num || board[i][col] == num) {
            return false;
        }
    }

    // 检查 3x3 小方块
    int startRow = row - row % 3;
    int startCol = col - col % 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] == num) {
                return false;
            }
        }
    }

    return true;
}

// 使用回溯解决数独问题
bool solveSudoku(int board[N][N]) {
    int row, col;
    bool emptySpot = false;

    // 寻找未填数字的空格
    for (row = 0; row < N; row++) {
        for (col = 0; col < N; col++) {
            if (board[row][col] == 0) {
                emptySpot = true;
                break;
            }
        }
        if (emptySpot) break;
    }

    // 如果没有空格，则数独已解决
    if (!emptySpot) return true;

    // 尝试放置数字 1~9
    for (int num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true;  // 递归填充下一个空格
            }

            board[row][col] = 0;  // 回溯，撤销放置
        }
    }

    return false;  // 无法找到合适的数字，返回 false
}

// 打印数独棋盘
void printSudoku(int board[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            printf("%d ", board[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int board[N][N] = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9}
    };

    if (solveSudoku(board)) {
        printSudoku(board);
    } else {
        printf("No solution exists\n");
    }

    return 0;
}
```

#### 输出：
```
5 3 4 6 7 8 9 1 2 
6 7 2 1 9 5 3 4 8 
1 9 8 3 4 2 5 6 7 
8 5 9 7 6 1 4 2 3 
4 2 6 8 5 3 7 9 1 
7 1 3 9 2 4 8 5 6 
9 6 1 5 3 7 2 8 4 
2 8 7 4 1 9 6 3 5 
3 4 5 2 8 6 1 7 9 
```

#### 解释：
- 该算法逐个空格尝试填入数字 `1~9`，并检查是否与数独规则冲突。如果出现冲突，则回溯，撤销上一步操作并尝试其他数字。

---

#### 3. **排列组合问题**

##### 问题描述：
给定一个数组，要求生成它的所有 **排列** 或 **组合**。在回溯算法中，利用递归生成所有可能的排列或组合。

##### 解法思路：
1. **构建解空间**：逐步生成排列或组合。
2. **递归解决**：生成当前解后，递归生成下一步。
3. **回溯判断**：当解不合法或已经生成完全时，进行回溯。

##### 生成全排列的代码实现（C语言）：
```c
#include <stdio.h>

// 交换两个数
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 打印数组
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// 使用回溯生成所有排列
void permute(int arr[], int left, int right) {
    if (left == right) {
        printArray(arr, right + 1);  // 输出排列
    } else {
        for (int i = left; i <= right; i++) {
            swap(&arr[left], &arr[i]);  // 选择当前元素作为开头
            permute(arr, left + 1, right);  // 递归生成剩余排列
            swap(&arr[left], &arr[i]);  // 回溯，撤销选择
        }
    }
}

int main() {
    int arr[] = {1, 2, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    permute(arr, 0, n - 1);  // 生成所有排列
    return 0;
}
```

#### 输出：
```
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 2 1 
3 1 2 
```

#### 解释：
- 该算法通过交换数组中的元素生成所有排列，并在递归过程中尝试所有可能的选择。

---

### 总结

- **回溯算法（Backtracking）** 是一种通过逐步构建解并在发现不满足条件时回溯的算法。它特别适用于解决组合、排列、路径搜索等问题。
- 常见的 **回溯算法问题** 包括 **N 皇后问题**、**数独**、**排列组合问题**，这些问题都具有明显的试探和回溯的特点。
- 回溯算法通常通过递归实现，并且在每一步尝试不同的选择，如果发现某种选择不满足问题的约束条件，则回溯到上一层并尝试其他选择。