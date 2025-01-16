---
layout: post
title:  "238. 除自身以外数组的乘积"
categories: arithmetic
---

[238. 除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self)

**题目描述：**

给定一个整数数组 `nums`，请你返回一个数组 `answer`，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 之外其余各元素的乘积。

**示例：**

```
输入: nums = [1,2,3,4]
输出: [24,12,8,6]
```

**提示：**

- `2 <= nums.length <= 10^5`
- `-30 <= nums[i] <= 30`
- 保证数组 `nums` 的任意前缀或后缀的乘积都在 32 位整数范围内

**进阶：**

- 你可以在 O(n) 时间复杂度内完成该题吗？
- 你可以不使用除法，且在常数空间复杂度内完成这个题目吗？（注意：输出数组不被视为额外空间）

**解题思路：**

为了在不使用除法且满足 O(n) 时间复杂度和常数空间复杂度的情况下解决问题，我们可以采用前缀积和后缀积的方法。具体步骤如下：

1. **初始化结果数组**：创建一个长度与 `nums` 相同的数组 `answer`，并将其元素初始化为 1。

2. **计算前缀积**：遍历数组，对于每个位置 `i`，将 `answer[i]` 设为索引 `i` 之前所有元素的乘积。

3. **计算后缀积并更新结果**：再次遍历数组，这次从末尾开始。使用一个变量 `suffix` 来记录从当前位置开始到末尾的后缀积。对于每个位置 `i`，将 `answer[i]` 乘以当前的 `suffix`，然后更新 `suffix` 为包含当前元素的乘积。

通过上述步骤，`answer[i]` 将包含数组中除 `nums[i]` 之外的所有元素的乘积。

**C 语言实现：**

```c
#include <stdio.h>
#include <stdlib.h>

// 函数声明
int* productExceptSelf(int* nums, int numsSize, int* returnSize);

int main() {
    int nums[] = {1, 2, 3, 4};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    int returnSize;
    int* result = productExceptSelf(nums, numsSize, &returnSize);

    printf("结果数组: ");
    for (int i = 0; i < returnSize; i++) {
        printf("%d ", result[i]);
    }
    printf("\n");

    // 释放动态分配的内存
    free(result);
    return 0;
}

int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    // 分配结果数组的内存
    int* answer = (int*)malloc(numsSize * sizeof(int));
    if (answer == NULL) {
        // 内存分配失败
        *returnSize = 0;
        return NULL;
    }

    // 初始化返回数组大小
    *returnSize = numsSize;

    // 初始化前缀积
    int prefix = 1;
    for (int i = 0; i < numsSize; i++) {
        answer[i] = prefix;
        prefix *= nums[i];
    }

    // 初始化后缀积
    int suffix = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        answer[i] *= suffix;
        suffix *= nums[i];
    }

    return answer;
}
```

**C++ 语言实现：**

```cpp
#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(const vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n, 1);

        // 计算前缀积并存储在 answer 中
        int prefix = 1;
        for (int i = 0; i < n; ++i) {
            answer[i] = prefix;
            prefix *= nums[i];
        }

        // 计算后缀积并更新 answer
        int suffix = 1;
        for (int i = n - 1; i >= 0; --i) {
            answer[i] *= suffix;
            suffix *= nums[i];
        }

        return answer;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {1, 2, 3, 4};
    vector<int> result = solution.productExceptSelf(nums);

    cout << "结果数组: ";
    for (int val : result) {
        cout << val << " ";
    }
    cout << endl;

    return 0;
}
```

上述实现中，C 语言版本使用了动态内存分配来创建结果数组，并在主函数中调用 `productExceptSelf` 函数，最后打印结果并释放内存。C++ 版本则利用了 `vector` 容器来管理数组，并在 `Solution` 类中实现了 `productExceptSelf` 方法，主函数中创建 `Solution` 对象并调用该方法，最后输出结果。

通过这种方法，我们成功地在 O(n) 时间复杂度和 O(1) 额外空间复杂度（不计输出数组）内计算出了所需的结果。 