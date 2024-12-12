---
layout: post
title:  "57. 插入区间"
categories: arithmetic
---

[57. 插入区间](https://leetcode.cn/problems/insert-interval)

## Insert Interval

**题目描述：**

给你一个 **无重叠的** ，按照区间起始端点排序的区间列表。

在列表中插入一个新的区间，你需要确保列表仍然有序且不重叠（如果有必要的话，可以合并区间）。

**示例：**

1. 输入：intervals = [[1,3],[6,9]], newInterval = [2,5]
   输出：[[1,5],[6,9]]

2. 输入：intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
   输出：[[1,2],[3,10],[12,16]]
   解释：这是因为新的区间 [4,8] 覆盖并合并了现有的区间 [3,5],[6,7],[8,10]。

**提示：**

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= intervals[i][0] <= intervals[i][1] <= 10^5`
- `intervals` 根据 `intervals[i][0]` 按 **严格递增** 顺序排列
- `newInterval.length == 2`
- `0 <= newInterval[0] <= newInterval[1] <= 10^5`

## 解题思路：

1. 初始化一个结果数组 `result` 和一个指向新区间起始位置的索引 `i`。
2. 遍历原区间数组 `intervals`，将所有结束位置在新区间起始位置之前的区间直接添加到 `result` 中。
3. 对于与新区间有重叠的区间，更新新区间的起始和结束位置，以包含所有重叠的区间。
4. 将合并后的新区间添加到 `result` 中。
5. 将剩余的区间添加到 `result` 中。
6. 返回结果数组 `result`。

## C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数，用于创建二维数组
int** create2DArray(int rows, int cols) {
    int** array = (int**)malloc(rows * sizeof(int*));
    for (int i = 0; i < rows; i++) {
        array[i] = (int*)malloc(cols * sizeof(int));
    }
    return array;
}

// 插入区间函数
int** insert(int** intervals, int intervalsSize, int* intervalsColSize, int* newInterval, int newIntervalSize, int* returnSize, int** returnColumnSizes) {
    int** result = create2DArray(intervalsSize + 1, 2); // 初始化结果数组
    *returnColumnSizes = (int*)malloc((intervalsSize + 1) * sizeof(int)); // 初始化列大小数组
    *returnSize = 0; // 初始化返回数组大小
    int i = 0; // 初始化索引

    // 将所有结束位置在新区间起始位置之前的区间添加到结果数组中
    while (i < intervalsSize && intervals[i][1] < newInterval[0]) {
        result[*returnSize][0] = intervals[i][0];
        result[*returnSize][1] = intervals[i][1];
        (*returnColumnSizes)[*returnSize] = 2;
        (*returnSize)++;
        i++;
    }

    // 合并所有与新区间有重叠的区间
    while (i < intervalsSize && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = newInterval[0] < intervals[i][0] ? newInterval[0] : intervals[i][0];
        newInterval[1] = newInterval[1] > intervals[i][1] ? newInterval[1] : intervals[i][1];
        i++;
    }
    result[*returnSize][0] = newInterval[0];
    result[*returnSize][1] = newInterval[1];
    (*returnColumnSizes)[*returnSize] = 2;
    (*returnSize)++;

    // 将剩余的区间添加到结果数组中
    while (i < intervalsSize) {
        result[*returnSize][0] = intervals[i][0];
        result[*returnSize][1] = intervals[i][1];
        (*returnColumnSizes)[*returnSize] = 2;
        (*returnSize)++;
        i++;
    }

    return result;
}

int main() {
    int intervalsSize = 5;
    int* intervalsColSize = (int*)malloc(intervalsSize * sizeof(int));
    for (int i = 0; i < intervalsSize; i++) {
        intervalsColSize[i] = 2;
    }
    int* intervals[] = {
        (int[]) {1, 2},
        (int[]) {3, 5},
        (int[]) {6, 7},
        (int[]) {8, 10},
        (int[]) {12, 16}
    };
    int newInterval[] = {4, 8};
    int newIntervalSize = 2;

    int returnSize;
    int* returnColumnSizes;
    int** result = insert(intervals, intervalsSize, intervalsColSize, newInterval, newIntervalSize, &returnSize, &returnColumnSizes);

    printf("Merged intervals: ");
    for (int i = 0; i < returnSize; i++) {
        printf("[%d, %d] ", result[i][0], result[i][1]);
        free(result[i]);
    }
    printf("\n");

    free(result);
    free(returnColumnSizes);
    free(intervalsColSize);
    return 0;
}
```

**代码解析：**

1. 使用辅助函数 `create2DArray` 创建结果二维数组。
2. 初始化结果数组和返回数组大小。
3. 遍历原区间数组 `intervals`，将所有结束位置在新区间起始位置之前的区间直接添加到结果数组中。
4. 合并所有与新区间有重叠的区间，更新新区间的起始和结束位置。
5. 将合并后的新区间添加到结果数组中。
6. 将剩余的区间添加到结果数组中。
7. 返回结果数组 `result`。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0;

        // 将所有结束位置在新区间起始位置之前的区间添加到结果数组中
        while (i < intervals.size() && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }

        // 合并所有与新区间有重叠的区间
        while (i < intervals.size() && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);

        // 将剩余的区间添加到结果数组中
        while (i < intervals.size()) {
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};

int main() {
    vector<vector<int>> intervals = { {1, 2}, {3, 5}, {6, 7}, {8, 10}, {12, 16} };
    vector<int> newInterval = {4, 8};
    Solution sol;
    vector<vector<int>> result = sol.insert(intervals, newInterval);

    cout << "Merged intervals: ";
    for (const auto& interval : result) {
        cout << "[" << interval[0] << ", " << interval[1] << "] ";
    }
    cout << endl;

    return 0;
}
```