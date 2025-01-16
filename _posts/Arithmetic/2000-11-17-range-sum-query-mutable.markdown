---
layout: post
title:  "307. 区域和检索 - 数组可修改"
categories: arithmetic
---

[307. 区域和检索 - 数组可修改](https://leetcode.cn/problems/range-sum-query-mutable)

### 题目描述：

给定一个整数数组 `nums`，实现一个数据结构提供以下两项操作：

1. **更新**：更新数组中某个索引的元素。
2. **求和**：返回数组中某个区间 `[left, right]` 的元素和（包括 `left` 和 `right`）。

实现一个 `NumArray` 类，它支持以下操作：

- `NumArray(int[] nums)`：初始化数据结构。
- `void update(int index, int val)`：将索引 `index` 的元素更新为 `val`。
- `int sumRange(int left, int right)`：返回区间 `[left, right]` 的元素和。

#### 示例：

**示例 1：**

```text
输入：
["NumArray", "sumRange", "update", "sumRange"]
[[[-1, 1, 3, 4, 5]], [0, 3], [3, 2], [0, 3]]

输出：
[null, 8, null, 6]

解释：
NumArray numArray = new NumArray([-1, 1, 3, 4, 5]);
numArray.sumRange(0, 3); // 返回 8 -> (-1 + 1 + 3 + 4)
numArray.update(3, 2);   // 将索引 3 的元素更新为 2
numArray.sumRange(0, 3); // 返回 6 -> (-1 + 1 + 3 + 2)
```

**示例 2：**

```text
输入：
["NumArray", "update", "sumRange", "update", "sumRange"]
[[[9, -8, 2, 7, 3, 5, -2]], [0, 5], [2, 4], [3, 8], [4, 3]]

输出：
[null, null, 18, null, 16]
```

#### 提示：

- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `0 <= index < nums.length`
- `-100 <= val <= 100`
- `0 <= left <= right < nums.length`
- 调用 `update` 和 `sumRange` 的次数不会超过 `3 * 10^4`。

---

### 解题思路：

这个问题涉及到的是区间求和与动态更新，因此需要高效的数据结构来处理这两类操作。

1. **直接方法不合适**：
   - 如果每次 `sumRange` 都遍历整个区间计算总和，时间复杂度是 `O(n)`，而如果我们要处理 `3 * 10^4` 次操作，时间复杂度将会非常高。

2. **优化思路**：
   - 使用 **线段树（Segment Tree）** 或 **树状数组（Fenwick Tree）** 来优化这两类操作。
     - 线段树可以在 `O(log n)` 时间内进行区间求和以及单点更新。
     - 树状数组也可以在 `O(log n)` 时间内实现单点更新和区间求和。

3. **线段树实现**：
   - 线段树的基本思想是将数组划分为多个区间，每个区间有一个求和的值，更新时只需要更新包含该位置的区间求和。
   - 区间求和操作可以通过线段树的合并规则在 `O(log n)` 时间内完成。

4. **设计 `NumArray` 类**：
   - 使用一个数组来存储原始数据。
   - 使用线段树进行区间和计算，并支持单点更新。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* tree;   // 线段树数组
    int* nums;   // 原始数据数组
    int size;    // 数组的大小
} NumArray;

// 初始化函数，构建线段树
void buildSegmentTree(NumArray* numArray, int start, int end, int node) {
    if (start == end) {
        numArray->tree[node] = numArray->nums[start];
    } else {
        int mid = (start + end) / 2;
        buildSegmentTree(numArray, start, mid, 2 * node + 1);
        buildSegmentTree(numArray, mid + 1, end, 2 * node + 2);
        numArray->tree[node] = numArray->tree[2 * node + 1] + numArray->tree[2 * node + 2];
    }
}

// 更新线段树
void updateSegmentTree(NumArray* numArray, int start, int end, int node, int index, int val) {
    if (start == end) {
        numArray->nums[index] = val;
        numArray->tree[node] = val;
    } else {
        int mid = (start + end) / 2;
        if (index <= mid) {
            updateSegmentTree(numArray, start, mid, 2 * node + 1, index, val);
        } else {
            updateSegmentTree(numArray, mid + 1, end, 2 * node + 2, index, val);
        }
        numArray->tree[node] = numArray->tree[2 * node + 1] + numArray->tree[2 * node + 2];
    }
}

// 区间求和
int sumSegmentTree(NumArray* numArray, int start, int end, int node, int left, int right) {
    if (right < start || end < left) {
        return 0;  // 不相交，返回0
    }
    if (left <= start && end <= right) {
        return numArray->tree[node];  // 完全包含，返回当前节点的值
    }
    int mid = (start + end) / 2;
    int leftSum = sumSegmentTree(numArray, start, mid, 2 * node + 1, left, right);
    int rightSum = sumSegmentTree(numArray, mid + 1, end, 2 * node + 2, left, right);
    return leftSum + rightSum;
}

// 创建 NumArray 数据结构
NumArray* numArrayCreate(int* nums, int numsSize) {
    NumArray* numArray = (NumArray*)malloc(sizeof(NumArray));
    numArray->size = numsSize;
    numArray->nums = (int*)malloc(sizeof(int) * numsSize);
    numArray->tree = (int*)malloc(sizeof(int) * 4 * numsSize);  // 线段树的大小
    for (int i = 0; i < numsSize; i++) {
        numArray->nums[i] = nums[i];
    }
    buildSegmentTree(numArray, 0, numsSize - 1, 0);  // 构建线段树
    return numArray;
}

// 更新操作
void numArrayUpdate(NumArray* numArray, int index, int val) {
    updateSegmentTree(numArray, 0, numArray->size - 1, 0, index, val);
}

// 查询操作
int numArraySumRange(NumArray* numArray, int left, int right) {
    return sumSegmentTree(numArray, 0, numArray->size - 1, 0, left, right);
}

// 释放内存
void numArrayFree(NumArray* numArray) {
    free(numArray->nums);
    free(numArray->tree);
    free(numArray);
}

int main() {
    int nums[] = {-1, 1, 3, 4, 5};
    int numsSize = 5;

    // 创建 NumArray 数据结构
    NumArray* obj = numArrayCreate(nums, numsSize);
    
    // 查询范围 [0, 3]
    printf("%d\n", numArraySumRange(obj, 0, 3));  // 输出 8
    
    // 更新操作
    numArrayUpdate(obj, 3, 2);
    
    // 查询范围 [0, 3] 更新后的结果
    printf("%d\n", numArraySumRange(obj, 0, 3));  // 输出 6
    
    // 释放内存
    numArrayFree(obj);
    
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class NumArray {
private:
    vector<int> tree;
    vector<int> nums;
    int size;

    void buildSegmentTree(int start, int end, int node) {
        if (start == end) {
            tree[node] = nums[start];
        } else {
            int mid = (start + end) / 2;
            buildSegmentTree(start, mid, 2 * node + 1);
            buildSegmentTree(mid + 1, end, 2 * node + 2);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    void updateSegmentTree(int start, int end, int node, int index, int val) {
        if (start == end) {
            nums[index] = val;
            tree[node] = val;
        } else {
            int mid = (start + end)

 / 2;
            if (index <= mid) {
                updateSegmentTree(start, mid, 2 * node + 1, index, val);
            } else {
                updateSegmentTree(mid + 1, end, 2 * node + 2, index, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }

    int sumSegmentTree(int start, int end, int node, int left, int right) {
        if (right < start || end < left) {
            return 0;  // 不相交，返回0
        }
        if (left <= start && end <= right) {
            return tree[node];  // 完全包含，返回当前节点的值
        }
        int mid = (start + end) / 2;
        int leftSum = sumSegmentTree(start, mid, 2 * node + 1, left, right);
        int rightSum = sumSegmentTree(mid + 1, end, 2 * node + 2, left, right);
        return leftSum + rightSum;
    }

public:
    NumArray(vector<int>& nums) {
        size = nums.size();
        this->nums = nums;
        tree.resize(4 * size);  // 线段树的大小
        buildSegmentTree(0, size - 1, 0);  // 构建线段树
    }

    void update(int index, int val) {
        updateSegmentTree(0, size - 1, 0, index, val);
    }

    int sumRange(int left, int right) {
        return sumSegmentTree(0, size - 1, 0, left, right);
    }
};

int main() {
    vector<int> nums = {-1, 1, 3, 4, 5};
    
    // 创建 NumArray 数据结构
    NumArray numArray(nums);
    
    // 查询范围 [0, 3]
    cout << numArray.sumRange(0, 3) << endl;  // 输出 8
    
    // 更新操作
    numArray.update(3, 2);
    
    // 查询范围 [0, 3] 更新后的结果
    cout << numArray.sumRange(0, 3) << endl;  // 输出 6
    
    return 0;
}
```

### 代码解析：

1. **初始化线段树**：
   - 初始化时通过 `buildSegmentTree` 函数构建线段树，树的每个节点表示区间的和。时间复杂度是 `O(n)`。

2. **更新操作**：
   - 更新时通过 `updateSegmentTree` 递归更新相应的节点，时间复杂度是 `O(log n)`。

3. **区间求和**：
   - 查询某个区间的和时，使用 `sumSegmentTree` 递归合并左右子树的结果，时间复杂度是 `O(log n)`。

4. **空间复杂度**：
   - 线段树需要 `O(4 * n)` 的空间，原始数据数组需要 `O(n)` 的空间，总的空间复杂度是 `O(4 * n)`。

### 总结：

通过线段树可以有效地支持区间求和和单点更新操作，时间复杂度为 `O(log n)`，可以在大数据量下高效运行。