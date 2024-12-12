---
layout: post
title:  "48. 旋转图像"
categories: arithmetic
---

[48. 旋转图像](https://leetcode.cn/problems/rotate-image)

## Rotate Image

**题目描述：**

给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

**示例：**


1. 输入: matrix = [[1,2,3],[4,5,6],[7,8,9]]
   输出: [[7,4,1],[8,5,2],[9,6,3]]

2. 输入: matrix = [[ 5, 1, 9,11],[ 2, 4, 8,10],[13, 3, 6, 7],[15,14,12,16]]
   输出: [[15,13, 2, 5],[14, 3, 4, 1],[12, 6, 8, 9],[16, 7,10,11]]


**提示：**

- n == matrix.length == matrix[i].length
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000

## 解题思路：

1. 先将矩阵转置，即将 matrix[i][j] 和 matrix[j][i] 交换。
2. 再将每一行进行反转，即将 matrix[i][j] 和 matrix[i][n-1-j] 交换。
3. 这样做可以实现矩阵的顺时针旋转 90 度。

## C 语言解答：

```c
#include <stdio.h>

void rotate(int** matrix, int matrixSize, int* matrixColSize){
    int n = matrixSize;

    // 转置矩阵
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // 反转每一行
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
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
    int* matrixColSize = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++) {
        matrixColSize[i] = n;
    }
    int** matrix = (int**)malloc(n * sizeof(int*));
    matrix[0] = (int[]) {1, 2, 3};
    matrix[1] = (int[]) {4, 5, 6};
    matrix[2] = (int[]) {7, 8, 9};

    printf("Original matrix:\n");
    printMatrix(matrix, n, matrixColSize);

    rotate(matrix, n, matrixColSize);

    printf("\nRotated matrix:\n");
    printMatrix(matrix, n, matrixColSize);

    free(matrixColSize);
    free(matrix);
    return 0;
}
```

**代码解析：**

1. 将矩阵进行转置，使 matrix[i][j] 变为 matrix[j][i]。
2. 将矩阵的每一行进行反转，使 matrix[i][j] 变为 matrix[i][n-1-j]。
3. 最终得到顺时针旋转 90 度后的矩阵。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 转置矩阵
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // 反转每一行
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};

void printMatrix(const vector<vector<int>>& matrix) {
    for (const auto& row : matrix) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
}

int main() {
    vector<vector<int>> matrix = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
    cout << "Original matrix:" << endl;
    printMatrix(matrix);

    Solution sol;
    sol.rotate(matrix);

    cout << "\nRotated matrix:" << endl;
    printMatrix(matrix);

    return 0;
}
```

**代码解析：**

1. 使用 `swap` 函数将矩阵进行转置，使 matrix[i][j] 变为 matrix[j][i]。
2. 使用 `reverse` 函数将矩阵的每一行进行反转，使 matrix[i][j] 变为 matrix[i][n-1-j]。
3. 最终得到顺时针旋转 90 度后的矩阵。