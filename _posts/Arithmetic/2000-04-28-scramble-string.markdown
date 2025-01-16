---
layout: post
title:  "87. 扰乱字符串"
categories: arithmetic
---

[87. 扰乱字符串](https://leetcode.cn/problems/scramble-string)

### 题目描述

给定两个长度相同的字符串 `s1` 和 `s2`，判断 `s2` 是否是 `s1` 的扰乱字符串。

**扰乱字符串** 的定义如下：

- 如果两个字符串相同，则它们互为扰乱字符串。
- 如果可以将一个字符串分割成两个非空的子字符串，并且通过交换这两个子字符串的位置，可以得到另一个字符串，则这两个字符串互为扰乱字符串。
- 递归地应用上述定义。

**示例 1：**

```
输入：s1 = "great", s2 = "rgeat"
输出：true
解释：s1 可以被分割成 "gr" 和 "eat"，然后交换这两个子字符串的位置，得到 "rgeat"，即 s2。
```

**示例 2：**

```
输入：s1 = "abcde", s2 = "caebd"
输出：false
```

**提示：**

- `s1.length == s2.length`
- `1 <= s1.length <= 30`
- `s1` 和 `s2` 由小写英文字母组成

### 解题思路

判断两个字符串是否为扰乱字符串，可以使用递归的方法。具体步骤如下：

1. **基本情况判断：**
   - 如果两个字符串相等，则它们互为扰乱字符串。
   - 如果两个字符串的字符集不同（即字符出现的次数不同），则它们不可能是扰乱字符串。

2. **递归分割：**
   - 尝试在不同的位置分割字符串，将 `s1` 分割成两部分，并相应地分割 `s2`。
   - 对于每一种分割方式，有两种可能：
     - 不交换子字符串：即 `s1` 的前部分与 `s2` 的前部分互为扰乱字符串，且 `s1` 的后部分与 `s2` 的后部分互为扰乱字符串。
     - 交换子字符串：即 `s1` 的前部分与 `s2` 的后部分互为扰乱字符串，且 `s1` 的后部分与 `s2` 的前部分互为扰乱字符串。
   - 如果任何一种分割方式满足上述条件，则 `s1` 和 `s2` 互为扰乱字符串。

3. **优化（剪枝）：**
   - 在递归过程中，首先检查当前分割点是否可能导致有效的扰乱字符串，从而避免不必要的递归调用。
   - 使用记忆化存储（如哈希表）来记录已经计算过的字符串对，避免重复计算。

这种方法的时间复杂度较高，最坏情况下为 `O(N^4)`，其中 `N` 是字符串的长度，但由于字符串长度限制在 30 内，因此在实际应用中是可行的。

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// 辅助函数：检查两个字符串是否包含相同的字符及其次数
bool isSame(char* s1, char* s2, int len) {
    int count[26] = {0};
    for(int i = 0; i < len; i++) {
        count[s1[i] - 'a']++;
        count[s2[i] - 'a']--;
    }
    for(int i = 0; i < 26; i++) {
        if(count[i] != 0)
            return false;
    }
    return true;
}

// 递归函数：判断s2是否是s1的扰乱字符串
bool isScrambleRecursive(char* s1, char* s2, int len) {
    // 如果字符串相等，则直接返回true
    if(strncmp(s1, s2, len) == 0)
        return true;
    
    // 如果字符集不同，则不可能是扰乱字符串
    if(!isSame(s1, s2, len))
        return false;
    
    // 尝试不同的分割点
    for(int i = 1; i < len; i++) {
        // 情况一：不交换子字符串
        bool condition1 = isScrambleRecursive(s1, s2, i) && isScrambleRecursive(s1 + i, s2 + i, len - i);
        // 情况二：交换子字符串
        bool condition2 = isScrambleRecursive(s1, s2 + len - i, i) && isScrambleRecursive(s1 + i, s2, len - i);
        
        if(condition1 || condition2)
            return true;
    }
    
    return false;
}

// 函数原型：判断s2是否是s1的扰乱字符串
bool isScramble(char* s1, char* s2){
    if(strlen(s1) != strlen(s2))
        return false;
    return isScrambleRecursive(s1, s2, strlen(s1));
}

// 简单的主函数调用示例
int main() {
    char s1_1[] = "great";
    char s2_1[] = "rgeat";
    
    char s1_2[] = "abcde";
    char s2_2[] = "caebd";
    
    char s1_3[] = "a";
    char s2_3[] = "a";
    
    printf("s1 = \"%s\", s2 = \"%s\" 是否为扰乱字符串：%s\n", s1_1, s2_1, isScramble(s1_1, s2_1) ? "true" : "false");
    printf("s1 = \"%s\", s2 = \"%s\" 是否为扰乱字符串：%s\n", s1_2, s2_2, isScramble(s1_2, s2_2) ? "true" : "false");
    printf("s1 = \"%s\", s2 = \"%s\" 是否为扰乱字符串：%s\n", s1_3, s2_3, isScramble(s1_3, s2_3) ? "true" : "false");
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

using namespace std;

class Solution {
public:
    // 使用记忆化存储已计算的字符串对
    unordered_map<string, bool> memo;
    
    // 辅助函数：检查两个字符串是否包含相同的字符及其次数
    bool isSame(const string& s1, const string& s2, int len) {
        int count[26] = {0};
        for(int i = 0; i < len; i++) {
            count[s1[i] - 'a']++;
            count[s2[i] - 'a']--;
        }
        for(int i = 0; i < 26; i++) {
            if(count[i] != 0)
                return false;
        }
        return true;
    }
    
    // 递归函数：判断s2是否是s1的扰乱字符串
    bool isScrambleRecursive(const string& s1, const string& s2, int len) {
        // 基本情况
        if(s1.substr(0, len) == s2.substr(0, len))
            return true;
        
        // 检查字符集
        if(!isSame(s1, s2, len))
            return false;
        
        // 构造键用于记忆化
        string key = s1.substr(0, len) + "#" + s2.substr(0, len);
        if(memo.find(key) != memo.end())
            return memo[key];
        
        // 尝试不同的分割点
        for(int i = 1; i < len; i++) {
            // 情况一：不交换子字符串
            bool condition1 = isScrambleRecursive(s1, s2, i) && isScrambleRecursive(s1.substr(i, len - i), s2.substr(i, len - i), len - i);
            // 情况二：交换子字符串
            bool condition2 = isScrambleRecursive(s1, s2.substr(len - i, i), i) && isScrambleRecursive(s1.substr(i, len - i), s2, len - i);
            
            if(condition1 || condition2){
                memo[key] = true;
                return true;
            }
        }
        
        memo[key] = false;
        return false;
    }
    
    // 函数原型：判断s2是否是s1的扰乱字符串
    bool isScramble(string s1, string s2) {
        if(s1.length() != s2.length())
            return false;
        return isScrambleRecursive(s1, s2, s1.length());
    }
};

// 简单的主函数调用示例
int main() {
    Solution solution;
    
    string s1_1 = "great";
    string s2_1 = "rgeat";
    
    string s1_2 = "abcde";
    string s2_2 = "caebd";
    
    string s1_3 = "a";
    string s2_3 = "a";
    
    cout << "s1 = \"" << s1_1 << "\", s2 = \"" << s2_1 << "\" 是否为扰乱字符串：" << (solution.isScramble(s1_1, s2_1) ? "true" : "false") << endl;
    cout << "s1 = \"" << s1_2 << "\", s2 = \"" << s2_2 << "\" 是否为扰乱字符串：" << (solution.isScramble(s1_2, s2_2) ? "true" : "false") << endl;
    cout << "s1 = \"" << s1_3 << "\", s2 = \"" << s2_3 << "\" 是否为扰乱字符串：" << (solution.isScramble(s1_3, s2_3) ? "true" : "false") << endl;
    
    return 0;
}
```