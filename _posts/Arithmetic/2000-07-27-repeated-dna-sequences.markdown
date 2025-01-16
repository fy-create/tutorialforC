---
layout: post
title:  "187. 重复的DNA序列"
categories: arithmetic
---

[187. 重复的DNA序列](https://leetcode.cn/problems/repeated-dna-sequences)

### 题目描述

所有 DNA 由一系列缩写为 `'A'`，`'C'`，`'G'` 和 `'T'` 的核苷酸组成，例如：`"ACGAATTCCG"`。在研究 DNA 时，识别 DNA 中的重复序列有时会对研究非常有帮助。

编写一个函数来找出所有目标子串，目标子串的长度为 10，且在 DNA 字符串 `s` 中出现超过一次。

**示例 1:**

```
输入: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
输出: ["AAAAACCCCC","CCCCCAAAAA"]
```

**示例 2:**

```
输入: s = "AAAAAAAAAAAAA"
输出: ["AAAAAAAAAA"]
```

**提示:**

- `0 <= s.length <= 10^5`
- `s[i]` 为 `'A'`、`'C'`、`'G'` 或 `'T'`

---

### 解题思路

1. **滑动窗口**：
   - 使用滑动窗口遍历字符串 `s`，每次取长度为 10 的子串。
   - 使用哈希表记录每个子串出现的次数。

2. **统计重复子串**：
   - 如果某个子串在哈希表中已经存在，则将其加入结果集。

3. **优化**：
   - 由于子串长度为 10，可以将子串转换为整数（通过位运算）以减少空间占用。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_RESULT_SIZE 10000

// 将字符映射为数字
int charToInt(char c) {
    switch (c) {
        case 'A': return 0;
        case 'C': return 1;
        case 'G': return 2;
        case 'T': return 3;
        default: return -1;
    }
}

// 主函数
char** findRepeatedDnaSequences(char* s, int* returnSize) {
    int len = strlen(s);
    if (len < 10) {
        *returnSize = 0;
        return NULL;
    }

    // 哈希表记录子串出现的次数
    int* seen = (int*)calloc(1 << 20, sizeof(int)); // 2^20 足够大
    char** result = (char**)malloc(MAX_RESULT_SIZE * sizeof(char*));
    *returnSize = 0;

    // 滑动窗口
    int mask = 0xFFFFF; // 20 位掩码，用于取低 20 位
    int hash = 0;
    for (int i = 0; i < 9; i++) {
        hash = (hash << 2) | charToInt(s[i]);
    }

    for (int i = 9; i < len; i++) {
        hash = ((hash << 2) | charToInt(s[i])) & mask;
        seen[hash]++;
        if (seen[hash] == 2) {
            // 复制子串到结果集
            result[*returnSize] = (char*)malloc(11 * sizeof(char));
            strncpy(result[*returnSize], s + i - 9, 10);
            result[*returnSize][10] = '\0';
            (*returnSize)++;
        }
    }

    free(seen);
    return result;
}

int main() {
    char s[] = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
    int returnSize;
    char** result = findRepeatedDnaSequences(s, &returnSize);

    printf("重复的子串:\n");
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
        free(result[i]);
    }
    free(result);

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        vector<string> result;
        if (s.length() < 10) return result;

        // 哈希表记录子串出现的次数
        unordered_map<string, int> seen;

        // 滑动窗口
        for (int i = 0; i <= s.length() - 10; i++) {
            string sub = s.substr(i, 10);
            seen[sub]++;
            if (seen[sub] == 2) {
                result.push_back(sub);
            }
        }

        return result;
    }
};

int main() {
    Solution solution;
    string s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
    vector<string> result = solution.findRepeatedDnaSequences(s);

    cout << "重复的子串:" << endl;
    for (const string& sub : result) {
        cout << sub << endl;
    }

    return 0;
}
```

---

### 测试用例

#### 输入 1
```
s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
```
#### 输出 1
```
["AAAAACCCCC","CCCCCAAAAA"]
```

#### 输入 2
```
s = "AAAAAAAAAAAAA"
```
#### 输出 2
```
["AAAAAAAAAA"]
```

#### 输入 3
```
s = "ACGTACGTACGT"
```
#### 输出 3
```
[]
```

---

### 复杂度分析

- **时间复杂度**：O(N)，其中 N 是字符串的长度。滑动窗口遍历字符串的时间复杂度为 O(N)。
- **空间复杂度**：O(N)，用于存储哈希表和结果集。

---

### 总结

通过滑动窗口和哈希表，我们可以高效地找到所有长度为 10 且出现超过一次的 DNA 子串。这种方法能够处理大规模数据，并确保结果的正确性。