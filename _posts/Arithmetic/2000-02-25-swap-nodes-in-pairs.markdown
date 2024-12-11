---
layout: post
title:  "24. 两两交换链表中的节点"
categories: arithmetic
---

[24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs)

### 题目描述：
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

**示例：**

输入：1 -> 2 -> 3 -> 4
输出：2 -> 1 -> 4 -> 3

**注意：**
- 你不能只是单纯改变节点内部的值，而是需要实际的进行节点交换。

---

### 解题思路：

1. **递归法**：
   - 如果链表为空或只有一个节点，直接返回。
   - 将当前链表的前两个节点交换：
     - 第二个节点指向递归处理剩余链表的结果。
     - 第一个节点成为第二个节点的后继。
   - 返回新头节点。

2. **迭代法**：
   - 创建一个哑节点(dummy)指向头节点，方便处理。
   - 使用指针遍历链表，每次交换一对节点：
     - 让第一节点指向第二节点的后继。
     - 让第二节点指向第一节点。
     - 更新指针移动到下一对。
   - 返回哑节点的后继。

3. **时间和空间复杂度**：
   - 时间复杂度：O(n)，其中 n 为链表长度。
   - 空间复杂度：递归法为 O(n)（递归栈），迭代法为 O(1)。



```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构体
struct ListNode {
    int val;
    struct ListNode *next;
};

// 递归法两两交换链表中的节点
struct ListNode* swapPairs(struct ListNode* head) {
    if (!head || !head->next) {
        return head; // 如果链表为空或只有一个节点，直接返回
    }

    struct ListNode* newHead = head->next; // 第二个节点成为新的头节点
    head->next = swapPairs(newHead->next); // 递归处理剩余链表
    newHead->next = head; // 第一个节点成为第二个节点的后继

    return newHead; // 返回新的头节点
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
    while (head) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    // 创建测试链表 1 -> 2 -> 3 -> 4
    struct ListNode* n1 = createNode(1);
    struct ListNode* n2 = createNode(2);
    struct ListNode* n3 = createNode(3);
    struct ListNode* n4 = createNode(4);
    n1->next = n2; n2->next = n3; n3->next = n4;

    printf("原链表: ");
    printList(n1);

    struct ListNode* result = swapPairs(n1);

    printf("交换后的链表: ");
    printList(result);

    return 0;
}
```



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
    // 递归法两两交换链表中的节点
    ListNode* swapPairs(ListNode* head) {
        if (!head || !head->next) {
            return head; // 如果链表为空或只有一个节点，直接返回
        }

        ListNode* newHead = head->next; // 第二个节点成为新的头节点
        head->next = swapPairs(newHead->next); // 递归处理剩余链表
        newHead->next = head; // 第一个节点成为第二个节点的后继

        return newHead; // 返回新的头节点
    }
};

// 辅助函数：创建链表并打印
void printList(ListNode* head) {
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    // 创建测试链表 1 -> 2 -> 3 -> 4
    ListNode n1(1), n2(2), n3(3), n4(4);
    n1.next = &n2; n2.next = &n3; n3.next = &n4;

    cout << "原链表: ";
    printList(&n1);

    Solution sol;
    ListNode* result = sol.swapPairs(&n1);

    cout << "交换后的链表: ";
    printList(result);

    return 0;
}
```