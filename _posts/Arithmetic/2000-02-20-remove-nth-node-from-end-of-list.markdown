---
layout: post
title:  "19. 删除链表的倒数第 N 个结点"
categories: arithmetic
---

[19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list)

**题目描述：**

给定一个链表，删除链表的倒数第 `n` 个结点，并返回链表的头结点。

**示例 1：**

- **输入：** head = [1,2,3,4,5], n = 2
- **输出：** [1,2,3,5]

**示例 2：**

- **输入：** head = [1], n = 1
- **输出：** []

**示例 3：**

- **输入：** head = [1,2], n = 1
- **输出：** [1]

**提示：**

- 链表中结点的数量为 sz
- 1 ≤ sz ≤ 30
- 0 ≤ Node.val ≤ 100
- 1 ≤ n ≤ sz

**进阶：**你能尝试使用一趟扫描实现吗？

**C语言解答：**

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 删除链表的倒数第 n 个节点
struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    // 创建哑节点，指向头节点
    struct ListNode* dummy = (struct ListNode*)malloc(sizeof(struct ListNode));
    dummy->next = head;
    struct ListNode *first = dummy, *second = dummy;

    // 先让第一个指针移动 n+1 步
    for (int i = 0; i <= n; i++) {
        first = first->next;
    }

    // 同时移动两个指针，直到第一个指针到达链表末尾
    while (first != NULL) {
        first = first->next;
        second = second->next;
    }

    // 删除倒数第 n 个节点
    struct ListNode* temp = second->next;
    second->next = second->next->next;
    free(temp);

    // 获取新的头节点
    struct ListNode* newHead = dummy->next;
    free(dummy);
    return newHead;
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
    struct ListNode* current = head;
    while (current != NULL) {
        printf("%d ", current->val);
        current = current->next;
    }
    printf("\n");
}

// 测试函数
int main() {
    // 创建链表 1->2->3->4->5
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);

    printf("原链表: ");
    printList(head);

    // 删除倒数第 2 个节点
    head = removeNthFromEnd(head, 2);

    printf("删除倒数第 2 个节点后: ");
    printList(head);

    // 释放链表内存
    while (head != NULL) {
        struct ListNode* temp = head;
        head = head->next;
        free(temp);
    }

    return 0;
}
```

**代码解析：**

1. **定义链表节点结构：**
   - 使用结构体 `ListNode` 表示链表节点，包含整数值 `val` 和指向下一个节点的指针 `next`。

2. **删除倒数第 n 个节点的函数 `removeNthFromEnd`：**
   - 创建一个哑节点 `dummy`，其 `next` 指向链表头节点，方便处理边界情况。
   - 初始化两个指针 `first` 和 `second`，均指向 `dummy`。
   - 先移动 `first` 指针 n+1 步，使其与 `second` 指针间隔 n 个节点。
   - 同时移动 `first` 和 `second` 指针，直到 `first` 到达链表末尾。此时，`second` 指向待删除节点的前一个节点。
   - 修改 `second` 的 `next` 指针，跳过待删除的节点，并释放该节点的内存。
   - 返回新的头节点，即 `dummy->next`，并释放 `dummy` 的内存。

3. **辅助函数：**
   - `createNode`：创建一个新节点并初始化其值。
   - `printList`：打印链表中的所有节点值。

4. **测试函数 `main`：**
   - 创建链表 `1->2->3->4->5`。
   - 打印原链表。
   - 调用 `removeNthFromEnd` 函数删除倒数第 2 个节点。
   - 打印修改后的链表。
   - 释放链表的内存。

**C++解答：**

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
    // 删除链表的倒数第 n 个节点
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // 创建哑节点，指向头节点
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode *first = dummy, *second = dummy;

        // 先让第一个指针移动 n+1 步
        for (int i = 0; i <= n; i++) {
            first = first->next;
        }

        // 同时移动两个指针，直到第一个指针到达链表末尾
        while (first != nullptr) {
            first = first->next;
            second = second->next;
        }

        // 删除倒数第 n 个节点
        ListNode* temp = second->next;
        second->next = second->next->next;
        delete temp;

        // 获取新的头节点
        ListNode* newHead = dummy->next;
        delete dummy;
        return newHead;
    }
};

// 辅助函数：创建链表
ListNode* createList(const vector<int>& values) {
    ListNode* dummy = new ListNode(0);
    ListNode* current = dummy;
    for (int value : values) {
        current->next = new ListNode(value);
        current = current->next;
    }
    ListNode* head = dummy->next;
    delete dummy;
    return head;
}

// 辅助函数：打印链表
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;
}

// 测试函数
int main() {
    // 创建链表 1->2->3->4->5
    vector<int> values = {1, 2, 3, 4, 5};
    ListNode* head = createList(values);

    cout << "原链表: ";
    printList(head);

    // 删除倒数第 2 个节点
    Solution solution;
    head = solution.removeNthFromEnd(head, 2);

    cout << "删除倒数第 2 个节点后: ";
    printList(head);

    // 释放链表内存
    while (head != nullptr) {
        ListNode* temp = head;
        head = head->next;
        delete temp;
    }

    return 0;
}
```

---

### **代码解析：**

1. **链表节点结构：**
   - 使用 `struct ListNode` 表示链表节点，包含整数值 `val` 和指向下一个节点的指针 `next`。

2. **删除倒数第 n 个节点的函数 `removeNthFromEnd`：**
   - 创建一个哑节点 `dummy`，方便处理头节点的删除情况。
   - 定义两个指针 `first` 和 `second`，初始均指向 `dummy`。
   - 先移动 `first` 指针 `n+1` 步，使其与 `second` 间隔 `n` 个节点。
   - 同时移动 `first` 和 `second`，直到 `first` 到达链表末尾。
   - `second->next` 指向待删除节点的后一个节点，同时释放待删除节点的内存。
   - 返回新的头节点 `dummy->next`，并释放哑节点的内存。

3. **辅助函数：**
   - `createList`：根据 `vector` 创建链表。
   - `printList`：打印链表中的节点值。

4. **测试函数 `main`：**
   - 创建链表 `1->2->3->4->5`。
   - 打印原链表。
   - 调用 `removeNthFromEnd` 删除倒数第 2 个节点。
   - 打印修改后的链表。
   - 释放链表的内存。

---

### 示例运行

#### 输入：
链表：`1->2->3->4->5`  
n = 2

#### 输出：
```text
原链表: 1 2 3 4 5 
删除倒数第 2 个节点后: 1 2 3 5
```

---

### **时间复杂度和空间复杂度**

1. **时间复杂度：** O(n)
   - 遍历链表两次（一次移动 `first` 指针，一次找到并删除节点）。

2. **空间复杂度：** O(1)
   - 仅使用常量额外空间，无额外数据结构。

---

### 总结

- **C语言版本：** 使用手动内存管理实现链表操作，功能明确，适合低级语言场景。
- **C++版本：** 利用 STL 和 `vector` 简化链表的创建和操作，逻辑清晰，易读性更强。
- **两种版本均实现了一趟扫描解决问题的高效算法，适用于大小为 1 到 30 的链表场景。**