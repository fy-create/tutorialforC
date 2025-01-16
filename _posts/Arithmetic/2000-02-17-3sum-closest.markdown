---
layout: post
title:  "16. 最接近的三数之和"
categories: arithmetic
---

[16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest)

### 题目：三数之和最接近 (3Sum Closest)

#### 题目要求：
给定一个包含 `n` 个整数的数组 `nums` 和一个目标值 `target`，在数组中找到三个整数，使得它们的和与目标值 `target` 最接近。返回这三个数的和。

**注意：**
- 返回的答案是最接近 `target` 的和。如果有多个答案，返回其中任意一个即可。

**示例 1:**
```
输入: nums = [-1, 2, 1, -4], target = 1
输出: 2
解释: 和为 2 的三元组 [-1, 2, 1] 最接近 1 。
```

**示例 2:**
```
输入: nums = [0, 0, 0], target = 1
输出: 0
```

**提示：**
- `3 <= nums.length <= 1000`
- `-1000 <= nums[i] <= 1000`
- `-10^4 <= target <= 10^4`

---

### 解题思路：

1. **排序与双指针法**：
   - 首先对数组进行排序，这样可以利用双指针法来优化查找过程。
   - 我们将问题转化为三数之和最接近的形式。我们可以通过固定一个数，然后利用双指针来寻找剩下的两个数。
   - 每次选择一个数并用双指针找到其余两个数的和，我们可以通过比较与目标值的差来更新最接近的答案。

2. **双指针技巧**：
   - 在数组中选定第一个数 `nums[i]`，然后通过双指针从 `i+1` 到数组末尾查找另外两个数。此时可以判断当前三数之和与目标值 `target` 的差值。
   - 如果当前的三数之和比目标值大，则右指针左移（减小总和）；如果小于目标值，则左指针右移（增大总和）。
   - 在更新过程中，我们保持追踪当前最小的差值，并更新最接近的和。

3. **时间复杂度**：
   - 排序的时间复杂度为 `O(n log n)`，双指针遍历每一对数的时间复杂度为 `O(n^2)`。因此，整体的时间复杂度为 `O(n^2)`。

#### C 语言解法：

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 辅助函数：比较函数，用于排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// 函数：查找三数之和最接近的结果
int threeSumClosest(int* nums, int numsSize, int target) {
    // 排序数组
    qsort(nums, numsSize, sizeof(int), compare);

    int closestSum = nums[0] + nums[1] + nums[2]; // 初始化最接近的和
    for (int i = 0; i < numsSize - 2; i++) {
        // 跳过重复的数字
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1, right = numsSize - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            // 如果当前和比目标值更接近，更新最接近的和
            if (abs(sum - target) < abs(closestSum - target)) {
                closestSum = sum;
            }

            // 根据和与目标值的关系调整指针
            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                return sum;  // 如果刚好等于目标值，直接返回
            }
        }
    }

    return closestSum;
}

int main() {
    int nums[] = {-1, 2, 1, -4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int target = 1;
    
    int result = threeSumClosest(nums, numsSize, target);
    printf("The closest sum is: %d\n", result);  // 输出 2
    return 0;
}
```

#### C++ 解法：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdlib>

using namespace std;

class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());  // 排序数组
        int closestSum = nums[0] + nums[1] + nums[2];  // 初始化最接近的和

        for (int i = 0; i < nums.size() - 2; i++) {
            // 跳过重复的元素
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1, right = nums.size() - 1;
            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];
                // 如果当前和比目标值更接近，更新最接近的和
                if (abs(sum - target) < abs(closestSum - target)) {
                    closestSum = sum;
                }

                // 根据和与目标值的关系调整指针
                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    return sum;  // 如果刚好等于目标值，直接返回
                }
            }
        }

        return closestSum;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {-1, 2, 1, -4};
    int target = 1;
    
    int result = solution.threeSumClosest(nums, target);
    cout << "The closest sum is: " << result << endl;  // 输出 2
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 使用 `qsort` 对数组进行排序。
   - 对于每一个数字，使用双指针法查找两个数，使得三数之和接近目标值。
   - 在更新过程中，计算当前三数之和与目标值之间的差，并根据差值更新最接近的结果。
   
2. **C++ 实现**：
   - 使用 `sort` 对数组进行排序。
   - 对于每个数字，利用双指针查找另外两个数，并计算三数之和。
   - 在找到更接近目标值的和时，更新结果。

### 核心算法：
- **双指针法**：通过固定一个数，然后使用双指针从剩余部分寻找另两个数，保证三数之和尽量接近目标值。

### 边界条件：
- 当数组长度小于3时，无法找到三元组，可以提前返回。
- 如果三数之和刚好等于目标值，则直接返回该和。

### 时间复杂度：
- 排序的时间复杂度为 `O(n log n)`，双指针法的时间复杂度为 `O(n^2)`。因此，总时间复杂度为 `O(n^2)`。