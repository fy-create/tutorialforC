---
layout: post
title:  "136. 只出现一次的数字"
categories: arithmetic
---

[136. 只出现一次的数字](https://leetcode.cn/problems/single-number)

### 题目描述

**单一数字**：给定一个非空整数数组 `nums` ，其中除了某个元素只出现一次之外，其他每个元素都出现两次。找出那个只出现一次的元素。

#### 示例 1：

输入：
```
[2, 2, 1]
```

输出：
```
1
```

#### 示例 2：

输入：
```
[4, 1, 2, 1, 2]
```

输出：
```
4
```

#### 提示：
- 你的算法应该是 `O(n)` 时间复杂度，并且使用 `O(1)` 的额外空间复杂度。

---

### 解题思路

1. **异或操作的特性**：
   - 异或操作（XOR）是一个非常有趣的操作，满足以下几个性质：
     1. `a ^ a = 0` （任何数和它自己异或结果是 0）
     2. `a ^ 0 = a` （任何数和 0 异或结果是它本身）
     3. 异或运算具有交换性和结合性。
   - 利用这个特性，我们可以将数组中的所有数字进行异或操作。因为大多数数字都出现两次，所以它们会“相互抵消”，最终结果就是只出现一次的数字。

2. **步骤解析**：
   - 我们遍历数组中的每个元素，并将它们与一个初始值为 0 的变量进行异或。
   - 由于异或运算的特性，所有出现两次的数字都会相互抵消，最终变量中会保留那个只出现一次的数字。
   - 这样，我们只需要一次遍历，且只用了常数空间。

3. **时间复杂度**：
   - 因为我们只需要遍历数组一次，所以时间复杂度为 `O(n)`，其中 `n` 是数组的长度。

4. **空间复杂度**：
   - 我们只用了一个额外的变量来存储中间结果，所以空间复杂度是 `O(1)`。

---

### C语言解答

```c
#include <stdio.h>

int singleNumber(int* nums, int numsSize) {
    int result = 0;
    
    // 遍历数组，使用异或操作
    for (int i = 0; i < numsSize; i++) {
        result ^= nums[i];
    }
    
    return result;
}

int main() {
    int nums[] = {4, 1, 2, 1, 2};
    int size = sizeof(nums) / sizeof(nums[0]);
    
    int result = singleNumber(nums, size);
    printf("只出现一次的数字是: %d\n", result);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int result = 0;
        
        // 遍历数组，使用异或操作
        for (int num : nums) {
            result ^= num;
        }
        
        return result;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {4, 1, 2, 1, 2};
    
    int result = solution.singleNumber(nums);
    cout << "只出现一次的数字是: " << result << endl;
    
    return 0;
}
```

### 解析

1. **异或运算的解释**：
   - 在 `C` 和 `C++` 中，我们使用一个变量 `result` 来存储异或的结果。
   - 对于数组中的每个数字，执行异或操作 `result ^= num`。由于异或运算的性质，所有成对的数字会互相抵消，最终 `result` 会保留那个只出现一次的数字。

2. **遍历过程**：
   - 在 `C` 代码中，我们通过循环遍历数组，每次将当前数字与 `result` 进行异或操作。
   - 在 `C++` 代码中，我们使用范围 for 循环（`for (int num : nums)`）来遍历数组，代码更加简洁。

3. **最终结果**：
   - 遍历结束后，`result` 存储的就是数组中唯一没有重复的数字。

4. **空间和时间复杂度**：
   - 时间复杂度：`O(n)`，我们只需要遍历一次数组。
   - 空间复杂度：`O(1)`，只使用了一个变量 `result` 来存储中间结果。

### 结论

通过使用异或运算的特性，我们能够高效地找出数组中唯一一个只出现一次的元素，且只需要遍历一次数组，空间复杂度为常数级别，适合解决大规模数据问题。