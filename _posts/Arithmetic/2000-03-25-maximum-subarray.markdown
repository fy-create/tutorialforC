---
layout: post
title:  "53. 最大子数组和"
categories: arithmetic
---

[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray)

### 题目描述

给你一个整数数组 `nums`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。

---

**示例 1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

**示例 2：**

```
输入：nums = [1]
输出：1
```

**示例 3：**

```
输入：nums = [5,4,-1,7,8]
输出：23
```

---

**提示：**

- 1 <= nums.length <= 10⁵
- -10⁴ <= nums[i] <= 10⁴

---

### 解题思路

要找到数组中具有最大和的连续子数组，可以采用以下方法：

1. **动态规划（Kadane's Algorithm）**：
   - 定义两个变量：
     - `current_sum`：记录当前子数组的和。
     - `max_sum`：记录全局最大子数组的和。
   - 遍历数组，对于每个元素 `num`，更新 `current_sum` 为 `num` 和 `current_sum + num` 中的较大值，即决定是将当前元素加入之前的子数组，还是从当前元素重新开始新的子数组。
   - 然后，将 `max_sum` 更新为 `max_sum` 和 `current_sum` 中的较大值。
   - 最终，`max_sum` 即为所求的最大子数组和。

2. **分治法**：
   - 将数组分为左右两部分，递归求解左半部分的最大子数组和、右半部分的最大子数组和，以及跨越中间的最大子数组和。
   - 跨越中间的最大子数组和可以通过从中间向两侧扩展来计算。
   - 最终，取上述三者的最大值作为结果。

---

### C 语言实现

```c
#include <stdio.h>
#include <limits.h>

// 动态规划方法求解最大子数组和
int maxSubArray(int* nums, int numsSize) {
    // 初始化当前子数组和为数组的第一个元素
    int current_sum = nums[0];
    // 初始化最大子数组和为数组的第一个元素
    int max_sum = nums[0];

    // 遍历数组，从第二个元素开始
    for (int i = 1; i < numsSize; i++) {
        // 更新当前子数组和：选择将当前元素加入之前的子数组，还是从当前元素开始新的子数组
        if (current_sum + nums[i] > nums[i]) {
            current_sum += nums[i];
        } else {
            current_sum = nums[i];
        }
        // 更新最大子数组和
        if (current_sum > max_sum) {
            max_sum = current_sum;
        }
    }

    return max_sum;
}

// 测试函数
int main() {
    int nums[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int result = maxSubArray(nums, numsSize);
    printf("最大子数组和为: %d\n", result);
    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    // 动态规划方法求解最大子数组和
    int maxSubArray(vector<int>& nums) {
        // 初始化当前子数组和为数组的第一个元素
        int current_sum = nums[0];
        // 初始化最大子数组和为数组的第一个元素
        int max_sum = nums[0];

        // 遍历数组，从第二个元素开始
        for (size_t i = 1; i < nums.size(); ++i) {
            // 更新当前子数组和：选择将当前元素加入之前的子数组，还是从当前元素开始新的子数组
            current_sum = max(nums[i], current_sum + nums[i]);
            // 更新最大子数组和
            max_sum = max(max_sum, current_sum);
        }

        return max_sum;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int result = sol.maxSubArray(nums);
    cout << "最大子数组和为: " << result << endl;
    return 0;
}
```

---

以上代码实现了求解最大子数组和的功能，采用了动态规划的方法，时间复杂度为 O(n)，其中 n 为数组的长度。 