---
layout: post
title:  "205. 同构字符串"
categories: arithmetic
---

[205. 同构字符串](https://leetcode.cn/problems/isomorphic-strings)

### 题目要求

**题目名称：** Isomorphic Strings (汉字：同构字符串)

**题目描述：**

给定两个字符串 `s` 和 `t`，判断它们是否是同构的。

如果 `s` 中的字符可以按某种方式替换得到 `t`，那么这两个字符串是同构的。

每个出现的字符都必须映射到另一个字符，且不允许有两个字符映射到同一个字符上，且字符的映射关系必须保持一致。

**示例1：**

```
输入: s = "egg", t = "add"
输出: true
```

**示例2：**

```
输入: s = "foo", t = "bar"
输出: false
```

**示例3：**

```
输入: s = "paper", t = "title"
输出: true
```

### 提示：
- 1 <= s.length <= 5 * 10^4
- t.length == s.length
- s 和 t 由大写英文字母、小写英文字母和数字组成

### 解题思路

同构字符串问题要求我们判断两个字符串的字符映射是否一一对应。为了检查两个字符串是否同构，主要需要考虑以下几个要点：
1. **一一映射**：如果字符 `s[i]` 被映射到 `t[i]`，那么 `s[i]` 和 `t[i]` 的映射关系在整个字符串中应当是唯一且一致的。也就是说，`s` 中的每个字符应该映射到 `t` 中的唯一字符，并且反之亦然。
   
2. **双向映射**：对于每个字符，我们需要确保：
   - `s[i]` 映射到 `t[i]`，且
   - `t[i]` 映射回 `s[i]`。
   
3. **使用哈希表（字典）**：通过哈希表（或者数组）来记录每个字符在 `s` 和 `t` 中的映射关系。具体的做法是：
   - 使用一个哈希表 `mapS` 来记录 `s` 中字符与 `t` 中字符的映射。
   - 使用一个哈希表 `mapT` 来记录 `t` 中字符与 `s` 中字符的映射。
   
4. **具体步骤**：
   - 遍历字符串 `s` 和 `t` 中的字符，检查每个字符的映射关系是否一致。如果出现不一致的映射，则返回 `false`。
   - 如果所有字符的映射关系一致，返回 `true`。

#### 时间复杂度：
- O(n)，其中 `n` 是字符串的长度。我们只需要遍历一次字符串并进行常数时间的哈希查找和更新操作。

#### 空间复杂度：
- O(n)，需要两个哈希表分别存储映射关系。

### C语言解答

```c
#include <stdio.h>
#include <string.h>
#include <stdbool.h>

// 哈希表大小
#define TABLE_SIZE 256

// 哈希表结构体
struct HashMap {
    int map[TABLE_SIZE];
};

// 初始化哈希表
void initHashMap(struct HashMap* map) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        map->map[i] = -1;  // 初始化为 -1，表示未映射
    }
}

// 判断是否是同构字符串
bool isIsomorphic(char* s, char* t) {
    // 如果字符串长度不相等，直接返回 false
    if (strlen(s) != strlen(t)) {
        return false;
    }

    struct HashMap mapS, mapT;
    initHashMap(&mapS);
    initHashMap(&mapT);

    for (int i = 0; s[i] != '\0'; i++) {
        int idxS = s[i];  // 字符 s[i] 的 ASCII 值作为哈希表索引
        int idxT = t[i];  // 字符 t[i] 的 ASCII 值作为哈希表索引
        
        // 如果 s[i] 尚未映射，进行映射
        if (mapS.map[idxS] == -1) {
            mapS.map[idxS] = t[i];
        } else if (mapS.map[idxS] != t[i]) {
            return false;  // 如果映射关系不一致，返回 false
        }

        // 如果 t[i] 尚未映射，进行映射
        if (mapT.map[idxT] == -1) {
            mapT.map[idxT] = s[i];
        } else if (mapT.map[idxT] != s[i]) {
            return false;  // 如果映射关系不一致，返回 false
        }
    }

    return true;
}

int main() {
    char s[] = "egg";
    char t[] = "add";

    if (isIsomorphic(s, t)) {
        printf("The strings are isomorphic.\n");
    } else {
        printf("The strings are not isomorphic.\n");
    }

    return 0;
}
```

### 代码解析：
1. **`initHashMap` 函数**：初始化哈希表，设置所有值为 -1，表示没有映射。
2. **`isIsomorphic` 函数**：遍历字符串 `s` 和 `t`，检查每个字符的映射关系是否一致。如果发现有不一致的映射关系，立即返回 `false`，否则返回 `true`。
3. **主函数**：调用 `isIsomorphic` 函数，判断字符串是否同构。

### C++ 解答

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

class Solution {
public:
    // 判断两个字符串是否是同构的
    bool isIsomorphic(string s, string t) {
        // 如果两个字符串的长度不一样，直接返回 false
        if (s.size() != t.size()) {
            return false;
        }

        // 使用 unordered_map 来记录字符的映射关系
        unordered_map<char, char> mapS, mapT;

        // 遍历字符串 s 和 t
        for (int i = 0; i < s.size(); i++) {
            // 如果 s[i] 和 t[i] 之前的映射关系不一致，返回 false
            if (mapS.find(s[i]) != mapS.end()) {
                if (mapS[s[i]] != t[i]) {
                    return false;
                }
            } else {
                mapS[s[i]] = t[i];
            }

            if (mapT.find(t[i]) != mapT.end()) {
                if (mapT[t[i]] != s[i]) {
                    return false;
                }
            } else {
                mapT[t[i]] = s[i];
            }
        }

        return true;
    }
};

int main() {
    Solution solution;
    
    string s = "egg";
    string t = "add";
    
    if (solution.isIsomorphic(s, t)) {
        cout << "The strings are isomorphic." << endl;
    } else {
        cout << "The strings are not isomorphic." << endl;
    }

    return 0;
}
```

### 代码解析：
1. **`isIsomorphic` 方法**：该方法利用 `unordered_map` 来存储字符串 `s` 和 `t` 的映射关系。通过检查每个字符的映射关系是否一致来判断是否为同构字符串。
2. **主函数**：创建 `Solution` 类对象 `solution`，调用 `isIsomorphic` 方法，判断并输出字符串是否同构。

### 总结

- **时间复杂度**：O(n)，其中 `n` 是字符串的长度。我们只需要遍历一次字符串进行哈希查找和更新操作。
- **空间复杂度**：O(n)，我们使用两个哈希表分别存储映射关系。