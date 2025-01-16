---
layout: post
title:  "30. 串联所有单词的子串"
categories: arithmetic
---

[30. 串联所有单词的子串](https://leetcode.cn/problems/substring-with-concatenation-of-all-words)

### 题目描述

给定一个字符串 `s` 和一个字符串数组 `words`，其中所有单词长度相同。找出并返回 `s` 中所有子串的起始位置，这些子串是 `words` 中所有单词的串联，且每个单词恰好出现一次，没有任何间隔。

返回结果按升序排列。

#### 示例：

**示例 1：**
```
输入：s = "barfoothefoobarman", words = ["foo","bar"]
输出：[0,9]
解释：
从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
它们是 words 的串联。
```

**示例 2：**
```
输入：s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]
输出：[]
```

**示例 3：**
```
输入：s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]
输出：[6,9,12]
```

#### 提示：
- `1 <= s.length <= 10⁴`
- `s` 由小写英文字母组成
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 30`
- `words[i]` 由小写英文字母组成

---

### 解题思路

1. **单词长度和总长度计算**：
   - 单词的长度是固定的，用 `word_len` 表示。
   - `words` 中所有单词的串联总长度为 `total_len = word_len * words.size()`。

2. **滑动窗口法**：
   - 遍历字符串 `s`，从索引 `i = 0` 到 `s.length - total_len` 的位置开始尝试匹配。
   - 使用一个哈希表统计 `words` 中每个单词的出现次数。
   - 在每次检查中，分段提取 `total_len` 长度的子串，按单词长度分割并统计这些单词出现的次数。

3. **匹配检查**：
   - 如果提取的子串中单词出现次数与 `words` 的统计完全一致，则记录起始索引。

4. **返回结果**：
   - 将所有匹配的起始索引按升序返回。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 哈希表节点
typedef struct HashNode {
    char *key;
    int count;
    struct HashNode *next;
} HashNode;

// 哈希表
typedef struct {
    HashNode **buckets;
    int size;
} HashMap;

// 创建哈希表
HashMap* createHashMap(int size) {
    HashMap *map = (HashMap *)malloc(sizeof(HashMap));
    map->buckets = (HashNode **)calloc(size, sizeof(HashNode *));
    map->size = size;
    return map;
}

// 哈希函数
unsigned int hashFunction(const char *key, int size) {
    unsigned int hash = 0;
    while (*key) hash = (hash * 31 + *key++) % size;
    return hash;
}

// 插入或更新哈希表
void put(HashMap *map, const char *key, int value) {
    unsigned int index = hashFunction(key, map->size);
    HashNode *node = map->buckets[index];
    while (node) {
        if (strcmp(node->key, key) == 0) {
            node->count = value;
            return;
        }
        node = node->next;
    }
    node = (HashNode *)malloc(sizeof(HashNode));
    node->key = strdup(key);
    node->count = value;
    node->next = map->buckets[index];
    map->buckets[index] = node;
}

// 获取哈希表值
int get(HashMap *map, const char *key) {
    unsigned int index = hashFunction(key, map->size);
    HashNode *node = map->buckets[index];
    while (node) {
        if (strcmp(node->key, key) == 0) return node->count;
        node = node->next;
    }
    return 0;
}

// 释放哈希表
void freeHashMap(HashMap *map) {
    for (int i = 0; i < map->size; i++) {
        HashNode *node = map->buckets[i];
        while (node) {
            HashNode *temp = node;
            node = node->next;
            free(temp->key);
            free(temp);
        }
    }
    free(map->buckets);
    free(map);
}

// 主函数：查找所有起始索引
int* findSubstring(char *s, char **words, int wordsSize, int *returnSize) {
    int word_len = strlen(words[0]);
    int total_len = word_len * wordsSize;
    int s_len = strlen(s);
    int *result = (int *)malloc(s_len * sizeof(int));
    *returnSize = 0;

    HashMap *word_map = createHashMap(wordsSize * 2);
    for (int i = 0; i < wordsSize; i++) {
        put(word_map, words[i], get(word_map, words[i]) + 1);
    }

    for (int i = 0; i <= s_len - total_len; i++) {
        HashMap *seen = createHashMap(wordsSize * 2);
        int j = 0;
        while (j < wordsSize) {
            char *sub = strndup(s + i + j * word_len, word_len);
            put(seen, sub, get(seen, sub) + 1);
            if (get(seen, sub) > get(word_map, sub)) {
                free(sub);
                break;
            }
            free(sub);
            j++;
        }
        if (j == wordsSize) result[(*returnSize)++] = i;
        freeHashMap(seen);
    }

    freeHashMap(word_map);
    return result;
}

// 测试函数
int main() {
    char *s = "barfoothefoobarman";
    char *words[] = {"foo", "bar"};
    int returnSize;
    int *result = findSubstring(s, words, 2, &returnSize);
    for (int i = 0; i < returnSize; i++) printf("%d ", result[i]);
    free(result);
    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <string>

using namespace std;

class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> result;
        int word_len = words[0].size();
        int total_len = word_len * words.size();
        unordered_map<string, int> word_count;

        for (const string& word : words) word_count[word]++;

        for (int i = 0; i <= (int)s.size() - total_len; i++) {
            unordered_map<string, int> seen;
            int j = 0;
            while (j < words.size()) {
                string word = s.substr(i + j * word_len, word_len);
                if (word_count.find(word) != word_count.end()) {
                    seen[word]++;
                    if (seen[word] > word_count[word]) break;
                } else break;
                j++;
            }
            if (j == words.size()) result.push_back(i);
        }
        return result;
    }
};

// 测试函数
int main() {
    Solution solution;
    string s = "barfoothefoobarman";
    vector<string> words = {"foo", "bar"};
    vector<int> result = solution.findSubstring(s, words);

    for (int index : result) {
        cout << index << " ";
    }
    return 0;
}
```