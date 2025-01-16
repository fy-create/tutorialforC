---
layout: post
title:  "41. 缺失的第一个正数"
categories: arithmetic
---

[41. 缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive)

## 题目要求

### 描述
给定一个未排序的整数数组 `nums`，找到其中未出现的最小的正整数。

**示例 1：**

**输入：**  
`nums = [1, 2, 0]`

**输出：**  
`3`

**解释：**  
最小的正整数是 3，因为 1 和 2 已经在数组中。

**示例 2：**

**输入：**  
`nums = [3, 4, -1, 1]`

**输出：**  
`2`

**解释：**  
最小的正整数是 2。

**示例 3：**

**输入：**  
`nums = [7, 8, 9, 11, 12]`

**输出：**  
`1`

**解释：**  
最小的正整数是 1。

### 提示：
- 1 <= nums.length <= 5 * 10^5
- -2^31 <= nums[i] <= 2^31 - 1

## 解题思路

### 思路：
这个问题要求找出数组中缺失的最小正整数。一个直观的做法是排序后检查，但是这样做的时间复杂度是 O(n log n)，不满足题目对于大数据量（最多 5 * 10^5 个元素）的要求。因此，我们需要采用 O(n) 时间复杂度的解法。

**关键观察：**
- 数组中最小的缺失正整数一定在 [1, n+1] 之间，其中 n 是数组的大小。如果数组中所有元素都在 [1, n] 范围内，那么最小的缺失正整数就是 n+1。
- 我们可以利用数组本身作为哈希表来帮助查找。

### 解法：
1. **将不合法的元素置为无关元素**：首先遍历数组，将小于等于 0 或大于数组大小 `n` 的元素替换为一个不可能是最小缺失正整数的数字（例如 n+1）。因为最小缺失正整数一定在 [1, n+1] 范围内。
2. **利用索引作为哈希表**：对于数组中每一个合法元素，尝试将它放到它该出现的位置上。例如，数字 `1` 应该放到索引 `0`，数字 `2` 应该放到索引 `1`，依此类推。通过交换数组中的元素，将每个数字放到正确的索引位置。
3. **检查缺失的正整数**：再次遍历数组，检查哪个位置的数字不是预期的数字。第一个不符合的索引对应的数字，就是我们要找的最小缺失正整数。如果没有这样的数字，说明最小缺失正整数是 `n+1`。

### C语言解答

```c
#include <stdio.h>

int firstMissingPositive(int* nums, int numsSize) {
    // 1. 将不符合条件的元素替换成一个大于数组长度的数
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] <= 0 || nums[i] > numsSize) {
            nums[i] = numsSize + 1;
        }
    }

    // 2. 将每个合法的数字放到它对应的位置
    for (int i = 0; i < numsSize; i++) {
        int num = abs(nums[i]);
        if (num <= numsSize && nums[num - 1] > 0) {
            nums[num - 1] = -nums[num - 1];  // 标记该数字已经出现过
        }
    }

    // 3. 找到第一个没有被标记的索引位置
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] > 0) {
            return i + 1;  // 第 i 个位置对应的数字就是缺失的最小正整数
        }
    }

    // 4. 如果所有位置都被标记了，说明最小缺失正整数是 numsSize + 1
    return numsSize + 1;
}

int main() {
    int nums[] = {3, 4, -1, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    
    int result = firstMissingPositive(nums, numsSize);
    printf("The first missing positive is: %d\n", result);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();

        // 1. 将不符合条件的元素替换成一个大于数组长度的数
        for (int i = 0; i < n; i++) {
            if (nums[i] <= 0 || nums[i] > n) {
                nums[i] = n + 1;
            }
        }

        // 2. 将每个合法的数字放到它对应的位置
        for (int i = 0; i < n; i++) {
            int num = abs(nums[i]);
            if (num <= n && nums[num - 1] > 0) {
                nums[num - 1] = -nums[num - 1];  // 标记该数字已经出现过
            }
        }

        // 3. 找到第一个没有被标记的索引位置
        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                return i + 1;  // 第 i 个位置对应的数字就是缺失的最小正整数
            }
        }

        // 4. 如果所有位置都被标记了，说明最小缺失正整数是 numsSize + 1
        return n + 1;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {3, 4, -1, 1};
    
    int result = solution.firstMissingPositive(nums);
    cout << "The first missing positive is: " << result << endl;
    
    return 0;
}
```

### 代码解析

#### C语言：
- **步骤 1**：首先遍历数组，将所有小于等于 0 或大于 `numsSize` 的元素替换为 `numsSize + 1`，因为最小的缺失正整数肯定不超过 `numsSize + 1`。
- **步骤 2**：对于每一个合法数字（在 [1, numsSize] 范围内），将它放到对应的索引位置上。通过将索引位置的数字标记为负数来表示该数字已经出现过。
- **步骤 3**：再次遍历数组，查找第一个没有被标记（即为正数）的索引，该索引对应的数字就是缺失的最小正整数。
- **步骤 4**：如果所有的索引都被标记了，说明最小的缺失正整数是 `numsSize + 1`。

#### C++：
- C++ 版本采用了 `vector`，相同的逻辑，通过 `abs` 和数组大小进行处理。
- 将 `nums[num - 1]` 设置为负数来标记数字的出现，同时避免了修改不合法的元素。
- 其他逻辑和 C 版本相同。

### 时间复杂度：
- **时间复杂度**：O(n)，其中 n 是数组的长度。遍历数组三次，每次都是 O(n)。
- **空间复杂度**：O(1)，我们只使用了常数的额外空间，修改原数组进行标记。

### 小结：
- 该问题通过巧妙地利用数组本身作为哈希表来进行标记，从而实现了 O(n) 时间复杂度的解决方案。
- 关键在于将不合法的数字置换为一个不可能是最小缺失正整数的数字，并通过标记来实现 O(n) 时间内的查找。