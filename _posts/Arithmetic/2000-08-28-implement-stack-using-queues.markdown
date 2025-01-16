---
layout: post
title:  "225. 用队列实现栈"
categories: arithmetic
---

[225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues)

### 题目描述：
实现一个用队列实现栈的功能。要求你只能使用队列的基本操作：`push_back`, `pop_front`, `empty`, 和 `front`。

### 提示：
- 队列可以使用C++中的`queue`容器或者其他自定义的队列结构。
- 队列需要实现栈的两项基本操作：
  - `push(x)`：将元素`x`压入栈中。
  - `pop()`：移除栈顶元素。
  
栈的特点是后进先出（LIFO），我们需要利用队列来模拟这一行为。

### 示例：
```
输入：
["MyStack", "push", "push", "top", "pop", "top"]
[[], [1], [2], [], [], []]

输出：
[null, null, null, 2, 2, 1]

解释：
MyStack myStack = new MyStack();
myStack.push(1);        // 栈是 [1]
myStack.push(2);        // 栈是 [1, 2]
myStack.top();          // 返回 2
myStack.pop();          // 返回 2，栈是 [1]
myStack.top();          // 返回 1
```

### 解题思路：
用两个队列模拟栈。栈的特性是“后进先出”（LIFO），而队列的特性是“先进先出”（FIFO）。为了实现栈的功能，我们可以利用两个队列来模拟：
1. **队列A**：用于存储栈中的所有元素。
2. **队列B**：辅助队列，用于辅助操作。

具体操作：
- **push(x)**：直接将元素`x`插入队列A中。
- **pop()**：
  - 将队列A中的元素逐个移到队列B中，直到队列A只剩下一个元素为止。
  - 移走队列A中的最后一个元素，即为栈顶元素。
  - 交换队列A和队列B，使得队列A中再次存储栈的所有元素。
- **top()**：
  - 将队列A中的元素逐个移到队列B中，直到队列A只剩下一个元素为止。
  - 这个剩下的元素即为栈顶元素，将它保存下来，之后再将它放回队列A。

使用队列的基本操作来模拟栈的功能，保证操作的正确性。

### C语言解答：

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;  // 存储队列元素的数组
    int front;  // 队列前端
    int back;   // 队列尾端
    int size;   // 队列当前大小
    int capacity;  // 队列最大容量
} Queue;

// 创建一个队列
Queue* createQueue(int capacity) {
    Queue *queue = (Queue *)malloc(sizeof(Queue));
    queue->capacity = capacity;
    queue->size = 0;
    queue->front = 0;
    queue->back = -1;
    queue->data = (int *)malloc(capacity * sizeof(int));
    return queue;
}

// 判断队列是否为空
int isEmpty(Queue *queue) {
    return queue->size == 0;
}

// 向队列添加元素
void enqueue(Queue *queue, int value) {
    if (queue->size < queue->capacity) {
        queue->back = (queue->back + 1) % queue->capacity;
        queue->data[queue->back] = value;
        queue->size++;
    }
}

// 从队列中移除元素
int dequeue(Queue *queue) {
    if (isEmpty(queue)) {
        return -1;
    }
    int value = queue->data[queue->front];
    queue->front = (queue->front + 1) % queue->capacity;
    queue->size--;
    return value;
}

// 获取队列的前端元素
int front(Queue *queue) {
    if (isEmpty(queue)) {
        return -1;
    }
    return queue->data[queue->front];
}

// 释放队列的内存
void freeQueue(Queue *queue) {
    free(queue->data);
    free(queue);
}

// 用队列实现栈
typedef struct {
    Queue* queue1;  // 主队列
    Queue* queue2;  // 辅助队列
} MyStack;

// 创建栈
MyStack* myStackCreate() {
    MyStack *stack = (MyStack *)malloc(sizeof(MyStack));
    stack->queue1 = createQueue(100);  // 假设栈最大容量为100
    stack->queue2 = createQueue(100);
    return stack;
}

// 压栈操作
void myStackPush(MyStack* stack, int x) {
    enqueue(stack->queue1, x);
}

// 弹栈操作
int myStackPop(MyStack* stack) {
    while (stack->queue1->size > 1) {
        enqueue(stack->queue2, dequeue(stack->queue1));
    }
    int popped = dequeue(stack->queue1);
    Queue* temp = stack->queue1;
    stack->queue1 = stack->queue2;
    stack->queue2 = temp;
    return popped;
}

// 获取栈顶元素
int myStackTop(MyStack* stack) {
    while (stack->queue1->size > 1) {
        enqueue(stack->queue2, dequeue(stack->queue1));
    }
    int top = front(stack->queue1);
    enqueue(stack->queue2, dequeue(stack->queue1));
    Queue* temp = stack->queue1;
    stack->queue1 = stack->queue2;
    stack->queue2 = temp;
    return top;
}

// 检查栈是否为空
int myStackEmpty(MyStack* stack) {
    return isEmpty(stack->queue1);
}

// 释放栈的内存
void myStackFree(MyStack* stack) {
    freeQueue(stack->queue1);
    freeQueue(stack->queue2);
    free(stack);
}

int main() {
    MyStack* obj = myStackCreate();
    myStackPush(obj, 1);
    myStackPush(obj, 2);
    printf("%d\n", myStackTop(obj));  // 输出 2
    printf("%d\n", myStackPop(obj));  // 输出 2
    printf("%d\n", myStackTop(obj));  // 输出 1
    myStackFree(obj);
    return 0;
}
```

### C++解答：

```cpp
#include <iostream>
#include <queue>
using namespace std;

class MyStack {
private:
    queue<int> q1, q2;  // 使用两个队列

public:
    // 压栈操作
    void push(int x) {
        q1.push(x);
    }

    // 弹栈操作
    int pop() {
        while (q1.size() > 1) {
            q2.push(q1.front());
            q1.pop();
        }
        int popped = q1.front();
        q1.pop();
        swap(q1, q2);  // 交换队列
        return popped;
    }

    // 获取栈顶元素
    int top() {
        while (q1.size() > 1) {
            q2.push(q1.front());
            q1.pop();
        }
        int topElem = q1.front();
        q2.push(topElem);
        swap(q1, q2);
        return topElem;
    }

    // 检查栈是否为空
    bool empty() {
        return q1.empty();
    }
};

int main() {
    MyStack obj;
    obj.push(1);
    obj.push(2);
    cout << obj.top() << endl;  // 输出 2
    cout << obj.pop() << endl;  // 输出 2
    cout << obj.top() << endl;  // 输出 1
    return 0;
}
```

### 总结：
- 通过使用两个队列来模拟栈的行为。
- 在C语言中，手动实现了队列的基本操作，并且使用队列来模拟栈的基本操作。
- 在C++中，利用标准库的`queue`容器，代码简洁易读，且利用`swap`函数交换队列，以实现栈的操作。