---
layout: post
title:  "321. 拼接最大数"
categories: arithmetic
---

[321. 拼接最大数](https://leetcode.cn/problems/create-maximum-number)

### 题目描述

给定两个整数数组 `nums1` 和 `nums2`，长度分别为 `m` 和 `n`，其中每个数字都是从 `0` 到 `9`。现在从这两个数组中选出 `k` 个数字（`k <= m + n`），以构建一个新的数字，使其最大化。选出的数字必须按其在原数组中的相对顺序排列。

**注意：**
- 你需要从两个数组中选出恰好 `k` 个数字。
- 在选取数字时，保持原数组中数字的相对顺序不变。

**示例 1：**

```
输入：
nums1 = [3, 4, 6, 5]
nums2 = [9, 1, 2, 5, 8, 3]
k = 5

输出：[9, 8, 6, 5, 3]

解释：
选出 [6,5] 来自 nums1 和 [9,8,3] 来自 nums2，构建最大数字 98653。
```

**示例 2：**

```
输入：
nums1 = [6, 7]
nums2 = [6, 0, 4]
k = 5

输出：[6, 7, 6, 0, 4]

解释：
选出全部数字来构建最大数字 67604。
```

**示例 3：**

```
输入：
nums1 = [3, 9]
nums2 = [8, 9]
k = 3

输出：[9, 8, 9]

解释：
选出 [9] 来自 nums1 和 [8,9] 来自 nums2，构建最大数字 989。
```

**提示：**

- `1 <= k <= m + n <= 2000`
- `0 <= nums1[i], nums2[i] <= 9`

---

### 解题思路

这道题要求从两个数组中选出 `k` 个数字，构建一个尽可能大的数字，同时保持选出的数字在各自数组中的相对顺序。为了解决这个问题，可以将其分解为以下几个步骤：

1. **分离选择问题**：
   - 对于每一个可能的选择方案，即从 `nums1` 中选取 `i` 个数字，从 `nums2` 中选取 `k - i` 个数字，满足 `0 <= i <= len(nums1)` 和 `0 <= k - i <= len(nums2)`。
   - 对于每一种可能的 `i`，分别在 `nums1` 和 `nums2` 中选择出最大的子序列。

2. **选择最大子序列**：
   - 对于一个数组和一个数 `t`，如何在保持相对顺序的前提下，选择出 `t` 个数字组成的最大子序列。
   - 这可以通过单调栈的方法实现：
     - 初始化一个栈，用于存储选择的数字。
     - 遍历数组，对于每个数字，若当前数字比栈顶数字大且剩余的数字足够多，可以弹出栈顶数字，重复此过程，直到不能再弹出。
     - 将当前数字压入栈中。
     - 最后，栈中保存的即为所需的最大子序列。

3. **合并两个子序列**：
   - 合并两个已选出的最大子序列，形成最终的最大数字。
   - 合并时，需要比较两个序列的剩余部分，以确保选择更大的数字。

4. **比较并选择最优解**：
   - 对于所有可能的 `i`，执行上述步骤，比较生成的数字，选择字典序最大的那个作为最终结果。

**时间复杂度分析**：
- 选择子序列的时间复杂度为 `O(n)`，其中 `n` 是数组的长度。
- 合并两个子序列的时间复杂度为 `O(k)`。
- 由于需要遍历所有可能的 `i`，最坏情况下的时间复杂度为 `O(k * (m + n))`，其中 `m` 和 `n` 分别是两个数组的长度。

**空间复杂度分析**：
- 主要用于存储前缀和子序列，空间复杂度为 `O(k)`。

通过上述方法，可以高效地解决问题，确保在合理的时间和空间复杂度内得到正确的结果。

---

### C语言解答

在C语言中，由于缺乏高级数据结构（如栈和字符串），需要手动实现相关功能。以下是详细的实现：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 函数用于选择一个数组中长度为 t 的最大子序列
int* maxSubsequence(int* nums, int numsSize, int t) {
    int* stack = (int*)malloc(t * sizeof(int));
    int top = 0;
    int drop = numsSize - t;
    
    for(int i = 0; i < numsSize; i++) {
        while(top > 0 && stack[top -1] < nums[i] && drop > 0){
            top--;
            drop--;
        }
        if(top < t){
            stack[top++] = nums[i];
        }
        else{
            drop--;
        }
    }
    return stack;
}

// 函数用于比较两个子序列，决定哪个更大
int compare(int* nums1, int i, int size1, int* nums2, int j, int size2){
    while(i < size1 && j < size2){
        if(nums1[i] > nums2[j]) return 1;
        if(nums1[i] < nums2[j]) return -1;
        i++;
        j++;
    }
    return (size1 - i) - (size2 - j);
}

// 函数用于合并两个子序列，生成最大的数字
int* merge(int* subseq1, int size1, int* subseq2, int size2, int* returnSize){
    int total = size1 + size2;
    int* merged = (int*)malloc(total * sizeof(int));
    int i = 0, j = 0, k = 0;
    while(i < size1 && j < size2){
        if(compare(subseq1, i, size1, subseq2, j, size2) > 0){
            merged[k++] = subseq1[i++];
        }
        else{
            merged[k++] = subseq2[j++];
        }
    }
    while(i < size1){
        merged[k++] = subseq1[i++];
    }
    while(j < size2){
        merged[k++] = subseq2[j++];
    }
    *returnSize = total;
    return merged;
}

// 主函数：创建最大数字
int* maxNumber(int* nums1, int nums1Size, int* nums2, int nums2Size, int k, int* returnSize){
    int maxLen = (nums1Size > k) ? k : nums1Size;
    int minLen = (nums2Size > k) ? 0 : k - nums2Size;
    if(k > nums1Size + nums2Size){
        *returnSize = 0;
        return NULL;
    }
    int* result = NULL;
    int resultSize = 0;
    for(int i = maxLen; i >=0; i--){
        if(i > nums1Size || (k - i) > nums2Size){
            continue;
        }
        int* subseq1 = maxSubsequence(nums1, nums1Size, i);
        int* subseq2 = maxSubsequence(nums2, nums2Size, k - i);
        int tempSize;
        int* merged = merge(subseq1, i, subseq2, k - i, &tempSize);
        if(result == NULL || compare(merged, 0, tempSize, result, 0, resultSize) > 0){
            if(result != NULL){
                free(result);
            }
            result = merged;
            resultSize = tempSize;
        }
        else{
            free(merged);
        }
        free(subseq1);
        free(subseq2);
    }
    *returnSize = resultSize;
    return result;
}

// 辅助函数用于打印数组
void printArray(int* arr, int size){
    printf("[");
    for(int i = 0; i < size; i++){
        printf("%d", arr[i]);
        if(i != size -1) printf(", ");
    }
    printf("]\n");
}

// 测试主函数
int main(){
    // 示例 1
    int nums1_1[] = {3, 4, 6, 5};
    int nums1Size1 = sizeof(nums1_1)/sizeof(nums1_1[0]);
    int nums2_1[] = {9, 1, 2, 5, 8, 3};
    int nums2Size1 = sizeof(nums2_1)/sizeof(nums2_1[0]);
    int k1 = 5;
    int returnSize1;
    int* res1 = maxNumber(nums1_1, nums1Size1, nums2_1, nums2Size1, k1, &returnSize1);
    printf("示例1输出: ");
    printArray(res1, returnSize1);
    free(res1);
    
    // 示例 2
    int nums1_2[] = {6, 7};
    int nums1Size2 = sizeof(nums1_2)/sizeof(nums1_2[0]);
    int nums2_2[] = {6, 0, 4};
    int nums2Size2 = sizeof(nums2_2)/sizeof(nums2_2[0]);
    int k2 = 5;
    int returnSize2;
    int* res2 = maxNumber(nums1_2, nums1Size2, nums2_2, nums2Size2, k2, &returnSize2);
    printf("示例2输出: ");
    printArray(res2, returnSize2);
    free(res2);
    
    // 示例 3
    int nums1_3[] = {3, 9};
    int nums1Size3 = sizeof(nums1_3)/sizeof(nums1_3[0]);
    int nums2_3[] = {8, 9};
    int nums2Size3 = sizeof(nums2_3)/sizeof(nums2_3[0]);
    int k3 = 3;
    int returnSize3;
    int* res3 = maxNumber(nums1_3, nums1Size3, nums2_3, nums2Size3, k3, &returnSize3);
    printf("示例3输出: ");
    printArray(res3, returnSize3);
    free(res3);
    
    return 0;
}
```

**代码说明：**

1. **选择最大子序列 (`maxSubsequence` 函数)：**
   - 使用一个栈（字符数组）来存储当前选择的子序列。
   - 通过比较当前字符与栈顶字符的大小，决定是否弹出栈顶字符，以确保子序列的最大化。

2. **比较两个子序列 (`compare` 函数)：**
   - 比较两个子序列，从当前索引开始逐个字符比较，决定哪个子序列更大。

3. **合并两个子序列 (`merge` 函数)：**
   - 根据 `compare` 函数的结果，依次选择更大的字符加入到合并后的结果中。

4. **主函数 (`maxNumber` 函数)：**
   - 遍历所有可能的选择方案，分别从 `nums1` 和 `nums2` 中选取不同数量的子序列。
   - 通过 `merge` 函数合并两个子序列，比较并记录字典序最大的结果。

5. **辅助函数：**
   - `printArray` 函数用于打印结果数组，方便验证。

6. **测试主函数：**
   - 包含三个示例，分别对应题目中的示例1、示例2和示例3。
   - 调用 `maxNumber` 函数并打印结果。

**编译和运行：**

使用以下命令编译并运行代码：

```bash
gcc -o solution solution.c
./solution
```

**预期输出：**

```
示例1输出: [9, 8, 6, 5, 3]
示例2输出: [6, 7, 6, 0, 4]
示例3输出: [9, 8, 9]
```

---

### C++ 解答

在C++中，可以利用STL容器（如`vector`和`string`）以及算法（如`sort`和`unique`）来简化实现。以下是详细的实现：

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // 函数用于选择一个数组中长度为 t 的最大子序列
    vector<int> maxSubsequence(const vector<int>& nums, int t) {
        vector<int> stack;
        int drop = nums.size() - t;
        for(auto num : nums){
            while(!stack.empty() && stack.back() < num && drop > 0){
                stack.pop_back();
                drop--;
            }
            if(stack.size() < t){
                stack.push_back(num);
            }
            else{
                drop--;
            }
        }
        return stack;
    }
    
    // 函数用于比较两个子序列，从当前索引开始的大小
    int compare(const vector<int>& nums1, int i, const vector<int>& nums2, int j){
        while(i < nums1.size() && j < nums2.size()){
            if(nums1[i] > nums2[j]) return 1;
            if(nums1[i] < nums2[j]) return -1;
            i++;
            j++;
        }
        return (nums1.size() - i) - (nums2.size() - j);
    }
    
    // 函数用于合并两个子序列，生成最大的数字
    vector<int> merge(const vector<int>& subseq1, const vector<int>& subseq2){
        int i = 0, j = 0;
        vector<int> merged;
        while(i < subseq1.size() && j < subseq2.size()){
            if(compare(subseq1, i, subseq2, j) > 0){
                merged.push_back(subseq1[i++]);
            }
            else{
                merged.push_back(subseq2[j++]);
            }
        }
        while(i < subseq1.size()){
            merged.push_back(subseq1[i++]);
        }
        while(j < subseq2.size()){
            merged.push_back(subseq2[j++]);
        }
        return merged;
    }
    
    // 主函数：创建最大数字
    vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
        int m = nums1.size();
        int n = nums2.size();
        int start = max(0, k - n);
        int end = min(k, m);
        vector<int> best;
        
        for(int i = start; i <= end; i++){
            vector<int> subseq1 = maxSubsequence(nums1, i);
            vector<int> subseq2 = maxSubsequence(nums2, k - i);
            vector<int> candidate = merge(subseq1, subseq2);
            if(compare(candidate, 0, best, 0) > 0){
                best = candidate;
            }
        }
        return best;
    }
};

// 辅助函数用于打印数组
void printArray(const vector<int>& arr){
    cout << "[";
    for(int i = 0; i < arr.size(); i++){
        cout << arr[i];
        if(i != arr.size()-1) cout << ", ";
    }
    cout << "]\n";
}

// 测试主函数
int main(){
    Solution sol;
    
    // 示例 1
    vector<int> nums1_1 = {3, 4, 6, 5};
    vector<int> nums2_1 = {9, 1, 2, 5, 8, 3};
    int k1 = 5;
    vector<int> res1 = sol.maxNumber(nums1_1, nums2_1, k1);
    cout << "示例1输出: ";
    printArray(res1);
    
    // 示例 2
    vector<int> nums1_2 = {6, 7};
    vector<int> nums2_2 = {6, 0, 4};
    int k2 = 5;
    vector<int> res2 = sol.maxNumber(nums1_2, nums2_2, k2);
    cout << "示例2输出: ";
    printArray(res2);
    
    // 示例 3
    vector<int> nums1_3 = {3, 9};
    vector<int> nums2_3 = {8, 9};
    int k3 = 3;
    vector<int> res3 = sol.maxNumber(nums1_3, nums2_3, k3);
    cout << "示例3输出: ";
    printArray(res3);
    
    return 0;
}
```

**代码说明：**

1. **选择最大子序列 (`maxSubsequence` 函数)：**
   - 使用一个栈（`vector<int> stack`）来存储当前选择的子序列。
   - 通过比较当前数字与栈顶数字的大小，决定是否弹出栈顶数字，以确保子序列的最大化。

2. **比较两个子序列 (`compare` 函数)：**
   - 从给定的索引开始，逐个字符比较两个子序列，决定哪个子序列更大。
   - 若两个子序列相同部分较长，剩余部分较长的子序列更大。

3. **合并两个子序列 (`merge` 函数)：**
   - 根据 `compare` 函数的结果，依次选择更大的字符加入到合并后的结果中。

4. **主函数 (`maxNumber` 函数)：**
   - 遍历所有可能的选择方案（即从 `nums1` 中选取不同数量的子序列）。
   - 对于每一种选择方案，分别从 `nums1` 和 `nums2` 中选取最大子序列，合并后比较并记录字典序最大的结果。

5. **辅助函数：**
   - `printArray` 函数用于打印结果数组，方便验证。

6. **测试主函数：**
   - 包含三个示例，分别对应题目中的示例1、示例2和示例3。
   - 调用 `maxNumber` 函数并打印结果。

**编译和运行：**

使用以下命令编译并运行代码：

```bash
g++ -o solution solution.cpp
./solution
```

**预期输出：**

```
示例1输出: [9, 8, 6, 5, 3]
示例2输出: [6, 7, 6, 0, 4]
示例3输出: [9, 8, 9]
```

---

### 总结

通过上述C和C++的实现，我们成功地在两种不同的编程语言中解决了“创建最大数字”问题。在C语言中，通过手动管理数组和实现必要的函数，模拟了栈的行为和子序列的选择过程。而在C++中，利用STL容器（如`vector`）和算法（如`sort`和`unique`），简化了实现过程，提高了代码的可读性和效率。

**关键点回顾：**

- **分离选择问题**：将问题分解为从两个数组中分别选择子序列并合并的过程。
- **选择最大子序列**：使用单调栈的方法，在保持相对顺序的前提下，选择出最大的子序列。
- **合并子序列**：通过比较两个子序列的剩余部分，确保合并后的结果最大。
- **遍历所有可能的选择方案**：确保找到全局最优解，即字典序最大的数字。
- **内存管理（C语言）**：在C语言中，手动分配和释放内存，确保没有内存泄漏。
- **利用STL（C++）**：在C++中，利用`vector`和其他STL容器简化数据结构的管理，提高代码可读性和开发效率。

通过这些方法，可以高效地解决大规模数据下的最大数字构建问题，满足题目的时间和空间复杂度要求。在实际应用中，这种技术可以用于各种需要优化组合和序列选择的场景，如图像处理、信号处理等。