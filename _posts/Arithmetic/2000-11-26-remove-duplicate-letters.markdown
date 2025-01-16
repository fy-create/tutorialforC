---
layout: post
title:  "316. 去除重复字母"
categories: arithmetic
---

[316. 去除重复字母](https://leetcode.cn/problems/remove-duplicate-letters)

### 题目描述

给你一个字符串 `s`，请你删除字符串中重复的字母，使得每个字母只出现一次。你必须保证返回的结果是所有可能结果中 **字典序最小** 的那个。

**注意：**
- 该题保证 `s` 的结果是唯一的。

**示例 1：**

```
输入：s = "bcabc"
输出："abc"
```

**示例 2：**

```
输入：s = "cbacdcbc"
输出："acdb"
```

**提示：**

- `1 <= s.length <= 10^4`
- `s` 由小写英文字母组成

---

### 解题思路

这道题要求在删除重复字母后，使得剩下的字母组成的字符串字典序最小。为了实现这一目标，可以使用 **单调栈** 的方法，同时结合 **贪心算法** 的思想。具体步骤如下：

1. **统计每个字符的出现次数**：
   - 遍历字符串 `s`，统计每个字符在字符串中出现的次数，存储在一个数组 `count` 中。

2. **维护一个栈来构建结果**：
   - 使用一个栈（可以用字符串模拟）来存储最终的结果字符。
   - 使用一个布尔数组 `inStack` 来记录某个字符是否已经在栈中，防止重复。

3. **遍历字符串并处理每个字符**：
   - 对于每个字符 `c`，首先减少 `count[c]` 的计数，因为这个字符已经被处理过一次。
   - 如果字符 `c` 已经在栈中，则跳过此次循环，继续下一个字符。
   - 如果字符 `c` 不在栈中，检查栈顶字符是否可以被替换：
     - 当栈顶字符 `top` 比当前字符 `c` 大，并且栈顶字符 `top` 后面还会出现时，可以将 `top` 从栈中弹出，并将其标记为未在栈中。
   - 将当前字符 `c` 压入栈中，并标记为已在栈中。

4. **构建最终结果**：
   - 将栈中的字符依次拼接起来，得到最终的结果字符串。

**关键点分析**：

- **单调栈**：通过维护一个单调递增的栈，可以保证结果字符串的字典序最小。
- **贪心策略**：每次尽可能移除栈顶的字符，以便放置一个更小的字符。
- **去重处理**：使用 `inStack` 数组确保每个字符只出现在结果中一次。

**时间复杂度**：`O(n)`，其中 `n` 是字符串 `s` 的长度。每个字符最多被压入和弹出栈一次。

**空间复杂度**：`O(1)`，由于字符集固定为小写英文字母，额外空间复杂度为常数。

---

### C语言解答

在C语言中，由于缺乏动态数据结构如栈，可以使用字符数组模拟栈的行为。以下是详细的实现：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 函数用于删除字符串中的重复字母，返回字典序最小的结果
char* removeDuplicateLetters(char* s) {
    int n = strlen(s);
    int count[26] = {0};        // 记录每个字符的剩余次数
    bool inStack[26] = {false}; // 记录字符是否已经在栈中
    char* stack = (char*)malloc((n + 1) * sizeof(char));
    int top = 0;                 // 栈顶指针

    // 统计每个字符的出现次数
    for(int i = 0; i < n; i++) {
        count[s[i] - 'a']++;
    }

    // 遍历字符串
    for(int i = 0; i < n; i++) {
        char c = s[i];
        int idx = c - 'a';
        // 当前字符已经在栈中，跳过
        if(inStack[idx]) {
            count[idx]--;
            continue;
        }

        // 如果当前字符小于栈顶字符，并且栈顶字符后面还会出现，则弹出栈顶字符
        while(top > 0 && c < stack[top -1] && count[stack[top -1] - 'a'] > 0) {
            // 标记栈顶字符不在栈中
            inStack[stack[top -1] - 'a'] = false;
            top--; // 弹出栈顶字符
        }

        // 将当前字符压入栈中
        stack[top++] = c;
        inStack[idx] = true;
        count[idx]--; // 当前字符已被处理
    }

    // 构建结果字符串
    stack[top] = '\0';
    // 复制结果到新的内存中
    char* result = (char*)malloc((top +1) * sizeof(char));
    strcpy(result, stack);
    free(stack);
    return result;
}

// 辅助函数用于打印字符串
void printString(char* s) {
    printf("\"%s\"\n", s);
}

// 测试主函数
int main(){
    // 示例 1
    char s1[] = "bcabc";
    char* res1 = removeDuplicateLetters(s1);
    printf("示例1输出: ");
    printString(res1);
    free(res1);

    // 示例 2
    char s2[] = "cbacdcbc";
    char* res2 = removeDuplicateLetters(s2);
    printf("示例2输出: ");
    printString(res2);
    free(res2);

    return 0;
}
```

**代码说明：**

1. **统计字符出现次数**：
   - 使用 `count` 数组记录每个字符在字符串中剩余的出现次数。

2. **使用字符数组模拟栈**：
   - `stack` 数组用于存储结果字符。
   - `top` 指针表示栈顶位置。

3. **遍历字符串**：
   - 对于每个字符 `c`，如果已经在栈中，跳过。
   - 否则，检查栈顶字符是否大于 `c` 且栈顶字符后面还会出现，如果满足条件，弹出栈顶字符，并标记为未在栈中。
   - 将当前字符 `c` 压入栈中，并更新相应的标记和计数。

4. **构建结果字符串**：
   - 将栈中的字符拼接成最终的结果字符串，并返回。

5. **测试主函数**：
   - 运行两个示例，验证函数的正确性。

**编译和运行：**

使用以下命令编译并运行代码：

```bash
gcc -o solution solution.c
./solution
```

**预期输出：**

```
示例1输出: "abc"
示例2输出: "acdb"
```

---

### C++ 解答

在C++中，可以利用 `std::vector` 和 `std::string` 轻松实现栈的功能，并使用 `std::unique` 和 `std::sort` 等STL算法来简化代码。以下是详细的实现：

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // 函数用于删除字符串中的重复字母，返回字典序最小的结果
    string removeDuplicateLetters(string s) {
        int n = s.size();
        int count[26] = {0};        // 记录每个字符的剩余次数
        bool inStackFlag[26] = {false}; // 记录字符是否已经在栈中
        string stackStr;             // 使用字符串模拟栈

        // 统计每个字符的出现次数
        for(char c : s) {
            count[c - 'a']++;
        }

        // 遍历字符串
        for(char c : s) {
            int idx = c - 'a';
            // 当前字符已经在栈中，跳过
            if(inStackFlag[idx]) {
                count[idx]--;
                continue;
            }

            // 如果当前字符小于栈顶字符，并且栈顶字符后面还会出现，则弹出栈顶字符
            while(!stackStr.empty() && c < stackStr.back() && count[stackStr.back() - 'a'] > 0) {
                inStackFlag[stackStr.back() - 'a'] = false;
                stackStr.pop_back();
            }

            // 将当前字符压入栈中
            stackStr += c;
            inStackFlag[idx] = true;
            count[idx]--; // 当前字符已被处理
        }

        return stackStr;
    }
};

// 辅助函数用于打印字符串
void printString(const string& s) {
    cout << "\"" << s << "\"\n";
}

// 测试主函数
int main(){
    Solution sol;

    // 示例 1
    string s1 = "bcabc";
    string res1 = sol.removeDuplicateLetters(s1);
    cout << "示例1输出: ";
    printString(res1);

    // 示例 2
    string s2 = "cbacdcbc";
    string res2 = sol.removeDuplicateLetters(s2);
    cout << "示例2输出: ";
    printString(res2);

    return 0;
}
```

**代码说明：**

1. **统计字符出现次数**：
   - 使用 `count` 数组记录每个字符在字符串中剩余的出现次数。

2. **使用字符串模拟栈**：
   - `stackStr` 字符串用于存储结果字符。
   - `inStackFlag` 数组记录每个字符是否已经在栈中，防止重复。

3. **遍历字符串**：
   - 对于每个字符 `c`，如果已经在栈中，跳过。
   - 否则，检查栈顶字符是否大于 `c` 且栈顶字符后面还会出现，如果满足条件，弹出栈顶字符，并标记为未在栈中。
   - 将当前字符 `c` 压入栈中，并更新相应的标记和计数。

4. **返回结果字符串**：
   - 最终，`stackStr` 字符串即为所需的结果。

5. **测试主函数**：
   - 运行两个示例，验证函数的正确性。

**编译和运行：**

使用以下命令编译并运行代码：

```bash
g++ -o solution solution.cpp
./solution
```

**预期输出：**

```
示例1输出: "abc"
示例2输出: "acdb"
```

---

### 总结

通过上述C和C++的实现，我们成功地在两种不同的编程语言中解决了“移除重复字母”问题。在C语言中，通过手动管理字符数组模拟栈的行为，结合数组标记和计数，实现了字典序最小的结果字符串。而在C++中，利用 `std::string` 直接模拟栈的功能，结合STL容器和算法，使代码更加简洁和高效。

**关键点回顾：**

- **单调栈**：维护一个单调递增的栈，确保结果字符串的字典序最小。
- **贪心策略**：每次尽可能移除栈顶较大的字符，以便放置更小的字符。
- **去重处理**：使用标记数组确保每个字符只出现在结果中一次。
- **字符计数**：记录每个字符在剩余字符串中的出现次数，辅助决定是否可以弹出栈顶字符。
- **内存管理（C语言）**：手动分配和释放内存，确保没有内存泄漏。
- **利用STL（C++）**：利用 `std::string` 和其他STL容器简化代码，实现更高的代码可读性和效率。

通过这些方法，我们能够高效地解决大规模数据下的字符处理问题，满足题目的时间和空间复杂度要求。在实际应用中，这种技术可以用于文本处理、编译器设计等领域。