---
layout: post
title:  "101. 对称二叉树"
categories: arithmetic
---

[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree)

### 题目描述

给定一个二叉树，检查它是否是镜像对称的。

**注意**：
- 如果一个树的左右子树是镜像对称的，则这棵树是镜像对称的。
- 树的对称性可以通过根节点的左右子树来判断，即根节点的左子树是右子树的镜像，右子树是左子树的镜像。

### 示例

#### 示例 1:
```
输入：
    1
   / \
  2   2
 / \ / \
3  4 4  3
输出：true
```

#### 示例 2:
```
输入：
    1
   / \
  2   2
   \   \
   3    3
输出：false
```

### 提示
- 树的节点数目范围是 `[1, 1000]`。
- `-100 <= Node.val <= 100`

### 解题思路

判断一个二叉树是否是镜像对称的树，实际上就是判断二叉树的左子树与右子树是否互为镜像。

#### 思路

1. **树的对称性**：
   - 对称树的根节点的左右子树应该是镜像对称的，即左子树的左子树与右子树的右子树镜像，左子树的右子树与右子树的左子树镜像。
   
2. **递归判断**：
   - 如果根节点为空，则认为是对称的。
   - 如果根节点不为空，递归地判断左子树与右子树是否对称：
     - 左子树的左节点与右子树的右节点是否相同。
     - 左子树的右节点与右子树的左节点是否相同。
   
3. **递归终止条件**：
   - 如果两个节点都为空，返回 `true`。
   - 如果一个为空，一个不为空，返回 `false`。
   - 如果两个节点的值不同，返回 `false`。

4. **时间复杂度**：
   - 每个节点都需要访问一次，所以时间复杂度是 O(n)，其中 n 是树的节点数。

5. **空间复杂度**：
   - 递归的空间复杂度为 O(h)，其中 h 是树的高度，最坏情况下为 O(n)。

### C语言实现

```c
#include <stdio.h>
#include <stdbool.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 判断两个树是否是镜像对称的辅助函数
bool isMirror(struct TreeNode* p, struct TreeNode* q) {
    // 如果两个节点都为空，返回true
    if (p == NULL && q == NULL) {
        return true;
    }
    // 如果一个为空，另一个不为空，返回false
    if (p == NULL || q == NULL) {
        return false;
    }
    // 如果当前节点的值不同，返回false
    if (p->val != q->val) {
        return false;
    }
    // 递归检查左子树的左子节点与右子树的右子节点，以及左子树的右子节点与右子树的左子节点
    return isMirror(p->left, q->right) && isMirror(p->right, q->left);
}

// 判断树是否是镜像对称的
bool isSymmetric(struct TreeNode* root) {
    // 从根节点开始检查左右子树是否镜像对称
    if (root == NULL) {
        return true;
    }
    return isMirror(root->left, root->right);
}

int main() {
    // 创建一个简单的二叉树
    struct TreeNode root = {1, NULL, NULL};
    struct TreeNode left1 = {2, NULL, NULL};
    struct TreeNode right1 = {2, NULL, NULL};
    struct TreeNode left2 = {3, NULL, NULL};
    struct TreeNode right2 = {3, NULL, NULL};
    
    root.left = &left1;
    root.right = &right1;
    left1.left = &left2;
    right1.right = &right2;

    // 判断树是否是镜像对称的
    if (isSymmetric(&root)) {
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
    // 判断两个树是否是镜像对称的辅助函数
    bool isMirror(TreeNode* p, TreeNode* q) {
        // 如果两个节点都为空，返回true
        if (p == NULL && q == NULL) {
            return true;
        }
        // 如果一个为空，另一个不为空，返回false
        if (p == NULL || q == NULL) {
            return false;
        }
        // 如果当前节点的值不同，返回false
        if (p->val != q->val) {
            return false;
        }
        // 递归检查左子树的左子节点与右子树的右子节点，以及左子树的右子节点与右子树的左子节点
        return isMirror(p->left, q->right) && isMirror(p->right, q->left);
    }

    // 判断树是否是镜像对称的
    bool isSymmetric(TreeNode* root) {
        // 从根节点开始检查左右子树是否镜像对称
        if (root == NULL) {
            return true;
        }
        return isMirror(root->left, root->right);
    }
};

int main() {
    Solution sol;

    // 创建一个简单的二叉树
    TreeNode* root = new TreeNode(1);
    TreeNode* left1 = new TreeNode(2);
    TreeNode* right1 = new TreeNode(2);
    TreeNode* left2 = new TreeNode(3);
    TreeNode* right2 = new TreeNode(3);
    
    root->left = left1;
    root->right = right1;
    left1->left = left2;
    right1->right = right2;

    // 判断树是否是镜像对称的
    if (sol.isSymmetric(root)) {
        cout << "True" << endl;
    } else {
        cout << "False" << endl;
    }

    // 释放内存
    delete root;
    delete left1;
    delete right1;
    delete left2;
    delete right2;

    return 0;
}
```

### 代码说明

#### C语言版本

- **结构体 `TreeNode`**：定义了二叉树节点的结构，包含一个整型值 `val` 和指向左右子节点的指针。
- **`isMirror` 函数**：该函数判断两个树是否是镜像对称的。如果两个树的根节点相同，且左子树的左子树和右子树的右子树镜像，左子树的右子树和右子树的左子树镜像，则返回 `true`，否则返回 `false`。
- **`isSymmetric` 函数**：判断整个树是否是镜像对称的。该函数通过调用 `isMirror` 来判断根节点的左右子树是否是镜像对称的。
- **`main` 函数**：在主函数中，我们创建了一个二叉树，并调用 `isSymmetric` 判断树是否是镜像对称的。

#### C++版本

- **`TreeNode` 类**：定义了二叉树节点的类，包含节点值 `val`，以及指向左右子树的指针。
- **`isMirror` 方法**：与 C 语言版本相同，判断两棵树是否镜像对称。
- **`isSymmetric` 方法**：判断树的左右子树是否镜像对称。
- **`main` 函数**：在主函数中，创建了一个二叉树，使用 `Solution` 类的 `isSymmetric` 方法判断是否镜像对称，并打印结果。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 n 是树的节点数。我们需要遍历每个节点一次，进行比较。
- **空间复杂度**：O(h)，其中 h 是树的高度。递归调用栈的深度取决于树的高度，在最坏情况下，树是链状的，空间复杂度为 O(n)。