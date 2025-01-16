---
layout: post
title:  "9. 回文数"
categories: arithmetic
---

[9. 回文数](https://leetcode.cn/problems/palindrome-number)

### 题目：回文数 (Palindrome Number)

#### 题目要求：
给定一个整数 `x`，判断其是否是回文数。如果一个整数是回文数，意味着它从左到右读和从右到左读是一样的。

例如，`121` 是回文数，而 `-121` 不是回文数，因为负数的符号在前面，反转后就变成了 `121-`，显然不是回文。

**注意：**
- 负数一定不是回文数。
- 不能将整数转换为字符串来判断。

#### 示例：
**示例 1:**

输入:
```
x = 121
```

输出:
```
true
```

**示例 2:**

输入:
```
x = -121
```

输出:
```
false
```

**示例 3:**

输入:
```
x = 10
```

输出:
```
false
```

**示例 4:**

输入:
```
x = 0
```

输出:
```
true
```

#### 提示：
1. `-2^31 <= x <= 2^31 - 1`（32 位有符号整数）

---

### 解题思路：

1. **负数的排除**：对于负数，直接返回 `false`，因为负数的回文表示是无法匹配的。负数的符号 `-` 不会出现在数值的右侧，导致反转时无法对称。
   
2. **回文数的对称特性**：回文数的对称特性使得我们可以通过反转一半的数字来验证它是否是回文。例如，`121` 可以通过将其最后一半数字反转，得到 `121` 与其原始值相等，因此是回文数。

3. **反转数字的一半**：
   - 可以通过逐位获取数字，反转前一半的数字，并与剩余的数字进行比较。
   - 例如，`x = 121`，可以先反转 `x` 的前两位 `12`，得到反转数 `21`，然后与剩下的数字 `1` 比较，发现是相同的。
   
4. **判断回文**：
   - 当反转后的数字超过原始数字的一半时，我们就可以结束比较。即当 `x` 小于等于反转数时，说明回文匹配。

#### C 语言解法：

```c
#include <stdio.h>
#include <stdbool.h>
#include <limits.h>

bool isPalindrome(int x) {
    // 负数和以0结尾的数字（除0外）都不是回文数
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }

    int reversedHalf = 0;
    while (x > reversedHalf) {
        // 反转数字的一半
        reversedHalf = reversedHalf * 10 + x % 10;
        x /= 10;
    }

    // 如果数字长度为奇数，去掉中间的数字
    return x == reversedHalf || x == reversedHalf / 10;
}

int main() {
    int x = 121;
    bool result = isPalindrome(x);
    printf("Is Palindrome: %s\n", result ? "true" : "false");  // 输出 true
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
    bool isPalindrome(int x) {
        // 负数和以0结尾的数字（除0外）都不是回文数
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }

        int reversedHalf = 0;
        // 反转数字的一半
        while (x > reversedHalf) {
            reversedHalf = reversedHalf * 10 + x % 10;
            x /= 10;
        }

        // 如果数字长度为奇数，去掉中间的数字
        return x == reversedHalf || x == reversedHalf / 10;
    }
};

int main() {
    Solution solution;
    int x = 121;
    bool result = solution.isPalindrome(x);
    cout << "Is Palindrome: " << (result ? "true" : "false") << endl;  // 输出 true
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - **边界条件**：如果 `x` 为负数或者是以 0 结尾的数字（但不是 0），直接返回 `false`。因为负数和以 0 结尾的数字（除 0 本身外）都不能是回文数。
   - **反转数字的一半**：通过 `x % 10` 获取数字的最后一位，并将其加到 `reversedHalf` 中。同时将 `x` 除以 10，去掉最后一位。这个过程持续到 `x` 小于等于反转的数字一半为止。
   - **奇数长度的处理**：当原始数字是奇数长度时，反转后的数字会包含中间的数字。为了匹配，`reversedHalf` 应该被除以 10，去掉中间的数字。
   - **返回结果**：通过比较 `x` 和 `reversedHalf` 或 `reversedHalf / 10` 来判断回文。

2. **C++ 实现**：
   - C++ 实现与 C 语言相似，使用类 `Solution` 来封装 `isPalindrome` 方法。
   - `main` 函数中通过 `cout` 输出结果。

#### 核心算法：
- **反转数字的一半**：将输入数字的一半反转并与剩下的部分进行比较。如果它们相等，则说明该数是回文数。
- **溢出检测**：由于整数范围有限，因此无需担心反转时发生溢出。如果反转部分超过整数范围，C 语言和 C++ 都会自动处理。