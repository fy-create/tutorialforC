---
layout: post
title:  "297. 二叉树的序列化与反序列化"
categories: arithmetic
---

[297. 二叉树的序列化与反序列化](https://leetcode.cn/problems/serialize-and-deserialize-binary-tree)

### 题目：**Serialize and Deserialize Binary Tree**

#### 题目描述：

设计一个算法，将一个二叉树进行序列化，使其能够以字符串的形式存储或传输。然后，再设计一个算法，从序列化后的字符串恢复该二叉树。

你需要实现 `Codec` 类，提供以下方法：
- `serialize(root)`：将二叉树序列化为字符串。
- `deserialize(data)`：将序列化后的字符串反序列化为二叉树。

#### 输入：
- 一个二叉树的根节点 `root`。

#### 输出：
- 返回序列化后的字符串或反序列化后的二叉树。

#### 示例：

**示例 1:**
```plaintext
输入:
root = [1,2,3,null,null,4,5]
Codec codec = new Codec();
String serialized = codec.serialize(root);
TreeNode deserialized = codec.deserialize(serialized);

输出:
[1,2,3,null,null,4,5]
```

#### 提示：
- 节点数范围：[0, 10^4]。
- 树中的每个节点都包含一个整数值。

---

### 解题思路：

#### 1. **序列化**：
   - 序列化是将二叉树转换为字符串的过程。可以使用前序遍历或者层序遍历的方式来生成二叉树的字符串。
   - 每个节点都将被标记，如果是空节点（`null`），可以用特殊符号（如 `"null"`）来表示。
   - 通过递归的前序遍历，可以得到一个符合规范的序列化字符串。

#### 2. **反序列化**：
   - 反序列化是将序列化字符串恢复为二叉树的过程。根据字符串生成树的过程中，我们可以根据字符串中记录的节点顺序来重新构建二叉树。
   - 使用递归的方式，通过层次结构将每个节点的值解析为树节点，再逐层建立树。

#### 3. **使用递归**：
   - 对于二叉树的前序遍历或层序遍历，递归方法非常适合。通过递归访问每个节点，我们可以非常方便地进行树的序列化与反序列化。

---

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 定义二叉树节点结构体
struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

// 序列化的辅助函数
void serializeHelper(struct TreeNode* root, char* result) {
    if (root == NULL) {
        strcat(result, "null,");
        return;
    }
    char buffer[20];
    sprintf(buffer, "%d,", root->val);
    strcat(result, buffer);
    serializeHelper(root->left, result);
    serializeHelper(root->right, result);
}

// 序列化函数
char* serialize(struct TreeNode* root) {
    char* result = (char*)malloc(10000 * sizeof(char)); // 为结果分配足够的空间
    result[0] = '\0';
    serializeHelper(root, result);
    return result;
}

// 反序列化的辅助函数
struct TreeNode* deserializeHelper(char** data) {
    if (**data == '\0') return NULL;
    if (**data == 'n') {
        *data += 5; // 跳过"null,"
        return NULL;
    }
    int val = 0;
    while (**data != ',' && **data != '\0') {
        val = val * 10 + (**data - '0');
        (*data)++;
    }
    (*data)++; // 跳过逗号

    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = val;
    root->left = deserializeHelper(data);
    root->right = deserializeHelper(data);
    return root;
}

// 反序列化函数
struct TreeNode* deserialize(char* data) {
    return deserializeHelper(&data);
}

// 释放树的内存
void freeTree(struct TreeNode* root) {
    if (root == NULL) return;
    freeTree(root->left);
    freeTree(root->right);
    free(root);
}

int main() {
    struct TreeNode* root = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->val = 1;
    root->left = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->left->val = 2;
    root->right = (struct TreeNode*)malloc(sizeof(struct TreeNode));
    root->right->val = 3;

    char* serialized = serialize(root);
    printf("Serialized: %s\n", serialized);

    struct TreeNode* deserialized = deserialize(serialized);
    printf("Deserialized root value: %d\n", deserialized->val);

    free(serialized);
    freeTree(root);
    freeTree(deserialized);

    return 0;
}
```

#### 说明：
1. `serialize` 使用递归将二叉树转为字符串，空节点用 `"null"` 表示。
2. `deserialize` 使用递归从字符串重建树，解析每个节点值并构建左、右子树。
3. 在 `main` 函数中，我们构造了一个简单的树，进行序列化与反序列化，并验证了功能。

---

### C++解答：

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <queue>
#include <algorithm>
using namespace std;

// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Codec {
public:
    // 序列化函数
    string serialize(TreeNode* root) {
        if (!root) return "null";
        stringstream ss;
        serializeHelper(root, ss);
        return ss.str();
    }

    // 反序列化函数
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return deserializeHelper(ss);
    }

private:
    // 序列化辅助函数
    void serializeHelper(TreeNode* root, stringstream& ss) {
        if (!root) {
            ss << "null,";
            return;
        }
        ss << root->val << ",";
        serializeHelper(root->left, ss);
        serializeHelper(root->right, ss);
    }

    // 反序列化辅助函数
    TreeNode* deserializeHelper(stringstream& ss) {
        string val;
        getline(ss, val, ',');
        if (val == "null") return nullptr;
        TreeNode* root = new TreeNode(stoi(val));
        root->left = deserializeHelper(ss);
        root->right = deserializeHelper(ss);
        return root;
    }
};

int main() {
    Codec codec;

    // 创建树
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    root->right->left = new TreeNode(4);
    root->right->right = new TreeNode(5);

    // 序列化
    string serialized = codec.serialize(root);
    cout << "Serialized tree: " << serialized << endl;

    // 反序列化
    TreeNode* deserialized = codec.deserialize(serialized);
    cout << "Deserialized tree root value: " << deserialized->val << endl;

    return 0;
}
```

#### 说明：
1. **序列化**：通过递归方法，先序遍历二叉树并将其转为字符串，空节点用 `"null"` 表示。
2. **反序列化**：从字符串中解析节点值，递归构建二叉树。
3. 通过 `stringstream` 方便地进行字符串拼接和解析。

---

### 时间复杂度：
- **序列化**：时间复杂度为 O(N)，其中 N 是树中的节点数。每个节点都被访问一次。
- **反序列化**：时间复杂度为 O(N)，每个节点也都被访问一次。

### 空间复杂度：
- 空间复杂度为 O(N)，用于存储序列化后的字符串或者构建树时的递归栈空间。

---

### 总结：
通过递归方法，我们可以非常简洁地实现二叉树的序列化与反序列化。将二叉树的节点值转化为字符串并保留空节点的信息，再根据字符串恢复二叉树结构，这是一种常用的解决方式。