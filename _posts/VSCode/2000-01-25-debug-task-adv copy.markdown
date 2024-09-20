---
layout: post
title:  "(必修!!!) 高级调试过程(Debug) launch.json"
categories: vscode
---

在 Visual Studio Code (VS Code) 中学会调试 C 代码是非常重要的，因为调试不仅仅是找出错误的工具，更是理解代码执行过程、优化程序、提高开发效率的重要手段。以下是为什么你应该学会在 VS Code 中调试 C 代码的几个关键原因：

### 1. **提升问题定位和修复效率**
   - **调试工具**允许你逐行执行代码，实时查看变量值、函数调用、程序的执行路径等。这比通过简单的 `printf` 调试更有效，尤其在复杂程序中，调试器能帮助你快速定位和修复问题。
   - 当程序出现崩溃、错误或意外行为时，通过断点、变量观察、调用堆栈等功能，调试器能让你快速找到问题的根源，而不用反复猜测或插入打印语句。

### 2. **理解程序的执行流程**
   - 在学习和开发 C 程序时，尤其是复杂项目，通过调试可以深入理解程序的执行顺序、各个函数的调用关系、循环和条件分支的行为等。
   - 在 VS Code 中，通过 **Step Over**、**Step Into** 和 **Step Out** 功能，调试可以帮助你逐行分析代码，清楚了解代码的执行路径，尤其是递归和复杂逻辑。

### 3. **实时查看变量和内存状态**
   - 在调试过程中，VS Code 允许你查看当前的变量值、内存中的数据状态，这在 C 语言中尤为重要。C 语言操作底层内存，因此，调试器能帮你快速检查指针的值、数组的边界、结构体的内容以及堆栈信息，防止出现内存泄漏、越界访问等问题。
   - **观察变量和表达式**：在调试时，你可以随时查看某个变量的当前值，检查程序在执行过程中变量是否被正确修改，方便发现逻辑错误。

### 4. **调试复杂数据结构**
   - 在 C 语言中，调试复杂的数据结构（如链表、树、栈、队列）非常重要。通过调试器，你可以逐步检查每一个节点、元素，了解它们的链接或值是否正确。
   - 在 VS Code 中，你可以利用 **pretty-printing** 功能来直观地查看这些复杂数据结构的内容。

### 5. **减少开发和调试时间**
   - 学会调试代码后，你可以在开发过程中**快速验证**某些逻辑，发现和修复错误。相比手动在代码中添加输出语句，使用调试器能更快速准确地找出问题。
   - 调试器能帮助你清楚了解代码执行的每一步，让你在开发的早期阶段就能发现潜在的问题，减少后期调试和修改的时间。

### 6. **掌握调试技能是现代开发者的基本要求**
   - 无论你从事何种编程工作，调试技能都是开发者必须掌握的基本技能之一。通过调试器，你可以更深入地理解和掌握 C 语言及其内存管理、指针操作等核心概念。
   - 在大型项目开发中，调试技能可以让你更快速地融入团队，提升代码的稳定性和质量。

### 7. **发现性能瓶颈**
   - 通过调试器，你不仅可以发现代码中的功能性错误，还可以分析代码的性能。你可以通过调试器检测函数调用的时间，分析程序中的性能瓶颈，优化算法和逻辑。
   - 了解哪些代码段消耗了最多的资源，哪些地方需要优化，是提升代码性能的重要手段。



学会在 VS Code 中调试 C 代码能够显著提升开发效率，帮助你快速发现问题、理解程序运行机制，优化程序性能。调试不仅是修复错误的工具，还是帮助你掌握编程语言的强大工具。在现代软件开发中，熟练使用调试工具是每个开发者都应具备的基本技能。

---

<BR><BR>
**Debug是建立在之前的编译任务的基础上，这里我们假定编译任务已经搞定。我们还是以十进制转二进制的例子开始，在 Z:\C_Study\Digital2Bin 下：**

```
PS Z:\C_Study\Digital2Bin> ls


    Directory: Z:\C_Study\Digital2Bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
------         2024/9/19     13:54           1001 d2b.c
------         2024/9/19     10:16             48 README.MD
------         2024/9/19     17:22         140325 d2b.exe
```

**开始配置**

打开VSCode，File->Open Folder... 导航到我们的 `Z:\C_Study\Digital2Bin` ,打开他。

转到Terminal小窗口，此时目录自动切换到了我们的工作目录,进入目录 `.vscode` 后，创建一个空文件名字叫 `launch.json`,最后再回到主目录.
```
PS Z:\C_Study\Digital2Bin> cd .vscode   
PS Z:\C_Study\Digital2Bin\.vscode> echo "" > launch.json
PS Z:\C_Study\Digital2Bin\.vscode> cd ..
PS Z:\C_Study\Digital2Bin> 
```

我们用这个覆盖launch.json的内容

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "(gdb) Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/d2b.exe",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "miDebuggerPath": "gdb.exe",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ],
            "preLaunchTask": "build C program",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

**跟之前编译任务差不多，其他的都是模版，要修改的只有1处**

**这里把可执行的文件换成自己的名字就好,此处就是d2b.exe** 
```json
"program": "${workspaceFolder}/d2b.exe",  
```

以下是对各个字段的详细解释,先做简单了解，一扫而过即可。以后遇到问题可以回来查。    

### 1. **`version`**:
```json
"version": "0.2.0"
```
- 这是 `launch.json` 文件的版本号，**`0.2.0`** 是目前常用的版本格式。它决定了配置文件的语法和结构。

### 2. **`configurations`**:
- **`configurations`** 是一个数组，其中每个元素定义了一个具体的调试配置。这里有一个调试配置，用于通过 **GDB** 调试 C/C++ 程序。

### 3. **`name`**:
```json
"name": "(gdb) Launch"
```
- **`name`** 是该调试配置的名称，在 VS Code 的调试配置列表中会显示这个名字。你可以通过这个名字识别并选择不同的调试配置。
- 在这个例子中，调试配置名称为 `"(gdb) Launch"`，表示这是通过 GDB 调试器启动的配置。

### 4. **`type`**:
```json
"type": "cppdbg"
```
- **`type`** 决定了调试器的类型。在这里，**`cppdbg`** 指的是 **C/C++** 调试器，通常用于调试 C/C++ 程序。

### 5. **`request`**:
```json
"request": "launch"
```
- **`request`** 决定了调试行为的类型。
  - **`launch`**：表示启动并运行程序进行调试。
  - **`attach`**：表示附加到一个正在运行的进程进行调试。
- 这里的 `"launch"` 表示启动一个新的进程来调试。

### 6. **`program`**:
```json
"program": "${workspaceFolder}/d2b.exe"
```
- **`program`** 指定要调试的可执行文件的路径。这个文件是你的 C/C++ 代码编译生成的可执行文件。
- **`${workspaceFolder}`** 是 VS Code 的一个内置变量，表示当前项目的根目录。这里，**`${workspaceFolder}/d2b.exe`** 表示要调试的可执行文件位于当前工作区的根目录下，文件名为 `d2b.exe`。

### 7. **`args`**:
```json
"args": []
```
- **`args`** 是一个数组，用于传递给程序的命令行参数。在这个例子中，没有传递参数，因此为空数组。
- 如果你的程序需要接受命令行参数，可以在此数组中添加参数。

### 8. **`stopAtEntry`**:
```json
"stopAtEntry": false
```
- **`stopAtEntry`** 是一个布尔值，表示调试器是否在程序的入口点（即 `main()` 函数）停止。
  - 如果设置为 `true`，调试器会在程序开始时暂停，等待用户输入调试命令。
  - 如果设置为 `false`，程序会直接运行到第一个断点或继续执行。
- 这里设置为 `false`，即调试时不会在程序入口处暂停。

### 9. **`cwd`**:
```json
"cwd": "${fileDirname}"
```
- **`cwd`** 代表调试期间的**当前工作目录**。
- **`${fileDirname}`** 是另一个 VS Code 内置变量，表示当前文件所在的目录。调试器将在这个目录下运行程序。
- 如果你需要程序在项目的特定目录中运行，可以在这里指定目录路径。

### 10. **`environment`**:
```json
"environment": []
```
- **`environment`** 是一个数组，用于设置调试过程中要传递的环境变量。
- 这里为空数组，表示没有设置额外的环境变量。如果你需要传递特定的环境变量，可以在此处添加配置，例如：
  ```json
  "environment": [
    {
      "name": "MY_ENV_VAR",
      "value": "value"
    }
  ]
  ```

### 11. **`externalConsole`**:
```json
"externalConsole": true
```
- **`externalConsole`** 决定调试期间是否在外部终端窗口中运行程序。
  - 如果设置为 `true`，程序会在外部命令提示符或 PowerShell 窗口中运行。
  - 如果设置为 `false`，程序的输出会显示在 VS Code 集成终端中。
- 这里设置为 `true`，表示程序会在一个单独的终端窗口中运行。

### 12. **`MIMode`**:
```json
"MIMode": "gdb"
```
- **`MIMode`** 决定了调试器使用的模式。在这里，使用的是 **`gdb`** 模式，因为 GDB 是用于调试 C/C++ 程序的 GNU 调试器。

### 13. **`miDebuggerPath`**:
```json
"miDebuggerPath": "gdb.exe"
```
- **`miDebuggerPath`** 指定 GDB 调试器的路径。在这个例子中，**`gdb.exe`** 是 GDB 的可执行文件，通常位于安装的 MinGW 或 WSL 中。
- 你需要确保路径正确，指向你系统中 GDB 的位置。例如，如果你使用 MinGW 编译器，路径可能是 `C:/mingw64/bin/gdb.exe`。

### 14. **`setupCommands`**:
```json
"setupCommands": [
    {
        "description": "Enable pretty-printing for gdb",
        "text": "-enable-pretty-printing",
        "ignoreFailures": true
    }
]
```
- **`setupCommands`** 是一个数组，定义了调试器启动时要执行的命令。
- 在这个例子中，命令是 **`-enable-pretty-printing`**，它启用了 GDB 的 pretty-printing 功能，用于更好地格式化和显示调试期间的复杂数据结构（如 STL 容器）。
- **`ignoreFailures: true`** 表示即使命令执行失败，调试过程也不会中止。

### 15. **`preLaunchTask`**:
```json
"preLaunchTask": "build C program"
```
- **`preLaunchTask`** 指定在启动调试之前执行的任务。通常是编译任务，确保程序在调试前已经编译好。
- 这里的 **`build C program`** 是指在 `tasks.json` 中定义的构建任务，它会在启动调试器之前自动编译 C 程序。

### 16. **`internalConsoleOptions`**:
```json
"internalConsoleOptions": "neverOpen"
```
- **`internalConsoleOptions`** 控制调试器是否打开内部调试控制台。
  - **`neverOpen`**：表示调试期间不会打开 VS Code 内部控制台。
  - 你可以选择 `"openOnSessionStart"` 或 `"openOnFirstSessionStart"` 来自动打开调试控制台。
  
---
<BR><BR><BR>
现在开始Debug程序玩玩  
在源代码编辑的界面的右边有行号，在行号左边单击一下就可以下断点，再点一下就是清除断点，我们在第16行下一个断点。

![point]({{ site.baseurl }}/assets/images/DEV_ENV/d0.png)

现在可以使用 F5 或 调试面板 来启动调试，并通过断点、变量观察、控制台输出等功能进行调试程序了。
按下F5, 系统开始编译代码，然后自动开启调试模式，此次看到Terminal中程序已经启动了，此时程序还没有运行到我们下的断点，我们在terminal中输入一个十进制数字比如12然后回车，此时程序就会跑到我吗下的断点了，如下图：

![point]({{ site.baseurl }}/assets/images/DEV_ENV/d1.png)

**在上图的左边我们可以看到断点上下文中所有变量的值，这就非常方便我们查找问题了，这点非常重要重要重要，不会调试程序的程序员是走不远的.**

在调试过程中，鼠标移动到变量的上方也可以直接显示当前变量的值。

## 相关的快捷键

在 Visual Studio Code (VS Code) 中进行调试时，使用快捷键可以极大地提升开发效率。以下是 VS Code 调试过程中常用的快捷键：

### 1. **开始调试 / 继续执行**
   - **F5**：启动调试或继续执行程序。如果程序在断点处暂停，按下 F5 会继续运行直到下一个断点或程序结束。

### 2. **单步执行**
   - **F10**：**Step Over（单步跳过）**。执行当前行代码，但不会进入函数内部，直接跳过函数调用。
   - **F11**：**Step Into（单步进入）**。执行当前行代码，并进入函数内部，逐行调试函数内部的代码。
   - **Shift + F11**：**Step Out（单步跳出）**。如果你已经进入了一个函数，按下 Shift + F11 会执行完该函数，返回调用该函数的地方。

### 3. **停止调试**
   - **Shift + F5**：停止调试。结束当前调试会话。

### 4. **重新启动调试**
   - **Ctrl + Shift + F5**：重新启动调试。程序会从头开始重新运行，断点依然有效。

### 5. **跳转到断点**
   - **Ctrl + Shift + F9**：删除所有断点。可以快速清除代码中设置的所有断点。
   - **F9**：切换断点。在光标所在行添加或移除断点。

### 6. **条件断点**
   - **Alt + F9**：添加条件断点。你可以设置一个条件表达式，当条件满足时断点才会触发。

### 7. **评估表达式**
   - **Ctrl + Shift + Y**：打开调试控制台。在调试过程中，可以在控制台中评估表达式，检查变量值和表达式结果。


这些快捷键涵盖了 VS Code 调试时的常见操作，如启动调试、单步执行、设置和管理断点等。熟练使用这些快捷键将极大提升调试的效率。