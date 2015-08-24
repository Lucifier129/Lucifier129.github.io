# ESNEXT 原生框架范式探究（01）

## 前言

托付于 `Node.js` 和 `HMTL5`，`JavaScript` 发展得越来越快。

几年前，就有人提出「[你或许不需要 jQuery](https://github.com/HubSpot/youmightnotneedjquery)」 ，近期也有「[你可能不需要 underscore](https://github.com/reindexio/youmightnotneedunderscore)」以及 Hax 的 [nodash](https://github.com/hax/nodash) 仓库。

正当风靡的 ReactJs 提出 Flux 架构后，社区涌现出许多不同版本跟理念的 Flux 实现，目前风头最劲的要数基于 `ES7+` 的 [redux](https://github.com/gaearon/redux)，它的理念除了`hot loading`之外，最重要的就是`pure function`(纯函数)。

作为一门语言，javascript 的自理能力不断增强；那么势必存在一种组织范式，使得不用框架，也能像之前有框架辅助那样，写出模块化、组件化以及语义清晰的代码。

我对原生框架范式的思考，会在[esnext-framework](https://github.com/Lucifier129/esnext-framework)仓库里积累。

所谓的原生框架范式，主旨是「用理念代替 API；如非必要，勿增 API」。我目前的探索方式是，在 [babel](https://babeljs.io/) 的 `stage = 0` 模式提供的一切便利下，寻找一个舒适的前端编程模式；每一个范式探究，都以一个`TODOMVC DEMO`为产物和体现。

本文是小试牛刀的[范式01]。

## es6.template 视图模板组件化

在 Mozilla 的 [ES6 In Depth: Template strings](https://hacks.mozilla.org/category/es6-in-depth/) 文章里提到:

> Template strings are no replacement for Mustache and Nunjucks, partly because they don’t have built-in syntax for loops or conditionals. 

然后演示了如何用 `Tagged templates` (标签模板提供模板字符串的循环和条件语句)，看起来自己打自己脸，好不快乐。

我认为，es6.template 没有提供循环和判断语句，并不是大问题，因为 `${expression}` 语法支持任何 javascript 语句，甚至可以嵌套 template 字符串；我们自己写循环，操作空间更强。

在 reactjs 的 jsx 语法里也可以写任意纯 js 语句，我们早就见怪不怪，并且乐得其所。与其自己制造方言，倒不如用纯 js 语法。

所以，我认为 `es6.template` 起码可以作为轻量级 web 应用的视图模板的选择之一。

它的大概写法如下：

```javascript
//component/todo.js
export default data => {
	let { completed, time, id, title } = data
	return `
<li class="${ completed }" data-id="${ id }" data-helper="todo" title="${ time }">
	<div class="view">
		<input class="toggle" type="checkbox" ${ completed ? 'checked' : '' }>
				<label>${ title }</label>
				<button class="destroy"></button>
	</div>
	<input class="edit">
</li>
	`
}
```

`component/todo.js`返回一个渲染字符串函数，在 `component/todos.js` 循环展开，这样实现组合作用。

```javascript
import todo from 'component/todo'

export default data => {
	return `
<ul id="todo-list">
	${ data.map(todo).join('') //纯 js 循环语句 }
</ul>
	`
}
```

## es7.functionBind 与 函数式 helper

对 `es7.functionBind` 暂不了解的可以点击[这里](https://github.com/zenparsing/es-function-bind)。这个特性，算不上强大，只是语法糖性质，编译到 ES3 环境也能正常运行。

然而，有了`::`语法，我们的代码可以变得更富有表现力，我们的关注点更能纯粹。甚至，我们整个思维模式都可能因其而改变。

虽然 js 模块化开发已经有几年的历史，但直到今天，我们也还在继续命名空间思路。`$` 与 `_` 符号四处可见。[trine](https://github.com/jussi-kalliokoski/trine) 开始做出改变，它用 `::` 取代 `_` ，让代码更整洁，显得更函数式。我们可以在这条道路上，走得更远。

一直以来，往原型链上添加属性和方法，都是很诱惑的事情；它的副作用是覆盖原生行为与污染全局变量带来的不确定性。如果用上 `::` 的话，我们就可以保持 `this method` 的顺序和格式，得到整洁的外观，而又不会污染代码运行时的确定性。

我们只是从` this.method( )`变成`this::method()`，别提多方便了。

我们可以这样编写我们的函数方法：

```javascript
//type helper
export let isArray = function() {
    return Array.isArray(this)
}

export let isFunction = function() {
    return Object.prototype.toString.call(this) === '[object Function]'
}

export let isObject = function() {
    return Object.prototype.toString.call(this) === '[object Object]'
}

export let isString = function() {
    return Object.prototype.toString.call(this) === '[object String]'
}

export let isNumber = function() {
    return Object.prototype.toString.call(this) === '[object Number]'
}

export let isBoolean = function() {
    return Object.prototype.toString.call(this) === '[object Boolean]'
}

```

然后这样调用它们：

```javascript
import { isArray, isFunction, isString, isObject } from 'helper'

'hello world'::isString() //true
[1, 2, 3, 4]::isObject() // false
(123123)::isNumber() // true
```

看起来，任意 js 数据类型，都具备了类型检测方法一般。这种模式，我称之为 `helper`，像原型方法一样编写，用 `::` 调用。

`helper` 增强了 js 语言，以无副作用或者少副作用的方式，提供给所有数据类型有用的自定义方法。它的魔力，不知上面所示，我们再来看看下面的例子：

```javascript
//jqueryHelper.js
import $ from 'jquery'
import { isString } from './helper'

let helper = {}
export default helper

Object.keys($.fn).forEach(key => {
	helper[key] = function(...args) {
		if (this::isString()) {
			return $(String(this))[key](...args)
		}
		return $(this)[key](...args)
	}
})
```

我们把所有 `$.fn` 方法导出为 `helper` 模式，于是可以像下面那样使用：

```javascript
import { appendTo, attr } from 'jqueryHelper'

//这个做法过时了
$('body').html('<h1>hello world</h1>')

//酷酷的
'<h1>hello world</h1>'::appendTo('body')

//原生dom api 冗长啰嗦
document.getElementsByTagName('script')[0].getAttrubite('type')

//酷酷的
'script'::attr('type')
```

jquery 简化了 dom 操作，`::` 简化了命名空间，代码更整洁，更声明式。对于 `underscore` 库，也可以做相同的 `helper` 转换，可用方法更丰富了。

你以为这样就完了？

函数式风格，终究还是要在函数下手，看看下面这种：

```javascript

//柯里化
export let currying = function(first) {
    return (...args) => {
        this(first, ...args)
    }
}

//反柯里化
export let uncurrying = function() {
    return (context, ...args) => {
        this.apply(context, ...args)
    }
}

//管道流式拼接
export let pipe = function(next = noop) {
    if (this::isFunction()) {
        return (...args) => {
            return next(this(...args))
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::pipe(cur))
    }

}

//promise 流式拼接
export let then = function(next) {
    if (this::isFunction) {
        return (...args) => {
            return Promise.resolve(this(...args)).then(next)
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::then(cur))
    }
}
```

然后，我们的函数就可以像这样拼接起来了:

```javascript

//直接将数据模型的反应函数与渲染函数绑定起来，数据发生改变，视图就做出反应
let onAction = [::this.model.onAction, ::this.render]::pipe()

//::this.model.onAction === this.model.onAction.bind(this.model)

//事件代理，事件类型与代理 selectory 存放在 key 里，事件回调存放在 value 里
let events = {
			'change : #new-todo'(e) {
			    //onAdd 为 helper，this 值为 e.target，从中获取到新的 todo title
			    //onAdd 返回 {type: 'add',title: value }
			    //onAction 接受一个 action 对象，根据 action 的 type 做不同反应
			    //类似于 reactjs 的 flux 模式
				e.target::onAdd::pipe(onAction)()
				
				//e.target::onAdd === onAdd.bind(e.target)
			},
			'change : #todo-list .edit'(e) {
			    //事件绑定变得干净
				e.target::onEdited::pipe(onAction)()
			},
			'keyup : #new-todo'(e) {
				if (e.keyCode === ENTER_KEY) {
				    //可维护性强，增加业务逻辑，只是 pipe 多一个 helper 纯函数
					e.target::onAdd::pipe(onAction)()
				}
			},
			'dblclick : #todo-list label'(e) {
				e.target::onEditing()
			},
			'keyup : #todo-list .edit'(e) {
				let keyCode = e.keyCode
				if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
					e.target::onEdited()
				}
			},
			'change : #todo-list .toggle'(e) {
				e.target::onToggle::pipe(onAction)()
			},
			'click : #todo-list .destroy'(e) {
				e.target::onRemove::pipe(onAction)()
			},
			'click : #clear-completed'(e) {
				onAction({
					type: 'clear'
				})
			},
			'change : #toggle-all'(e) {
				onAction({
					type: 'toggleAll',
					completed: e.target.checked
				})
			}
		}
```

就这样，通过函数式 helper ，我们的代码更清晰。

## 逻辑分组

在[范式01]中，代码根据性质做了分组与分类

- component 组件化的视图
- helper 函数式纯逻辑
- directive 将数据渲染到视图的自定义指令
- method 响应 dom 操作，从视图中获取数据，返回数据对象的纯函数
- model 数据模型类，响应 method 返回的数据对象
- app 出口模块类，协调上面四个代码类型，拼接业务逻辑。


## 尾声

以上就是小试牛刀的[范式01]，其代码仓库地址是：https://github.com/Lucifier129/esnext-framework/tree/patten1

在 examples 文件夹里可以找到 todos-vanillajs 与 todos-jquery 查看示例代码。

欢迎大家一起来维护这个项目，寻找更好的前端编程范式。