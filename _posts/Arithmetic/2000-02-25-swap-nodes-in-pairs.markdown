---
layout: post
title:  "24. 两两交换链表中的节点"
categories: arithmetic
---

[24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs)

### 题目要求

**题目描述**  
给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。

你必须在不修改节点值的情况下，完成节点的交换。

**示例**

示例 1:

输入: `head = [1,2,3,4]`  
输出: `[2,1,4,3]`

示例 2:

输入: `head = []`  
输出: `[]`

示例 3:

输入: `head = [1]`  
输出: `[1]`

**提示**
- 链表中节点的数目在范围 `[0, 100]` 内。
- `0 <= Node.val <= 100`

### 解题思路

我们需要实现一个函数，它能交换链表中每两个相邻的节点。

**核心思路：**
1. 需要遍历链表，两个两个节点一交换。每次交换时，我们需要调整当前节点和下一节点的指针，确保链表连接不丢失。
2. 需要考虑头节点的变化，因为链表的交换可能改变头节点。
3. 每次交换两个节点时，递归的做下去，直到所有节点交换完。

### 具体步骤：

1. **设置虚拟头节点**：为了处理链表头部的变化，设立一个虚拟头节点 `dummy`，它指向原始链表的头节点。
2. **两两交换**：遍历链表，以两两为单位交换节点。
3. **调整指针**：在交换每对节点时，正确地更新指针。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 交换链表中每两节点
struct ListNode* swapPairs(struct ListNode* head) {
    // 创建一个虚拟头节点
    struct ListNode dummy;
    dummy.next = head;
    struct ListNode *prev = &dummy;
    
    // 遍历链表，处理每对相邻节点
    while (prev->next && prev->next->next) {
        // 指向当前需要交换的两个节点
        struct ListNode *first = prev->next;
        struct ListNode *second = first->next;
        
        // 执行交换操作
        first->next = second->next;
        second->next = first;
        prev->next = second;
        
        // 移动prev指针到交换后的节点
        prev = first;
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
    // 创建链表 [1, 2, 3, 4]
    struct ListNode *head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    
    // 打印原链表
    printf("Original list: ");
    printList(head);
    
    // 交换节点
    head = swapPairs(head);
    
    // 打印交换后的链表
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
    // 交换链表中每两节点
    ListNode* swapPairs(ListNode* head) {
        // 创建一个虚拟头节点
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;
        
        // 遍历链表，处理每对相邻节点
        while (prev->next && prev->next->next) {
            // 获取当前需要交换的两个节点
            ListNode* first = prev->next;
            ListNode* second = first->next;
            
            // 执行交换操作
            first->next = second->next;
            second->next = first;
            prev->next = second;
            
            // 更新prev指针
            prev = first;
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
    
    // 创建链表 [1, 2, 3, 4]
    ListNode* head = createNode(1);
    head->next = createNode(2);
    head->next->next = createNode(3);
    head->next->next->next = createNode(4);
    
    // 打印原链表
    cout << "Original list: ";
    printList(head);
    
    // 交换节点
    head = sol.swapPairs(head);
    
    // 打印交换后的链表
    cout << "Modified list: ";
    printList(head);
    
    return 0;
}
```

### 代码解析：
1. **链表节点结构**：
   - 在C语言中使用 `struct ListNode` 定义链表节点结构。
   - 在C++中使用 `struct ListNode` 定义，并通过构造函数简化创建节点的过程。

2. **交换过程**：
   - 创建一个虚拟头节点 `dummy`，它指向链表的头节点，方便操作。
   - 使用一个 `prev` 指针来指向当前交换对的前一个节点。
   - 对每一对相邻的节点，交换它们的位置，并更新指针关系。
   
3. **辅助函数**：
   - `createNode` 用于创建新的节点。
   - `printList` 用于输出链表。

4. **主函数**：
   - 创建一个测试链表 `[1, 2, 3, 4]`，然后调用 `swapPairs` 函数进行交换，并输出交换前后的链表。

### 时间复杂度：
- **O(n)**，其中 `n` 是链表的节点数。我们只需要遍历一次链表。

### 空间复杂度：
- **O(1)**，只使用了常数级别的额外空间。