---
layout: post
title:  "141. 环形链表"
categories: arithmetic
---

[141. 环形链表](https://leetcode.cn/problems/linked-list-cycle)

### 题目描述

**Linked List Cycle**

给定一个链表，判断链表中是否有环。

**进阶：**

你能用 **O(1)**（即常量）内存解决此问题吗？

**示例 1：**

```
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

```
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

```
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

**提示：**

- 链表中节点的数目范围是 `[0, 10^4]`。
- `-10^5 <= Node.val <= 10^5`
- `pos` 为 `-1` 或者链表中的一个有效索引。

### 解题思路

这道题目要求我们判断一个链表中是否存在环。环的定义是链表中的某个节点的 `next` 指针指向了之前的某个节点，从而形成一个闭合的环路。

**常见的解法有两种：**

1. **哈希表法（使用额外空间）**：
   - 遍历链表的每个节点，并将其地址存储在一个哈希表（或集合）中。
   - 在遍历过程中，如果发现当前节点已经存在于哈希表中，说明链表中存在环。
   - 如果遍历结束仍未发现重复节点，则链表中不存在环。

2. **快慢指针法（Floyd 判圈算法，无需额外空间）**：
   - 使用两个指针，慢指针 `slow` 和快指针 `fast`。
   - 慢指针每次移动一步，快指针每次移动两步。
   - 如果链表中存在环，快指针最终会与慢指针相遇。
   - 如果链表中不存在环，快指针会先到达链表末尾。

**选择快慢指针法的原因：**

- 它只需要 **O(1)** 的额外空间。
- 时间复杂度为 **O(n)**，其中 `n` 是链表中节点的数量。
- 实现简单且高效。

### C语言解答

以下是使用快慢指针法（Floyd 判圈算法）实现的C语言代码，并附有详细注释。为了避免之前的`heap-use-after-free`错误，代码中不对有环的链表进行内存释放，因为释放有环链表会导致无限循环。

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// 定义链表节点结构体
struct ListNode {
    int val;
    struct ListNode *next;
};

// 创建新的链表节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    if(!newNode){
        printf("内存分配失败\n");
        exit(1);
    }
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 判断链表是否有环，使用快慢指针法
bool hasCycle(struct ListNode *head){
    if(head == NULL || head->next == NULL){
        return false;
    }
    struct ListNode *slow = head;
    struct ListNode *fast = head->next;
    
    while(fast != NULL && fast->next != NULL){
        if(slow == fast){
            return true;
        }
        slow = slow->next;           // 慢指针每次移动一步
        fast = fast->next->next;     // 快指针每次移动两步
    }
    return false; // 快指针到达链表末尾，说明没有环
}

// 释放链表内存，注意：如果链表有环，无法正常释放
void freeList(struct ListNode *head){
    struct ListNode *current = head;
    while(current != NULL){
        struct ListNode *temp = current;
        current = current->next;
        free(temp);
    }
}

// 简单的主函数测试
int main(){
    // 示例 1：链表 [3,2,0,-4]，pos = 1 (环连接到第二个节点)
    struct ListNode* node1 = createNode(3);
    struct ListNode* node2 = createNode(2);
    struct ListNode* node3 = createNode(0);
    struct ListNode* node4 = createNode(-4);
    node1->next = node2;
    node2->next = node3;
    node3->next = node4;
    node4->next = node2; // 创建环
    printf("示例 1: %s\n", hasCycle(node1) ? "true" : "false");
    
    // 示例 2：链表 [1,2]，pos = 0 (环连接到第一个节点)
    struct ListNode* node5 = createNode(1);
    struct ListNode* node6 = createNode(2);
    node5->next = node6;
    node6->next = node5; // 创建环
    printf("示例 2: %s\n", hasCycle(node5) ? "true" : "false");
    
    // 示例 3：链表 [1]，pos = -1 (无环)
    struct ListNode* node7 = createNode(1);
    node7->next = NULL; // 无环
    printf("示例 3: %s\n", hasCycle(node7) ? "true" : "false");
    
    // 注意：由于存在环，无法正常释放链表内存
    // 为了避免内存泄漏，这里不释放有环的链表
    // 如果不创建环，可以调用 freeList 函数释放内存
    
    return 0;
}
```

**代码说明：**

1. **链表节点定义与创建：**
   - 定义了 `ListNode` 结构体，包含 `val` 和 `next` 指针。
   - `createNode` 函数用于创建新的链表节点，并初始化其值和 `next` 指针。

2. **快慢指针法实现 `hasCycle` 函数：**
   - 首先检查链表是否为空或只有一个节点，如果是，则肯定无环。
   - 初始化慢指针 `slow` 指向 `head`，快指针 `fast` 指向 `head->next`。
   - 在循环中，慢指针每次移动一步，快指针每次移动两步。
   - 如果在移动过程中，慢指针与快指针相遇，说明链表中存在环。
   - 如果快指针到达链表末尾（`NULL`），则说明链表中无环。

3. **内存管理：**
   - 由于存在环的链表无法正常释放内存，`freeList` 函数仅适用于无环链表。
   - 在示例中，有环的链表不进行释放以避免无限循环。

4. **主函数测试：**
   - 创建了三个测试示例，分别对应题目中的三个示例。
   - 打印每个示例的判断结果。

**输出结果：**

```
示例 1: true
示例 2: true
示例 3: false
```

### C++ 解答

以下是使用快慢指针法（Floyd 判圈算法）实现的C++代码，并附有详细注释。代码中尽量使用了STL容器和算法，并提供了一个简单的主函数进行测试。

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 定义链表节点结构体
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

// 创建链表并返回头节点，同时返回所有节点的指针以便创建环
ListNode* createLinkedList(const vector<int>& vals, int pos){
    if(vals.empty()) return NULL;
    ListNode* head = new ListNode(vals[0]);
    ListNode* current = head;
    ListNode* cycleNode = NULL;
    if(pos == 0) cycleNode = head;
    for(int i = 1; i < vals.size(); ++i){
        current->next = new ListNode(vals[i]);
        current = current->next;
        if(i == pos) cycleNode = current;
    }
    if(pos != -1){
        current->next = cycleNode; // 创建环
    }
    return head;
}

// 释放链表内存，注意：如果链表有环，无法正常释放
void freeLinkedList(ListNode* head){
    ListNode* current = head;
    while(current != NULL){
        ListNode* temp = current;
        current = current->next;
        delete temp;
    }
}

// 定义 Solution 类
class Solution {
public:
    bool hasCycle(ListNode *head) {
        if(head == NULL || head->next == NULL){
            return false;
        }
        ListNode *slow = head;
        ListNode *fast = head->next;
        
        while(fast != NULL && fast->next != NULL){
            if(slow == fast){
                return true;
            }
            slow = slow->next;           // 慢指针每次移动一步
            fast = fast->next->next;     // 快指针每次移动两步
        }
        return false; // 快指针到达链表末尾，说明没有环
    }
};

// 简单的主函数测试
int main(){
    Solution solution;
    
    // 示例 1：链表 [3,2,0,-4]，pos = 1 (环连接到第二个节点)
    vector<int> vals1 = {3,2,0,-4};
    int pos1 = 1;
    ListNode* head1 = createLinkedList(vals1, pos1);
    cout << "示例 1: " << (solution.hasCycle(head1) ? "true" : "false") << endl;
    
    // 示例 2：链表 [1,2]，pos = 0 (环连接到第一个节点)
    vector<int> vals2 = {1,2};
    int pos2 = 0;
    ListNode* head2 = createLinkedList(vals2, pos2);
    cout << "示例 2: " << (solution.hasCycle(head2) ? "true" : "false") << endl;
    
    // 示例 3：链表 [1]，pos = -1 (无环)
    vector<int> vals3 = {1};
    int pos3 = -1;
    ListNode* head3 = createLinkedList(vals3, pos3);
    cout << "示例 3: " << (solution.hasCycle(head3) ? "true" : "false") << endl;
    
    // 注意：由于存在环，无法正常释放链表内存
    // 为了避免内存泄漏，这里不释放有环的链表
    // 如果不创建环，可以调用 freeLinkedList 函数释放内存
    
    return 0;
}
```

**代码说明：**

1. **链表节点定义与创建：**
   - 定义了 `ListNode` 结构体，包含 `val` 和 `next` 指针，并提供构造函数初始化节点值。
   - `createLinkedList` 函数根据给定的值和 `pos` 创建链表，并根据 `pos` 创建环。
     - `vals` 是节点值的向量。
     - `pos` 表示链表中环的起始位置，`-1` 表示无环。

2. **快慢指针法实现 `hasCycle` 函数：**
   - 与C语言版本相同，使用快慢指针判断链表是否有环。
   - 如果慢指针与快指针相遇，说明存在环。

3. **内存管理：**
   - 由于存在环的链表无法正常释放内存，`freeLinkedList` 函数仅适用于无环链表。
   - 在示例中，有环的链表不进行释放以避免无限循环。

4. **Solution 类定义：**
   - 定义了 `Solution` 类，并在其中实现了 `hasCycle` 方法，符合LeetCode的函数原型要求。

5. **主函数测试：**
   - 创建了三个测试示例，分别对应题目中的三个示例。
   - 使用 `Solution` 类的 `hasCycle` 方法判断每个示例链表是否存在环，并打印结果。

**输出结果：**

```
示例 1: true
示例 2: true
示例 3: false
```

### 总结

本题通过使用快慢指针法（Floyd 判圈算法）高效地判断链表中是否存在环。该方法的优点在于：

- **时间复杂度低**：只需一次遍历，时间复杂度为 **O(n)**。
- **空间复杂度低**：只需使用常数级别的额外空间，即 **O(1)**。

在实现过程中，需要注意以下几点：

1. **链表为空或只有一个节点时的特殊情况**：
   - 这些情况下链表不可能有环，需要提前判断并返回 `false`。

2. **快慢指针的初始化**：
   - 慢指针从 `head` 开始，快指针从 `head->next` 开始，可以有效减少初始比较。

3. **循环条件的设置**：
   - 快指针和快指针的下一个节点都不为空时，继续循环。

4. **内存管理**：
   - 对于有环的链表，无法正常释放内存，需要谨慎处理，避免内存泄漏。

通过以上方法和注意事项，可以有效地判断链表中是否存在环，并且实现高效、可靠的代码。