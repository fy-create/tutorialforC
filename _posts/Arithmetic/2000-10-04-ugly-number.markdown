---
layout: post
title:  "263. 丑数"
categories: arithmetic
---

[263. 丑数](https://leetcode.cn/problems/ugly-number)

### 题目描述

一个丑数是只包含质因数 `2`、`3` 和 `5` 的正整数。

给你一个整数 `n`，请你判断 `n` 是否为丑数。如果是，返回 `true`；否则，返回 `false`。

---

**示例 1：**

```
输入：n = 6
输出：true
解释：6 = 2 × 3
```

**示例 2：**

```
输入：n = 1
输出：true
解释：1 通常被视为丑数。
```

**示例 3：**

```
输入：n = 14
输出：false
解释：14 不是丑数，因为它包含了另一个质因数 7。
```

---

**提示：**

- `-2³¹ <= n <= 2³¹ - 1`

---

### 解题思路

1. **丑数的定义**：
   - 丑数只包含因数 `2`、`3` 和 `5`。
   - 如果 `n` 是丑数，则可以将其不断除以 `2`、`3` 和 `5`，最终结果为 `1`。

2. **算法步骤**：
   - 如果 `n <= 0`，返回 `false`，因为丑数是正整数。
   - 依次使用 `2`、`3` 和 `5` 将 `n` 除尽。
   - 最后检查 `n` 是否等于 `1`。

3. **时间复杂度**：
   - 每次除法操作将减少因数，时间复杂度为 O(log n)。

4. **空间复杂度**：
   - 使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdbool.h>
#include <stdio.h>

// 判断是否为丑数
bool isUgly(int n) {
    if (n <= 0) {
        return false; // 非正数不是丑数
    }

    // 依次将 n 除以 2、3 和 5
    while (n % 2 == 0) {
        n /= 2;
    }
    while (n % 3 == 0) {
        n /= 3;
    }
    while (n % 5 == 0) {
        n /= 5;
    }

    // 如果最终结果为 1，则是丑数
    return n == 1;
}

// 测试函数
int main() {
    int n = 6;
    if (isUgly(n)) {
        printf("%d 是丑数。\n", n);
    } else {
        printf("%d 不是丑数。\n", n);
    }

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    // 判断是否为丑数
    bool isUgly(int n) {
        if (n <= 0) {
            return false; // 非正数不是丑数
        }

        // 依次将 n 除以 2、3 和 5
        while (n % 2 == 0) {
            n /= 2;
        }
        while (n % 3 == 0) {
            n /= 3;
        }
        while (n % 5 == 0) {
            n /= 5;
        }

        // 如果最终结果为 1，则是丑数
        return n == 1;
    }
};

// 测试函数
int main() {
    Solution sol;
    int n = 14;

    if (sol.isUgly(n)) {
        cout << n << " 是丑数。" << endl;
    } else {
        cout << n << " 不是丑数。" << endl;
    }

    return 0;
}
```

---

### 代码说明

1. **核心逻辑**：
   - 使用循环依次除以 `2`、`3` 和 `5`，直到 `n` 不能被它们整除。

2. **特判条件**：
   - 如果 `n <= 0`，直接返回 `false`。

3. **时间复杂度**：
   - 每次循环减少因数，复杂度为 O(log n)。

4. **空间复杂度**：
   - 只使用常量空间，复杂度为 O(1)。