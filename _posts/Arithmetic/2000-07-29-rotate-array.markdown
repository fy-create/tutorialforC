---
layout: post
title:  "189. 轮转数组"
categories: arithmetic
---

[189. 轮转数组](https://leetcode.cn/problems/rotate-array)

### 题目描述

给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

---

**示例 1：**

```
输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右轮转 1 步: [7,1,2,3,4,5,6]
向右轮转 2 步: [6,7,1,2,3,4,5]
向右轮转 3 步: [5,6,7,1,2,3,4]
```

**示例 2：**

```
输入：nums = [-1,-100,3,99], k = 2
输出：[3,99,-1,-100]
解释: 
向右轮转 1 步: [99,-1,-100,3]
向右轮转 2 步: [3,99,-1,-100]
```

---

**提示：**

- `1 <= nums.length <= 10⁵`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `0 <= k <= 10⁵`

---

### 解题思路

1. **数学分析**：
   - 将数组元素右移 `k` 步，与直接右移 `k % n` 步的效果相同，其中 `n` 是数组长度。
   - 问题可转化为将数组分为两部分，分别进行反转，再整体反转得到最终结果。

2. **三次反转法**：
   - 先将整个数组反转。
   - 再将前 `k` 个元素反转。
   - 最后将剩余的部分反转。
   - 这种方法只需要 O(1) 的额外空间，时间复杂度为 O(n)。

3. **时间复杂度**：
   - 每次反转需要 O(n) 时间，三次反转的总时间复杂度为 O(n)。

4. **空间复杂度**：
   - 只使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>

// 反转数组的指定区间
void reverse(int* nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

// 右旋转数组
void rotate(int* nums, int numsSize, int k) {
    k %= numsSize; // 防止 k 大于数组长度

    // 三次反转
    reverse(nums, 0, numsSize - 1);     // 反转整个数组
    reverse(nums, 0, k - 1);            // 反转前 k 个元素
    reverse(nums, k, numsSize - 1);     // 反转剩余部分
}

// 打印数组
void printArray(int* nums, int numsSize) {
    for (int i = 0; i < numsSize; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");
}

// 测试函数
int main() {
    int nums[] = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;
    int numsSize = sizeof(nums) / sizeof(nums[0]);

    printf("原数组: ");
    printArray(nums, numsSize);

    rotate(nums, numsSize, k);

    printf("旋转后: ");
    printArray(nums, numsSize);

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
    // 右旋转数组
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n; // 防止 k 大于数组长度

        // 三次反转
        reverse(nums.begin(), nums.end());         // 反转整个数组
        reverse(nums.begin(), nums.begin() + k);   // 反转前 k 个元素
        reverse(nums.begin() + k, nums.end());     // 反转剩余部分
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3, 4, 5, 6, 7};
    int k = 3;

    cout << "原数组: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;

    sol.rotate(nums, k);

    cout << "旋转后: ";
    for (int num : nums) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明

1. **反转函数**：
   - 通过交换元素反转数组的指定区间。

2. **三次反转**：
   - 通过分段反转实现右移的效果。

3. **时间复杂度**：
   - 每次反转需要 O(n) 时间，总时间复杂度为 O(n)。

4. **空间复杂度**：
   - 不使用额外存储空间，空间复杂度为 O(1)。