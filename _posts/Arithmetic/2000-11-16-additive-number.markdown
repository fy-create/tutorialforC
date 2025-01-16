---
layout: post
title:  "306. 累加数"
categories: arithmetic
---

[306. 累加数](https://leetcode.cn/problems/additive-number)

Here is the content of the problem from Leetcode:

### 题目描述

一个数列 `X` 是一个加法数列，如果它满足：`X[i] = X[i-1] + X[i-2]` (对于所有 `i >= 2`)，也就是说，每个数都是前两个数的和。

现在给定一个字符串 `s`，请判断这个字符串是否可以分成若干个加法数列。

### 示例 1:

输入: `"112358"`  
输出: `true`  
解释: 这个字符串可以被分成 `1, 1, 2, 3, 5, 8`，它们的和满足加法数列的条件。

### 示例 2:

输入: `"199100199"`  
输出: `true`  
解释: 这个字符串可以被分成 `1, 99, 100, 199`，它们的和满足加法数列的条件。

### 提示:

- `1 <= s.length <= 35`
- `s` 只包含数字。

---

### 解题思路

本题的关键是判断一个字符串是否可以被分割成一个加法数列。我们可以通过尝试不同的数字组合来判断字符串是否符合加法数列的条件。具体步骤如下：

1. **双重循环**：我们首先选择前两个数，然后根据这两个数的和来检查后续数字是否满足加法数列的条件。
2. **边界检查**：需要特别注意避免数字以零开头的情况，例如 "01" 或 "000" 等。
3. **递归检查**：在选择了前两个数字后，继续递归判断剩余部分的数列是否符合加法数列的条件。
4. **字符串分割**：通过控制前两个数的长度来生成不同的组合，直到找到一个满足条件的组合。

### C 语言解答

```c
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <stdlib.h>

// 判断一个字符串是否是有效的加法数列
bool isAdditiveNumber(char* s) {
    int len = strlen(s);
    // 通过不同长度的前两个数来分割字符串
    for (int i = 1; i <= len / 2; i++) {
        for (int j = i + 1; j <= len; j++) {
            // 获取前两个数
            char num1[i+1], num2[j-i+1];
            strncpy(num1, s, i);
            num1[i] = '\0';
            strncpy(num2, s+i, j-i);
            num2[j-i] = '\0';

            // 排除前导零的情况
            if ((num1[0] == '0' && i > 1) || (num2[0] == '0' && j - i > 1)) {
                continue;
            }

            // 判断是否满足加法数列的条件
            long long n1 = atoll(num1);
            long long n2 = atoll(num2);
            char* remaining = s + j;
            bool valid = true;

            while (*remaining) {
                long long n3 = n1 + n2;
                char buffer[32];
                sprintf(buffer, "%lld", n3);
                int len3 = strlen(buffer);

                if (strncmp(remaining, buffer, len3) != 0) {
                    valid = false;
                    break;
                }

                // 更新 n1 和 n2
                n1 = n2;
                n2 = n3;
                remaining += len3;
            }

            if (valid && *remaining == '\0') {
                return true;
            }
        }
    }
    return false;
}

int main() {
    char s[] = "112358";
    if (isAdditiveNumber(s)) {
        printf("true\n");
    } else {
        printf("false\n");
    }
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <string>

using namespace std;

class Solution {
public:
    bool isAdditiveNumber(string s) {
        int len = s.length();

        // 通过不同长度的前两个数来分割字符串
        for (int i = 1; i <= len / 2; i++) {
            for (int j = i + 1; j <= len; j++) {
                // 获取前两个数
                string num1 = s.substr(0, i);
                string num2 = s.substr(i, j - i);

                // 排除前导零的情况
                if ((num1[0] == '0' && i > 1) || (num2[0] == '0' && j - i > 1)) {
                    continue;
                }

                long long n1 = stoll(num1);
                long long n2 = stoll(num2);
                string remaining = s.substr(j);
                bool valid = true;

                while (!remaining.empty()) {
                    long long n3 = n1 + n2;
                    string n3Str = to_string(n3);

                    if (remaining.find(n3Str) != 0) {
                        valid = false;
                        break;
                    }

                    // 更新 n1 和 n2
                    n1 = n2;
                    n2 = n3;
                    remaining = remaining.substr(n3Str.length());
                }

                if (valid && remaining.empty()) {
                    return true;
                }
            }
        }
        return false;
    }
};

int main() {
    Solution solution;
    string s = "112358";
    if (solution.isAdditiveNumber(s)) {
        cout << "true" << endl;
    } else {
        cout << "false" << endl;
    }
    return 0;
}
```

这两个解法的核心是通过遍历字符串的所有可能的前两个数的组合，检查它们是否能满足加法数列的条件。在 C 语言中，我们使用 `atoll` 来转换字符串为长整型数值，而在 C++ 中使用 `stoll`。两种语言中都进行了前导零的检查，确保生成的数字符合要求。