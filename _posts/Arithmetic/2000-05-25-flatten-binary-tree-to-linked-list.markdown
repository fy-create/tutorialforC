---
layout: post
title:  "114. 二叉树展开为链表"
categories: arithmetic
---

[114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list)

### 题目描述

给定一个二叉树，**原地**将其展开为一个**单链表**。这个链表应该按以下顺序展开：

- 展开后的链表应该将二叉树的 **前序遍历** 顺序中的所有节点依次连接起来。

### 示例

#### 示例 1:
```
输入:
     1
    / \
   2   5
  / \   \
 3   4   6

输出:
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

#### 示例 2:
```
输入:
    1
   /
  2
 /
3

输出:
1
 \
  2
   \
    3
```

### 提示

- 树中的节点数目范围是 `[1, 1000]`。
- 每个节点的值是 `[1, 1000]`。

### 解题思路

这道题目要求我们将一个二叉树原地转换为链表，并且链表的顺序是二叉树的**前序遍历**顺序。这意味着我们需要修改原二叉树的结构，使其从一个树的结构变为单链表。

我们可以采用以下步骤来完成这一任务：

1. **前序遍历**：根据题目要求，转换的链表需要符合前序遍历的顺序。因此我们可以先做一个前序遍历的操作，同时处理链表结构。
   
2. **链表化过程**：
   - 对于每个节点，先将它的左子树连接到它的右边。
   - 然后将左子树置为`NULL`，以保持单链表的结构。
   
3. **遍历操作**：我们可以使用一个递归或迭代的方式完成遍历。在遍历过程中，我们需要：
   - 先处理当前节点。
   - 然后递归地处理当前节点的左子树和右子树。
   
4. **原地修改**：这道题要求**原地**修改树的结构，这意味着我们不能使用额外的空间来存储新的链表，而是通过直接修改树的指针来实现这一目标。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 `n` 是树中的节点数。每个节点都需要被访问一次。
- **空间复杂度**：O(1)，由于是原地修改，我们不使用额外的存储空间（除了递归栈的空间）。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 递归函数将树转换为链表
void flatten(struct TreeNode* root) {
    if (root == NULL) return;
    
    // 先递归处理左子树
    if (root->left) {
        flatten(root->left);
        
        // 记录右子树
        struct TreeNode* tempRight = root->right;
        
        // 将左子树挂到右子树的位置
        root->right = root->left;
        root->left = NULL;
        
        // 找到新右子树的最右边的节点
        struct TreeNode* current = root->right;
        while (current->right != NULL) {
            current = current->right;
        }
        
        // 将原右子树挂到最右边
        current->right = tempRight;
    }

    // 递归处理右子树
    flatten(root->right);
}

// 创建树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = node->right = NULL;
    return node;
}

// 打印链表
void printList(struct TreeNode* root) {
    while (root != NULL) {
        printf("%d ", root->val);
        root = root->right;
    }
    printf("\n");
}

int main() {
    // 创建树: [1,2,5,3,4,null,6]
    struct TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(5);
    root->left->left = createNode(3);
    root->left->right = createNode(4);
    root->right->right = createNode(6);

    // 转换为链表
    flatten(root);

    // 打印链表
    printList(root);

    return 0;
}
```

### C++解答

```cpp
#include <iostream>
using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 递归函数将树转换为链表
    void flatten(TreeNode* root) {
        if (root == NULL) return;
        
        // 先递归处理左子树
        if (root->left) {
            flatten(root->left);
            
            // 记录右子树
            TreeNode* tempRight = root->right;
            
            // 将左子树挂到右子树的位置
            root->right = root->left;
            root->left = NULL;
            
            // 找到新右子树的最右边的节点
            TreeNode* current = root->right;
            while (current->right != NULL) {
                current = current->right;
            }
            
            // 将原右子树挂到最右边
            current->right = tempRight;
        }

        // 递归处理右子树
        flatten(root->right);
    }
};

// 创建树节点
TreeNode* createNode(int val) {
    return new TreeNode(val);
}

// 打印链表
void printList(TreeNode* root) {
    while (root != NULL) {
        cout << root->val << " ";
        root = root->right;
    }
    cout << endl;
}

int main() {
    // 创建树: [1,2,5,3,4,null,6]
    TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(5);
    root->left->left = createNode(3);
    root->left->right = createNode(4);
    root->right->right = createNode(6);

    Solution sol;
    
    // 转换为链表
    sol.flatten(root);

    // 打印链表
    printList(root);

    return 0;
}
```

### 代码解释

#### C语言版：
1. **`flatten` 函数**：
   - 递归处理二叉树的每个节点。
   - 对于每个节点，将其左子树连接到右子树，左子树置为 `NULL`。
   - 找到新右子树的最右边节点，将原来的右子树连接到该位置。
   - 最后递归处理右子树。

2. **`createNode` 函数**：
   - 创建一个新的二叉树节点。

3. **`printList` 函数**：
   - 打印链表，从头到尾遍历每个节点并输出其值。

#### C++版：
1. **`flatten` 函数**：
   - 类似C语言的实现，递归遍历树并修改树结构，将其转换为链表。
   
2. **`createNode` 函数**：
   - 创建一个新的二叉树节点，返回指向该节点的指针。

3. **`printList` 函数**：
   - 输出链表的节点值，从头到尾遍历链表并输出。

### 测试输出

对于示例输入 `root = [1,2,5,3,4,null,6]`，输出：

```
1 2 3 4 5 6
```

### 总结

- 本题通过深度优先遍历（DFS）将二叉树转换成链表，确保链表的顺序符合前序遍历的要求。
- 采用递归方式进行树的遍历，利用树的原地修改特性，确保不使用额外的存储空间来存储链表。
