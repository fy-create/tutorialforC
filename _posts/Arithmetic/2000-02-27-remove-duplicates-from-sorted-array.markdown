---
layout: post
title:  "26. 删除有序数组中的重复项"
categories: arithmetic
---

[26. 删除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array)

### 题目要求

给定一个排序数组，你需要 **原地** 删除重复出现的元素，使得每个元素只出现一次，并返回新的数组长度。

### 题目示例

#### 示例 1:
输入：`nums = [1, 1, 2]`  
输出：`2`  
解释：函数应该返回新的长度 `2`，并且数组 `nums` 的前两个元素应该是 `1` 和 `2`。你不需要考虑数组中多余的元素。

#### 示例 2:
输入：`nums = [0,0,1,1,1,2,2,3,3,4]`  
输出：`5`  
解释：函数应该返回新的长度 `5`，并且数组 `nums` 的前五个元素应该是 `0, 1, 2, 3, 4`。你不需要考虑数组中多余的元素。

### 提示
- `1 <= nums.length <= 3 * 10^4`
- `-100 <= nums[i] <= 100`
- `nums` 已按非降序排列。

### 解题思路

这道题目给定了一个已排序的数组，并要求在 **原地** 删除重复元素，只保留每个元素的第一个出现。为了保证 `O(1)` 的空间复杂度，我们不能使用额外的数组来存储结果。

可以通过使用双指针的策略来解决这个问题：

1. **快指针** (`i`): 这个指针用于遍历数组。
2. **慢指针** (`j`): 这个指针记录当前数组中已经不重复的元素的末尾。`j` 是数组中最新位置的索引，保证 `nums[0...j]` 这部分没有重复元素。

算法步骤：
- `j` 初始为 `0`，`i` 从 `1` 开始遍历数组。
- 对每一个 `i`，如果 `nums[i]` 与 `nums[j]` 不相等，说明遇到了一个新的元素。此时将 `nums[i]` 赋值给 `nums[j + 1]`，然后 `j` 自增。
- 遍历完成后，`j + 1` 就是新的数组长度。

### C语言解答

```c
#include <stdio.h>

// 删除排序数组中的重复元素，返回新的长度
int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0; // 如果数组为空，返回长度0

    int j = 0; // 慢指针初始化为0，指向数组的第一个元素
    for (int i = 1; i < numsSize; i++) { // 快指针从第二个元素开始
        // 如果当前元素和慢指针位置的元素不相等
        if (nums[i] != nums[j]) {
            j++; // 慢指针向右移动
            nums[j] = nums[i]; // 更新慢指针位置的元素
        }
    }
    return j + 1; // 新的数组长度是慢指针位置 + 1
}

int main() {
    int nums[] = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int newLength = removeDuplicates(nums, numsSize);
    
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
    // 删除排序数组中的重复元素，返回新的长度
    int removeDuplicates(vector<int>& nums) {
        if (nums.size() == 0) return 0; // 如果数组为空，返回长度0

        int j = 0; // 慢指针初始化为0，指向数组的第一个元素
        for (int i = 1; i < nums.size(); i++) { // 快指针从第二个元素开始
            // 如果当前元素和慢指针位置的元素不相等
            if (nums[i] != nums[j]) {
                j++; // 慢指针向右移动
                nums[j] = nums[i]; // 更新慢指针位置的元素
            }
        }
        return j + 1; // 新的数组长度是慢指针位置 + 1
    }
};

int main() {
    Solution solution;
    vector<int> nums = {0, 0, 1, 1, 1, 2, 2, 3, 3, 4};
    int newLength = solution.removeDuplicates(nums);
    
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
   - 使用两个指针：`i` 遍历整个数组，`j` 记录不重复的部分。
   - 当 `nums[i]` 不等于 `nums[j]` 时，说明发现了一个新元素，就将 `nums[i]` 移动到 `nums[j+1]` 的位置，并将 `j` 增加。

2. **C++解法**：
   - 使用 `vector<int>` 来动态管理数组，并使用 STL 容器简化代码。
   - `Solution` 类封装了删除重复元素的逻辑。`removeDuplicates` 函数返回新的数组长度，并且修改传入的 `vector<int>` 数组。

在 `main` 函数中，我们创建一个 `Solution` 对象并调用 `removeDuplicates` 函数，最后输出修改后的数组和新的长度。

通过上述解法，时间复杂度为 `O(n)`，空间复杂度为 `O(1)`，符合题目要求。