---
layout: post
title:  "56. 合并区间"
categories: arithmetic
---

[56. 合并区间](https://leetcode.cn/problems/merge-intervals)

以下是针对“合并区间”问题的完整解答，包括题目描述、解题思路以及 C 和 C++ 的代码实现：

---

### **题目描述**

给定一个由一些区间组成的数组 `intervals`，其中 `intervals[i] = [start, end]`，合并所有重叠的区间，并返回一个不重叠的区间数组，数组需按区间的起始位置排序。

#### 示例
**输入：** `intervals = [[1,3],[2,6],[8,10],[15,18]]`  
**输出：** `[[1,6],[8,10],[15,18]]`  
**解释：** 区间 `[1,3]` 和 `[2,6]` 重叠, 将它们合并为 `[1,6]`.

**输入：** `intervals = [[1,4],[4,5]]`  
**输出：** `[[1,5]]`  
**解释：** 区间 `[1,4]` 和 `[4,5]` 可被视为重叠区间。

#### 提示
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start <= end <= 10^4`

---

### **解题思路**

1. **排序区间：**
   - 按照区间的起始位置 `start` 进行升序排序，便于后续处理。

2. **遍历区间并合并：**
   - 初始化一个结果数组 `result`。
   - 遍历排序后的区间数组：
     - 如果当前区间与结果数组中的最后一个区间没有重叠，直接将当前区间加入结果。
     - 如果有重叠，更新结果数组中最后一个区间的 `end` 值。

3. **时间复杂度分析：**
   - 排序时间复杂度为 O(n log n)。
   - 遍历时间复杂度为 O(n)。
   - 总时间复杂度为 O(n log n)。

---

### **C语言实现**

```c
#include <stdio.h>
#include <stdlib.h>

// 定义区间结构
typedef struct {
    int start;
    int end;
} Interval;

// 比较函数用于排序
int compare(const void* a, const void* b) {
    Interval* intervalA = (Interval*)a;
    Interval* intervalB = (Interval*)b;
    return intervalA->start - intervalB->start;
}

int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    if (intervalsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    Interval* intervalArr = (Interval*)malloc(intervalsSize * sizeof(Interval));
    for (int i = 0; i < intervalsSize; i++) {
        intervalArr[i].start = intervals[i][0];
        intervalArr[i].end = intervals[i][1];
    }

    // 排序区间
    qsort(intervalArr, intervalsSize, sizeof(Interval), compare);

    // 初始化结果数组
    int** result = (int**)malloc(intervalsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(intervalsSize * sizeof(int));
    int count = 0;

    // 合并区间
    for (int i = 0; i < intervalsSize; i++) {
        if (count == 0 || result[count - 1][1] < intervalArr[i].start) {
            result[count] = (int*)malloc(2 * sizeof(int));
            result[count][0] = intervalArr[i].start;
            result[count][1] = intervalArr[i].end;
            (*returnColumnSizes)[count] = 2;
            count++;
        } else {
            result[count - 1][1] = result[count - 1][1] > intervalArr[i].end ? result[count - 1][1] : intervalArr[i].end;
        }
    }

    free(intervalArr);
    *returnSize = count;
    return result;
}

// 测试代码
int main() {
    int intervalsArray[4][2] = { {1, 3}, {2, 6}, {8, 10}, {15, 18} };
    int* intervals[4] = {intervalsArray[0], intervalsArray[1], intervalsArray[2], intervalsArray[3]};
    int intervalsColSize = 2;
    int returnSize;
    int* returnColumnSizes;

    int** result = merge(intervals, 4, &intervalsColSize, &returnSize, &returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        printf("[%d, %d]\n", result[i][0], result[i][1]);
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);

    return 0;
}
```

---

### **C++实现**

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};

        // 按区间起始值排序
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> result;
        for (const auto& interval : intervals) {
            // 如果结果数组为空，或当前区间与上一个区间不重叠，直接加入
            if (result.empty() || result.back()[1] < interval[0]) {
                result.push_back(interval);
            } else {
                // 否则更新最后一个区间的结束值
                result.back()[1] = max(result.back()[1], interval[1]);
            }
        }
        return result;
    }
};

int main() {
    Solution sol;
    vector<vector<int>> intervals = { {1, 3}, {2, 6}, {8, 10}, {15, 18} };
    vector<vector<int>> result = sol.merge(intervals);

    for (const auto& interval : result) {
        cout << "[" << interval[0] << ", " << interval[1] << "]" << endl;
    }

    return 0;
}
```