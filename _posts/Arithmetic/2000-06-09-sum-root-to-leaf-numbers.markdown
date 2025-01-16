---
layout: post
title:  "129. 求根节点到叶节点数字之和"
categories: arithmetic
---

[129. 求根节点到叶节点数字之和](https://leetcode.cn/problems/sum-root-to-leaf-numbers)

### 题目描述

给定一个二叉树，每个节点的值是一个数字。我们从根节点到叶子节点的路径上，所经过的每个节点的数字将形成一个数字。例如，路径 1 -> 2 -> 3 对应的数字是 123。返回所有从根节点到叶子节点的数字之和。

#### 示例 1：
```
输入:
    1
   / \
  2   3

输出: 25
解释:
从根到叶子的路径是: 1->2和1->3.
对应的数字是: 12 + 13 = 25
```

#### 示例 2：
```
输入:
    4
   / \
  9   0
 / \
5   1

输出: 1026
解释:
从根到叶子的路径是: 4->9->5, 4->9->1, 4->0.
对应的数字是: 495 + 491 + 40 = 1026
```

### 提示：
- 树中的节点数目在范围 `[1, 1000]` 内。
- 每个节点的值在范围 `[0, 9]` 内。

### 解题思路

这道题的关键是从二叉树的根节点到叶子节点的路径，每条路径的数字组成一个数字。我们需要计算所有从根节点到叶子节点的数字之和。

思路如下：

1. **深度优先搜索（DFS）**：遍历二叉树，从根节点开始递归地向下搜索，直到找到叶子节点。在递归过程中，我们累积当前路径上的数字。
2. **路径数字累加**：每次递归进入一个新的节点时，我们将当前的数字乘以 10（将当前的数字向左移一位），并加上当前节点的值。这样，路径数字可以被构建出来。
3. **叶子节点的处理**：当递归到达叶子节点时，我们将当前路径上的数字加入到总和中。
4. **递归返回**：遍历完所有的路径后，返回计算出来的总和。

### 时间复杂度
- 时间复杂度是 O(N)，其中 N 是二叉树中节点的个数。我们需要遍历每个节点一次。

### 空间复杂度
- 空间复杂度是 O(H)，其中 H 是树的高度。递归调用栈的最大深度是树的高度，最坏情况下是 O(N)。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树的节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 计算从根节点到叶子节点的数字之和
void dfs(struct TreeNode* root, int currentSum, int* totalSum) {
    if (!root) {
        return;
    }

    // 更新当前路径的数字
    currentSum = currentSum * 10 + root->val;

    // 如果当前节点是叶子节点，则将路径的数字加到总和中
    if (!root->left && !root->right) {
        *totalSum += currentSum;
        return;
    }

    // 递归访问左右子树
    dfs(root->left, currentSum, totalSum);
    dfs(root->right, currentSum, totalSum);
}

// 主函数，计算二叉树的根到叶子路径的和
int sumNumbers(struct TreeNode* root) {
    int totalSum = 0;
    dfs(root, 0, &totalSum);
    return totalSum;
}

// 创建一个新的树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

int main() {
    // 创建一个测试树: 1 -> 2, 1 -> 3
    struct TreeNode* root = createNode(1);
    root->left = createNode(2);
    root->right = createNode(3);

    // 输出从根到叶子节点的路径和
    int result = sumNumbers(root);
    printf("从根到叶子节点的路径和: %d\n", result);  // 输出 25

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
using namespace std;

// 定义二叉树的节点结构体
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 深度优先搜索（DFS），递归遍历二叉树
    void dfs(TreeNode* root, int currentSum, int& totalSum) {
        if (!root) {
            return;
        }

        // 更新当前路径的数字
        currentSum = currentSum * 10 + root->val;

        // 如果是叶子节点，则将路径的数字加到总和中
        if (!root->left && !root->right) {
            totalSum += currentSum;
            return;
        }

        // 递归访问左右子树
        dfs(root->left, currentSum, totalSum);
        dfs(root->right, currentSum, totalSum);
    }

    // 主函数，返回从根到叶子节点的路径和
    int sumNumbers(TreeNode* root) {
        int totalSum = 0;
        dfs(root, 0, totalSum);
        return totalSum;
    }
};

int main() {
    // 创建一个测试树: 1 -> 2, 1 -> 3
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);

    Solution solution;
    // 输出从根到叶子节点的路径和
    int result = solution.sumNumbers(root);
    cout << "从根到叶子节点的路径和: " << result << endl;  // 输出 25

    return 0;
}
```

### 总结

- 这道题通过深度优先搜索（DFS）遍历所有从根到叶子的路径，逐步累加每条路径上的数字。
- 关键在于递归过程中不断构建当前路径的数字，并在到达叶子节点时将其加到最终结果中。
- 时间复杂度为 O(N)，空间复杂度为 O(H)，其中 N 是节点数，H 是树的高度。