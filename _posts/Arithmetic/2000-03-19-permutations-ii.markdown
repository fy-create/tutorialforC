---
layout: post
title:  "47. 全排列 II"
categories: arithmetic
---

[47. 全排列 II](https://leetcode.cn/problems/permutations-ii)

## 题目要求

### 描述：
给定一个可包含重复数字的序列 `nums` ，返回所有不重复的全排列。

**示例 1**：

**输入：**
```text
nums = [1, 1, 2]
```

**输出：**
```text
[
  [1,1,2],
  [1,2,1],
  [2,1,1]
]
```

**示例 2**：

**输入：**
```text
nums = [1, 2, 3]
```

**输出：**
```text
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
```

### 提示：
- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10
- `nums` 中的所有整数都 **不一定** 唯一。

## 解题思路

### 思路：
1. **回溯算法**：
   - 该问题与经典的全排列问题类似，唯一不同的是数组中可能有重复的数字。为了避免重复排列，我们可以通过排序来解决。
   - 回溯算法的基本思路是：从数组中选择一个数字，放入当前的排列中，然后递归处理下一个数字。
   - 如果数组中有重复的数字，我们在生成排列时，必须避免选择重复的数字进入排列。为了确保这一点，我们可以在回溯的过程中进行去重操作。

2. **排序与去重**：
   - 在开始回溯之前，我们先将输入数组 `nums` 排序。排序后的数组有助于我们在回溯过程中容易发现哪些元素是重复的。
   - 在回溯过程中，当遍历到某个数字时，如果该数字与上一个数字相同并且上一个数字还未被选择过，我们就跳过这个数字，以避免生成重复的排列。

3. **回溯函数的设计**：
   - 我们用 `used` 数组来标记每个元素是否已经被使用。
   - 通过递归的方式生成排列，一旦排列长度等于 `nums` 的长度，就将其加入结果列表。

4. **时间与空间复杂度**：
   - 时间复杂度：O(n!)，其中 n 是 `nums` 的长度。最坏情况下，我们会生成所有的排列。
   - 空间复杂度：O(n)，用来存储排列结果和递归栈。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

void backtrack(int* nums, int numsSize, int* path, int pathSize, int** result, int* returnSize, int* returnColumnSizes, int* used) {
    // 如果当前路径长度等于nums的长度，说明已经找到一个排列
    if (pathSize == numsSize) {
        result[*returnSize] = (int*)malloc(numsSize * sizeof(int));
        for (int i = 0; i < numsSize; i++) {
            result[*returnSize][i] = path[i];
        }
        returnColumnSizes[*returnSize] = numsSize;
        (*returnSize)++;
        return;
    }

    // 遍历数组中的每个元素
    for (int i = 0; i < numsSize; i++) {
        // 跳过重复的元素
        if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) {
            continue;
        }
        // 标记当前元素为已使用
        used[i] = 1;
        path[pathSize] = nums[i];
        backtrack(nums, numsSize, path, pathSize + 1, result, returnSize, returnColumnSizes, used);
        // 回溯，撤销选择
        used[i] = 0;
    }
}

int** permuteUnique(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int** result = (int**)malloc(100 * sizeof(int*));  // 假设最多有100个排列
    *returnColumnSizes = (int*)malloc(100 * sizeof(int));  // 记录每个排列的长度
    *returnSize = 0;

    // 排序输入数组
    qsort(nums, numsSize, sizeof(int), (int(*)(const void*, const void*))strcmp);
    
    int* path = (int*)malloc(numsSize * sizeof(int));  // 存储当前排列
    int* used = (int*)calloc(numsSize, sizeof(int));  // 标记每个元素是否被使用
    backtrack(nums, numsSize, path, 0, result, returnSize, *returnColumnSizes, used);

    return result;
}

int main() {
    int nums[] = {1, 1, 2};
    int numsSize = 3;
    int returnSize = 0;
    int* returnColumnSizes;
    
    int** result = permuteUnique(nums, numsSize, &returnSize, &returnColumnSizes);
    
    // 输出结果
    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\n");
    }

    // 释放内存
    free(returnColumnSizes);
    for (int i = 0; i < returnSize; i++) {
        free(result[i]);
    }
    free(result);
    
    return 0;
}
```

### C++ 解答

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    // 回溯算法生成全排列
    void backtrack(vector<int>& nums, vector<int>& path, vector<vector<int>>& result, vector<bool>& used) {
        // 当路径长度等于nums的长度时，生成一个完整的排列
        if (path.size() == nums.size()) {
            result.push_back(path);
            return;
        }

        // 遍历数组中的每个元素
        for (int i = 0; i < nums.size(); i++) {
            // 如果该元素已经在路径中，或者是重复元素且前一个元素没有被选择，跳过该元素
            if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;

            // 标记该元素为已使用
            used[i] = true;
            path.push_back(nums[i]);

            // 递归调用，生成下一个排列
            backtrack(nums, path, result, used);

            // 回溯：撤销选择
            path.pop_back();
            used[i] = false;
        }
    }

    vector<vector<int>> permuteUnique(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);  // 标记每个元素是否已经使用
        sort(nums.begin(), nums.end());  // 排序，便于去重
        backtrack(nums, path, result, used);
        return result;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 1, 2};

    vector<vector<int>> result = solution.permuteUnique(nums);

    // 输出结果
    for (const auto& perm : result) {
        for (int num : perm) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```

### 代码解析

#### C语言解答：
1. **回溯函数 `backtrack`**：
   - 我们使用一个 `used` 数组来标记元素是否已被使用。
   - 对于每个数字，如果它已经被使用或者它与前一个数字相同且前一个数字没有被使用，就跳过这个数字，避免重复排列。
   - 每次生成完整排列时，添加到 `result` 中。

2. **`permuteUnique` 函数**：
   - 首先排序数组，以便我们可以识别重复的元素。
   - 使用回溯算法生成所有不重复的排列。

3. **`main` 函数**：
   - 调用 `permuteUnique` 获取全排列并打印。

#### C++ 解答：
1. **回溯函数 `backtrack`**：
   - 通过 `used` 数组标记数字是否已被选择。
   - 递归生成排列，并使用排序和条件判断避免重复的排列。

2. **`permuteUnique` 函数**：
   - 首先对 `nums` 进行排序，这样相同的数字会聚集在一起，便于在回溯时去重。
   - 使用回溯算法生成所有不重复的排列。

3. **`main` 函数**：
   - 调用 `permuteUnique` 获取所有排列结果，并打印。

### 时间复杂度：
- **时间复杂度**：O(n!)，其中 n 是数组 `nums` 的长度。最坏情况下我们会生成所有的排列。
- **空间复杂度**：O(n)，其中 n 是数组 `nums` 的长度。用来存储排列

结果以及递归栈的空间。

### 小结：
- 本题通过回溯算法生成所有不重复的排列，适用于此类排列问题。通过对数组排序和合理的去重判断来避免重复的排列。