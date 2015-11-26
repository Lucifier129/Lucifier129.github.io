title: 深度体验 React
speaker: Jade
transition: slide
[slide]
# 深度体验 React
## 分享者：Jade
## 时间：2015.10.29

[slide]
# 目录
## Web 技术现状
## 分析 React
## 分析 Flux 架构
## 造一个 React

[slide]
# JavaScript 技术爆炸
[subslide]
## 快速迭代
- 语言标准: ECMAScript5(2009年12月)、ECMAScript2015(2015年6月)、ECMAScript2016(2016年)....
- 浏览器迭代周期：6周
- NPM 包数量：16万+
- 前端库与框架：每天学一个，一辈子都学不完

==================

## 《JavaScript 高级程序设计》作者 Nicholas C. Zakas
> Web平台的快速发展让人眼花缭乱，有时候甚至让人头晕目眩。想象一下，一个新入行的人，学什么都无法深入是什么感受？每过6个星期（浏览器的新版本发布），都有新的做事方法加入进来，简直就是无穷无尽的轮回，我相信所有人都希望跳脱这个困境。

================
## 世界级JavaScript专家 Peter-Paul Koch
>我们越来越多地以模仿原生的方式来推动Web向前发展，可我们不能脱离原生再造一个原生。试图填补一切的工具大爆炸，让我们眩晕，压得我们喘不过气来。而这些说的正是大多数浏览器今天的功能。这不是我想要的Web的未来。

==============
## jQuery 创始人和技术领袖 John Resig 2015年8月17日：
> Just realized that I'm trying to learn a JS framework that's so new that I need to search Twitter mentions for tutorials.

===============
## 前端技术栈（2015年）
## ES2015、react、react-router、redux、css-modules、nodejs、npm、gulp、webpack、babel、mocha、eslint、material-design-lite

==============
## React 全家桶
- `react v0.14`(133k)
- `react-router v1.0.0-rc3`(48k)
- `relay v0.4.0`(197k)
- `react-motion v0.3.1`(27k)
- `immutable-js v3.7.5`(56k)
- 133 + 48 + 197 + 27 + 56 = `461kb`

==============
## 前端代码一则
```javascript
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './styles'
import { route } from 'react-director'

@route('/greet/:user')
@CSSModules(styles)
export default class Greet extends Component {
	render() {
	  return <div styleName="greet">Hello { this.props.user }</div>
    }
}
```

[/subslide]

[slide]
# 如何在技术浪潮中自处？
[subslide]
## 两种知识类型
- 核心知识
	* 换一门语言，换一个框架，依然适用的基础知识
	* 解决特定问题的核心理念与算法描述
- 文档型知识：特定问题的解决方案的使用说明信息

============
## 技术选型思路

- 尽可能选择离「[时间的源头](https://github.com/seajs/seajs/issues/1605)」更近的
- 尽可能选择社区生态系统更大更成熟的
- 尽可能选择更贴近最新语言标准的

[/subslide]


[slide]
# React 是什么？
## Facebook: A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES
- JUST THE UI
- VIRTUAL DOM
- DATA FLOW

[slide]
# Facebook 对 React 项目投入了多少？
## 2013 年开源至今
## 5600+ commits
## 535+ contributors
## 100+ [核心开发人员](https://github.com/facebook/react/blob/master/.mailmap)

[slide]
# React 可以做什么？
## Learn Once, Write Anywhere
- ReactJS 写 [Isomorphism Web](https://github.com/Lucifier129/Isomorphism-react-todomvc) 应用
- React-Native 写 (Android/IOS) 应用

[slide]
# React 如何做到支持多终端以及同构？
- 前提1：JavaScript 是跨平台的(浏览器/Android/IOS)
- 前提2：JavaScript 有服务端运行时环境 node.js
- 奥义：JSX/virtual-dom 映射到不同平台

[slide]
# JSX/virtual-dom 是什么鬼？
- `virtual-dom`: a simpler programming model and better performance
- `JSX`:XML-like syntax
- `关系`：JSX 是创建 virtual-dom 的可选语法糖

[slide]
# JSX
## 使用前:命令式风格
```javascript
React.createElement(
  "a",
  {
    id: "a_vacationLink",
    title: "旅游",
    href: "http://vacations.ctrip.com"
  },
  "旅游"
);
```
## 使用后：声明式风格
```javascript
<a id="a_vacationLink" title="旅游" href="http://vacations.ctrip.com">旅游</a>
```

[slide]
# virtual-dom 的本质
## JSON 数据
## 往大里说是 AST （抽象语法树）
## 往小里说是「配置信息」

[slide]
# 证明 virtual-dom 是配置信息
[subslide]
```javascript
var vdom = React.createElement(
  "a",
  {
    id: "a_vacationLink",
    title: "旅游",
    href: "http://vacations.ctrip.com"
  },
  "旅游"
);
React.render(vdom, document.body)
```
===================
```javascript
var config = {
	type: 'a',
	props: {
		id: "a_vacationLink",
	    title: "旅游",
	    href: "http://vacations.ctrip.com",
	    children: "旅游"
	},
	_isReactElement: true
}
React.render(config, document.body)
```
[/subslide]

[slide]
# React 的 Component 又是什么？
[subslide]
## ES5 语法
```javascript
var Link = React.createClass({
    getInitialState: function() {
      return { count: 0}
    },
    count: function(type) {
      var count = this.state.count
      if (type === 'INCREMENT') { count++ }
      else if (type === 'DECREMENT') { count-- }
      this.setState({ count: count })
    },
	render: function() {
	 var INCREMENT = this.count.bind(this, 'INCREMENT')
	 var DECREMENT = this.count.bind(this, 'DECREMENT')
	  return (
	    <div>
				<span>count: { this.state.count }</span>
				{' '}
				<button onclick={INCREMENT}>+</button>
				{' '}
				<button onclick={DECREMENT}>-</button>
		</div>
	  )
	}
})
```
=========
## ES2015 语法
```javascript
class Link extends React.Component {
	constructor() {
	  this.state = { count: 0}
    },
    count: function(type) {
      var count = this.state.count
      if (type === 'INCREMENT') { count++ }
      else if (type === 'DECREMENT') { count-- }
      this.setState({ count: count })
    },
	render: function() {
	 var INCREMENT = this.count.bind(this, 'INCREMENT')
	 var DECREMENT = this.count.bind(this, 'DECREMENT')
	  return (
	    <div>
				<span>count: { this.state.count }</span>
				{' '}
				<button onclick={INCREMENT}>+</button>
				{' '}
				<button onclick={DECREMENT}>-</button>
		</div>
	  )
}
```
========
## 配置语法（仅供探讨，请勿用于生产环境）
```javascript
function Link(props) { this.props = props; }
Link.prototype.render = function() { return {
	type: 'a',
	props: this.props,
	_isReactElement: true
}}
var config = { type: Link,
	props: {
		id: "a_vacationLink",
	    href: "http://vacations.ctrip.com",
	    children: "旅游"
	},
	_isReactElement: true
}
React.render(config, document.body)
```
[/subslide]

[slide]
# 小结
## vitrual-dom 本质是 JSON 格式的配置信息
## React Component 提供管理动态配置的能力
## 调用 React.render 渲染 vdom 到真实的 DOM 
## 调用 React.renderToString 渲染 vdom 到 string

[slide]
# 小测
[subslide]
## virtual-dom 比 real-dom 快多少？
## 遍历属性
```javascript
var div = document.createElement('div')
console.time('div')
for (var i = 0; i < 10000; i += 1) {
  for (var key in div) {}
}
console.timeEnd('div')
```
=======
## virtual-dom 可以多快？
## 可以用 vdom 写出流畅的动画效果
## [react-motion](https://github.com/chenglou/react-motion)
[/subslide]

[slide]
# Flux 架构图
<img src="flux.png" />

[slide]
# Flux 理念
- 用 action 隔离对 state 操作
- 掌握 state 变化的方式和时机
- 将组件间通讯转化为 state 操作

[slide]
# 各种 Flux 实现
- facebook/flux(官方出品)
- reflux/refluxjs
- goatslacker/alt
- BinaryMuse/fluxxor
- yahoo/fluxible
- rackt/redux (目前最火)
- Lucifier129/refer(这是硬广)

[slide]
# refer 硬广时间
[subslide]
## 基本用法
```javascript
import { createStore } from 'refer'
const handlers = {
	"UPDATE_TODO": text => state => {...state, text },
	"UPDATE_COMPLETED": completed => state => {...state, completed }
}
const store = createStore(handlers, { text: 'default text', completed: false })
const { UPDATE_TODO, UPDATE_COMPLETED } = store.actions
store.getState() //{ text: 'default text', completed: false }
UPDATE_TODO('测试') // store.dispatch("UPDATE_TODO", "测试")
UPDATE_COMPLETED(true) // store.dispatch("UPDATE_COMPLETED", true)
store.getState() // { text: '测试', completed: true }
```

==================
## 生命周期
### 特殊的 actionType，能拿到 { currentState, nextState?, key, value } 数据
- `@DISPATCH`: store.dispatch 调用时触发
- `@SHOULD_DISPATCH`: store.dispatch 应该终止吗？
- `@SHOULD_UPDATE`: store.dispatch 应该更新吗？
- `@WILL_UPDATE`: store.dispatch 即将更新 state
- `@DID_UPDATE`: store.dispatch 已经更新 state 
- `@THROW_ERROR`: store.dispatch 出现错误
- `@ASYNC_START`: store.dispatch 的更新方式为异步，开始
- `@ASYNC_END`: store.dispatch 的更新方式为异步，结束
- `@SYNC`: store.dispatch 的更新方式为同步
[/subslide]

[slide]
# 造一个 React
[subslide]
## refer + [virtual-dom](https://github.com/Matt-Esch/virtual-dom) = refer-dom ≈ react
### 模拟 react 核心 API

- `React.createElement`: 创建 virtual-dom
- `React.Component`: React 组件兼容 ES2015 的 class
- `React.createClass`: React 组件 ES3 语法 

===========
## refer-dom 可以无缝跑 react 代码
- 打包工具里配置 alias，将 react 指向 refer-dom 即可
- refer-dom 目前 40k 不到，节省 90k 以上文件体积
- js-repaint-perfs [demo](https://cdn.rawgit.com/Lucifier129/js-repaint-perfs/master/react/refer.html)
- react-motion [demo](lucifier129.github.io/refer-dom-demos/index.html)

[/subslide]

[slide]
# Q&A 时间
<img src="qa.jpg" />