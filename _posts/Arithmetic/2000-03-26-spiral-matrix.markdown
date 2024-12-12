---
layout: post
title:  "54. 螺旋矩阵"
categories: arithmetic
---

[54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix)

### 题目描述：
给你一个 `m x n` 的矩阵 `matrix` ，请按照顺时针螺旋顺序，返回矩阵中的所有元素。

**示例：**

**输入：** matrix = [[1,2,3],[4,5,6],[7,8,9]]

**输出：** [1,2,3,6,9,8,7,4,5]

**输入：** matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]

**输出：** [1,2,3,4,8,12,11,10,9,5,6,7]

**提示：**
- `m == matrix.length`
- `n == matrix[i].length`
- 1 <= m, n <= 10
- -100 <= matrix[i][j] <= 100

### 解题思路：

1. **定义边界变量：**
   - 定义四个变量 `top`、`bottom`、`left`、`right` 分别表示矩阵的上边界、下边界、左边界和右边界。
   - 初始值分别为 `top = 0`，`bottom = m-1`，`left = 0`，`right = n-1`，表示矩阵的初始范围。

2. **顺时针遍历矩阵：**
   - **从左到右遍历上边界**：从 `left` 到 `right` 遍历第 `top` 行的所有元素，遍历完成后，将 `top` 下移（`top++`）。
   - **从上到下遍历右边界**：从 `top` 到 `bottom` 遍历第 `right` 列的所有元素，遍历完成后，将 `right` 左移（`right--`）。
   - **从右到左遍历下边界**（如果 `top <= bottom`）：从 `right` 到 `left` 遍历第 `bottom` 行的所有元素，遍历完成后，将 `bottom` 上移（`bottom--`）。
   - **从下到上遍历左边界**（如果 `left <= right`）：从 `bottom` 到 `top` 遍历第 `left` 列的所有元素，遍历完成后，将 `left` 右移（`left++`）。

3. **结束条件：**
   - 当 `top > bottom` 或 `left > right` 时，遍历结束。

4. **结果存储：**
   - 在遍历的过程中，将每个元素依次存入结果数组 `result` 中。

5. **时间复杂度：**
   - 每个元素最多被访问一次，因此时间复杂度为 O(m * n)，其中 m 和 n 分别是矩阵的行数和列数。

6. **空间复杂度：**
   - 结果数组 `result` 占用 O(m * n) 的空间，其他辅助变量占用 O(1) 的空间，因此总空间复杂度为 O(m * n)。

```c
#include <stdio.h>
#include <stdlib.h>

int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    int top = 0, bottom = matrixSize - 1; // 上下边界
    int left = 0, right = *matrixColSize - 1; // 左右边界
    int* result = (int*)malloc(matrixSize * (*matrixColSize) * sizeof(int));
    *returnSize = 0;

    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) { // 从左到右遍历上边界
            result[(*returnSize)++] = matrix[top][i];
        }
        top++;

        for (int i = top; i <= bottom; i++) { // 从上到下遍历右边界
            result[(*returnSize)++] = matrix[i][right];
        }
        right--;

        if (top <= bottom) { // 从右到左遍历下边界
            for (int i = right; i >= left; i--) {
                result[(*returnSize)++] = matrix[bottom][i];
            }
            bottom--;
        }

        if (left <= right) { // 从下到上遍历左边界
            for (int i = bottom; i >= top; i--) {
                result[(*returnSize)++] = matrix[i][left];
            }
            left++;
        }
    }

    return result;
}

int main() {
    int matrix[3][3] = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
    int* mat[3] = {matrix[0], matrix[1], matrix[2]};
    int matrixColSize = 3;
    int returnSize;
    int* result = spiralOrder(mat, 3, &matrixColSize, &returnSize);

    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");
    free(result);

    return 0;
}
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if (matrix.empty()) return result;

        int top = 0, bottom = matrix.size() - 1;       // 上下边界
        int left = 0, right = matrix[0].size() - 1;   // 左右边界

        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) { // 从左到右遍历上边界
                result.push_back(matrix[top][i]);
            }
            top++;

            for (int i = top; i <= bottom; i++) { // 从上到下遍历右边界
                result.push_back(matrix[i][right]);
            }
            right--;

            if (top <= bottom) { // 从右到左遍历下边界
                for (int i = right; i >= left; i--) {
                    result.push_back(matrix[bottom][i]);
                }
                bottom--;
            }

            if (left <= right) { // 从下到上遍历左边界
                for (int i = bottom; i >= top; i--) {
                    result.push_back(matrix[i][left]);
                }
                left++;
            }
        }

        return result;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> matrix = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
    vector<int> result = sol.spiralOrder(matrix);

    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```
