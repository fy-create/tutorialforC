---
layout: post
title:  "93. 复原 IP 地址"
categories: arithmetic
---

[93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses)

### 题目描述

给定一个仅由数字组成的字符串 `s`，包含 `s.length` 个字符。返回所有可能的有效 IP 地址，这些地址可以通过在 `s` 中插入 `.` 来形成。你不能重新排列或删除 `s` 中的任何数字。你可以按任何顺序返回答案。

有效 IP 地址 正好由四个整数部分组成，且每个整数部分满足以下条件：

- 0 到 255 之间。
- 不能有前导零。例如，"0.1.2.201" 是有效的，但 "0.011.255.245" 是无效的，因为 `"011"` 有前导零。

**示例 1：**

```
输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
```

**示例 2：**

```
输入：s = "0000"
输出：["0.0.0.0"]
```

**示例 3：**

```
输入：s = "1111"
输出：["1.1.1.1"]
```

**示例 4：**

```
输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
```

**示例 5：**

```
输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

**提示：**

- `1 <= s.length <= 20`
- `s` 仅由数字组成

### 解题思路

要生成所有可能的有效 IP 地址，可以使用回溯（Backtracking）的方法。IP 地址由四个部分组成，每部分可以是1到3位数字，且数值范围在0到255之间，同时不允许有前导零。具体步骤如下：

1. **分割字符串：**
   - 将字符串 `s` 分割成四部分，每部分的长度可以是1、2或3。
   - 确保分割后的四部分长度之和等于 `s` 的长度。

2. **验证每一部分：**
   - 每一部分的数值必须在0到255之间。
   - 如果一个部分的长度大于1且以 `'0'` 开头，则无效（避免前导零）。

3. **回溯实现：**
   - 使用递归函数尝试不同的分割方式。
   - 每次选择1到3个字符作为当前部分，验证其有效性后继续分割剩余的字符串。
   - 当分割成四部分且整个字符串被完全分割时，将其加入结果集。

4. **剪枝优化：**
   - 如果剩余的字符数不适合剩余的分割部分（例如，每部分至少1个字符，最多3个字符），则提前终止当前路径。

5. **时间复杂度分析：**
   - 最坏情况下，字符串长度为12（4部分，每部分3个字符），总的分割方式是有限的，因此时间复杂度为常数级别。

6. **空间复杂度分析：**
   - 主要由递归调用栈和结果集所占用的空间决定，为 `O(1)` 和 `O(1)`，因为IP地址的数量和长度都是有限的。

这种方法通过系统地尝试所有可能的分割方式，并在每一步验证分割的有效性，能够有效地生成所有符合要求的IP地址。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 动态数组结构体，用于存储结果
typedef struct {
    char** addresses;
    int* sizes;
    int count;
    int capacity;
} AddressList;

// 初始化动态数组
void initAddressList(AddressList* list) {
    list->count = 0;
    list->capacity = 10;
    list->addresses = (char**)malloc(sizeof(char*) * list->capacity);
    list->sizes = (int*)malloc(sizeof(int) * list->capacity);
}

// 添加地址到动态数组
void addAddress(AddressList* list, char* address) {
    if (list->count == list->capacity) {
        list->capacity *= 2;
        list->addresses = (char**)realloc(list->addresses, sizeof(char*) * list->capacity);
        list->sizes = (int*)realloc(list->sizes, sizeof(int) * list->capacity);
    }
    list->addresses[list->count] = address;
    list->sizes[list->count] = strlen(address);
    list->count++;
}

// 检查部分是否合法
bool isValid(char* s, int start, int end) {
    if (start > end) return false;
    // 如果以'0'开头且长度大于1，则无效
    if (s[start] == '0' && start != end) return false;
    // 计算数值
    int num = 0;
    for(int i = start; i <= end; i++) {
        if(s[i] < '0' || s[i] > '9') return false;
        num = num * 10 + (s[i] - '0');
        if(num > 255) return false;
    }
    return true;
}

// 连接四部分形成IP地址
char* buildIPAddress(char* s, int p1, int p2, int p3, int p4) {
    // 分配足够的空间：每部分最多3位，加上3个点和1个结束符
    char* ip = (char*)malloc(sizeof(char) * 16);
    snprintf(ip, 16, "%.*s.%.*s.%.*s.%.*s", p1, s, p2 - p1, s + p1, p3 - p2, s + p2, p4 - p3, s + p3);
    return ip;
}

// 回溯函数
void backtrack(char* s, int len, int start, int parts, int* indices, AddressList* list) {
    // 如果已经分割成四部分
    if (parts == 4) {
        if (start == len) {
            // 使用记录的分割点构建IP地址
            char* ip = buildIPAddress(s, indices[0], indices[1], indices[2], len);
            addAddress(list, ip);
        }
        return;
    }
    
    // 尝试分割1到3个字符
    for(int i = 1; i <= 3; i++) {
        if(start + i > len) break;
        if(isValid(s, start, start + i -1)) {
            indices[parts] = start + i;
            backtrack(s, len, start + i, parts + 1, indices, list);
        }
    }
}

// 主函数：恢复IP地址
char** restoreIpAddresses(char* s, int* returnSize) {
    int len = strlen(s);
    AddressList list;
    initAddressList(&list);
    
    // 分割点数组，最多4个分割点
    int indices[4] = {0};
    
    backtrack(s, len, 0, 0, indices, &list);
    
    // 设置返回值
    *returnSize = list.count;
    return list.addresses;
}

// 辅助函数：打印二维字符串数组
void printAddresses(char** addresses, int size) {
    printf("[\n");
    for(int i = 0; i < size; i++) {
        printf("  \"%s\"", addresses[i]);
        if(i < size -1) printf(",\n");
        else printf("\n");
    }
    printf("]\n");
}

// 简单的主函数调用示例
int main() {
    // 示例1
    char s1[] = "25525511135";
    int returnSize1;
    char** result1 = restoreIpAddresses(s1, &returnSize1);
    printf("示例1的有效IP地址为：\n");
    printAddresses(result1, returnSize1);
    
    // 示例2
    char s2[] = "0000";
    int returnSize2;
    char** result2 = restoreIpAddresses(s2, &returnSize2);
    printf("示例2的有效IP地址为：\n");
    printAddresses(result2, returnSize2);
    
    // 示例3
    char s3[] = "101023";
    int returnSize3;
    char** result3 = restoreIpAddresses(s3, &returnSize3);
    printf("示例3的有效IP地址为：\n");
    printAddresses(result3, returnSize3);
    
    // 释放动态内存
    for(int i = 0; i < returnSize1; i++) {
        free(result1[i]);
    }
    free(result1);
    
    for(int i = 0; i < returnSize2; i++) {
        free(result2[i]);
    }
    free(result2);
    
    for(int i = 0; i < returnSize3; i++) {
        free(result3[i]);
    }
    free(result3);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

class Solution {
public:
    // 主函数：恢复IP地址
    vector<string> restoreIpAddresses(string s) {
        vector<string> result;     // 结果集
        vector<string> current;    // 当前的IP地址部分
        backtrack(s, 0, current, result);
        return result;
    }

private:
    // 回溯函数
    void backtrack(const string& s, int start, vector<string>& current, vector<string>& result) {
        // 如果已经有4个部分
        if (current.size() == 4) {
            if (start == s.size()) {
                // 将当前部分连接成IP地址
                string ip = "";
                for(int i = 0; i < 4; ++i) {
                    if(i > 0) ip += ".";
                    ip += current[i];
                }
                result.push_back(ip);
            }
            return;
        }
        
        // 每个部分可以是1到3位数字
        for(int len = 1; len <= 3; ++len) {
            if(start + len > s.size()) break; // 剩余字符不足
            string part = s.substr(start, len);
            if(isValid(part)) {
                current.push_back(part);            // 选择当前部分
                backtrack(s, start + len, current, result); // 递归选择下一个部分
                current.pop_back();                // 撤销选择
            }
        }
    }
    
    // 检查部分是否合法
    bool isValid(const string& s) {
        if(s.empty() || s.size() > 3) return false;
        if(s[0] == '0' && s.size() > 1) return false; // 避免前导零
        int num = 0;
        for(char c : s) {
            if(!isdigit(c)) return false;
            num = num * 10 + (c - '0');
            if(num > 255) return false; // 超出范围
        }
        return true;
    }
};

// 辅助函数：打印字符串向量
void printAddresses(const vector<string>& addresses) {
    cout << "[\n";
    for(size_t i = 0; i < addresses.size(); i++) {
        cout << "  \"" << addresses[i] << "\"";
        if(i < addresses.size() -1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

// 简单的主函数调用示例
int main() {
    Solution solution;
    
    // 示例1
    string s1 = "25525511135";
    vector<string> result1 = solution.restoreIpAddresses(s1);
    cout << "示例1的有效IP地址为：\n";
    printAddresses(result1);
    
    // 示例2
    string s2 = "0000";
    vector<string> result2 = solution.restoreIpAddresses(s2);
    cout << "示例2的有效IP地址为：\n";
    printAddresses(result2);
    
    // 示例3
    string s3 = "101023";
    vector<string> result3 = solution.restoreIpAddresses(s3);
    cout << "示例3的有效IP地址为：\n";
    printAddresses(result3);
    
    return 0;
}
```

### 代码说明与修正

在之前的C++解答中，出现了多余的点（`.`），导致输出的IP地址格式错误。为了解决这个问题，以下是修正后的C++解答：

1. **使用`vector<string>`存储当前的IP地址部分**：
   - 使用`current`向量来存储IP地址的每一部分，而不是直接在字符串中添加点。
   
2. **在生成完整的IP地址时连接点**：
   - 只有在所有四个部分都被正确选择后，才将它们用点连接起来，形成一个完整的IP地址。

3. **避免在中间步骤添加点**：
   - 在回溯过程中，不在`current`向量中添加点，这样可以确保IP地址的格式正确。

4. **验证每一部分的有效性**：
   - 确保每一部分的数值在0到255之间，并且没有前导零。

通过以上修正，代码能够正确生成所有有效的IP地址，而不会出现多余的点或格式错误的问题。

### 示例输出

运行上述C++代码后，输出如下：

```
示例1的有效IP地址为：
[
  "255.255.11.135",
  "255.255.111.35"
]
示例2的有效IP地址为：
[
  "0.0.0.0"
]
示例3的有效IP地址为：
[
  "1.0.10.23",
  "1.0.102.3",
  "10.1.0.23",
  "10.10.2.3",
  "101.0.2.3"
]
```

这与预期结果一致，证明修正后的代码正确生成了所有有效的IP地址。