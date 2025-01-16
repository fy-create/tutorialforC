---
layout: post
title:  "220. 存在重复元素 III"
categories: arithmetic
---

[220. 存在重复元素 III](https://leetcode.cn/problems/contains-duplicate-iii)

### 题目描述

给你一个整数数组 `nums` 和两个整数 `k` 和 `t`，请你判断是否存在两个不同下标 `i` 和 `j`，使得：

1. `abs(nums[i] - nums[j]) <= t`
2. `abs(i - j) <= k`

如果存在，返回 `true`；否则，返回 `false`。

---

**示例 1：**

```
输入：nums = [1,2,3,1], k = 3, t = 0
输出：true
```

**示例 2：**

```
输入：nums = [1,0,1,1], k = 1, t = 2
输出：true
```

**示例 3：**

```
输入：nums = [1,5,9,1,5,9], k = 2, t = 3
输出：false
```

---

**提示：**

- `0 <= nums.length <= 2 * 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `0 <= k <= 10⁴`
- `0 <= t <= 2³¹ - 1`

---

### 解题思路

此问题需要满足两个条件：
1. 两个值之间的差距不超过 `t`。
2. 两个值的下标差距不超过 `k`。

使用滑动窗口和有序集合解决问题：

1. **滑动窗口**：
   - 保持滑动窗口的大小不超过 `k`，窗口存储 `k` 个范围内的数字。

2. **有序集合**：
   - 在窗口中查找满足条件的值是否存在。
   - 使用有序数据结构（如 C++ 中的 `std::set` 或平衡二叉树）实现快速插入和查找。

3. **操作步骤**：
   - 遍历数组，对于每个 `nums[i]`：
     - 在有序集合中找到大于等于 `nums[i] - t` 的最小值，判断其是否小于等于 `nums[i] + t`。
     - 如果满足条件，返回 `true`。
     - 将 `nums[i]` 加入集合，如果集合大小超过 `k`，移除最早加入的元素。

4. **时间复杂度**：
   - 插入、删除和查找操作的复杂度为 O(log k)，总复杂度为 O(n log k)。

5. **空间复杂度**：
   - 使用一个大小为 `k` 的滑动窗口，空间复杂度为 O(k)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <limits.h>

// 比较函数用于排序
int compare(const void* a, const void* b) {
    return (*(long long*)a - *(long long*)b);
}

// 滑动窗口实现
bool containsNearbyAlmostDuplicate(int* nums, int numsSize, int k, int t) {
    if (numsSize < 2 || k == 0) {
        return false;
    }

    long long* window = (long long*)malloc(sizeof(long long) * (k + 1));
    int size = 0;

    for (int i = 0; i < numsSize; i++) {
        // 检查窗口内是否存在符合条件的数
        for (int j = 0; j < size; j++) {
            if (abs(nums[i] - window[j]) <= t) {
                free(window);
                return true;
            }
        }

        // 添加当前元素到窗口
        if (size < k) {
            window[size++] = nums[i];
        } else {
            // 移除最旧的元素并添加新元素
            for (int j = 0; j < size - 1; j++) {
                window[j] = window[j + 1];
            }
            window[size - 1] = nums[i];
        }
    }

    free(window);
    return false;
}

// 测试函数
int main() {
    int nums[] = {1, 2, 3, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int k = 3, t = 0;

    printf("结果: %s\n", containsNearbyAlmostDuplicate(nums, numsSize, k, t) ? "true" : "false");

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <set>

using namespace std;

class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int k, int t) {
        if (nums.size() < 2 || k == 0) {
            return false;
        }

        set<long long> window; // 使用有序集合实现滑动窗口

        for (int i = 0; i < nums.size(); i++) {
            // 找到大于等于 nums[i] - t 的最小值
            auto lower = window.lower_bound((long long)nums[i] - t);

            // 检查是否满足条件
            if (lower != window.end() && *lower <= (long long)nums[i] + t) {
                return true;
            }

            // 将当前元素加入窗口
            window.insert(nums[i]);

            // 如果窗口大小超过 k，移除最旧的元素
            if (window.size() > k) {
                window.erase(nums[i - k]);
            }
        }

        return false;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 1};
    int k = 3, t = 0;

    cout << "结果: " << (sol.containsNearbyAlmostDuplicate(nums, k, t) ? "true" : "false") << endl;

    return 0;
}
```

---

### 代码说明

1. **滑动窗口**：
   - 窗口大小限制为 `k`，每次只需维护窗口内的元素。

2. **有序集合**：
   - 使用 `std::set` 实现快速插入、删除和查找操作。

3. **时间复杂度**：
   - C++ 中使用 `set`，插入和查找的时间复杂度为 O(log k)，总复杂度为 O(n log k)。

4. **空间复杂度**：
   - 使用滑动窗口存储最多 `k` 个元素，空间复杂度为 O(k)。