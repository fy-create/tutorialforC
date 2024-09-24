---
layout: post
title:  "库函数与直接读写寄存器比较"
categories: embed1
---

为了更好地比较 **库函数** 与 **直接读写寄存器** 的区别，下面我将通过一个具体的例子来说明这两种方式如何使用，并分析它们的优点和缺点。

### 示例场景：控制 GPIO 引脚

假设我们要控制 STM32 微控制器的 **GPIOC** 的 **PC13 引脚**（通常连接到板载 LED），将其配置为推挽输出模式并控制其状态（点亮和熄灭 LED）。

#### 1. 使用 **库函数** 的方式

首先，使用 **STM32 标准外设库** 的函数来完成这个任务。

##### 代码实现：
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
    // 初始化 GPIO
    GPIO_Config();
    
    while (1) {
        // 点亮 LED（PC13 低电平）
        GPIO_ResetBits(GPIOC, GPIO_Pin_13);  
        for (int i = 0; i < 1000000; i++);  // 延时

        // 熄灭 LED（PC13 高电平）
        GPIO_SetBits(GPIOC, GPIO_Pin_13);
        for (int i = 0; i < 1000000; i++);  // 延时
    }
}
```

##### 库函数的分解：
1. **RCC_APB2PeriphClockCmd**：启用 **GPIOC** 的时钟。
   ```c
   RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);
   ```

   这行代码使用 **RCC_APB2PeriphClockCmd** 函数，封装了对寄存器 **RCC->APB2ENR** 的写操作，启用了 GPIOC 时钟。

2. **GPIO_Init**：初始化 GPIO 引脚 PC13。
   ```c
   GPIO_InitTypeDef GPIO_InitStructure;
   GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;
   GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;
   GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
   GPIO_Init(GPIOC, &GPIO_InitStructure);
   ```

   这段代码使用 **GPIO_InitTypeDef** 结构体来描述引脚的配置（引脚号、模式、速度等），然后使用 **GPIO_Init** 函数对 GPIOC 的 PC13 引脚进行初始化。这个过程封装了对 **GPIO 配置寄存器（CRH）** 的写操作。

3. **GPIO_ResetBits** 和 **GPIO_SetBits**：控制引脚的电平状态。
   ```c
   GPIO_ResetBits(GPIOC, GPIO_Pin_13);  // 设置低电平，点亮 LED
   GPIO_SetBits(GPIOC, GPIO_Pin_13);    // 设置高电平，熄灭 LED
   ```

   使用库函数控制引脚的状态，内部封装了对 **GPIOC->BRR**（位复位寄存器）和 **GPIOC->BSRR**（位设置寄存器）的操作。

#### 2. **直接操作寄存器** 的方式

下面展示如何通过直接操作寄存器完成相同的功能。

##### 代码实现：
```c
#include "stm32f10x.h"  // STM32 标准外设库头文件

void GPIO_Config(void) {
    // 1. 启用 GPIOC 时钟 (设置 RCC_APB2ENR 寄存器的 GPIOC 使能位)
    RCC->APB2ENR |= (1 << 4);  // RCC_APB2ENR 的第 4 位是 GPIOC 时钟使能位

    // 2. 配置 PC13 为推挽输出模式
    // GPIOC 的 CRH 寄存器控制引脚 8 到 15 的配置
    GPIOC->CRH &= ~(0xF << 20);  // 清空对应的配置位，PC13 配置在 CRH 的第 20~23 位
    GPIOC->CRH |= (0x03 << 20);  // 设置为 50MHz 输出模式（GPIO_Speed_50MHz）
    GPIOC->CRH |= (0x02 << 22);  // 设置为推挽输出模式（GPIO_Mode_Out_PP）
}

int main(void) {
    // 初始化 GPIO
    GPIO_Config();
    
    while (1) {
        // 3. 点亮 LED（PC13 低电平）
        GPIOC->BRR = (1 << 13);  // 复位 PC13 引脚，输出低电平
        for (int i = 0; i < 1000000; i++);  // 延时

        // 4. 熄灭 LED（PC13 高电平）
        GPIOC->BSRR = (1 << 13);  // 设置 PC13 引脚，输出高电平
        for (int i = 0; i < 1000000; i++);  // 延时
    }
}
```

##### 直接操作寄存器的分解：
1. **启用 GPIOC 时钟**：
   ```c
   RCC->APB2ENR |= (1 << 4);
   ```

   直接通过 `RCC->APB2ENR` 寄存器的第 4 位来启用 GPIOC 的时钟。与库函数 `RCC_APB2PeriphClockCmd` 相比，这里直接操作寄存器。

2. **配置 GPIOC 引脚 PC13**：
   ```c
   GPIOC->CRH &= ~(0xF << 20);  // 清空 CRH 中控制 PC13 的位
   GPIOC->CRH |= (0x03 << 20);  // 配置输出速度 50MHz
   GPIOC->CRH |= (0x02 << 22);  // 配置推挽输出模式
   ```

   这里直接通过修改 **GPIOC 的 CRH 寄存器** 的第 20~23 位（控制 PC13 引脚）来完成引脚配置。与使用 `GPIO_Init` 库函数相比，这里是手动设置寄存器的位。

3. **控制 LED 的点亮和熄灭**：
   ```c
   GPIOC->BRR = (1 << 13);  // 复位 PC13，设置低电平，点亮 LED
   GPIOC->BSRR = (1 << 13); // 设置 PC13，输出高电平，熄灭 LED
   ```

   直接通过 `GPIOC->BRR` 和 `GPIOC->BSRR` 寄存器控制引脚的高低电平。与 `GPIO_ResetBits` 和 `GPIO_SetBits` 库函数相比，直接操作寄存器更加底层。

### 直接操作寄存器 vs 库函数：优缺点比较

#### 1. **可读性**

- **库函数**：库函数封装了底层寄存器操作，代码更加直观和简洁。比如 `GPIO_Init` 和 `GPIO_ResetBits` 使得开发者无需关心底层寄存器布局，专注于功能本身。
- **直接操作寄存器**：直接操作寄存器的代码较为晦涩，尤其对不熟悉 STM32 寄存器的开发者来说，可能需要更多时间理解代码的意义。

#### 2. **开发效率**

- **库函数**：开发效率更高。库函数提供了封装好的 API，减少了需要编写的代码量和查阅芯片手册的时间。
- **直接操作寄存器**：开发时需要查阅手册，熟悉寄存器的位布局。初次开发时可能需要更多时间理解和编写代码。

#### 3. **灵活性**

- **库函数**：库函数封装了常用的功能，但某些场景下可能不够灵活，无法完全满足特殊需求（例如某些特定的位操作可能需要自定义）。
- **直接操作寄存器**：直接操作寄存器提供了最大的灵活性，开发者可以对寄存器的每个位进行精确控制，适合特殊或自定义的需求。

#### 4. **可维护性**

- **库函数**：库函数具有较好的可维护性。如果需要移植到其他 STM32 芯片，库函数保持一致，适应不同的硬件平台。
- **直接操作寄存器**：直接操作寄存器的代码在移植时，可能需要重新确认寄存器的位定义是否一致。因此可维护性较差。

#### 5. **性能**

- **库函数**：

库函数封装了额外的逻辑，可能会有一些性能开销，尽管开销通常很小。对于大多数应用场景来说，性能差异可以忽略不计。
- **直接操作寄存器**：直接操作寄存器是最底层的操作，没有额外开销。在一些对性能有极高要求的场景下，直接操作寄存器可能更有优势。

### 总结

- **库函数**：适合大多数开发场景，尤其是快速开发、代码易读性和可维护性要求高的项目。它简化了底层操作，并且提供了较好的兼容性和移植性。
- **直接操作寄存器**：适合需要灵活控制硬件和追求极致性能的项目。它提供了最大的控制权，但开发复杂度高，且可移植性较差。

在实际开发中，建议根据项目的需求进行选择。如果项目需要快速开发和维护性高，推荐使用库函数；如果项目需要极致性能或精确的硬件控制，则可以考虑直接操作寄存器。