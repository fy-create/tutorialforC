---
layout: post
title:  "279. 完全平方数"
categories: arithmetic
---

[279. 完全平方数](https://leetcode.cn/problems/perfect-squares)

### 题目：**Perfect Squares**

#### 题目描述：

给你一个整数 `n`，返回 `n` 为和的最少完全平方数的个数。

完全平方数是指可以表示为整数的平方数，如 `1, 4, 9, 16, 25, ...`。

#### 示例 1：

**输入：**
```plaintext
n = 12
```

**输出：**
```plaintext
3
```

**解释：**
12 = 4 + 4 + 4.

#### 示例 2：

**输入：**
```plaintext
n = 13
```

**输出：**
```plaintext
2
```

**解释：**
13 = 9 + 4.

#### 提示：
- `1 <= n <= 10^4`

---

### 解题思路：

这个问题可以通过 **动态规划** 或 **贪心算法 + BFS** 来解决。我们将采用 **动态规划** 方法来实现最少完全平方数的个数。

#### 动态规划（DP）：

1. **定义状态**：
   - 使用一个数组 `dp[i]` 来表示数字 `i` 所需要的最少完全平方数的个数。
   
2. **初始化**：
   - `dp[0] = 0`，因为数字 `0` 需要 0 个完全平方数来表示。
   
3. **状态转移**：
   - 对于每一个 `i`（从 `1` 到 `n`），我们可以考虑使用某个完全平方数 `j^2` 来构造 `i`。其中 `j^2` 是小于等于 `i` 的完全平方数。
   - 也就是说，对于每一个 `i`，我们可以通过减去一个完全平方数 `j^2` 得到 `i - j^2`，然后取 `dp[i - j^2]` 的最小值并加上 1。
   
4. **公式**：
   ```plaintext
   dp[i] = min(dp[i], dp[i - j^2] + 1)
   ```
   其中 `j` 是小于等于 `sqrt(i)` 的整数。

5. **时间复杂度**：
   - 外层循环遍历 `1` 到 `n`，内层循环遍历所有小于等于 `sqrt(i)` 的完全平方数，因此时间复杂度为 `O(n * sqrt(n))`。

### C语言解答：

```c
#include <stdio.h>
#include <math.h>

int numSquares(int n) {
    // dp[i]表示i的最少完全平方数的个数
    int dp[n + 1];
    // 初始化dp数组
    for (int i = 0; i <= n; i++) {
        dp[i] = i; // 最大值为i（直接使用i个1的平方和）
    }
    dp[0] = 0; // 0的平方数个数为0

    // 动态规划
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j * j <= i; j++) {
            dp[i] = fmin(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}

int main() {
    int n = 12;
    printf("The minimum number of perfect squares for %d is: %d\n", n, numSquares(n));  // 输出 3
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
#include <cmath>
#include <vector>
using namespace std;

class Solution {
public:
    int numSquares(int n) {
        // dp[i]表示i的最少完全平方数的个数
        vector<int> dp(n + 1, n); // 初始化为n，因为最多需要n个1
        dp[0] = 0; // 0的平方数个数为0
        
        // 动态规划
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = min(dp[i], dp[i - j * j] + 1);
            }
        }

        return dp[n];
    }
};

int main() {
    Solution solution;
    int n = 12;
    cout << "The minimum number of perfect squares for " << n << " is: " << solution.numSquares(n) << endl;  // 输出 3
    return 0;
}
```

### 代码解释：

#### C语言解答：
- **dp数组初始化**：`dp[i]` 表示数字 `i` 所需的最少完全平方数的个数。我们初始化 `dp[i] = i`，因为最坏情况下，每个 `i` 都需要 `i` 个 `1` 的平方来表示。
- **动态规划**：我们通过遍历每个数字 `i`，然后对于每个完全平方数 `j^2`，更新 `dp[i]`。公式为：`dp[i] = min(dp[i], dp[i - j^2] + 1)`，即取 `i - j^2` 的最小值并加 `1`。
- **输出结果**：调用 `numSquares(n)` 方法，返回所需的最少完全平方数。

#### C++ 解答：
- **vector数组**：使用 C++ 的 `vector<int>` 来替代数组 `dp[]`，并且通过 `min` 函数来更新最小值。
- **代码结构**：在 C++ 代码中，封装了 `numSquares` 方法在 `Solution` 类中，类的方法更加结构化。

### 总结：
- **动态规划** 是解决这个问题的有效方法，通过利用完全平方数来逐步构造 `n`，最终求得最少的完全平方数的个数。
- **时间复杂度** 为 `O(n * sqrt(n))`，这使得该算法在处理较大的 `n` 时也能保持较高的效率。