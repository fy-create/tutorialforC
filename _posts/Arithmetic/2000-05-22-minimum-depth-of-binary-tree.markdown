---
layout: post
title:  "111. 二叉树的最小深度"
categories: arithmetic
---

[111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree)

### 题目描述

给定一个二叉树，找出其最小深度。

**最小深度**是从根节点到最近叶子节点的最短路径的长度。

**叶子节点**是指没有子节点的节点。

### 示例

#### 示例 1:

```
输入: root = [3,9,20,null,null,15,7]
输出: 2
```

#### 示例 2:

```
输入: root = [2,null,3,null,4,null,5,null,6]
输出: 5
```

#### 示例 3:

```
输入: root = []
输出: 0
```

### 提示

- 树中节点的数目范围是 `[0, 10^5]`。
- `-1000 <= Node.val <= 1000`

### 解题思路

**最小深度的定义**是从根节点到叶子节点的路径中，经过的节点数最少。要解决这个问题，可以使用**深度优先搜索**（DFS）或**广度优先搜索**（BFS）来遍历树。

#### 1. **深度优先搜索（DFS）**：
   - 使用递归方式，遍历每一条路径，计算每个叶子节点的深度。
   - 对于每个节点，我们可以递归地计算左子树和右子树的深度，返回最小的深度。
   - 特别地，如果某个节点只有一个子树，那么我们就必须递归处理这个子树，直到遇到叶子节点。

#### 2. **广度优先搜索（BFS）**：
   - 使用队列按层次遍历，遍历每一层时，如果某个节点是叶子节点，则可以立刻返回其深度。
   - 这种方法的好处是找到最小深度时可以提前结束，而不需要遍历完整棵树。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 `n` 是二叉树的节点数。无论是DFS还是BFS，遍历每个节点的时间复杂度都是O(n)。
- **空间复杂度**：O(n)，DFS的递归栈空间或者BFS的队列空间，最坏情况下都是O(n)。

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

// 深度优先搜索（DFS）计算最小深度
int minDepth(struct TreeNode* root) {
    if (root == NULL) {
        return 0;  // 空树的深度为0
    }

    // 如果只有一个子树，则递归处理另一个子树
    if (root->left == NULL) {
        return minDepth(root->right) + 1;
    }
    if (root->right == NULL) {
        return minDepth(root->left) + 1;
    }

    // 否则，递归计算左右子树的深度
    int leftDepth = minDepth(root->left);
    int rightDepth = minDepth(root->right);

    // 返回左右子树的最小深度 + 1
    return (leftDepth < rightDepth ? leftDepth : rightDepth) + 1;
}

// 创建一个新的树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = node->right = NULL;
    return node;
}

int main() {
    // 创建一个二叉树: [3,9,20,null,null,15,7]
    struct TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    // 计算最小深度
    int depth = minDepth(root);
    printf("树的最小深度是: %d\n", depth);

    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <queue>
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
    // 深度优先搜索（DFS）计算最小深度
    int minDepth(TreeNode* root) {
        if (root == NULL) {
            return 0;  // 空树的深度为0
        }

        // 如果只有一个子树，则递归处理另一个子树
        if (root->left == NULL) {
            return minDepth(root->right) + 1;
        }
        if (root->right == NULL) {
            return minDepth(root->left) + 1;
        }

        // 否则，递归计算左右子树的深度
        int leftDepth = minDepth(root->left);
        int rightDepth = minDepth(root->right);

        // 返回左右子树的最小深度 + 1
        return min(leftDepth, rightDepth) + 1;
    }
};

// 创建一个新的树节点
TreeNode* createNode(int val) {
    return new TreeNode(val);
}

int main() {
    // 创建一个二叉树: [3,9,20,null,null,15,7]
    TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    Solution sol;

    // 计算最小深度
    int depth = sol.minDepth(root);
    cout << "树的最小深度是: " << depth << endl;

    return 0;
}
```

### 代码解释

#### C语言版：
1. **`minDepth` 函数**：
   - 如果当前节点是 `NULL`，则返回深度 `0`。
   - 如果当前节点没有左子树或右子树，递归计算另一个子树的深度。
   - 如果节点同时有左右子树，递归计算左子树和右子树的深度，返回较小的深度加 `1`。

2. **`createNode` 函数**：用于创建新的树节点，初始化节点值并设置左右子节点为 `NULL`。

3. **`main` 函数**：构建一棵二叉树并调用 `minDepth` 函数计算最小深度。

#### C++版：
1. **`minDepth` 函数**：与 C 语言版类似，递归计算树的最小深度。
2. **`createNode` 函数**：用于创建新的树节点。
3. **`main` 函数**：创建一棵二叉树并计算最小深度。

### 测试输出

对于示例输入 `root = [3,9,20,null,null,15,7]`，输出：
```
树的最小深度是: 2
```

对于示例输入 `root = [2,null,3,null,4,null,5,null,6]`，输出：
```
树的最小深度是: 5
```

对于示例输入 `root = []`，输出：
```
树的最小深度是: 0
```