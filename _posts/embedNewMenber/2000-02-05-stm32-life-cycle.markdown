---
layout: post
title:  "STM32生命周期"
categories: embed1
---

**好的，让我们更加深入、详细地解释 STM32 上电后是如何一步一步运行起来的。**

---

## **第一部分：上电与复位**

### **1. 上电**

当你给 STM32 微控制器接通电源时，电源电压从 0V 上升到工作电压（通常为 3.3V）。在这个过程中，芯片内部的电源管理电路开始工作。

### **2. 复位**

**上电复位（Power-On Reset，POR）：**

- STM32 芯片内置了复位电路，当检测到电源电压上升到可用水平时，复位电路会产生一个复位信号，确保芯片从一个已知的初始状态开始运行。

**复位引脚（NRST）：**

- STM32 还提供了一个外部复位引脚 NRST，可以通过外部电路（如复位按钮）手动触发复位。

**复位后的状态：**

- 所有的寄存器和外设都会被复位到默认值。
- 时钟系统恢复到默认配置，使用内部高速时钟（HSI，8MHz）。
- 所有 GPIO 引脚被设置为默认模式（输入浮空）。
- 中断被禁用。

---

## **第二部分：启动模式选择**

### **1. BOOT 引脚**

STM32 的启动模式由两个引脚决定：BOOT0 和 BOOT1（部分芯片只有 BOOT0）。

**引脚配置：**

- **BOOT0**：通常连接到高电平（VDD）或低电平（GND）。
- **BOOT1**：在部分芯片上存在，同样用于启动模式选择。

### **2. 启动模式**

根据 BOOT 引脚的电平组合，STM32 可以从不同的存储区域启动：

- **主 Flash 存储器启动**（通常的启动方式）：
  - **BOOT0 = 0**（接地）。
  - 芯片从主 Flash 存储器的起始地址（`0x08000000`）开始执行程序。

- **系统存储器启动**：
  - **BOOT0 = 1**（连接到高电平）。
  - 芯片从系统存储器（`0x1FFFF000`）启动，运行内置的 Bootloader，可以通过串口、USB 等方式下载程序。

- **SRAM 启动**（部分芯片支持）：
  - **特殊的 BOOT 引脚配置**。
  - 从内部 SRAM（`0x20000000`）启动，通常用于调试。

**注意：**

- 对于初学者，我们一般将 BOOT0 引脚接地，让芯片从主 Flash 启动。

---

## **第三部分：向量表和复位向量**

### **1. 向量表（Vector Table）**

向量表是一个存储在固定内存地址的表格，包含了一系列指针，指向处理器的中断服务程序（ISR）和异常处理程序。

**向量表的位置：**

- **主 Flash 启动时**：向量表位于 `0x08000000`。
- **系统存储器启动时**：向量表位于 `0x1FFFF000`。
- **SRAM 启动时**：向量表位于 `0x20000000`。

### **2. 向量表的内容**

- **第 0 项**：初始栈指针（Initial Stack Pointer，ISP）。
  - 存放栈的起始地址。
- **第 1 项**：复位处理函数（`Reset_Handler`）的地址。
  - 芯片复位后会跳转到这个地址执行。
- **后续项**：各种中断和异常的处理函数地址。

### **3. 处理器读取向量表**

- **加载栈指针：**
  - 处理器从向量表的第 0 项读取初始栈指针的值，加载到栈指针寄存器（SP）。
- **跳转到复位处理函数：**
  - 处理器从向量表的第 1 项读取 `Reset_Handler` 的地址，跳转执行。

---

## **第四部分：执行启动代码（Startup Code）**

### **1. 启动代码的作用**

启动代码是一段汇编或 C 语言编写的代码，负责初始化处理器和系统环境，为执行用户的 `main()` 函数做准备。

### **2. 启动代码的主要步骤**

#### **步骤 1：禁用中断**

- 在初始化过程中，为防止中断干扰，首先禁用所有中断。

#### **步骤 2：设置系统时钟**

- **默认时钟：**
  - STM32 上电后，默认使用内部高速时钟（HSI，8MHz）。
- **切换到外部时钟（可选）：**
  - 如果需要更高精度或更高频率，可以配置使用外部高速时钟（HSE），如外部晶振。
- **配置 PLL（锁相环）：**
  - 使用 PLL 将时钟频率提升到更高，以满足系统需求。
- **切换系统时钟源：**
  - 将系统时钟从 HSI 切换到 PLL 输出。

**示例：**

```c
void SystemInit(void) {
    // 启用外部高速时钟 HSE
    RCC->CR |= RCC_CR_HSEON;
    // 等待 HSE 准备就绪
    while(!(RCC->CR & RCC_CR_HSERDY));
    // 配置 PLL，以 HSE 为输入，倍频
    RCC->CFGR |= RCC_CFGR_PLLSRC_HSE | RCC_CFGR_PLLMUL9;
    // 启用 PLL
    RCC->CR |= RCC_CR_PLLON;
    // 等待 PLL 准备就绪
    while(!(RCC->CR & RCC_CR_PLLRDY));
    // 切换系统时钟到 PLL
    RCC->CFGR |= RCC_CFGR_SW_PLL;
    // 等待切换完成
    while((RCC->CFGR & RCC_CFGR_SWS) != RCC_CFGR_SWS_PLL);
}
```

#### **步骤 3：初始化数据段和 BSS 段**

- **数据段（.data）：**
  - 包含已初始化的全局变量和静态变量。
  - 启动代码需要将这些变量的初始值从 Flash（只读存储器）复制到 RAM（读写存储器）。
- **BSS 段（.bss）：**
  - 包含未初始化的全局变量和静态变量，默认值为 0。
  - 启动代码需要将 BSS 段对应的 RAM 区域清零。

**示例（伪代码）：**

```c
// 链接脚本中定义的符号
extern unsigned int _sidata; // Flash 中 .data 段的起始地址
extern unsigned int _sdata;  // RAM 中 .data 段的起始地址
extern unsigned int _edata;  // RAM 中 .data 段的结束地址
extern unsigned int _sbss;   // RAM 中 .bss 段的起始地址
extern unsigned int _ebss;   // RAM 中 .bss 段的结束地址

void Reset_Handler(void) {
    unsigned int *src, *dst;
    
    // 初始化 .data 段
    src = &_sidata;
    dst = &_sdata;
    while (dst < &_edata) {
        *dst++ = *src++;
    }
    
    // 清零 .bss 段
    dst = &_sbss;
    while (dst < &_ebss) {
        *dst++ = 0;
    }
    
    // 调用 SystemInit() 配置系统时钟
    SystemInit();
    
    // 调用主函数
    main();
}
```

#### **步骤 4：调用 `main()` 函数**

- 启动代码完成初始化后，最后调用用户的 `main()` 函数，开始执行用户程序。

---

## **第五部分：进入用户程序（`main()` 函数）**

### **1. 初始化外设**

在 `main()` 函数中，首先需要初始化所需的外设。

**示例：**

- **启用外设时钟：**

  ```c
  // 启用 GPIOC 时钟
  RCC->APB2ENR |= RCC_APB2ENR_IOPCEN;
  ```

- **配置 GPIO：**

  ```c
  // 将 PC13 配置为通用推挽输出，最大速度 2MHz
  GPIOC->CRH &= ~(0xF << (4 * 5)); // 清除 CNF 和 MODE 位（第 13 引脚）
  GPIOC->CRH |= (0x2 << (4 * 5));  // 设置 MODE=10（输出 2MHz），CNF=00（通用推挽）
  ```

### **2. 配置中断（如果需要）**

- **设置中断优先级：**

  ```c
  // 设置中断优先级（示例）
  NVIC_SetPriority(EXTI15_10_IRQn, 2);
  ```

- **使能中断：**

  ```c
  // 使能外部中断
  NVIC_EnableIRQ(EXTI15_10_IRQn);
  ```

- **编写中断服务函数（ISR）：**

  ```c
  void EXTI15_10_IRQHandler(void) {
      // 处理中断事件
      if (EXTI->PR & EXTI_PR_PR13) {
          // 清除中断标志
          EXTI->PR |= EXTI_PR_PR13;
          // 执行中断处理代码
      }
  }
  ```

### **3. 主循环**

在主循环中，编写应用逻辑，使程序持续运行。

**示例：**

```c
int main(void) {
    // 外设初始化（如上所述）
    
    while (1) {
        // 切换 PC13 的电平，实现 LED 闪烁
        GPIOC->ODR ^= (1 << 13);
        // 简单的延时（不精确）
        for (volatile int i = 0; i < 100000; i++);
    }
}
```

---

## **第六部分：外设时钟的使能**

### **1. 为什么需要使能外设时钟**

- STM32 的外设时钟默认是关闭的，以节省功耗。
- 在使用某个外设之前，必须通过 RCC 模块启用其时钟。

### **2. 如何使能外设时钟**

- **RCC 寄存器：**

  - **APB2ENR**：用于启用 APB2 总线上的外设时钟，如 GPIOA~GPIOG、ADC1、USART1 等。
  - **APB1ENR**：用于启用 APB1 总线上的外设时钟，如 USART2、I2C1、TIM2 等。
  - **AHBENR**：用于启用 AHB 总线上的外设时钟，如 DMA、FSMC 等。

- **示例：**

  ```c
  // 启用 GPIOC 时钟
  RCC->APB2ENR |= RCC_APB2ENR_IOPCEN;
  // 启用 USART1 时钟
  RCC->APB2ENR |= RCC_APB2ENR_USART1EN;
  ```

---

## **第七部分：中断系统**

### **1. 中断的基本概念**

- **中断**：当特定事件发生时，处理器暂停当前执行的程序，转而执行中断服务程序（ISR）。
- **中断优先级**：STM32 支持多级中断优先级，优先级高的中断可以打断优先级低的中断。

### **2. 配置中断**

- **配置外部中断（以按键为例）：**

  ```c
  // 配置 SYSCFG 寄存器，连接外部中断线到对应的 GPIO 引脚（STM32F1 系列使用 AFIO）
  RCC->APB2ENR |= RCC_APB2ENR_AFIOEN;
  AFIO->EXTICR[3] &= ~(0xF << 4); // 清除 EXTI13 的配置
  AFIO->EXTICR[3] |= (0x2 << 4);  // 将 EXTI13 映射到 GPIOC（0x2）

  // 配置 EXTI 寄存器
  EXTI->IMR |= EXTI_IMR_MR13;     // 使能中断线 13
  EXTI->FTSR |= EXTI_FTSR_TR13;   // 触发方式为下降沿触发

  // 使能 NVIC 中对应的中断
  NVIC_EnableIRQ(EXTI15_10_IRQn);
  ```

### **3. 编写中断服务程序（ISR）**

- 中断服务程序的名称必须与启动文件中的中断向量表一致。

**示例：**

```c
void EXTI15_10_IRQHandler(void) {
    if (EXTI->PR & EXTI_PR_PR13) {
        // 清除中断挂起位
        EXTI->PR |= EXTI_PR_PR13;
        // 执行中断处理，例如切换 LED 状态
        GPIOC->ODR ^= (1 << 13);
    }
}
```

---

## **第八部分：系统时钟的详细配置**

### **1. 时钟树概述**

- STM32 的时钟系统非常灵活，可以从多个时钟源选择系统时钟，并通过各种分频器获得所需的频率。

### **2. 时钟源**

- **内部高速时钟（HSI）：**
  - 内部 RC 振荡器，频率为 8MHz，精度较低。
- **外部高速时钟（HSE）：**
  - 外部晶振或时钟信号，频率可以是 4~16MHz，通常为 8MHz 或 12MHz，精度高。
- **内部低速时钟（LSI）：**
  - 32kHz 的内部 RC 振荡器，用于独立看门狗等。
- **外部低速时钟（LSE）：**
  - 32.768kHz 的晶振，用于实时时钟（RTC）。

### **3. PLL（锁相环）**

- **作用：**
  - 将输入时钟频率倍频，生成更高频率的系统时钟。
- **配置：**
  - 选择 PLL 的输入源（HSI/2 或 HSE）。
  - 设置 PLL 倍频系数（STM32F1 系列支持 2~16 倍）。

### **4. 时钟配置示例**

- **目标：**
  - 使用 8MHz 的 HSE，配置 PLL 倍频到 72MHz。

**步骤：**

1. **启用 HSE：**

   ```c
   RCC->CR |= RCC_CR_HSEON;
   while (!(RCC->CR & RCC_CR_HSERDY));
   ```

2. **配置 Flash 等待状态：**

   - 在高频下，需要增加 Flash 的等待状态，以保证读取稳定。

   ```c
   FLASH->ACR |= FLASH_ACR_PRFTBE;           // 启用预取缓冲
   FLASH->ACR &= ~FLASH_ACR_LATENCY;
   FLASH->ACR |= FLASH_ACR_LATENCY_2;        // 设置 2 个等待状态（对于 48~72MHz）
   ```

3. **配置 PLL：**

   ```c
   RCC->CFGR |= RCC_CFGR_PLLSRC_HSE;         // 选择 HSE 作为 PLL 输入
   RCC->CFGR |= RCC_CFGR_PLLMULL9;           // 设置 PLL 倍频系数为 9（8MHz * 9 = 72MHz）
   ```

4. **启用 PLL：**

   ```c
   RCC->CR |= RCC_CR_PLLON;
   while (!(RCC->CR & RCC_CR_PLLRDY));
   ```

5. **切换系统时钟到 PLL：**

   ```c
   RCC->CFGR |= RCC_CFGR_SW_PLL;
   while ((RCC->CFGR & RCC_CFGR_SWS) != RCC_CFGR_SWS_PLL);
   ```

6. **配置 AHB、APB 总线分频器：**

   ```c
   RCC->CFGR |= RCC_CFGR_HPRE_DIV1;          // AHB 时钟不分频，72MHz
   RCC->CFGR |= RCC_CFGR_PPRE1_DIV2;         // APB1 时钟分频为 2，36MHz（不能超过 36MHz）
   RCC->CFGR |= RCC_CFGR_PPRE2_DIV1;         // APB2 时钟不分频，72MHz
   ```

---

## **第九部分：内存映射和存储器组织**

### **1. 内存空间划分**

- **Flash（程序存储器）：**
  - 起始地址：`0x08000000`。
  - 用于存储程序代码和常量数据。
- **SRAM（数据存储器）：**
  - 起始地址：`0x20000000`。
  - 用于存储全局变量、栈、堆等。

### **2. 链接脚本**

- **作用：**
  - 指定程序的存储区域，定义各个段（如 .text、.data、.bss）的起始地址和大小。
- **示例（简化版）：**

  ```ld
  /* 链接脚本示例 */
  MEMORY
  {
      FLASH (rx) : ORIGIN = 0x08000000, LENGTH = 64K
      RAM (rwx) : ORIGIN = 0x20000000, LENGTH = 20K
  }

  SECTIONS
  {
      .text :
      {
          *(.isr_vector)    /* 中断向量表 */
          *(.text*)         /* 代码段 */
          *(.rodata*)       /* 只读数据 */
      } > FLASH

      .data : AT (ADDR(.text) + SIZEOF(.text))
      {
          _sdata = .;
          *(.data*)
          _edata = .;
      } > RAM

      .bss :
      {
          _sbss = .;
          *(.bss*)
          *(COMMON)
          _ebss = .;
      } > RAM
  }
  ```

### **3. 程序的存储**

- **代码段（.text）：**
  - 存放在 Flash 中，从 `0x08000000` 开始。
- **初始化数据段（.data）：**
  - 运行时存放在 RAM 中，从 `0x20000000` 开始。
  - 启动时需要从 Flash 中复制到 RAM。
- **未初始化数据段（.bss）：**
  - 运行时存放在 RAM 中，初始值为 0。

---

## **第十部分：总结**

- **上电复位后，STM32 通过读取向量表，获取初始栈指针和复位处理函数地址。**
- **执行启动代码，完成系统时钟配置和内存初始化。**
- **调用 `main()` 函数，开始执行用户程序。**
- **在 `main()` 中，初始化外设、配置中断，进入主循环。**
- **整个过程中，涉及到时钟系统、内存组织、中断机制等核心概念。**

---

## **对初学者的建议**

- **深入理解每个步骤的原理，有助于掌握 STM32 的工作机制。**
- **多阅读官方手册（如《STM32F10xxx Reference Manual》），获取详细信息。**
- **实践是关键，动手编写和调试代码，加深对概念的理解。**
- **不要被复杂的细节吓倒，循序渐进，逐步掌握。**

---

