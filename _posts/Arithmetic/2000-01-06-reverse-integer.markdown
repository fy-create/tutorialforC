---
layout: post
title:  "7. 整数反转"
categories: arithmetic
---

https://leetcode.cn/problems/reverse-integer/

**题目描述：**

给你一个 32 位的有符号整数 `x`，返回将 `x` 中的数字部分反转后的结果。

如果反转后整数超过 32 位的有符号整数的范围 [−2³¹, 2³¹ − 1]，就返回 0。

假设环境不允许存储 64 位整数（有符号或无符号）。

**示例 1：**

```
输入：x = 123
输出：321
```

**示例 2：**

```
输入：x = -123
输出：-321
```

**示例 3：**

```
输入：x = 120
输出：21
```

**示例 4：**

```
输入：x = 0
输出：0
```

**提示：**

- -2³¹ ≤ x ≤ 2³¹ − 1

**C 语言解答：**

```c
#include <stdio.h>
#include <limits.h>

int reverse(int x) {
    int rev = 0;
    while (x != 0) {
        int pop = x % 10; // 获取最后一位数字
        x /= 10; // 去掉最后一位数字

        // 检查是否会溢出
        if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;
        if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;

        rev = rev * 10 + pop; // 将当前数字添加到反转后的数字末尾
    }
    return rev;
}

// 测试函数
int main() {
    int x = 123;
    printf("%d\n", reverse(x)); // 输出: 321

    x = -123;
    printf("%d\n", reverse(x)); // 输出: -321

    x = 120;
    printf("%d\n", reverse(x)); // 输出: 21

    x = 0;
    printf("%d\n", reverse(x)); // 输出: 0

    return 0;
}
```

**代码解析：**

1. **初始化反转结果：** 定义 `rev` 变量用于存储反转后的数字。

2. **循环处理每一位数字：**
   - 使用 `x % 10` 获取 `x` 的最后一位数字，存储在 `pop` 中。
   - 使用 `x /= 10` 去除 `x` 的最后一位数字。

3. **检查溢出情况：**
   - 如果 `rev` 大于 `INT_MAX/10`，则乘以 10 后肯定溢出，返回 0。
   - 如果 `rev` 等于 `INT_MAX/10`，且 `pop` 大于 7（因为 `INT_MAX` 的个位是 7），则溢出，返回 0。
   - 如果 `rev` 小于 `INT_MIN/10`，则乘以 10 后肯定溢出，返回 0。
   - 如果 `rev` 等于 `INT_MIN/10`，且 `pop` 小于 -8（因为 `INT_MIN` 的个位是 -8），则溢出，返回 0。

4. **更新反转结果：** 将 `pop` 添加到 `rev` 的末尾，即 `rev = rev * 10 + pop`。

5. **返回结果：** 循环结束后，`rev` 即为反转后的数字，返回 `rev`。

**C++ 语言解答：**

```cpp
#include <iostream>
#include <climits>

using namespace std;

class Solution {
public:
    int reverse(int x) {
        int rev = 0;
        while (x != 0) {
            int pop = x % 10; // 获取最后一位数字
            x /= 10; // 去掉最后一位数字

            // 检查是否会溢出
            if (rev > INT_MAX/10 || (rev == INT_MAX / 10 && pop > 7)) return 0;
            if (rev < INT_MIN/10 || (rev == INT_MIN / 10 && pop < -8)) return 0;

            rev = rev * 10 + pop; // 将当前数字添加到反转后的数字末尾
        }
        return rev;
    }
};

// 测试函数
int main() {
    Solution solution;
    int x = 123;
    cout << solution.reverse(x) << endl; // 输出: 321

    x = -123;
    cout << solution.reverse(x) << endl; // 输出: -321

    x = 120;
    cout << solution.reverse(x) << endl; // 输出: 21

    x = 0;
    cout << solution.reverse(x) << endl; // 输出: 0

    return 0;
}
```

**代码解析：**

1. **定义类和方法：** 创建 `Solution` 类，并在其中定义 `reverse` 方法，该方法接受一个整数 `x`，返回反转后的整数。

2. **初始化反转结果：** 定义 `rev` 变量用于存储反转后的数字。

3. **循环处理每一位数字：**
   - 使用 `x % 10` 获取 `x` 的最后一位数字，存储在 `pop` 中。
   - 使用 `x /= 10` 去除 `x` 的最后一位数字。

4. **检查溢出情况：**
   - 如果 `rev` 大于 `INT_MAX/10`，则乘以 10 后肯定溢出，返回 0。
   - 如果 `rev` 等于 `INT_MAX/10`，且 `pop` 大于 7（因为 `INT_MAX` 的个位是 7），则溢出，返回 0。
   - 如果 `rev` 小于 `INT_MIN/10`，则乘以 10 后肯定溢出，返回 0。
   - 如果 `rev` 等于 `INT_MIN/10`，且 `pop` 小于 -8（因为 `INT_MIN` 的个位是 -8），则溢出，返回 0。

5. **更新反转结果：** 将 `pop` 添加到 `rev` 的末尾，即 `rev = rev * 10 + pop`。

6. **返回结果：** 循环结束后，`rev` 即为反转后的数字，返回 `rev`。

**注意：** 以上代码在处理整数反转时，重点考虑了可能的溢出情况。通过在更新 `rev` 之前检查其是否会溢出，确保了程序的安全性和正确性。 