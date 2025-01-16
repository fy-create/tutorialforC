---
layout: post
title:  "107. 二叉树的层序遍历 II"
categories: arithmetic
---

[107. 二叉树的层序遍历 II](https://leetcode.cn/problems/binary-tree-level-order-traversal-ii)

### 题目描述

给定一个二叉树，返回其节点值的 **从下到上层序遍历**。即先访问最后一层的节点，然后是倒数第二层，依此类推，直到访问到根节点。

**示例：**

```
输入：
    3
   / \
  9  20
    /  \
   15   7

输出：
[
  [15,7],
  [9,20],
  [3]
]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：
[
  [1]
]
```

**提示：**

- 节点总数在范围 `[0, 2000]` 内
- `-1000 <= Node.val <= 1000`

### 解题思路

要实现二叉树的从下到上层序遍历，可以采用 **广度优先搜索**（Breadth-First Search，BFS）的策略，并通过以下步骤实现：

1. **使用队列辅助遍历：**
   - 使用一个队列来存储当前层的节点。
   - 初始时，将根节点入队。

2. **逐层处理节点并记录结果：**
   - 当队列不为空时，记录当前队列的大小 `levelSize`，表示当前层的节点数量。
   - 创建一个临时的数组或向量 `level` 来存储当前层的节点值。
   - 遍历 `levelSize` 个节点，依次出队并将它们的值存入 `level`。
   - 将每个节点的左子节点和右子节点（如果存在）入队，准备处理下一层。
   - 将当前层的 `level` 添加到结果集中。

3. **逆序结果集：**
   - BFS 默认是从上到下层序遍历，因此最后需要将结果集逆序，以实现从下到上的层序遍历。

4. **优化空间使用（可选）：**
   - 直接在遍历过程中将每一层插入到结果集的前面，避免最后的逆序操作。

这种方法的时间复杂度为 `O(n)`，其中 `n` 是节点的数量，因为每个节点都会被访问一次。空间复杂度为 `O(n)`，在最坏情况下，队列中可能同时存储一整层的节点。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 定义队列结构体
typedef struct {
    struct TreeNode** data;
    int front;
    int rear;
    int capacity;
} Queue;

// 初始化队列
Queue* initQueue(int capacity) {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->data = (struct TreeNode**)malloc(sizeof(struct TreeNode*) * capacity);
    q->front = 0;
    q->rear = 0;
    q->capacity = capacity;
    return q;
}

// 判断队列是否为空
int isEmpty(Queue* q) {
    return q->front == q->rear;
}

// 判断队列是否满
int isFull(Queue* q) {
    return q->rear == q->capacity;
}

// 入队
void enqueue(Queue* q, struct TreeNode* node) {
    if (isFull(q)) {
        // 扩展队列容量
        q->capacity *= 2;
        q->data = (struct TreeNode**)realloc(q->data, sizeof(struct TreeNode*) * q->capacity);
    }
    q->data[q->rear++] = node;
}

// 出队
struct TreeNode* dequeue(Queue* q) {
    if (isEmpty(q)) return NULL;
    return q->data[q->front++];
}

// 释放队列内存
void freeQueue(Queue* q) {
    free(q->data);
    free(q);
}

// 定义结果集结构体
typedef struct {
    int** levels;   // 存储每层的节点值
    int* sizes;     // 存储每层的节点数量
    int count;      // 当前存储的层数
    int capacity;   // 总容量
} ResultList;

// 初始化结果集
void initResultList(ResultList* list) {
    list->count = 0;
    list->capacity = 10;
    list->levels = (int**)malloc(sizeof(int*) * list->capacity);
    list->sizes = (int*)malloc(sizeof(int) * list->capacity);
}

// 添加一层到结果集中
void addLevel(ResultList* list, int* level, int size) {
    if (list->count == list->capacity) {
        list->capacity *= 2;
        list->levels = (int**)realloc(list->levels, sizeof(int*) * list->capacity);
        list->sizes = (int*)realloc(list->sizes, sizeof(int) * list->capacity);
    }
    list->levels[list->count] = level;
    list->sizes[list->count] = size;
    list->count++;
}

// 创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 主函数：从下到上层序遍历
int** levelOrderBottom(struct TreeNode* root, int* returnSize, int** returnColumnSizes){
    if (root == NULL) {
        *returnSize = 0;
        return NULL;
    }
    
    // 初始化队列，初始容量为100
    Queue* q = initQueue(100);
    enqueue(q, root);
    
    // 初始化结果集
    ResultList result;
    initResultList(&result);
    
    // 层序遍历
    while (!isEmpty(q)) {
        int levelSize = q->rear - q->front;
        int* level = (int*)malloc(sizeof(int) * levelSize);
        
        for(int i = 0; i < levelSize; i++) {
            struct TreeNode* node = dequeue(q);
            level[i] = node->val;
            
            if (node->left != NULL) enqueue(q, node->left);
            if (node->right != NULL) enqueue(q, node->right);
        }
        
        // 添加当前层到结果集中
        addLevel(&result, level, levelSize);
    }
    
    // 释放队列内存
    freeQueue(q);
    
    // 逆序结果集
    for(int i = 0; i < result.count / 2; i++) {
        int* temp = result.levels[i];
        result.levels[i] = result.levels[result.count - 1 - i];
        result.levels[result.count - 1 - i] = temp;
        
        int tmpSize = result.sizes[i];
        result.sizes[i] = result.sizes[result.count - 1 - i];
        result.sizes[result.count - 1 - i] = tmpSize;
    }
    
    // 设置返回值
    *returnSize = result.count;
    *returnColumnSizes = result.sizes;
    
    return result.levels;
}

// 辅助函数：打印结果
void printResult(int** levels, int* sizes, int size) {
    printf("[\n");
    for(int i = 0; i < size; i++) {
        printf("  [");
        for(int j = 0; j < sizes[i]; j++) {
            printf("%d", levels[i][j]);
            if(j < sizes[i] -1) printf(",");
        }
        printf("]");
        if(i < size -1) printf(",\n");
        else printf("\n");
    }
    printf("]\n");
}

// 辅助函数：释放树内存
void freeTree(struct TreeNode* root) {
    if(root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// 简单的主函数调用示例
int main() {
    // 构建示例树：
    //     3
    //    / \
    //   9  20
    //      /  \
    //     15   7
    struct TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);
    
    int returnSize;
    int* returnColumnSizes;
    int** result = levelOrderBottom(root, &returnSize, &returnColumnSizes);
    
    printf("从下到上层序遍历结果为：\n");
    printResult(result, returnColumnSizes, returnSize);
    
    // 释放内存
    for(int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);
    freeTree(root);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <string>

using namespace std;

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    // 主函数：从下到上层序遍历
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> result; // 结果集
        if (root == nullptr) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        // 使用队列进行层序遍历
        while(!q.empty()) {
            int levelSize = q.size();
            vector<int> level;
            for(int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                
                if(node->left != nullptr) q.push(node->left);
                if(node->right != nullptr) q.push(node->right);
            }
            // 将每层的结果插入到结果集的前面，实现从下到上
            result.insert(result.begin(), level);
        }
        
        return result;
    }
};

// 辅助函数：创建新节点
TreeNode* createNode(int val) {
    return new TreeNode(val);
}

// 辅助函数：打印结果
void printResult(const vector<vector<int>>& levels) {
    cout << "[\n";
    for(size_t i = 0; i < levels.size(); i++) {
        cout << "  [";
        for(size_t j = 0; j < levels[i].size(); j++) {
            cout << levels[i][j];
            if(j < levels[i].size() -1) cout << ",";
        }
        cout << "]";
        if(i < levels.size() -1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

// 辅助函数：释放树内存
void freeTree(TreeNode* root) {
    if(root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 简单的主函数调用示例
int main() {
    // 构建示例树：
    //     3
    //    / \
    //   9  20
    //      /  \
    //     15   7
    TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);
    
    Solution solution;
    vector<vector<int>> result = solution.levelOrderBottom(root);
    
    cout << "从下到上层序遍历结果为：\n";
    printResult(result);
    
    // 释放内存
    freeTree(root);
    
    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们采用了广度优先搜索（BFS）的方法来实现二叉树的从下到上层序遍历。具体步骤如下：

1. **定义二叉树节点结构体：**
   - 在C语言中，使用 `struct TreeNode` 定义二叉树节点，包含值 `val`，以及指向左子节点和右子节点的指针。
   - 在C++中，使用 `struct TreeNode` 并添加构造函数简化节点的创建。

2. **使用队列辅助遍历：**
   - 使用一个队列来存储当前层的节点。
   - 初始时，将根节点入队。

3. **逐层处理节点并记录结果：**
   - 当队列不为空时，记录当前队列的大小 `levelSize`，表示当前层的节点数量。
   - 创建一个临时的数组或向量 `level` 来存储当前层的节点值。
   - 遍历 `levelSize` 个节点，依次出队并将它们的值存入 `level`。
   - 将每个节点的左子节点和右子节点（如果存在）入队，准备处理下一层。
   - 将当前层的 `level` 添加到结果集中。
   
4. **逆序结果集：**
   - 在C语言中，通过在所有层遍历完成后，将结果集逆序，以实现从下到上的层序遍历。
   - 在C++中，直接将每层的结果插入到结果集的前面，避免了额外的逆序操作。

5. **示例输出：**
   - 构建了一个示例二叉树：
     ```
         3
        / \
       9  20
          /  \
         15   7
     ```
   - 执行从下到上层序遍历后，输出结果为：
     ```
     [
       [15,7],
       [9,20],
       [3]
     ]
     ```
   - 这与预期结果一致，表明代码正确实现了从下到上层序遍历。

通过以上步骤和代码实现，能够有效地对二叉树进行从下到上的层序遍历，并正确输出每一层的节点值，按照指定的顺序排列。