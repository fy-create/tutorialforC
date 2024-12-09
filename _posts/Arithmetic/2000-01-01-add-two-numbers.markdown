---
layout: post
title:  "2. 两数相加"
categories: arithmetic
---

https://leetcode.cn/problems/add-two-numbers

**题目描述：**

给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

**示例 1：**

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

**提示：**

- 每个链表中的节点数在范围 [1, 100] 内
- 0 <= Node.val <= 9
- 题目数据保证列表表示的数字不含前导零

---

**C 语言解法：**

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 两数相加函数
struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) {
    // 创建哑节点，简化代码处理
    struct ListNode dummy;
    struct ListNode *tail = &dummy;
    dummy.next = NULL;
    int carry = 0; // 进位

    // 遍历两个链表，直到两者都为空
    while (l1 != NULL || l2 != NULL) {
        int x = (l1 != NULL) ? l1->val : 0; // 获取当前节点的值，若为空则为0
        int y = (l2 != NULL) ? l2->val : 0;
        int sum = carry + x + y; // 计算当前位的和
        carry = sum / 10; // 更新进位
        tail->next = (struct ListNode*)malloc(sizeof(struct ListNode)); // 创建新节点
        tail = tail->next;
        tail->val = sum % 10; // 设置当前位的值
        tail->next = NULL;

        // 移动到下一个节点
        if (l1 != NULL) l1 = l1->next;
        if (l2 != NULL) l2 = l2->next;
    }

    // 如果最后有进位，添加新节点
    if (carry > 0) {
        tail->next = (struct ListNode*)malloc(sizeof(struct ListNode));
        tail = tail->next;
        tail->val = carry;
        tail->next = NULL;
    }

    return dummy.next; // 返回结果链表的头节点
}

// 辅助函数：创建链表
struct ListNode* createList(int* arr, int size) {
    struct ListNode* head = NULL;
    struct ListNode* tail = NULL;
    for (int i = 0; i < size; i++) {
        struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
        newNode->val = arr[i];
        newNode->next = NULL;
        if (head == NULL) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = tail->next;
        }
    }
    return head;
}

// 辅助函数：打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d", head->val);
        if (head->next != NULL) printf(" -> ");
        head = head->next;
    }
    printf("\n");
}

// 主函数
int main() {
    int arr1[] = {2, 4, 3};
    int arr2[] = {5, 6, 4};
    struct ListNode* l1 = createList(arr1, 3);
    struct ListNode* l2 = createList(arr2, 3);
    struct ListNode* result = addTwoNumbers(l1, l2);
    printList(result); // 输出：7 -> 0 -> 8
    return 0;
}
```

---

**C++ 语言解法：**

```cpp
#include <iostream>
#include <vector>

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

using namespace std;

class Solution {
public:
    // 两数相加函数
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); // 创建哑节点
        ListNode* tail = &dummy;
        int carry = 0; // 进位

        // 遍历两个链表，直到两者都为空
        while (l1 != nullptr || l2 != nullptr) {
            int x = (l1 != nullptr) ? l1->val : 0; // 获取当前节点的值，若为空则为0
            int y = (l2 != nullptr) ? l2->val : 0;
            int sum = carry + x + y; // 计算当前位的和
            carry = sum / 10; // 更新进位
            tail->next = new ListNode(sum % 10); // 创建新节点
            tail = tail->next;

            // 移动到下一个节点
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }

        // 如果最后有进位，添加新节点
        if (carry > 0) {
            tail->next = new ListNode(carry);
        }

        return dummy.next; // 返回结果链表的头节点
    }
};

// 辅助函数：创建链表
ListNode* createList(const vector<int>& nums) {
    ListNode* head = nullptr;
    ListNode* tail = nullptr;
    for (int num : nums) {
        ListNode* newNode = new ListNode(num);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = tail->next;
        }
    }
    return head;
}

// 辅助函数：打印链表
void printList(ListNode* head) {
    while (head != nullptr) {
        cout << head->val; // 输出节点值
        if (head->next != nullptr) cout << " -> "; // 输出箭头
        head = head->next; // 移动到下一个节点
    }
    cout << endl;
}

// 主函数
int main() {
    // 测试用例 1
    vector<int> arr1 = {2, 4, 3}; // 第一个链表的值
    vector<int> arr2 = {5, 6, 4}; // 第二个链表的值

    ListNode* l1 = createList(arr1); // 创建第一个链表
    ListNode* l2 = createList(arr2); // 创建第二个链表

    Solution solution; // 创建 Solution 对象
    ListNode* result = solution.addTwoNumbers(l1, l2); // 调用函数求解

    // 打印结果链表
    cout << "Result: ";
    printList(result); // 输出：7 -> 0 -> 8

    return 0;
}
```
