---
layout: post
title:  "83. 删除排序链表中的重复元素"
categories: arithmetic
---

[83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list)

### 题目描述

给定一个已排序的链表的头 `head`，删除所有重复的元素，使得每个元素只出现一次。返回删除后的链表。

---

**示例 1：**

```
输入：head = [1,1,2]
输出：[1,2]
```

**示例 2：**

```
输入：head = [1,1,2,3,3]
输出：[1,2,3]
```

---

**提示：**

- 链表中的节点数在范围 `[0, 300]` 内。
- `-100 <= Node.val <= 100`
- 链表已按升序排列。

---

### 解题思路

由于链表是按升序排序的，所有的重复元素一定是连续的。可以通过遍历链表，跳过重复的节点来去重：

1. **使用单指针**：
   - 定义一个指针 `current` 指向链表头节点。
   - 遍历链表：
     - 如果当前节点的值与下一节点的值相同，则跳过下一节点。
     - 否则，移动指针到下一节点。
   - 当指针移动到链表末尾时，遍历完成。

2. **时间复杂度**：
   - 遍历链表一次，时间复杂度为 O(n)。

3. **空间复杂度**：
   - 使用常数空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 链表节点定义
struct ListNode {
    int val;
    struct ListNode* next;
};

// 删除排序链表中的重复元素
struct ListNode* deleteDuplicates(struct ListNode* head) {
    struct ListNode* current = head;

    // 遍历链表，跳过重复节点
    while (current != NULL && current->next != NULL) {
        if (current->val == current->next->val) {
            struct ListNode* temp = current->next;
            current->next = current->next->next; // 跳过重复节点
            free(temp); // 释放被删除的节点
        } else {
            current = current->next; // 移动到下一节点
        }
    }

    return head;
}

// 辅助函数：创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 测试函数
int main() {
    // 创建测试链表 1->1->2->3->3
    struct ListNode* head = createNode(1);
    head->next = createNode(1);
    head->next->next = createNode(2);
    head->next->next->next = createNode(3);
    head->next->next->next->next = createNode(3);

    head = deleteDuplicates(head);

    // 输出结果链表
    printf("结果链表: ");
    struct ListNode* current = head;
    while (current) {
        printf("%d ", current->val);
        struct ListNode* temp = current;
        current = current->next;
        free(temp); // 释放链表节点
    }
    printf("\n");

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>

using namespace std;

// 链表节点定义
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* current = head;

        // 遍历链表，跳过重复节点
        while (current && current->next) {
            if (current->val == current->next->val) {
                ListNode* temp = current->next;
                current->next = current->next->next; // 跳过重复节点
                delete temp; // 释放被删除的节点
            } else {
                current = current->next; // 移动到下一节点
            }
        }

        return head;
    }
};

// 测试函数
int main() {
    // 创建测试链表 1->1->2->3->3
    ListNode* head = new ListNode(1);
    head->next = new ListNode(1);
    head->next->next = new ListNode(2);
    head->next->next->next = new ListNode(3);
    head->next->next->next->next = new ListNode(3);

    Solution sol;
    head = sol.deleteDuplicates(head);

    // 输出结果链表
    cout << "结果链表: ";
    ListNode* current = head;
    while (current) {
        cout << current->val << " ";
        ListNode* temp = current;
        current = current->next;
        delete temp; // 释放链表节点
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **单指针遍历**：
   - 使用 `current` 指针遍历链表。
   - 如果当前节点值与下一节点值相同，跳过下一节点。

2. **内存管理**：
   - 在 C 语言中，使用 `free` 释放被删除的节点。
   - 在 C++ 中，使用 `delete` 释放被删除的节点。

3. **时间复杂度**：
   - 遍历链表一次，时间复杂度为 O(n)。

4. **空间复杂度**：
   - 仅使用一个指针，空间复杂度为 O(1)。