---
layout: post
title:  "42. 接雨水"
categories: arithmetic
---

[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water)

### 题目描述：
给定一个整数数组 `height`，表示每个柱子的高度。计算这些柱子之间可以接多少雨水。

**示例：**

**输入：** height = [0,1,0,2,1,0,1,3,2,1,2,1]

**输出：** 6

**解释：** 雨水可以储存在柱子的顶部，总量为 6。

---

### 解题思路：

1. **动态规划法**：
   - 记录每个柱子左边的最高柱子高度 `left_max` 和右边的最高柱子高度 `right_max`。
   - 对于每个柱子，其能容纳的雨水量为 `min(left_max[i], right_max[i]) - height[i]`。

2. **双指针法**：
   - 使用两个指针分别从左右两端向中间移动。
   - 每次移动较低的一侧，根据当前的高度和最大高度计算储水量。

3. **时间复杂度和空间复杂度**：
   - 时间复杂度：O(n)。
   - 空间复杂度：动态规划法为 O(n)，双指针法为 O(1)。

---

### C 语言实现
```c
#include <stdio.h>

int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;

    int left_max[heightSize];
    int right_max[heightSize];
    int water = 0;

    left_max[0] = height[0];
    for (int i = 1; i < heightSize; i++) {
        left_max[i] = (height[i] > left_max[i - 1]) ? height[i] : left_max[i - 1];
    }

    right_max[heightSize - 1] = height[heightSize - 1];
    for (int i = heightSize - 2; i >= 0; i--) {
        right_max[i] = (height[i] > right_max[i + 1]) ? height[i] : right_max[i + 1];
    }

    for (int i = 0; i < heightSize; i++) {
        int min_height = (left_max[i] < right_max[i]) ? left_max[i] : right_max[i];
        if (min_height > height[i]) {
            water += min_height - height[i];
        }
    }

    return water;
}

int main() {
    int height[] = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    int size = sizeof(height) / sizeof(height[0]);
    printf("储水总量: %d\n", trap(height, size));
    return 0;
}
```

---

### C++ 实现
```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;

        vector<int> left_max(n), right_max(n);
        left_max[0] = height[0];
        for (int i = 1; i < n; i++) {
            left_max[i] = max(left_max[i - 1], height[i]);
        }

        right_max[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            right_max[i] = max(right_max[i + 1], height[i]);
        }

        int water = 0;
        for (int i = 0; i < n; i++) {
            water += min(left_max[i], right_max[i]) - height[i];
        }

        return water;
    }
};

int main() {
    vector<int> height = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    Solution sol;
    cout << "储水总量: " << sol.trap(height) << endl;
    return 0;
}
```
    