---
layout: post
title:  "21. 合并两个有序链表"
categories: arithmetic
---

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists)

### 题目描述：
给定两个升序链表，合并这两个链表并使新链表中的节点仍然是按升序排列的。新链表是通过拼接给定的两个链表的所有节点组成的。

**示例：**

**输入：**
1 -> 2 -> 4
1 -> 3 -> 4

**输出：**
1 -> 1 -> 2 -> 3 -> 4 -> 4

### 解题思路：

1. **递归法：**
   - 如果 `l1` 为空，返回 `l2`。
   - 如果 `l2` 为空，返回 `l1`。
   - 比较 `l1` 和 `l2` 的当前节点值：
     - 如果 `l1.val < l2.val`，将 `l1` 的下一个节点指向递归调用结果，然后返回 `l1`。
     - 否则，将 `l2` 的下一个节点指向递归调用结果，然后返回 `l2`。

2. **迭代法：**
   - 创建一个哑节点 `dummy`，方便处理链表头节点。
   - 使用 `current` 指针维护新链表：
     - 比较 `l1` 和 `l2` 的当前节点值，将较小的节点链接到 `current`，并移动指针。
   - 最后将未处理的链表链接到新链表。

3. **时间复杂度和空间复杂度：**
   - 时间复杂度：O(n + m)，其中 n 和 m 分别是两个链表的长度。
   - 空间复杂度：递归法为 O(n + m)（递归栈），迭代法为 O(1)。

```c
#include <stdio.h>
#include <stdlib.h>

struct ListNode {
    int val;
    struct ListNode *next;
};

struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    if (!l1) return l2; // 如果 l1 为空，直接返回 l2
    if (!l2) return l1; // 如果 l2 为空，直接返回 l1

    if (l1->val < l2->val) {
        l1->next = mergeTwoLists(l1->next, l2); // 递归合并剩余节点
        return l1;
    } else {
        l2->next = mergeTwoLists(l1, l2->next); // 递归合并剩余节点
        return l2;
    }
}

void printList(struct ListNode* head) {
    while (head) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    // 创建测试链表 1 -> 2 -> 4 和 1 -> 3 -> 4
    struct ListNode n1 = {1, NULL}, n2 = {2, NULL}, n3 = {4, NULL};
    struct ListNode m1 = {1, NULL}, m2 = {3, NULL}, m3 = {4, NULL};
    n1.next = &n2; n2.next = &n3;
    m1.next = &m2; m2.next = &m3;

    struct ListNode* result = mergeTwoLists(&n1, &m1);
    printList(result); // 输出合并后的链表

    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        if (!l1) return l2; // 如果 l1 为空，直接返回 l2
        if (!l2) return l1; // 如果 l2 为空，直接返回 l1

        if (l1->val < l2->val) {
            l1->next = mergeTwoLists(l1->next, l2); // 递归合并剩余节点
            return l1;
        } else {
            l2->next = mergeTwoLists(l1, l2->next); // 递归合并剩余节点
            return l2;
        }
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
    // 创建测试链表 1 -> 2 -> 4 和 1 -> 3 -> 4
    ListNode n1(1), n2(2), n3(4);
    ListNode m1(1), m2(3), m3(4);
    n1.next = &n2; n2.next = &n3;
    m1.next = &m2; m2.next = &m3;

    Solution sol;
    ListNode* result = sol.mergeTwoLists(&n1, &m1);
    printList(result); // 输出合并后的链表

    return 0;
}
```
