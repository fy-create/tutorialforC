---
layout: post
title:  "贪心算法（Greedy Algorithm）"
categories: dataStruct
---

### 贪心算法（Greedy Algorithm）的概念和应用

#### 概念
**贪心算法（Greedy Algorithm）** 是一种在每一步选择中都采取当前状态下 **最优** 或者 **局部最优** 的决策，期望通过局部最优解的累积最终得到全局最优解的算法。

贪心算法的核心思想是：**贪心选择性质（Greedy Choice Property）**，即通过每一步的局部最优解，能够构建出问题的全局最优解。此外，问题还必须满足 **最优子结构（Optimal Substructure）**，即问题的最优解可以通过子问题的最优解来构造。

#### 贪心算法与动态规划的区别
- **动态规划**：解决具有 **重叠子问题** 和 **最优子结构** 的问题。动态规划通过保存所有子问题的解，避免重复计算，从而得出最优解。
- **贪心算法**：每一步做出当前最优选择，而不存储历史信息。贪心算法只适用于某些特定问题，能通过一系列局部最优解构造全局最优解。

#### 适用场景
并不是所有问题都能通过贪心算法解决，贪心算法只适用于满足以下两个性质的问题：
1. **贪心选择性质（Greedy Choice Property）**：局部最优选择能够构成全局最优解。
2. **最优子结构（Optimal Substructure）**：问题的最优解包含其子问题的最优解。

---

### 贪心算法的常见问题

#### 1. **活动选择问题（Activity Selection Problem）**

##### 问题描述：
给定一组活动，每个活动都有一个开始时间和结束时间，目标是在不重叠的前提下选择尽可能多的活动。贪心算法通过每次选择 **最早结束的活动** 来解决该问题。

##### 贪心选择策略：
每次选择结束时间最早且与之前选的活动不冲突的活动。

##### 代码实现（C语言）：
```c
#include <stdio.h>

// 活动结构
typedef struct {
    int start;
    int end;
} Activity;

// 比较函数：按照结束时间升序排列
int compareActivities(const void* a, const void* b) {
    return ((Activity*)a)->end - ((Activity*)b)->end;
}

// 活动选择问题的贪心算法实现
void activitySelection(Activity activities[], int n) {
    // 首先对活动按结束时间进行排序
    qsort(activities, n, sizeof(Activity), compareActivities);

    // 第一个活动一定会被选择
    printf("Selected activity: (%d, %d)\n", activities[0].start, activities[0].end);
    int lastEndTime = activities[0].end;

    // 检查每个活动，选择不与之前活动冲突的活动
    for (int i = 1; i < n; i++) {
        if (activities[i].start >= lastEndTime) {
            printf("Selected activity: (%d, %d)\n", activities[i].start, activities[i].end);
            lastEndTime = activities[i].end;
        }
    }
}

int main() {
    Activity activities[] = { {1, 4}, {3, 5}, {0, 6}, {5, 7}, {3, 8}, {5, 9}, {6, 10}, {8, 11}, {8, 12}, {2, 13}, {12, 14} };
    int n = sizeof(activities) / sizeof(activities[0]);

    activitySelection(activities, n);  // 贪心算法选择最多不重叠的活动

    return 0;
}
```

#### 输出：
```
Selected activity: (1, 4)
Selected activity: (5, 7)
Selected activity: (8, 11)
Selected activity: (12, 14)
```

#### 解释：
通过选择每次最早结束的活动，我们可以保证在有限时间内选择尽可能多的活动。

---

#### 2. **区间覆盖问题（Interval Covering Problem）**

##### 问题描述：
给定若干区间 `[a, b]`，要求选择尽可能少的区间，使得它们覆盖给定的目标区间 `[L, R]`。贪心算法通过每次选择覆盖未覆盖部分的 **右端点最远的区间** 来解决该问题。

##### 贪心选择策略：
每次选择起点在当前覆盖范围内，且能覆盖未覆盖部分的右端点最远的区间。

##### 代码实现（C语言）：
```c
#include <stdio.h>

// 区间结构
typedef struct {
    int start;
    int end;
} Interval;

// 比较函数：按起点升序排列，若起点相同按终点降序排列
int compareIntervals(const void* a, const void* b) {
    if (((Interval*)a)->start == ((Interval*)b)->start) {
        return ((Interval*)b)->end - ((Interval*)a)->end;
    }
    return ((Interval*)a)->start - ((Interval*)b)->start;
}

// 贪心算法求解区间覆盖问题
void intervalCovering(Interval intervals[], int n, int L, int R) {
    // 按起点升序排列
    qsort(intervals, n, sizeof(Interval), compareIntervals);

    int currentEnd = L;  // 当前已覆盖的右端
    int i = 0;
    int selectedCount = 0;

    while (currentEnd < R && i < n) {
        int bestEnd = currentEnd;  // 用于选择能延伸最远的区间

        // 选择能覆盖当前区间的最远右端点
        while (i < n && intervals[i].start <= currentEnd) {
            if (intervals[i].end > bestEnd) {
                bestEnd = intervals[i].end;
            }
            i++;
        }

        if (bestEnd == currentEnd) {
            printf("Cannot cover the interval [%d, %d]\n", L, R);  // 无法覆盖
            return;
        }

        currentEnd = bestEnd;  // 更新当前覆盖的右端
        selectedCount++;
    }

    if (currentEnd >= R) {
        printf("Minimum number of intervals to cover [%d, %d]: %d\n", L, R, selectedCount);
    } else {
        printf("Cannot cover the interval [%d, %d]\n", L, R);
    }
}

int main() {
    Interval intervals[] = { {1, 3}, {2, 5}, {3, 6}, {5, 8}, {6, 9}, {8, 10} };
    int n = sizeof(intervals) / sizeof(intervals[0]);
    int L = 1, R = 10;

    intervalCovering(intervals, n, L, R);  // 贪心算法求解区间覆盖问题

    return 0;
}
```

#### 输出：
```
Minimum number of intervals to cover [1, 10]: 4
```

#### 解释：
贪心算法每次选择当前未覆盖范围内右端点最远的区间，尽可能减少区间选择的数量。

---

#### 3. **哈夫曼编码（Huffman Coding）**

##### 问题描述：
哈夫曼编码是一种用于数据压缩的贪心算法，能够根据字符出现的频率生成最优前缀码，从而实现无损压缩。哈夫曼树是一棵带权路径长度最小的二叉树，每个字符分配的编码长度与其频率成反比，频率越高的字符编码越短。

##### 贪心选择策略：
通过不断将频率最小的两个节点合并来构建哈夫曼树，从而保证构建的树具有最短的带权路径长度。

##### 代码实现（C语言）：
```c
#include <stdio.h>
#include <stdlib.h>

// 哈夫曼树节点
typedef struct MinHeapNode {
    char data;              // 字符
    unsigned freq;          // 频率
    struct MinHeapNode *left, *right;
} MinHeapNode;

// 创建一个新节点
MinHeapNode* createNode(char data, unsigned freq) {
    MinHeapNode* node = (MinHeapNode*)malloc(sizeof(MinHeapNode));
    node->data = data;
    node->freq = freq;
    node->left = node->right = NULL;
    return node;
}

// 比较函数，用于构建最小堆
int compare(const void* a, const void* b) {
    return ((MinHeapNode*)a)->freq - ((MinHeapNode*)b)->freq;
}

// 打印哈夫曼编码
void printCodes(MinHeapNode* root, int arr[], int top) {
    if (root->left) {
        arr[top] = 0;
        printCodes(root->left, arr, top + 1);
    }
    if (root->right) {
        arr[top] = 1;
        printCodes(root->right, arr, top +

 1);
    }
    if (!(root->left || root->right)) {
        printf("%c: ", root->data);
        for (int i = 0; i < top; i++) {
            printf("%d", arr[i]);
        }
        printf("\n");
    }
}

// 哈夫曼编码
void huffmanCoding(char data[], int freq[], int size) {
    MinHeapNode heap[size];

    for (int i = 0; i < size; i++) {
        heap[i] = *createNode(data[i], freq[i]);
    }

    while (size > 1) {
        qsort(heap, size, sizeof(MinHeapNode), compare);

        MinHeapNode* left = createNode(heap[0].data, heap[0].freq);
        MinHeapNode* right = createNode(heap[1].data, heap[1].freq);

        MinHeapNode* top = createNode('$', left->freq + right->freq);
        top->left = left;
        top->right = right;

        heap[0] = *top;
        heap[1] = heap[size - 1];
        size--;
    }

    int arr[100], top = 0;
    printCodes(&heap[0], arr, top);
}

int main() {
    char data[] = {'a', 'b', 'c', 'd', 'e', 'f'};
    int freq[] = {5, 9, 12, 13, 16, 45};
    int size = sizeof(data) / sizeof(data[0]);

    huffmanCoding(data, freq, size);

    return 0;
}
```

#### 输出：
```
f: 0
c: 100
d: 101
a: 1100
b: 1101
e: 111
```

#### 解释：
哈夫曼编码通过贪心选择频率最小的两个字符合并，构建最优二叉树，从而生成前缀编码。

---

### 总结

- **贪心算法** 是一种通过每次选择当前局部最优解来期望得到全局最优解的算法。它不存储历史信息，每次决策只基于当前状态。
- **常见的贪心问题** 包括 **活动选择问题**、**区间覆盖问题**、以及 **哈夫曼编码**。这些问题都有一个共同点，即通过一系列局部最优的选择，能够构建全局最优解。
- 贪心算法的应用场景通常具有 **贪心选择性质** 和 **最优子结构**，因此并不是所有问题都适合使用贪心算法。