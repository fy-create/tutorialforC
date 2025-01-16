---
layout: post
title:  "237. 删除链表中的节点"
categories: arithmetic
---

[237. 删除链表中的节点](https://leetcode.cn/problems/delete-node-in-a-linked-list)

### 题目描述

请编写一个函数，用于删除单链表中的某个节点（非末尾节点），该函数仅接受要被删除的节点作为参数。

---

**提示：**
- 链表至少包含两个节点。
- 链表中的所有节点的值都是唯一的。
- 给定的节点为非末尾节点，且一定是链表中的一个有效节点。
- 不得传递头节点。

---

**示例 1：**

```
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，链表应变为 4 -> 1 -> 9。
```

**示例 2：**

```
输入：head = [4,5,1,9], node = 1
输出：[4,5,9]
解释：给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，链表应变为 4 -> 5 -> 9。
```

---

### 解题思路

1. **删除节点的特点**：
   - 题目明确给出要删除的节点，且无法访问头节点。
   - 由于无法访问前驱节点，我们需要通过替换值和删除后继节点的方式间接完成删除。

2. **删除方法**：
   - 将当前节点的值替换为后继节点的值。
   - 删除后继节点，即调整当前节点的 `next` 指针。

3. **时间复杂度**：
   - 该方法只需常量时间操作，时间复杂度为 O(1)。

4. **空间复杂度**：
   - 只需常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点
struct ListNode {
    int val;
    struct ListNode* next;
};

// 删除节点的函数
void deleteNode(struct ListNode* node) {
    if (node == NULL || node->next == NULL) {
        return; // 节点为空或是尾节点
    }

    // 用后继节点的值覆盖当前节点的值
    struct ListNode* nextNode = node->next;
    node->val = nextNode->val;

    // 删除后继节点
    node->next = nextNode->next;
    free(nextNode);
}

// 辅助函数：创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 辅助函数：打印链表
void printList(struct ListNode* head) {
    struct ListNode* current = head;
    while (current != NULL) {
        printf("%d -> ", current->val);
        current = current->next;
    }
    printf("NULL\n");
}

// 测试函数
int main() {
    struct ListNode* head = createNode(4);
    head->next = createNode(5);
    head->next->next = createNode(1);
    head->next->next->next = createNode(9);

    printf("原链表: ");
    printList(head);

    deleteNode(head->next); // 删除值为 5 的节点

    printf("删除节点后的链表: ");
    printList(head);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>

using namespace std;

// 定义链表节点
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    // 删除节点的函数
    void deleteNode(ListNode* node) {
        if (!node || !node->next) {
            return; // 节点为空或是尾节点
        }

        // 用后继节点的值覆盖当前节点的值
        ListNode* nextNode = node->next;
        node->val = nextNode->val;

        // 删除后继节点
        node->next = nextNode->next;
        delete nextNode;
    }
};

// 辅助函数：打印链表
void printList(ListNode* head) {
    ListNode* current = head;
    while (current) {
        cout << current->val << " -> ";
        current = current->next;
    }
    cout << "NULL" << endl;
}

// 测试函数
int main() {
    ListNode* head = new ListNode(4);
    head->next = new ListNode(5);
    head->next->next = new ListNode(1);
    head->next->next->next = new ListNode(9);

    cout << "原链表: ";
    printList(head);

    Solution sol;
    sol.deleteNode(head->next); // 删除值为 5 的节点

    cout << "删除节点后的链表: ";
    printList(head);

    return 0;
}
```

---

### 代码说明

1. **删除节点的步骤**：
   - 覆盖当前节点的值为后继节点的值。
   - 删除后继节点，调整当前节点的指针。

2. **时间复杂度**：
   - 操作在常量时间内完成，时间复杂度为 O(1)。

3. **空间复杂度**：
   - 不使用额外空间，空间复杂度为 O(1)。