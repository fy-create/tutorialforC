---
layout: post
title:  "127. 单词接龙"
categories: arithmetic
---

[127. 单词接龙](https://leetcode.cn/problems/word-ladder)

### 题目描述

字典 `wordList` 中从单词 `beginWord` 到单词 `endWord` 的 **最短转换序列长度** 是这样定义的：

1. 每次转换只能改变一个字母。
2. 转换后得到的单词必须是字典中的单词。

给你两个单词 `beginWord` 和 `endWord` 以及一个字典 `wordList`，请你找出从 `beginWord` 到 `endWord` 的最短转换序列的长度。如果不存在这样的转换序列，返回 0。

---

**示例 1：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
输出：5
解释：最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog"，共 5 个单词。
```

**示例 2：**

```
输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
输出：0
解释：endWord "cog" 不在字典中，所以无法进行转换。
```

---

**提示：**

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`、`endWord` 和 `wordList[i]` 由小写英文字母组成
- `beginWord` != `endWord`
- `wordList` 中的所有字符串 **互不相同**

---

### 解题思路

这是一个图的最短路径问题，可以通过广度优先搜索（BFS）解决。

1. **转换关系**：
   - 每个单词是一个节点，两个单词之间有一条边当且仅当它们可以通过改变一个字母互相转换。

2. **图的构造**：
   - 构建一个字典，用来记录每个中间态到所有符合条件的单词的映射关系。例如，单词 `"hot"` 可以变为 `"h*t"`，所有中间态是图的边。

3. **广度优先搜索**：
   - 从起点单词 `beginWord` 开始，将其所有相邻单词加入队列，依次访问每个单词，直到找到目标单词 `endWord`。

4. **优化**：
   - 使用双向 BFS，分别从起点和终点进行搜索，减少搜索空间。

5. **终止条件**：
   - 如果在搜索过程中找到目标单词，返回转换序列的长度。
   - 如果队列为空且没有找到目标单词，返回 0。

---

### C 语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 判断两个单词是否可以相互转换
bool canConvert(const char* word1, const char* word2) {
    int len = strlen(word1);
    int diff = 0;

    for (int i = 0; i < len; i++) {
        if (word1[i] != word2[i]) {
            diff++;
            if (diff > 1) return false;
        }
    }

    return diff == 1;
}

// 广度优先搜索
int ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {
    // 检查 endWord 是否在 wordList 中
    bool found = false;
    for (int i = 0; i < wordListSize; i++) {
        if (strcmp(wordList[i], endWord) == 0) {
            found = true;
            break;
        }
    }
    if (!found) return 0;

    // 队列
    int* queue = (int*)malloc(wordListSize * sizeof(int));
    int front = 0, rear = 0;

    // 标记是否访问过
    bool* visited = (bool*)calloc(wordListSize, sizeof(bool));

    // 将起点加入队列
    for (int i = 0; i < wordListSize; i++) {
        if (canConvert(beginWord, wordList[i])) {
            queue[rear++] = i;
            visited[i] = true;
        }
    }

    int level = 2; // 开始从第二层搜索

    while (front < rear) {
        int size = rear - front;
        for (int i = 0; i < size; i++) {
            int currentIndex = queue[front++];
            if (strcmp(wordList[currentIndex], endWord) == 0) {
                free(queue);
                free(visited);
                return level;
            }

            for (int j = 0; j < wordListSize; j++) {
                if (!visited[j] && canConvert(wordList[currentIndex], wordList[j])) {
                    queue[rear++] = j;
                    visited[j] = true;
                }
            }
        }
        level++;
    }

    free(queue);
    free(visited);
    return 0;
}

// 测试函数
int main() {
    char* beginWord = "hit";
    char* endWord = "cog";
    char* wordList[] = {"hot", "dot", "dog", "lot", "log", "cog"};
    int wordListSize = sizeof(wordList) / sizeof(wordList[0]);

    int result = ladderLength(beginWord, endWord, wordList, wordListSize);
    printf("最短转换序列长度: %d\n", result);

    return 0;
}
```

---

### C++ 语言实现

```cpp
#include <iostream>
#include <unordered_set>
#include <queue>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());

        // 如果 endWord 不在字典中，返回 0
        if (dict.find(endWord) == dict.end()) {
            return 0;
        }

        // 队列用于广度优先搜索
        queue<pair<string, int>> q;
        q.push({beginWord, 1}); // 起点和深度

        while (!q.empty()) {
            auto [word, steps] = q.front();
            q.pop();

            // 枚举当前单词的所有可能变化
            for (int i = 0; i < word.size(); i++) {
                string temp = word;
                for (char c = 'a'; c <= 'z'; c++) {
                    temp[i] = c;

                    // 如果找到目标单词
                    if (temp == endWord) {
                        return steps + 1;
                    }

                    // 如果单词在字典中
                    if (dict.find(temp) != dict.end()) {
                        q.push({temp, steps + 1});
                        dict.erase(temp); // 从字典中移除，防止重复访问
                    }
                }
            }
        }

        return 0; // 无法转换
    }
};

// 测试函数
int main() {
    Solution sol;
    string beginWord = "hit";
    string endWord = "cog";
    vector<string> wordList = {"hot", "dot", "dog", "lot", "log", "cog"};

    int result = sol.ladderLength(beginWord, endWord, wordList);
    cout << "最短转换序列长度: " << result << endl;

    return 0;
}
```

---

### 代码说明

1. **广度优先搜索**：
   - 使用队列维护当前层的所有单词，逐层搜索。
   - 每次对单词尝试所有可能的变换，找到下一层单词。

2. **字典优化**：
   - 使用 `unordered_set` 存储单词，快速查找和删除。

3. **时间复杂度**：
   - 遍历所有单词，时间复杂度为 O(n × m)，其中 `n` 为单词数量，`m` 为单词长度。

4. **空间复杂度**：
   - 队列和字典需要额外空间，空间复杂度为 O(n)。