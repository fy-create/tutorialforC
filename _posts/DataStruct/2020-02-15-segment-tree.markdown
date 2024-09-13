---
layout: post
title:  "线段树（Segment Tree）"
categories: dataStruct
---

### 线段树（Segment Tree）的概念和应用

#### 概念
**线段树（Segment Tree）** 是一种用于高效解决 **区间查询** 和 **区间更新** 问题的高级数据结构。它将数组的区间划分为若干段，维护每个段的信息（如区间和、区间最小值、区间最大值等），使得我们能够在 **O(log n)** 时间内高效完成区间查询和更新。

线段树的结构可以看作是一个二叉树，每个节点存储某个区间的信息，叶子节点存储数组中的单个元素，中间节点存储其子节点代表的区间的信息。

#### 线段树的常见操作
1. **构建（Build）**：从一个给定数组构建线段树。时间复杂度 **O(n)**。
2. **查询（Query）**：在数组的某个区间内查询（如查询区间最小值、区间和等）。时间复杂度 **O(log n)**。
3. **更新（Update）**：更新数组中的某个元素，并维护线段树的正确性。时间复杂度 **O(log n)**。

#### 应用
- **区间最值**：查询某个区间内的最大值或最小值。
- **区间和**：查询某个区间的所有元素的和。
- **区间更新**：在某个区间内更新元素，如将某个区间内的所有元素加上一个常数。

---

### 1. **线段树的实现（C语言）**

#### 线段树支持查询区间和，并支持单点更新操作。

#### 代码实现：
```c
#include <stdio.h>
#include <stdlib.h>

// 定义线段树结构
typedef struct {
    int* tree;  // 用于存储线段树节点
    int n;      // 数组长度
} SegmentTree;

// 创建线段树
SegmentTree* createSegmentTree(int arr[], int n) {
    SegmentTree* segTree = (SegmentTree*)malloc(sizeof(SegmentTree));
    segTree->n = n;
    // 线段树的大小最多为 4 * n
    segTree->tree = (int*)malloc(4 * n * sizeof(int));
    
    // 构建线段树
    buildSegmentTree(segTree, arr, 0, 0, n - 1);
    return segTree;
}

// 构建线段树（递归）
void buildSegmentTree(SegmentTree* segTree, int arr[], int node, int start, int end) {
    if (start == end) {
        // 叶子节点，存储数组中的元素
        segTree->tree[node] = arr[start];
    } else {
        int mid = (start + end) / 2;
        int leftChild = 2 * node + 1;
        int rightChild = 2 * node + 2;
        
        // 递归构建左右子树
        buildSegmentTree(segTree, arr, leftChild, start, mid);
        buildSegmentTree(segTree, rightChild, mid + 1, end);
        
        // 合并左右子树的结果（这里是求和）
        segTree->tree[node] = segTree->tree[leftChild] + segTree->tree[rightChild];
    }
}

// 区间查询 [L, R]
int rangeQuery(SegmentTree* segTree, int node, int start, int end, int L, int R) {
    if (R < start || L > end) {
        // 查询区间 [L, R] 完全在节点区间之外，返回无效值（区间和问题返回 0）
        return 0;
    }
    
    if (L <= start && end <= R) {
        // 查询区间 [L, R] 完全覆盖节点区间，直接返回节点的值
        return segTree->tree[node];
    }
    
    // 部分重叠，递归查询左右子树
    int mid = (start + end) / 2;
    int leftChild = 2 * node + 1;
    int rightChild = 2 * node + 2;
    
    int leftSum = rangeQuery(segTree, leftChild, start, mid, L, R);
    int rightSum = rangeQuery(segTree, rightChild, mid + 1, end, L, R);
    
    return leftSum + rightSum;
}

// 单点更新，将 arr[index] 更新为 value
void pointUpdate(SegmentTree* segTree, int node, int start, int end, int index, int value) {
    if (start == end) {
        // 叶子节点，更新值
        segTree->tree[node] = value;
    } else {
        int mid = (start + end) / 2;
        int leftChild = 2 * node + 1;
        int rightChild = 2 * node + 2;
        
        if (index <= mid) {
            // 更新左子树
            pointUpdate(segTree, leftChild, start, mid, index, value);
        } else {
            // 更新右子树
            pointUpdate(segTree, rightChild, mid + 1, end, index, value);
        }
        
        // 更新当前节点的值
        segTree->tree[node] = segTree->tree[leftChild] + segTree->tree[rightChild];
    }
}

int main() {
    // 初始化数组
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr) / sizeof(arr[0]);

    // 创建线段树
    SegmentTree* segTree = createSegmentTree(arr, n);
    
    // 查询区间和：从索引 1 到 3
    printf("Sum of values in range [1, 3]: %d\n", rangeQuery(segTree, 0, 0, n - 1, 1, 3));
    
    // 更新数组中索引 1 的值为 10
    pointUpdate(segTree, 0, 0, n - 1, 1, 10);
    
    // 更新后的区间和查询
    printf("Sum of values in range [1, 3] after update: %d\n", rangeQuery(segTree, 0, 0, n - 1, 1, 3));

    return 0;
}
```

#### 输出：
```
Sum of values in range [1, 3]: 15
Sum of values in range [1, 3] after update: 22
```

#### 代码解析：
1. **构建线段树**：通过递归地将数组划分为区间并构建线段树。叶子节点存储单个数组元素，内部节点存储其子节点的合并结果（在这里是区间和）。
2. **区间查询**：通过递归的方式处理查询请求。如果查询的区间与节点的区间完全不相交，则返回一个默认值（例如对于区间和问题，返回 `0`）。否则，递归查询左右子树并合并结果。
3. **单点更新**：递归地更新某个节点值，并在回溯时更新相关的父节点。

---

### 2. **线段树的操作时间复杂度分析**

1. **构建（Build）**：O(n)
   - 构建线段树时，我们递归地将数组分为区间，并对每个区间进行合并操作。每次递归调用处理的节点数总共是 `2n-1`，因此构建操作的复杂度为 **O(n)**。

2. **查询（Query）**：O(log n)
   - 每次查询操作涉及最多 **O(log n)** 层的递归，因为线段树的高度为 **O(log n)**，并且在每一层最多访问两个子树。

3. **更新（Update）**：O(log n)
   - 更新操作同样涉及最多 **O(log n)** 层的递归，因此单点更新的复杂度也是 **O(log n)**。

---

### 3. **线段树的应用场景**

1. **区间和查询**：
   - 问题：给定一个数组，支持以下两种操作：查询某个区间的元素和，更新某个元素的值。
   - 解决方案：通过线段树，我们可以在 **O(log n)** 时间内完成区间和查询，并在 **O(log n)** 时间内完成单点更新。

2. **区间最值查询**：
   - 问题：查询某个区间内的最大值或最小值。
   - 解决方案：线段树可以存储每个区间的最大值或最小值，实现快速查询和单点更新。

3. **区间更新**：
   - 问题：在给定区间内对所有元素执行某种操作（如增加一个常数）。
   - 解决方案：通过线段树的 **懒惰标记** 技巧，可以有效处理区间更新操作。

---

### 4. **线段树的扩展**

#### 懒惰标记（Lazy Propagation）
- 在

某些场景中，我们不仅要查询区间，还需要对整个区间进行更新（如区间内所有元素加上某个常数）。这种情况下，直接更新每个元素的复杂度为 **O(n)**，但使用 **懒惰标记（Lazy Propagation）** 技术，可以在 **O(log n)** 时间内完成区间更新。
- 核心思想是延迟操作：当遇到一个区间更新操作时，我们不立即更新所有的子节点，而是对该节点打上一个 **懒惰标记**，表示这个区间的更新待处理。当查询或更新该节点的子区间时，再将标记的更新应用到子区间上。

---

### 总结

- **线段树（Segment Tree）** 是一种强大的数据结构，能够在 **O(log n)** 时间内完成区间查询和更新操作。
- 它适用于处理数组上的 **区间最值**、**区间和**、**区间更新** 等问题，是处理这些问题的常用工具。
- **懒惰标记（Lazy Propagation）** 是线段树的一个重要扩展，能够高效处理区间更新操作，使得更新和查询的时间复杂度仍然保持在 **O(log n)**。