---
layout: post
title:  "152. 乘积最大子数组"
categories: arithmetic
---

[152. 乘积最大子数组](https://leetcode.cn/problems/maximum-product-subarray)

### 题目描述

**最大乘积子数组**

给你一个整数数组 `nums`，请你找出一个具有最大乘积的子数组（子数组最少包含一个元素），并返回该子数组的乘积。

**示例 1:**
```
输入: [2,3,-2,4]
输出: 6
解释: 子数组 [2,3] 有最大乘积 6。
```

**示例 2:**
```
输入: [-2,0,-1]
输出: 0
解释: 结果由子数组 [0] 得到，乘积为 0。
```

**提示：**
- `2 <= nums.length <= 2 * 10^4`
- `-10 <= nums[i] <= 10`
- `nums` 中的所有整数都是 32 位带符号整数。

---

### 解题思路

#### 1. **问题分析**
- **最大乘积子数组**：在乘法运算中，负数乘负数会变为正数，所以我们需要跟踪两个状态：
  - 当前子数组的**最大乘积**（可能因为负数变成最大值）
  - 当前子数组的**最小乘积**（同样负数可能变成最小值）
- 关键在于处理负数对最大和最小乘积的影响。

#### 2. **思路**
- 遍历数组时，**最大乘积**和**最小乘积**都可能发生变化，因为：
  - 当前数是正数时，最大和最小乘积都会乘上当前数。
  - 当前数是负数时，最大乘积和最小乘积会交换作用（因为负数与最小值相乘可能会得到一个较大的乘积）。
  - 当前数是零时，最大和最小乘积都会变为0。
  
- 使用动态规划的方法，记录每一步的最大值和最小值。

#### 3. **步骤**
1. 初始化 `maxProd` 和 `minProd` 为当前元素的值。
2. 遍历数组，对于每一个新的元素：
   - 如果是负数，交换 `maxProd` 和 `minProd`。
   - 更新 `maxProd` 和 `minProd`，分别为当前元素与之前的乘积的最大/最小值。
3. 每次更新 `maxProd` 时，检查是否为最大值。
4. 返回最终的 `maxProd`。

#### 4. **时间复杂度**：
- 时间复杂度：O(n)，只需要遍历一次数组。
- 空间复杂度：O(1)，只需要常数空间来存储中间结果。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

int maxProduct(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    // 初始化最大乘积和最小乘积为第一个元素
    int maxProd = nums[0], minProd = nums[0], result = nums[0];

    // 从第二个元素开始遍历
    for (int i = 1; i < numsSize; i++) {
        // 如果当前元素是负数，交换最大值和最小值
        if (nums[i] < 0) {
            int temp = maxProd;
            maxProd = minProd;
            minProd = temp;
        }

        // 更新最大和最小乘积
        maxProd = (nums[i] > maxProd * nums[i]) ? nums[i] : maxProd * nums[i];
        minProd = (nums[i] < minProd * nums[i]) ? nums[i] : minProd * nums[i];

        // 更新最终结果
        result = (result > maxProd) ? result : maxProd;
    }

    return result;
}

// 测试主函数
int main() {
    int nums[] = {2, 3, -2, 4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int result = maxProduct(nums, numsSize);
    printf("Max product of subarray: %d\n", result);  // 输出: 6
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.empty()) return 0;

        // 初始化最大乘积和最小乘积为第一个元素
        int maxProd = nums[0], minProd = nums[0], result = nums[0];

        // 从第二个元素开始遍历
        for (int i = 1; i < nums.size(); i++) {
            // 如果当前元素是负数，交换最大值和最小值
            if (nums[i] < 0) {
                swap(maxProd, minProd);
            }

            // 更新最大和最小乘积
            maxProd = max(nums[i], maxProd * nums[i]);
            minProd = min(nums[i], minProd * nums[i]);

            // 更新最终结果
            result = max(result, maxProd);
        }

        return result;
    }
};

// 测试主函数
int main() {
    Solution sol;
    vector<int> nums = {2, 3, -2, 4};
    int result = sol.maxProduct(nums);
    cout << "Max product of subarray: " << result << endl;  // 输出: 6
    return 0;
}
```

### 关键点说明

1. **负数的影响**：
   - 如果遇到负数，可能会交换最大和最小乘积，因为负数与最小的负数相乘会得到最大的乘积。

2. **动态更新**：
   - 我们同时维护了当前的最大乘积和最小乘积，以便及时应对负数的影响。

3. **优化**：
   - 只需要O(1)的额外空间，因此在内存上是高效的。

4. **C++ 语法**：
   - 在 C++ 中，我们使用 `swap` 函数简化了负数处理的部分。

### 总结

- 通过同时追踪最大乘积和最小乘积，可以高效地解决包含负数的最大乘积子数组问题。
- 这种方法通过动态规划，遍历数组仅需一次，并且避免了不必要的空间消耗。