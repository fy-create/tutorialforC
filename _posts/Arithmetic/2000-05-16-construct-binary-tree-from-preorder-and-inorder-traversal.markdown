---
layout: post
title:  "105. 从前序与中序遍历序列构造二叉树"
categories: arithmetic
---

[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal)

### 题目描述

给定两个整数数组 `preorder` 和 `inorder` ，其中 `preorder` 是二叉树的**先序遍历**，`inorder` 是同一棵树的**中序遍历**，请构造二叉树并返回其根节点。

---

**示例 1：**

```
输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
输出：[3,9,20,null,null,15,7]
解释：二叉树如下：
    3
   / \
  9  20
    /  \
   15   7
```

**示例 2：**

```
输入：preorder = [-1], inorder = [-1]
输出：[-1]
```

---

**提示：**

- `1 <= preorder.length <= 3000`
- `inorder.length == preorder.length`
- `-3000 <= preorder[i], inorder[i] <= 3000`
- `preorder` 和 `inorder` 均无重复元素
- `inorder` 均出现在 `preorder` 中
- `preorder` 保证为二叉树的先序遍历序列
- `inorder` 保证为二叉树的中序遍历序列

---

### 解题思路

1. **树的构造逻辑**：
   - 根据先序遍历的特性，数组 `preorder` 的第一个元素是当前树的根节点。
   - 在中序遍历数组 `inorder` 中找到根节点的位置，根节点左侧的元素构成左子树，右侧的元素构成右子树。
   - 递归构造左子树和右子树。

2. **递归细节**：
   - 使用两个指针 `preStart` 和 `inStart` 来分别表示 `preorder` 和 `inorder` 数组的起始索引。
   - 根节点的索引从 `preorder` 的 `preStart` 开始，逐步递增。
   - 中序数组的子区间决定了左右子树的范围。

3. **递归终止条件**：
   - 如果当前子区间为空（`inStart > inEnd`），返回 `NULL`。

4. **时间复杂度**：
   - 遍历每个节点一次，且使用哈希表快速查找根节点在中序数组中的位置，整体复杂度为 O(n)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* newNode = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    newNode->val = val;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

// 在中序数组中查找根节点的位置
int findPosition(int* inorder, int inStart, int inEnd, int value) {
    for (int i = inStart; i <= inEnd; i++) {
        if (inorder[i] == value) {
            return i;
        }
    }
    return -1;
}

// 递归构造二叉树
struct TreeNode* buildTreeHelper(int* preorder, int* inorder, int preStart, int inStart, int inEnd) {
    if (inStart > inEnd) {
        return NULL; // 中序区间为空，返回 NULL
    }

    // 创建当前根节点
    struct TreeNode* root = createNode(preorder[preStart]);

    // 找到当前根节点在中序数组中的位置
    int rootPos = findPosition(inorder, inStart, inEnd, root->val);

    // 计算左子树的大小
    int leftSize = rootPos - inStart;

    // 递归构造左子树和右子树
    root->left = buildTreeHelper(preorder, inorder, preStart + 1, inStart, rootPos - 1);
    root->right = buildTreeHelper(preorder, inorder, preStart + leftSize + 1, rootPos + 1, inEnd);

    return root;
}

// 主函数：构造二叉树
struct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {
    return buildTreeHelper(preorder, inorder, 0, 0, inorderSize - 1);
}

// 测试函数
void printTree(struct TreeNode* root) {
    if (root == NULL) {
        printf("null ");
        return;
    }
    printf("%d ", root->val);
    printTree(root->left);
    printTree(root->right);
}

int main() {
    int preorder[] = {3, 9, 20, 15, 7};
    int inorder[] = {9, 3, 15, 20, 7};
    int size = sizeof(preorder) / sizeof(preorder[0]);

    struct TreeNode* root = buildTree(preorder, size, inorder, size);

    printf("构造的二叉树先序遍历: ");
    printTree(root);
    printf("\n");

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap; // 存储中序遍历中值和索引的映射
        for (int i = 0; i < inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        return buildTreeHelper(preorder, inorder, 0, 0, inorder.size() - 1, inMap);
    }

private:
    TreeNode* buildTreeHelper(vector<int>& preorder, vector<int>& inorder, int preStart, int inStart, int inEnd, unordered_map<int, int>& inMap) {
        if (inStart > inEnd) {
            return nullptr; // 中序区间为空，返回 NULL
        }

        // 创建当前根节点
        TreeNode* root = new TreeNode(preorder[preStart]);

        // 找到当前根节点在中序数组中的位置
        int rootPos = inMap[root->val];

        // 计算左子树的大小
        int leftSize = rootPos - inStart;

        // 递归构造左子树和右子树
        root->left = buildTreeHelper(preorder, inorder, preStart + 1, inStart, rootPos - 1, inMap);
        root->right = buildTreeHelper(preorder, inorder, preStart + leftSize + 1, rootPos + 1, inEnd, inMap);

        return root;
    }
};

// 测试函数
void printTree(TreeNode* root) {
    if (!root) {
        cout << "null ";
        return;
    }
    cout << root->val << " ";
    printTree(root->left);
    printTree(root->right);
}

int main() {
    vector<int> preorder = {3, 9, 20, 15, 7};
    vector<int> inorder = {9, 3, 15, 20, 7};

    Solution sol;
    TreeNode* root = sol.buildTree(preorder, inorder);

    cout << "构造的二叉树先序遍历: ";
    printTree(root);
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **递归构造逻辑**：
   - 使用先序数组确定根节点。
   - 在中序数组中划分左右子树。
   - 递归处理左右子树。

2. **时间复杂度**：
   - 遍历每个节点一次，查找中序索引为 O(1)（C++ 中使用哈希表）。

3. **空间复杂度**：
   - 递归调用栈的最大深度为树的高度，空间复杂度为 O(h)。