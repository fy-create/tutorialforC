---
layout: post
title:  "310. 最小高度树"
categories: arithmetic
---

[310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees)

### 题目描述

给定一个无向图，包含 `n` 个节点和 `n - 1` 条边，形成一个树结构。你需要找到所有 **最小高度树** 的根节点。

**最小高度树** 的定义是：以这些节点为根的树，其高度是所有可能的树中最小的。树的高度是指从根节点到最远叶子节点的最长路径上的边数。

**注意：**
- 树是一个无向图，其中任何两个节点之间只有一条唯一的路径。
- 给定的输入保证是一个有效的树。

**示例 1:**

```
输入: n = 4, edges = [[1, 0], [1, 2], [1, 3]]
输出: [1]
解释: 
以节点 1 为根的树高度为 1，是最小高度树。
```

**示例 2:**

```
输入: n = 6, edges = [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]
输出: [3, 4]
解释: 
以节点 3 或 4 为根的树高度为 2，是最小高度树。
```

**提示：**
- `1 <= n <= 2 * 10^4`
- `edges.length == n - 1`
- `0 <= ai, bi < n`
- `ai != bi`
- 所有 `(ai, bi)` 都是不同的。
- 给定的输入保证是一个有效的树。

---

### 解题思路

这是一个典型的图论问题。我们需要找到树中所有可能的根节点，使得以这些节点为根的树高度最小。

1. **拓扑排序思想：**
   - 最小高度树的根节点一定位于树的中心，即最长路径的中间位置。
   - 通过不断删除叶子节点（度为 1 的节点），最终剩下的节点就是最小高度树的根节点。

2. **算法步骤：**
   - 计算每个节点的度。
   - 将所有度为 1 的节点加入队列。
   - 不断删除叶子节点，并更新相邻节点的度，直到剩下 1 或 2 个节点。
   - 剩下的节点就是最小高度树的根节点。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_N 20000

// 辅助函数：找到最小高度树的根节点
int* findMinHeightTrees(int n, int** edges, int edgesSize, int* edgesColSize, int* returnSize) {
    if (n == 1) {
        *returnSize = 1;
        int* result = (int*)malloc(sizeof(int));
        result[0] = 0;
        return result;
    }

    // 初始化邻接表和度数组
    int* degrees = (int*)calloc(n, sizeof(int));
    int** adjList = (int**)malloc(n * sizeof(int*));
    for (int i = 0; i < n; i++) {
        adjList[i] = (int*)malloc(0);
    }

    // 构建邻接表和度数组
    for (int i = 0; i < edgesSize; i++) {
        int u = edges[i][0];
        int v = edges[i][1];
        degrees[u]++;
        degrees[v]++;
        adjList[u] = (int*)realloc(adjList[u], (degrees[u] + 1) * sizeof(int));
        adjList[v] = (int*)realloc(adjList[v], (degrees[v] + 1) * sizeof(int));
        adjList[u][degrees[u] - 1] = v;
        adjList[v][degrees[v] - 1] = u;
    }

    // 初始化队列
    int* queue = (int*)malloc(n * sizeof(int));
    int front = 0, rear = 0;
    for (int i = 0; i < n; i++) {
        if (degrees[i] == 1) {
            queue[rear++] = i;
        }
    }

    // 拓扑排序
    int remainingNodes = n;
    while (remainingNodes > 2) {
        int size = rear - front;
        remainingNodes -= size;
        for (int i = 0; i < size; i++) {
            int node = queue[front++];
            for (int j = 0; j < degrees[node]; j++) {
                int neighbor = adjList[node][j];
                degrees[neighbor]--;
                if (degrees[neighbor] == 1) {
                    queue[rear++] = neighbor;
                }
            }
        }
    }

    // 返回结果
    *returnSize = rear - front;
    int* result = (int*)malloc(*returnSize * sizeof(int));
    for (int i = 0; i < *returnSize; i++) {
        result[i] = queue[front + i];
    }

    // 释放内存
    free(degrees);
    for (int i = 0; i < n; i++) {
        free(adjList[i]);
    }
    free(adjList);
    free(queue);

    return result;
}

// 测试代码
int main() {
    int n = 6;
    int edges[5][2] = { {3, 0}, {3, 1}, {3, 2}, {3, 4}, {5, 4}};
    int* edgesPtr[5];
    for (int i = 0; i < 5; i++) {
        edgesPtr[i] = edges[i];
    }
    int edgesColSize[5] = {2, 2, 2, 2, 2};
    int returnSize;

    int* result = findMinHeightTrees(n, edgesPtr, 5, edgesColSize, &returnSize);

    printf("最小高度树的根节点: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result);
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) {
            return {0};
        }

        // 初始化邻接表和度数组
        vector<vector<int>> adjList(n);
        vector<int> degrees(n, 0);

        // 构建邻接表和度数组
        for (const auto& edge : edges) {
            int u = edge[0];
            int v = edge[1];
            adjList[u].push_back(v);
            adjList[v].push_back(u);
            degrees[u]++;
            degrees[v]++;
        }

        // 初始化队列
        queue<int> q;
        for (int i = 0; i < n; i++) {
            if (degrees[i] == 1) {
                q.push(i);
            }
        }

        // 拓扑排序
        int remainingNodes = n;
        while (remainingNodes > 2) {
            int size = q.size();
            remainingNodes -= size;
            for (int i = 0; i < size; i++) {
                int node = q.front();
                q.pop();
                for (int neighbor : adjList[node]) {
                    degrees[neighbor]--;
                    if (degrees[neighbor] == 1) {
                        q.push(neighbor);
                    }
                }
            }
        }

        // 返回结果
        vector<int> result;
        while (!q.empty()) {
            result.push_back(q.front());
            q.pop();
        }

        return result;
    }
};

// 测试代码
int main() {
    Solution solution;
    int n = 6;
    vector<vector<int>> edges = { {3, 0}, {3, 1}, {3, 2}, {3, 4}, {5, 4}};

    vector<int> result = solution.findMinHeightTrees(n, edges);

    cout << "最小高度树的根节点: ";
    for (int node : result) {
        cout << node << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用邻接表表示图结构。
   - 使用队列实现拓扑排序，逐步删除叶子节点。
   - 时间复杂度为 O(n)，空间复杂度为 O(n)。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 和 `queue` 简化代码。
   - 利用拓扑排序思想找到最小高度树的根节点。
   - 代码简洁高效，符合 C++ 编程风格。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地找到最小高度树的根节点。