---
layout: post
title:  "67. 二进制求和"
categories: arithmetic
---

[67. 二进制求和](https://leetcode.cn/problems/add-binary)

### 题目要求：

给定两个二进制字符串 `a` 和 `b`，返回它们的和（用二进制表示）。

#### 示例：

**示例 1**：
```
输入: a = "11", b = "1"
输出: "100"
解释: 11 + 1 = 100
```

**示例 2**：
```
输入: a = "1010", b = "1011"
输出: "10101"
解释: 10 + 11 = 10101
```

#### 提示：
- 每个输入字符串仅包含字符 `'0'` 或 `'1'`。
- `a` 和 `b` 的长度不超过 10^4。

### 解题思路：

这道题要求我们实现二进制字符串的加法。由于字符串的加法与普通的整数加法类似，但需要处理的是二进制的位数。

1. **从低位开始加法**：我们可以从两个二进制字符串的末尾开始，模拟二进制加法。每位的加法处理包括当前位和进位。
   
2. **进位处理**：加法中可能有进位。假设当前两个二进制位分别为 `a[i]` 和 `b[i]`，以及进位 `carry`，则：
   - `carry = (a[i] + b[i] + carry) / 2`，表示下一位是否需要进位。
   - 当前位的结果是 `(a[i] + b[i] + carry) % 2`。
   
3. **处理长度不等的情况**：如果 `a` 和 `b` 的长度不一样，我们可以将较短的字符串前面补零，直到它们长度相等，或者直接在加法过程中判断各自的当前位。

4. **最后的进位**：如果最终的加法过程中仍然有进位，我们需要在结果字符串的前面添加一个 `1`。

5. **时间和空间复杂度**：时间复杂度为 O(max(n, m))，其中 n 和 m 分别是两个字符串的长度。空间复杂度也是 O(max(n, m))，需要一个字符串来存储最终的结果。

### C语言实现：

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// 函数：将二进制字符串加法
char* addBinary(char* a, char* b) {
    // 找到两个字符串的长度
    int lenA = strlen(a);
    int lenB = strlen(b);
    
    // 确定结果字符串的最大长度
    int maxLen = lenA > lenB ? lenA : lenB;
    // 如果有进位，结果的最大长度可能会 +1
    char* result = (char*)malloc((maxLen + 2) * sizeof(char));  // +2 是为了考虑可能的进位和 '\0'
    
    int carry = 0;  // 进位
    int i = lenA - 1, j = lenB - 1, k = 0;  // i, j 分别是 a 和 b 的指针，k 是结果的指针
    
    // 从低位到高位进行加法
    while (i >= 0 || j >= 0 || carry) {
        int sum = carry;  // 进位
        if (i >= 0) sum += a[i] - '0';  // 将字符转换为数字并加到 sum
        if (j >= 0) sum += b[j] - '0';  // 将字符转换为数字并加到 sum
        
        // 当前位的值为 sum % 2，进位为 sum / 2
        result[k++] = (sum % 2) + '0';  
        carry = sum / 2;
        
        i--;
        j--;
    }
    
    // 反转结果字符串
    result[k] = '\0';  // 终止符
    for (int l = 0; l < k / 2; l++) {
        char temp = result[l];
        result[l] = result[k - 1 - l];
        result[k - 1 - l] = temp;
    }
    
    return result;
}

int main() {
    char a[] = "1010";
    char b[] = "1011";
    
    char* result = addBinary(a, b);
    printf("Result: %s\n", result);
    
    // 释放内存
    free(result);
    
    return 0;
}
```

### C++实现：

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string addBinary(string a, string b) {
        int lenA = a.size();
        int lenB = b.size();
        int i = lenA - 1, j = lenB - 1;
        int carry = 0;  // 进位
        string result = "";
        
        // 从低位到高位进行加法
        while (i >= 0 || j >= 0 || carry) {
            int sum = carry;
            
            // 如果 a 还有位数，加入该位
            if (i >= 0) sum += a[i] - '0';
            
            // 如果 b 还有位数，加入该位
            if (j >= 0) sum += b[j] - '0';
            
            // 当前位的值为 sum % 2，进位为 sum / 2
            result += (sum % 2) + '0';
            carry = sum / 2;
            
            i--;
            j--;
        }
        
        // 反转结果字符串
        reverse(result.begin(), result.end());
        
        return result;
    }
};

int main() {
    Solution solution;
    string a = "1010";
    string b = "1011";
    
    string result = solution.addBinary(a, b);
    cout << "Result: " << result << endl;
    
    return 0;
}
```

### 代码解析：

#### C语言：
1. **字符串长度计算**：使用 `strlen` 获取两个字符串的长度。
2. **结果数组的分配**：我们需要分配一个最大长度为 `max(lenA, lenB) + 2` 的数组（`+2` 是考虑进位和终止符）。
3. **逐位相加**：通过两个指针 `i` 和 `j` 从字符串的末尾逐位进行加法。每次计算当前位的和和进位。
4. **反转结果**：由于我们是从最低位开始加的，最终的结果需要反转。
5. **内存管理**：最后别忘了释放动态分配的内存。

#### C++：
1. **使用 `string` 类型**：C++ 的 `string` 类型提供了更方便的字符串处理和自动内存管理。
2. **逐位加法**：与 C 语言方法相同，从最低位开始逐位相加。
3. **反转字符串**：通过 `reverse` 函数来反转字符串。
4. **内存管理**：C++ 自动管理内存，因此无需手动释放内存。

### 时间和空间复杂度：
- **时间复杂度**：O(max(n, m))，其中 n 和 m 是两个输入字符串的长度。我们最多需要遍历两个字符串的每一位。
- **空间复杂度**：O(max(n, m))，需要一个新的字符串来存储结果。