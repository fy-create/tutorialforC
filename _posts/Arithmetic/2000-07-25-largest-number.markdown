---
layout: post
title:  "179. 最大数"
categories: arithmetic
---

[179. 最大数](https://leetcode.cn/problems/largest-number)

### 题目描述

给定一组非负整数 `nums`，重新排列它们的顺序使之组成一个最大的整数。

**注意:** 输出结果可能非常大，所以你需要返回一个字符串而不是整数。

**示例 1:**

```
输入: nums = [10,2]
输出: "210"
```

**示例 2:**

```
输入: nums = [3,30,34,5,9]
输出: "9534330"
```

**示例 3:**

```
输入: nums = [1]
输出: "1"
```

**示例 4:**

```
输入: nums = [10]
输出: "10"
```

**提示:**

- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 10^9`

---

### 解题思路

1. **自定义排序**：
   - 将数组中的数字转换为字符串，然后对字符串进行排序。
   - 排序规则：对于两个字符串 `a` 和 `b`，如果 `a + b > b + a`，则 `a` 应该排在 `b` 前面。

2. **拼接结果**：
   - 将排序后的字符串数组拼接成一个字符串。

3. **处理特殊情况**：
   - 如果排序后的第一个字符串是 "0"，则直接返回 "0"（避免出现 "00" 的情况）。

---

### C语言实现

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 比较函数，用于排序
int compare(const void* a, const void* b) {
    char str1[20], str2[20];
    sprintf(str1, "%d", *(int*)a);
    sprintf(str2, "%d", *(int*)b);

    char s1[40], s2[40];
    sprintf(s1, "%s%s", str1, str2);
    sprintf(s2, "%s%s", str2, str1);

    return strcmp(s2, s1); // 降序排列
}

char* largestNumber(int* nums, int numsSize) {
    // 将数组中的数字转换为字符串并排序
    qsort(nums, numsSize, sizeof(int), compare);

    // 处理特殊情况：如果最大的数字是 0，则直接返回 "0"
    if (nums[0] == 0) {
        char* result = (char*)malloc(2 * sizeof(char));
        strcpy(result, "0");
        return result;
    }

    // 计算结果字符串的长度
    int totalLength = 0;
    for (int i = 0; i < numsSize; i++) {
        char str[20];
        sprintf(str, "%d", nums[i]);
        totalLength += strlen(str);
    }

    // 分配内存并拼接结果
    char* result = (char*)malloc((totalLength + 1) * sizeof(char));
    result[0] = '\0';
    for (int i = 0; i < numsSize; i++) {
        char str[20];
        sprintf(str, "%d", nums[i]);
        strcat(result, str);
    }

    return result;
}

int main() {
    int nums[] = {3, 30, 34, 5, 9};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    char* result = largestNumber(nums, numsSize);
    printf("最大整数: %s\n", result); // 输出 "9534330"
    free(result);
    return 0;
}
```

---

### C++ 实现

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Solution {
public:
    string largestNumber(vector<int>& nums) {
        // 将数组中的数字转换为字符串
        vector<string> numStrs;
        for (int num : nums) {
            numStrs.push_back(to_string(num));
        }

        // 自定义排序
        sort(numStrs.begin(), numStrs.end(), [](string& a, string& b) {
            return a + b > b + a;
        });

        // 处理特殊情况：如果最大的数字是 "0"，则直接返回 "0"
        if (numStrs[0] == "0") {
            return "0";
        }

        // 拼接结果
        string result;
        for (string& str : numStrs) {
            result += str;
        }

        return result;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {3, 30, 34, 5, 9};
    string result = solution.largestNumber(nums);
    cout << "最大整数: " << result << endl; // 输出 "9534330"
    return 0;
}
```

---

### 测试用例

#### 输入 1
```
nums = [10,2]
```
#### 输出 1
```
"210"
```

#### 输入 2
```
nums = [3,30,34,5,9]
```
#### 输出 2
```
"9534330"
```

#### 输入 3
```
nums = [1]
```
#### 输出 3
```
"1"
```

#### 输入 4
```
nums = [10]
```
#### 输出 4
```
"10"
```

---

### 复杂度分析

- **时间复杂度**：O(N log N)，其中 N 是数组的长度。排序的时间复杂度为 O(N log N)。
- **空间复杂度**：O(N)，用于存储字符串数组和结果字符串。

---

### 总结

通过自定义排序规则，我们可以将数组中的数字重新排列成最大的整数。这种方法能够处理各种边界条件，并确保结果的正确性。