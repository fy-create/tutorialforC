---
layout: post
title:  "85. 最大矩形"
categories: arithmetic
---

[85. 最大矩形](https://leetcode.cn/problems/maximal-rectangle)

### 题目描述

给定一个仅包含 `'0'` 和 `'1'` 的 `m x n` 二维二进制矩阵 `matrix`，找出只包含 `'1'` 的最大矩形，并返回其面积。

**示例 1：**

```
输入：
[
  ["1","0","1","0","0"],
  ["1","0","1","1","1"],
  ["1","1","1","1","1"],
  ["1","0","0","1","0"]
]
输出：6
```

**示例 2：**

```
输入：
[
  ["0"]
]
输出：0
```

**示例 3：**

```
输入：
[
  ["1"]
]
输出：1
```

**提示：**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 200`
- `matrix[i][j]` 仅为 `'0'` 或 `'1'`

### 解题思路

要在二维二进制矩阵中找到只包含 `'1'` 的最大矩形，并返回其面积，可以将此问题转化为多个「最大矩形在直方图中」的问题。具体步骤如下：

1. **将矩阵每一行视为直方图的底部：**
   - 对于每一行，计算在该行及其上方连续 `'1'` 的高度，形成一个高度数组。
   
2. **对于每一行的高度数组，计算最大矩形面积：**
   - 使用单调栈的方法来计算直方图中的最大矩形面积。
   
3. **遍历所有行，记录最大面积：**
   - 更新全局最大面积，最终返回。

**详细步骤：**

1. **初始化高度数组：**
   - 创建一个与矩阵列数相同的高度数组 `heights`，初始值为 `0`。
   
2. **遍历矩阵每一行：**
   - 对于每一行的每一列：
     - 如果当前元素为 `'1'`，则 `heights[j] += 1`。
     - 否则，`heights[j] = 0`。
   
3. **计算当前高度数组的最大矩形面积：**
   - 使用单调栈的方法：
     - 创建一个栈，用于存储列的索引，保证栈内的高度递增。
     - 遍历高度数组，对于每个高度：
       - 当当前高度小于栈顶高度时，弹出栈顶，计算以弹出高度为高度的矩形面积。
     - 最后，清空栈中的所有元素，计算相应的面积。
   
4. **更新全局最大面积：**
   - 比较并更新全局最大面积值。
   
5. **返回结果：**
   - 最终返回全局最大面积。

这种方法的时间复杂度为 `O(mn)`，其中 `m` 是行数，`n` 是列数，因为对于每一行，计算最大矩形面积的过程是 `O(n)` 的。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 辅助函数：计算直方图的最大矩形面积
int largestRectangleArea(int* heights, int n) {
    // 使用栈来存储索引
    int* stack = (int*)malloc(sizeof(int) * (n + 1));
    int top = -1;
    int maxArea = 0;
    
    for(int i = 0; i <= n; i++) {
        // 当前高度，如果超过数组范围，则设为0
        int currentHeight = (i < n) ? heights[i] : 0;
        
        // 当栈不为空且当前高度小于栈顶高度时，计算面积
        while(top >= 0 && currentHeight < heights[stack[top]]) {
            int height = heights[stack[top--]];
            // 宽度计算，如果栈为空，则宽度为i，否则为i - stack[top] -1
            int width = (top == -1) ? i : i - stack[top] -1;
            int area = height * width;
            if(area > maxArea) {
                maxArea = area;
            }
        }
        // 将当前索引入栈
        stack[++top] = i;
    }
    
    free(stack);
    return maxArea;
}

// 函数原型：计算最大矩形面积
int maximalRectangle(char** matrix, int matrixSize, int* matrixColSize){
    if(matrixSize == 0) return 0;
    int n = matrixColSize[0];
    // 初始化高度数组
    int* heights = (int*)calloc(n, sizeof(int));
    int maxArea = 0;
    
    for(int i = 0; i < matrixSize; i++) {
        for(int j = 0; j < n; j++) {
            if(matrix[i][j] == '1') {
                heights[j] += 1;
            }
            else {
                heights[j] = 0;
            }
        }
        // 计算当前行的最大面积
        int area = largestRectangleArea(heights, n);
        if(area > maxArea) {
            maxArea = area;
        }
    }
    
    free(heights);
    return maxArea;
}

// 简单的主函数调用示例
int main() {
    // 示例矩阵
    char row1[] = {'1','0','1','0','0'};
    char row2[] = {'1','0','1','1','1'};
    char row3[] = {'1','1','1','1','1'};
    char row4[] = {'1','0','0','1','0'};
    
    // 创建指针数组
    char* matrix[] = {row1, row2, row3, row4};
    int matrixSize = 4;
    int matrixColSize[] = {5, 5, 5, 5};
    
    // 调用函数并打印结果
    int result = maximalRectangle(matrix, matrixSize, matrixColSize);
    printf("最大矩形面积为：%d\n", result); // 输出应为6
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <stack>
#include <string>

using namespace std;

class Solution {
public:
    // 辅助函数：计算直方图的最大矩形面积
    int largestRectangleArea(vector<int>& heights) {
        stack<int> stk; // 栈存储索引
        int maxArea = 0;
        int n = heights.size();
        
        for(int i = 0; i <= n; i++) {
            // 当前高度，如果超过数组范围，则设为0
            int currentHeight = (i < n) ? heights[i] : 0;
            
            // 当栈不为空且当前高度小于栈顶高度时，计算面积
            while(!stk.empty() && currentHeight < heights[stk.top()]) {
                int height = heights[stk.top()];
                stk.pop();
                // 宽度计算，如果栈为空，则宽度为i，否则为i - stk.top() -1
                int width = stk.empty() ? i : i - stk.top() -1;
                int area = height * width;
                maxArea = max(maxArea, area);
            }
            // 将当前索引入栈
            stk.push(i);
        }
        
        return maxArea;
    }
    
    // 函数原型：计算最大矩形面积
    int maximalRectangle(vector<vector<char>>& matrix) {
        if(matrix.empty()) return 0;
        int n = matrix[0].size();
        vector<int> heights(n, 0);
        int maxArea = 0;
        
        for(auto &row : matrix) {
            for(int j = 0; j < n; j++) {
                if(row[j] == '1') {
                    heights[j] += 1;
                }
                else {
                    heights[j] = 0;
                }
            }
            // 计算当前行的最大面积
            int area = largestRectangleArea(heights);
            maxArea = max(maxArea, area);
        }
        
        return maxArea;
    }
};

// 简单的主函数调用示例
int main() {
    // 示例矩阵
    vector<vector<char>> matrix = {
        {'1','0','1','0','0'},
        {'1','0','1','1','1'},
        {'1','1','1','1','1'},
        {'1','0','0','1','0'}
    };
    
    Solution solution;
    int result = solution.maximalRectangle(matrix);
    
    // 打印结果
    cout << "最大矩形面积为：" << result << endl; // 输出应为6
    
    return 0;
}
```