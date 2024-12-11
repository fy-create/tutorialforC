---
layout: post
title:  "12. 整数转罗马数字"
categories: arithmetic
---

[12. 整数转罗马数字](https://leetcode.cn/problems/integer-to-roman)

以下是将 `void intToRoman(int num, char* result)` 修改为 `char* intToRoman(int num)` 的完整实现：

---

### C语言解答

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 将整数转换为罗马数字
char* intToRoman(int num) {
    // 定义数值和对应的罗马数字
    int values[] = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    const char* symbols[] = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    // 为结果分配足够的内存
    char* result = (char*)malloc(20 * sizeof(char));
    result[0] = '\0'; // 初始化为空字符串

    int i = 0;
    // 遍历数值数组
    while (num > 0) {
        // 将当前符号重复添加到结果中，直到 num 小于当前数值
        while (num >= values[i]) {
            strcat(result, symbols[i]);
            num -= values[i];
        }
        i++;
    }

    return result;
}

// 测试函数
int main() {
    int num = 1994;
    char* result = intToRoman(num);
    printf("整数 %d 转换为罗马数字: %s\n", num, result);
    free(result); // 释放分配的内存
    return 0;
}
```

---

### 代码解析

1. **定义数值和对应的罗马数字：**
   - 数组 `values` 和 `symbols` 分别存储特殊数值及其对应的罗马数字。

2. **分配内存：**
   - 使用 `malloc` 为 `result` 分配一个 20 字节的缓冲区，确保足够存储最长的罗马数字。

3. **遍历和拼接：**
   - 遍历 `values` 数组，将对应的符号重复添加到 `result`，并从 `num` 中减去相应的数值，直到 `num` 为 0。

4. **返回结果：**
   - 返回动态分配的字符串 `result`，调用者需要自行释放内存。

---

### C++解答

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 将整数转换为罗马数字
    string intToRoman(int num) {
        // 定义数值和对应的罗马数字
        vector<pair<int, string>> valueSymbols = {
            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
        };

        string result;

        // 遍历每个数值和符号对
        for (const auto& [value, symbol] : valueSymbols) {
            // 将当前符号重复添加到结果中，直到 num 小于当前数值
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }

        return result;
    }
};

// 测试函数
int main() {
    Solution sol;
    int num = 1994;
    string result = sol.intToRoman(num);
    cout << "整数 " << num << " 转换为罗马数字: " << result << endl;
    return 0;
}
```

---

### C++代码解析

1. **定义数值和对应的罗马数字：**
   - 使用 `vector<pair<int, string>>` 存储数值和符号对，方便遍历和访问。

2. **贪心算法：**
   - 从最大数值开始，尽可能多地减去当前数值并将对应符号添加到结果中。

3. **返回结果：**
   - 将最终的罗马数字字符串返回。

4. **使用类封装：**
   - 将逻辑封装在 `Solution` 类中，主函数中调用更具结构化。

---

### 示例运行

#### 输入：
```text
num = 1994
```

#### 输出：
```text
整数 1994 转换为罗马数字: MCMXCIV
```

---

### 时间复杂度和空间复杂度

1. **时间复杂度：** O(1)
   - 最大数值为 3999，迭代次数和符号数量固定。

2. **空间复杂度：**
   - C语言：O(1)（动态分配字符串的大小固定）。
   - C++：O(1)（返回字符串对象的大小与结果长度成正比）。

---

### 总结

- 修改后的 C 版本直接返回动态分配的字符串，使用更简洁。
- C++ 版本通过 STL 容器和字符串操作实现高效且易读的解决方案。
- 双版本均实现清晰高效，适合整数到罗马数字的转换任务。