---
layout: post
title:  "42. 接雨水"
categories: arithmetic
---

[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water)

## 题目要求

### 描述：
给定一个数组 `height`，它的每个元素代表一个柱子的高度，柱子之间的间距是 1。

请计算每个柱子之间可以容纳多少水，并返回总的蓄水量。

**示例 1：**

**输入：**  
`height = [0,1,0,2,1,0,1,3,2,1,2,1]`

**输出：**  
`6`

**解释：**  
图中可以看到，蓄水的地方分别是：
- 第 1 个柱子和第 2 个柱子之间可以蓄 1 单位水，
- 第 2 个柱子和第 4 个柱子之间可以蓄 1 单位水，
- 第 4 个柱子和第 5 个柱子之间可以蓄 2 单位水，
- 第 5 个柱子和第 7 个柱子之间可以蓄 1 单位水，
- 第 7 个柱子和第 8 个柱子之间可以蓄 1 单位水，
- 第 8 个柱子和第 10 个柱子之间可以蓄 1 单位水。

**示例 2：**

**输入：**  
`height = [4,2,0,3,2,5]`

**输出：**  
`9`

**解释：**  
同样可以通过图示看到，总蓄水量是 9 单位水。

### 提示：
- `n == height.length`
- `1 <= n <= 2 * 10^4`
- `0 <= height[i] <= 10^5`

## 解题思路

### 思路：
这道题目本质上是求一个数组中每个元素上方能存储的水的量。我们可以从以下几个角度分析：

1. **单纯的暴力解法**：
   对每个位置，遍历左边和右边的最大值，然后根据最小的最大值与当前位置的高度之差计算可以存储的水量。
   
   这种方法的时间复杂度是 O(n^2)，显然不满足题目对最大数据量的要求。

2. **优化解法**：
   - 每个柱子上的水量是由左右两边的柱子的高度所决定的。我们可以先计算出每个位置左边的最大高度和右边的最大高度。
   - 对于每个柱子，存储的水量是 `min(left_max[i], right_max[i]) - height[i]`，其中 `left_max[i]` 和 `right_max[i]` 分别是位置 `i` 左边和右边的最大高度。
   
   为了节省空间，可以在一次遍历中计算出左边和右边的最大高度，避免使用额外的数组。

3. **两次遍历优化**：
   - 使用两个指针（left 和 right）分别从两边往中间遍历，同时维护两个变量 `left_max` 和 `right_max` 来记录左右两边的最大值。
   - 如果 `left_max` 小于 `right_max`，则处理左边的柱子，并更新 `left` 和 `left_max`。如果 `right_max` 小于 `left_max`，则处理右边的柱子，并更新 `right` 和 `right_max`。
   - 这样可以一次遍历完成水量的计算，时间复杂度为 O(n)。

### 详细解法：

1. **初始化**：
   使用两个指针 `left` 和 `right`，以及两个变量 `left_max` 和 `right_max` 来记录左边和右边的最大高度。
   
2. **计算水量**：
   - 如果 `height[left]` 小于 `height[right]`，则说明当前位置的水量取决于左边的柱子，我们可以计算并更新水量，同时移动 `left` 指针。
   - 否则，说明水量取决于右边的柱子，计算水量并移动 `right` 指针。

3. **结束条件**：
   当 `left` 指针超过 `right` 指针时，遍历结束。

### C语言解答

```c
#include <stdio.h>

int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;

    int left = 0, right = heightSize - 1;
    int left_max = 0, right_max = 0;
    int water_trapped = 0;

    // 双指针法
    while (left <= right) {
        if (height[left] < height[right]) {
            if (height[left] >= left_max) {
                left_max = height[left];  // 更新左边最大高度
            } else {
                water_trapped += left_max - height[left];  // 计算当前水量
            }
            left++;
        } else {
            if (height[right] >= right_max) {
                right_max = height[right];  // 更新右边最大高度
            } else {
                water_trapped += right_max - height[right];  // 计算当前水量
            }
            right--;
        }
    }

    return water_trapped;
}

int main() {
    int height[] = {0,1,0,2,1,0,1,3,2,1,2,1};
    int heightSize = sizeof(height) / sizeof(height[0]);
    
    int result = trap(height, heightSize);
    printf("Total trapped water is: %d\n", result);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) return 0;

        int left = 0, right = n - 1;
        int left_max = 0, right_max = 0;
        int water_trapped = 0;

        // 双指针法
        while (left <= right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) {
                    left_max = height[left];  // 更新左边最大高度
                } else {
                    water_trapped += left_max - height[left];  // 计算当前水量
                }
                left++;
            } else {
                if (height[right] >= right_max) {
                    right_max = height[right];  // 更新右边最大高度
                } else {
                    water_trapped += right_max - height[right];  // 计算当前水量
                }
                right--;
            }
        }

        return water_trapped;
    }
};

int main() {
    Solution solution;
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};
    
    int result = solution.trap(height);
    cout << "Total trapped water is: " << result << endl;
    
    return 0;
}
```

### 代码解析

#### C语言：
1. **初始化**：
   - 使用 `left` 和 `right` 指针分别指向数组的两端。
   - `left_max` 和 `right_max` 用来记录从左和右边的最大高度。
   
2. **双指针法**：
   - 如果当前 `height[left]` 小于 `height[right]`，则首先处理左边的柱子，更新 `left_max` 和水量。
   - 否则，处理右边的柱子，更新 `right_max` 和水量。

3. **结束条件**：
   - 当 `left` 指针超过 `right` 指针时，遍历结束，返回总的蓄水量。

#### C++：
- C++ 解法与 C 版本相似，只是使用了 `vector` 替代了数组，使用 STL 容器来进行处理。
- 采用了 `class Solution` 来包装解法，并使用 `cout` 输出结果。

### 时间复杂度：
- **时间复杂度**：O(n)，其中 n 是数组的大小。我们只遍历数组一次。
- **空间复杂度**：O(1)，我们只用了常数的空间（除了输入数组外）。

### 小结：
- 该解法通过双指针的方法，巧妙地计算每个位置的水量，避免了暴力解法中的重复计算。
- 这使得时间复杂度降到了 O(n)，非常适合处理大规模数据。