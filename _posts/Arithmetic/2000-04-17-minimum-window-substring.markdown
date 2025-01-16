---
layout: post
title:  "76. 最小覆盖子串"
categories: arithmetic
---

[76. 最小覆盖子串](https://leetcode.cn/problems/minimum-window-substring)

### 题目要求：

给你一个字符串 `s` 和一个字符串 `t`，返回 `s` 中包含 `t` 所有字符的最小子串。如果 `s` 中不存在这样的子串，返回空字符串 `""`。

#### 示例：

**示例 1**：
```
输入：
s = "ADOBECODEBANC", t = "ABC"
输出：
"BANC"
```

**示例 2**：
```
输入：
s = "AA", t = "AA"
输出：
"AA"
```

#### 提示：
- `m == s.length`
- `n == t.length`
- `1 <= m, n <= 10^5`
- `s` 和 `t` 由英文字母组成

### 解题思路：

本题的核心是寻找包含所有字符的最小子串。可以使用 **滑动窗口** 技巧来优化搜索过程。

#### 步骤：
1. **维护一个窗口**：用两个指针（`left` 和 `right`）表示窗口的左右边界，初始时，`left` 和 `right` 都指向字符串的开始。
   
2. **窗口扩展**：首先扩展窗口右边界（即移动 `right` 指针）直到窗口包含了 `t` 中所有字符。

3. **窗口收缩**：当窗口包含了 `t` 中的所有字符时，尝试收缩窗口的左边界（即移动 `left` 指针），并记录当前窗口的长度和位置。如果收缩后的窗口仍然包含所有字符，则继续收缩，直到不再包含所有字符。

4. **记录最小窗口**：每次找到一个有效窗口（即包含所有字符的窗口），更新最小窗口的起始位置和长度。

5. **退出条件**：当 `right` 指针到达字符串末尾，或者无法再找到有效窗口时，结束搜索。

#### 时间和空间复杂度：
- **时间复杂度**：O(m + n)，其中 `m` 和 `n` 分别是字符串 `s` 和 `t` 的长度。每个指针最多向前移动一次。
- **空间复杂度**：O(n)，需要存储 `t` 中字符的频率，以及当前窗口中的字符频率。

### C语言实现：

```c
#include <stdio.h>
#include <string.h>
#include <limits.h>

#define MAX_CHAR 128

// 判断窗口是否包含所有t的字符
int contains_all(int* window, int* target) {
    for (int i = 0; i < MAX_CHAR; i++) {
        if (window[i] < target[i]) {
            return 0;
        }
    }
    return 1;
}

char* minWindow(char* s, char* t) {
    int s_len = strlen(s);
    int t_len = strlen(t);

    if (s_len == 0 || t_len == 0) return "";

    int target[MAX_CHAR] = {0}; // t中字符的频率
    int window[MAX_CHAR] = {0}; // 当前窗口中的字符频率

    // 记录t中字符的频率
    for (int i = 0; i < t_len; i++) {
        target[t[i]]++;
    }

    int left = 0, right = 0, min_len = INT_MAX, start = 0;

    while (right < s_len) {
        // 扩展窗口
        window[s[right]]++;
        
        // 如果当前窗口包含了t的所有字符
        while (contains_all(window, target)) {
            // 更新最小窗口
            if (right - left + 1 < min_len) {
                min_len = right - left + 1;
                start = left;
            }
            // 收缩窗口
            window[s[left]]--;
            left++;
        }

        right++;
    }

    // 如果没有找到合适的窗口，返回空字符串
    if (min_len == INT_MAX) {
        return "";
    }

    // 返回最小窗口子串
    char* result = (char*)malloc((min_len + 1) * sizeof(char));
    strncpy(result, s + start, min_len);
    result[min_len] = '\0';
    return result;
}

int main() {
    char s[] = "ADOBECODEBANC";
    char t[] = "ABC";

    char* result = minWindow(s, t);
    printf("Minimum window substring: %s\n", result);
    free(result);

    return 0;
}
```

### C++实现：

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <climits>
using namespace std;

class Solution {
public:
    string minWindow(string s, string t) {
        int m = s.size(), n = t.size();
        
        if (m == 0 || n == 0) return "";
        
        // 记录 t 中字符的频率
        vector<int> target(128, 0), window(128, 0);
        for (char c : t) {
            target[c]++;
        }
        
        int left = 0, right = 0, min_len = INT_MAX, start = 0;
        
        // 扩展窗口
        while (right < m) {
            window[s[right]]++;
            
            // 收缩窗口，直到包含所有t中的字符
            while (containsAll(window, target)) {
                if (right - left + 1 < min_len) {
                    min_len = right - left + 1;
                    start = left;
                }
                window[s[left]]--;
                left++;
            }
            
            right++;
        }
        
        return min_len == INT_MAX ? "" : s.substr(start, min_len);
    }
    
private:
    bool containsAll(vector<int>& window, vector<int>& target) {
        for (int i = 0; i < 128; i++) {
            if (window[i] < target[i]) {
                return false;
            }
        }
        return true;
    }
};

int main() {
    Solution solution;
    
    string s = "ADOBECODEBANC";
    string t = "ABC";
    
    string result = solution.minWindow(s, t);
    cout << "Minimum window substring: " << result << endl;
    
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **字符频率数组**：我们使用两个数组 `target` 和 `window`，分别记录 `t` 中字符的频率以及当前窗口中字符的频率。
2. **扩展和收缩窗口**：通过移动右指针扩展窗口，直到窗口包含了 `t` 的所有字符；然后，尝试收缩窗口，更新最小窗口长度。
3. **判断窗口是否包含所有字符**：通过 `contains_all` 函数检查当前窗口是否包含 `t` 中所有字符。

#### C++实现：
1. **字符频率数组**：同样使用 `vector<int>` 来记录 `t` 中字符的频率和当前窗口中字符的频率。
2. **滑动窗口**：通过移动右指针扩展窗口，找到包含所有字符的子串，然后使用左指针尝试收缩窗口，更新最小窗口。
3. **包含检查**：`containsAll` 函数判断当前窗口是否包含 `t` 中的所有字符。

### 时间和空间复杂度：
- **时间复杂度**：O(m + n)，其中 `m` 和 `n` 分别是字符串 `s` 和 `t` 的长度。我们遍历一次 `s` 和 `t`，每个字符最多被访问两次。
- **空间复杂度**：O(1)，我们使用固定大小的字符频率数组，最大为 128。

### 示例输出：
```
Minimum window substring: BANC
```