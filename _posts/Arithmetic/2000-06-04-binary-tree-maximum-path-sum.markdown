---
layout: post
title:  "124. 二叉树中的最大路径和"
categories: arithmetic
---

[124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum)

### 题目描述

给定一个 **非空** 二叉树，返回其最大路径和。

**路径** 被定义为一条从树中任意节点出发，达到任意节点的序列。路径至少包含一个节点，且不一定经过根节点。

---

**示例 1：**

```
输入：root = [1,2,3]
输出：6
解释：路径 [2,1,3] 的路径和最大，为 6。
```

**示例 2：**

```
输入：root = [-10,9,20,null,null,15,7]
输出：42
解释：路径 [15,20,7] 的路径和最大，为 42。
```

---

**提示：**

- 树中节点数在范围 `[1, 3 * 10⁴]` 内。
- `-1000 <= Node.val <= 1000`

---

### 解题思路

为了找到二叉树的最大路径和，可以通过以下步骤解决问题：

1. **递归定义**：
   - 对于任意一个节点，其贡献值为 `max(0, 节点值 + 左子树的最大路径和, 节点值 + 右子树的最大路径和)`。
   - 如果将当前节点作为路径的一部分，最大路径和可能包括左右子树及当前节点。

2. **更新全局最大值**：
   - 在递归过程中，维护一个全局变量 `maxSum`，记录当前的最大路径和。

3. **递归函数返回值**：
   - 返回以当前节点为起点的单边最大路径和。

4. **时间复杂度**：
   - 每个节点仅被访问一次，时间复杂度为 O(n)。

5. **空间复杂度**：
   - 递归调用栈的最大深度为树的高度，空间复杂度为 O(h)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 定义二叉树节点
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

// 递归计算最大路径和
int maxPathSumHelper(struct TreeNode* root, int* maxSum) {
    if (root == NULL) {
        return 0;
    }

    // 计算左子树和右子树的最大路径和
    int leftMax = maxPathSumHelper(root->left, maxSum);
    int rightMax = maxPathSumHelper(root->right, maxSum);

    // 如果子树路径和为负数，则取 0
    leftMax = leftMax > 0 ? leftMax : 0;
    rightMax = rightMax > 0 ? rightMax : 0;

    // 更新全局最大路径和
    int currentSum = root->val + leftMax + rightMax;
    if (currentSum > *maxSum) {
        *maxSum = currentSum;
    }

    // 返回当前节点的最大单边路径和
    return root->val + (leftMax > rightMax ? leftMax : rightMax);
}

// 主函数：计算二叉树的最大路径和
int maxPathSum(struct TreeNode* root) {
    int maxSum = INT_MIN;
    maxPathSumHelper(root, &maxSum);
    return maxSum;
}

// 测试函数
int main() {
    struct TreeNode* root = createNode(-10);
    root->left = createNode(9);
    root->right = createNode(20);
    root->right->left = createNode(15);
    root->right->right = createNode(7);

    int result = maxPathSum(root);
    printf("二叉树的最大路径和: %d\n", result);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <algorithm>
#include <limits.h>

using namespace std;

// 定义二叉树节点
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxPathSumHelper(root, maxSum);
        return maxSum;
    }

private:
    // 递归计算最大路径和
    int maxPathSumHelper(TreeNode* root, int& maxSum) {
        if (!root) {
            return 0;
        }

        // 计算左子树和右子树的最大路径和
        int leftMax = max(0, maxPathSumHelper(root->left, maxSum));
        int rightMax = max(0, maxPathSumHelper(root->right, maxSum));

        // 更新全局最大路径和
        maxSum = max(maxSum, root->val + leftMax + rightMax);

        // 返回当前节点的最大单边路径和
        return root->val + max(leftMax, rightMax);
    }
};

// 测试函数
int main() {
    TreeNode* root = new TreeNode(-10);
    root->left = new TreeNode(9);
    root->right = new TreeNode(20);
    root->right->left = new TreeNode(15);
    root->right->right = new TreeNode(7);

    Solution sol;
    int result = sol.maxPathSum(root);
    cout << "二叉树的最大路径和: " << result << endl;

    return 0;
}
```

---

### 代码说明

1. **递归函数逻辑**：
   - 分别计算左右子树的最大路径和，忽略为负数的路径（取 0）。
   - 更新全局变量 `maxSum`，包含左右子树及当前节点的路径和。

2. **时间复杂度**：
   - 每个节点访问一次，时间复杂度为 O(n)。

3. **空间复杂度**：
   - 递归调用栈的最大深度为树的高度，空间复杂度为 O(h)。