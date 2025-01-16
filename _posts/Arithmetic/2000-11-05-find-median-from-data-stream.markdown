---
layout: post
title:  "295. 数据流的中位数"
categories: arithmetic
---

[295. 数据流的中位数](https://leetcode.cn/problems/find-median-from-data-stream)

### 题目描述

设计一个支持以下两种操作的数据结构：

1. **`void addNum(int num)`**：从数据流中添加一个整数到数据结构中。
2. **`double findMedian()`**：返回目前所有元素的中位数。

**注意：**
- 如果数据流中元素的数量是偶数，则中位数是中间两个数的平均值。
- 如果数据流中元素的数量是奇数，则中位数是中间的那个数。

**示例 1:**

```
输入:
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
输出:
[null, null, null, 1.5, null, 2.0]

解释:
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);
medianFinder.addNum(2);
medianFinder.findMedian(); // 返回 1.5
medianFinder.addNum(3);
medianFinder.findMedian(); // 返回 2.0
```

**提示：**
- `-10^5 <= num <= 10^5`
- 最多调用 `addNum` 和 `findMedian` 方法 `5 * 10^4` 次。

---

### 解题思路

这是一个典型的数据流中位数问题。为了高效地支持 `addNum` 和 `findMedian` 操作，可以使用两个堆来维护数据流中的元素：

1. **大顶堆（Max Heap）：**
   - 存储数据流中较小的一半元素。
   - 堆顶是较小一半元素中的最大值。

2. **小顶堆（Min Heap）：**
   - 存储数据流中较大的一半元素。
   - 堆顶是较大一半元素中的最小值。

3. **平衡两个堆：**
   - 确保两个堆的大小差不超过 1。
   - 如果两个堆的大小相等，则中位数是两个堆顶元素的平均值。
   - 如果大小不等，则中位数是较大堆的堆顶元素。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 50000

typedef struct {
    int* maxHeap;
    int* minHeap;
    int maxHeapSize;
    int minHeapSize;
} MedianFinder;

// 辅助函数：交换两个整数
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 辅助函数：维护大顶堆的性质
void maxHeapify(int* heap, int size, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < size && heap[left] > heap[largest]) {
        largest = left;
    }
    if (right < size && heap[right] > heap[largest]) {
        largest = right;
    }
    if (largest != i) {
        swap(&heap[i], &heap[largest]);
        maxHeapify(heap, size, largest);
    }
}

// 辅助函数：维护小顶堆的性质
void minHeapify(int* heap, int size, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < size && heap[left] < heap[smallest]) {
        smallest = left;
    }
    if (right < size && heap[right] < heap[smallest]) {
        smallest = right;
    }
    if (smallest != i) {
        swap(&heap[i], &heap[smallest]);
        minHeapify(heap, size, smallest);
    }
}

// 初始化 MedianFinder
MedianFinder* medianFinderCreate() {
    MedianFinder* obj = (MedianFinder*)malloc(sizeof(MedianFinder));
    obj->maxHeap = (int*)malloc(MAX_SIZE * sizeof(int));
    obj->minHeap = (int*)malloc(MAX_SIZE * sizeof(int));
    obj->maxHeapSize = 0;
    obj->minHeapSize = 0;
    return obj;
}

// 添加一个数字
void medianFinderAddNum(MedianFinder* obj, int num) {
    if (obj->maxHeapSize == 0 || num <= obj->maxHeap[0]) {
        obj->maxHeap[obj->maxHeapSize++] = num;
        for (int i = obj->maxHeapSize / 2 - 1; i >= 0; i--) {
            maxHeapify(obj->maxHeap, obj->maxHeapSize, i);
        }
    } else {
        obj->minHeap[obj->minHeapSize++] = num;
        for (int i = obj->minHeapSize / 2 - 1; i >= 0; i--) {
            minHeapify(obj->minHeap, obj->minHeapSize, i);
        }
    }

    // 平衡两个堆
    if (obj->maxHeapSize > obj->minHeapSize + 1) {
        obj->minHeap[obj->minHeapSize++] = obj->maxHeap[0];
        obj->maxHeap[0] = obj->maxHeap[--obj->maxHeapSize];
        maxHeapify(obj->maxHeap, obj->maxHeapSize, 0);
        minHeapify(obj->minHeap, obj->minHeapSize, 0);
    } else if (obj->minHeapSize > obj->maxHeapSize) {
        obj->maxHeap[obj->maxHeapSize++] = obj->minHeap[0];
        obj->minHeap[0] = obj->minHeap[--obj->minHeapSize];
        minHeapify(obj->minHeap, obj->minHeapSize, 0);
        maxHeapify(obj->maxHeap, obj->maxHeapSize, 0);
    }
}

// 查找中位数
double medianFinderFindMedian(MedianFinder* obj) {
    if (obj->maxHeapSize > obj->minHeapSize) {
        return obj->maxHeap[0];
    } else {
        return (obj->maxHeap[0] + obj->minHeap[0]) / 2.0;
    }
}

// 释放 MedianFinder
void medianFinderFree(MedianFinder* obj) {
    free(obj->maxHeap);
    free(obj->minHeap);
    free(obj);
}

// 测试代码
int main() {
    MedianFinder* obj = medianFinderCreate();
    medianFinderAddNum(obj, 1);
    medianFinderAddNum(obj, 2);
    printf("中位数: %f\n", medianFinderFindMedian(obj)); // 输出 1.5
    medianFinderAddNum(obj, 3);
    printf("中位数: %f\n", medianFinderFindMedian(obj)); // 输出 2.0
    medianFinderFree(obj);

    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <queue>
using namespace std;

class MedianFinder {
private:
    priority_queue<int> maxHeap; // 大顶堆，存储较小的一半
    priority_queue<int, vector<int>, greater<int>> minHeap; // 小顶堆，存储较大的一半

public:
    MedianFinder() {}

    void addNum(int num) {
        if (maxHeap.empty() || num <= maxHeap.top()) {
            maxHeap.push(num);
        } else {
            minHeap.push(num);
        }

        // 平衡两个堆
        if (maxHeap.size() > minHeap.size() + 1) {
            minHeap.push(maxHeap.top());
            maxHeap.pop();
        } else if (minHeap.size() > maxHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }

    double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        } else {
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
    }
};

// 测试代码
int main() {
    MedianFinder medianFinder;
    medianFinder.addNum(1);
    medianFinder.addNum(2);
    cout << "中位数: " << medianFinder.findMedian() << endl; // 输出 1.5
    medianFinder.addNum(3);
    cout << "中位数: " << medianFinder.findMedian() << endl; // 输出 2.0

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用数组实现大顶堆和小顶堆。
   - 手动维护堆的性质，确保堆的正确性。
   - 时间复杂度为 O(log n) 每次操作，空间复杂度为 O(n)。

2. **C++ 实现：**
   - 使用 STL 容器 `priority_queue` 实现大顶堆和小顶堆。
   - 代码简洁高效，符合 C++ 编程风格。
   - 时间复杂度与 C 语言实现相同。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地支持数据流中位数的查询和更新操作。