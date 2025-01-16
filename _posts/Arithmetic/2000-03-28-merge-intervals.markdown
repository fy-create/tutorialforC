---
layout: post
title:  "56. 合并区间"
categories: arithmetic
---

[56. 合并区间](https://leetcode.cn/problems/merge-intervals)

### 题目要求

**题目名称**: 合并区间

**题目描述**:  
给定一个区间的集合，请合并所有重叠的区间。

**输入**:  
- 一个区间集合 `intervals`，其中每个区间是一个包含两个整数的数组 `[start, end]`，表示一个区间的开始和结束。

**输出**:  
- 返回一个新的区间集合，表示合并后的所有区间。

**示例 1**:  
输入：`intervals = [[1,3],[2,6],[8,10],[15,18]]`  
输出：`[[1,6],[8,10],[15,18]]`  
解释：区间 `[1,3]` 和 `[2,6]` 可以合并成 `[1,6]`。

**示例 2**:  
输入：`intervals = [[1,4],[4,5]]`  
输出：`[[1,5]]`  
解释：区间 `[1,4]` 和 `[4,5]` 可以合并成 `[1,5]`。

**提示**:  
- `intervals` 的长度范围是 `[1, 10^4]`。
- `intervals[i]` 的长度为 2，表示一个区间 `[start, end]`，其中 `0 <= start <= end <= 10^4`。

### 解题思路

1. **排序**:  
   我们可以首先按照区间的起始位置进行排序，这样可以确保合并的过程是有序的。如果两个区间重叠，它们会被排在相邻的位置。

2. **合并区间**:  
   - 初始化一个空的结果数组 `merged`，用于保存合并后的区间。
   - 遍历排序后的区间：
     - 如果当前区间的起始位置大于等于 `merged` 中最后一个区间的结束位置，则没有重叠，直接将当前区间添加到结果数组中。
     - 如果当前区间的起始位置小于 `merged` 中最后一个区间的结束位置，则表示当前区间与最后一个区间有重叠，我们需要更新最后一个区间的结束位置，合并这两个区间。

3. **时间复杂度**:  
   排序的时间复杂度为 O(n log n)，遍历的时间复杂度为 O(n)，因此总时间复杂度为 O(n log n)。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 比较函数，用于排序区间的开始位置
int compare(const void *a, const void *b) {
    int *intervalA = (int *)a;
    int *intervalB = (int *)b;
    return intervalA[0] - intervalB[0];  // 按照区间的起始位置排序
}

// 合并区间的函数
int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    // 如果只有一个区间，直接返回它
    if (intervalsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    // 对区间进行排序
    qsort(intervals, intervalsSize, sizeof(int*), compare);
    
    // 初始化返回的结果数组
    int** merged = (int**)malloc(sizeof(int*) * intervalsSize);
    *returnColumnSizes = (int*)malloc(sizeof(int) * intervalsSize);
    
    // 初始化合并区间的个数
    int index = 0;
    merged[index] = (int*)malloc(sizeof(int) * 2);
    merged[index][0] = intervals[0][0];
    merged[index][1] = intervals[0][1];
    (*returnColumnSizes)[index] = 2;
    index++;

    // 遍历所有区间，进行合并
    for (int i = 1; i < intervalsSize; i++) {
        // 如果当前区间与上一个区间有重叠
        if (intervals[i][0] <= merged[index - 1][1]) {
            // 合并区间，更新结束位置
            merged[index - 1][1] = (intervals[i][1] > merged[index - 1][1]) ? intervals[i][1] : merged[index - 1][1];
        } else {
            // 没有重叠，直接添加当前区间
            merged[index] = (int*)malloc(sizeof(int) * 2);
            merged[index][0] = intervals[i][0];
            merged[index][1] = intervals[i][1];
            (*returnColumnSizes)[index] = 2;
            index++;
        }
    }

    // 返回合并后的区间数组
    *returnSize = index;
    return merged;
}

int main() {
    // 示例输入
    int intervals[4][2] = { {1, 3}, {2, 6}, {8, 10}, {15, 18}};
    int* intervalsPtr[4];
    for (int i = 0; i < 4; i++) {
        intervalsPtr[i] = intervals[i];
    }
    
    int returnSize = 0;
    int* returnColumnSizes = NULL;
    int** mergedIntervals = merge(intervalsPtr, 4, NULL, &returnSize, &returnColumnSizes);
    
    // 输出合并后的区间
    for (int i = 0; i < returnSize; i++) {
        printf("[%d, %d] ", mergedIntervals[i][0], mergedIntervals[i][1]);
    }
    printf("\n");

    // 释放内存
    free(returnColumnSizes);
    for (int i = 0; i < returnSize; i++) {
        free(mergedIntervals[i]);
    }
    free(mergedIntervals);
    
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// 定义 Solution 类
class Solution {
public:
    // 合并区间的函数
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // 如果输入区间为空，返回空结果
        if (intervals.empty()) {
            return {};
        }

        // 按照区间的起始位置进行排序
        sort(intervals.begin(), intervals.end());

        // 存储合并后的区间
        vector<vector<int>> merged;
        // 初始化第一个区间
        merged.push_back(intervals[0]);

        // 遍历所有区间，进行合并
        for (int i = 1; i < intervals.size(); i++) {
            // 如果当前区间与上一个区间有重叠
            if (intervals[i][0] <= merged.back()[1]) {
                // 合并区间，更新结束位置
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                // 没有重叠，直接添加当前区间
                merged.push_back(intervals[i]);
            }
        }

        return merged;
    }
};

int main() {
    Solution solution;
    // 示例输入
    vector<vector<int>> intervals = { {1, 3}, {2, 6}, {8, 10}, {15, 18}};
    
    // 调用合并区间函数
    vector<vector<int>> mergedIntervals = solution.merge(intervals);
    
    // 输出合并后的区间
    for (const auto& interval : mergedIntervals) {
        cout << "[" << interval[0] << ", " << interval[1] << "] ";
    }
    cout << endl;

    return 0;
}
```

### 说明

1. **C语言解答**：  
   - 使用 `qsort` 函数对区间进行排序。
   - 使用二维数组来存储结果，并对内存进行动态分配。
   - 每次合并区间时检查当前区间是否与上一个区间重叠。

2. **C++解答**：  
   - 使用 STL 容器 `vector` 来存储区间和结果，简化了内存管理。
   - 使用 `sort` 函数进行排序，方便对区间进行合并。

以上代码分别展示了 C 语言和 C++ 语言的实现，并且添加了详细的注释，便于理解和调试。