---
layout: post
title:  "分治算法（Divide and Conquer）"
categories: dataStruct
---

### 分治算法（Divide and Conquer）的概念和应用

#### 概念
**分治算法（Divide and Conquer）** 是一种通过 **分解** 问题为若干规模较小但结构相似的子问题，分别递归解决这些子问题，最后将子问题的解 **合并** 成原问题的解的算法。

分治算法的基本流程为：
1. **分解（Divide）**：将原问题分解为若干个规模较小的子问题，通常是将问题划分为多个相同类型的子问题。
2. **解决（Conquer）**：当子问题足够小的时候，直接解决这些子问题；否则，继续递归分解这些子问题。
3. **合并（Combine）**：将子问题的解合并，得到原问题的解。

#### 分治算法适用于满足以下条件的问题：
1. **最优子结构（Optimal Substructure）**：问题的最优解可以通过子问题的最优解构造出来。
2. **无重叠子问题（Non-Overlapping Subproblems）**：子问题之间是独立的，互不重叠。

#### 时间复杂度分析
分治算法的复杂度通常通过 **递归树** 或 **主定理（Master Theorem）** 进行分析。一般情况下，如果将问题大小为 `n` 的问题分解为 `k` 个规模为 `n/b` 的子问题，并且合并的时间复杂度为 `O(n^d)`，则递归公式为：

```
T(n) = k * T(n/b) + O(n^d)
```

---

### 分治算法的常见应用

#### 1. **归并排序（Merge Sort）**

##### 问题描述：
归并排序是一种经典的分治算法，它将一个数组分为两个子数组，分别排序这两个子数组，然后将排序后的子数组合并成一个有序数组。

##### 分治思路：
- **分解**：将数组从中间分成两部分。
- **解决**：递归地对左右子数组排序。
- **合并**：合并两个已经排好序的子数组。

##### 代码实现（C语言）：
```c
#include <stdio.h>

// 合并两个已排序的子数组
void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // 创建临时数组
    int L[n1], R[n2];

    // 复制数据到临时数组 L 和 R
    for (int i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (int i = 0; i < n2; i++)
        R[i] = arr[mid + 1 + i];

    // 合并两个临时数组回到原数组
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // 复制剩余的元素
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// 归并排序
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;

        // 递归排序左右子数组
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);

        // 合并两个已排序的子数组
        merge(arr, left, mid, right);
    }
}

// 打印数组
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Given array is \n");
    printArray(arr, n);

    mergeSort(arr, 0, n - 1);

    printf("Sorted array is \n");
    printArray(arr, n);
    return 0;
}
```

#### 输出：
```
Given array is 
12 11 13 5 6 7 
Sorted array is 
5 6 7 11 12 13 
```

#### 复杂度分析：
- **时间复杂度**：O(n log n)
- **空间复杂度**：O(n)

#### 解释：
归并排序通过将数组递归分成两部分，分别排序后再合并。每次递归调用的时间复杂度为 `O(n)`（合并操作），而递归的深度为 `O(log n)`，因此总的时间复杂度为 `O(n log n)`。

---

#### 2. **快速排序（Quick Sort）**

##### 问题描述：
快速排序是一种常用的分治排序算法。它通过选择一个 **基准元素**（pivot），将数组划分为两个部分，左边的部分小于基准，右边的部分大于基准，然后递归地对这两个部分进行排序。

##### 分治思路：
- **分解**：选择一个基准元素 `pivot`，将数组分成两部分，左边部分小于等于 `pivot`，右边部分大于 `pivot`。
- **解决**：递归地对左、右两个子数组排序。
- **合并**：由于划分过程已经使得子数组有序，因此无需显式合并。

##### 代码实现（C语言）：
```c
#include <stdio.h>

// 划分函数，返回基准元素的最终位置
int partition(int arr[], int low, int high) {
    int pivot = arr[high];  // 选择最右边的元素为基准
    int i = (low - 1);      // i 是比 pivot 小的元素的索引

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;  // 增加较小元素的索引
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;  // 返回基准元素的位置
}

// 快速排序
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);  // 基准元素位置

        quickSort(arr, low, pi - 1);  // 递归排序基准元素左边部分
        quickSort(arr, pi + 1, high);  // 递归排序基准元素右边部分
    }
}

// 打印数组
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {10, 7, 8, 9, 1, 5};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Given array is \n");
    printArray(arr, n);

    quickSort(arr, 0, n - 1);

    printf("Sorted array is \n");
    printArray(arr, n);
    return 0;
}
```

#### 输出：
```
Given array is 
10 7 8 9 1 5 
Sorted array is 
1 5 7 8 9 10 
```

#### 复杂度分析：
- **平均时间复杂度**：O(n log n)
- **最坏时间复杂度**：O(n²)（当基准元素选择不当时，数组已经有序的情况）
- **空间复杂度**：O(log n)（递归调用栈）

#### 解释：
快速排序通过选择一个基准元素将数组分成两部分，然后递归地排序这两个部分。通过合理的选择基准元素（如随机选择），可以在大多数情况下达到平均时间复杂度 `O(n log n)`。

---

#### 3. **最大子数组和问题（Maximum Subarray Sum）**

##### 问题描述：
给定一个包含正负数的数组，求出一个连续子数组，使得其元素和最大。

##### 分治思路：
- **分解**：将数组从中间分成两部分。
- **解决**：递归解决左右两个子数组的最大子数组和，并计算跨越中间元素的最大子数组和。
- **合并**：比较左子数组、右子数组的最大值和跨越中间的最大子数组和，

选择最大值。

##### 代码实现（C语言）：
```c
#include <stdio.h>

// 计算跨越中点的最大子数组和
int maxCrossingSum(int arr[], int left, int mid, int right) {
    int sum = 0;
    int left_sum = -2147483647;  // 最小值
    for (int i = mid; i >= left; i--) {
        sum += arr[i];
        if (sum > left_sum) {
            left_sum = sum;
        }
    }

    sum = 0;
    int right_sum = -2147483647;  // 最小值
    for (int i = mid + 1; i <= right; i++) {
        sum += arr[i];
        if (sum > right_sum) {
            right_sum = sum;
        }
    }

    return left_sum + right_sum;
}

// 分治法求解最大子数组和
int maxSubArraySum(int arr[], int left, int right) {
    if (left == right) {
        return arr[left];  // 只有一个元素时，直接返回该元素
    }

    int mid = (left + right) / 2;

    int left_sum = maxSubArraySum(arr, left, mid);  // 左子数组
    int right_sum = maxSubArraySum(arr, mid + 1, right);  // 右子数组
    int cross_sum = maxCrossingSum(arr, left, mid, right);  // 跨越中点的子数组

    // 返回三者中的最大值
    return (left_sum > right_sum) ? (left_sum > cross_sum ? left_sum : cross_sum) : (right_sum > cross_sum ? right_sum : cross_sum);
}

int main() {
    int arr[] = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    int n = sizeof(arr) / sizeof(arr[0]);

    int max_sum = maxSubArraySum(arr, 0, n - 1);
    printf("Maximum subarray sum is %d\n", max_sum);

    return 0;
}
```

#### 输出：
```
Maximum subarray sum is 6
```

#### 复杂度分析：
- **时间复杂度**：O(n log n)
- **空间复杂度**：O(log n)（递归调用栈）

#### 解释：
最大子数组和问题通过递归分解数组，将其分成左、右和跨中间三部分，然后取三者的最大值。跨中间的子数组和通过从中间向左右两边扩展求得。

---

### 总结

- **分治算法** 是一种将问题分解为若干个相似但规模更小的子问题，递归解决这些子问题，最后合并结果的算法。
- **归并排序** 和 **快速排序** 是经典的分治排序算法，分别通过递归分割和合并或分区操作实现高效排序。
- **最大子数组和问题** 通过分治法递归地找到左半部分、右半部分和跨越中间部分的最大子数组和，从而求解全局最优解。
- 分治算法适用于具有 **最优子结构** 和 **无重叠子问题** 的问题，能够通过递归的方式高效地解决大规模问题。