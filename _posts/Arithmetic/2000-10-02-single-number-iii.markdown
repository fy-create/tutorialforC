---
layout: post
title:  "260. 只出现一次的数字 III"
categories: arithmetic
---

[260. 只出现一次的数字 III](https://leetcode.cn/problems/single-number-iii)

### 题目描述

给定一个整数数组 `nums`，其中恰好有两个元素只出现一次，其余所有元素均出现两次。找出只出现一次的那两个元素。你可以按任意顺序返回答案。

**注意：**
- 你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？

**示例 1:**

```
输入: nums = [1,2,1,3,2,5]
输出: [3,5]
解释: 3 和 5 只出现一次。
```

**示例 2:**

```
输入: nums = [-1,0]
输出: [-1,0]
```

**示例 3:**

```
输入: nums = [0,1]
输出: [0,1]
```

**提示：**
- 2 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- 除了两个元素只出现一次外，其余每个元素均出现两次。

---

### 解题思路

这个问题可以通过位运算来解决。核心思想是利用异或运算的性质：

1. **异或运算的性质：**
   - 任何数和 0 异或的结果是它本身。
   - 任何数和其自身异或的结果是 0。
   - 异或运算满足交换律和结合律。

2. **解题步骤：**
   - 首先，对所有元素进行异或运算，得到的结果是两个只出现一次的元素的异或值 `xor_result`。
   - 在 `xor_result` 中，任意一个为 1 的位都表示这两个元素在该位上不同。
   - 找到 `xor_result` 中任意一个为 1 的位（例如最低位的 1），将数组分为两组：
     - 该位为 1 的元素。
     - 该位为 0 的元素。
   - 对这两组分别进行异或运算，得到的结果就是两个只出现一次的元素。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 函数原型
int* singleNumber(int* nums, int numsSize, int* returnSize);

// 实现函数
int* singleNumber(int* nums, int numsSize, int* returnSize) {
    int* result = (int*)malloc(2 * sizeof(int));
    *returnSize = 2;

    // 对所有元素进行异或运算
    int xor_result = 0;
    for (int i = 0; i < numsSize; i++) {
        xor_result ^= nums[i];
    }

    // 找到 xor_result 中最低位的 1
    int mask = 1;
    while ((xor_result & mask) == 0) {
        mask <<= 1;
    }

    // 将数组分为两组，并分别进行异或运算
    int num1 = 0, num2 = 0;
    for (int i = 0; i < numsSize; i++) {
        if ((nums[i] & mask) == 0) {
            num1 ^= nums[i];
        } else {
            num2 ^= nums[i];
        }
    }

    // 返回结果
    result[0] = num1;
    result[1] = num2;
    return result;
}

// 测试代码
int main() {
    int nums[] = {1, 2, 1, 3, 2, 5};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int returnSize;
    int* result = singleNumber(nums, numsSize, &returnSize);

    printf("只出现一次的两个元素: %d, %d\n", result[0], result[1]);

    free(result); // 释放内存
    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        // 对所有元素进行异或运算
        int xor_result = 0;
        for (int num : nums) {
            xor_result ^= num;
        }

        // 找到 xor_result 中最低位的 1
        int mask = 1;
        while ((xor_result & mask) == 0) {
            mask <<= 1;
        }

        // 将数组分为两组，并分别进行异或运算
        int num1 = 0, num2 = 0;
        for (int num : nums) {
            if ((num & mask) == 0) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }

        return {num1, num2};
    }
};

// 测试代码
int main() {
    vector<int> nums = {1, 2, 1, 3, 2, 5};
    Solution solution;
    vector<int> result = solution.singleNumber(nums);

    cout << "只出现一次的两个元素: " << result[0] << ", " << result[1] << endl;

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用异或运算找到两个只出现一次的元素。
   - 通过掩码将数组分为两组，分别进行异或运算。
   - 时间复杂度为 O(n)，空间复杂度为 O(1)。

2. **C++ 实现：**
   - 使用 STL 容器 `vector` 存储结果。
   - 利用位运算解决问题，代码简洁高效。
   - 时间复杂度与 C 语言实现相同。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地找到数组中只出现一次的两个元素。