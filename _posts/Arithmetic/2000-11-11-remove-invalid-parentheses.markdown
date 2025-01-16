---
layout: post
title:  "301. 删除无效的括号"
categories: arithmetic
---

[301. 删除无效的括号](https://leetcode.cn/problems/remove-invalid-parentheses)

Here is the content of the problem from Leetcode:

### 题目描述

给你一个字符串 `s` ，删除其中的无效括号，使得输入的字符串成为一个有效的括号字符串，并返回所有可能的结果。

有效括号字符串应当满足以下条件：

- 左括号必须以右括号闭合。
- 每个右括号都必须有一个对应的左括号。

**示例 1:**

输入：`"()())()"`  
输出：`["(())()", "()()()"]`

**示例 2:**

输入：`"(a)())()"`  
输出：`["(a())()", "(a)()()"]`

**示例 3:**

输入：`"()()"`  
输出：`["()()"]`

**提示：**

- 1 <= s.length <= 25
- s[i] 是 '('、')' 或小写字母

---

### 解题思路

这道题要求删除无效的括号，使得剩下的括号字符串是有效的。问题的核心是生成所有可能的有效括号字符串并返回。

我们可以通过 **广度优先搜索（BFS）** 的方式来解决这个问题。步骤如下：

1. **BFS 遍历**：我们从原始字符串开始，进行层级遍历。在每一层，我们都删除一个括号，并检查结果是否有效。
2. **有效性检查**：每当生成一个新字符串时，我们检查它是否是一个有效的括号字符串。有效的定义是：括号的左边一定要有一个对应的右边。
3. **去重**：为了避免重复的结果，我们使用一个集合来保存已访问的字符串，确保每个有效字符串只被处理一次。
4. **剪枝**：如果某个字符串已经是有效的括号字符串，那么我们不再继续删除。

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 判断一个字符串是否是有效的括号字符串
bool isValid(char *s) {
    int balance = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == '(') {
            balance++;
        } else if (s[i] == ')') {
            balance--;
        }
        if (balance < 0) {
            return false;  // 如果 balance 小于0，表示多余的右括号
        }
    }
    return balance == 0;  // 如果 balance 为0，表示括号匹配
}

// 生成所有可能的有效括号字符串
void removeInvalidParenthesesHelper(char *s, int start, int leftCount, int rightCount, int leftRemove, int rightRemove, char **result, int *returnSize) {
    if (leftRemove == 0 && rightRemove == 0) {
        // 如果没有剩余的删除任务，检查当前字符串是否有效
        if (isValid(s)) {
            result[*returnSize] = strdup(s);  // 记录有效的字符串
            (*returnSize)++;
        }
        return;
    }

    for (int i = start; i < strlen(s); i++) {
        if (i > start && s[i] == s[i - 1]) {
            continue;  // 跳过重复字符
        }
        if (leftRemove > 0 && s[i] == '(') {
            // 删除左括号
            char temp[strlen(s)];
            strncpy(temp, s, i);
            temp[i] = '\0';
            strcat(temp, s + i + 1);
            removeInvalidParenthesesHelper(temp, i, leftCount, rightCount, leftRemove - 1, rightRemove, result, returnSize);
        } else if (rightRemove > 0 && s[i] == ')') {
            // 删除右括号
            char temp[strlen(s)];
            strncpy(temp, s, i);
            temp[i] = '\0';
            strcat(temp, s + i + 1);
            removeInvalidParenthesesHelper(temp, i, leftCount, rightCount, leftRemove, rightRemove - 1, result, returnSize);
        }
    }
}

char** removeInvalidParentheses(char* s, int* returnSize) {
    int leftRemove = 0, rightRemove = 0;
    // 计算需要删除的左括号和右括号数量
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == '(') {
            leftRemove++;
        } else if (s[i] == ')') {
            if (leftRemove > 0) {
                leftRemove--;
            } else {
                rightRemove++;
            }
        }
    }

    char **result = (char **)malloc(100 * sizeof(char*));
    *returnSize = 0;
    removeInvalidParenthesesHelper(s, 0, 0, 0, leftRemove, rightRemove, result, returnSize);
    return result;
}

int main() {
    char s[] = "()())()";
    int returnSize = 0;
    char **result = removeInvalidParentheses(s, &returnSize);
    for (int i = 0; i < returnSize; i++) {
        printf("%s\n", result[i]);
    }
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>
#include <unordered_set>
#include <string>

using namespace std;

class Solution {
public:
    // 判断一个字符串是否有效
    bool isValid(const string &s) {
        int balance = 0;
        for (char c : s) {
            if (c == '(') balance++;
            if (c == ')') balance--;
            if (balance < 0) return false; // 如果有多余的右括号
        }
        return balance == 0; // 左右括号匹配
    }

    void removeInvalidParenthesesHelper(string s, int start, int leftCount, int rightCount, int leftRemove, int rightRemove, unordered_set<string> &result) {
        if (leftRemove == 0 && rightRemove == 0) {
            // 如果没有剩余的删除任务，检查当前字符串是否有效
            if (isValid(s)) {
                result.insert(s);  // 将有效的字符串加入结果集
            }
            return;
        }

        for (int i = start; i < s.size(); i++) {
            // 跳过重复字符
            if (i > start && s[i] == s[i - 1]) continue;

            if (leftRemove > 0 && s[i] == '(') {
                // 删除左括号
                string temp = s;
                temp.erase(i, 1);
                removeInvalidParenthesesHelper(temp, i, leftCount, rightCount, leftRemove - 1, rightRemove, result);
            } else if (rightRemove > 0 && s[i] == ')') {
                // 删除右括号
                string temp = s;
                temp.erase(i, 1);
                removeInvalidParenthesesHelper(temp, i, leftCount, rightCount, leftRemove, rightRemove - 1, result);
            }
        }
    }

    vector<string> removeInvalidParentheses(string s) {
        int leftRemove = 0, rightRemove = 0;
        // 计算需要删除的左括号和右括号数量
        for (char c : s) {
            if (c == '(') leftRemove++;
            else if (c == ')') {
                if (leftRemove > 0) leftRemove--;
                else rightRemove++;
            }
        }

        unordered_set<string> result;
        removeInvalidParenthesesHelper(s, 0, 0, 0, leftRemove, rightRemove, result);
        return vector<string>(result.begin(), result.end());
    }
};

int main() {
    Solution solution;
    string s = "()())()";
    vector<string> result = solution.removeInvalidParentheses(s);
    for (const string &str : result) {
        cout << str << endl;
    }
    return 0;
}
```

这两个解法都采用了回溯法来生成所有可能的有效括号字符串。在每一步中，我们删除一个括号，并检查当前字符串是否有效。如果是有效的，我们将其添加到结果集中。