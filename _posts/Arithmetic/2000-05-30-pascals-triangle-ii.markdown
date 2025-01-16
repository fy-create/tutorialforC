---
layout: post
title:  "119. 杨辉三角 II"
categories: arithmetic
---

[119. 杨辉三角 II](https://leetcode.cn/problems/pascals-triangle-ii)

输入：rowIndex = 3
输出：[1, 3, 3, 1]
题目描述：

给定一个非负整数 `rowIndex`，返回杨辉三角的第 `rowIndex` 行。  
**注意：** 杨辉三角的第 `0` 行和第 `n` 行都只有一个元素，且该元素值为 `1`。例如：

```
行号:  0   1   2   3   4
内容:  1   1   2   3   4
```

**示例：**
```
输入: rowIndex = 3
输出: [1, 3, 3, 1]
```

**提示：**
- `0 <= rowIndex <= 33`

### 解题思路：

杨辉三角的第 `n` 行的每个元素都由以下规律产生：
- 每一行的第一个元素和最后一个元素都是 `1`。
- 对于其他位置的元素，第 `i` 个元素等于上一行第 `i-1` 个元素和第 `i` 个元素的和。

给定 `rowIndex`，我们可以利用上述规律从 `0` 到 `rowIndex` 构造出这一行。通过维护一行数组，每次迭代时更新这个数组的元素值，直到构造出目标行。

### C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 函数返回目标行的元素
int* getRow(int rowIndex, int* returnSize) {
    // 动态分配一个长度为 rowIndex + 1 的数组来存储结果
    int *row = (int*)malloc((rowIndex + 1) * sizeof(int));
    
    // 设置第一个元素为 1
    row[0] = 1;
    
    // 通过上一行的数据来计算当前行的值
    for (int i = 1; i <= rowIndex; i++) {
        // 从后往前更新数组值，避免覆盖数据
        for (int j = i; j > 0; j--) {
            row[j] = row[j] + row[j - 1];
        }
        row[i] = 1; // 每行的最后一个元素为 1
    }
    
    // 设置返回值的大小
    *returnSize = rowIndex + 1;
    
    return row;
}

int main() {
    int rowIndex = 3;
    int returnSize;
    
    // 获取指定行的元素
    int* result = getRow(rowIndex, &returnSize);
    
    // 打印结果
    printf("Row at index %d: [", rowIndex);
    for (int i = 0; i < returnSize; i++) {
        printf("%d", result[i]);
        if (i != returnSize - 1) {
            printf(", ");
        }
    }
    printf("]\n");
    
    // 释放动态分配的内存
    free(result);
    
    return 0;
}
```

### C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 返回杨辉三角的第 rowIndex 行
    vector<int> getRow(int rowIndex) {
        // 初始化第一行
        vector<int> row(rowIndex + 1, 1);
        
        // 通过上一行的数据来计算当前行的值
        for (int i = 1; i <= rowIndex; i++) {
            // 从后往前更新当前行的值，避免覆盖数据
            for (int j = i - 1; j > 0; j--) {
                row[j] = row[j] + row[j - 1];
            }
        }
        
        return row;
    }
};

int main() {
    Solution solution;
    int rowIndex = 3;
    
    // 获取指定行的元素
    vector<int> result = solution.getRow(rowIndex);
    
    // 打印结果
    cout << "Row at index " << rowIndex << ": [";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i != result.size() - 1) {
            cout << ", ";
        }
    }
    cout << "]" << endl;
    
    return 0;
}
```

### 解释：
1. **C 语言解法：**
   - 使用 `malloc` 动态分配内存来存储杨辉三角的行。
   - 通过两个嵌套循环构造目标行。内层循环从后往前更新数据，避免在更新过程中修改已经计算的元素。
   - 最后，使用 `free` 函数释放动态分配的内存。

2. **C++ 语言解法：**
   - 使用 `vector<int>` 来动态存储结果，简化内存管理。
   - 同样使用嵌套循环计算每一行的元素。
   - `vector` 提供了更好的内存管理和简化的语法，使得代码更加简洁。

### 总结：
两种语言的解法都基于杨辉三角的构造规律，利用迭代从第 0 行开始逐步推导出目标行。C 语言采用了显式的内存管理，而 C++ 通过 `vector` 来简化内存管理。