---
layout: post
title:  "137. 只出现一次的数字 II"
categories: arithmetic
---

[137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii)

### 题目描述

**单一数字 II**：给定一个整数数组，其中每个元素出现三次，除了一个元素只出现一次。找出那个只出现一次的元素。

#### 示例 1：

输入：
```
[2, 2, 3, 2]
```

输出：
```
3
```

#### 示例 2：

输入：
```
[0, 1, 0, 1, 0, 1, 99]
```

输出：
```
99
```

#### 提示：
- `1 <= nums.length <= 3 * 10^4`
- `-2^31 <= nums[i] <= 2^31 - 1`
- 数组中总是存在一个只出现一次的元素。

---

### 解题思路

1. **问题的本质**：
   - 题目要求在一个数组中找到那个只出现一次的数字，而其他数字都出现三次。
   - 传统的使用异或运算的方式不适用，因为异或只能帮助我们处理一对一的情况，即每个数字出现两次的情况。

2. **利用位运算的技巧**：
   - 可以使用 **位计数** 的方法来解决这个问题。我们可以通过统计每一位上的1的数量来判断哪个数字出现了一次。
   - 假设我们有一个32位的数字（考虑到 `-2^31 <= nums[i] <= 2^31 - 1`），每一位上1的个数应该是3的倍数，除非那个数字出现了1次，它在某一位上的1的个数不满足3的倍数。
   - 基于此，我们可以用两个变量 `ones` 和 `twos` 来记录每一位上1的个数。
     - `ones` 记录所有数字中某一位上出现1的个数（模3 = 1）。
     - `twos` 记录所有数字中某一位上出现1的个数（模3 = 2）。
   - 对于每个数字，通过 `ones` 和 `twos` 来更新，最终 `ones` 就会保存那个只出现一次的数字。

3. **步骤解析**：
   - 遍历数组中的每个数字。
   - 对每个数字，通过位运算更新 `ones` 和 `twos`。
   - 最终，`ones` 将会包含那个只出现一次的数字。

4. **时间复杂度**：
   - 遍历数组一次，时间复杂度为 `O(n)`，其中 `n` 是数组的长度。

5. **空间复杂度**：
   - 使用常数空间 `O(1)`，仅用了两个变量来保存中间结果。

---

### C语言解答

```c
#include <stdio.h>

int singleNumber(int* nums, int numsSize) {
    int ones = 0, twos = 0;
    
    // 遍历数组中的每个数字
    for (int i = 0; i < numsSize; i++) {
        // 更新ones和twos
        twos |= ones & nums[i];  // 记录出现两次的位
        ones ^= nums[i];         // 记录出现一次的位
        
        // 若某一位的count为3次，清除该位
        int mask = ~(ones & twos);
        ones &= mask;
        twos &= mask;
    }
    
    return ones;  // 最终返回出现一次的数字
}

int main() {
    int nums[] = {0, 1, 0, 1, 0, 1, 99};
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
        int ones = 0, twos = 0;
        
        // 遍历数组中的每个数字
        for (int num : nums) {
            // 更新ones和twos
            twos |= ones & num;  // 记录出现两次的位
            ones ^= num;         // 记录出现一次的位
            
            // 若某一位的count为3次，清除该位
            int mask = ~(ones & twos);
            ones &= mask;
            twos &= mask;
        }
        
        return ones;  // 最终返回出现一次的数字
    }
};

int main() {
    Solution solution;
    vector<int> nums = {0, 1, 0, 1, 0, 1, 99};
    
    int result = solution.singleNumber(nums);
    cout << "只出现一次的数字是: " << result << endl;
    
    return 0;
}
```

### 解析

1. **位运算更新**：
   - `twos |= ones & num`：表示更新 `twos`，当 `ones` 中某一位为1并且 `num` 中该位为1时，`twos` 中相应的位就变为1。
   - `ones ^= num`：表示更新 `ones`，如果 `num` 中某一位为1，则将该位的状态切换。
   - `mask = ~(ones & twos)`：通过 `ones` 和 `twos` 的按位与得到一个掩码 `mask`，清除出现三次的位。
   - `ones &= mask` 和 `twos &= mask`：通过与掩码相与，将那些出现三次的位清除。

2. **最终结果**：
   - 遍历结束后，`ones` 中保存的就是那个只出现一次的数字。

3. **时间和空间复杂度**：
   - 时间复杂度是 `O(n)`，其中 `n` 是数组的长度，因为我们只需要遍历数组一次。
   - 空间复杂度是 `O(1)`，我们只用了常数空间来保存中间的结果。

### 总结

通过位运算，我们成功解决了题目中的要求，在 `O(n)` 的时间复杂度内找到了只出现一次的数字，并且空间复杂度仅为 `O(1)`，是一种高效的解法。