---
layout: post
title:  "210. 课程表 II"
categories: arithmetic
---

[210. 课程表 II](https://leetcode.cn/problems/course-schedule-ii)

### 题目描述

现在你总共有 `numCourses` 门课程需要选，记为 `0` 到 `numCourses - 1`。给你一个数组 `prerequisites`，其中 `prerequisites[i] = [ai, bi]`，表示在选修课程 `ai` 之前必须先选修课程 `bi`。

例如，先修课程对 `[0, 1]` 表示想要学习课程 `0`，你需要先完成课程 `1`。

请你返回一种完成所有课程的顺序。如果有多个正确顺序，只需返回其中一种即可。如果无法完成所有课程，返回一个空数组。

**示例 1：**

```
输入：numCourses = 2, prerequisites = [[1,0]]
输出：[0,1]
解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1]。
```

**示例 2：**

```
输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
输出：[0,1,2,3] 或 [0,2,1,3]
解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。因此，一个正确的课程顺序是 [0,1,2,3]，另一个正确的顺序是 [0,2,1,3]。
```

**示例 3：**

```
输入：numCourses = 1, prerequisites = []
输出：[0]
```

**提示：**

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- 所有 `[ai, bi]` 互不相同

---

### 解题思路

这个问题是典型的拓扑排序问题。我们可以将课程看作图中的节点，先修关系看作有向边。如果图中存在环，则说明无法完成所有课程的学习；否则，可以通过拓扑排序找到一种合法的学习顺序。

#### 具体步骤
1. **构建图**：
   - 使用邻接表表示图，记录每个节点的出边。
2. **计算入度**：
   - 记录每个节点的入度（即有多少课程依赖于它）。
3. **拓扑排序**：
   - 使用队列进行拓扑排序。将所有入度为0的节点入队，然后依次处理队列中的节点，将其邻接节点的入度减1。如果邻接节点的入度变为0，则将其入队。
4. **判断是否有环**：
   - 如果最终所有节点都被处理过，则说明没有环，可以完成所有课程；否则，说明有环，无法完成所有课程。

---

### C语言解答

```c
#include <stdbool.h>
#include <stdlib.h>

int* findOrder(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize, int* returnSize) {
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
    int* result = (int*)malloc(numCourses * sizeof(int)); // 结果数组
    int count = 0; // 记录处理的节点数
    while (front < rear) {
        int node = queue[front++]; // 出队
        result[count++] = node; // 将节点加入结果数组
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
    if (count == numCourses) {
        *returnSize = numCourses;
        return result;
    } else {
        *returnSize = 0;
        free(result);
        return NULL;
    }
}

// 简单main函数调用
int main() {
    int numCourses = 4;
    int prerequisitesSize = 4;
    int prerequisitesColSize[] = {2, 2, 2, 2};
    int* prerequisites[] = {(int[]){1, 0}, (int[]){2, 0}, (int[]){3, 1}, (int[]){3, 2}};
    int returnSize;

    int* result = findOrder(numCourses, prerequisites, prerequisitesSize, prerequisitesColSize, &returnSize);
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
#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
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
        vector<int> result;
        int count = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            result.push_back(node);
            count++;
            for (int neighbor : graph[node]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }

        // 判断是否有环
        if (count == numCourses) {
            return result;
        } else {
            return {};
        }
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    int numCourses = 4;
    vector<vector<int>> prerequisites = { {1, 0}, {2, 0}, {3, 1}, {3, 2}};

    vector<int> result = solution.findOrder(numCourses, prerequisites);
    for (int course : result) {
        cout << course << " ";
    }
    cout << endl;

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

3. **结果返回**：
   - 如果所有节点都被处理过，则返回拓扑排序结果。
   - 否则，返回空数组。

#### C++
1. **邻接表构建**：
   - 使用 `vector<vector<int>>` 存储邻接表。
   - 使用 `vector<int>` 存储每个节点的入度。

2. **拓扑排序**：
   - 使用 `queue<int>` 存储入度为0的节点。
   - 处理队列中的节点时，遍历其邻接节点，并将入度减1。
   - 如果邻接节点的入度变为0，则将其加入队列。

3. **STL 容器**：
   - 使用 `vector` 和 `queue` 简化代码，提高可读性。

---

### 测试用例验证

#### 输入
```cpp
numCourses = 4
prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]]
```

#### 输出
```plaintext
0 1 2 3
```

#### 解释
- 课程0没有先修课程，先学习课程0。
- 课程1和课程2依赖于课程0，学习课程1和课程2。
- 课程3依赖于课程1和课程2，最后学习课程3。

---

### 总结

通过拓扑排序，我们可以找到一种合法的课程学习顺序。如果图中存在环，则说明无法完成所有课程的学习。C语言和C++的实现都清晰地展示了拓扑排序的过程，代码具有较高的可读性和健壮性。