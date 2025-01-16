---
layout: post
title:  "151. 反转字符串中的单词"
categories: arithmetic
---

[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string)

### 题目描述

**反转字符串中的单词**

给你一个字符串 `s` ，请你反转字符串中单词的顺序。

单词是由非空格字符组成的字符串。`s` 中使用至少一个空格将字符串中的单词分隔开。返回 **单词顺序反转且单词之间仅用一个空格分隔** 的结果字符串。

**注意：**

- 输入字符串 `s` 可能在前面或者后面包含多余的空格。
- 转换后的字符串中间单词间应当仅用一个空格分隔。
- 字符串中不应包含额外的空格。

**示例 1：**

```
输入：s = "the sky is blue"
输出："blue is sky the"
```

**示例 2：**

```
输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。
```

**示例 3：**

```
输入：s = "a good   example"
输出："example good a"
解释：反转后单词间应当仅用一个空格分隔。
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 包含英文大小写字母、数字和空格 `' '`
- `s` 中至少存在一个单词

### 解题思路

要反转字符串中的单词顺序，并确保单词之间仅用一个空格分隔，可以按照以下步骤进行：

1. **去除多余的空格**：
   - **去除前导空格**：找到字符串中第一个非空格字符的位置。
   - **去除尾随空格**：找到字符串中最后一个非空格字符的位置。
   - **压缩中间的多个空格**：将多个连续的空格压缩为一个空格。

2. **反转整个字符串**：
   - 将整个字符串进行反转，使得单词的顺序也被反转。

3. **反转每个单词**：
   - 遍历反转后的字符串，找到每个单词的起始和结束位置，并将其进行反转，以恢复单词的正确顺序。

4. **构建最终结果**：
   - 根据上述操作，最终得到的字符串即为所需的反转单词顺序的结果。

**详细步骤说明：**

- **去除多余空格**：
  - 使用双指针法，一个指针遍历原字符串，另一个指针用于构建新的字符串。
  - 跳过开头的空格，确保新字符串不以空格开头。
  - 在遍历过程中，当遇到一个空格时，确保前一个字符不是空格，避免多个空格的出现。
  - 最后，确保新字符串不以空格结尾。

- **反转字符串和单词**：
  - 使用辅助函数 `reverseString` 来反转字符串的特定部分。
  - 先反转整个字符串，然后逐个反转每个单词。

- **时间复杂度分析**：
  - 主要操作包括遍历字符串和反转操作，整体时间复杂度为 **O(n)**，其中 `n` 是字符串的长度。

- **空间复杂度分析**：
  - 使用了额外的空间来存储去除空格后的字符串和最终结果，空间复杂度为 **O(n)**。

### C语言解答

以下是基于上述思路的C语言实现，包含详细注释。由于C语言不具备高级字符串处理函数，我们需要手动管理字符串的操作和内存分配。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// 反转字符串的函数
void reverse(char* s, int start, int end) {
    while(start < end){
        char temp = s[start];
        s[start] = s[end];
        s[end] = temp;
        start++;
        end--;
    }
}

// 去除多余空格，并返回新的字符串长度
int trimSpaces(char* s, char* res) {
    int n = strlen(s);
    int i = 0, j = 0;
    
    // 去除前导空格
    while(i < n && isspace(s[i])) i++;
    
    // 去除多余的空格
    while(i < n){
        if(!isspace(s[i])){
            res[j++] = s[i++];
        }
        else{
            // 仅保留一个空格
            res[j++] = ' ';
            while(i < n && isspace(s[i])) i++;
        }
    }
    
    // 去除尾随空格
    if(j > 0 && res[j-1] == ' ') j--;
    
    res[j] = '\0';
    return j;
}

// 主函数：反转字符串中的单词顺序
char* reverseWords(char* s){
    // 去除多余空格
    int n = strlen(s);
    char* trimmed = (char*)malloc((n + 1) * sizeof(char));
    int len = trimSpaces(s, trimmed);
    
    // 反转整个字符串
    reverse(trimmed, 0, len - 1);
    
    // 反转每个单词
    int start = 0;
    for(int i = 0; i <= len; i++){
        if(trimmed[i] == ' ' || trimmed[i] == '\0'){
            reverse(trimmed, start, i - 1);
            start = i + 1;
        }
    }
    
    return trimmed;
}

// 简单的主函数测试
int main(){
    // 示例 1
    char s1[] = "the sky is blue";
    char* result1 = reverseWords(s1);
    printf("示例 1: \"%s\"\n", result1);
    free(result1);
    
    // 示例 2
    char s2[] = "  hello world  ";
    char* result2 = reverseWords(s2);
    printf("示例 2: \"%s\"\n", result2);
    free(result2);
    
    // 示例 3
    char s3[] = "a good   example";
    char* result3 = reverseWords(s3);
    printf("示例 3: \"%s\"\n", result3);
    free(result3);
    
    return 0;
}
```

**代码说明：**

1. **反转函数 `reverse`：**
   - 该函数用于反转字符串中从索引 `start` 到 `end` 的部分。

2. **去除多余空格函数 `trimSpaces`：**
   - 使用双指针法，`i` 用于遍历原字符串，`j` 用于构建新的字符串。
   - 去除前导空格和尾随空格，并将中间的多个空格压缩为一个空格。

3. **主逻辑函数 `reverseWords`：**
   - 首先调用 `trimSpaces` 去除多余空格，得到一个新的字符串 `trimmed`。
   - 反转整个 `trimmed` 字符串。
   - 遍历 `trimmed`，找到每个单词的起始和结束位置，并调用 `reverse` 反转每个单词。

4. **测试函数 `main`：**
   - 创建三个示例输入，调用 `reverseWords` 函数，并打印输出结果。
   - 释放动态分配的内存，避免内存泄漏。

**输出结果：**

```
示例 1: "blue is sky the"
示例 2: "world hello"
示例 3: "example good a"
```

### C++ 解答

以下是基于上述思路的C++实现，利用了C++标准库的 `vector` 和 `string`，使代码更加简洁和高效。

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 主函数：反转字符串中的单词顺序
    string reverseWords(string s) {
        // 去除多余空格
        int n = s.size();
        string trimmed;
        int i = 0;
        // 去除前导空格
        while(i < n && isspace(s[i])) i++;
        // 去除中间多余空格
        while(i < n){
            if(!isspace(s[i])){
                trimmed += s[i++];
            }
            else{
                trimmed += ' ';
                while(i < n && isspace(s[i])) i++;
            }
        }
        // 去除尾随空格
        if(!trimmed.empty() && trimmed.back() == ' ') trimmed.pop_back();
        
        // 反转整个字符串
        reverse(trimmed.begin(), trimmed.end());
        
        // 反转每个单词
        int start = 0;
        for(int j = 0; j <= trimmed.size(); j++){
            if(j == trimmed.size() || trimmed[j] == ' '){
                reverse(trimmed.begin() + start, trimmed.begin() + j);
                start = j + 1;
            }
        }
        
        return trimmed;
    }
};

// 简单的主函数测试
int main(){
    Solution solution;
    
    // 示例 1
    string s1 = "the sky is blue";
    string result1 = solution.reverseWords(s1);
    cout << "示例 1: \"" << result1 << "\"" << endl;
    
    // 示例 2
    string s2 = "  hello world  ";
    string result2 = solution.reverseWords(s2);
    cout << "示例 2: \"" << result2 << "\"" << endl;
    
    // 示例 3
    string s3 = "a good   example";
    string result3 = solution.reverseWords(s3);
    cout << "示例 3: \"" << result3 << "\"" << endl;
    
    return 0;
}
```

**代码说明：**

1. **去除多余空格：**
   - 使用双指针法，首先去除前导空格。
   - 在遍历过程中，当遇到一个空格时，仅保留一个空格，并跳过后续连续的空格。
   - 最后，去除尾随空格。

2. **反转字符串和单词：**
   - 使用 `std::reverse` 反转整个 `trimmed` 字符串。
   - 再次使用 `std::reverse` 反转每个单词，以恢复单词的正确顺序。

3. **主逻辑函数 `reverseWords`：**
   - 完成上述步骤，最终返回反转单词顺序后的字符串。

4. **测试函数 `main`：**
   - 创建三个示例输入，调用 `reverseWords` 函数，并打印输出结果。

**输出结果：**

```
示例 1: "blue is sky the"
示例 2: "world hello"
示例 3: "example good a"
```

### 总结

以上代码实现了在C语言和C++中反转字符串中单词顺序的功能，并确保单词之间仅用一个空格分隔。具体方法包括：

1. **去除多余空格**：
   - 利用双指针法或字符串操作函数，去除前导空格、尾随空格以及中间多余的空格。

2. **反转字符串和单词**：
   - 先反转整个字符串，使得单词的顺序被反转。
   - 然后逐个反转每个单词，恢复单词的正确顺序。

3. **时间和空间复杂度**：
   - 时间复杂度为 **O(n)**，其中 `n` 是字符串的长度。
   - 空间复杂度为 **O(n)**，用于存储去除空格后的字符串和最终结果。

**关键点：**

- **字符串处理**：
  - 在C语言中，需要手动管理字符串的操作和内存分配，确保去除空格和反转操作的正确性。
  - 在C++中，利用 `std::string` 和 `std::reverse` 等标准库函数，简化了字符串操作的实现。

- **反转技巧**：
  - 通过两次反转操作（整体反转和单词反转），可以高效地实现单词顺序的反转。

- **空间优化**：
  - 尽量在原地进行操作，减少额外的空间使用，尤其是在C语言中，需谨慎管理动态内存。

通过以上方法和实现，可以准确、高效地反转字符串中的单词顺序，满足题目的各种要求和约束条件。如果有进一步的问题或需要更多的解释，欢迎继续交流！