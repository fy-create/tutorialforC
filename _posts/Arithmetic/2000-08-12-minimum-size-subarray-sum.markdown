---
layout: post
title:  "209. 长度最小的子数组"
categories: arithmetic
---

[209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum)

## 题目要求

### 题目描述：

给定一个正整数数组 `nums` 和一个正整数 `target`，找出该数组中和大于或等于 `target` 的最短子数组的长度。如果不存在符合条件的子数组，返回 0。

### 示例：

**示例 1：**

输入：  
`target = 7`,  
`nums = [2,3,1,2,4,3]`  

输出：  
`2`  

解释：  
子数组 `[4,3]` 是长度最短的，和大于或等于 7。

**示例 2：**

输入：  
`target = 4`,  
`nums = [1,4,4]`  

输出：  
`1`  

解释：  
单个元素 `4` 就满足条件。

**示例 3：**

输入：  
`target = 11`,  
`nums = [1,1,1,1,1,1,1,1]`  

输出：  
`0`  

解释：  
没有子数组和大于或等于 11。

### 提示：

- `1 <= target <= 10^9`
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^4`

---

## 解题思路

### 1. **问题分析：**
   我们需要找出一个子数组，满足其元素和大于或等于给定的 `target`，并且该子数组的长度最短。我们可以通过滑动窗口（双指针法）来有效解决这个问题。

### 2. **滑动窗口思想：**
   - 使用两个指针 `left` 和 `right`，初始化时都指向数组的起始位置。
   - 不断增加 `right` 指针来扩展窗口，计算当前窗口内的和。
   - 当窗口和大于等于 `target` 时，尝试缩小窗口，即移动 `left` 指针，直到窗口和不再大于等于 `target`。
   - 每次找到符合条件的窗口时，记录当前窗口的长度，并更新最短长度。

### 3. **算法步骤：**
   - 初始化 `left` 为 0，`currentSum` 为 0，`minLength` 为无穷大。
   - 遍历数组，用 `right` 指针扩展窗口：
     - 累加当前元素到 `currentSum`。
     - 如果 `currentSum` 大于或等于 `target`，就缩小窗口（移动 `left` 指针），并更新 `minLength`。
   - 最后返回最短长度，如果没有找到满足条件的子数组，返回 0。

### 4. **时间复杂度：**
   - 由于滑动窗口中每个元素最多被 `left` 和 `right` 各遍历一次，因此时间复杂度为 O(n)，其中 n 是数组的长度。

### 5. **边界情况：**
   - `nums` 数组为空或所有元素的和都小于 `target` 时，返回 0。
   - 只有一个元素且其值大于等于 `target` 时，返回 1。

---

## C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 主函数
int minSubArrayLen(int target, int* nums, int numsSize) {
    int left = 0;              // 左指针
    int currentSum = 0;        // 当前窗口和
    int minLength = INT_MAX;   // 最小长度，初始化为无穷大

    for (int right = 0; right < numsSize; right++) {
        currentSum += nums[right];  // 扩展右边界，增加当前元素到窗口和

        // 当窗口和大于或等于 target 时，尝试缩小窗口
        while (currentSum >= target) {
            // 更新最小子数组长度
            int currentLength = right - left + 1;
            minLength = (currentLength < minLength) ? currentLength : minLength;

            // 缩小窗口，移除左边的元素
            currentSum -= nums[left];
            left++;
        }
    }

    // 如果没有符合条件的子数组，返回 0
    return minLength == INT_MAX ? 0 : minLength;
}

int main() {
    int nums[] = {2, 3, 1, 2, 4, 3};
    int target = 7;
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    
    int result = minSubArrayLen(target, nums, numsSize);
    printf("最短子数组的长度为: %d\n", result);  // 应该输出 2
    return 0;
}
```

---

## C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0;              // 左指针
        int currentSum = 0;        // 当前窗口和
        int minLength = INT_MAX;   // 最小长度，初始化为无穷大

        // 遍历数组，扩展右指针
        for (int right = 0; right < nums.size(); right++) {
            currentSum += nums[right];  // 扩展右边界，增加当前元素到窗口和

            // 当窗口和大于或等于 target 时，尝试缩小窗口
            while (currentSum >= target) {
                // 更新最小子数组长度
                int currentLength = right - left + 1;
                minLength = min(minLength, currentLength);

                // 缩小窗口，移除左边的元素
                currentSum -= nums[left];
                left++;
            }
        }

        // 如果没有符合条件的子数组，返回 0
        return minLength == INT_MAX ? 0 : minLength;
    }
};

int main() {
    Solution sol;
    vector<int> nums = {2, 3, 1, 2, 4, 3};
    int target = 7;
    
    int result = sol.minSubArrayLen(target, nums);
    cout << "最短子数组的长度为: " << result << endl;  // 应该输出 2
    return 0;
}
```

---

### 代码说明：

1. **C语言实现：**
   - 使用滑动窗口技巧，`left` 和 `right` 指针来表示当前窗口的范围。
   - 每次扩展 `right` 指针时增加 `currentSum`，当 `currentSum` 大于等于 `target` 时，移动 `left` 指针缩小窗口。
   - 每次满足条件时更新最短长度 `minLength`。

2. **C++实现：**
   - 采用类似的方法，通过滑动窗口来维护一个当前窗口的和。
   - 每次当窗口的和大于等于 `target` 时，通过调整 `left` 指针来缩小窗口。
   - 使用 `min` 函数更新最小子数组长度。

3. **主函数：**
   - 创建一个 `Solution` 类实例，调用 `minSubArrayLen` 函数，传入目标值和数组，输出最短子数组长度。

### 总结：
- **时间复杂度**：O(n)，其中 n 是数组的大小。滑动窗口方法保证每个元素最多被 `left` 和 `right` 各遍历一次。
- **空间复杂度**：O(1)，没有使用额外的数据结构，仅使用了常数空间。