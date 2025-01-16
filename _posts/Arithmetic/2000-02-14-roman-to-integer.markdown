---
layout: post
title:  "13. 罗马数字转整数"
categories: arithmetic
---

[13. 罗马数字转整数](https://leetcode.cn/problems/roman-to-integer)

### 题目：罗马数字转整数 (Roman to Integer)

#### 题目要求：
罗马数字包含以下七种符号：`I`, `V`, `X`, `L`, `C`, `D`, `M`，它们的值依次为：  
```
I   = 1
V   = 5
X   = 10
L   = 50
C   = 100
D   = 500
M   = 1000
```
罗马数字中的数字是从左到右排列的，并且遵循一定的规则：如果一个小的数字在大的数字的左边，它表示减去这个小的数字。例如：
- `IV` 表示 `4`，因为 `I` 在 `V` 左边，表示减去 `I`。
- `IX` 表示 `9`，因为 `I` 在 `X` 左边，表示减去 `I`。
- `XL` 表示 `40`，因为 `X` 在 `L` 左边，表示减去 `X`。
- `XC` 表示 `90`，因为 `X` 在 `C` 左边，表示减去 `X`。
- `CD` 表示 `400`，因为 `C` 在 `D` 左边，表示减去 `C`。
- `CM` 表示 `900`，因为 `C` 在 `M` 左边，表示减去 `C`。

给定一个罗马数字，转换成一个整数。输入保证是有效的罗马数字，且在 `1` 到 `3999` 的范围内。

**示例 1:**
```
输入: s = "III"
输出: 3
```

**示例 2:**
```
输入: s = "IV"
输出: 4
```

**示例 3:**
```
输入: s = "IX"
输出: 9
```

**示例 4:**
```
输入: s = "LVIII"
输出: 58
```

**示例 5:**
```
输入: s = "MCMXCIV"
输出: 1994
```

#### 提示：
- `1 <= s.length <= 15`
- `s` 是有效的罗马数字，且其值在 `1` 到 `3999` 之间。

---

### 解题思路：

1. **基本思路**：
   - 罗马数字由符号（`I`, `V`, `X`, `L`, `C`, `D`, `M`）组成。
   - 数字的计算规则有两个重要点：通常是从左到右相加，但如果较小的数字出现在较大的数字前面，表示需要减去该小的数字。例如，`IV` 就是 `5 - 1 = 4`。
   - 由于每个罗马数字符号的值是固定的，我们可以用一个哈希表来记录每个罗马数字符号对应的值。

2. **转换方法**：
   - 从字符串的右边开始遍历罗马数字，使用当前字符与其后一个字符进行比较。
   - 如果当前字符表示的值大于或等于下一个字符的值，则将其加到总和中。
   - 如果当前字符表示的值小于下一个字符的值，则表示需要从总和中减去当前字符的值。
   - 最终得到的总和就是对应的整数。

#### C 语言解法：

```c
#include <stdio.h>
#include <string.h>

// 函数：将罗马数字转化为整数
int romanToInt(char* s) {
    // 罗马数字对应的值
    int roman_values[128] = {0};  // 初始化一个大小为128的数组
    roman_values['I'] = 1;
    roman_values['V'] = 5;
    roman_values['X'] = 10;
    roman_values['L'] = 50;
    roman_values['C'] = 100;
    roman_values['D'] = 500;
    roman_values['M'] = 1000;

    int length = strlen(s);
    int result = 0;

    // 从右到左遍历字符串
    for (int i = 0; i < length; i++) {
        int current = roman_values[s[i]];  // 当前字符的罗马数字值
        int next = roman_values[s[i + 1]];  // 下一个字符的罗马数字值（如果存在）

        if (current < next) {
            // 如果当前数字小于下一个数字，表示需要减去当前数字的值
            result -= current;
        } else {
            // 否则，将当前数字的值加到总和
            result += current;
        }
    }

    return result;
}

int main() {
    char s[] = "MCMXCIV";
    int result = romanToInt(s);
    printf("Integer value: %d\n", result);  // 输出 1994
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

class Solution {
public:
    int romanToInt(string s) {
        // 罗马数字对应的值
        unordered_map<char, int> roman_values = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };

        int length = s.length();
        int result = 0;

        // 从左到右遍历字符串
        for (int i = 0; i < length; i++) {
            int current = roman_values[s[i]];  // 当前字符的罗马数字值
            int next = (i + 1 < length) ? roman_values[s[i + 1]] : 0;  // 下一个字符的罗马数字值

            if (current < next) {
                // 如果当前数字小于下一个数字，表示需要减去当前数字的值
                result -= current;
            } else {
                // 否则，将当前数字的值加到总和
                result += current;
            }
        }

        return result;
    }
};

int main() {
    Solution solution;
    string s = "MCMXCIV";
    int result = solution.romanToInt(s);
    cout << "Integer value: " << result << endl;  // 输出 1994
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 使用一个大小为 128 的数组 `roman_values` 来存储每个字符对应的罗马数字值。数组的索引值是字符的 ASCII 码，方便查找。
   - 遍历字符串中的每个字符，依次计算其对应的值，并根据与下一个字符的值进行比较来决定是加还是减。

2. **C++ 实现**：
   - 使用 `unordered_map<char, int>` 来存储罗马数字字符与其对应值的映射。
   - 从左到右遍历字符串，获取当前字符和下一个字符的值，若当前字符值小于下一个字符值，则表示需要减去当前字符的值，否则加上当前字符的值。

#### 核心算法：
- **贪心算法**：逐个字符处理罗马数字，判断当前字符与下一个字符的值大小关系，决定是加还是减。
