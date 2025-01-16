---
layout: post
title:  "28. 找出字符串中第一个匹配项的下标"
categories: arithmetic
---

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string)

## 题目要求

给定一个字符串 `haystack` 和一个字符串 `needle`，实现一个函数来查找 `needle` 在 `haystack` 中首次出现的位置。

**要求：**  
返回 `needle` 在 `haystack` 中的第一个匹配位置，如果没有找到，返回 `-1`。

### 示例 1:

**输入:**

```plaintext
haystack = "hello", needle = "ll"
```

**输出:**

```plaintext
2
```

**解释:**

`"ll"` 在 `"hello"` 中首次出现的索引是 2。

### 示例 2:

**输入:**

```plaintext
haystack = "aaaaa", needle = "bba"
```

**输出:**

```plaintext
-1
```

**解释:**

`"bba"` 在 `"aaaaa"` 中并未出现，返回 `-1`。

### 示例 3:

**输入:**

```plaintext
haystack = "", needle = ""
```

**输出:**

```plaintext
0
```

**解释:**

空字符串可以视为在另一个空字符串中的第一个匹配，因此返回 `0`。

## 提示:

- `1 <= haystack.length, needle.length <= 10^4`
- 如果 `needle` 是空字符串，返回 `0`。

## 解题思路

此问题的关键是利用字符串匹配算法来查找子串的位置。简单的解法可以采用 **暴力搜索**，即遍历 `haystack` 中的每个子串并与 `needle` 进行匹配。如果找到，则返回该位置。如果找不到，返回 `-1`。

此外，C语言和C++的字符串操作可以通过标准库函数来简化实现。下面将分别给出 C 和 C++ 的解法。

### C语言解法

我们可以使用标准库中的 `strncmp` 来进行字符串匹配，或者直接使用手动的循环来进行逐字符比较。

### C语言代码实现：

```c
#include <stdio.h>
#include <string.h>

// 函数定义：返回 needle 在 haystack 中第一次出现的位置，若没有找到，返回 -1
int strStr(char *haystack, char *needle) {
    // 如果 needle 是空字符串，返回 0
    if (needle[0] == '\0') {
        return 0;
    }

    // 获取 haystack 和 needle 的长度
    int haystack_len = strlen(haystack);
    int needle_len = strlen(needle);

    // 遍历 haystack 字符串中的每个可能的起始位置
    for (int i = 0; i <= haystack_len - needle_len; i++) {
        // 比较从当前位置开始的子字符串是否与 needle 相同
        if (strncmp(haystack + i, needle, needle_len) == 0) {
            return i; // 找到匹配，返回当前位置
        }
    }

    return -1; // 未找到匹配，返回 -1
}

int main() {
    char haystack[] = "hello";
    char needle[] = "ll";
    int result = strStr(haystack, needle);
    printf("The first occurrence is at index: %d\n", result);  // 输出 2
    return 0;
}
```

### C++ 解法

在 C++ 中，我们可以使用 STL 提供的 `find` 函数来简化匹配过程。然而，题目要求自己实现算法，因此我们会手动遍历和匹配字符串。

在 C++ 中，我们将使用 `class` 封装解决方案，利用 `std::string` 处理字符串，并尽量使用 STL 容器和算法。

### C++ 代码实现：

```cpp
#include <iostream>
#include <string>
using namespace std;

class Solution {
public:
    // 函数定义：返回 needle 在 haystack 中第一次出现的位置，若没有找到，返回 -1
    int strStr(string haystack, string needle) {
        // 如果 needle 是空字符串，返回 0
        if (needle.empty()) {
            return 0;
        }

        // 遍历 haystack 字符串中的每个可能的起始位置
        for (int i = 0; i <= haystack.length() - needle.length(); i++) {
            // 比较从当前位置开始的子字符串是否与 needle 相同
            if (haystack.substr(i, needle.length()) == needle) {
                return i; // 找到匹配，返回当前位置
            }
        }

        return -1; // 未找到匹配，返回 -1
    }
};

int main() {
    Solution solution;
    string haystack = "hello";
    string needle = "ll";
    int result = solution.strStr(haystack, needle);
    cout << "The first occurrence is at index: " << result << endl;  // 输出 2
    return 0;
}
```

### 代码解析

#### C语言代码解析：
- `strStr` 函数的核心是遍历 `haystack` 字符串的每一个可能的起始位置，并使用 `strncmp` 比较从当前位置开始的子字符串与 `needle` 是否匹配。
- 如果匹配成功，返回当前起始位置的索引；否则继续检查下一个起始位置，直到遍历完 `haystack`。
- 如果没有匹配，返回 `-1`。

#### C++代码解析：
- 在 C++ 解法中，我们使用了 `std::string` 类来处理字符串，它提供了更多的便利，如 `substr` 方法可以提取子字符串，且不需要像 C 字符串那样显式计算字符串的长度。
- 在 `strStr` 函数中，我们首先判断 `needle` 是否为空，若为空则直接返回 0。
- 然后，使用 `substr` 方法遍历 `haystack` 中的每个子字符串，并与 `needle` 比较。若匹配成功，则返回该位置的索引。

### 时间复杂度分析：
- C语言和C++的实现都遍历 `haystack` 中每个可能的起始位置进行字符串匹配。
- 在最坏情况下，时间复杂度是 O((N-M+1) * M)，其中 N 是 `haystack` 的长度，M 是 `needle` 的长度。
