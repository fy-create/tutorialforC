---
layout: post
title:  "113. 路径总和 II"
categories: arithmetic
---

[113. 路径总和 II](https://leetcode.cn/problems/path-sum-ii)

### 题目描述

给定一个二叉树的根节点 `root` 和一个整数 `targetSum`，找到所有从根节点到叶子节点路径总和等于 `targetSum` 的路径。

**叶子节点** 是指没有子节点的节点。

**示例 1：**

```
输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
输出：[[5,4,11,2],[5,8,4,5]]
```

**示例 2：**

```
输入：root = [1,2,3], targetSum = 5
输出：[]
```

**示例 3：**

```
输入：root = [1,2], targetSum = 0
输出：[]
```

**提示：**

- 树中节点的数量在范围 `[0, 5000]` 内
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

### 解题思路

要找到所有从根节点到叶子节点的路径，使得路径上节点值的总和等于 `targetSum`，可以采用 **深度优先搜索**（Depth-First Search, DFS）的策略。具体步骤如下：

1. **遍历树的每个节点**：
   - 从根节点开始，递归地访问每个节点的左子节点和右子节点。

2. **记录当前路径和**：
   - 在遍历过程中，维护一个当前路径的节点值列表 `path` 和当前路径的总和 `currentSum`。
   - 当访问到一个节点时，将其值加入 `path`，并将其值加到 `currentSum` 上。

3. **判断叶子节点**：
   - 当遍历到一个叶子节点（即没有左子节点和右子节点的节点）时，检查 `currentSum` 是否等于 `targetSum`。
   - 如果相等，将当前路径 `path` 复制一份，并添加到结果集中。

4. **回溯**：
   - 在递归返回之前，需要将当前节点从 `path` 中移除，以便探索其他可能的路径。

5. **优化**：
   - 如果当前节点的值已经使得 `currentSum` 超过 `targetSum`，且节点值为正数，可以提前终止该路径的搜索（此优化在节点值可能为负数的情况下不适用，因此根据具体情况决定是否使用）。

6. **时间复杂度分析**：
   - 每个节点都可能被访问一次，因此时间复杂度为 `O(n)`，其中 `n` 是树中节点的数量。
   - 由于需要存储所有满足条件的路径，最坏情况下的空间复杂度也是 `O(n^2)`。

通过上述方法，可以系统地探索所有可能的路径，并筛选出符合要求的路径。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 定义结果集结构体
typedef struct {
    int** paths;        // 存储所有符合条件的路径
    int* pathSizes;     // 存储每条路径的长度
    int count;          // 当前存储的路径数量
    int capacity;       // 总容量
} ResultList;

// 初始化结果集
void initResultList(ResultList* list) {
    list->count = 0;
    list->capacity = 10;
    list->paths = (int**)malloc(sizeof(int*) * list->capacity);
    list->pathSizes = (int*)malloc(sizeof(int) * list->capacity);
}

// 添加一条路径到结果集中
void addPath(ResultList* list, int* path, int size) {
    if (list->count == list->capacity) {
        list->capacity *= 2;
        list->paths = (int**)realloc(list->paths, sizeof(int*) * list->capacity);
        list->pathSizes = (int*)realloc(list->pathSizes, sizeof(int) * list->capacity);
    }
    list->paths[list->count] = path;
    list->pathSizes[list->count] = size;
    list->count++;
}

// 深度优先搜索递归函数
void dfs(struct TreeNode* root, int targetSum, int currentSum, int* path, int pathLen, ResultList* result) {
    if (root == NULL) return;
    
    // 将当前节点加入路径
    path[pathLen] = root->val;
    currentSum += root->val;
    pathLen++;
    
    // 判断是否为叶子节点
    if (root->left == NULL && root->right == NULL) {
        if (currentSum == targetSum) {
            // 复制当前路径
            int* validPath = (int*)malloc(sizeof(int) * pathLen);
            for(int i = 0; i < pathLen; i++) {
                validPath[i] = path[i];
            }
            addPath(result, validPath, pathLen);
        }
    } else {
        // 递归访问左子树和右子树
        dfs(root->left, targetSum, currentSum, path, pathLen, result);
        dfs(root->right, targetSum, currentSum, path, pathLen, result);
    }
}

// 主函数：查找所有路径和等于 targetSum 的路径
int** pathSum(struct TreeNode* root, int targetSum, int* returnSize, int** returnColumnSizes){
    ResultList result;
    initResultList(&result);
    
    // 预分配路径数组，最大深度为树的高度（最多5000）
    int* path = (int*)malloc(sizeof(int) * 5000);
    
    // 开始DFS遍历
    dfs(root, targetSum, 0, path, 0, &result);
    
    // 释放路径数组内存
    free(path);
    
    // 设置返回值
    *returnSize = result.count;
    *returnColumnSizes = result.pathSizes;
    return result.paths;
}

// 辅助函数：创建新的树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 辅助函数：打印所有路径
void printPaths(int** paths, int* sizes, int size) {
    printf("[\n");
    for(int i = 0; i < size; i++) {
        printf("  [");
        for(int j = 0; j < sizes[i]; j++) {
            printf("%d", paths[i][j]);
            if(j < sizes[i] -1) printf(",");
        }
        printf("]");
        if(i < size -1) printf(",\n");
        else printf("\n");
    }
    printf("]\n");
}

// 辅助函数：释放树的内存
void freeTree(struct TreeNode* root) {
    if(root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// 简单的主函数调用示例
int main() {
    /*
        构建示例树：
            5
           / \
          4   8
         /   / \
        11  13  4
       /  \    / \
      7    2  5   1
    */
    struct TreeNode* root = createNode(5);
    root->left = createNode(4);
    root->right = createNode(8);
    root->left->left = createNode(11);
    root->left->left->left = createNode(7);
    root->left->left->right = createNode(2);
    root->right->left = createNode(13);
    root->right->right = createNode(4);
    root->right->right->left = createNode(5);
    root->right->right->right = createNode(1);
    
    int targetSum = 22;
    int returnSize;
    int* returnColumnSizes;
    
    int** paths = pathSum(root, targetSum, &returnSize, &returnColumnSizes);
    
    printf("所有路径和等于 %d 的路径为：\n", targetSum);
    printPaths(paths, returnColumnSizes, returnSize);
    
    // 释放内存
    for(int i = 0; i < returnSize; i++) {
        free(paths[i]);
    }
    free(paths);
    free(returnColumnSizes);
    freeTree(root);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    // 主函数：查找所有路径和等于 targetSum 的路径
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> result;
        vector<int> path;
        dfs(root, targetSum, 0, path, result);
        return result;
    }

private:
    // 深度优先搜索递归函数
    void dfs(TreeNode* node, int targetSum, int currentSum, vector<int>& path, vector<vector<int>>& result) {
        if (node == nullptr) return;
        
        // 将当前节点加入路径
        path.push_back(node->val);
        currentSum += node->val;
        
        // 判断是否为叶子节点
        if (node->left == nullptr && node->right == nullptr) {
            if (currentSum == targetSum) {
                result.push_back(path);
            }
        } else {
            // 递归访问左子树和右子树
            dfs(node->left, targetSum, currentSum, path, result);
            dfs(node->right, targetSum, currentSum, path, result);
        }
        
        // 回溯，移除当前节点
        path.pop_back();
    }
};

// 辅助函数：创建新的树节点
TreeNode* createNode(int val) {
    return new TreeNode(val);
}

// 辅助函数：打印所有路径
void printPaths(const vector<vector<int>>& paths) {
    cout << "[\n";
    for(size_t i = 0; i < paths.size(); i++) {
        cout << "  [";
        for(size_t j = 0; j < paths[i].size(); j++) {
            cout << paths[i][j];
            if(j < paths[i].size() -1) cout << ",";
        }
        cout << "]";
        if(i < paths.size() -1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

// 辅助函数：释放树的内存
void freeTree(TreeNode* root) {
    if(root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 简单的主函数调用示例
int main() {
    /*
        构建示例树：
            5
           / \
          4   8
         /   / \
        11  13  4
       /  \    / \
      7    2  5   1
    */
    TreeNode* root = createNode(5);
    root->left = createNode(4);
    root->right = createNode(8);
    root->left->left = createNode(11);
    root->left->left->left = createNode(7);
    root->left->left->right = createNode(2);
    root->right->left = createNode(13);
    root->right->right = createNode(4);
    root->right->right->left = createNode(5);
    root->right->right->right = createNode(1);
    
    int targetSum = 22;
    
    Solution solution;
    vector<vector<int>> paths = solution.pathSum(root, targetSum);
    
    cout << "所有路径和等于 " << targetSum << " 的路径为：\n";
    printPaths(paths);
    
    // 释放内存
    freeTree(root);
    
    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们使用了**深度优先搜索**（DFS）的策略来遍历二叉树，并找到所有从根节点到叶子节点的路径，这些路径的节点值总和等于给定的 `targetSum`。具体步骤如下：

1. **定义数据结构**：
   - **链表节点**（C语言）和 **二叉树节点**（C语言和C++）用于构建和存储树的结构。

2. **深度优先搜索**：
   - **C语言**：通过递归函数 `dfs`，在遍历过程中维护当前路径和路径长度，发现符合条件的路径时，将其添加到结果集中。
   - **C++**：通过递归函数 `dfs`，在遍历过程中维护当前路径和路径总和，发现符合条件的路径时，将其添加到结果集中。

3. **路径记录与回溯**：
   - 在遍历过程中，使用一个动态数组或向量 `path` 来记录当前的路径。
   - 当回溯到上一个节点时，移除当前节点，继续探索其他可能的路径。

4. **示例输出**：
   - **C语言示例输出**：
     ```
     所有路径和等于 22 的路径为：
     [
       [5,4,11,2],
       [5,8,4,5]
     ]
     ```
   - **C++示例输出**：
     ```
     所有路径和等于 22 的路径为：
     [
       [5,4,11,2],
       [5,8,4,5]
     ]
     ```
   这些输出与示例一致，表明代码正确地找到了所有符合条件的路径。

通过以上步骤和代码实现，我们能够准确地找到所有从根节点到叶子节点的路径，这些路径的节点值总和等于给定的 `targetSum`，并将其存储在结果集中返回。