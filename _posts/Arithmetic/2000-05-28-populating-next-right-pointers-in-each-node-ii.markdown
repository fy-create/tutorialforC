---
layout: post
title:  "117. 填充每个节点的下一个右侧节点指针 II"
categories: arithmetic
---

[117. 填充每个节点的下一个右侧节点指针 II](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node-ii)

### 题目描述

给定一个二叉树，填充它的每个节点的 `next` 指针，使其指向其下一个右侧节点。如果找不到下一个右侧节点，则将 `next` 指针设置为 `NULL`。

**初始状态下，所有 `next` 指针都被设置为 `NULL`。**

**示例：**

```
输入：
        1
      /  \
     2    3
    / \    \
   4   5    7

输出：
        1 -> NULL
      /  \
     2 -> 3 -> NULL
    / \    \
   4-> 5 -> 7 -> NULL
```

**示例 1：**

```
输入：root = [1,2,3,4,5,null,7]
输出：[[1,null],[2,3,null],[4,5,7,null]]
解释：给定二叉树如上图所示。填充 `next` 指针后，层序遍历结果如下所示。
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[[1,null]]
```

**提示：**

- 树中节点的数量少于 `6000`。
- `-100 <= Node.val <= 100`

**进阶：**

- 你只能使用常量级额外空间。
- 使用递归解题也符合要求，递归程序占用的栈空间不算在额外空间内。

### 解题思路

要为二叉树的每个节点填充 `next` 指针，使其指向同一层的下一个右侧节点，可以采用**层序遍历**（广度优先搜索，BFS）的方法。由于进阶要求使用常量级额外空间，我们需要避免使用队列等数据结构。然而，对于本题，我们可以使用**前驱指针**来实现层序遍历，从而达到使用常量空间的目的。

**具体步骤如下：**

1. **初始化**：
   - 从根节点开始，当前层的起始节点为 `root`。
   - 使用一个指针 `current` 遍历当前层的所有节点。
   - 使用两个指针 `prev` 和 `nextStart` 来构建下一层的 `next` 指针和记录下一层的起始节点。

2. **遍历每一层**：
   - 对于当前层的每个节点：
     - 检查其左子节点和右子节点。
     - 如果左子节点存在：
       - 如果 `prev` 不为空，设置 `prev->next = current->left`。
       - 否则，设置 `nextStart = current->left`，记录下一层的起始节点。
       - 更新 `prev = current->left`。
     - 如果右子节点存在：
       - 如果 `prev` 不为空，设置 `prev->next = current->right`。
       - 否则，设置 `nextStart = current->right`。
       - 更新 `prev = current->right`。
     - 移动 `current` 到当前层的下一个节点（通过 `current->next`）。
   - 更新当前层的起始节点为 `nextStart`，并重置 `prev` 和 `nextStart` 为 `NULL`。

3. **重复上述过程**，直到没有更多的层需要遍历。

**时间复杂度分析**：
- 每个节点仅被访问一次，时间复杂度为 `O(n)`，其中 `n` 是节点的数量。

**空间复杂度分析**：
- 由于不使用额外的队列或递归栈，空间复杂度为 `O(1)`，满足进阶要求。

通过上述方法，可以在不使用额外空间的情况下，完成对二叉树 `next` 指针的填充。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
struct Node {
    int val;
    struct Node* left;
    struct Node* right;
    struct Node* next;
};

// 创建新的节点
struct Node* createNode(int val) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    node->next = NULL;
    return node;
}

// 填充 next 指针的函数
struct Node* connect(struct Node* root) {
    if (root == NULL) return NULL;

    // 当前层的起始节点
    struct Node* currentLevelStart = root;

    while (currentLevelStart != NULL) {
        struct Node* current = currentLevelStart;
        struct Node* prev = NULL;         // 前一个节点的指针
        struct Node* nextLevelStart = NULL; // 下一层的起始节点

        // 遍历当前层的所有节点
        while (current != NULL) {
            // 处理左子节点
            if (current->left != NULL) {
                if (prev != NULL) {
                    prev->next = current->left;
                } else {
                    nextLevelStart = current->left;
                }
                prev = current->left;
            }

            // 处理右子节点
            if (current->right != NULL) {
                if (prev != NULL) {
                    prev->next = current->right;
                } else {
                    nextLevelStart = current->right;
                }
                prev = current->right;
            }

            // 移动到当前层的下一个节点
            current = current->next;
        }

        // 移动到下一层
        currentLevelStart = nextLevelStart;
    }

    return root;
}

// 辅助函数：打印树的每一层的 next 指针
void printNextPointers(struct Node* root) {
    struct Node* levelStart = root;

    while (levelStart != NULL) {
        struct Node* current = levelStart;
        levelStart = NULL;

        while (current != NULL) {
            printf("%d->", current->val);
            if (current->left != NULL && levelStart == NULL) {
                levelStart = current->left;
            }
            if (current->right != NULL && levelStart == NULL) {
                levelStart = current->right;
            }
            current = current->next;
        }
        printf("NULL\n");
    }
}

// 辅助函数：释放树的内存
void freeTree(struct Node* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// 简单的主函数调用示例
int main() {
    /*
        构建示例树：
            1
          /  \
         2    3
        / \    \
       4   5    7
    */
    struct Node* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);
    root->left->left = createNode(4);
    root->left->right = createNode(5);
    root->right->right = createNode(7);

    // 填充 next 指针
    connect(root);

    // 打印每一层的 next 指针
    printf("每一层的 next 指针连接情况：\n");
    printNextPointers(root);

    // 释放内存
    freeTree(root);

    return 0;
}
```

**代码说明：**

1. **节点创建**：
   - 使用 `createNode` 函数创建新的二叉树节点，并初始化其 `val`、`left`、`right` 和 `next` 指针。

2. **填充 `next` 指针**：
   - `connect` 函数使用层序遍历的方法，利用前驱指针 `prev` 和下一层的起始节点 `nextLevelStart` 来连接每一层的节点。
   - 从当前层的起始节点开始，遍历该层的所有节点，并连接其子节点。
   - 更新下一层的起始节点，重复此过程直到所有层都被处理。

3. **打印 `next` 指针**：
   - `printNextPointers` 函数逐层打印每个节点的 `next` 指针，验证连接是否正确。

4. **内存释放**：
   - 使用 `freeTree` 函数递归释放二叉树的内存，防止内存泄漏。

**示例输出：**
```
每一层的 next 指针连接情况：
1->NULL
2->3->NULL
4->5->7->NULL
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <string>

using namespace std;

// 定义二叉树节点结构体
struct Node {
    int val;
    Node* left;
    Node* right;
    Node* next;

    Node(int _val) : val(_val), left(nullptr), right(nullptr), next(nullptr) {}
};

class Solution {
public:
    // 填充 next 指针的函数
    Node* connect(Node* root) {
        if (root == nullptr) return nullptr;

        // 当前层的起始节点
        Node* currentLevelStart = root;

        while (currentLevelStart != nullptr) {
            Node* current = currentLevelStart;
            Node* prev = nullptr;          // 前一个节点的指针
            Node* nextLevelStart = nullptr; // 下一层的起始节点

            // 遍历当前层的所有节点
            while (current != nullptr) {
                // 处理左子节点
                if (current->left != nullptr) {
                    if (prev != nullptr) {
                        prev->next = current->left;
                    } else {
                        nextLevelStart = current->left;
                    }
                    prev = current->left;
                }

                // 处理右子节点
                if (current->right != nullptr) {
                    if (prev != nullptr) {
                        prev->next = current->right;
                    } else {
                        nextLevelStart = current->right;
                    }
                    prev = current->right;
                }

                // 移动到当前层的下一个节点
                current = current->next;
            }

            // 移动到下一层
            currentLevelStart = nextLevelStart;
        }

        return root;
    }
};

// 辅助函数：打印每一层的 next 指针
void printNextPointers(Node* root) {
    Node* levelStart = root;

    while (levelStart != nullptr) {
        Node* current = levelStart;
        levelStart = nullptr;

        while (current != nullptr) {
            cout << current->val << "->";
            if (current->left != nullptr && levelStart == nullptr) {
                levelStart = current->left;
            }
            if (current->right != nullptr && levelStart == nullptr) {
                levelStart = current->right;
            }
            current = current->next;
        }
        cout << "NULL" << endl;
    }
}

// 辅助函数：释放树的内存
void freeTree(Node* root) {
    if (root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 简单的主函数调用示例
int main() {
    /*
        构建示例树：
            1
          /  \
         2    3
        / \    \
       4   5    7
    */
    Node* root = new Node(1);
    root->left = new Node(2);
    root->right = new Node(3);
    root->left->left = new Node(4);
    root->left->right = new Node(5);
    root->right->right = new Node(7);

    Solution solution;
    solution.connect(root);

    // 打印每一层的 next 指针
    cout << "每一层的 next 指针连接情况：" << endl;
    printNextPointers(root);

    // 释放内存
    freeTree(root);

    return 0;
}
```

**代码说明：**

1. **节点创建**：
   - 使用构造函数初始化 `Node`，并设置其 `val`、`left`、`right` 和 `next` 指针。

2. **填充 `next` 指针**：
   - `connect` 函数采用与C语言解答相同的逻辑，通过层序遍历并使用前驱指针 `prev` 和下一层的起始节点 `nextLevelStart` 来连接每一层的节点。
   - 遍历当前层的所有节点，连接其子节点，并更新下一层的起始节点。

3. **打印 `next` 指针**：
   - `printNextPointers` 函数逐层打印每个节点的 `next` 指针，验证连接是否正确。

4. **内存释放**：
   - 使用 `freeTree` 函数递归释放二叉树的内存，防止内存泄漏。

**示例输出：**
```
每一层的 next 指针连接情况：
1->NULL
2->3->NULL
4->5->7->NULL
```

通过上述C和C++解答，能够有效地为二叉树的每个节点填充 `next` 指针，使其指向同一层的下一个右侧节点，满足题目的要求。