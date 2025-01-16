---
layout: post
title:  "2. 两数相加"
categories: arithmetic
---

[2. 两数相加](https://leetcode.cn/problems/add-two-numbers)

### 题目描述

给定两个非空链表，表示两个非负整数。它们的数字是以逆序方式存储的，并且每个节点包含一个数字。将这两个数相加，并返回一个新的链表。新的链表同样是以逆序方式存储的。

你可以假设除了数字 0 之外，两个数都不会以零开头。

### 示例

**示例 1：**

输入：  
`l1 = [2, 4, 3]`  
`l2 = [5, 6, 4]`  

输出：  
`[7, 0, 8]`  

解释：  
(2 -> 4 -> 3) + (5 -> 6 -> 4) = 7 -> 0 -> 8。

**示例 2：**

输入：  
`l1 = [0]`  
`l2 = [0]`  

输出：  
`[0]`  

**示例 3：**

输入：  
`l1 = [9, 9, 9, 9, 9, 9, 9]`  
`l2 = [9, 9, 9, 9]`  

输出：  
`[8, 9, 9, 9, 0, 0, 0, 1]`  

解释：  
(9 -> 9 -> 9 -> 9 -> 9 -> 9 -> 9) + (9 -> 9 -> 9 -> 9) = 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1.

### 提示

- 每个链表中的节点数在范围 [1, 100] 内。
- 每个节点的值在 [0, 9] 内。
- 输入数据保证链表代表的数字没有前导零。

---

### 解题思路

本题的核心是两个链表表示的数字相加，并且结果也应该以链表的形式返回。我们可以模拟手工加法的过程，从链表的低位（即链表头部）开始逐位相加，并且处理进位。具体的思路如下：

1. **初始化：** 设置一个虚拟的头节点 `dummyHead`，用于简化处理链表的操作。
2. **逐位相加：** 使用两个指针分别指向链表 `l1` 和 `l2` 的当前节点，同时一个 `carry` 变量记录进位。逐位相加时，如果某个链表已经结束，则视为 0。
3. **更新指针：** 在每次相加后，将新的节点添加到结果链表中，并更新指针。
4. **处理进位：** 加法可能会产生进位，需要在结束遍历后检查 `carry` 是否为 1。如果有进位，向结果链表中再添加一个新的节点。
5. **返回结果：** 最终返回 `dummyHead.next`，即去掉虚拟头节点后的结果链表。

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点
struct ListNode {
    int val;
    struct ListNode* next;
};

// 创建新的链表节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 两数相加的函数
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode* dummyHead = createNode(0);  // 创建一个虚拟头节点
    struct ListNode* current = dummyHead;  // 当前操作的节点
    int carry = 0;  // 进位

    while (l1 != NULL || l2 != NULL || carry != 0) {
        // 获取当前位的值，如果链表为空则视为0
        int x = (l1 != NULL) ? l1->val : 0;
        int y = (l2 != NULL) ? l2->val : 0;

        // 计算当前位的和
        int sum = x + y + carry;
        carry = sum / 10;  // 更新进位
        int digit = sum % 10;  // 获取当前位的数字

        // 创建新的节点并链接到结果链表
        current->next = createNode(digit);
        current = current->next;

        // 移动到下一个节点
        if (l1 != NULL) l1 = l1->next;
        if (l2 != NULL) l2 = l2->next;
    }

    return dummyHead->next;  // 返回去掉虚拟头节点后的链表
}

// 打印链表的函数
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d ", head->val);
        head = head->next;
    }
    printf("\n");
}

int main() {
    // 创建链表 l1: 2 -> 4 -> 3
    struct ListNode* l1 = createNode(2);
    l1->next = createNode(4);
    l1->next->next = createNode(3);

    // 创建链表 l2: 5 -> 6 -> 4
    struct ListNode* l2 = createNode(5);
    l2->next = createNode(6);
    l2->next->next = createNode(4);

    // 两数相加
    struct ListNode* result = addTwoNumbers(l1, l2);

    // 打印结果链表: 7 -> 0 -> 8
    printList(result);

    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
using namespace std;

// 定义链表节点
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    // 两数相加的函数
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummyHead = new ListNode(0);  // 创建一个虚拟头节点
        ListNode* current = dummyHead;  // 当前操作的节点
        int carry = 0;  // 进位

        // 遍历两个链表和进位
        while (l1 != nullptr || l2 != nullptr || carry != 0) {
            // 获取当前位的值
            int x = (l1 != nullptr) ? l1->val : 0;
            int y = (l2 != nullptr) ? l2->val : 0;

            // 计算当前位的和
            int sum = x + y + carry;
            carry = sum / 10;  // 更新进位
            int digit = sum % 10;  // 获取当前位的数字

            // 创建新的节点并链接到结果链表
            current->next = new ListNode(digit);
            current = current->next;

            // 移动到下一个节点
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }

        return dummyHead->next;  // 返回去掉虚拟头节点后的链表
    }
};

// 打印链表的函数
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution solution;

    // 创建链表 l1: 2 -> 4 -> 3
    ListNode* l1 = new ListNode(2);
    l1->next = new ListNode(4);
    l1->next->next = new ListNode(3);

    // 创建链表 l2: 5 -> 6 -> 4
    ListNode* l2 = new ListNode(5);
    l2->next = new ListNode(6);
    l2->next->next = new ListNode(4);

    // 两数相加
    ListNode* result = solution.addTwoNumbers(l1, l2);

    // 打印结果链表: 7 -> 0 -> 8
    printList(result);

    return 0;
}
```

### 解释

1. **C 语言版本**：
   - 通过创建一个虚拟头节点来简化链表的操作。
   - 在循环中处理每一位的加法，并处理进位问题。
   - 最后返回 `dummyHead->next` 即去掉虚拟头节点的链表。

2. **C++ 语言版本**：
   - 使用 `ListNode` 结构体表示链表节点，利用构造函数初始化节点。
   - 在 `addTwoNumbers` 方法中，通过遍历链表并处理进位，生成最终结果链表。
   - 结果链表与 C 语言版本相同，时间复杂度是 O(n)，空间复杂度是 O(n)，其中 `n` 是较长链表的长度。

两种语言的解法思路完全一致，主要

的区别在于语法和内存管理上。