---
layout: post
title:  "16. 最接近的三数之和"
categories: arithmetic
---

[16. 最接近的三数之和](https://leetcode.cn/problems/3sum-closest)

**题目描述：**

给定一个长度为 *n* 的整数数组 `nums` 和一个目标值 `target`，请在数组中找出三个整数，使得这三个数的和与 `target` 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

**示例：**

- **输入：** `nums = [-1, 2, 1, -4]`，`target = 1`
- **输出：** `2`
- **解释：** 与目标值 1 最接近的三数之和是 2（-1 + 2 + 1 = 2）。

**约束条件：**

- 3 ≤ `nums.length` ≤ 500
- -1000 ≤ `nums[i]` ≤ 1000
- -10⁴ ≤ `target` ≤ 10⁴

**C语言解答：**

```c
#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// 比较函数，用于qsort排序
int compare(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

// 找到最接近目标值的三数之和
int threeSumClosest(int* nums, int numsSize, int target) {
    // 对数组进行排序
    qsort(nums, numsSize, sizeof(int), compare);
    
    int closestSum = nums[0] + nums[1] + nums[2];
    
    // 遍历数组，每次固定一个数，然后使用双指针寻找另外两个数
    for (int i = 0; i < numsSize - 2; i++) {
        int left = i + 1;
        int right = numsSize - 1;
        
        while (left < right) {
            int currentSum = nums[i] + nums[left] + nums[right];
            
            // 如果当前和更接近目标值，则更新closestSum
            if (abs(currentSum - target) < abs(closestSum - target)) {
                closestSum = currentSum;
            }
            
            // 根据当前和与目标值的比较，移动指针
            if (currentSum < target) {
                left++;
            } else if (currentSum > target) {
                right--;
            } else {
                // 如果当前和等于目标值，直接返回
                return currentSum;
            }
        }
    }
    
    return closestSum;
}

// 测试函数
int main() {
    int nums[] = {-1, 2, 1, -4};
    int target = 1;
    int result = threeSumClosest(nums, 4, target);
    printf("最接近目标值 %d 的三数之和为: %d\n", target, result);
    return 0;
}
```

**代码解析：**

1. **排序数组：** 使用 `qsort` 对数组进行升序排序，以便于后续使用双指针法。

2. **初始化最接近的和：** 将最接近的和初始化为数组的前三个数之和。

3. **遍历数组：** 固定一个数，然后使用双指针（左指针和右指针）寻找另外两个数，使得三数之和最接近目标值。

4. **更新最接近的和：** 如果当前三数之和比之前记录的更接近目标值，则更新最接近的和。

5. **移动指针：** 根据当前三数之和与目标值的比较，决定移动左指针还是右指针，以期更接近目标值。

6. **返回结果：** 最终返回最接近目标值的三数之和。

**C++解答：**

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        // 对数组进行排序
        sort(nums.begin(), nums.end());
        int closestSum = nums[0] + nums[1] + nums[2];
        
        // 遍历数组，每次固定一个数，然后使用双指针寻找另外两个数
        for (size_t i = 0; i < nums.size() - 2; i++) {
            size_t left = i + 1;
            size_t right = nums.size() - 1;
            
            while (left < right) {
                int currentSum = nums[i] + nums[left] + nums[right];
                
                // 如果当前和更接近目标值，则更新closestSum
                if (abs(currentSum - target) < abs(closestSum - target)) {
                    closestSum = currentSum;
                }
                
                // 根据当前和与目标值的比较，移动指针
                if (currentSum < target) {
                    left++;
                } else if (currentSum > target) {
                    right--;
                } else {
                    // 如果当前和等于目标值，直接返回
                    return currentSum;
                }
            }
        }
        
        return closestSum;
    }
};

// 测试函数
int main() {
    Solution sol;
    vector<int> nums = {-1, 2, 1, -4};
    int target = 1;
    int result = sol.threeSumClosest(nums, target);
    cout << "最接近目标值 " << target << " 的三数之和为: " << result << endl;
    return 0;
}
```

**代码解析：**

1. **排序数组：** 使用 `sort` 函数对数组进行升序排序，以便于后续使用双指针法。

2. **初始化最接近的和：** 将最接近的和初始化为数组的前三个数之和。

3. **遍历数组：** 固定一个数，然后使用双指针（左指针和右指针）寻找另外两个数，使得三数之和最接近目标值。

4. **更新最接近的和：** 如果当前三数之和比之前记录的更接近目标值，则更新最接近的和。

5. **移动指针：** 根据当前三数之和与目标值的比较，决定移动左指针还是右指针，以期更接近目标值。

6. **返回结果：**
   - 当遍历完成后，返回记录的最接近目标值的三数之和。

---

### 示例运行

#### 输入：
```text
nums = [-1, 2, 1, -4]
target = 1
```

#### 输出：
```text
最接近目标值 1 的三数之和为: 2
```

---

### 时间复杂度和空间复杂度

1. **时间复杂度：**  
   - 排序操作的复杂度为 O(n log n)。  
   - 双指针搜索在最坏情况下为 O(n²)，因为需要遍历每个固定数及其对应的可能组合。  
   - 总复杂度为 O(n²)。

2. **空间复杂度：**  
   - C语言版本：没有额外的动态分配空间，空间复杂度为 O(1)。  
   - C++版本：仅使用了 STL 容器排序和临时变量，空间复杂度为 O(1)。

---

### 总结

- **C语言实现：** 通过手动实现数组排序和双指针法，保持代码高效。
- **C++实现：** 利用 STL 容器和算法（如 `sort`），代码更简洁且可读性更强。
- 两种实现均使用双指针法，能有效地找到与目标值最接近的三数之和。