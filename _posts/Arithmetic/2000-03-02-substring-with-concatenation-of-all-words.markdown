---
layout: post
title:  "30. 串联所有单词的子串"
categories: arithmetic
---

[30. 串联所有单词的子串](https://leetcode.cn/problems/substring-with-concatenation-of-all-words)

### 题目描述：
给定一个字符串 `s` 和一些长度相同的单词 `words`。找出 `s` 中恰好由 `words` 中所有单词串联形成的子串的起始位置。

注意子串要与 `words` 中的单词完全匹配，中间不能有其他字符，但不需要考虑 `words` 中单词串联的顺序。

**示例：**

**输入：** s = "barfoothefoobarman", words = ["foo","bar"]

**输出：** [0,9]

**输入：** s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

**输出：** []

### 解题思路：

1. **滑动窗口法**：
   - 每个单词长度相同，因此可以将 `words` 的总长度作为滑动窗口的大小。
   - 使用两个哈希表，一个存储 `words` 中每个单词的频率，另一个存储当前窗口中单词的频率。

2. **遍历字符串**：
   - 遍历字符串的每个起始点，并尝试匹配单词。
   - 如果窗口内的单词频率与 `words` 中的单词频率一致，则记录当前起始点。

3. **复杂度分析**：
   - 时间复杂度：O(n * m)，其中 n 是字符串长度，m 是 `words` 的总字符长度。
   - 空间复杂度：O(m)。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int* findSubstring(char* s, char** words, int wordsSize, int* returnSize) {
    int wordLen = strlen(words[0]); // 单个单词长度
    int totalLen = wordsSize * wordLen; // 所有单词的总长度
    int sLen = strlen(s);

    *returnSize = 0; // 初始化返回结果大小
    if (sLen < totalLen) return NULL; // 如果 s 长度小于总长度，直接返回 NULL

    int* result = (int*)malloc(sLen * sizeof(int)); // 结果数组
    char** tempWords = (char**)malloc(wordsSize * sizeof(char*)); // 临时存储单词

    for (int i = 0; i <= sLen - totalLen; i++) {
        memcpy(tempWords, words, wordsSize * sizeof(char*)); // 复制 words
        int matchCount = 0;
        for (int j = 0; j < wordsSize; j++) {
            char* substring = strndup(s + i + j * wordLen, wordLen); // 截取子串
            int found = 0;
            for (int k = 0; k < wordsSize; k++) {
                if (tempWords[k] && strcmp(tempWords[k], substring) == 0) {
                    tempWords[k] = NULL; // 标记已匹配
                    found = 1;
                    break;
                }
            }
            free(substring);
            if (!found) break; // 未找到匹配单词
            matchCount++;
        }
        if (matchCount == wordsSize) {
            result[*returnSize] = i; // 记录起始索引
            (*returnSize)++;
        }
    }

    free(tempWords);
    return result;
}

int main() {
    char* s = "barfoothefoobarman";
    char* words[] = {"foo", "bar"};
    int returnSize;
    int* result = findSubstring(s, words, 2, &returnSize);

    printf("起始索引: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");

    free(result);
    return 0;
}
```

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
        if (words.empty()) return result;

        int wordLen = words[0].size(); // 单词长度
        int totalLen = wordLen * words.size(); // 总长度
        if (s.size() < totalLen) return result;

        unordered_map<string, int> wordCount;
        for (const string& word : words) {
            wordCount[word]++;
        }

        for (int i = 0; i <= s.size() - totalLen; i++) {
            unordered_map<string, int> seen;
            int j = 0;
            for (; j < words.size(); j++) {
                string word = s.substr(i + j * wordLen, wordLen);
                if (wordCount.find(word) == wordCount.end()) break;
                seen[word]++;
                if (seen[word] > wordCount[word]) break;
            }
            if (j == words.size()) result.push_back(i);
        }

        return result;
    }
};

int main() {
    string s = "barfoothefoobarman";
    vector<string> words = {"foo", "bar"};

    Solution sol;
    vector<int> result = sol.findSubstring(s, words);

    cout << "起始索引: ";
    for (int idx : result) {
        cout << idx << " ";
    }
    cout << endl;

    return 0;
}
```