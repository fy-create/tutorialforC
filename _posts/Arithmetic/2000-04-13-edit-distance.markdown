---
layout: post
title:  "72. 编辑距离"
categories: arithmetic
---

[72. 编辑距离](https://leetcode.cn/problems/edit-distance)

### 题目要求：

给定两个字符串 `word1` 和 `word2`，返回将 `word1` 转换为 `word2` 所使用的最少操作数。允许的操作包括：
1. 插入一个字符。
2. 删除一个字符。
3. 替换一个字符。

#### 示例：

**示例 1**：
```
输入: word1 = "horse", word2 = "ros"
输出: 3
解释: 
horse -> rorse (替换 'h' 为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
```

**示例 2**：
```
输入: word1 = "intention", word2 = "execution"
输出: 5
解释:
intention -> inxtention (替换 't' 为 'x')
inxtention -> exxtention (替换 'n' 为 'x')
exxtention -> exextention (替换 't' 为 'e')
exextention -> exection (删除 't')
exection -> execution (替换 'e' 为 'i')
```

#### 提示：
- `1 <= word1.length, word2.length <= 500`
- 词语的长度较小，适合使用动态规划的解法。

### 解题思路：

这个问题是典型的**编辑距离**问题，可以通过动态规划来解决。我们定义一个二维数组 `dp`，`dp[i][j]` 表示将 `word1[0..i-1]` 转换为 `word2[0..j-1]` 所需的最小操作数。

#### 动态规划分析：
1. **状态定义**：
   - `dp[i][j]` 表示将 `word1` 的前 `i` 个字符转换为 `word2` 的前 `j` 个字符的最小操作数。

2. **状态转移方程**：
   - 如果 `word1[i-1] == word2[j-1]`，那么 `dp[i][j] = dp[i-1][j-1]`，不需要做任何操作。
   - 如果 `word1[i-1] != word2[j-1]`，则有三种选择：
     - **插入**：在 `word1` 后插入一个字符，转换为 `word2[0..j-1]`，操作数为 `dp[i][j-1] + 1`。
     - **删除**：删除 `word1[i-1]`，操作数为 `dp[i-1][j] + 1`。
     - **替换**：将 `word1[i-1]` 替换为 `word2[j-1]`，操作数为 `dp[i-1][j-1] + 1`。
   - 所以，`dp[i][j] = min(dp[i-1][j-1], dp[i][j-1], dp[i-1][j]) + 1`。

3. **初始化**：
   - `dp[0][j] = j`：将空字符串转换为 `word2[0..j-1]`，需要 `j` 次插入操作。
   - `dp[i][0] = i`：将 `word1[0..i-1]` 转换为空字符串，需要 `i` 次删除操作。

4. **最终结果**：
   - `dp[word1.length][word2.length]` 就是所需的最小操作数。

### C语言实现：

```c
#include <stdio.h>
#include <string.h>

int minDistance(char *word1, char *word2) {
    int len1 = strlen(word1);
    int len2 = strlen(word2);
    
    // 创建 dp 数组，dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最小操作数
    int dp[len1 + 1][len2 + 1];

    // 初始化 dp 数组
    for (int i = 0; i <= len1; i++) {
        for (int j = 0; j <= len2; j++) {
            if (i == 0) {
                dp[i][j] = j;  // 如果 word1 为空，只能插入 j 次
            } else if (j == 0) {
                dp[i][j] = i;  // 如果 word2 为空，只能删除 i 次
            } else {
                dp[i][j] = 0;  // 其他情况
            }
        }
    }

    // 填充 dp 数组
    for (int i = 1; i <= len1; i++) {
        for (int j = 1; j <= len2; j++) {
            if (word1[i-1] == word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];  // 如果字符相同，不需要操作
            } else {
                dp[i][j] = fmin(fmin(dp[i-1][j-1], dp[i][j-1]), dp[i-1][j]) + 1;  // 取插入、删除、替换的最小值
            }
        }
    }

    // 返回最终的最小操作数
    return dp[len1][len2];
}

int main() {
    char word1[] = "horse";
    char word2[] = "ros";
    int result = minDistance(word1, word2);
    printf("Minimum Edit Distance: %d\n", result);
    return 0;
}
```

### C++实现：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int minDistance(string word1, string word2) {
        int len1 = word1.size();
        int len2 = word2.size();
        
        // 创建 dp 数组，dp[i][j] 表示 word1[0..i-1] 转换为 word2[0..j-1] 的最小操作数
        vector<vector<int>> dp(len1 + 1, vector<int>(len2 + 1));
        
        // 初始化 dp 数组
        for (int i = 0; i <= len1; i++) {
            for (int j = 0; j <= len2; j++) {
                if (i == 0) {
                    dp[i][j] = j;  // 如果 word1 为空，只能插入 j 次
                } else if (j == 0) {
                    dp[i][j] = i;  // 如果 word2 为空，只能删除 i 次
                }
            }
        }

        // 填充 dp 数组
        for (int i = 1; i <= len1; i++) {
            for (int j = 1; j <= len2; j++) {
                if (word1[i-1] == word2[j-1]) {
                    dp[i][j] = dp[i-1][j-1];  // 如果字符相同，不需要操作
                } else {
                    dp[i][j] = min({dp[i-1][j-1], dp[i][j-1], dp[i-1][j]}) + 1;  // 取插入、删除、替换的最小值
                }
            }
        }

        // 返回最终的最小操作数
        return dp[len1][len2];
    }
};

int main() {
    Solution solution;
    string word1 = "horse";
    string word2 = "ros";
    int result = solution.minDistance(word1, word2);
    cout << "Minimum Edit Distance: " << result << endl;
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **动态规划数组**：`dp[i][j]` 存储将 `word1[0..i-1]` 转换为 `word2[0..j-1]` 的最小操作数。
2. **初始化**：对于 `dp[i][0]` 和 `dp[0][j]`，分别代表将一个字符串转换为空字符串的操作数（分别是删除操作和插入操作）。
3. **状态转移**：根据字符是否相同，来决定是替换、删除还是插入操作，并选择最小操作数。
4. **最终结果**：`dp[len1][len2]` 就是最终所需的最小操作数。

#### C++实现：
1. **动态规划数组**：使用 `vector<vector<int>>` 来表示二维数组，简化了内存管理。
2. **初始化**：初始化 `dp[i][0]` 和 `dp[0][j]`，表示将空字符串转换为另一个字符串的操作数。
3. **状态转移**：根据字符是否相同来选择合适的操作，`min` 函数用于选择最小的操作数。
4. **最终结果**：`dp[len1][len2]` 存储的就是最小编辑距离。

### 时间和空间复杂度：
- **时间复杂度**：O(m * n)，其中 `m` 和 `n` 分别是 `word1` 和 `word2` 的长度。我们需要填充一个 `m+1` 行，`

n+1` 列的 DP 数组。
- **空间复杂度**：O(m * n)，由于我们使用了一个二维数组来存储中间状态。

### 示例输出：
```
Minimum Edit Distance: 3
```