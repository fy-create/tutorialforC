---
layout: post
title:  "303. 区域和检索 - 数组不可变"
categories: arithmetic
---

[303. 区域和检索 - 数组不可变](https://leetcode.cn/problems/range-sum-query-immutable)

### 题目：**Range Sum Query - Immutable**

#### 题目描述：

给定一个整数数组 `nums`，求出一个支持 `sumRange` 查询的数据结构，该数据结构可以返回区间 `[i, j]` 内的元素和，`i` 和 `j` 是 `nums` 数组的索引。

实现 `NumArray` 类：
- `NumArray(int[] nums)` 初始化对象，给定整数数组 `nums`。
- `int sumRange(int i, int j)` 返回数组 `nums` 中索引 `i` 和索引 `j` 之间的元素和（`i` 和 `j` 都是 0-based）。

**示例 1:**
```plaintext
输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]
```
解释：
- `NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);`
- `numArray.sumRange(0, 2); // 返回 1 ((-2) + 0 + 3)`
- `numArray.sumRange(2, 5); // 返回 -1 (3 + -5 + 2 + -1)`
- `numArray.sumRange(0, 5); // 返回 -3 (-2 + 0 + 3 + -5 + 2 + -1)`

**提示：**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= i <= j < nums.length`
- 最多调用 10^4 次 `sumRange` 方法。

---

### 解题思路：

#### 1. **前缀和算法**：
   - 为了优化查询操作，可以使用 **前缀和（Prefix Sum）** 技术，将数组 `nums` 中每个位置的元素前面的所有元素的和先计算好，存储在一个数组中，这样每次查询区间和时只需要常数时间即可。
   - **前缀和** 的定义是：`prefix[i]` 表示数组 `nums` 中从 `0` 到 `i-1` 的元素之和。通过预处理这个前缀和数组，查询任何区间 `[i, j]` 的和只需要：`prefix[j+1] - prefix[i]`。
   - 这意味着，查询一个区间和的时间复杂度从 O(n) 降低到 O(1)，而前缀和数组的计算时间复杂度是 O(n)。

#### 2. **实现步骤**：
   - 在 `NumArray` 类的构造函数中，首先计算并存储前缀和。
   - 在 `sumRange` 方法中，使用前缀和数组来快速计算指定区间的和。

#### 3. **时间和空间复杂度**：
   - **时间复杂度**：
     - 构造函数的时间复杂度是 O(n)，因为需要计算前缀和。
     - `sumRange` 方法的时间复杂度是 O(1)，因为查询操作仅涉及数组索引。
   - **空间复杂度**：
     - 需要额外的 O(n) 空间来存储前缀和数组。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int* prefixSum;
    int size;
} NumArray;

// 初始化 NumArray
NumArray* numArrayCreate(int* nums, int numsSize) {
    NumArray* obj = (NumArray*)malloc(sizeof(NumArray));
    obj->prefixSum = (int*)malloc((numsSize + 1) * sizeof(int));
    obj->prefixSum[0] = 0;
    obj->size = numsSize;
    for (int i = 1; i <= numsSize; i++) {
        obj->prefixSum[i] = obj->prefixSum[i - 1] + nums[i - 1];
    }
    return obj;
}

// 返回区间 [i, j] 的和
int numArraySumRange(NumArray* obj, int i, int j) {
    return obj->prefixSum[j + 1] - obj->prefixSum[i];
}

// 释放内存
void numArrayFree(NumArray* obj) {
    free(obj->prefixSum);
    free(obj);
}

int main() {
    int nums[] = {-2, 0, 3, -5, 2, -1};
    int numsSize = 6;
    NumArray* obj = numArrayCreate(nums, numsSize);
    
    printf("sumRange(0, 2): %d\n", numArraySumRange(obj, 0, 2)); // 1
    printf("sumRange(2, 5): %d\n", numArraySumRange(obj, 2, 5)); // -1
    printf("sumRange(0, 5): %d\n", numArraySumRange(obj, 0, 5)); // -3
    
    numArrayFree(obj);
    return 0;
}
```

---

### C++ 解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class NumArray {
private:
    vector<int> prefixSum;
    
public:
    // 构造函数，计算前缀和
    NumArray(vector<int>& nums) {
        int n = nums.size();
        prefixSum.resize(n + 1, 0);
        for (int i = 0; i < n; i++) {
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
    }

    // 查询区间 [i, j] 的和
    int sumRange(int i, int j) {
        return prefixSum[j + 1] - prefixSum[i];
    }
};

int main() {
    vector<int> nums = {-2, 0, 3, -5, 2, -1};
    NumArray numArray(nums);
    
    cout << "sumRange(0, 2): " << numArray.sumRange(0, 2) << endl; // 1
    cout << "sumRange(2, 5): " << numArray.sumRange(2, 5) << endl; // -1
    cout << "sumRange(0, 5): " << numArray.sumRange(0, 5) << endl; // -3
    
    return 0;
}
```

---

### 代码解析：

#### 1. **C语言实现**：
   - 使用了一个 `prefixSum` 数组来存储从 0 到每个索引的前缀和。构造函数通过 `nums` 数组初始化 `prefixSum` 数组。
   - `sumRange` 方法通过简单的减法操作获取指定区间的和。
   - 内存管理：在 `numArrayCreate` 函数中动态分配内存，并且在 `numArrayFree` 中释放内存。

#### 2. **C++ 实现**：
   - 类 `NumArray` 的构造函数初始化了一个前缀和数组 `prefixSum`。
   - `sumRange` 方法直接使用前缀和数组的值进行查询，时间复杂度为 O(1)。
   - `main` 函数中创建了一个 `NumArray` 对象并进行了测试。

---

### 时间复杂度：
- **构造函数**：O(n)，因为我们需要遍历数组 `nums` 来计算前缀和。
- **sumRange**：O(1)，查询区间和只需常数时间。

### 空间复杂度：
- O(n)，需要一个额外的数组来存储前缀和。

### 总结：
- 该问题利用了 **前缀和（Prefix Sum）** 的技巧，通过预处理数组使得区间和查询变得非常高效。
- 使用了 O(n) 的空间来存储前缀和数组，而每次查询则只需要 O(1) 的时间，极大提高了查询效率。