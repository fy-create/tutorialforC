---
layout: post
title:  "49. 字母异位词分组"
categories: arithmetic
---

[49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams)

### 题目描述

给你一个字符串数组，请你将 **字母异位词** 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的所有字母得到的一个新单词。

**示例 1:**

```
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

**示例 2:**

```
输入: strs = [""]
输出: [[""]]
```

**示例 3:**

```
输入: strs = ["a"]
输出: [["a"]]
```

**提示:**

- `1 <= strs.length <= 10^4`
- `0 <= strs[i].length <= 100`
- `strs[i]` 仅包含小写字母

---

### 解题思路

1. **字母异位词的特征**：
   - 字母异位词经过排序后，得到的字符串是相同的。
   - 例如，`"eat"` 和 `"tea"` 排序后都是 `"aet"`。

2. **哈希表分组**：
   - 使用哈希表（字典）来存储分组结果，键为排序后的字符串，值为原始字符串列表。
   - 遍历字符串数组，对每个字符串进行排序，将其作为键存入哈希表，并将原始字符串添加到对应的值列表中。

3. **实现步骤**：
   - 遍历字符串数组，对每个字符串进行排序。
   - 将排序后的字符串作为键，原始字符串作为值，存入哈希表。
   - 最后将哈希表中的值转换为结果列表。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义最大字符串长度和最大字符串数量
#define MAX_STR_LEN 101
#define MAX_STR_NUM 10000

// 比较函数，用于排序
int compare(const void* a, const void* b) {
    return (*(char*)a - *(char*)b);
}

// 哈希表节点
typedef struct {
    char key[MAX_STR_LEN];
    char** values;
    int count;
    int capacity;
} HashNode;

// 哈希表
typedef struct {
    HashNode* nodes;
    int size;
    int capacity;
} HashMap;

// 初始化哈希表
void initHashMap(HashMap* map, int capacity) {
    map->nodes = (HashNode*)malloc(capacity * sizeof(HashNode));
    map->size = 0;
    map->capacity = capacity;
    for (int i = 0; i < capacity; i++) {
        map->nodes[i].key[0] = '\0';
        map->nodes[i].values = NULL;
        map->nodes[i].count = 0;
        map->nodes[i].capacity = 0;
    }
}

// 释放哈希表内存
void freeHashMap(HashMap* map) {
    for (int i = 0; i < map->size; i++) {
        free(map->nodes[i].values);
    }
    free(map->nodes);
}

// 插入哈希表
void insertHashMap(HashMap* map, char* key, char* value) {
    for (int i = 0; i < map->size; i++) {
        if (strcmp(map->nodes[i].key, key) == 0) {
            // 键已存在，添加到值列表
            if (map->nodes[i].count >= map->nodes[i].capacity) {
                map->nodes[i].capacity = map->nodes[i].capacity == 0 ? 1 : map->nodes[i].capacity * 2;
                map->nodes[i].values = (char**)realloc(map->nodes[i].values, map->nodes[i].capacity * sizeof(char*));
            }
            map->nodes[i].values[map->nodes[i].count++] = value;
            return;
        }
    }
    // 键不存在，创建新节点
    if (map->size >= map->capacity) {
        map->capacity = map->capacity == 0 ? 1 : map->capacity * 2;
        map->nodes = (HashNode*)realloc(map->nodes, map->capacity * sizeof(HashNode));
    }
    strcpy(map->nodes[map->size].key, key);
    map->nodes[map->size].values = (char**)malloc(sizeof(char*));
    map->nodes[map->size].values[0] = value;
    map->nodes[map->size].count = 1;
    map->nodes[map->size].capacity = 1;
    map->size++;
}

// 主函数
char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {
    HashMap map;
    initHashMap(&map, strsSize);

    // 遍历字符串数组
    for (int i = 0; i < strsSize; i++) {
        char sortedStr[MAX_STR_LEN];
        strcpy(sortedStr, strs[i]);
        qsort(sortedStr, strlen(sortedStr), sizeof(char), compare);
        insertHashMap(&map, sortedStr, strs[i]);
    }

    // 构建结果
    *returnSize = map.size;
    char*** result = (char***)malloc(map.size * sizeof(char**));
    *returnColumnSizes = (int*)malloc(map.size * sizeof(int));

    for (int i = 0; i < map.size; i++) {
        (*returnColumnSizes)[i] = map.nodes[i].count;
        result[i] = (char**)malloc(map.nodes[i].count * sizeof(char*));
        for (int j = 0; j < map.nodes[i].count; j++) {
            result[i][j] = map.nodes[i].values[j];
        }
    }

    // 释放哈希表内存
    freeHashMap(&map);
    return result;
}

int main() {
    char* strs[] = {"eat", "tea", "tan", "ate", "nat", "bat"};
    int strsSize = 6;
    int returnSize;
    int* returnColumnSizes;
    char*** result = groupAnagrams(strs, strsSize, &returnSize, &returnColumnSizes);

    printf("分组结果:\n");
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%s ", result[i][j]);
        }
        printf("\n");
    }

    // 释放内存
    for (int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);

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
#include <algorithm>
using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;

        // 遍历字符串数组
        for (const string& str : strs) {
            string sortedStr = str;
            sort(sortedStr.begin(), sortedStr.end());
            map[sortedStr].push_back(str);
        }

        // 构建结果
        vector<vector<string>> result;
        for (const auto& pair : map) {
            result.push_back(pair.second);
        }

        return result;
    }
};

int main() {
    Solution solution;
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    vector<vector<string>> result = solution.groupAnagrams(strs);

    cout << "分组结果:" << endl;
    for (const auto& group : result) {
        for (const string& str : group) {
            cout << str << " ";
        }
        cout << endl;
    }

    return 0;
}
```

---

### 测试用例

#### 输入 1
```
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```
#### 输出 1
```
[
  ["bat"],
  ["nat","tan"],
  ["ate","eat","tea"]
]
```

#### 输入 2
```
strs = [""]
```
#### 输出 2
```
[
  [""]
]
```

#### 输入 3
```
strs = ["a"]
```
#### 输出 3
```
[
  ["a"]
]
```

---

### 复杂度分析

- **时间复杂度**：O(n * k log k)，其中 n 是字符串数组的长度，k 是字符串的最大长度。排序每个字符串的时间复杂度为 O(k log k)。
- **空间复杂度**：O(n * k)，用于存储哈希表和结果。

---

### 总结

通过排序字符串并使用哈希表分组，我们可以高效地将字母异位词分组。这种方法利用了字母异位词排序后相同的特性，能够有效解决问题。