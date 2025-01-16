---
layout: post
title:  "211. 添加与搜索单词 - 数据结构设计"
categories: arithmetic
---

[211. 添加与搜索单词 - 数据结构设计](https://leetcode.cn/problems/design-add-and-search-words-data-structure)

### 题目描述

请你设计一个数据结构，支持以下两种操作：

1. **添加单词**：将单词添加到数据结构中。
2. **搜索单词**：检查数据结构中是否存在某个单词。如果单词中包含点号 `.`，则点号可以匹配任何字母。

**示例：**

```plaintext
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // 返回 false
wordDictionary.search("bad"); // 返回 true
wordDictionary.search(".ad"); // 返回 true
wordDictionary.search("b.."); // 返回 true
```

**说明：**

- 你可以假设所有输入都是由小写字母 `a-z` 和点号 `.` 构成的。
- 保证所有输入均为非空字符串。

---

### 解题思路

这个问题可以基于 Trie（前缀树）来解决。Trie 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。为了支持点号 `.` 的模糊匹配，我们需要在搜索时对点号进行特殊处理。

#### Trie 的结构
1. **节点结构**：
   - 每个节点包含一个长度为 26 的指针数组，表示 26 个小写字母。
   - 一个布尔值 `isEnd`，表示当前节点是否是一个单词的结尾。

2. **操作实现**：
   - **添加单词**：
     - 从根节点开始，逐个字符插入。
     - 如果字符对应的子节点不存在，则创建新节点。
     - 插入完成后，将最后一个节点的 `isEnd` 标记为 `true`。
   - **搜索单词**：
     - 从根节点开始，逐个字符查找。
     - 如果字符是点号 `.`，则需要递归检查所有可能的子节点。
     - 如果字符对应的子节点不存在，则返回 `false`。
     - 如果所有字符都匹配，并且最后一个节点的 `isEnd` 为 `true`，则返回 `true`。

---

### C语言解答

```c
#include <stdbool.h>
#include <stdlib.h>
#include <string.h>

#define ALPHABET_SIZE 26

// Trie 节点结构
typedef struct TrieNode {
    struct TrieNode* children[ALPHABET_SIZE];
    bool isEnd; // 标记是否为单词结尾
} TrieNode;

// 创建新节点
TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEnd = false;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        node->children[i] = NULL;
    }
    return node;
}

// WordDictionary 结构
typedef struct {
    TrieNode* root;
} WordDictionary;

// 初始化 WordDictionary
WordDictionary* wordDictionaryCreate() {
    WordDictionary* obj = (WordDictionary*)malloc(sizeof(WordDictionary));
    obj->root = createNode();
    return obj;
}

// 添加单词
void wordDictionaryAddWord(WordDictionary* obj, char* word) {
    TrieNode* current = obj->root;
    for (int i = 0; word[i] != '\0'; i++) {
        int index = word[i] - 'a';
        if (current->children[index] == NULL) {
            current->children[index] = createNode();
        }
        current = current->children[index];
    }
    current->isEnd = true;
}

// 递归搜索单词
bool searchHelper(TrieNode* node, char* word) {
    for (int i = 0; word[i] != '\0'; i++) {
        char ch = word[i];
        if (ch == '.') {
            // 点号匹配任意字符，递归检查所有子节点
            for (int j = 0; j < ALPHABET_SIZE; j++) {
                if (node->children[j] != NULL && searchHelper(node->children[j], word + i + 1)) {
                    return true;
                }
            }
            return false;
        } else {
            int index = ch - 'a';
            if (node->children[index] == NULL) {
                return false;
            }
            node = node->children[index];
        }
    }
    return node->isEnd;
}

// 搜索单词
bool wordDictionarySearch(WordDictionary* obj, char* word) {
    return searchHelper(obj->root, word);
}

// 释放 WordDictionary
void wordDictionaryFree(WordDictionary* obj) {
    // 递归释放节点
    void freeNode(TrieNode* node) {
        if (node == NULL) return;
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            freeNode(node->children[i]);
        }
        free(node);
    }
    freeNode(obj->root);
    free(obj);
}

// 简单main函数调用
int main() {
    WordDictionary* obj = wordDictionaryCreate();
    wordDictionaryAddWord(obj, "bad");
    wordDictionaryAddWord(obj, "dad");
    wordDictionaryAddWord(obj, "mad");
    printf("%d\n", wordDictionarySearch(obj, "pad")); // 输出 0 (false)
    printf("%d\n", wordDictionarySearch(obj, "bad")); // 输出 1 (true)
    printf("%d\n", wordDictionarySearch(obj, ".ad")); // 输出 1 (true)
    printf("%d\n", wordDictionarySearch(obj, "b..")); // 输出 1 (true)
    wordDictionaryFree(obj);
    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <string>
using namespace std;

class WordDictionary {
private:
    struct TrieNode {
        vector<TrieNode*> children;
        bool isEnd;
        TrieNode() : children(26, nullptr), isEnd(false) {}
    };

    TrieNode* root;

    // 递归搜索单词
    bool searchHelper(TrieNode* node, const string& word, int index) {
        if (index == word.length()) {
            return node->isEnd;
        }
        char ch = word[index];
        if (ch == '.') {
            // 点号匹配任意字符，递归检查所有子节点
            for (int i = 0; i < 26; i++) {
                if (node->children[i] != nullptr && searchHelper(node->children[i], word, index + 1)) {
                    return true;
                }
            }
            return false;
        } else {
            int i = ch - 'a';
            if (node->children[i] == nullptr) {
                return false;
            }
            return searchHelper(node->children[i], word, index + 1);
        }
    }

public:
    WordDictionary() {
        root = new TrieNode();
    }

    // 添加单词
    void addWord(string word) {
        TrieNode* current = root;
        for (char ch : word) {
            int i = ch - 'a';
            if (current->children[i] == nullptr) {
                current->children[i] = new TrieNode();
            }
            current = current->children[i];
        }
        current->isEnd = true;
    }

    // 搜索单词
    bool search(string word) {
        return searchHelper(root, word, 0);
    }
};

// 简单main函数调用
int main() {
    WordDictionary wordDictionary;
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    cout << wordDictionary.search("pad") << endl; // 输出 0 (false)
    cout << wordDictionary.search("bad") << endl; // 输出 1 (true)
    cout << wordDictionary.search(".ad") << endl; // 输出 1 (true)
    cout << wordDictionary.search("b..") << endl; // 输出 1 (true)
    return 0;
}
```

---

### 代码解释

#### C语言
1. **节点结构**：
   - 使用 `TrieNode` 结构表示 Trie 的节点。
   - 每个节点包含一个长度为 26 的指针数组和一个布尔值 `isEnd`。

2. **操作实现**：
   - `wordDictionaryAddWord`：逐个字符插入单词，标记单词结尾。
   - `searchHelper`：递归搜索单词，支持点号 `.` 的模糊匹配。
   - `wordDictionarySearch`：调用 `searchHelper` 进行搜索。

3. **内存管理**：
   - 使用递归释放 Trie 节点，避免内存泄漏。

#### C++
1. **节点结构**：
   - 使用 `TrieNode` 结构表示 Trie 的节点。
   - 使用 `vector<TrieNode*>` 存储子节点。

2. **操作实现**：
   - `addWord`：逐个字符插入单词，标记单词结尾。
   - `searchHelper`：递归搜索单词，支持点号 `.` 的模糊匹配。
   - `search`：调用 `searchHelper` 进行搜索。

3. **STL 容器**：
   - 使用 `vector` 简化子节点的存储和管理。

---

### 测试用例验证

#### 输入
```cpp
WordDictionary wordDictionary;
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad");
wordDictionary.search("bad");
wordDictionary.search(".ad");
wordDictionary.search("b..");
```

#### 输出
```plaintext
0
1
1
1
```

#### 解释
- 搜索 "pad" 返回 `false`，因为 "pad" 未添加。
- 搜索 "bad" 返回 `true`，因为 "bad" 已添加。
- 搜索 ".ad" 返回 `true`，因为 ".ad" 可以匹配 "bad"、"dad" 或 "mad"。
- 搜索 "b.." 返回 `true`，因为 "b.." 可以匹配 "bad"。

---

### 总结

通过 Trie 数据结构，我们可以高效地支持添加和搜索单词的操作。点号 `.` 的模糊匹配通过递归搜索所有可能的子节点来实现。C语言和C++的实现都清晰地展示了 Trie 的构建和搜索过程，代码具有较高的可读性和健壮性。