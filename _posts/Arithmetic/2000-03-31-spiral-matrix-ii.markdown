---
layout: post
title:  "59. 螺旋矩阵 II"
categories: arithmetic
---

[59. 螺旋矩阵 II](https://leetcode.cn/problems/spiral-matrix-ii)

## Spiral Matrix II

**题目描述：**

给你一个正整数 `n` ，生成一个包含 `1` 到 `n^2` 所有元素，且元素按顺时针顺序螺旋排列的 `n x n` 正方形矩阵 matrix 。

**示例：**

1. 输入: n = 3
   输出: 
   \[
   [
     [1,2,3],
     [8,9,4],
     [7,6,5]
   ]
   \]

2. 输入: n = 1
   输出: 
   \[
   [1]
   \]

**提示：**

- `1 <= n <= 20`

## 解题思路：

1. 初始化一个 `n x n` 的矩阵 `matrix`，并将所有元素初始化为 0。
2. 使用四个变量 `top`、`bottom`、`left` 和 `right` 分别表示矩阵当前未填充部分的边界，初始时 `top` 和 `left` 为 0，`bottom` 和 `right` 为 `n-1`。
3. 初始化一个计数器 `num` 从 1 到 `n^2`。
4. 在填充矩阵时，根据当前边界移动并调整边界，使得填充顺序为：从左到右 -> 从上到下 -> 从右到左 -> 从下到上。
5. 重复上述步骤，直到所有元素都被填充到矩阵中。

## C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 创建螺旋矩阵函数
int** generateMatrix(int n, int* returnSize, int** returnColumnSizes) {
    *returnSize = n;
    *returnColumnSizes = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        (*returnColumnSizes)[i] = n;
    }

    int** matrix = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) {
        matrix[i] = (int*)malloc(n * sizeof(int));
    }

    int top = 0, bottom = n - 1;
    int left = 0, right = n - 1;
    int num = 1;

    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) {
            matrix[top][i] = num++;
        }
        top++;

        for (int i = top; i <= bottom; i++) {
            matrix[i][right] = num++;
        }
        right--;

        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                matrix[bottom][i] = num++;
            }
            bottom--;
        }

        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                matrix[i][left] = num++;
            }
            left++;
        }
    }

    return matrix;
}

void printMatrix(int** matrix, int matrixSize, int* matrixColSize) {
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < matrixColSize[i]; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int n = 3;
    int returnSize;
    int* returnColumnSizes;
    int** matrix = generateMatrix(n, &returnSize, &returnColumnSizes);

    printf("Generated Matrix:\n");
    printMatrix(matrix, returnSize, returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        free(matrix[i]);
    }
    free(matrix);
    free(returnColumnSizes);
    return 0;
}
```

**代码解析：**

1. 使用辅助函数 `generateMatrix` 创建并填充螺旋矩阵。
2. 使用四个变量 `top`、`bottom`、`left` 和 `right` 表示当前未填充部分的边界。
3. 在填充矩阵时，根据当前边界移动并调整边界。
4. 将填充的元素按顺序存储在 `matrix` 中，最终返回该数组。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector<vector<int>> matrix(n, vector<int>(n));
        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;
        int num = 1;

        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) {
                matrix[top][i] = num++;
            }
            top++;

            for (int i = top; i <= bottom; i++) {
                matrix[i][right] = num++;
            }
            right--;

            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    matrix[bottom][i] = num++;
                }
                bottom--;
            }

            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    matrix[i][left] = num++;
                }
                left++;
            }
        }

        return matrix;
    }
};

int main() {
    Solution sol;
    int n = 3;
    vector<vector<int>> matrix = sol.generateMatrix(n);

    cout << "Generated Matrix:" << endl;
    for (const auto& row : matrix) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```