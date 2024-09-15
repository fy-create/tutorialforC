---
layout: post
title:  "markdown test"
categories: other
---

### 在 GitHub 上创建一个 Repo 并写学习 Markdown 的简单用法笔记

以下是你如何在 GitHub 上创建一个仓库，并写一篇关于 Markdown 简单用法的学习笔记的步骤。

---

### 1. **创建 GitHub 仓库 (Repository)**

1. **登录 GitHub**：
   - 进入 [GitHub](https://github.com/) 并登录你的账户。如果没有账户，先创建一个。

2. **创建新仓库**：
   - 在页面右上角，点击你的头像旁边的 `+` 按钮，选择 **New repository**（新建仓库）。
   
3. **填写仓库信息**：
   - **Repository name**：输入仓库名称，比如 `Markdown-Learning`.
   - **Description (可选)**：可以输入仓库的描述，如 “A repo to learn Markdown basics.”
   - **Public/Private**：选择仓库的可见性。`Public` 表示公开，所有人都可以看到；`Private` 表示只有你和被邀请的贡献者可以看到。
   - **Initialize this repository with a README**：勾选这个选项来自动创建 `README.md` 文件，方便你开始使用。

4. **点击 "Create repository"**：仓库就会创建成功。

---

### 2. **在 GitHub 上编辑 `README.md`**

GitHub 自动生成的 `README.md` 是空白的，你可以直接在页面上编辑它，写入你的 Markdown 学习笔记。

#### 步骤：

1. **进入仓库主页**：创建成功后，GitHub 会自动把你带到新仓库的主页。
2. **点击 `README.md` 文件**：GitHub 会默认生成一个空的 `README.md` 文件。
3. **点击右上角的铅笔图标**：点击这个按钮可以进入编辑模式。
4. **开始编写 Markdown 学习笔记**。

---

### 3. **撰写 Markdown 学习笔记**

你可以开始撰写一篇简单的学习笔记，记录 Markdown 的基本用法。以下是一个 Markdown 学习笔记的示例内容，可以直接复制粘贴到 `README.md` 文件中，然后根据自己的理解进行修改。

```markdown
# Markdown 学习笔记

Markdown 是一种轻量级的标记语言，用于编写格式化的文档。以下是 Markdown 的一些基本用法。

---

## 1. 标题

Markdown 使用 `#` 来创建标题。根据 `#` 的数量不同，可以创建不同级别的标题。

```markdown
# 一级标题
## 二级标题
### 三级标题
```

效果：

# 一级标题  
## 二级标题  
### 三级标题  

---

## 2. 列表

Markdown 支持有序列表和无序列表。

- **无序列表**：使用 `-` 或 `*` 或 `+` 创建。
- **有序列表**：使用数字和 `.` 创建。

```markdown
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

1. 有序项目 1
2. 有序项目 2
```

效果：

- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

1. 有序项目 1  
2. 有序项目 2  

---

## 3. 强调文本

Markdown 可以使用 `*` 或 `_` 来实现斜体，使用 `**` 或 `__` 来实现粗体。

```markdown
*斜体* 或 _斜体_

**粗体** 或 __粗体__
```

效果：

*斜体*  
**粗体**  

---

## 4. 链接和图片

- **链接**：使用 `[显示文本](链接地址)` 来创建。
- **图片**：使用 `![替代文本](图片地址)` 来插入图片。

```markdown
[访问 GitHub](https://github.com)

![GitHub logo](https://github.githubassets.com/images/modules/logos_page/Octocat.png)
```

效果：

[访问 GitHub](https://github.com)

![GitHub logo](https://github.githubassets.com/images/modules/logos_page/Octocat.png)

---

## 5. 引用

使用 `>` 符号表示引用。

```markdown
> 这是一个引用文本。
```

效果：

> 这是一个引用文本。

---

## 6. 代码块

使用反引号来表示代码块。

- **行内代码**：使用单个反引号包裹代码。
- **代码块**：使用三个反引号包裹代码。

```markdown
`行内代码`

```python
# 这是一个 Python 代码块
def hello():
    print("Hello, Markdown!")
```
```

效果：

`行内代码`

```python
# 这是一个 Python 代码块
def hello():
    print("Hello, Markdown!")
```

---

## 7. 表格

Markdown 支持简单的表格。

```markdown
| 头1   | 头2   | 头3   |
|-------|-------|-------|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |
```

效果：

| 头1   | 头2   | 头3   |
|-------|-------|-------|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

---

## 8. 分隔线

使用 `---`、`***` 或 `___` 创建分隔线。

```markdown
---
***
___
```

效果：

---
***
___

---

## 9. 待办列表

在 GitHub Flavored Markdown (GFM) 中，你可以创建待办任务列表。

```markdown
- [ ] 未完成任务
- [x] 已完成任务
```

效果：

- [ ] 未完成任务  
- [x] 已完成任务

---

## 10. 表情符号

使用 `:emoji_name:` 来显示表情符号。

```markdown
:smile: :thumbsup: :tada:
```

效果：

😄 👍 🎉
```

---

### 4. **提交更改**

1. 编辑完成后，向下滚动到页面底部。
2. 在 `Commit changes` 部分，你可以填写提交信息，比如 "添加 Markdown 学习笔记"。
3. 点击 **Commit changes**，提交你对 `README.md` 的修改。

---

### 5. **查看效果**

提交后，返回仓库的主页，你将会看到 Markdown 文件被自动渲染，你的学习笔记将会在页面上以格式化的形式显示出来。

---

### 6. **总结**

通过这个过程，你已经成功创建了一个 GitHub 仓库，并在其中写了一篇 Markdown 学习笔记。你可以通过进一步的学习和练习，掌握更多 Markdown 的用法，甚至可以在 GitHub Pages 上使用 Markdown 来托管个人博客或项目文档。

如果你对 Markdown 更加熟悉，你还可以尝试用它编写技术文档、说明书，甚至是项目报告。Markdown 是非常强大且灵活的工具。