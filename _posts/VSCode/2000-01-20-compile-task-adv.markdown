---
layout: post
title:  "高级编译过程自动化 tasks.json"
categories: vscode
---

我们以十进制转二进制的例子开始，先创建一个目录（也就是文件夹）在 Z:\C_Study\Digital2Bin 下：  
```
    Directory: Z:\C_Study\Digital2Bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
------         2024/9/19     10:19           1001 d2b.c
------         2024/9/19     10:16             48 README.MD
```

**VSCode是一个轻量级的高级IDE，他不仅仅是为了C/C++ 服务的，他利用丰富的插件体系几乎可以写任何语言。所以针对某一个语言比如C，他就需要有额外的配置，一旦配置好后，就可以通过快捷键编译，这样会节省很多时间.不要害怕配置过程，配置过程是程序员的必修课，将来会有更多更复杂的配置。**  

**开始配置**

打开VSCode，File->Open Folder... 导航到我们的 `Z:\C_Study\Digital2Bin` ,打开他。

转到Terminal小窗口，此时目录自动切换到了我们的工作目录，用mkdir 创建一个.vscode的字目录，用ls -Force 可以查看到他。

```
PS Z:\C_Study\Digital2Bin> mkdir .vscode


    Directory: Z:\C_Study\Digital2Bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d--h--         2024/9/19     13:26                .vscode


PS Z:\C_Study\Digital2Bin> ls -Force


    Directory: Z:\C_Study\Digital2Bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d--h--         2024/9/19     13:26                .vscode
------         2024/9/19     10:19           1001 d2b.c
------         2024/9/19     10:16             48 README.MD
```

进入到这个.vscode目录，然后创建一个tasks.json文件。  


| 命令                       | 说明         | 
| ------------------------- | ------------ |
| **cd .vscode**            | 进入目录      | 
| **cd ..**                 | 退回到上层目录 | 
| **echo "" > tasks.json**  | 创建文件      | 


```
PS Z:\C_Study\Digital2Bin> cd .vscode
PS Z:\C_Study\Digital2Bin\.vscode> echo "" > tasks.json
PS Z:\C_Study\Digital2Bin\.vscode> ls -Force


    Directory: Z:\C_Study\Digital2Bin\.vscode


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
------         2024/9/19     13:32             16 tasks.json


PS Z:\C_Study\Digital2Bin\.vscode> cd ..
PS Z:\C_Study\Digital2Bin> 

```

我们用这个覆盖tasks.json的内容

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build C program",
            "type": "shell",
            "command": "gcc",
            "args": [
                "-g",
                "${workspaceFolder}/d2b.c",
                "-o",
                "${workspaceFolder}/d2b.exe"
            ],
            "group": "build",
            "problemMatcher": [
                "$gcc"
            ],
            "detail": "Generated task for C compilation using GCC"
        }
    ]
}
```


#### **配置的各项说明：**

1. **`version`**:
   - `version: "2.0.0"` 表示 `tasks.json` 文件的格式版本。VS Code 目前使用 `"2.0.0"` 作为标准版本。

2. **`tasks`**:
   - 这是一个任务数组，包含了 VS Code 需要执行的任务配置。在这里，你定义了一个任务来编译 C 程序。

3. **`label`**:
   - 任务的名称为 `"build C program"`。当你执行任务时，可以通过这个名称来识别和选择任务。

4. **`type`**:
   - 这里的 `"type": "shell"` 表示这个任务是通过命令行（shell）运行的。

5. **`command`**:
   - 任务要执行的命令是 `gcc`，这是用于编译 C 代码的 GNU 编译器。

6. **`args`**:
   - 这是传递给 `gcc` 命令的参数。该任务将编译 `${workspaceFolder}/d2b.c` 文件，并将生成的可执行文件命名为 `${workspaceFolder}/d2b.exe`。
     - `${workspaceFolder}` 是一个 VS Code 内置变量，表示当前工作区的根目录。
     - `-g` 表示生成调试信息，方便后续调试。

7. **`group`**:
   - `"group": "build"`：这个任务属于 `"build"` 组。这意味着该任务可以作为构建任务执行，快捷键 `Ctrl + Shift + B` 会调用这个任务。

8. **`problemMatcher`**:
   - `"problemMatcher": ["$gcc"]` 表示使用 GCC 编译器的错误输出格式进行匹配，编译器的错误信息会自动在 VS Code 的问题面板中显示。

9. **`detail`**:
   - 这是描述任务的字段，用于进一步说明任务的用途。  

10. **其他的都是模版，要修改的只有2处**
```json
"args": [
               "-g",
               "${workspaceFolder}/d2b.c",  //HERE 改成自己的 *.c
               "-o",
               "${workspaceFolder}/d2b.exe" //HERE 改成自己预期的 *.exe
         ],
```

<BR>
至此，tasks.json 配置完成了，下面测试一下。

按下 Ctrl+Shift+B 后会出现build的选项，选择 `Build C Program` 就开始自动构建了。
同时在terminal小窗口中也能看到构建的具体命令如下：

```
 *  Executing task: gcc -g Z:\C_Study\Digital2Bin/d2b.c -o Z:\C_Study\Digital2Bin/d2b.exe 

 *  Terminal will be reused by tasks, press any key to close it. 
```

**如果程序有语法错误，这里会给出详细的出错信息，要相信这里的出错信息的准的，根据出错提示进一步修改代码，在继续编译，知道编译成功。
可以看到，用tasks.json自动构建的过程，跟我们之前手动用gcc构建的过程几乎是一致的。但是这是全自动的方式，容易修改，容易扩展，一旦源代码有多个.h .c时优势就体现了。**


在 Windows 系统下，Visual Studio Code（VS Code）的 终端窗口 是一个非常实用的内置工具，帮助开发者在编写代码的同时执行命令行操作。下面的命令是用`ls` 先看看当前目录下的文件，我们发现`d2b.exe` 已经产生了，现在就可以在这里直接运行他 `.\d2b.exe` .

```
PS Z:\C_Study\Digital2Bin> ls


    Directory: Z:\C_Study\Digital2Bin


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
------         2024/9/19     13:54           1001 d2b.c
------         2024/9/19     10:16             48 README.MD
------         2024/9/19     17:22         140325 d2b.exe


PS Z:\C_Study\Digital2Bin> .\d2b.exe
请输入一个十进制数字:1234
10011010010
PS Z:\C_Study\Digital2Bin> 
```