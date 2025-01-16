---
layout: post
title:  "143. 重排链表"
categories: arithmetic
---

[143. 重排链表](https://leetcode.cn/problems/reorder-list)

### 题目描述

**重排链表**

给定一个单链表的头节点 `head`，将其按照以下顺序重新排列：

```
L0 → L1 → L2 → L3 → … → Ln-1 → Ln
重新排列后的链表是：
L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …
```

你必须在 **O(n)** 时间复杂度和 **O(1)** 空间复杂度内完成此任务。

**示例 1：**

```
输入：head = [1,2,3,4,5]
输出：[1,5,2,4,3]
```

**示例 2：**

```
输入：head = [1,2,3,4]
输出：[1,4,2,3]
```

**提示：**

- 链表的节点数在范围 [1, 5 * 10^4] 内。
- `1 <= Node.val <= 1000`

---

### 解题思路

为了实现链表的重新排列，我们可以分成以下几个步骤：

1. **找到链表的中点**：
   - 使用快慢指针来找到链表的中点。慢指针每次走一步，快指针每次走两步。快指针走到链表末尾时，慢指针恰好指向链表的中点。
   
2. **拆分链表**：
   - 通过中点将链表拆分成两个部分：前半部分和后半部分。

3. **反转后半部分**：
   - 反转链表的后半部分，使得其顺序变为反向。

4. **交替合并两部分**：
   - 交替合并前半部分和反转后的后半部分，从而得到最终的重排链表。

通过这样的步骤，我们能有效地完成任务，时间复杂度为 O(n)，空间复杂度为 O(1)。

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

// 寻找链表的中点
struct ListNode* findMiddle(struct ListNode* head) {
    struct ListNode *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;  // slow指针指向链表的中点
}

// 反转链表
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr != NULL) {
        struct ListNode* nextTemp = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;  // 返回反转后的链表头
}

// 重排链表
void reorderList(struct ListNode* head) {
    if (head == NULL || head->next == NULL) return;

    // 1. 找到链表的中点
    struct ListNode* mid = findMiddle(head);
    
    // 2. 反转链表的后半部分
    struct ListNode* second = reverseList(mid->next);
    mid->next = NULL;  // 将链表拆成两部分
    
    // 3. 交替合并两个链表
    struct ListNode* first = head;
    while (second != NULL) {
        struct ListNode* temp1 = first->next;
        struct ListNode* temp2 = second->next;
        
        first->next = second;
        second->next = temp1;
        
        first = temp1;
        second = temp2;
    }
}

// 打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d ", head->val);
        head = head->next;
    }
    printf("\n");
}

int main() {
    // 创建一个链表
    struct ListNode* head = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* second = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* third = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* fourth = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode* fifth = (struct ListNode*)malloc(sizeof(struct ListNode));
    
    head->val = 1;
    second->val = 2;
    third->val = 3;
    fourth->val = 4;
    fifth->val = 5;
    
    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;
    fifth->next = NULL;

    printf("Original list: ");
    printList(head);
    
    reorderList(head);

    printf("Reordered list: ");
    printList(head);
    
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
using namespace std;

// 链表节点定义
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    // 寻找链表的中点
    ListNode* findMiddle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != NULL && fast->next != NULL) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
    
    // 反转链表
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = NULL;
        ListNode* curr = head;
        while (curr != NULL) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }

    // 重排链表
    void reorderList(ListNode* head) {
        if (head == NULL || head->next == NULL) return;

        // 1. 找到链表的中点
        ListNode* mid = findMiddle(head);
        
        // 2. 反转链表的后半部分
        ListNode* second = reverseList(mid->next);
        mid->next = NULL;  // 将链表拆成两部分
        
        // 3. 交替合并两个链表
        ListNode* first = head;
        while (second != NULL) {
            ListNode* temp1 = first->next;
            ListNode* temp2 = second->next;
            
            first->next = second;
            second->next = temp1;
            
            first = temp1;
            second = temp2;
        }
    }
    
    // 打印链表
    void printList(ListNode* head) {
        while (head != NULL) {
            cout << head->val << " ";
            head = head->next;
        }
        cout << endl;
    }
};

int main() {
    // 创建链表
    ListNode* head = new ListNode(1);
    ListNode* second = new ListNode(2);
    ListNode* third = new ListNode(3);
    ListNode* fourth = new ListNode(4);
    ListNode* fifth = new ListNode(5);
    
    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;
    
    Solution solution;
    cout << "Original list: ";
    solution.printList(head);
    
    solution.reorderList(head);
    
    cout << "Reordered list: ";
    solution.printList(head);
    
    return 0;
}
```

### 解题思路总结

1. **找中点**：使用快慢指针法找到链表的中点。
2. **拆分链表**：将链表从中点分成两部分。
3. **反转后半部分**：反转链表的后半部分，使得顺序变为反向。
4. **交替合并**：通过交替合并两部分链表，得到最终的重排链表。
   
- **时间复杂度**：O(n)，其中 n 是链表的节点数。每个节点最多被访问两次：一次在找中点时，另一次在交替合并时。
- **空间复杂度**：O(1)，除了原链表的空间外，不使用额外的空间。