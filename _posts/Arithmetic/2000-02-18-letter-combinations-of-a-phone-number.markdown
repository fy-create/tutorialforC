---
layout: post
title:  "17. 电话号码的字母组合"
categories: arithmetic
---

[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number)

**题目描述：**

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按任意顺序返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

| 数字 | 字母           |
| ---- | -------------- |
| 2    | abc            |
| 3    | def            |
| 4    | ghi            |
| 5    | jkl            |
| 6    | mno            |
| 7    | pqrs           |
| 8    | tuv            |
| 9    | wxyz           |

**示例：**

- **输入：** digits = "23"
  **输出：** ["ad","ae","af","bd","be","bf","cd","ce","cf"]

- **输入：** digits = ""
  **输出：** []

- **输入：** digits = "2"
  **输出：** ["a","b","c"]

**提示：**

- 0 <= digits.length <= 4
- digits[i] 是范围 ['2', '9'] 的一个数字。

**C语言解答：**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 数字到字母的映射
const char* mapping[] = {
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

// 递归函数，生成字母组合
void backtrack(char** combinations, int* returnSize, char* current, const char* digits, int index) {
    if (digits[index] == '\0') {
        combinations[*returnSize] = strdup(current);
        (*returnSize)++;
        return;
    }

    const char* letters = mapping[digits[index] - '0'];
    for (int i = 0; letters[i] != '\0'; i++) {
        current[index] = letters[i];
        backtrack(combinations, returnSize, current, digits, index + 1);
    }
}

// 主函数，返回所有可能的字母组合
char** letterCombinations(char* digits, int* returnSize) {
    *returnSize = 0;
    if (*digits == '\0') {
        return NULL;
    }

    int len = strlen(digits);
    int maxCombinations = 1;
    for (int i = 0; i < len; i++) {
        maxCombinations *= strlen(mapping[digits[i] - '0']);
    }

    char** combinations = (char**)malloc(maxCombinations * sizeof(char*));
    char* current = (char*)malloc((len + 1) * sizeof(char));
    current[len] = '\0';

    backtrack(combinations, returnSize, current, digits, 0);

    free(current);
    return combinations;
}

// 测试函数
int main() {
    char digits[] = "23";
    int returnSize;
    char** combinations = letterCombinations(digits, &returnSize);

    printf("输入: %s\n输出: [", digits);
    for (int i = 0; i < returnSize; i++) {
        printf("\"%s\"", combinations[i]);
        if (i < returnSize - 1) {
            printf(", ");
        }
        free(combinations[i]);
    }
    printf("]\n");

    free(combinations);
    return 0;
}
```

**代码解析：**

1. **映射定义：**
   - 使用数组 `mapping` 将数字 2-9 映射到对应的字母字符串。

2. **递归函数 `backtrack`：**
   - **参数：**
     - `combinations`：存储所有可能的字母组合的数组。
     - `returnSize`：当前已生成的组合数量。
     - `current`：当前生成的组合字符串。
     - `digits`：输入的数字字符串。
     - `index`：当前处理的数字索引。
   - **逻辑：**
     - 如果已处理完所有数字，将当前组合复制到 `combinations`，并增加 `returnSize`。
     - 否则，获取当前数字对应的字母集，遍历每个字母，递归处理下一个数字。

3. **主函数 `letterCombinations`：**
   - **参数：**
     - `digits`：输入的数字字符串。
     - `returnSize`：返回的组合数量。
   - **逻辑：**
     - 如果输入为空，返回 `NULL`。
     - 计算可能的最大组合数，分配内存。
     - 初始化当前组合字符串，调用递归函数生成所有组合。
     - 返回组合数组。

4. **测试函数 `main`：**
   - 测试输入 "23"，调用 `letterCombinations`，输出结果并释放内存。

**C++解答：**

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> letterCombinations(const string& digits) {
        if (digits.empty()) return {};

        vector<string> mapping = {
            "",    // 0
            "",    // 1
            "abc", // 2
            "def", // 3
            "ghi", // 4
            "jkl", // 5
            "mno", // 6
            "pqrs",// 7
            "tuv", // 8
            "wxyz" // 9
        };

        vector<string> result;
        string current;

        // 递归函数
        function<void(int)> backtrack = [&](int index) {
            if (index == digits.size()) {
                result.push_back(current);
                return;
            }

            string letters = mapping[digits[index] - '0'];
            for (char letter : letters) {
                current.push_back(letter);      // 添加当前字母
                backtrack(index + 1);          // 递归处理下一个数字
                current.pop_back();            // 回溯，移除当前字母
            }
        };

        backtrack(0);
        return result;
    }
};

// 测试函数
int main() {
    Solution solution;
    string digits = "23";
    vector<string> combinations = solution.letterCombinations(digits);

    cout << "输入: " << digits << "\n输出: [";
    for (int i = 0; i < combinations.size(); i++) {
        cout << "\"" << combinations[i] << "\"";
        if (i < combinations.size() - 1) cout << ", ";
    }
    cout << "]" << endl;

    return 0;
}
```

---

### 代码解析

#### 1. 使用映射
- `mapping` 数组将数字 `2-9` 映射到对应的字母集，例如 `2 -> "abc"`，`3 -> "def"`。
- 对于输入字符串的每个数字，可以直接查表获取对应字母集。

#### 2. 递归回溯
- 使用递归函数 `backtrack` 实现回溯算法：
  - **终止条件**：当 `index` 等于 `digits.size()`，表示已处理完所有数字，保存当前组合。
  - **遍历当前数字的字母集**：对每个字母递归处理下一个数字，并在递归完成后回溯（移除当前字母）。
  
#### 3. 返回结果
- 所有生成的组合保存在 `result` 向量中，最终返回。

#### 4. 测试
- 主函数测试输入 `digits = "23"`，调用 `letterCombinations` 函数并打印结果。

---

### 示例运行

#### 输入：
```text
digits = "23"
```

#### 输出：
```text
输入: 23
输出: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
```

---

### 时间复杂度和空间复杂度

1. **时间复杂度**：O(3ⁿ×4ᵐ)  
   - `n` 是映射到 3 个字母的数字（如 2、3、4、5、6、8）。
   - `m` 是映射到 4 个字母的数字（如 7、9）。
   - 递归会生成所有可能的组合。

2. **空间复杂度**：O(n)  
   - 递归深度等于输入字符串长度。

---

### 总结

- **C语言版本**：使用字符数组和递归实现，注重内存管理，适合初学者理解。
- **C++版本**：利用 STL 容器（`vector` 和 `string`）和现代编程技术（如 `std::function` 和回溯）简化代码，提升可读性和扩展性。