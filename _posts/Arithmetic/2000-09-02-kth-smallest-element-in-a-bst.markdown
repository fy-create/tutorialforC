---
layout: post
title:  "230. 二叉搜索树中第 K 小的元素"
categories: arithmetic
---

[230. 二叉搜索树中第 K 小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst)

### 题目描述

给定一个二叉搜索树的根节点 `root` ，和一个整数 `k` ，请你设计一个算法查找其中第 `k` 小的元素（从 1 开始计数）。

---

#### 示例 1：
```
输入：root = [3,1,4,null,2], k = 1
输出：1
```

#### 示例 2：
```
输入：root = [5,3,6,2,4,null,null,1], k = 3
输出：3
```

---

#### 提示：
- 树中的节点数为 `n`。
- `1 <= k <= n <= 10⁴`
- `0 <= Node.val <= 10⁴`

---

### 解题思路

1. **二叉搜索树的性质**：
   - 左子树的所有节点值均小于根节点值。
   - 右子树的所有节点值均大于根节点值。
   - 中序遍历（左-根-右）可以按照升序输出节点值。

2. **查找第 k 小的元素**：
   - 使用中序遍历访问节点，记录当前访问的节点数。
   - 当访问到第 `k` 个节点时，直接返回其值。

3. **递归实现**：
   - 通过递归进行中序遍历，记录当前访问的节点数，直到找到第 `k` 小元素。

4. **迭代实现**：
   - 使用显式栈模拟中序遍历，更适合大规模数据集。

5. **复杂度分析**：
   - 时间复杂度：`O(H + k)`，其中 `H` 为树的高度，`k` 为目标节点的索引。
   - 空间复杂度：`O(H)`，递归或栈的最大深度为树的高度。

---

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

// 辅助函数：中序遍历查找第 k 小元素
void inorder(struct TreeNode *root, int *k, int *result) {
    if (root == NULL || *k <= 0) return;

    // 遍历左子树
    inorder(root->left, k, result);

    // 处理当前节点
    (*k)--; // 每访问一个节点，k 减 1
    if (*k == 0) {
        *result = root->val; // 找到第 k 小的节点
        return;
    }

    // 遍历右子树
    inorder(root->right, k, result);
}

// 主函数：查找第 k 小元素
int kthSmallest(struct TreeNode *root, int k) {
    int result = -1; // 存储结果
    inorder(root, &k, &result);
    return result;
}

// 测试主函数
int main() {
    // 构造测试二叉树 [3, 1, 4, null, 2]
    struct TreeNode n1 = {1, NULL, &(struct TreeNode){2, NULL, NULL}};
    struct TreeNode n3 = {3, &n1, &(struct TreeNode){4, NULL, NULL}};

    int k = 1;
    printf("第 %d 小的元素是: %d\n", k, kthSmallest(&n3, k)); // 输出: 1
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <stack>
using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    // 中序遍历查找第 k 小元素
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> stk; // 模拟中序遍历的栈
        TreeNode* current = root;

        while (current != nullptr || !stk.empty()) {
            // 遍历左子树
            while (current != nullptr) {
                stk.push(current);
                current = current->left;
            }

            // 处理当前节点
            current = stk.top();
            stk.pop();
            k--; // 每访问一个节点，k 减 1
            if (k == 0) return current->val;

            // 遍历右子树
            current = current->right;
        }

        return -1; // 正常情况下不会到这里
    }
};

// 测试主函数
int main() {
    // 构造测试二叉树 [3, 1, 4, null, 2]
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(1);
    root->left->right = new TreeNode(2);
    root->right = new TreeNode(4);

    Solution solution;
    int k = 1;
    cout << "第 " << k << " 小的元素是: " << solution.kthSmallest(root, k) << endl; // 输出: 1

    // 释放内存
    delete root->left->right;
    delete root->left;
    delete root->right;
    delete root;

    return 0;
}
```

---

### 代码解读

- **C语言**：
  - 使用递归实现中序遍历，利用指针传递当前的 `k` 和结果值。
  - 函数结构简单，适合对树结构的直接操作。

- **C++**：
  - 使用 STL 容器（`stack`）模拟中序遍历。
  - 提供了更简洁的迭代实现，避免递归可能带来的栈溢出问题。
  - 使用面向对象风格，方便扩展和封装。

- **测试用例**：
  - 提供了一个典型二叉搜索树，并验证第 `k` 小元素的正确性。
  - 包含内存释放的代码，防止内存泄漏。

这两种实现都能够高效地找到第 `k` 小的元素，C++ 的实现更具现代化和可扩展性。