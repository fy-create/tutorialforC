---
layout: post
title:  "59. 螺旋矩阵 II"
categories: arithmetic
---

[59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii)

### 题目要求

**题目名称**: 螺旋矩阵 II

**题目描述**:  
给定一个正整数 `n`，生成一个包含 `1` 到 `n^2` 的 `n x n` 的矩阵，按照螺旋顺序填充数字。

**输入**:  
- 一个正整数 `n`，表示矩阵的大小，`1 <= n <= 20`。

**输出**:  
- 返回一个 `n x n` 的矩阵，按螺旋顺序填充数字。

**示例 1**:  
输入：`n = 3`  
输出：  
```
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]
```

**示例 2**:  
输入：`n = 1`  
输出：  
```
[
 [1]
]
```

**提示**:  
- `1 <= n <= 20`。

### 解题思路

1. **螺旋顺序填充**:  
   螺旋矩阵填充的过程可以分为四个方向：从左到右、从上到下、从右到左、从下到上。这四个方向不断循环，直到所有位置都被填充。

2. **模拟填充过程**:  
   - 我们维护四个边界：`top`、`bottom`、`left` 和 `right`，它们分别表示当前矩阵的上下左右边界。
   - 在每次填充后，根据填充方向更新相应的边界。例如，填充完一行后，`top` 边界上移；填充完一列后，`right` 边界左移。
   
3. **步骤**:
   - 初始化矩阵为一个 `n x n` 的二维数组，所有位置初始为 0。
   - 使用一个变量 `num` 从 1 开始，逐步填充到 `n^2`，并按照螺旋的顺序更新矩阵中的每个位置。
   - 根据当前的填充方向调整边界，直到所有的数字都被填充。

4. **时间复杂度**:  
   时间复杂度为 O(n^2)，因为我们要填充整个矩阵，矩阵有 `n^2` 个元素。

---

### C 语言解答

```c
#include <stdio.h>

void generateMatrix(int n) {
    int matrix[n][n];  // 创建一个 n x n 的矩阵
    int num = 1;  // 用于填充矩阵的数字
    int top = 0, bottom = n - 1, left = 0, right = n - 1;

    // 初始化矩阵为 0
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            matrix[i][j] = 0;
        }
    }

    // 填充矩阵
    while (top <= bottom && left <= right) {
        // 从左到右填充上边
        for (int i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;  // 上边界向下移动

        // 从上到下填充右边
        for (int i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;  // 右边界向左移动

        // 从右到左填充下边
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--;  // 下边界向上移动
        }

        // 从下到上填充左边
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;  // 左边界向右移动
        }
    }

    // 输出结果
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int n = 3;  // 示例输入
    generateMatrix(n);
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 生成螺旋矩阵
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n, 0));  // 创建 n x n 的矩阵，初始值为 0
        int num = 1;  // 填充矩阵的数字
        int top = 0, bottom = n - 1, left = 0, right = n - 1;

        // 填充矩阵
        while (top <= bottom && left <= right) {
            // 从左到右填充上边
            for (int i = left; i <= right; i++) {
                matrix[top][i] = num++;
            }
            top++;  // 上边界向下移动

            // 从上到下填充右边
            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = num++;
            }
            right--;  // 右边界向左移动

            // 从右到左填充下边
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    matrix[bottom][i] = num++;
                }
                bottom--;  // 下边界向上移动
            }

            // 从下到上填充左边
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    matrix[i][left] = num++;
                }
                left++;  // 左边界向右移动
            }
        }

        return matrix;
    }
};

int main() {
    Solution solution;
    int n = 3;  // 示例输入
    vector<vector<int>> result = solution.generateMatrix(n);

    // 输出结果
    for (const auto& row : result) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### 说明

1. **C语言解答**:
   - 我们首先定义了一个大小为 `n x n` 的矩阵 `matrix`，并初始化为 0。
   - 使用四个边界 (`top`, `bottom`, `left`, `right`) 控制螺旋矩阵的填充范围，按照螺旋顺序从上到下、从右到左、从下到上、从左到右逐步填充矩阵中的每个元素。
   - 每填充一条边时，更新相应的边界，以便在下一次循环时缩小填充区域。
   - 最后输出矩阵内容。

2. **C++解答**:
   - 使用 `vector<vector<int>>` 创建一个二维动态数组来存储矩阵。
   - 与 C 语言解法相同，使用四个边界来控制螺旋填充的范围。
   - 代码简洁且易于理解，利用 STL 容器动态管理矩阵和填充值。

两种语言的实现都使用了相同的算法，并且清晰地展示了螺旋顺序填充矩阵的过程。