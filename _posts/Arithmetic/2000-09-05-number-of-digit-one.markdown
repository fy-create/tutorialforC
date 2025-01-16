---
layout: post
title:  "233. 数字 1 的个数"
categories: arithmetic
---

[233. 数字 1 的个数](https://leetcode.cn/problems/number-of-digit-one)

给定一个整数 `n`，计算从 0 到 `n` 的所有数字中数字 1 出现的个数。

**示例：**

1. 输入：`n = 13`
   输出：`6`
   解释：数字 1 出现在以下数字中：1, 10, 11, 12, 13。

**提示：**

- `0 <= n <= 2³¹ - 1`

**解题思路：**

要计算从 0 到 `n` 的所有数字中数字 1 出现的次数，可以逐位分析每一位上数字 1 出现的次数。具体而言，对于每一位（个位、十位、百位等），我们计算该位上数字 1 出现的次数，然后将所有位上的结果相加。

设当前分析的位对应的权值为 `digitWeight`（如个位是 1，十位是 10，百位是 100 等），则：

1. **高位部分**：`higher = n // (digitWeight * 10)`
2. **当前位数字**：`current = (n // digitWeight) % 10`
3. **低位部分**：`lower = n % digitWeight`

根据 `current` 的值，计算当前位上数字 1 出现的次数：

- 如果 `current > 1`，则当前位上数字 1 出现的次数为 `(higher + 1) * digitWeight`。
- 如果 `current == 1`，则当前位上数字 1 出现的次数为 `higher * digitWeight + (lower + 1)`。
- 如果 `current == 0`，则当前位上数字 1 出现的次数为 `higher * digitWeight`。

通过遍历每一位，累加各个位上数字 1 出现的次数，即可得到最终结果。

**C 语言实现：**

```c
#include <stdio.h>

// 计算从 0 到 n 中数字 1 出现的次数
int countDigitOne(int n) {
    long digitWeight = 1; // 位权值，从个位开始
    int count = 0;        // 计数器，统计数字 1 的出现次数

    while (digitWeight <= n) {
        int higher = n / (digitWeight * 10);        // 高位部分
        int current = (n / digitWeight) % 10;      // 当前位数字
        int lower = n % digitWeight;               // 低位部分

        if (current == 0) {
            count += higher * digitWeight;
        } else if (current == 1) {
            count += higher * digitWeight + (lower + 1);
        } else {
            count += (higher + 1) * digitWeight;
        }

        digitWeight *= 10; // 移动到更高一位
    }

    return count;
}

// 测试函数
int main() {
    int n = 13;
    printf("从 0 到 %d 中，数字 1 出现了 %d 次。\n", n, countDigitOne(n));
    return 0;
}
```

**C++ 语言实现：**

```cpp
#include <iostream>

using namespace std;

class Solution {
public:
    // 计算从 0 到 n 中数字 1 出现的次数
    int countDigitOne(int n) {
        long digitWeight = 1; // 位权值，从个位开始
        int count = 0;        // 计数器，统计数字 1 的出现次数

        while (digitWeight <= n) {
            int higher = n / (digitWeight * 10);        // 高位部分
            int current = (n / digitWeight) % 10;      // 当前位数字
            int lower = n % digitWeight;               // 低位部分

            if (current == 0) {
                count += higher * digitWeight;
            } else if (current == 1) {
                count += higher * digitWeight + (lower + 1);
            } else {
                count += (higher + 1) * digitWeight;
            }

            digitWeight *= 10; // 移动到更高一位
        }

        return count;
    }
};

// 测试函数
int main() {
    Solution solution;
    int n = 13;
    cout << "从 0 到 " << n << " 中，数字 1 出现了 " << solution.countDigitOne(n) << " 次。" << endl;
    return 0;
}
```

在上述实现中，我们通过逐位分析的方法，计算每一位上数字 1 出现的次数，并将结果累加，最终得到从 0 到 `n` 中数字 1 出现的总次数。 