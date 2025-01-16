---
layout: post
title:  "318. 最大单词长度乘积"
categories: arithmetic
---

[318. 最大单词长度乘积](https://leetcode.cn/problems/maximum-product-of-word-lengths)

### 题目：**Maximum Product of Word Lengths**

#### 题目描述：

给定一个字符串数组 `words`，找到 `words[i]` 和 `words[j]` 的最大乘积，其中 `0 <= i < j < words.length`，且 `words[i]` 和 `words[j]` 不包含公共字符。

你可以假设每个单词只包含小写字母。

**示例 1：**
```plaintext
输入: words = ["abcw","baz","foo","bar","xtfn","abcdef"]
输出: 16
解释: 这两个单词是 "abcw" 和 "xtfn"，它们的长度分别是 4 和 4，且它们没有公共字符。
```

**示例 2：**
```plaintext
输入: words = ["a","ab","abc","d","cd","bcd","abcd"]
输出: 4
解释: 这两个单词是 "ab" 和 "cd"，它们的长度分别是 2 和 2，且它们没有公共字符。
```

**提示：**
- `2 <= words.length <= 1000`
- `1 <= words[i].length <= 1000`
- `words[i]` 只包含小写字母。

---

### 解题思路：

#### 1. **问题分析：**
   - 我们需要找出两个不同的单词，它们没有任何公共字符，且使得它们的长度乘积最大。
   - 判断两个单词是否有公共字符，可以将每个单词转换成一个位掩码（bitmask），这样就可以通过位运算来判断两个单词是否有公共字符。
   
#### 2. **解决思路：**
   - **步骤1**：将每个单词转换成一个位掩码。对于每个字母，将对应位置的比特位设置为 1。比如，字母 'a' 对应第 0 位，'b' 对应第 1 位，依此类推。
   - **步骤2**：使用两个嵌套循环，遍历所有不同的单词组合，判断它们的位掩码是否有交集。如果没有交集，则计算它们的长度乘积并更新最大值。
   
#### 3. **时间复杂度：**
   - 由于我们需要计算每个单词的位掩码，时间复杂度为 O(n * m)，其中 n 是单词的个数，m 是每个单词的最大长度。
   - 对于每一对单词，我们使用位运算判断它们是否有公共字符，时间复杂度为 O(1)，所以总时间复杂度为 O(n^2)，n 是单词个数。

---

### C语言解答：

```c
#include <stdio.h>
#include <string.h>

#define MAX_WORD_LENGTH 1000

// 函数：计算一个单词的位掩码
int getBitmask(char* word) {
    int bitmask = 0;
    for (int i = 0; word[i] != '\0'; i++) {
        bitmask |= (1 << (word[i] - 'a')); // 将字母的对应位设为1
    }
    return bitmask;
}

// 函数：返回两个没有公共字符单词的最大乘积
int maxProduct(char** words, int wordsSize) {
    int bitmasks[wordsSize];
    
    // 计算每个单词的位掩码
    for (int i = 0; i < wordsSize; i++) {
        bitmasks[i] = getBitmask(words[i]);
    }
    
    int maxProduct = 0;
    
    // 对每一对单词进行检查
    for (int i = 0; i < wordsSize; i++) {
        for (int j = i + 1; j < wordsSize; j++) {
            // 判断两个单词是否有公共字符
            if ((bitmasks[i] & bitmasks[j]) == 0) {
                int product = strlen(words[i]) * strlen(words[j]);
                if (product > maxProduct) {
                    maxProduct = product;
                }
            }
        }
    }
    
    return maxProduct;
}

int main() {
    char* words[] = {"abcw", "baz", "foo", "bar", "xtfn", "abcdef"};
    int wordsSize = 6;
    printf("Maximum product: %d\n", maxProduct(words, wordsSize));
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

using namespace std;

class Solution {
public:
    // 函数：计算单词的位掩码
    int getBitmask(const string& word) {
        int bitmask = 0;
        for (char c : word) {
            bitmask |= (1 << (c - 'a')); // 设置对应字符的位为1
        }
        return bitmask;
    }

    // 函数：返回两个没有公共字符单词的最大乘积
    int maxProduct(vector<string>& words) {
        int n = words.size();
        vector<int> bitmasks(n);
        
        // 计算每个单词的位掩码
        for (int i = 0; i < n; i++) {
            bitmasks[i] = getBitmask(words[i]);
        }

        int maxProduct = 0;
        
        // 对每一对单词进行检查
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // 如果没有公共字符
                if ((bitmasks[i] & bitmasks[j]) == 0) {
                    int product = words[i].size() * words[j].size();
                    maxProduct = max(maxProduct, product);
                }
            }
        }
        
        return maxProduct;
    }
};

int main() {
    Solution sol;
    vector<string> words = {"abcw", "baz", "foo", "bar", "xtfn", "abcdef"};
    cout << "Maximum product: " << sol.maxProduct(words) << endl;
    return 0;
}
```

### 代码解释：

1. **C语言解答：**
   - `getBitmask`：将每个单词转化为一个位掩码，利用位运算将每个字母映射为二进制位。
   - `maxProduct`：遍历每对单词，使用位运算判断它们是否有公共字符（即位掩码与操作结果是否为0）。如果没有公共字符，则计算长度的乘积并更新最大值。

2. **C++ 解答：**
   - 使用 `getBitmask` 函数计算单词的位掩码。
   - `maxProduct` 通过双重循环遍历所有单词对，判断它们的位掩码是否有交集。如果没有交集，则计算它们的长度乘积，并更新最大乘积。
   - `max` 函数用于更新最大值。

### 总结：
- **时间复杂度**：O(n^2)，其中 n 是单词的数量。我们对每一对单词进行检查，位运算和长度乘积计算的复杂度是 O(1)。
- **空间复杂度**：O(n)，用于存储单词的位掩码。

通过位掩码和位运算，本题能够高效地判断两个单词是否有公共字符，从而快速计算出最大乘积。