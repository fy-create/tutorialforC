---
layout: post
title:  "206. 反转链表"
categories: arithmetic
---

[206. 反转链表](https://leetcode.cn/problems/reverse-linked-list)

## 题目要求（从链接中提取）

### 题目描述：

反转一个单链表。

**示例 1：**

输入：`head = [1, 2, 3, 4, 5]`  
输出：`[5, 4, 3, 2, 1]`

**示例 2：**

输入：`head = [1, 2]`  
输出：`[2, 1]`

**示例 3：**

输入：`head = []`  
输出：`[]`

### 提示：

- 链表的节点数目范围是 `[0, 5000]`。
- `-5000 <= Node.val <= 5000`
- 题目数据保证输入的链表至少有一个节点。

---

## 解题思路

1. **问题分析：**
   - 题目要求反转一个单链表，即改变链表节点的指向，使得原本指向后继节点的指针指向前驱节点，最终得到反转后的链表。
   - 对于一个链表 `head -> node1 -> node2 -> ... -> nodeN`，反转后的链表应该是 `nodeN -> ... -> node2 -> node1 -> head`。

2. **解题方法：**
   - 遍历链表并逐一修改每个节点的指针，使其指向前一个节点。
   - 需要三个指针来辅助反转过程：`prev`、`current` 和 `next`。
     - `prev` 记录当前节点的前驱节点，初始化为 `NULL`。
     - `current` 记录当前正在处理的节点，初始化为 `head`。
     - `next` 记录 `current` 的下一个节点，以防丢失对后续节点的访问。
   - 对每个节点：
     - 保存 `current->next`（即下一个节点）到 `next`。
     - 将 `current->next` 指向 `prev`，实现反转。
     - 更新 `prev` 为 `current`，然后将 `current` 移动到 `next`，继续处理下一个节点。
   - 当遍历结束时，`prev` 将指向新的头节点。

3. **边界情况：**
   - 如果链表为空，返回空链表。
   - 如果链表只有一个节点，返回原链表。

---

## C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 反转链表
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;  // 前一个节点，初始化为NULL
    struct ListNode* current = head;  // 当前节点，初始化为链表头
    struct ListNode* next = NULL;  // 下一个节点，初始化为NULL
    
    while (current != NULL) {
        next = current->next;  // 保存下一个节点
        current->next = prev;  // 反转当前节点的指针
        prev = current;  // 移动 prev 到当前节点
        current = next;  // 移动 current 到下一个节点
    }
    
    return prev;  // prev 将指向新的头节点
}

// 打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d -> ", head->val);
        head = head->next;
    }
    printf("NULL\n");
}

int main() {
    // 构造链表 [1, 2, 3, 4, 5]
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);

    // 打印原链表
    printf("Original List: ");
    printList(head);

    // 反转链表
    head = reverseList(head);

    // 打印反转后的链表
    printf("Reversed List: ");
    printList(head);

    return 0;
}
```

---

## C++ 实现

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    // 反转链表
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;  // 前一个节点，初始化为nullptr
        ListNode* current = head;   // 当前节点，初始化为链表头
        ListNode* next = nullptr;   // 下一个节点，初始化为nullptr
        
        while (current != nullptr) {
            next = current->next;  // 保存下一个节点
            current->next = prev;  // 反转当前节点的指针
            prev = current;        // 移动 prev 到当前节点
            current = next;        // 移动 current 到下一个节点
        }
        
        return prev;  // prev 将指向新的头节点
    }
};

// 打印链表
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " -> ";
        head = head->next;
    }
    cout << "NULL" << endl;
}

int main() {
    // 构造链表 [1, 2, 3, 4, 5]
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(4);
    head->next->next->next->next = new ListNode(5);

    // 打印原链表
    cout << "Original List: ";
    printList(head);

    // 反转链表
    Solution sol;
    head = sol.reverseList(head);

    // 打印反转后的链表
    cout << "Reversed List: ";
    printList(head);

    return 0;
}
```

---

### 代码说明：

1. **C语言实现：**
   - 使用了一个 `prev` 指针来记录当前节点的前驱节点，一个 `current` 指针来遍历链表。
   - 反转过程中，通过调整每个节点的 `next` 指针来实现链表的反转。
   - 当链表遍历完毕时，`prev` 指向的节点就是新的头节点。

2. **C++实现：**
   - 使用了 `ListNode` 结构体来定义链表节点，链表的反转逻辑和 C 语言类似。
   - 使用 `Solution` 类将反转链表的函数封装为类的成员方法，使代码更加模块化。
   - 使用 `new` 创建链表节点，并通过 `delete` 释放内存（这部分代码在此实现中没有显示，但在实际项目中需要考虑内存释放）。

3. **主函数：**
   - 创建了一个链表 `[1, 2, 3, 4, 5]`，调用 `reverseList` 方法反转链表，并打印反转后的链表。

