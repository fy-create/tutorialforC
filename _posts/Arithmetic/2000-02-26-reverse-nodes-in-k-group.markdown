---
layout: post
title:  "25. K 个一组翻转链表"
categories: arithmetic
---

[25. K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group)

### 题目要求

**题目描述**  
给定一个链表，编写一个函数使得链表中的节点每 `k` 个一组进行反转。如果链表中的节点总数不是 `k` 的倍数，则最后剩下的节点保持原样。

你不能只是单纯的改变节点的值，必须实际进行节点交换。

**示例**

示例 1:
```
输入: head = [1,2,3,4,5], k = 2  
输出: [2,1,4,3,5]
```

示例 2:
```
输入: head = [1,2,3,4,5], k = 3  
输出: [3,2,1,4,5]
```

示例 3:
```
输入: head = [1,2,3,4,5], k = 6  
输出: [1,2,3,4,5]  
解释: 因为 k = 6 > 链表长度，所以不进行反转。
```

**提示**
- `k` 的值大于等于 1 且小于等于链表的长度。
- 链表的节点数目不会超过 10^4。

### 解题思路

为了实现每 `k` 个节点一组进行反转，我们可以按以下步骤进行操作：

1. **判断链表是否有足够的节点**：在每次反转操作之前，需要确保当前剩余的节点数量大于等于 `k`，如果不足 `k` 个节点，直接返回原链表。
2. **反转 `k` 个节点**：在每一轮中，逆序排列 `k` 个节点。我们可以通过使用三个指针来实现节点反转：当前节点指针 `curr`，前一个节点指针 `prev`，以及下一个节点指针 `next`。
3. **更新链表连接**：反转 `k` 个节点后，我们需要确保这些节点的顺序已经正确，同时更新它们与未反转部分的连接。
4. **递归处理剩余部分**：反转完成后，继续处理剩余的链表，直到剩余节点少于 `k`。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 反转链表的前k个节点
struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    // 创建一个虚拟头节点
    struct ListNode dummy;
    dummy.next = head;
    struct ListNode *prevGroupEnd = &dummy;
    
    while (head) {
        struct ListNode *tail = head;
        
        // 找到下一组的尾节点
        for (int i = 1; i < k && tail != NULL; i++) {
            tail = tail->next;
        }
        
        // 如果剩余节点数少于k个，不反转，直接退出
        if (tail == NULL) break;
        
        // 记录当前组的尾节点和下一组的起始节点
        struct ListNode *nextGroupStart = tail->next;
        struct ListNode *prev = nextGroupStart;
        struct ListNode *curr = head;
        
        // 反转当前k个节点
        while (curr != nextGroupStart) {
            struct ListNode *next = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        
        // 连接反转后的节点到前面的部分
        prevGroupEnd->next = tail;
        head->next = nextGroupStart;
        
        // 更新prevGroupEnd为反转后的部分尾节点
        prevGroupEnd = head;
        
        // 移动到下一组
        head = nextGroupStart;
    }
    
    return dummy.next;
}

// 辅助函数：创建新节点
struct ListNode* createNode(int val) {
    struct ListNode *newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 辅助函数：打印链表
void printList(struct ListNode *head) {
    struct ListNode *current = head;
    while (current != NULL) {
        printf("%d ", current->val);
        current = current->next;
    }
    printf("\n");
}

int main() {
    // 创建链表 [1, 2, 3, 4, 5]
    struct ListNode *head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);
    
    // 打印原链表
    printf("Original list: ");
    printList(head);
    
    // 反转每k个节点
    head = reverseKGroup(head, 3);
    
    // 打印反转后的链表
    printf("Modified list: ");
    printList(head);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    // 反转链表的前k个节点
    ListNode* reverseKGroup(ListNode* head, int k) {
        // 创建一个虚拟头节点
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prevGroupEnd = &dummy;
        
        while (head) {
            ListNode* tail = head;
            
            // 找到下一组的尾节点
            for (int i = 1; i < k && tail != NULL; i++) {
                tail = tail->next;
            }
            
            // 如果剩余节点数少于k个，不反转，直接退出
            if (tail == NULL) break;
            
            // 记录当前组的尾节点和下一组的起始节点
            ListNode* nextGroupStart = tail->next;
            ListNode* prev = nextGroupStart;
            ListNode* curr = head;
            
            // 反转当前k个节点
            while (curr != nextGroupStart) {
                ListNode* next = curr->next;
                curr->next = prev;
                prev = curr;
                curr = next;
            }
            
            // 连接反转后的节点到前面的部分
            prevGroupEnd->next = tail;
            head->next = nextGroupStart;
            
            // 更新prevGroupEnd为反转后的部分尾节点
            prevGroupEnd = head;
            
            // 移动到下一组
            head = nextGroupStart;
        }
        
        return dummy.next;
    }
};

// 辅助函数：创建新节点
ListNode* createNode(int val) {
    return new ListNode(val);
}

// 辅助函数：打印链表
void printList(ListNode* head) {
    while (head != NULL) {
        cout << head->val << " ";
        head = head->next;
    }
    cout << endl;
}

int main() {
    Solution sol;
    
    // 创建链表 [1, 2, 3, 4, 5]
    ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    head->next->next->next->next = createNode(5);
    
    // 打印原链表
    cout << "Original list: ";
    printList(head);
    
    // 反转每k个节点
    head = sol.reverseKGroup(head, 3);
    
    // 打印反转后的链表
    cout << "Modified list: ";
    printList(head);
    
    return 0;
}
```

### 代码解析：

1. **链表节点结构**：
   - 在C语言中使用 `struct ListNode` 定义链表节点结构。
   - 在C++中使用 `struct ListNode` 定义，并通过构造函数简化创建节点的过程。

2. **核心函数 `reverseKGroup`**：
   - 我们首先使用一个虚拟头节点 `dummy`，确保链表的头部可以处理。
   - 在遍历链表时，我们每次找到 `k` 个节点，如果节点不足 `k` 个，则直接退出。
   - 对每一组 `k` 个节点，进行反转操作，然后更新链表的指针连接。
   - 每组反转结束后，更新 `prevGroupEnd` 指针，指向反转后的尾部。

3. **辅助函数**：
   - `createNode` 用于创建新的节点。
   - `printList` 用于输出链表。

4. **主函数**：
   - 创建一个测试链表 `[1, 2, 3, 4, 5]`，然后调用 `reverseKGroup` 函数进行反转，并输出反转前后的链表。

### 时间复杂度：
- **O(n)**，其中 `n` 是链表的

节点数。每个节点仅被访问一次。

### 空间复杂度：
- **O(1)**，只使用了常数级别的额外空间。