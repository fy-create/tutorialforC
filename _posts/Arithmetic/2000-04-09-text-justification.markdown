---
layout: post
title:  "68. 文本左右对齐"
categories: arithmetic
---

[68. 文本左右对齐](https://leetcode.cn/problems/text-justification)
### 题目描述

给定一个单词数组 `words` 和一个长度 `maxWidth`，重新排版单词，使其成为每行恰好有 `maxWidth` 个字符，且左右两端对齐的文本。

你应该使用“贪心算法”来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 `' '` 填充，使得每行恰好有 `maxWidth` 个字符。

要求尽可能均匀分配单词间的空格数。如果某一行的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

---

**示例 1：**

```
输入: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
输出:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
```

---

**示例 2：**

```
输入: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
输出:
[
   "What   must   be",
   "acknowledgment  ",
   "shall be        "
]
```

---

**示例 3：**

```
输入: words = ["Science","is","what","we","understand","well","enough","to","explain",
              "to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
输出:
[
   "Science  is  what we",
   "understand      well",
   "enough to explain to",
   "a  computer.  Art is",
   "everything  else  we",
   "do                  "
]
```

---

**提示：**

- `1 <= words.length <= 300`
- `1 <= words[i].length <= 20`
- `words[i]` 由小写英文字母和标点符号组成
- `1 <= maxWidth <= 100`
- `words[i].length <= maxWidth`

---

### 解题思路

1. **初始化**：创建一个空列表 `result` 来存储最终的对齐文本。
2. **逐行处理**：使用贪心算法，将尽可能多的单词放入当前行，确保行的总长度不超过 `maxWidth`。
3. **计算空格分配**：
   - 如果当前行只有一个单词，则该行左对齐，单词后面填充空格。
   - 如果是最后一行，则所有单词左对齐，单词之间仅有一个空格，行末填充剩余空格。
   - 对于其他情况，计算需要的空格数，并尽可能均匀地分配在单词之间。如果不能均匀分配，则左侧间隔的空格数多于右侧。
4. **构建行字符串**：根据计算的空格分配，将单词和空格拼接成字符串，并添加到 `result` 列表中。
5. **返回结果**：处理完所有单词后，返回 `result` 列表。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 创建一行并填充单词和空格
char* createLine(char** words, int start, int end, int totalLen, int maxWidth, int isLastLine) {
    char* line = (char*)malloc((maxWidth + 1) * sizeof(char));
    int numWords = end - start + 1;
    int pos = 0;

    if (numWords == 1 || isLastLine) {
        // 左对齐
        for (int i = start; i <= end; i++) {
            strcpy(line + pos, words[i]);
            pos += strlen(words[i]);
            if (pos < maxWidth) {
                line[pos++] = ' ';
            }
        }
        while (pos < maxWidth) {
            line[pos++] = ' ';
        }
    } else {
        // 两端对齐
        int totalSpaces = maxWidth - totalLen;
        int spaceBetween = totalSpaces / (numWords - 1);
        int extraSpaces = totalSpaces % (numWords - 1);

        for (int i = start; i < end; i++) {
            strcpy(line + pos, words[i]);
            pos += strlen(words[i]);
            int spacesToApply = spaceBetween + (i - start < extraSpaces ? 1 : 0);
            for (int j = 0; j < spacesToApply; j++) {
                line[pos++] = ' ';
            }
        }
        strcpy(line + pos, words[end]);
        pos += strlen(words[end]);
    }
    line[pos] = '\0';
    return line;
}

// 主函数：文本左右对齐
char** fullJustify(char** words, int wordsSize, int maxWidth, int* returnSize) {
    char** result = (char**)malloc(wordsSize * sizeof(char*));
    int count = 0;
    int start = 0;

    while (start < wordsSize) {
        int totalLen = 0;
        int end = start;

        while (end < wordsSize && totalLen + strlen(words[end]) + (end - start) <= maxWidth) {
            totalLen += strlen(words[end]);
            end++;
        }
        end--;

        int isLastLine = (end == wordsSize - 1);
        result[count++] = createLine(words, start, end, totalLen, maxWidth, isLastLine);
        start = end + 1;
    }

    *returnSize = count;
    return result;
}

// 测试函数
int main() {
    char* words[] = {"This", "is", "an", "example", "of", "text", "justification."};
    int maxWidth = 16;
    int returnSize;

    char** result = fullJustify(words, 7, maxWidth, &returnSize);

    printf("文本对齐结果：\n");
    for (int i = 0; i < returnSize; i++) {
        printf("\"%s\"\n", result[i]);
        free(result[i]);
    }
    free(result);

    return 0;
}
```

---

### C++实现

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> result;
        int start = 0, n = words.size();

        while (start < n) {
            int totalLen = 0, end = start;

            while (end < n && totalLen + words[end].length() + (end - start) <= maxWidth) {
                totalLen += words[end].length();
                end++;
            }
            end--;

            string line = createLine(words, start, end, totalLen, maxWidth, end == n - 1);
            result.push_back(line);
            start = end + 1;
        }

        return result;
    }

private:
    string createLine(vector<string>& words, int start, int end, int totalLen, int maxWidth, bool isLastLine) {
        string line;
        int numWords = end - start + 1;

        if (numWords == 1 || isLastLine) {
            for (int i = start; i <= end; i++) {
                line += words[i];
                if (line.length() < maxWidth) line += ' ';
            }
            line += string(maxWidth - line.length(), ' ');
        } else {
            int totalSpaces = maxWidth - totalLen;
            int spaceBetween = totalSpaces / (numWords - 1);
            int extraSpaces = totalSpaces % (numWords - 1);

            for (int i = start; i < end; i++) {
                line += words[i];
                line += string(spaceBetween + (i - start < extraSpaces ? 1 : 0), ' ');
            }
            line += words[end];
        }

        return line;
    }
};

// 测试函数
int main() {
    Solution solution;
    vector<string> words = {"This", "is", "an", "example", "of", "text", "justification."};
    int maxWidth = 16;

    vector<string> result = solution.fullJustify(words, maxWidth);

    cout << "文本对齐结果：" << endl;
    for (const auto& line : result) {
        cout << "\"" << line << "\"" << endl;
    }

    return 0;
}
```

---

### 输出示例

```
"This    is    an"
"example  of text"
"justification.  "
```