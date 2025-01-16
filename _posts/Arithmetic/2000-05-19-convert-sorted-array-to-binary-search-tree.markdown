---
layout: post
title:  "108. 将有序数组转换为二叉搜索树"
categories: arithmetic
---

[108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree)

### 题目描述

给定一个 **升序排列** 的整数数组 `nums`，将其转换为一棵 **高度平衡** 的二叉搜索树。

**高度平衡二叉搜索树** 是指一个二叉搜索树，满足以下条件：

- 每个节点的左子树和右子树的高度差不超过 1。

### 示例

#### 示例 1:
```
输入: nums = [-10,-3,0,5,9]
输出:
     0
    / \
  -3   9
  /   /
-10  5
```

#### 示例 2:
```
输入: nums = [1,3]
输出:
   3
  /
 1
```

### 提示

- `1 <= nums.length <= 10^4`
- `-10^4 <= nums[i] <= 10^4`
- `nums` 按 **升序排列**。

### 解题思路

这道题的核心思想是根据**有序数组**构建一个**平衡的二叉搜索树 (BST)**。我们可以利用数组的中点作为根节点，并递归地将左半部分构建为左子树，右半部分构建为右子树。这样可以确保每一层的节点数大致相同，从而满足平衡条件。

**步骤：**
1. **选取中点**：首先，选取数组的中点作为根节点。这样，根节点的左右两部分数组长度差最小，保证树的平衡。
2. **递归构建左子树和右子树**：分别递归构建左半部分和右半部分的树，直到数组为空。
3. **递归边界**：当数组的起始索引大于终止索引时，说明该部分已经没有元素，可以返回空子树。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 `n` 是数组的长度。每个元素只会被访问一次。
- **空间复杂度**：O(n)，递归调用栈的深度是树的高度，最坏情况下树的高度为 `O(n)`，空间复杂度为 `O(n)`。

### C语言解答

```c
#include <stdio.h>
#include <stdlib.h>

// 定义二叉树节点结构
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 递归创建二叉搜索树
struct TreeNode* sortedArrayToBSTHelper(int* nums, int left, int right) {
    if (left > right) return NULL;

    // 选择中点作为根节点
    int mid = left + (right - left) / 2;
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = nums[mid];
    root->left = sortedArrayToBSTHelper(nums, left, mid - 1);  // 递归创建左子树
    root->right = sortedArrayToBSTHelper(nums, mid + 1, right); // 递归创建右子树

    return root;
}

// 主函数：调用辅助函数
struct TreeNode* sortedArrayToBST(int* nums, int numsSize) {
    return sortedArrayToBSTHelper(nums, 0, numsSize - 1);
}

// 输出先序遍历结果（仅用于测试）
void preorder(struct TreeNode* root) {
    if (root == NULL) return;
    printf("%d ", root->val);
    preorder(root->left);
    preorder(root->right);
}

int main() {
    int nums[] = {-10, -3, 0, 5, 9};
    int numsSize = 5;
    
    // 创建平衡二叉搜索树
    struct TreeNode* root = sortedArrayToBST(nums, numsSize);
    
    // 输出先序遍历结果
    preorder(root);  // 输出结果应为：0 -3 -10 5 9
    
    return 0;
}
```

### C++解答

```cpp
#include <iostream>
#include <vector>
using namespace std;

// 定义二叉树节点结构
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    // 递归创建二叉搜索树
    TreeNode* sortedArrayToBSTHelper(vector<int>& nums, int left, int right) {
        if (left > right) return NULL;

        // 选择中点作为根节点
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = sortedArrayToBSTHelper(nums, left, mid - 1);  // 递归创建左子树
        root->right = sortedArrayToBSTHelper(nums, mid + 1, right); // 递归创建右子树

        return root;
    }

    // 主函数：调用辅助函数
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return sortedArrayToBSTHelper(nums, 0, nums.size() - 1);
    }
};

// 输出先序遍历结果（仅用于测试）
void preorder(TreeNode* root) {
    if (root == NULL) return;
    cout << root->val << " ";
    preorder(root->left);
    preorder(root->right);
}

int main() {
    Solution sol;
    vector<int> nums = {-10, -3, 0, 5, 9};
    
    // 创建平衡二叉搜索树
    TreeNode* root = sol.sortedArrayToBST(nums);
    
    // 输出先序遍历结果
    preorder(root);  // 输出结果应为：0 -3 -10 5 9
    
    return 0;
}
```

### 代码说明

#### C语言版本
- **`TreeNode` 结构体**：定义了二叉树的节点，包括 `val`（节点值），`left`（左子树指针），`right`（右子树指针）。
- **`sortedArrayToBSTHelper` 函数**：通过递归来构建平衡的二叉搜索树，选择数组的中间元素作为根节点，递归地构建左子树和右子树。
- **`sortedArrayToBST` 函数**：这是主函数，调用辅助函数 `sortedArrayToBSTHelper` 来构建树。
- **`preorder` 函数**：用来输出二叉树的先序遍历结果，便于验证树的构建是否正确。

#### C++版本
- **`TreeNode` 类**：定义了二叉树的节点，包含 `val`（节点值），`left`（左子树指针），`right`（右子树指针）。
- **`sortedArrayToBSTHelper` 函数**：递归地选择中间元素作为根节点，并构建左右子树。
- **`sortedArrayToBST` 函数**：主函数，负责调用 `sortedArrayToBSTHelper` 来构建二叉搜索树。
- **`preorder` 函数**：用于输出树的先序遍历结果。

### 时间和空间复杂度

- **时间复杂度**：O(n)，其中 `n` 是数组的长度。每个元素会被访问一次并作为树的一个节点。
- **空间复杂度**：O(n)，递归调用栈的深度是树的高度，最坏情况下树的高度为 `O(n)`，空间复杂度是 O(n)。

### 测试输出

对于示例输入 `nums = [-10, -3, 0, 5, 9]`，输出的先序遍历结果应为：
```
0 -3 -10 5 9
```

这表示树的结构为：
```
     0
    / \
  -3   9
  /   /
-10  5
```