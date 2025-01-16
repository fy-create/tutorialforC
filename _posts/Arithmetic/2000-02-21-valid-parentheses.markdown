---
layout: post
title:  "20. 有效的括号"
categories: arithmetic
---

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses)

### 题目：有效的括号 (Valid Parentheses)

#### 题目要求：
给定一个字符串 `s`，只包含字符 `'(', ')', '{', '}', '[', ']'`，判断字符串是否有效。有效字符串需满足：
- 左括号必须用相同类型的右括号闭合。
- 左括号必须以正确的顺序闭合。

#### 示例 1：
```
输入：s = "()"
输出：true
```

#### 示例 2：
```
输入：s = "()[]{}"
输出：true
```

#### 示例 3：
```
输入：s = "(]"
输出：false
```

#### 示例 4：
```
输入：s = "([)]"
输出：false
```

#### 示例 5：
```
输入：s = "{[]}"
输出：true
```

#### 提示：
- `1 <= s.length <= 10^4`
- `s` 仅由 `'(', ')', '{', '}', '[', ']'` 组成。

---

### 解题思路：

这个问题是典型的栈（stack）应用问题。我们通过栈来记录当前的左括号，遇到右括号时，检查栈顶的元素是否与之匹配。如果匹配，则弹出栈顶元素，继续检查下一个字符；如果不匹配，则说明括号不合法，返回 `false`。最后如果栈为空，说明所有的括号都匹配成功，返回 `true`，否则返回 `false`。

**具体步骤：**
1. 遍历字符串的每个字符。
2. 如果字符是左括号（`'('`, `'{'`, `'['`），则将其压入栈中。
3. 如果字符是右括号（`')'`, `'}'`, `']'`），则检查栈顶的元素：
   - 如果栈为空，说明没有左括号与之匹配，返回 `false`。
   - 否则弹出栈顶元素，检查是否匹配当前的右括号。如果不匹配，返回 `false`。
4. 最后遍历结束后，如果栈为空，说明括号匹配成功，返回 `true`，否则返回 `false`。

### C 语言解法：

```c
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

// 用于栈的结构体
typedef struct {
    char *data;
    int top;
    int capacity;
} Stack;

// 初始化栈
Stack* initStack(int capacity) {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->data = (char*)malloc(sizeof(char) * capacity);
    stack->top = -1;
    stack->capacity = capacity;
    return stack;
}

// 栈为空
bool isEmpty(Stack* stack) {
    return stack->top == -1;
}

// 压栈
void push(Stack* stack, char c) {
    stack->data[++(stack->top)] = c;
}

// 弹栈
char pop(Stack* stack) {
    return stack->data[(stack->top)--];
}

// 获取栈顶元素
char peek(Stack* stack) {
    return stack->data[stack->top];
}

// 判断括号是否合法
bool isValid(char* s) {
    int len = strlen(s);
    Stack* stack = initStack(len);
    
    for (int i = 0; i < len; i++) {
        char c = s[i];
        
        if (c == '(' || c == '{' || c == '[') {
            push(stack, c);
        } else {
            if (isEmpty(stack)) return false;
            char top = pop(stack);
            if ((c == ')' && top != '(') || (c == '}' && top != '{') || (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    
    bool result = isEmpty(stack);
    free(stack->data);
    free(stack);
    return result;
}

int main() {
    char s[] = "()[]{}";
    if (isValid(s)) {
        printf("true\n");
    } else {
        printf("false\n");
    }
    return 0;
}
```

### 代码解释：

1. **栈的实现**：
   - 通过一个结构体 `Stack` 来模拟栈。栈包含一个动态数组 `data`，一个 `top` 表示栈顶索引，`capacity` 表示栈的容量。
   - `initStack()` 用于初始化栈，`push()` 用于将元素压入栈中，`pop()` 用于弹出栈顶元素，`peek()` 获取栈顶元素。

2. **isValid() 函数**：
   - 遍历字符串中的每个字符，如果是左括号则压入栈中，如果是右括号则与栈顶元素匹配。
   - 如果遍历结束后栈为空，说明所有括号都匹配成功，返回 `true`，否则返回 `false`。

3. **主函数**：
   - 在 `main()` 函数中，调用 `isValid()` 函数检查给定字符串的括号是否合法，并输出结果。

---

### C++ 解法：

```cpp
#include <iostream>
#include <stack>
#include <unordered_map>

using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> map = { {')', '('}, {'}', '{'}, {']', '['} };
        
        for (char c : s) {
            if (map.count(c)) {
                // 如果是右括号，检查栈顶元素
                if (st.empty() || st.top() != map[c]) {
                    return false;
                }
                st.pop();
            } else {
                // 如果是左括号，压栈
                st.push(c);
            }
        }
        
        // 如果栈为空，说明括号完全匹配
        return st.empty();
    }
};

int main() {
    Solution solution;
    string s = "()[]{}";
    if (solution.isValid(s)) {
        cout << "true" << endl;
    } else {
        cout << "false" << endl;
    }
    return 0;
}
```

### 代码解释：

1. **栈的使用**：
   - 使用 `stack<char>` 来模拟栈操作，简化了栈的管理，避免了手动管理栈的大小。
   - `unordered_map<char, char>` 用于存储右括号和对应的左括号的映射关系，简化了匹配操作。

2. **isValid() 函数**：
   - 对于每个字符，如果是右括号，检查栈顶是否有对应的左括号，如果不匹配则返回 `false`。
   - 如果是左括号，直接将其压入栈中。
   - 遍历结束后，栈为空则表示所有括号匹配成功，返回 `true`，否则返回 `false`。

3. **主函数**：
   - 在 `main()` 函数中，调用 `isValid()` 函数检查字符串的合法性，并输出结果。

---

### 时间复杂度：
- **时间复杂度**：`O(n)`，其中 `n` 是字符串的长度。我们只需要遍历字符串一次，栈操作是常数时间。
- **空间复杂度**：`O(n)`，栈的空间复杂度是 `O(n)`，最坏情况下栈中可能存放所有字符。

### 边界条件：
- 字符串为空，直接返回 `true`。
- 遇到不匹配的括号时，立即返回 `false`。

### 示例输出：
```
true
```