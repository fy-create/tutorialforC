---
layout: post
title:  "LED 呼吸灯，并使⽤ 按键1 控制 LED 开关"
categories: embed1
---

<script type="text/javascript" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
</script>


• ⽬标：制作⼀个 LED 呼吸灯，并使⽤ 按键1 控制 LED 开关
• 提⽰：利⽤ TIM 的 PWM 输出实现
• 问题：
◦ 配置 TIM 的⼤致流程是怎样的？
◦ 此时控制 LED 的 GPIO 需要配置为什么模式？为什么？
◦ 简要介绍 PWM 的输出构成以及如何计算相应参数



### 一、配置TIM的基本流程

要配置STM32的定时器（TIM）用于PWM输出，可以按照以下流程进行：

1. **使能TIM外设时钟**：
   - 使用`RCC_APB1PeriphClockCmd()`或`RCC_APB2PeriphClockCmd()`启用定时器的时钟。例如，TIM2是挂在APB1总线上的，使用`RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE);`。

2. **配置定时器的时基单元**：
   - 使用`TIM_TimeBaseInit()`设置定时器的预分频器（Prescaler）、自动重装载值（ARR）等时基参数。
   - 预分频器控制定时器的计数频率，自动重装载值决定PWM周期。

3. **配置PWM模式**：
   - 使用`TIM_OCInitTypeDef`结构体初始化输出比较（Output Compare, OC）单元。
   - 使用`TIM_OCxInit()`配置对应的PWM通道（x = 1, 2, 3, 4等），并设置占空比。
   - 设置`TIM_OCMode = TIM_OCMode_PWM1`来选择PWM模式1。

4. **启用定时器**：
   - 通过`TIM_Cmd()`函数启用定时器。

5. **启用相应的PWM通道**：
   - 通过`TIM_OCxPreloadConfig()`来使能输出比较寄存器预装载功能。
   - 调用`TIM_Cmd()`开启定时器。

#### 配置流程代码示例：
```c
void TIM2_PWM_Init(uint16_t arr, uint16_t psc) {
    RCC_APB1PeriphClockCmd(RCC_APB1Periph_TIM2, ENABLE); // 使能TIM2时钟

    TIM_TimeBaseInitTypeDef TIM_TimeBaseStructure;
    TIM_OCInitTypeDef TIM_OCInitStructure;

    // 配置定时器基本参数
    TIM_TimeBaseStructure.TIM_Period = arr;              // 自动重装载值
    TIM_TimeBaseStructure.TIM_Prescaler = psc;           // 预分频器
    TIM_TimeBaseStructure.TIM_ClockDivision = TIM_CKD_DIV1;
    TIM_TimeBaseStructure.TIM_CounterMode = TIM_CounterMode_Up;
    TIM_TimeBaseInit(TIM2, &TIM_TimeBaseStructure);

    // 配置PWM模式
    TIM_OCInitStructure.TIM_OCMode = TIM_OCMode_PWM1;     // PWM模式1
    TIM_OCInitStructure.TIM_OutputState = TIM_OutputState_Enable;
    TIM_OCInitStructure.TIM_Pulse = 0;                   // 初始占空比为0
    TIM_OCInitStructure.TIM_OCPolarity = TIM_OCPolarity_High;

    TIM_OC1Init(TIM2, &TIM_OCInitStructure);             // 通道1 (PA0)
    TIM_OC1PreloadConfig(TIM2, TIM_OCPreload_Enable);    // 使能预装载寄存器
    TIM_ARRPreloadConfig(TIM2, ENABLE);                  // 使能自动重装载
    TIM_Cmd(TIM2, ENABLE);                               // 启动TIM2
}
```

---

### 二、控制LED的GPIO模式配置

- **GPIO配置模式**：`Alternate Function Push-Pull`（复用推挽输出模式）。
  
- **原因**：
   1. **PWM信号输出**：LED的亮度是通过PWM信号控制的，GPIO引脚需要配置为复用功能，因为定时器TIM的PWM信号是通过该引脚输出的，而不是简单的GPIO高低电平控制。
   2. **推挽模式**：推挽输出确保引脚可以驱动足够的电流去点亮LED。在推挽模式下，输出能够驱动输出高电平和低电平两种状态。
   
   因此，将GPIO设置为`Alternate Function Push-Pull`模式，可以确保GPIO引脚能够正确输出定时器生成的PWM信号来控制LED。

#### GPIO配置代码：
```c
GPIO_InitTypeDef GPIO_InitStructure;

// LED (PA0) 配置为推挽输出，复用功能（PWM输出）
GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;
GPIO_InitStructure.GPIO_Mode = GPIO_Mode_AF_PP;
GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;
GPIO_Init(GPIOA, &GPIO_InitStructure);
```

---

### 三、PWM的输出构成及参数计算

#### 1. **PWM输出构成**：
PWM信号是一种周期性的数字信号，其输出由两个主要参数决定：
- **频率（Frequency）**：PWM信号的频率决定信号周期的长短。PWM周期 = `1 / 频率`。
- **占空比（Duty Cycle）**：占空比是PWM信号中高电平时间与周期的比值，决定LED亮暗。占空比越大，LED越亮；占空比越小，LED越暗。

#### 2. **PWM参数的计算**：

**1）定时器频率（Timer Frequency）**：
定时器的频率由系统时钟频率（F\_clk）和预分频器（Prescaler, PSC）决定：
\[ \text{Timer Frequency} = \frac{F\_clk}{PSC + 1} \]

**2）PWM频率**：
PWM的频率由定时器频率和自动重装载值（ARR）确定：
\[ \text{PWM Frequency} = \frac{\text{Timer Frequency}}{ARR + 1} \]

**3）占空比**：
占空比由比较值（CCR，Capture/Compare Register）控制：
\[ \text{Duty Cycle} = \frac{CCR}{ARR + 1} \]

- **比较值（CCR）**：这个值决定PWM信号的高电平持续时间。当计数器达到CCR时，输出信号从高电平切换为低电平。

#### 3. **PWM参数示例计算**：

假设系统时钟频率 \( F\_clk = 72 \, \text{MHz} \)，我们希望PWM频率为1kHz，占空比可以调节，则：

- 设定预分频器 \( PSC = 71 \)，这样定时器频率为：
  \[ \text{Timer Frequency} = \frac{72 \, \text{MHz}}{71 + 1} = 1 \, \text{MHz} \]
  
- 为了得到1kHz的PWM频率，自动重装载值 \( ARR \) 应该为：
  \[ \text{PWM Frequency} = \frac{1 \, \text{MHz}}{ARR + 1} \Rightarrow ARR = 999 \]
  
- 如果需要50%的占空比，比较值 \( CCR \) 应该为：
  \[ \text{Duty Cycle} = \frac{CCR}{ARR + 1} \Rightarrow CCR = \frac{999 + 1}{2} = 500 \]

因此，设定ARR为999，PSC为71，可以得到1kHz的PWM信号，而通过改变CCR值可以动态调整占空比，从而控制LED的亮暗变化。