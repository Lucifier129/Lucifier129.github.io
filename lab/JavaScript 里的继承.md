# 漫谈 JavaScript里的对象、继承、作用域与其它

## 前言

工具：Babel 在线编译：https://babeljs.io/repl/

## 好用的对象字面量与进阶

「一切都是对象」是简洁概念，但是像下面这样创建实例太辛苦。

```javascript
var person = new Object()
person.firstName = 'Jade'
person.lastName = 'Gu'
person.name = 'Jade Gu'
```

我们想要更直观的方式，如：

```javascript
var person = {
	firstName: 'Jade',
	lastName: 'Gu',
	name: 'Jade Gu'
}
```

如你所见，`name`属性，无非是`firstName`与`lastName`的组合，而上面我却得重复两次，实在不便。

我们需要一个「计算属性」，在需要用到时，它自行根据已有属性计算出结果。

之前的 JavaScript 没有提供便捷的方法，我们得用下面这种冗长做法。

```javascript
var person = {
	firstName: 'Jade',
	lastName: 'Gu'
}

Object.defineProperty(person, 'name', {
	get: function() {
		return [this.firstName, this.lastName].join(' ')
	}
})

person.name // Jade Gu
```

只是写个姓名而已，竟然难以找到编写的舒服姿势，很难受是吧？

ES2015 带了了一些福音。让我们可以这样写：

```javascript
var person = {
	firstName: 'Jade',
	lastName: 'Gu',
	get name() {
		return [this.firstName, this.lastName].join(' ')
	}
}
```

经过 Babel 编译后是这个模样：

```javascript
'use strict';

var person = Object.defineProperties({
	firstName: 'Jade',
	lastName: 'Gu'
}, {
	name: {
		get: function get() {
			return [this.firstName, this.lastName].join(' ');
		},
		configurable: true,
		enumerable: true
	}
});
```

如果只写一个人名，那么上面的足够了；但实际上我们需要用到很多人名，每次都写`get name`，心很累。

我们要封装，对于人名做「最小数据关注量」。比如下面：

```javascript
function createPerson(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName,
        get name() {
            return [this.firstName, this.lastName].join(' ')
        }
    }
}

var person1 = createPerson('Jade', 'Gu')
var person2 = createPerson('Hehe', 'Da')
```

这个方式叫「工厂模式」。在这个场景中，它有两大不美。其一是`createPerson`名字冗长，其二是`get name`每次都会创建一个新的函数。

我们想要「最小打字量」跟「最小内存占用」。下面这种方式，更接近我们的目标：

```javascript
function Person(firstName, lastName) {
	this.firstName = firstName
	this.lastName = lastName
}

Object.defineProperty(Person.prototype, 'name', {
	get: function() {
		return [this.firstName, this.lastName].join(' ')
	}	
})

var person1 = new Person('Jade', 'Gu')
var person2 = new Person('Hehe', 'Da')
person1.name // "Jade Gu"
person2.name // "Hehe Da"
```

原型上的计算属性，也能影响到实例。当实例自身没有`name`属性时，JS 引擎查找原型上有没有，原型有个同名计算属性，被查找时也就启动了计算，然后返回结果。计算 name 的函数只需要一份，放在原型对象上就可以了。省了内存。

这样我们用`new`取代了`create`，`new Person`而不是`createPerson`，省了创建时的打字量。

但如你所见，在定义时，不够美观，感觉给`Person.prototype`做特殊处理，而不是很自然的定义`Person`。

`name`当然是`Person`很自然要拥有的属性之一，为什么要在定义时要显示地用别的函数(`Object.defineProperty`)？

所以，我们要用 ES2015 的语法

```javascript
class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
	}
	get name() {
		return `${this.firstName} ${this.lastName}`
	}
}
const person1 = new Person('Jade', 'Gu')
const person2 = new Person('Hehe', 'Da')
```

这下感受自然得多。再来感受一下`python`的语法：

```python
class Person(object):
	def __init__(self, firstName, lastName):
		self.firstName = firstName
		self.lastName = lastName
	@property
	def name(self):
		return '%s %s' % (self.firstName, self.lastName)

person1 = Person('Jade', 'Gu')
person2 = Person('Hehe', 'Da')
```

在 ES2015 出现之前，我觉得 python 的语法很干净。而现在，我更倾向于 ES2015。

在 python 中，只要用装饰符`@property`，就可以更自然的定义计算属性，将一个 name 方法调用当做属性来使用。

可惜在 ES2015 中，还没有装饰符。然而可期的是，ES2016 可能有。现在用 Babel 也可以书写了。

```javascript
function readonly(target, name, descriptor) {
	return {
		get: descriptor.value
	}
}

class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
	}
	@readonly
  	name() {
  		return `${this.firstName} ${this.lastName}`
  	}
}
const person1 = new Person('Jade', 'Gu')
const person2 = new Person('Hehe', 'Da')
```

好吧，看起来还不如`get name`。在目前这个简单场景内没有优势，但更复杂的情况下，装饰符能很好地分离复杂度，将那些固定的、与业务无关的特性处理工作，移出「定义点」，让「定义点」代码更干净与直观。

## 旨在共享数据的原型与作用域

如前一节所示，在 ES2015 之前，JavaScript 里定义最简单的人名也像「醉汉走路」。在七扭八歪的代码里，才终于达到了目标。

我们的目标是：更小打字量，更小内存消耗。

这意味着，我们要共享很多东西，才能抑制暴涨。

「继承与组合」是共享的两大方式。

共享的原理是：「世界终究是孙子们的」。不信，你看：

```javascript
function grandpa() {
    var grandpa_money = 1000000

    function father() {
        var father_money = 500000

        function me() {
            var my_money = 300000

            function child() {
                var child_money = 100000

                function grandson() {
                    var grandson_money = 100
                    grandson_money += child_money
                    grandson_money += my_money
                    grandson_money += father_money
                    grandson_money += grandpa_money
                    child_money = my_money = father_money = grandpa_money = 0
                    child = me = father = grandpa = null
                    console.log(grandson_money)
                    console.log(child_money, my_money, father_money, grandpa_money)
                    console.log(child, me, father, grandpa)
                }
                grandson()
            }
            child()
        }
        me()

    }
    father()
}
grandpa()

```

祖父拥有1000000，创造了父亲；

父亲拥有500000，创造了我；

我拥有300000，创造了儿子；

儿子拥有100000，创造了孙子；

孙子拥有100，把祖上的前都败光，并且欺师灭祖。

这就是 JavaScript 里的作用域链；根据创建时间与环境，确定可支配变量的范围。

正如我们自诩拥有的「五千年文化遗产」一样，最后创建的，最里层的`grandson`可支配祖上所有变量。

这样设计的好处是，如果我需要的数据已经在内存中，那么就不必重复创建。然后两个平级的函数之间无法互相访问对方的私有变量，就做到了「数据隐私控制」。

上面是作用域链层面的数据共享，下面看看原型链层面的数据共享。

```javascript
var Ancestors = {
	'人的成长': '生老病死',
	'地球位置': '世界中心',
	'地球形状': '天圆地方',
	'人类起源': '上帝造人'
}
var SomeoneA = Object.create(Ancestors)

Object.assign(SomeoneA, {
	'地球位置': '太阳系中心',
	'地球形状': '地球是圆的',
	'人类起源': '物种演化'
})

var SomeoneB = Object.create(SomeoneA)

Object.assign(SomeoneB, {
	'地球位置': 'https://zh.wikipedia.org/wiki/%E5%9C%B0%E7%90%83%E5%9C%A8%E5%AE%87%E5%AE%99%E4%B8%AD%E7%9A%84%E4%BD%8D%E7%BD%AE',
	'地球形状': 'https://www.google.com/search?q=%E5%9C%B0%E7%90%83%E5%BD%A2%E7%8A%B6&es_sm=122&tbm=isch&tbo=u&source=univ&sa=X&ved=0CB4QsARqFQoTCJv1iZvb4cYCFRIakgod5XAAyg&biw=1680&bih=912',
	'人类起源': '裸猿/走出非洲大草原'
})
```

原型的数据共享方式，类似于科学知识的发展。

你没有新发现，你所有知识都来自于前人的研究成果。

你有新发现，就以你的新发现为准。你推翻（删除）了你的新发现，还是以祖先的为准。

你访问`SomeoneB`能得到最新的数据，其中「人的成长」是在这里是颠扑不破的数据，还是沿用祖先的。

你要获取某一时期的数据，访问那个时期的对象即可。如此，获取数据以及数据之间的关系，就很便利了。

然而，知识可以共享与迭代，技能呢？

我如何在 JavaScript 中，写出简易的物种演化模型？

演化是一点点的积累，不是覆盖，不能每个物种都重新发明所有技能；所以，`class`就显得很重要

```javascript
//只会说呵呵哒的「人」
class H {
    constructor() {
        this.type = 'h'
    }
    say() {
        console.log('呵呵哒')
    }
}

class Hu extends H {
    constructor() {
            super()
            this.type = 'hu' //覆盖你
        },
        think() {
            return Math.random() > 0.5 ? '么么哒' : null
        }
    say() {
        //有想法说想法，没想法呵呵哒
        if (!this.think) {
            super.say()
        } else {
            console.log(this.mind)
        }
    }
}

class Hum extends Hu {
    constructor() {
        super()
        this.type = 'hum'
        this.memory = {}
    }
    remember(information) {
        this.memory[new Date().getTime()] = information
    }
    think(key) {
        return key ? this.memory[key] : super.think()
    }
}

class Human extends Hum {
    constructor() {
        super()
        this.type = 'human'
    }
    think(key) {
        var result = super.think(key)
        return result.includes('Miss Right') ? 'I Love You' : result
    }
}

```

技能的传承跟数据的传承，性质不同。

我们可能不再需要祖先的错误知识，但还是无法离开祖先遗传下来的呼吸能力。

## 结语

嗯，这就是我眼中的 Javascript ，一副醉汉模样，好在有 Babel ，终于快清醒过来了。

这一醉，就是20年。







