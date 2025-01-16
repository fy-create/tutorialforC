---
layout: post
title:  "142. 环形链表 II"
categories: arithmetic
---

[142. 环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii)

### 题目描述

给定一个链表的头节点 `head`，返回链表开始入环的第一个节点。如果链表中无环，则返回 `null`。

如果链表中存在某个节点，可以通过连续跟踪 `next` 指针再次到达，则链表中存在环。为了表示给定链表中的环，评测系统内部使用整数 `pos` 表示链表尾连接到链表中的位置（索引从 0 开始）。如果 `pos` 是 `-1`，则在该链表中没有环。

**注意**：`pos` 不作为参数进行传递，仅仅是为了标识链表的实际情况。

---

**示例 1：**

```
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
```

**示例 2：**

```
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
```

**示例 3：**

```
输入：head = [1], pos = -1
输出：null
解释：链表中没有环。
```

---

**提示：**

- 链表中节点的数目范围为 `[0, 10⁴]`。
- `-10⁵ <= Node.val <= 10⁵`
- `pos` 为 `-1` 或链表中的一个有效索引。

---

### 解题思路

1. **检测环的存在性**：
   - 使用 **快慢指针法**：
     - 定义两个指针，慢指针 `slow` 每次移动一步，快指针 `fast` 每次移动两步。
     - 如果 `fast` 和 `fast->next` 为 `NULL`，则链表无环。
     - 如果 `slow` 和 `fast` 相遇，则链表有环。

2. **找到环的入口**：
   - 当 `slow` 和 `fast` 相遇时：
     - 将 `slow` 指针移回链表头。
     - 然后同时移动 `slow` 和 `fast`，每次移动一步。
     - 当两者再次相遇时，相遇点即为环的入口。

3. **时间复杂度**：
   - 检测环的时间复杂度为 O(n)。
   - 找到环的入口的时间复杂度为 O(n)。
   - 总时间复杂度为 O(n)。

4. **空间复杂度**：
   - 使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点
struct ListNode {
    int val;
    struct ListNode* next;
};

// 检测环的入口节点
struct ListNode* detectCycle(struct ListNode* head) {
    if (!head || !head->next) {
        return NULL;
    }

    struct ListNode* slow = head;
    struct ListNode* fast = head;

    // 快慢指针检测是否有环
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            // 找到环的入口
            slow = head;
            while (slow != fast) {
                slow = slow->next;
                fast = fast->next;
            }
            return slow; // 返回环的入口
        }
    }

    return NULL; // 无环
}

// 辅助函数：创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 测试函数
int main() {
    struct ListNode* head = createNode(3);
    head->next = createNode(2);
    head->next->next = createNode(0);
    head->next->next->next = createNode(-4);
    head->next->next->next->next = head->next; // 创建环

    struct ListNode* entry = detectCycle(head);
    if (entry) {
        printf("环的入口节点值: %d\n", entry->val);
    } else {
        printf("链表无环\n");
    }

    return 0;
}
```

---

### C++ 语言实现

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
    ListNode* detectCycle(ListNode* head) {
        if (!head || !head->next) {
            return nullptr;
        }

        ListNode* slow = head;
        ListNode* fast = head;

        // 快慢指针检测是否有环
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;

            if (slow == fast) {
                // 找到环的入口
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow; // 返回环的入口
            }
        }

        return nullptr; // 无环
    }
};

// 测试函数
int main() {
    ListNode* head = new ListNode(3);
    head->next = new ListNode(2);
    head->next->next = new ListNode(0);
    head->next->next->next = new ListNode(-4);
    head->next->next->next->next = head->next; // 创建环

    Solution sol;
    ListNode* entry = sol.detectCycle(head);
    if (entry) {
        cout << "环的入口节点值: " << entry->val << endl;
    } else {
        cout << "链表无环" << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **快慢指针法**：
   - 快慢指针同时移动，检测是否有环。
   - 两指针相遇后，通过调整其中一个指针回到链表头，找到环的入口。

2. **时间复杂度**：
   - 快慢指针遍历链表一次，复杂度为 O(n)。

3. **空间复杂度**：
   - 使用常量空间，复杂度为 O(1)。

4. **测试用例**：
   - 包含环的链表。
   - 无环的链表。