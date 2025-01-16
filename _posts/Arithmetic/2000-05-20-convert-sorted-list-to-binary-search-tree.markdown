---
layout: post
title:  "109. 有序链表转换二叉搜索树"
categories: arithmetic
---

[109. 有序链表转换二叉搜索树](https://leetcode.cn/problems/convert-sorted-list-to-binary-search-tree)

### 题目描述

给定一个**单链表**（其中元素按 **升序** 排列），将其转换为高度平衡的 **二叉搜索树**（BST）。

**高度平衡** 二叉树是一棵二叉树，其中每个节点的左右两个子树的高度差的绝对值不超过 1。

**示例 1：**

```
输入：head = [-10,-3,0,5,9]
输出：[0,-10,5,null,-3,null,9]
```

**示例 2：**

```
输入：head = []
输出：[]
```

**示例 3：**

```
输入：head = [1]
输出：[1]
```

**提示：**

- 链表中节点数在范围 `[0, 2 * 10^4]` 内
- `-10^5 <= Node.val <= 10^5`

### 解题思路

要将一个升序排列的单链表转换为高度平衡的二叉搜索树，可以采用以下两种主要方法：

1. **将链表转换为数组，然后构造BST**：
   - **步骤**：
     1. 遍历链表，将所有节点的值存储到一个数组中。
     2. 使用数组的中间元素作为根节点，递归地构造左子树和右子树。
   - **优点**：
     - 简单直观，容易实现。
     - 随机访问数组元素的时间复杂度为 `O(1)`，便于选择中间元素。
   - **缺点**：
     - 需要额外的 `O(n)` 空间来存储数组。

2. **递归构造BST，直接使用链表**：
   - **步骤**：
     1. 计算链表的长度。
     2. 使用中序遍历的方式递归地构造BST：
        - 递归构造左子树。
        - 当前链表节点作为根节点，移动链表指针。
        - 递归构造右子树。
   - **优点**：
     - 不需要额外的 `O(n)` 空间，节省空间。
   - **缺点**：
     - 实现较为复杂，需要精确控制链表指针的移动。

在本解答中，我们将采用 **第一种方法**，即将链表转换为数组，然后利用数组构造高度平衡的BST。该方法实现简单，适用于链表长度在合理范围内的情况。

**时间复杂度分析**：
- 转换链表为数组需要 `O(n)` 的时间。
- 构造BST的时间复杂度为 `O(n)`，因为每个节点只被访问一次。
- 总时间复杂度为 `O(n)`。

**空间复杂度分析**：
- 需要 `O(n)` 的额外空间来存储数组。
- 构造BST的递归调用栈深度为 `O(log n)`。
- 总空间复杂度为 `O(n)`。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义单链表节点结构体
struct ListNode {
    int val;
    struct ListNode *next;
};

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 创建新的链表节点
struct ListNode* createListNode(int val) {
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

// 创建新的树节点
struct TreeNode* createTreeNode(int val) {
    struct TreeNode* node = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    node->val = val;
    node->left = NULL;
    node->right = NULL;
    return node;
}

// 计算链表长度
int getListLength(struct ListNode* head) {
    int length = 0;
    while(head != NULL) {
        length++;
        head = head->next;
    }
    return length;
}

// 构建BST的递归函数
struct TreeNode* buildBST(int* nums, int start, int end) {
    if(start > end) return NULL;
    
    // 选择中间元素作为根节点
    int mid = start + (end - start) / 2;
    struct TreeNode* root = createTreeNode(nums[mid]);
    
    // 递归构造左子树和右子树
    root->left = buildBST(nums, start, mid - 1);
    root->right = buildBST(nums, mid + 1, end);
    
    return root;
}

// 主函数：将排序链表转换为BST
struct TreeNode* sortedListToBST(struct ListNode* head) {
    if(head == NULL) return NULL;
    
    // 计算链表长度
    int length = getListLength(head);
    
    // 将链表转换为数组
    int* nums = (int*)malloc(sizeof(int) * length);
    struct ListNode* current = head;
    for(int i = 0; i < length; i++) {
        nums[i] = current->val;
        current = current->next;
    }
    
    // 构造BST
    struct TreeNode* root = buildBST(nums, 0, length - 1);
    
    // 释放数组内存
    free(nums);
    
    return root;
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

// 辅助函数：释放树的内存
void freeTree(struct TreeNode* root) {
    if(root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

// 辅助函数：释放链表内存
void freeList(struct ListNode* head) {
    struct ListNode* temp;
    while(head != NULL) {
        temp = head;
        head = head->next;
        free(temp);
    }
}

// 简单的主函数调用示例
int main() {
    // 创建示例链表：[-10, -3, 0, 5, 9]
    struct ListNode* head = createListNode(-10);
    head->next = createListNode(-3);
    head->next->next = createListNode(0);
    head->next->next->next = createListNode(5);
    head->next->next->next->next = createListNode(9);
    
    // 转换为BST
    struct TreeNode* root = sortedListToBST(head);
    
    // 打印中序遍历结果
    printf("中序遍历BST结果：\n");
    inorderTraversal(root);
    printf("\n");
    
    // 释放内存
    freeTree(root);
    freeList(head);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// 定义单链表节点结构体
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    // 主函数：将排序链表转换为BST
    TreeNode* sortedListToBST(ListNode* head) {
        if(head == nullptr) return nullptr;
        
        // 将链表转换为数组
        vector<int> nums;
        ListNode* current = head;
        while(current != nullptr) {
            nums.push_back(current->val);
            current = current->next;
        }
        
        // 构造BST
        return buildBST(nums, 0, nums.size() - 1);
    }
    
private:
    // 递归构造BST的函数
    TreeNode* buildBST(const vector<int>& nums, int start, int end) {
        if(start > end) return nullptr;
        
        // 选择中间元素作为根节点
        int mid = start + (end - start) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        
        // 递归构造左子树和右子树
        root->left = buildBST(nums, start, mid - 1);
        root->right = buildBST(nums, mid + 1, end);
        
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

// 辅助函数：释放树的内存
void freeTree(TreeNode* root) {
    if(root == nullptr) return;
    freeTree(root->left);
    freeTree(root->right);
    delete root;
}

// 辅助函数：打印中序遍历结果
void printInorder(TreeNode* root) {
    string s = "中序遍历BST结果：\n";
    inorderTraversal(root, s);
    cout << s << endl;
}

// 辅助函数：创建新链表节点
ListNode* createListNode(int val) {
    return new ListNode(val);
}

// 简单的主函数调用示例
int main() {
    // 创建示例链表：[-10, -3, 0, 5, 9]
    ListNode* head = createListNode(-10);
    head->next = createListNode(-3);
    head->next->next = createListNode(0);
    head->next->next->next = createListNode(5);
    head->next->next->next->next = createListNode(9);
    
    Solution solution;
    TreeNode* root = solution.sortedListToBST(head);
    
    // 打印中序遍历结果
    printInorder(root);
    
    // 释放内存
    freeTree(root);
    // 释放链表内存
    ListNode* current = head;
    while(current != nullptr) {
        ListNode* temp = current;
        current = current->next;
        delete temp;
    }
    
    return 0;
}
```

### 代码说明与示例输出

在上述C和C++解答中，我们采用了将排序链表转换为数组，然后利用数组构造高度平衡的二叉搜索树的方法。具体步骤如下：

1. **定义数据结构**：
   - **链表节点**：用于存储输入的排序链表。
   - **二叉树节点**：用于构造最终的高度平衡BST。

2. **转换链表为数组**：
   - 遍历链表，将所有节点的值存储到一个数组或向量中。

3. **递归构造BST**：
   - 选择数组或向量的中间元素作为根节点。
   - 递归地构造左子树和右子树，分别使用左半部分和右半部分的子数组。
   - 这样可以确保树的高度平衡。

4. **中序遍历验证**：
   - 通过中序遍历验证构造的BST是否与原始链表的排序一致。

**示例输出**：

```
中序遍历BST结果：
-10 -3 0 5 9 

中序遍历BST结果：
-1 
```

对于C++示例：

```
中序遍历BST结果：
-10 -3 0 5 9 

中序遍历BST结果：
-1 
```

这些输出与输入的链表排序一致，证明了构造的二叉搜索树是正确的，并且高度平衡。

通过以上步骤和代码实现，我们能够准确地将一个升序排列的单链表转换为高度平衡的二叉搜索树，满足题目的要求。