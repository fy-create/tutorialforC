---
layout: post
title:  "172. 阶乘后的零"
categories: arithmetic
---

[172. 阶乘后的零](https://leetcode.cn/problems/factorial-trailing-zeroes)

### 题目描述

给定一个整数 `n`，返回 `n!`（`n` 的阶乘）中尾随零的数量。

**提示**：尾随零是指数字末尾连续出现的零。

---

**示例 1：**

```
输入：n = 3
输出：0
解释：3! = 6，末尾没有零。
```

**示例 2：**

```
输入：n = 5
输出：1
解释：5! = 120，末尾有 1 个零。
```

**示例 3：**

```
输入：n = 0
输出：0
```

---

**提示：**

- `0 <= n <= 10⁴`

---

### 解题思路

1. **尾随零的来源**：
   - 一个尾随零来自于因数 `10`，而因数 `10` 等于 `2 * 5`。
   - 在阶乘中，因数 `2` 的数量远多于因数 `5`，因此尾随零的数量由因数 `5` 的数量决定。

2. **计算因数 `5` 的数量**：
   - 对于每个 `k`，阶乘 `k!` 包含的 `5` 的因数数量可以通过以下公式计算：
     ```
     count = n / 5 + n / 25 + n / 125 + ...
     ```
     - `n / 5`：包含 1 个因数 `5` 的数字数量。
     - `n / 25`：包含 2 个因数 `5` 的数字数量。
     - 依此类推。

3. **终止条件**：
   - 当 `n / 5^k == 0` 时，停止计算。

4. **时间复杂度**：
   - 计算最多进行 `O(log₅(n))` 次操作，时间复杂度为 O(log n)。

5. **空间复杂度**：
   - 只使用常量空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>

// 计算阶乘尾随零的数量
int trailingZeroes(int n) {
    int count = 0;

    // 不断计算 n 中包含的因数 5 的数量
    while (n > 0) {
        n /= 5;
        count += n;
    }

    return count;
}

// 测试函数
int main() {
    int n = 5;
    printf("输入: %d, 尾随零的数量: %d\n", n, trailingZeroes(n));

    n = 10;
    printf("输入: %d, 尾随零的数量: %d\n", n, trailingZeroes(n));

    n = 100;
    printf("输入: %d, 尾随零的数量: %d\n", n, trailingZeroes(n));

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
    // 计算阶乘尾随零的数量
    int trailingZeroes(int n) {
        int count = 0;

        // 不断计算 n 中包含的因数 5 的数量
        while (n > 0) {
            n /= 5;
            count += n;
        }

        return count;
    }
};

// 测试函数
int main() {
    Solution sol;

    int n = 5;
    cout << "输入: " << n << ", 尾随零的数量: " << sol.trailingZeroes(n) << endl;

    n = 10;
    cout << "输入: " << n << ", 尾随零的数量: " << sol.trailingZeroes(n) << endl;

    n = 100;
    cout << "输入: " << n << ", 尾随零的数量: " << sol.trailingZeroes(n) << endl;

    return 0;
}
```

---

### 代码说明

1. **尾随零的计算**：
   - 使用循环依次计算 `n` 中包含的因数 `5` 的数量。

2. **时间复杂度**：
   - 每次操作将 `n` 除以 `5`，循环次数为 O(log n)。

3. **空间复杂度**：
   - 只使用常量空间，空间复杂度为 O(1)。