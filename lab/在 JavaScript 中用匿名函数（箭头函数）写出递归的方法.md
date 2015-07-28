# 在 JavaScript 中用匿名函数（箭头函数）写出递归的方法

## 前言

今天看 `Mozilla` 出品的 [ES6 In Depth](https://hacks.mozilla.org/category/es6-in-depth/) ,看到 [Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/)([中文翻译](http://bubkoo.com/2015/06/28/es6-in-depth-arrow-functions/))，其中一段让人讶异。

> Using arrows to pierce the dark heart of computer science

> 「使用箭头来刺穿计算机的黑暗心脏」

里面提到λ (lambda)表达式、阿隆佐·邱奇（Alonzo Church）、阿兰·图灵（Alan Turing），这些耳熟能详的名词原来与我们写 JavaScript 的人这么近，这激发了我极大的探索兴趣。

最后搜索到刘未鹏2006年的一篇文章《[康托尔、哥德尔、图灵——永恒的金色对角线(rev#2)](http://mindhacks.cn/2006/10/15/cantor-godel-turing-an-eternal-golden-diagonal/)》，奇妙的从 ES2015 延伸到了计算机的起源以及现代数学史的开端。


> 我看到了它，却不敢相信它。——康托尔

> 计算机是数学家一次失败思考的产物。——无名氏

原来我们轻易写下的每一个匿名函数，里面都蕴涵简单而又玄妙的数学原理。

原来用匿名函数实现的递归，动用了如此深刻的数学法则。

希望每个前端工程师都能认真阅读刘未鹏的文章，理解 `Y Combinator` 的 `JavaScript` 实现，对这门正在越变越好的语言抱以更多的敬畏之情，写起 ES2015 来或许有更好的编程体验。

注：本文部分代码将用 ES2015 编写，要跑起来可能得先用[Babel](https://babeljs.io/repl)编译为 ES5。

## 正文

我们用递归的方式实现阶乘函数，并且从朴素思路出发，最后一步步抵达`Y Combinator`。

首先，用最简单的命名函数递归方式，如下：

```javascript

function factorial(n) {
	return n < 2 ? 1 : n * factorial(n - 1)
}

factorial(3) // => 6
```

第二种方式，用变量缓存匿名函数的值：

```javascript
let fact = n => n < 2 ? 1 : n * fact(n - 1)

fact(4) // => 24
```

看，我们用匿名函数实现了递归，全剧终......


不，那只是 JS 引擎给我们的语法糖。实际上，所谓的「用 lambda 表达式写出递归」，不能在 lambda 定义完成之前直接引用自身。我们做如下假设：

```javascript
let fact = n => n < 2 ? 1 : n * fact(n - 1) //抛出错误： lambda 表达式引用错误
```

在这个基础上，继续探索我们的话题。

如果 lambda 表达式不能直接在函数体内显示引用自身，那么我们就得隐式地调用自身；因为我们不是用循环来模拟递归，我们就是要让 lambda 表达式反复执行一段相同代码。

其中一个策略是，将 lambda 表达式作为参数之一传入其自身。（函数也是值）

```javascript
//并不直接引用自身，引用 self 函数，调用时将自己传入即可
let fact = (self, n) => n < 2 ? 1 : n * self(self, n - 1)

//调用时，将自身作为第一个参数传入
fact(fact, 5) // => 120
```

OK,我们现在的确实现了具有递归效果的 lambda 表达式，但是，太难看了。没有人希望自己的阶乘函数有多余的参数，我们的目标是，`fact(n)`。

为了达到参数纯净化目的，我们可以包裹一层工厂函数，封装肮脏的冗余传参行为。

```javascript
//并不直接引用自身，引用 self 函数，调用时将自己传入即可
let fact = (self, n) => n < 2 ? 1 : n * self(self, n - 1)

//柯里化工厂函数，砍掉第一个参数
let factory = f => n => f(f, n)

//改造 fact
fact = factory(fact)

//参数纯净化
fact(6) // => 720
```

虽然现在我们达到了在调用时参数纯净化的目标，但仍有些不美。定义 `fact` 时，我们还在 `self(self, n - 1)`， 方式不够直观，我们期望能用下面的方式代替。

```javascript
//定义时就工厂化，生产出阶乘函数
let factory = self => n => n < 2 ? 1 : n * self(n - 1)
```

在函数被定义之后，我们才拿到其引用；也就是说，不可能在生产/创建一个函数时，把它自己传参进去。也就是说，对于上面的工厂函数 `factory` 而言，`self === factory(self)`永远不可能为真。不过，没关系。我们有软件工程里的黄金定律：

> 任何问题都可以通过增加一个间接层来解决。

既然无法让一个阶乘函数反复调用自身，那就个 `factory` 在需要时反复生产出虽然不是同一个，但效果等价的、新的阶乘函数。我们设想有以下特征的 `Y` 函数。

```javascript
//定义时就工厂化，生产出阶乘函数
let factory = self => n => n < 2 ? 1 : n * self(n - 1)

//暂时不管 Y 函数的内部实现，假定它能够返回正确的阶乘函数。
let fact = Y(factory)

fact(6) // => 720
```

在知道`Y`函数的功能与行为后，我们再根据已知条件，把它构造出来。

首先，`Y` 函数一定返回阶乘函数，那么它的可能形式如下，

```javascript
let Y = factory => {
    //Y 返回一个函数，其参数为 n，返回值为 n 的阶乘
    return n => { //求阶乘 }
}
```

其次，Y 一定调用了 `factory` 函数两次以上

```javascript
let Y = factory => {
    let magic // 魔术函数，可以从 factory 中取出阶乘函数
    return n => factory(magic(factory))(n)
}
```

`magic` 函数从 `factory` 取出新的阶乘函数，作为参数又传入 `factory`，这样创建出来的捷成函数，里面的 self 就是另一个阶乘函数。

到这里，我们只需要探究 magic 应该是什么代码形式。

```javascript
let Y = factory => {
    //从 magic 的调用方式来看，它接受 factory 作为参数，返回一个新的阶乘函数
    let magic = factory => n => factory(magic(factory))(n)
    return n => factory(magic(factory))(n)
}
```

可惜，上面复用 magic 函数，也只是语法糖，我们不能在 magic 定义完成前显式引用它。

诶？

那么就再增加中间层，隐式引用呗。说做就做。

```javascript
let Y = factory => {
    //就像之前做过的那样，把自己作为参数传入自己
    let magic = (self, factory) => n => factory(self(self, factory))(n)
    return n => factory(magic(magic, factory))(n)
}

//定义时就工厂化，生产出阶乘函数
let factory = self => n => n < 2 ? 1 : n * self(n - 1)

//测试我们构造出来的 Y 函数
let fact = Y(factory)

fact(7) // => 5040
```

惊！！，我们竟然成功了。虽然我们不知道 `magic` 魔术函数为什么是那样，但是，我们把它构造了出来。

同时，我们注意到，`magic` 的 `factory` 参数，好像没有存在的必要了，因为作用域内只存在唯一一个 `factory`。

```javascript
let Y = factory => {
    //砍掉多余的 factory 参数
    let magic = self => n => factory(self(self))(n)
    return n => factory(magic(magic))(n)
}

//定义时就工厂化，生产出阶乘函数
let factory = self => n => n < 2 ? 1 : n * self(n - 1)

//测试我们构造出来的 Y 函数
let fact = Y(factory)


console.log(fact(8)) // => 40320
```

神奇。`magic` 魔术函数果然很魔术，在外部 `magic(magic)` 自己调用自己， 在内部`self(self)`，就实现了递归？

同时，我们又注意到一点，`n => factory(magic(magic))(n)`的形式跟`n => factory(self(self))(n)` 似乎一模一样，仅仅是 `magic` 跟 `self` 名字不同。

突然觉悟了，前者不就是把 `magic` 自身作为参数传递近自身的返回函数吗？

`magic(magic)` 是把自己传参进去，那么`self === magic `。

原来 `self(self)` 自调用的函数，就是`magic`自身。

于是，我们得到：

```javascript
let Y = factory => {
    //砍掉多余的 factory 参数
    let magic = self => n => factory(self(self))(n)
    //返回阶乘函数
    return magic(magic)
}

//定义时就工厂化，生产出阶乘函数
let factory = self => n => n < 2 ? 1 : n * self(n - 1)

//测试我们构造出来的 Y 函数
let fact = Y(factory)

console.log(fact(9)) // => 362880
```

看到最终的产物，让人惊呆了。这是什么黑魔法？

仔细一看，原来它就是 lambda 演算的 JavaScript 实现

```javascript
// λ演算的写法
fix = λf.(λx.f(λv.x(x)(v)))(λx.f(λv.x(x)(v)))

// ES6的写法
const fix = f => (x => f(v => x(x)(v)))
               (x => f(v => x(x)(v)));
```

它不仅适用于阶乘函数的递归处理，任意递归工厂函数经过`Y`函数后，都能得到真正的递归函数。

```javascript
let count = Y(self => x => {
    console.log(x++);
    x < 100 && self(x)
})

count(0) // 输出0 ~ 99
```

## 尾声

在这篇文章中，我们有意识地用到的特性只有一个：

> 函数也是值，可以作为参数传递

我们利用它，让一个函数自己调用自己，然后不断美化美化、简化简化，竟然就构造出了`Y Combinator`。

然而：

* 从`函数也是值，可传参`中，反推出`Y Combinator`，不代表你有多厉害
* 只是站在巨人的肩膀上
* 背下`函数也是值，可传参`的定律，却不知道背后的原理就是`λ演算`
* 就像还没学到微积分的高中生自己开创了微积分初步
* 自比牛顿太幼稚，微积分原理与应用衍化成耳熟能详的说辞围绕着你
* 没有这些弱启发，买菜还在数指头
* 数学多美妙