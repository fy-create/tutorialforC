---
layout: post
title:  "11. 盛最多水的容器"
categories: arithmetic
---

[11. 盛最多水的容器](https://leetcode.cn/problems/container-with-most-water)

**题目描述：**

给定一个长度为 `n` 的整数数组 `height`，其中有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])`。

请找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**注意：**你不能倾斜容器。

**示例：**

- **输入：** `[1,8,6,2,5,4,8,3,7]`
- **输出：** `49`
- **解释：** 图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水的最大值为 49。

**提示：**

- `n == height.length`
- `2 <= n <= 10^5`
- `0 <= height[i] <= 10^4`

**C语言解答：**

```c
#include <stdio.h>

// 计算盛水的最大面积
int maxArea(int* height, int heightSize) {
    int left = 0; // 左指针初始化为数组起始
    int right = heightSize - 1; // 右指针初始化为数组末尾
    int max_area = 0; // 最大面积初始化为0

    // 当左指针小于右指针时，继续计算
    while (left < right) {
        // 计算当前区域的高度和宽度
        int h = height[left] < height[right] ? height[left] : height[right];
        int w = right - left;
        // 更新最大面积
        int current_area = h * w;
        if (current_area > max_area) {
            max_area = current_area;
        }
        // 移动较短的那条线对应的指针
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return max_area;
}

// 测试函数
int main() {
    int height[] = {1,8,6,2,5,4,8,3,7};
    int size = sizeof(height) / sizeof(height[0]);
    int result = maxArea(height, size);
    printf("最大盛水面积: %d\n", result);
    return 0;
}
```

**代码解析：**

1. **初始化指针和变量：**
   - 左指针 `left` 指向数组起始位置。
   - 右指针 `right` 指向数组末尾位置。
   - 变量 `max_area` 用于存储计算出的最大面积，初始为 0。

2. **双指针遍历：**
   - 当 `left` 小于 `right` 时，计算当前区域的高度 `h` 和宽度 `w`。
   - 高度 `h` 取决于 `height[left]` 和 `height[right]` 中的较小值。
   - 宽度 `w` 为 `right - left`。
   - 计算当前区域面积 `current_area = h * w`，并更新 `max_area`。
   - 移动较短的那条线对应的指针，以尝试找到更大的面积：
     - 如果 `height[left]` 小于 `height[right]`，则移动左指针 `left++`。
     - 否则，移动右指针 `right--`。

3. **返回结果：**
   - 当 `left` 不小于 `right` 时，循环结束，返回 `max_area`。

**C++解答：**

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    // 计算盛水的最大面积
    int maxArea(vector<int>& height) {
        int left = 0; // 左指针初始化为数组起始
        int right = height.size() - 1; // 右指针初始化为数组末尾
        int max_area = 0; // 最大面积初始化为0

        // 当左指针小于右指针时，继续计算
        while (left < right) {
            // 计算当前区域的高度和宽度
            int h = min(height[left], height[right]);
            int w = right - left;
            // 更新最大面积
            max_area = max(max_area, h * w);
            // 移动较短的那条线对应的指针
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }

        return max_area;
    }
};

// 测试函数
int main() {
    vector<int> height = {1,8,6,2,5,4,8,3,7};
    Solution sol;
    int result = sol.maxArea(height);
    cout << "最大盛水面积: " << result << endl;
    return 0;
}
```

**代码解析：**

1. **初始化指针和变量：**
   - 左指针 `left` 指向数组起始位置。
   - 右指针 `right` 指向数组末尾位置。
   - 变量 `max_area` 用于存储计算出的最大面积，初始为 0。

2. **双指针遍历：**
   - 当 `left` 小于 `right` 时，计算当前区域的高度 `h` 和宽度 `w`。
   - 高度 `h` 取 `height[left]` 和 `height[right]` 中的较小值，使用 `min` 函数。
   - 宽度 `w` 为 `right - left`。  
   - 计算当前区域面积 `current_area = h * w`，并使用 `max` 函数更新 `max_area`。  

3. **指针移动：**  
   - 如果左边的高度小于右边的高度，移动左指针 `left++`。  
   - 否则，移动右指针 `right--`。  

4. **返回结果：**  
   - 当 `left` 不小于 `right` 时，循环结束，返回 `max_area`。  

---

### 测试结果

#### 测试输入：
```text
height = [1,8,6,2,5,4,8,3,7]
```

#### 输出结果：
```text
最大盛水面积: 49
```

---

### 时间复杂度和空间复杂度

1. **时间复杂度：** O(n)  
   - 使用双指针，每次操作仅移动一个指针，总共扫描整个数组一次。

2. **空间复杂度：** O(1)  
   - 只使用了固定数量的变量来存储指针和结果，无需额外空间。

---

### 总结

- 该算法利用双指针技术，以线性时间复杂度解决了最大面积问题。
- C 和 C++ 实现功能一致，C++ 版本使用了 STL 容器和函数（如 `min` 和 `max`）来简化代码。
- C++ 中封装为类 `Solution`，并使用标准输入输出方便测试。