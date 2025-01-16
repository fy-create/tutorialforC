---
layout: post
title:  "212. 单词搜索 II"
categories: arithmetic
---

[212. 单词搜索 II](https://leetcode.cn/problems/word-search-ii)

### 题目描述

给定一个 `m x n` 的二维字符网格 `board` 和一个单词列表 `words`，找出所有同时在网格中出现的单词。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母在一个单词中不允许被重复使用。

**示例 1：**

```
输入：board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
输出：["eat","oath"]
```

**示例 2：**

```
输入：board = [["a","b"],["c","d"]], words = ["abcb"]
输出：[]
```

**提示：**

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 12`
- `board[i][j]` 是一个小写英文字母
- `1 <= words.length <= 3 * 10^4`
- `1 <= words[i].length <= 10`
- `words[i]` 由小写英文字母组成
- `words` 中的所有字符串互不相同

---

### 解题思路

这个问题可以通过 **Trie（前缀树）** 和 **深度优先搜索（DFS）** 结合来解决。具体步骤如下：

1. **构建 Trie**：
   - 将所有单词插入到 Trie 中，方便后续的快速查找。

2. **DFS 搜索**：
   - 遍历 `board` 中的每一个单元格，作为单词的起点。
   - 从起点开始，使用 DFS 搜索所有可能的路径，同时在 Trie 中检查路径是否构成一个单词。
   - 如果找到一个单词，将其加入结果集。

3. **优化**：
   - 使用 Trie 的节点指针来避免重复搜索。
   - 在 DFS 过程中，标记已访问的单元格，避免重复使用。

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
    char* word; // 存储单词
} TrieNode;

// 创建新节点
TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->word = NULL;
    for (int i = 0; i < ALPHABET_SIZE; i++) {
        node->children[i] = NULL;
    }
    return node;
}

// 插入单词到 Trie
void insert(TrieNode* root, char* word) {
    TrieNode* current = root;
    for (int i = 0; word[i] != '\0'; i++) {
        int index = word[i] - 'a';
        if (current->children[index] == NULL) {
            current->children[index] = createNode();
        }
        current = current->children[index];
    }
    current->word = strdup(word); // 存储单词
}

// DFS 搜索
void dfs(char** board, int boardSize, int boardColSize, TrieNode* node, int i, int j, char** result, int* returnSize) {
    // 边界检查
    if (i < 0 || i >= boardSize || j < 0 || j >= boardColSize || board[i][j] == '#') {
        return;
    }

    char ch = board[i][j];
    int index = ch - 'a';
    if (node->children[index] == NULL) {
        return;
    }

    node = node->children[index];
    if (node->word != NULL) {
        // 找到一个单词
        result[(*returnSize)++] = strdup(node->word);
        node->word = NULL; // 避免重复添加
    }

    // 标记已访问
    board[i][j] = '#';

    // 四个方向搜索
    dfs(board, boardSize, boardColSize, node, i + 1, j, result, returnSize);
    dfs(board, boardSize, boardColSize, node, i - 1, j, result, returnSize);
    dfs(board, boardSize, boardColSize, node, i, j + 1, result, returnSize);
    dfs(board, boardSize, boardColSize, node, i, j - 1, result, returnSize);

    // 恢复状态
    board[i][j] = ch;
}

// 主函数
char** findWords(char** board, int boardSize, int* boardColSize, char** words, int wordsSize, int* returnSize) {
    // 初始化 Trie
    TrieNode* root = createNode();
    for (int i = 0; i < wordsSize; i++) {
        insert(root, words[i]);
    }

    // 初始化结果集
    char** result = (char**)malloc(wordsSize * sizeof(char*));
    *returnSize = 0;

    // 遍历 board
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < boardColSize[0]; j++) {
            dfs(board, boardSize, boardColSize[0], root, i, j, result, returnSize);
        }
    }

    // 释放 Trie
    void freeTrie(TrieNode* node) {
        if (node == NULL) return;
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            freeTrie(node->children[i]);
        }
        free(node->word);
        free(node);
    }
    freeTrie(root);

    return result;
}

// 简单main函数调用
int main() {
    char* board[] = {"oaan", "etae", "ihkr", "iflv"};
    int boardSize = 4;
    int boardColSize[] = {4, 4, 4, 4};
    char* words[] = {"oath", "pea", "eat", "rain"};
    int wordsSize = 4;
    int returnSize;

    char** result = findWords(board, boardSize, boardColSize, words, wordsSize, &returnSize);
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
        free(result[i]);
    }
    free(result);

    return 0;
}
```

---

### C++ 解答

```cpp
#include <vector>
#include <string>
#include <unordered_set>
using namespace std;

class Solution {
private:
    struct TrieNode {
        vector<TrieNode*> children;
        string word; // 存储单词
        TrieNode() : children(26, nullptr) {}
    };

    TrieNode* root;

    // 插入单词到 Trie
    void insert(const string& word) {
        TrieNode* current = root;
        for (char ch : word) {
            int i = ch - 'a';
            if (current->children[i] == nullptr) {
                current->children[i] = new TrieNode();
            }
            current = current->children[i];
        }
        current->word = word;
    }

    // DFS 搜索
    void dfs(vector<vector<char>>& board, TrieNode* node, int i, int j, unordered_set<string>& result) {
        // 边界检查
        if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] == '#') {
            return;
        }

        char ch = board[i][j];
        int index = ch - 'a';
        if (node->children[index] == nullptr) {
            return;
        }

        node = node->children[index];
        if (!node->word.empty()) {
            // 找到一个单词
            result.insert(node->word);
            node->word = ""; // 避免重复添加
        }

        // 标记已访问
        board[i][j] = '#';

        // 四个方向搜索
        dfs(board, node, i + 1, j, result);
        dfs(board, node, i - 1, j, result);
        dfs(board, node, i, j + 1, result);
        dfs(board, node, i, j - 1, result);

        // 恢复状态
        board[i][j] = ch;
    }

    // 释放 Trie 内存
    void freeTrie(TrieNode* node) {
        if (node == nullptr) return;
        for (int i = 0; i < 26; i++) {
            freeTrie(node->children[i]);
        }
        delete node;
    }

public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        // 初始化 Trie
        root = new TrieNode();
        for (const string& word : words) {
            insert(word);
        }

        // 初始化结果集
        unordered_set<string> result;

        // 遍历 board
        for (int i = 0; i < board.size(); i++) {
            for (int j = 0; j < board[0].size(); j++) {
                dfs(board, root, i, j, result);
            }
        }

        // 释放 Trie 内存
        freeTrie(root);

        // 返回结果
        return vector<string>(result.begin(), result.end());
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    vector<vector<char>> board = { {'o', 'a', 'a', 'n'}, {'e', 't', 'a', 'e'}, {'i', 'h', 'k', 'r'}, {'i', 'f', 'l', 'v'}};
    vector<string> words = {"oath", "pea", "eat", "rain"};

    vector<string> result = solution.findWords(board, words);
    for (const string& word : result) {
        cout << word << endl;
    }

    return 0;
}
```

---

### 代码解释

#### C语言
1. **Trie 结构**：
   - 使用 `TrieNode` 结构表示 Trie 的节点。
   - 每个节点包含一个长度为 26 的指针数组和一个字符串指针 `word`。

2. **DFS 搜索**：
   - 从每个单元格开始，使用 DFS 搜索所有可能的路径。
   - 在 Trie 中检查路径是否构成一个单词。

3. **结果集**：
   - 使用动态数组存储结果，并返回结果集。

#### C++
1. **Trie 结构**：
   - 使用 `TrieNode` 结构表示 Trie 的节点。
   - 每个节点包含一个长度为 26 的指针数组和一个字符串 `word`。

2. **DFS 搜索**：
   - 从每个单元格开始，使用 DFS 搜索所有可能的路径。
   - 在 Trie 中检查路径是否构成一个单词。

3. **结果集**：
   - 使用 `unordered_set` 存储结果，避免重复。

---

### 测试用例验证

#### 输入
```cpp
board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]]
words = ["oath","pea","eat","rain"]
```

#### 输出
```plaintext
["eat","oath"]
```

#### 解释
- "eat" 可以通过路径 `e -> a -> t` 找到。
- "oath" 可以通过路径 `o -> a -> t -> h` 找到。

---

### 总结

通过 Trie 和 DFS 的结合，我们可以高效地解决这个问题。Trie 用于快速查找单词的前缀，DFS 用于搜索所有可能的路径。C语言和C++的实现都清晰地展示了这一过程，代码具有较高的可读性和健壮性。