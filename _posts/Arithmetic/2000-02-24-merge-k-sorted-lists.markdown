---
layout: post
title:  "23. 合并 K 个升序链表"
categories: arithmetic
---

[23. 合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists)

### 题目描述

合并 `k` 个升序链表，返回合并后的升序链表。

---

**示例 1：**

```
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个升序链表中得到。
```

**示例 2：**

```
输入：lists = []
输出：[]
```

**示例 3：**

```
输入：lists = [[]]
输出：[]
```

---

**提示：**

- `k == lists.length`
- `0 <= k <= 10^4`
- `0 <= lists[i].length <= 500`
- `-10^4 <= lists[i][j] <= 10^4`
- `lists[i]` 按 **升序** 排列
- `lists[i].length` 的总和不超过 `10^4`

---

### 解题思路

要合并 `k` 个升序链表，可以使用**最小堆（优先队列）**来实现高效合并。

#### 核心思路：
1. **最小堆辅助：** 使用最小堆存储每个链表的当前节点，堆顶元素即为当前最小值。
2. **初始化堆：** 将每个链表的头节点加入最小堆。
3. **构建结果链表：** 依次取出堆顶元素，将其添加到结果链表中，然后将该元素所在链表的下一个节点加入堆中。重复此过程，直到堆为空。
4. **时间复杂度：** 由于每次插入和删除堆的操作时间复杂度为 `O(log k)`，总共有 `n` 个节点需要处理，因此总体时间复杂度为 `O(n log k)`。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 定义链表节点结构
struct ListNode {
    int val;
    struct ListNode *next;
};

// 定义最小堆节点结构
struct HeapNode {
    int val;
    struct ListNode *node;
};

// 交换堆节点
void swap(struct HeapNode *a, struct HeapNode *b) {
    struct HeapNode temp = *a;
    *a = *b;
    *b = temp;
}

// 最小堆调整函数
void heapify(struct HeapNode heap[], int size, int i) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < size && heap[left].val < heap[smallest].val)
        smallest = left;
    if (right < size && heap[right].val < heap[smallest].val)
        smallest = right;
    if (smallest != i) {
        swap(&heap[i], &heap[smallest]);
        heapify(heap, size, smallest);
    }
}

// 从堆中取出最小元素
struct HeapNode extractMin(struct HeapNode heap[], int *size) {
    struct HeapNode root = heap[0];
    heap[0] = heap[--(*size)];
    heapify(heap, *size, 0);
    return root;
}

// 向堆中插入新元素
void insertHeap(struct HeapNode heap[], int *size, struct HeapNode newNode) {
    int i = (*size)++;
    heap[i] = newNode;
    while (i && heap[(i - 1) / 2].val > heap[i].val) {
        swap(&heap[i], &heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

// 合并 k 个升序链表
struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;

    // 创建最小堆
    struct HeapNode *heap = (struct HeapNode *)malloc(listsSize * sizeof(struct HeapNode));
    int heapSize = 0;

    // 初始化堆，加入每个链表的头节点
    for (int i = 0; i < listsSize; i++) {
        if (lists[i] != NULL) {
            struct HeapNode newNode = {lists[i]->val, lists[i]};
            insertHeap(heap, &heapSize, newNode);
        }
    }

    // 创建虚拟头节点
    struct ListNode dummy;
    struct ListNode *tail = &dummy;
    dummy.next = NULL;

    // 构建结果链表
    while (heapSize > 0) {
        // 取出堆顶元素
        struct HeapNode minNode = extractMin(heap, &heapSize);
        tail->next = minNode.node;
        tail = tail->next;

        // 将下一个节点加入堆
        if (minNode.node->next != NULL) {
            struct HeapNode newNode = {minNode.node->next->val, minNode.node->next};
            insertHeap(heap, &heapSize, newNode);
        }
    }

    free(heap);
    return dummy.next;
}

// 辅助函数：创建新节点
struct ListNode* createNode(int val) {
    struct ListNode* newNode = (struct ListNode*)malloc(sizeof(struct ListNode));
    newNode->val = val;
    newNode->next = NULL;
    return newNode;
}

// 辅助函数：打印链表
void printList(struct ListNode* head) {
    struct ListNode* current = head;
    while (current != NULL) {
        printf("%d -> ", current->val);
        current = current->next;
    }
    printf("NULL\n");
}

// 测试函数
int main() {
    // 创建示例链表
    struct ListNode* list1 = createNode(1);
    list1->next = createNode(4);
    list1->next->next = createNode(5);

    struct ListNode* list2 = createNode(1);
    list2->next = createNode(3);
    list2->next->next = createNode(4);

    struct ListNode* list3 = createNode(2);
    list3->next = createNode(6);

    struct ListNode* lists[] = {list1, list2, list3};

    printf("合并后的链表:\n");
    struct ListNode* mergedList = mergeKLists(lists, 3);
    printList(mergedList);

    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

// 定义链表节点结构
struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// 定义比较器，用于优先队列
struct Compare {
    bool operator()(ListNode* a, ListNode* b) {
        return a->val > b->val;
    }
};

class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;

        // 初始化最小堆
        for (auto list : lists) {
            if (list != nullptr) {
                minHeap.push(list);
            }
        }

        // 创建虚拟头节点
        ListNode dummy(0);
        ListNode* tail = &dummy;

        // 构建结果链表
        while (!minHeap.empty()) {
            ListNode* minNode = minHeap.top();
            minHeap.pop();
            tail->next = minNode;
            tail = tail->next;

            if (minNode->next != nullptr) {
                minHeap.push(minNode->next);
            }
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
    ListNode* current = head;
    while (current != nullptr) {
        cout << current->val << " -> ";
        current = current->next;
    }
    cout << "NULL" << endl;
}

// 测试函数
int main() {
    // 创建示例链表
    ListNode* list1 = createNode(1);
    list1->next = createNode(4);
    list1->next->next = createNode(5);

    ListNode* list2 = createNode(1);
    list2->next = createNode(3);
    list2->next->next = createNode(4);

    ListNode* list3 = createNode(2);
    list3->next = createNode(6);

    vector<ListNode*> lists = {list1, list2, list3};

    Solution solution;
    ListNode* mergedList = solution.mergeKLists(lists);

    cout << "合并后的链表:" << endl;
    printList(mergedList);

    return 0;
}
```

---

### 说明

**C语言实现：**
- 使用最小堆结构，手动实现插入和删除操作。
- 每次取堆顶元素，将其添加到结果链表中。

**C++实现：**
- 使用 STL 中的优先队列 `priority_queue`，结合自定义比较器实现最小堆。
- 借助 STL 容器和算法，代码更加简洁高效。

两种实现都满足时间复杂度 `O(n log k)`。