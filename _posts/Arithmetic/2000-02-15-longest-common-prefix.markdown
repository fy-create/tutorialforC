---
layout: post
title:  "14. 最长公共前缀"
categories: arithmetic
---

[14. 最长公共前缀](https://leetcode.cn/problems/longest-common-prefix)

### 题目：最长公共前缀 (Longest Common Prefix)

#### 题目要求：
编写一个函数来查找字符串数组中的最长公共前缀。  

如果不存在公共前缀，返回空字符串 `""`。

**示例 1:**
```
输入: strs = ["flower","flow","flight"]
输出: "fl"
```

**示例 2:**
```
输入: strs = ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

**提示：**
- `0 <= strs.length <= 200`
- `0 <= strs[i].length <= 200`
- `strs[i]` 仅由小写英文字母组成

---

### 解题思路：

1. **观察问题**：
   - 问题本质上是要找出一个字符串数组中，所有字符串共同的前缀。
   - 一种简单直观的方法是：通过将第一个字符串作为基准，逐个与其他字符串进行比较。如果出现不匹配的地方，就截断该前缀。

2. **步骤**：
   - 假设第一个字符串是公共前缀的起始点。
   - 依次与后面的字符串进行比较，更新公共前缀：
     - 对比当前公共前缀和下一个字符串的公共部分。
     - 如果发现不匹配的地方，截断当前公共前缀。
   - 继续与下一个字符串进行比较，直到所有字符串都遍历完成。

3. **时间复杂度**：
   - 假设字符串数组中有 `n` 个字符串，每个字符串的长度最大为 `m`。
   - 比较每一对字符串的最长公共前缀需要 `O(m)` 时间。
   - 因此，整体的时间复杂度为 `O(n * m)`。

#### C 语言解法：

```c
#include <stdio.h>
#include <string.h>

// 函数：查找字符串数组的最长公共前缀
char* longestCommonPrefix(char** strs, int strsSize) {
    if (strsSize == 0) {
        return "";  // 如果数组为空，返回空字符串
    }

    // 以第一个字符串为初始公共前缀
    char* prefix = strs[0];
    
    // 遍历剩余的字符串，更新公共前缀
    for (int i = 1; i < strsSize; i++) {
        // 比较当前字符串与前缀，更新前缀
        int j = 0;
        while (prefix[j] && strs[i][j] && prefix[j] == strs[i][j]) {
            j++;
        }
        prefix[j] = '\0';  // 截断前缀，保留公共部分
        if (prefix[0] == '\0') {
            return "";  // 如果没有公共前缀，直接返回空字符串
        }
    }
    return prefix;
}

int main() {
    char* strs[] = {"flower", "flow", "flight"};
    int strsSize = sizeof(strs) / sizeof(strs[0]);
    char* result = longestCommonPrefix(strs, strsSize);
    printf("Longest Common Prefix: %s\n", result);  // 输出 "fl"
    return 0;
}
```

#### C++ 解法：

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) {
            return "";  // 如果数组为空，返回空字符串
        }

        string prefix = strs[0];  // 以第一个字符串为初始公共前缀

        // 遍历剩余的字符串，更新公共前缀
        for (int i = 1; i < strs.size(); i++) {
            int j = 0;
            // 找到当前前缀和当前字符串的最大公共前缀
            while (j < prefix.size() && j < strs[i].size() && prefix[j] == strs[i][j]) {
                j++;
            }
            prefix = prefix.substr(0, j);  // 截断前缀，保留公共部分
            if (prefix.empty()) {
                return "";  // 如果没有公共前缀，直接返回空字符串
            }
        }
        return prefix;
    }
};

int main() {
    Solution solution;
    vector<string> strs = {"flower", "flow", "flight"};
    string result = solution.longestCommonPrefix(strs);
    cout << "Longest Common Prefix: " << result << endl;  // 输出 "fl"
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 使用 `prefix` 保存当前的公共前缀。
   - 每次与后续字符串进行比较，查找公共前缀部分。
   - 使用 `while` 循环遍历字符，并通过 `prefix[j] = '\0'` 来截断不匹配部分。
   - 如果没有公共前缀，则返回空字符串 `""`。

2. **C++ 实现**：
   - 使用 `string` 类型存储公共前缀 `prefix`。
   - 利用 `substr` 函数截断公共前缀。
   - 如果任何一次比较发现公共前缀为空，则返回空字符串。
   
3. **边界条件处理**：
   - 如果字符串数组为空，直接返回空字符串。
   - 如果在某次比较中没有公共前缀，则直接返回空字符串。

#### 核心算法：
- **逐个比较法**：从第一个字符串开始作为前缀，与后面的每个字符串逐个对比，更新前缀，直到遍历完所有字符串为止。
