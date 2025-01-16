---
layout: post
title:  "173. 二叉搜索树迭代器"
categories: arithmetic
---

[173. 二叉搜索树迭代器](https://leetcode.cn/problems/binary-search-tree-iterator)

### 题目描述

实现一个二叉搜索树迭代器类 `BSTIterator` ，表示一个按中序遍历二叉搜索树（BST）的迭代器：

- `BSTIterator(TreeNode root)` 初始化 BSTIterator 类的一个对象。BST 的根节点 `root` 会作为构造函数的输入。指针应初始化为一个不存在于 BST 中的数字，且位于中序遍历的第一个节点之前。
- `boolean hasNext()` 如果向指针右侧遍历存在数字，则返回 `true`；否则返回 `false`。
- `int next()` 将指针向右移动，然后返回指针处的数字。

**注意**，`next()` 和 `hasNext()` 的调用次数总是正数，不超过给定的二叉搜索树中的节点数。

---

**示例：**

```
输入
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
输出
[null, 3, 7, true, 9, true, 15, true, 20, false]

解释
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // 返回 3
bSTIterator.next();    // 返回 7
bSTIterator.hasNext(); // 返回 true
bSTIterator.next();    // 返回 9
bSTIterator.hasNext(); // 返回 true
bSTIterator.next();    // 返回 15
bSTIterator.hasNext(); // 返回 true
bSTIterator.next();    // 返回 20
bSTIterator.hasNext(); // 返回 false
```

---

**提示：**

- 树中节点的数目在范围 `[1, 10⁵]` 内
- `0 <= Node.val <= 10⁶`
- 最多调用 `10⁵` 次 `hasNext` 和 `next`

---

### 解题思路

1. **中序遍历的特性**：
   - 二叉搜索树的中序遍历结果是递增有序的。

2. **两种实现方式**：
   - **提前遍历法**：
     - 在构造函数中一次性完成中序遍历，将结果存储在一个数组中。
     - `next()` 从数组中依次读取元素。
     - `hasNext()` 判断是否还有未访问的元素。
   - **惰性遍历法**：
     - 使用栈模拟中序遍历，每次调用 `next()` 时根据需要动态获取下一个节点。
     - `hasNext()` 判断栈是否为空。

3. **时间复杂度**：
   - 提前遍历法：构造函数的时间复杂度为 O(n)，`next()` 和 `hasNext()` 的时间复杂度为 O(1)。
   - 惰性遍历法：所有操作的总时间复杂度为 O(n)，单次操作的均摊时间复杂度为 O(1)。

4. **空间复杂度**：
   - 提前遍历法：存储数组的空间复杂度为 O(n)。
   - 惰性遍历法：栈的空间复杂度为 O(h)，其中 `h` 是树的高度。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义树节点
struct TreeNode {
    int val;
    struct TreeNode* left;
    struct TreeNode* right;
};

// 定义栈节点
struct StackNode {
    struct TreeNode* treeNode;
    struct StackNode* next;
};

// 定义迭代器
typedef struct {
    struct StackNode* stack;
} BSTIterator;

// 栈操作：入栈
void push(struct StackNode** stack, struct TreeNode* treeNode) {
    struct StackNode* newNode = (struct StackNode*)malloc(sizeof(struct StackNode));
    newNode->treeNode = treeNode;
    newNode->next = *stack;
    *stack = newNode;
}

// 栈操作：出栈
struct TreeNode* pop(struct StackNode** stack) {
    if (*stack == NULL) {
        return NULL;
    }
    struct StackNode* topNode = *stack;
    *stack = (*stack)->next;
    struct TreeNode* treeNode = topNode->treeNode;
    free(topNode);
    return treeNode;
}

// 栈操作：判断是否为空
bool isEmpty(struct StackNode* stack) {
    return stack == NULL;
}

// 初始化迭代器
BSTIterator* bSTIteratorCreate(struct TreeNode* root) {
    BSTIterator* iterator = (BSTIterator*)malloc(sizeof(BSTIterator));
    iterator->stack = NULL;

    // 初始化栈，模拟中序遍历
    while (root) {
        push(&iterator->stack, root);
        root = root->left;
    }

    return iterator;
}

// 获取下一个节点值
int bSTIteratorNext(BSTIterator* obj) {
    struct TreeNode* node = pop(&obj->stack);

    int nextValue = node->val;

    // 处理右子树
    node = node->right;
    while (node) {
        push(&obj->stack, node);
        node = node->left;
    }

    return nextValue;
}

// 判断是否还有下一个节点
bool bSTIteratorHasNext(BSTIterator* obj) {
    return !isEmpty(obj->stack);
}

// 释放迭代器
void bSTIteratorFree(BSTIterator* obj) {
    while (!isEmpty(obj->stack)) {
        pop(&obj->stack);
    }
    free(obj);
}

// 测试函数
int main() {
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = 7;
    root->left = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->left->val = 3;
    root->left->left = NULL;
    root->left->right = NULL;
    root->right = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->right->val = 15;
    root->right->left = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->right->left->val = 9;
    root->right->left->left = NULL;
    root->right->left->right = NULL;
    root->right->right = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->right->right->val = 20;
    root->right->right->left = NULL;
    root->right->right->right = NULL;

    BSTIterator* iterator = bSTIteratorCreate(root);

    printf("Next: %d\n", bSTIteratorNext(iterator)); // 3
    printf("Next: %d\n", bSTIteratorNext(iterator)); // 7
    printf("Has Next: %s\n", bSTIteratorHasNext(iterator) ? "true" : "false"); // true
    printf("Next: %d\n", bSTIteratorNext(iterator)); // 9

    bSTIteratorFree(iterator);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <stack>

using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class BSTIterator {
private:
    stack<TreeNode*> stk;

    // 辅助函数：将左子树压栈
    void pushLeft(TreeNode* node) {
        while (node) {
            stk.push(node);
            node = node->left;
        }
    }

public:
    // 构造函数：初始化迭代器
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }

    // 获取下一个节点值
    int next() {
        TreeNode* node = stk.top();
        stk.pop();
        int nextValue = node->val;

        // 处理右子树
        if (node->right) {
            pushLeft(node->right);
        }

        return nextValue;
    }

    // 判断是否还有下一个节点
    bool hasNext() {
        return !stk.empty();
    }
};

// 测试函数
int main() {
    TreeNode* root = new TreeNode(7);
    root->left = new TreeNode(3);
    root->right = new TreeNode(15);
    root->right->left = new TreeNode(9);
    root->right->right = new TreeNode(20);

    BSTIterator iterator(root);

    cout << "Next: " << iterator.next() << endl; // 3
    cout << "Next: " << iterator.next() << endl; // 7
    cout << "Has Next: " << (iterator.hasNext() ? "true" : "false") << endl; // true
    cout << "Next: " << iterator.next() << endl; // 9

    return 0;
}
```

---

### 代码说明

1. **惰性遍历法**：
   - 使用栈模拟中序遍历，按需动态获取下一个节点。

2. **时间复杂度**：
   - 初始化栈的复杂度为 O(h)，单次操作的均摊时间复杂度为 O(1)。

3. **空间复杂度**：
   - 栈的最大深度为树的高度，空间复杂度为 O(h)。