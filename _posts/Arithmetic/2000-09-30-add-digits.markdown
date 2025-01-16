---
layout: post
title:  "258. 各位相加"
categories: arithmetic
---

[258. 各位相加](https://leetcode.cn/problems/add-digits)

### 题目：**Add Digits**

#### 题目描述：

给定一个非负整数 `num`，不断地将各个位上的数字相加，直到结果只有一位数字。

你可以将它看作是将数字“简化”到只有一位数字，或者用数学方法实现该过程。

**示例 1：**

**输入：**
```plaintext
38
```

**输出：**
```plaintext
2
```

**解释：**
第一次加法：3 + 8 = 11，  
第二次加法：1 + 1 = 2。

**示例 2：**

**输入：**
```plaintext
0
```

**输出：**
```plaintext
0
```

#### 提示：
- `num` 是一个非负整数，且不超过 `10^8`。

---

### 解题思路：

这个问题可以通过两种方法来解决：

#### 1. **逐位加法**：
- 每次将 `num` 的各个数字相加，并更新 `num` 为这次相加的结果。这个过程重复，直到 `num` 变成一个只有一位的数字。

#### 2. **数学方法（数字根）**：
- 数字根的公式基于“模 9”运算。如果 `num` 不为 0，那么它的数字根为 `1 + (num - 1) % 9`。这个公式可以快速地给出一个数字的最终一位数。
- 如果 `num` 为 0，则结果是 0。

#### 解决步骤：
1. **逐位加法法**：直到结果只有一位数字，返回该结果。
2. **数字根法**：利用公式 `1 + (num - 1) % 9` 来快速计算结果。

#### 时间复杂度：
- 逐位加法法：时间复杂度为 `O(k)`，其中 `k` 是数字的位数，最多为 8 次加法（`num` 最大为 `10^8`）。
- 数字根法：时间复杂度为 `O(1)`，因为仅进行一次模运算。

---

### C语言解答：

```c
#include <stdio.h>

// 逐位加法法实现
int addDigits(int num) {
    // 如果 num 是 0，直接返回 0
    if (num == 0) {
        return 0;
    }

    // 持续将数字的各位相加，直到 num 变为一位数
    while (num >= 10) {
        int sum = 0;
        while (num > 0) {
            sum += num % 10;  // 获取 num 的个位数字
            num /= 10;  // 去掉 num 的个位数字
        }
        num = sum;  // 将相加结果赋给 num，继续计算
    }

    return num;  // 返回最后一位数字
}

int main() {
    int num = 38;
    int result = addDigits(num);
    printf("The result is: %d\n", result);  // 输出：2
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    // 逐位加法法实现
    int addDigits(int num) {
        // 如果 num 是 0，直接返回 0
        if (num == 0) {
            return 0;
        }

        // 持续将数字的各位相加，直到 num 变为一位数
        while (num >= 10) {
            int sum = 0;
            while (num > 0) {
                sum += num % 10;  // 获取 num 的个位数字
                num /= 10;  // 去掉 num 的个位数字
            }
            num = sum;  // 将相加结果赋给 num，继续计算
        }

        return num;  // 返回最后一位数字
    }

    // 数字根法实现
    int addDigitsOptimized(int num) {
        if (num == 0) return 0;
        return 1 + (num - 1) % 9;  // 使用数字根公式
    }
};

int main() {
    Solution solution;
    int num = 38;
    int result = solution.addDigits(num);
    cout << "The result is: " << result << endl;  // 输出：2

    result = solution.addDigitsOptimized(num);
    cout << "The optimized result is: " << result << endl;  // 输出：2

    return 0;
}
```

### 解析：

1. **C语言解法**：
   - `addDigits` 使用逐位加法法。首先，我们检查 `num` 是否为零。如果是零，直接返回零。然后，重复将 `num` 的各位数字相加，直到 `num` 小于 10，即变成一位数。
   
2. **C++解法**：
   - `addDigits` 采用逐位加法法，与 C 语言解法相同。
   - `addDigitsOptimized` 使用数字根公式，直接通过数学运算快速得到结果。

### 时间复杂度：
- **逐位加法法**：时间复杂度为 `O(k)`，其中 `k` 是数字的位数。最多需要 8 次加法操作。
- **数字根法**：时间复杂度为 `O(1)`，因为它仅进行一次模运算。

### 空间复杂度：
- **逐位加法法**：空间复杂度为 `O(1)`，因为我们只使用了常数空间。
- **数字根法**：空间复杂度为 `O(1)`，同样只使用了常数空间。

