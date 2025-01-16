---
layout: post
title:  "222. 完全二叉树的节点个数"
categories: arithmetic
---

[222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes)

### 题目要求：

给定一个完全二叉树，计算该树的节点个数。

**完全二叉树**是一个每一层除了最后一层外，其他层都被完全填满的二叉树，并且最后一层的节点从左至右填充。

### 示例：

**示例 1**：
```
输入: 
    1
   / \
  2   3
 / \
4   5

输出: 5
```

**示例 2**：
```
输入: 
    1
   / \
  2   3
 / 
4   

输出: 4
```

### 提示：
- 树的节点数在范围 `[1, 5 * 10^4]` 内。
- 每个节点的值 `node.val` 在范围 `[0, 5 * 10^4]` 内。

---

### 解题思路：

这个问题的关键在于如何高效地计算一个完全二叉树的节点数。完全二叉树的特殊结构提供了比直接遍历所有节点更高效的算法。

#### 思路分析：
1. **完全二叉树的性质**：
   - 如果树的高度为 `h`，则其节点数可能是 `2^h - 1`（即满二叉树），也可能是介于 `2^h - 1` 和 `2^(h+1) - 1` 之间，最后一层的节点不一定满。
   - 完全二叉树的叶子节点分布在最后两层，且在最后一层从左至右依次填充。

2. **计算方法**：
   - 直接遍历树的所有节点，时间复杂度是 O(n)，但由于完全二叉树有其特殊性，我们可以通过树的高度来优化。
   - **优化思路**：
     - 计算树的高度 `h`。从根节点开始，不断向左子树移动，直到到达最左边的叶子节点，树的高度就是 `h`。
     - 然后可以使用二分查找方法来计算最后一层的节点数。由于完全二叉树的结构，最后一层的节点是从左到右依次填充的，所以我们可以通过检查节点是否存在来高效地找到最后一层的节点数。

3. **具体步骤**：
   1. 计算树的高度 `h`。
   2. 使用二分查找来确定最后一层的节点数。
   3. 总节点数等于：`2^h - 1`（满二叉树的节点数）加上最后一层的节点数。

#### 复杂度分析：
- 时间复杂度：`O(log^2 n)`。首先计算树的高度是 O(log n)，然后对每一层进行二分查找，整体时间复杂度是 O(log^2 n)。
- 空间复杂度：`O(1)`，不使用额外的空间。

---

### C语言解法：

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 计算树的高度
int getHeight(struct TreeNode* root) {
    int height = 0;
    while (root) {
        height++;
        root = root->left;  // 向左走直到没有左子树
    }
    return height;
}

// 判断节点是否存在，利用二分查找方式查找最后一层的节点
int exists(struct TreeNode* root, int index, int height) {
    int left = 0, right = (1 << height) - 1;
    for (int i = 0; i < height; i++) {
        int mid = left + (right - left) / 2;
        if (index <= mid) {
            root = root->left;
            right = mid;
        } else {
            root = root->right;
            left = mid + 1;
        }
    }
    return root != NULL;
}

// 计算完全二叉树的节点个数
int countNodes(struct TreeNode* root) {
    if (!root) return 0;

    int height = getHeight(root);
    if (height == 0) return 0;

    int left = 1, right = (1 << (height - 1)) - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (exists(root, mid, height - 1)) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // 总节点数是满二叉树节点数加上最后一层的节点数
    return (1 << (height - 1)) - 1 + left;
}

// 示例主函数
int main() {
    struct TreeNode node1 = {1, NULL, NULL};
    struct TreeNode node2 = {2, NULL, NULL};
    struct TreeNode node3 = {3, NULL, NULL};
    struct TreeNode node4 = {4, NULL, NULL};
    struct TreeNode node5 = {5, NULL, NULL};

    node1.left = &node2;
    node1.right = &node3;
    node2.left = &node4;
    node2.right = &node5;

    printf("Number of nodes: %d\n", countNodes(&node1));

    return 0;
}
```

### C++解法：

```cpp
#include <iostream>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 计算树的高度
    int getHeight(TreeNode* root) {
        int height = 0;
        while (root) {
            height++;
            root = root->left;  // 向左走直到没有左子树
        }
        return height;
    }

    // 判断最后一层的某个节点是否存在
    bool exists(TreeNode* root, int index, int height) {
        int left = 0, right = (1 << height) - 1;
        for (int i = 0; i < height; i++) {
            int mid = left + (right - left) / 2;
            if (index <= mid) {
                root = root->left;
                right = mid;
            } else {
                root = root->right;
                left = mid + 1;
            }
        }
        return root != NULL;
    }

    // 计算完全二叉树的节点个数
    int countNodes(TreeNode* root) {
        if (!root) return 0;

        int height = getHeight(root);
        if (height == 0) return 0;

        int left = 1, right = (1 << (height - 1)) - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (exists(root, mid, height - 1)) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        // 总节点数是满二叉树节点数加上最后一层的节点数
        return (1 << (height - 1)) - 1 + left;
    }
};

int main() {
    Solution solution;

    // 创建一个测试用的二叉树
    TreeNode node1(1);
    TreeNode node2(2);
    TreeNode node3(3);
    TreeNode node4(4);
    TreeNode node5(5);

    node1.left = &node2;
    node1.right = &node3;
    node2.left = &node4;
    node2.right = &node5;

    cout << "Number of nodes: " << solution.countNodes(&node1) << endl;

    return 0;
}
```

### 代码解释：

#### C语言解法：
1. **`getHeight`**：从根节点出发，沿着左子树一直向下，直到到达最左边的叶子节点，返回树的高度。
2. **`exists`**：利用二分查找方式判断树的最后一层某个节点是否存在。给定一个索引，判断该索引对应的节点是否存在。
3. **`countNodes`**：通过计算树的高度，使用二分查找的方式，确定最后一层的节点个数。最终返回完全二叉树的总节点数。

#### C++解法：
1. **`getHeight`**：同样计算树的高度，方法和 C 语言实现相同。
2. **`exists`**：实现了与 C 语言相同的二分查找逻辑来判断某个节点是否存在。
3. **`countNodes`**：结合树的高度和最后一层的节点数，返回树的节点总数。

### 总结：
通过利用完全二叉树的性质，我们可以在 O(log^2 n) 的时间复杂度内计算出节点的数量。首先利用高度来减少不必要的遍历，再通过二分查找确定最后一层的节点数，从

而高效地解决问题。