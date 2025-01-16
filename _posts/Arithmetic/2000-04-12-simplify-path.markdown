---
layout: post
title:  "71. 简化路径"
categories: arithmetic
---

[71. 简化路径](https://leetcode.cn/problems/simplify-path)

### 题目要求：

给定一个字符串 `path` ，表示一个 Unix 风格的文件路径，简化该路径。

#### 规则：
- 你需要处理 `path` 中的点 (`.`) 和双点 (`..`)。
  - `"."` 表示当前目录，不改变路径。
  - `".."` 表示返回上一级目录，如果当前已经是根目录，则不改变路径。
  - 任何其他的路径段（即不包含点的部分）都表示一个目录名称，保留该部分。
- 你需要返回最终简化的绝对路径。

#### 示例：

**示例 1**：
```
输入: path = "/home/../usr//bin/./test"
输出: "/usr/bin/test"
解释: 
- "/home/.." 表示返回到 "/"
- "/usr" 是一个有效目录。
- "//" 是冗余的，只保留一个 "/"
- "/bin/./test" 表示 "test" 是 "bin" 下的一个目录，不需要改变
```

**示例 2**：
```
输入: path = "/a/./b/../../c/"
输出: "/c"
解释: 
- "/a/./b" 先到 "b" 目录。
- "../../" 表示返回到根目录，然后进入 "/c"。
```

**示例 3**：
```
输入: path = "/../"
输出: "/"
解释: 
- ".." 返回到根目录，但根目录没有更高的目录可以返回，所以返回 "/"
```

#### 提示：
- `1 <= path.length <= 3000`
- `path` 由小写字母，数字，`/`，`.` 和 `..` 组成。

### 解题思路：

我们可以使用栈来实现路径的简化。详细步骤如下：

1. **分割路径**：首先将路径字符串按 `/` 分割，得到路径的各个部分（包括 `"."`, `".."`, 以及普通的目录名）。
   
2. **处理各个部分**：
   - 如果部分是 `"."`，我们跳过，因为它表示当前目录，不需要改变路径。
   - 如果部分是 `".."`，我们将栈顶元素弹出，表示返回上一级目录。如果栈为空，表示已经在根目录，不能返回上级，因此忽略该 `".."`。
   - 其他部分则是有效的目录名，将其压入栈中。

3. **构造最终路径**：栈中保存的就是简化后的路径部分，最后将栈中的部分连接起来，形成最终的路径。

4. **处理特殊情况**：如果最终栈为空，则返回根目录 `/`。

### C语言实现：

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* simplifyPath(char* path) {
    // 使用栈来存储路径部分
    char* stack[1000];
    int top = -1;  // 栈顶指针
    
    // 分割路径
    char* token = strtok(path, "/");
    
    while (token != NULL) {
        if (strcmp(token, ".") == 0 || strlen(token) == 0) {
            // "." 表示当前目录，或者空路径部分（多个"/"的情况），跳过
        } else if (strcmp(token, "..") == 0) {
            // ".." 表示返回上级目录，如果栈不为空就弹出栈顶元素
            if (top >= 0) {
                top--;
            }
        } else {
            // 普通目录名称，压入栈中
            stack[++top] = token;
        }
        token = strtok(NULL, "/");
    }
    
    // 如果栈为空，返回根目录 "/"
    if (top == -1) {
        return "/";
    }

    // 拼接最终的简化路径
    char* result = (char*)malloc(1000 * sizeof(char));
    result[0] = '\0';  // 初始化空字符串
    for (int i = 0; i <= top; i++) {
        strcat(result, "/");
        strcat(result, stack[i]);
    }
    
    return result;
}

int main() {
    char path[] = "/home/../usr//bin/./test";
    char* result = simplifyPath(path);
    printf("Simplified Path: %s\n", result);
    free(result);  // 释放内存
    return 0;
}
```

### C++实现：

```cpp
#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    string simplifyPath(string path) {
        vector<string> stack;
        stringstream ss(path);
        string token;
        
        // 分割路径并处理每个部分
        while (getline(ss, token, '/')) {
            if (token == "." || token.empty()) {
                // "." 表示当前目录，空字符串是由于多个 "/" 导致的，跳过
                continue;
            } else if (token == "..") {
                // ".." 表示返回上级目录，如果栈不为空就弹出栈顶元素
                if (!stack.empty()) {
                    stack.pop_back();
                }
            } else {
                // 普通目录，压入栈
                stack.push_back(token);
            }
        }
        
        // 如果栈为空，表示路径为根目录
        if (stack.empty()) {
            return "/";
        }
        
        // 构建简化后的路径
        string result = "";
        for (const string& dir : stack) {
            result += "/" + dir;
        }
        
        return result;
    }
};

int main() {
    Solution solution;
    string path = "/home/../usr//bin/./test";
    string result = solution.simplifyPath(path);
    cout << "Simplified Path: " << result << endl;
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **栈的使用**：我们使用一个数组 `stack` 来模拟栈，`top` 用于表示栈顶的索引。
2. **路径分割**：通过 `strtok` 函数将输入的路径字符串按 `/` 分割成各个部分。
3. **路径部分处理**：
   - 如果当前部分是 `"."` 或者空字符串（由于多余的 `/`），我们跳过。
   - 如果当前部分是 `".."`，我们弹出栈顶元素，表示返回上一级目录。
   - 否则，当前部分是一个有效的目录名，我们将其压入栈中。
4. **最终路径拼接**：最后将栈中保存的各个目录部分连接起来，形成最终的简化路径。如果栈为空，返回根目录 `/`。

#### C++实现：
1. **栈的使用**：我们使用 `vector<string>` 来模拟栈，`vector` 自动管理内存，不需要手动处理栈的大小。
2. **路径分割**：使用 `stringstream` 和 `getline` 方法按 `/` 分割路径，并逐个处理路径部分。
3. **路径部分处理**：与 C 语言实现相同，处理 `"."`、`".."` 和普通目录名。
4. **最终路径拼接**：将栈中的部分通过 `"/"` 连接起来，如果栈为空，则返回根目录 `/`。

### 时间和空间复杂度：
- **时间复杂度**：O(n)，其中 `n` 是路径字符串的长度。我们需要遍历每个字符来分割路径并处理每个部分。
- **空间复杂度**：O(n)，最坏情况下，我们需要存储整个路径的各个部分。

### 示例输出：
```
Simplified Path: /usr/bin/test
```

