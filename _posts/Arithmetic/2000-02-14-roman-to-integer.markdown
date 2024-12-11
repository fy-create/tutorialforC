---
layout: post
title:  "13. 罗马数字转整数"
categories: arithmetic
---

[13. 罗马数字转整数](https://leetcode.cn/problems/roman-to-integer)

**题目描述：**

罗马数字包含以下七种字符：I（1）、V（5）、X（10）、L（50）、C（100）、D（500）和 M（1000）。

例如，数字 2 写作 II，即为两个并列的 1。12 写作 XII，即为 X + II。27 写作 XXVII，即为 XX + V + II。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写作 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4。同样地，数字 9 表示为 IX。

这个特殊的规则只适用于以下六种情况：

- I 可以放在 V（5）和 X（10）的左边，来表示 4 和 9。
- X 可以放在 L（50）和 C（100）的左边，来表示 40 和 90。
- C 可以放在 D（500）和 M（1000）的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

**示例：**

- **输入：** "III"
  **输出：** 3

- **输入：** "IV"
  **输出：** 4

- **输入：** "IX"
  **输出：** 9

- **输入：** "LVIII"
  **输出：** 58
  **解释：** L = 50, V = 5, III = 3。

- **输入：** "MCMXCIV"
  **输出：** 1994
  **解释：** M = 1000, CM = 900, XC = 90, IV = 4。

**C语言解答：**

```c
#include <stdio.h>
#include <string.h>

// 将罗马数字字符转换为对应的整数值
int romanCharToInt(char c) {
    switch (c) {
        case 'I': return 1;
        case 'V': return 5;
        case 'X': return 10;
        case 'L': return 50;
        case 'C': return 100;
        case 'D': return 500;
        case 'M': return 1000;
        default: return 0;
    }
}

// 将罗马数字字符串转换为整数
int romanToInt(const char* s) {
    int total = 0;
    int prevValue = 0;
    int length = strlen(s);

    for (int i = length - 1; i >= 0; i--) {
        int currentValue = romanCharToInt(s[i]);
        if (currentValue < prevValue) {
            total -= currentValue;
        } else {
            total += currentValue;
        }
        prevValue = currentValue;
    }

    return total;
}

// 测试函数
int main() {
    const char* roman = "MCMXCIV";
    int result = romanToInt(roman);
    printf("罗马数字 %s 转换为整数: %d\n", roman, result);
    return 0;
}
```

**代码解析：**

1. **辅助函数 `romanCharToInt`：**
   - 将单个罗马数字字符转换为对应的整数值。

2. **主函数 `romanToInt`：**
   - 初始化总数 `total` 和前一个字符的数值 `prevValue`。
   - 从右向左遍历罗马数字字符串：
     - 获取当前字符的数值 `currentValue`。
     - 如果当前值小于前一个值，减去当前值；否则，加上当前值。
     - 更新前一个值为当前值。

3. **测试函数：**
   - 测试将罗马数字 "MCMXCIV" 转换为整数，输出结果。

**C++解答：**

```cpp
#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;

class Solution {
public:
    // 将罗马数字字符串转换为整数
    int romanToInt(const string& s) {
        unordered_map<char, int> romanMap = {
            {'I', 1}, {'V', 5}, {'X', 10},
            {'L', 50}, {'C', 100}, {'D', 500}, {'M', 1000}
        };

        int total = 0;
        int prevValue = 0;

        for (auto it = s.rbegin(); it != s.rend(); ++it) {
            int currentValue = romanMap[*it];
            if (currentValue < prevValue) {
                total -= currentValue;
            } else {
                total += currentValue;
            }
            prevValue = currentValue;
        }

        return total;
    }
};

// 测试函数
int main() {
    Solution solution;
    string roman = "MCMXCIV";
    int result = solution.romanToInt(roman);
    cout << "罗马数字 " << roman << " 转换为整数: " << result << endl;
    return 0;
}
```

**代码解析：**

1. **使用 `unordered_map`：**
   - 将罗马数字字符映射到对应的整数值，方便查找。

2. **从右向左遍历字符串：**
   - 使用反向迭代器，从字符串末尾向前遍历。
   - 获取当前字符的数值 `currentValue`。
   - 如果当前值小于前一个值，减去当前值；否则，加上当前值。
   - 更新前一个值为当前值。

3. **主函数测试：**
   - 创建 `Solution` 类的对象并调用 `romanToInt` 方法，将罗马数字字符串 "MCMXCIV" 转换为整数并打印结果。

---

### 示例运行

#### 输入：
```text
MCMXCIV
```

#### 输出：
```text
罗马数字 MCMXCIV 转换为整数: 1994
```

---

### 时间复杂度和空间复杂度

1. **时间复杂度：**  
   - C语言和 C++版本均为 **O(n)**，其中 `n` 是罗马数字字符串的长度。每个字符只遍历一次。

2. **空间复杂度：**  
   - C语言版本：使用了固定大小的内存，无额外空间消耗，为 **O(1)**。
   - C++版本：`unordered_map` 使用了常数级的额外空间来存储罗马数字字符与整数值的映射，为 **O(1)**。

---

### 总结

- C语言版本通过手动实现字符到整数的映射和遍历逻辑，保持简洁。
- C++版本利用 `unordered_map` 和 STL 容器简化了查找操作，代码更加优雅。
- 双版本都实现了从罗马数字到整数的高效转换，适用于所有合法的罗马数字输入。