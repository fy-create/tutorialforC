---
layout: post
title:  "264. 丑数 II"
categories: arithmetic
---

[264. 丑数 II](https://leetcode.cn/problems/ugly-number-ii)

### 题目描述

给你一个整数 `n`，请你找出并返回第 `n` 个丑数。

丑数就是只包含质因数 `2`、`3` 和 `5` 的正整数。

---

**示例 1：**

```
输入：n = 10
输出：12
解释：[1, 2, 3, 4, 5, 6, 8, 9, 10, 12] 是前 10 个丑数。
```

**示例 2：**

```
输入：n = 1
输出：1
解释：1 通常被视为丑数。
```

---

**提示：**

- `1 <= n <= 1690`

---

### 解题思路

1. **丑数的定义**：
   - 丑数是通过不断乘以 `2`、`3` 和 `5` 得到的。
   - 第一个丑数是 `1`。

2. **多指针动态规划**：
   - 维护一个数组 `ugly`，其中 `ugly[i]` 表示第 `i` 个丑数。
   - 使用三个指针 `p2`、`p3` 和 `p5` 分别指向当前最小丑数的倍数 `2`、`3` 和 `5`。

3. **状态转移**：
   - 每次选取 `ugly[p2] * 2`、`ugly[p3] * 3` 和 `ugly[p5] * 5` 中的最小值作为下一个丑数。
   - 更新对应的指针（如果某个最小值被选中，指针加 1）。

4. **优化**：
   - 每次更新 `ugly` 数组时，确保不重复插入相同值。

5. **时间复杂度**：
   - 每次找到一个丑数需要常数时间，总时间复杂度为 O(n)。

6. **空间复杂度**：
   - 需要一个数组存储前 `n` 个丑数，空间复杂度为 O(n)。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>

// 找到第 n 个丑数
int nthUglyNumber(int n) {
    int* ugly = (int*)malloc(n * sizeof(int));
    ugly[0] = 1; // 第一个丑数是 1

    int p2 = 0, p3 = 0, p5 = 0; // 指向当前丑数的指针
    for (int i = 1; i < n; i++) {
        int nextUgly = fmin(fmin(ugly[p2] * 2, ugly[p3] * 3), ugly[p5] * 5);
        ugly[i] = nextUgly;

        // 更新指针
        if (nextUgly == ugly[p2] * 2) p2++;
        if (nextUgly == ugly[p3] * 3) p3++;
        if (nextUgly == ugly[p5] * 5) p5++;
    }

    int result = ugly[n - 1];
    free(ugly); // 释放内存
    return result;
}

// 测试函数
int main() {
    int n = 10;
    printf("第 %d 个丑数是 %d\n", n, nthUglyNumber(n));
    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> ugly(n); // 存储丑数
        ugly[0] = 1;         // 第一个丑数是 1

        int p2 = 0, p3 = 0, p5 = 0; // 指向当前丑数的指针

        for (int i = 1; i < n; i++) {
            // 计算下一个丑数
            int nextUgly = min({ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5});
            ugly[i] = nextUgly;

            // 更新指针
            if (nextUgly == ugly[p2] * 2) p2++;
            if (nextUgly == ugly[p3] * 3) p3++;
            if (nextUgly == ugly[p5] * 5) p5++;
        }

        return ugly[n - 1];
    }
};

// 测试函数
int main() {
    Solution sol;
    int n = 10;
    cout << "第 " << n << " 个丑数是 " << sol.nthUglyNumber(n) << endl;
    return 0;
}
```

---

### 代码说明

1. **动态规划**：
   - 使用数组存储已找到的丑数。
   - 每次从三个倍数中取最小值更新下一个丑数。

2. **指针优化**：
   - 使用三个指针分别维护当前丑数的倍数。

3. **时间复杂度**：
   - 每次找到一个丑数需要常数时间，总时间复杂度为 O(n)。

4. **空间复杂度**：
   - 使用 O(n) 的空间存储丑数数组。