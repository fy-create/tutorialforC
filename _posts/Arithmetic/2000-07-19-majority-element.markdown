---
layout: post
title:  "169. 多数元素"
categories: arithmetic
---

[169. 多数元素](https://leetcode.cn/problems/majority-element)

### 题目描述

**题目：多数元素**

给定一个大小为 `n` 的数组，找到其中出现超过 `⌊ n / 2 ⌋` 次的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。

**示例 1：**

```plaintext
输入: [3,2,3]
输出: 3
```

**示例 2：**

```plaintext
输入: [2,2,1,1,1,2,2]
输出: 2
```

**提示：**

- `n == nums.length`
- 1 <= n <= 5 * 10^4
- -10^9 <= nums[i] <= 10^9
- 数组总是存在多数元素

---

### 解题思路

本题要求找到一个数组中的多数元素，即出现次数大于 `⌊n / 2⌋` 次的元素。这个问题有几个可能的解法，最直观的方法是使用哈希表来统计每个元素出现的次数，但可以通过更高效的方法来解决，比如摩尔投票算法。

#### 1. 哈希表法

通过遍历数组，记录每个元素出现的次数，然后判断哪个元素出现次数超过 `n / 2`。

**时间复杂度：** O(n)，遍历数组一次，哈希表插入和查找操作平均是 O(1)。
**空间复杂度：** O(n)，需要额外的空间来存储每个元素及其出现次数。

#### 2. 摩尔投票法

摩尔投票法是一个非常高效的解决方案，适用于寻找数组中出现次数超过一半的元素。该算法通过两次遍历来确定：

- 第一次遍历：用一个候选元素和一个计数器来遍历数组。如果当前元素和候选元素相同，计数器加1；如果当前元素和候选元素不同，计数器减1。当计数器为0时，更新候选元素为当前元素，并将计数器重置为1。
  
- 第二次遍历：由于题目保证存在多数元素，所以第一遍遍历后，候选元素即为答案。

**时间复杂度：** O(n)，遍历数组两次。
**空间复杂度：** O(1)，只使用常量空间。

---

### C语言解答

```c
#include <stdio.h>

int majorityElement(int* nums, int numsSize) {
    int candidate = nums[0];  // 初始候选元素为第一个元素
    int count = 1;  // 初始化计数器

    // 第一遍遍历，确定候选元素
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == candidate) {
            count++;  // 当前元素和候选元素相同，计数器加1
        } else {
            count--;  // 当前元素和候选元素不同，计数器减1
            if (count == 0) {
                candidate = nums[i];  // 如果计数器为0，更新候选元素
                count = 1;  // 重置计数器为1
            }
        }
    }

    // 返回最终的候选元素
    return candidate;
}

int main() {
    int nums[] = {3, 2, 3};
    int size = sizeof(nums) / sizeof(nums[0]);
    printf("Majority Element: %d\n", majorityElement(nums, size));  // 输出 3
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int candidate = nums[0];  // 初始候选元素为第一个元素
        int count = 1;  // 初始化计数器

        // 第一遍遍历，确定候选元素
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == candidate) {
                count++;  // 当前元素和候选元素相同，计数器加1
            } else {
                count--;  // 当前元素和候选元素不同，计数器减1
                if (count == 0) {
                    candidate = nums[i];  // 如果计数器为0，更新候选元素
                    count = 1;  // 重置计数器为1
                }
            }
        }

        // 返回最终的候选元素
        return candidate;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {3, 2, 3};
    cout << "Majority Element: " << solution.majorityElement(nums) << endl;  // 输出 3
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **初始化候选元素和计数器**：
   - 设定第一个元素为候选元素 `candidate`，并初始化计数器为1。

2. **遍历数组**：
   - 对数组中的每一个元素：
     - 如果当前元素与候选元素相同，计数器加1。
     - 如果当前元素与候选元素不同，计数器减1。如果计数器为0，则更新候选元素为当前元素，并重置计数器为1。

3. **返回结果**：
   - 最终的 `candidate` 即为数组中的多数元素。

#### C++解答：
1. **使用 `vector<int>` 存储输入**：
   - C++使用 `vector` 来存储数组元素，提供更灵活的操作。

2. **与C语言解答相同的逻辑**：
   - 通过遍历数组并使用计数器来确定多数元素。

### 总结

- **时间复杂度**：O(n)，其中n是数组的大小。摩尔投票法只需要遍历数组两次，时间复杂度为O(n)。
- **空间复杂度**：O(1)，使用常量空间存储候选元素和计数器。

摩尔投票法是最优的解法，不仅时间复杂度低，而且空间复杂度极低，适合大规模数据的处理。