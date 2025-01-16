---
layout: post
title:  "99. 恢复二叉搜索树"
categories: arithmetic
---

[99. 恢复二叉搜索树](https://leetcode.cn/problems/recover-binary-search-tree)

输入：
    2
   / \
  3   1

输出：
    2
   / \
  1   3
题目：恢复二叉搜索树

## 题目描述

二叉搜索树（Binary Search Tree，BST）是一棵具有以下性质的二叉树：

1. 左子树上所有节点的值都小于根节点的值。
2. 右子树上所有节点的值都大于根节点的值。
3. 左右子树也都是二叉搜索树。

给定一个二叉搜索树的根节点 `root`，其中两个节点的值被错误地交换了，恢复二叉搜索树。

请在 **O(n)** 时间复杂度内，恢复该二叉搜索树。

### 示例

**示例 1:**
```
输入: [1,3,null,null,2]
       1
      /
     3
    /
   2

输出: [3,1,null,null,2]
       3
      /
     1
      \
       2
```

**示例 2:**
```
输入: [3,1,4,null,null,2]
       3
      / \
     1   4
        /
       2

输出: [2,1,4,null,null,3]
       2
      / \
     1   4
        /
       3
```

### 提示

- 树中节点的数目范围是 [2, 1000]。
- 题目数据保证树中存在错误的节点。

## 解题思路

二叉搜索树的中序遍历是一个严格递增的序列。如果树中有两个节点的值被错误地交换了，那么中序遍历序列中的两个元素就会不满足递增关系。因此，恢复该树的关键在于找出这两个不满足递增关系的元素，并交换它们的值。

### 解题步骤

1. **中序遍历**：首先进行一次中序遍历，记录下所有节点的值，并找出其中违反递增关系的节点。因为只有两节点被交换，所以中序遍历中最多有两个位置的节点值不符合递增顺序。
  
2. **找出错误的节点**：具体来说：
   - 当发现一个节点的值大于下一个节点的值时，说明这两个节点交换了值。
   - 由于只有两个节点被交换，所以可以通过遍历来定位这两个节点。

3. **恢复树结构**：一旦找到了这两个错误的节点，通过交换这两个节点的值来恢复树的正确结构。

4. **时间复杂度**：由于我们只需要一次中序遍历，因此时间复杂度是 O(n)，其中 n 是节点的数量。

## C语言实现

```c
#include <stdio.h>

// 定义二叉树结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 全局变量，保存错误的节点
struct TreeNode *first = NULL, *second = NULL, *prev = NULL;

// 中序遍历，寻找错误的节点
void inorder(struct TreeNode* root) {
    if (root == NULL) return;
    
    // 递归遍历左子树
    inorder(root->left);
    
    // 查找错误节点
    if (prev != NULL && prev->val > root->val) {
        if (first == NULL) {
            first = prev; // 记录第一个错误节点
        }
        second = root; // 记录第二个错误节点
    }
    
    prev = root; // 更新前一个节点为当前节点
    
    // 递归遍历右子树
    inorder(root->right);
}

// 交换两个节点的值
void swap(struct TreeNode* a, struct TreeNode* b) {
    int temp = a->val;
    a->val = b->val;
    b->val = temp;
}

// 恢复二叉搜索树
void recoverTree(struct TreeNode* root) {
    first = second = prev = NULL;
    
    // 进行中序遍历
    inorder(root);
    
    // 交换两个错误的节点
    if (first != NULL && second != NULL) {
        swap(first, second);
    }
}

// 主函数示例
int main() {
    struct TreeNode node1 = {1, NULL, NULL};
    struct TreeNode node2 = {3, NULL, NULL};
    struct TreeNode node3 = {2, NULL, NULL};
    
    node1.left = &node2;
    node2.left = &node3;
    
    recoverTree(&node1);
    
    // 输出恢复后的树
    printf("Root: %d\n", node1.val);  // 输出应该是3
    printf("Left: %d\n", node1.left->val);  // 输出应该是1
    printf("Left's Left: %d\n", node1.left->left->val);  // 输出应该是2
    
    return 0;
}
```

## C++实现

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 定义二叉树结构体
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 全局变量，保存错误的节点
    TreeNode *first = NULL, *second = NULL, *prev = NULL;
    
    // 中序遍历，寻找错误的节点
    void inorder(TreeNode* root) {
        if (root == NULL) return;
        
        // 递归遍历左子树
        inorder(root->left);
        
        // 查找错误节点
        if (prev != NULL && prev->val > root->val) {
            if (first == NULL) {
                first = prev; // 记录第一个错误节点
            }
            second = root; // 记录第二个错误节点
        }
        
        prev = root; // 更新前一个节点为当前节点
        
        // 递归遍历右子树
        inorder(root->right);
    }
    
    // 交换两个节点的值
    void swap(TreeNode* a, TreeNode* b) {
        int temp = a->val;
        a->val = b->val;
        b->val = temp;
    }
    
    // 恢复二叉搜索树
    void recoverTree(TreeNode* root) {
        first = second = prev = NULL;
        
        // 进行中序遍历
        inorder(root);
        
        // 交换两个错误的节点
        if (first != NULL && second != NULL) {
            swap(first, second);
        }
    }
};

// 主函数示例
int main() {
    // 创建二叉树节点
    TreeNode *root = new TreeNode(1);
    TreeNode *node1 = new TreeNode(3);
    TreeNode *node2 = new TreeNode(2);
    
    root->left = node1;
    node1->left = node2;
    
    // 创建解法对象
    Solution solution;
    
    // 恢复二叉搜索树
    solution.recoverTree(root);
    
    // 输出恢复后的树
    cout << "Root: " << root->val << endl;  // 输出应该是3
    cout << "Left: " << root->left->val << endl;  // 输出应该是1
    cout << "Left's Left: " << root->left->left->val << endl;  // 输出应该是2
    
    return 0;
}
```

在上述代码中，我们首先定义了二叉树节点的结构 `TreeNode`，然后通过中序遍历来寻找被错误交换的两个节点，并通过交换这两个节点的值来恢复二叉搜索树。C++ 版本中，我们使用了类 `Solution` 来封装方法，并且通过 `using namespace std;` 简化了代码。

### 注意：
1. 我们只需要执行一次中序遍历来查找并恢复树，这样保证了时间复杂度是 O(n)，空间复杂度是 O(h)，其中 h 是树的高度。
2. 交换节点时，只交换节点的值而不交换节点的结构，避免了修改树结构。

