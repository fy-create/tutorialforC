---
layout: post
title:  "282. 给表达式添加运算符"
categories: arithmetic
---

[282. 给表达式添加运算符](https://leetcode.cn/problems/expression-add-operators)

### 题目描述

给定一个仅包含数字 `0-9` 的字符串 `num` 和一个目标值 `target`，在数字之间添加运算符（`+`、`-` 或 `*`）使得表达式的计算结果等于目标值 `target`。

返回所有能够达到目标值的表达式。

**注意：**
- 运算符不能改变数字的顺序。
- 数字中不允许出现前导零。例如，`"1+02"` 是不允许的，但 `"1+0+2"` 是允许的。

**示例 1：**

```
输入：num = "123", target = 6
输出：["1+2+3", "1*2*3"]
```

**示例 2：**

```
输入：num = "232", target = 8
输出：["2*3+2", "2+3*2"]
```

**示例 3：**

```
输入：num = "105", target = 5
输出：["1*0+5","10-5"]
```

**示例 4：**

```
输入：num = "00", target = 0
输出：["0+0", "0-0", "0*0"]
```

**示例 5：**

```
输入：num = "3456237490", target = 9191
输出：[]
```

**提示：**

- `1 <= num.length <= 10`
- `num` 仅含有数字。
- `-2^31 <= target <= 2^31 - 1`

---

### 解题思路

这道题要求在给定的数字字符串中插入运算符 `+`、`-` 和 `*`，以构造出所有可能的表达式，并且这些表达式的计算结果等于目标值 `target`。同时需要注意数字不能有前导零。

解题的关键是使用回溯算法，遍历每一种可能的运算符插入方式，并在构造表达式的同时计算其值。为了处理乘法运算的优先级，我们需要记录当前表达式中最后一个操作数的值，以便在遇到乘法时进行调整。

具体步骤如下：

1. **递归回溯**：从字符串的第一个字符开始，逐步选择不同长度的数字作为当前操作数，并尝试在其后插入不同的运算符。

2. **处理前导零**：如果当前数字有前导零（即数字长度大于1且以 '0' 开头），则跳过这种情况，避免生成无效的表达式。

3. **计算表达式的值**：
   - 对于加号和减号，直接将当前数字加到总和中，并记录最后一个操作数（用于处理乘法）。
   - 对于乘号，需要将最后一个操作数与当前数字相乘，然后调整总和。

4. **回溯终止条件**：当遍历完整个数字字符串时，检查当前表达式的总和是否等于目标值，如果是，则将该表达式添加到结果集中。

5. **优化**：为了提高效率，可以在构造表达式的同时计算其值，避免事后再进行计算。

通过以上步骤，我们可以枚举出所有可能的表达式，并筛选出符合条件的表达式。

---

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 动态数组结构，用于存储结果
typedef struct {
    char **data;
    int size;
    int capacity;
} Result;

// 初始化结果集
void initResult(Result *res) {
    res->capacity = 16;
    res->size = 0;
    res->data = (char **)malloc(res->capacity * sizeof(char *));
}

// 添加表达式到结果集
void addResult(Result *res, const char *expr) {
    if (res->size == res->capacity) {
        res->capacity *= 2;
        res->data = (char **)realloc(res->data, res->capacity * sizeof(char *));
    }
    res->data[res->size] = strdup(expr);
    res->size++;
}

// 释放结果集内存
void freeResult(Result *res) {
    for(int i = 0; i < res->size; i++) {
        free(res->data[i]);
    }
    free(res->data);
}

// 回溯函数
void backtrack(char *num, int target, int pos, long eval, long prev, char *path, int path_len, Result *res) {
    int len = strlen(num);
    
    // 当遍历到字符串末尾时，检查表达式是否满足目标
    if(pos == len) {
        if(eval == target) {
            path[path_len] = '\0';
            addResult(res, path);
        }
        return;
    }
    
    for(int i = pos; i < len; i++) {
        // 防止数字有前导零
        if(i != pos && num[pos] == '0') break;
        
        // 取出当前数字的子串
        int current_len = i - pos + 1;
        char current_str[20];
        strncpy(current_str, num + pos, current_len);
        current_str[current_len] = '\0';
        long current_num = atol(current_str);
        
        // 记录当前表达式长度
        int original_len = path_len;
        
        if(pos == 0) {
            // 首个数字，不需要添加运算符
            strcpy(path + path_len, current_str);
            backtrack(num, target, i + 1, current_num, current_num, path, path_len + current_len, res);
            path_len = original_len;
        }
        else {
            // 尝试加号
            path[path_len++] = '+';
            strcpy(path + path_len, current_str);
            backtrack(num, target, i + 1, eval + current_num, current_num, path, path_len + current_len, res);
            path_len = original_len;
            
            // 尝试减号
            path[path_len++] = '-';
            strcpy(path + path_len, current_str);
            backtrack(num, target, i + 1, eval - current_num, -current_num, path, path_len + current_len, res);
            path_len = original_len;
            
            // 尝试乘号
            path[path_len++] = '*';
            strcpy(path + path_len, current_str);
            backtrack(num, target, i + 1, eval - prev + prev * current_num, prev * current_num, path, path_len + current_len, res);
            path_len = original_len;
        }
    }
}

// 主函数
char **addOperators(char * num, int target, int* returnSize){
    Result res;
    initResult(&res);
    int len = strlen(num);
    char path[2 * len + 1]; // 存储表达式
    backtrack(num, target, 0, 0, 0, path, 0, &res);
    *returnSize = res.size;
    return res.data;
}

// 测试主函数
int main(){
    char num1[] = "123";
    int target1 = 6;
    int returnSize1;
    char **result1 = addOperators(num1, target1, &returnSize1);
    printf("输入: num = \"%s\", target = %d\n输出: [", num1, target1);
    for(int i = 0; i < returnSize1; i++) {
        printf("\"%s\"", result1[i]);
        if(i != returnSize1 -1) printf(", ");
    }
    printf("]\n");
    
    // 释放内存
    for(int i = 0; i < returnSize1; i++) {
        free(result1[i]);
    }
    free(result1);
    
    return 0;
}
```

---

### C++ 解答

```cpp
#include <bits/stdc++.h>
using namespace std;

// 类 Solution 包含主要的解题函数
class Solution {
public:
    // 返回所有符合条件的表达式
    vector<string> addOperators(string num, int target) {
        vector<string> results;
        string path;
        backtrack(num, target, 0, 0, 0, path, results);
        return results;
    }
    
private:
    // 回溯函数
    void backtrack(const string &num, int target, int pos, long eval, long prev, string &path, vector<string> &results) {
        int len = num.length();
        
        // 当遍历到字符串末尾时，检查表达式是否满足目标
        if(pos == len) {
            if(eval == target) {
                results.push_back(path);
            }
            return;
        }
        
        for(int i = pos; i < len; i++) {
            // 防止数字有前导零
            if(i != pos && num[pos] == '0') break;
            
            // 取出当前数字的子串
            string current_str = num.substr(pos, i - pos + 1);
            long current_num = stol(current_str);
            
            // 记录当前表达式长度
            int original_len = path.length();
            
            if(pos == 0) {
                // 首个数字，不需要添加运算符
                path += current_str;
                backtrack(num, target, i + 1, current_num, current_num, path, results);
                path.erase(original_len);
            }
            else {
                // 尝试加号
                path += "+";
                path += current_str;
                backtrack(num, target, i + 1, eval + current_num, current_num, path, results);
                path.erase(original_len);
                
                // 尝试减号
                path += "-";
                path += current_str;
                backtrack(num, target, i + 1, eval - current_num, -current_num, path, results);
                path.erase(original_len);
                
                // 尝试乘号
                path += "*";
                path += current_str;
                backtrack(num, target, i + 1, eval - prev + prev * current_num, prev * current_num, path, results);
                path.erase(original_len);
            }
        }
    }
};

// 简单的主函数调用示例
int main(){
    Solution sol;
    
    // 示例 1
    string num1 = "123";
    int target1 = 6;
    vector<string> result1 = sol.addOperators(num1, target1);
    cout << "输入: num = \"" << num1 << "\", target = " << target1 << "\n输出: [";
    for(int i = 0; i < result1.size(); i++) {
        cout << "\"" << result1[i] << "\"";
        if(i != result1.size() -1) cout << ", ";
    }
    cout << "]\n";
    
    // 示例 2
    string num2 = "232";
    int target2 = 8;
    vector<string> result2 = sol.addOperators(num2, target2);
    cout << "输入: num = \"" << num2 << "\", target = " << target2 << "\n输出: [";
    for(int i = 0; i < result2.size(); i++) {
        cout << "\"" << result2[i] << "\"";
        if(i != result2.size() -1) cout << ", ";
    }
    cout << "]\n";
    
    return 0;
}
```