---
layout: post
title:  "75. 颜色分类"
categories: arithmetic
---

[75. 颜色分类](https://leetcode.cn/problems/sort-colors)

### 题目描述

给定一个包含红色、白色和蓝色（用数组中的整数 0、1 和 2 分别表示）的数组 `nums`，请对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

我们使用整数 0、1 和 2 分别表示红色、白色和蓝色。

必须在不使用库内置的排序函数的情况下解决这个问题。

---

**示例 1：**

```
输入：nums = [2,0,2,1,1,0]
输出：[0,0,1,1,2,2]
```

**示例 2：**

```
输入：nums = [2,0,1]
输出：[0,1,2]
```

---

**提示：**

- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` 为 `0`、`1` 或 `2`

---

### 解题思路

我们可以使用以下两种方法来解决问题：

1. **计数排序**：
   - 遍历数组，统计每种颜色（0、1、2）的出现次数。
   - 根据统计结果，重新填充数组。

2. **双指针法（荷兰国旗问题）**：
   - 使用两个指针 `low` 和 `high`，分别表示红色的右边界和蓝色的左边界。
   - 遍历数组，用一个指针 `current` 遍历整个数组。
     - 如果当前元素是 0，与 `low` 指针交换，并将 `low` 和 `current` 指针向右移动。
     - 如果当前元素是 2，与 `high` 指针交换，并将 `high` 指针向左移动（此时不移动 `current`）。
     - 如果当前元素是 1，仅移动 `current` 指针。

双指针法的时间复杂度为 O(n)，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>

// 交换两个元素
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 双指针法对颜色进行排序
void sortColors(int* nums, int numsSize) {
    int low = 0, high = numsSize - 1, current = 0;

    while (current <= high) {
        if (nums[current] == 0) {
            // 将红色（0）移到数组前部
            swap(&nums[current], &nums[low]);
            low++;
            current++;
        } else if (nums[current] == 2) {
            // 将蓝色（2）移到数组后部
            swap(&nums[current], &nums[high]);
            high--;
        } else {
            // 跳过白色（1）
            current++;
        }
    }
}

// 测试函数
int main() {
    int nums[] = {2, 0, 2, 1, 1, 0};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    sortColors(nums, numsSize);

    printf("排序后的数组: ");
    for (int i = 0; i < numsSize; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, high = nums.size() - 1, current = 0;

        // 双指针法
        while (current <= high) {
            if (nums[current] == 0) {
                // 将红色（0）移到数组前部
                swap(nums[current], nums[low]);
                low++;
                current++;
            } else if (nums[current] == 2) {
                // 将蓝色（2）移到数组后部
                swap(nums[current], nums[high]);
                high--;
            } else {
                // 跳过白色（1）
                current++;
            }
        }
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {2, 0, 2, 1, 1, 0};

    sol.sortColors(nums);

    cout << "排序后的数组: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **双指针法**：
   - 使用 `low`、`high` 和 `current` 三个指针，分别管理红色的右边界、蓝色的左边界和当前遍历的位置。

2. **时间复杂度**：
   - 每个元素最多被操作两次，因此时间复杂度为 O(n)。

3. **空间复杂度**：
   - 仅使用了常数额外空间，空间复杂度为 O(1)。

4. **输出示例**：
   - 输入：`[2, 0, 2, 1, 1, 0]`
   - 输出：`[0, 0, 1, 1, 2, 2]`