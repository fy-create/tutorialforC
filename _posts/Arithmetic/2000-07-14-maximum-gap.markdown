---
layout: post
title:  "164. 最大间距"
categories: arithmetic
---

[164. 最大间距](https://leetcode.cn/problems/maximum-gap)

### 题目描述

**题目：最大间距**

给定一个无序的整数数组 `nums`，返回数组中任意两个相邻元素之间的最大差值。

- 如果数组元素少于 2 个，则返回 0。
- 你必须实现一个算法，时间复杂度要求为 `O(n)`，其中 `n` 是数组 `nums` 的长度。

**示例：**

**示例 1：**
```plaintext
输入: nums = [3, 6, 9, 1]
输出: 3
解释：排序后的数组是 [1, 3, 6, 9]，最大差值为 3 (即 6-3)
```

**示例 2：**
```plaintext
输入: nums = [10]
输出: 0
解释：数组只有一个元素，无法计算差值。
```

**提示：**
- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= nums[i] <= 10^9`
- 题目数据保证，`nums` 中的元素是互不相同的。

---

### 解题思路

为了在 `O(n)` 时间复杂度内解决问题，可以使用 **桶排序** 的思想。具体的做法如下：

1. **最大值和最小值**：
   - 首先，我们需要确定数组中的最大值和最小值。然后，根据最大值和最小值确定桶的数量以及每个桶的范围。

2. **确定桶的数量和大小**：
   - 桶的数量可以通过公式 `桶数 = n - 1`（`n` 为数组的长度），每个桶的大小可以通过公式 `(最大值 - 最小值) / (桶数)` 来计算。

3. **元素分配到桶中**：
   - 每个元素会根据其大小被放入一个特定的桶中，桶的大小是基于最大值和最小值的差值来决定的。

4. **计算最大间隔**：
   - 一旦所有元素都被放入桶中，我们就可以遍历每个桶，找到桶内的最小值和最大值的差距。相邻桶之间的差距就是当前桶的最大值与上一个非空桶的最小值之差。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 辅助函数：计算一个桶的最大值和最小值
void updateBucket(int* bucketMin, int* bucketMax, int num) {
    if (*bucketMin == -1) {
        *bucketMin = num;
        *bucketMax = num;
    } else {
        if (num < *bucketMin) {
            *bucketMin = num;
        }
        if (num > *bucketMax) {
            *bucketMax = num;
        }
    }
}

// 主函数：返回最大间距
int maximumGap(int* nums, int numsSize) {
    if (numsSize < 2) return 0; // 少于两个元素，差距为0
    
    // 找到数组中的最大值和最小值
    int minVal = INT_MAX, maxVal = INT_MIN;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] < minVal) minVal = nums[i];
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    
    // 计算桶的大小和数量
    int bucketSize = (maxVal - minVal) / (numsSize - 1) + 1;
    int bucketCount = (maxVal - minVal) / bucketSize + 1;
    
    // 创建桶，初始化桶的最大值和最小值
    int* bucketMin = (int*)malloc(sizeof(int) * bucketCount);
    int* bucketMax = (int*)malloc(sizeof(int) * bucketCount);
    for (int i = 0; i < bucketCount; i++) {
        bucketMin[i] = -1; // -1 表示桶内没有元素
        bucketMax[i] = -1;
    }
    
    // 将元素分配到相应的桶中
    for (int i = 0; i < numsSize; i++) {
        int idx = (nums[i] - minVal) / bucketSize;
        updateBucket(&bucketMin[idx], &bucketMax[idx], nums[i]);
    }
    
    // 计算最大间隔
    int maxGap = 0;
    int prevMax = minVal;
    for (int i = 0; i < bucketCount; i++) {
        if (bucketMin[i] == -1) continue; // 如果桶是空的，跳过
        maxGap = (bucketMin[i] - prevMax > maxGap) ? bucketMin[i] - prevMax : maxGap;
        prevMax = bucketMax[i];
    }
    
    // 释放内存
    free(bucketMin);
    free(bucketMax);
    
    return maxGap;
}

int main() {
    int nums[] = {3, 6, 9, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int result = maximumGap(nums, numsSize);
    printf("最大间距是：%d\n", result);
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    int maximumGap(vector<int>& nums) {
        int n = nums.size();
        if (n < 2) return 0; // 少于两个元素，差距为0
        
        // 找到数组中的最大值和最小值
        int minVal = INT_MAX, maxVal = INT_MIN;
        for (int num : nums) {
            minVal = min(minVal, num);
            maxVal = max(maxVal, num);
        }
        
        // 计算桶的大小和数量
        int bucketSize = (maxVal - minVal) / (n - 1) + 1;
        int bucketCount = (maxVal - minVal) / bucketSize + 1;
        
        // 创建桶，初始化桶的最大值和最小值
        vector<int> bucketMin(bucketCount, -1);
        vector<int> bucketMax(bucketCount, -1);
        
        // 将元素分配到相应的桶中
        for (int num : nums) {
            int idx = (num - minVal) / bucketSize;
            if (bucketMin[idx] == -1) {
                bucketMin[idx] = num;
                bucketMax[idx] = num;
            } else {
                bucketMin[idx] = min(bucketMin[idx], num);
                bucketMax[idx] = max(bucketMax[idx], num);
            }
        }
        
        // 计算最大间隔
        int maxGap = 0;
        int prevMax = minVal;
        for (int i = 0; i < bucketCount; i++) {
            if (bucketMin[i] == -1) continue; // 如果桶是空的，跳过
            maxGap = max(maxGap, bucketMin[i] - prevMax);
            prevMax = bucketMax[i];
        }
        
        return maxGap;
    }
};

int main() {
    vector<int> nums = {3, 6, 9, 1};
    Solution solution;
    int result = solution.maximumGap(nums);
    cout << "最大间距是：" << result << endl;
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **数组分配与初始化**：
   - 使用 `bucketMin` 和 `bucketMax` 数组来保存每个桶的最小值和最大值。
   - 如果桶为空，用 `-1` 初始化。

2. **计算最大间距**：
   - 遍历桶，计算相邻桶之间的最大间隔。

3. **桶的索引计算**：
   - `idx = (num - minVal) / bucketSize` 计算每个数字应该放入哪个桶。

#### C++解答：
1. **C++ 中的 `vector`**：
   - 使用 `vector<int>` 动态创建桶，并且初始化桶的最大值和最小值。

2. **简化的代码**：
   - C++ 中使用了 STL 函数 `min()` 和 `max()` 来简化代码。

### 结论

- 该算法的时间复杂度是 O(n)，其中 n 是数组的大小。通过桶排序，我们能够在 O(n) 时间内解决最大间距问题。
- 空间复杂度是 O(n)，因为我们需要额外的桶来存储元素的信息。