---
layout: post
title:  "239. 滑动窗口最大值"
categories: arithmetic
---

[239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum)

### 题目要求

给定一个数组 `nums` 和一个滑动窗口大小 `k`，请你在数组中找到每个滑动窗口中的最大值。

#### 示例 1:

输入: 
```plaintext
nums = [1,3,-1,-3,5,3,6,7], k = 3
```

输出:
```plaintext
[3,3,5,5,6,7]
```

解释:
- 滑动窗口的位置最大值依次为:
  - [1 3 -1] -> 3
  - [3 -1 -3] -> 3
  - [-1 -3 5] -> 5
  - [-3 5 3] -> 5
  - [5 3 6] -> 6
  - [3 6 7] -> 7

#### 示例 2:

输入: 
```plaintext
nums = [1], k = 1
```

输出:
```plaintext
[1]
```

#### 示例 3:

输入: 
```plaintext
nums = [1,-1], k = 1
```

输出:
```plaintext
[1,-1]
```

#### 提示:

- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
- 1 <= k <= nums.length

---

### 解题思路

此题的关键是如何在滑动窗口中高效地找到最大值。我们可以利用双端队列（Deque）来优化这一过程。

#### 思路：

1. **滑动窗口的性质**:
   - 窗口的大小是固定的为 `k`，我们需要从左到右依次处理每个窗口。
   - 对于每个滑动窗口，我们要记录窗口中的最大值。

2. **使用双端队列**:
   - 双端队列（Deque）可以用来高效地维护滑动窗口内的元素。队列中的元素是数组的索引。
   - 队列中的索引保持单调递减顺序，即队列头部的元素始终是当前窗口的最大值。
   - 每次滑动时，将新加入窗口的元素索引加入队列，同时移除队列中不再属于当前窗口的索引。

3. **操作步骤**:
   - **初始化**: 用一个空队列保存窗口中的元素索引。
   - **滑动窗口更新**: 对于每个新元素，移除队列中所有比当前元素小的元素（因为它们不可能成为最大值），并把当前元素的索引添加到队列。
   - **维护窗口大小**: 如果队列头部的元素不再属于当前窗口，移除队列头部的索引。
   - **记录结果**: 对于每个滑动窗口，队列头部的元素就是当前窗口的最大值。

#### 时间复杂度:
- 每个元素最多被添加到队列一次，也最多被删除一次，因此时间复杂度为 `O(n)`。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 双端队列结构体
typedef struct {
    int* data;
    int front;
    int rear;
    int capacity;
} Deque;

// 创建一个空的双端队列
Deque* createDeque(int capacity) {
    Deque* deque = (Deque*)malloc(sizeof(Deque));
    deque->data = (int*)malloc(sizeof(int) * capacity);
    deque->front = -1;
    deque->rear = -1;
    deque->capacity = capacity;
    return deque;
}

// 队列是否为空
int isEmpty(Deque* deque) {
    return deque->front == -1;
}

// 队列是否已满
int isFull(Deque* deque) {
    return deque->rear == deque->capacity - 1;
}

// 入队
void enqueue(Deque* deque, int value) {
    if (isFull(deque)) return;
    if (isEmpty(deque)) {
        deque->front = 0;
    }
    deque->data[++(deque->rear)] = value;
}

// 出队
int dequeue(Deque* deque) {
    if (isEmpty(deque)) return -1;
    int value = deque->data[deque->front];
    if (deque->front == deque->rear) {
        deque->front = deque->rear = -1;
    } else {
        deque->front++;
    }
    return value;
}

// 获取队列头部元素
int getFront(Deque* deque) {
    return deque->data[deque->front];
}

// 获取队列尾部元素
int getRear(Deque* deque) {
    return deque->data[deque->rear];
}

// 解题函数
int* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {
    Deque* deque = createDeque(numsSize);
    int* result = (int*)malloc(sizeof(int) * (numsSize - k + 1));
    *returnSize = 0;
    
    for (int i = 0; i < numsSize; i++) {
        // 移除不在窗口内的元素
        while (!isEmpty(deque) && getFront(deque) <= i - k) {
            dequeue(deque);
        }
        
        // 移除队列中所有比当前元素小的元素
        while (!isEmpty(deque) && nums[getRear(deque)] <= nums[i]) {
            dequeue(deque);
        }
        
        // 将当前元素的索引加入队列
        enqueue(deque, i);
        
        // 如果当前索引大于等于 k-1，则记录窗口的最大值
        if (i >= k - 1) {
            result[(*returnSize)++] = nums[getFront(deque)];
        }
    }
    
    free(deque->data);
    free(deque);
    return result;
}

// 主函数测试
int main() {
    int nums[] = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    int returnSize;
    int* result = maxSlidingWindow(nums, 8, k, &returnSize);
    
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    free(result);
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <deque>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> result;
        
        for (int i = 0; i < nums.size(); i++) {
            // 移除不在当前窗口中的元素
            if (!dq.empty() && dq.front() <= i - k) {
                dq.pop_front();
            }
            
            // 移除队列中所有比当前元素小的元素
            while (!dq.empty() && nums[dq.back()] <= nums[i]) {
                dq.pop_back();
            }
            
            // 将当前元素的索引加入队列
            dq.push_back(i);
            
            // 记录当前窗口的最大值
            if (i >= k - 1) {
                result.push_back(nums[dq.front()]);
            }
        }
        
        return result;
    }
};

// 主函数测试
int main() {
    Solution sol;
    vector<int> nums = {1, 3, -1, -3, 5, 3, 6, 7};
    int k = 3;
    vector<int> result = sol.maxSlidingWindow(nums, k);
    
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;
    return 0;
}
```

---

### 总结

这道题的解法使用了双端队列（Deque）来维护当前窗口的最大值索引，从而实现了高效的滑动窗口最大值计算。通过不断更新队列中的元素，确保队列头部始终是当前窗口的最大值，最终返回结果。

