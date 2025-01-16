---
layout: post
title:  "45. 跳跃游戏 II"
categories: arithmetic
---

[45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii)

## 题目要求

### 描述：
给定一个非负整数数组 `nums` ，你最初位于数组的第一个位置。数组中的每个元素代表你在该位置可以跳跃的最大长度，求你能够到达最后一个位置的最小跳跃次数。

你可以假设每次跳跃都不会超过 `nums[i]` ，并且每次跳跃只能跳到一个数组位置。

### 示例 1：

**输入：**
```text
nums = [2,3,1,1,4]
```

**输出：**
```text
2
```

**解释：**
跳跃 1 步从索引 0 到索引 1，跳跃 2 步从索引 1 到最后一个索引。

### 示例 2：

**输入：**
```text
nums = [2,3,0,1,4]
```

**输出：**
```text
2
```

**解释：**
跳跃 1 步从索引 0 到索引 1，跳跃 2 步从索引 1 到最后一个索引。

### 提示：
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 1000

## 解题思路

### 思路：
1. **贪心算法**：
   - 每次都选择可以跳得最远的位置。通过遍历 `nums` 数组，记录当前能到达的最远位置，并且使用 `steps` 变量记录需要的最小跳跃次数。
   - 每次在遍历过程中，我们都会计算从当前位置能跳跃到的最大位置，并维护一个变量 `farthest` 来存储当前跳跃的最大范围。
   - 每当我们遍历到当前跳跃的最远位置时，就增加跳跃次数，并更新 `current_end`（当前跳跃的最远位置）。
   - 直到当前位置能够到达最后一个位置时停止。

2. **优化的贪心算法**：
   - 我们不需要记录跳跃路径，只关心最小跳跃次数。通过一次遍历计算出结果即可。

3. **边界条件**：
   - 当 `nums` 长度为 1 时，已经在终点，不需要跳跃，直接返回 0。

### 代码实现：

#### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 贪心算法：每次选择能够跳跃到的最远位置
int jump(int* nums, int numsSize) {
    if (numsSize <= 1) {
        return 0;  // 已经在目标位置
    }
    
    int jumps = 0;  // 跳跃次数
    int current_end = 0;  // 当前跳跃的最远位置
    int farthest = 0;  // 当前能够跳跃到的最远位置
    
    for (int i = 0; i < numsSize; i++) {
        farthest = fmax(farthest, i + nums[i]);  // 更新最远可以跳跃到的位置
        
        // 当走到当前跳跃的最远位置时，增加跳跃次数，并更新当前跳跃的最远位置
        if (i == current_end) {
            jumps++;
            current_end = farthest;
            if (current_end >= numsSize - 1) {
                break;  // 如果已经能到达最后位置，停止遍历
            }
        }
    }
    
    return jumps;
}

int main() {
    int nums[] = {2, 3, 1, 1, 4};
    int size = sizeof(nums) / sizeof(nums[0]);
    
    printf("Minimum jumps required: %d\n", jump(nums, size));
    
    return 0;
}
```

#### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        if (n <= 1) return 0;  // 如果数组长度小于等于1，不需要跳跃
        
        int jumps = 0;  // 记录跳跃次数
        int current_end = 0;  // 当前跳跃的最远位置
        int farthest = 0;  // 当前能够跳跃到的最远位置
        
        for (int i = 0; i < n; i++) {
            farthest = max(farthest, i + nums[i]);  // 更新最远可以跳跃到的位置
            
            // 如果到达了当前跳跃的最远位置，增加跳跃次数
            if (i == current_end) {
                jumps++;
                current_end = farthest;
                if (current_end >= n - 1) {
                    break;  // 如果已经能够到达最后位置，跳出循环
                }
            }
        }
        
        return jumps;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {2, 3, 1, 1, 4};
    
    int result = solution.jump(nums);
    cout << "Minimum jumps required: " << result << endl;
    
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **初始化**：
   - `jumps` 记录最小跳跃次数。
   - `current_end` 用于记录当前跳跃的最远位置。
   - `farthest` 记录当前能够跳跃到的最远位置。

2. **遍历 `nums`**：
   - 对每个位置 `i`，更新 `farthest`（最远可达位置）。
   - 当当前位置 `i` 等于当前跳跃的最远位置时，增加跳跃次数，并更新 `current_end` 为 `farthest`。
   - 如果跳跃后已经能够到达终点，则停止计算。

3. **最终返回**：
   - 返回最小跳跃次数。

#### C++ 解答：
- C++ 的解法与 C 语言非常相似，使用了 `vector<int>` 来存储数组，并利用 `max()` 函数来更新最远可达位置。
- `Solution` 类封装了解决问题的核心函数 `jump()`，使得代码更加模块化，适合 Leetcode 这样的面试题框架。

### 时间复杂度：
- **时间复杂度**：O(n)，其中 `n` 是数组 `nums` 的长度。我们只需要遍历一次 `nums` 数组，计算最小跳跃次数。
- **空间复杂度**：O(1)，只用了常数空间来存储一些变量。

### 小结：
- 本题通过贪心算法优化了跳跃次数的计算，每次选择跳跃到能够到达的最远位置，确保每次跳跃都尽可能多地覆盖数组中的元素，最终得出最小的跳跃次数。
