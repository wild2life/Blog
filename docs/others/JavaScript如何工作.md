## JavaScript 引擎

JavaScript 引擎说起来最流行的当然是谷歌的 V8 引擎了， V8 引擎使用在 Chrome 以及 Node 中，下面有个简单的图能说明他们的关系：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637834102051-8f932833-5de2-4ed7-8849-fe30c18b5718.png#clientId=u53a7d60e-92e2-4&from=paste&height=500&id=ucbabbe91&name=image.png&originHeight=1452&originWidth=1404&originalType=binary&ratio=1&rotation=0&showTitle=false&size=188069&status=done&style=none&taskId=u38bb0028-e1be-4c4b-8481-182f3bfd0f0&title=&width=483)
这个引擎主要由两部分组成:

- 内存堆：这是内存分配发生的地方
- 调用栈：这是你的代码执行时的地方

## 运行时

有些浏览器的 API 经常被使用到(比如说：setTimeout)，但是，这些 API 却不是引擎提供的。那么，他们是从哪儿来的呢？事实上这里面实际情况有点复杂。

所以说我们还有很多引擎之外的 API，我们把这些称为浏览器提供的 Web API，比如说 DOM、AJAX、setTimeout 等等。
然后我们还拥有如此流行的事件循环和回调队列。

## 调用栈

JavaScript 是一门单线程的语言，这意味着它只有一个调用栈，因此，它同一时间只能做一件事。
调用栈是一种数据结构，它记录了我们在程序中的位置。如果我们运行到一个函数，它就会将其放置到栈顶。当从这个函数返回的时候，就会将这个函数从栈顶弹出，这就是调用栈做的事情

```javascript
function multiply(x, y) {
  return x * y
}
function printSquare(x) {
  var s = multiply(x, x)
  console.log(s)
}
printSquare(5)
```

当程序开始执行的时候，调用栈是空的，然后，步骤如下：
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1637835046216-f698774c-7af3-49c2-b178-093cd6158915.png#clientId=u53a7d60e-92e2-4&from=paste&height=768&id=u46e47e41&name=image.png&originHeight=768&originWidth=1024&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62482&status=done&style=none&taskId=ua5bfa902-bd0e-416c-a0a9-b53a9f1d96a&title=&width=1024)
每一个进入调用栈的都称为**调用帧**。
在单个线程上运行代码很容易，因为你不必处理在多线程环境中出现的复杂场景——例如死锁。但是在一个线程上运行也非常有限制。由于 JavaScript 只有一个调用堆栈，当某段代码运行变慢时会发生什么?

## 并发与事件循环

调用栈中的函数调用需要大量的时间来处理，那么这会发生什么情况呢?例如，假设你想在浏览器中使用 JavaScript 进行一些复杂的图片转码。
你可能会问？这算什么问题？事实上，问题是当调用栈有函数要执行，浏览器就不能做任何事，它会被堵塞住。这意味着浏览器不能渲染，不能运行其他的代码，它被卡住了。如果你想在应用里让 UI 很流畅的话，这就会产生问题。
而且这不是唯一的问题，一旦你的浏览器开始处理调用栈中的众多任务，它可能会停止响应相当长一段时间。大多数浏览器都会这么做，报一个错误，询问你是否想终止 web 页面。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1639117241955-b65e0d84-d5f7-4352-9252-885053fc5f4a.png#clientId=u0046c11f-24e3-4&from=paste&height=288&id=udf7ff818&name=image.png&originHeight=288&originWidth=462&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65767&status=done&style=none&taskId=u54e67250-5ef2-4733-8977-d8c7845cbc5&title=&width=462)
这样看来，这并不是最好的用户体验，不是吗？
那么，如何在不阻塞 UI 的情况下执行复杂的代码，让浏览器不会不响应?解决方案就是异步回调。这将在“ JavaScript 如何工作”教程的第 2 部分中详细解释:“在 V8 引擎中，如何编写优化代码”。
