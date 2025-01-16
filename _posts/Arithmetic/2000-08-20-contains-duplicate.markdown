---
layout: post
title:  "217. 存在重复元素"
categories: arithmetic
---

[217. 存在重复元素](https://leetcode.cn/problems/contains-duplicate)

### 题目描述

给定一个整数数组 `nums`，如果数组中至少有一个值出现至少两次，返回 `true`；如果数组中每个元素都不相同，返回 `false`。

**示例 1：**

```
输入：nums = [1,2,3,1]
输出：true
```

**示例 2：**

```
输入：nums = [1,2,3,4]
输出：false
```

**示例 3：**

```
输入：nums = [1,1,1,3,3,4,3,2,4,2]
输出：true
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

### 解题思路

这个问题可以通过以下几种方法解决：

1. **暴力法**：
   - 使用双重循环检查每个元素是否在数组中出现过两次。
   - 时间复杂度：O(n^2)，空间复杂度：O(1)。

2. **排序法**：
   - 先对数组进行排序，然后检查相邻元素是否相等。
   - 时间复杂度：O(n log n)，空间复杂度：O(1)（如果使用原地排序）。

3. **哈希表法**：
   - 使用哈希表记录每个元素是否已经出现过。
   - 时间复杂度：O(n)，空间复杂度：O(n)。

由于题目中的数组长度可能达到 10^5，暴力法的时间复杂度太高，不适合使用。排序法和哈希表法是更优的选择。

---

### C语言解答

#### 排序法

```c
#include <stdbool.h>
#include <stdlib.h>

// 比较函数，用于排序
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

bool containsDuplicate(int* nums, int numsSize) {
    // 先对数组进行排序
    qsort(nums, numsSize, sizeof(int), compare);

    // 检查相邻元素是否相等
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] == nums[i - 1]) {
            return true;
        }
    }

    return false;
}

// 简单main函数调用
int main() {
    int nums1[] = {1, 2, 3, 1};
    int nums2[] = {1, 2, 3, 4};
    int nums3[] = {1, 1, 1, 3, 3, 4, 3, 2, 4, 2};

    printf("%d\n", containsDuplicate(nums1, 4)); // 输出 1 (true)
    printf("%d\n", containsDuplicate(nums2, 4)); // 输出 0 (false)
    printf("%d\n", containsDuplicate(nums3, 10)); // 输出 1 (true)

    return 0;
}
```

#### 哈希表法

C语言没有内置的哈希表数据结构，因此需要自己实现一个简单的哈希表，或者使用第三方库（如 `uthash`）。这里我们使用排序法作为示例。

---

### C++ 解答

#### 排序法

```cpp
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // 先对数组进行排序
        sort(nums.begin(), nums.end());

        // 检查相邻元素是否相等
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] == nums[i - 1]) {
                return true;
            }
        }

        return false;
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    vector<int> nums1 = {1, 2, 3, 1};
    vector<int> nums2 = {1, 2, 3, 4};
    vector<int> nums3 = {1, 1, 1, 3, 3, 4, 3, 2, 4, 2};

    cout << solution.containsDuplicate(nums1) << endl; // 输出 1 (true)
    cout << solution.containsDuplicate(nums2) << endl; // 输出 0 (false)
    cout << solution.containsDuplicate(nums3) << endl; // 输出 1 (true)

    return 0;
}
```

#### 哈希表法

```cpp
#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        // 使用哈希表记录已经出现过的元素
        unordered_set<int> seen;

        for (int num : nums) {
            if (seen.count(num)) {
                return true;
            }
            seen.insert(num);
        }

        return false;
    }
};

// 简单main函数调用
int main() {
    Solution solution;
    vector<int> nums1 = {1, 2, 3, 1};
    vector<int> nums2 = {1, 2, 3, 4};
    vector<int> nums3 = {1, 1, 1, 3, 3, 4, 3, 2, 4, 2};

    cout << solution.containsDuplicate(nums1) << endl; // 输出 1 (true)
    cout << solution.containsDuplicate(nums2) << endl; // 输出 0 (false)
    cout << solution.containsDuplicate(nums3) << endl; // 输出 1 (true)

    return 0;
}
```

---

### 代码解释

#### C语言（排序法）
1. **排序**：
   - 使用 `qsort` 对数组进行排序。
2. **检查重复**：
   - 遍历排序后的数组，检查相邻元素是否相等。

#### C++（排序法）
1. **排序**：
   - 使用 `sort` 对数组进行排序。
2. **检查重复**：
   - 遍历排序后的数组，检查相邻元素是否相等。

#### C++（哈希表法）
1. **哈希表**：
   - 使用 `unordered_set` 记录已经出现过的元素。
2. **检查重复**：
   - 遍历数组，如果元素已经在哈希表中，则返回 `true`；否则将其加入哈希表。

---

### 测试用例验证

#### 输入
```cpp
nums = [1, 2, 3, 1]
```

#### 输出
```plaintext
true
```

#### 解释
- 元素 `1` 出现了两次，因此返回 `true`。

#### 输入
```cpp
nums = [1, 2, 3, 4]
```

#### 输出
```plaintext
false
```

#### 解释
- 所有元素都不相同，因此返回 `false`。

#### 输入
```cpp
nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]
```

#### 输出
```plaintext
true
```

#### 解释
- 多个元素重复出现，因此返回 `true`。

---

### 总结

- **排序法**：时间复杂度为 O(n log n)，空间复杂度为 O(1)。适合对空间有限制的场景。
- **哈希表法**：时间复杂度为 O(n)，空间复杂度为 O(n)。适合对时间有限制的场景。

根据具体需求选择合适的方法即可。