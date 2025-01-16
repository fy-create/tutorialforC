---
layout: post
title:  "131. 分割回文串"
categories: arithmetic
---

[131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning)

### 题目描述

[LeetCode 原题链接 - 分割回文串](https://leetcode.cn/problems/palindrome-partitioning)

给你一个字符串 `s`，请你将 `s` 分割成一些子串，使每个子串都是回文串。返回 `s` 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

---

#### 示例 1：
```
输入：s = "aab"
输出：[["a","a","b"],["aa","b"]]
```

#### 示例 2：
```
输入：s = "a"
输出：[["a"]]
```

---

#### 提示：
1. `1 <= s.length <= 16`
2. `s` 仅由小写英文字母组成

---

### 解题思路

1. **回溯法：**
   - 使用回溯方法将字符串进行分割。
   - 每次选择一个前缀，判断该前缀是否是回文串。如果是，则继续递归处理剩余字符串。
   - 如果整个字符串被分割完毕，则将当前分割方案加入结果集中。

2. **判断回文：**
   - 使用双指针判断一个字符串是否是回文。

3. **时间复杂度：**
   - 最坏情况下，每个字符都可能单独形成回文，回溯算法的时间复杂度为 \(O(2^n)\)，其中 \(n\) 是字符串的长度。

---

### C语言实现

#### 函数原型
```c
char*** partition(char* s, int* returnSize, int** returnColumnSizes);
```

#### 完整代码
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

// 判断一个字符串是否是回文
bool isPalindrome(char* s, int start, int end) {
    while (start < end) {
        if (s[start] != s[end]) return false;
        start++;
        end--;
    }
    return true;
}

// 回溯函数
void backtrack(char* s, int start, int len, char*** result, int* returnSize, int** returnColumnSizes, char** path, int pathSize) {
    if (start == len) { // 如果已经到达字符串末尾
        // 保存当前分割方案
        result[*returnSize] = (char**)malloc(pathSize * sizeof(char*));
        for (int i = 0; i < pathSize; i++) {
            result[*returnSize][i] = strdup(path[i]);
        }
        (*returnColumnSizes)[*returnSize] = pathSize;
        (*returnSize)++;
        return;
    }

    for (int end = start; end < len; end++) {
        if (isPalindrome(s, start, end)) { // 如果是回文串
            path[pathSize] = (char*)malloc((end - start + 2) * sizeof(char));
            strncpy(path[pathSize], s + start, end - start + 1);
            path[pathSize][end - start + 1] = '\0';

            backtrack(s, end + 1, len, result, returnSize, returnColumnSizes, path, pathSize + 1);

            free(path[pathSize]); // 回溯后释放内存
        }
    }
}

char*** partition(char* s, int* returnSize, int** returnColumnSizes) {
    int len = strlen(s);
    *returnSize = 0;
    *returnColumnSizes = (int*)malloc(len * len * sizeof(int)); // 最大分割数

    char*** result = (char***)malloc(len * len * sizeof(char**));
    char** path = (char**)malloc(len * sizeof(char*)); // 当前路径

    backtrack(s, 0, len, result, returnSize, returnColumnSizes, path, 0);

    free(path);
    return result;
}

// 测试函数
int main() {
    char s[] = "aab";
    int returnSize;
    int* returnColumnSizes;

    char*** result = partition(s, &returnSize, &returnColumnSizes);

    printf("分割方案总数：%d\\n", returnSize);
    for (int i = 0; i < returnSize; i++) {
        printf("方案 %d: ", i + 1);
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%s ", result[i][j]);
            free(result[i][j]); // 释放内存
        }
        printf("\\n");
        free(result[i]); // 释放内存
    }
    free(result);
    free(returnColumnSizes);

    return 0;
}
```

---

### C++ 实现

#### 类定义
```cpp
#include <vector>
#include <string>
#include <iostream>
using namespace std;

class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> result;
        vector<string> path;

        function<void(int)> backtrack = [&](int start) {
            if (start == s.size()) {
                result.push_back(path);
                return;
            }
            for (int end = start; end < s.size(); ++end) {
                if (isPalindrome(s, start, end)) {
                    path.push_back(s.substr(start, end - start + 1));
                    backtrack(end + 1);
                    path.pop_back();
                }
            }
        };

        backtrack(0);
        return result;
    }

private:
    bool isPalindrome(const string& s, int start, int end) {
        while (start < end) {
            if (s[start++] != s[end--]) return false;
        }
        return true;
    }
};

// 测试函数
int main() {
    Solution sol;
    string s = "aab";

    vector<vector<string>> result = sol.partition(s);

    cout << "分割方案总数：" << result.size() << endl;
    for (const auto& partition : result) {
        cout << "[";
        for (const auto& str : partition) {
            cout << "\"" << str << "\", ";
        }
        cout << "]" << endl;
    }

    return 0;
}
```

C 和 C++ 实现均采用了回溯算法，代码逻辑清晰，具备详细注释并提供了测试调用。若有疑问或需要进一步优化，请随时讨论！

