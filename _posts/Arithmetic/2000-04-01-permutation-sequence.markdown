---
layout: post
title:  "60. 排列序列"
categories: arithmetic
---

[60. 排列序列](https://leetcode.cn/problems/permutation-sequence)

### 题目要求

**题目名称**: 排列序列

**题目描述**:  
给定 `n` 和 `k`，返回第 `k` 个排列。请注意，`n` 的范围是 `[1, 9]`，`k` 的范围是 `[1, n!]`。

**输入**:  
- 一个整数 `n`，表示数字的个数。
- 一个整数 `k`，表示排列的序号（从 1 开始）。

**输出**:  
- 返回第 `k` 个排列的字符串。

**示例 1**:  
输入：`n = 3, k = 3`  
输出：`"213"`

**示例 2**:  
输入：`n = 4, k = 9`  
输出：`"2314"`

**提示**:  
- 1 <= n <= 9
- 1 <= k <= n!

### 解题思路

1. **排列的基本性质**:  
   对于一个包含 `n` 个元素的排列，其排列总数是 `n!`（n的阶乘）。每个数字的选择会影响后续数字的排列。因此，可以利用这种递推关系来生成第 `k` 个排列。

2. **思路分析**:
   - 假设我们已经确定了第 `i` 个位置的数字，剩下的位置继续按照相同的方式确定。
   - 对于每一位数字：
     - 每一个数字能生成的排列数为 `(n-1)!`。例如，如果 `n=4`，那么固定某一位后，剩下的 `3` 个数字的排列数是 `3! = 6`。所以，第一位的选择可以通过对 `k` 进行整除和取余来快速定位。
     - 将 `k` 分成不同的区段。区间大小为 `(n-1)!`，即每选择一个数字就跳过相应的区间。

3. **步骤**:
   - 创建一个包含 `1` 到 `n` 的数字列表。
   - 利用数学方法和区间划分来确定每一位的数字。
   - 逐步缩小问题规模，直到所有数字都被确定。
   
4. **时间复杂度**:  
   时间复杂度为 O(n)，因为每次确定一个数字，剩下的问题规模逐步减小。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 计算n的阶乘
int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

// 返回第k个排列的字符串
char* getPermutation(int n, int k) {
    // 创建一个数字数组 1 到 n
    int* nums = (int*)malloc(sizeof(int) * n);
    for (int i = 0; i < n; i++) {
        nums[i] = i + 1;
    }

    // 初始化k为从0开始的索引
    k--;  
    char* result = (char*)malloc(sizeof(char) * (n + 1));
    result[n] = '\0';  // 结果字符串末尾加上 '\0'

    // 计算每一位的数字
    for (int i = 0; i < n; i++) {
        int fact = factorial(n - 1 - i);  // (n-1-i)! 即剩余数字的排列数
        int index = k / fact;  // 当前选择的数字索引
        result[i] = nums[index] + '0';  // 转为字符并添加到结果中

        // 删除已经选择的数字
        for (int j = index; j < n - 1; j++) {
            nums[j] = nums[j + 1];
        }
        
        k %= fact;  // 更新k，指向剩余数字中应选择的位置
    }

    free(nums);
    return result;
}

int main() {
    int n = 3, k = 3;  // 示例输入
    char* result = getPermutation(n, k);
    printf("The %d-th permutation is: %s\n", k, result);
    free(result);
    return 0;
}
```

### C++ 语言解答

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    // 计算n的阶乘
    int factorial(int n) {
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // 返回第k个排列的字符串
    string getPermutation(int n, int k) {
        // 创建一个数字数组 1 到 n
        vector<int> nums;
        for (int i = 1; i <= n; i++) {
            nums.push_back(i);
        }

        k--;  // 将k调整为从0开始的索引
        string result = "";

        // 计算每一位的数字
        for (int i = 0; i < n; i++) {
            int fact = factorial(n - 1 - i);  // (n-1-i)! 即剩余数字的排列数
            int index = k / fact;  // 当前选择的数字索引
            result += to_string(nums[index]);  // 将数字转为字符并添加到结果中

            // 删除已经选择的数字
            nums.erase(nums.begin() + index);
            k %= fact;  // 更新k，指向剩余数字中应选择的位置
        }

        return result;
    }
};

int main() {
    Solution solution;
    int n = 3, k = 3;  // 示例输入
    string result = solution.getPermutation(n, k);
    cout << "The " << k << "-th permutation is: " << result << endl;
    return 0;
}
```

### 说明

1. **C语言解答**:
   - 我们首先创建一个包含从 1 到 n 的数字数组，然后在每个步骤中计算当前应该选择哪个数字。
   - 通过计算 `(n-1)!`，我们知道每个数字所能生成的排列数，从而确定第 `k` 个排列的每个数字。
   - 选择数字后，我们更新 `k`，并从列表中删除已选择的数字。
   - 最后，将结果保存为字符串，并返回。

2. **C++解答**:
   - 使用 `vector<int>` 存储数字集合，`to_string` 函数将整数转换为字符串。
   - 通过不断减少问题规模并更新 `k`，我们找到了每一位应选的数字。
   - 每次选择一个数字后，使用 `erase` 删除选中的数字，并更新 `k` 的值。

两种语言的实现采用相同的思路，并且代码简洁易懂，逐步解出排列的每一位。