---
layout: post
title:  "43. 字符串相乘"
categories: arithmetic
---

[43. 字符串相乘](https://leetcode.cn/problems/multiply-strings)

### 题目描述：
给定两个以字符串形式表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也表示为字符串形式。

**注意：**
- 不能使用任何内置的 `BigInteger` 库或直接将输入转换为整数。

**示例：**

**输入：** num1 = "2", num2 = "3"

**输出：** "6"

**输入：** num1 = "123", num2 = "456"

**输出：** "56088"

### 解题思路：

1. **模拟乘法过程**：
   - 将 `num1` 和 `num2` 作为倒序字符串遍历。
   - 逐位相乘，结果累加到对应位置。

2. **结果存储**：
   - 使用一个数组 `result`，长度为 `num1.length + num2.length`，存储每个位的计算结果。
   - 每次相乘时，将结果加到 `result[i + j]` 和 `result[i + j + 1]`。

3. **去掉前导零**：
   - 从数组 `result` 中转换成字符串时，去掉前导零。

4. **时间复杂度**：
   - 时间复杂度为 O(m * n)，其中 `m` 和 `n` 分别是 `num1` 和 `num2` 的长度。

5. **空间复杂度**：
   - 空间复杂度为 O(m + n)。

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

char* multiply(char* num1, char* num2) {
    int len1 = strlen(num1), len2 = strlen(num2);
    int* result = (int*)calloc(len1 + len2, sizeof(int));

    // 模拟乘法过程
    for (int i = len1 - 1; i >= 0; i--) {
        for (int j = len2 - 1; j >= 0; j--) {
            int mul = (num1[i] - '0') * (num2[j] - '0');
            int sum = mul + result[i + j + 1];

            result[i + j + 1] = sum % 10;
            result[i + j] += sum / 10;
        }
    }

    // 转换结果为字符串
    char* resStr = (char*)malloc((len1 + len2 + 1) * sizeof(char));
    int index = 0, start = 0;
    for (int i = 0; i < len1 + len2; i++) {
        if (result[i] != 0 || start) {
            resStr[index++] = result[i] + '0';
            start = 1;
        }
    }
    if (index == 0) resStr[index++] = '0'; // 处理乘积为 0 的情况

    resStr[index] = '\0';
    free(result);
    return resStr;
}

int main() {
    char num1[] = "123", num2[] = "456";
    char* result = multiply(num1, num2);
    printf("结果: %s\n", result);
    free(result);
    return 0;
}
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Solution {
public:
    string multiply(string num1, string num2) {
        int len1 = num1.size(), len2 = num2.size();
        vector<int> result(len1 + len2, 0);

        // 模拟乘法过程
        for (int i = len1 - 1; i >= 0; i--) {
            for (int j = len2 - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = mul + result[i + j + 1];

                result[i + j + 1] = sum % 10;
                result[i + j] += sum / 10;
            }
        }

        // 转换结果为字符串
        string res;
        for (int num : result) {
            if (!(res.empty() && num == 0)) res.push_back(num + '0');
        }

        return res.empty() ? "0" : res; // 处理乘积为 0 的情况
    }
};

int main() {
    Solution sol;
    string num1 = "123", num2 = "456";
    cout << "结果: " << sol.multiply(num1, num2) << endl;
    return 0;
}
```
