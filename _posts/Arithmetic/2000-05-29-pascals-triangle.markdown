---
layout: post
title:  "118. 杨辉三角"
categories: arithmetic
---

[118. 杨辉三角](https://leetcode.cn/problems/pascals-triangle)

### 题目描述

给定一个整数 `numRows`，生成杨辉三角的前 `numRows` 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。如下所示：

```
输入: numRows = 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

**示例 1：**

```
输入：numRows = 5
输出：
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

**示例 2：**

```
输入：numRows = 1
输出：[[1]]
```

**提示：**

- `1 <= numRows <= 30`

### 解题思路

要生成杨辉三角的前 `numRows` 行，可以采用迭代的方法逐行构建。具体步骤如下：

1. **初始化结果集**：
   - 创建一个二维数组 `triangle`，用于存储杨辉三角的每一行。
   - 如果 `numRows` 为0，直接返回空数组。

2. **逐行构建杨辉三角**：
   - 对于每一行 `i`（从0到 `numRows-1`）：
     - 创建一个长度为 `i + 1` 的数组 `row`，用于存储当前行的元素。
     - 杨辉三角的每一行的第一个和最后一个元素都是 `1`。
     - 对于中间的元素，使用上一行的相邻两个元素之和进行计算，即 `row[j] = triangle[i-1][j-1] + triangle[i-1][j]`。

3. **将当前行添加到结果集中**：
   - 将构建好的 `row` 添加到 `triangle` 中。

4. **返回结果**：
   - 在所有行构建完成后，返回 `triangle` 作为最终结果。

**时间复杂度分析**：

- 每一行最多有 `numRows` 个元素，总的时间复杂度为 `O(numRows^2)`。

**空间复杂度分析**：

- 需要存储 `numRows` 行，每行最多 `numRows` 个元素，空间复杂度为 `O(numRows^2)`。

通过上述方法，可以有效地构建出杨辉三角的前 `numRows` 行。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** generate(int numRows, int* returnSize, int** returnColumnSizes) {
    // 分配二维数组的内存
    int** triangle = (int**)malloc(sizeof(int*) * numRows);
    *returnColumnSizes = (int*)malloc(sizeof(int) * numRows);
    *returnSize = numRows;

    for(int i = 0; i < numRows; i++) {
        // 每行有i+1个元素
        triangle[i] = (int*)malloc(sizeof(int) * (i + 1));
        (*returnColumnSizes)[i] = i + 1;

        for(int j = 0; j <= i; j++) {
            if(j == 0 || j == i) {
                // 每行的第一个和最后一个元素都是1
                triangle[i][j] = 1;
            }
            else {
                // 中间元素等于上一行的相邻两个元素之和
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
            }
        }
    }

    return triangle;
}

// 辅助函数：打印杨辉三角
void printTriangle(int** triangle, int numRows, int* columnSizes) {
    printf("[\n");
    for(int i = 0; i < numRows; i++) {
        printf("  [");
        for(int j = 0; j < columnSizes[i]; j++) {
            printf("%d", triangle[i][j]);
            if(j < columnSizes[i] - 1) {
                printf(",");
            }
        }
        printf("]");
        if(i < numRows - 1) {
            printf(",\n");
        }
        else {
            printf("\n");
        }
    }
    printf("]\n");
}

// 辅助函数：释放杨辉三角的内存
void freeTriangle(int** triangle, int numRows) {
    for(int i = 0; i < numRows; i++) {
        free(triangle[i]);
    }
    free(triangle);
}

// 简单的主函数调用示例
int main() {
    int numRows = 5;
    int returnSize;
    int* returnColumnSizes = NULL;
    int** triangle = generate(numRows, &returnSize, &returnColumnSizes);

    printf("杨辉三角的前 %d 行为：\n[\n", numRows);
    printTriangle(triangle, returnSize, returnColumnSizes);
    printf("]\n");

    // 释放内存
    freeTriangle(triangle, numRows);
    free(returnColumnSizes);

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 主函数：生成杨辉三角的前 numRows 行
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> triangle;

        if(numRows <= 0) return triangle;

        for(int i = 0; i < numRows; i++) {
            vector<int> row(i + 1, 1); // 每行初始化为1

            // 中间的元素等于上一行的相邻两个元素之和
            for(int j = 1; j < i; j++) {
                row[j] = triangle[i-1][j-1] + triangle[i-1][j];
            }

            triangle.push_back(row);
        }

        return triangle;
    }
};

// 辅助函数：打印杨辉三角
void printTriangle(const vector<vector<int>>& triangle) {
    cout << "[\n";
    for(size_t i = 0; i < triangle.size(); i++) {
        cout << "  [";
        for(size_t j = 0; j < triangle[i].size(); j++) {
            cout << triangle[i][j];
            if(j < triangle[i].size() - 1) cout << ",";
        }
        cout << "]";
        if(i < triangle.size() - 1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

int main() {
    Solution solution;
    int numRows = 5;
    vector<vector<int>> triangle = solution.generate(numRows);

    cout << "杨辉三角的前 " << numRows << " 行为：\n";
    printTriangle(triangle);

    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们采用了迭代的方法逐行构建杨辉三角。具体步骤如下：

1. **初始化结果集**：
   - **C语言**：使用动态分配的二维数组 `triangle` 存储每一行的元素，同时使用 `columnSizes` 记录每行的长度。
   - **C++**：使用 `vector<vector<int>>` 来存储杨辉三角的每一行。

2. **逐行构建杨辉三角**：
   - 对于每一行 `i`，初始化一个长度为 `i + 1` 的数组或向量，并将首尾元素设为 `1`。
   - 对于中间的元素，计算其值为上一行的相邻两个元素之和。

3. **将当前行添加到结果集中**：
   - **C语言**：将构建好的 `row` 添加到 `triangle` 中，并更新 `columnSizes`。
   - **C++**：将构建好的 `row` 使用 `push_back` 添加到 `triangle` 中。

4. **打印结果**：
   - **C语言**：使用 `printTriangle` 函数按照指定格式打印二维数组。
   - **C++**：使用 `printTriangle` 函数按照指定格式打印 `vector<vector<int>>`。

5. **释放内存**（仅在C语言中需要）：
   - 使用 `freeTriangle` 函数释放动态分配的内存，防止内存泄漏。

**示例输出：**

```
杨辉三角的前 5 行为：
[
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1]
]
```

对于C++示例：

```
杨辉三角的前 5 行为：
[
  [1],
  [1,1],
  [1,2,1],
  [1,3,3,1],
  [1,4,6,4,1]
]
```

这些输出与预期结果一致，表明代码正确地生成了杨辉三角的前 `numRows` 行。

通过以上步骤和代码实现，我们能够有效地生成杨辉三角的前 `numRows` 行，满足题目的要求。