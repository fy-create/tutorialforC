---
layout: post
title:  "90. 子集 II"
categories: arithmetic
---

[90. 子集 II](https://leetcode.cn/problems/subsets-ii)

### 题目描述

给定一个可能包含重复数字的整数数组 `nums`，返回该数组所有可能的子集（幂集）。

**说明：**

- 解集不能包含重复的子集。 
- 返回的解集中，子集可以按任意顺序排列。

**示例 1：**

```
输入：nums = [1,2,2]
输出：
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

**示例 2：**

```
输入：nums = [0]
输出：[
  [],
  [0]
]
```

**提示：**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

### 解题思路

要生成所有可能的子集，并且避免重复子集，可以采用回溯法（深度优先搜索）的策略。具体步骤如下：

1. **排序处理：**
   - 首先对输入数组 `nums` 进行排序。排序的目的是将相同的元素相邻，这样在后续的回溯过程中，可以方便地跳过重复的元素，避免生成重复的子集。

2. **回溯函数设计：**
   - 使用一个临时的动态数组 `temp` 来存储当前的子集。
   - 从数组的起始位置开始，逐步选择或不选择每一个元素。
   - 对于每一个元素，决定是否将其包含在当前的子集中。
   
3. **避免重复选择：**
   - 在回溯的过程中，如果当前元素与前一个元素相同，并且前一个元素没有被选择（即在同一层递归中未选择前一个重复元素），则跳过当前元素。这一步是关键，用于避免生成重复的子集。

4. **递归终止条件：**
   - 当遍历完数组的所有元素时，将当前的临时子集添加到结果集中。

5. **时间复杂度分析：**
   - 由于每个元素有选择和不选择两种可能性，因此总的时间复杂度为 `O(2^n)`，其中 `n` 是数组的长度。但由于需要处理重复元素，实际的时间复杂度会略低于 `2^n`。

6. **空间复杂度分析：**
   - 空间复杂度主要由递归栈和存储结果集所占用的空间决定，为 `O(n)` 和 `O(2^n)`，分别对应于递归深度和结果集大小。

这种方法通过排序和适当的剪枝，有效地避免了重复子集的生成，确保了结果集的唯一性。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 动态数组结构体
typedef struct {
    int** subsets;
    int* subsetSizes;
    int count;
    int capacity;
} SubsetList;

// 初始化动态数组
void initSubsetList(SubsetList* list) {
    list->count = 0;
    list->capacity = 10;
    list->subsets = (int**)malloc(sizeof(int*) * list->capacity);
    list->subsetSizes = (int*)malloc(sizeof(int) * list->capacity);
}

// 添加子集到动态数组
void addSubset(SubsetList* list, int* subset, int size) {
    if (list->count == list->capacity) {
        list->capacity *= 2;
        list->subsets = (int**)realloc(list->subsets, sizeof(int*) * list->capacity);
        list->subsetSizes = (int*)realloc(list->subsetSizes, sizeof(int) * list->capacity);
    }
    list->subsets[list->count] = subset;
    list->subsetSizes[list->count] = size;
    list->count++;
}

// 排序函数，使用快速排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

// 回溯函数
void backtrack(int* nums, int numsSize, int start, int* temp, int tempSize, SubsetList* list) {
    // 创建当前子集的拷贝并添加到结果中
    int* currentSubset = (int*)malloc(sizeof(int) * tempSize);
    memcpy(currentSubset, temp, sizeof(int) * tempSize);
    addSubset(list, currentSubset, tempSize);
    
    for (int i = start; i < numsSize; i++) {
        // 如果当前元素与前一个相同，且前一个元素未被选中，跳过以避免重复
        if (i > start && nums[i] == nums[i - 1]) continue;
        
        // 选择当前元素
        temp[tempSize] = nums[i];
        backtrack(nums, numsSize, i + 1, temp, tempSize + 1, list);
    }
}

// 主函数：生成所有子集
int** subsetsWithDup(int* nums, int numsSize, int* returnSize, int** returnColumnSizes){
    // 排序处理
    qsort(nums, numsSize, sizeof(int), compare);
    
    // 初始化结果集
    SubsetList list;
    initSubsetList(&list);
    
    // 临时数组用于存储当前子集
    int* temp = (int*)malloc(sizeof(int) * numsSize);
    
    // 开始回溯
    backtrack(nums, numsSize, 0, temp, 0, &list);
    
    // 设置返回值
    *returnSize = list.count;
    *returnColumnSizes = list.subsetSizes;
    return list.subsets;
}

// 辅助函数：打印二维数组
void printSubsets(int** subsets, int* subsetSizes, int size) {
    printf("[\n");
    for(int i = 0; i < size; i++) {
        printf("  [");
        for(int j = 0; j < subsetSizes[i]; j++) {
            printf("%d", subsets[i][j]);
            if(j < subsetSizes[i] -1) printf(",");
        }
        printf("]");
        if(i < size -1) printf(",\n");
        else printf("\n");
    }
    printf("]\n");
}

// 简单的主函数调用示例
int main() {
    // 示例1
    int nums1[] = {1,2,2};
    int numsSize1 = sizeof(nums1)/sizeof(nums1[0]);
    int returnSize1;
    int* returnColumnSizes1;
    int** result1 = subsetsWithDup(nums1, numsSize1, &returnSize1, &returnColumnSizes1);
    printf("示例1的子集为：\n");
    printSubsets(result1, returnColumnSizes1, returnSize1);
    
    // 示例2
    int nums2[] = {0};
    int numsSize2 = sizeof(nums2)/sizeof(nums2[0]);
    int returnSize2;
    int* returnColumnSizes2;
    int** result2 = subsetsWithDup(nums2, numsSize2, &returnSize2, &returnColumnSizes2);
    printf("示例2的子集为：\n");
    printSubsets(result2, returnColumnSizes2, returnSize2);
    
    // 释放动态内存
    for(int i = 0; i < returnSize1; i++) {
        free(result1[i]);
    }
    free(result1);
    free(returnColumnSizes1);
    
    for(int i = 0; i < returnSize2; i++) {
        free(result2[i]);
    }
    free(result2);
    free(returnColumnSizes2);
    
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
    // 主函数：生成所有子集
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<vector<int>> result; // 结果集
        vector<int> temp;           // 临时子集
        sort(nums.begin(), nums.end()); // 排序处理
        backtrack(nums, 0, temp, result);
        return result;
    }
    
private:
    // 回溯函数
    void backtrack(const vector<int>& nums, int start, vector<int>& temp, vector<vector<int>>& result) {
        // 将当前子集添加到结果集中
        result.emplace_back(temp);
        
        for(int i = start; i < nums.size(); i++) {
            // 如果当前元素与前一个相同，且前一个元素未被选中，跳过以避免重复
            if(i > start && nums[i] == nums[i -1]) continue;
            
            // 选择当前元素
            temp.push_back(nums[i]);
            
            // 递归调用，选择下一个元素
            backtrack(nums, i + 1, temp, result);
            
            // 撤销选择
            temp.pop_back();
        }
    }
};

// 辅助函数：打印二维数组
void printSubsets(const vector<vector<int>>& subsets) {
    cout << "[\n";
    for(size_t i = 0; i < subsets.size(); i++) {
        cout << "  [";
        for(size_t j = 0; j < subsets[i].size(); j++) {
            cout << subsets[i][j];
            if(j < subsets[i].size() -1) cout << ",";
        }
        cout << "]";
        if(i < subsets.size() -1) cout << ",\n";
        else cout << "\n";
    }
    cout << "]\n";
}

// 简单的主函数调用示例
int main() {
    Solution solution;
    
    // 示例1
    vector<int> nums1 = {1,2,2};
    vector<vector<int>> result1 = solution.subsetsWithDup(nums1);
    cout << "示例1的子集为：\n";
    printSubsets(result1);
    
    // 示例2
    vector<int> nums2 = {0};
    vector<vector<int>> result2 = solution.subsetsWithDup(nums2);
    cout << "示例2的子集为：\n";
    printSubsets(result2);
    
    return 0;
}
```