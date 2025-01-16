---
layout: post
title:  "86. 分隔链表"
categories: arithmetic
---

[86. 分隔链表](https://leetcode.cn/problems/partition-list)

### 题目要求：

给定一个链表和一个值 `x`，将链表中的节点按照以下规则重新排列：
- 所有小于 `x` 的节点排在大于或等于 `x` 的节点之前。
- 保持原链表中各个节点的相对顺序。

返回重新排列后的链表。

#### 示例 1：
```
输入: head = [1, 4, 3, 2, 5, 2], x = 3
输出: [1, 2, 2, 4, 3, 5]
```

#### 示例 2：
```
输入: head = [2, 1], x = 2
输出: [1, 2]
```

#### 提示：
- 结点数目在 `1` 到 `200` 之间。
- `0 <= Node.val <= 100`
- `0 <= x <= 100`

### 解题思路：

这道题目要求将链表中小于 `x` 的节点移到大于等于 `x` 的节点之前，同时保持原链表中各节点的相对顺序。为了实现这一点，我们可以使用两个链表来分别保存小于 `x` 的节点和大于等于 `x` 的节点。最后，我们将这两个链表连接起来，形成最终的结果。

#### 具体步骤：
1. **分割链表**：我们遍历给定的链表，将小于 `x` 的节点添加到 `less` 链表中，将大于等于 `x` 的节点添加到 `greater` 链表中。
2. **连接链表**：最后将 `less` 链表和 `greater` 链表连接起来，返回连接后的链表。

#### 时间复杂度：
- 遍历链表的时间复杂度是 O(n)，其中 `n` 是链表的长度。
- 总的时间复杂度是 O(n)。

#### 空间复杂度：
- 我们使用了额外的空间来存储两个链表，所以空间复杂度是 O(n)。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
    struct ListNode(int x) : val(x), next(NULL) {}
};

// 函数：将链表按照给定值 x 进行分区
struct ListNode* partition(struct ListNode* head, int x) {
    // 创建两个虚拟头节点，分别用来存储小于 x 和大于等于 x 的节点
    struct ListNode *less = (struct ListNode*)malloc(sizeof(struct ListNode));
    struct ListNode *greater = (struct ListNode*)malloc(sizeof(struct ListNode));
    
    less->next = NULL;
    greater->next = NULL;

    struct ListNode *lessTail = less, *greaterTail = greater;

    // 遍历原链表，将节点分到两个链表
    while (head != NULL) {
        if (head->val < x) {
            lessTail->next = head;
            lessTail = lessTail->next;
        } else {
            greaterTail->next = head;
            greaterTail = greaterTail->next;
        }
        head = head->next;
    }

    // 将 greater 链表的尾部置为 NULL，防止出现环
    greaterTail->next = NULL;
    
    // 将两个链表连接起来
    lessTail->next = greater->next;
    
    // 返回结果链表的头节点
    struct ListNode *result = less->next;
    
    // 释放虚拟头节点的内存
    free(less);
    free(greater);
    
    return result;
}

// 辅助函数：打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d ", head->val);
        head = head->next;
    }
    printf("\n");
}

int main() {
    // 构造链表：1 -> 4 -> 3 -> 2 -> 5 -> 2
    struct ListNode *head = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->val = 1;
    head->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->val = 4;
    head->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->val = 3;
    head->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->val = 2;
    head->next->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->next->val = 5;
    head->next->next->next->next->next = (struct ListNode*)malloc(sizeof(struct ListNode));
    head->next->next->next->next->next->val = 2;
    head->next->next->next->next->next->next = NULL;

    // 调用函数
    struct ListNode* result = partition(head, 3);
    
    // 输出结果
    printList(result);

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
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        // 创建两个虚拟头节点，分别用来存储小于 x 和大于等于 x 的节点
        ListNode *less = new ListNode(0), *greater = new ListNode(0);
        
        ListNode *lessTail = less, *greaterTail = greater;
        
        // 遍历链表，将节点分到两个链表
        while (head != NULL) {
            if (head->val < x) {
                lessTail->next = head;
                lessTail = lessTail->next;
            } else {
                greaterTail->next = head;
                greaterTail = greaterTail->next;
            }
            head = head->next;
        }
        
        // 将 greater 链表的尾部置为 NULL，防止出现环
        greaterTail->next = NULL;
        
        // 将两个链表连接起来
        lessTail->next = greater->next;
        
        // 返回结果链表的头节点
        ListNode* result = less->next;
        
        // 释放虚拟头节点的内存
        delete less;
        delete greater;
        
        return result;
    }
};

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

    // 构造链表：1 -> 4 -> 3 -> 2 -> 5 -> 2
    ListNode* head = new ListNode(1);
    head->next = new ListNode(4);
    head->next->next = new ListNode(3);
    head->next->next->next = new ListNode(2);
    head->next->next->next->next = new ListNode(5);
    head->next->next->next->next->next = new ListNode(2);
    
    // 调用函数
    ListNode* result = sol.partition(head, 3);
    
    // 输出结果
    printList(result);
    
    return 0;
}
```

### 代码解析：

#### C语言：
1. **创建虚拟头节点**：为了简化链表操作，我们创建了两个虚拟的头节点 `less` 和 `greater`，分别用来存储小于 `x` 和大于等于 `x` 的节点。
2. **分割链表**：通过遍历原链表，将每个节点根据值是否小于 `x` 分配到不同的链表中。
3. **连接链表**：最后，我们将 `less` 链表和 `greater` 链表连接起来，返回结果链表的头节点。

#### C++：
1. **创建虚拟头节点**：与 C 语言版本相同，使用两个虚拟头节点来分别存储小于 `x` 和大于等于 `x` 的节点。
2. **分割链表**：遍历链表并分配节点到两个链表中。
3. **连接链表**：将两个链表连接在一起，形成最终的结果链表。

### 时间复杂度：
- **时间复杂度**：O(n)，其中 `n` 是链表的长度。我们只需要遍历一次链表。
- **空间复杂度**：O(1)，我们只使用了常数级别的额外空间来存储虚拟头节点和指针。

### 示例输出：

#### C语言：
```
1 2 2 4 3 5 
```

#### C++：
```
1 2 2 4 3 5 
```