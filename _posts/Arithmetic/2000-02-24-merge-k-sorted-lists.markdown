---
layout: post
title:  "23. 合并 K 个升序链表"
categories: arithmetic
---

[23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists)

### 题目描述：
合并 k 个升序链表，返回合并后的升序链表。

**示例：**

**输入：**
[
  1->4->5,
  1->3->4,
  2->6
]

**输出：**
1->1->2->3->4->4->5->6

**说明：**
- k 为链表的个数。
- 每个链表的长度可能不同。

---

### 解题思路：

1. **最小堆法（优先队列）：**
   - 使用最小堆存储每个链表的当前节点。
   - 每次从堆中取出最小的节点，并将其后继节点（如果有）加入堆中。
   - 时间复杂度：O(N \* log(k))，其中 N 是所有链表中节点的总数，k 是链表数量。
   - 空间复杂度：O(k)。

2. **分治合并法：**
   - 将链表两两合并，直到只剩一个链表。
   - 时间复杂度：O(N \* log(k))。
   - 空间复杂度：O(log(k))（递归栈）。

---

### C语言解答：
```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

struct ListNode {
    int val;
    struct ListNode* next;
};

// 合并两个有序链表
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    if (!l1) return l2;
    if (!l2) return l1;

    if (l1->val < l2->val) {
        l1->next = mergeTwoLists(l1->next, l2);
        return l1;
    } else {
        l2->next = mergeTwoLists(l1, l2->next);
        return l2;
    }
}

// 分治合并 k 个链表
struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    if (listsSize == 1) return lists[0];

    int mid = listsSize / 2;
    struct ListNode* left = mergeKLists(lists, mid);
    struct ListNode* right = mergeKLists(lists + mid, listsSize - mid);

    return mergeTwoLists(left, right);
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
    // 构造测试链表
    struct ListNode a1 = {1, NULL}, a2 = {4, NULL}, a3 = {5, NULL};
    struct ListNode b1 = {1, NULL}, b2 = {3, NULL}, b3 = {4, NULL};
    struct ListNode c1 = {2, NULL}, c2 = {6, NULL};
    a1.next = &a2; a2.next = &a3;
    b1.next = &b2; b2.next = &b3;
    c1.next = &c2;

    struct ListNode* lists[] = {&a1, &b1, &c1};

    struct ListNode* result = mergeKLists(lists, 3);
    printList(result);

    return 0;
}
```

---

### C++解答：
```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

        // 将所有链表的头节点加入最小堆
        for (auto list : lists) {
            if (list) pq.push(list);
        }

        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();

            tail->next = node;
            tail = node;

            if (node->next) pq.push(node->next);
        }

        return dummy.next;
    }
};

// 辅助函数：打印链表
void printList(ListNode* head) {
    while (head) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    // 构造测试链表
    ListNode a1(1), a2(4), a3(5);
    ListNode b1(1), b2(3), b3(4);
    ListNode c1(2), c2(6);
    a1.next = &a2; a2.next = &a3;
    b1.next = &b2; b2.next = &b3;
    c1.next = &c2;

    vector<ListNode*> lists = {&a1, &b1, &c1};

    Solution sol;
    ListNode* result = sol.mergeKLists(lists);
    printList(result);

    return 0;
}
```