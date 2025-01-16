---
layout: post
title:  "287. 寻找重复数"
categories: arithmetic
---

[287. 寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number)

### 题目：**Find the Duplicate Number**

#### 题目描述：
给定一个包含 `n + 1` 个整数的数组 `nums`，其中每个整数 `nums[i]` 都在 `1` 到 `n` 之间（包括 `1` 和 `n`）。可以证明，至少存在一个重复的整数，返回任意一个重复的数。

**你不能修改原数组（假设数组是只读的），并且你只能使用常数级别的空间复杂度。**

#### 示例：

**示例 1：**
```plaintext
输入：
nums = [1, 3, 4, 2, 2]
输出：
2
```

**示例 2：**
```plaintext
输入：
nums = [3, 1, 3, 4, 2]
输出：
3
```

#### 提示：
- `n == nums.length`
- `1 <= n <= 10^5`
- `1 <= nums[i] <= n`
- `nums` 中至少有一个重复的数字。

---

### 解题思路：

本题的关键是要求**不能修改原数组**，并且**空间复杂度必须是常数级别**。因此，我们不能直接使用哈希表或排序的方法，因为它们需要额外的空间。可以使用**二分查找**的思路来解决这个问题。

1. **数值范围限制**：
   - 数组中的元素在 `1` 到 `n` 之间，并且数组的长度是 `n + 1`。这意味着有一个数至少重复一次。

2. **二分查找法**：
   - 我们可以使用二分查找来寻找重复的数。由于数组中的数值在 `1` 到 `n` 之间，可以设定一个范围 `[1, n]` 来进行二分查找。
   - 对于每个中间值 `mid`，统计数组中小于等于 `mid` 的数字的个数。假设这个个数为 `count`：
     - 如果 `count > mid`，说明重复的数字在 `1` 到 `mid` 之间。
     - 如果 `count <= mid`，说明重复的数字在 `mid + 1` 到 `n` 之间。
   - 通过这种方式，逐步缩小范围，最终找到重复的数字。

3. **时间复杂度与空间复杂度**：
   - 时间复杂度是 `O(n log n)`，因为二分查找的时间复杂度是 `O(log n)`，而对于每个中间值，需要遍历一次数组，时间复杂度是 `O(n)`。
   - 空间复杂度是 `O(1)`，只使用常数级别的空间。

---

### C语言解答：

```c
#include <stdio.h>

int findDuplicate(int* nums, int numsSize) {
    int left = 1, right = numsSize - 1;
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        int count = 0;
        
        // 计算数组中小于等于 mid 的元素个数
        for (int i = 0; i < numsSize; i++) {
            if (nums[i] <= mid) {
                count++;
            }
        }
        
        // 如果 count > mid，则重复的数在 [left, mid] 范围内
        if (count > mid) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;  // 返回重复的数字
}

int main() {
    int nums[] = {1, 3, 4, 2, 2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    
    int result = findDuplicate(nums, numsSize);
    printf("重复的数字是: %d\n", result);  // 输出: 2
    
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int left = 1, right = nums.size() - 1;
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            int count = 0;
            
            // 计算数组中小于等于 mid 的元素个数
            for (int num : nums) {
                if (num <= mid) {
                    count++;
                }
            }
            
            // 如果 count > mid，则重复的数在 [left, mid] 范围内
            if (count > mid) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        return left;  // 返回重复的数字
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 3, 4, 2, 2};
    
    int result = solution.findDuplicate(nums);
    cout << "重复的数字是: " << result << endl;  // 输出: 2
    
    return 0;
}
```

### 代码解释：

1. **初始化二分查找的左右边界**：
   - `left` 设置为 `1`，`right` 设置为 `n`（`numsSize - 1`）。

2. **二分查找过程**：
   - 计算中间值 `mid`。
   - 遍历数组，统计小于等于 `mid` 的元素个数 `count`。
   - 如果 `count > mid`，说明重复的数在 `[left, mid]` 范围内，将右边界 `right` 更新为 `mid`。
   - 否则，重复的数在 `[mid + 1, right]` 范围内，将左边界 `left` 更新为 `mid + 1`。

3. **返回结果**：
   - 最终 `left` 和 `right` 会收敛到重复的数字。

### 复杂度分析：

- **时间复杂度**：
  - 每次二分查找将搜索空间缩小一半，因此最多进行 `log n` 次迭代。每次迭代需要遍历整个数组来计算 `count`，所以时间复杂度是 `O(n log n)`。
  
- **空间复杂度**：
  - 由于只使用了常数级别的空间（仅用 `left` 和 `right`），所以空间复杂度是 `O(1)`。

### 总结：

本题通过使用二分查找的方法，在不修改数组的情况下找到了重复的数字，且空间复杂度为常数级别，符合题目要求。