---
layout: post
title:  "160. 相交链表"
categories: arithmetic
---

[160. 相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists)

### 题目描述

**题目：两个链表的交点**

编写一个程序，找出两个链表相交的起始节点。如果两个链表没有交点，返回 `null`。

**示例 1：**

输入：
```plaintext
A:          4 → 1
                    ↘
                      8 → 4 → 5
B:     5 → 6 → 1
```
输出：
```plaintext
Intersection at '8'
```

**示例 2：**

输入：
```plaintext
A:          1 → 9 → 1
                         ↘
                           2 → 4 → 6
B:     3 → 2 → 4 → 6
```
输出：
```plaintext
Intersection at '2'
```

**提示：**

- 如果链表不存在交点，返回 `null`。
- 注意：链表节点的 `val` 是整数，且链表有可能包含环，输入时无需处理环的情况。

---

### 解题思路

**思路：**

1. **相同长度的链表：**
   - 如果两个链表相交，它们从交点开始一定会共享相同的节点，直到链表的末尾。我们可以通过先遍历两个链表，计算出它们的长度差，然后通过调整较长链表的起始位置，使得两个链表从同一起点开始比较。

2. **两次遍历：**
   - 第一次遍历：遍历两个链表，分别计算它们的长度。
   - 第二次遍历：将较长的链表指针向后移动 `len(A) - len(B)` 步，之后从头开始同时遍历两个链表，直到找到交点或者到达链表末尾。

3. **复杂度：**
   - 时间复杂度：O(n + m)，其中 n 和 m 分别是两个链表的长度。
   - 空间复杂度：O(1)，不需要额外的空间。

---

### C语言解答

```c
#include <stdio.h>

// 链表节点定义
struct ListNode {
    int val;
    struct ListNode *next;
};

// 计算链表的长度
int getLength(struct ListNode *head) {
    int length = 0;
    while (head != NULL) {
        length++;
        head = head->next;
    }
    return length;
}

// 找到两个链表的交点
struct ListNode* getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {
    int lenA = getLength(headA);  // 获取链表A的长度
    int lenB = getLength(headB);  // 获取链表B的长度

    // 使得headA指向较长链表的头节点
    if (lenA > lenB) {
        while (lenA > lenB) {
            headA = headA->next;
            lenA--;
        }
    } else {
        while (lenB > lenA) {
            headB = headB->next;
            lenB--;
        }
    }

    // 同时遍历两个链表，直到找到交点
    while (headA != NULL && headB != NULL) {
        if (headA == headB) {
            return headA;  // 找到交点，返回交点的节点
        }
        headA = headA->next;
        headB = headB->next;
    }
    
    return NULL;  // 没有交点，返回null
}

int main() {
    // 示例链表创建及测试，具体链表构建代码在实际使用时需自行实现
    return 0;
}
```

---

### C++解答

```cpp
#include <iostream>
using namespace std;

// 定义链表节点
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    // 计算链表的长度
    int getLength(ListNode* head) {
        int length = 0;
        while (head != nullptr) {
            length++;
            head = head->next;
        }
        return length;
    }

    // 找到两个链表的交点
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        int lenA = getLength(headA);  // 获取链表A的长度
        int lenB = getLength(headB);  // 获取链表B的长度

        // 使得headA指向较长链表的头节点
        if (lenA > lenB) {
            while (lenA > lenB) {
                headA = headA->next;
                lenA--;
            }
        } else {
            while (lenB > lenA) {
                headB = headB->next;
                lenB--;
            }
        }

        // 同时遍历两个链表，直到找到交点
        while (headA != nullptr && headB != nullptr) {
            if (headA == headB) {
                return headA;  // 找到交点，返回交点的节点
            }
            headA = headA->next;
            headB = headB->next;
        }

        return nullptr;  // 没有交点，返回nullptr
    }
};

int main() {
    Solution solution;

    // 创建测试链表
    ListNode *headA = new ListNode(4);
    ListNode *node1 = new ListNode(1);
    headA->next = node1;
    ListNode *intersection = new ListNode(8);
    node1->next = intersection;
    intersection->next = new ListNode(4);
    intersection->next->next = new ListNode(5);

    ListNode *headB = new ListNode(5);
    headB->next = new ListNode(6);
    headB->next->next = new ListNode(1);
    headB->next->next->next = intersection;

    ListNode* result = solution.getIntersectionNode(headA, headB);
    if (result != nullptr) {
        cout << "Intersection at node with value: " << result->val << endl;
    } else {
        cout << "No intersection." << endl;
    }

    return 0;
}
```

### 关键点说明

1. **计算链表长度：**
   - 使用一个辅助函数 `getLength` 来计算链表的长度。这样可以比较两个链表的长度差，进而调整较长链表的起始位置。

2. **调整指针位置：**
   - 如果链表 A 比链表 B 长，先通过移动 A 链表的 `head` 指针，使其与链表 B 对齐（即两者从相同的起始位置开始遍历）。
   - 同样，如果链表 B 比链表 A 长，也进行类似操作。

3. **遍历链表：**
   - 遍历两个链表，如果在某一位置它们的节点相同，则该节点为交点，返回该节点。
   - 如果两个链表没有交点，返回 `nullptr`。

### 总结

该问题的关键在于如何处理链表的不同长度。通过计算链表的长度并调整较长链表的起始位置，确保从同一起点开始比较，从而找到交点。这个方法的时间复杂度为 O(n + m)，其中 n 和 m 分别是两个链表的长度，空间复杂度为 O(1)。