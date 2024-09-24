---
layout: post
title:  "使用Keil的调试模式"
categories: embed1
---

使用 **Keil μVision** 的调试模式可以帮助你更好地理解和分析 STM32 程序的运行情况。通过调试，你可以实时查看寄存器的状态，监控外设的配置，特别是在像点亮 LED 这样简单的程序中，可以清楚地看到 GPIO 和 RCC 寄存器的变化。

下面是使用 **Keil μVision** 调试模式查看寄存器值的步骤，结合你的 **点亮 LED 程序** 作为例子。

### 1. 准备工作

确保你已经完成了以下工作：

- 已安装 **Keil μVision**。
- 已连接 **STM32 开发板**（如 STM32F103C8T6）。
- 编写好了点亮 LED 的程序，并可以通过 Keil 编译和下载到板子上。

### 2. 在 Keil 中编写点亮 LED 的程序

假设你使用的代码如下：

```c
#include "stm32f10x.h"  // STM32 标准外设库头文件

void GPIO_Config(void) {
    // 启用 GPIOC 时钟
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);

    // 配置 PC13 为推挽输出模式
    GPIO_InitTypeDef GPIO_InitStructure;
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;        // PC13
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;  // 推挽输出模式
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz; // 输出速度 50MHz
    GPIO_Init(GPIOC, &GPIO_InitStructure);
}

int main(void) {
    GPIO_Config();
    
    while (1) {
        // 点亮 LED（PC13 低电平）
        GPIO_ResetBits(GPIOC, GPIO_Pin_13);  
        for (int i = 0; i < 1000000; i++);  // 简单延时

        // 熄灭 LED（PC13 高电平）
        GPIO_SetBits(GPIOC, GPIO_Pin_13);
        for (int i = 0; i < 1000000; i++);  // 简单延时
    }
}
```

### 3. 编译代码

1. 打开 Keil μVision，创建一个新的项目，并添加你的代码文件。
2. 配置你的 **目标芯片**（如 STM32F103C8T6）。
3. 添加 **STM32 标准外设库** 到你的项目中（确保在 "Options for Target" -> "C/C++" 选项中包含正确的路径）。
4. 点击 **Build** 按钮（快捷键 `F7`）编译代码，确保没有错误。

### 4. 下载代码到开发板

1. 将你的 STM32 开发板通过 USB 连接到电脑。
2. 在 Keil μVision 中选择合适的下载器（如 ST-Link）。
3. 点击 **Download** 按钮（闪电图标），将程序下载到 STM32 开发板。

### 5. 进入调试模式

1. 在 Keil μVision 中，点击 **Debug** 菜单，然后选择 **Start/Stop Debug Session**，或按快捷键 `Ctrl + F5`。
2. 进入调试模式后，你可以看到程序暂停在 `main()` 函数的开头。

### 6. 添加和查看寄存器

在调试模式下，你可以通过以下步骤查看和监控寄存器的值，特别是与 **GPIO** 和 **RCC** 相关的寄存器。

#### 添加寄存器窗口

1. 在调试模式下，点击 **View** 菜单，选择 **Registers**。
   - 这样可以显示与当前芯片相关的所有寄存器组。
   
2. 在寄存器窗口中，你可以展开 **RCC** 和 **GPIO** 的寄存器组，查看如 **RCC_APB2ENR**、**GPIOC_CRL/CRH**、**GPIOC_ODR** 等寄存器的值。

#### 手动添加寄存器监控

如果你想手动查看某个特定寄存器的值，以下是操作步骤：

1. 点击 **View** 菜单，选择 **Watch Window**，或者按 `Alt + F5`。
2. 在 **Watch1** 窗口中，点击空白的行，输入寄存器的地址，或直接输入寄存器名，如：
   - `RCC->APB2ENR` （查看 GPIOC 时钟的使能状态）
   - `GPIOC->CRH` （查看 GPIOC 配置寄存器）
   - `GPIOC->ODR` 或 `GPIOC->BSRR`（查看或控制 GPIO 引脚状态）
3. 你可以通过 **地址** 或 **寄存器名** 添加监控。

### 7. 单步调试并查看寄存器变化

1. 点击 **Step**（单步执行，快捷键 `F11`），逐步执行程序代码。
2. 当你执行到以下行时：
   ```c
   RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
   ```
   可以在 **寄存器窗口** 或 **Watch 窗口** 中查看 **RCC_APB2ENR** 寄存器的变化，观察其中 GPIOC 时钟使能位（位 4）的状态是否被置为 `1`。

3. 继续执行以下代码：
   ```c
   GPIO_ResetBits(GPIOC, GPIO_Pin_13);  
   ```
   此时你可以查看 **GPIOC->BRR** 寄存器，确认 PC13 对应的位（位 13）是否被设置为 `1`（引脚状态被拉低，LED 点亮）。

4. 在调试时，你也可以通过断点（在行号旁右键，选择 **Insert/Remove Breakpoint**）暂停程序，实时查看寄存器的变化。

### 8. 查看和控制外设寄存器

在调试模式下，除了查看寄存器的值外，你还可以通过手动修改寄存器的值来控制外设。例如：

1. 你可以手动修改 **GPIOC->BSRR** 或 **GPIOC->BRR**，来强制改变 PC13 引脚的状态，查看 LED 是否响应这些操作。
2. 手动修改 **RCC_APB2ENR** 中的 GPIOC 使能位，查看是否影响 GPIO 外设的工作。

### 9. 退出调试模式

完成调试后，点击 **Debug** 菜单中的 **Stop Debug Session** 或者使用快捷键 `Ctrl + F5`，退出调试模式。

### 总结

通过使用 Keil μVision 的调试模式，你可以轻松地查看和监控 STM32 的寄存器状态，特别是在像控制 LED 这样的简单程序中。你可以：

1. 查看 **RCC** 和 **GPIO** 寄存器的实时值，确认时钟和 GPIO 配置是否正确。
2. 单步执行代码，观察寄存器的变化过程。
3. 手动修改寄存器值，实时调试硬件的行为。

这些操作有助于你深入理解代码和外设的工作原理，提高调试和开发的效率。如果有任何疑问或进一步的问题，欢迎继续讨论！