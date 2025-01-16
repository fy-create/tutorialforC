---
layout: post
title:  "223. 矩形面积"
categories: arithmetic
---

[223. 矩形面积](https://leetcode.cn/problems/rectangle-area)

### 题目描述

#### 计算两个矩形的总面积
给你**平面上两个矩形**的坐标 `(ax1, ay1, ax2, ay2)` 和 `(bx1, by1, bx2, by2)`，其中：
- `(ax1, ay1)` 为第一个矩形的左下角坐标，`(ax2, ay2)` 为右上角坐标。
- `(bx1, by1)` 为第二个矩形的左下角坐标，`(bx2, by2)` 为右上角坐标。

返回**两个矩形的总面积**。如果两个矩形重叠，则从总面积中扣除重叠部分的面积。

---

### 示例:
**输入:**  
```
ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, 
bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
```
**输出:**  
```
45
```

**输入:**  
```
ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, 
bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
```
**输出:**  
```
16
```

---

### 提示:
- `-10⁴ ≤ ax1, ay1, ax2, ay2, bx1, by1, bx2, by2 ≤ 10⁴`

---

### 解题思路
1. **问题分析**:
   - 矩形的面积可以通过公式直接计算：  
     面积 = `(右上角横坐标 - 左下角横坐标) * (右上角纵坐标 - 左下角纵坐标)`。
   - 如果两个矩形有重叠区域，重叠部分的面积需要从总面积中扣除。

2. **重叠部分的计算**:
   - 重叠部分的左下角坐标为：  
     `(max(ax1, bx1), max(ay1, by1))`。
   - 重叠部分的右上角坐标为：  
     `(min(ax2, bx2), min(ay2, by2))`。
   - 如果 `max(ax1, bx1) < min(ax2, bx2)` 且 `max(ay1, by1) < min(ay2, by2)`，表示有重叠，重叠部分的面积为：  
     重叠面积 = `(min(ax2, bx2) - max(ax1, bx1)) * (min(ay2, by2) - max(ay1, by1))`。

3. **算法步骤**:
   1. 计算两个矩形的面积。
   2. 判断是否有重叠部分，如果有，则计算重叠面积。
   3. 用总面积减去重叠部分面积，得到最终结果。

---

### C 语言解答
```c
#include <stdio.h>

// 求最大值的宏定义
#define max(a, b) ((a) > (b) ? (a) : (b))
// 求最小值的宏定义
#define min(a, b) ((a) < (b) ? (a) : (b))

// 计算两个矩形的总面积
int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
    // 计算两个矩形的面积
    int area1 = (ax2 - ax1) * (ay2 - ay1);
    int area2 = (bx2 - bx1) * (by2 - by1);

    // 计算重叠部分的边界
    int overlapX1 = max(ax1, bx1);
    int overlapY1 = max(ay1, by1);
    int overlapX2 = min(ax2, bx2);
    int overlapY2 = min(ay2, by2);

    // 判断是否有重叠
    int overlapArea = 0;
    if (overlapX1 < overlapX2 && overlapY1 < overlapY2) {
        overlapArea = (overlapX2 - overlapX1) * (overlapY2 - overlapY1);
    }

    // 返回总面积减去重叠部分
    return area1 + area2 - overlapArea;
}

int main() {
    int ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4;
    int bx1 = 0, by1 = -1, bx2 = 9, by2 = 2;

    int result = computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2);
    printf("两个矩形的总面积是: %d\n", result);

    return 0;
}
```

---

### C++ 解答
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 计算两个矩形的总面积
    int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        // 计算两个矩形的面积
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);

        // 计算重叠部分的边界
        int overlapX1 = max(ax1, bx1);
        int overlapY1 = max(ay1, by1);
        int overlapX2 = min(ax2, bx2);
        int overlapY2 = min(ay2, by2);

        // 判断是否有重叠
        int overlapArea = 0;
        if (overlapX1 < overlapX2 && overlapY1 < overlapY2) {
            overlapArea = (overlapX2 - overlapX1) * (overlapY2 - overlapY1);
        }

        // 返回总面积减去重叠部分
        return area1 + area2 - overlapArea;
    }
};

int main() {
    Solution solution;
    int ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4;
    int bx1 = 0, by1 = -1, bx2 = 9, by2 = 2;

    cout << "两个矩形的总面积是: " 
         << solution.computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) 
         << endl;

    return 0;
}
```

### 代码说明:
1. **C 语言实现**:
   - 使用宏定义 `max` 和 `min` 计算重叠部分的边界。
   - 根据条件判断是否有重叠并计算重叠面积。

2. **C++ 实现**:
   - 使用 `std::max` 和 `std::min` 计算边界。
   - 将功能封装到 `Solution` 类中，代码更清晰且易于复用。
   - `main` 函数中通过对象调用解决问题，符合 C++ 的面向对象设计风格。