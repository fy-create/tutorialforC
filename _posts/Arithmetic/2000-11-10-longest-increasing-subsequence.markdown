---
layout: post
title:  "300. 最长递增子序列"
categories: arithmetic
---

[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence)

### 题目：**Longest Increasing Subsequence**

#### 题目描述：

给定一个无序的整数数组，找出最长递增子序列的长度。

**示例 1:**
```plaintext
输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长递增子序列是 [2,3,7,101]，因此长度为 4。
```

**示例 2:**
```plaintext
输入: [0,1,0,3,2,3]
输出: 4
解释: 最长递增子序列是 [0,1,2,3]，因此长度为 4。
```

**示例 3:**
```plaintext
输入: [7,7,7,7,7,7,7]
输出: 1
解释: 最长递增子序列是 [7]，因此长度为 1。
```

#### 提示：
- `1 <= nums.length <= 2500`
- `-10^4 <= nums[i] <= 10^4`

---

### 解题思路：

#### 1. **分析问题**：
   - 本题的核心问题是求数组中的 **最长递增子序列**（LIS）。这意味着我们需要找到数组中一个严格递增的子序列，并返回该子序列的长度。
   - **子序列** 不是必须是连续的，但要求是递增的。
   - 经典方法是 **动态规划**，但是可以通过 **二分查找** 优化解法，从而达到更高的效率。

#### 2. **方法一：动态规划**：
   - 采用动态规划的方法，我们定义 `dp[i]` 表示以 `nums[i]` 结尾的最长递增子序列的长度。
   - 初始化时，每个位置的 `dp[i]` 为 1，因为每个元素本身都可以成为一个递增子序列。
   - 对于每个元素 `nums[i]`，我们检查它前面的每个元素 `nums[j]`（`j < i`），如果 `nums[i] > nums[j]`，则 `dp[i] = max(dp[i], dp[j] + 1)`。
   - 最终的结果是 `dp` 数组中的最大值。

#### 3. **方法二：二分查找优化（更高效）**：
   - 使用一个辅助数组 `tails`，这个数组的长度始终表示当前递增子序列的长度。
   - 对于每个元素 `num`，使用二分查找找出 `tails` 中第一个大于等于 `num` 的位置，如果找到了，则更新这个位置为 `num`。否则，将 `num` 添加到 `tails` 的末尾。
   - 这样可以在 O(N log N) 的时间复杂度内找到最长递增子序列。

---

### C语言解答：

#### 方法一：动态规划

```c
#include <stdio.h>
#include <stdlib.h>

int lengthOfLIS(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    
    int* dp = (int*)malloc(numsSize * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        dp[i] = 1;  // 每个位置的递增子序列至少为 1
    }
    
    int max_len = 1;
    
    // 动态规划更新 dp 数组
    for (int i = 1; i < numsSize; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = dp[i] > dp[j] + 1 ? dp[i] : dp[j] + 1;
            }
        }
        max_len = max_len > dp[i] ? max_len : dp[i];
    }
    
    free(dp);
    return max_len;
}

int main() {
    int nums[] = {10,9,2,5,3,7,101,18};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    printf("Longest Increasing Subsequence Length: %d\n", lengthOfLIS(nums, numsSize));
    return 0;
}
```

#### 方法二：二分查找优化

```
#include <stdio.h>
#include <stdlib.h>

int binarySearch(int* tails, int size, int target) {
    int left = 0, right = size;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (tails[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

int lengthOfLIS(int* nums, int numsSize) {
    if (numsSize == 0) return 0;

    int* tails = (int*)malloc(numsSize * sizeof(int));
    int size = 0;  // tails 数组的大小表示递增子序列的长度
    
    for (int i = 0; i < numsSize; i++) {
        int pos = binarySearch(tails, size, nums[i]);
        tails[pos] = nums[i];
        if (pos == size) size++;
    }
    
    free(tails);
    return size;
}

int main() {
    int nums[] = {10,9,2,5,3,7,101,18};
    int numsSize = sizeof(nums) / sizeof(nums[0]);
    printf("Longest Increasing Subsequence Length: %d\n", lengthOfLIS(nums, numsSize));
    return 0;
}
```

---

### C++ 解答：

#### 方法一：动态规划

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        if (nums.empty()) return 0;
        
        vector<int> dp(nums.size(), 1);  // dp[i] 存储以 nums[i] 为结尾的LIS长度
        int max_len = 1;
        
        for (int i = 1; i < nums.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = max(dp[i], dp[j] + 1);
                }
            }
            max_len = max(max_len, dp[i]);
        }
        
        return max_len;
    }
};

int main() {
    Solution solution;
    vector<int> nums = {10,9,2,5,3,7,101,18};
    cout << "Longest Increasing Subsequence Length: " << solution.lengthOfLIS(nums) << endl;
    return 0;
}
```

#### 方法二：二分查找优化

```
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int binarySearch(const vector<int>& tails, int target) {
        int left = 0, right = tails.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
    
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;  // tails 数组用来存储当前递增子序列的最后一个元素
        
        for (int num : nums) {
            int pos = binarySearch(tails, num);
            if (pos == tails.size()) {
                tails.push_back(num);
            } else {
                tails[pos] = num;
            }
        }
        
        return tails.size();
    }
};

int main() {
    Solution solution;
    vector<int> nums = {10,9,2,5,3,7,101,18};
    cout << "Longest Increasing Subsequence Length: " << solution.lengthOfLIS(nums) << endl;
    return 0;
}
```

---

### 时间复杂度：

- **方法一（动态规划）**：
  - 时间复杂度：O(N^2)，其中 N 是数组的长度。我们有两个嵌套的循环。
  - 空间复杂度：O(N)，需要一个数组 `dp` 存储每个位置的结果。

- **方法二（二分查找优化）**：
  - 时间复杂度：O(N log N)，其中 N 是数组的长度。我们使用了二分查找来优化时间复杂度。
  - 空间复杂度：O(N)，需要一个数组 `tails` 来存储当前递增子序列的尾元素。

---

### 总结：

- 动态规划解法较为直观，但是时间复杂度较高（O(N^2)）。
- 二分查找优化解法可以将时间复杂度降低为 O(N log N)，适用于大规模数据。