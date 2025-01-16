---
layout: post
title:  "92. 反转链表 II"
categories: arithmetic
---

[92. 反转链表 II](https://leetcode.cn/problems/reverse-linked-list-ii)

### 题目要求：

给定一个单链表的头节点 `head`，以及两个整数 `left` 和 `right`，要求你反转从位置 `left` 到位置 `right` 的链表，并返回其头节点。

- **1 ≤ left ≤ right ≤ 链表长度**
- 你必须完成一次链表的反转操作，并且空间复杂度为 O(1)。

**示例 1：**

```
输入：head = [1,2,3,4,5], left = 2, right = 4
输出：[1,4,3,2,5]
```

**示例 2：**

```
输入：head = [5], left = 1, right = 1
输出：[5]
```

**提示：**
- 链表的节点数在范围 [1, 500] 内。
- `1 ≤ left ≤ right ≤ 链表长度`。
- 进阶：能在 O(n) 时间复杂度和 O(1) 空间复杂度下完成此操作。

### 解题思路：

这道题目要求我们反转链表的部分节点，即从 `left` 到 `right` 位置的节点。需要注意的是，链表的反转是一种典型的链表操作。

#### 步骤：
1. **找到反转区间的前驱节点**：首先，需要找到 `left` 位置的前驱节点，也就是反转区间的第一个节点的前一个节点。
2. **反转区间内的链表**：反转从 `left` 到 `right` 的链表部分。注意，反转后的链表需要将反转区间的前驱节点和后继节点连接起来。
3. **连接反转后的链表与未反转部分**：连接反转后的部分和未反转部分。即让 `left-1` 位置的节点指向反转后的头节点，`right+1` 位置的节点指向反转后的尾节点。

#### 细节：
- 通过一个虚拟头节点，避免特殊情况，比如反转从头节点开始的情况。
- 使用双指针方法，首先遍历到 `left` 节点，反转 `[left, right]` 区间的节点。
- 完成反转后，重新连接链表。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 链表节点定义
struct ListNode {
    int val;
    struct ListNode *next;
    struct ListNode(int x) : val(x), next(NULL) {}
};

// 反转链表的部分区间
struct ListNode* reverseBetween(struct ListNode* head, int left, int right) {
    if (!head || left == right) return head;
    
    // 创建虚拟头节点，方便处理边界情况
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode* pre = dummy;

    // 找到左侧前一个节点
    for (int i = 1; i < left; i++) {
        pre = pre->next;
    }

    // 反转区间的节点
    struct ListNode* curr = pre->next;
    struct ListNode* next = NULL;
    for (int i = 0; i < right - left; i++) {
        next = curr->next;
        curr->next = next->next;
        next->next = pre->next;
        pre->next = next;
    }

    // 返回新的头节点
    return dummy->next;
}

// 辅助函数：打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    // 创建测试用例 [1 -> 2 -> 3 -> 4 -> 5]
    struct ListNode* head = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->val = 1;
    head->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->val = 2;
    head->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->val = 3;
    head->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->val = 4;
    head->next->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->next->val = 5;
    head->next->next->next->next->next = NULL;

    printf("原始链表: ");
    printList(head);

    struct ListNode* newHead = reverseBetween(head, 2, 4);
    printf("反转后的链表: ");
    printList(newHead);

    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构体
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (!head || left == right) return head;
        
        // 创建虚拟头节点，方便处理边界情况
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* pre = dummy;

        // 找到左侧前一个节点
        for (int i = 1; i < left; i++) {
            pre = pre->next;
        }

        // 反转区间的节点
        ListNode* curr = pre->next;
        ListNode* next = nullptr;
        for (int i = 0; i < right - left; i++) {
            next = curr->next;
            curr->next = next->next;
            next->next = pre->next;
            pre->next = next;
        }

        // 返回新的头节点
        return dummy->next;
    }
};

// 辅助函数：打印链表
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    Solution sol;
    
    // 创建测试用例 [1 -> 2 -> 3 -> 4 -> 5]
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);

    cout << "原始链表: ";
    printList(head);

    ListNode* newHead = sol.reverseBetween(head, 2, 4);
    cout << "反转后的链表: ";
    printList(newHead);

    return 0;
}
```

### 解题思路说明：

1. **虚拟头节点**：为了处理 `left` 为 1 的特殊情况，我们可以引入一个虚拟头节点 `dummy`，让它指向 `head`。这样我们就不需要特判反转部分位于链表头部的情况。
   
2. **反转区间**：通过两个指针 `pre` 和 `curr` 来处理链表反转。在 `pre` 指针指向反转区间的前一个节点，`curr` 指向反转区间的第一个节点。在反转时，我们不断调整 `curr` 所指节点的指针，使其指向区间内前一个节点的 `next`。

3. **时间复杂度**：整个过程只需要遍历一次链表，因此时间复杂度是 `O(n)`，其中 `n` 是链表的长度。
   
4. **空间复杂度**：空间复杂度为 `O(1)`，因为我们只用了常数空间（虚拟节点和若干指针）。

### 示例输出：

#### C语言：

```
原始链表: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
反转后的链表: 1 -> 4 -> 3 -> 2 -> 5 -> NULL
```

#### C++：

```
原始链表: 1 -> 2 -> 3 -> 4 -> 5 -> NULL
反转后的链表: 1 -> 4 -> 3 -> 2 -> 5 -> NULL
```