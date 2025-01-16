---
layout: post
title:  "110. 平衡二叉树"
categories: arithmetic
---

[110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree)

### 题目描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

**高度平衡二叉树**是指：

- 一棵二叉树每个节点的左右子树的高度差的绝对值不超过1。

### 示例

#### 示例 1:
```
输入: root = [3,9,20,null,null,15,7]
输出: true
```

#### 示例 2:
```
输入: root = [1,2,2,3,3,null,null,4,4]
输出: false
```

#### 示例 3:
```
输入: root = []
输出: true
```

### 提示

- 树的节点数在 `[0, 5000]` 范围内。
- `-10^4 <= Node.val <= 10^4`

### 解题思路

这道题的关键是判断一棵树是否是平衡的。平衡二叉树的定义是：对于每个节点，其左右子树的高度差不超过1。我们可以使用递归的方法来解决这个问题。

1. **递归求树的高度**：首先我们要知道树的高度。对于每个节点，我们可以通过递归计算其左右子树的高度，然后返回该节点的高度。
   
2. **判断平衡性**：在计算节点的左右子树高度的同时，检查左右子树的高度差是否超过1。如果超过1，那么该树不平衡，直接返回 `false`。

3. **剪枝优化**：如果某一部分树已经不平衡（左右子树的高度差大于1），则可以提前返回，避免不必要的递归计算。

4. **返回值**：递归返回的值是节点的高度，同时在递归过程中判断树是否平衡。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 `n` 是树的节点数。每个节点访问一次，递归计算树的高度。
- **空间复杂度**：O(h)，其中 `h` 是树的高度。递归调用栈的深度为树的高度，在最坏情况下，树的高度为 `n`，所以空间复杂度为 O(n)。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 计算树的高度，并判断是否平衡
int height(struct TreeNode* root) {
    if (root == NULL) {
        return 0;  // 空节点高度为0
    }

    // 计算左子树的高度
    int leftHeight = height(root->left);
    if (leftHeight == -1) return -1;  // 如果左子树不平衡，返回-1

    // 计算右子树的高度
    int rightHeight = height(root->right);
    if (rightHeight == -1) return -1;  // 如果右子树不平衡，返回-1

    // 判断当前节点是否平衡
    if (abs(leftHeight - rightHeight) > 1) {
        return -1;  // 如果高度差大于1，说明不平衡
    }

    // 返回当前节点的高度
    return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight);
}

// 判断二叉树是否平衡
bool isBalanced(struct TreeNode* root) {
    return height(root) != -1;  // 如果返回值为-1，则说明不平衡
}

// 创建一个新的树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = node->right = NULL;
    return node;
}

int main() {
    // 创建一个平衡的二叉树: [3,9,20,null,null,15,7]
    struct TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    // 判断树是否平衡
    if (isBalanced(root)) {
        printf("树是平衡的\n");
    } else {
        printf("树不是平衡的\n");
    }

    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <algorithm>
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
    // 计算树的高度，并判断是否平衡
    int height(TreeNode* root) {
        if (root == NULL) {
            return 0;  // 空节点高度为0
        }

        // 计算左子树的高度
        int leftHeight = height(root->left);
        if (leftHeight == -1) return -1;  // 如果左子树不平衡，返回-1

        // 计算右子树的高度
        int rightHeight = height(root->right);
        if (rightHeight == -1) return -1;  // 如果右子树不平衡，返回-1

        // 判断当前节点是否平衡
        if (abs(leftHeight - rightHeight) > 1) {
            return -1;  // 如果高度差大于1，说明不平衡
        }

        // 返回当前节点的高度
        return 1 + max(leftHeight, rightHeight);
    }

    // 判断二叉树是否平衡
    bool isBalanced(TreeNode* root) {
        return height(root) != -1;  // 如果返回值为-1，则说明不平衡
    }
};

// 创建一个新的树节点
TreeNode* createNode(int val) {
    return new TreeNode(val);
}

int main() {
    // 创建一个平衡的二叉树: [3,9,20,null,null,15,7]
    TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    Solution sol;

    // 判断树是否平衡
    if (sol.isBalanced(root)) {
        cout << "树是平衡的" << endl;
    } else {
        cout << "树不是平衡的" << endl;
    }

    return 0;
}
```

### 代码解释

#### C语言版：
1. **`height` 函数**：用于递归计算树的高度，同时判断树是否平衡。通过返回值来表示树的平衡性，如果返回 `-1`，则表示树不平衡。
2. **`isBalanced` 函数**：调用 `height` 函数来判断树是否平衡。
3. **`createNode` 函数**：创建新的树节点，并初始化其值和左右子节点为 `NULL`。
4. **`main` 函数**：构建一个简单的二叉树并测试是否平衡。

#### C++版：
1. **`height` 函数**：与C语言版一样，用递归的方式计算树的高度并判断树是否平衡。
2. **`isBalanced` 函数**：调用 `height` 函数来判断树是否平衡。
3. **`createNode` 函数**：用于创建新的树节点。
4. **`main` 函数**：构建二叉树并调用 `isBalanced` 函数判断树是否平衡。

### 测试输出

对于示例输入 `root = [3,9,20,null,null,15,7]`，输出：
```
树是平衡的
```

对于示例输入 `root = [1,2,2,3,3,null,null,4,4]`，输出：
```
树不是平衡的
```