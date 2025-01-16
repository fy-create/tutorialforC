---
layout: post
title:  "290. 单词规律"
categories: arithmetic
---

[290. 单词规律](https://leetcode.cn/problems/word-pattern)

### 题目描述

给定一种规律 `pattern` 和一个字符串 `s`，判断 `s` 是否遵循相同的规律。

这里的 **遵循** 意味着完全匹配，例如，`pattern` 中的每个字母和字符串 `s` 中的每个非空单词之间存在着双向连接的对应关系。

**注意：**
- 你可以假设 `pattern` 只包含小写字母。
- `s` 由小写字母和空格组成。
- `s` 不包含任何前导或尾随空格。
- `s` 中的所有单词都用单个空格分隔。

**示例 1:**

```
输入: pattern = "abba", s = "dog cat cat dog"
输出: true
解释: 
- 'a' -> "dog"
- 'b' -> "cat"
- 'b' -> "cat"
- 'a' -> "dog"
```

**示例 2:**

```
输入: pattern = "abba", s = "dog cat cat fish"
输出: false
解释: 
- 'a' -> "dog"
- 'b' -> "cat"
- 'b' -> "cat"
- 'a' -> "fish"（不匹配）
```

**示例 3:**

```
输入: pattern = "aaaa", s = "dog cat cat dog"
输出: false
解释: 
- 'a' -> "dog"
- 'a' -> "cat"（不匹配）
```

**提示：**
- `1 <= pattern.length <= 300`
- `1 <= s.length <= 3000`
- `pattern` 只包含小写字母。
- `s` 由小写字母和空格组成。
- `s` 不包含任何前导或尾随空格。
- `s` 中的所有单词都用单个空格分隔。

---

### 解题思路

这是一个典型的字符串匹配问题。我们需要将 `pattern` 中的每个字符与 `s` 中的每个单词建立双向映射关系。

1. **双向映射：**
   - 使用两个哈希表（或字典）来分别记录 `pattern` 到 `s` 的映射和 `s` 到 `pattern` 的映射。
   - 如果发现冲突（即一个字符映射到多个单词，或一个单词映射到多个字符），则返回 `false`。

2. **分割字符串：**
   - 将字符串 `s` 按空格分割成单词列表。

3. **长度检查：**
   - 如果 `pattern` 的长度与单词列表的长度不相等，则直接返回 `false`。

4. **遍历匹配：**
   - 遍历 `pattern` 和单词列表，检查双向映射是否一致。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_WORD_LEN 100

// 辅助函数：分割字符串为单词列表
int splitString(char* s, char words[][MAX_WORD_LEN]) {
    int count = 0;
    char* token = strtok(s, " ");
    while (token != NULL) {
        strcpy(words[count], token);
        count++;
        token = strtok(NULL, " ");
    }
    return count;
}

// 主函数：判断字符串是否遵循规律
bool wordPattern(char* pattern, char* s) {
    char words[300][MAX_WORD_LEN];
    int wordCount = splitString(s, words);

    if (strlen(pattern) != wordCount) {
        return false;
    }

    char patternToWord[26][MAX_WORD_LEN] = {0};
    char wordToPattern[300][2] = {0};

    for (int i = 0; i < wordCount; i++) {
        char p = pattern[i];
        char* word = words[i];

        // 检查 pattern 到 word 的映射
        if (patternToWord[p - 'a'][0] != '\0') {
            if (strcmp(patternToWord[p - 'a'], word) != 0) {
                return false;
            }
        } else {
            strcpy(patternToWord[p - 'a'], word);
        }

        // 检查 word 到 pattern 的映射
        if (wordToPattern[i][0] != '\0') {
            if (wordToPattern[i][0] != p) {
                return false;
            }
        } else {
            wordToPattern[i][0] = p;
        }
    }

    return true;
}

// 测试代码
int main() {
    char pattern[] = "abba";
    char s[] = "dog cat cat dog";

    bool result = wordPattern(pattern, s);
    printf("是否遵循规律: %s\n", result ? "true" : "false");

    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <unordered_map>
#include <sstream>
#include <vector>
using namespace std;

class Solution {
public:
    bool wordPattern(string pattern, string s) {
        unordered_map<char, string> patternToWord;
        unordered_map<string, char> wordToPattern;

        vector<string> words;
        stringstream ss(s);
        string word;
        while (ss >> word) {
            words.push_back(word);
        }

        if (pattern.size() != words.size()) {
            return false;
        }

        for (int i = 0; i < pattern.size(); i++) {
            char p = pattern[i];
            string w = words[i];

            // 检查 pattern 到 word 的映射
            if (patternToWord.find(p) != patternToWord.end()) {
                if (patternToWord[p] != w) {
                    return false;
                }
            } else {
                patternToWord[p] = w;
            }

            // 检查 word 到 pattern 的映射
            if (wordToPattern.find(w) != wordToPattern.end()) {
                if (wordToPattern[w] != p) {
                    return false;
                }
            } else {
                wordToPattern[w] = p;
            }
        }

        return true;
    }
};

// 测试代码
int main() {
    Solution solution;
    string pattern = "abba";
    string s = "dog cat cat dog";

    bool result = solution.wordPattern(pattern, s);
    cout << "是否遵循规律: " << (result ? "true" : "false") << endl;

    return 0;
}
```

---

### 代码说明

1. **C 语言实现：**
   - 使用二维数组 `patternToWord` 和 `wordToPattern` 记录双向映射。
   - 使用 `strtok` 分割字符串 `s` 为单词列表。
   - 时间复杂度为 O(n)，空间复杂度为 O(n)。

2. **C++ 实现：**
   - 使用 STL 容器 `unordered_map` 记录双向映射。
   - 使用 `stringstream` 分割字符串 `s` 为单词列表。
   - 代码简洁高效，符合 C++ 编程风格。

3. **测试代码：**
   - 调用函数并输出结果，验证算法的正确性。

---

通过以上实现，可以高效地判断字符串 `s` 是否遵循给定的规律 `pattern`。