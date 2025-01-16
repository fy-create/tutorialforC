---
layout: post
title:  "208. 实现 Trie (前缀树)"
categories: arithmetic
---

[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree)

### 题目描述

实现一个 Trie（前缀树），包含 `insert`、`search` 和 `startsWith` 这三个操作。

**示例：**

```plaintext
Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // 返回 true
trie.search("app");     // 返回 false
trie.startsWith("app"); // 返回 true
trie.insert("app");
trie.search("app");     // 返回 true
```

**说明：**

- 你可以假设所有的输入都是由小写字母 `a-z` 构成的。
- 保证所有输入均为非空字符串。

---

### 解题思路

Trie（前缀树）是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。Trie 的核心思想是利用字符串的公共前缀来减少查询时间。

#### Trie 的结构
1. **节点结构**：
   - 每个节点包含一个长度为 26 的指针数组，表示 26 个小写字母。
   - 一个布尔值 `isEnd`，表示当前节点是否是一个单词的结尾。

2. **操作实现**：
   - **插入**：
     - 从根节点开始，逐个字符插入。
     - 如果字符对应的子节点不存在，则创建新节点。
     - 插入完成后，将最后一个节点的 `isEnd` 标记为 `true`。
   - **搜索**：
     - 从根节点开始，逐个字符查找。
     - 如果字符对应的子节点不存在，则返回 `false`。
     - 如果所有字符都匹配，并且最后一个节点的 `isEnd` 为 `true`，则返回 `true`。
   - **前缀匹配**：
     - 类似于搜索操作，但不需要检查最后一个节点的 `isEnd`。
     - 只要所有字符都匹配，就返回 `true`。

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

// Trie 结构
typedef struct {
    TrieNode* root;
} Trie;

// 初始化 Trie
Trie* trieCreate() {
    Trie* trie = (Trie*)malloc(sizeof(Trie));
    trie->root = createNode();
    return trie;
}

// 插入单词
void trieInsert(Trie* obj, char* word) {
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

// 搜索单词
bool trieSearch(Trie* obj, char* word) {
    TrieNode* current = obj->root;
    for (int i = 0; word[i] != '\0'; i++) {
        int index = word[i] - 'a';
        if (current->children[index] == NULL) {
            return false;
        }
        current = current->children[index];
    }
    return current->isEnd;
}

// 前缀匹配
bool trieStartsWith(Trie* obj, char* prefix) {
    TrieNode* current = obj->root;
    for (int i = 0; prefix[i] != '\0'; i++) {
        int index = prefix[i] - 'a';
        if (current->children[index] == NULL) {
            return false;
        }
        current = current->children[index];
    }
    return true;
}

// 释放 Trie
void trieFree(Trie* obj) {
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
    Trie* trie = trieCreate();
    trieInsert(trie, "apple");
    printf("%d\n", trieSearch(trie, "apple"));   // 输出 1 (true)
    printf("%d\n", trieSearch(trie, "app"));     // 输出 0 (false)
    printf("%d\n", trieStartsWith(trie, "app")); // 输出 1 (true)
    trieInsert(trie, "app");
    printf("%d\n", trieSearch(trie, "app"));     // 输出 1 (true)
    trieFree(trie);
    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <string>
using namespace std;

class Trie {
private:
    struct TrieNode {
        vector<TrieNode*> children;
        bool isEnd;
        TrieNode() : children(26, nullptr), isEnd(false) {}
    };

    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    // 插入单词
    void insert(string word) {
        TrieNode* current = root;
        for (char ch : word) {
            int index = ch - 'a';
            if (current->children[index] == nullptr) {
                current->children[index] = new TrieNode();
            }
            current = current->children[index];
        }
        current->isEnd = true;
    }

    // 搜索单词
    bool search(string word) {
        TrieNode* current = root;
        for (char ch : word) {
            int index = ch - 'a';
            if (current->children[index] == nullptr) {
                return false;
            }
            current = current->children[index];
        }
        return current->isEnd;
    }

    // 前缀匹配
    bool startsWith(string prefix) {
        TrieNode* current = root;
        for (char ch : prefix) {
            int index = ch - 'a';
            if (current->children[index] == nullptr) {
                return false;
            }
            current = current->children[index];
        }
        return true;
    }
};

// 简单main函数调用
int main() {
    Trie trie;
    trie.insert("apple");
    cout << trie.search("apple") << endl;   // 输出 1 (true)
    cout << trie.search("app") << endl;     // 输出 0 (false)
    cout << trie.startsWith("app") << endl; // 输出 1 (true)
    trie.insert("app");
    cout << trie.search("app") << endl;     // 输出 1 (true)
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
   - `trieInsert`：逐个字符插入单词，标记单词结尾。
   - `trieSearch`：逐个字符查找单词，检查结尾标记。
   - `trieStartsWith`：逐个字符查找前缀，不需要检查结尾标记。

3. **内存管理**：
   - 使用递归释放 Trie 节点，避免内存泄漏。

#### C++
1. **节点结构**：
   - 使用 `TrieNode` 结构表示 Trie 的节点。
   - 使用 `vector<TrieNode*>` 存储子节点。

2. **操作实现**：
   - `insert`：逐个字符插入单词，标记单词结尾。
   - `search`：逐个字符查找单词，检查结尾标记。
   - `startsWith`：逐个字符查找前缀，不需要检查结尾标记。

3. **STL 容器**：
   - 使用 `vector` 简化子节点的存储和管理。

---

### 测试用例验证

#### 输入
```cpp
Trie trie;
trie.insert("apple");
trie.search("apple");
trie.search("app");
trie.startsWith("app");
trie.insert("app");
trie.search("app");
```

#### 输出
```plaintext
1
0
1
1
```

#### 解释
- 插入 "apple"，搜索 "apple" 返回 `true`。
- 搜索 "app" 返回 `false`。
- 前缀匹配 "app" 返回 `true`。
- 插入 "app"，搜索 "app" 返回 `true`。

---

### 总结

Trie 是一种高效的数据结构，适用于字符串的存储和检索。通过实现 `insert`、`search` 和 `startsWith` 操作，我们可以轻松地处理字符串的前缀匹配问题。