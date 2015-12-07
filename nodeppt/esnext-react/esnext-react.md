title: 用 ES2015 一步步打造轻量级 ReactJS
speaker: Jade
transition: slide
theme: dark
[slide]
# 用 ES2015 一步步打造轻量级 ReactJS
## 分享者：Jade
## 时间：2015.12.09

[slide]
# React 为什么这么大？
## React v0.14 体积 130 kb

<img src="/img/dove.jpg" />

[slide]
# React 并不局限于 View
## React 没有提供按需打包的方式

- 为多终端设计
- 支持服务端渲染 `React.renderToString`
- 实现浏览器运行时 props 验证系统 `React.PropTypes`
- 兼容低版本浏览器（ie8+）
- 重建 dom 事件系统

[slide]
# Web 开发者渴望从 React 里得到什么？

- 轻量: `mobile first`
- 高性能：`virtual-dom`
- 组件化：`React.Component` && `React.createClass` && `stateless Component`
- 多终端：`learn once, write anywhere`
- SEO：服务端渲染 `React.renderToString`

[slide]
# 实现 virtual-dom 与 component 的成本？
## js-repain-perf: [react](https://cdn.rawgit.com/Lucifier129/esnext-react/master/examples/js-repaint-perf/react/index.html) [refer-dom](https://cdn.rawgit.com/Lucifier129/js-repaint-perfs/master/react/refer.html) [esnext-react](https://cdn.rawgit.com/Lucifier129/esnext-react/master/examples/js-repaint-perf/react/esnext.html)
- react(`130kb`): 始祖
- refer-dom(`37kb`): 基于 refer 与 virtual-dom 库(请勿用于生产环境)
- esnext-react(`13kb`): ES2015 实现， 无依赖(请勿用于生产环境)

[slide]
# esnext-react 体积小的秘密
## `just virtual-dom and component`

- 使用浏览器自带的事件系统： dom.onclick = handleChild
- 只为现代 web 浏览器设计: ES5+
- 不支持服务端渲染
- 不支持 PropTypes 验证

[slide]
# 麻雀虽小，五脏俱全
## [react-motion-demo](https://cdn.rawgit.com/Lucifier129/esnext-react/master/examples/demos/index.html)

- `React.createElement`: 创建 virtual-dom
- `React.createClass`: 创建 Component
- `React.Component`: 支持 ES2015 classes
- `React.render`: 渲染 virtual-dom 到 real-dom

[slide]
# 第一步 创建虚拟 dom

[subslide]
## 工厂函数递归调用，创建树形数据结构

```javascript
let createElement = (type, props, ...children) => {
	return {
		type,
		props,
		children
	}
}
```
===========
## JSX 预编译模板，声明式写法
### 命令式
```javascript
var link = React.createElement('a', {
	href: 'https://www.strikingly.com/'
}, 'strikingly')
```
### 声明式
```html
var link = <a href="https://www.strikingly.com/">strikingly</a>
```
[/subslide]

[slide]
＃ 第二步 virtual-dom -> real-dom
## 深度优先，递归遍历树形结构，创建 dom 元素
```javascript
var create = function(vnode) {
	switch (true) {
		case isStr(vnode) || isNum(vnode):
			return document.createTextNode(vnode)
		case isFn(vnode.type):
			return create(vnode.type({ ...props, children }))
		default:
			let elem = document.createElement(vnode.type)
			isObj(props) && setProps(elem, props)
			children.length > 0 && children.forEach(child => 
				elem.appendChild(create(child))
			)
			return elem
	}
}
```

[slide]
# 第三步 diff 比较两个 virtual-dom
## 性能来自捷径和取舍

```javascript
let diff = (vnode, newVnode) => {
	let type
	switch (true) {
		case vnode === newVnode:
			return
		case newVnode == null:
			type = REMOVE
			break
		case vnode == null:
			type = CREATE
			break
		case vnode.tagName !== newVnode.tagName:
			type = REPLACE
			break
		case (isStr(vnode) || isNum(vnode) || isStr(newVnode) || isNum(newVnode)) && vnode != newVnode:
			type = REPLACE
			break
		case !!(vnode.props || newVnode.props):
			type = PROPS
			break
	}
	let children = diffChildren(vnode, newVnode)
	return { type, vnode, newVnode, ...children }
}
```

[slide]
# 第四步 patch 更新补丁
## 集中 dom 更新操作，减少 repaint 和 reflow
```javascript
let patch = (node, patches, parent) => {
	if (!patches) {
		return node
	}
	let { vnode, newVnode, type, childrenType } = patches
	let newNode
	parent = node ? node.parentNode : parent
	switch (type) {
		case CREATE:
			newNode = create(newVnode)
			appendChild(parent, newNode)
			break
		case REMOVE:
			removeChild(parent, node)
			break
		case REPLACE:
			newNode = create(newVnode)
			replaceChild(parent, newNode, node)
			break
		case PROPS:
			applyProps(node, vnode.props, newVnode.props)
			break
		case WIDGET:
			newVnode.update(vnode, node)
			break
	}

	switch (childrenType) {
		case REMOVE:
			node.innerHTML = ''
			break
		case CREATE:
			patches.newChildren.forEach(child => addChild(node, child))
			break
		case REPLACE:
			let children = Array.prototype.slice.call(node.childNodes)
			patches.childrenPatches.forEach((childPatches, index) => {
				patch(children[index], childPatches, node)	
			})
			break
	}

	return newNode || node
}
```

[slide]

# 第五步 实现一个 Component class
## 模拟 react 组件 api
```javascript
class Component {
	constructor(props) {
		this.props = props
		this.state = {}
		this.refs = {}
	}
	setState(nextState, callback) {
		//do some thing
	}
	shouldComponentUpdate(nextProps, nextState) {
		return true
	}
	componentWillUpdate(nextProps, nextState) {}
	componentDidUpdate(prevProps, prevState) {}
	componentWillReceiveProps(nextProps) {}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}
	forceUpdate(callback) {
		//do some thing
		this.componentWillUpdate(nextProps, nextState)
		//do some thing
		this.componentDidUpdate(props, state)
		if (isFn(callback)) {
			callback()
		}
	}
}
```

[slide]
# 第六步 实现 createClass
## 反模式之 `autobind` & `mixins`

```javascript
export let createClass = options => {
	let mixins = options.mixins || []
	let defaultProps = isFn(options.getDefaultProps) ? options.getDefaultProps() : null
	let Klass = class extends Component {
		constructor(props) {
			super(props)
			bindContext(this, Klass.prototype)
			if (isObj(defaultProps)) {
				this.componentWillReceiveProps(props)
			}
			if (isFn(this.getInitialState)) {
				this.state = this.getInitialState()
			}
		}
	}
	combineMixins(Klass.prototype, mixins.concat(options))
	if (isObj(options.statics)) {
		for (let key in options.statics) {
			if (options.statics.hasOwnProperty(key)) {
				Klass[key] = options.statics[key]
			}
		}
	}
	return Klass
}
```

[slide]


