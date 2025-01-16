---
layout: post
title:  "174. 地下城游戏"
categories: arithmetic
---

[174. 地下城游戏](https://leetcode.cn/problems/dungeon-game)

### 题目描述

一些恶魔抓住了公主（P）并将她关在了地下城的右下角。地下城是由 M x N 个房间组成的二维网格。我们英勇的骑士（K）最初被安置在左上角的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。

骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。

有些房间由恶魔守卫，因此骑士进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。

为了尽快到达公主，骑士决定每次只向右或向下移动一步。

**编写一个函数来计算确保骑士能够拯救到公主所需的最低初始健康点数。**

**示例 1:**

```
输入:
[
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5]
]
输出: 7
解释:
骑士的初始健康点数至少为 7，才能按照以下路径拯救公主：
右 -> 右 -> 下 -> 下
```

**提示:**

- 骑士的健康点数没有上限。
- 任何房间都可能对骑士的健康点数造成威胁，或者增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。

---

### 解题思路

1. **动态规划**：
   - 使用动态规划从右下角向左上角计算每个房间所需的最低初始健康点数。
   - 定义 `dp[i][j]` 表示从房间 `(i, j)` 到终点所需的最低初始健康点数。

2. **状态转移方程**：
   - 对于每个房间 `(i, j)`，骑士可以选择向右或向下移动。
   - 从 `(i, j)` 到终点的最低初始健康点数为：
     ```
     dp[i][j] = max(1, min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])
     ```
   - 如果 `dp[i][j]` 小于等于 0，则骑士无法存活，因此需要至少 1 点健康点数。

3. **边界条件**：
   - 对于右下角的房间，`dp[m-1][n-1] = max(1, 1 - dungeon[m-1][n-1])`。
   - 对于最后一行和最后一列，只能向右或向下移动。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>

int calculateMinimumHP(int** dungeon, int dungeonSize, int* dungeonColSize) {
    int m = dungeonSize;
    int n = dungeonColSize[0];

    // 动态规划数组
    int** dp = (int**)malloc(m * sizeof(int*));
    for (int i = 0; i < m; i++) {
        dp[i] = (int*)malloc(n * sizeof(int));
    }

    // 初始化右下角
    dp[m - 1][n - 1] = dungeon[m - 1][n - 1] > 0 ? 1 : 1 - dungeon[m - 1][n - 1];

    // 初始化最后一行
    for (int j = n - 2; j >= 0; j--) {
        dp[m - 1][j] = dp[m - 1][j + 1] - dungeon[m - 1][j];
        if (dp[m - 1][j] <= 0) dp[m - 1][j] = 1;
    }

    // 初始化最后一列
    for (int i = m - 2; i >= 0; i--) {
        dp[i][n - 1] = dp[i + 1][n - 1] - dungeon[i][n - 1];
        if (dp[i][n - 1] <= 0) dp[i][n - 1] = 1;
    }

    // 填充其他位置
    for (int i = m - 2; i >= 0; i--) {
        for (int j = n - 2; j >= 0; j--) {
            dp[i][j] = (dp[i + 1][j] < dp[i][j + 1] ? dp[i + 1][j] : dp[i][j + 1]) - dungeon[i][j];
            if (dp[i][j] <= 0) dp[i][j] = 1;
        }
    }

    int result = dp[0][0];

    // 释放内存
    for (int i = 0; i < m; i++) {
        free(dp[i]);
    }
    free(dp);

    return result;
}

int main() {
    int dungeonData[3][3] = {
        {-2, -3, 3},
        {-5, -10, 1},
        {10, 30, -5}
    };
    int dungeonSize = 3;
    int dungeonColSize[3] = {3, 3, 3};
    int* dungeon[3];
    for (int i = 0; i < dungeonSize; i++) {
        dungeon[i] = dungeonData[i];
    }

    int result = calculateMinimumHP(dungeon, dungeonSize, dungeonColSize);
    printf("骑士所需的最低初始健康点数: %d\n", result); // 输出 7

    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size();
        int n = dungeon[0].size();

        // 动态规划数组
        vector<vector<int>> dp(m, vector<int>(n, 0));

        // 初始化右下角
        dp[m - 1][n - 1] = max(1, 1 - dungeon[m - 1][n - 1]);

        // 初始化最后一行
        for (int j = n - 2; j >= 0; j--) {
            dp[m - 1][j] = max(1, dp[m - 1][j + 1] - dungeon[m - 1][j]);
        }

        // 初始化最后一列
        for (int i = m - 2; i >= 0; i--) {
            dp[i][n - 1] = max(1, dp[i + 1][n - 1] - dungeon[i][n - 1]);
        }

        // 填充其他位置
        for (int i = m - 2; i >= 0; i--) {
            for (int j = n - 2; j >= 0; j--) {
                dp[i][j] = max(1, min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]);
            }
        }

        return dp[0][0];
    }
};

int main() {
    Solution solution;
    vector<vector<int>> dungeon = {
        {-2, -3, 3},
        {-5, -10, 1},
        {10, 30, -5}
    };
    int result = solution.calculateMinimumHP(dungeon);
    cout << "骑士所需的最低初始健康点数: " << result << endl; // 输出 7
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
[
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5]
]
```
#### 输出 1
```
7
```

#### 输入 2
```
[
  [0, 0, 0],
  [1, 1, -1]
]
```
#### 输出 2
```
1
```

#### 输入 3
```
[
  [1, -3, 3],
  [0, -2, 0],
  [-3, -3, -3]
]
```
#### 输出 3
```
3
```

---

### 复杂度分析

- **时间复杂度**：O(M * N)，其中 M 和 N 分别是地下城的行数和列数。需要遍历整个二维数组。
- **空间复杂度**：O(M * N)，用于存储动态规划数组。

---

### 总结

通过动态规划从右下角向左上角计算每个房间所需的最低初始健康点数，我们可以高效地解决这个问题。这种方法能够处理各种边界条件，并确保结果的正确性。