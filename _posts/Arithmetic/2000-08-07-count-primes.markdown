---
layout: post
title:  "204. 计数质数"
categories: arithmetic
---

[204. 计数质数](https://leetcode.cn/problems/count-primes)

### 题目要求

**题目名称：** Count Primes (汉字：计数质数)

**题目描述：**

统计所有小于非负整数 `n` 的质数的数量。

**示例1：**
```
输入: n = 10
输出: 4
解释: 小于 10 的质数是 2, 3, 5, 7
```

**示例2：**
```
输入: n = 0
输出: 0
```

**示例3：**
```
输入: n = 1
输出: 0
```

### 提示：
- 0 <= n <= 5 * 106

### 解题思路

#### 质数的定义：
质数是大于1的自然数，且只能被1和它本身整除的数。

#### 解决方案：
1. **筛法（埃拉托斯特尼筛法）**：
   - 我们的目标是统计所有小于 `n` 的质数。首先可以通过判断每个数字是否为质数来实现，但这样做的效率比较低。
   - 埃拉托斯特尼筛法是一种非常高效的计算质数的方法，其基本思想是：从 2 开始，逐个标记出所有小于 `n` 的质数。对于每个质数 `p`，标记所有 `p` 的倍数为非质数。
   
2. **算法步骤**：
   - 创建一个布尔数组 `isPrime`，大小为 `n`，初始化为 `true`，表示所有数字初始认为是质数。
   - 从 `2` 开始遍历，对于每个数字 `i`，如果 `i` 是质数，则将其倍数标记为非质数。
   - 最后，统计布尔数组中 `true` 的数量，就是小于 `n` 的质数数量。

3. **时间复杂度**：
   - 筛法的时间复杂度是 O(n log log n)，比直接检查每个数是否为质数的 O(n√n) 更高效。

#### 具体步骤：
1. 创建一个布尔数组 `isPrime`，用来标记每个数是否是质数。
2. 对于每个小于 `n` 的数字 `i`，如果 `i` 是质数，则将 `i` 的倍数标记为非质数。
3. 最后，遍历 `isPrime` 数组，统计值为 `true` 的元素，即质数的个数。

### C语言解答

```c
#include <stdio.h>
#include <stdbool.h>

int countPrimes(int n) {
    if (n <= 2) {
        return 0;  // 小于等于 2 没有质数
    }
    
    // 创建一个布尔数组，isPrime[i] 表示 i 是否为质数
    bool isPrime[n];
    for (int i = 0; i < n; i++) {
        isPrime[i] = true;  // 初始假设所有数都是质数
    }
    isPrime[0] = isPrime[1] = false;  // 0 和 1 不是质数
    
    // 埃拉托斯特尼筛法
    for (int i = 2; i * i < n; i++) {
        if (isPrime[i]) {  // 如果 i 是质数
            for (int j = i * i; j < n; j += i) {  // 将 i 的倍数标记为非质数
                isPrime[j] = false;
            }
        }
    }
    
    // 统计质数的个数
    int count = 0;
    for (int i = 2; i < n; i++) {
        if (isPrime[i]) {
            count++;
        }
    }
    
    return count;
}

int main() {
    int n = 10;
    printf("Number of primes less than %d: %d\n", n, countPrimes(n));  // Output: 4
    return 0;
}
```

### 代码解析：
1. **`countPrimes` 函数**：该函数实现了埃拉托斯特尼筛法来计算小于 `n` 的质数数量。通过布尔数组 `isPrime` 来标记每个数是否为质数。
2. **主函数**：在主函数中，调用 `countPrimes` 函数并打印结果。

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 计算小于 n 的质数数量
    int countPrimes(int n) {
        if (n <= 2) {
            return 0;  // 小于等于 2 没有质数
        }

        // 创建一个布尔数组 isPrime，isPrime[i] 表示 i 是否为质数
        vector<bool> isPrime(n, true);
        isPrime[0] = isPrime[1] = false;  // 0 和 1 不是质数
        
        // 埃拉托斯特尼筛法
        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {  // 如果 i 是质数
                for (int j = i * i; j < n; j += i) {  // 将 i 的倍数标记为非质数
                    isPrime[j] = false;
                }
            }
        }
        
        // 统计质数的个数
        int count = 0;
        for (int i = 2; i < n; i++) {
            if (isPrime[i]) {
                count++;
            }
        }
        
        return count;
    }
};

int main() {
    Solution solution;
    int n = 10;
    cout << "Number of primes less than " << n << ": " << solution.countPrimes(n) << endl;  // Output: 4
    return 0;
}
```

### 代码解析：
1. **`countPrimes` 方法**：该方法使用埃拉托斯特尼筛法来计算小于 `n` 的质数数量。使用 `vector<bool>` 来实现布尔数组 `isPrime`，并进行质数筛选。
2. **主函数**：在主函数中，创建 `Solution` 类对象 `solution`，调用 `countPrimes` 方法并打印结果。

### 总结

- **时间复杂度**：O(n log log n)，因为筛法的时间复杂度是 O(n log log n)。
- **空间复杂度**：O(n)，我们使用了一个布尔数组来标记每个数是否为质数。

埃拉托斯特尼筛法是一种非常高效的算法，用于求解质数问题。通过筛选法，可以快速地找出所有小于 `n` 的质数，从而提高了计算速度。