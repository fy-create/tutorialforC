---
layout: post
title:  "9. 回文数"
categories: arithmetic
---


[9. 回文数](https://leetcode.cn/problems/palindrome-number/submissions/586401289/)

**题目描述：**

给定一个整数 `x`，如果 `x` 是一个回文整数，返回 `true`；否则，返回 `false`。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

**示例 1：**
- 输入：`x = 121`
- 输出：`true`

**示例 2：**
- 输入：`x = -121`
- 输出：`false`
- 解释：从左向右读为 `-121`，从右向左读为 `121-`，因此不是回文数。

**示例 3：**
- 输入：`x = 10`
- 输出：`false`
- 解释：从右向左读为 `01`，因此不是回文数。

**提示：**
- -2³¹ ≤ x ≤ 2³¹ - 1

**C语言解答：**

```c
#include <stdio.h>
#include <stdbool.h>

bool isPalindrome(int x) {
    // 负数和以0结尾但不为0的数不是回文数
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    int revertedNumber = 0;
    // 反转一半数字
    while (x > revertedNumber) {
        revertedNumber = revertedNumber * 10 + x % 10;
        x /= 10;
    }
    // 当数字长度为奇数时，revertedNumber 会多一位，需要除以 10 去掉
    return x == revertedNumber || x == revertedNumber / 10;
}

int main() {
    int testCases[] = {121, -121, 10, 12321, 0};
    int numTests = sizeof(testCases) / sizeof(testCases[0]);
    for (int i = 0; i < numTests; i++) {
        printf("Input: %d, Output: %s\n", testCases[i], isPalindrome(testCases[i]) ? "true" : "false");
    }
    return 0;
}
```

**代码解析：**
- 首先，处理特殊情况：负数和以0结尾但不为0的数（如10, 100）都不是回文数。
- 然后，通过反转数字的一半来判断。每次取 `x` 的最后一位加到 `revertedNumber` 上，并将 `x` 去掉最后一位。
- 当 `x` 小于或等于 `revertedNumber` 时，说明已经处理了一半数字。
- 最后，判断 `x` 是否等于 `revertedNumber` 或 `revertedNumber` 除以 10（用于处理数字长度为奇数的情况）。

**C++解答：**

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    bool isPalindrome(int x) {
        // 负数和以0结尾但不为0的数不是回文数
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }
        int revertedNumber = 0;
        // 反转一半数字
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        // 当数字长度为奇数时，revertedNumber 会多一位，需要除以 10 去掉
        return x == revertedNumber || x == revertedNumber / 10;
    }
};

int main() {
    vector<int> testCases = {121, -121, 10, 12321, 0};
    Solution solution;
    for (int x : testCases) {
        cout << "Input: " << x << ", Output: " << (solution.isPalindrome(x) ? "true" : "false") << endl;
    }
    return 0;
}
```

**代码解析：**
- 与C语言版本类似，首先处理特殊情况：负数和以0结尾但不为0的数都不是回文数。
- 然后，通过反转数字的一半来判断。每次取 `x` 的最后一位加到 `revertedNumber` 上，并将 `x` 去掉最后一位。
- 当 `x` 小于或等于 `revertedNumber` 时，说明已经处理了一半数字。
- 最后，判断 `x` 是否等于 `revertedNumber` 或 `revertedNumber` 除以 10（用于处理数字长度为奇数的情况）。

**注意：**在C++版本中，使用了 `vector` 容器来存储测试用例，并使用了 `using namespace std;` 来简化代码。`Solution` 类封装了 `isPalindrome` 方法，方便在主函数中调用。 