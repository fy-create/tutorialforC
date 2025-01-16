---
layout: post
title:  "19. 删除链表的倒数第 N 个结点"
categories: arithmetic
---

[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list)

### 题目描述

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

---

**示例 1：**

```
输入：head = [1,2,3,4,5], n = 2  
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1  
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1  
输出：[1]
```

---

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

---

**进阶：**  
你能尝试使用一趟扫描实现吗？

---

### 解题思路

要删除链表的倒数第 `n` 个节点，可以使用双指针技巧实现一次遍历完成。

#### 核心步骤：
1. **虚拟头节点：** 创建一个虚拟节点 `dummy`，其 `next` 指向链表的头节点。这样可以简化删除头节点的特殊情况。
2. **初始化双指针：** 定义两个指针 `fast` 和 `slow`，都指向 `dummy`。
3. **快指针移动：** 让 `fast` 指针先向前移动 `n+1` 步，使得 `fast` 和 `slow` 指针之间相隔 `n` 个节点。
4. **双指针移动：** 同时移动 `fast` 和 `slow` 指针，直到 `fast` 到达链表末尾。此时，`slow` 指针的下一个节点即为需要删除的节点。
5. **删除节点：** 修改 `slow->next` 指向 `slow->next->next`，跳过需要删除的节点。
6. **返回结果：** 返回 `dummy->next`，即为删除节点后的链表头。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 删除链表的倒数第 n 个节点
struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    // 创建虚拟头节点
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;

    // 初始化快慢指针
    struct ListNode* fast = dummy;
    struct ListNode* slow = dummy;

    // 快指针先移动 n+1 步
    for (int i = 0; i <= n; i++) {
        fast = fast->next;
    }

    // 同时移动快慢指针，直到快指针到达链表末尾
    while (fast != NULL) {
        fast = fast->next;
        slow = slow->next;
    }

    // 删除倒数第 n 个节点
    struct ListNode* temp = slow->next;
    slow->next = slow->next->next;
    free(temp);

    // 获取新的头节点
    struct ListNode* newHead = dummy->next;
    free(dummy); // 释放虚拟头节点

    return newHead;
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
        printf("%d ", current->val);
        current = current->next;
    }
    printf("\n");
}

// 测试函数
int main() {
    // 创建链表 1->2->3->4->5
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);

    int n = 2;
    printf("原链表: ");
    printList(head);

    // 删除倒数第 n 个节点
    head = removeNthFromEnd(head, n);

    printf("修改后的链表: ");
    printList(head);

    // 释放链表内存
    while (head != NULL) {
        struct ListNode* temp = head;
        head = head->next;
        free(temp);
    }

    return 0;
}
```

---

### C++实现

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
    // 删除链表的倒数第 n 个节点
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // 创建虚拟头节点
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        // 初始化快慢指针
        ListNode* fast = dummy;
        ListNode* slow = dummy;

        // 快指针先移动 n+1 步
        for (int i = 0; i <= n; ++i) {
            fast = fast->next;
        }

        // 同时移动快慢指针，直到快指针到达链表末尾
        while (fast != nullptr) {
            fast = fast->next;
            slow = slow->next;
        }

        // 删除倒数第 n 个节点
        ListNode* temp = slow->next;
        slow->next = slow->next->next;
        delete temp;

        // 获取新的头节点
        ListNode* newHead = dummy->next;
        delete dummy; // 释放虚拟头节点

        return newHead;
    }
};

// 辅助函数：创建新节点
ListNode* createNode(int val) {
    return new ListNode(val);
}

// 辅助函数：打印链表
void printList(ListNode* head) {
    ListNode* current = head;
    while (current != nullptr) {
        cout << current->val << " ";
        current = current->next;
    }
    cout << endl;
}

// 测试函数
int main() {
    // 创建链表 1->2->3->4->5
    ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);

    int n = 2;
    cout << "原链表: ";
    printList(head);

    // 删除倒数第 n 个节点
    Solution solution;
    head = solution.removeNthFromEnd(head, n);

    cout << "修改后的链表: ";
    printList(head);

    // 释放链表内存
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }

    return 0;
}
```

---

### 说明

**C语言版本**：
- 使用动态内存分配创建链表节点并操作。
- 通过双指针实现一次遍历删除倒数第 `n` 个节点。
- 辅助函数 `createNode` 和 `printList` 用于创建和打印链表。

**C++版本**：
- 使用面向对象编程，定义 `ListNode` 结构和 `Solution` 类。
- 使用 STL 语法简化操作。
- `main` 函数展示了链表的创建、修改和内存释放。

两种实现都采用了双指针技巧，时间复杂度为 O(n)，同时注意了内存管理。