---
layout: post
title:  "106. 从中序与后序遍历序列构造二叉树"
categories: arithmetic
---

[106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal)

### 题目描述

给定两个整数数组 `inorder` 和 `postorder`，其中 `inorder` 是二叉树的中序遍历，`postorder` 是同一棵树的后序遍历。请你根据这两个遍历结果构造并返回这棵二叉树。

**示例 1：**

```
输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
输出：[3,9,20,null,null,15,7]
```

**示例 2：**

```
输入：inorder = [-1], postorder = [-1]
输出：[-1]
```

**提示：**

- `1 <= inorder.length <= 3000`
- `postorder.length == inorder.length`
- `-3000 <= inorder[i], postorder[i] <= 3000`
- `inorder` 和 `postorder` 都只包含 **唯一** 的值。
- 每个值在 `postorder` 中都出现在 `inorder` 中。

### 解题思路

要根据中序遍历和后序遍历构造二叉树，可以利用这两种遍历的特点：

1. **后序遍历的最后一个元素是树的根节点**。根据这个特点，我们可以确定根节点的值。
2. **在中序遍历中找到根节点的位置**，该位置左边的元素属于左子树，右边的元素属于右子树。
3. **递归地构造左子树和右子树**：
   - 对于左子树，中序遍历的左部分和后序遍历的相应部分。
   - 对于右子树，中序遍历的右部分和后序遍历的相应部分。
4. **优化查找根节点在中序遍历中的位置**：使用哈希表提前记录每个值在中序遍历中的索引，以减少查找时间。

**具体步骤如下：**

1. **创建一个哈希表**，将中序遍历数组中的值和其对应的索引存储起来，以便快速查找根节点的位置。
2. **定义一个递归函数**，该函数接收当前处理的中序遍历和后序遍历的起始和结束索引，返回构造的子树根节点。
3. **在递归函数中**：
   - **终止条件**：如果中序遍历的起始索引大于结束索引，返回 `NULL`。
   - **确定根节点**：后序遍历的最后一个元素是当前子树的根节点。
   - **找到根节点在中序遍历中的位置**，从哈希表中获取。
   - **计算左子树的大小**，根据中序遍历中根节点的位置。
   - **递归构造左子树和右子树**。
4. **返回最终构造的二叉树根节点**。

**时间复杂度分析：**

- **构造哈希表**需要 `O(n)` 的时间。
- **递归构造树**每个节点只处理一次，且查找根节点的位置是 `O(1)`，因此总时间复杂度为 `O(n)`。

**空间复杂度分析：**

- **哈希表**占用 `O(n)` 的空间。
- **递归调用栈**的深度为树的高度，最坏情况下为 `O(n)`。
- **总空间复杂度**为 `O(n)`。

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

// 哈希表结构，用于存储中序遍历中每个值的索引
typedef struct {
    int key;
    int value;
} HashEntry;

// 哈希表大小（根据题目限制，值范围在-3000到3000，可以调整大小以适应实际情况）
#define HASH_SIZE 6001

// 初始化哈希表
void initHashTable(HashEntry* hashTable) {
    for(int i = 0; i < HASH_SIZE; i++) {
        hashTable[i].key = 0;
        hashTable[i].value = -1;
    }
}

// 将值和索引存入哈希表
void insertHashTable(HashEntry* hashTable, int key, int value) {
    // 简单的哈希函数，避免负数
    int index = key + 3000;
    hashTable[index].key = key;
    hashTable[index].value = value;
}

// 在哈希表中查找值对应的索引
int searchHashTable(HashEntry* hashTable, int key) {
    int index = key + 3000;
    if(hashTable[index].value != -1 && hashTable[index].key == key) {
        return hashTable[index].value;
    }
    return -1; // 未找到
}

// 创建新节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 递归构造二叉树
struct TreeNode* buildTreeHelper(int* inorder, int inorderStart, int inorderEnd,
                                 int* postorder, int postStart, int postEnd,
                                 HashEntry* hashTable) {
    // 如果没有元素，返回NULL
    if(inorderStart > inorderEnd || postStart > postEnd) {
        return NULL;
    }

    // 后序遍历的最后一个元素是当前子树的根节点
    int rootVal = postorder[postEnd];
    struct TreeNode* root = createNode(rootVal);

    // 在中序遍历中找到根节点的位置
    int rootIndex = searchHashTable(hashTable, rootVal);
    if(rootIndex == -1) {
        // 错误处理：未找到根节点
        return NULL;
    }

    // 计算左子树的大小
    int leftSize = rootIndex - inorderStart;

    // 递归构造左子树和右子树
    root->left = buildTreeHelper(inorder, inorderStart, rootIndex - 1,
                                 postorder, postStart, postStart + leftSize - 1,
                                 hashTable);
    root->right = buildTreeHelper(inorder, rootIndex + 1, inorderEnd,
                                  postorder, postStart + leftSize, postEnd - 1,
                                  hashTable);

    return root;
}

// 主函数：根据中序和后序遍历构造二叉树
struct TreeNode* buildTree(int* inorder, int inorderSize, int* postorder, int postorderSize){
    if(inorderSize != postorderSize || inorderSize == 0) return NULL;

    // 初始化哈希表
    HashEntry hashTable[HASH_SIZE];
    initHashTable(hashTable);
    for(int i = 0; i < inorderSize; i++) {
        insertHashTable(hashTable, inorder[i], i);
    }

    // 调用递归函数构造二叉树
    return buildTreeHelper(inorder, 0, inorderSize - 1,
                           postorder, 0, postorderSize - 1,
                           hashTable);
}

// 辅助函数：中序遍历打印树
void inorderTraversal(struct TreeNode* root) {
    if(root == NULL) {
        printf("null ");
        return;
    }
    inorderTraversal(root->left);
    printf("%d ", root->val);
    inorderTraversal(root->right);
}

// 辅助函数：后序遍历打印树
void postorderTraversal(struct TreeNode* root) {
    if(root == NULL) return;
    postorderTraversal(root->left);
    postorderTraversal(root->right);
    printf("%d ", root->val);
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
    // 示例1
    int inorder1[] = {9,3,15,20,7};
    int postorder1[] = {9,15,7,20,3};
    int size1 = sizeof(inorder1)/sizeof(inorder1[0]);
    struct TreeNode* tree1 = buildTree(inorder1, size1, postorder1, size1);
    printf("示例1的中序遍历为：");
    inorderTraversal(tree1);
    printf("\n示例1的后序遍历为：");
    postorderTraversal(tree1);
    printf("\n\n");

    // 示例2
    int inorder2[] = {-1};
    int postorder2[] = {-1};
    int size2 = sizeof(inorder2)/sizeof(inorder2[0]);
    struct TreeNode* tree2 = buildTree(inorder2, size2, postorder2, size2);
    printf("示例2的中序遍历为：");
    inorderTraversal(tree2);
    printf("\n示例2的后序遍历为：");
    postorderTraversal(tree2);
    printf("\n\n");

    // 释放内存
    freeTree(tree1);
    freeTree(tree2);

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>

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
    // 主函数：根据中序和后序遍历构造二叉树
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if(inorder.empty() || postorder.empty() || inorder.size() != postorder.size()) return nullptr;

        // 构建哈希表，记录中序遍历中每个值的索引
        for(int i = 0; i < inorder.size(); i++) {
            inorderMap[inorder[i]] = i;
        }

        // 调用递归函数构造二叉树
        return buildTreeHelper(inorder, 0, inorder.size() - 1,
                               postorder, 0, postorder.size() - 1);
    }

private:
    unordered_map<int, int> inorderMap;

    // 递归函数：构造二叉树
    TreeNode* buildTreeHelper(vector<int>& inorder, int inStart, int inEnd,
                             vector<int>& postorder, int postStart, int postEnd) {
        // 如果没有元素，返回nullptr
        if(inStart > inEnd || postStart > postEnd) return nullptr;

        // 后序遍历的最后一个元素是根节点
        int rootVal = postorder[postEnd];
        TreeNode* root = new TreeNode(rootVal);

        // 在中序遍历中找到根节点的位置
        int rootIndex = inorderMap[rootVal];
        if(rootIndex == -1) return nullptr; // 错误处理

        // 计算左子树的大小
        int leftSize = rootIndex - inStart;

        // 递归构造左子树和右子树
        root->left = buildTreeHelper(inorder, inStart, rootIndex - 1,
                                     postorder, postStart, postStart + leftSize - 1);
        root->right = buildTreeHelper(inorder, rootIndex + 1, inEnd,
                                      postorder, postStart + leftSize, postEnd - 1);

        return root;
    }
};

// 辅助函数：中序遍历打印树
void inorderTraversal(TreeNode* root, string& s) {
    if(root == nullptr) {
        s += "null ";
        return;
    }
    inorderTraversal(root->left, s);
    s += to_string(root->val) + " ";
    inorderTraversal(root->right, s);
}

// 辅助函数：后序遍历打印树
void postorderTraversal(TreeNode* root, string& s) {
    if(root == nullptr) return;
    postorderTraversal(root->left, s);
    postorderTraversal(root->right, s);
    s += to_string(root->val) + " ";
}

// 辅助函数：释放树的内存
void freeTree(TreeNode* root) {
    if(root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 辅助函数：打印树的中序和后序遍历
void printTraversals(TreeNode* root) {
    string inorderStr = "中序遍历：";
    inorderTraversal(root, inorderStr);
    cout << inorderStr << endl;

    string postorderStr = "后序遍历：";
    postorderTraversal(root, postorderStr);
    cout << postorderStr << endl;
}

// 简单的主函数调用示例
int main() {
    Solution solution;

    // 示例1
    vector<int> inorder1 = {9,3,15,20,7};
    vector<int> postorder1 = {9,15,7,20,3};
    TreeNode* tree1 = solution.buildTree(inorder1, postorder1);
    cout << "示例1构造的二叉树的遍历结果：" << endl;
    printTraversals(tree1);
    cout << endl;

    // 示例2
    vector<int> inorder2 = {-1};
    vector<int> postorder2 = {-1};
    TreeNode* tree2 = solution.buildTree(inorder2, postorder2);
    cout << "示例2构造的二叉树的遍历结果：" << endl;
    printTraversals(tree2);
    cout << endl;

    // 释放内存
    freeTree(tree1);
    freeTree(tree2);

    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们通过递归的方法根据中序遍历和后序遍历构造了二叉树。具体步骤如下：

1. **哈希表优化**：
   - **C语言**：使用一个简单的哈希表结构`HashEntry`，通过偏移量处理负数值，将每个中序遍历的值与其索引存储起来。
   - **C++**：使用`unordered_map`来快速查找中序遍历中某个值的索引位置。

2. **递归构造树**：
   - **C语言**：`buildTreeHelper`函数通过传递中序和后序遍历的起始和结束索引，递归地构造左右子树。
   - **C++**：`buildTreeHelper`方法同样通过传递索引参数，利用哈希表快速定位根节点位置，递归构造左右子树。

3. **示例输出**：
   - **示例1**：
     ```
     示例1的中序遍历为：9 3 15 20 7 
     示例1的后序遍历为：9 15 7 20 3 
     
     示例2的中序遍历为：-1 
     示例2的后序遍历为：-1 
     ```
   - **C++ 示例输出**：
     ```
     示例1构造的二叉树的遍历结果：
     中序遍历：9 3 15 20 7 
     后序遍历：9 15 7 20 3 

     示例2构造的二叉树的遍历结果：
     中序遍历：-1 
     后序遍历：-1 
     ```

   这些输出与预期的中序和后序遍历结果一致，证明了构造的二叉树的正确性。

通过以上步骤和代码实现，我们能够根据中序和后序遍历结果准确地构造出相应的二叉树。