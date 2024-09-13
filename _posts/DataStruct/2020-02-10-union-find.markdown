---
layout: post
title:  "并查集（Union-Find）"
categories: dataStruct
---

### 并查集（Union-Find）的概念和应用

#### 概念
**并查集（Union-Find）** 是一种用于处理 **不相交集合（Disjoint Sets）** 问题的数据结构，支持 **合并（Union）** 和 **查找（Find）** 操作。它常用于处理动态连通性问题，如判断两个元素是否在同一个集合中，或合并两个集合。

- **合并（Union）**：将两个不同的集合合并成一个集合。
- **查找（Find）**：查找某个元素属于哪个集合（通常通过返回集合的根节点）。

并查集可以有效解决 **动态连通性** 问题。最常见的实现方式是用 **树形结构**，每个集合用一棵树表示，树的根节点代表该集合的标识。

#### 优化方法
1. **路径压缩（Path Compression）**：
   - 在查找过程中，使树的结构更加扁平化。每次查找时，将路径上的所有节点直接指向根节点，从而加速后续的查找操作。
   - **时间复杂度**：几乎是常数时间，摊还时间复杂度为 **O(α(n))**，其中 **α** 是反阿克曼函数，增长极为缓慢。

2. **按秩合并（Union by Rank/Size）**：
   - 在合并两个集合时，总是将 **树的高度（Rank）** 较小的集合合并到较大的集合上，减少树的高度，避免退化成链表。
   - **时间复杂度**：几乎是常数时间，摊还时间复杂度为 **O(α(n))**。

#### 应用
1. **动态连通性问题**：用于处理图的连通分量问题，判断两个顶点是否属于同一个连通分量。
2. **图的最小生成树**：Kruskal 算法利用并查集检测边的两个顶点是否属于同一集合，避免形成环。
3. **社交网络中的群组查询**：用于快速查询某两个用户是否在同一个群组中。

---

### 并查集的实现（C语言）

#### 1. **基本并查集实现**
- 使用数组实现集合的树形结构。
- **父节点数组（parent）**：存储每个元素的父节点，根节点的父节点指向自己。

```c
#include <stdio.h>
#include <stdlib.h>

// 定义并查集结构
typedef struct {
    int* parent;  // 存储父节点
    int* rank;    // 存储每棵树的秩（即高度）
    int size;     // 并查集的大小
} UnionFind;

// 初始化并查集，每个节点的父节点指向自己，秩为0
UnionFind* createUnionFind(int size) {
    UnionFind* uf = (UnionFind*)malloc(sizeof(UnionFind));
    uf->parent = (int*)malloc(size * sizeof(int));
    uf->rank = (int*)malloc(size * sizeof(int));
    uf->size = size;

    for (int i = 0; i < size; i++) {
        uf->parent[i] = i;  // 每个节点的父节点指向自己
        uf->rank[i] = 0;    // 每个节点的秩初始化为0
    }

    return uf;
}

// 查找根节点（带路径压缩优化）
int find(UnionFind* uf, int p) {
    if (uf->parent[p] != p) {
        // 递归找到根节点，并将路径上的每个节点指向根节点
        uf->parent[p] = find(uf, uf->parent[p]);
    }
    return uf->parent[p];
}

// 按秩合并两个集合
void unionSets(UnionFind* uf, int p, int q) {
    int rootP = find(uf, p);
    int rootQ = find(uf, q);

    if (rootP == rootQ) return;  // 如果两个节点的根节点相同，则已经在同一集合

    // 按秩合并，秩小的树合并到秩大的树上
    if (uf->rank[rootP] < uf->rank[rootQ]) {
        uf->parent[rootP] = rootQ;
    } else if (uf->rank[rootP] > uf->rank[rootQ]) {
        uf->parent[rootQ] = rootP;
    } else {
        uf->parent[rootQ] = rootP;
        uf->rank[rootP]++;
    }
}

// 判断两个节点是否属于同一集合
int connected(UnionFind* uf, int p, int q) {
    return find(uf, p) == find(uf, q);
}

int main() {
    int n = 10;  // 创建10个元素的并查集
    UnionFind* uf = createUnionFind(n);

    // 合并一些集合
    unionSets(uf, 1, 2);
    unionSets(uf, 2, 3);
    unionSets(uf, 4, 5);
    unionSets(uf, 6, 7);
    unionSets(uf, 5, 6);

    // 查询两个元素是否在同一集合
    printf("Is 1 connected to 3? %s\n", connected(uf, 1, 3) ? "Yes" : "No");  // Yes
    printf("Is 4 connected to 7? %s\n", connected(uf, 4, 7) ? "Yes" : "No");  // Yes
    printf("Is 1 connected to 7? %s\n", connected(uf, 1, 7) ? "Yes" : "No");  // No

    return 0;
}
```

#### 输出：
```
Is 1 connected to 3? Yes
Is 4 connected to 7? Yes
Is 1 connected to 7? No
```

---

### 优化详解

#### 1. **路径压缩（Path Compression）**
- 路径压缩的目的是减少树的高度。在每次查找时，将树上的所有节点直接指向根节点，从而加速后续的查找操作。
- 在 `find` 操作中，我们递归查找父节点的同时，将当前节点直接连接到根节点上。这样在下一次查找时，只需一跳就能找到根节点。

#### 2. **按秩合并（Union by Rank/Size）**
- 合并时，总是将 **树的高度较小** 的树连接到 **高度较大** 的树上，这样可以尽量保持树的高度较小。
- **秩（Rank）** 代表的是树的高度或近似高度。树的高度越小，查找的效率越高。

---

### 并查集的应用

#### 1. **动态连通性问题**
并查集最经典的应用是处理 **动态连通性问题**，例如在网络中判断两个设备是否连通、或者社交网络中两个用户是否属于同一个社交群组。

#### 2. **图的连通分量**
- 并查集可以用于计算无向图的连通分量。
- 初始化时，每个顶点属于自己的集合。遍历图的所有边，将相连的顶点合并到同一个集合中。最终的连通分量就是所有独立的集合。

#### 3. **Kruskal算法**（用于最小生成树）
- Kruskal算法是一种最小生成树算法，它从小到大选择图中的边，使用并查集来检测边的两个顶点是否已经属于同一连通分量，以避免形成环。
- 并查集的作用是在合并不同的连通分量时能够快速检查是否存在环。

---

### 并查集算法的复杂度分析

1. **查找（Find）**：摊还时间复杂度为 **O(α(n))**，其中 **α(n)** 是反阿克曼函数，增长非常缓慢，在实际使用中近似为常数时间。
2. **合并（Union）**：摊还时间复杂度为 **O(α(n))**，同样近似为常数时间。
3. **总复杂度**：并查集的所有操作几乎都是常数时间，因此非常适合处理大规模数据的连通性问题。

---

### 总结

- **并查集（Union-Find）** 是一种树形结构的数据结构，常用于处理 **动态连通性问题**。它支持高效的 **合并（Union）** 和 **查找（Find）** 操作。
- 通过 **路径压缩** 和 **按秩合并** 的优化，并查集的操作几乎达到了常数时间复杂度，摊还时间复杂度为 **O(α(n))**，其中 **α(n)** 是反阿克曼函数。
- 并查集广泛应用于 **图的连通性问题**、**最小生成树算法（如 Kruskal）**、以及社交网络中的群组问题

等。