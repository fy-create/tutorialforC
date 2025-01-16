---
layout: post
title:  "80. 删除有序数组中的重复项 II"
categories: arithmetic
---

[80. 删除有序数组中的重复项 II](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii)

### 题目要求：

给定一个排序数组 `nums`，你需要原地删除重复出现的元素，使得每个元素最多出现两次，并返回新的长度。

不要使用额外的数组空间，必须在原数组上进行操作。**返回的新长度必须符合要求**，即不包含额外的元素。

#### 示例 1：
```
输入：nums = [1,1,1,2,2,3]
输出：5, nums = [1,1,2,2,3]
解释：函数应该返回新的长度 5，并且原数组 nums 的前 5 个元素是[1,1,2,2,3]。
```

#### 示例 2：
```
输入：nums = [0,0,1,1,1,1,2,3,3]
输出：7, nums = [0,0,1,1,2,3,3]
解释：函数应该返回新的长度 7，并且原数组 nums 的前 7 个元素是[0,0,1,1,2,3,3]。
```

### 提示：
- `0 <= nums.length <= 3 * 10^4`
- `-10^4 <= nums[i] <= 10^4`

### 解题思路：

我们需要对已排序的数组进行操作，并确保每个元素最多出现两次。问题的关键点在于如何在原地处理这些重复元素，并确保删除重复的部分。

#### 步骤：
1. **定义两个指针**：
   - `i` 用于遍历整个数组。
   - `j` 用于维护数组的最终位置，即处理过的有效数组的最后一个位置。
   
2. **遍历数组**：
   - 如果当前元素和前一个元素相同，则检查当前元素出现的次数。如果当前元素已出现超过两次，则跳过当前元素。
   - 如果当前元素和前一个元素不同，则直接将其保留，并移动 `j` 指针。

3. **结束遍历**：
   - 最后，`j` 的位置即为数组的长度。返回 `j + 1` 即为新的有效数组的长度。

### C语言解法：

```c
#include <stdio.h>

int removeDuplicates(int* nums, int numsSize) {
    if (numsSize == 0) return 0; // 如果数组为空，返回0
    
    int j = 1; // j用于保存有效元素的最后一个位置，初始位置从第二个元素开始
    
    for (int i = 2; i < numsSize; i++) { // 从第三个元素开始遍历
        // 如果当前元素与前两个元素不同
        if (nums[i] != nums[j - 1]) {
            j++;  // 移动j到下一个位置
            nums[j] = nums[i]; // 将当前元素放到新位置
        }
    }
    
    return j + 1; // 返回新的长度
}

int main() {
    int nums[] = {1, 1, 1, 2, 2, 3};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    
    int newLength = removeDuplicates(nums, numsSize);
    
    // 输出处理后的数组和新长度
    printf("New length: %d\n", newLength);
    printf("Processed array: ");
    for (int i = 0; i < newLength; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");
    
    return 0;
}
```

### C++解法：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.size() == 0) return 0; // 如果数组为空，返回0
        
        int j = 1; // j用于保存有效元素的最后一个位置，初始位置从第二个元素开始
        
        // 从第三个元素开始遍历
        for (int i = 2; i < nums.size(); i++) {
            // 如果当前元素与前两个元素不同
            if (nums[i] != nums[j - 1]) {
                j++;  // 移动j到下一个位置
                nums[j] = nums[i]; // 将当前元素放到新位置
            }
        }
        
        return j + 1; // 返回新的长度
    }
};

int main() {
    Solution solution;
    
    vector<int> nums = {1, 1, 1, 2, 2, 3};
    
    int newLength = solution.removeDuplicates(nums);
    
    // 输出处理后的数组和新长度
    cout << "New length: " << newLength << endl;
    cout << "Processed array: ";
    for (int i = 0; i < newLength; i++) {
        cout << nums[i] << " ";
    }
    cout << endl;
    
    return 0;
}
```

### 代码解析：

#### C语言实现：
1. **初始化**：`j` 用于追踪有效元素的末尾位置，初始值为1，即第一个元素的位置。
2. **遍历**：从数组的第三个元素开始遍历（即从索引2开始）。对于每个元素，如果该元素与数组中前两个元素相同，则跳过该元素，否则将该元素移动到 `j + 1` 位置。
3. **返回新长度**：最后，`j + 1` 即为数组的新长度。

#### C++实现：
1. **初始化**：`j` 用于追踪有效元素的末尾位置，初始值为1，表示第一个元素位置。
2. **遍历**：从数组的第三个元素开始遍历。如果当前元素不等于 `nums[j-1]`，说明当前元素与前两个不同，可以保留。将其移到新位置。
3. **返回新长度**：返回 `j + 1` 作为新数组的有效长度。

### 时间和空间复杂度：
- **时间复杂度**：O(n)，其中 `n` 是数组的长度。我们只遍历数组一次。
- **空间复杂度**：O(1)，我们在原数组上进行操作，不使用额外的数组空间。

### 示例输出：

#### C语言示例：
```
New length: 5
Processed array: 1 1 2 2 3
```

#### C++示例：
```
New length: 5
Processed array: 1 1 2 2 3
```