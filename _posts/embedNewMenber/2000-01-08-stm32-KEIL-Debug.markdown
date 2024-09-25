---
layout: post
title:  "Keil调试模式查看寄存器"
categories: embed1
---

要在 **Keil μVision** 的调试模式下查看和监控寄存器信息（如 RCC、GPIO 等外设寄存器），有几种不同的途径可以帮助您实时了解系统状态。下面，我将详细介绍如何通过调试模式查看寄存器的值，涉及到使用 **Peripherals 窗口**、**Watch 窗口** 和 **Memory 窗口**。

### 步骤概览：
1. 进入调试模式。
2. 使用 **Peripherals 窗口** 直接查看和监控外设寄存器。
3. 使用 **Watch 窗口** 手动添加寄存器地址监控。
4. 使用 **Memory 窗口** 查看寄存器的物理地址。

---

### 1. **进入调试模式**

首先，确保您已编译并下载了代码到目标设备，然后进入调试模式：

#### 步骤：
1. **编译项目**：按 **F7** 键或点击工具栏中的编译按钮。
2. **下载代码**：按 **Ctrl + F8** 或点击工具栏中的下载按钮，将代码下载到目标设备。
3. **进入调试模式**：
   - 点击 **Debug** 菜单，选择 **Start/Stop Debug Session**，或使用快捷键 **Ctrl + F5**。
   - 进入调试模式后，Keil μVision 界面会切换为调试视图，显示调试相关选项。


<a href="{{ site.baseurl }}/assets/images/keil/debug_0.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/keil/debug_0.png" alt="调试模式">
</a>

---

### 2. **使用 Peripherals 窗口查看寄存器(推荐)**

**Peripherals 窗口** 是 Keil μVision 提供的功能，允许您查看和监控与外设相关的寄存器，比如 **RCC**、**GPIO**、**USART** 等。此方法非常直观，适合查看外设的运行状态。

#### 步骤：
1. **进入调试模式后**，主菜单中会出现 **Peripherals** 菜单（非调试模式下此菜单不可用）。
   
2. **打开 Peripherals 菜单**：
   - 点击菜单栏中的 **Peripherals**，可以看到当前芯片支持的所有外设模块列表（如 RCC、GPIO、USART、Timers 等）。
<a href="{{ site.baseurl }}/assets/images/keil/debug_1.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/keil/debug_1.png" alt="打开目标寄存器">
</a>

3. **选择您要查看的外设寄存器**：
   - 比如要查看 RCC 寄存器，点击 **Peripherals** -> **RCC**，这会打开一个显示 RCC 寄存器的窗口。
   - 要查看 GPIO 的寄存器，点击 **Peripherals** -> **GPIO**，然后选择具体的端口（如 GPIOA、GPIOB、GPIOC 等）。
<a href="{{ site.baseurl }}/assets/images/keil/debug_2.png" target="_blank">
  <img src="{{ site.baseurl }}/assets/images/keil/debug_2.png" alt="看值">
</a>
4. **查看寄存器值**：
   - 在 RCC 或 GPIO 寄存器窗口中，您可以看到如 **RCC_APB2ENR**、**GPIOC_CRH**、**GPIOC_ODR** 等寄存器的当前值。

5. **实时监控寄存器变化**：
   - 当您单步调试代码或继续执行程序时，寄存器的值会动态更新。您可以实时监控这些值的变化，帮助调试程序的运行状态。
   - **手动修改寄存器**：在寄存器窗口中，您可以直接点击某个寄存器的值并进行修改，然后按回车，这会直接影响硬件的外设行为。

---

### 3. **使用 Watch 窗口手动添加寄存器监控(复杂不推荐)**

**Watch 窗口** 允许您手动输入变量或寄存器的地址，并监控其值。此方法灵活且适合精确监控某些重要的寄存器。

#### 步骤：
1. **打开 Watch 窗口**：
   - 在调试模式下，点击 **View** -> **Watch Windows** -> **Watch1**，或者按快捷键 **Alt + F5** 打开 Watch 窗口。

2. **手动输入寄存器地址**：
   - 由于 **Watch 窗口** 不支持直接输入结构体表示（如 `RCC->APB2ENR`），您需要输入寄存器的物理地址。以 STM32F103 为例，`RCC_APB2ENR` 的地址是 `0x40021018`。
   - 在 Watch 窗口的空白行中输入如下内容：
     ```c
     *(volatile unsigned int *)0x40021018
     ```
     - 按回车后，Keil μVision 将会显示 `RCC_APB2ENR` 寄存器的值。

3. **实时监控寄存器值**：
   - Watch 窗口会随着调试的运行状态实时更新寄存器的值。当您执行代码或单步调试时，寄存器的值将会动态变化。
   - 您还可以手动修改值，例如输入新值后按回车，这会立即更新寄存器的内容。

---

### 4. **使用 Memory 窗口直接查看寄存器地址(复杂不推荐)**

**Memory 窗口** 可以让您直接查看 MCU 内存中的数据，这包括寄存器的物理地址。您可以通过输入寄存器的地址，实时查看其当前值。

#### 步骤：
1. **打开 Memory 窗口**：
   - 在调试模式下，点击 **View** -> **Memory Windows** -> **Memory 1**，或者按 **Alt + F1** 打开 Memory 窗口。

2. **输入寄存器的地址**：
   - 例如，`RCC_APB2ENR` 寄存器的地址是 `0x40021018`，在 Memory 窗口的地址栏中输入 `0x40021018`，然后按回车。
   
3. **查看和修改寄存器值**：
   - 这时您可以看到 `RCC_APB2ENR` 寄存器的当前值。通过实时观察，您可以了解时钟启用的情况。
   - 还可以手动修改寄存器值，直接在内存窗口中输入新的值，修改寄存器。

---

### 总结

在 **Keil μVision** 的调试模式下查看寄存器信息有多种方法，具体取决于您的需求：

1. **Peripherals 窗口**：
   - 最直观、最方便的方法，可以查看和监控外设寄存器，并支持实时修改。
   
2. **Watch 窗口**：
   - 适合手动添加并监控特定寄存器，尤其是当您知道寄存器的物理地址时。输入地址后，可以实时监控并修改寄存器值。

3. **Memory 窗口**：
   - 可以直接访问 MCU 的内存，包括外设寄存器，适合在寄存器地址已知的情况下查看和修改其值。

通过以上方法，您可以在调试过程中实时查看和监控 STM32 或其他微控制器的寄存器，帮助您快速发现和解决问题。