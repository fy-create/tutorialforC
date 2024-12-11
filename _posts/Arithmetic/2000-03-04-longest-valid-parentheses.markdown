---
layout: post
title:  "32. 最长有效括号"
categories: arithmetic
---

[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses)

### 题目描述：
给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

**示例：**

**输入：** "(()"

**输出：** 2

**输入：** ")()())"

**输出：** 4

**输入：** ""

**输出：** 0

### 解题思路：

1. **动态规划法：**
   - 定义一个数组 `dp`，其中 `dp[i]` 表示以 `i` 结尾的最长有效括号长度。
   - 遍历字符串：
     - 如果当前字符为 `)` 且前一个字符为 `(`，更新 `dp[i] = dp[i-2] + 2`。
     - 如果当前字符为 `)` 且前一个字符为 `)`，检查 `i - dp[i-1] - 1` 是否为 `(`，然后更新 `dp[i]`。

2. **栈法：**
   - 使用栈存储索引。
   - 遍历字符串：
     - 遇到 `(`，将其索引入栈。
     - 遇到 `)`，弹出栈顶元素并计算当前有效长度。

3. **双指针法：**
   - 使用两个计数器 `left` 和 `right` 分别记录左括号和右括号的数量。
   - 从左到右扫描，记录 `left == right` 时的最长长度。
   - 从右到左扫描，记录 `left == right` 时的最长长度。

4. **时间复杂度和空间复杂度：**
   - 时间复杂度：O(n)。
   - 空间复杂度：动态规划和栈法为 O(n)，双指针法为 O(1)。

```c
#include <stdio.h>
#include <string.h>

int longestValidParentheses(char* s) {
    int maxLength = 0;
    int stack[strlen(s) + 1]; // 模拟栈
    int top = -1;
    stack[++top] = -1; // 初始值

    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == '(') {
            stack[++top] = i; // 入栈
        } else {
            top--; // 弹出栈顶
            if (top == -1) {
                stack[++top] = i; // 更新基础索引
            } else {
                int currentLength = i - stack[top];
                if (currentLength > maxLength) {
                    maxLength = currentLength;
                }
            }
        }
    }

    return maxLength;
}

int main() {
    char s1[] = "(()";
    char s2[] = ")()())";
    char s3[] = "";

    printf("输入: %s, 输出: %d\n", s1, longestValidParentheses(s1));
    printf("输入: %s, 输出: %d\n", s2, longestValidParentheses(s2));
    printf("输入: %s, 输出: %d\n", s3, longestValidParentheses(s3));

    return 0;
}
```

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> stk;
        stk.push(-1); // 初始值
        int maxLength = 0;

        for (int i = 0; i < s.size(); i++) {
            if (s[i] == '(') {
                stk.push(i); // 入栈
            } else {
                stk.pop(); // 弹出栈顶
                if (stk.empty()) {
                    stk.push(i); // 更新基础索引
                } else {
                    maxLength = max(maxLength, i - stk.top());
                }
            }
        }

        return maxLength;
    }
};

int main() {
    Solution sol;
    cout << "输入: (()，输出: " << sol.longestValidParentheses("(()") << endl;
    cout << "输入: )()())，输出: " << sol.longestValidParentheses(")()())") << endl;
    cout << "输入: ，输出: " << sol.longestValidParentheses("") << endl;

    return 0;
}
```
