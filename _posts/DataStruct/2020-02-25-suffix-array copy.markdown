---
layout: post
title:  "后缀数组（Suffix Array）"
categories: dataStruct
---

### 后缀数组（Suffix Array）的概念和应用

#### 概念
**后缀数组（Suffix Array）** 是一种用于处理字符串问题的强大数据结构。它存储了一个字符串所有后缀的字典序排列的索引。换句话说，后缀数组记录了原字符串的所有后缀按字典序排序后在原字符串中的起始位置。

- **后缀**：给定字符串 `S`，其后缀是从某个位置开始到字符串末尾的子串。例如，对于字符串 `S = "banana"`，它的后缀为：
  1. `"banana"`
  2. `"anana"`
  3. `"nana"`
  4. `"ana"`
  5. `"na"`
  6. `"a"`

- **后缀数组**：将这些后缀按照字典序排序，并记录它们在原字符串中的起始索引。后缀数组是这些起始索引的数组。例如，对于 `S = "banana"`，其后缀数组为：
  - 排序后的后缀为：`["a", "ana", "anana", "banana", "na", "nana"]`
  - 对应的起始位置为：`[5, 3, 1, 0, 4, 2]`，这就是后缀数组。

#### 表示
- 对于字符串 `S`，它的后缀数组 `SA` 是一个长度为 `n` 的数组，`SA[i]` 表示按字典序第 `i` 小的后缀在字符串中的起始位置。
  
  例如，`S = "banana"` 的后缀数组 `SA = [5, 3, 1, 0, 4, 2]`。

#### 构建后缀数组
构建后缀数组可以通过多种方法完成，常见的方法有：
1. **朴素排序法**：通过直接对所有后缀进行排序，时间复杂度为 **O(n log n)**。
2. **倍增算法**：常用于竞赛中，时间复杂度也为 **O(n log n)**，但实现更加高效。
3. **基数排序法**：如 **DC3（Skew Algorithm）** 和 **SA-IS** 算法，能在 **O(n)** 时间内构建后缀数组。

---

### 1. **后缀数组的应用**

#### 1.1 字符串匹配问题
通过后缀数组，我们可以在 **O(m log n)** 时间内解决字符串匹配问题，其中 `m` 是模式串的长度，`n` 是文本串的长度。后缀数组可以帮助我们快速找到模式串在文本串中的所有出现位置。

#### 1.2 最长重复子串（Longest Repeated Substring）
后缀数组结合 **LCP数组**（Longest Common Prefix Array）可以用来找到字符串中的最长重复子串。在后缀数组中相邻的后缀具有最长的公共前缀，因此通过 LCP 数组来找出这些公共前缀的最大值，即可找到最长重复子串。

#### 1.3 字符串的字典序最小旋转
通过构建字符串的后缀数组，可以快速找到给定字符串的字典序最小旋转。

#### 1.4 LCP 数组
**LCP 数组** 存储了后缀数组中相邻两个后缀的最长公共前缀长度。LCP 数组有很多重要的应用，比如用于解决 **最长公共子串** 问题。

---

### 2. **后缀数组的构建方法**

#### 2.1 朴素排序法构建后缀数组

这是一种最简单的构建后缀数组的方法，通过直接对字符串的所有后缀进行排序，然后记录排序后的索引。该方法的时间复杂度为 **O(n log n)**。

#### 代码实现：
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 后缀数组中的后缀节点
typedef struct {
    int index;      // 后缀的起始索引
    char* suffix;   // 后缀字符串
} Suffix;

// 比较函数：用于排序
int compareSuffix(const void* a, const void* b) {
    return strcmp(((Suffix*)a)->suffix, ((Suffix*)b)->suffix);
}

// 构建后缀数组
void buildSuffixArray(char* txt, int n, int* suffixArray) {
    Suffix* suffixes = (Suffix*)malloc(n * sizeof(Suffix));

    // 创建所有的后缀并保存它们的起始位置
    for (int i = 0; i < n; i++) {
        suffixes[i].index = i;
        suffixes[i].suffix = (txt + i);  // 从第 i 个字符开始的后缀
    }

    // 按照后缀字符串进行排序
    qsort(suffixes, n, sizeof(Suffix), compareSuffix);

    // 生成后缀数组（记录排序后的后缀的起始位置）
    for (int i = 0; i < n; i++) {
        suffixArray[i] = suffixes[i].index;
    }

    free(suffixes);
}

// 打印后缀数组
void printSuffixArray(int* suffixArray, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", suffixArray[i]);
    }
    printf("\n");
}

int main() {
    char txt[] = "banana";
    int n = strlen(txt);

    // 创建后缀数组
    int* suffixArray = (int*)malloc(n * sizeof(int));
    buildSuffixArray(txt, n, suffixArray);

    // 打印后缀数组
    printf("Suffix Array for the string \"%s\":\n", txt);
    printSuffixArray(suffixArray, n);

    free(suffixArray);
    return 0;
}
```

#### 输出：
```
Suffix Array for the string "banana":
5 3 1 0 4 2
```

#### 解释：
- 对于字符串 `"banana"`，它的所有后缀为：`"banana", "anana", "nana", "ana", "na", "a"`。
- 按字典序排序后的后缀为：`"a", "ana", "anana", "banana", "na", "nana"`，对应的起始索引为 `[5, 3, 1, 0, 4, 2]`，这就是后缀数组。

---

### 3. **LCP 数组的构建**

**LCP（Longest Common Prefix）数组** 用于存储后缀数组中相邻后缀的最长公共前缀长度。

#### LCP 数组的定义：
- **LCP[i]** 表示后缀数组中第 `i` 个后缀和第 `i-1` 个后缀的最长公共前缀长度。
- 例如，字符串 `"banana"` 的后缀数组为 `[5, 3, 1, 0, 4, 2]`，对应的后缀为 `["a", "ana", "anana", "banana", "na", "nana"]`。它的 LCP 数组为 `[0, 1, 3, 0, 0, 2]`。

#### 构建 LCP 数组的算法：
1. 遍历后缀数组的相邻后缀，对每对后缀进行比较，找出它们的公共前缀长度。
2. 用数组 `LCP[]` 记录这些公共前缀的长度。

#### 代码实现：
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 计算两个字符串的最长公共前缀长度
int computeLCP(char* s1, char* s2) {
    int i = 0;
    while (s1[i] && s2[i] && s1[i] == s2[i]) {
        i++;
    }
    return i;
}

// 构建 LCP 数组
void buildLCPArray(char* txt, int n, int* suffixArray, int* LCP) {
    LCP[0] = 0;  // 第一个后缀没有前一个后缀来比较，所以 LCP[0] = 0

    for (int i = 1; i < n; i++) {
        LCP[i] = computeLCP(txt + suffixArray[i - 1], txt + suffixArray[i]);
    }
}

// 打印 LCP 数组
void printLCPArray(int* LCP, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", LCP[i]);
    }
    printf("\n");
}

int main() {
    char txt[] = "banana";
    int n = strlen(txt);

    // 创建后缀数组
    int* suffixArray = (int*)malloc(n * sizeof(int));
    buildSuffixArray(txt, n, suffixArray);

    // 创建 LCP 数组


    int* LCP = (int*)malloc(n * sizeof(int));
    buildLCPArray(txt, n, suffixArray, LCP);

    // 打印 LCP 数组
    printf("LCP Array for the string \"%s\":\n", txt);
    printLCPArray(LCP, n);

    free(suffixArray);
    free(LCP);
    return 0;
}
```

#### 输出：
```
LCP Array for the string "banana":
0 1 3 0 0 2
```

#### 解释：
- 对于字符串 `"banana"` 的后缀数组 `[5, 3, 1, 0, 4, 2]`，对应的后缀为 `["a", "ana", "anana", "banana", "na", "nana"]`。
- LCP 数组表示相邻后缀之间的最长公共前缀长度。比如 `"ana"` 和 `"anana"` 的公共前缀长度是 3， `"banana"` 和 `"na"` 没有公共前缀，长度为 0。

---

### 4. **后缀数组与 LCP 数组的应用**

#### 4.1 字符串匹配
- 使用后缀数组，可以通过二分查找快速定位目标字符串（模式串）在文本中的位置。
- 通过后缀数组和 LCP 数组，可以高效解决多个字符串的匹配问题。

#### 4.2 最长重复子串（Longest Repeated Substring）
- 后缀数组结合 LCP 数组能够帮助我们找到字符串中的 **最长重复子串**。
- 在 LCP 数组中，最大值对应的两个后缀的最长公共前缀就是最长重复子串。

#### 4.3 最长公共子串（Longest Common Substring）
- 通过后缀数组和 LCP 数组，还可以高效求解两个字符串的 **最长公共子串** 问题。

---

### 总结

- **后缀数组（Suffix Array）** 是一种非常强大的数据结构，能够高效处理字符串的各种查询和匹配问题，尤其是大规模文本和模式匹配场景。
- **LCP 数组（Longest Common Prefix Array）** 与后缀数组一起使用，可以解决如 **最长重复子串**、**最长公共子串** 等复杂的字符串问题。
- 构建后缀数组的简单方法是通过直接对所有后缀进行排序，时间复杂度为 **O(n log n)**。更高效的构建算法如 **倍增算法**、**DC3 算法** 可以将时间复杂度降低到 **O(n log n)** 或更低。