---
layout: post
title:  "144. 二叉树的前序遍历"
categories: arithmetic
---

[144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal)



### 题目描述

**Binary Tree Preorder Traversal**

给你二叉树的根节点 `root` ，返回它节点值的 **前序遍历**。

**示例 1：**

```
输入：root = [1,null,2,3]
输出：[1,2,3]
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

- 树中节点数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

**进阶**:  
递归算法很简单，你可以通过迭代算法完成吗？

---

### 解题思路

前序遍历（Preorder Traversal）的顺序是：**根节点 -> 左子树 -> 右子树**。根据这一特点，我们可以有以下两种实现方法：

1. **递归实现**：
   - 使用递归函数，从根节点开始访问，先访问当前节点的值，再递归访问左子树和右子树。
   - 时间复杂度为 **O(n)**，空间复杂度取决于递归深度，最坏情况下为 **O(n)**。

2. **迭代实现**（使用栈）：
   - 使用一个栈模拟递归调用，先将根节点压入栈。
   - 每次弹出栈顶节点，访问其值，然后按照**右子节点、左子节点**的顺序将子节点压入栈（确保左子节点先被访问）。
   - 时间复杂度为 **O(n)**，空间复杂度为 **O(n)**，因为栈中可能会存储所有节点。

---

### C语言解答

以下是前序遍历的C语言实现，包含递归和迭代两种方法：

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 动态数组结构，用于存储遍历结果
typedef struct {
    int *data;
    int size;
    int capacity;
} DynamicArray;

// 初始化动态数组
void initArray(DynamicArray *arr) {
    arr->size = 0;
    arr->capacity = 10;
    arr->data = (int *)malloc(arr->capacity * sizeof(int));
}

// 向动态数组中添加元素
void appendArray(DynamicArray *arr, int val) {
    if (arr->size == arr->capacity) {
        arr->capacity *= 2;
        arr->data = (int *)realloc(arr->data, arr->capacity * sizeof(int));
    }
    arr->data[arr->size++] = val;
}

// 释放动态数组
void freeArray(DynamicArray *arr) {
    free(arr->data);
}

// 递归实现前序遍历
void preorderTraversalRecursive(struct TreeNode *root, DynamicArray *result) {
    if (root == NULL) {
        return;
    }
    appendArray(result, root->val);          // 访问根节点
    preorderTraversalRecursive(root->left, result);  // 递归访问左子树
    preorderTraversalRecursive(root->right, result); // 递归访问右子树
}

// 迭代实现前序遍历
int* preorderTraversal(struct TreeNode* root, int* returnSize) {
    DynamicArray result;
    initArray(&result);
    
    if (root == NULL) {
        *returnSize = 0;
        return result.data;
    }
    
    // 使用栈模拟递归
    struct TreeNode **stack = (struct TreeNode **)malloc(100 * sizeof(struct TreeNode *));
    int top = -1;
    stack[++top] = root;
    
    while (top >= 0) {
        struct TreeNode *node = stack[top--]; // 弹出栈顶节点
        appendArray(&result, node->val);     // 访问节点
        
        // 注意：先压入右子节点，再压入左子节点
        if (node->right) {
            stack[++top] = node->right;
        }
        if (node->left) {
            stack[++top] = node->left;
        }
    }
    
    free(stack); // 释放栈的内存
    *returnSize = result.size;
    return result.data;
}

// 创建二叉树节点
struct TreeNode* createNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 测试函数
int main() {
    // 构建示例 1 的二叉树：[1, null, 2, 3]
    struct TreeNode *root = createNode(1);
    root->right = createNode(2);
    root->right->left = createNode(3);
    
    int returnSize;
    int *result = preorderTraversal(root, &returnSize);
    
    // 打印结果
    printf("前序遍历结果: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");
    
    free(result); // 释放动态数组的内存
    return 0;
}
```

---

### C++ 解答

以下是前序遍历的C++实现，使用STL容器简化代码，提供递归和迭代两种方法：

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

// Solution 类
class Solution {
public:
    // 递归实现前序遍历
    void preorderRecursive(TreeNode* root, vector<int>& result) {
        if (root == NULL) {
            return;
        }
        result.push_back(root->val);      // 访问根节点
        preorderRecursive(root->left, result);  // 递归访问左子树
        preorderRecursive(root->right, result); // 递归访问右子树
    }
    
    // 递归方法
    vector<int> preorderTraversalRecursive(TreeNode* root) {
        vector<int> result;
        preorderRecursive(root, result);
        return result;
    }
    
    // 迭代实现前序遍历
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        if (root == NULL) {
            return result;
        }
        
        stack<TreeNode*> s;
        s.push(root);
        
        while (!s.empty()) {
            TreeNode* node = s.top(); s.pop();
            result.push_back(node->val); // 访问节点
            
            // 注意：先压入右子节点，再压入左子节点
            if (node->right) {
                s.push(node->right);
            }
            if (node->left) {
                s.push(node->left);
            }
        }
        
        return result;
    }
};

// 测试函数
int main() {
    // 构建示例 1 的二叉树：[1, null, 2, 3]
    TreeNode* root = new TreeNode(1);
    root->right = new TreeNode(2);
    root->right->left = new TreeNode(3);
    
    Solution solution;
    
    // 迭代法测试
    vector<int> result = solution.preorderTraversal(root);
    cout << "前序遍历结果(迭代法): ";
    for (int val : result) {
        cout << val << " ";
    }
    cout << endl;
    
    // 递归法测试
    vector<int> resultRecursive = solution.preorderTraversalRecursive(root);
    cout << "前序遍历结果(递归法): ";
    for (int val : resultRecursive) {
        cout << val << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

### 总结

以上代码实现了二叉树的前序遍历，包括递归和迭代两种方法。  
在C++版本中，`Solution` 类的接口设计与 LeetCode 的题目格式一致，同时尽量使用了 STL 容器和算法。

**关键点：**

1. **递归方法：**  
   简单直观，但需要注意递归深度可能导致栈溢出。

2. **迭代方法：**  
   使用栈模拟递归，空间复杂度更好控制。

3. **内存管理：**  
   在C语言中，需要手动释放动态分配的内存，而C++中可以利用智能指针（未在此示例中使用）来简化内存管理。

4. **主函数：**  
   测试了题目中给出的示例，结果与预期一致。

**输出结果：**

```
前序遍历结果(迭代法): 1 2 3 
前序遍历结果(递归法): 1 2 3 
```

