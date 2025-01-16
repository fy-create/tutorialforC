---
layout: post
title:  "98. 验证二叉搜索树"
categories: arithmetic
---

[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree)

### 题目描述

给定一个二叉树，判断其是否是一个有效的二叉搜索树（BST）。

**二叉搜索树的定义：**  
- 节点的左子树只包含小于节点值的节点。
- 节点的右子树只包含大于节点值的节点。
- 每个节点的左右子树也必须是二叉搜索树。

### 示例

#### 示例 1:
```
输入：
    2
   / \
  1   3
输出：true
```

#### 示例 2:
```
输入：
    5
   / \
  1   4
     / \
    3   6
输出：false
解释：输入的树为：
    5
   / \
  1   4
     / \
    3   6
由于 3 < 5，但 3 > 4，因此树不是二叉搜索树。
```

### 提示
- 树中的节点数目范围是 `[1, 10^4]`。
- `-2^31 <= Node.val <= 2^31 - 1`。

### 解题思路

本题要求验证一棵二叉树是否是一个有效的二叉搜索树（BST）。要检查一棵树是否为BST，我们需要确保树中的每个节点的值都满足二叉搜索树的性质。

#### 方法

1. **BST的性质**：  
   - 对于任意一个节点，其左子树的所有节点值都应该小于该节点的值。
   - 其右子树的所有节点值都应该大于该节点的值。
   
2. **递归的方法**：
   - 我们可以通过递归的方法来判断每个节点是否满足其父节点的限制值。
   - 对于每个节点，我们可以设定一个有效范围 `[low, high]`，其中 `low` 是当前节点可以取的最小值，`high` 是当前节点可以取的最大值。
   - 初始时，根节点的 `low` 为负无穷，`high` 为正无穷。
   - 对于当前节点：
     - 如果它的值不在 `[low, high]` 范围内，则说明不是BST。
     - 否则，递归检查左子树和右子树：左子树的值应在 `[low, root.val]` 范围内，右子树的值应在 `[root.val, high]` 范围内。

3. **时间复杂度**：  
   - 每个节点只访问一次，所以时间复杂度为 O(n)，其中 n 是节点数。

4. **空间复杂度**：  
   - 递归需要栈空间，最坏情况下树的高度为 O(n)，因此空间复杂度为 O(n)。

### C语言实现

```c
#include <stdio.h>
#include <stdbool.h>
#include <limits.h>

// 定义二叉树的节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 辅助函数：递归判断是否是有效的二叉搜索树
bool isValidBSTHelper(struct TreeNode* root, long long low, long long high) {
    // 基本情况：如果当前节点为空，返回true（空树是有效的BST）
    if (root == NULL) {
        return true;
    }

    // 检查当前节点的值是否在有效范围内
    if (root->val <= low || root->val >= high) {
        return false;
    }

    // 递归检查左子树和右子树
    return isValidBSTHelper(root->left, low, root->val) && 
           isValidBSTHelper(root->right, root->val, high);
}

// 主函数：判断给定的二叉树是否是有效的二叉搜索树
bool isValidBST(struct TreeNode* root) {
    return isValidBSTHelper(root, LONG_MIN, LONG_MAX);
}

int main() {
    // 创建一个二叉树
    struct TreeNode root = {2, NULL, NULL};
    struct TreeNode left = {1, NULL, NULL};
    struct TreeNode right = {3, NULL, NULL};
    root.left = &left;
    root.right = &right;
    
    if (isValidBST(&root)) {
        printf("True\n");
    } else {
        printf("False\n");
    }

    return 0;
}
```

### C++实现

```cpp
#include <iostream>
#include <limits.h>
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
    // 辅助函数：递归判断是否是有效的二叉搜索树
    bool isValidBSTHelper(TreeNode* root, long long low, long long high) {
        // 基本情况：如果当前节点为空，返回true（空树是有效的BST）
        if (root == NULL) {
            return true;
        }

        // 检查当前节点的值是否在有效范围内
        if (root->val <= low || root->val >= high) {
            return false;
        }

        // 递归检查左子树和右子树
        return isValidBSTHelper(root->left, low, root->val) && 
               isValidBSTHelper(root->right, root->val, high);
    }

    // 主函数：判断给定的二叉树是否是有效的二叉搜索树
    bool isValidBST(TreeNode* root) {
        return isValidBSTHelper(root, LONG_MIN, LONG_MAX);
    }
};

int main() {
    Solution sol;

    // 创建一个二叉树
    TreeNode* root = new TreeNode(2);
    TreeNode* left = new TreeNode(1);
    TreeNode* right = new TreeNode(3);
    root->left = left;
    root->right = right;

    if (sol.isValidBST(root)) {
        cout << "True" << endl;
    } else {
        cout << "False" << endl;
    }

    // 释放内存
    delete root;
    delete left;
    delete right;

    return 0;
}
```

### 代码说明

#### C语言版本

- `struct TreeNode`：定义二叉树的节点结构，包含节点值和左右子节点指针。
- `isValidBSTHelper`：递归辅助函数，通过传入当前节点的有效范围 `[low, high]` 来判断当前节点的值是否合法，并递归检查左右子树。
- `isValidBST`：调用辅助函数 `isValidBSTHelper`，初始化 `low` 为负无穷，`high` 为正无穷。
- `main` 函数创建了一个简单的二叉树并调用 `isValidBST` 来判断是否是有效的二叉搜索树。

#### C++版本

- `TreeNode`：定义二叉树节点的结构体，`val` 表示节点的值，`left` 和 `right` 是左右子树的指针。
- `isValidBSTHelper`：递归检查每个节点是否符合 BST 的规则，递归的方式会传递更新后的有效范围。
- `isValidBST`：调用递归辅助函数进行检查。
- `main`：创建二叉树，使用 `Solution` 类中的 `isValidBST` 方法判断树是否是有效的二叉搜索树。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 n 是树的节点数量。每个节点访问一次，判断是否符合BST的条件。
- **空间复杂度**：O(h)，其中 h 是树的高度。递归深度与树的高度成正比，最坏情况下树为链表时，空间复杂度为 O(n)。