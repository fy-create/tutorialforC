---
layout: post
title:  "268. 丢失的数字"
categories: arithmetic
---

[268. 丢失的数字](https://leetcode.cn/problems/missing-number)

### 题目：**Missing Number**

#### 题目描述：

给定一个包含 `n` 个数字的数组 `nums`，其中包含了从 `0` 到 `n` 中的所有数字，但其中有一个数字缺失。请你找出这个缺失的数字。

请实现一个算法，时间复杂度为 `O(n)`，并且使用 `O(1)` 的空间复杂度。

#### 示例 1：

**输入：**
```plaintext
nums = [3, 0, 1]
```

**输出：**
```plaintext
2
```

#### 示例 2：

**输入：**
```plaintext
nums = [0, 1]
```

**输出：**
```plaintext
2
```

#### 示例 3：

**输入：**
```plaintext
nums = [9,6,4,2,3,5,7,0,1]
```

**输出：**
```plaintext
8
```

#### 提示：
- `n == nums.length`
- `1 <= n <= 10000`
- `0 <= nums[i] <= n`
- `nums` 中的所有数字都是唯一的。

---

### 解题思路：

这个问题的关键是利用数学公式或者位运算来优化求解过程。我们可以利用如下两种方式来实现：

#### 方法 1: 数学公式法
我们知道，从 `0` 到 `n` 的数字和是：
\[ \text{sum}(0 \text{ to } n) = \frac{n \times (n + 1)}{2} \]
而数组中已经有了 `n` 个数字，其中一个数字缺失。所以我们可以计算所有数字的和，并减去数组中所有数字的和，剩下的差值就是缺失的数字。

具体步骤：
1. 计算 `0` 到 `n` 的总和：`expected_sum = n * (n + 1) / 2`。
2. 计算数组中的总和：`actual_sum = sum(nums)`。
3. 缺失的数字就是 `expected_sum - actual_sum`。

#### 方法 2: 位运算法（XOR）
XOR 操作具有如下性质：
- `a ^ a = 0` （相同的数 XOR 后结果为 0）
- `a ^ 0 = a` （任何数与 0 XOR 后还是它本身）

利用这个性质，我们可以对所有的数组元素和从 `0` 到 `n` 的数字做 XOR 运算。由于每个数字都会和自己进行 XOR，因此最终结果就是缺失的数字。

具体步骤：
1. 初始化 `xor_sum = 0`。
2. 对数组中的每个元素做 XOR 操作。
3. 对从 `0` 到 `n` 的每个数字也做 XOR 操作。
4. 最终 `xor_sum` 的值就是缺失的数字。

---

### C语言解答：

```c
#include <stdio.h>

int missingNumber(int* nums, int numsSize) {
    // 使用数学公式法
    int expected_sum = (numsSize * (numsSize + 1)) / 2;
    int actual_sum = 0;
    
    for (int i = 0; i < numsSize; i++) {
        actual_sum += nums[i];
    }
    
    return expected_sum - actual_sum;
}

int main() {
    int nums[] = {3, 0, 1};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int missing = missingNumber(nums, numsSize);
    printf("Missing number: %d\n", missing);
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
    // 方法 1：数学公式法
    int missingNumber(vector<int>& nums) {
        int n = nums.size();
        int expected_sum = n * (n + 1) / 2;  // 计算0到n的总和
        int actual_sum = 0;

        for (int num : nums) {
            actual_sum += num;
        }

        return expected_sum - actual_sum;
    }
    
    // 方法 2：位运算法
    int missingNumberXOR(vector<int>& nums) {
        int n = nums.size();
        int xor_sum = 0;

        // 对nums数组中的每个元素和0到n做XOR
        for (int i = 0; i < n; i++) {
            xor_sum ^= nums[i] ^ i;
        }
        
        // 最后xor_sum会是缺失的数字
        xor_sum ^= n;
        return xor_sum;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {3, 0, 1};
    
    int missing1 = solution.missingNumber(nums);
    cout << "Missing number (Math): " << missing1 << endl;

    int missing2 = solution.missingNumberXOR(nums);
    cout << "Missing number (XOR): " << missing2 << endl;

    return 0;
}
```

### 代码解析：

#### C语言解答：
- 我们使用数学公式法来计算缺失的数字，先计算期望的总和 `expected_sum`，然后计算数组的实际总和 `actual_sum`，最终结果是两者的差值，即为缺失的数字。

#### C++ 解答：
- 我们提供了两种方法，分别是数学公式法和位运算法。数学公式法的逻辑与 C 语言解答相同，位运算法则使用 XOR 运算，最终的 `xor_sum` 就是缺失的数字。

### 时间和空间复杂度：
- **时间复杂度**：`O(n)`，其中 `n` 是数组的长度。无论使用数学公式法还是位运算法，都需要遍历数组一次来计算和。
- **空间复杂度**：`O(1)`，不需要额外的空间来存储数据，所有操作都在原地进行。

### 总结：
- 本题可以通过数学公式或位运算两种方式来求解。
- 数学公式法简单直观，适用于大多数情况。
- 位运算法虽然稍微复杂一些，但也具有同样的时间复杂度，且可以避免溢出的问题。