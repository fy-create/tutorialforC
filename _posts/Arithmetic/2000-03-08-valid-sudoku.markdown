---
layout: post
title:  "36. 有效的数独"
categories: arithmetic
---

[36. 有效的数独](https://leetcode.cn/problems/valid-sudoku)

### 题目描述：
请你判断一个 `9 x 9` 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

1. 数字 `1-9` 在每一行只能出现一次。
2. 数字 `1-9` 在每一列只能出现一次。
3. 数字 `1-9` 在每一个以粗实线分隔的 `3x3` 宫内只能出现一次。

注意：
- 一个有效的数独（部分已被填充）不一定是可解的。
- 只需要根据以上规则，验证已经填入的数字是否有效。

**示例：**

**输入：**
```
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
```
**输出：** true

### 解题思路：

1. **检查行、列和子宫格：**
   - 使用三个布尔数组分别记录每一行、每一列和每一个 `3x3` 子宫格中数字 `1-9` 是否已出现。
   - 每个布尔数组的大小为 `9x9`。

2. **遍历数独：**
   - 对每个非空格字符：
     - 计算该字符在行、列和子宫格中的索引。
     - 检查对应的布尔数组，如果已存在返回 `false`。
     - 否则将该位置标记为 `true`。

3. **有效返回：**
   - 如果遍历完成没有冲突，则返回 `true`。

```c
#include <stdbool.h>
#include <stdio.h>

bool isValidSudoku(char** board, int boardSize, int* boardColSize) {
    bool rows[9][9] = {false};
    bool cols[9][9] = {false};
    bool boxes[9][9] = {false};

    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardColSize[i]; j++) {
            if (board[i][j] == '.') continue;
            int num = board[i][j] - '1'; // 将字符转为数字索引
            int boxIndex = (i / 3) * 3 + j / 3; // 计算所属子宫格索引

            if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
                return false; // 如果已经存在则无效
            }

            rows[i][num] = true;
            cols[j][num] = true;
            boxes[boxIndex][num] = true;
        }
    }

    return true;
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
    int boardColSize[9] = {9, 9, 9, 9, 9, 9, 9, 9, 9};

    printf("是否是有效的数独: %s\n", isValidSudoku(board, 9, boardColSize) ? "true" : "false");
    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool rows[9][9] = {false};
        bool cols[9][9] = {false};
        bool boxes[9][9] = {false};

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') continue;
                int num = board[i][j] - '1'; // 将字符转为数字索引
                int boxIndex = (i / 3) * 3 + j / 3; // 计算所属子宫格索引

                if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
                    return false; // 如果已经存在则无效
                }

                rows[i][num] = true;
                cols[j][num] = true;
                boxes[boxIndex][num] = true;
            }
        }

        return true;
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
    cout << "是否是有效的数独: " << (sol.isValidSudoku(board) ? "true" : "false") << endl;
    return 0;
}
```
