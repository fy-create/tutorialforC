---
layout: post
title:  "128. 最长连续序列"
categories: arithmetic
---

[128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence)

### 题目描述

给定一个未排序的整数数组 `nums`，找出数字连续的最长序列（不要求序列元素在原数组中是连续的）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

---

**示例 1：**

```
输入：nums = [100, 4, 200, 1, 3, 2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
```

**示例 2：**

```
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
```

---

**提示：**

- `0 <= nums.length <= 10⁵`
- `-10⁹ <= nums[i] <= 10⁹`

---

### 解题思路

要实现时间复杂度为 `O(n)` 的算法，可以使用 **哈希集合**。

1. **构建哈希集合**：
   - 将所有数组元素放入一个哈希集合中，以便快速判断某个数字是否存在。

2. **查找连续序列**：
   - 遍历数组中的每个元素，判断当前数字 `num` 是否是序列的起点：
     - 如果 `num - 1` 不在哈希集合中，说明 `num` 是序列的起点。
   - 从 `num` 开始向后检查是否存在 `num + 1`、`num + 2` 等连续数字，记录连续序列的长度。

3. **更新最大长度**：
   - 对每个序列的长度更新全局最大长度。

4. **优化**：
   - 每个数字只会被访问两次：一次是作为起点，另一次是在查找序列中。总复杂度为 O(n)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 比较函数用于排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// 查找最长连续序列
int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) {
        return 0;
    }

    // 排序数组
    qsort(nums, numsSize, sizeof(int), compare);

    int maxLen = 1; // 记录最大长度
    int currentLen = 1; // 当前连续序列的长度

    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) {
            // 跳过重复的数字
            continue;
        } else if (nums[i] == nums[i - 1] + 1) {
            // 当前数字与前一个数字连续
            currentLen++;
        } else {
            // 序列中断，更新最大长度
            if (currentLen > maxLen) {
                maxLen = currentLen;
            }
            currentLen = 1; // 重置当前序列长度
        }
    }

    // 检查最后一个序列的长度
    if (currentLen > maxLen) {
        maxLen = currentLen;
    }

    return maxLen;
}

// 测试函数
int main() {
    int nums[] = {100, 4, 200, 1, 3, 2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    int result = longestConsecutive(nums, numsSize);
    printf("最长连续序列的长度: %d\n", result);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int maxLen = 0;

        for (int num : nums) {
            // 检查当前数字是否是序列的起点
            if (numSet.find(num - 1) == numSet.end()) {
                int currentNum = num;
                int currentLen = 1;

                // 查找连续序列
                while (numSet.find(currentNum + 1) != numSet.end()) {
                    currentNum++;
                    currentLen++;
                }

                // 更新最大长度
                maxLen = max(maxLen, currentLen);
            }
        }

        return maxLen;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {100, 4, 200, 1, 3, 2};

    int result = sol.longestConsecutive(nums);
    cout << "最长连续序列的长度: " << result << endl;

    return 0;
}
```

---

### 代码说明

1. **哈希集合法**（C++）：
   - 使用 `unordered_set` 存储所有数字。
   - 每个数字只访问一次，判断是否是序列起点。

2. **排序法**（C）：
   - 排序数组后查找连续序列，时间复杂度为 O(n log n)。
   - 对于不支持哈希集合的环境，排序法是一种替代方案。

3. **时间复杂度**：
   - C++ 代码：O(n)，每个数字最多访问两次。
   - C 代码：O(n log n)，排序是主要耗时操作。

4. **空间复杂度**：
   - C++ 代码：O(n)，哈希集合需要存储所有数字。
   - C 代码：O(1)，只使用常量额外空间。