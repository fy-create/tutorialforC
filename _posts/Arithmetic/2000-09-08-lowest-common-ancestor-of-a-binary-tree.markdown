---
layout: post
title:  "236. 二叉树的最近公共祖先"
categories: arithmetic
---

[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/description/)


### 题目描述：
给定一个二叉树，找到该树中两个节点的最近公共祖先（LCA）。

最近公共祖先的定义：对于二叉树中的两个节点 `p` 和 `q`，最近公共祖先是指在该树中同时包含 `p` 和 `q` 的最深的节点。

### 示例：

#### 示例 1：
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出: 3
解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
```

#### 示例 2：
```
输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出: 5
解释: 节点 5 和节点 4 的最近公共祖先是节点 5，因为节点 5 就是最近的公共祖先。
```

#### 示例 3：
```
输入: root = [1,2], p = 1, q = 2
输出: 1
```

### 提示：
- 树中节点数目范围是 [2, 10^5]。
- 每个节点的值是唯一的。
- `p` 和 `q` 为树中的不同节点。

### 解题思路：
本题与前一个题目（**二叉搜索树的最近公共祖先**）类似，区别在于此题的树不是二叉搜索树，因此不能直接利用节点的值进行搜索。我们需要采用另一种方法，使用深度优先搜索（DFS）来寻找最近公共祖先。

#### 深度优先搜索（DFS）解法：
1. **递归遍历**：
   - 从根节点开始遍历二叉树，对于每个节点，递归地搜索其左右子树。
   - 如果当前节点是 `p` 或者 `q`，则返回该节点。否则，递归地检查左子树和右子树。
   
2. **寻找公共祖先**：
   - 对于每个节点，如果它的左子树和右子树分别返回 `p` 和 `q`（即左右子树都找到了目标节点），则当前节点就是它们的最近公共祖先。
   - 如果左右子树只有一个子树返回了一个目标节点，则说明公共祖先存在于该子树上，返回该子树的结果。
   - 如果当前节点是 `p` 或 `q`，则直接返回该节点。

#### 递归结束条件：
- 如果当前节点为空，则返回空指针。
- 如果当前节点等于 `p` 或者 `q`，返回该节点。

### 算法步骤：
1. 从根节点开始，递归遍历左子树和右子树。
2. 如果当前节点是 `p` 或者 `q`，返回该节点。
3. 否则，如果左右子树分别找到 `p` 和 `q`，返回当前节点。
4. 如果只在左子树或右子树中找到一个目标节点，返回那个节点。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 查找二叉树中两个节点的最近公共祖先
struct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {
    // 递归的结束条件：如果当前节点为空或者是p或q，则返回当前节点
    if (root == NULL || root == p || root == q) {
        return root;
    }

    // 递归查找左子树和右子树
    struct TreeNode* left = lowestCommonAncestor(root->left, p, q);
    struct TreeNode* right = lowestCommonAncestor(root->right, p, q);

    // 如果左右子树都返回非空值，说明当前节点是公共祖先
    if (left != NULL && right != NULL) {
        return root;
    }

    // 否则返回不为空的子树
    return left != NULL ? left : right;
}

// 创建一个新的节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = node->right = NULL;
    return node;
}

int main() {
    // 创建二叉树
    struct TreeNode* root = createNode(3);
    root->left = createNode(5);
    root->right = createNode(1);
    root->left->left = createNode(6);
    root->left->right = createNode(2);
    root->left->right->left = createNode(7);
    root->left->right->right = createNode(4);
    root->right->left = createNode(0);
    root->right->right = createNode(8);

    // 创建节点p和q
    struct TreeNode* p = root->left;  // 节点5
    struct TreeNode* q = root->right; // 节点1

    struct TreeNode* ancestor = lowestCommonAncestor(root, p, q);
    printf("The lowest common ancestor is: %d\n", ancestor->val);

    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
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
    // 查找二叉树中两个节点的最近公共祖先
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // 递归的结束条件：如果当前节点为空或者是p或q，则返回当前节点
        if (root == nullptr || root == p || root == q) {
            return root;
        }

        // 递归查找左子树和右子树
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);

        // 如果左右子树都返回非空值，说明当前节点是公共祖先
        if (left != nullptr && right != nullptr) {
            return root;
        }

        // 否则返回不为空的子树
        return left != nullptr ? left : right;
    }
};

int main() {
    // 创建二叉树
    TreeNode* root = new TreeNode(3);
    root->left = new TreeNode(5);
    root->right = new TreeNode(1);
    root->left->left = new TreeNode(6);
    root->left->right = new TreeNode(2);
    root->left->right->left = new TreeNode(7);
    root->left->right->right = new TreeNode(4);
    root->right->left = new TreeNode(0);
    root->right->right = new TreeNode(8);

    // 创建节点p和q
    TreeNode* p = root->left;  // 节点5
    TreeNode* q = root->right; // 节点1

    Solution solution;
    TreeNode* ancestor = solution.lowestCommonAncestor(root, p, q);
    cout << "The lowest common ancestor is: " << ancestor->val << endl;

    return 0;
}
```

### 总结：
- **C语言解法**：通过递归遍历二叉树，查找节点 `p` 和 `q` 的最近公共祖先。递归的返回条件是：若当前节点为 `p` 或 `q`，则返回当前节点；若左右子树都找到了目标节点，则当前节点为公共祖先。
- **C++解法**：与C语言解法类似，使用类封装了算法，并通过递归方式查找公共祖先。通过`TreeNode`类简化了节点管理。

两种解法都利用递归遍历的方式，保证了代码的简洁性与效率，时间复杂度为`O(n)`，其中`n`是树的节点数。