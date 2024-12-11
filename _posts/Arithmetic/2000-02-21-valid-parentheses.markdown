---
layout: post
title:  "20. 有效的括号"
categories: arithmetic
---

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses)


### 题目描述：
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

**示例：**

**输入：** "()"
**输出：** true

**输入：** "()[]{}"
**输出：** true

**输入：** "(]"
**输出：** false

**输入：** "([)]"
**输出：** false

**输入：** "{[]}"
**输出：** true

### 解题思路：

1. **使用栈的数据结构**：
   - 栈可以帮助我们追踪最近未闭合的左括号。
   - 当遇到右括号时，检查栈顶是否是对应的左括号。

2. **算法步骤**：
   - 初始化一个空栈。
   - 遍历字符串中的每个字符：
     - 如果是左括号（'('、'{'、'['），将其压入栈中。
     - 如果是右括号（')'、'}'、']'）：
       - 检查栈是否为空：如果为空，直接返回 `false`，表示没有匹配的左括号。
       - 弹出栈顶元素并检查是否匹配当前右括号：
         - 如果匹配，继续处理下一个字符。
         - 如果不匹配，返回 `false`。
   - 遍历结束后，检查栈是否为空：
     - 如果为空，说明所有括号匹配，返回 `true`。
     - 如果不为空，说明有未闭合的左括号，返回 `false`。

3. **时间和空间复杂度**：
   - 时间复杂度：O(n)，其中 n 是字符串的长度。每个字符最多被压栈和弹栈一次。
   - 空间复杂度：O(n)，最坏情况下栈的大小与字符串的长度相同。


```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

bool isValid(char* s) {
    char *stack = (char *)malloc(strlen(s) + 1);
    int top = -1;

    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c; // 左括号入栈
            printf("入栈: %c\n", c); // 调试日志
        } else {
            if (top == -1) {
                free(stack);
                printf("栈为空，未匹配右括号: %c\n", c); // 调试日志
                return false;
            }
            char topChar = stack[top--]; // 弹出栈顶元素
            printf("匹配: %c 和 %c\n", topChar, c); // 调试日志
            if ((c == ')' && topChar != '(') ||
                (c == '}' && topChar != '{') ||
                (c == ']' && topChar != '[')) {
                free(stack);
                return false;
            }
        }
    }

    bool isValid = (top == -1);
    printf("栈是否为空: %s\n", isValid ? "是" : "否"); // 调试日志
    free(stack);
    return isValid;
}

int main() {
    char *testCases[] = {"()", "()[]{}", "(]", "([)]", "{[]}"};
    int numCases = sizeof(testCases) / sizeof(testCases[0]);

    for (int i = 0; i < numCases; i++) {
        printf("测试: %s\n", testCases[i]);
        printf("结果: %s\n", isValid(testCases[i]) ? "true" : "false");
        printf("-------------------\n");
    }

    return 0;
}
```

```cpp
#include <iostream>
#include <stack>
#include <unordered_map>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        unordered_map<char, char> matchingBrackets = {
            {')', '('},
            {'}', '{'},
            {']', '['}
        };
        stack<char> stk;

        for (char c : s) {
            // 检查是否是右括号
            if (matchingBrackets.count(c)) {
                char topElement = stk.empty() ? '#' : stk.top();
                if (!stk.empty()) stk.pop(); // 弹出栈顶元素

                // 日志：匹配信息
                cout << "匹配: " << topElement << " 和 " << c << endl;

                if (topElement != matchingBrackets[c]) {
                    return false;
                }
            } else {
                // 左括号直接入栈
                stk.push(c);
                // 日志：左括号入栈
                cout << "入栈: " << c << endl;
            }
        }

        // 日志：检查栈是否为空
        cout << "栈是否为空: " << (stk.empty() ? "是" : "否") << endl;

        return stk.empty();
    }
};

int main() {
    vector<string> testCases = {"()", "()[]{}", "(]", "([)]", "{[]}"};
    Solution sol;

    for (const string& test : testCases) {
        cout << "测试: " << test << endl;
        cout << "结果: " << (sol.isValid(test) ? "true" : "false") << endl;
        cout << "-------------------" << endl;
    }

    return 0;
}
```

