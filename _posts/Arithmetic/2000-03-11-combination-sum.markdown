---
layout: post
title:  "39. 组合总和"
categories: arithmetic
---

[39. 组合总和](https://leetcode.cn/problems/combination-sum)

以下是关于“组合总和”问题的详细解题方案，包括解题思路、C 和 C++ 的实现代码。

---

### **题目描述：**
给定一个无重复元素的正整数数组 `candidates` 和一个目标值 `target`，找出 `candidates` 中所有可以使数字和为 `target` 的组合。

**说明：**
- 每个数字在每个组合中可以无限次使用。
- 结果可以按任意顺序返回。

**示例：**
```text
输入：candidates = [2,3,6,7], target = 7  
输出：[[2,2,3],[7]]

输入：candidates = [2,3,5], target = 8  
输出：[[2,2,2,2],[2,3,3],[3,5]]
```

---

### **解题思路：**

1. **回溯法**：
   - 回溯法是一种经典的解决组合问题的方法。
   - 每次递归时，从当前位置开始尝试选择每一个候选数字，加入当前组合，并继续递归尝试。

2. **递归过程**：
   - 如果当前组合的和超过了目标值 `target`，停止递归。
   - 如果组合的和正好等于目标值，将当前组合加入结果集。

3. **剪枝优化**：
   - 数组排序后，若当前数字大于目标值，可提前结束递归。
   - 避免重复路径的选择。

4. **时间复杂度**：
   - 最坏情况下为指数级别：O(S)，其中 S 是结果集的总规模。

5. **空间复杂度**：
   - 递归深度最大为目标值 `target`。

---

### **C 语言实现：**
```c
#include <stdio.h>
#include <stdlib.h>

void backtrack(int* candidates, int candidatesSize, int target, int* current, int currentSize, int** result, int* returnSize, int* returnColumnSizes, int start) {
    if (target == 0) {
        result[*returnSize] = (int*)malloc(currentSize * sizeof(int));
        for (int i = 0; i < currentSize; i++) {
            result[*returnSize][i] = current[i];
        }
        returnColumnSizes[*returnSize] = currentSize;
        (*returnSize)++;
        return;
    }
    for (int i = start; i < candidatesSize; i++) {
        if (candidates[i] > target) break; // 剪枝
        current[currentSize] = candidates[i];
        backtrack(candidates, candidatesSize, target - candidates[i], current, currentSize + 1, result, returnSize, returnColumnSizes, i);
    }
}

int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    int** result = (int**)malloc(500 * sizeof(int*));
    *returnColumnSizes = (int*)malloc(500 * sizeof(int));
    int* current = (int*)malloc(target * sizeof(int));
    *returnSize = 0;

    backtrack(candidates, candidatesSize, target, current, 0, result, returnSize, *returnColumnSizes, 0);

    free(current);
    return result;
}

int main() {
    int candidates[] = {2, 3, 6, 7};
    int target = 7;
    int returnSize = 0;
    int* returnColumnSizes;

    int** result = combinationSum(candidates, 4, target, &returnSize, &returnColumnSizes);

    for (int i = 0; i < returnSize; i++) {
        for (int j = 0; j < returnColumnSizes[i]; j++) {
            printf("%d ", result[i][j]);
        }
        printf("\n");
        free(result[i]);
    }
    free(result);
    free(returnColumnSizes);

    return 0;
}
```



### **C++ 实现：**
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    void backtrack(vector<int>& candidates, int target, vector<int>& current, vector<vector<int>>& result, int start) {
        if (target == 0) { // 找到一个解
            result.push_back(current);
            return;
        }
        for (int i = start; i < candidates.size(); i++) {
            if (candidates[i] > target) break; // 剪枝
            current.push_back(candidates[i]); // 选择当前数字
            backtrack(candidates, target - candidates[i], current, result, i); // 递归
            current.pop_back(); // 回溯
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;
        sort(candidates.begin(), candidates.end()); // 排序方便剪枝
        backtrack(candidates, target, current, result, 0);
        return result;
    }
};

int main() {
    vector<int> candidates = {2, 3, 6, 7};
    int target = 7;

    Solution sol;
    vector<vector<int>> result = sol.combinationSum(candidates, target);

    for (const auto& combination : result) {
        for (int num : combination) {
            cout << num << " ";
        }
        cout << endl;
    }

    return 0;
}
```

