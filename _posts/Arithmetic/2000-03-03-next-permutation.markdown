---
layout: post
title:  "31. 下一个排列"
categories: arithmetic
---

[31. 下一个排列](https://leetcode.cn/problems/next-permutation)

## 题目要求

实现 **“下一个排列”**，即给定一个整数数组 `nums`，将其重新排列成 **字典序**下一个更大的排列。若不存在下一个更大的排列，重新将数组排列成最小的排列（即升序排列）。

### 示例 1:

**输入:**

```plaintext
nums = [1, 2, 3]
```

**输出:**

```plaintext
[1, 3, 2]
```

**解释:**

`[1, 2, 3]` 的下一个排列是 `[1, 3, 2]`。

### 示例 2:

**输入:**

```plaintext
nums = [3, 2, 1]
```

**输出:**

```plaintext
[1, 2, 3]
```

**解释:**

`[3, 2, 1]` 是最大排列，重新排列为最小排列 `[1, 2, 3]`。

### 示例 3:

**输入:**

```plaintext
nums = [1, 1, 5]
```

**输出:**

```plaintext
[1, 5, 1]
```

## 提示:

- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100

## 解题思路

**目标：** 给定一个数列，找到下一个字典序的排列。字典序的排列是一种从小到大的排列，我们需要将数组转到下一个更大的排列。如果当前已经是最大排列，则返回最小的排列。

### 解题步骤：

1. **从后向前扫描，找到第一个降序对**  
   我们从数组的尾部开始扫描，找出第一个 `nums[i] < nums[i+1]` 的位置。这个位置 `i` 就是我们需要调整的地方，因为这是下一个排列变化的起点。

2. **如果未找到这样的对，说明当前排列已经是最大排列**  
   如果没有找到这样的 `i`，说明数组已经是降序排列，无法找到更大的排列。此时，直接将数组排序成最小排列（升序排列）。

3. **找到比 `nums[i]` 大的最小元素**  
   接下来，我们需要在 `i+1` 到数组末尾中找到一个比 `nums[i]` 大的元素，并将它与 `nums[i]` 交换。这样做可以保证我们得到一个稍大于当前排列的最小排列。

4. **将 `i` 后面的所有元素按升序排列**  
   最后，我们对 `i` 后面的部分进行升序排列，确保我们得到的下一个排列是最小的更大排列。

### C语言解法

```c
#include <stdio.h>
#include <stdlib.h>

// 辅助函数：交换数组中的两个元素
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 主函数：找到下一个排列
void nextPermutation(int* nums, int numsSize) {
    if (numsSize <= 1) return;

    int i = numsSize - 2;

    // 第一步：找到第一个降序对
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // 如果找到了降序对
    if (i >= 0) {
        int j = numsSize - 1;
        // 第二步：找到比 nums[i] 大的最小元素
        while (nums[j] <= nums[i]) {
            j--;
        }
        // 交换 nums[i] 和 nums[j]
        swap(&nums[i], &nums[j]);
    }

    // 第三步：将 i 后面的部分升序排列
    int left = i + 1;
    int right = numsSize - 1;
    while (left < right) {
        swap(&nums[left], &nums[right]);
        left++;
        right--;
    }
}

int main() {
    int nums[] = {1, 2, 3};
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    nextPermutation(nums, numsSize);

    for (int i = 0; i < numsSize; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
```

### C++ 解法

C++ 实现时，我们可以利用 `std::swap` 函数来简化交换操作，同时封装到一个 `Solution` 类中。

### C++ 代码实现：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 主函数：找到下一个排列
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return;

        int i = n - 2;

        // 第一步：找到第一个降序对
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }

        // 如果找到了降序对
        if (i >= 0) {
            int j = n - 1;
            // 第二步：找到比 nums[i] 大的最小元素
            while (nums[j] <= nums[i]) {
                j--;
            }
            // 交换 nums[i] 和 nums[j]
            swap(nums[i], nums[j]);
        }

        // 第三步：将 i 后面的部分升序排列
        reverse(nums.begin() + i + 1, nums.end());
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 2, 3};

    solution.nextPermutation(nums);

    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

### 代码解析

#### C语言代码解析：
- `swap` 函数是用来交换数组中两个元素的辅助函数。
- `nextPermutation` 函数实现了找到下一个排列的核心逻辑。首先从数组的末尾开始查找降序对。若找到了，便从后面部分寻找一个合适的交换元素，并进行交换。最后，我们对交换后数组的后半部分进行升序排列。
- 在 `main` 函数中，我们创建了一个整数数组并调用 `nextPermutation` 函数，输出结果。

#### C++ 代码解析：
- C++ 中我们利用 `std::swap` 来简化元素交换过程。
- `reverse` 函数用来将从 `i+1` 到数组末尾的部分进行升序排列。`reverse` 函数直接修改原数组，省去了手动循环交换的过程。
- `Solution` 类封装了 `nextPermutation` 函数，`main` 函数中通过创建 `Solution` 对象来调用。

### 时间复杂度分析：
- **时间复杂度：**  
  - 查找第一个降序对需要 O(n) 的时间。
  - 查找合适的交换元素也需要 O(n) 的时间。
  - 最后对部分数组进行升序排列需要 O(n) 的时间。
  
  因此，整体时间复杂度为 O(n)，其中 `n` 是数组的长度。

- **空间复杂度：**  
  - 我们只用了常数级的额外空间，空间复杂度为 O(1)。

### 总结：
- 本题通过模拟字典序下一个排列的过程，主要依赖于对数组部分进行交换与升序排序。
- 通过从后往前扫描找到降序对，保证了可以找到下一个更大的排列。