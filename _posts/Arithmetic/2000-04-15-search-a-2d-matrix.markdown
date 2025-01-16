---
layout: post
title:  "74. 搜索二维矩阵"
categories: arithmetic
---

[74. 搜索二维矩阵](https://leetcode.cn/problems/search-a-2d-matrix)

### 题目描述

编写一个高效的算法来判断 `m x n` 矩阵中，是否存在一个目标值 `target`。该矩阵具有以下特性：

- 每行中的整数从左到右按升序排列。
- 每行的第一个整数大于前一行的最后一个整数。

---

**示例 1：**

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
输出：true
```

**示例 2：**

```
输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
输出：false
```

---

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-10⁴ <= matrix[i][j], target <= 10⁴`

---

### 解题思路

由于矩阵的每行每列均按升序排列，可以将矩阵视为一个从左到右、从上到下的排序数组。我们可以使用 **二分查找** 来快速定位目标值。

**具体步骤：**

1. **将矩阵映射到一维数组的索引：**
   - 假设矩阵为 `matrix[m][n]`，总共有 `m * n` 个元素。
   - 一维索引 `mid` 在矩阵中的行列可以通过以下方式计算：
     ```
     row = mid / n
     col = mid % n
     ```
   - 这样可以在矩阵上执行类似一维数组的二分查找。

2. **初始化左右边界：**
   - 左边界 `left = 0`，右边界 `right = m * n - 1`。

3. **进行二分查找：**
   - 计算中间索引 `mid = left + (right - left) / 2`。
   - 根据 `matrix[mid / n][mid % n]` 与目标值的大小关系，更新左右边界。
   - 如果找到了目标值，返回 `true`。

4. **终止条件：**
   - 如果 `left > right`，表示目标值不存在，返回 `false`。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdbool.h>

// 在二维矩阵中查找目标值
bool searchMatrix(int** matrix, int matrixSize, int* matrixColSize, int target) {
    int m = matrixSize;       // 行数
    int n = *matrixColSize;   // 列数
    int left = 0;
    int right = m * n - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        int midValue = matrix[mid / n][mid % n]; // 映射到矩阵中的值

        if (midValue == target) {
            return true;
        } else if (midValue < target) {
            left = mid + 1; // 搜索右半部分
        } else {
            right = mid - 1; // 搜索左半部分
        }
    }

    return false;
}

// 测试函数
int main() {
    int matrix[3][4] = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };
    int* matrixPtrs[3] = {matrix[0], matrix[1], matrix[2]};
    int colSize = 4;

    int target = 3;
    if (searchMatrix(matrixPtrs, 3, &colSize, target)) {
        printf("Target %d found in matrix.\n", target);
    } else {
        printf("Target %d not found in matrix.\n", target);
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
        int m = matrix.size();    // 行数
        int n = matrix[0].size(); // 列数
        int left = 0;
        int right = m * n - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            int midValue = matrix[mid / n][mid % n]; // 映射到矩阵中的值

            if (midValue == target) {
                return true;
            } else if (midValue < target) {
                left = mid + 1; // 搜索右半部分
            } else {
                right = mid - 1; // 搜索左半部分
            }
        }

        return false;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<vector<int>> matrix = {
        {1, 3, 5, 7},
        {10, 11, 16, 20},
        {23, 30, 34, 60}
    };

    int target = 3;
    if (sol.searchMatrix(matrix, target)) {
        cout << "Target " << target << " found in matrix." << endl;
    } else {
        cout << "Target " << target << " not found in matrix." << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **映射技巧**：
   - 将二维矩阵的元素映射到一维数组中，索引公式为：
     ```
     row = mid / n
     col = mid % n
     ```

2. **时间复杂度**：
   - 每次查找的搜索空间减半，总共最多执行 O(log(m * n)) 次查找。

3. **空间复杂度**：
   - 使用常量空间，空间复杂度为 O(1)。