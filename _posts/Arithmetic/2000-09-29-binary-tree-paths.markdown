---
layout: post
title:  "257. 二叉树的所有路径"
categories: arithmetic
---

[257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths)

### 题目描述

给定一个二叉树，返回所有从根节点到叶子节点的路径。

**注意：**
- 叶子节点是指没有子节点的节点。

**示例 1:**

```
输入:
   1
 /   \
2     3
 \
  5

输出: ["1->2->5", "1->3"]
解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
```

**提示：**
- 树中节点的数目在范围 [1, 100] 内。
- -100 <= Node.val <= 100。

---

### 解题思路

这是一个典型的二叉树遍历问题，可以使用深度优先搜索（DFS）来解决。我们需要从根节点开始遍历，记录当前路径，当遍历到叶子节点时，将当前路径加入结果列表中。

1. **递归终止条件：**
   - 如果当前节点是叶子节点（即没有左子节点和右子节点），将当前路径加入结果列表。

2. **递归过程：**
   - 如果当前节点有左子节点，递归遍历左子树，并将当前节点的值加入路径。
   - 如果当前节点有右子节点，递归遍历右子树，并将当前节点的值加入路径。

3. **路径记录：**
   - 使用一个字符串或数组来记录当前路径。
   - 在递归过程中，动态更新路径。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 辅助函数：将路径加入结果列表
void addPath(struct TreeNode* node, char* path, char*** result, int* returnSize) {
    if (node->left == NULL && node->right == NULL) {
        // 如果是叶子节点，将路径加入结果列表
        (*result)[(*returnSize)] = (char*)malloc(strlen(path) + 1);
        strcpy((*result)[(*returnSize)], path);
        (*returnSize)++;
        return;
    }

    // 递归遍历左子树
    if (node->left != NULL) {
        char newPath[1000];
        sprintf(newPath, "%s->%d", path, node->left->val);
        addPath(node->left, newPath, result, returnSize);
    }

    // 递归遍历右子树
    if (node->right != NULL) {
        char newPath[1000];
        sprintf(newPath, "%s->%d", path, node->right->val);
        addPath(node->right, newPath, result, returnSize);
    }
}

// 主函数：返回所有根节点到叶子节点的路径
char** binaryTreePaths(struct TreeNode* root, int* returnSize) {
    char** result = (char**)malloc(1000 * sizeof(char*)); // 假设结果最多 1000 条路径
    *returnSize = 0;

    if (root == NULL) {
        return result;
    }

    // 初始化路径
    char path[1000];
    sprintf(path, "%d", root->val);

    // 调用辅助函数
    addPath(root, path, &result, returnSize);

    return result;
}

// 测试代码
int main() {
    // 构建示例 1 的二叉树
    struct TreeNode n5 = {5, NULL, NULL};
    struct TreeNode n2 = {2, NULL, &n5};
    struct TreeNode n3 = {3, NULL, NULL};
    struct TreeNode n1 = {1, &n2, &n3};

    int returnSize;
    char** result = binaryTreePaths(&n1, &returnSize);

    printf("所有根节点到叶子节点的路径:\n");
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
        free(result[i]); // 释放内存
    }
    free(result); // 释放内存

    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
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
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> result;
        if (root == nullptr) {
            return result;
        }

        string path = to_string(root->val);
        dfs(root, path, result);
        return result;
    }

private:
    void dfs(TreeNode* node, string path, vector<string>& result) {
        // 如果是叶子节点，将路径加入结果列表
        if (node->left == nullptr && node->right == nullptr) {
            result.push_back(path);
            return;
        }

        // 递归遍历左子树
        if (node->left != nullptr) {
            dfs(node->left, path + "->" + to_string(node->left->val), result);
        }

        // 递归遍历右子树
        if (node->right != nullptr) {
            dfs(node->right, path + "->" + to_string(node->right->val), result);
        }
    }
};

// 测试代码
int main() {
    // 构建示例 1 的二叉树
    TreeNode n5(5);
    TreeNode n2(2);
    TreeNode n3(3);
    TreeNode n1(1);

    n1.left = &n2;
    n1.right = &n3;
    n2.right = &n5;

    Solution solution;
    vector<string> result = solution.binaryTreePaths(&n1);

    cout << "所有根节点到叶子节点的路径:" << endl;
    for (const string& path : result) {
        cout << path << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用递归方法遍历二叉树。
   - 使用字符串记录路径，并在叶子节点时将路径加入结果列表。
   - 注意内存管理，避免内存泄漏。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 和 `string` 简化代码。
   - 利用递归和深度优先搜索（DFS）解决问题。
   - 代码简洁易读，符合 C++ 编程风格。

3. **测试代码：**
   - 构建示例二叉树，调用函数并输出所有路径。

---

通过以上实现，可以高效地找到二叉树中所有从根节点到叶子节点的路径。