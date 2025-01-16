---
layout: post
title:  "324. 摆动排序 II"
categories: arithmetic
---

[324. 摆动排序 II](https://leetcode.cn/problems/wiggle-sort-ii)

Here is the content of the problem from Leetcode:

### 题目描述

给定一个整数数组 `nums` ，重新排列数组中的数字，使得它们满足如下规则：

- 对于每个 `i`，满足 `nums[2 * i] < nums[2 * i + 1]` 和 `nums[2 * i + 1] > nums[2 * i + 2]`（如果存在）。
  
请你重新排列 `nums` ，使得它符合要求。

### 示例 1:

输入：
```plaintext
nums = [1, 5, 1, 1, 6, 4]
```
输出：
```plaintext
[1, 5, 1, 6, 1, 4]
```

### 示例 2:

输入：
```plaintext
nums = [1, 3, 2, 2, 3, 1]
```
输出：
```plaintext
[1, 3, 1, 3, 1, 2]
```

### 提示:
- `1 <= nums.length <= 5 * 10^4`
- `0 <= nums[i] <= 5000`

---

### 解题思路

这个问题要求我们重新排列数组，保证数组满足“wiggle sort”的条件，其中“wiggle sort”的定义是：每对相邻元素应满足 `nums[2 * i] < nums[2 * i + 1]` 和 `nums[2 * i + 1] > nums[2 * i + 2]`。

为了解决这个问题，我们可以使用以下步骤：

1. **排序数组**：首先，对数组进行排序。这是因为我们希望在小数和大数之间交替排列，排序可以帮助我们方便地选择最小和最大的元素。
2. **交替排列**：在排序后的数组中，将数组的偶数索引位置填充为较小的元素，奇数索引位置填充为较大的元素。

#### 步骤：
1. 对数组进行排序。
2. 使用两个指针，分别指向排序数组的前半部分和后半部分。我们可以将较小的元素放到偶数索引位置，将较大的元素放到奇数索引位置。

#### 时间复杂度：
- **时间复杂度**：O(n log n)，主要是排序操作的复杂度。
- **空间复杂度**：O(1)，如果我们在原地对数组进行操作。

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 比较函数，用于排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// 重新排列数组使其满足 wiggle sort
void wiggleSort(int* nums, int numsSize) {
    // 先对数组进行排序
    qsort(nums, numsSize, sizeof(int), compare);

    // 临时数组用于存放重新排列的结果
    int* temp = (int*)malloc(numsSize * sizeof(int));
    int left = 0, right = numsSize - 1;

    // 从两端交替取数
    for (int i = 0; i < numsSize; i++) {
        if (i % 2 == 0) {
            temp[i] = nums[left++];
        } else {
            temp[i] = nums[right--];
        }
    }

    // 将结果复制回原数组
    for (int i = 0; i < numsSize; i++) {
        nums[i] = temp[i];
    }

    free(temp);
}

void printArray(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");
}

int main() {
    int nums[] = {1, 5, 1, 1, 6, 4};
    int size = sizeof(nums) / sizeof(nums[0]);
    wiggleSort(nums, size);
    printArray(nums, size);  // 1 5 1 6 1 4
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        int n = nums.size();
        
        // 先对数组进行排序
        sort(nums.begin(), nums.end());

        // 临时数组用于存放重新排列的结果
        vector<int> result(n);
        int left = 0, right = n - 1;

        // 从两端交替取数
        for (int i = 0; i < n; i++) {
            if (i % 2 == 0) {
                result[i] = nums[left++];
            } else {
                result[i] = nums[right--];
            }
        }

        // 将结果复制回原数组
        nums = result;
    }
};

void printArray(const vector<int>& nums) {
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;
}

int main() {
    Solution solution;
    vector<int> nums = {1, 5, 1, 1, 6, 4};
    solution.wiggleSort(nums);
    printArray(nums);  // 1 5 1 6 1 4
    return 0;
}
```

### 代码解释
1. **排序**：我们首先对数组进行排序，以便可以将小的元素放在偶数位置，较大的元素放在奇数位置。
2. **交替插入**：使用两个指针，分别指向数组的起始和末尾，交替将元素放入新的结果数组中。
3. **结果复制**：最后将重新排列的结果赋值回原数组。

### 时间复杂度
- **时间复杂度**：O(n log n)，排序操作的复杂度。
- **空间复杂度**：O(n)，需要一个额外的数组存储排列结果。