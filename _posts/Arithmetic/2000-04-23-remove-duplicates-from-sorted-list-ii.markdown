---
layout: post
title:  "82. 删除排序链表中的重复元素 II"
categories: arithmetic
---

[82. 删除排序链表中的重复元素 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-list-ii)

### 题目描述

给定一个已排序的链表的头 `head`，删除链表中所有存在重复数字的节点，只保留原始链表中 **没有重复出现的数字**。

返回链表的结果。

---

**示例 1：**

```
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]
```

**示例 2：**

```
输入：head = [1,1,1,2,3]
输出：[2,3]
```

---

**提示：**

- 链表中的节点数在范围 `[0, 300]` 内。
- `-100 <= Node.val <= 100`
- 题目数据保证链表按升序排列。

---

### 解题思路

因为链表是按升序排列的，所有的重复元素一定是连续的。可以通过以下方法解决问题：

1. **使用虚拟头节点**：
   - 为了方便处理头节点的删除，创建一个指向原链表头节点的虚拟头节点 `dummy`。

2. **双指针遍历**：
   - 使用两个指针 `prev` 和 `current`：
     - `prev` 指向当前已处理的链表尾节点。
     - `current` 用于遍历链表。
   - 如果 `current` 与 `current->next` 的值相同，说明当前节点是重复的：
     - 持续向后移动 `current`，直到所有重复的节点被跳过。
     - 更新 `prev->next` 指针，使其指向第一个不重复的节点。
   - 如果 `current` 的值与 `current->next` 不同，直接将 `prev` 指针向后移动。

3. **返回结果**：
   - 返回虚拟头节点 `dummy` 的下一个节点。

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
    if (head == NULL || head->next == NULL) {
        return head;
    }

    // 创建虚拟头节点
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->val = 0;
    dummy->next = head;

    struct ListNode* prev = dummy; // 指向当前已处理的节点
    struct ListNode* current = head;

    while (current && current->next) {
        if (current->val == current->next->val) {
            // 跳过所有重复的节点
            int duplicateValue = current->val;
            while (current && current->val == duplicateValue) {
                struct ListNode* temp = current;
                current = current->next;
                free(temp); // 释放被跳过的节点
            }
            prev->next = current; // 更新 prev 的指针
        } else {
            prev = current;
            current = current->next;
        }
    }

    struct ListNode* result = dummy->next;
    free(dummy); // 释放虚拟头节点
    return result;
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
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(3);
    head->next->next->next->next = createNode(4);
    head->next->next->next->next->next = createNode(4);
    head->next->next->next->next->next->next = createNode(5);

    struct ListNode* result = deleteDuplicates(head);

    printf("结果链表: ");
    while (result) {
        printf("%d ", result->val);
        struct ListNode* temp = result;
        result = result->next;
        free(temp);
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
        if (!head || !head->next) return head;

        // 创建虚拟头节点
        ListNode* dummy = new ListNode(0);
        dummy->next = head;

        ListNode* prev = dummy; // 指向当前已处理的节点
        ListNode* current = head;

        while (current && current->next) {
            if (current->val == current->next->val) {
                // 跳过所有重复的节点
                int duplicateValue = current->val;
                while (current && current->val == duplicateValue) {
                    ListNode* temp = current;
                    current = current->next;
                    delete temp; // 释放被跳过的节点
                }
                prev->next = current; // 更新 prev 的指针
            } else {
                prev = current;
                current = current->next;
            }
        }

        ListNode* result = dummy->next;
        delete dummy; // 释放虚拟头节点
        return result;
    }
};

// 测试函数
int main() {
    // 创建测试链表 1->2->3->3->4->4->5
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(3);
    head->next->next->next->next = new ListNode(4);
    head->next->next->next->next->next = new ListNode(4);
    head->next->next->next->next->next->next = new ListNode(5);

    Solution sol;
    ListNode* result = sol.deleteDuplicates(head);

    cout << "结果链表: ";
    while (result) {
        cout << result->val << " ";
        ListNode* temp = result;
        result = result->next;
        delete temp;
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **虚拟头节点**：
   - 使用虚拟头节点简化对链表头节点的处理，避免特殊情况。

2. **跳过重复节点**：
   - 遇到重复节点时，连续跳过所有重复值的节点。

3. **时间复杂度**：
   - 遍历链表一次，时间复杂度为 O(n)。

4. **空间复杂度**：
   - 仅使用了常数额外空间，空间复杂度为 O(1)。