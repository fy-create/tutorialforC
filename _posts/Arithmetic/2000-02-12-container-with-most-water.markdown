---
layout: post
title:  "11. 盛最多水的容器"
categories: arithmetic
---

[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water)

### 题目：盛最多水的容器 (Container With Most Water)

#### 题目要求：
给定一个长度为 `n` 的整数数组 `height`，其中每个 `height[i]` 代表坐标为 `i` 的位置上横线的高度。现在从 `i=0` 到 `i=n-1` 有若干竖直的线条，求这两条线之间能够容纳的最大水量。

- 你可以假设 `i` 和 `j` 之间的水量是由 `min(height[i], height[j]) * (j - i)` 来计算的。
- 其中，`height[i]` 和 `height[j]` 分别是两条线的高度，`(j - i)` 是两条线之间的横向距离。

**示例：**

**示例 1:**
```
输入: height = [1,8,6,2,5,4,8,3,7]
输出: 49
解释: 图中竖直线之间最大水量为 49，容器是由索引 1 和索引 8 的竖直线构成的，宽度为 8 - 1 = 7，最小高度为 min(8, 7) = 7，所以最大水量为 7 * 7 = 49。
```

**示例 2:**
```
输入: height = [1,1]
输出: 1
解释: 只有两条线，它们之间的水量为 1。
```

#### 提示：
1. `n` 的值在 `[2, 10^5]` 之间。
2. `height[i]` 的值在 `[0, 10^4]` 之间。

---

### 解题思路：

这个问题的关键是理解水量的计算方法：水量由两条竖直线之间的距离（`j - i`）和两条竖直线的高度（`min(height[i], height[j])`）共同决定。

#### 思路：
1. **暴力法**：
   - 你可以枚举所有的 `i` 和 `j`，计算每一对竖直线之间的水量，最终选择最大的水量。
   - 但是，这种方法的时间复杂度是 O(n^2)，当 n 很大时，效率非常低。

2. **双指针法**：
   - 采用双指针法可以将时间复杂度降到 O(n)。具体做法是使用两个指针分别从数组的两端开始，指向最左端和最右端的竖直线。
   - 每次计算当前两端指针所指的水量，并更新最大水量。然后根据高度较小的竖直线的高度移动相应的指针，因为高度较小的竖直线限制了水量的大小，所以移动较小的一边可能会找到更大的水量。
   - 直到两个指针相遇为止。

#### C 语言解法：

```c
#include <stdio.h>

int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int max_water = 0;

    while (left < right) {
        // 计算当前水量
        int width = right - left;
        int min_height = height[left] < height[right] ? height[left] : height[right];
        int water = width * min_height;

        // 更新最大水量
        if (water > max_water) {
            max_water = water;
        }

        // 移动指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max_water;
}

int main() {
    int height[] = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    int heightSize = sizeof(height) / sizeof(height[0]);
    int result = maxArea(height, heightSize);
    printf("Maximum area: %d\n", result);  // 输出 49
    return 0;
}
```

---

### C++ 解法：

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int max_water = 0;

        // 双指针法
        while (left < right) {
            // 计算当前水量
            int width = right - left;
            int min_height = min(height[left], height[right]);
            int water = width * min_height;

            // 更新最大水量
            max_water = max(max_water, water);

            // 移动指针
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return max_water;
    }
};

int main() {
    Solution solution;
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    int result = solution.maxArea(height);
    cout << "Maximum area: " << result << endl;  // 输出 49
    return 0;
}
```

### 代码解释：

1. **C 语言实现**：
   - 我们定义了两个指针 `left` 和 `right`，分别从数组的两端开始。
   - 在每次迭代中，我们计算当前水量，并更新最大水量。
   - 然后根据两条竖直线的高度，移动较小的那个指针，因为移动较小的指针可能会找到一个更大的水量。
   - 最终，当两个指针相遇时，最大水量即为结果。

2. **C++ 实现**：
   - C++ 中使用 `vector<int>` 来表示高度数组，使用 `min` 和 `max` 函数来简化计算。
   - 其他逻辑与 C 语言实现完全相同，只是语法上的不同和容器的使用。

#### 核心算法：
- **双指针法**：通过不断缩小左右指针之间的间距，并在每次迭代中计算当前的水量，最终获得最大水量。这样可以确保时间复杂度为 O(n)，而不像暴力法那样为 O(n^2)。
- **合理移动指针**：每次移动较小的那一边的指针，因为较小的那一边限制了当前水量。