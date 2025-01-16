---
layout: post
title:  "133. 克隆图"
categories: arithmetic
---

[133. 克隆图](https://leetcode.cn/problems/clone-graph)

### 题目描述

[LeetCode 原题链接 - 克隆图](https://leetcode.cn/problems/clone-graph)

给你一个无向 **连通图** 中的一个节点 `node`，请你返回该图的 **深拷贝（克隆）**。

图中的每个节点都包含它的值 `val`（`int`） 和其邻居的列表（`List[Node]`）。

---

#### 示例 1：
```
输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：
图中有 4 个节点。
节点 1 的值是 1，它有两个邻居：节点 2 和 节点 4 。
节点 2 的值是 2，它有两个邻居：节点 1 和 节点 3 。
节点 3 的值是 3，它有两个邻居：节点 2 和 节点 4 。
节点 4 的值是 4，它有两个邻居：节点 1 和 节点 3 。
```

#### 示例 2：
```
输入：adjList = [[]]
输出：[[]]
解释：输入包含一个空列表。该图仅仅只有一个值为 1 的节点，它没有任何邻居。
```

#### 示例 3：
```
输入：adjList = []
输出：[]
解释：这个图是空的，它不含任何节点。
```

#### 提示：
1. 节点数不超过 `100`。
2. 每个节点的值 `Node.val` 是唯一的，范围是 `[1, 100]`。
3. 无向图是一个简单图，这意味着图中没有重复的边，也没有自环。
4. 由于图是连通的，所以每个节点都可以通过一些路径到达其他节点。

---

### 解题思路

1. **DFS 或 BFS 深拷贝图：**
   - 图的克隆问题可以通过深度优先搜索（DFS）或广度优先搜索（BFS）实现。
   - 使用一个哈希表 `map` 记录原节点与克隆节点的对应关系，避免重复克隆。

2. **图的遍历与克隆：**
   - 遍历每个节点，对于每个节点的邻居，如果邻居尚未克隆，则递归（或迭代）克隆该邻居，并将其加入当前节点的克隆邻居列表。

3. **时间复杂度：**
   - 遍历每个节点和边，时间复杂度为 \(O(N + E)\)，其中 \(N\) 是节点数，\(E\) 是边数。

---

### C语言实现

#### 函数原型
```c
struct Node* cloneGraph(struct Node* node);
```

#### 完整代码
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义图节点结构
struct Node {
    int val;
    int numNeighbors;
    struct Node** neighbors;
};

// 哈希表节点
typedef struct HashNode {
    struct Node* original;
    struct Node* clone;
    struct HashNode* next;
} HashNode;

#define HASH_SIZE 101

// 哈希表的全局变量
HashNode* hashTable[HASH_SIZE] = {NULL};

// 哈希函数
int hash(struct Node* node) {
    return (node->val) % HASH_SIZE;
}

// 哈希表插入
void insertHash(struct Node* original, struct Node* clone) {
    int idx = hash(original);
    HashNode* newHashNode = (HashNode*)malloc(sizeof(HashNode));
    newHashNode->original = original;
    newHashNode->clone = clone;
    newHashNode->next = hashTable[idx];
    hashTable[idx] = newHashNode;
}

// 哈希表查找
struct Node* findHash(struct Node* original) {
    int idx = hash(original);
    HashNode* curr = hashTable[idx];
    while (curr) {
        if (curr->original == original) {
            return curr->clone;
        }
        curr = curr->next;
    }
    return NULL;
}

// 深度优先搜索克隆
struct Node* dfs(struct Node* node) {
    if (!node) return NULL;

    // 如果该节点已被克隆
    struct Node* clonedNode = findHash(node);
    if (clonedNode) return clonedNode;

    // 克隆当前节点
    clonedNode = (struct Node*)malloc(sizeof(struct Node));
    clonedNode->val = node->val;
    clonedNode->numNeighbors = node->numNeighbors;
    clonedNode->neighbors = (struct Node**)malloc(node->numNeighbors * sizeof(struct Node*));

    // 插入哈希表
    insertHash(node, clonedNode);

    // 克隆邻居
    for (int i = 0; i < node->numNeighbors; i++) {
        clonedNode->neighbors[i] = dfs(node->neighbors[i]);
    }

    return clonedNode;
}

struct Node* cloneGraph(struct Node* node) {
    // 清空哈希表
    memset(hashTable, 0, sizeof(hashTable));
    return dfs(node);
}

// 测试函数
int main() {
    // 构建示例图
    struct Node node1, node2, node3, node4;

    node1.val = 1; node2.val = 2; node3.val = 3; node4.val = 4;

    struct Node* neighbors1[] = {&node2, &node4};
    struct Node* neighbors2[] = {&node1, &node3};
    struct Node* neighbors3[] = {&node2, &node4};
    struct Node* neighbors4[] = {&node1, &node3};

    node1.numNeighbors = 2; node1.neighbors = neighbors1;
    node2.numNeighbors = 2; node2.neighbors = neighbors2;
    node3.numNeighbors = 2; node3.neighbors = neighbors3;
    node4.numNeighbors = 2; node4.neighbors = neighbors4;

    struct Node* clonedGraph = cloneGraph(&node1);

    printf("原始节点值: %d, 克隆节点值: %d\\n", node1.val, clonedGraph->val);
    return 0;
}
```

---

### C++ 实现

#### 类定义
```cpp
#include <unordered_map>
#include <vector>
#include <queue>
#include <iostream>
using namespace std;

// 定义图节点结构
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() : val(0), neighbors(vector<Node*>()) {}
    Node(int _val) : val(_val), neighbors(vector<Node*>()) {}
    Node(int _val, vector<Node*> _neighbors) : val(_val), neighbors(_neighbors) {}
};

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        unordered_map<Node*, Node*> map;

        // BFS 队列
        queue<Node*> q;
        q.push(node);

        // 克隆第一个节点
        map[node] = new Node(node->val);

        while (!q.empty()) {
            Node* curr = q.front();
            q.pop();

            for (Node* neighbor : curr->neighbors) {
                if (!map.count(neighbor)) {
                    map[neighbor] = new Node(neighbor->val); // 克隆邻居
                    q.push(neighbor);
                }
                map[curr]->neighbors.push_back(map[neighbor]); // 添加到邻居列表
            }
        }
        return map[node];
    }
};

// 测试函数
int main() {
    Node* node1 = new Node(1);
    Node* node2 = new Node(2);
    Node* node3 = new Node(3);
    Node* node4 = new Node(4);

    node1->neighbors = {node2, node4};
    node2->neighbors = {node1, node3};
    node3->neighbors = {node2, node4};
    node4->neighbors = {node1, node3};

    Solution sol;
    Node* clonedGraph = sol.cloneGraph(node1);

    cout << "原始节点值: " << node1->val << ", 克隆节点值: " << clonedGraph->val << endl;

    return 0;
}
```

C 和 C++ 代码均采用哈希表解决克隆问题，具备详细注释并提供了测试调用。若有任何问题，欢迎继续讨论！