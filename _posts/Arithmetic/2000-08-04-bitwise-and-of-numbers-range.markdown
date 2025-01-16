---
layout: post
title:  "201. 数字范围按位与"
categories: arithmetic
---

[201. 数字范围按位与](https://leetcode.cn/problems/bitwise-and-of-numbers-range)

### 题目要求

**题目名称：** Bitwise AND of Numbers Range (汉字：数字范围按位与)

**题目描述：**

给定一个范围 `[m, n]` ，其中 `0 <= m <= n <= 2147483647` ，返回该范围内所有数字的按位与（bitwise AND）。

**示例1：**
```
输入: m = 5, n = 7
输出: 4
解释:
5  = 101
6  = 110
7  = 111
从 5 到 7 的按位与结果是 4，结果为 100。
```

**示例2：**
```
输入: m = 0, n = 0
输出: 0
```

**示例3：**
```
输入: m = 1, n = 2147483647
输出: 0
```

### 提示：
- 0 <= m <= n <= 2147483647

### 解题思路

这道题要求我们计算 `m` 到 `n` 之间所有数字的按位与。可以看出，直接对范围内的每个数进行按位与运算可能效率较低，尤其是在范围较大时。为了高效地解决问题，可以考虑以下几个观察和优化：

#### 关键观察：
1. **按位与的性质**：
   - 按位与操作会将两个数的对应位都为 `1` 时，结果才为 `1`，否则为 `0`。
   - 如果 `m` 和 `n` 在二进制表示中，某些高位开始出现不相同的数字，那么在这些位及其之后的所有位的按位与结果必然是 `0`，即从某一位开始，按位与结果将永远是 `0`。
   
2. **区间缩小的优化**：
   - 如果 `m` 和 `n` 不同，并且 `m` 和 `n` 的高位（从左到右）不同，那么它们之间的按位与的结果必然会有 `0`，因为从某些高位开始，所有数字之间的按位与结果都变为 `0`。
   - 因此，逐步让 `m` 和 `n` 的值相等，直到它们的高位相同。在此过程中，逐渐缩小区间，可以加速计算。

#### 算法：
1. **从低位开始对比**：
   - 对比 `m` 和 `n` 的二进制表示，从最低位开始，逐位对比，直到它们的高位相同为止。然后返回这些相同的高位部分，低位部分则为 `0`。
2. **通过右移操作**：
   - 如果 `m` 和 `n` 不相等，右移 `m` 和 `n`，直到它们相等。右移的次数即为低位部分会变为 `0` 的数量。

#### 具体步骤：
1. 将 `m` 和 `n` 右移，直到它们相等。
2. 记录右移的次数。
3. 将 `m` 左移回去，得到结果。

### C语言解答

```c
#include <stdio.h>

// 计算范围 [m, n] 之间所有数字的按位与
int rangeBitwiseAnd(int m, int n) {
    int shift = 0;
    
    // 直到 m 和 n 相等，右移 m 和 n
    while (m < n) {
        m >>= 1;
        n >>= 1;
        shift++;
    }
    
    // 将 m 左移回去，得到最终的结果
    return m << shift;
}

int main() {
    int m = 5, n = 7;
    int result = rangeBitwiseAnd(m, n);
    printf("Result: %d\n", result);  // Output: 4
    return 0;
}
```

### 代码解析：
1. **`rangeBitwiseAnd` 函数**：
   - 使用 `while` 循环将 `m` 和 `n` 右移，直到它们相等。每次右移一次，`shift` 计数增加 1。
   - 最后将 `m` 左移 `shift` 次，得到结果。
2. **主函数**：
   - 输入 `m = 5`, `n = 7`，调用 `rangeBitwiseAnd` 函数计算结果并输出。

### C++ 解答

```cpp
#include <iostream>
using namespace std;

class Solution {
public:
    // 计算范围 [m, n] 之间所有数字的按位与
    int rangeBitwiseAnd(int m, int n) {
        int shift = 0;
        
        // 直到 m 和 n 相等，右移 m 和 n
        while (m < n) {
            m >>= 1;
            n >>= 1;
            shift++;
        }
        
        // 将 m 左移回去，得到最终的结果
        return m << shift;
    }
};

int main() {
    Solution solution;
    
    int m = 5, n = 7;
    int result = solution.rangeBitwiseAnd(m, n);
    
    cout << "Result: " << result << endl;  // Output: 4
    return 0;
}
```

### 代码解析：
1. **`rangeBitwiseAnd` 方法**：
   - 使用 `while` 循环将 `m` 和 `n` 右移，直到它们相等。每次右移一次，`shift` 计数增加 1。
   - 最后将 `m` 左移 `shift` 次，得到结果。
2. **主函数**：
   - 创建 `Solution` 类的对象 `solution`，调用 `rangeBitwiseAnd` 方法计算结果并输出。

### 总结

- **时间复杂度**：O(log(n - m))。我们每次右移 `m` 和 `n`，直到它们相等。由于每次右移会减少一个比特位，最多需要对数时间。
- **空间复杂度**：O(1)。我们只用了常量级的额外空间。

此解法利用了按位与操作的性质，显著减少了计算的复杂度，适合处理大范围的数字。