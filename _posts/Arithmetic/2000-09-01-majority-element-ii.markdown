---
layout: post
title:  "229. 多数元素 II"
categories: arithmetic
---

[229. 多数元素 II](https://leetcode.cn/problems/majority-element-ii)

### 题目描述

#### 多数元素 II
给定一个大小为 `n` 的整数数组，找出其中所有出现超过 `⌊n / 3⌋` 次的元素。

---

### 示例

**示例 1**:
```
输入：nums = [3,2,3]
输出：[3]
```

**示例 2**:
```
输入：nums = [1]
输出：[1]
```

**示例 3**:
```
输入：nums = [1,2]
输出：[1,2]
```

---

### 提示
- `1 <= nums.length <= 5 * 10^4`
- `-10^9 <= nums[i] <= 10^9`

---

### 解题思路

1. **问题分析**:
   - 根据题目要求，一个数组中可能有 0 到 2 个元素的出现次数超过 `⌊n / 3⌋`。
   - 使用 **Boyer-Moore 投票算法**，在一次遍历中找到最多两个候选元素，再通过第二次遍历验证候选元素的出现次数。

2. **算法步骤**:
   1. **第一次遍历（确定候选人）**:
      - 初始化两个候选元素 `candidate1` 和 `candidate2` 及其计数器 `count1` 和 `count2` 为 0。
      - 遍历数组：
        - 如果当前数等于 `candidate1` 或 `candidate2`，则增加对应计数器。
        - 如果计数器 `count1` 或 `count2` 为 0，分配当前数为候选人，并重置计数器。
        - 否则，两个计数器均减 1。
   2. **第二次遍历（验证候选人）**:
      - 遍历数组，统计 `candidate1` 和 `candidate2` 的出现次数，判断是否超过 `⌊n / 3⌋`。

3. **复杂度分析**:
   - 时间复杂度：O(n)，两次遍历数组。
   - 空间复杂度：O(1)，只需常数额外空间。

---

### C 语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 返回结果数组
int* majorityElement(int* nums, int numsSize, int* returnSize) {
    int candidate1 = 0, candidate2 = 0; // 候选人
    int count1 = 0, count2 = 0;         // 对应计数
    int* result = (int*)malloc(2 * sizeof(int)); // 最多两个候选人
    
    // 第一次遍历：确定候选人
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == candidate1) {
            count1++;
        } else if (nums[i] == candidate2) {
            count2++;
        } else if (count1 == 0) {
            candidate1 = nums[i];
            count1 = 1;
        } else if (count2 == 0) {
            candidate2 = nums[i];
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    
    // 第二次遍历：验证候选人
    count1 = count2 = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] == candidate1) {
            count1++;
        } else if (nums[i] == candidate2) {
            count2++;
        }
    }
    
    *returnSize = 0;
    if (count1 > numsSize / 3) {
        result[(*returnSize)++] = candidate1;
    }
    if (count2 > numsSize / 3) {
        result[(*returnSize)++] = candidate2;
    }
    return result;
}

// 测试函数
int main() {
    int nums[] = {3, 2, 3};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int returnSize = 0;

    int* result = majorityElement(nums, numsSize, &returnSize);
    printf("多数元素: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");
    free(result); // 释放内存

    return 0;
}
```

---

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
        vector<int> result;

        // 第一次遍历：确定候选人
        for (int num : nums) {
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }

        // 第二次遍历：验证候选人
        count1 = count2 = 0;
        for (int num : nums) {
            if (num == candidate1) {
                count1++;
            } else if (num == candidate2) {
                count2++;
            }
        }

        if (count1 > nums.size() / 3) {
            result.push_back(candidate1);
        }
        if (count2 > nums.size() / 3) {
            result.push_back(candidate2);
        }

        return result;
    }
};

int main() {
    vector<int> nums = {3, 2, 3};
    Solution solution;

    vector<int> result = solution.majorityElement(nums);
    cout << "多数元素: ";
    for (int num : result) {
        cout << num << " ";
    }
    cout << endl;

    return 0;
}
```

---

### 代码说明
1. **C 语言实现**:
   - 使用两个变量记录候选人和计数器。
   - 动态分配结果数组并返回。

2. **C++ 实现**:
   - 使用 STL 容器 `vector` 动态管理结果数组。
   - 使用范围 `for` 循环简化数组遍历。
   - `Solution` 类封装计算函数，提高代码复用性和结构化。