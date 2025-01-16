---
layout: post
title:  "149. 直线上最多的点数"
categories: arithmetic
---

[149. 直线上最多的点数](https://leetcode.cn/problems/max-points-on-a-line)

### 题目描述

**直线上最多的点数**

给定一个整数数组 `points`，其中 `points[i] = [xi, yi]` 表示平面上的一个点。返回在同一条直线上且包含这些点的最大点数。

**示例 1：**

```
输入：points = [[1,1],[2,2],[3,3]]
输出：3
解释：所有的点都在同一条直线上。
```

**示例 2：**

```
输入：points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
输出：4
解释：最多有 4 个点在同一条直线上。
```

**示例 3：**

```
输入：points = [[0,0]]
输出：1
```

**提示：**

- `1 <= points.length <= 300`
- `points[i].length == 2`
- `-10^4 <= xi, yi <= 10^4`

### 解题思路

要找出在同一条直线上且包含最多点数，可以采用以下方法：

1. **枚举每一个点作为基准点：**
   - 对于每个基准点，计算它与其他所有点之间的斜率。
   - 使用哈希表来记录相同斜率的点的数量，这些点与基准点在同一条直线上。

2. **处理特殊情况：**
   - **重复点**：如果有多个点坐标相同，这些点可以与任何其他点形成无限多条直线，需要特别处理。
   - **垂直线**：斜率为无限大（即x坐标相同的直线），需要单独记录。

3. **计算最大值：**
   - 对于每个基准点，通过哈希表找到具有相同斜率的点的最大数量，加上重复点的数量，再加上基准点自身，更新全局最大值。

4. **斜率的表示：**
   - 为避免浮点数精度问题，可以将斜率表示为分数的形式，即用分子和分母的最大公约数（GCD）约分后作为键。

**时间复杂度分析：**

- 外层循环遍历每个点，内层循环遍历其他所有点，因此时间复杂度为 **O(n²)**，其中 `n` 是点的数量。

**空间复杂度分析：**

- 需要一个哈希表来记录斜率，最坏情况下空间复杂度为 **O(n)**。

### C语言解答

由于C语言缺乏内建的哈希表，我们可以使用结构体数组来模拟哈希表。在此实现中，斜率被表示为分子和分母的约分形式，并存储在斜率数组中。需要特别注意斜率的初始化和计数，避免重复计数导致结果错误。

以下是基于枚举和斜率计算的C语言实现，包含详细注释：

```c
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// 定义斜率结构体
typedef struct {
    long numerator;   // 分子
    long denominator; // 分母
    int count;         // 斜率相同的点数
} Slope;

// 计算最大公约数
long gcd_long(long a, long b) {
    if (b == 0)
        return a;
    return gcd_long(b, a % b);
}

// 查找斜率在斜率数组中的索引，如果不存在则添加新斜率
int find_or_add_slope(Slope* slopes, int* size, long num, long den) {
    for(int i = 0; i < *size; i++) {
        if(slopes[i].numerator == num && slopes[i].denominator == den) {
            return i;
        }
    }
    // 添加新的斜率，初始化count为0，后续在主循环中进行增1操作
    slopes[*size].numerator = num;
    slopes[*size].denominator = den;
    slopes[*size].count = 0;
    (*size)++;
    return (*size - 1);
}

// 主函数：计算最大在一条直线上的点数
int maxPoints(int** points, int pointsSize, int* pointsColSize){
    if(pointsSize == 0) return 0;
    if(pointsSize == 1) return 1;
    
    int max_result = 0;
    
    for(int i = 0; i < pointsSize; i++) {
        // 初始化斜率数组
        Slope slopes[pointsSize];
        int slope_size = 0;
        int duplicates = 0; // 重复点数量
        int vertical = 0;    // 垂直线点数量
        int current_max = 0;
        
        for(int j = 0; j < pointsSize; j++) {
            if(i == j) continue;
            // 计算斜率
            long dx = (long)points[j][0] - (long)points[i][0];
            long dy = (long)points[j][1] - (long)points[i][1];
            
            if(dx == 0 && dy == 0) {
                duplicates++;
                continue;
            }
            if(dx == 0) {
                vertical++;
                if(vertical > current_max) current_max = vertical;
                continue;
            }
            if(dy == 0) {
                // 水平线，斜率为0
                int index = find_or_add_slope(slopes, &slope_size, 0, 1);
                slopes[index].count++;
                if(slopes[index].count > current_max) current_max = slopes[index].count;
                continue;
            }
            // 约分斜率
            long g = gcd_long(abs(dx), abs(dy));
            dx /= g;
            dy /= g;
            // 确保分母为正
            if(dy < 0) {
                dx = -dx;
                dy = -dy;
            }
            // 查找或添加斜率
            int index = find_or_add_slope(slopes, &slope_size, dx, dy);
            slopes[index].count++;
            if(slopes[index].count > current_max) current_max = slopes[index].count;
        }
        // 更新最大结果
        if(current_max + duplicates + 1 > max_result) {
            max_result = current_max + duplicates + 1;
        }
    }
    
    return max_result;
}

// 创建二维数组
int** createPoints(int* arr, int size){
    int** points = (int**)malloc(size * sizeof(int*));
    for(int i = 0; i < size; i++){
        points[i] = (int*)malloc(2 * sizeof(int));
        points[i][0] = arr[2*i];
        points[i][1] = arr[2*i+1];
    }
    return points;
}

// 释放二维数组内存
void freePoints(int** points, int size){
    for(int i = 0; i < size; i++) {
        free(points[i]);
    }
    free(points);
}

// 简单的主函数测试
int main(){
    // 示例 1
    int arr1[] = {1,1,2,2,3,3};
    int size1 = 3;
    int pointsColSize1 = 2;
    int** points1 = createPoints(arr1, size1);
    printf("示例 1: %d\n", maxPoints(points1, size1, &pointsColSize1));
    freePoints(points1, size1);
    
    // 示例 2
    int arr2[] = {1,1,3,2,5,3,4,1,2,3,1,4};
    int size2 = 6;
    int pointsColSize2 = 2;
    int** points2 = createPoints(arr2, size2);
    printf("示例 2: %d\n", maxPoints(points2, size2, &pointsColSize2));
    freePoints(points2, size2);
    
    // 示例 3
    int arr3[] = {1,1};
    int size3 = 1;
    int pointsColSize3 = 2;
    int** points3 = createPoints(arr3, size3);
    printf("示例 3: %d\n", maxPoints(points3, size3, &pointsColSize3));
    freePoints(points3, size3);
    
    return 0;
}
```

**代码说明：**

1. **斜率表示与哈希表模拟：**
   - 使用结构体 `Slope` 来表示斜率，其中 `numerator` 和 `denominator` 分别代表斜率的分子和分母，`count` 记录相同斜率的点的数量。
   - 通过枚举每个点作为基准点，计算与其他点的斜率，并在斜率数组中查找或添加相应的斜率。

2. **处理特殊情况：**
   - **重复点**：如果两个点重合，计数 `duplicates` 增加。
   - **垂直线**：斜率不存在，计数 `vertical` 增加。
   - **水平线**：斜率为0，特定处理。

3. **斜率的约分与规范化：**
   - 使用最大公约数（GCD）对斜率进行约分，确保斜率以最简形式表示。
   - 确保分母为正，以统一斜率的表示。

4. **动态更新最大点数：**
   - 对于每个基准点，计算当前斜率的最大数量，加上重复点和基准点自身，更新全局最大点数。

5. **主函数测试：**
   - 构建三个示例测试用例，分别对应题目中的三个示例。
   - 输出每个示例的结果。

**修正说明：**

在之前的实现中，`Slope` 结构体的 `count` 在新斜率添加时被初始化为 `1`，而后在主循环中再次对其进行递增，导致实际计数比预期多了1。这会导致输出错误。现已修正为在 `find_or_add_slope` 中将 `count` 初始化为 `0`，然后在主循环中进行递增，确保计数准确。

**输出结果：**

```
示例 1: 3
示例 2: 4
示例 3: 1
```

### C++ 解答

C++ 提供了丰富的标准库容器，如 `unordered_map` 和 `pair`，可以简化哈希表和斜率的处理。以下是基于枚举和哈希表的C++实现，使用 `unordered_map` 来记录斜率，并通过最大公约数进行斜率约分：

```cpp
#include <iostream>
#include <vector>
#include <unordered_map>
#include <utility>
#include <cmath>
using namespace std;

// 自定义哈希函数，用于pair<int, int>
struct pair_hash {
    size_t operator()(const pair<int, int>& p) const {
        // 将pair转换为一个唯一的hash值
        return hash<long>()(((long)p.first) << 32 | (unsigned int)p.second);
    }
};

// Solution 类
class Solution {
public:
    // 计算最大公约数
    long gcd_long(long a, long b) {
        if (b == 0)
            return a;
        return gcd_long(b, a % b);
    }
    
    // 主函数：计算最大在一条直线上的点数
    int maxPoints(vector<vector<int>>& points) {
        if(points.empty()) return 0;
        if(points.size() == 1) return 1;
        
        int max_result = 0;
        int n = points.size();
        
        for(int i = 0; i < n; i++) {
            unordered_map<pair<int, int>, int, pair_hash> slope_map;
            int duplicates = 0;
            int vertical = 0;
            int current_max = 0;
            
            for(int j = 0; j < n; j++) {
                if(i == j) continue;
                // 计算斜率
                long dx = (long)points[j][0] - (long)points[i][0];
                long dy = (long)points[j][1] - (long)points[i][1];
                
                if(dx == 0 && dy == 0) {
                    duplicates++;
                    continue;
                }
                if(dx == 0) {
                    vertical++;
                    if(vertical > current_max) current_max = vertical;
                    continue;
                }
                if(dy == 0) {
                    // 水平线，斜率为0
                    pair<int, int> slope = {0,1};
                    slope_map[slope]++;
                    if(slope_map[slope] > current_max) current_max = slope_map[slope];
                    continue;
                }
                // 约分斜率
                long g = gcd_long(abs(dx), abs(dy));
                dx /= g;
                dy /= g;
                // 确保分母为正
                if(dy < 0) {
                    dx = -dx;
                    dy = -dy;
                }
                pair<int, int> slope = { (int)dx, (int)dy };
                slope_map[slope]++;
                if(slope_map[slope] > current_max) current_max = slope_map[slope];
            }
            // 更新最大结果
            if(current_max + duplicates + 1 > max_result) {
                max_result = current_max + duplicates + 1;
            }
        }
        return max_result;
    }
};

// 创建二维数组
vector<vector<int>> createPoints(int* arr, int size){
    vector<vector<int>> points;
    for(int i = 0; i < size; i++) {
        points.emplace_back(vector<int>{arr[2*i], arr[2*i+1]});
    }
    return points;
}

// 简单的主函数测试
int main(){
    Solution solution;
    
    // 示例 1
    int arr1[] = {1,1,2,2,3,3};
    int size1 = 3;
    vector<vector<int>> points1 = createPoints(arr1, size1);
    cout << "示例 1: " << solution.maxPoints(points1) << endl;
    
    // 示例 2
    int arr2[] = {1,1,3,2,5,3,4,1,2,3,1,4};
    int size2 = 6;
    vector<vector<int>> points2 = createPoints(arr2, size2);
    cout << "示例 2: " << solution.maxPoints(points2) << endl;
    
    // 示例 3
    int arr3[] = {1,1};
    int size3 = 1;
    vector<vector<int>> points3 = createPoints(arr3, size3);
    cout << "示例 3: " << solution.maxPoints(points3) << endl;
    
    return 0;
}
```

**代码说明：**

1. **斜率表示与哈希表使用：**
   - 使用 `pair<int, int>` 来表示斜率的分子和分母，经过最大公约数约分后。
   - 自定义哈希函数 `pair_hash` 以便将 `pair<int, int>` 用作 `unordered_map` 的键。

2. **处理特殊情况：**
   - **重复点**：如果两个点重合，计数 `duplicates` 增加。
   - **垂直线**：斜率不存在，计数 `vertical` 增加。
   - **水平线**：斜率为0，特定处理。

3. **斜率的约分与规范化：**
   - 使用最大公约数（GCD）对斜率进行约分，确保斜率以最简形式表示。
   - 确保分母为正，以统一斜率的表示。

4. **动态更新最大点数：**
   - 对于每个基准点，计算当前斜率的最大数量，加上重复点和基准点自身，更新全局最大点数。

5. **主函数测试：**
   - 构建三个示例测试用例，分别对应题目中的三个示例。
   - 输出每个示例的结果。

**输出结果：**

```
示例 1: 3
示例 2: 4
示例 3: 1
```

### 总结

通过枚举每个点作为基准点，并计算其与其他点的斜率，我们能够有效地找到直线上最多的点数。为了达到 **O(n²)** 的时间复杂度，且处理了重复点和特殊斜率的情况，使用了斜率的约分和哈希表来记录相同斜率的点的数量。

**关键点：**

1. **斜率的表示与哈希表使用：**
   - 斜率采用分数的形式表示，并进行约分以避免浮点数精度问题。
   - 使用哈希表快速记录相同斜率的点的数量。

2. **处理特殊情况：**
   - **重复点**：多个重合点可以与任何其他点形成无限多条直线，需要特别处理。
   - **垂直线**和**水平线**：这些特殊斜率需要单独记录，以避免除零错误。

3. **优化与效率：**
   - 使用最大公约数（GCD）约分斜率，确保斜率以最简形式存储。

4. **语言实现差异：**
   - 在C语言中，需要手动管理斜率数组和查找操作，代码较为复杂。
   - 在C++中，利用 `unordered_map` 和自定义哈希函数，代码更加简洁和高效。

通过以上方法，可以高效地解决“直线上最多的点数”问题，并满足题目中的各种约束条件。如果有进一步的问题或需要更多的解释，欢迎继续交流！