---
layout: post
title:  "17. 电话号码的字母组合"
categories: arithmetic
---

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number)

### 题目描述

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。  
返回的答案可以按 **任意顺序**。  
给出数字到字母的映射如下（与电话按键相同）。注意，数字 `1` 不对应任何字母。  

```
2 -> abc  
3 -> def  
4 -> ghi  
5 -> jkl  
6 -> mno  
7 -> pqrs  
8 -> tuv  
9 -> wxyz  
```

**示例：**

- 示例 1:  
  ```
  输入：digits = "23"  
  输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]  
  ```

- 示例 2:  
  ```
  输入：digits = ""  
  输出：[]  
  ```

- 示例 3:  
  ```
  输入：digits = "2"  
  输出：["a","b","c"]  
  ```

**提示：**  
- `0 <= digits.length <= 4`  
- `digits[i]` 是范围 `['2', '9']` 的数字。

---

### 解题思路

我们可以使用回溯算法来解决这个问题。  

#### 核心思想：
1. 建立数字到字母的映射关系。
2. 使用递归的方法遍历每个数字对应的字母，构建所有可能的组合。

#### 具体步骤：
1. **边界条件检查**：如果输入的数字字符串为空，直接返回空列表。
2. **数字到字母的映射**：建立一个数组或字典，映射数字 `2-9` 到对应的字母集合。
3. **回溯函数定义**：定义一个递归函数，参数包括当前处理的数字索引、当前组合字符串，以及保存结果的列表。
4. **递归终止条件**：当当前处理的数字索引等于输入数字字符串的长度时，表示一个完整的组合已经生成，将其加入结果列表。
5. **递归过程**：对于当前数字，遍历其对应的每个字母，将字母加入当前组合字符串，然后递归处理下一个数字。递归返回后，移除当前添加的字母，尝试下一个字母。
6. **返回结果**：递归完成后，返回保存所有组合的结果列表。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 数字到字母的映射
const char *digit_to_letters[] = {
    "",     // 0
    "",     // 1
    "abc",  // 2
    "def",  // 3
    "ghi",  // 4
    "jkl",  // 5
    "mno",  // 6
    "pqrs", // 7
    "tuv",  // 8
    "wxyz"  // 9
};

// 回溯函数
void backtrack(const char *digits, int index, char *current, char **result, int *returnSize) {
    if (digits[index] == '\0') { // 如果已经处理完所有数字
        result[*returnSize] = strdup(current); // 保存当前组合
        (*returnSize)++;
        return;
    }

    const char *letters = digit_to_letters[digits[index] - '0'];
    for (int i = 0; letters[i] != '\0'; i++) {
        current[index] = letters[i];        // 添加当前字母
        backtrack(digits, index + 1, current, result, returnSize); // 递归处理下一个数字
    }
}

// 主函数
char **letterCombinations(char *digits, int *returnSize) {
    *returnSize = 0;
    if (digits == NULL || digits[0] == '\0') { // 如果输入为空
        return NULL;
    }

    int len = strlen(digits);
    int max_combinations = 1; // 最大可能的组合数
    for (int i = 0; i < len; i++) {
        max_combinations *= strlen(digit_to_letters[digits[i] - '0']);
    }

    char **result = (char **)malloc(max_combinations * sizeof(char *));
    char *current = (char *)malloc((len + 1) * sizeof(char));
    current[len] = '\0'; // 确保字符串末尾有 '\0'

    backtrack(digits, 0, current, result, returnSize);

    free(current); // 释放临时存储
    return result;
}

// 测试函数
int main() {
    char digits[] = "23";
    int returnSize;
    char **combinations = letterCombinations(digits, &returnSize);

    printf("结果:\n");
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", combinations[i]);
        free(combinations[i]); // 释放结果内存
    }
    free(combinations); // 释放结果数组

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {}; // 如果输入为空，直接返回空向量

        // 数字到字母的映射
        vector<string> digit_to_letters = {
            "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        };

        vector<string> result; // 保存所有的组合结果
        string current;        // 保存当前组合
        backtrack(digits, 0, digit_to_letters, current, result);
        return result;
    }

private:
    void backtrack(const string &digits, int index, const vector<string> &digit_to_letters,
                   string &current, vector<string> &result) {
        if (index == digits.size()) { // 如果已经处理完所有数字
            result.push_back(current); // 保存当前组合
            return;
        }

        const string &letters = digit_to_letters[digits[index] - '0'];
        for (char letter : letters) { // 遍历当前数字对应的字母
            current.push_back(letter);            // 添加当前字母
            backtrack(digits, index + 1, digit_to_letters, current, result); // 递归处理下一个数字
            current.pop_back();                   // 回溯，移除当前字母
        }
    }
};

int main() {
    Solution solution;
    string digits = "23";
    vector<string> combinations = solution.letterCombinations(digits);

    cout << "结果:" << endl;
    for (const string &combination : combinations) {
        cout << combination << endl;
    }

    return 0;
}
```

---

### 说明

**C语言版本**：
- 使用递归和回溯来遍历每种可能的组合。
- 将结果保存到一个动态分配的二维字符数组中，确保内存分配和释放。

**C++版本**：
- 使用 STL 容器（如 `vector` 和 `string`）来管理动态结果。
- 借助 `backtrack` 函数递归生成所有组合。
- `main` 函数演示了如何调用解决方案并输出结果。