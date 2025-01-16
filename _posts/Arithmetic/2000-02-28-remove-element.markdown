---
layout: post
title:  "27. 移除元素"
categories: arithmetic
---

[27. 移除元素](https://leetcode.cn/problems/remove-element)

### 题目要求

给定一个数组 `nums` 和一个值 `val`，你需要 **原地** 移除所有的 `val` 元素，并返回新的数组长度。不要使用额外的数组空间。

### 题目示例

#### 示例 1:
输入：`nums = [3,2,2,3], val = 3`  
输出：`2`  
解释：函数应该返回新的长度 `2`，并且数组 `nums` 的前两个元素是 `2`。你不需要考虑数组中多余的元素。

#### 示例 2:
输入：`nums = [0,1,2,2,3,0,4,2], val = 2`  
输出：`5`  
解释：函数应该返回新的长度 `5`，并且数组 `nums` 的前五个元素是 `0, 1, 3, 0, 4`。你不需要考虑数组中多余的元素。

### 提示
- `0 <= nums.length <= 100`
- `0 <= nums[i] <= 50`
- `0 <= val <= 100`

### 解题思路

这道题目给定了一个数组 `nums` 和一个值 `val`，要求移除数组中所有等于 `val` 的元素，并返回数组的新长度。为了满足题目中 “原地” 删除的要求，我们需要避免使用额外的数组空间。

可以使用双指针的技巧来解决此问题：

1. **快指针** (`i`): 用来遍历整个数组。
2. **慢指针** (`j`): 记录新数组的尾部，存储所有不等于 `val` 的元素。

### 算法步骤：
- 初始化 `j` 为 0，表示新数组的末尾。
- 遍历整个数组，对于每个元素：
  - 如果当前元素 `nums[i]` 不等于 `val`，则将 `nums[i]` 移动到 `nums[j]`，并增加 `j`。
- 最终，`j` 就是新数组的长度。

### C语言解答

```c
#include <stdio.h>

// 移除数组中的指定元素并返回新数组的长度
int removeElement(int* nums, int numsSize, int val) {
    int j = 0; // 慢指针，初始化为0，表示数组的起始位置
    for (int i = 0; i < numsSize; i++) { // 快指针遍历数组
        if (nums[i] != val) { // 如果当前元素不等于 val
            nums[j] = nums[i]; // 将不等于 val 的元素移到数组前面
            j++; // 慢指针向后移动
        }
    }
    return j; // 返回新数组的长度
}

int main() {
    int nums[] = {0, 1, 2, 2, 3, 0, 4, 2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int val = 2;
    int newLength = removeElement(nums, numsSize, val);

    // 输出新的数组长度
    printf("New length: %d\n", newLength);

    // 输出数组中前 newLength 个元素
    for (int i = 0; i < newLength; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    // 移除数组中的指定元素并返回新数组的长度
    int removeElement(vector<int>& nums, int val) {
        int j = 0; // 慢指针，初始化为0，表示数组的起始位置
        for (int i = 0; i < nums.size(); i++) { // 快指针遍历数组
            if (nums[i] != val) { // 如果当前元素不等于 val
                nums[j] = nums[i]; // 将不等于 val 的元素移到数组前面
                j++; // 慢指针向后移动
            }
        }
        return j; // 返回新数组的长度
    }
};

int main() {
    Solution solution;
    vector<int> nums = {0, 1, 2, 2, 3, 0, 4, 2};
    int val = 2;
    int newLength = solution.removeElement(nums, val);

    // 输出新的数组长度
    cout << "New length: " << newLength << endl;

    // 输出数组中前 newLength 个元素
    for (int i = 0; i < newLength; i++) {
        cout << nums[i] << " ";
    }
    cout << endl;

    return 0;
}
```

### 解释

1. **C语言解法**：
   - 我们使用了两个指针：`i` 是快指针，遍历整个数组；`j` 是慢指针，负责更新数组并记录不等于 `val` 的元素的个数。
   - 如果 `nums[i]` 不等于 `val`，则将其存入 `nums[j]`，并将 `j` 增加。最终，`j` 就是新数组的长度。

2. **C++解法**：
   - 使用 `vector<int>` 来动态管理数组，并通过 `removeElement` 函数返回新的数组长度。
   - `Solution` 类封装了删除元素的逻辑，`removeElement` 函数负责遍历数组并修改原数组。

两种解法的时间复杂度均为 `O(n)`，空间复杂度为 `O(1)`，符合题目的要求。

