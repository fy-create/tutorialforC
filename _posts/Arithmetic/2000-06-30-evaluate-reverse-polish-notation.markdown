---
layout: post
title:  "150. 逆波兰表达式求值"
categories: arithmetic
---

[150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation)

### 题目描述

**逆波兰表达式求值**

根据 **逆波兰表示法**（后缀表达式）求表达式的值。

有效的运算符包括 `+`、`-`、`*`、`/`。每个运算对象可能是整数，也可能是另一个逆波兰表达式。

**说明：**

- 两个整数之间的除法应当截断为整数，例如 `8/3 = 2`，`-7/3 = -2`。
- 给定的逆波兰表达式总是有效的。
- 表达式中不存在除数为零的情况。

**示例 1：**

```
输入：tokens = ["2","1","+","3","*"]
输出：9
解释：((2 + 1) * 3) = 9
```

**示例 2：**

```
输入：tokens = ["4","13","5","/","+"]
输出：6
解释：(4 + (13 / 5)) = 6
```

**示例 3：**

```
输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释： 
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= 0 + 17 + 5
= 22
```

**提示：**

- `1 <= tokens.length <= 10^4`
- `tokens[i]` 是一个算符 `"+"`、`"-"`、`"*"` 或 `"/"`，或者是一个表示整数的字符串，范围是 `[-200, 200]`

### 解题思路

逆波兰表达式（后缀表达式）是一种算术表达式表示方法，其中运算符位于其操作数之后。评估逆波兰表达式可以使用 **栈** 数据结构，具体步骤如下：

1. **初始化一个空栈**。

2. **遍历逆波兰表达式的每一个元素**：
   - **如果当前元素是一个数**，将其压入栈中。
   - **如果当前元素是一个运算符**，则从栈中弹出两个数（假设为 `a` 和 `b`，其中 `b` 是先弹出的），计算 `a` 与 `b` 的运算结果，然后将结果压回栈中。

3. **遍历结束后，栈中最后剩下的元素即为表达式的结果**。

**处理负数和除法的注意事项**：
- 在C语言中处理字符串转整数时，需要正确处理负数。
- 除法操作需要注意符号和截断方向，确保结果符合题意（即向零截断）。

**时间复杂度分析**：
- 每个元素最多被压入和弹出栈一次，因此时间复杂度为 **O(n)**，其中 `n` 是表达式的长度。

**空间复杂度分析**：
- 最多需要存储所有的数，因此空间复杂度为 **O(n)**。

### C语言解答

以下是基于栈的C语言实现，包含详细注释。为了处理逆波兰表达式中的运算，我们使用了一个动态栈来存储操作数，并在遇到运算符时进行相应的计算。

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// 定义栈结构体
typedef struct {
    int* data;      // 栈的数据存储
    int top;        // 栈顶指针
    int capacity;   // 栈的容量
} Stack;

// 初始化栈
Stack* initStack(int capacity) {
    Stack* stack = (Stack*)malloc(sizeof(Stack));
    stack->data = (int*)malloc(capacity * sizeof(int));
    stack->top = -1;
    stack->capacity = capacity;
    return stack;
}

// 压栈操作
void push(Stack* stack, int val) {
    // 如果栈满，动态扩展栈容量
    if(stack->top + 1 >= stack->capacity){
        stack->capacity *= 2;
        stack->data = (int*)realloc(stack->data, stack->capacity * sizeof(int));
    }
    stack->data[++stack->top] = val;
}

// 弹栈操作
int pop(Stack* stack) {
    if(stack->top == -1){
        // 栈空，返回0（根据题意，输入总是有效）
        return 0;
    }
    return stack->data[stack->top--];
}

// 释放栈内存
void freeStack(Stack* stack){
    free(stack->data);
    free(stack);
}

// 判断是否为运算符
int isOperator(char* token){
    return (strlen(token) == 1) && (token[0] == '+' || token[0] == '-' || token[0] == '*' || token[0] == '/');
}

// 转换字符串为整数，处理负数
int strToInt(char* token){
    int num = 0;
    int sign = 1;
    int i = 0;
    if(token[0] == '-'){
        sign = -1;
        i = 1;
    }
    for(; token[i] != '\0'; i++){
        if(isdigit(token[i])){
            num = num * 10 + (token[i] - '0');
        }
    }
    return sign * num;
}

// 计算两个数的运算结果
int compute(int a, int b, char op){
    switch(op){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
            // C语言中整数除法向零截断
            return a / b;
        default: return 0;
    }
}

// 主函数：计算逆波兰表达式的值
int evalRPN(char** tokens, int tokensSize) {
    // 初始化栈，初始容量为tokensSize的一半，避免频繁扩容
    Stack* stack = initStack(tokensSize > 0 ? tokensSize : 1);
    
    for(int i = 0; i < tokensSize; i++){
        char* token = tokens[i];
        if(isOperator(token)){
            // 弹出两个操作数
            int b = pop(stack);
            int a = pop(stack);
            // 计算结果并压回栈中
            int res = compute(a, b, token[0]);
            push(stack, res);
        }
        else{
            // 转换为整数并压入栈中
            int num = strToInt(token);
            push(stack, num);
        }
    }
    
    // 最终栈顶元素即为结果
    int result = pop(stack);
    freeStack(stack);
    return result;
}

// 创建测试用例的二维数组
char** createTokens(char* arr[], int size){
    char** tokens = (char**)malloc(size * sizeof(char*));
    for(int i = 0; i < size; i++){
        tokens[i] = strdup(arr[i]);
    }
    return tokens;
}

// 释放测试用例的内存
void freeTokens(char** tokens, int size){
    for(int i = 0; i < size; i++){
        free(tokens[i]);
    }
    free(tokens);
}

// 简单的主函数测试
int main(){
    // 示例 1
    char* arr1[] = {"2","1","+","3","*"};
    int size1 = 5;
    char** tokens1 = createTokens(arr1, size1);
    printf("示例 1: %d\n", evalRPN(tokens1, size1));
    freeTokens(tokens1, size1);
    
    // 示例 2
    char* arr2[] = {"4","13","5","/","+"};
    int size2 = 5;
    char** tokens2 = createTokens(arr2, size2);
    printf("示例 2: %d\n", evalRPN(tokens2, size2));
    freeTokens(tokens2, size2);
    
    // 示例 3
    char* arr3[] = {"10","6","9","3","+","-11","*","/","*","17","+","5","+"};
    int size3 = 13;
    char** tokens3 = createTokens(arr3, size3);
    printf("示例 3: %d\n", evalRPN(tokens3, size3));
    freeTokens(tokens3, size3);
    
    return 0;
}
```

**代码说明：**

1. **栈的实现：**
   - 使用结构体 `Stack` 来模拟栈，包含动态数组、栈顶指针和栈的容量。
   - `initStack` 函数用于初始化栈。
   - `push` 函数用于压栈，自动扩容以适应更多元素。
   - `pop` 函数用于弹栈，返回栈顶元素。
   - `freeStack` 函数用于释放栈的内存。

2. **辅助函数：**
   - `isOperator` 判断一个字符串是否为运算符。
   - `strToInt` 将字符串转换为整数，正确处理负数。
   - `compute` 根据运算符计算两个操作数的结果。

3. **主逻辑：**
   - 遍历每个 token：
     - 如果是运算符，弹出栈顶两个元素，进行相应的运算，并将结果压回栈中。
     - 如果是数字，将其转换为整数并压入栈中。
   - 最后，栈顶的元素即为表达式的结果。

4. **测试函数：**
   - `createTokens` 函数用于创建测试用例的二维数组。
   - `freeTokens` 函数用于释放测试用例的内存。
   - 在 `main` 函数中，测试了三个示例，输出结果应与预期一致。

**输出结果：**

```
示例 1: 9
示例 2: 6
示例 3: 22
```

### C++ 解答

以下是基于栈的C++实现，使用了 `std::vector` 作为栈的实现，利用了C++标准库的优势，使代码更加简洁和高效。

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <stack>
#include <cstdlib>
using namespace std;

// Solution 类
class Solution {
public:
    // 计算两个数的运算结果
    int compute(int a, int b, char op){
        switch(op){
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                // C++中整数除法也向零截断
                return a / b;
            default: return 0;
        }
    }
    
    // 主函数：计算逆波兰表达式的值
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for(auto &token : tokens){
            if(token == "+" || token == "-" || token == "*" || token == "/"){
                if(st.size() < 2) return 0; // 根据题意，表达式总是有效
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                int res = compute(a, b, token[0]);
                st.push(res);
            }
            else{
                // 转换为整数并压入栈中
                int num = stoi(token);
                st.push(num);
            }
        }
        return st.top();
    }
};

// 创建测试用例的向量
vector<string> createTokens(vector<string> arr){
    return arr;
}

// 简单的主函数测试
int main(){
    Solution solution;
    
    // 示例 1
    vector<string> tokens1 = {"2","1","+","3","*"};
    cout << "示例 1: " << solution.evalRPN(tokens1) << endl;
    
    // 示例 2
    vector<string> tokens2 = {"4","13","5","/","+"};
    cout << "示例 2: " << solution.evalRPN(tokens2) << endl;
    
    // 示例 3
    vector<string> tokens3 = {"10","6","9","3","+","-11","*","/","*","17","+","5","+"};
    cout << "示例 3: " << solution.evalRPN(tokens3) << endl;
    
    return 0;
}
```

**代码说明：**

1. **栈的使用：**
   - 利用 `std::stack<int>` 作为栈来存储操作数。
   - 遍历每个 token：
     - 如果是运算符，弹出栈顶两个元素，进行相应的运算，并将结果压回栈中。
     - 如果是数字，使用 `std::stoi` 将其转换为整数并压入栈中。

2. **辅助函数：**
   - `compute` 函数根据运算符计算两个操作数的结果。

3. **主逻辑：**
   - 遍历每个 token，并根据是否为运算符进行相应的操作。
   - 最后，栈顶的元素即为表达式的结果。

4. **测试函数：**
   - 在 `main` 函数中，测试了三个示例，输出结果应与预期一致。

**输出结果：**

```
示例 1: 9
示例 2: 6
示例 3: 22
```

### 总结

本题通过使用 **栈** 数据结构，能够高效地评估逆波兰表达式。具体方法如下：

1. **遍历表达式**：
   - 遇到数字时，将其压入栈中。
   - 遇到运算符时，弹出栈顶的两个数字，进行相应的运算，并将结果压回栈中。

2. **处理负数和除法**：
   - 在C语言中，需要手动处理字符串到整数的转换，正确处理负号。
   - 在C++中，使用 `std::stoi` 可以简化转换过程。

3. **时间和空间复杂度**：
   - 时间复杂度为 **O(n)**，其中 `n` 是表达式的长度。
   - 空间复杂度为 **O(n)**，用于存储操作数。

通过以上方法，可以准确、高效地计算逆波兰表达式的值，满足题目的各种约束条件。

如果有进一步的问题或需要更多的解释，欢迎继续交流！