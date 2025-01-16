---
layout: post
title:  "61. 旋转链表"
categories: arithmetic
---

[61. 旋转链表](https://leetcode.cn/problems/rotate-list)

### 题目要求

**题目名称**: 旋转链表

**题目描述**:  
给定一个链表，旋转链表，使得每个节点向右移动 `k` 个位置。

**输入**:  
- 一个链表头节点 `head`。
- 一个整数 `k`，表示链表旋转的步数。

**输出**:  
- 返回旋转后的链表的头节点。

**示例 1**:  
输入：  
`head = [1,2,3,4,5], k = 2`  
输出：  
`[4,5,1,2,3]`

**示例 2**:  
输入：  
`head = [0,1,2], k = 4`  
输出：  
`[2,0,1]`  
解释：  
`k` 对链表长度取模 `k % length`，得到 `k = 1`。

**提示**:  
- 链表中的节点数在范围 `[0, 500]` 内。
- `-100 <= Node.val <= 100`。
- `0 <= k <= 2 * 10^9`。

### 解题思路

1. **链表的长度计算**:  
   首先，我们需要计算链表的长度 `L`。这是因为链表旋转的步数 `k` 如果大于链表长度时，实际上旋转的效果是周期性的，因此我们只需要计算 `k % L` 来减少不必要的旋转次数。

2. **旋转位置的确定**:  
   旋转 `k` 步实际上是将链表分成两部分：  
   - 第一部分是从头节点开始，长度为 `L - k % L`。
   - 第二部分是链表的剩余部分，从 `L - k % L` 位置开始到最后。

3. **重新连接链表**:  
   - 先找到链表的尾节点。
   - 然后通过将尾节点的 `next` 指向链表的头节点来形成一个循环链表。
   - 最后，找到新的尾节点（即原来的倒数第 `k % L` 个节点），并将其 `next` 设置为 `nullptr`，形成一个新的链表。

4. **边界条件**:
   - 如果链表为空或者只有一个节点，直接返回头节点。
   - 如果 `k` 为 0 或者 `k` 是链表长度的整数倍，也无需旋转，直接返回原链表。

5. **时间复杂度**:  
   计算链表的长度是 O(n)，然后旋转链表也是 O(n)，因此总的时间复杂度是 O(n)，其中 n 是链表的节点数。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 计算链表的长度
int getLength(struct ListNode *head) {
    int length = 0;
    struct ListNode *current = head;
    while (current) {
        length++;
        current = current->next;
    }
    return length;
}

// 旋转链表
struct ListNode* rotateRight(struct ListNode* head, int k) {
    if (!head || !head->next || k == 0) return head;

    int length = getLength(head);  // 计算链表的长度
    k = k % length;  // 计算有效旋转步数

    if (k == 0) return head;  // 如果旋转步数为0，直接返回原链表

    struct ListNode *current = head;
    
    // 找到链表的尾节点
    for (int i = 1; i < length; i++) {
        current = current->next;
    }
    
    // 将尾节点的next指向头节点，形成环状链表
    current->next = head;
    
    // 找到新的尾节点，即倒数第k个节点
    struct ListNode *newTail = head;
    for (int i = 1; i < length - k; i++) {
        newTail = newTail->next;
    }
    
    // 新的头节点是新的尾节点的下一个节点
    struct ListNode *newHead = newTail->next;
    newTail->next = NULL;  // 断开环状链表，形成新的链表
    
    return newHead;
}

// 打印链表
void printList(struct ListNode *head) {
    while (head) {
        printf("%d ", head->val);
        head = head->next;
    }
    printf("\n");
}

int main() {
    // 示例：创建链表 [1, 2, 3, 4, 5]
    struct ListNode *head = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->val = 1;
    struct ListNode *second = (struct ListNode*)malloc(sizeof(struct ListNode));
    second->val = 2;
    struct ListNode *third = (struct ListNode*)malloc(sizeof(struct ListNode));
    third->val = 3;
    struct ListNode *fourth = (struct ListNode*)malloc(sizeof(struct ListNode));
    fourth->val = 4;
    struct ListNode *fifth = (struct ListNode*)malloc(sizeof(struct ListNode));
    fifth->val = 5;
    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;
    fifth->next = NULL;
    
    // 调用函数旋转链表
    int k = 2;
    struct ListNode *newHead = rotateRight(head, k);
    
    // 打印旋转后的链表
    printList(newHead);
    
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>

using namespace std;

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    // 计算链表的长度
    int getLength(ListNode* head) {
        int length = 0;
        ListNode* current = head;
        while (current) {
            length++;
            current = current->next;
        }
        return length;
    }

    // 旋转链表
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;

        int length = getLength(head);  // 计算链表的长度
        k = k % length;  // 计算有效旋转步数

        if (k == 0) return head;  // 如果旋转步数为0，直接返回原链表

        ListNode* current = head;
        
        // 找到链表的尾节点
        for (int i = 1; i < length; i++) {
            current = current->next;
        }
        
        // 将尾节点的next指向头节点，形成环状链表
        current->next = head;
        
        // 找到新的尾节点，即倒数第k个节点
        ListNode* newTail = head;
        for (int i = 1; i < length - k; i++) {
            newTail = newTail->next;
        }
        
        // 新的头节点是新的尾节点的下一个节点
        ListNode* newHead = newTail->next;
        newTail->next = NULL;  // 断开环状链表，形成新的链表
        
        return newHead;
    }
};

// 打印链表
void printList(ListNode* head) {
    while (head) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    // 示例：创建链表 [1, 2, 3, 4, 5]
    ListNode* head = new ListNode(1);
    ListNode* second = new ListNode(2);
    ListNode* third = new ListNode(3);
    ListNode* fourth = new ListNode(4);
    ListNode* fifth = new ListNode(5);
    head->next = second;
    second->next = third;
    third->next = fourth;
    fourth->next = fifth;

    // 调用函数旋转链表
    Solution solution;
    int k = 2;
    ListNode* newHead = solution.rotateRight(head, k);
    
    // 打印旋转后的链表
    printList(newHead);
    
    return 0;
}
```

### 说明

1. **C语言解答**:
   - 在 `rotateRight` 函数中，我们首先计算链表的长度，然后通过 `k % length` 确定有效的旋转步数。
   - 我们首先遍历链表，找到尾节点，并将尾节点的 `next` 指向头节点，形成一个环状链表。
   - 然后通过寻找倒数第 `k` 个节点，断开环状链表，形成新的链表。

2. **C++解答**:
   - 类 `Solution` 封装了旋转链表

的逻辑，代码与 C 语言解答的思路完全一致。
   - 使用 `ListNode` 类表示链表节点，`rotateRight` 方法完成旋转操作。

两种语言的解法在本质上是一致的，采用相同的思路来旋转链表。