---
layout: post
title:  "202. 快乐数"
categories: arithmetic
---

[202. 快乐数](https://leetcode.cn/problems/happy-number)

### 题目描述

编写一个算法来判断一个数 `n` 是不是快乐数。

「快乐数」定义为：

- 对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
- 然后重复这个过程直到这个数变为 1，也可能是 **无限循环** 但始终变不到 1。
- 如果 **可以变为 1**，那么这个数就是快乐数。

如果 `n` 是快乐数就返回 `true`；否则返回 `false`。

**示例 1:**

```
输入: n = 19
输出: true
解释:
1^2 + 9^2 = 82
8^2 + 2^2 = 68
6^2 + 8^2 = 100
1^2 + 0^2 + 0^2 = 1
```

**示例 2:**

```
输入: n = 2
输出: false
解释:
2^2 = 4
4^2 = 16
1^2 + 6^2 = 37
3^2 + 7^2 = 58
5^2 + 8^2 = 89
8^2 + 9^2 = 145
1^2 + 4^2 + 5^2 = 42
4^2 + 2^2 = 20
2^2 + 0^2 = 4
（进入无限循环）
```

**提示:**

- `1 <= n <= 2^31 - 1`

---

### 解题思路

1. **模拟过程**：
   - 对于给定的数字 `n`，计算其每个位置上的数字的平方和，得到一个新的数字。
   - 重复上述过程，直到数字变为 1 或者进入无限循环。

2. **检测循环**：
   - 使用哈希集合记录已经出现过的数字，如果某个数字已经存在于集合中，则说明进入了无限循环，返回 `false`。

3. **终止条件**：
   - 如果数字变为 1，则返回 `true`。

---

### C语言实现

```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

// 计算数字的平方和
int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

bool isHappy(int n) {
    // 哈希集合记录已经出现过的数字
    int* seen = (int*)calloc(1000, sizeof(int)); // 假设最多 1000 次循环
    int index = 0;

    while (n != 1) {
        // 如果数字已经出现过，则进入无限循环
        for (int i = 0; i < index; i++) {
            if (seen[i] == n) {
                free(seen);
                return false;
            }
        }

        // 记录当前数字
        seen[index++] = n;

        // 计算下一个数字
        n = getNext(n);
    }

    free(seen);
    return true;
}

int main() {
    int n = 19;
    bool result = isHappy(n);
    printf("%s\n", result ? "true" : "false"); // 输出 true
    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> seen;

        while (n != 1) {
            // 如果数字已经出现过，则进入无限循环
            if (seen.count(n)) {
                return false;
            }

            // 记录当前数字
            seen.insert(n);

            // 计算下一个数字
            n = getNext(n);
        }

        return true;
    }

private:
    int getNext(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }
};

int main() {
    Solution solution;
    int n = 19;
    bool result = solution.isHappy(n);
    cout << (result ? "true" : "false") << endl; // 输出 true
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
n = 19
```
#### 输出 1
```
true
```

#### 输入 2
```
n = 2
```
#### 输出 2
```
false
```

#### 输入 3
```
n = 7
```
#### 输出 3
```
true
```

---

### 复杂度分析

- **时间复杂度**：O(log n)，每次计算平方和的时间复杂度为 O(log n)，循环次数取决于数字的变化。
- **空间复杂度**：O(log n)，用于存储哈希集合。

---

### 总结

通过模拟过程和检测循环，我们可以高效地判断一个数是否是快乐数。这种方法能够处理大规模数据，并确保结果的正确性。