---
layout: post
title:  "167. 两数之和 II - 输入有序数组"
categories: arithmetic
---

[167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted)

### 题目描述

**题目：两数之和 II - 输入有序数组**

给定一个已按升序排列的整数数组 `numbers` 和一个目标值 `target`，请你从数组中找出和为目标值的两个整数，并返回它们的下标。

**说明：**

- 返回的答案 1 和 2 是 1 基础的索引。
- 你可以假设每个输入只对应一个答案，且同一个元素不能使用两遍。

**示例 1：**

```plaintext
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1, 2]
```

**示例 2：**

```plaintext
输入: numbers = [2, 3, 4], target = 6
输出: [1, 3]
```

**示例 3：**

```plaintext
输入: numbers = [-1, 0], target = -1
输出: [1, 2]
```

**提示：**
- `2 <= numbers.length <= 3 * 10^4`
- `-1000 <= numbers[i] <= 1000`
- `numbers` 是按升序排列的
- `-1000 <= target <= 1000`

---

### 解题思路

这是一个经典的**两数之和**问题，考虑到输入数组已经是排序的，我们可以利用**双指针法**来高效地解决问题。通过双指针法，时间复杂度可以优化到 O(N)，其中 N 是数组的长度。

#### 双指针法

1. **初始化两个指针**：
   - 一个指针从数组的左边（`left`），另一个指针从数组的右边（`right`）开始。
   
2. **迭代并比较**：
   - 计算当前两个指针所指向元素的和 `sum = numbers[left] + numbers[right]`。
   - 如果 `sum == target`，则返回这两个元素的索引（注意是1基索引，因此需要加1）。
   - 如果 `sum < target`，则移动 `left` 指针向右，增加当前和。
   - 如果 `sum > target`，则移动 `right` 指针向左，减小当前和。
   
3. **结束条件**：
   - 当 `left` 指针小于 `right` 指针时，我们不断调整指针位置，直到找到答案。

#### 时间和空间复杂度
- **时间复杂度**：O(N)，其中 N 是数组的长度。我们最多只需要遍历一遍数组。
- **空间复杂度**：O(1)，只用了常数空间。

### C语言解答

```c
#include <stdio.h>

int* twoSum(int* numbers, int numbersSize, int target, int* returnSize) {
    // 创建一个返回数组，存储结果
    static int result[2];  // 因为返回的是指针，所以定义为static变量
    *returnSize = 2;  // 结果数组的大小为2

    int left = 0, right = numbersSize - 1;

    // 双指针法
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) {
            result[0] = left + 1;  // 返回的索引是1-based
            result[1] = right + 1;
            return result;
        } else if (sum < target) {
            left++;  // 增大左指针
        } else {
            right--;  // 减小右指针
        }
    }

    // 不会走到这一步，因为题目保证有一个解
    return result;
}

int main() {
    int numbers[] = {2, 7, 11, 15};
    int target = 9;
    int returnSize;
    int* result = twoSum(numbers, 4, target, &returnSize);
    printf("Result: [%d, %d]\n", result[0], result[1]);  // 应该输出 [1, 2]
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        vector<int> result;  // 用于存储结果
        int left = 0, right = numbers.size() - 1;

        // 双指针法
        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum == target) {
                result.push_back(left + 1);  // 1-based index
                result.push_back(right + 1);  // 1-based index
                return result;
            } else if (sum < target) {
                left++;  // 增大左指针
            } else {
                right--;  // 减小右指针
            }
        }

        return result;  // 题目保证一定有解
    }
};

int main() {
    Solution solution;
    vector<int> numbers = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = solution.twoSum(numbers, target);
    cout << "Result: [" << result[0] << ", " << result[1] << "]" << endl;  // 应该输出 [1, 2]
    return 0;
}
```

### 代码解析

#### C语言解答：
1. **返回值**：
   - 由于 C 语言没有直接支持返回 `vector` 这样的数据结构，因此我们使用 `static int result[2]` 来存储结果数组，这样返回时可以保证结果不会丢失。
   
2. **双指针法**：
   - 使用两个指针 `left` 和 `right` 来指向数组的两端，通过不断调整指针的位置来查找满足条件的两个数。
   - 每次计算和 `sum = numbers[left] + numbers[right]`，根据 `sum` 与 `target` 的关系调整指针。

3. **返回大小**：
   - 用 `*returnSize = 2;` 来设置返回数组的大小。

#### C++解答：
1. **返回值**：
   - 使用 `vector<int>` 来动态存储结果，更加灵活。
   
2. **双指针法**：
   - 与 C 语言的解法相同，使用 `left` 和 `right` 指针来遍历数组，查找符合条件的两数。

3. **处理 1-based 索引**：
   - 结果是 1-based 索引，因此在返回前我们将 `left` 和 `right` 的值加 1。

### 总结

- **时间复杂度**：O(N)，其中 N 是数组的长度。因为我们只需遍历数组一次。
- **空间复杂度**：O(1)，只使用了常数空间（对于 C 语言是数组，对于 C++ 是 `vector`）。

这个问题的解决方法非常直接且高效，利用了数组已经排序的特点，可以在 O(N) 时间内完成查找。