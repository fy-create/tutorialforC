---
layout: post
title:  "226. 翻转二叉树"
categories: arithmetic
---

[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree)

### 题目描述

给定一棵二叉树的根节点 `root`，翻转这棵二叉树，并返回其根节点。

**示例 1：**

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

**示例 2：**

```
输入：root = [2,1,3]
输出：[2,3,1]
```

**示例 3：**

```
输入：root = []
输出：[]
```

**提示：**

- 树中节点数目范围在 `[0, 100]` 内
- `-100 <= Node.val <= 100`

---

### 解题思路

翻转二叉树可以通过 **递归** 或 **迭代** 的方式实现。具体步骤如下：

1. **递归法**：
   - 从根节点开始，递归地翻转左子树和右子树。
   - 交换当前节点的左右子树。

2. **迭代法**：
   - 使用队列进行层次遍历。
   - 对于每个节点，交换其左右子树。

---

### C语言解答

#### 递归法

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 翻转二叉树
struct TreeNode* invertTree(struct TreeNode* root) {
    if (root == NULL) {
        return NULL;
    }

    // 递归翻转左子树和右子树
    struct TreeNode* left = invertTree(root->left);
    struct TreeNode* right = invertTree(root->right);

    // 交换左右子树
    root->left = right;
    root->right = left;

    return root;
}

// 辅助函数：创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 辅助函数：打印二叉树（前序遍历）
void printTree(struct TreeNode* root) {
    if (root == NULL) {
        printf("NULL ");
        return;
    }
    printf("%d ", root->val);
    printTree(root->left);
    printTree(root->right);
}

// 简单main函数调用
int main() {
    // 构建示例二叉树
    struct TreeNode* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(7);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(6);
    root->right->right = createNode(9);

    printf("原二叉树：");
    printTree(root);
    printf("\n");

    // 翻转二叉树
    struct TreeNode* invertedRoot = invertTree(root);

    printf("翻转后的二叉树：");
    printTree(invertedRoot);
    printf("\n");

    return 0;
}
```

#### 迭代法

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 定义队列节点结构
typedef struct {
    struct TreeNode** data;
    int front;
    int rear;
    int capacity;
} Queue;

// 初始化队列
Queue* createQueue(int capacity) {
    Queue* queue = (Queue*)malloc(sizeof(Queue));
    queue->data = (struct TreeNode**)malloc(capacity * sizeof(struct TreeNode*));
    queue->front = 0;
    queue->rear = 0;
    queue->capacity = capacity;
    return queue;
}

// 入队
void enqueue(Queue* queue, struct TreeNode* node) {
    if (queue->rear == queue->capacity) {
        queue->capacity *= 2;
        queue->data = (struct TreeNode**)realloc(queue->data, queue->capacity * sizeof(struct TreeNode*));
    }
    queue->data[queue->rear++] = node;
}

// 出队
struct TreeNode* dequeue(Queue* queue) {
    if (queue->front == queue->rear) {
        return NULL;
    }
    return queue->data[queue->front++];
}

// 判断队列是否为空
int isEmpty(Queue* queue) {
    return queue->front == queue->rear;
}

// 翻转二叉树
struct TreeNode* invertTree(struct TreeNode* root) {
    if (root == NULL) {
        return NULL;
    }

    // 使用队列进行层次遍历
    Queue* queue = createQueue(100);
    enqueue(queue, root);

    while (!isEmpty(queue)) {
        struct TreeNode* node = dequeue(queue);

        // 交换左右子树
        struct TreeNode* temp = node->left;
        node->left = node->right;
        node->right = temp;

        // 将子节点加入队列
        if (node->left != NULL) {
            enqueue(queue, node->left);
        }
        if (node->right != NULL) {
            enqueue(queue, node->right);
        }
    }

    // 释放队列内存
    free(queue->data);
    free(queue);

    return root;
}

// 辅助函数：创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 辅助函数：打印二叉树（前序遍历）
void printTree(struct TreeNode* root) {
    if (root == NULL) {
        printf("NULL ");
        return;
    }
    printf("%d ", root->val);
    printTree(root->left);
    printTree(root->right);
}

// 简单main函数调用
int main() {
    // 构建示例二叉树
    struct TreeNode* root = createNode(4);
    root->left = createNode(2);
    root->right = createNode(7);
    root->left->left = createNode(1);
    root->left->right = createNode(3);
    root->right->left = createNode(6);
    root->right->right = createNode(9);

    printf("原二叉树：");
    printTree(root);
    printf("\n");

    // 翻转二叉树
    struct TreeNode* invertedRoot = invertTree(root);

    printf("翻转后的二叉树：");
    printTree(invertedRoot);
    printf("\n");

    return 0;
}
```

---

### C++ 解答

#### 递归法

```cpp
#include <iostream>
using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) {
            return nullptr;
        }

        // 递归翻转左子树和右子树
        TreeNode* left = invertTree(root->left);
        TreeNode* right = invertTree(root->right);

        // 交换左右子树
        root->left = right;
        root->right = left;

        return root;
    }
};

// 辅助函数：打印二叉树（前序遍历）
void printTree(TreeNode* root) {
    if (root == nullptr) {
        cout << "NULL ";
        return;
    }
    cout << root->val << " ";
    printTree(root->left);
    printTree(root->right);
}

// 简单main函数调用
int main() {
    // 构建示例二叉树
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(9);

    cout << "原二叉树：";
    printTree(root);
    cout << endl;

    // 翻转二叉树
    Solution solution;
    TreeNode* invertedRoot = solution.invertTree(root);

    cout << "翻转后的二叉树：";
    printTree(invertedRoot);
    cout << endl;

    return 0;
}
```

#### 迭代法

```cpp
#include <iostream>
#include <queue>
using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (root == nullptr) {
            return nullptr;
        }

        // 使用队列进行层次遍历
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            TreeNode* node = q.front();
            q.pop();

            // 交换左右子树
            TreeNode* temp = node->left;
            node->left = node->right;
            node->right = temp;

            // 将子节点加入队列
            if (node->left != nullptr) {
                q.push(node->left);
            }
            if (node->right != nullptr) {
                q.push(node->right);
            }
        }

        return root;
    }
};

// 辅助函数：打印二叉树（前序遍历）
void printTree(TreeNode* root) {
    if (root == nullptr) {
        cout << "NULL ";
        return;
    }
    cout << root->val << " ";
    printTree(root->left);
    printTree(root->right);
}

// 简单main函数调用
int main() {
    // 构建示例二叉树
    TreeNode* root = new TreeNode(4);
    root->left = new TreeNode(2);
    root->right = new TreeNode(7);
    root->left->left = new TreeNode(1);
    root->left->right = new TreeNode(3);
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(9);

    cout << "原二叉树：";
    printTree(root);
    cout << endl;

    // 翻转二叉树
    Solution solution;
    TreeNode* invertedRoot = solution.invertTree(root);

    cout << "翻转后的二叉树：";
    printTree(invertedRoot);
    cout << endl;

    return 0;
}
```

---

### 代码解释

#### C语言
1. **递归法**：
   - 从根节点开始，递归地翻转左子树和右子树。
   - 交换当前节点的左右子树。

2. **迭代法**：
   - 使用队列进行层次遍历。
   - 对于每个节点，交换其左右子树。

#### C++
1. **递归法**：
   - 从根节点开始，递归地翻转左子树和右子树。
   - 交换当前节点的左右子树。

2. **迭代法**：
   - 使用队列进行层次遍历。
   - 对于每个节点，交换其左右子树。

---

### 测试用例验证

#### 输入
```cpp
root = [4,2,7,1,3,6,9]
```

#### 输出
```plaintext
原二叉树：4 2 1 NULL NULL 3 NULL NULL 7 6 NULL NULL 9 NULL NULL 
翻转后的二叉树：4 7 9 NULL NULL 6 NULL NULL 2 3 NULL NULL 1 NULL NULL 
```

#### 解释
- 翻转后的二叉树结构如下：
  ```
      4
     / \
    7   2
   / \ / \
  9  6 3  1
  ```

---

### 总结

通过递归或迭代的方式，我们可以高效地翻转二叉树。C语言和C++的实现都清晰地展示了这一过程，代码具有较高的可读性和健壮性。