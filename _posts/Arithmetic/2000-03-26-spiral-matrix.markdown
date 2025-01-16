---
layout: post
title:  "54. 螺旋矩阵"
categories: arithmetic
---

[54. 螺旋矩阵](https://leetcode.cn/problems/spiral-matrix)

### 题目描述

给定一个 `m x n` 的矩阵，按照顺时针螺旋顺序，返回矩阵中的所有元素。

---

**示例 1：**

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

**示例 2：**

```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

---

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

---

### 解题思路

螺旋遍历矩阵需要按以下顺序进行操作：
1. **定义边界**：
   - 定义矩阵的上边界、下边界、左边界和右边界，分别为 `top`、`bottom`、`left` 和 `right`。
   - 初始值：`top = 0`，`bottom = m - 1`，`left = 0`，`right = n - 1`。

2. **按顺时针方向遍历**：
   - 从左到右遍历上边界，之后上边界向下移动。
   - 从上到下遍历右边界，之后右边界向左移动。
   - 从右到左遍历下边界，之后下边界向上移动（仅在 `top <= bottom` 时）。
   - 从下到上遍历左边界，之后左边界向右移动（仅在 `left <= right` 时）。

3. **终止条件**：
   - 当 `top > bottom` 或 `left > right` 时结束。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 螺旋顺序遍历矩阵
int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    if (matrixSize == 0 || matrixColSize == NULL) {
        *returnSize = 0;
        return NULL;
    }

    int m = matrixSize;       // 行数
    int n = *matrixColSize;   // 列数
    int* result = (int*)malloc(sizeof(int) * (m * n));
    *returnSize = 0;

    int top = 0, bottom = m - 1, left = 0, right = n - 1;

    while (top <= bottom && left <= right) {
        // 从左到右遍历上边界
        for (int i = left; i <= right; i++) {
            result[(*returnSize)++] = matrix[top][i];
        }
        top++; // 上边界向下移动

        // 从上到下遍历右边界
        for (int i = top; i <= bottom; i++) {
            result[(*returnSize)++] = matrix[i][right];
        }
        right--; // 右边界向左移动

        // 从右到左遍历下边界
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                result[(*returnSize)++] = matrix[bottom][i];
            }
            bottom--; // 下边界向上移动
        }

        // 从下到上遍历左边界
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                result[(*returnSize)++] = matrix[i][left];
            }
            left++; // 左边界向右移动
        }
    }

    return result;
}

// 测试函数
int main() {
    int matrix[3][3] = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
    int* matrixPtrs[3] = {matrix[0], matrix[1], matrix[2]};
    int colSize = 3;
    int returnSize;

    int* result = spiralOrder(matrixPtrs, 3, &colSize, &returnSize);

    printf("螺旋顺序输出: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result);
    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> result;
        if (matrix.empty() || matrix[0].empty()) {
            return result;
        }

        int m = matrix.size();    // 行数
        int n = matrix[0].size(); // 列数
        int top = 0, bottom = m - 1, left = 0, right = n - 1;

        while (top <= bottom && left <= right) {
            // 从左到右遍历上边界
            for (int i = left; i <= right; i++) {
                result.push_back(matrix[top][i]);
            }
            top++; // 上边界向下移动

            // 从上到下遍历右边界
            for (int i = top; i <= bottom; i++) {
                result.push_back(matrix[i][right]);
            }
            right--; // 右边界向左移动

            // 从右到左遍历下边界
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    result.push_back(matrix[bottom][i]);
                }
                bottom--; // 下边界向上移动
            }

            // 从下到上遍历左边界
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    result.push_back(matrix[i][left]);
                }
                left++; // 左边界向右移动
            }
        }

        return result;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<vector<int>> matrix = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };

    vector<int> result = sol.spiralOrder(matrix);

    cout << "螺旋顺序输出: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **边界移动逻辑**：
   - 上边界 `top` 向下移动：`top++`
   - 下边界 `bottom` 向上移动：`bottom--`
   - 左边界 `left` 向右移动：`left++`
   - 右边界 `right` 向左移动：`right--`

2. **终止条件**：
   - 当 `top > bottom` 或 `left > right` 时，表示所有元素已经遍历完毕，循环结束。

3. **时间复杂度**：
   - 每个元素被访问一次，时间复杂度为 O(m × n)。

4. **空间复杂度**：
   - 结果数组占用 O(m × n) 空间，符合题目要求。