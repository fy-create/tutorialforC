---
layout: post
title:  "125. 验证回文串"
categories: arithmetic
---

[125. 验证回文串](https://leetcode.cn/problems/valid-palindrome)

### 题目描述

给定一个字符串 `s`，验证它是否是一个回文串，只考虑字母和数字字符，可以忽略字母的大小写。

**说明**：本题中，我们将空字符串定义为有效的回文串。

---

**示例 1：**

```
输入: s = "A man, a plan, a canal: Panama"
输出: true
解释: "amanaplanacanalpanama" 是回文串。
```

**示例 2：**

```
输入: s = "race a car"
输出: false
解释: "raceacar" 不是回文串。
```

---

**提示：**

- `1 <= s.length <= 2 * 10⁵`
- 字符串 `s` 仅由可打印的 ASCII 字符组成

---

### 解题思路

1. **双指针法**：
   - 定义两个指针 `left` 和 `right`，分别指向字符串的开头和结尾。
   - 循环检查两指针指向的字符：
     - 如果不是字母或数字，跳过当前字符。
     - 如果指针指向的字符相同，继续比较。
     - 如果不同，则返回 `false`。
   - 如果所有字符都匹配，则返回 `true`。

2. **忽略大小写**：
   - 将大写字母统一转为小写，或者直接使用库函数处理。

3. **时间复杂度**：
   - 遍历字符串一次，时间复杂度为 O(n)。

4. **空间复杂度**：
   - 使用常量额外空间，空间复杂度为 O(1)。

---

### C 语言实现

```c
#include <stdio.h>
#include <ctype.h>
#include <stdbool.h>
#include <string.h>

// 检查字符串是否是回文串
bool isPalindrome(char* s) {
    int left = 0;
    int right = strlen(s) - 1;

    while (left < right) {
        // 跳过非字母数字字符
        while (left < right && !isalnum(s[left])) {
            left++;
        }
        while (left < right && !isalnum(s[right])) {
            right--;
        }

        // 忽略大小写比较字符
        if (tolower(s[left]) != tolower(s[right])) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

// 测试函数
int main() {
    char s1[] = "A man, a plan, a canal: Panama";
    char s2[] = "race a car";

    printf("输入: \"%s\", 输出: %s\n", s1, isPalindrome(s1) ? "true" : "false");
    printf("输入: \"%s\", 输出: %s\n", s2, isPalindrome(s2) ? "true" : "false");

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <cctype>
#include <string>

using namespace std;

class Solution {
public:
    bool isPalindrome(string s) {
        int left = 0, right = s.size() - 1;

        while (left < right) {
            // 跳过非字母数字字符
            while (left < right && !isalnum(s[left])) {
                left++;
            }
            while (left < right && !isalnum(s[right])) {
                right--;
            }

            // 忽略大小写比较字符
            if (tolower(s[left]) != tolower(s[right])) {
                return false;
            }

            left++;
            right--;
        }

        return true;
    }
};

// 测试函数
int main() {
    Solution sol;

    string s1 = "A man, a plan, a canal: Panama";
    string s2 = "race a car";

    cout << "输入: \"" << s1 << "\", 输出: " << (sol.isPalindrome(s1) ? "true" : "false") << endl;
    cout << "输入: \"" << s2 << "\", 输出: " << (sol.isPalindrome(s2) ? "true" : "false") << endl;

    return 0;
}
```

---

### 代码说明

1. **双指针法**：
   - 通过两个指针 `left` 和 `right`，从字符串两端向中间检查字符。

2. **跳过非字母数字字符**：
   - 使用 `isalnum` 判断字符是否是字母或数字。

3. **忽略大小写**：
   - 使用 `tolower` 将字符转换为小写后进行比较。

4. **时间复杂度**：
   - 字符串长度为 `n`，每个字符最多访问一次，时间复杂度为 O(n)。

5. **空间复杂度**：
   - 不使用额外存储空间，空间复杂度为 O(1)。