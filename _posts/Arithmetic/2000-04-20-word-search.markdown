---
layout: post
title:  "79. 单词搜索"
categories: arithmetic
---

[79. 单词搜索](https://leetcode.cn/problems/word-search)

### 题目描述

给定一个 `m x n` 的二维字符网格 `board` 和一个字符串 `word`，判断 `word` 是否存在于网格中。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

**示例 1：**

```
输入：
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCCED"
输出：true
```

**示例 2：**

```
输入：
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "SEE"
输出：true
```

**示例 3：**

```
输入：
board = [
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
word = "ABCB"
输出：false
```

**提示：**

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `1 <= word.length <= 10^3`
- `board` 和 `word` 仅由大写和小写英文字母组成

### 解题思路

要在二维字符网格中搜索一个单词，可以使用深度优先搜索（DFS）的方法。具体步骤如下：

1. **遍历网格**：
   - 从网格中的每一个单元格开始，尝试匹配单词的第一个字母。
   
2. **深度优先搜索（DFS）**：
   - 当找到匹配的字母时，递归地检查其上下左右相邻的单元格是否与单词的下一个字母匹配。
   - 为了避免重复使用同一个单元格，需要在访问过的单元格上做标记，通常可以将其临时修改为一个特殊字符（例如 `#`）。
   
3. **回溯**：
   - 如果在某一条路径上无法完成单词的匹配，需要回溯到上一步，恢复被标记的单元格，并尝试其他可能的路径。
   
4. **终止条件**：
   - 当单词的所有字母都成功匹配时，返回 `true`。
   - 如果遍历完所有可能的路径仍未找到匹配，返回 `false`。

这种方法的时间复杂度在最坏情况下是 `O(mn * 4^k)`，其中 `k` 是单词的长度，因为每个字母可能有四个方向的选择。为了优化，可以在搜索过程中尽早终止不可能成功的路径。

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

// 定义四个方向：上、下、左、右
int directions[4][2] = {
    {-1, 0}, // 上
    {1, 0},  // 下
    {0, -1}, // 左
    {0, 1}   // 右
};

// 辅助函数：执行DFS搜索
bool dfs(char** board, int boardSize, int* boardColSize, int i, int j, char* word, int index) {
    // 如果当前索引等于单词长度，表示已成功匹配
    if (index == strlen(word)) {
        return true;
    }
    
    // 检查边界条件和当前字符是否匹配
    if (i < 0 || i >= boardSize || j < 0 || j >= boardColSize[i] || board[i][j] != word[index]) {
        return false;
    }
    
    // 标记当前单元格为已访问
    char temp = board[i][j];
    board[i][j] = '#';
    
    // 递归搜索四个方向
    for(int d = 0; d < 4; d++) {
        int new_i = i + directions[d][0];
        int new_j = j + directions[d][1];
        if(dfs(board, boardSize, boardColSize, new_i, new_j, word, index + 1)) {
            // 恢复单元格原值
            board[i][j] = temp;
            return true;
        }
    }
    
    // 如果没有找到匹配，恢复单元格原值
    board[i][j] = temp;
    return false;
}

// 函数原型：判断单词是否存在于网格中
bool exist(char** board, int boardSize, int* boardColSize, char* word){
    // 遍历每一个单元格作为起点
    for(int i = 0; i < boardSize; i++) {
        for(int j = 0; j < boardColSize[i]; j++) {
            if(board[i][j] == word[0]) {
                if(dfs(board, boardSize, boardColSize, i, j, word, 0)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 简单的主函数调用示例
int main() {
    // 示例网格
    char row1[] = {'A','B','C','E'};
    char row2[] = {'S','F','C','S'};
    char row3[] = {'A','D','E','E'};
    
    // 创建指针数组
    char* board[] = {row1, row2, row3};
    int boardSize = 3;
    int boardColSize[] = {4, 4, 4};
    
    // 要搜索的单词
    char word1[] = "ABCCED";
    char word2[] = "SEE";
    char word3[] = "ABCB";
    
    // 调用函数并打印结果
    printf("单词 \"%s\" 是否存在：%s\n", word1, exist(board, boardSize, boardColSize, word1) ? "true" : "false");
    printf("单词 \"%s\" 是否存在：%s\n", word2, exist(board, boardSize, boardColSize, word2) ? "true" : "false");
    printf("单词 \"%s\" 是否存在：%s\n", word3, exist(board, boardSize, boardColSize, word3) ? "true" : "false");
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 定义四个方向：上、下、左、右
    vector<pair<int, int>> directions = {
        {-1, 0}, // 上
        {1, 0},  // 下
        {0, -1}, // 左
        {0, 1}   // 右
    };
    
    // 辅助函数：执行DFS搜索
    bool dfs(vector<vector<char>>& board, int i, int j, const string& word, int index) {
        // 如果当前索引等于单词长度，表示已成功匹配
        if(index == word.size()) {
            return true;
        }
        
        // 检查边界条件和当前字符是否匹配
        if(i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[index]) {
            return false;
        }
        
        // 标记当前单元格为已访问
        char temp = board[i][j];
        board[i][j] = '#';
        
        // 递归搜索四个方向
        for(auto &dir : directions) {
            int new_i = i + dir.first;
            int new_j = j + dir.second;
            if(dfs(board, new_i, new_j, word, index + 1)) {
                // 恢复单元格原值
                board[i][j] = temp;
                return true;
            }
        }
        
        // 如果没有找到匹配，恢复单元格原值
        board[i][j] = temp;
        return false;
    }
    
    // 函数原型：判断单词是否存在于网格中
    bool exist(vector<vector<char>>& board, string word) {
        // 遍历每一个单元格作为起点
        for(int i = 0; i < board.size(); i++) {
            for(int j = 0; j < board[0].size(); j++) {
                if(board[i][j] == word[0]) {
                    if(dfs(board, i, j, word, 0)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
};

// 简单的主函数调用示例
int main() {
    // 示例网格
    vector<vector<char>> board = {
        {'A','B','C','E'},
        {'S','F','C','S'},
        {'A','D','E','E'}
    };
    
    Solution solution;
    
    // 要搜索的单词
    string word1 = "ABCCED";
    string word2 = "SEE";
    string word3 = "ABCB";
    
    // 调用函数并打印结果
    cout << "单词 \"" << word1 << "\" 是否存在：" << (solution.exist(board, word1) ? "true" : "false") << endl;
    cout << "单词 \"" << word2 << "\" 是否存在：" << (solution.exist(board, word2) ? "true" : "false") << endl;
    cout << "单词 \"" << word3 << "\" 是否存在：" << (solution.exist(board, word3) ? "true" : "false") << endl;
    
    return 0;
}
```