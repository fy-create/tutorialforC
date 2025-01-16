---
layout: post
title:  "147. 对链表进行插入排序"
categories: arithmetic
---

[147. 对链表进行插入排序](https://leetcode.cn/problems/insertion-sort-list)

### 题目描述

**插入排序链表**

给定一个链表的头节点 `head`，请将链表按升序排序，并返回排序后的链表。

**示例 1:**

```
输入: head = [4,2,1,3]
输出: [1,2,3,4]
```

**示例 2:**

```
输入: head = [-1,5,3,4,0]
输出: [-1,0,3,4,5]
```

**提示:**

- 链表中的节点数在 [1, 5000] 范围内。
- `-5000 <= Node.val <= 5000`

---

### 解题思路

这道题目要求实现 **插入排序**，可以参考如何在链表中进行插入排序。

#### 插入排序简介

插入排序是一种简单的排序算法。它的基本思路是将当前元素插入到已排序序列的正确位置。在本题中，我们需要通过链表节点来模拟插入排序。

#### 思路概述

1. **遍历链表**：逐个检查链表中的每个元素，将其插入到已经排序好的部分。
2. **维护一个排序好的子链表**：我们从链表的第二个元素开始，依次将当前元素插入到前面已经排序的链表中。
3. **插入元素的操作**：对于当前节点，我们从头节点开始，找到一个合适的位置插入。即找到一个位置，满足 `前一个节点值 < 当前节点值 <= 后一个节点值`。插入时需要注意链表的连接顺序。

#### 具体步骤

1. 使用一个 **虚拟头节点**（`dummy_head`），它帮助我们避免对头节点的特殊处理。
2. 遍历链表中的每个元素：
   - 将当前节点（`cur`）与已排序部分的元素进行比较，找到合适的位置插入。
   - 每插入一个节点，都需要更新已排序链表的指针。
3. 最终返回排序后的链表。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 链表节点定义
struct ListNode {
    int val;
    struct ListNode *next;
    struct ListNode(int x) : val(x), next(NULL) {}
};

// 插入排序链表函数
struct ListNode* insertionSortList(struct ListNode* head) {
    if (head == NULL || head->next == NULL) return head;

    // 创建一个虚拟头节点，简化插入操作
    struct ListNode *dummyHead = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummyHead->next = NULL;
    
    struct ListNode *cur = head;
    while (cur != NULL) {
        // 从dummyHead开始，找到合适的位置插入cur
        struct ListNode *prev = dummyHead;
        while (prev->next != NULL && prev->next->val < cur->val) {
            prev = prev->next;
        }
        
        struct ListNode *next = cur->next;
        cur->next = prev->next;
        prev->next = cur;
        
        cur = next;
    }
    
    return dummyHead->next;  // 返回排序后的链表头
}

// 打印链表函数
void printList(struct ListNode* head) {
    struct ListNode* current = head;
    while (current != NULL) {
        printf("%d -> ", current->val);
        current = current->next;
    }
    printf("NULL\n");
}

// 主函数示例
int main() {
    struct ListNode *head = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->val = 4;
    head->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->val = 2;
    head->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->val = 1;
    head->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->val = 3;
    head->next->next->next->next = NULL;
    
    printf("Before sorting: ");
    printList(head);
    
    struct ListNode* sortedHead = insertionSortList(head);
    
    printf("After sorting: ");
    printList(sortedHead);

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
using namespace std;

// 定义链表节点
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        // 如果链表为空或只有一个节点，直接返回
        if (!head || !head->next) return head;

        // 创建一个虚拟头节点，简化插入操作
        ListNode* dummyHead = new ListNode(0);
        dummyHead->next = NULL;
        
        // 当前处理的节点
        ListNode* cur = head;

        while (cur) {
            ListNode* prev = dummyHead;
            // 找到合适的位置
            while (prev->next && prev->next->val < cur->val) {
                prev = prev->next;
            }
            // 将cur插入到排序链表的正确位置
            ListNode* next = cur->next;
            cur->next = prev->next;
            prev->next = cur;

            // 继续处理下一个节点
            cur = next;
        }

        return dummyHead->next; // 返回排序后的链表
    }

    // 打印链表
    void printList(ListNode* head) {
        ListNode* current = head;
        while (current != NULL) {
            cout << current->val << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    // 创建链表 [4, 2, 1, 3]
    ListNode* head = new ListNode(4);
    head->next = new ListNode(2);
    head->next->next = new ListNode(1);
    head->next->next->next = new ListNode(3);

    cout << "Before sorting: ";
    Solution().printList(head);
    
    Solution sol;
    ListNode* sortedHead = sol.insertionSortList(head);
    
    cout << "After sorting: ";
    sol.printList(sortedHead);

    return 0;
}
```

### 关键点说明

1. **虚拟头节点**：使用虚拟头节点来简化链表插入操作，避免对头节点的特殊处理。
2. **插入排序**：每次遍历链表中的一个元素，并将其插入到已经排序好的链表部分。
3. **时间复杂度**：每次插入操作都需要遍历已排序的链表部分，因此时间复杂度是 O(n^2)，其中 `n` 是链表的节点数。

### 总结

- 通过在链表中模拟插入排序，我们能够对链表进行排序。
- 使用虚拟头节点来避免一些特殊情况，使得代码更简洁。
- 插入排序是 O(n^2) 时间复杂度，对于小规模的链表排序是可行的。