# 用MVC模式组织代码

- Author: [Jade Gu]
- Date: 2015.03.07

## 前言

`MVC`这个名词，在前端领域还处于意义不明确的阶段。打着`MV*`名号的框架层出不穷，概括`MVC`的文章也让人应接不暇。然而究竟什么是`MVC`，那些作者各执一词。

[winter] 做了下`正本清源`的工作：

- [MVC是任人打扮的小姑娘]
- [谈谈UI架构设计的演化]

既然`经典MVC模式`与前端的`view.onclick`天然的互斥，不再适用；既然大家都在打扮`MVC`，本文也尝试重新演绎。介绍一种以`Model`、`View`与`Controller`为命名的代码组织方案。

这个方案给我带来了良好的编程体验，并且几乎立即可以应用在所有项目中，不管历史遗留的代码多么庞杂，新增的业务需求都能按照新方案进行组织。

### Talk is cheap, show me the code

Github的[todomvc]项目，提供了各种以`MV*`为名号的框架的实现，帮助前端工程师选择合适的框架或库。其中的[vanillajs]版本，是一个无框架无库的原生`JavaScript`实现；它也是按照`MVC`的理念来组织代码。框架或库不是`MVC`模式的必需品，只是说有了相应的框架与库，写起来更为便利。

本文也准备了一个原生实现[todos-vanillajs]，可作MVC模式参考案例。

在线体验地址：http://lucifier129.github.io/todos-vanillajs/index.html

## MVC模式

### 一个模块是一个文件夹

在一些`nodejs`与`前端模块化编程`的介绍中，常常能看到`一个文件就是一个模块`的说法，用`module.exports`的值作为模块输出。暂且把这类模块叫做`nodejs模块`或`AMD/CMD模块`。

我们真正关注的模块，其实是`业务模块`，它是指与DOM相关的`视图模型、数据模型与事件交互模型`的总和。比如一个页面的`header`模块，它包含`html模板`、`填充的数据`以及`随着滚动高度而固定在顶部的事件交互`等结构。

`业务模块`不等价于`AMD/CMD模块`！如果产生这个误解，可能将所有东西塞一个`js文件`。只把`html模板`提取出来，也不足够。

一个`业务模块`应该是好几个`AMD/CMD模块`的组合，它是一个文件夹，包含好几个`AMD/CMD模块文件`，其中：
- `view.js`文件对应`视图模型`，存储`html模板`，并提供根据数据输入渲染视图的方法、从视图中获取并输出数据的方法
- `model.js`文件对应`数据模型`，提供数据存储与数据处理的所有方法
- `controller.js`文件对应`事件交互模型`，提供事件绑定与组织视图模型和数据模型的所有方法
- `app.js`对应`业务模块出口文件`
- `README.md`是一个描述`业务逻辑`的`markdown`文件，随业务逻辑变更而更新
- 其它文件如`package.json`、`data_mock.json`根据实际需求决定是否添加

并且：
- 当视图模型里包含太多内容时，`view`也应该变成文件夹，里面包含类似`template.js`、`todo-list.js`, `filter.js`以及出口文件`view.js`。
- `view`跟`model`绝不知道事件何时绑定，何时触发，一切事件逻辑都放在`controller.js`中
- `view`只对`html模板`进行`get/set`数据
- `model`处理数据输入，数据转换、数据储存与数据输出
- `ajax`行为，属于`controller`，不属于`model`；在`success`回调函数里调用`model`提供的方法处理数据

`controller.js`的一般形式如下：

```javascript
function Controller(View, Model) {
    this.View = View
    this.Model = Model
}

Controller.prototype = {
    init: function() {
        //初始化
    },
    listen: function() {
        //事件绑定
    }
}
```

`controller.js`拿到了视图模型与数据模型，也就掌握了如何处理数据、如何渲染视图的所有方法；关于数据处理与视图渲染的时机问题，则由设计事件绑定来完成。所以它是`事件交互控制器`。

## 定义和调用分离

`todomvc`是一个功能简单的页面，因此用一个`js文件夹`足以。其中的`view.js`、`model.js`以及`controller.js`都只是定义了一些`方法接口`, `app.js`这个出口文件才产生了调用。

```javascript
//view.js
app.View = {
		TodoList: TodoList,
		TodoElem: TodoElem,
		Counter: Counter,
		Footer: Footer,
		ToogleAll: ToogleAll,
		Filters: Filters
	}
```
视图只有7个信息渲染点，用6个`类`定义了渲染方法。没有产生调用。

```javascript
//model.js

	function Model(name) {
		this.name = name
		this.todos = localStorage.getItem(name)
		if (this.todos) {
			this.todos = JSON.parse(this.todos)
		} else {
			this.todos = []
		}
	}

	Model.prototype = {
		getTodo: function(id) {
			//根据id获取todo项
		},
		getAll: function() {
			//获取所有todo项
		},
		getActive: function() {
			//获取未完成的todo项
		},
		getCompleted: function() {
			//获取已完成的todo项
		},
		addTodo: function(todo) {
			//添加新的todo项
		},
		removeTodo: function(id) {
			//根据id删除todo项
		},
		save: function() {
			//保存数据
		}
	}
```

数据模型`Model`提供了所有跟数据处理相关的方法。没有产生调用。

```javascript
//controller.js

	function Controller(View, Model) {
		this.View = View
		this.Model = Model
	}

	Controller.prototype.init = function() {
		//初始化
	}

	Controller.prototype.listen = function() {

		//绑定事件代理
		//每个事件中，涉及渲染的用View提供的方法，涉及数据的用Model提供的方法

		tools.$listen('change', '#new-todo', function() {
			//输入框的change事件中，添加新todo项
		})

		tools.$listen('keyup', '#new-todo', function(e) {
			if (e.keyCode === ENTER_KEY) {
				//输入框聚焦时，按回车键也添加新todo项
			}
		})

		tools.$listen('dblclick', '#todo-list label', function() {
			//todo-list里双击进行内容编辑
		})

		tools.$listen('change', '#todo-list .edit', function() {
			//内容编辑框的change事件，标志完成编辑
		})

		tools.$listen('keyup', '#todo-list .edit', function(e) {
			var keyCode = e.keyCode

			if (keyCode === ESCAPE_KEY || keyCode === ENTER_KEY) {
				//内容编辑框按回车键，或者ESC退出键，标志完成编辑
			}
		})

		tools.$listen('change', '#todo-list .toggle', function() {
			//todo-list每一项提供的checkbox，其change事件中切换[未完成-已完成]状态
		})

		tools.$listen('change', '#toggle-all', function() {
			//该checlbox的切换所有todo项的状态
		})

		tools.$listen('click', '#todo-list .destroy', function() {
			//每个todo项的视图中，提供删除按钮，其click事件触发删除
		})

		tools.$listen('click', '#clear-completed', function() {
			//一个按钮，其click事件触发时，清除所有已完成的todo项
		})

		//dom ready时更新页面数据
		document.addEventListener('DOMContentLoaded', this.update.bind(this), false)
		//hashchange时，更新页面数据
		window.addEventListener('hashchange', this.update.bind(this), false)
		//页面关闭时，保存数据到localStorage
		window.addEventListener('beforeunload', this.model.save.bind(this.model), false)
	}

	Controller.prototype.otherMethod = function() {
		//其它方法，用于封装可复用的model与view的交互方式
	}
```

`事件交互控制器`虽然写了与业务逻辑耦合严重的硬编码，比如事件代理的各个特定的`selector`；但是它仍然封装在实例方法中，不形成调用。

```javascript
//app.js
app.todos = new app.Controller(app.View, app.Model).init()
```

真正的调用，发生在出口模块中，并且也是因为此app.js是整个页面的出口模块。假设它只是其中一个`业务模块`，很多时候也不应调用`init`方法，而是放到`页面出口模块`中，择时机初始化。

定义与调用分离的好处：
- 其它`业务模块`可以无副作用的复用你的`view/model/controller`提供的方法
- 定义与调用分离，更容易促使工程师写出可复用的、面向对象的代码


## 尾声

以上所谓的`MVC模式`，算不上`最佳实践`，只是一个`经验分享`。如果你有好的建议，或者更好的方案，欢迎指出与分享。

[Jade Gu]:http://weibo.com/islucifier
[winter]:http://weibo.com/wintercn
[MVC是任人打扮的小姑娘]:http://weibo.com/p/1001603809050365148952
[谈谈UI架构设计的演化]:http://weibo.com/p/1001603808855434892996
[todomvc]:https://github.com/tastejs/todomvc
[vanillajs]:https://github.com/tastejs/todomvc/tree/master/examples/vanillajs
[todos-vanillajs]:https://github.com/Lucifier129/Lucifier129.github.io/tree/master/todos-vanillajs
