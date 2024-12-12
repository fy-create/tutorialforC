---
layout: post
title:  "45. 跳跃游戏 II"
categories: arithmetic
---

[45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii)

## Jump Game II

**题目描述：**

给定一个非负整数数组，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度。  
你的目标是使用最少的跳跃次数到达数组的最后一个位置。

**示例：**

1. 输入: [2,3,1,1,4]
   输出: 2
   解释: 跳到位置 1 (跳跃长度为 2)，然后跳到最后一个位置。
2. 输入: [2,3,0,1,4]
   输出: 2

## 解题思路：

1. 贪心算法：
   - 我们用两个变量来追踪能达到的最远位置和当前跳跃能达到的最远位置。
   - 遍历数组，同时更新这些变量，当到达当前跳跃的最远位置时，我们需要进行一次跳跃，并更新当前跳跃能达到的最远位置。
   - 继续这个过程直到到达数组的最后一个位置。

## C 语言解答：

```c
#include <stdio.h>

int jump(int* nums, int numsSize) {
    // 特殊情况处理，若数组长度为1，则不需跳跃
    if (numsSize == 1) return 0;

    int jumps = 0, curEnd = 0, curFarthest = 0;
    
    // 遍历数组，不包括最后一个元素
    for (int i = 0; i < numsSize - 1; i++) {
        // 更新当前能到达的最远位置
        curFarthest = (curFarthest > i + nums[i]) ? curFarthest : i + nums[i];
        
        // 当到达当前跳跃的最远位置时，进行一次跳跃
        if (i == curEnd) {
            jumps++;
            curEnd = curFarthest; // 更新当前跳跃的最远位置
            // 如果当前最远位置已经可以到达数组的最后一个元素，跳出循环
            if (curEnd >= numsSize - 1) break;
        }
    }
    return jumps;
}

int main() {
    int nums[] = {2, 3, 1, 1, 4};
    int size = sizeof(nums) / sizeof(nums[0]);
    printf("Minimum jumps: %d\n", jump(nums, size));
    return 0;
}
```

**代码解析：**

1. 使用贪心算法，初始化变量 `jumps` (跳跃次数), `curEnd` (当前跳跃的结束位置), `curFarthest` (当前能到达的最远位置)。
2. 遍历数组，更新 `curFarthest`。如果当前索引等于 `curEnd`，增加跳跃次数，并更新 `curEnd` 为 `curFarthest`。
3. 最终返回跳跃次数。

## C++ 语言解答：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, curFarthest = 0;
        for (int i = 0; i < nums.size() - 1; i++) {
            // 更新当前能到达的最远位置
            curFarthest = max(curFarthest, i + nums[i]);
            // 当到达当前跳跃的最远位置时，进行一次跳跃
            if (i == curEnd) {
                jumps++;
                curEnd = curFarthest; // 更新当前跳跃的最远位置
                // 如果当前最远位置已经可以到达数组的最后一个元素，跳出循环
                if (curEnd >= nums.size() - 1) break;
            }
        }
        return jumps;
    }
};

int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    Solution sol;
    cout << "Minimum jumps: " << sol.jump(nums) << endl;
    return 0;
}
```

**代码解析：**

1. 同样使用贪心算法，初始化变量 `jumps` (跳跃次数), `curEnd` (当前跳跃的结束位置), `curFarthest` (当前能到达的最远位置)。
2. 遍历数组，更新 `curFarthest`。如果当前索引等于 `curEnd`，增加跳跃次数，并更新 `curEnd` 为 `curFarthest`。
3. 最终返回跳跃次数。