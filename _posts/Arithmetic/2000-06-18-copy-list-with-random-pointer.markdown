---
layout: post
title:  "138. 随机链表的复制"
categories: arithmetic
---

[138. 随机链表的复制](https://leetcode.cn/problems/copy-list-with-random-pointer)

### 题目描述

**复制带随机指针的链表**：  
给定一个链表，每个节点包括一个 `next` 指针和一个 `random` 指针。`random` 指针可以指向链表中的任意节点或者 `null`。  
构造这个链表的深拷贝，并返回新链表的头节点。

#### 示例 1：
```
输入：
    7 -> 13 -> 11 -> 10 -> 1
    |     |     |     |     |
    v     v     v     v     v
    0     2     4     3     0
输出：
    7 -> 13 -> 11 -> 10 -> 1
    |     |     |     |     |
    v     v     v     v     v
    0     2     4     3     0
```

#### 示例 2：
```
输入：
    1 -> 2
    |     |
    v     v
    1     1
输出：
    1 -> 2
    |     |
    v     v
    1     1
```

#### 提示：
- `0 <= N <= 1000`
- 每个节点的 `random` 指针都可能为 `null` 或指向链表中的节点。

---

### 解题思路

1. **问题分析**：
   - 这是一个链表的深拷贝问题。每个节点不仅有 `next` 指针，还有 `random` 指针。我们的目标是复制原链表的每个节点，且新节点的 `next` 和 `random` 指针要正确地指向对应的节点。
   - 需要特别注意的是，`random` 指针的复制不同于 `next` 指针。`random` 指针可以指向链表中的任何节点，甚至是 `null`，而且不一定是顺序相邻的节点。

2. **解题思路**：
   - **第一步**：遍历原链表，复制每个节点。我们可以在原链表的节点后面直接插入一个新节点。新节点的 `next` 指针指向原节点的下一个节点，原节点的 `next` 指针指向新节点。这样我们就可以在不使用额外空间的情况下保持原链表和新链表的顺序。
   - **第二步**：遍历链表，为每个新节点的 `random` 指针赋值。由于新节点紧跟在原节点之后，所以原节点的 `random` 指向的节点的下一个节点就是新节点对应的 `random` 节点。
   - **第三步**：分离原链表和新链表，恢复原链表的结构，并返回新链表的头节点。

3. **算法步骤**：
   - 遍历原链表并插入新节点。
   - 遍历链表为新节点设置 `random` 指针。
   - 拆分链表，恢复原链表，并返回新链表。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构体
struct Node {
    int val;
    struct Node *next;
    struct Node *random;
};

// 创建新节点
struct Node* createNode(int val) {
    struct Node *newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->val = val;
    newNode->next = NULL;
    newNode->random = NULL;
    return newNode;
}

// 复制链表
struct Node* copyRandomList(struct Node* head) {
    if (!head) return NULL;
    
    // 第一步：在每个节点后插入一个新节点
    struct Node *cur = head;
    while (cur) {
        struct Node *newNode = createNode(cur->val);
        newNode->next = cur->next;
        cur->next = newNode;
        cur = newNode->next;
    }
    
    // 第二步：复制 random 指针
    cur = head;
    while (cur) {
        if (cur->random) {
            cur->next->random = cur->random->next;
        }
        cur = cur->next->next;
    }
    
    // 第三步：拆分链表，恢复原链表，构造新链表
    struct Node *newHead = head->next;
    struct Node *newCur = newHead;
    cur = head;
    while (cur) {
        cur->next = cur->next->next;  // 恢复原链表
        if (newCur->next) {
            newCur->next = newCur->next->next;  // 生成新链表
            newCur = newCur->next;
        }
        cur = cur->next;
    }
    
    return newHead;
}

// 测试用例
int main() {
    // 示例 1
    struct Node *head = createNode(7);
    head->next = createNode(13);
    head->next->next = createNode(11);
    head->next->next->next = createNode(10);
    head->next->next->next->next = createNode(1);
    
    head->random = NULL;
    head->next->random = head;
    head->next->next->random = head->next->next->next;
    head->next->next->next->random = head->next->next;
    head->next->next->next->next->random = head;

    struct Node *copiedList = copyRandomList(head);
    
    // 输出深拷贝链表（仅验证是否拷贝成功）
    struct Node *cur = copiedList;
    while (cur) {
        printf("Val: %d, Random Val: %d\n", cur->val, cur->random ? cur->random->val : -1);
        cur = cur->next;
    }
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构体
class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int x) : val(x), next(NULL), random(NULL) {}
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return NULL;
        
        // 第一步：在每个节点后插入一个新节点
        Node* cur = head;
        while (cur) {
            Node* newNode = new Node(cur->val);
            newNode->next = cur->next;
            cur->next = newNode;
            cur = newNode->next;
        }
        
        // 第二步：复制 random 指针
        cur = head;
        while (cur) {
            if (cur->random) {
                cur->next->random = cur->random->next;
            }
            cur = cur->next->next;
        }
        
        // 第三步：拆分链表，恢复原链表，构造新链表
        Node* newHead = head->next;
        Node* newCur = newHead;
        cur = head;
        while (cur) {
            cur->next = cur->next->next;  // 恢复原链表
            if (newCur->next) {
                newCur->next = newCur->next->next;  // 生成新链表
                newCur = newCur->next;
            }
            cur = cur->next;
        }
        
        return newHead;
    }
};

int main() {
    Solution solution;
    
    // 示例 1
    Node* head = new Node(7);
    head->next = new Node(13);
    head->next->next = new Node(11);
    head->next->next->next = new Node(10);
    head->next->next->next->next = new Node(1);
    
    head->random = NULL;
    head->next->random = head;
    head->next->next->random = head->next->next->next;
    head->next->next->next->random = head->next->next;
    head->next->next->next->next->random = head;

    Node* copiedList = solution.copyRandomList(head);
    
    // 输出深拷贝链表（仅验证是否拷贝成功）
    Node* cur = copiedList;
    while (cur) {
        cout << "Val: " << cur->val << ", Random Val: " << (cur->random ? cur->random->val : -1) << endl;
        cur = cur->next;
    }

    return 0;
}
```

### 解析

1. **步骤一：在每个节点后插入一个新节点**：
   - 为了方便后续的 `random` 指针赋值，我们将新节点插入到原节点之后。
   - 新节点的 `next` 指向原节点的下一个节点，原节点的 `next` 指向新节点。

2. **步骤二：复制 `random` 指针**：
   - 新节点紧跟在原节点后面，因此，原节点的 `random` 指向的节点的 `next` 节点就是新节点的 `random` 指针。

3. **步骤三：拆分链表**：
   - 恢复原链表的结构。


   - 构造新链表并返回。

4. **时间和空间复杂度**：
   - 时间复杂度：`O(n)`，需要遍历整个链表三次。
   - 空间复杂度：`O(1)`，只使用常数空间用于节点的插入和拆分。

---

### 总结
通过对链表的节点进行插入、修改和拆分，我们成功地完成了带 `random` 指针的链表的深拷贝。