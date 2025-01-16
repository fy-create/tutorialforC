---
layout: post
title:  "73. 矩阵置零"
categories: arithmetic
---

[73. 矩阵置零](https://leetcode.cn/problems/set-matrix-zeroes)

### 题目描述

给定一个 `m x n` 的矩阵，如果一个元素是 `0`，则将其所在的行和列的所有元素都设为 `0`。请使用**原地**算法。

**示例 1：**

```
输入：
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
输出：
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

**示例 2：**

```
输入：
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
输出：
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

**提示：**

- `m == matrix.length`
- `n == matrix[0].length`
- `1 <= m, n <= 200`
- `-2³¹ <= matrix[i][j] <= 2³¹ - 1`

**进阶：**

- 一个直接的解决方案是使用 `O(mn)` 的额外空间，但这并不满足原地算法的要求。
- 一个简单的改进方案是使用 `O(m + n)` 的额外空间，但这仍不是最佳的解决方案。
- 你能想出一个仅使用常量额外空间的解决方案吗？

### 解题思路

要将矩阵中所有为 `0` 的元素所在的行和列全部置为 `0`，且要求使用原地算法（即不使用额外的存储空间），我们需要巧妙地利用矩阵本身来记录需要置零的行和列。

**步骤如下：**

1. **初始化标志变量：**
   - 使用两个布尔变量 `firstRowHasZero` 和 `firstColHasZero` 来分别标记第一行和第一列是否包含 `0`。
   
2. **遍历第一行和第一列：**
   - 检查第一行是否包含 `0`，如果有，设置 `firstRowHasZero` 为 `true`。
   - 检查第一列是否包含 `0`，如果有，设置 `firstColHasZero` 为 `true`。
   
3. **使用第一行和第一列作为标记：**
   - 遍历矩阵的其余部分（不包括第一行和第一列）。
   - 如果 `matrix[i][j]` 为 `0`，则将 `matrix[i][0]` 和 `matrix[0][j]` 设置为 `0`，表示第 `i` 行和第 `j` 列需要被置为 `0`。
   
4. **根据标记置零：**
   - 遍历第一行和第一列之外的所有元素。
   - 如果 `matrix[i][0]` 或 `matrix[0][j]` 为 `0`，则将 `matrix[i][j]` 置为 `0`。
   
5. **最后处理第一行和第一列：**
   - 如果 `firstRowHasZero` 为 `true`，则将第一行所有元素置为 `0`。
   - 如果 `firstColHasZero` 为 `true`，则将第一列所有元素置为 `0`。

这种方法的关键在于利用第一行和第一列来存储哪些行和列需要被置为 `0`，从而避免使用额外的空间。最终的时间复杂度为 `O(mn)`，空间复杂度为 `O(1)`。

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>

// 函数原型：将矩阵中的0所在的行和列置为0
void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    bool firstRowHasZero = false;
    bool firstColHasZero = false;
    
    // 检查第一行是否有0
    for(int j = 0; j < matrixColSize[0]; j++) {
        if(matrix[0][j] == 0) {
            firstRowHasZero = true;
            break;
        }
    }
    
    // 检查第一列是否有0
    for(int i = 0; i < matrixSize; i++) {
        if(matrix[i][0] == 0) {
            firstColHasZero = true;
            break;
        }
    }
    
    // 使用第一行和第一列作为标记
    for(int i = 1; i < matrixSize; i++) {
        for(int j = 1; j < matrixColSize[i]; j++) {
            if(matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    // 根据标记将对应的单元格置为0
    for(int i = 1; i < matrixSize; i++) {
        for(int j = 1; j < matrixColSize[i]; j++) {
            if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // 如果第一行有0，则将第一行全部置为0
    if(firstRowHasZero) {
        for(int j = 0; j < matrixColSize[0]; j++) {
            matrix[0][j] = 0;
        }
    }
    
    // 如果第一列有0，则将第一列全部置为0
    if(firstColHasZero) {
        for(int i = 0; i < matrixSize; i++) {
            matrix[i][0] = 0;
        }
    }
}

// 简单的主函数调用示例
int main() {
    // 示例矩阵
    int matrixData[3][3] = {
        {1, 1, 1},
        {1, 0, 1},
        {1, 1, 1}
    };
    
    // 指针数组
    int* matrix[3];
    for(int i = 0; i < 3; i++) {
        matrix[i] = matrixData[i];
    }
    
    int matrixSize = 3;
    int matrixColSize[3] = {3, 3, 3};
    
    // 调用函数
    setZeroes(matrix, matrixSize, matrixColSize);
    
    // 打印结果
    printf("结果矩阵为：\n");
    for(int i = 0; i < matrixSize; i++) {
        for(int j = 0; j < matrixColSize[i]; j++) {
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
    // 函数原型：将矩阵中的0所在的行和列置为0
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size();
        if(m == 0) return;
        int n = matrix[0].size();
        
        bool firstRowHasZero = false;
        bool firstColHasZero = false;
        
        // 检查第一行是否有0
        for(int j = 0; j < n; j++) {
            if(matrix[0][j] == 0) {
                firstRowHasZero = true;
                break;
            }
        }
        
        // 检查第一列是否有0
        for(int i = 0; i < m; i++) {
            if(matrix[i][0] == 0) {
                firstColHasZero = true;
                break;
            }
        }
        
        // 使用第一行和第一列作为标记
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                if(matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        
        // 根据标记将对应的单元格置为0
        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                if(matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        
        // 如果第一 row 有0，则将第一行全部置为0
        if(firstRowHasZero) {
            for(int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }
        
        // 如果第一 column 有0，则将第一列全部置为0
        if(firstColHasZero) {
            for(int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
};

// 简单的主函数调用示例
int main() {
    // 示例矩阵
    vector<vector<int>> matrix = {
        {1, 1, 1},
        {1, 0, 1},
        {1, 1, 1}
    };
    
    Solution solution;
    solution.setZeroes(matrix);
    
    // 打印结果
    cout << "结果矩阵为：" << endl;
    for(auto &row : matrix) {
        for(auto num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
    
    return 0;
}
```