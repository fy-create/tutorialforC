---
layout: post
title:  "219. 存在重复元素 II"
categories: arithmetic
---

[219. 存在重复元素 II](https://leetcode.cn/problems/contains-duplicate-ii)

### 题目描述

给定一个整数数组 `nums` 和一个整数 `k`，判断数组中是否存在两个不同的索引 `i` 和 `j`，使得 `nums[i] == nums[j]` 并且 `abs(i - j) <= k`。

**示例 1：**

```
输入：nums = [1,2,3,1], k = 3
输出：true
解释：nums[0] == nums[3]，且 abs(0 - 3) <= 3。
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1
输出：true
解释：nums[2] == nums[3]，且 abs(2 - 3) <= 1。
```

**示例 3：**

```
输入：nums = [1,2,3,1,2,3], k = 2
输出：false
解释：没有任何两个相同的元素的下标差小于等于 2。
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= k <= 10^5`

---

### 解题思路

这个问题可以通过 **滑动窗口** 结合 **哈希表** 来解决。具体步骤如下：

1. **滑动窗口**：
   - 维护一个大小为 `k + 1` 的滑动窗口，窗口内的元素索引差不超过 `k`。
   - 使用哈希表记录窗口内每个元素的最近一次出现的索引。

2. **遍历数组**：
   - 遍历数组 `nums`，对于每个元素 `nums[i]`：
     - 如果 `nums[i]` 已经在哈希表中，并且当前索引 `i` 与哈希表中记录的索引差不超过 `k`，则返回 `true`。
     - 否则，更新哈希表中 `nums[i]` 的索引为 `i`。
     - 如果窗口大小超过 `k + 1`，则移除窗口最左边的元素。

3. **返回结果**：
   - 如果遍历结束后没有找到满足条件的元素对，则返回 `false`。

---

### C语言解答

```c
#include <stdbool.h>
#include <stdlib.h>

#define HASH_SIZE 100000

// 哈希表节点结构
typedef struct HashNode {
    int key;
    int value;
    struct HashNode* next;
} HashNode;

// 哈希表结构
typedef struct {
    HashNode* table[HASH_SIZE];
} HashMap;

// 初始化哈希表
HashMap* createHashMap() {
    HashMap* map = (HashMap*)malloc(sizeof(HashMap));
    for (int i = 0; i < HASH_SIZE; i++) {
        map->table[i] = NULL;
    }
    return map;
}

// 哈希函数
int hash(int key) {
    return abs(key) % HASH_SIZE;
}

// 插入或更新哈希表
void put(HashMap* map, int key, int value) {
    int index = hash(key);
    HashNode* node = map->table[index];
    while (node != NULL) {
        if (node->key == key) {
            node->value = value;
            return;
        }
        node = node->next;
    }
    HashNode* newNode = (HashNode*)malloc(sizeof(HashNode));
    newNode->key = key;
    newNode->value = value;
    newNode->next = map->table[index];
    map->table[index] = newNode;
}

// 查找哈希表
int get(HashMap* map, int key) {
    int index = hash(key);
    HashNode* node = map->table[index];
    while (node != NULL) {
        if (node->key == key) {
            return node->value;
        }
        node = node->next;
    }
    return -1;
}

// 主函数
bool containsNearbyDuplicate(int* nums, int numsSize, int k) {
    HashMap* map = createHashMap();
    for (int i = 0; i < numsSize; i++) {
        int num = nums[i];
        int prevIndex = get(map, num);
        if (prevIndex != -1 && i - prevIndex <= k) {
            return true;
        }
        put(map, num, i);
    }
    return false;
}

// 简单main函数调用
int main() {
    int nums1[] = {1, 2, 3, 1};
    int k1 = 3;
    printf("%d\n", containsNearbyDuplicate(nums1, 4, k1)); // 输出 1 (true)

    int nums2[] = {1, 0, 1, 1};
    int k2 = 1;
    printf("%d\n", containsNearbyDuplicate(nums2, 4, k2)); // 输出 1 (true)

    int nums3[] = {1, 2, 3, 1, 2, 3};
    int k3 = 2;
    printf("%d\n", containsNearbyDuplicate(nums3, 6, k3)); // 输出 0 (false)

    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        // 哈希表记录元素最近一次出现的索引
        unordered_map<int, int> map;

        for (int i = 0; i < nums.size(); i++) {
            int num = nums[i];
            // 如果 num 已经在哈希表中，并且索引差不超过 k
            if (map.count(num) && i - map[num] <= k) {
                return true;
            }
            // 更新 num 的索引
            map[num] = i;
        }

        return false;
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    vector<int> nums1 = {1, 2, 3, 1};
    int k1 = 3;
    cout << solution.containsNearbyDuplicate(nums1, k1) << endl; // 输出 1 (true)

    vector<int> nums2 = {1, 0, 1, 1};
    int k2 = 1;
    cout << solution.containsNearbyDuplicate(nums2, k2) << endl; // 输出 1 (true)

    vector<int> nums3 = {1, 2, 3, 1, 2, 3};
    int k3 = 2;
    cout << solution.containsNearbyDuplicate(nums3, k3) << endl; // 输出 0 (false)

    return 0;
}
```

---

### 代码解释

#### C语言
1. **哈希表实现**：
   - 使用链表法解决哈希冲突。
   - 提供 `put` 和 `get` 方法用于插入和查找。

2. **滑动窗口**：
   - 遍历数组，使用哈希表记录每个元素的最近一次出现的索引。
   - 如果当前元素已经在哈希表中，并且索引差不超过 `k`，则返回 `true`。

3. **内存管理**：
   - 在程序结束时释放哈希表占用的内存。

#### C++
1. **哈希表**：
   - 使用 `unordered_map` 记录每个元素的最近一次出现的索引。

2. **滑动窗口**：
   - 遍历数组，使用哈希表记录每个元素的最近一次出现的索引。
   - 如果当前元素已经在哈希表中，并且索引差不超过 `k`，则返回 `true`。

---

### 测试用例验证

#### 输入
```cpp
nums = [1, 2, 3, 1], k = 3
```

#### 输出
```plaintext
true
```

#### 解释
- `nums[0] == nums[3]`，且 `abs(0 - 3) <= 3`。

#### 输入
```cpp
nums = [1, 0, 1, 1], k = 1
```

#### 输出
```plaintext
true
```

#### 解释
- `nums[2] == nums[3]`，且 `abs(2 - 3) <= 1`。

#### 输入
```cpp
nums = [1, 2, 3, 1, 2, 3], k = 2
```

#### 输出
```plaintext
false
```

#### 解释
- 没有任何两个相同的元素的下标差小于等于 2。

---

### 总结

通过滑动窗口和哈希表的结合，我们可以高效地解决这个问题。C语言和C++的实现都清晰地展示了这一过程，代码具有较高的可读性和健壮性。