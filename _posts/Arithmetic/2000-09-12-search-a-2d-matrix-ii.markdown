---
layout: post
title:  "240. 搜索二维矩阵 II"
categories: arithmetic
---

[240. 搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii)

### 题目描述

编写一个高效的算法来搜索 `m x n` 矩阵中的一个目标值 `target`。该矩阵具有以下特性：

1. 每行的元素从左到右升序排列。
2. 每列的元素从上到下升序排列。

---

**示例 1：**

```
输入：matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 5
输出：true
```

**示例 2：**

```
输入：matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], target = 20
输出：false
```

---

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= n, m <= 300`
- `-10⁹ <= matrix[i][j] <= 10⁹`
- 每行的所有元素从左到右升序排列
- 每列的所有元素从上到下升序排列
- `-10⁹ <= target <= 10⁹`

---

### 解题思路

这是一道经典的二维矩阵搜索问题，通过以下方法可以高效解决：

1. **从右上角出发**：
   - 初始位置为矩阵的右上角 `(0, n-1)`。
   - 如果当前值大于目标值 `target`，说明目标值可能在左边，列索引减一。
   - 如果当前值小于目标值 `target`，说明目标值可能在下边，行索引加一。
   - 如果当前值等于目标值，直接返回 `true`。

2. **为什么从右上角开始**：
   - 右上角的值是当前行的最大值，同时是当前列的最小值。
   - 可以通过比较当前值和目标值快速缩小搜索范围。

3. **时间复杂度**：
   - 每次移动都会排除一行或一列，最多移动 `m + n` 次，因此时间复杂度为 O(m + n)。

4. **空间复杂度**：
   - 仅使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdbool.h>
#include <stdio.h>

// 搜索二维矩阵中的目标值
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    int rows = matrixSize;
    int cols = matrixColSize[0];
    int row = 0, col = cols - 1;

    while (row < rows && col >= 0) {
        if (matrix[row][col] == target) {
            return true; // 找到目标值
        } else if (matrix[row][col] > target) {
            col--; // 当前值大于目标值，左移
        } else {
            row++; // 当前值小于目标值，下移
        }
    }

    return false; // 未找到目标值
}

// 测试函数
int main() {
    int matrixData[5][5] = {
        {1, 4, 7, 11, 15},
        {2, 5, 8, 12, 19},
        {3, 6, 9, 16, 22},
        {10, 13, 14, 17, 24},
        {18, 21, 23, 26, 30}
    };

    int* matrix[5];
    for (int i = 0; i < 5; i++) {
        matrix[i] = matrixData[i];
    }

    int matrixColSize[5] = {5, 5, 5, 5, 5};
    int target = 5;

    if (searchMatrix(matrix, 5, matrixColSize, target)) {
        printf("目标值 %d 存在于矩阵中。\n", target);
    } else {
        printf("目标值 %d 不存在于矩阵中。\n", target);
    }

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
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int rows = matrix.size();
        int cols = matrix[0].size();
        int row = 0, col = cols - 1;

        while (row < rows && col >= 0) {
            if (matrix[row][col] == target) {
                return true; // 找到目标值
            } else if (matrix[row][col] > target) {
                col--; // 当前值大于目标值，左移
            } else {
                row++; // 当前值小于目标值，下移
            }
        }

        return false; // 未找到目标值
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<vector<int>> matrix = {
        {1, 4, 7, 11, 15},
        {2, 5, 8, 12, 19},
        {3, 6, 9, 16, 22},
        {10, 13, 14, 17, 24},
        {18, 21, 23, 26, 30}
    };

    int target = 5;

    if (sol.searchMatrix(matrix, target)) {
        cout << "目标值 " << target << " 存在于矩阵中。" << endl;
    } else {
        cout << "目标值 " << target << " 不存在于矩阵中。" << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **从右上角出发**：
   - 根据当前值与目标值的大小关系，快速决定移动方向。

2. **边界检查**：
   - 保证索引始终在矩阵范围内。

3. **时间复杂度**：
   - 每次移动都能排除一行或一列，最多移动 `m + n` 次，复杂度为 O(m + n)。

4. **空间复杂度**：
   - 仅使用常量额外空间，复杂度为 O(1)。