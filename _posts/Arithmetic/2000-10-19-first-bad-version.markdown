---
layout: post
title:  "278. 第一个错误的版本"
categories: arithmetic
---

[278. 第一个错误的版本](https://leetcode.cn/problems/first-bad-version)

### 题目：**First Bad Version**

#### 题目描述：

你是产品经理，目前正在负责一个产品的开发工作。产品的每个版本都有一个版本号，并且产品会在每个版本中推出新功能。

假设你有一个 API `isBadVersion(version)`，它会告诉你某个版本是否是坏的。你可以假设所有的版本都是好的，直到发现第一个坏的版本为止。

给定一个整数 `n`，代表版本的数量，返回第一个坏版本的编号。

#### 示例 1：

**输入：**
```plaintext
n = 5, bad = 4
```

**输出：**
```plaintext
4
```

**解释：**
调用 `isBadVersion(3)` -> `false`  
调用 `isBadVersion(5)` -> `true`  
调用 `isBadVersion(4)` -> `true`  
因此，第四个版本是第一个坏的版本。

#### 示例 2：

**输入：**
```plaintext
n = 1, bad = 1
```

**输出：**
```plaintext
1
```

#### 提示：
- `1 <= bad <= n <= 2^31 - 1`
- 你可以调用 API `isBadVersion` 进行多次调用。

---

### 解题思路：

这道题可以使用 **二分查找** 来解决。二分查找适合解决有序数组中寻找目标的问题，而此问题的关键在于找到第一个坏版本。

#### 思路：
1. **问题的本质**：寻找第一个坏版本，假设从版本 `1` 到 `n`，我们知道一旦发现某个版本是坏的，那么之后的所有版本都是坏的。因此我们可以使用二分查找来高效缩小范围。
2. **二分查找的操作步骤**：
   - 设置两个指针，`left = 1` 和 `right = n`。
   - 找到中间的版本 `mid = (left + right) / 2`。
   - 如果 `mid` 版本是坏的版本，那么所有从 `mid` 到 `right` 的版本都是坏的，因此可以缩小搜索区间为 `[left, mid]`。
   - 如果 `mid` 版本不是坏的版本，则说明坏版本在 `mid + 1` 到 `right` 之间，因此可以缩小搜索区间为 `[mid + 1, right]`。
3. **结束条件**：当 `left` 和 `right` 指针重合时，指针指向的版本就是第一个坏的版本。

#### 时间复杂度：
- **时间复杂度**：`O(log n)`。每次通过二分查找将搜索区间缩小一半，因此时间复杂度为 `O(log n)`。
- **空间复杂度**：`O(1)`。仅使用常数空间。

### C语言解答：

```c
#include <stdio.h>

// 假设这是提供的API，实际实现应该由系统给出
bool isBadVersion(int version);

int firstBadVersion(int n) {
    int left = 1, right = n;
    
    while (left < right) {
        int mid = left + (right - left) / 2;  // 防止溢出
        if (isBadVersion(mid)) {
            right = mid;  // 中间版本是坏的，缩小右边的区间
        } else {
            left = mid + 1;  // 中间版本不是坏的，缩小左边的区间
        }
    }
    
    return left;  // left 和 right 会指向第一个坏的版本
}

int main() {
    int n = 5;
    // 假设isBadVersion函数已经定义
    int result = firstBadVersion(n);
    printf("The first bad version is: %d\n", result);  // 输出第一个坏版本
    return 0;
}
```

### C++ 解答：

```cpp
#include <iostream>
using namespace std;

// 假设这是提供的API，实际实现应该由系统给出
bool isBadVersion(int version);

class Solution {
public:
    int firstBadVersion(int n) {
        int left = 1, right = n;
        
        while (left < right) {
            int mid = left + (right - left) / 2;  // 防止溢出
            if (isBadVersion(mid)) {
                right = mid;  // 中间版本是坏的，缩小右边的区间
            } else {
                left = mid + 1;  // 中间版本不是坏的，缩小左边的区间
            }
        }
        
        return left;  // left 和 right 会指向第一个坏的版本
    }
};

int main() {
    Solution solution;
    int n = 5;
    // 假设isBadVersion函数已经定义
    int result = solution.firstBadVersion(n);
    cout << "The first bad version is: " << result << endl;  // 输出第一个坏版本
    return 0;
}
```

### 代码解释：

#### C语言解答：
- **isBadVersion函数**：这个函数是由系统提供的接口，返回一个布尔值，表示某个版本是否是坏的。这里我们假设它已经实现。
- **firstBadVersion函数**：通过二分查找来寻找第一个坏版本，`left` 和 `right` 指针不断调整，最终返回第一个坏版本。

#### C++ 解答：
- **isBadVersion函数**：和 C 语言一样，假设它是由系统提供的。
- **Solution类**：在 C++ 中，我们将解题代码封装在一个类中。类中的 `firstBadVersion` 方法实现了二分查找的逻辑。
- **main函数**：创建 `Solution` 对象，调用 `firstBadVersion` 方法来获取第一个坏版本。

### 总结：
- **二分查找** 是本题的关键，通过不断缩小查找区间，最终能够高效找到第一个坏版本。
- **时间复杂度** 为 `O(log n)`，大大优化了线性遍历的时间消耗。