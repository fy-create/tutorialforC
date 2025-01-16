---
layout: post
title:  "94. 二叉树的中序遍历"
categories: arithmetic
---

[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal)

### 题目要求：

给定一个二叉树的根节点 `root`，返回它的 **中序遍历** 的节点值。

**中序遍历** 是指：首先遍历左子树，然后访问当前节点，最后遍历右子树。

**示例 1：**

```
输入：root = [1,null,2,3]
输出：[1,3,2]
```

**示例 2：**

```
输入：root = []
输出：[]
```

**示例 3：**

```
输入：root = [1]
输出：[1]
```

**提示：**
- 树中节点数目在范围 `[0, 100]` 内。
- `-100 <= Node.val <= 100`

### 解题思路：

二叉树的中序遍历，按照“左子树 -> 根节点 -> 右子树”的顺序遍历。可以用递归和迭代两种方法实现。

#### 1. 递归解法：
递归是最简单的方式。我们从根节点出发，先访问左子树，访问完左子树后访问当前节点，再递归访问右子树。这样就能得到中序遍历的节点值。

#### 2. 迭代解法：
使用栈模拟递归的过程。我们将当前节点和它的左子树节点按顺序压入栈中，然后依次弹出栈顶元素进行访问，并访问该节点的右子树。这样就能避免使用递归，且适合处理较大的树。

#### 3. 迭代过程：
- 从根节点开始，不断将左子树的节点压入栈中。
- 当没有左子树时，访问栈顶节点（即当前节点），并将其右子树作为新的当前节点，重复此过程直到遍历完所有节点。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 递归法：中序遍历
void inorderTraversalRecursive(struct TreeNode* root, int* result, int* returnSize) {
    if (root == NULL) {
        return;
    }

    // 先遍历左子树
    inorderTraversalRecursive(root->left, result, returnSize);

    // 访问当前节点
    result[*returnSize] = root->val;
    (*returnSize)++;

    // 最后遍历右子树
    inorderTraversalRecursive(root->right, result, returnSize);
}

// 主函数：返回中序遍历的结果
int* inorderTraversal(struct TreeNode* root, int* returnSize) {
    int* result = (int*)malloc(100 * sizeof(int)); // 预分配空间，最多存储100个元素
    *returnSize = 0;
    inorderTraversalRecursive(root, result, returnSize);
    return result;
}

// 主函数测试
int main() {
    struct TreeNode node1 = {1, NULL, NULL};
    struct TreeNode node2 = {2, NULL, NULL};
    struct TreeNode node3 = {3, NULL, NULL};
    
    node1.right = &node2;
    node2.left = &node3;

    int returnSize;
    int* result = inorderTraversal(&node1, &returnSize);

    // 输出遍历结果
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result); // 释放内存
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 递归法：中序遍历
    void inorderTraversalRecursive(TreeNode* root, vector<int>& result) {
        if (root == NULL) return;
        
        inorderTraversalRecursive(root->left, result);
        result.push_back(root->val);
        inorderTraversalRecursive(root->right, result);
    }

    // 迭代法：中序遍历
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode*> stack;
        TreeNode* current = root;

        while (current != NULL || !stack.empty()) {
            // 先遍历左子树
            while (current != NULL) {
                stack.push(current);
                current = current->left;
            }

            // 访问栈顶元素
            current = stack.top();
            stack.pop();
            result.push_back(current->val);

            // 遍历右子树
            current = current->right;
        }

        return result;
    }
};

// 主函数测试
int main() {
    Solution sol;

    // 创建测试树：[1,null,2,3]
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);

    vector<int> result = sol.inorderTraversal(root);

    // 输出遍历结果
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

### 解题思路说明：

1. **递归法**：
   - 递归法的基本思想是：先递归遍历左子树，访问根节点，再递归遍历右子树。
   - 使用递归能够非常简洁地实现中序遍历，但它的空间复杂度是递归栈的深度，最坏情况下为O(n)，即树的深度。

2. **迭代法**：
   - 使用栈模拟递归过程。每次从栈中取出节点，访问后再将它的右子树节点压入栈中。
   - 该方法没有递归的栈深度问题，更适合处理较大的树。
   - 迭代法的时间复杂度为O(n)，空间复杂度为O(n)，其中n为节点数。

### 示例输出：

#### C语言输出：

```
1 3 2
```

#### C++ 输出：

```
1 3 2
```