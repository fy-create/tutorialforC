---
layout: post
title:  "304. 二维区域和检索 - 矩阵不可变"
categories: arithmetic
---

[304. 二维区域和检索 - 矩阵不可变](https://leetcode.cn/problems/range-sum-query-2d-immutable)

### 题目描述

给定一个二维矩阵 `matrix`，请计算其子矩形的元素总和。

实现 `NumMatrix` 类：

- `NumMatrix(int[][] matrix)` 使用整数矩阵 `matrix` 初始化对象。
- `int sumRegion(int row1, int col1, int row2, int col2)` 返回矩形 `(row1, col1)` 到 `(row2, col2)` 所在的子矩形元素总和。

**示例 1：**

```
输入:
["NumMatrix", "sumRegion", "sumRegion", "sumRegion"]
[[[[3, 0, 1, 4, 2],
   [5, 6, 3, 2, 1],
   [1, 2, 0, 1, 5],
   [4, 1, 0, 1, 7],
   [1, 0, 3, 0, 5]]],
 [2, 1, 4, 3],
 [1, 1, 2, 2],
 [1, 2, 2, 4]]
输出:
[null, 8, 11, 12]
解释：
NumMatrix numMatrix = new NumMatrix([
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]);
numMatrix.sumRegion(2, 1, 4, 3); // 返回 8 (子矩阵为 [[2,0,1],[1,0,1],[0,3,0]])
numMatrix.sumRegion(1, 1, 2, 2); // 返回 11
numMatrix.sumRegion(1, 2, 2, 4); // 返回 12
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `-10^5 <= matrix[i][j] <= 10^5`
- `0 <= row1 <= row2 < m`
- `0 <= col1 <= col2 < n`
- 最多调用 `10^4` 次 `sumRegion` 方法

---

### 解题思路

这道题要求我们在给定的二维矩阵中，快速计算任意子矩形的元素总和。为了高效地实现这一点，特别是在需要多次查询时，我们需要预处理一些数据以加快查询速度。

**关键点：**

1. **前缀和（Prefix Sum）**：
   - 通过预处理构建一个前缀和矩阵 `prefixSum`，其中 `prefixSum[i][j]` 表示从 `(0,0)` 到 `(i-1,j-1)` 的元素总和。
   - 这样，任意子矩形 `(row1, col1)` 到 `(row2, col2)` 的总和可以通过四个前缀和的组合来快速计算：
     ```
     sumRegion = prefixSum[row2+1][col2+1] 
               - prefixSum[row1][col2+1] 
               - prefixSum[row2+1][col1] 
               + prefixSum[row1][col1]
     ```

2. **初始化前缀和矩阵**：
   - 创建一个大小为 `(m+1) x (n+1)` 的前缀和矩阵，初始化为全零。
   - 通过双重循环填充前缀和矩阵：
     ```
     prefixSum[i][j] = matrix[i-1][j-1] 
                    + prefixSum[i-1][j] 
                    + prefixSum[i][j-1] 
                    - prefixSum[i-1][j-1]
     ```

3. **空间复杂度**：
   - 前缀和矩阵需要额外的 `O(mn)` 空间，但查询时可以在 `O(1)` 时间内完成。

4. **时间复杂度**：
   - 初始化前缀和矩阵的时间复杂度为 `O(mn)`。
   - 每次查询的时间复杂度为 `O(1)`。

通过这种方法，我们可以高效地处理大量的子矩形和查询操作。

---

### C语言解答

在C语言中，由于没有类的概念，我们需要使用结构体和函数来模拟 `NumMatrix` 类的行为。我们将创建一个结构体 `NumMatrix`，其中包含前缀和矩阵以及其尺寸。然后，实现对应的构造函数和 `sumRegion` 函数。

```c
#include <stdio.h>
#include <stdlib.h>

// 定义NumMatrix结构体
typedef struct {
    int** prefixSum; // 前缀和矩阵
    int rows;        // 行数
    int cols;        // 列数
} NumMatrix;

// 创建NumMatrix对象的构造函数
NumMatrix* numMatrixCreate(int** matrix, int matrixSize, int* matrixColSize){
    NumMatrix* obj = (NumMatrix*)malloc(sizeof(NumMatrix));
    obj->rows = matrixSize;
    obj->cols = matrixColSize[0];
    
    // 分配前缀和矩阵的内存
    obj->prefixSum = (int**)malloc((obj->rows + 1) * sizeof(int*));
    for(int i = 0; i <= obj->rows; i++) {
        obj->prefixSum[i] = (int*)calloc(obj->cols + 1, sizeof(int));
    }
    
    // 计算前缀和
    for(int i = 1; i <= obj->rows; i++) {
        for(int j = 1; j <= obj->cols; j++) {
            obj->prefixSum[i][j] = matrix[i-1][j-1] 
                                 + obj->prefixSum[i-1][j] 
                                 + obj->prefixSum[i][j-1] 
                                 - obj->prefixSum[i-1][j-1];
        }
    }
    
    return obj;
}

// 计算子矩形元素总和的函数
int numMatrixSumRegion(NumMatrix* obj, int row1, int col1, int row2, int col2){
    // 使用前缀和公式计算子矩形总和
    return obj->prefixSum[row2+1][col2+1] 
         - obj->prefixSum[row1][col2+1] 
         - obj->prefixSum[row2+1][col1] 
         + obj->prefixSum[row1][col1];
}

// 释放NumMatrix对象的内存
void numMatrixFree(NumMatrix* obj){
    for(int i = 0; i <= obj->rows; i++) {
        free(obj->prefixSum[i]);
    }
    free(obj->prefixSum);
    free(obj);
}

// 辅助函数用于打印数组
void printMatrix(int** matrix, int rows, int cols) {
    printf("[\n");
    for(int i = 0; i < rows; i++) {
        printf("  [");
        for(int j = 0; j < cols; j++) {
            printf("%d", matrix[i][j]);
            if(j != cols -1) printf(", ");
        }
        printf("]\n");
    }
    printf("]\n");
}

// 测试主函数
int main(){
    // 示例 1
    int matrix1_data[][5] = {
        {3, 0, 1, 4, 2},
        {5, 6, 3, 2, 1},
        {1, 2, 0, 1, 5},
        {4, 1, 0, 1, 7},
        {1, 0, 3, 0, 5}
    };
    int rows1 = sizeof(matrix1_data)/sizeof(matrix1_data[0]);
    int cols1 = sizeof(matrix1_data[0])/sizeof(int);
    
    // 创建动态二维数组
    int** matrix1 = (int**)malloc(rows1 * sizeof(int*));
    for(int i = 0; i < rows1; i++) {
        matrix1[i] = (int*)malloc(cols1 * sizeof(int));
        for(int j = 0; j < cols1; j++) {
            matrix1[i][j] = matrix1_data[i][j];
        }
    }
    
    printf("输入矩阵:\n");
    printMatrix(matrix1, rows1, cols1);
    
    // 创建NumMatrix对象
    int colSize1 = cols1;
    NumMatrix* nm1 = numMatrixCreate(matrix1, rows1, &colSize1);
    
    // 执行sumRegion查询
    int sum1 = numMatrixSumRegion(nm1, 2, 1, 4, 3); // 返回 8
    printf("sumRegion(2, 1, 4, 3) = %d\n", sum1);
    
    int sum2 = numMatrixSumRegion(nm1, 1, 1, 2, 2); // 返回 11
    printf("sumRegion(1, 1, 2, 2) = %d\n", sum2);
    
    int sum3 = numMatrixSumRegion(nm1, 1, 2, 2, 4); // 返回 12
    printf("sumRegion(1, 2, 2, 4) = %d\n", sum3);
    
    // 释放内存
    numMatrixFree(nm1);
    for(int i = 0; i < rows1; i++) {
        free(matrix1[i]);
    }
    free(matrix1);
    
    return 0;
}
```

**代码说明：**

1. **NumMatrix结构体**：
   - 包含前缀和矩阵 `prefixSum`。
   - `rows` 和 `cols` 分别表示矩阵的行数和列数。

2. **numMatrixCreate函数**：
   - 接受原始矩阵及其尺寸，初始化 `NumMatrix` 对象。
   - 分配前缀和矩阵的内存，并计算每个位置的前缀和。

3. **numMatrixSumRegion函数**：
   - 使用前缀和公式快速计算指定子矩形的元素总和。

4. **numMatrixFree函数**：
   - 释放 `NumMatrix` 对象及其前缀和矩阵的内存，防止内存泄漏。

5. **辅助函数printMatrix**：
   - 用于打印二维矩阵，方便验证输入和输出。

6. **测试主函数main**：
   - 创建示例矩阵。
   - 初始化 `NumMatrix` 对象。
   - 执行多个 `sumRegion` 查询，并打印结果。
   - 释放所有分配的内存。

**编译和运行：**

使用以下命令编译和运行代码：

```bash
gcc -o solution solution.c
./solution
```

**预期输出：**

```
输入矩阵:
[
  [3, 0, 1, 4, 2]
  [5, 6, 3, 2, 1]
  [1, 2, 0, 1, 5]
  [4, 1, 0, 1, 7]
  [1, 0, 3, 0, 5]
]
sumRegion(2, 1, 4, 3) = 8
sumRegion(1, 1, 2, 2) = 11
sumRegion(1, 2, 2, 4) = 12
```

---

### C++ 解答

在C++中，我们可以利用类和STL容器更自然地实现 `NumMatrix` 类。我们将使用二维 `vector` 来存储前缀和矩阵，并实现构造函数和 `sumRegion` 方法。

```cpp
#include <bits/stdc++.h>
using namespace std;

// 定义Solution类，模拟NumMatrix
class NumMatrix {
public:
    // 构造函数，初始化前缀和矩阵
    NumMatrix(vector<vector<int>>& matrix) {
        if(matrix.empty() || matrix[0].empty()) return;
        rows = matrix.size();
        cols = matrix[0].size();
        
        // 初始化前缀和矩阵
        prefixSum = vector<vector<int>>(rows + 1, vector<int>(cols + 1, 0));
        
        for(int i = 1; i <= rows; i++) {
            for(int j = 1; j <= cols; j++) {
                prefixSum[i][j] = matrix[i-1][j-1] 
                                + prefixSum[i-1][j] 
                                + prefixSum[i][j-1] 
                                - prefixSum[i-1][j-1];
            }
        }
    }
    
    // 计算子矩形元素总和的函数
    int sumRegion(int row1, int col1, int row2, int col2) {
        return prefixSum[row2+1][col2+1] 
             - prefixSum[row1][col2+1] 
             - prefixSum[row2+1][col1] 
             + prefixSum[row1][col1];
    }

private:
    int rows;
    int cols;
    vector<vector<int>> prefixSum; // 前缀和矩阵
};

// 辅助函数用于打印矩阵
void printMatrix(const vector<vector<int>>& matrix) {
    cout << "[\n";
    for(const auto& row : matrix) {
        cout << "  [";
        for(int j = 0; j < row.size(); j++) {
            cout << row[j];
            if(j != row.size()-1) cout << ", ";
        }
        cout << "]\n";
    }
    cout << "]\n";
}

int main(){
    // 示例 1
    vector<vector<int>> matrix1 = {
        {3, 0, 1, 4, 2},
        {5, 6, 3, 2, 1},
        {1, 2, 0, 1, 5},
        {4, 1, 0, 1, 7},
        {1, 0, 3, 0, 5}
    };
    
    cout << "输入矩阵:\n";
    printMatrix(matrix1);
    
    // 创建NumMatrix对象
    NumMatrix numMatrix(matrix1);
    
    // 执行sumRegion查询
    int sum1 = numMatrix.sumRegion(2, 1, 4, 3); // 返回 8
    cout << "sumRegion(2, 1, 4, 3) = " << sum1 << "\n";
    
    int sum2 = numMatrix.sumRegion(1, 1, 2, 2); // 返回 11
    cout << "sumRegion(1, 1, 2, 2) = " << sum2 << "\n";
    
    int sum3 = numMatrix.sumRegion(1, 2, 2, 4); // 返回 12
    cout << "sumRegion(1, 2, 2, 4) = " << sum3 << "\n";
    
    return 0;
}
```

**代码说明：**

1. **NumMatrix类**：
   - **成员变量**：
     - `rows` 和 `cols` 分别表示矩阵的行数和列数。
     - `prefixSum` 存储前缀和矩阵。
   - **构造函数**：
     - 接受一个二维 `vector` 作为输入矩阵。
     - 初始化前缀和矩阵，通过双重循环计算每个位置的前缀和。
   - **sumRegion方法**：
     - 接受四个参数 `(row1, col1, row2, col2)`，计算并返回指定子矩形的元素总和。
     - 使用前缀和公式快速计算。

2. **辅助函数printMatrix**：
   - 用于打印二维矩阵，方便验证输入和输出。

3. **测试主函数main**：
   - 创建示例矩阵。
   - 初始化 `NumMatrix` 对象。
   - 执行多个 `sumRegion` 查询，并打印结果。

**编译和运行：**

使用以下命令编译和运行代码：

```bash
g++ -o NumMatrix NumMatrix.cpp
./NumMatrix
```

**预期输出：**

```
输入矩阵:
[
  [3, 0, 1, 4, 2]
  [5, 6, 3, 2, 1]
  [1, 2, 0, 1, 5]
  [4, 1, 0, 1, 7]
  [1, 0, 3, 0, 5]
]
sumRegion(2, 1, 4, 3) = 8
sumRegion(1, 1, 2, 2) = 11
sumRegion(1, 2, 2, 4) = 12
```

**注意事项：**

- 使用 `using namespace std;` 简化代码，避免在使用标准库组件时频繁使用 `std::` 前缀。
- 利用STL的 `vector` 容器方便地管理动态二维数组和前缀和矩阵。
- 构造函数中对前缀和矩阵的初始化确保了查询的高效性。
- 测试主函数展示了如何使用 `NumMatrix` 类，并验证了功能的正确性。

---

### 总结

通过上述C和C++的实现，我们成功地在两种不同的编程语言中实现了 `NumMatrix` 类，能够高效地计算任意子矩形的元素总和。在C语言中，通过结构体和函数模拟了类的行为，管理了动态分配的内存和前缀和矩阵。而在C++中，利用类和STL容器，使代码更加简洁和易于管理。

关键在于预处理前缀和矩阵，使得每次查询都能在 `O(1)` 时间内完成，同时预处理阶段的时间复杂度为 `O(mn)`，满足题目的高效要求。确保在C语言中正确管理内存，避免内存泄漏，是实现过程中的重要部分。

通过这些实现，您可以在实际项目中根据需要选择合适的语言和方法来实现类似的矩阵查询功能。