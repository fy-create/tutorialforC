---
layout: post
title:  "25. K 个一组翻转链表"
categories: arithmetic
---

[25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group)

### 题目描述：
给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

**示例：**

**输入：** head = [1,2,3,4,5], k = 2

**输出：** [2,1,4,3,5]

**输入：** head = [1,2,3,4,5], k = 3

**输出：** [3,2,1,4,5]

### 解题思路：

1. **遍历链表分组**：
   - 先遍历链表以确定剩余节点数是否满足翻转条件。
   - 每次处理 k 个节点。

2. **翻转 k 个节点**：
   - 使用三个指针完成链表翻转（当前节点、前置节点、后置节点）。
   - 翻转完成后，将子链表重新链接到主链表。

3. **处理剩余节点**：
   - 如果剩余节点少于 k 个，不进行翻转。

4. **时间复杂度**：O(n)，n 是链表长度。
   - 每个节点仅被访问一次。

5. **空间复杂度**：O(1)。
   - 使用指针操作，无额外空间分配。

```c
#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    struct ListNode dummy = {0, head}; // 哑节点
    struct ListNode* prev = &dummy;   // 指向翻转前子链表的前置节点

    while (1) {
        struct ListNode* groupStart = prev->next; // 当前分组的起始节点
        struct ListNode* end = prev; // 用于找到分组的结束节点
        for (int i = 0; i < k && end; i++) {
            end = end->next;
        }
        if (!end) break; // 剩余节点不足 k 个，退出循环

        struct ListNode* nextGroup = end->next; // 下一组的起始节点
        // 翻转当前分组
        struct ListNode* prevNode = nextGroup;
        struct ListNode* curr = groupStart;
        while (curr != nextGroup) {
            struct ListNode* temp = curr->next;
            curr->next = prevNode;
            prevNode = curr;
            curr = temp;
        }

        // 链接翻转后的子链表
        prev->next = end;
        prev = groupStart;
    }

    return dummy.next;
}

void printList(struct ListNode* head) {
    while (head) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    struct ListNode n1 = {1, NULL}, n2 = {2, NULL}, n3 = {3, NULL}, n4 = {4, NULL}, n5 = {5, NULL};
    n1.next = &n2; n2.next = &n3; n3.next = &n4; n4.next = &n5;

    printf("原始链表: ");
    printList(&n1);

    struct ListNode* result = reverseKGroup(&n1, 2);
    printf("翻转后的链表: ");
    printList(result);

    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode dummy(0); // 哑节点
        dummy.next = head;
        ListNode* prev = &dummy; // 翻转前子链表的前置节点

        while (true) {
            ListNode* groupStart = prev->next; // 当前分组的起始节点
            ListNode* end = prev; // 用于找到分组的结束节点
            for (int i = 0; i < k && end; i++) {
                end = end->next;
            }
            if (!end) break; // 剩余节点不足 k 个，退出循环

            ListNode* nextGroup = end->next; // 下一组的起始节点
            // 翻转当前分组
            ListNode* prevNode = nextGroup;
            ListNode* curr = groupStart;
            while (curr != nextGroup) {
                ListNode* temp = curr->next;
                curr->next = prevNode;
                prevNode = curr;
                curr = temp;
            }

            // 链接翻转后的子链表
            prev->next = end;
            prev = groupStart;
        }

        return dummy.next;
    }
};

void printList(ListNode* head) {
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    ListNode n1(1), n2(2), n3(3), n4(4), n5(5);
    n1.next = &n2; n2.next = &n3; n3.next = &n4; n4.next = &n5;

    cout << "原始链表: ";
    printList(&n1);

    Solution sol;
    ListNode* result = sol.reverseKGroup(&n1, 2);
    cout << "翻转后的链表: ";
    printList(result);

    return 0;
}
```