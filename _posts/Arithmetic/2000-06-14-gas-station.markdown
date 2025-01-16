---
layout: post
title:  "134. 加油站"
categories: arithmetic
---

[134. 加油站](https://leetcode.cn/problems/gas-station)

### 题目描述

[LeetCode 原题链接 - 加油站](https://leetcode.cn/problems/gas-station)

在一条环路上有 `n` 个加油站，其中第 `i` 个加油站有汽油 `gas[i]` 升。  
你有一辆油箱容量无限的汽车，从第 `i` 个加油站开往第 `i+1` 个加油站需要消耗汽油 `cost[i]` 升。  
你从其中的一个加油站出发，开始时油箱为空。

给定两个整数数组 `gas` 和 `cost` ，如果你可以绕环路行驶一周，则返回出发时的加油站编号，否则返回 `-1` 。  
如果存在解，则保证它是唯一的。

---

#### 示例 1：
```
输入: gas = [1,2,3,4,5], cost = [3,4,5,1,2]
输出: 3
解释:
从 3 号加油站（索引为 3 ）出发，可获得 4 升汽油。此时油箱有 4 升汽油。
开往 4 号加油站消耗 1 升汽油，剩余 3 升。
到达 4 号加油站获得 5 升汽油，剩余 8 升。
开往 0 号加油站消耗 2 升汽油，剩余 6 升。
到达 0 号加油站获得 1 升汽油，剩余 7 升。
开往 1 号加油站消耗 3 升汽油，剩余 4 升。
到达 1 号加油站获得 2 升汽油，剩余 6 升。
开往 2 号加油站消耗 4 升汽油，剩余 2 升。
到达 2 号加油站获得 3 升汽油，剩余 5 升。
开往 3 号加油站消耗 5 升汽油，剩余 0 升。
成功绕环路一周。
```

#### 示例 2：
```
输入: gas = [2,3,4], cost = [3,4,3]
输出: -1
解释:
无论从哪个加油站出发，你都无法绕环路行驶一周。
```

---

#### 提示：
1. \( n == gas.length == cost.length \)
2. \( 1 <= n <= 10^5 \)
3. \( 0 <= gas[i], cost[i] <= 10^4 \)

---

### 解题思路

1. **总油量判断是否有解：**
   - 如果 `sum(gas) < sum(cost)`，说明总油量不足以绕环路一圈，直接返回 `-1`。

2. **单次遍历寻找起点：**
   - 使用一个变量 `tank` 表示当前油箱的剩余汽油量。
   - 如果从某个加油站出发油箱变成负值，说明无法从该加油站及之前的加油站作为起点，起点更新为下一个加油站。
   - 遍历结束后，如果总油量 `sum(gas) >= sum(cost)`，则当前记录的起点即为答案。

3. **时间复杂度：**
   - 单次遍历时间复杂度为 \(O(n)\)。

---

### C语言实现

#### 函数原型
```c
int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize);
```

#### 完整代码
```c
#include <stdio.h>

int canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) {
    int totalTank = 0; // 总油量与总消耗
    int currTank = 0;  // 当前油箱剩余量
    int startIndex = 0; // 记录起始加油站

    for (int i = 0; i < gasSize; i++) {
        totalTank += gas[i] - cost[i];
        currTank += gas[i] - cost[i];

        // 如果当前油箱变成负值，说明无法从当前起点到达 i+1
        if (currTank < 0) {
            startIndex = i + 1; // 更新起点为下一个加油站
            currTank = 0;       // 重置当前油箱
        }
    }

    // 如果总油量不足，返回 -1
    return totalTank >= 0 ? startIndex : -1;
}

// 测试函数
int main() {
    int gas[] = {1, 2, 3, 4, 5};
    int cost[] = {3, 4, 5, 1, 2};
    int gasSize = sizeof(gas) / sizeof(gas[0]);
    int costSize = sizeof(cost) / sizeof(cost[0]);

    int result = canCompleteCircuit(gas, gasSize, cost, costSize);
    printf("结果: %d\n", result);

    return 0;
}
```

---

### C++ 实现

#### 类定义
```cpp
#include <vector>
#include <iostream>
using namespace std;

class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalTank = 0; // 总油量与总消耗
        int currTank = 0;  // 当前油箱剩余量
        int startIndex = 0; // 记录起始加油站

        for (int i = 0; i < gas.size(); ++i) {
            totalTank += gas[i] - cost[i];
            currTank += gas[i] - cost[i];

            // 如果当前油箱变成负值，说明无法从当前起点到达 i+1
            if (currTank < 0) {
                startIndex = i + 1; // 更新起点为下一个加油站
                currTank = 0;       // 重置当前油箱
            }
        }

        // 如果总油量不足，返回 -1
        return totalTank >= 0 ? startIndex : -1;
    }
};

// 测试函数
int main() {
    vector<int> gas = {1, 2, 3, 4, 5};
    vector<int> cost = {3, 4, 5, 1, 2};

    Solution sol;
    int result = sol.canCompleteCircuit(gas, cost);

    cout << "结果: " << result << endl;

    return 0;
}
```

C 和 C++ 的实现均采用贪心策略，逻辑清晰，代码包含详细注释，并提供了测试调用。若有任何问题，欢迎继续讨论！