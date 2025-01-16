---
layout: post
title:  "46. 全排列"
categories: arithmetic
---

[46. 全排列](https://leetcode.cn/problems/permutations)

## 题目要求

### 描述：
给定一个没有重复数字的序列 `nums` ，返回其所有可能的全排列。

**示例 1**：

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

**示例 2**：

**输入：**
```text
nums = [0, 1]
```

**输出：**
```text
[
  [0,1],
  [1,0]
]
```

### 提示：
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- `nums` 中的所有整数都是独一无二的。

## 解题思路

### 思路：
1. **回溯算法**：
   - 该问题实际上是一个经典的排列问题。我们可以通过回溯算法来生成所有可能的排列。回溯的思想是：
     - 从数组中选择一个元素，并放入当前的排列中。
     - 然后递归地选择下一个元素。
     - 当排列长度达到数组的长度时，将当前排列加入结果集。
     - 回溯到上一步，尝试选择下一个未被选择的元素，直到遍历所有可能的选择。
  
2. **过程**：
   - 我们从数组中选择一个元素，加入当前的排列中。
   - 通过标记一个数组来判断该元素是否已经被选择过。
   - 在回溯中，当某个排列生成完毕时，将其加入最终的结果列表中。

3. **空间复杂度**：
   - 回溯算法需要使用递归栈，因此空间复杂度是 `O(n)`，其中 `n` 是数组的长度。

### 代码实现：

#### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

void backtrack(int* nums, int numsSize, int* path, int pathSize, int** result, int* returnSize, int* returnColumnSizes) {
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
        int flag = 0;
        // 判断当前元素是否在路径中已经存在
        for (int j = 0; j < pathSize; j++) {
            if (path[j] == nums[i]) {
                flag = 1;
                break;
            }
        }
        // 如果该元素未被使用，加入到路径中
        if (!flag) {
            path[pathSize] = nums[i];
            backtrack(nums, numsSize, path, pathSize + 1, result, returnSize, returnColumnSizes);
        }
    }
}

int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    int** result = (int**)malloc(100 * sizeof(int*));  // 假设最多有100个排列
    *returnColumnSizes = (int*)malloc(100 * sizeof(int));  // 记录每个排列的长度
    *returnSize = 0;

    int* path = (int*)malloc(numsSize * sizeof(int));  // 存储当前排列
    backtrack(nums, numsSize, path, 0, result, returnSize, *returnColumnSizes);

    return result;
}

int main() {
    int nums[] = {1, 2, 3};
    int numsSize = 3;
    int returnSize = 0;
    int* returnColumnSizes;
    
    int** result = permute(nums, numsSize, &returnSize, &returnColumnSizes);
    
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

#### C++ 解答

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
            // 如果该元素已经在路径中，则跳过
            if (used[i]) continue;
            
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

    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);  // 标记每个元素是否已经使用
        backtrack(nums, path, result, used);
        return result;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 2, 3};
    
    vector<vector<int>> result = solution.permute(nums);
    
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
   - 通过递归的方式，选择一个元素加入路径 `path`，然后递归计算剩下的元素的排列。
   - 递归到路径长度等于 `nums` 长度时，将路径加入结果集中。
   - 在选择某个元素时，通过一个 `flag` 数组判断该元素是否已经在路径中。
   - 递归结束后，通过回溯撤销当前选择。

2. **`permute` 函数**：
   - `permute` 函数是最终调用的接口，返回所有的排列结果。
   - 使用动态数组存储最终结果，并返回。

3. **`main` 函数**：
   - 调用 `permute` 函数计算全排列并打印结果。

#### C++ 解答：
1. **回溯函数 `backtrack`**：
   - 使用 `used` 数组来标记某个元素是否已被使用。
   - 在每一层递归中，尝试将一个未使用的元素添加到当前的排列 `path` 中，并继续递归下去。
   - 当路径的长度与 `nums` 相等时，表示一个完整的排列已经生成，将其加入结果中。

2. **`permute` 函数**：
   - 调用 `backtrack` 来生成所有的排列。
   - 返回一个二维 `vector` 存储结果。

3. **`main` 函数**：
   - 创建 `Solution` 对象，调用 `permute` 获取全排列结果，并输出。

### 时间复杂度：
- **时间复杂度**：O(n!)，其中 n 是数组 `nums` 的长度。由于要生成所有的排列，排列的个数是 n!。
- **空间复杂度**：O(n)，其中 n 是数组的长度。需要递归栈空间和存储排列的结果。

### 小结：
- 本题通过回溯算法生成数组的所有排列，适用于此类排列组合问题。通过合理的状态标记（如 `used` 数组）避免重复的排列。
