---
layout: post
title:  "49. 字母异位词分组"
categories: arithmetic
---

[49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams)

## Group Anagrams

**题目描述：**

给定一个字符串数组 `strs` ，将字母异位词组合在一起。可以按任意顺序返回结果列表。字母异位词是由相同字母重排列形成的字符串（包括相同的字符串）。

**示例：**

1. 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
   输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

2. 输入: strs = [""]
   输出: [[""]]

3. 输入: strs = ["a"]
   输出: [["a"]]

**提示：**

- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- strs[i] 仅包含小写字母

## 解题思路：

1. 使用哈希表进行分组：
   - 对每个字符串进行排序，将排序后的字符串作为键，原字符串作为值存储在哈希表中。
   - 最终将哈希表中的值（即字母异位词的组合）输出即可。

## C 语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 辅助函数，用于比较两个字符串
int cmp(const void* a, const void* b) {
    return *(char*)a - *(char*)b;
}

// 计算哈希表的键
char* getKey(char* str) {
    int len = strlen(str);
    char* key = (char*)malloc((len + 1) * sizeof(char));
    strcpy(key, str);
    qsort(key, len, sizeof(char), cmp); // 对字符串进行排序
    return key;
}

// 旋转矩阵函数
char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {
    // 初始化哈希表
    int hashSize = 100;
    char*** hash = (char***)malloc(hashSize * sizeof(char**));
    int* hashCount = (int*)malloc(hashSize * sizeof(int));
    memset(hashCount, 0, hashSize * sizeof(int));

    // 辅助数据结构存储返回结果
    char*** result = (char***)malloc(strsSize * sizeof(char**));
    *returnColumnSizes = (int*)malloc(strsSize * sizeof(int));
    *returnSize = 0;

    // 处理每个字符串
    for (int i = 0; i < strsSize; i++) {
        char* key = getKey(strs[i]);
        int index = 0;
        for (; index < *returnSize; index++) {
            if (strcmp(key, hash[index][0]) == 0) break;
        }
        if (index == *returnSize) {
            hash[*returnSize] = (char**)malloc(2 * sizeof(char*));
            hash[*returnSize][0] = key;
            hash[*returnSize][1] = strs[i];
            hashCount[*returnSize] = 2;
            result[*returnSize] = (char**)malloc(strsSize * sizeof(char*));
            result[*returnSize][0] = strs[i];
            (*returnColumnSizes)[*returnSize] = 1;
            (*returnSize)++;
        } else {
            hash[index] = (char**)realloc(hash[index], (hashCount[index] + 1) * sizeof(char*));
            hash[index][hashCount[index]++] = strs[i];
            result[index][(*returnColumnSizes)[index]++] = strs[i];
            free(key);
        }
    }

    free(hash);
    free(hashCount);
    return result;
}

void printResult(char*** result, int returnSize, int* returnColumnSizes) {
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%s ", result[i][j]);
        }
        printf("\n");
    }
}

int main() {
    char* strs[] = {"eat", "tea", "tan", "ate", "nat", "bat"};
    int returnSize;
    int* returnColumnSizes;
    char*** result = groupAnagrams(strs, 6, &returnSize, &returnColumnSizes);
    printResult(result, returnSize, returnColumnSizes);
    for (int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);
    return 0;
}
```

**代码解析：**

1. 使用哈希表存储排序后的字符串及其对应的原字符串。
2. 对输入字符串数组中的每个字符串进行排序，生成哈希键。
3. 将相同键的字符串存储在同一个哈希表位置中，并将结果存储在 `result` 中。

## C++ 语言解答：

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
        unordered_map<string, vector<string>> hashMap;
        for (string& str : strs) {
            string key = str;
            sort(key.begin(), key.end()); // 对字符串进行排序
            hashMap[key].push_back(str);  // 将排序后的字符串作为键，原字符串作为值存储在哈希表中
        }
        vector<vector<string>> result;
        for (auto& entry : hashMap) {
            result.push_back(entry.second); // 将哈希表中的值输出
        }
        return result;
    }
};

void printResult(const vector<vector<string>>& result) {
    for (const auto& group : result) {
        for (const string& str : group) {
            cout << str << " ";
        }
        cout << endl;
    }
}

int main() {
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    Solution sol;
    vector<vector<string>> result = sol.groupAnagrams(strs);
    printResult(result);
    return 0;
}
```

**代码解析：**

1. 使用 `unordered_map` 存储排序后的字符串及其对应的原字符串。
2. 对输入字符串数组中的每个字符串进行排序，生成哈希键。
3. 将相同键的字符串存储在同一个哈希表位置中，并将结果存储在 `result` 中。
4. `printResult` 函数用于打印结果。