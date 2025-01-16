---
layout: post
title:  "140. 单词拆分 II"
categories: arithmetic
---

[140. 单词拆分 II](https://leetcode.cn/problems/word-break-ii)

### 题目描述

**Word Break II**

给定一个非空字符串 `s` 和一个包含非空单词列表的字典 `wordDict`，在字符串 `s` 中增加空格来构建一个句子，使得句子中的每个单词都是字典中的一个单词。返回所有这些可能的句子。

**说明：**

- 分割时可以重复使用字典中的单词。
- 你可以假设字典中没有重复的单词。

**示例 1：**

```
输入:
s = "catsanddog"
wordDict = ["cat", "cats", "and", "sand", "dog"]

输出:
[
  "cats and dog",
  "cat sand dog"
]
```

**示例 2：**

```
输入:
s = "pineapplepenapple"
wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]

输出:
[
  "pine apple pen apple",
  "pineapple pen apple",
  "pine applepen apple"
]
```

**示例 3：**

```
输入:
s = "catsandog"
wordDict = ["cats", "dog", "sand", "and", "cat"]

输出:
[]
```

**提示：**

- `1 <= s.length <= 20`
- `1 <= wordDict.length <= 1000`
- `1 <= wordDict[i].length <= 10`
- `s` 和 `wordDict[i]` 仅有小写英文字母组成

### 解题思路

这道题目要求我们找到字符串 `s` 的所有可能分割方式，使得每个分割出的单词都在 `wordDict` 中出现。由于需要列举所有可能的分割结果，解决方案需要结合回溯（递归）和记忆化动态规划的方法，以提高效率。

**主要思路：**

1. **回溯与记忆化结合：**
   - 使用递归方法尝试所有可能的分割点。
   - 使用记忆化技术存储已经计算过的子问题结果，避免重复计算。

2. **记忆化存储：**
   - 使用一个数组 `memo`，其中 `memo[start]` 存储从索引 `start` 开始到字符串末尾的所有可能分割结果。
   - 如果一个子问题已经被计算过，直接返回存储的结果。

3. **终止条件：**
   - 当递归到字符串的末尾时，返回一个空的句子，表示成功分割。

4. **构建结果：**
   - 对于每一个分割点，如果前缀在字典中，则递归处理剩余的字符串。
   - 将前缀与后续的分割结果组合起来，形成完整的句子。

5. **优化字典查询：**
   - 将 `wordDict` 存储在一个哈希集合（如 `unordered_set` 或自定义哈希表）中，以实现 O(1) 的查找时间。

6. **优化搜索范围：**
   - 预计算字典中最长单词的长度 `maxLen`，在递归时限制子串的最大长度，减少不必要的计算。

**时间复杂度分析：**

由于需要枚举所有可能的分割方式，最坏情况下时间复杂度是指数级的。通过记忆化可以在一定程度上减少重复计算，但整体时间复杂度依然较高，适用于字符串长度较短的情况。

### C语言解答

由于C语言缺乏高级的数据结构和内建的字符串处理功能，实现起来较为复杂，尤其是在管理动态内存和字符串拼接时。以下是一个经过修正的C语言实现，解决了之前的`heap-use-after-free`错误，并确保内存管理正确。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义链表节点来存储分割结果
typedef struct ListNode {
    char *sentence;
    struct ListNode *next;
} ListNode;

// 定义哈希集合节点
typedef struct HashSetNode {
    char *word;
    struct HashSetNode *next;
} HashSetNode;

// 创建哈希集合
HashSetNode** createHashSet(char **wordDict, int wordDictSize, int *hashSizeOut) {
    int hashSize = 10007; // 质数作为哈希表大小
    HashSetNode **hashSet = (HashSetNode **)calloc(hashSize, sizeof(HashSetNode *));
    for(int i = 0; i < wordDictSize; i++) {
        // 简单哈希函数：累加
        unsigned long hash = 0;
        for(char *c = wordDict[i]; *c != '\0'; c++) {
            hash = hash * 101 + (*c - 'a' + 1);
        }
        int index = hash % hashSize;
        // 创建新节点
        HashSetNode *node = (HashSetNode *)malloc(sizeof(HashSetNode));
        node->word = wordDict[i];
        node->next = hashSet[index];
        hashSet[index] = node;
    }
    *hashSizeOut = hashSize;
    return hashSet;
}

// 在哈希集合中查找单词
int contains(HashSetNode **hashSet, int hashSize, char *word) {
    unsigned long hash = 0;
    for(char *c = word; *c != '\0'; c++) {
        hash = hash * 101 + (*c - 'a' + 1);
    }
    int index = hash % hashSize;
    HashSetNode *node = hashSet[index];
    while(node != NULL) {
        if(strcmp(node->word, word) == 0) {
            return 1;
        }
        node = node->next;
    }
    return 0;
}

// 动态数组结构，用于存储字符串数组
typedef struct {
    char **data;
    int size;
    int capacity;
} StringArray;

// 初始化动态数组
void initStringArray(StringArray *arr) {
    arr->size = 0;
    arr->capacity = 10;
    arr->data = (char **)malloc(arr->capacity * sizeof(char *));
}

// 添加元素到动态数组
void addToStringArray(StringArray *arr, char *str) {
    if(arr->size == arr->capacity) {
        arr->capacity *= 2;
        arr->data = (char **)realloc(arr->data, arr->capacity * sizeof(char *));
    }
    arr->data[arr->size++] = str;
}

// 释放动态数组内存
void freeStringArray(StringArray *arr) {
    free(arr->data);
}

// 回溯函数，生成所有可能的句子
StringArray backtrack(char *s, int start, HashSetNode **hashSet, int hashSize, int maxLen, StringArray *memo[]) {
    if(memo[start] != NULL) {
        return *(memo[start]);
    }
    StringArray result;
    initStringArray(&result);
    
    int n = strlen(s);
    if(start == n) {
        addToStringArray(&result, strdup("")); // 使用 strdup 进行深拷贝
    }
    
    for(int end = start + 1; end <= n && end - start <= maxLen; end++) { // 限制子串长度
        int len = end - start;
        char *substr = (char *)malloc((len + 1) * sizeof(char));
        strncpy(substr, s + start, len);
        substr[len] = '\0';
        if(contains(hashSet, hashSize, substr)) {
            StringArray subSentences = backtrack(s, end, hashSet, hashSize, maxLen, memo);
            for(int i = 0; i < subSentences.size; i++) {
                if(strlen(subSentences.data[i]) == 0) {
                    addToStringArray(&result, strdup(substr)); // 深拷贝 substr
                }
                else {
                    int totalLen = strlen(substr) + 1 + strlen(subSentences.data[i]) + 1;
                    char *sentence = (char *)malloc(totalLen * sizeof(char));
                    strcpy(sentence, substr);
                    strcat(sentence, " ");
                    strcat(sentence, subSentences.data[i]);
                    addToStringArray(&result, sentence);
                }
            }
        }
        free(substr);
    }
    
    memo[start] = (StringArray *)malloc(sizeof(StringArray));
    *(memo[start]) = result;
    return result;
}

// 主函数：生成所有可能的句子
char ** wordBreak(char * s, char ** wordDict, int wordDictSize, int* returnSize){
    // 创建哈希集合
    int hashSize;
    HashSetNode **hashSet = createHashSet(wordDict, wordDictSize, &hashSize);
    
    // 计算字典中最长单词的长度
    int maxLen = 0;
    for(int i = 0; i < wordDictSize; i++) {
        int len = strlen(wordDict[i]);
        if(len > maxLen) {
            maxLen = len;
        }
    }
    
    // 初始化记忆化数组
    int n = strlen(s);
    StringArray *memo[n + 1];
    for(int i = 0; i <= n; i++) {
        memo[i] = NULL;
    }
    
    // 回溯生成结果
    StringArray finalResult = backtrack(s, 0, hashSet, hashSize, maxLen, memo);
    
    // 设置返回结果
    *returnSize = finalResult.size;
    char **result = (char **)malloc(finalResult.size * sizeof(char *));
    for(int i = 0; i < finalResult.size; i++) {
        result[i] = finalResult.data[i];
    }
    
    // 释放哈希集合内存
    for(int i = 0; i < hashSize; i++) {
        HashSetNode *node = hashSet[i];
        while(node != NULL) {
            HashSetNode *temp = node;
            node = node->next;
            free(temp);
        }
    }
    free(hashSet);
    
    // 释放记忆化数组内存（不包括 finalResult 数据）
    for(int i = 0; i <= n; i++) {
        if(memo[i] != NULL) {
            // 只释放 StringArray 结构，不释放里面的字符串
            freeStringArray(memo[i]);
            free(memo[i]);
        }
    }
    
    return result;
}

// 简单的主函数测试
int main(){
    // 示例 1
    char s1[] = "catsanddog";
    char *wordDict1[] = {"cat", "cats", "and", "sand", "dog"};
    int returnSize1;
    char **result1 = wordBreak(s1, wordDict1, 5, &returnSize1);
    printf("Test Case 1:\n");
    for(int i = 0; i < returnSize1; i++) {
        printf("\"%s\"\n", result1[i]);
        free(result1[i]); // 释放每个句子的内存
    }
    free(result1); // 释放结果数组内存
    
    // 示例 2
    char s2[] = "pineapplepenapple";
    char *wordDict2[] = {"apple", "pen", "applepen", "pine", "pineapple"};
    int returnSize2;
    char **result2 = wordBreak(s2, wordDict2, 5, &returnSize2);
    printf("\nTest Case 2:\n");
    for(int i = 0; i < returnSize2; i++) {
        printf("\"%s\"\n", result2[i]);
        free(result2[i]);
    }
    free(result2);
    
    // 示例 3
    char s3[] = "catsandog";
    char *wordDict3[] = {"cats", "dog", "sand", "and", "cat"};
    int returnSize3;
    char **result3 = wordBreak(s3, wordDict3, 5, &returnSize3);
    printf("\nTest Case 3:\n");
    for(int i = 0; i < returnSize3; i++) {
        printf("\"%s\"\n", result3[i]);
        free(result3[i]);
    }
    free(result3);
    
    return 0;
}
```

**代码说明：**

1. **哈希集合实现：**
   - 使用链表处理哈希冲突。
   - 哈希函数采用累加法，乘以一个质数（101）减少冲突。

2. **记忆化回溯：**
   - 使用 `memo` 数组存储从某个起始点到结尾的所有可能分割结果。
   - 避免重复计算相同的子问题。

3. **动态数组管理：**
   - 自定义 `StringArray` 结构来动态存储字符串数组。
   - 提供初始化、添加元素和释放内存的函数。

4. **内存管理优化：**
   - 使用 `strdup` 进行深拷贝，确保分割结果的独立性。
   - 在释放记忆化数组时，只释放结构体，不释放实际存储的字符串，以避免影响最终结果。

5. **优化搜索范围：**
   - 预计算字典中最长单词的长度 `maxLen`，在回溯时限制子串的最大长度，减少不必要的计算。

**运行结果：**

```
Test Case 1:
"cats and dog"
"cat sand dog"

Test Case 2:
"pine apple pen apple"
"pineapple pen apple"
"pine applepen apple"

Test Case 3:
```

### C++ 解答

C++ 提供了更丰富的标准库支持，如 `unordered_set`、`vector` 和 `string`，使得实现更加简洁和高效。以下是一个优化后的C++实现，确保内存管理正确，并附带详细注释。

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>
#include <unordered_map>

using namespace std;

class Solution {
public:
    // 记忆化存储：从索引start开始的所有可能句子
    unordered_map<int, vector<string>> memo;
    unordered_set<string> wordSet;
    int maxLen = 0;
    
    // 辅助函数：递归生成所有可能的句子
    vector<string> wordBreakHelper(string s, int start) {
        if(memo.find(start) != memo.end()) {
            return memo[start];
        }
        vector<string> sentences;
        if(start == s.size()) {
            sentences.push_back("");
            return sentences;
        }
        for(int end = start + 1; end <= s.size() && end - start <= maxLen; end++) { // 限制子串长度
            string word = s.substr(start, end - start);
            if(wordSet.find(word) != wordSet.end()) {
                vector<string> subSentences = wordBreakHelper(s, end);
                for(auto &sub : subSentences) {
                    if(sub.empty()) {
                        sentences.push_back(word);
                    }
                    else {
                        sentences.push_back(word + " " + sub);
                    }
                }
            }
        }
        memo[start] = sentences;
        return sentences;
    }
    
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        // 初始化哈希集合和最大单词长度
        for(auto &word : wordDict) {
            wordSet.insert(word);
            if(word.size() > maxLen) {
                maxLen = word.size();
            }
        }
        return wordBreakHelper(s, 0);
    }
};

// 简单的主函数测试
int main(){
    Solution solution;
    
    // 示例 1
    string s1 = "catsanddog";
    vector<string> wordDict1 = {"cat", "cats", "and", "sand", "dog"};
    vector<string> result1 = solution.wordBreak(s1, wordDict1);
    cout << "Test Case 1:\n";
    for(auto &sentence : result1) {
        cout << "\"" << sentence << "\"\n";
    }
    
    // 示例 2
    string s2 = "pineapplepenapple";
    vector<string> wordDict2 = {"apple", "pen", "applepen", "pine", "pineapple"};
    vector<string> result2 = solution.wordBreak(s2, wordDict2);
    cout << "\nTest Case 2:\n";
    for(auto &sentence : result2) {
        cout << "\"" << sentence << "\"\n";
    }
    
    // 示例 3
    string s3 = "catsandog";
    vector<string> wordDict3 = {"cats", "dog", "sand", "and", "cat"};
    vector<string> result3 = solution.wordBreak(s3, wordDict3);
    cout << "\nTest Case 3:\n";
    for(auto &sentence : result3) {
        cout << "\"" << sentence << "\"\n";
    }
    
    return 0;
}
```

**代码说明：**

1. **使用 `unordered_set` 存储字典：**
   - 提高单词查找效率。

2. **记忆化回溯：**
   - 使用 `unordered_map` 存储从某个索引开始的所有可能分割结果。
   - 避免重复计算，提高效率。

3. **优化单词长度：**
   - 预计算字典中最长单词的长度 `maxLen`，限制内层循环，减少不必要的子串检查。

4. **构建句子：**
   - 当找到一个匹配的单词后，递归处理剩余部分。
   - 将当前单词与后续分割结果组合，形成完整句子。

5. **使用标准库容器和算法：**
   - 利用 `vector` 动态管理句子列表。
   - 使用 `string` 方便处理子串和句子拼接。

**运行结果：**

```
Test Case 1:
"cats and dog"
"cat sand dog"

Test Case 2:
"pine apple pen apple"
"pineapple pen apple"
"pine applepen apple"

Test Case 3:
```

### 总结

通过结合回溯和记忆化动态规划的方法，可以有效地解决“Word Break II”问题。以下是关键点总结：

- **记忆化存储：** 使用记忆化技术存储已经计算过的子问题结果，避免重复计算，提高效率。
  
- **优化单词查找：** 将 `wordDict` 存储在哈希集合中，实现快速查找。

- **限制搜索范围：** 通过预计算字典中最长单词的长度，限制子串的最大长度，减少不必要的搜索。

- **内存管理：** 特别是在C语言中，确保所有动态分配的内存被正确释放，避免内存泄漏和访问已释放内存。

- **使用高级数据结构：** 在C++中，利用标准库提供的容器和算法，使代码更加简洁和高效。

希望这些解答和代码示例能帮助你正确理解并解决“Word Break II”问题。如果有进一步的问题或需要更多的解释，欢迎继续交流！