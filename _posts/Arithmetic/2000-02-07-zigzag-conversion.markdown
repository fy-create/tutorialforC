---
layout: post
title:  "6. Z 字形变换"
categories: arithmetic
---

[6. Z 字形变换](https://leetcode.cn/problems/zigzag-conversion)

### 题目：Z 字形变换 (Zigzag Conversion)

#### 题目要求：
将一个给定的字符串 `s`，根据给定的行数 `numRows`，以 Z 字形排列并输出转换后的字符串。

你需要将字符串按行列形式转换为 Z 字形并输出，然后将其按行顺序返回。

#### 示例：
**示例 1:**

输入:
```
s = "PAYPALISHIRING", numRows = 3
```

输出:
```
"PAHNAPLSIIGYIR"
```

**示例 2:**

输入:
```
s = "PAYPALISHIRING", numRows = 4
```

输出:
```
"PINALSIGYAHRPI"
```

**示例 3:**

输入:
```
s = "A", numRows = 1
```

输出:
```
"A"
```

#### 提示：
1. `1 <= s.length <= 1000`
2. `1 <= numRows <= 1000`
3. `s` 由英文字母（大写和小写）、数字和符号组成。

---

### 解题思路：

这个问题可以通过模拟 Z 字形的排列过程来解决。我们需要将字符串 `s` 按照规定的行数 `numRows` 放入一个二维的 "Z" 字形网格中，然后根据这种排列方式重新生成一个字符串。

#### 具体思路：
1. **Z 字形排列结构**：
   - 当 `numRows` 为 1 时，整个字符串不会改变位置，直接返回即可。
   - 对于 `numRows > 1` 的情况，字符串需要按照 Z 字形排列。可以通过模拟行之间的跳跃来填充网格。在每次遍历时，我们可以从上到下填充一列，当达到最底部时，开始从底到顶进行填充。
   
2. **模拟过程**：
   - 使用一个字符数组来模拟行，每个位置保存该行的字符。
   - 使用一个变量来跟踪当前的行号，模拟字符串的写入过程。
   - 当行号到达顶部或底部时，改变方向，从顶部到底部或从底部到顶部。

3. **最终结果**：
   - 生成字符串时，将每一行的字符按顺序拼接成最终的字符串。

#### C 语言解法：

```c
#include <stdio.h>
#include <string.h>

char* convert(char* s, int numRows) {
    if (numRows == 1 || strlen(s) <= numRows) {
        return s; // 如果只有一行或字符串长度小于等于行数，直接返回
    }

    int len = strlen(s);
    char* result = (char*)malloc(sizeof(char) * (len + 1));
    char grid[numRows][len]; // 使用二维数组来模拟Z字形
    memset(grid, 0, sizeof(grid)); // 初始化二维数组

    int row = 0, direction = 1; // direction = 1表示向下填充，-1表示向上填充

    // 填充字符到网格中
    for (int i = 0; i < len; i++) {
        grid[row][i] = s[i];
        if (row == 0) {
            direction = 1; // 到达顶部，开始向下填充
        } else if (row == numRows - 1) {
            direction = -1; // 到达底部，开始向上填充
        }
        row += direction;
    }

    // 从网格中提取结果
    int idx = 0;
    for (int i = 0; i < numRows; i++) {
        for (int j = 0; j < len; j++) {
            if (grid[i][j] != 0) {
                result[idx++] = grid[i][j];
            }
        }
    }
    result[idx] = '\0'; // 字符串末尾添加终止符
    return result;
}

int main() {
    char s[] = "PAYPALISHIRING";
    int numRows = 3;
    char* result = convert(s, numRows);
    printf("Converted String: %s\n", result);
    free(result);
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Solution {
public:
    string convert(string s, int numRows) {
        if (numRows == 1 || s.length() <= numRows) {
            return s; // 如果只有一行或字符串长度小于等于行数，直接返回
        }

        vector<string> rows(min(numRows, int(s.length()))); // 初始化行
        int currentRow = 0;
        bool goingDown = false;

        // 按照Z字形的规则填充行
        for (char c : s) {
            rows[currentRow] += c;
            if (currentRow == 0 || currentRow == numRows - 1) {
                goingDown = !goingDown; // 到达顶部或底部，改变方向
            }
            currentRow += goingDown ? 1 : -1; // 根据方向移动
        }

        // 拼接所有行，形成结果
        string result;
        for (const string& row : rows) {
            result += row;
        }

        return result;
    }
};

int main() {
    Solution solution;
    string s = "PAYPALISHIRING";
    int numRows = 3;
    string result = solution.convert(s, numRows);
    cout << "Converted String: " << result << endl;
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - `convert` 函数模拟 Z 字形的排列方式，使用一个二维数组 `grid` 来存储每个位置的字符。在填充网格时，通过 `row` 变量来控制当前填充的行，`direction` 变量来控制填充方向。
   - 最后，将网格中的字符按顺序提取并拼接成最终的字符串。
   
2. **C++ 实现**：
   - 使用一个 `vector<string>` 数组来表示每一行的字符，利用布尔变量 `goingDown` 来控制行的移动方向。
   - 同样的，逐字符地将字符串 `s` 按 Z 字形方式填充到对应行中，最后通过拼接每一行的字符得到最终结果。

#### 核心算法：
- 使用模拟方法，按照 Z 字形的方式将字符串分配到每一行，并根据行之间的移动方向来填充字符。最终将每行的字符拼接成新的字符串，得到 Z 字形变换后的结果。