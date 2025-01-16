---
layout: post
title:  "242. 有效的字母异位词"
categories: arithmetic
---

[242. 有效的字母异位词](https://leetcode.cn/problems/valid-anagram)

题目：**有效的字母异位词**  
来源：Leetcode

### 题目描述：
给定两个字符串 `s` 和 `t`，编写一个函数来判断 `t` 是否是 `s` 的字母异位词。

字母异位词是由重新排列 `s` 的字母组成，但不一定是连续的。**只考虑字母，忽略大小写**。

### 示例：

#### 示例 1：
```
输入: s = "anagram", t = "nagaram"
输出: true
```

#### 示例 2：
```
输入: s = "rat", t = "car"
输出: false
```

### 提示：
- `s` 和 `t` 的长度在 [1, 5 * 10^4] 之间。
- `s` 和 `t` 只包含小写字母。

### 解题思路：
本题要求判断两个字符串 `s` 和 `t` 是否是字母异位词。我们可以通过以下几种方式来判断：

1. **排序法**：
   - 对 `s` 和 `t` 分别排序。如果排序后的字符串相同，则说明它们是字母异位词。
   - 时间复杂度：排序的时间复杂度是 `O(n log n)`，其中 `n` 是字符串的长度。

2. **哈希表法**：
   - 通过计数字符串中的字符频率来判断是否是字母异位词。我们可以使用哈希表或数组来存储 `s` 和 `t` 中每个字符的出现次数。
   - 如果两个字符串的字符频率完全相同，则它们是字母异位词。
   - 时间复杂度：遍历字符串的时间复杂度是 `O(n)`，其中 `n` 是字符串的长度。使用哈希表时空间复杂度为 `O(1)`，因为字母的种类是有限的（只包含26个字母）。

3. **优化：使用固定大小的数组**：
   - 由于题目保证字符串仅包含小写字母，我们可以使用大小为26的数组来记录每个字符的频率。
   - 对于字符串 `s`，对每个字符出现的次数加1，对于字符串 `t`，对每个字符出现的次数减1。如果两个字符串是字母异位词，最后数组中的每个值应该都是0。

### C语言解答：

```c
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// 判断两个字符串是否是字母异位词
bool isAnagram(char* s, char* t) {
    // 如果两个字符串的长度不同，直接返回 false
    if (strlen(s) != strlen(t)) {
        return false;
    }

    // 创建一个大小为26的数组，用来统计每个字符的出现次数
    int charCount[26] = {0};

    // 遍历字符串 s 和 t，统计每个字符的出现次数
    for (int i = 0; s[i] != '\0'; i++) {
        charCount[s[i] - 'a']++;  // s 中字符出现次数 +1
        charCount[t[i] - 'a']--;  // t 中字符出现次数 -1
    }

    // 如果所有字符的计数都为0，说明它们是字母异位词
    for (int i = 0; i < 26; i++) {
        if (charCount[i] != 0) {
            return false;
        }
    }
    return true;
}

int main() {
    char s[] = "anagram";
    char t[] = "nagaram";

    if (isAnagram(s, t)) {
        printf("true\n");
    } else {
        printf("false\n");
    }

    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    // 判断两个字符串是否是字母异位词
    bool isAnagram(string s, string t) {
        // 如果两个字符串的长度不同，直接返回 false
        if (s.length() != t.length()) {
            return false;
        }

        // 创建一个大小为26的数组，用来统计每个字符的出现次数
        vector<int> charCount(26, 0);

        // 遍历字符串 s 和 t，统计每个字符的出现次数
        for (int i = 0; i < s.length(); i++) {
            charCount[s[i] - 'a']++;  // s 中字符出现次数 +1
            charCount[t[i] - 'a']--;  // t 中字符出现次数 -1
        }

        // 如果所有字符的计数都为0，说明它们是字母异位词
        for (int count : charCount) {
            if (count != 0) {
                return false;
            }
        }
        return true;
    }
};

int main() {
    Solution solution;
    string s = "anagram";
    string t = "nagaram";

    if (solution.isAnagram(s, t)) {
        cout << "true" << endl;
    } else {
        cout << "false" << endl;
    }

    return 0;
}
```

### 总结：
- **C语言解法**：使用一个大小为26的数组来记录每个字母出现的频率。对字符串 `s` 和 `t` 进行一次遍历，分别增加和减少对应字母的频率，最后判断数组中的所有元素是否都为0。
- **C++解法**：使用`vector<int>`来记录字符频率，基本思路与C语言解法相同。通过类`Solution`包装方法，并在`main`函数中调用。

两种解法的时间复杂度都是 `O(n)`，其中 `n` 是字符串的长度，空间复杂度为 `O(1)`（因为字母的种类是固定的，只有26个）。