---
layout: post
title:  "52. N 皇后 II"
categories: arithmetic
---

[52. N 皇后 II](https://leetcode.cn/problems/n-queens-ii)

## 题目要求

### 描述：
n 皇后问题是一个经典的回溯算法问题，给定一个整数 `n`，要求在 `n x n` 的棋盘上放置 `n` 个皇后，使得它们不能互相攻击。

皇后攻击规则：
- 同一行的两个皇后互相攻击。
- 同一列的两个皇后互相攻击。
- 同一对角线的两个皇后互相攻击。

本题要求返回所有不同的 `n` 皇后问题的解法的个数。

### 示例：

**示例 1：**
```text
输入: n = 4
输出: 2
解释: 4 皇后的两种解法如下：
[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
```

**示例 2：**
```text
输入: n = 1
输出: 1
```

### 提示：
- 1 <= n <= 9

### 解题思路

#### 1. **问题分析：**
   - 我们的任务是计算一个 `n x n` 的棋盘上放置 `n` 个皇后，使得它们互不攻击。皇后之间不能在同一行、同一列或同一对角线。
   - 该问题是典型的回溯问题，因为可以尝试放置一个皇后，然后递归处理下一个皇后，检查每次尝试是否符合要求。

#### 2. **回溯算法的核心：**
   - 每一行放置一个皇后，尝试不同的列位置。
   - 需要用三个条件来判断当前位置是否可以放置皇后：
     - 当前列是否有皇后。
     - 当前主对角线是否有皇后。
     - 当前副对角线是否有皇后。
   - 使用 `set` 或 `bool` 数组来跟踪列和对角线上的占用情况。

#### 3. **回溯过程：**
   - 从第一行开始，尝试将皇后放置到每一列上。
   - 对于每一列，检查它是否安全（没有其他皇后攻击）。如果安全，则递归尝试放置下一个皇后。
   - 如果成功放置到最后一行，说明找到一个解。
   - 如果不能放置，就撤销当前的选择，并尝试下一个可能的位置。

#### 4. **代码设计：**
   - `cols` 数组用于标记每一列是否已经有皇后。
   - `diag1` 和 `diag2` 数组分别用于标记主对角线和副对角线是否有皇后。

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>

int count = 0;

// 判断当前位置是否安全
bool isSafe(int row, int col, bool* cols, bool* diag1, bool* diag2, int n) {
    return !cols[col] && !diag1[row - col + n - 1] && !diag2[row + col];
}

// 放置皇后并递归
void solveNQueens(int row, bool* cols, bool* diag1, bool* diag2, int n) {
    if (row == n) {
        count++;  // 找到一个解
        return;
    }
    
    for (int col = 0; col < n; col++) {
        if (isSafe(row, col, cols, diag1, diag2, n)) {
            // 做出选择
            cols[col] = true;
            diag1[row - col + n - 1] = true;
            diag2[row + col] = true;
            
            // 递归
            solveNQueens(row + 1, cols, diag1, diag2, n);
            
            // 撤销选择
            cols[col] = false;
            diag1[row - col + n - 1] = false;
            diag2[row + col] = false;
        }
    }
}

int totalNQueens(int n) {
    bool cols[n], diag1[2 * n - 1], diag2[2 * n - 1];
    
    // 初始化标记数组
    for (int i = 0; i < n; i++) {
        cols[i] = false;
    }
    for (int i = 0; i < 2 * n - 1; i++) {
        diag1[i] = false;
        diag2[i] = false;
    }
    
    count = 0;
    solveNQueens(0, cols, diag1, diag2, n);
    return count;
}

int main() {
    int n = 4;
    printf("Total solutions for n=%d: %d\n", n, totalNQueens(n));  // 输出 2
    
    n = 1;
    printf("Total solutions for n=%d: %d\n", n, totalNQueens(n));  // 输出 1
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <set>
using namespace std;

class Solution {
public:
    int count = 0;

    // 判断当前位置是否安全
    bool isSafe(int row, int col, vector<bool>& cols, vector<bool>& diag1, vector<bool>& diag2, int n) {
        return !cols[col] && !diag1[row - col + n - 1] && !diag2[row + col];
    }

    // 放置皇后并递归
    void solveNQueens(int row, vector<bool>& cols, vector<bool>& diag1, vector<bool>& diag2, int n) {
        if (row == n) {
            count++;  // 找到一个解
            return;
        }

        for (int col = 0; col < n; col++) {
            if (isSafe(row, col, cols, diag1, diag2, n)) {
                // 做出选择
                cols[col] = true;
                diag1[row - col + n - 1] = true;
                diag2[row + col] = true;

                // 递归
                solveNQueens(row + 1, cols, diag1, diag2, n);

                // 撤销选择
                cols[col] = false;
                diag1[row - col + n - 1] = false;
                diag2[row + col] = false;
            }
        }
    }

    int totalNQueens(int n) {
        vector<bool> cols(n, false);
        vector<bool> diag1(2 * n - 1, false);
        vector<bool> diag2(2 * n - 1, false);
        
        count = 0;
        solveNQueens(0, cols, diag1, diag2, n);
        return count;
    }
};

int main() {
    Solution solution;

    int n = 4;
    cout << "Total solutions for n=" << n << ": " << solution.totalNQueens(n) << endl;  // 输出 2

    n = 1;
    cout << "Total solutions for n=" << n << ": " << solution.totalNQueens(n) << endl;  // 输出 1

    return 0;
}
```

### 代码解析

#### C语言解答：
1. **回溯过程：**
   - 使用一个递归函数 `solveNQueens` 来放置皇后，并通过判断每个位置的安全性来决定是否放置。
   - 用 `cols`、`diag1`、`diag2` 数组来记录当前列和对角线的占用情况。
   
2. **安全性检查：**
   - `isSafe` 函数用来检查当前行和列是否可以放置皇后。如果没有在同一列或对角线，返回 `true`，表示可以放置皇后。

3. **计数：**
   - 每当成功放置一个皇后，并且递归到最后一行时，表示找到一个解，就将 `count` 增加。

#### C++ 解答：
1. **数据结构：**
   - 使用 `vector<bool>` 来存储列和对角线的占用情况。
   - 回溯过程与 C 语言实现类似。

2. **递归调用：**
   - 使用递归的方式，逐行放置皇后。
   - 判断当前是否安全后，进行递归调用，若到达最后一行，表示成功找到解。

### 时间复杂度：
- 时间复杂度：O(n!)，因为我们需要为每一行尝试每一个可能的列，最坏情况下每一行都需要尝试所有列位置。
- 空间复杂度：O(n)，主要用于存储列和对角线的占用情况。

### 小结：
- 该问题是典型的回溯问题，通过逐行放置皇后，并通过判断安全性来确保每一步都符合条件。回溯算法能够高效地找到所有解。