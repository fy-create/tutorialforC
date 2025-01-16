---
layout: post
title:  "207. 课程表"
categories: arithmetic
---

[207. 课程表](https://leetcode.cn/problems/course-schedule)

### 题目描述

你这个学期必须选修 `numCourses` 门课程，记为 `0` 到 `numCourses - 1`。

在选修某些课程之前需要一些先修课程。先修课程按数组 `prerequisites` 给出，其中 `prerequisites[i] = [ai, bi]`，表示如果要学习课程 `ai`，则必须先学习课程 `bi`。

例如，先修课程对 `[0, 1]` 表示要学习课程 `0`，你需要先完成课程 `1`。

请你判断是否可能完成所有课程的学习？如果可以，返回 `true`；否则，返回 `false`。

**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
```

**示例 2：**

```
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
```

**提示：**

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `prerequisites[i]` 中的所有课程对互不相同

---

### 解题思路

这个问题可以转化为图论中的拓扑排序问题。我们可以将课程看作图中的节点，先修关系看作有向边。如果图中存在环，则说明无法完成所有课程的学习；否则，可以完成。

具体步骤如下：

1. **构建图**：使用邻接表表示图，记录每个节点的出边。
2. **计算入度**：记录每个节点的入度（即有多少课程依赖于它）。
3. **拓扑排序**：使用队列进行拓扑排序。将所有入度为0的节点入队，然后依次处理队列中的节点，将其邻接节点的入度减1。如果邻接节点的入度变为0，则将其入队。
4. **判断是否有环**：如果最终所有节点都被处理过，则说明没有环，可以完成所有课程；否则，说明有环，无法完成所有课程。

---

### C语言解答

```c
#include <stdbool.h>
#include <stdlib.h>

bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    // 构建邻接表
    int* graph[numCourses]; // 邻接表
    int graphSize[numCourses]; // 每个节点的邻接表大小
    int* inDegree = (int*)calloc(numCourses, sizeof(int)); // 入度数组

    // 初始化邻接表和入度数组
    for (int i = 0; i < numCourses; i++) {
        graph[i] = (int*)malloc(0); // 初始化为空
        graphSize[i] = 0; // 初始大小为0
    }

    for (int i = 0; i < prerequisitesSize; i++) {
        int a = prerequisites[i][0]; // 课程a
        int b = prerequisites[i][1]; // 课程b
        graphSize[b]++; // 增加邻接表大小
        graph[b] = (int*)realloc(graph[b], graphSize[b] * sizeof(int)); // 重新分配内存
        graph[b][graphSize[b] - 1] = a; // 添加邻接节点
        inDegree[a]++; // 增加入度
    }

    // 初始化队列
    int* queue = (int*)malloc(numCourses * sizeof(int)); // 队列
    int front = 0, rear = 0; // 队列的头和尾
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) {
            queue[rear++] = i; // 入度为0的节点入队
        }
    }

    // 拓扑排序
    int count = 0; // 记录处理的节点数
    while (front < rear) {
        int node = queue[front++]; // 出队
        count++; // 处理节点数加1
        for (int i = 0; i < graphSize[node]; i++) {
            int neighbor = graph[node][i]; // 邻接节点
            if (--inDegree[neighbor] == 0) { // 入度减1
                queue[rear++] = neighbor; // 入度为0的节点入队
            }
        }
    }

    // 释放内存
    for (int i = 0; i < numCourses; i++) {
        free(graph[i]);
    }
    free(inDegree);
    free(queue);

    // 判断是否有环
    return count == numCourses; // 如果处理的节点数等于总节点数，则无环
}

// 简单main函数调用
int main() {
    int numCourses = 2;
    int prerequisitesSize = 1;
    int prerequisitesColSize[] = {2};
    int* prerequisites[] = {(int[]){1, 0}};

    bool result = canFinish(numCourses, prerequisites, prerequisitesSize, prerequisitesColSize);
    printf(result ? "true\n" : "false\n");

    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // 构建邻接表
        vector<vector<int>> graph(numCourses);
        vector<int> inDegree(numCourses, 0);

        // 初始化邻接表和入度数组
        for (const auto& edge : prerequisites) {
            int a = edge[0];
            int b = edge[1];
            graph[b].push_back(a);
            inDegree[a]++;
        }

        // 初始化队列
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) {
                q.push(i);
            }
        }

        // 拓扑排序
        int count = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            count++;
            for (int neighbor : graph[node]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        // 判断是否有环
        return count == numCourses;
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    int numCourses = 2;
    vector<vector<int>> prerequisites = { {1, 0}};

    bool result = solution.canFinish(numCourses, prerequisites);
    cout << (result ? "true" : "false") << endl;

    return 0;
}
```

---

### 代码解释

#### C语言
1. **邻接表构建**：
   - 使用动态数组存储每个节点的邻接表。
   - 使用 `graphSize` 数组记录每个节点的邻接表大小。
   - 动态调整邻接表的大小以存储邻接节点。

2. **拓扑排序**：
   - 使用队列存储入度为0的节点。
   - 处理队列中的节点时，遍历其邻接节点，并将入度减1。
   - 如果邻接节点的入度变为0，则将其加入队列。

3. **内存管理**：
   - 在程序结束时，释放动态分配的内存，避免内存泄漏。

#### C++
1. **邻接表构建**：
   - 使用 `vector<vector<int>>` 存储邻接表。
   - 使用 `vector<int>` 存储每个节点的入度。

2. **拓扑排序**：
   - 使用 `queue<int>` 存储入度为0的节点。
   - 处理队列中的节点时，遍历其邻接节点，并将入度减1。
   - 如果邻接节点的入度变为0，则将其加入队列。

3. **STL容器**：
   - 使用 `vector` 和 `queue` 简化代码，提高可读性。

---

### 测试用例验证

#### 输入
```c
numCourses = 2
prerequisites = [[1, 0]]
```

#### 输出
```
true
```

#### 解释
- 课程1依赖于课程0。
- 拓扑排序可以完成，没有环。

#### 输入
```c
numCourses = 2
prerequisites = [[1, 0], [0, 1]]
```

#### 输出
```
false
```

#### 解释
- 课程1依赖于课程0，课程0依赖于课程1。
- 存在环，无法完成拓扑排序。

---

### 总结

修正后的代码能够正确处理拓扑排序，并判断是否存在环。通过动态调整邻接表的大小和正确管理内存，代码的可读性和健壮性得到了提升。
