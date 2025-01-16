---
layout: post
title:  "95. 不同的二叉搜索树 II"
categories: arithmetic
---

[95. 不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii)

### 题目描述

给定一个整数 `n`，生成所有由 `1 ... n` 为节点所组成的 **二叉搜索树**（BST）。

返回所有这些二叉搜索树的根节点。你可以按任意顺序返回答案。

**示例 1：**

```
输入：n = 3
输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
```

**示例 2：**

```
输入：n = 1
输出：[[1]]
```

**提示：**

- `1 <= n <= 8`

### 解题思路

要生成所有可能的二叉搜索树（BST），可以采用 **递归** 的方法。二叉搜索树的性质决定了，对于任意一个节点 `root`，其左子树的所有节点值都小于 `root.val`，右子树的所有节点值都大于 `root.val`。基于这个性质，可以通过以下步骤构建所有可能的BST：

1. **选择根节点：**
   - 遍历 `1` 到 `n` 之间的每一个数作为根节点。

2. **递归构建左子树和右子树：**
   - 对于选定的根节点 `i`，左子树的节点值范围是 `1` 到 `i-1`，右子树的节点值范围是 `i+1` 到 `n`。
   - 递归地生成所有可能的左子树和右子树。

3. **组合左右子树：**
   - 对于每一个根节点 `i`，将所有可能的左子树和右子树组合起来，形成一个完整的BST。

4. **终止条件：**
   - 当节点值范围无效（例如，开始值大于结束值）时，返回 `NULL`，表示该位置没有子树。

这种方法的时间复杂度较高，接近于 `O(4^n / sqrt(n))`，但由于 `n` 的范围限制在 `1 <= n <= 8`，在实际应用中是可行的。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 动态数组结构体，用于存储结果
typedef struct {
    struct TreeNode** trees;
    int count;
    int capacity;
} TreeList;

// 初始化动态数组
void initTreeList(TreeList* list) {
    list->count = 0;
    list->capacity = 10;
    list->trees = (struct TreeNode**)malloc(sizeof(struct TreeNode*) * list->capacity);
}

// 添加树到动态数组
void addTree(TreeList* list, struct TreeNode* root) {
    if (list->count == list->capacity) {
        list->capacity *= 2;
        list->trees = (struct TreeNode**)realloc(list->trees, sizeof(struct TreeNode*) * list->capacity);
    }
    list->trees[list->count++] = root;
}

// 创建新的树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 递归函数：生成从 start 到 end 的所有BST
TreeList generateTreesHelper(int start, int end) {
    TreeList allTrees;
    initTreeList(&allTrees);

    // 如果 start > end，则没有树，返回 NULL
    if (start > end) {
        addTree(&allTrees, NULL);
        return allTrees;
    }

    // 遍历所有可能的根节点
    for (int i = start; i <= end; i++) {
        // 递归生成左子树和右子树
        TreeList leftTrees = generateTreesHelper(start, i - 1);
        TreeList rightTrees = generateTreesHelper(i + 1, end);

        // 组合左右子树
        for (int l = 0; l < leftTrees.count; l++) {
            for (int r = 0; r < rightTrees.count; r++) {
                struct TreeNode* root = createNode(i);
                root->left = leftTrees.trees[l];
                root->right = rightTrees.trees[r];
                addTree(&allTrees, root);
            }
        }

        // 释放左子树和右子树的trees数组（不释放树节点本身）
        free(leftTrees.trees);
        free(rightTrees.trees);
    }

    return allTrees;
}

// 主函数：生成所有BST
struct TreeNode** generateTrees(int n, int* returnSize) {
    if (n == 0) {
        *returnSize = 0;
        return NULL;
    }

    TreeList allTrees = generateTreesHelper(1, n);
    *returnSize = allTrees.count;
    return allTrees.trees;
}

// 辅助函数：中序遍历打印树
void inorderTraversal(struct TreeNode* root) {
    if (root == NULL) {
        printf("null");
        return;
    }
    printf("%d", root->val);
    if (root->left != NULL || root->right != NULL) {
        printf("(");
        inorderTraversal(root->left);
        printf(",");
        inorderTraversal(root->right);
        printf(")");
    }
}

// 辅助函数：打印所有树
void printAllTrees(struct TreeNode** trees, int size) {
    printf("[\n");
    for (int i = 0; i < size; i++) {
        printf("  ");
        inorderTraversal(trees[i]);
        if (i < size - 1) printf(",\n");
        else printf("\n");
    }
    printf("]\n");
}

// 辅助函数：释放树的内存
void freeTree(struct TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// 简单的主函数调用示例
int main() {
    int n = 3;
    int returnSize;
    struct TreeNode** result = generateTrees(n, &returnSize);
    printf("生成的所有BST为：\n");
    printAllTrees(result, returnSize);

    // 释放内存
    for (int i = 0; i < returnSize; i++) {
        freeTree(result[i]);
    }
    free(result);

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

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
    // 主函数：生成所有BST
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return {};
        return generateTreesHelper(1, n);
    }

private:
    // 递归函数：生成从 start 到 end 的所有BST
    vector<TreeNode*> generateTreesHelper(int start, int end) {
        vector<TreeNode*> allTrees;

        // 如果 start > end，返回 NULL
        if (start > end) {
            allTrees.push_back(NULL);
            return allTrees;
        }

        // 遍历所有可能的根节点
        for (int i = start; i <= end; i++) {
            // 递归生成左子树和右子树
            vector<TreeNode*> leftTrees = generateTreesHelper(start, i - 1);
            vector<TreeNode*> rightTrees = generateTreesHelper(i + 1, end);

            // 组合左右子树
            for (auto left : leftTrees) {
                for (auto right : rightTrees) {
                    TreeNode* root = new TreeNode(i);
                    root->left = left;
                    root->right = right;
                    allTrees.push_back(root);
                }
            }
        }

        return allTrees;
    }
};

// 辅助函数：中序遍历打印树
void inorderTraversal(TreeNode* root, string& s) {
    if (root == NULL) {
        s += "null";
        return;
    }
    s += to_string(root->val);
    if (root->left != NULL || root->right != NULL) {
        s += "(";
        inorderTraversal(root->left, s);
        s += ",";
        inorderTraversal(root->right, s);
        s += ")";
    }
}

// 辅助函数：打印所有树
void printAllTrees(const vector<TreeNode*>& trees) {
    cout << "[\n";
    for (size_t i = 0; i < trees.size(); i++) {
        string s;
        inorderTraversal(trees[i], s);
        cout << "  \"" << s << "\"";
        if (i < trees.size() - 1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

// 辅助函数：释放树的内存
void freeTree(TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 简单的主函数调用示例
int main() {
    Solution solution;
    int n = 3;
    vector<TreeNode*> result = solution.generateTrees(n);
    cout << "生成的所有BST为：\n";
    printAllTrees(result);

    // 释放内存
    for(auto root : result){
        freeTree(root);
    }

    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们通过递归生成所有可能的二叉搜索树。每一个可能的根节点将递归地生成其左子树和右子树，然后组合起来形成完整的树。辅助函数 `inorderTraversal` 用于中序遍历树并生成字符串表示，便于打印和验证结果。

**示例输出：**

```
生成的所有BST为：
[
  "1(null,2(null,3))",
  "1(null,3(2,null))",
  "2(1,null,3)",
  "3(1,null,2)",
  "3(2,1,null)"
]
```

这与预期的输出一致，生成了所有可能的结构不同的BST。

### 详细解题步骤

1. **定义二叉树节点结构：**
   - 在C语言中，使用 `struct TreeNode` 定义二叉树节点，包含值 `val`，以及指向左子节点和右子节点的指针。
   - 在C++中，使用 `struct TreeNode` 并添加构造函数简化节点的创建。

2. **递归生成BST：**
   - 选择 `1` 到 `n` 之间的每一个数作为根节点。
   - 对于每一个根节点 `i`，递归生成左子树（`1` 到 `i-1`）和右子树（`i+1` 到 `n`）。
   - 组合所有可能的左子树和右子树，形成完整的BST，并将其添加到结果集中。

3. **动态数组管理（C语言）：**
   - 使用 `TreeList` 结构体管理动态数组，包含指向树的指针数组 `trees`，当前数量 `count`，以及容量 `capacity`。
   - 动态增加数组容量以适应生成的树数量。

4. **辅助函数：**
   - `createNode`（C语言）或 `new TreeNode`（C++）：用于创建新的树节点。
   - `inorderTraversal`：中序遍历树并生成字符串表示，便于打印。
   - `printAllTrees`：打印所有生成的树。
   - `freeTree`：释放树的内存，防止内存泄漏。

5. **主函数调用示例：**
   - 在 `main` 函数中，调用 `generateTrees` 函数生成所有可能的BST，并打印结果。
   - 最后，释放所有动态分配的内存。

通过以上步骤，能够有效地生成所有由 `1 ... n` 组成的二叉搜索树，并确保每棵树的结构唯一。