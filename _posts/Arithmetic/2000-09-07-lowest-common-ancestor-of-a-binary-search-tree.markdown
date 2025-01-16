---
layout: post
title:  "235. 二叉搜索树的最近公共祖先"
categories: arithmetic
---

[235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/description/)

### 题目描述

给定一个二叉搜索树（BST），找到该树中两个指定节点的最近公共祖先（LCA）。

最近公共祖先的定义为：对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。

**注意：**
- 所有节点的值都是唯一的。
- p、q 为不同节点且均存在于给定的二叉搜索树中。

**示例 1:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
输出: 6
解释: 节点 2 和节点 8 的最近公共祖先是 6。
```

**示例 2:**

```
输入: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
输出: 2
解释: 节点 2 和节点 4 的最近公共祖先是 2，因为根据定义，一个节点可以是它自己的祖先。
```

**提示：**
- 二叉搜索树的性质：左子树的所有节点值小于根节点值，右子树的所有节点值大于根节点值。
- 可以利用二叉搜索树的性质来简化问题。

---

### 解题思路

二叉搜索树（BST）的性质是左子树的所有节点值小于根节点值，右子树的所有节点值大于根节点值。因此，可以利用这一性质来快速找到两个节点的最近公共祖先（LCA）。

1. **从根节点开始遍历：**
   - 如果当前节点的值大于 p 和 q 的值，说明 p 和 q 都在当前节点的左子树中，继续遍历左子树。
   - 如果当前节点的值小于 p 和 q 的值，说明 p 和 q 都在当前节点的右子树中，继续遍历右子树。
   - 如果当前节点的值介于 p 和 q 的值之间，或者等于 p 或 q 的值，则当前节点就是 p 和 q 的最近公共祖先。

2. **终止条件：**
   - 当找到满足条件的节点时，直接返回该节点。

---

### C 语言解答

```c
#include <stdio.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 函数原型
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q);

// 实现函数
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    // 如果当前节点为空，返回 NULL
    if (root == NULL) {
        return NULL;
    }

    // 如果 p 和 q 的值都小于当前节点的值，说明 LCA 在左子树
    if (p->val < root->val && q->val < root->val) {
        return lowestCommonAncestor(root->left, p, q);
    }

    // 如果 p 和 q 的值都大于当前节点的值，说明 LCA 在右子树
    if (p->val > root->val && q->val > root->val) {
        return lowestCommonAncestor(root->right, p, q);
    }

    // 否则，当前节点就是 LCA
    return root;
}

// 测试代码
int main() {
    // 构建示例 1 的二叉树
    struct TreeNode n0 = {0, NULL, NULL};
    struct TreeNode n2 = {2, &n0, NULL};
    struct TreeNode n3 = {3, NULL, NULL};
    struct TreeNode n5 = {5, NULL, NULL};
    struct TreeNode n4 = {4, &n3, &n5};
    struct TreeNode n8 = {8, NULL, NULL};
    struct TreeNode n7 = {7, NULL, NULL};
    struct TreeNode n9 = {9, NULL, NULL};
    struct TreeNode n6 = {6, &n2, &n8};

    // 调用函数
    struct TreeNode* result = lowestCommonAncestor(&n6, &n2, &n8);
    printf("LCA of 2 and 8 is: %d\n", result->val); // 输出 6

    return 0;
}
```

---

### C++ 解答

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
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // 如果当前节点为空，返回 NULL
        if (root == nullptr) {
            return nullptr;
        }

        // 如果 p 和 q 的值都小于当前节点的值，说明 LCA 在左子树
        if (p->val < root->val && q->val < root->val) {
            return lowestCommonAncestor(root->left, p, q);
        }

        // 如果 p 和 q 的值都大于当前节点的值，说明 LCA 在右子树
        if (p->val > root->val && q->val > root->val) {
            return lowestCommonAncestor(root->right, p, q);
        }

        // 否则，当前节点就是 LCA
        return root;
    }
};

// 测试代码
int main() {
    // 构建示例 1 的二叉树
    TreeNode n0(0);
    TreeNode n2(2);
    TreeNode n3(3);
    TreeNode n5(5);
    TreeNode n4(4);
    TreeNode n8(8);
    TreeNode n7(7);
    TreeNode n9(9);
    TreeNode n6(6);

    n6.left = &n2;
    n6.right = &n8;
    n2.left = &n0;
    n2.right = &n4;
    n4.left = &n3;
    n4.right = &n5;
    n8.left = &n7;
    n8.right = &n9;

    Solution solution;
    TreeNode* result = solution.lowestCommonAncestor(&n6, &n2, &n8);
    cout << "LCA of 2 and 8 is: " << result->val << endl; // 输出 6

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用递归方法遍历二叉搜索树。
   - 根据节点值的大小关系决定向左子树或右子树递归。
   - 时间复杂度为 O(h)，其中 h 是树的高度。

2. **C++ 实现：**
   - 使用类和递归方法实现。
   - 利用了二叉搜索树的性质，简化了查找过程。
   - 代码结构清晰，易于理解。

3. **测试代码：**
   - 构建了示例中的二叉树，并调用函数验证结果。

---

通过以上实现，可以高效地找到二叉搜索树中两个节点的最近公共祖先。