---
layout: post
title:  "7. 整数反转"
categories: arithmetic
---

[7. 整数反转](https://leetcode.cn/problems/reverse-integer)

### 题目：反转整数 (Reverse Integer)

#### 题目要求：
给定一个 32 位有符号整数 `x`，反转 `x` 中的数字并返回。如果反转后的结果超出了 32 位整数的范围 [-2³¹, 2³¹-1]，则返回 0。

注意:
- 假设环境限制，整数的范围为 32 位有符号整数，即 [-2³¹, 2³¹-1]。
- 你可以假设 `x` 是一个有效的 32 位整数。

#### 示例：
**示例 1:**

输入:
```
x = 123
```

输出:
```
321
```

**示例 2:**

输入:
```
x = -123
```

输出:
```
-321
```

**示例 3:**

输入:
```
x = 120
```

输出:
```
21
```

**示例 4:**

输入:
```
x = 0
```

输出:
```
0
```

#### 提示：
1. -2³¹ <= x <= 2³¹ - 1

---

### 解题思路：

反转一个整数的思路主要是将整数转为字符串或逐位进行反转。关键在于处理整数反转时可能出现的溢出问题，以及正确处理负数和 0 的情况。

#### 具体步骤：
1. **处理符号位**：首先判断输入的整数是否为负数。如果是负数，将其转为正数进行反转，最终结果再加上负号。
   
2. **逐位反转**：通过取余数和整除的方法逐步反转数字。每次通过 `x % 10` 获取当前位的数字，并将其加到结果的末尾。
   
3. **防止溢出**：在反转过程中，需要时刻检查反转后的结果是否会超出 32 位整数的范围 [-2³¹, 2³¹-1]。如果超过了范围，则返回 0。

4. **特殊情况**：对于输入值 `x = 0`，直接返回 0。

#### C 语言解法：

```c
#include <stdio.h>
#include <limits.h>

int reverse(int x) {
    int result = 0;
    
    // 处理负数
    while (x != 0) {
        // 获取当前最后一位数字
        int digit = x % 10;
        x /= 10;

        // 防止溢出
        if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > 7)) {
            return 0;  // 超出最大值范围
        }
        if (result < INT_MIN / 10 || (result == INT_MIN / 10 && digit < -8)) {
            return 0;  // 超出最小值范围
        }

        // 更新反转后的结果
        result = result * 10 + digit;
    }
    
    return result;
}

int main() {
    int x = 123;
    int result = reverse(x);
    printf("Reversed Integer: %d\n", result);  // 输出 321
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <climits>

using namespace std;

class Solution {
public:
    int reverse(int x) {
        int result = 0;
        
        // 处理负数
        while (x != 0) {
            // 获取当前最后一位数字
            int digit = x % 10;
            x /= 10;

            // 防止溢出
            if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > 7)) {
                return 0;  // 超出最大值范围
            }
            if (result < INT_MIN / 10 || (result == INT_MIN / 10 && digit < -8)) {
                return 0;  // 超出最小值范围
            }

            // 更新反转后的结果
            result = result * 10 + digit;
        }
        
        return result;
    }
};

int main() {
    Solution solution;
    int x = 123;
    int result = solution.reverse(x);
    cout << "Reversed Integer: " << result << endl;  // 输出 321
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 使用 `while (x != 0)` 循环逐位获取输入整数 `x` 的数字，通过 `x % 10` 获取当前数字并使用 `x /= 10` 去掉该位。
   - 反转的过程中检查结果是否会超出 32 位整数的范围，如果会则返回 0。
   - 最终返回反转后的结果。

2. **C++ 实现**：
   - 类 `Solution` 中的成员函数 `reverse` 实现了与 C 语言相同的逻辑。
   - 使用 `INT_MAX` 和 `INT_MIN` 来防止溢出，确保反转后的结果在 32 位整数范围内。

#### 核心算法：
- 逐位反转数字，并通过检查条件防止溢出。通过整除和取余来反转数字，同时每次操作后都检查是否会溢出，确保返回值在合法范围内。