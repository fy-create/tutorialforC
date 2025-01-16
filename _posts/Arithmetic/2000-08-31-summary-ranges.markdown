---
layout: post
title:  "228. 汇总区间"
categories: arithmetic
---

[228. 汇总区间](https://leetcode.cn/problems/summary-ranges/)


### 题目描述：
给定一个无重复元素的 **升序** 整数数组 `nums` ，返回所有区间范围的字符串表示。

### 示例：
```
输入：nums = [0,1,2,4,5,7]
输出：["0->2","4->5","7"]

输入：nums = [0,2,3,4,6,8,9]
输出：["0","2->4","6","8->9"]

输入：nums = []
输出：[]

输入：nums = [-1]
输出：["-1"]

输入：nums = [0]
输出：["0"]
```

### 提示：
- `0 <= nums.length <= 20`
- `-231 <= nums[i] <= 231 - 1`
- `nums` 中的元素是 **按升序排列** 的

### 解题思路：
本题的目标是把给定的升序整数数组`nums`中的连续区间合并，并返回这些区间的字符串表示。可以通过如下方式进行解题：

1. **遍历数组**：逐一遍历数组中的元素，识别连续区间。
2. **区间合并**：
   - 如果当前数字与前一个数字是连续的（即`nums[i] == nums[i-1] + 1`），则继续合并当前区间。
   - 如果当前数字与前一个数字不连续，则将前一个区间添加到结果中，并开始一个新的区间。
3. **区间表示**：
   - 对于一个连续区间，使用 `"start->end"` 形式表示。
   - 如果区间只有一个数字，则只表示该数字。

### 算法步骤：
1. 初始化一个空的`result`数组用于存储结果。
2. 遍历`nums`数组，开始时设定一个起始数字`start`。
3. 对于每个数字，判断是否与上一个数字连续：
   - 如果是，继续往后检查。
   - 如果不是，结束当前区间，并将该区间的字符串形式添加到结果中。
4. 在循环结束后，添加最后的区间。
5. 返回最终的结果。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char** summaryRanges(int* nums, int numsSize, int* returnSize) {
    if (numsSize == 0) {
        *returnSize = 0;
        return NULL;
    }

    // 为结果分配空间
    char** result = (char**)malloc(sizeof(char*) * numsSize);
    int resultIndex = 0;

    int start = nums[0];  // 当前区间的起始值

    // 遍历数组
    for (int i = 1; i < numsSize; i++) {
        // 判断当前数字是否与前一个数字连续
        if (nums[i] != nums[i - 1] + 1) {
            // 如果不连续，添加当前区间到结果
            if (start == nums[i - 1]) {
                result[resultIndex] = (char*)malloc(20 * sizeof(char));  // 分配空间
                sprintf(result[resultIndex], "%d", start);  // 只有一个数字的区间
            } else {
                result[resultIndex] = (char*)malloc(20 * sizeof(char));  // 分配空间
                sprintf(result[resultIndex], "%d->%d", start, nums[i - 1]);  // 连续区间
            }
            resultIndex++;
            start = nums[i];  // 更新起始数字
        }
    }

    // 处理最后一个区间
    if (start == nums[numsSize - 1]) {
        result[resultIndex] = (char*)malloc(20 * sizeof(char));
        sprintf(result[resultIndex], "%d", start);
    } else {
        result[resultIndex] = (char*)malloc(20 * sizeof(char));
        sprintf(result[resultIndex], "%d->%d", start, nums[numsSize - 1]);
    }
    resultIndex++;

    *returnSize = resultIndex;  // 更新结果数组的大小
    return result;
}

int main() {
    int nums[] = {0, 1, 2, 4, 5, 7};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int returnSize;
    char** result = summaryRanges(nums, numsSize, &returnSize);

    // 打印结果
    for (int i = 0; i < returnSize; i++) {
        printf("%s ", result[i]);
        free(result[i]);  // 释放每个区间的内存
    }
    free(result);  // 释放结果数组的内存
    printf("\n");
    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> result;
        if (nums.empty()) return result;

        int start = nums[0];  // 当前区间的起始值

        for (int i = 1; i < nums.size(); i++) {
            // 判断当前数字是否与前一个数字连续
            if (nums[i] != nums[i - 1] + 1) {
                // 如果不连续，添加当前区间到结果
                if (start == nums[i - 1]) {
                    result.push_back(to_string(start));  // 只有一个数字的区间
                } else {
                    result.push_back(to_string(start) + "->" + to_string(nums[i - 1]));  // 连续区间
                }
                start = nums[i];  // 更新起始数字
            }
        }

        // 处理最后一个区间
        if (start == nums.back()) {
            result.push_back(to_string(start));  // 只有一个数字的区间
        } else {
            result.push_back(to_string(start) + "->" + to_string(nums.back()));  // 连续区间
        }

        return result;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {0, 1, 2, 4, 5, 7};
    vector<string> result = solution.summaryRanges(nums);

    // 打印结果
    for (const string& range : result) {
        cout << range << " ";
    }
    cout << endl;

    return 0;
}
```

### 总结：
- **C语言解法**：使用手动管理内存的方式，通过`malloc`分配内存存储结果，利用`sprintf`来格式化区间字符串。
- **C++解法**：利用`vector<string>`来动态存储结果，使用`to_string`将数字转换为字符串，并简化了内存管理，代码更加简洁易懂。
- 这两种解法都使用了线性扫描数组的方法，时间复杂度为`O(n)`，其中`n`是数组`nums`的长度。