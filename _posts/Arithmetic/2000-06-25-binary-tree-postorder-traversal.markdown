---
layout: post
title:  "145. 二叉树的后序遍历"
categories: arithmetic
---

[145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal)

### 题目描述

**Binary Tree Postorder Traversal**

给你一棵二叉树的根节点 `root` ，返回它节点值的 **后序遍历**。

**示例 1：**

```
输入：root = [1,null,2,3]
输出：[3,2,1]
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

- 树中节点的数目在范围 `[0, 100]` 内
- `-100 <= Node.val <= 100`

**进阶**:  
递归算法很简单，你可以通过迭代算法完成吗？

---

### 解题思路

后序遍历（Postorder Traversal）的顺序是：**左子树 -> 右子树 -> 根节点**。根据这一特点，我们可以采用以下两种方法：

1. **递归实现**：
   - 使用递归函数，从根节点开始访问，先递归访问左子树和右子树，再访问当前节点的值。
   - 时间复杂度为 **O(n)**，空间复杂度取决于递归深度，最坏情况下为 **O(n)**。

2. **迭代实现**（使用栈）：
   - 使用一个栈模拟递归调用，遍历顺序是根 -> 右子树 -> 左子树的反序，最后再将结果反转。
   - 时间复杂度为 **O(n)**，空间复杂度为 **O(n)**。

---

### C语言解答

以下是后序遍历的C语言实现，包含递归和迭代两种方法：

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

// 递归实现后序遍历
void postorderTraversalRecursive(struct TreeNode *root, DynamicArray *result) {
    if (root == NULL) {
        return;
    }
    postorderTraversalRecursive(root->left, result);  // 递归访问左子树
    postorderTraversalRecursive(root->right, result); // 递归访问右子树
    appendArray(result, root->val);                   // 访问根节点
}

// 迭代实现后序遍历
int* postorderTraversal(struct TreeNode* root, int* returnSize) {
    DynamicArray result;
    initArray(&result);
    
    if (root == NULL) {
        *returnSize = 0;
        return result.data;
    }
    
    // 使用两个栈实现后序遍历
    struct TreeNode **stack1 = (struct TreeNode **)malloc(100 * sizeof(struct TreeNode *));
    struct TreeNode **stack2 = (struct TreeNode **)malloc(100 * sizeof(struct TreeNode *));
    int top1 = -1, top2 = -1;
    
    stack1[++top1] = root;
    
    while (top1 >= 0) {
        struct TreeNode *node = stack1[top1--];
        stack2[++top2] = node;
        
        if (node->left) {
            stack1[++top1] = node->left;
        }
        if (node->right) {
            stack1[++top1] = node->right;
        }
    }
    
    // 将第二个栈中的节点值存入结果数组
    while (top2 >= 0) {
        appendArray(&result, stack2[top2--]->val);
    }
    
    free(stack1); // 释放第一个栈
    free(stack2); // 释放第二个栈
    
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
    int *result = postorderTraversal(root, &returnSize);
    
    // 打印结果
    printf("后序遍历结果: ");
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

以下是后序遍历的C++实现，使用STL容器简化代码，提供递归和迭代两种方法：

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
    // 递归实现后序遍历
    void postorderRecursive(TreeNode* root, vector<int>& result) {
        if (root == NULL) {
            return;
        }
        postorderRecursive(root->left, result);  // 递归访问左子树
        postorderRecursive(root->right, result); // 递归访问右子树
        result.push_back(root->val);            // 访问根节点
    }
    
    // 递归方法
    vector<int> postorderTraversalRecursive(TreeNode* root) {
        vector<int> result;
        postorderRecursive(root, result);
        return result;
    }
    
    // 迭代实现后序遍历
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> result;
        if (root == NULL) {
            return result;
        }
        
        stack<TreeNode*> stack1, stack2;
        stack1.push(root);
        
        while (!stack1.empty()) {
            TreeNode* node = stack1.top(); stack1.pop();
            stack2.push(node);
            
            if (node->left) {
                stack1.push(node->left);
            }
            if (node->right) {
                stack1.push(node->right);
            }
        }
        
        while (!stack2.empty()) {
            result.push_back(stack2.top()->val);
            stack2.pop();
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
    vector<int> result = solution.postorderTraversal(root);
    cout << "后序遍历结果(迭代法): ";
    for (int val : result) {
        cout << val << " ";
    }
    cout << endl;
    
    // 递归法测试
    vector<int> resultRecursive = solution.postorderTraversalRecursive(root);
    cout << "后序遍历结果(递归法): ";
    for (int val : resultRecursive) {
        cout << val << " ";
    }
    cout << endl;
    
    return 0;
}
```

---

### 总结

以上代码实现了二叉树的后序遍历，包括递归和迭代两种方法。

**关键点：**

1. **递归方法：**  
   简单直观，但需要注意递归深度可能导致栈溢出。

2. **迭代方法：**  
   使用两个栈模拟递归，效率较高，顺序易于控制。

3. **内存管理：**  
   在C语言中，需要手动释放动态分配的内存，而C++中可以利用智能指针（未在此示例中使用）来简化内存管理。

4. **主函数：**  
   测试了题目中给出的示例，结果与预期一致。

**输出结果：**

```
后序遍历结果(迭代法): 3 2 1 
后序遍历结果(递归法): 3 2 1 
```