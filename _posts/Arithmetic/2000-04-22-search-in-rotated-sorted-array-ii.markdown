---
layout: post
title:  "81. 搜索旋转排序数组 II"
categories: arithmetic
---

[81. 搜索旋转排序数组 II](https://leetcode.cn/problems/search-in-rotated-sorted-array-ii)

### 题目要求：

给定一个可能包含重复元素的旋转排序数组 `nums`，并且给定一个目标值 `target`，你需要判断目标值 `target` 是否在数组 `nums` 中。

#### 示例 1：
```
输入：nums = [2,5,6,0,0,1,2], target = 0
输出：true
```

#### 示例 2：
```
输入：nums = [2,5,6,0,0,1,2], target = 3
输出：false
```

#### 示例 3：
```
输入：nums = [1], target = 0
输出：false
```

### 提示：
- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 可能包含重复元素。
- 你可以假设数组是通过对一个原始升序数组进行旋转得到的。

### 解题思路：

本题目要求在旋转排序数组中查找目标值 `target`。因为数组是通过旋转一个升序数组得到的，因此数组的两个部分都会保持部分排序的特性。旋转排序数组的关键特点是：
1. 数组的某部分是升序的。
2. 数组的另一部分也是升序的。

因此，我们可以利用二分查找来缩小搜索范围，但在旋转数组中可能存在重复的元素，这会增加处理的复杂性。对于这种情况，我们必须小心处理重复元素带来的影响，防止在二分查找时陷入死循环。

### 具体步骤：
1. **初始化**：使用两个指针 `left` 和 `right`，分别指向数组的两端。
2. **二分查找**：
   - 计算中间索引 `mid`。
   - 如果 `nums[mid] == target`，则直接返回 `true`。
   - 如果 `nums[left] == nums[mid] == nums[right]`，这意味着无法判断哪一部分是有序的，因为三者相同。此时，我们只能缩小范围，`left++` 和 `right--`，以跳过重复元素。
   - 否则，我们根据 `nums[left]` 和 `nums[mid]` 的大小关系来确定哪一部分是有序的。如果左半部分有序，且 `target` 位于左半部分，则将 `right` 移动到 `mid - 1`，否则将 `left` 移动到 `mid + 1`。
   - 如果右半部分有序，则执行类似的操作。
3. **返回结果**：如果在查找过程中没有找到目标元素，则返回 `false`。

### C语言解答：

```c
#include <stdio.h>
#include <stdbool.h>

bool search(int* nums, int numsSize, int target) {
    int left = 0, right = numsSize - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // 找到目标值
        if (nums[mid] == target) {
            return true;
        }
        
        // 如果左、中、右元素相等，缩小范围
        if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
            left++;
            right--;
        } else if (nums[left] <= nums[mid]) {  // 左半部分是有序的
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;  // 目标值在左半部分
            } else {
                left = mid + 1;  // 目标值在右半部分
            }
        } else {  // 右半部分是有序的
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;  // 目标值在右半部分
            } else {
                right = mid - 1;  // 目标值在左半部分
            }
        }
    }
    
    return false;  // 没有找到目标值
}

int main() {
    int nums[] = {2, 5, 6, 0, 0, 1, 2};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int target = 0;
    
    if (search(nums, numsSize, target)) {
        printf("Found target %d!\n", target);
    } else {
        printf("Target %d not found.\n", target);
    }
    
    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // 找到目标值
            if (nums[mid] == target) {
                return true;
            }
            
            // 如果左、中、右元素相等，缩小范围
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                left++;
                right--;
            } else if (nums[left] <= nums[mid]) {  // 左半部分是有序的
                if (target >= nums[left] && target < nums[mid]) {
                    right = mid - 1;  // 目标值在左半部分
                } else {
                    left = mid + 1;  // 目标值在右半部分
                }
            } else {  // 右半部分是有序的
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;  // 目标值在右半部分
                } else {
                    right = mid - 1;  // 目标值在左半部分
                }
            }
        }
        
        return false;  // 没有找到目标值
    }
};

int main() {
    Solution solution;
    
    vector<int> nums = {2, 5, 6, 0, 0, 1, 2};
    int target = 0;
    
    if (solution.search(nums, target)) {
        cout << "Found target " << target << "!" << endl;
    } else {
        cout << "Target " << target << " not found." << endl;
    }
    
    return 0;
}
```

### 代码解析：

#### C语言：
1. **初始化指针**：`left` 和 `right` 分别指向数组的两端。
2. **二分查找**：
   - 通过计算中间索引 `mid` 来判断目标是否在当前的搜索区间。
   - 如果 `nums[mid] == target`，直接返回 `true`。
   - 如果 `nums[left] == nums[mid] == nums[right]`，则我们无法判断哪部分是有序的，因此必须通过增加 `left` 和减少 `right` 来避免死循环。
   - 如果 `nums[left] <= nums[mid]`，说明左半部分是有序的，我们检查 `target` 是否在该部分。
   - 如果右半部分是有序的，我们类似的检查右半部分。
3. **返回结果**：如果找不到目标值，则返回 `false`。

#### C++：
1. **初始化指针**：同样地，`left` 和 `right` 分别指向数组的两端。
2. **二分查找**：实现方式与 C 语言解法相同，通过逻辑判断来缩小搜索范围。
3. **类封装**：将 `search` 方法放在 `Solution` 类中，方便后续使用。

### 时间和空间复杂度：
- **时间复杂度**：O(n)，最坏情况下需要遍历整个数组。在遇到重复元素时，无法通过二分法的正常方式进行优化，因此最坏情况为 O(n)。
- **空间复杂度**：O(1)，我们只使用常数的额外空间。

### 示例输出：

#### C语言：
```
Found target 0!
```

#### C++：
```
Found target 0!
```