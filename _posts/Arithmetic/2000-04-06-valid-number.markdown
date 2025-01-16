---
layout: post
title:  "65. 有效数字"
categories: arithmetic
---

[65. 有效数字](https://leetcode.cn/problems/valid-number)

### 题目描述

请你来实现一个函数，判断一个字符串是否可以表示成一个有效的数字。

---

**有效数字（按顺序）可以分成以下几个部分：**

1. 一个 **小数** 或者 **整数**。
2. （可选）一个 `'e'` 或 `'E'`，后面跟着一个 **整数**。

---

**小数（按顺序）可以分成以下几个部分：**

1. （可选）一个符号字符（`'+'` 或 `'-'`）。
2. 下述格式之一：
   - 至少一位数字，后面跟着一个点 `'.'`。
   - 至少一位数字，后面跟着一个点 `'.'`，再后面跟着至少一位数字。
   - 一个点 `'.'`，后面跟着至少一位数字。

---

**整数（按顺序）可以分成以下几个部分：**

1. （可选）一个符号字符（`'+'` 或 `'-'`）。
2. 至少一位数字。

---

**部分有效数字示例：**

- `["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]`

---

**部分无效数字示例：**

- `["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]`

---

**提示：**

- `1 <= s.length <= 20`
- `s` 仅含英文字母（大写和小写），数字（0-9），加号 `'+'`，减号 `'-'`，或者点 `'.'`。

---

### 解题思路

要判断一个字符串是否是有效的数字，可以采用有限状态机（Finite State Machine，FSM）的方法。通过定义不同的状态以及状态之间的转移规则，逐字符解析字符串，判断其是否符合数字的格式。

---

### C语言实现

```c
#include <stdio.h>
#include <stdbool.h>
#include <ctype.h>

// 判断字符串是否为有效数字
bool isNumber(const char *s) {
    // 状态标志
    bool numSeen = false;      // 是否出现数字
    bool dotSeen = false;      // 是否出现小数点
    bool eSeen = false;        // 是否出现 'e' 或 'E'
    bool numAfterE = true;     // 'e' 或 'E' 后是否有数字

    // 去除前导空格
    while (*s == ' ') s++;

    // 遍历字符串
    for (int i = 0; s[i] != '\0'; i++) {
        if (isdigit(s[i])) { // 如果是数字
            numSeen = true;
            numAfterE = true; // 如果是 'e' 或 'E' 后的数字
        } else if (s[i] == '.') { // 如果是小数点
            if (dotSeen || eSeen) return false; // 小数点不能重复，且不能在 'e' 或 'E' 后
            dotSeen = true;
        } else if (s[i] == 'e' || s[i] == 'E') { // 如果是 'e' 或 'E'
            if (eSeen || !numSeen) return false; // 'e' 或 'E' 不能重复，且前面必须有数字
            eSeen = true;
            numAfterE = false; // 期待 'e' 或 'E' 后有数字
        } else if (s[i] == '+' || s[i] == '-') { // 如果是符号
            // '+' 或 '-' 必须出现在开头，或者紧接在 'e' 或 'E' 后
            if (i > 0 && s[i-1] != 'e' && s[i-1] != 'E') return false;
        } else if (s[i] == ' ') { // 如果是空格
            // 空格只能出现在字符串末尾
            while (s[i] == ' ') i++;
            return s[i] == '\0';
        } else {
            return false; // 其他非法字符
        }
    }

    return numSeen && numAfterE;
}

// 测试函数
int main() {
    const char *tests[] = {
        "2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3",
        "3e+7", "+6e-1", "53.5e93", "-123.456e789", "abc", "1a",
        "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"
    };
    int n = sizeof(tests) / sizeof(tests[0]);

    for (int i = 0; i < n; i++) {
        printf("'%s' is %sa valid number.\n", tests[i], isNumber(tests[i]) ? "" : "not ");
    }

    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <string>
#include <cctype>

using namespace std;

class Solution {
public:
    bool isNumber(string s) {
        bool numSeen = false;    // 是否出现数字
        bool dotSeen = false;    // 是否出现小数点
        bool eSeen = false;      // 是否出现 'e' 或 'E'
        bool numAfterE = true;   // 'e' 或 'E' 后是否有数字

        // 去除前后空格
        s = trim(s);

        for (int i = 0; i < s.size(); ++i) {
            if (isdigit(s[i])) {
                numSeen = true;
                numAfterE = true;
            } else if (s[i] == '.') {
                if (dotSeen || eSeen) return false;
                dotSeen = true;
            } else if (s[i] == 'e' || s[i] == 'E') {
                if (eSeen || !numSeen) return false;
                eSeen = true;
                numAfterE = false;
            } else if (s[i] == '+' || s[i] == '-') {
                if (i > 0 && s[i-1] != 'e' && s[i-1] != 'E') return false;
            } else {
                return false;
            }
        }

        return numSeen && numAfterE;
    }

private:
    string trim(string s) {
        int start = 0, end = s.size() - 1;
        while (start < s.size() && isspace(s[start])) start++;
        while (end >= 0 && isspace(s[end])) end--;
        return start <= end ? s.substr(start, end - start + 1) : "";
    }
};

// 测试函数
int main() {
    Solution solution;
    vector<string> tests = {
        "2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3",
        "3e+7", "+6e-1", "53.5e93", "-123.456e789", "abc", "1a",
        "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"
    };

    for (const auto& test : tests) {
        cout << "'" << test << "' is " << (solution.isNumber(test) ? "" : "not ") << "a valid number." << endl;
    }

    return 0;
}
```

---

### 输出示例

```
'2' is a valid number.
'0089' is a valid number.
'-0.1' is a valid number.
'+3.14' is a valid number.
'4.' is a valid number.
'-.9' is a valid number.
'2e10' is a valid number.
'-90E3' is a valid number.
'3e+7' is a valid number.
'+6e-1' is a valid number.
'53.5e93' is a valid number.
'-123.456e789' is a valid number.
'abc' is not a valid number.
'1a' is not a valid number.
'1e' is not a valid number.
'e3' is not a valid number.
'99e2.5' is not a valid number.
'--6' is not a valid number.
'-+3' is not a valid number.
'95a54e53' is not a valid number.
```