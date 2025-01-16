---
layout: post
title:  "214. 最短回文串"
categories: arithmetic
---

[214. 最短回文串](https://leetcode.cn/problems/shortest-palindrome)

### 题目描述

给定一个字符串 `s`，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。

**示例 1：**

```
输入：s = "aacecaaa"
输出："aaacecaaa"
```

**示例 2：**

```
输入：s = "abcd"
输出："dcbabcd"
```

**提示：**

- `0 <= s.length <= 5 * 10^4`
- `s` 仅由小写英文字母组成

---

### 解题思路

这个问题可以通过 **KMP 算法** 的预处理步骤来解决。具体思路如下：

1. **问题转化**：
   - 我们需要找到字符串 `s` 的最长前缀回文子串。
   - 假设这个最长前缀回文子串的长度为 `l`，那么我们只需要在 `s` 的前面添加 `s` 的后 `n - l` 个字符的逆序即可。

2. **KMP 算法**：
   - 构造一个新字符串 `new_s = s + "#" + reverse(s)`。
   - 使用 KMP 算法计算 `new_s` 的最长前缀后缀匹配长度 `l`。
   - `l` 即为 `s` 的最长前缀回文子串的长度。

3. **构造结果**：
   - 将 `s` 的后 `n - l` 个字符逆序后添加到 `s` 的前面，得到最短回文串。

---

### C语言解答

```c
#include <stdlib.h>
#include <string.h>

// 计算 KMP 的 next 数组
void computeLPSArray(char* pat, int M, int* lps) {
    int len = 0; // 最长前缀后缀匹配长度
    lps[0] = 0;  // lps[0] 总是 0
    int i = 1;

    while (i < M) {
        if (pat[i] == pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}

// 主函数
char* shortestPalindrome(char* s) {
    int n = strlen(s);
    if (n == 0) return strdup("");

    // 构造新字符串 new_s = s + "#" + reverse(s)
    char* rev_s = (char*)malloc(n + 1);
    for (int i = 0; i < n; i++) {
        rev_s[i] = s[n - 1 - i];
    }
    rev_s[n] = '\0';

    char* new_s = (char*)malloc(2 * n + 2);
    sprintf(new_s, "%s#%s", s, rev_s);

    // 计算 new_s 的 LPS 数组
    int* lps = (int*)malloc((2 * n + 1) * sizeof(int));
    computeLPSArray(new_s, 2 * n + 1, lps);

    // 最长前缀回文子串的长度
    int l = lps[2 * n];

    // 构造结果
    char* result = (char*)malloc(n + (n - l) + 1);
    int index = 0;
    for (int i = n - 1; i >= l; i--) {
        result[index++] = s[i];
    }
    for (int i = 0; i < n; i++) {
        result[index++] = s[i];
    }
    result[index] = '\0';

    // 释放内存
    free(rev_s);
    free(new_s);
    free(lps);

    return result;
}

// 简单main函数调用
int main() {
    char* s = "aacecaaa";
    char* result = shortestPalindrome(s);
    printf("%s\n", result); // 输出 "aaacecaaa"
    free(result);

    s = "abcd";
    result = shortestPalindrome(s);
    printf("%s\n", result); // 输出 "dcbabcd"
    free(result);

    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string shortestPalindrome(string s) {
        int n = s.length();
        if (n == 0) return "";

        // 构造新字符串 new_s = s + "#" + reverse(s)
        string rev_s = s;
        reverse(rev_s.begin(), rev_s.end());
        string new_s = s + "#" + rev_s;

        // 计算 new_s 的 LPS 数组
        vector<int> lps(new_s.length(), 0);
        computeLPSArray(new_s, lps);

        // 最长前缀回文子串的长度
        int l = lps.back();

        // 构造结果
        string result = rev_s.substr(0, n - l) + s;
        return result;
    }

private:
    // 计算 KMP 的 next 数组
    void computeLPSArray(const string& pat, vector<int>& lps) {
        int len = 0; // 最长前缀后缀匹配长度
        lps[0] = 0;  // lps[0] 总是 0
        int i = 1;

        while (i < pat.length()) {
            if (pat[i] == pat[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    string s = "aacecaaa";
    cout << solution.shortestPalindrome(s) << endl; // 输出 "aaacecaaa"

    s = "abcd";
    cout << solution.shortestPalindrome(s) << endl; // 输出 "dcbabcd"

    return 0;
}
```

---

### 代码解释

#### C语言
1. **KMP 算法**：
   - 使用 `computeLPSArray` 函数计算 `new_s` 的最长前缀后缀匹配数组 `lps`。
   - `lps` 数组用于找到 `s` 的最长前缀回文子串的长度。

2. **构造结果**：
   - 将 `s` 的后 `n - l` 个字符逆序后添加到 `s` 的前面，得到最短回文串。

3. **内存管理**：
   - 使用 `malloc` 动态分配内存，并在程序结束时释放内存。

#### C++
1. **KMP 算法**：
   - 使用 `computeLPSArray` 函数计算 `new_s` 的最长前缀后缀匹配数组 `lps`。
   - `lps` 数组用于找到 `s` 的最长前缀回文子串的长度。

2. **构造结果**：
   - 使用 `substr` 和 `+` 操作符构造结果字符串。

3. **STL 容器**：
   - 使用 `vector` 存储 `lps` 数组，简化内存管理。

---

### 测试用例验证

#### 输入
```cpp
s = "aacecaaa"
```

#### 输出
```plaintext
"aaacecaaa"
```

#### 解释
- 最长前缀回文子串为 `aacecaa`，长度为 7。
- 需要在前面添加 `a`，得到最短回文串 `aaacecaaa`。

#### 输入
```cpp
s = "abcd"
```

#### 输出
```plaintext
"dcbabcd"
```

#### 解释
- 最长前缀回文子串为空，长度为 0。
- 需要在前面添加 `dcba`，得到最短回文串 `dcbabcd`。

---

### 总结

通过 KMP 算法的预处理步骤，我们可以高效地找到字符串的最长前缀回文子串，并构造出最短的回文串。C语言和C++的实现都清晰地展示了这一过程，代码具有较高的可读性和健壮性。