---
layout: post
title:  "57. 插入区间"
categories: arithmetic
---

[57. 插入区间](https://leetcode.cn/problems/insert-interval)

以下是完整的输出内容，包括题目描述、解题思路、C语言和C++的代码实现，以及测试用例和复杂度分析。

---

### 题目描述

给定一个 **无重叠** 的区间列表 `intervals`，其中 `intervals[i] = [start_i, end_i]` 表示第 `i` 个区间的开始和结束。请你确保列表中的区间仍然有序且不重叠（如果有必要，可以合并区间），并插入一个新的区间 `newInterval`，返回插入后的区间列表。

你可以假设初始的区间列表是无重叠的，并且按照区间的起始端点排序。

**示例 1:**

```
输入: intervals = [[1,3],[6,9]], newInterval = [2,5]
输出: [[1,5],[6,9]]
解释: 新区间 [2,5] 与 [1,3] 重叠，合并后得到 [1,5]。
```

**示例 2:**

```
输入: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
输出: [[1,2],[3,10],[12,16]]
解释: 新区间 [4,8] 与 [3,5] 和 [6,7] 和 [8,10] 重叠，合并后得到 [3,10]。
```

**示例 3:**

```
输入: intervals = [], newInterval = [5,7]
输出: [[5,7]]
```

**示例 4:**

```
输入: intervals = [[1,5]], newInterval = [2,3]
输出: [[1,5]]
解释: 新区间 [2,3] 完全包含在 [1,5] 中，因此无需改变。
```

**提示:**

- `0 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^5`
- `intervals` 按 `start_i` 升序排列
- `newInterval.length == 2`
- `0 <= newInterval[0] <= newInterval[1] <= 10^5`

---

### 解题思路

1. **遍历区间列表**：
   - 遍历 `intervals`，将所有与 `newInterval` 不重叠的区间直接加入结果集。
   - 如果当前区间与 `newInterval` 重叠，则合并区间，更新 `newInterval` 的起始和结束位置。

2. **合并区间**：
   - 合并后的区间的起始位置为 `min(newInterval[0], current[0])`。
   - 合并后的区间的结束位置为 `max(newInterval[1], current[1])`。

3. **插入新区间**：
   - 将合并后的 `newInterval` 加入结果集。
   - 将剩余的区间加入结果集。

4. **实现步骤**：
   - 初始化结果集。
   - 遍历 `intervals`，处理与 `newInterval` 重叠的区间。
   - 将合并后的 `newInterval` 和剩余区间加入结果集。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

int** insert(int** intervals, int intervalsSize, int* intervalsColSize, int* newInterval, int newIntervalSize, int* returnSize, int** returnColumnSizes) {
    // 初始化结果集
    int** result = (int**)malloc((intervalsSize + 1) * sizeof(int*));
    *returnColumnSizes = (int*)malloc((intervalsSize + 1) * sizeof(int));
    *returnSize = 0;

    int i = 0;
    // 添加所有在 newInterval 之前的区间
    while (i < intervalsSize && intervals[i][1] < newInterval[0]) {
        result[*returnSize] = (int*)malloc(2 * sizeof(int));
        result[*returnSize][0] = intervals[i][0];
        result[*returnSize][1] = intervals[i][1];
        (*returnColumnSizes)[*returnSize] = 2;
        (*returnSize)++;
        i++;
    }

    // 合并重叠区间
    while (i < intervalsSize && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = newInterval[0] < intervals[i][0] ? newInterval[0] : intervals[i][0];
        newInterval[1] = newInterval[1] > intervals[i][1] ? newInterval[1] : intervals[i][1];
        i++;
    }
    result[*returnSize] = (int*)malloc(2 * sizeof(int));
    result[*returnSize][0] = newInterval[0];
    result[*returnSize][1] = newInterval[1];
    (*returnColumnSizes)[*returnSize] = 2;
    (*returnSize)++;

    // 添加剩余的区间
    while (i < intervalsSize) {
        result[*returnSize] = (int*)malloc(2 * sizeof(int));
        result[*returnSize][0] = intervals[i][0];
        result[*returnSize][1] = intervals[i][1];
        (*returnColumnSizes)[*returnSize] = 2;
        (*returnSize)++;
        i++;
    }

    return result;
}

int main() {
    int intervalsData[][2] = { {1, 3}, {6, 9}};
    int intervalsSize = 2;
    int intervalsColSize[] = {2, 2};
    int* intervals[2];
    for (int i = 0; i < intervalsSize; i++) {
        intervals[i] = intervalsData[i];
    }

    int newInterval[] = {2, 5};
    int newIntervalSize = 2;
    int returnSize;
    int* returnColumnSizes;
    int** result = insert(intervals, intervalsSize, intervalsColSize, newInterval, newIntervalSize, &returnSize, &returnColumnSizes);

    printf("插入后的区间列表:\n");
    for (int i = 0; i < returnSize; i++) {
        printf("[%d, %d] ", result[i][0], result[i][1]);
    }
    printf("\n");

    // 释放内存
    for (int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0;
        int n = intervals.size();

        // 添加所有在 newInterval 之前的区间
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }

        // 合并重叠区间
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push_back(newInterval);

        // 添加剩余的区间
        while (i < n) {
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};

int main() {
    Solution solution;
    vector<vector<int>> intervals = { {1, 3}, {6, 9}};
    vector<int> newInterval = {2, 5};
    vector<vector<int>> result = solution.insert(intervals, newInterval);

    cout << "插入后的区间列表:" << endl;
    for (const auto& interval : result) {
        cout << "[" << interval[0] << ", " << interval[1] << "] ";
    }
    cout << endl;

    return 0;
}
```

---

### 测试用例

#### 输入 1
```
intervals = [[1,3],[6,9]], newInterval = [2,5]
```
#### 输出 1
```
[[1,5],[6,9]]
```

#### 输入 2
```
intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
```
#### 输出 2
```
[[1,2],[3,10],[12,16]]
```

#### 输入 3
```
intervals = [], newInterval = [5,7]
```
#### 输出 3
```
[[5,7]]
```

#### 输入 4
```
intervals = [[1,5]], newInterval = [2,3]
```
#### 输出 4
```
[[1,5]]
```

---

### 复杂度分析

- **时间复杂度**：O(n)，其中 n 是区间列表的长度。我们只需要遍历一次区间列表。
- **空间复杂度**：O(n)，用于存储结果集。

---

### 总结

通过遍历区间列表并合并重叠区间，我们可以高效地插入新区间并保持区间列表的有序性和无重叠性。这种方法利用了区间列表的有序特性，能够有效解决问题。