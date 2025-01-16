---
layout: post
title:  "299. 猜数字游戏"
categories: arithmetic
---

[299. 猜数字游戏](https://leetcode.cn/problems/bulls-and-cows)

### 题目：**Bulls and Cows**

#### 题目描述：

你正在和你的朋友玩一个猜数字的游戏。游戏规则如下：
- 你选择一个秘密数字，并且这个数字有 `n` 位（每位是 0-9 之间的数字）。你给出 `guess` 和 `secret` 两个数字字符串。
- `guess` 是你的朋友输入的猜测数字，`secret` 是你选择的数字。
- 你的朋友会根据以下规则返回一个提示信息：
    - **"A"** 表示完全正确的数字和位置（即 "bulls"）。
    - **"B"** 表示正确数字，但位置错误（即 "cows"）。
- 提示信息的格式是 `"xAyB"`，其中 `x` 表示 bulls 的数量，`y` 表示 cows 的数量。

#### 示例：

**示例 1:**
```plaintext
输入: secret = "1807", guess = "7810"
输出: "1A3B"
解释: guess 中有 1 个 bull 和 3 个 cow，bull 是 8，cows 是 1, 0, 7。
```

**示例 2:**
```plaintext
输入: secret = "1123", guess = "0111"
输出: "1A1B"
解释: guess 中有 1 个 bull 和 1 个 cow，bull 是 1，cows 是 1。
```

#### 提示：
- `secret.length == guess.length`。
- `secret` 和 `guess` 都只包含数字，并且长度不超过 1000。

---

### 解题思路：

#### 1. **分析问题**：
   - 我们需要根据 `guess` 和 `secret` 两个字符串来判断哪些数字在正确的位置上（bulls），哪些数字在错误的位置上但值是正确的（cows）。
   - 对于 bulls，直接比较 `guess` 和 `secret` 中对应位置的数字。
   - 对于 cows，我们需要记录 `secret` 中哪些数字没有在 `guess` 的正确位置出现，之后再与 `guess` 中未正确匹配的数字进行对比，找出哪些数字出现过。

#### 2. **核心思想**：
   - **两次遍历**：
     - 第一次遍历：计算 bulls，记录未匹配的 `secret` 和 `guess`。
     - 第二次遍历：计算 cows，遍历未匹配的 `secret` 和 `guess`，找出相同的数字。
   - 使用哈希表（或者数组）来记录剩余的数字，以便找到正确的 cow。

#### 3. **具体步骤**：
   1. 初始化 `bulls` 为 0，使用两个数组 `secret_map` 和 `guess_map` 来记录未匹配的数字。
   2. 第一次遍历两个字符串，找出 bulls 的个数，并将未匹配的数字存入 `secret_map` 和 `guess_map`。
   3. 第二次遍历 `guess_map` 和 `secret_map`，找出可以形成 cows 的数字。
   4. 返回结果。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* getHint(char* secret, char* guess) {
    int bulls = 0, cows = 0;
    int secret_map[10] = {0};  // 存储 secret 中未匹配的数字
    int guess_map[10] = {0};   // 存储 guess 中未匹配的数字
    
    int length = strlen(secret);
    
    // 第一遍遍历：计算 bulls 并记录未匹配的数字
    for (int i = 0; i < length; i++) {
        if (secret[i] == guess[i]) {
            bulls++;
        } else {
            secret_map[secret[i] - '0']++;
            guess_map[guess[i] - '0']++;
        }
    }
    
    // 第二遍遍历：计算 cows
    for (int i = 0; i < 10; i++) {
        cows += (secret_map[i] < guess_map[i]) ? secret_map[i] : guess_map[i];
    }
    
    // 格式化结果字符串
    char* result = (char*)malloc(10 * sizeof(char));
    sprintf(result, "%dA%dB", bulls, cows);
    return result;
}

int main() {
    char secret[] = "1807";
    char guess[] = "7810";
    char* result = getHint(secret, guess);
    printf("Result: %s\n", result);  // 输出 "1A3B"
    free(result);
    
    return 0;
}
```

#### 说明：
1. **`secret_map` 和 `guess_map`**：用于存储未匹配的数字出现次数。
2. **`bulls` 计算**：当 `secret[i]` 和 `guess[i]` 相等时，bulls 数量加 1。
3. **`cows` 计算**：通过比较 `secret_map` 和 `guess_map` 来找出可以匹配的数字数量。

---

### C++解答：

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string getHint(string secret, string guess) {
        int bulls = 0, cows = 0;
        vector<int> secret_map(10, 0);  // 存储 secret 中未匹配的数字
        vector<int> guess_map(10, 0);   // 存储 guess 中未匹配的数字

        int length = secret.length();

        // 第一遍遍历：计算 bulls 并记录未匹配的数字
        for (int i = 0; i < length; i++) {
            if (secret[i] == guess[i]) {
                bulls++;
            } else {
                secret_map[secret[i] - '0']++;
                guess_map[guess[i] - '0']++;
            }
        }

        // 第二遍遍历：计算 cows
        for (int i = 0; i < 10; i++) {
            cows += min(secret_map[i], guess_map[i]);
        }

        // 格式化返回结果
        return to_string(bulls) + "A" + to_string(cows) + "B";
    }
};

int main() {
    Solution solution;
    string secret = "1807";
    string guess = "7810";
    cout << "Result: " << solution.getHint(secret, guess) << endl;  // 输出 "1A3B"
    return 0;
}
```

#### 说明：
1. **`secret_map` 和 `guess_map`**：使用 `vector<int>` 来记录未匹配数字的出现次数。
2. **`bulls` 计算**：如果 `secret[i]` 和 `guess[i]` 相同，则计数 bulls。
3. **`cows` 计算**：通过计算 `secret_map` 和 `guess_map` 中数字的最小值来得到 cows。

---

### 时间复杂度：
- **时间复杂度**：O(N)，其中 N 是 `secret` 和 `guess` 字符串的长度。我们遍历了两个字符串两次，每次都执行常数时间操作。
- **空间复杂度**：O(1)，因为我们只使用了固定大小的数组来记录数字，空间复杂度与输入大小无关。

---

### 总结：
通过两遍遍历：第一次计算 bulls 并记录未匹配数字，第二次计算 cows，通过比较未匹配的数字，最终得出提示信息。这个方法能够高效地处理较大的输入。