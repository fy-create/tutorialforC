---
layout: post
title:  "218. 天际线问题"
categories: arithmetic
---

[218. 天际线问题](https://leetcode.cn/problems/the-skyline-problem)

### 题目描述

城市的天际线是从远处观看城市中所有建筑物形成的轮廓的外部轮廓。给你所有建筑物的位置和高度，请返回由这些建筑物形成的天际线。

每个建筑物的几何信息由数组 `buildings` 表示，其中 `buildings[i] = [lefti, righti, heighti]`：
- `lefti` 是第 `i` 座建筑物左边缘的 `x` 坐标。
- `righti` 是第 `i` 座建筑物右边缘的 `x` 坐标。
- `heighti` 是第 `i` 座建筑物的高度。

你可以假设所有的建筑物都是完美的矩形，在高度为 `0` 的绝对平坦的表面上。

天际线应该表示为由关键点组成的列表，格式为 `[[x1,y1],[x2,y2],...]`，并按 `x` 坐标排序。关键点是水平线段的左端点。最右侧建筑物的终点始终是关键点，高度为 `0`。

**示例 1：**

```
输入：buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
输出：[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
解释：
图 A 显示输入的所有建筑物的位置和高度，
图 B 显示由这些建筑物形成的天际线。图 B 中的红点表示输出列表中的关键点。
```

**示例 2：**

```
输入：buildings = [[0,2,3],[2,5,3]]
输出：[[0,3],[5,0]]
```

**提示：**

- `1 <= buildings.length <= 10^4`
- `0 <= lefti < righti <= 2^31 - 1`
- `1 <= heighti <= 2^31 - 1`
- 你可以假设所有建筑物都是完美的矩形，且不会重叠。

---

### 解题思路

这个问题可以通过 **扫描线算法** 结合 **优先队列（堆）** 来解决。具体步骤如下：

1. **事件点生成**：
   - 将每个建筑物的左右边界作为事件点，并标记是左边界还是右边界。
   - 左边界事件点的高度为负数，表示开始一个建筑物。
   - 右边界事件点的高度为正数，表示结束一个建筑物。

2. **排序事件点**：
   - 将所有事件点按 `x` 坐标排序。如果 `x` 坐标相同，则按高度排序（左边界优先）。

3. **扫描线处理**：
   - 使用一个最大堆（优先队列）来记录当前扫描线经过的建筑物高度。
   - 遍历排序后的事件点：
     - 如果是左边界事件点，将高度加入堆。
     - 如果是右边界事件点，将高度从堆中移除。
   - 每次处理事件点后，检查堆顶的最大高度是否发生变化。如果变化，则记录当前 `x` 坐标和新的最大高度。

4. **结果构造**：
   - 将所有记录的关键点按 `x` 坐标排序，形成最终的天际线。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义事件点结构
typedef struct {
    int x;
    int height;
} Event;

// 比较函数，用于排序事件点
int compareEvents(const void* a, const void* b) {
    Event* eventA = (Event*)a;
    Event* eventB = (Event*)b;
    if (eventA->x != eventB->x) {
        return eventA->x - eventB->x;
    } else {
        return eventA->height - eventB->height;
    }
}

// 定义最大堆
typedef struct {
    int* data;
    int size;
    int capacity;
} MaxHeap;

// 初始化最大堆
MaxHeap* createMaxHeap(int capacity) {
    MaxHeap* heap = (MaxHeap*)malloc(sizeof(MaxHeap));
    heap->data = (int*)malloc(capacity * sizeof(int));
    heap->size = 0;
    heap->capacity = capacity;
    return heap;
}

// 插入元素到最大堆
void push(MaxHeap* heap, int value) {
    if (heap->size == heap->capacity) {
        heap->capacity *= 2;
        heap->data = (int*)realloc(heap->data, heap->capacity * sizeof(int));
    }
    heap->data[heap->size++] = value;
    // 上浮操作
    int i = heap->size - 1;
    while (i > 0 && heap->data[(i - 1) / 2] < heap->data[i]) {
        int temp = heap->data[(i - 1) / 2];
        heap->data[(i - 1) / 2] = heap->data[i];
        heap->data[i] = temp;
        i = (i - 1) / 2;
    }
}

// 移除堆顶元素
void pop(MaxHeap* heap) {
    if (heap->size == 0) return;
    heap->data[0] = heap->data[--heap->size];
    // 下沉操作
    int i = 0;
    while (2 * i + 1 < heap->size) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int max = left;
        if (right < heap->size && heap->data[right] > heap->data[left]) {
            max = right;
        }
        if (heap->data[i] >= heap->data[max]) break;
        int temp = heap->data[i];
        heap->data[i] = heap->data[max];
        heap->data[max] = temp;
        i = max;
    }
}

// 获取堆顶元素
int top(MaxHeap* heap) {
    if (heap->size == 0) return -1;
    return heap->data[0];
}

// 主函数
int** getSkyline(int** buildings, int buildingsSize, int* buildingsColSize, int* returnSize, int** returnColumnSizes) {
    // 生成事件点
    Event* events = (Event*)malloc(2 * buildingsSize * sizeof(Event));
    int eventCount = 0;
    for (int i = 0; i < buildingsSize; i++) {
        int left = buildings[i][0];
        int right = buildings[i][1];
        int height = buildings[i][2];
        events[eventCount++] = (Event){left, -height}; // 左边界事件点
        events[eventCount++] = (Event){right, height}; // 右边界事件点
    }

    // 排序事件点
    qsort(events, eventCount, sizeof(Event), compareEvents);

    // 初始化最大堆
    MaxHeap* maxHeap = createMaxHeap(buildingsSize);
    push(maxHeap, 0); // 初始高度为 0
    int prevMax = 0; // 记录前一个最大高度

    // 结果数组
    int** result = (int**)malloc(2 * buildingsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(2 * buildingsSize * sizeof(int));
    *returnSize = 0;

    // 扫描线处理
    for (int i = 0; i < eventCount; i++) {
        int x = events[i].x;
        int height = events[i].height;
        if (height < 0) {
            // 左边界事件点，加入堆
            push(maxHeap, -height);
        } else {
            // 右边界事件点，从堆中移除
            if (top(maxHeap) == height) {
                pop(maxHeap);
            } else {
                // 如果堆顶不是当前高度，需要手动移除
                MaxHeap* tempHeap = createMaxHeap(maxHeap->size);
                while (top(maxHeap) != height) {
                    push(tempHeap, top(maxHeap));
                    pop(maxHeap);
                }
                pop(maxHeap);
                while (tempHeap->size > 0) {
                    push(maxHeap, top(tempHeap));
                    pop(tempHeap);
                }
                free(tempHeap->data);
                free(tempHeap);
            }
        }

        // 检查最大高度是否变化
        int currMax = top(maxHeap);
        if (currMax != prevMax) {
            result[*returnSize] = (int*)malloc(2 * sizeof(int));
            result[*returnSize][0] = x;
            result[*returnSize][1] = currMax;
            (*returnColumnSizes)[*returnSize] = 2;
            (*returnSize)++;
            prevMax = currMax;
        }
    }

    // 释放内存
    free(events);
    free(maxHeap->data);
    free(maxHeap);

    return result;
}

// 简单main函数调用
int main() {
    int buildingsData[][3] = { {2, 9, 10}, {3, 7, 15}, {5, 12, 12}, {15, 20, 10}, {19, 24, 8}};
    int buildingsSize = sizeof(buildingsData) / sizeof(buildingsData[0]);
    int* buildings[buildingsSize];
    for (int i = 0; i < buildingsSize; i++) {
        buildings[i] = buildingsData[i];
    }
    int buildingsColSize[buildingsSize];
    for (int i = 0; i < buildingsSize; i++) {
        buildingsColSize[i] = 3;
    }
    int returnSize;
    int* returnColumnSizes;

    int** skyline = getSkyline(buildings, buildingsSize, buildingsColSize, &returnSize, &returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        printf("[%d, %d] ", skyline[i][0], skyline[i][1]);
        free(skyline[i]);
    }
    printf("\n");

    free(skyline);
    free(returnColumnSizes);

    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        // 事件点生成
        vector<pair<int, int>> events;
        for (const auto& building : buildings) {
            int left = building[0], right = building[1], height = building[2];
            events.push_back({left, -height}); // 左边界事件点
            events.push_back({right, height});  // 右边界事件点
        }

        // 排序事件点
        sort(events.begin(), events.end());

        // 最大堆（优先队列）
        priority_queue<int> maxHeap;
        maxHeap.push(0); // 初始高度为 0
        int prevMax = 0; // 记录前一个最大高度

        // 结果
        vector<vector<int>> result;

        // 扫描线处理
        for (const auto& event : events) {
            int x = event.first, height = event.second;
            if (height < 0) {
                // 左边界事件点，加入堆
                maxHeap.push(-height);
            } else {
                // 右边界事件点，从堆中移除
                auto it = maxHeap.top();
                if (it == height) {
                    maxHeap.pop();
                } else {
                    // 如果堆顶不是当前高度，需要手动移除
                    vector<int> temp;
                    while (!maxHeap.empty() && maxHeap.top() != height) {
                        temp.push_back(maxHeap.top());
                        maxHeap.pop();
                    }
                    if (!maxHeap.empty()) {
                        maxHeap.pop();
                    }
                    for (int h : temp) {
                        maxHeap.push(h);
                    }
                }
            }

            // 检查最大高度是否变化
            int currMax = maxHeap.top();
            if (currMax != prevMax) {
                result.push_back({x, currMax});
                prevMax = currMax;
            }
        }

        return result;
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    vector<vector<int>> buildings = { {2, 9, 10}, {3, 7, 15}, {5, 12, 12}, {15, 20, 10}, {19, 24, 8}};
    vector<vector<int>> skyline = solution.getSkyline(buildings);

    for (const auto& point : skyline) {
        cout << "[" << point[0] << ", " << point[1] << "] ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码解释

#### C语言
1. **事件点生成**：
   - 将每个建筑物的左右边界作为事件点，左边界高度为负数，右边界高度为正数。

2. **排序事件点**：
   - 按 `x` 坐标排序，如果 `x` 坐标相同，则按高度排序（左边界优先）。

3. **扫描线处理**：
   - 使用最大堆记录当前扫描线经过的建筑物高度。
   - 遍历事件点，如果是左边界事件点，将高度加入堆；如果是右边界事件点，将高度从堆中移除。
   - 每次处理事件点后，检查堆顶的最大高度是否变化。如果变化，则记录当前 `x` 坐标和新的最大高度。

4. **结果构造**：
   - 将所有记录的关键点按 `x` 坐标排序，形成最终的天际线。

#### C++
1. **事件点生成**：
   - 将每个建筑物的左右边界作为事件点，左边界高度为负数，右边界高度为正数。

2. **排序事件点**：
   - 按 `x` 坐标排序，如果 `x` 坐标相同，则按高度排序（左边界优先）。

3. **扫描线处理**：
   - 使用最大堆记录当前扫描线经过的建筑物高度。
   - 遍历事件点，如果是左边界事件点，将高度加入堆；如果是右边界事件点，将高度从堆中移除。
   - 每次处理事件点后，检查堆顶的最大高度是否变化。如果变化，则记录当前 `x` 坐标和新的最大高度。

4. **结果构造**：
   - 将所有记录的关键点按 `x` 坐标排序，形成最终的天际线。

---

### 测试用例验证

#### 输入
```cpp
buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
```

#### 输出
```plaintext
[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]
```

#### 解释
- 关键点按 `x` 坐标排序，表示天际线的轮廓。

---

### 总结

通过扫描线算法和最大堆的结合，我们可以高效地解决天际线问题。代码逻辑清晰，时间复杂度为 O(n log n)，适合处理大规模数据。

