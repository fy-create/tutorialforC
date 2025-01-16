---
layout: post
title:  "165. 比较版本号"
categories: arithmetic
---

[165. 比较版本号](https://leetcode.cn/problems/compare-version-numbers)

### 题目描述

**题目：比较版本号**

给定两个版本号 `version1` 和 `version2`，比较它们的大小。

版本号由一系列以点 `.` 分隔的数字字符串组成。每个数字字符串表示一个整数，不含前导零。

你需要实现一个函数来比较两个版本号，支持以下规则：

- 如果 `version1 > version2`，返回 `1`。
- 如果 `version1 < version2`，返回 `-1`。
- 如果 `version1 == version2`，返回 `0`。

**示例 1：**

```plaintext
输入: version1 = "1.01", version2 = "1.001"
输出: 0
解释：两个版本号都表示相同的版本 "1.1"
```

**示例 2：**

```plaintext
输入: version1 = "1.0", version2 = "1.0.0"
输出: 0
解释：两个版本号都表示相同的版本 "1.0"
```

**示例 3：**

```plaintext
输入: version1 = "0.1", version2 = "1.1"
输出: -1
解释：version1 < version2
```

**提示：**
- 版本号的字符串仅由数字和点字符组成。
- 版本号可能包含多个数字，并且可以有前导零。
- 两个版本号的字符串长度不超过 1000。

---

### 解题思路

为了比较两个版本号，最直观的方法是将每个版本号按点 `.` 拆分成一个整数数组，然后逐个比较每个位置的数字。

1. **拆分版本号**：
   - 通过 `split()` 函数或手动遍历字符串，将版本号拆分成一个数字数组。例如 `"1.0.0"` 会被拆分成 `[1, 0, 0]`。
   
2. **逐个比较数字**：
   - 对两个拆分后的数字数组进行逐个比较。
   - 如果在某个位置，两个版本号的数字不同，返回较大的版本号所对应的结果。
   - 如果某个版本号数组已经结束，而另一个版本号数组还有更多的数字（即该版本号没有提供数字），则认为结束的版本号为较小的版本。

3. **处理不同长度的版本号**：
   - 如果一个版本号比另一个版本号长，那么短的版本号可以补充 `0` 来进行比较。例如 `"1.0"` 可以认为是 `"1.0.0"`，这样就可以进行逐项比较。

4. **返回结果**：
   - 如果两个版本号完全一致，则返回 `0`，否则返回 `1` 或 `-1`。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int compareVersion(char *version1, char *version2) {
    int i = 0, j = 0;
    int len1 = strlen(version1), len2 = strlen(version2);
    
    // 逐个比较两个版本号的各个部分
    while (i < len1 || j < len2) {
        int num1 = 0, num2 = 0;
        
        // 计算version1的当前部分
        while (i < len1 && version1[i] != '.') {
            num1 = num1 * 10 + (version1[i] - '0');
            i++;
        }
        i++;  // 跳过点

        // 计算version2的当前部分
        while (j < len2 && version2[j] != '.') {
            num2 = num2 * 10 + (version2[j] - '0');
            j++;
        }
        j++;  // 跳过点

        // 比较两个部分的值
        if (num1 > num2) return 1;
        if (num1 < num2) return -1;
    }
    
    // 如果所有部分都相等，返回0
    return 0;
}

int main() {
    char version1[] = "1.01";
    char version2[] = "1.001";
    int result = compareVersion(version1, version2);
    printf("比较结果：%d\n", result);  // 应该输出 0
    
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

class Solution {
public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0;
        int len1 = version1.size(), len2 = version2.size();

        // 逐个比较两个版本号的各个部分
        while (i < len1 || j < len2) {
            int num1 = 0, num2 = 0;

            // 计算version1的当前部分
            while (i < len1 && version1[i] != '.') {
                num1 = num1 * 10 + (version1[i] - '0');
                i++;
            }
            i++;  // 跳过点

            // 计算version2的当前部分
            while (j < len2 && version2[j] != '.') {
                num2 = num2 * 10 + (version2[j] - '0');
                j++;
            }
            j++;  // 跳过点

            // 比较两个部分的值
            if (num1 > num2) return 1;
            if (num1 < num2) return -1;
        }

        // 如果所有部分都相等，返回0
        return 0;
    }
};

int main() {
    Solution solution;
    string version1 = "1.01";
    string version2 = "1.001";
    int result = solution.compareVersion(version1, version2);
    cout << "比较结果：" << result << endl;  // 应该输出 0
    
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **使用 `while` 循环遍历两个版本号**：
   - 通过 `i` 和 `j` 分别遍历 `version1` 和 `version2`，直到两个版本号的所有部分都被比较完。
   
2. **提取当前部分的数字**：
   - 使用 `while` 循环提取每个版本号中当前点 `.` 之前的数字部分。通过 `num1 = num1 * 10 + (version1[i] - '0')` 的方式将字符转为数字并构建完整的数字。

3. **比较当前部分的数字**：
   - 如果 `num1 > num2`，则 `version1` 更大，返回 `1`；如果 `num1 < num2`，则 `version2` 更大，返回 `-1`。

4. **跳过点字符**：
   - 每次在提取数字后，通过 `i++` 和 `j++` 跳过当前的点 `.`。

5. **返回结果**：
   - 如果所有部分都相等，则返回 `0`。

#### C++解答：
1. **C++ 中使用 `string` 类型**：
   - 使用 `string` 类型来处理版本号，相较于 C 语言的字符数组，`string` 更加灵活。

2. **STL 的 `while` 循环和字符串操作**：
   - 通过 `while` 循环遍历字符串并提取每部分的数字，`string` 提供了更简便的字符串操作方法。

3. **简化的 `if` 条件判断**：
   - C++ 使用 `if` 语句比较当前的数字部分，返回相应的结果。

### 结论

- 该解法的时间复杂度是 O(n + m)，其中 `n` 和 `m` 分别是 `version1` 和 `version2` 的长度。
- 空间复杂度是 O(1)，因为我们只使用了少量的额外空间来存储当前数字的值。
