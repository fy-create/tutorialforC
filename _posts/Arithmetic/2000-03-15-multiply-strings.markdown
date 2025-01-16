---
layout: post
title:  "43. 字符串相乘"
categories: arithmetic
---

[43. 字符串相乘](https://leetcode.cn/problems/multiply-strings)

## 题目要求

### 描述：
给定两个用字符串表示的非负整数 `num1` 和 `num2`，返回它们的乘积，结果应为字符串。

请不要使用任何内置的大数类型（如 `BigInteger`）。你需要模拟大数乘法。

### 示例 1：

**输入：**  
`num1 = "2", num2 = "3"`

**输出：**  
`"6"`

### 示例 2：

**输入：**  
`num1 = "123", num2 = "456"`

**输出：**  
`"56088"`

### 提示：
- `1 <= num1.length, num2.length <= 200`
- `num1` 和 `num2` 只包含数字字符 `'0'` 到 `'9'`。
- `num1` 和 `num2` 都不包含任何前导零，除非数字本身就是零。

## 解题思路

### 思路：
模拟手动乘法过程是解决该问题的核心。我们将大数乘法分解为以下步骤：

1. **初始化：**
   - 创建一个长度为 `num1.length + num2.length` 的数组 `result`，用来存储乘积的结果。数组的大小是因为两个数字的乘积最多会有 `len1 + len2` 位数。例如，乘积 99 × 99 会有 4 位数。

2. **逐位相乘：**
   - 从 `num1` 和 `num2` 的每一位开始相乘。对于每一对数字 `num1[i]` 和 `num2[j]`，将它们的乘积加到 `result[i + j]` 的位置上。
   - 注意：我们在存储结果时，需要考虑到进位的情况。每当一个位置的数值大于 10 时，需要将进位加到高一位。

3. **处理进位：**
   - 对数组 `result` 中的每个元素进行处理，确保每个位置都符合十进制数的要求（即，个位数存储在当前位，十位数进位到下一个位）。

4. **构建结果字符串：**
   - 最终，遍历 `result` 数组，跳过前导零，将数组内容转化为最终的字符串结果。

5. **考虑边界情况：**
   - 如果其中一个数字是 "0"，则直接返回 "0"。

### 代码实现：

#### C语言解答

```c
#include <stdio.h>
#include <string.h>

// 计算两个数字字符串的乘积并返回字符串结果
char* multiply(char* num1, char* num2) {
    int len1 = strlen(num1);
    int len2 = strlen(num2);
    
    // 结果数组的最大长度为 len1 + len2
    int resultLen = len1 + len2;
    int result[resultLen];
    
    // 初始化结果数组，所有元素都为 0
    for (int i = 0; i < resultLen; i++) {
        result[i] = 0;
    }
    
    // 从后往前遍历 num1 和 num2 的每一位进行乘法
    for (int i = len1 - 1; i >= 0; i--) {
        for (int j = len2 - 1; j >= 0; j--) {
            int mul = (num1[i] - '0') * (num2[j] - '0');  // 计算当前两位的乘积
            int sum = mul + result[i + j + 1];  // 加上当前结果数组的位置已有值
            
            result[i + j + 1] = sum % 10;  // 当前位保存个位数
            result[i + j] += sum / 10;  // 进位加到高一位
        }
    }

    // 处理结果数组中的前导零
    int start = 0;
    while (start < resultLen && result[start] == 0) {
        start++;
    }

    // 如果没有结果则返回 "0"
    if (start == resultLen) {
        return "0";
    }

    // 将结果数组转为字符串
    char* resultStr = (char*)malloc(sizeof(char) * (resultLen - start + 1));
    int index = 0;
    for (int i = start; i < resultLen; i++) {
        resultStr[index++] = result[i] + '0';
    }
    resultStr[index] = '\0';
    
    return resultStr;
}

int main() {
    char num1[] = "123";
    char num2[] = "456";
    
    char* result = multiply(num1, num2);
    printf("Multiplication result: %s\n", result);
    
    return 0;
}
```

#### C++解答

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    string multiply(string num1, string num2) {
        int len1 = num1.length();
        int len2 = num2.length();

        // 结果数组的最大长度为 len1 + len2
        int resultLen = len1 + len2;
        vector<int> result(resultLen, 0);
        
        // 从后往前遍历 num1 和 num2 的每一位进行乘法
        for (int i = len1 - 1; i >= 0; i--) {
            for (int j = len2 - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = mul + result[i + j + 1];
                
                result[i + j + 1] = sum % 10;  // 当前位保存个位数
                result[i + j] += sum / 10;  // 进位加到高一位
            }
        }

        // 处理结果数组中的前导零
        string resultStr = "";
        bool leadingZero = true;
        for (int i = 0; i < resultLen; i++) {
            if (result[i] == 0 && leadingZero) {
                continue;  // 跳过前导零
            }
            leadingZero = false;
            resultStr += (result[i] + '0');
        }
        
        // 如果结果为空，返回 "0"
        if (resultStr.empty()) {
            return "0";
        }
        
        return resultStr;
    }
};

int main() {
    Solution solution;
    string num1 = "123";
    string num2 = "456";
    
    string result = solution.multiply(num1, num2);
    cout << "Multiplication result: " << result << endl;
    
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **初始化：**
   - 计算结果数组的大小为 `len1 + len2`，因为两者的乘积最大可能有 `len1 + len2` 位数。
   
2. **逐位相乘：**
   - 使用两个嵌套循环，从 `num1` 和 `num2` 的尾部开始逐位相乘，更新结果数组的相应位置。
   - 计算每一对数字的乘积，存储在结果数组中，并处理进位。
   
3. **处理进位：**
   - 每次计算乘积后，更新当前位，并将进位加到上一个更高位。

4. **构建结果字符串：**
   - 跳过结果数组中的前导零，构建最终的结果字符串。

5. **边界情况：**
   - 如果没有有效的结果，则返回 "0"。

#### C++解答：
- C++解法与C解法类似，使用 `vector` 容器来存储中间结果，并使用 `string` 来构建最终的字符串结果。
- 使用 `leadingZero` 标志来跳过前导零，确保返回的字符串没有不必要的零。

### 时间复杂度：
- **时间复杂度**：O(m * n)，其中 m 和 n 分别是 `num1` 和 `num2` 的长度。每一位都需要进行一次乘法运算和加法运算。
- **空间复杂度**：O(m + n)，我们使用了一个大小为 `m + n` 的数组来存储中间结果。

### 小结：
- 该解法模拟了手动大数乘法的过程，逐位计算并处理进位。
- 适用于不使用大数库的情况下，通过合理的空间和时间优化完成计算。