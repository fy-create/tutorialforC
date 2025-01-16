---
layout: post
title:  "168. Excel 表列名称"
categories: arithmetic
---

[168. Excel 表列名称](https://leetcode.cn/problems/excel-sheet-column-title)

### 题目描述

**题目：Excel 表列标题**

给定一个正整数 `n`，返回它在 Excel 表中对应的列标题。

例如：

```plaintext
1 -> "A"
2 -> "B"
3 -> "C"
...
26 -> "Z"
27 -> "AA"
28 -> "AB"
```

**示例 1：**

```plaintext
输入: 1
输出: "A"
```

**示例 2：**

```plaintext
输入: 28
输出: "AB"
```

**示例 3：**

```plaintext
输入: 701
输出: "ZY"
```

**示例 4：**

```plaintext
输入: 2147483647
输出: "FXSHRXW"
```

**提示：**

- 1 <= n <= 2^31 - 1

---

### 解题思路

这是一个经典的进制转换问题，要求将一个整数 `n` 转换为 Excel 列的表示方式。

#### 进制转换思想：

Excel 列标题的结构类似于26进制，只不过它是从1开始，而不是从0开始。例如：

- 1 -> "A"
- 26 -> "Z"
- 27 -> "AA"

#### 具体步骤：

1. **余数与商的关系**：
   - 我们可以通过 `n % 26` 来计算当前位的字符。
   - 由于列标题是从 "A" 开始的，`1` 对应 "A"，`2` 对应 "B" ... 所以每次计算余数时，需要减去1 (`n-1`)，确保映射关系正确。
   - 计算字符后，我们更新 `n = (n - 1) / 26`，进行下一轮的处理。

2. **结束条件**：
   - 当 `n` 小于等于零时，转换结束。

3. **逆序存储结果**：
   - 由于我们是从低位到高位逐步推算的，最终的结果是倒序的，因此需要反转结果。

4. **字符串拼接**：
   - 每次推算得到一个字符，我们将其添加到结果中，最终得到完整的列标题。

#### 时间复杂度：
- 每次通过除法操作 `n = (n - 1) / 26`，所以时间复杂度是 O(log_n)，其中 n 是输入的整数。

#### 空间复杂度：
- O(log_n)，由于递归或循环过程中需要存储中间结果。

### C语言解答

```c
#include <stdio.h>
#include <string.h>

char* convertToTitle(int n) {
    static char result[20];  // 最大值为2^31-1，最多20个字符
    int index = 0;  // 结果字符串的索引

    // 从后往前计算每一位
    while (n > 0) {
        n--;  // 调整n的值，使得从A开始
        result[index++] = (n % 26) + 'A';  // 获得当前位的字母
        n /= 26;  // 减少n，继续处理高位
    }

    // 由于是从低位到高位推算的，因此需要反转结果字符串
    result[index] = '\0';  // 末尾加上字符串结束符
    for (int i = 0; i < index / 2; i++) {
        char temp = result[i];
        result[i] = result[index - 1 - i];
        result[index - 1 - i] = temp;
    }

    return result;
}

int main() {
    int n = 701;
    printf("Column Title: %s\n", convertToTitle(n));  // 应该输出 "ZY"
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    string convertToTitle(int n) {
        string result;

        // 从后往前计算每一位
        while (n > 0) {
            n--;  // 调整n的值，使得从A开始
            result.push_back(n % 26 + 'A');  // 获得当前位的字母
            n /= 26;  // 减少n，继续处理高位
        }

        // 因为结果是从低位到高位计算的，需要反转字符串
        reverse(result.begin(), result.end());

        return result;
    }
};

int main() {
    Solution solution;
    int n = 701;
    cout << "Column Title: " << solution.convertToTitle(n) << endl;  // 应该输出 "ZY"
    return 0;
}
```

### 代码解析

#### C语言解答：

1. **初始化与循环**：
   - 使用一个静态数组 `result[20]` 来存储最终的列标题，因为Excel列标题最多需要20个字符来表示。
   - 通过 `n % 26` 得到当前位的字符，计算字符时需要减去1，确保从 `A` 开始。
   - 然后通过 `n /= 26` 更新 `n` 的值，继续向高位推算。

2. **反转字符串**：
   - 由于从低位到高位计算字符，最终结果需要反转。
   - 使用一个简单的双指针技术来反转 `result` 数组。

3. **返回结果**：
   - 返回结果是反转后的字符串。

#### C++解答：

1. **字符串操作**：
   - 使用 `string` 类型来存储结果，避免了静态数组的限制。
   - 同样使用 `n % 26` 来计算字符，通过 `n -= 1` 使得列从 `A` 开始。

2. **反转字符串**：
   - C++ 提供了 `reverse` 函数，可以很方便地对字符串进行反转。

3. **返回结果**：
   - 直接返回最终的 `string` 类型结果。

### 总结

- **时间复杂度**：O(log_n)，其中 n 是输入的整数。每次计算后 `n` 会被除以26，因此计算次数是对数级别的。
- **空间复杂度**：O(log_n)，存储列标题的字符数组或者字符串是根据输入整数大小来决定的。

这种解法高效且直观，能够快速地将数字转换为 Excel 栏的列标题。