---
layout: post
title:  "116. 填充每个节点的下一个右侧节点指针"
categories: arithmetic
---

[116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node)

### 题目描述

给定一个 **完美二叉树**，其所有叶子节点都在同一层，每个父节点都有两个子节点。树中每个节点包含一个指针 `next`，指向其下一个右侧节点。如果没有下一个右侧节点，则将 `next` 设置为 `NULL`。

初始状态下，所有 `next` 指针都被设置为 `NULL`。

---

**示例 1：**

```
输入：root = [1,2,3,4,5,6,7]
输出：[1,#,2,3,#,4,5,6,7,#]
解释：给定完美二叉树：
         1
       /   \
      2     3
     / \   / \
    4   5 6   7
调用函数后，树被更新为：
         1 -> NULL
       /   \
      2  -> 3 -> NULL
     / \   / \
    4-> 5->6->7 -> NULL
```

---

**提示：**

- 树中节点的数量在 `[0, 2¹² - 1]` 范围内。
- `-1000 <= Node.val <= 1000`

---

### 解题思路

1. **层次遍历（BFS）**：
   - 使用队列进行层次遍历，每次处理一层的所有节点，并将当前节点的 `next` 指针指向其右侧节点。

2. **利用完美二叉树的性质（递归/迭代）**：
   - 对于每个父节点 `root`：
     - 将 `root->left->next` 指向 `root->right`。
     - 如果 `root->next` 存在，将 `root->right->next` 指向 `root->next->left`。
   - 递归处理 `root->left` 和 `root->right`。

3. **时间复杂度**：
   - 每个节点仅访问一次，时间复杂度为 O(n)。

4. **空间复杂度**：
   - 使用递归时，空间复杂度为 O(h)，其中 `h` 是树的高度。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义树节点
struct Node {
    int val;
    struct Node* left;
    struct Node* right;
    struct Node* next;
};

// 创建新节点
struct Node* createNode(int val) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = val;
    newNode->left = NULL;
    newNode->right = NULL;
    newNode->next = NULL;
    return newNode;
}

// 递归更新节点的 next 指针
struct Node* connect(struct Node* root) {
    if (root == NULL) {
        return NULL;
    }

    if (root->left != NULL) {
        // 左节点的 next 指向右节点
        root->left->next = root->right;

        // 右节点的 next 指向根节点的右邻节点的左子节点
        if (root->next != NULL) {
            root->right->next = root->next->left;
        }

        // 递归处理左子树和右子树
        connect(root->left);
        connect(root->right);
    }

    return root;
}

// 测试函数：打印树的层次结构
void printTree(struct Node* root) {
    struct Node* levelStart = root;
    while (levelStart != NULL) {
        struct Node* current = levelStart;
        while (current != NULL) {
            printf("%d -> ", current->val);
            current = current->next;
        }
        printf("NULL\n");
        levelStart = levelStart->left;
    }
}

int main() {
    // 构造示例二叉树
    struct Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    root->right->left = createNode(6);
    root->right->right = createNode(7);

    root = connect(root);

    printf("连接后的二叉树层次结构:\n");
    printTree(root);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
using namespace std;

// 定义树节点
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node(int _val) : val(_val), left(nullptr), right(nullptr), next(nullptr) {}
};

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;

        if (root->left) {
            // 左节点的 next 指向右节点
            root->left->next = root->right;

            // 右节点的 next 指向根节点的右邻节点的左子节点
            if (root->next) {
                root->right->next = root->next->left;
            }

            // 递归处理左子树和右子树
            connect(root->left);
            connect(root->right);
        }

        return root;
    }
};

// 测试函数：打印树的层次结构
void printTree(Node* root) {
    Node* levelStart = root;
    while (levelStart) {
        Node* current = levelStart;
        while (current) {
            cout << current->val << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
        levelStart = levelStart->left;
    }
}

int main() {
    // 构造示例二叉树
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->left = new Node(6);
    root->right->right = new Node(7);

    Solution sol;
    root = sol.connect(root);

    cout << "连接后的二叉树层次结构:" << endl;
    printTree(root);

    return 0;
}
```

---

### 代码说明

1. **递归逻辑**：
   - 利用完美二叉树的性质，直接将 `left->next` 指向 `right`。
   - 如果存在右邻节点，则将 `right->next` 指向 `next->left`。

2. **时间复杂度**：
   - 每个节点访问一次，时间复杂度为 O(n)。

3. **空间复杂度**：
   - 使用递归，最大栈深度为树的高度，空间复杂度为 O(h)。