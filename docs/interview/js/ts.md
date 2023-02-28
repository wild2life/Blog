
[TS入门](https://ts.xcatliu.com/introduction/index.html)
专业流程平台Vue+TypeScript实践分享
项⽬是基于BPMN的规范来做的⼀个流程设计器，前端的技术框架基于Vue，使⽤ TypeScript 来编写
 
什么是TypeScript？
• TypeScript是⼀种由微软开发的开源、跨平台的编程语⾔。它是JavaScript的超集，最终会被编译 为JavaScript代码。
• TypeScript添加了可选的静态类型系统和很多尚未正式发布的ECMAScript新特性。
• TypeScript⽀持任意浏览器，任意环境，任意系统并且是开源的。
 
优缺点:
## 优点：
### 1.静态类型
我们都知道，JavaScript是⼀个弱类型，且是动态类型的脚本语⾔，什么变量都可以var⼀下，变   量还可以随便赋值，函数的返回值也可以是任意类型。导致代码报错是在运⾏阶段，⽽TypeScript则是静态类型，如果出错在代码编译时边会提⽰报错。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003563445-15698601-8168-4e40-abdd-649813cfbab1.png#align=left&display=inline&height=1160&name=image.png&originHeight=1160&originWidth=1734&size=1218046&status=done&style=none&width=1734)

### 2.⽅便阅读
类型系统实际上也是⼀个⾮常实⽤的⽂档，⼤部分的函数通过查看类型的定义就可以知道如何使
⽤，并且在VSCode（此处使⽤VSCode来代表所有代码编辑器）⾥⾯去编写TypeScript时，VSCode 会根据你当前的上下⽂，把你能⽤的类、变量、⽅法和关键字都提⽰出来，⼀⽬了然。不仅如此， TypeScript的特性还增强了VSCode的功能，包括代码补全、接⼝提⽰和点击跳转等等
如下图，我们可以很清晰的通过⿏标选中查看其属性的数据结构：
 ![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003670578-92a4f5b0-e391-4db4-a508-5e95e2e20d0d.png#align=left&display=inline&height=655&name=image.png&originHeight=1310&originWidth=1728&size=3097384&status=done&style=none&width=864)
### 3. 减少bug
随着的项⽬的迭代，我们可能会常常遗忘该变量或者函数的返回值类型，再加之JavaScript本⾝     具有的隐式转化，让我们对类型的判断更加的困难，难以控制。后期回顾数据类型⼤⼤影响开发效率，这⾥要加⼀个类型判断，那⾥也要进⾏⼀次类型转换。
如下图中，TypeScript的类型推断，可以让我们在编码时候⽴即发现⾃⼰的类型错误。我们已经   看到了VSCode等IDE都会做出类型检查，可以将很多类型错误直接提⽰出来，这⼀点在多⼈开发，和    维护⼤型项⽬时尤为重要。项⽬复杂，函数和变量繁多时经常出现⼀个⼈改了⼀点点东西，导致项⽬崩溃的情况，在TypeScript上⾯这种情况会⼤⼤减少。
但是值得注意的是，使⽤TypeScript也只能避免⼀部分错误，不能⼀劳永逸，平时遵守严格的编    码规范，配置ESLint，代码review，以及编写单元测试等环节依然很重要！

![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003688968-f3ea0cd7-11cf-4eac-b5aa-95301eb21707.png#align=left&display=inline&height=293&name=image.png&originHeight=586&originWidth=1862&size=782017&status=done&style=none&width=931)
 
### 4. 社区活跃
继Angular之后，React，Vue都相继开始⽀持TypeScript，尤其是2019年更是TypeScript爆发性     增⻓的⼀年，⼤部分第三⽅库都开始有提供给TypeScript的类型定义⽂件。
 
## 缺点：
### 1. 学习成本
[了不起的 TypeScript ⼊⻔教程](https://juejin.im/post/5edd8ad8f265da76fc45362c#heading-52)
TypeScript因为是在JavaScript的基础上扩展，所以真正的学习成本并不⼤，但毕竟是静态类    型，⽽且需要理解接⼝、泛型、类、枚举类型新的概念，对于习惯了JavaScript语⾔的⼈来说很难习      惯，导致了很多同学听⻅TypeScript的第⼀反应都是拒绝，尤其是在看了⽤TypeScript编写的项⽬    后。⽽且如果你想要在现有项⽬中充分体验TypeScript，你⼜将⾯临异常⾼昂的切换成本。
 
### 2. 开发速度降低
虽然TypeScript提供了any类型，但是使⽤它的同时也失去了TypeScript的优势，建议尽量少使⽤。虽然类型系统⾃带⽂档，可以省去很多编写注释的时间，但是为所有值填上类型过程有点痛苦。
我们每⼀个数据对象都需要先定义好数据类型，从⽽在需要的是要导⼊引⽤进⾏约束变量或者函数返
回值，如下图所⽰。接⼝定义：

![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003787460-bd496c1a-c372-4cdb-8d82-ac2301b67d19.png#align=left&display=inline&height=539&name=image.png&originHeight=1078&originWidth=1708&size=1922355&status=done&style=none&width=854)

接⼝引⼊：
 ![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003809285-64b05a5e-5517-45ff-a364-030cbd0b7928.png#align=left&display=inline&height=417&name=image.png&originHeight=834&originWidth=1668&size=1249396&status=done&style=none&width=834)
 
### 3. 部分第三⽅库的兼容
随着TypeScript的愈加⽕爆，很多依赖包都⽀持了TypeScript，但是依然有⼀部分还没有⽀持，如果你的项⽬刚好依赖了它们⽽你还想使⽤TypeScript的话，那你就需要为他添加⼀个d.ts⽂件才可以使⽤，添加的过程较为⿇烦.
 
### 4. 需要编译
JavaScript是标准，是可以直接在浏览器运⾏的，但TypeScript不能直接运⾏需要经过编译，⽣成JavaScript才可以运⾏。
 
## 我们对TypeScript的使⽤
### 1.  类型约束
对已确定的数据结构定义接⼝，在定义或者引⽤相同数据结构时引⽤接⼝类型约束，防⽌数据类型赋值和函数返回值错误。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003850142-0c75142f-45bb-4934-9350-e4f220068947.png#align=left&display=inline&height=566&name=image.png&originHeight=1132&originWidth=1644&size=1380264&status=done&style=none&width=822)

### 2.  枚举定义
对⼀些固定值使⽤枚举定义，可以在让其他同学在阅读代码、后期维护时可以⻅名知意，降低阅读代码成本。enum类型是对JavaScript标准数据类型的⼀个补充。   像C#等其它语⾔⼀样，使⽤枚举类型可以为⼀组数字或字符串赋予友好的名字。
 
 ![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003876216-63978e29-faed-4ce3-a233-cf3338e22b0e.png#align=left&display=inline&height=364&name=image.png&originHeight=728&originWidth=1696&size=690338&status=done&style=none&width=848)
 
### 3.   BPMN解析模式
我们在bpmn.js本⾝⾃⾝api解析对象与Vue的data层之间建⽴了⼀层数据解析层，并且会根据Vue 所需的data层数据结构对每个bpmn结构元素设计出较为合理的数据结构，以便于视图层渲染和复⽤。在此解析层所有的数据都会预先在typing.fixflow.d.ts⽂件中定义好，⽤来约束解析出来的结果是我们所必须数据结构。这样的设计可以避免⼀些数据层级过深导致某些属性解析缺失，或者在后期迭代的过程中数据结构变更，⽽未能将所有的引⽤更替。

 
![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003923670-0f205e05-adfb-4fdd-94bc-7cf43b523f6f.png#align=left&display=inline&height=735&name=image.png&originHeight=1470&originWidth=2120&size=2645828&status=done&style=none&width=1060) 
### 4.   class-style
由于vue对typescript⽀持的装饰器(库)，本项⽬引⽤vue-property-decorator(依赖vue-class- component)进⾏组件编写。通过该插件可以使⽤类的写法替换原本组件的对象写法，让组件的编写    更为优雅。
![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608003972539-d387ec9e-f282-49b3-bf73-238cfd131c17.png#align=left&display=inline&height=778&name=image.png&originHeight=1556&originWidth=2082&size=2533701&status=done&style=none&width=1041)
### 5.   Props类型约定
在封装组件时候会对传⼊的值进⾏类型约定，可以尽量避免因传⼊的值数据结构与组件内部处理不
⼀致，导致组件内渲染出错。
 ![image.png](https://cdn.nlark.com/yuque/0/2020/png/292785/1608004038846-0941f56c-7dd4-4f42-9d52-48519d46c31c.png#align=left&display=inline&height=626&name=image.png&originHeight=1252&originWidth=2308&size=2384614&status=done&style=none&width=1154)
 
### 6.    不⾜
a.       许多地⽅没有使⽤TS的新特性

b.       依旧有许多地⽅使⽤any类型
### 其他
#### 函数重载
##### 2个或2个以上的同名普通函数，但参数不⼀样，这时会出现函数重载的情况。TS中重载,通过为⼀个函数提供多个函数类型定义⾛多种功能⽬的
```basic
// 普通js 
function css(config){}
function css(config, value){} // 会替换上⾯的⽅法 
// TS 中 
function getInfo(name: string): string{} 
function getInfo(age: number): number{} 
function getInfo(str: any): any{} // 根据参数不同，⾛不同逻辑
```
#### 类⾥⾯的三种修饰符
```basic
public 共有 类内部、⼦类、类外部都可以访问 
protected 保护 类⾥、⼦类可以访问，类外部不可以访问 
private 私有 类⾥可以访问，⼦类和类外不可访问
```
#### TS抽象类：提供给其他类继承的基础类，必须实现抽象类继承，否则报错

```basic
abstract class Animal { // 基类 
	public name: string; 
  constructor(name: string) { 
  	this.name = name; 
  }
  abstract eat():any; // 定义⽅法 
} 
class Cat extends Animal {
  constructor(name: any) {
  	super(name) 
  }
  eat() {
  	xxxx 
  } 
} 
var c = new Cat('name')
c.eat() // 必须调⽤定义⽅法，否则报错
```
#### 接⼝的概念：对JSON约束 
```basic
interface FullName { 
  firstName: string; 
  lastName: string;
}
function printName(name: FullName) { // FullName 对应上⾯定义 
	console.log(name. firstName + name. lastName) 
}
```
#### 加密函数类型接⼝
```basic
interface encrypt {
	(key: string, value: string): string // 约束函数：传值和返回值，可做批量约束
}
var md5: encrypt = function(key: string, value: string):string { 
	return key + value; 
} 
md5('name', 'zhangsan')
```
#### '类'类型接⼝，常⽤，类似于抽象类  
```basic
interface Animal { // 实现这个接⼝，必须有name和eat这个标准 
  name: string; 
  eat(str: string):void; 
} 
class Dog implements Animal { 
	name: string; // 必须存在 
  constructor(name: string) { 
  this.name = name 
  } 
  eat() { // 必须存在 
  		11 xxxx 12
  } 
} 
var d = new Dog('wang') 
d.eat()
```
#### 接⼝的继承
```basic
interface Animal { 
	eat():void 
} 
interface Person extends Animal { 
	work():void 
} 
 // 接⼝继承接⼝
 class Web implements Person {
   public name: string;
   constructor(name: string) { 
   		this.name = name 
   } 
   eat(){ xxx }
   work() { xxx } 
 } 
 class Programer { 
   constructor(name: string) { 
   		super(name) 
   } 
   coding() { xxx } 
 } 
// extends继承普通构造函数可以直接调⽤私有函数coding 
// implements配合interface接⼝，定义eat和wrok⽅法
class Web extends Programer implements Person { 
	constructor(name: string) { 
  	super(name) 
  } 
  eat(){ xxx } 
  work() { xxx } 
}
```
#### interface 与 type 区别
[Typescript 中的 interface 和 type 到底有什么区别](https://juejin.im/post/5c2723635188252d1d34dc7d#heading-11)
相同点：
a.       都可以描述⼀个对象或者函数
b.       都允许拓展（extends）
c.        都可以被类实现（implements）
 不同点：

a.       type 可以声明基本类型别名，联合类型，元组等类型
b.       interface 能够声明合并
 
#### 泛型：可以⽀持不特定的数据类型，要求：传⼊的参数和返回的参数必须⼀致
```basic
 function getData<T>(value: T):T { 
 		return value // 返回值也必须是定义类型T 
 } 
 getData<string>('12345') // T是string，所以传参也必须是字符串 
 getData<number>('12345') // T是number，所以传参不是字符串，报错
```
 
#### 泛型类：最⼩堆算法
```basic
class MinClass<T> { 
  public list:T[] = []; 
  add(value: T):void { 
  	this.list.push(value) 
  } 
  min():T { 
    var minNum = this.list[0] 
    return minNum 
  } 
} 
var m1 = new MinClass<number>() // 定义T为number类型 
m1.add(1)// 传参也为数字类型 
mi.min()// 返回值也为数字类型
```
#### 泛型接⼝

```basic
// 第⼀种写法： 
interface config { 
	<T>(value:T):T; 
} 
var getData:config = function<T>(value:T):T { 
	return value 
} 
getData<string>('张三') // 通过 
getData<string>(123) //报错 
// 第⼆种写法： 
interface config<T> { 
	(value:T):T; 
} 
function getData(T)(value:T):T { 
	return value
} 
var myData:config<string> = getData 
myData('abc') // 通过 
myData(123) // 报错
```
 
#### 类型编程
##### （   [TypeScript  进阶⸺类型编程](https://bytedance.feishu.cn/docs/doccnFqnqcIlHHa6TGqukjD9zAh)）：通过TypeScript操作符，把类型当作参数进⾏逻辑处理，从⽽获得新的类型的过程称为类型编程。其中⼤部分都是通过泛型来引⼊，因此泛型是TS类型编程的基础。
#### 声明类型参数有三种：泛型<>、in映射、infer待推断
#### 同态转换：同态转换会复制原有的所有属性的所有修饰词，在此基础上允许额外的增加新的属性修饰词。两个代数结构保持了结构不变的映射，则称这两个代数结构是同态的。TS中类型索引和类型映射         是同态的。
```basic
 type Common<T> = { [K in keyof T]: T[K] }
```
条件分布式
当满⾜条件，
a.       存在联合类型作为输⼊
b.       有条件运算extends
c.        联合类型所指的⼊参必须是裸类型（没有被其他类型包裹）
```basic
(A | B | C) extends U ? X : Y = (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)  
(A & B & C) extends U ? X : Y = (A extends U ? X : Y) & (B extends U ? X : Y) & (C extends U ? X : Y)
```


官⽅类型递归例⼦：
```basic
 type LinkedList<T> = T & { next: LinkedList<T> }; 
class Person { 
	name: string 
} 
let people: LinkedList<Person>; 
let s = people.name; 
let s = people.next.name; 
let s = people.next.next.name;
```


# 综合考虑
在开始专业流程平台项⽬之前我们主要是基于以下⼏点考虑
1.       新项⽬。从头开发，没有重构⽼代码的成本。

2.       对新技术的尝试。组内⼈员对新技术的热忱度都很⾼，希望通过⼀个项⽬来实践TypeScript。
3.       多⼈协作。专业流程平台项⽬庞⼤，且BPMN⽂件解析的数据需要来回传递和修改。
4.       不同功能模块之间数据获取和传递。对于类型系统的需求⼤，每个⼈来编写时都可以避免类型错误，并且⽅便获取参数类型进⾏操作。
5.       代码规范化。所以代码越规范越好，TypeScript便于理解，并配有详细的注释。
6.       接⼝返回值固定类型。可以更好的进⾏类型推断。
7.       项⽬持续迭代和维护。使⽤TypeScript可以⽅便⼤家阅读和后续扩展、重构。

# 结论
个⼈认为专业流程平台项⽬接⼊TypeScript是⼀个⾮常好的技术⽅案，⽽且从 Vue2.5 之后，Vue 对 TypeScript有更好的⽀持。在本项⽬的实践开发过程中，我觉得以下⼏点是需要注意并遵守的：
a.       对定义的变量、参数以及函数的返回值进⾏接⼝类型约束
b.       对与⼀些需要固定的值，可以使⽤枚举给其⻅名知意的变量名
c.        在使⽤class⻛格封装组件时候，我们在props传值时需要对传⼊组件内部值进⾏类型约定
d.       能不⽤any类型定义变量类型时，我们则不⽤
e.       我们尽量使⽤TS带了的新特性，让代码更为的优雅，例如：可选链 ?. 、双问号操作符 ?? 等
 
是否使⽤TypeScript，我们认为在做出选择之前，你需要认真的衡量⼀下投⼊产出⽐， TypeScript带来的优势是否对当前的项⽬有很⼤提升，是否值得花费⼤量的时间去对现有项⽬进⾏重     构，值得注意的⼀点是，不管TypeScript最终会不会被应⽤到项⽬中，你都应该学会掌握它。
最后，对于取舍问题，我们感觉是：如果你的项⽬是⼤型项⽬，第三⽅库，或者其他需要持续维护的项⽬，上TypeScript吧；如果你的项⽬是活动，分享⻚⾯，等短周期并且不需要持续维护的项
⽬，想⽤哪个⽤哪个。
 
# 视频回顾

[专业流程平台Vue+TypeScript实践分享.mp4](https://www.feishu.cn/space/file/boxcnNIDZfaPYLA1u1IML2NVC7U)
[专业流程平台Vue+TypeScript实践分享.pdf](https://www.yuque.com/attachments/yuque/0/2020/pdf/292785/1608013141405-43111e8e-88ff-4ba7-b1bc-b53437308737.pdf)


#### ts小技巧
[中文文档](https://cy188.github.io/2021/04/09/2-TypeScript%E4%B8%AD%E6%96%87%E6%96%87%E6%A1%A3-4.2/)

**Partial**
将传入的属性变为可选项
```
interface IPeople {
    title: string;
    name: string;
}

const people: Partial<IPeople> = {
    title: 'Delete inactive users'
};
```
**Record<K, T>**
类型参数K提供了对象属性名联合类型，类型参数T提供了对象属性的类型
```
interface Person {
  name: string;
}

// 将x, y 作为Person的key
type Peoples = Record<"x" | "y", Person>;

const P: Peoples = {
    x: {
        name: '张三'
    },
    y: {
        name: '李四'
    }
}
```
**Readonly **
把传入的类型变为只读状态
```
interface Person {
  name: string;
  age: number;
}

const p: Readonly<Person> = {
    name: '张三',
    age: 22
}

p.name = '李四'; // 无法分配到 "name" ，因为它是只读属性
```
**Required**
把传入的类型变为必填状态
```
interface Person {
    name?: string;
    age?: number;
}

const p: Required<Person> = {
    name: '张三',
    age: 22
}
```
**Pick<T, S>**
在 T 中，过滤掉非 S 的类型
```
interface IPerson {
    name: string;
    age: number;
}

type TP = Pick<IPerson, 'name'>;

const p: TP = {
    age: 22, // 对象文字可以只指定已知属性，并且“age”不在类型“TP”中
    name: '张三'
}
```
**Omit<T, K>**
在 T 中删除对应的 K
```
interface IPerson {
    name: string;
    age: number;
}

type TP = Omit<IPerson, 'age'>;

const p: TP = {
    name: '张三'
}
```
**Exclude<T, U>**
该工具类型能够从类型T中剔除所有可以赋值给类型U的类型
```
type T0 = Exclude<"a" | "b" | "c", "a">;
// 相当于 type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// 相当于 type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
// 相当于 type T2 = string | number
```
**Extract<T, U>**
“Extract<T, U>”工具类型与“Exclude<T, U>”工具类型是互补的，它能够从类型T中获取所有可以赋值给类型U的类型
```
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
// 相当于 type T0 = 'a';

type T1 = Extract<string | (() => void), Function>;
// 相当于 type T1 = () => void;

type T2 = Extract<string | number, boolean>;
// 因为没有交集，相当于 type T2 = never;
```
**ReturnType**
该工具类型能够获取函数类型T的返回值类型
```javascript
// string
type T0 = ReturnType<() => string>;

// { a: string; b: number }
type T1 = ReturnType<() => { a: string; b: number}>;
```
