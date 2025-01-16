---
layout: post
title:  "21. 合并两个有序链表"
categories: arithmetic
---

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists)

### 题目：合并两个有序链表 (Merge Two Sorted Lists)

#### 题目要求：
将两个有序链表合并为一个新的有序链表，并返回新的链表。新链表由两个输入链表的节点组成，并且必须满足合并后的顺序。

#### 示例 1：
```
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
```

#### 示例 2：
```
输入：l1 = [], l2 = [0]
输出：[0]
```

#### 示例 3：
```
输入：l1 = [], l2 = []
输出：[]
```

#### 提示：
- 两个链表的元素数目范围为 `[0, 50]`。
- `-100 <= Node.val <= 100`
- 两个链表均按升序排列。

---

### 解题思路：

本题的关键是合并两个已经排好序的链表。由于两个链表本身已经是排序的，所以我们可以使用 **双指针** 的方法，逐一比较两个链表的当前节点值，将较小的节点加入新的链表。直到其中一个链表遍历完成，将另一个链表的剩余部分直接接到新链表的末尾。

#### 具体步骤：
1. 初始化一个虚拟头节点 `dummy`，该节点的作用是简化处理头结点的插入操作。
2. 使用两个指针 `p1` 和 `p2` 分别指向两个链表的头节点，另外一个指针 `current` 用来操作新的链表。
3. 比较 `p1` 和 `p2` 指向的节点，较小的节点插入新的链表中，并且对应的指针向后移动。
4. 如果 `p1` 或 `p2` 指向的链表已经遍历完了，将另一个链表的剩余部分接到新的链表中。
5. 最后返回虚拟头节点的下一个节点，即为合并后的链表。

---

### C 语言解法：

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构体
struct ListNode {
    int val;
    struct ListNode *next;
};

// 创建新的节点
struct ListNode* createNode(int val) {
    struct ListNode* node = (struct ListNode*)malloc(sizeof(struct ListNode));
    node->val = val;
    node->next = NULL;
    return node;
}

// 合并两个有序链表
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode* dummy = createNode(0); // 虚拟头节点
    struct ListNode* current = dummy;

    // 双指针合并两个链表
    while (l1 != NULL && l2 != NULL) {
        if (l1->val < l2->val) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }
        current = current->next;
    }

    // 如果l1还有剩余节点，连接l1
    if (l1 != NULL) {
        current->next = l1;
    }
    
    // 如果l2还有剩余节点，连接l2
    if (l2 != NULL) {
        current->next = l2;
    }

    return dummy->next; // 返回合并后的链表头节点
}

// 打印链表
void printList(struct ListNode* head) {
    while (head != NULL) {
        printf("%d ", head->val);
        head = head->next;
    }
    printf("\n");
}

// 主函数
int main() {
    // 示例链表 l1: 1 -> 2 -> 4, l2: 1 -> 3 -> 4
    struct ListNode* l1 = createNode(1);
    l1->next = createNode(2);
    l1->next->next = createNode(4);
    
    struct ListNode* l2 = createNode(1);
    l2->next = createNode(3);
    l2->next->next = createNode(4);
    
    struct ListNode* mergedList = mergeTwoLists(l1, l2);
    printList(mergedList);
    
    return 0;
}
```

### 代码解释：

1. **`createNode`** 函数用于创建一个新的链表节点，便于链表操作。
2. **`mergeTwoLists`** 函数合并两个有序链表，使用一个虚拟头节点 `dummy` 来简化边界情况的处理。通过双指针法遍历两个链表并将较小的节点接入新链表。
3. **`printList`** 函数用于打印链表。
4. 在 `main` 函数中，创建了两个链表 `l1` 和 `l2`，并调用 `mergeTwoLists` 函数进行合并，最后打印合并后的链表。

---

### C++ 解法：

```cpp
#include <iostream>
using namespace std;

// 定义链表节点结构体
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0); // 虚拟头节点
        ListNode* current = dummy;

        // 双指针合并两个链表
        while (l1 != NULL && l2 != NULL) {
            if (l1->val < l2->val) {
                current->next = l1;
                l1 = l1->next;
            } else {
                current->next = l2;
                l2 = l2->next;
            }
            current = current->next;
        }

        // 如果l1还有剩余节点，连接l1
        if (l1 != NULL) {
            current->next = l1;
        }

        // 如果l2还有剩余节点，连接l2
        if (l2 != NULL) {
            current->next = l2;
        }

        return dummy->next; // 返回合并后的链表头节点
    }

    // 打印链表
    void printList(ListNode* head) {
        while (head != NULL) {
            cout << head->val << " ";
            head = head->next;
        }
        cout << endl;
    }
};

int main() {
    Solution solution;

    // 示例链表 l1: 1 -> 2 -> 4, l2: 1 -> 3 -> 4
    ListNode* l1 = new ListNode(1);
    l1->next = new ListNode(2);
    l1->next->next = new ListNode(4);
    
    ListNode* l2 = new ListNode(1);
    l2->next = new ListNode(3);
    l2->next->next = new ListNode(4);
    
    ListNode* mergedList = solution.mergeTwoLists(l1, l2);
    solution.printList(mergedList);

    return 0;
}
```

### 代码解释：

1. **ListNode 结构体**：定义了链表节点结构，包含一个 `val` 成员和指向下一个节点的指针 `next`。
2. **`mergeTwoLists` 函数**：合并两个有序链表，方法与 C 语言中的相同，使用虚拟头节点 `dummy`，并使用两个指针遍历链表。
3. **`printList` 函数**：用于打印链表，方便检查合并后的结果。
4. **`main` 函数**：创建两个链表 `l1` 和 `l2`，并调用 `mergeTwoLists` 函数进行合并，最后打印合并后的链表。

---

### 时间复杂度：
- **时间复杂度**：`O(m + n)`，其中 `m` 和 `n` 分别是两个链表的长度。我们需要遍历两个链表每个节点一次。
- **空间复杂度**：`O(1)`，忽略返回链表的空间使用，实际使用的空间是常数的，虚拟头节点不计入空间复杂度。

### 示例输出：
```
1 1 2 3 4 4
```