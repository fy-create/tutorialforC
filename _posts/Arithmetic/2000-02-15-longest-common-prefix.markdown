---
layout: post
title:  "14. 最长公共前缀"
categories: arithmetic
---

[14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix)

**题目描述：**

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 `""`。

**示例 1：**

```
输入：strs = ["flower","flow","flight"]
输出："fl"
```

**示例 2：**

```
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
```

**提示：**

- `1 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` 仅由小写英文字母组成

**C语言解答：**

```c
#include <stdio.h>
#include <string.h>

// 查找字符串数组中的最长公共前缀
char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) return "";

    // 遍历第一个字符串的每个字符
    for (int i = 0; i < strlen(strs[0]); i++) {
        char c = strs[0][i];
        // 检查其他字符串在相同位置的字符
        for (int j = 1; j < strsSize; j++) {
            // 如果超出当前字符串长度或字符不匹配
            if (i == strlen(strs[j]) || strs[j][i] != c) {
                // 在当前位置截断并返回
                strs[0][i] = '\0';
                return strs[0];
            }
        }
    }
    return strs[0];
}

// 测试函数
int main() {
    char* strs[] = {"flower", "flow", "flight"};
    int strsSize = sizeof(strs) / sizeof(strs[0]);
    char* result = longestCommonPrefix(strs, strsSize);
    printf("最长公共前缀: %s\n", result);
    return 0;
}
```

**代码解析：**

1. **遍历第一个字符串的每个字符：**
   - 逐个字符检查是否在所有字符串的相同位置匹配。

2. **检查其他字符串的对应字符：**
   - 如果某字符串在当前位置已结束或字符不匹配，则在此位置截断第一个字符串并返回。

3. **返回结果：**
   - 如果遍历完第一个字符串所有字符都匹配，则返回第一个字符串。

**C++解答：**

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 查找字符串数组中的最长公共前缀
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";

        // 遍历第一个字符串的每个字符
        for (int i = 0; i < strs[0].size(); i++) {
            char c = strs[0][i];
            // 检查其他字符串在相同位置的字符
            for (int j = 1; j < strs.size(); j++) {
                // 如果超出当前字符串长度或字符不匹配
                if (i == strs[j].size() || strs[j][i] != c) {
                    // 返回当前索引之前的子串
                    return strs[0].substr(0, i);
                }
            }
        }
        return strs[0];
    }
};

// 测试函数
int main() {
    Solution solution;
    vector<string> strs = {"flower", "flow", "flight"};
    string result = solution.longestCommonPrefix(strs);
    cout << "最长公共前缀: " << result << endl;
    return 0;
}
```

**代码解析：**

1. **遍历第一个字符串的每个字符：**
   - 使用 `strs[0].size()` 获取第一个字符串的长度，逐个字符检查。

2. **检查其他字符串的对应字符：**
   - 使用 `strs.size()` 获取字符串数组的大小，遍历每个字符串。
   - 如果当前索引等于某字符串的长度或字符不匹配，则返回第一个字符串从开始到当前索引的子串。

3. **返回结果：**
   - 如果遍历完第一个字符串所有字符都匹配，则返回第一个字符串。

**示例运行：**

```
输入：["flower", "flow", "flight"]
输出："fl"
```

**时间复杂度和空间复杂度：**

- **时间复杂度：**O(m * n)，其中 m 是字符串数组中的字符串的平均长度，n 是字符串的数量。最坏情况下，需要比较每个字符串的每个字符。

- **空间复杂度：**O(1)，不需要额外的空间。

