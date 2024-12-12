---
layout: post
title:  "52. N 皇后 II"
categories: arithmetic
---

[52. N 皇后 II](https://leetcode.cn/problems/n-queens-ii)

### 题目描述：
按照国际象棋规则，皇后可以攻击同一行、同一列和对角线上的棋子。

n 皇后问题即在 n×n 的棋盘上放置 n 个皇后，使它们不能互相攻击。

给你一个整数 n ，返回 n 皇后问题不同的解决方案的数量。

**示例：**

**输入：** n = 4

**输出：** 2

**解释：**
4 皇后问题存在如下两个不同的解决方案。

```
[
 [".Q..", "...Q", "Q...", "..Q."],
 ["..Q.", "Q...", "...Q", ".Q.."]
]
```

**提示：**
- 1 <= n <= 9

### 解题思路：

1. **回溯法**：
   - 回溯法是解决 n 皇后问题的经典方法。
   - 在每一行中尝试放置一个皇后，检查是否安全（即不在同一列或同一对角线）。
   - 如果安全，则继续尝试下一行；否则回退并尝试其他列。

2. **对角线判定**：
   - 主对角线：行索引与列索引之差相等（`row - col`）。
   - 副对角线：行索引与列索引之和相等（`row + col`）。

3. **结果存储**：
   - 只需计数，不需要存储具体解法。

4. **时间复杂度**：
   - 最坏情况下为 O(n!)，每个皇后有 n 种选择。

5. **空间复杂度**：
   - 空间复杂度为 O(n)，存储递归调用栈。

```c
#include <stdio.h>
#include <stdlib.h>

// 回溯函数，用于递归解决问题
void backtrack(int n, int row, int* cols, int* diag1, int* diag2, int* count) {
    if (row == n) { // 如果所有行都已放置皇后，找到一个解法
        (*count)++;
        return;
    }

    for (int col = 0; col < n; col++) {
        // 检查当前位置是否被列、主对角线、副对角线攻击
        if (cols[col] || diag1[row - col + n - 1] || diag2[row + col]) {
            continue;
        }

        // 放置皇后
        cols[col] = diag1[row - col + n - 1] = diag2[row + col] = 1;
        backtrack(n, row + 1, cols, diag1, diag2, count); // 递归到下一行
        // 回溯，撤销当前放置
        cols[col] = diag1[row - col + n - 1] = diag2[row + col] = 0;
    }
}

// 计算 N 皇后问题的总解法数
int totalNQueens(int n) {
    int* cols = (int*)calloc(n, sizeof(int));        // 标记列是否被攻击
    int* diag1 = (int*)calloc(2 * n - 1, sizeof(int)); // 标记主对角线是否被攻击
    int* diag2 = (int*)calloc(2 * n - 1, sizeof(int)); // 标记副对角线是否被攻击
    int count = 0;

    backtrack(n, 0, cols, diag1, diag2, &count);

    free(cols);
    free(diag1);
    free(diag2);

    return count;
}

int main() {
    int n = 4;
    printf("Total solutions for %d-Queens: %d\n", n, totalNQueens(n));
    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 回溯函数，用于递归解决问题
    void backtrack(int n, int row, vector<bool>& cols, vector<bool>& diag1, vector<bool>& diag2, int& count) {
        if (row == n) { // 如果所有行都已放置皇后，找到一个解法
            count++;
            return;
        }

        for (int col = 0; col < n; col++) {
            // 检查当前位置是否被列、主对角线、副对角线攻击
            if (cols[col] || diag1[row - col + n - 1] || diag2[row + col]) {
                continue;
            }

            // 放置皇后
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = true;
            backtrack(n, row + 1, cols, diag1, diag2, count); // 递归到下一行
            // 回溯，撤销当前放置
            cols[col] = diag1[row - col + n - 1] = diag2[row + col] = false;
        }
    }

    // 计算 N 皇后问题的总解法数
    int totalNQueens(int n) {
        vector<bool> cols(n, false);           // 标记列是否被攻击
        vector<bool> diag1(2 * n - 1, false); // 标记主对角线是否被攻击
        vector<bool> diag2(2 * n - 1, false); // 标记副对角线是否被攻击
        int count = 0;

        backtrack(n, 0, cols, diag1, diag2, count);
        return count;
    }
};

int main() {
    Solution sol;
    int n = 4;
    cout << "Total solutions for " << n << "-Queens: " << sol.totalNQueens(n) << endl;
    return 0;
}
```
