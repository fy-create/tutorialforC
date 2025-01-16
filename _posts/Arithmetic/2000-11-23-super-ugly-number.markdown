---
layout: post
title:  "313. 超级丑数"
categories: arithmetic
---

[313. 超级丑数](https://leetcode.cn/problems/super-ugly-number)

### 题目：**Super Ugly Number**

#### 题目描述：

一个超级丑数是指一个正整数，它的所有质因数都在给定的素数列表中。 

给定一个整数 `n` 和一个素数数组 `primes`，返回第 `n` 个超级丑数。

**示例 1：**
```plaintext
输入: n = 12, primes = [2,7,13,19]
输出: 32
解释: 12 由 2^3 * 3 组成，且 3 不在 primes 中，因此不是超级丑数。
```

**示例 2：**
```plaintext
输入: n = 1, primes = [2,3,5]
输出: 1
解释: 1 是任何素数的倍数，因此它是一个超级丑数。
```

**提示：**
- `1 <= n <= 10^9`
- `1 <= primes.length <= 100`
- `2 <= primes[i] <= 1000`
- `primes[i]` 是素数并且是互不相同的。

---

### 解题思路：

#### 1. **问题分析：**
   - 超级丑数是通过将给定素数数组中的素数相乘得到的数。
   - 可以用动态规划来生成超级丑数，类似于经典的“丑数”问题，但有多个素数。
   - 我们需要找出第 `n` 个超级丑数。

#### 2. **方案：**
   - **优先队列（小顶堆）：** 使用堆来维护候选的超级丑数。每次从堆中弹出最小的数，并将它与所有给定的素数相乘，生成新的候选超级丑数，并将其加入堆中。
   - 由于 `n` 可能非常大，直接使用暴力法是不可行的。小顶堆可以确保每次都能够找到下一个最小的超级丑数。
   
#### 3. **算法步骤：**
   - 使用一个最小堆来存储候选的超级丑数，最小堆的根节点存储的是当前最小的超级丑数。
   - 初始化堆，将数字 `1` 放入堆中。
   - 每次从堆中取出最小的数 `minNum`，然后将其乘以所有的素数，生成新的候选超级丑数，并加入堆中。
   - 使用一个哈希集合来避免重复的超级丑数。
   - 执行 `n` 次堆操作，得到第 `n` 个超级丑数。

#### 4. **时间复杂度：**
   - 每次取出堆的最小值的时间复杂度为 `O(log k)`，其中 `k` 是堆中元素的数量。由于每个新生成的超级丑数都会与所有素数相乘，堆的操作次数大约为 `O(n * log k)`，其中 `k` 为 `primes` 数组的长度。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct {
    int *arr;
    int size;
    int capacity;
} MinHeap;

// 创建小顶堆
MinHeap* createMinHeap(int capacity) {
    MinHeap *heap = (MinHeap*)malloc(sizeof(MinHeap));
    heap->arr = (int*)malloc(capacity * sizeof(int));
    heap->size = 0;
    heap->capacity = capacity;
    return heap;
}

// 堆化
void heapify(MinHeap *heap, int i) {
    int left = 2 * i + 1, right = 2 * i + 2;
    int smallest = i;
    if (left < heap->size && heap->arr[left] < heap->arr[smallest])
        smallest = left;
    if (right < heap->size && heap->arr[right] < heap->arr[smallest])
        smallest = right;
    
    if (smallest != i) {
        int temp = heap->arr[i];
        heap->arr[i] = heap->arr[smallest];
        heap->arr[smallest] = temp;
        heapify(heap, smallest);
    }
}

// 插入元素
void insert(MinHeap *heap, int value) {
    if (heap->size >= heap->capacity) return;
    heap->arr[heap->size] = value;
    int i = heap->size;
    heap->size++;
    
    while (i > 0 && heap->arr[(i - 1) / 2] > heap->arr[i]) {
        int temp = heap->arr[i];
        heap->arr[i] = heap->arr[(i - 1) / 2];
        heap->arr[(i - 1) / 2] = temp;
        i = (i - 1) / 2;
    }
}

// 删除堆顶元素
int pop(MinHeap *heap) {
    if (heap->size == 0) return -1;
    int root = heap->arr[0];
    heap->arr[0] = heap->arr[heap->size - 1];
    heap->size--;
    heapify(heap, 0);
    return root;
}

// 获取堆顶元素
int peek(MinHeap *heap) {
    return heap->arr[0];
}

int nthSuperUglyNumber(int n, int* primes, int primesSize) {
    MinHeap *heap = createMinHeap(n);
    insert(heap, 1);
    
    int *visited = (int*)calloc(n * 1000, sizeof(int)); // 防止重复
    visited[1] = 1;
    int result = 0;
    
    for (int i = 0; i < n; i++) {
        result = pop(heap); // 弹出最小值
        for (int j = 0; j < primesSize; j++) {
            long long next = (long long)result * primes[j];
            if (next <= INT_MAX && !visited[next]) {
                visited[next] = 1;
                insert(heap, (int)next); // 将新值插入堆
            }
        }
    }
    
    free(visited);
    free(heap->arr);
    free(heap);
    return result;
}

int main() {
    int primes[] = {2, 7, 13, 19};
    int n = 12;
    int primesSize = sizeof(primes) / sizeof(primes[0]);
    printf("The %d-th super ugly number is: %d\n", n, nthSuperUglyNumber(n, primes, primesSize));
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
using namespace std;

class Solution {
public:
    int nthSuperUglyNumber(int n, vector<int>& primes) {
        priority_queue<long long, vector<long long>, greater<long long>> pq;
        unordered_set<long long> visited;
        pq.push(1);
        visited.insert(1);
        
        long long result = 1;
        
        for (int i = 0; i < n; i++) {
            result = pq.top();
            pq.pop();
            for (int prime : primes) {
                long long next = result * prime;
                if (visited.find(next) == visited.end()) {
                    visited.insert(next);
                    pq.push(next);
                }
            }
        }
        
        return result;
    }
};

int main() {
    Solution sol;
    vector<int> primes = {2, 7, 13, 19};
    int n = 12;
    cout << "The " << n << "-th super ugly number is: " << sol.nthSuperUglyNumber(n, primes) << endl;
    return 0;
}
```

### 代码解释：

1. **C语言解答**：
   - 使用一个最小堆来存储当前超级丑数的候选值。初始时，我们将 `1` 放入堆中。
   - 每次从堆中取出最小的值，并将其乘以每个素数，生成新的超级丑数候选。
   - 使用哈希集合 `visited` 来避免重复插入已经生成过的超级丑数。
   - 重复这个过程 `n` 次，最终得到第 `n` 个超级丑数。

2. **C++解答**：
   - 使用 `priority_queue` 来作为最小堆，`unordered_set` 来避免重复的超级丑数。
   - 每次从堆顶取出最小值，然后生成新的超级丑数，继续插入堆中直到找到第 `n` 个。

### 总结：
- 通过堆来维护最小值并生成下一个超级丑数。
- 使用哈希集合避免重复的超级丑数。
- 时间复杂度：`O(n log k)`，其中 `n` 是所需超级丑数的序号，`k` 是素数数组的大小。