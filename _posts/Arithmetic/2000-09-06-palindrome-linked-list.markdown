---
layout: post
title:  "234. 回文链表"
categories: arithmetic
---

[234. 回文链表](https://leetcode.cn/problems/palindrome-linked-list)

### 题目描述：
给定一个单链表的头节点 `head`，如果该链表是回文链表，则返回 `true`；否则返回 `false`。

### 示例：
```
输入：head = [1,2,2,1]
输出：true

输入：head = [1,2]
输出：false
```

### 提示：
- 链表的长度范围为 [1, 10^5]。
- 你可以假设链表中的节点值是 32 位整数。

### 解题思路：
要判断一个链表是否是回文链表，首先要理解回文的定义：一个回文字符串（或链表）是指从前向后和从后向前读取都是相同的。

1. **快慢指针找到链表中点**：
   - 使用快慢指针，慢指针每次移动一步，快指针每次移动两步。这样快指针走到链表末尾时，慢指针刚好到达链表的中点。

2. **反转后半部分链表**：
   - 当慢指针到达中点后，我们可以反转链表的后半部分。这样，链表的前半部分和后半部分就可以比较是否相同。

3. **比较前半部分和反转后的后半部分**：
   - 从头到中点的链表和从反转后的中点到尾部的链表逐一比较，若存在不同，则返回`false`；否则返回`true`。

4. **恢复链表**（可选）：
   - 如果需要恢复原链表，可以在比较完后反转后半部分的链表，恢复链表的结构。

### 算法步骤：
1. 使用快慢指针找到链表的中点。
2. 反转链表的后半部分。
3. 比较前半部分和后半部分。
4. 如果相同则返回`true`，否则返回`false`。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 反转链表
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    struct ListNode* next = NULL;
    while (curr != NULL) {
        next = curr->next;
        curr->next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}

// 判断链表是否为回文链表
bool isPalindrome(struct ListNode* head) {
    if (head == NULL || head->next == NULL) return true;

    // 快慢指针找到链表中点
    struct ListNode *slow = head, *fast = head;
    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }

    // 反转后半部分链表
    struct ListNode* secondHalf = reverseList(slow);
    struct ListNode* firstHalf = head;

    // 比较前半部分和后半部分
    while (secondHalf != NULL) {
        if (firstHalf->val != secondHalf->val) {
            return false;
        }
        firstHalf = firstHalf->next;
        secondHalf = secondHalf->next;
    }

    return true;
}

// 创建一个新的链表节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

int main() {
    // 创建一个示例链表 [1, 2, 2, 1]
    struct ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(2);
    head->next->next->next = createNode(1);

    // 判断链表是否是回文链表
    bool result = isPalindrome(head);
    printf("%s\n", result ? "true" : "false");

    return 0;
}
```

### C++解答：

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
        ListNode* prev = nullptr;
        ListNode* curr = head;
        ListNode* next = nullptr;
        while (curr != nullptr) {
            next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    // 判断链表是否为回文链表
    bool isPalindrome(ListNode* head) {
        if (head == nullptr || head->next == nullptr) return true;

        // 快慢指针找到链表中点
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast != nullptr && fast->next != nullptr) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 反转后半部分链表
        ListNode* secondHalf = reverseList(slow);
        ListNode* firstHalf = head;

        // 比较前半部分和后半部分
        while (secondHalf != nullptr) {
            if (firstHalf->val != secondHalf->val) {
                return false;
            }
            firstHalf = firstHalf->next;
            secondHalf = secondHalf->next;
        }

        return true;
    }
};

int main() {
    // 创建一个示例链表 [1, 2, 2, 1]
    ListNode* head = new ListNode(1);
    head->next = new ListNode(2);
    head->next->next = new ListNode(2);
    head->next->next->next = new ListNode(1);

    Solution solution;
    bool result = solution.isPalindrome(head);
    cout << (result ? "true" : "false") << endl;

    return 0;
}
```

### 总结：
- **C语言解法**：首先用快慢指针找到链表的中点，然后反转链表的后半部分，最后比较前半部分和后半部分的元素。时间复杂度是 `O(n)`，空间复杂度是 `O(1)`。
- **C++解法**：使用`ListNode`结构体定义链表节点，通过快慢指针找中点并反转链表后半部分，然后比较两部分的元素。代码简洁，利用了STL的标准功能，操作更加灵活。时间复杂度是 `O(n)`，空间复杂度是 `O(1)`。

两种解法均使用了反转链表的技巧，来比较链表的前后部分是否相同，适用于大部分链表回文问题。