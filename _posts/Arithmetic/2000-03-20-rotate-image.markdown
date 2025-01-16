---
layout: post
title:  "48. 旋转图像"
categories: arithmetic
---

[48. 旋转图像](https://leetcode.cn/problems/rotate-image)

## 题目要求

### 描述：
给定一个 `n x n` 的二维矩阵 `matrix` ，表示一个图像。你需要将这个图像顺时针旋转 90 度。

**注意：**

- 你必须在原地旋转图像，即不能使用额外的矩阵空间。
  
### 示例：

**示例 1：**
```text
输入:
matrix = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

输出:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
```

**示例 2：**
```text
输入:
matrix = [
  [5,1,9,11],
  [2,4,8,10],
  [13,3,6,7],
  [15,14,12,16]
]

输出:
[
  [15,13,2,5],
  [14,3,4,1],
  [12,6,8,9],
  [16,7,10,11]
]
```

### 提示：
- `n == matrix.length == matrix[i].length`
- `1 <= n <= 20`
- `0 <= matrix[i][j] <= 100`

## 解题思路

### 思路：
我们可以通过分步的方式完成矩阵的旋转，分为两个步骤：
1. **矩阵的转置**：将矩阵的行和列进行交换，矩阵的第 `i` 行和第 `j` 列的元素交换位置，即 `matrix[i][j]` 与 `matrix[j][i]` 互换。
2. **水平翻转**：在完成转置之后，对矩阵的每一行进行水平翻转（交换每一行的元素）。

这两步结合起来，就能够将矩阵顺时针旋转 90 度。

**过程分析**：
- 通过转置，原矩阵中的第 `i` 行变成了第 `i` 列，接着通过水平翻转，我们就能得到一个顺时针旋转 90 度的结果。
  
### C语言解答

```c
#include <stdio.h>

void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    // 步骤 1: 矩阵转置
    for (int i = 0; i < matrixSize; i++) {
        for (int j = i + 1; j < matrixSize; j++) {
            // 交换 matrix[i][j] 和 matrix[j][i]
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }

    // 步骤 2: 水平翻转
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < matrixSize / 2; j++) {
            // 交换 matrix[i][j] 和 matrix[i][matrixSize - j - 1]
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][matrixSize - j - 1];
            matrix[i][matrixSize - j - 1] = temp;
        }
    }
}

int main() {
    int matrix[3][3] = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    int matrixSize = 3;
    int matrixColSize = 3;
    int* matrixPointer[3] = {matrix[0], matrix[1], matrix[2]};
    
    rotate(matrixPointer, matrixSize, &matrixColSize);

    // 输出旋转后的矩阵
    for (int i = 0; i < matrixSize; i++) {
        for (int j = 0; j < matrixColSize; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        
        // 步骤 1: 矩阵转置
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // 交换 matrix[i][j] 和 matrix[j][i]
                swap(matrix[i][j], matrix[j][i]);
            }
        }

        // 步骤 2: 水平翻转
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                // 交换 matrix[i][j] 和 matrix[i][n - j - 1]
                swap(matrix[i][j], matrix[i][n - j - 1]);
            }
        }
    }
};

int main() {
    Solution solution;
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    solution.rotate(matrix);

    // 输出旋转后的矩阵
    for (const auto& row : matrix) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### 代码解析

#### C语言解答：
1. **转置步骤**：
   - 通过双重循环交换 `matrix[i][j]` 和 `matrix[j][i]`，将矩阵进行转置。
2. **水平翻转步骤**：
   - 对每一行，交换该行的左右两侧元素，完成水平翻转。
   
3. **`main` 函数**：
   - 创建并初始化矩阵，调用 `rotate` 函数进行旋转，并输出旋转后的矩阵。

#### C++ 解答：
1. **转置步骤**：
   - 使用双重循环进行矩阵的转置，交换 `matrix[i][j]` 和 `matrix[j][i]`。
2. **水平翻转步骤**：
   - 对每一行，交换该行的左右两侧元素，完成水平翻转。

3. **`main` 函数**：
   - 创建并初始化矩阵，调用 `rotate` 函数进行旋转，并输出旋转后的矩阵。

### 时间复杂度：
- **时间复杂度**：O(n^2)，其中 n 是矩阵的维度。由于需要对每个元素进行两次操作（转置和翻转），因此时间复杂度为 O(n^2)。
- **空间复杂度**：O(1)。题目要求在原地进行旋转，因此我们没有使用额外的空间，除了常数级的空间用于循环计数。

### 小结：
该题通过转置和水平翻转的两步操作，能够高效地将矩阵顺时针旋转 90 度。我们利用回溯算法在原地完成旋转，符合题目对空间复杂度的要求。