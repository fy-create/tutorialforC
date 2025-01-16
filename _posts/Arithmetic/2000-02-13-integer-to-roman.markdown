---
layout: post
title:  "12. 整数转罗马数字"
categories: arithmetic
---

[12. 整数转罗马数字](https://leetcode.cn/problems/integer-to-roman)

### 题目：整数转罗马数字 (Integer to Roman)

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
例如，数字 `2` 可以写作 `II`，即为两个 `I` 相加。而数字 `12` 可以写作 `XII`，即为 `X + II`。数字 `27` 可以写作 `XXVII`，即为 `X + X + V + II`。

不过，在罗马数字中，我们通常使用特定的规则来表示数字。特别是以下规则：
- `I` 可以放在 `V` (5) 和 `X` (10) 的前面，表示 `4` 和 `9`。  
  - `IV` 表示 4，`IX` 表示 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的前面，表示 `40` 和 `90`。  
  - `XL` 表示 40，`XC` 表示 90。
- `C` 可以放在 `D` (500) 和 `M` (1000) 的前面，表示 `400` 和 `900`。  
  - `CD` 表示 400，`CM` 表示 900。

给定一个整数，将其转化为罗马数字。输入保证在 1 到 3999 的范围内。

**示例 1:**
```
输入: num = 3
输出: "III"
```

**示例 2:**
```
输入: num = 4
输出: "IV"
```

**示例 3:**
```
输入: num = 9
输出: "IX"
```

**示例 4:**
```
输入: num = 58
输出: "LVIII"
```

**示例 5:**
```
输入: num = 1994
输出: "MCMXCIV"
```

#### 提示：
- `1 <= num <= 3999`

---

### 解题思路：

1. **罗马数字的表示方式**： 
   罗马数字是按从大到小的顺序排列的（例如 `M` 对应 1000，`D` 对应 500，等等）。对于一个数字，我们需要根据其位数（千位、百位、十位、个位）依次将数字转化为罗马数字。

2. **转换方式**：
   - 将数字拆分成各个部分（千位、百位、十位、个位），然后根据各部分的值来选择对应的罗马数字符号。
   - 罗马数字有一些特殊的表示法，如 `4` 为 `IV`，`9` 为 `IX`，`40` 为 `XL` 等。我们可以提前定义一个罗马数字的字符映射表。
   
3. **具体步骤**：
   - 定义一个包含罗马数字的数组，例如：
     ```
     {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1}
     ```
     对应的罗马数字：
     ```
     {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"}
     ```
   - 对于给定的数字，从大到小的值依次处理，减去合适的数字，并拼接相应的罗马数字符号。

#### C 语言解法：

```c
#include <stdio.h>
#include <string.h>

void intToRoman(int num, char* result) {
    // 罗马数字对应的值
    int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    // 罗马数字字符数组
    char* symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    int index = 0;
    result[0] = '\0'; // 初始化结果字符串

    // 处理每个罗马数字的部分
    for (int i = 0; i < 13; i++) {
        while (num >= values[i]) {
            num -= values[i];
            strcat(result, symbols[i]); // 拼接相应的罗马数字符号
        }
    }
}

int main() {
    int num = 1994;
    char result[20] = {0}; // 结果字符串
    intToRoman(num, result);
    printf("Roman numeral: %s\n", result);  // 输出 "MCMXCIV"
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string intToRoman(int num) {
        // 罗马数字对应的值
        vector<int> values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        // 罗马数字字符数组
        vector<string> symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        
        string result = "";

        // 处理每个罗马数字的部分
        for (int i = 0; i < values.size(); i++) {
            while (num >= values[i]) {
                num -= values[i];
                result += symbols[i];  // 拼接相应的罗马数字符号
            }
        }

        return result;
    }
};

int main() {
    Solution solution;
    int num = 1994;
    string result = solution.intToRoman(num);
    cout << "Roman numeral: " << result << endl;  // 输出 "MCMXCIV"
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - `values` 数组保存了所有罗马数字的值，从大到小排列。
   - `symbols` 数组保存了对应的罗马数字符号，按照值的顺序排列。
   - `intToRoman` 函数通过逐步减去数字，并拼接相应的罗马数字符号，直到数字为 0。

2. **C++ 实现**：
   - C++ 代码与 C 语言实现类似，但使用了 `vector<int>` 和 `vector<string>` 来存储值和符号。
   - 使用 `string` 来拼接罗马数字符号，简化了 C 语言中对字符数组的操作。
   - 最终返回拼接好的罗马数字字符串。

#### 核心算法：
- **贪心算法**：从最大的罗马数字开始，尽可能多地减去相应的值，并拼接对应的罗马数字符号。这样保证了从大到小的顺序转换，最终得到正确的罗马数字表示。