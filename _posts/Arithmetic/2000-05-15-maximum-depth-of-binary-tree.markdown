---
layout: post
title:  "104. 二叉树的最大深度"
categories: arithmetic
---

[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree)

### 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

**说明**：叶子节点是指没有子节点的节点。

---

**示例 1：**

```
输入：root = [3,9,20,null,null,15,7]
输出：3
解释：二叉树的最大深度是根节点到叶子节点路径上的节点总数，为 3。
```

**示例 2：**

```
输入：root = [1,null,2]
输出：2
```

---

**提示：**

- 树中节点的数量在 `[0, 10⁴]` 范围内。
- `-100 <= Node.val <= 100`

---

### 解题思路

计算二叉树的最大深度可以采用递归方法：

1. **递归定义**：
   - 如果当前节点为空，返回深度为 0。
   - 如果当前节点不为空，则递归计算其左子树和右子树的最大深度，取两者的最大值并加 1。

2. **递归公式**：
   ```
   maxDepth(root) = max(maxDepth(root->left), maxDepth(root->right)) + 1
   ```

3. **时间复杂度**：
   - 每个节点仅访问一次，时间复杂度为 O(n)，其中 n 是节点数量。

4. **空间复杂度**：
   - 递归调用栈的最大深度为树的高度，空间复杂度为 O(h)，其中 h 是树的高度。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 二叉树节点定义
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 计算二叉树的最大深度
int maxDepth(struct TreeNode* root) {
    if (root == NULL) {
        return 0; // 空节点的深度为 0
    }

    // 递归计算左子树和右子树的最大深度
    int leftDepth = maxDepth(root->left);
    int rightDepth = maxDepth(root->right);

    // 返回左右子树深度的最大值加 1
    return (leftDepth > rightDepth ? leftDepth : rightDepth) + 1;
}

// 辅助函数：创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* newNode = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    newNode->val = val;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 测试函数
int main() {
    // 构造示例二叉树 [3, 9, 20, null, null, 15, 7]
    struct TreeNode* root = createNode(3);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    int depth = maxDepth(root);
    printf("二叉树的最大深度: %d\n", depth);

    // 释放内存（略，测试时使用简单二叉树无需释放）

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <algorithm>

using namespace std;

// 二叉树节点定义
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    // 计算二叉树的最大深度
    int maxDepth(TreeNode* root) {
        if (!root) {
            return 0; // 空节点的深度为 0
        }

        // 递归计算左子树和右子树的最大深度
        int leftDepth = maxDepth(root->left);
        int rightDepth = maxDepth(root->right);

        // 返回左右子树深度的最大值加 1
        return max(leftDepth, rightDepth) + 1;
    }
};

// 测试函数
int main() {
    // 构造示例二叉树 [3, 9, 20, null, null, 15, 7]
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);

    Solution sol;
    int depth = sol.maxDepth(root);

    cout << "二叉树的最大深度: " << depth << endl;

    // 释放内存（略，测试时使用简单二叉树无需释放）

    return 0;
}
```

---

### 代码说明

1. **递归方法**：
   - 递归计算左右子树的最大深度。
   - 返回左右子树深度的最大值加 1。

2. **内存释放**：
   - C 语言需要手动释放树节点的内存。
   - C++ 的示例代码中未释放内存，仅为测试方便，实际应用中可添加树的析构逻辑。

3. **时间复杂度**：
   - 每个节点仅访问一次，时间复杂度为 O(n)。

4. **空间复杂度**：
   - 递归调用栈的最大深度为树的高度，空间复杂度为 O(h)。