---
layout: post
title:  "84. 柱状图中最大的矩形"
categories: arithmetic
---

[84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram)

### 题目要求：

给定一个包含 `n` 个非负整数的数组 `heights`，每个整数表示一个柱形条的高度。求出这个柱形条图中，能够勾画出的最大矩形的面积。

#### 示例 1：
```
输入: heights = [2,1,5,6,2,3]
输出: 10
解释: 最大矩形的面积是 10 ，它是由长为 5 和高为 2 的矩形组成的。
```

#### 示例 2：
```
输入: heights = [2,4]
输出: 4
```

#### 提示：
- `1 <= heights.length <= 10^5`
- `0 <= heights[i] <= 10^4`

### 解题思路：

#### 思路一：暴力法（超时）
暴力法就是逐个计算每一个可能的矩形的面积。对于每个柱子 `heights[i]`，我们可以选择该柱子作为矩形的左边界，然后向右扩展，直到柱子的高度小于 `heights[i]`，形成一个矩形。这种方法的时间复杂度是 O(n^2)，对于数据量较大的输入（`n` 最大为 10^5）来说，无法在规定时间内运行。

#### 思路二：单调栈（最优解）
最优的做法是使用**单调栈**来解决这个问题。我们维护一个栈，它用于存储柱子高度的索引，并且保证栈内的柱子高度是递增的。

**具体步骤**：
1. **栈的维护**：我们从左到右遍历柱形条，每次将当前柱子的索引压入栈中。为了确保栈内是递增的高度，当当前柱子的高度小于栈顶柱子的高度时，说明栈顶柱子可以作为矩形的右边界，我们就弹出栈顶元素，并计算以该柱子为高度的最大矩形面积。
2. **计算最大矩形面积**：每当弹出栈顶元素时，我们可以计算以该柱子为高度的矩形的面积。矩形的宽度是当前索引与栈顶元素之前索引的差值。
3. **结束遍历后**：栈中可能仍然有元素，这些元素对应的柱子没有找到右边界，需要继续计算，直到栈为空。

#### 时间复杂度：
- **时间复杂度**：O(n)，我们遍历一遍数组，并且每个柱子的索引最多入栈和出栈一次。
- **空间复杂度**：O(n)，栈中存储了最多 `n` 个柱子的索引。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

// 栈结构定义
struct Stack {
    int *arr;
    int top;
    int capacity;
};

// 创建栈
struct Stack* createStack(int capacity) {
    struct Stack *stack = (struct Stack*)malloc(sizeof(struct Stack));
    stack->capacity = capacity;
    stack->top = -1;
    stack->arr = (int*)malloc(sizeof(int) * capacity);
    return stack;
}

// 栈是否为空
int isEmpty(struct Stack* stack) {
    return stack->top == -1;
}

// 栈入栈
void push(struct Stack* stack, int value) {
    stack->arr[++stack->top] = value;
}

// 栈出栈
int pop(struct Stack* stack) {
    return stack->arr[stack->top--];
}

// 获取栈顶元素
int peek(struct Stack* stack) {
    return stack->arr[stack->top];
}

// 计算最大矩形面积
int largestRectangleArea(int* heights, int heightsSize) {
    struct Stack* stack = createStack(heightsSize);
    int maxArea = 0;
    int i = 0;
    
    while (i < heightsSize) {
        // 如果栈为空或当前柱子高度大于栈顶柱子高度，入栈
        if (isEmpty(stack) || heights[i] >= heights[peek(stack)]) {
            push(stack, i++);
        } else {
            // 计算以栈顶柱子为高度的矩形面积
            int height = heights[pop(stack)];
            int width = isEmpty(stack) ? i : i - peek(stack) - 1;
            int area = height * width;
            if (area > maxArea) {
                maxArea = area;
            }
        }
    }
    
    // 处理栈中剩余的柱子
    while (!isEmpty(stack)) {
        int height = heights[pop(stack)];
        int width = isEmpty(stack) ? i : i - peek(stack) - 1;
        int area = height * width;
        if (area > maxArea) {
            maxArea = area;
        }
    }

    // 释放栈内存
    free(stack->arr);
    free(stack);
    return maxArea;
}

int main() {
    int heights[] = {2, 1, 5, 6, 2, 3};
    int size = sizeof(heights) / sizeof(heights[0]);
    printf("最大矩形面积: %d\n", largestRectangleArea(heights, size));
    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <vector>
#include <stack>
using namespace std;

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;  // 用来存储柱子的索引
        int maxArea = 0;
        int n = heights.size();

        for (int i = 0; i < n;) {
            // 如果栈为空或当前柱子比栈顶柱子高，入栈
            if (st.empty() || heights[i] >= heights[st.top()]) {
                st.push(i++);
            } else {
                // 弹出栈顶，计算以栈顶柱子为高度的矩形面积
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
        }

        // 处理栈中剩余的元素
        while (!st.empty()) {
            int height = heights[st.top()];
            st.pop();
            int width = st.empty() ? n : n - st.top() - 1;
            maxArea = max(maxArea, height * width);
        }

        return maxArea;
    }
};

int main() {
    Solution sol;
    vector<int> heights = {2, 1, 5, 6, 2, 3};
    cout << "最大矩形面积: " << sol.largestRectangleArea(heights) << endl;
    return 0;
}
```

### 代码解析：

#### C语言：
1. **栈的实现**：使用结构体 `Stack` 实现栈，并提供基本的栈操作（入栈、出栈、获取栈顶元素等）。
2. **计算最大矩形面积**：遍历柱子高度数组，对于每个柱子：
   - 如果栈为空或当前柱子高度大于栈顶柱子高度，入栈。
   - 否则，计算以栈顶柱子为高度的矩形面积。
   - 继续处理栈中剩余元素，直到栈为空。
3. **返回最大矩形面积**。

#### C++：
1. **栈的使用**：使用 `std::stack` 存储柱子索引，保证栈内的柱子高度递增。
2. **计算最大矩形面积**：与 C 语言方法相似，使用栈的方式处理每个柱子，计算并更新最大矩形面积。
3. **返回最大矩形面积**。

### 时间复杂度：
- **时间复杂度**：O(n)，每个柱子最多入栈和出栈一次。
- **空间复杂度**：O(n)，栈最多存储 `n` 个元素。

### 示例输出：

#### C语言：
```
最大矩形面积: 10
```

#### C++：
```
最大矩形面积: 10
```