---
layout: post
title:  "315. 计算右侧小于当前元素的个数"
categories: arithmetic
---

[315. 计算右侧小于当前元素的个数](https://leetcode.cn/problems/count-of-smaller-numbers-after-self)

### 题目描述

给定一个整数数组 `nums`，按要求返回一个新的数组 `counts`。`counts` 的属性是 `counts[i]` 表示 `nums[i]` 右侧小于 `nums[i]` 的元素的数量。

**示例 1：**

```
输入：nums = [5,2,6,1]
输出：[2,1,1,0]
解释：
5 右侧有 2 个更小的元素 (2 和 1)
2 右侧仅有 1 个更小的元素 (1)
6 右侧有 1 个更小的元素 (1)
1 右侧有 0 个更小的元素
```

**示例 2：**

```
输入：nums = [-1]
输出：[0]
```

**示例 3：**

```
输入：nums = [-1, -1]
输出：[0,0]
```

**提示：**

- `1 <= nums.length <= 10^5`
- `-10^4 <= nums[i] <= 10^4`

---

### 解题思路

这道题要求我们为数组中的每个元素找到其右侧小于它的元素数量。由于数组的长度可以达到 `10^5`，我们需要一个高效的算法来处理。

**关键点：**

1. **分治与归并排序**：
   - 在归并排序的过程中，可以计算出每个元素右侧小于它的元素数量。
   - 通过在合并过程中统计右侧元素的数量，可以在 `O(n log n)` 的时间复杂度内完成。

2. **二分查找树（BST）**：
   - 从数组的末尾开始，逐步将元素插入到 BST 中，同时计算插入的位置，从而得出右侧小于当前元素的数量。
   - 这种方法的平均时间复杂度为 `O(n log n)`，但最坏情况下可能退化为 `O(n^2)`。

3. **树状数组（Fenwick Tree）或线段树**：
   - 由于数组中的元素范围有限（`-10^4 <= nums[i] <= 10^4`），我们可以通过离散化处理将元素映射到一个固定的范围内。
   - 使用树状数组来高效地进行区间求和和单点更新操作，可以在 `O(n log n)` 的时间复杂度内完成。

**选择方法：**

由于树状数组方法在最坏情况下也能保持 `O(n log n)` 的时间复杂度，而且实现相对简单，因此我们选择使用树状数组来解决这道题。

**具体步骤：**

1. **离散化处理**：
   - 由于树状数组需要一个固定的索引范围，我们首先对数组中的元素进行排序并去重，给每个唯一元素分配一个唯一的索引。

2. **初始化树状数组**：
   - 创建一个大小为离散化后元素数量加一的树状数组，用于存储每个索引处的元素出现次数。

3. **从右向左遍历数组**：
   - 对于每个元素，使用树状数组查询比当前元素小的元素数量，并将当前元素的索引在树状数组中更新。
   - 将查询结果存入 `counts` 数组中。

4. **返回结果**：
   - 最终，`counts` 数组即为每个元素右侧小于它的元素数量。

通过这种方法，我们可以高效地计算出每个元素右侧小于它的元素数量，满足题目的时间和空间要求。

---

### C语言解答

在C语言中，我们需要实现树状数组（Fenwick Tree）来高效地进行区间求和和单点更新操作。由于C语言不支持动态数组的灵活操作，我们需要手动管理内存。

```c
#include <stdio.h>
#include <stdlib.h>

// 定义树状数组结构体
typedef struct {
    int size;
    int* tree;
} FenwickTree;

// 创建树状数组
FenwickTree* createFenwickTree(int size) {
    FenwickTree* ft = (FenwickTree*)malloc(sizeof(FenwickTree));
    ft->size = size;
    ft->tree = (int*)calloc(size + 1, sizeof(int));
    return ft;
}

// 更新树状数组，增加index处的值
void updateFenwickTree(FenwickTree* ft, int index) {
    while(index <= ft->size){
        ft->tree[index] += 1;
        index += index & (-index);
    }
}

// 查询树状数组，获取1到index的累积和
int queryFenwickTree(FenwickTree* ft, int index) {
    int sum = 0;
    while(index > 0){
        sum += ft->tree[index];
        index -= index & (-index);
    }
    return sum;
}

// 比较函数，用于qsort
int cmp(const void* a, const void* b){
    int num1 = *(int*)a;
    int num2 = *(int*)b;
    if(num1 < num2) return -1;
    else if(num1 > num2) return 1;
    else return 0;
}

// 主函数：计算每个元素右侧小于它的元素数量
int* countSmaller(int* nums, int numsSize, int* returnSize){
    // 离散化处理
    int* sorted = (int*)malloc(numsSize * sizeof(int));
    for(int i = 0; i < numsSize; i++) sorted[i] = nums[i];
    qsort(sorted, numsSize, sizeof(int), cmp);
    
    // 去重
    int uniqueSize = 1;
    for(int i = 1; i < numsSize; i++){
        if(sorted[i] != sorted[i-1]){
            sorted[uniqueSize++] = sorted[i];
        }
    }
    
    // 初始化树状数组
    FenwickTree* ft = createFenwickTree(uniqueSize);
    
    // 结果数组
    int* counts = (int*)malloc(numsSize * sizeof(int));
    
    // 从右向左遍历
    for(int i = numsSize -1; i >=0; i--){
        // 二分查找当前元素在排序数组中的位置
        int left = 0, right = uniqueSize -1, pos = 0;
        while(left <= right){
            int mid = left + (right - left)/2;
            if(sorted[mid] < nums[i]){
                pos = mid +1;
                left = mid +1;
            }
            else{
                right = mid -1;
            }
        }
        // 查询小于当前元素的数量
        counts[i] = queryFenwickTree(ft, pos);
        // 更新当前元素在树状数组中的位置
        // 离散化索引从1开始
        // 找到当前元素在sorted中的第一个出现位置
        int index = 0;
        left = 0; right = uniqueSize -1;
        while(left <= right){
            int mid = left + (right - left)/2;
            if(sorted[mid] == nums[i]){
                index = mid +1;
                break;
            }
            else if(sorted[mid] < nums[i]){
                left = mid +1;
            }
            else{
                right = mid -1;
            }
        }
        updateFenwickTree(ft, index);
    }
    
    // 释放内存
    free(sorted);
    free(ft->tree);
    free(ft);
    
    *returnSize = numsSize;
    return counts;
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
    int nums1[] = {5,2,6,1};
    int size1 = sizeof(nums1)/sizeof(nums1[0]);
    int returnSize1;
    int* res1 = countSmaller(nums1, size1, &returnSize1);
    printf("示例1输出: ");
    printArray(res1, returnSize1);
    free(res1);
    
    // 示例 2
    int nums2[] = {-1};
    int size2 = sizeof(nums2)/sizeof(nums2[0]);
    int returnSize2;
    int* res2 = countSmaller(nums2, size2, &returnSize2);
    printf("示例2输出: ");
    printArray(res2, returnSize2);
    free(res2);
    
    // 示例 3
    int nums3[] = {-1,-1};
    int size3 = sizeof(nums3)/sizeof(nums3[0]);
    int returnSize3;
    int* res3 = countSmaller(nums3, size3, &returnSize3);
    printf("示例3输出: ");
    printArray(res3, returnSize3);
    free(res3);
    
    return 0;
}
```

**代码说明：**

1. **树状数组（Fenwick Tree）实现**：
   - **创建树状数组**：`createFenwickTree` 函数分配内存并初始化树状数组。
   - **更新操作**：`updateFenwickTree` 函数用于在树状数组中增加指定索引的值。
   - **查询操作**：`queryFenwickTree` 函数用于查询从1到指定索引的累积和。

2. **离散化处理**：
   - 由于元素的值范围较大（`-10^4 <= nums[i] <= 10^4`），我们首先对数组进行排序并去重，将每个唯一元素映射到一个唯一的索引上。
   - 使用 `qsort` 函数对数组进行排序，然后去重处理。

3. **主算法**：
   - 从数组的末尾开始遍历，对于每个元素，使用二分查找确定其在排序数组中的位置，然后使用树状数组查询比当前元素小的元素数量。
   - 更新树状数组中当前元素的位置，以便后续查询。

4. **辅助函数**：
   - `printArray` 函数用于打印结果数组，方便验证。

5. **测试主函数**：
   - 包含三个示例，分别对应题目中的示例1、示例2和示例3。
   - 对每个示例，调用 `countSmaller` 函数并打印结果。

**编译和运行：**

使用以下命令编译和运行代码：

```bash
gcc -o solution solution.c
./solution
```

**预期输出：**

```
示例1输出: [2, 1, 1, 0]
示例2输出: [0]
示例3输出: [0, 0]
```

---

### C++ 解答

在C++中，我们可以利用STL容器（如`vector`）和算法（如`sort`和`unique`）来简化代码实现。我们将使用树状数组（Fenwick Tree）来高效地计算每个元素右侧小于它的元素数量。

```cpp
#include <bits/stdc++.h>
using namespace std;

// 定义Fenwick Tree类
class FenwickTree {
public:
    FenwickTree(int size) : size(size), tree(size + 1, 0) {}
    
    // 更新树状数组，增加index处的值
    void update(int index) {
        while(index <= size){
            tree[index] += 1;
            index += index & (-index);
        }
    }
    
    // 查询树状数组，获取1到index的累积和
    int query(int index) const {
        int sum = 0;
        int idx = index;
        while(idx > 0){
            sum += tree[idx];
            idx -= idx & (-idx);
        }
        return sum;
    }
    
private:
    int size;
    vector<int> tree;
};

// Solution类包含主要的解题函数
class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        vector<int> counts(n, 0);
        
        // 离散化处理
        vector<int> sorted = nums;
        sort(sorted.begin(), sorted.end());
        sorted.erase(unique(sorted.begin(), sorted.end()), sorted.end());
        
        // 初始化树状数组
        FenwickTree ft(sorted.size());
        
        // 从右向左遍历
        for(int i = n -1; i >=0; i--){
            // 使用lower_bound找到当前元素在sorted中的位置
            int pos = lower_bound(sorted.begin(), sorted.end(), nums[i]) - sorted.begin() +1; // 树状数组索引从1开始
            counts[i] = ft.query(pos -1);
            ft.update(pos);
        }
        
        return counts;
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

int main(){
    Solution sol;
    
    // 示例 1
    vector<int> nums1 = {5,2,6,1};
    vector<int> res1 = sol.countSmaller(nums1);
    cout << "示例1输出: ";
    printArray(res1);
    
    // 示例 2
    vector<int> nums2 = {-1};
    vector<int> res2 = sol.countSmaller(nums2);
    cout << "示例2输出: ";
    printArray(res2);
    
    // 示例 3
    vector<int> nums3 = {-1,-1};
    vector<int> res3 = sol.countSmaller(nums3);
    cout << "示例3输出: ";
    printArray(res3);
    
    return 0;
}
```

**代码说明：**

1. **FenwickTree类**：
   - **构造函数**：初始化树状数组的大小并分配内存。
   - **update函数**：用于在树状数组中增加指定索引的值。
   - **query函数**：用于查询从1到指定索引的累积和。

2. **Solution类**：
   - **countSmaller函数**：
     - **离散化处理**：将数组中的元素排序并去重，映射到一个固定的索引范围内。
     - **初始化树状数组**：使用离散化后的大小创建树状数组。
     - **从右向左遍历数组**：
       - 对于每个元素，使用`lower_bound`找到其在排序数组中的位置，然后查询比当前元素小的元素数量。
       - 更新树状数组中的当前位置，以便后续元素进行查询。
     - **返回结果**：最终，`counts`数组包含每个元素右侧小于它的元素数量。

3. **辅助函数**：
   - `printArray`函数用于打印结果数组，方便验证。

4. **测试主函数**：
   - 包含三个示例，分别对应题目中的示例1、示例2和示例3。
   - 对每个示例，调用`countSmaller`函数并打印结果。

**编译和运行：**

使用以下命令编译和运行代码：

```bash
g++ -o solution solution.cpp
./solution
```

**预期输出：**

```
示例1输出: [2, 1, 1, 0]
示例2输出: [0]
示例3输出: [0, 0]
```

---

### 总结

通过上述C和C++的实现，我们成功地在两种不同的编程语言中解决了“数位之下的较小数字计数”问题。在C语言中，手动实现了树状数组，并通过离散化处理来管理元素的范围，确保了算法的高效性。在C++中，利用了STL容器（如`vector`）和算法（如`sort`和`unique`）来简化代码，实现了同样的逻辑。

**关键点回顾：**

- **离散化处理**：将元素映射到一个连续的索引范围，便于使用树状数组进行高效查询和更新。
- **树状数组（Fenwick Tree）**：高效地进行区间求和和单点更新操作，时间复杂度为`O(log n)`。
- **从右向左遍历**：确保我们在处理当前元素时，所有右侧的元素已经被考虑到。
- **内存管理（C语言）**：手动分配和释放内存，确保没有内存泄漏。
- **利用STL（C++）**：简化代码实现，提高代码可读性和开发效率。

通过这些方法，我们能够高效地解决大规模数据下的计数问题，满足题目的时间和空间复杂度要求。在实际应用中，这种技术可以用于各种需要高效统计和查询的场景，如数据分析、游戏开发等。