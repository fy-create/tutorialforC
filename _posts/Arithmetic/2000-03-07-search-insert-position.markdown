---
layout: post
title:  "35. 搜索插入位置"
categories: arithmetic
---

[35. 搜索插入位置](https://leetcode.cn/problems/search-insert-position)

## 题目要求

给定一个 **排序数组** `nums` 和一个目标值 `target`，你需要在数组中查找目标值 `target` 所在的位置，如果目标值不存在，则返回它应该被插入的位置。

请返回一个整数，表示目标值 `target` 应该插入的位置。

**注意**: 你可以假设 `nums` 是一个非递减排序数组。

### 示例 1:

**输入:**

```plaintext
nums = [1, 3, 5, 6], target = 5
```

**输出:**

```plaintext
2
```

**解释:**  
目标值 `5` 已经在数组中，且索引为 `2`。

### 示例 2:

**输入:**

```plaintext
nums = [1, 3, 5, 6], target = 2
```

**输出:**

```plaintext
1
```

**解释:**  
目标值 `2` 不在数组中，应该插入到索引 `1` 处，以保持数组的顺序。

### 示例 3:

**输入:**

```plaintext
nums = [1, 3, 5, 6], target = 7
```

**输出:**

```plaintext
4
```

**解释:**  
目标值 `7` 不在数组中，应该插入到索引 `4` 处。

### 示例 4:

**输入:**

```plaintext
nums = [1, 3, 5, 6], target = 0
```

**输出:**

```plaintext
0
```

**解释:**  
目标值 `0` 不在数组中，应该插入到索引 `0` 处。

### 提示:

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 为非递减排列的整数数组。
- `-10^4 <= target <= 10^4`

## 解题思路

### 思路：

1. **二分查找**：
   - 给定的是一个已排序的数组，使用二分查找可以在 O(log n) 时间复杂度内找到目标值 `target` 应该插入的位置。
   - 我们需要通过二分查找确定一个位置，使得在该位置插入 `target` 后，数组仍然保持有序。
   - 具体步骤是：
     1. 设置两个指针 `left` 和 `right`，分别指向数组的起始和结束位置。
     2. 计算中间位置 `mid`。
     3. 如果 `nums[mid] == target`，直接返回 `mid`，即目标值已存在。
     4. 如果 `nums[mid] < target`，说明目标值应该在右侧，更新 `left = mid + 1`。
     5. 如果 `nums[mid] > target`，说明目标值应该在左侧，更新 `right = mid - 1`。
     6. 最后，`left` 就是 `target` 应该插入的位置。

2. **边界情况**：
   - 如果 `target` 小于数组中的所有元素，`left` 会被设置为 `0`，即 `target` 应该插入在最前面。
   - 如果 `target` 大于数组中的所有元素，`left` 会被设置为 `nums.length`，即 `target` 应该插入在数组的最后面。

### C语言解法

```c
#include <stdio.h>

// 使用二分查找来找到目标值应该插入的位置
int searchInsert(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    
    // 进行二分查找
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;  // 如果找到目标值，直接返回索引
        } else if (nums[mid] < target) {
            left = mid + 1;  // 目标值在右侧，更新 left
        } else {
            right = mid - 1;  // 目标值在左侧，更新 right
        }
    }
    
    // 如果没有找到目标值，left 就是目标值应该插入的位置
    return left;
}

int main() {
    int nums[] = {1, 3, 5, 6};
    int target = 5;
    int size = 4;
    
    printf("Insert position: %d\n", searchInsert(nums, size, target));  // 输出 2
    
    target = 2;
    printf("Insert position: %d\n", searchInsert(nums, size, target));  // 输出 1
    
    target = 7;
    printf("Insert position: %d\n", searchInsert(nums, size, target));  // 输出 4
    
    target = 0;
    printf("Insert position: %d\n", searchInsert(nums, size, target));  // 输出 0
    
    return 0;
}
```

### C++ 解法

C++ 中，我们可以利用 `std::lower_bound` 来实现二分查找，这样可以简化代码。

### C++ 代码实现：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        // 使用 lower_bound 查找目标值应该插入的位置
        auto it = lower_bound(nums.begin(), nums.end(), target);
        return it - nums.begin();  // 返回位置索引
    }
};

int main() {
    Solution solution;
    
    vector<int> nums = {1, 3, 5, 6};
    int target = 5;
    cout << "Insert position: " << solution.searchInsert(nums, target) << endl;  // 输出 2
    
    target = 2;
    cout << "Insert position: " << solution.searchInsert(nums, target) << endl;  // 输出 1
    
    target = 7;
    cout << "Insert position: " << solution.searchInsert(nums, target) << endl;  // 输出 4
    
    target = 0;
    cout << "Insert position: " << solution.searchInsert(nums, target) << endl;  // 输出 0
    
    return 0;
}
```

### 代码解析

#### C语言代码解析：
- 我们通过设置 `left` 和 `right` 指针，利用二分查找来确定 `target` 的插入位置。
- 在每次比较时，如果 `nums[mid] == target`，则直接返回 `mid`；如果 `nums[mid] < target`，则更新 `left` 指针；如果 `nums[mid] > target`，则更新 `right` 指针。
- 如果没有找到目标值，`left` 就是目标值应插入的位置。

#### C++ 代码解析：
- 使用了 STL 中的 `lower_bound` 函数，`lower_bound` 返回一个指向目标值 `target` 或第一个大于 `target` 的位置的迭代器。如果 `target` 不存在，`lower_bound` 会返回第一个大于 `target` 的位置。
- 通过计算 `it - nums.begin()`，得到目标值应该插入的位置。

### 时间复杂度分析：
- **时间复杂度：**  
  由于我们使用的是二分查找，时间复杂度为 O(log n)，其中 `n` 是数组的长度。
  
- **空间复杂度：**  
  C语言解法中，空间复杂度为 O(1)，因为我们只使用了常数级别的额外空间。
  C++ 解法中，`lower_bound` 的空间复杂度也是 O(1)，但 STL 容器的空间开销为 O(n)。

### 总结：
- 本题的关键是利用排序数组的特性，使用二分查找来高效地找到目标值 `target` 应该插入的位置。
- 通过 `lower_bound` 函数，C++ 的解法实现简洁且高效。