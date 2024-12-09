---
layout: post
title:  "6. Z 字形变换"
categories: arithmetic
---

https://leetcode.cn/problems/zigzag-conversion

题目描述：

将字符串 "PAYPALISHIRING" 按照指定的行数以 Z 字形排列：

```
P   A   H   N
A P L S I I G
Y   I   R
```

然后逐行读取，得到字符串 "PAHNAPLSIIGYIR"。

请编写代码实现此转换，给定一个字符串和行数：

```
string convert(string s, int numRows);
```

**示例 1：**

```
输入: s = "PAYPALISHIRING", numRows = 3
输出: "PAHNAPLSIIGYIR"
```

**示例 2：**

```
输入: s = "PAYPALISHIRING", numRows = 4
输出: "PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
```

**示例 3：**

```
输入: s = "A", numRows = 1
输出: "A"
```

**提示：**

- `1 <= s.length <= 1000`
- `s` 由英文字母（小写和大写）、',' 和 '.' 组成
- `1 <= numRows <= 1000`

**C 语言解答：**

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* convert(char* s, int numRows) {
    if (numRows == 1) return s; // 如果只有一行，直接返回原字符串

    int len = strlen(s);
    char* result = (char*)malloc((len + 1) * sizeof(char));
    int pos = 0; // 结果字符串的当前位置
    int cycleLen = 2 * numRows - 2; // Z 字形的周期长度

    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j + i < len; j += cycleLen) {
            result[pos++] = s[j + i]; // 当前行的字符
            // 除第一行和最后一行外，添加斜对角线上的字符
            if (i != 0 && i != numRows - 1 && j + cycleLen - i < len)
                result[pos++] = s[j + cycleLen - i];
        }
    }
    result[pos] = '\0'; // 添加字符串结束符
    return result;
}

// 测试函数
int main() {
    char s[] = "PAYPALISHIRING";
    int numRows = 3;
    char* result = convert(s, numRows);
    printf("%s\n", result); // 输出: PAHNAPLSIIGYIR
    free(result); // 释放内存
    return 0;
}
```

**代码解析：**

1. **特殊情况处理：** 如果 `numRows` 为 1，直接返回原字符串，因为没有 Z 字形排列。

2. **计算周期长度：** Z 字形排列的周期长度为 `2 * numRows - 2`。

3. **遍历每一行：** 对于每一行，计算该行的字符位置，并将其添加到结果字符串中。

4. **处理斜对角线字符：** 对于非首行和末行，需要添加斜对角线上的字符。

5. **构建结果字符串：** 按行遍历并添加字符，最终得到按行读取的结果字符串。

**C++ 语言解答：**

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1) return s; // 如果只有一行，直接返回原字符串

        vector<string> rows(min(numRows, int(s.size())));
        int curRow = 0;
        bool goingDown = false;

        // 遍历字符串，将字符添加到对应的行
        for (char c : s) {
            rows[curRow] += c;
            // 当到达第一行或最后一行时，改变方向
            if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
            curRow += goingDown ? 1 : -1;
        }

        // 将所有行合并成一个字符串
        string ret;
        for (string row : rows) ret += row;
        return ret;
    }
};

// 测试函数
int main() {
    Solution solution;
    string s = "PAYPALISHIRING";
    int numRows = 4;
    string result = solution.convert(s, numRows);
    cout << result << endl; // 输出: PINALSIGYAHRPI
    return 0;
}
```

**代码解析：**

1. **特殊情况处理：** 如果 `numRows` 为 1，直接返回原字符串。

2. **初始化行容器：** 使用 `vector<string>` 存储每一行的字符。

3. **遍历字符串：** 使用 `curRow` 指示当前行，`goingDown` 指示当前方向。遍历字符串，将每个字符添加到对应的行。

4. **改变方向：** 当到达第一行或最后一行时，改变方向。

5. **合并结果：** 将所有行合并成一个字符串，作为最终结果。

**注意：** 以上代码中，C 语言版本需要手动管理内存，使用 `malloc` 分配内存，并在使用完毕后使用 `free` 释放。而 C++ 版本利用了 STL 容器 `vector` 和 `string`，简化了内存管理，并且代码更简洁易读。 