---
layout: post
title:  "203. 移除链表元素"
categories: arithmetic
---

[203. 移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements)

输入: head = [], val = 1
输出: []
## 题目要求（从链接中提取）

### 题目描述：

给定一个链表的头节点 `head` 和一个值 `val`，你需要删除链表中所有的值为 `val` 的节点，返回新的链表头节点。

### 示例：

**示例 1：**
```
输入：head = [1, 2, 6, 3, 4, 5, 6], val = 6
输出：[1, 2, 3, 4, 5]
```

**示例 2：**
```
输入：head = [], val = 1
输出：[]
```

**示例 3：**
```
输入：head = [7, 7, 7, 7], val = 7
输出：[]
```

### 提示：
- 链表中节点的数量在 `[0, 10^4]` 范围内。
- `1 <= Node.val <= 50`
- `0 <= val <= 50`

---

## 解题思路

1. **问题分析：**
   - 给定一个链表和一个需要删除的值 `val`，需要在链表中删除所有值为 `val` 的节点，最后返回新的链表头节点。
   - 为了避免修改指针导致链表断开，首先要从头节点开始逐个检查节点，如果节点的值等于 `val`，则删除该节点。如果删除的是头节点，需要更新头指针。
   
2. **解题步骤：**
   - 我们需要遍历链表，检查每个节点的值：
     - 如果当前节点的值是 `val`，则跳过该节点，并连接前一个节点与当前节点的下一个节点。
     - 如果当前节点不是要删除的值，就继续遍历下一个节点。
   - 使用一个虚拟头节点（dummy node）来简化处理头节点的删除操作，避免在删除头节点时特殊处理。
   
3. **边界情况：**
   - 链表为空，返回空链表。
   - 链表中所有节点的值都等于 `val`，返回空链表。
   - 链表中没有节点的值等于 `val`，返回原链表。

---

## C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 删除链表中所有值为 val 的节点
struct ListNode* removeElements(struct ListNode* head, int val) {
    // 创建虚拟头节点，简化头节点删除操作
    struct ListNode* dummy = createNode(0);
    dummy->next = head;
    struct ListNode* current = dummy;

    // 遍历链表，删除所有值为 val 的节点
    while (current->next != NULL) {
        if (current->next->val == val) {
            // 删除当前节点的下一个节点
            struct ListNode* temp = current->next;
            current->next = current->next->next;
            free(temp);  // 释放被删除节点的内存
        } else {
            // 如果当前节点的值不等于 val，继续向下遍历
            current = current->next;
        }
    }

    // 返回新的链表头节点（跳过虚拟头节点）
    struct ListNode* newHead = dummy->next;
    free(dummy);  // 释放虚拟头节点内存
    return newHead;
}

// 打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    // 构造链表 [1, 2, 6, 3, 4, 5, 6]
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(6);
    head->next->next->next = createNode(3);
    head->next->next->next->next = createNode(4);
    head->next->next->next->next->next = createNode(5);
    head->next->next->next->next->next->next = createNode(6);

    // 打印原链表
    printf("Original List: ");
    printList(head);

    // 删除值为6的节点
    head = removeElements(head, 6);

    // 打印修改后的链表
    printf("Modified List: ");
    printList(head);

    return 0;
}
```

---

## C++ 实现

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    // 删除链表中所有值为 val 的节点
    ListNode* removeElements(ListNode* head, int val) {
        // 创建虚拟头节点，简化头节点删除操作
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* current = dummy;

        // 遍历链表，删除所有值为 val 的节点
        while (current->next != nullptr) {
            if (current->next->val == val) {
                // 删除当前节点的下一个节点
                ListNode* temp = current->next;
                current->next = current->next->next;
                delete temp;  // 释放被删除节点的内存
            } else {
                // 如果当前节点的值不等于 val，继续向下遍历
                current = current->next;
            }
        }

        // 返回新的链表头节点（跳过虚拟头节点）
        ListNode* newHead = dummy->next;
        delete dummy;  // 释放虚拟头节点内存
        return newHead;
    }
};

// 打印链表
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    // 构造链表 [1, 2, 6, 3, 4, 5, 6]
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(6);
    head->next->next->next = new ListNode(3);
    head->next->next->next->next = new ListNode(4);
    head->next->next->next->next->next = new ListNode(5);
    head->next->next->next->next->next->next = new ListNode(6);

    // 打印原链表
    cout << "Original List: ";
    printList(head);

    // 删除值为6的节点
    Solution sol;
    head = sol.removeElements(head, 6);

    // 打印修改后的链表
    cout << "Modified List: ";
    printList(head);

    return 0;
}
```

---

### 代码说明：

1. **C语言实现：**
   - 使用一个虚拟头节点 `dummy` 来简化头节点删除的情况。
   - 遍历链表，通过 `current->next` 来检查每个节点的值，并删除匹配的节点。

2. **C++实现：**
   - 使用 `ListNode` 结构体定义链表节点。
   - 创建了一个 `Solution` 类，包含 `removeElements` 方法来删除指定值的节点。
   - 同样使用了虚拟头节点来处理边界情况（删除头节点）。
   - 利用 `delete` 来释放内存。

3. **主函数：**
   - 构建了一个链表，调用 `removeElements` 方法来删除指定值的节点，并打印修改后的链表。

