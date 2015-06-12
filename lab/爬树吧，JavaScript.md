#  浅谈 JavaScript 处理树形结构的几个场景与方案

`作者`: 工业聚
`日期`：2015-06-12

## 前言

近日，Mac 下著名软件 Homebrew 的作者，因为没解出来二叉树翻转的白板算法题，惨遭 Google 拒绝，继而引发推特热议。

在 JavaScript 中也有很多树形结构。比如 DOM 树，省市区地址联动，文件目录等； JSON 本身就是树形结构。

很多前端面试题也跟树形结构的有关，比如在浏览器端写遍历 DOM 树的函数，比如在 nodejs 运行时遍历文件目录等。

这里演示用 JavaScript 遍历树形结构的几种策略。

## 场景1：遍历 DOM 树

### 方案1：递归模式

```javascript
function walkDom(node, callback) {
	if (node === null) { //判断node是否为null
		return
	}
	callback(node) //将node自身传入callback
	node = node.firstElementChild //改变node为其子元素节点
	while (node) {
		walkDom(node, callback) //如果存在子元素，则递归调用walkDom
		node = node.nextElementSibling //从头到尾遍历元素节点
	}
}
walkDom(document, function(node) {console.count()}) //包含document节点
document.querySelectorAll('*').length //数量上面输出的少1，因为不包含document节点
```


### 方案2：循环模式

```javascript
function walkDom(node, callback) {
	if (node === null) {
		return
	}
	var stack = [node] //存入数组
	var target
	while(stack.length) { //数组长度不为0，继续循环
		target = stack.shift() //取出元素
		callback(target) //传入callback
		Array.prototype.push.apply(stack, target.children) //将其子元素一股脑推入stack，增加长度
	}
}
walkDom(document, function(node) {console.count()}) //包含document节点
document.querySelectorAll('*').length //数量上面输出的少1，因为不包含document节点
```

在循环模式中，`shift`方法可以换成`pop`，从尾部取出元素；`push`方法可以换成`unshift`从头部添加元素。不同的顺序，影响了是「广度优先」还是「深度优先」。

## 场景2：在 nodejs 运行时里遍历文件目录

### 子场景1：同步模式

#### 方案1：递归

```javascript
var fs = require('fs')
var Path = require('path')

function readdirs(path) {
	var result = { //构造文件夹数据
		path: path,
		name: Path.basename(path),
		type: 'directory'
	}
	var files = fs.readdirSync(path) //拿到文件目录下的所有文件名
	result.children = files.map(function(file) {
		var subPath = Path.resolve(path, file) //拼接为绝对路径
		var stats = fs.statSync(subPath) //拿到文件信息对象
		if (stats.isDirectory()) { //判断是否为文件夹类型
			return readdirs(subPath) //递归读取文件夹
		}
		return { //构造文件数据
			path: subPath,
			name: file,
			type: 'file'
		}
	})
	return result //返回数据
}

var cwd = process.cwd()
var tree = readdirs(cwd)
fs.writeFileSync(Path.join(cwd, 'tree.json'), JSON.stringify(tree)) //保存在tree.json中，去查看吧
```
将上面的代码保存在 tree.js 中，然后在当前文件夹打开命令行，输入`node tree.js`，目录信息保存在生成tree.json文件中。

#### 方案2：循环

```javascript
var fs = require('fs')
var Path = require('path')

function readdirs(path) {
	var result = { //构造文件夹数据
		path: path,
		name: Path.basename(path),
		type: 'directory'
	}
	var stack = [result] //生成一个栈数组
	while (stack.length) { //如果数组不为空，读取children
		var target = stack.pop() //取出文件夹对象
		var files = fs.readdirSync(target.path) //拿到文件名数组
		target.children = files.map(function(file) {
			var subPath = Path.resolve(target.path, file) //转化为绝对路径
			var stats = fs.statSync(subPath) //拿到文件信息对象
			var model = { //构造文件数据结构
				path: subPath,
				name: file,
				type: stats.isDirectory() ? 'directory' : 'file'
			}
			if (model.type === 'directory') {
				stack.push(model) //如果是文件夹，推入栈
			}
			return model //返回数据模型
		})
	}
	return result //返回整个数据结果
}

var cwd = process.cwd()
var tree = readdirs(cwd)
fs.writeFileSync(Path.join(cwd, 'tree.json'), JSON.stringify(tree)) //保存在tree.json中，去查看吧

```

循环策略中的`pop`跟`shift`，`push`跟`unshift`也可以互换以调整优先级，甚至用可以用`splice`方法更精细的控制`stack`数组。循环模式比递归模式更可控。


### 子场景2：异步模式

#### 方案1：过程式 Promise

```javascript
var fs = require('fs')
var Path = require('path')
//promise包装的fs.stat方法
var stat = function(path) {
	return new Promise(function(resolve, reject) {
		fs.stat(path, function(err, stats) {
			err ? reject(err) : resolve(stats)
		})
	})
}
//promise包装的fs.readdir方法
var readdir = function(path) {
	return new Promise(function(resolve, reject) {
		fs.readdir(path, function(err, files) {
			err ? reject(err) : resolve(files)
		})
	})
}
//promise包装的fs.writeFile
var writeFile = function(path, data) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(path, JSON.stringify(data || ''), function(err) {
			err ? reject(err) : resolve
		})
	})
}

function readdirs(path) {
	return readdir(path) //异步读取文件夹
	.then(function(files) { //拿到文件名列表
		var promiseList = files.map(function(file) { //遍历列表
			var subPath = Path.resolve(path, file) //拼接为绝对路径
			return stat(subPath) //异步读取文件信息
			.then(function(stats) { //拿到文件信息
				//是文件夹类型的，继续读取目录，否则返回数据
				return stats.isDirectory() ?
				readdirs(subPath) : {
					path: subPath,
					name: file,
					type: 'file'
				}
			})
		})
		return Promise.all(promiseList) //等待所有promise完成
	})
	.then(function(children) { //拿到包含所有数据的children数组
		return { //返回结果
			path: path,
			name: Path.basename(path),
			type: 'directory',
			children: children
		}
	})
}

var cwd = process.cwd()

readdirs(cwd)
.then(writeFile.bind(null, Path.join(cwd, 'tree.json'))) //保存在tree.json中，去查看吧
.catch(console.error.bind(console)) //出错了就输出错误日志查看原因
```

上面的函数都能工作，但都是一个个`function`的调用，显得太「过程式」；

能不能用面向对象的方式来写呢？

当然可以。

其实面向对象的写法，更清晰。

为了更加语义化，以及增显逼格。

我们用 ES6 的 class 来写这个树形结构类。

#### 方案2：ES6-class + ES6-Promise

```javascript
import fs from 'fs'
import {join, resolve, isAbsolute, basename, extname, dirname, sep} from 'path'

/**
 * 获取目录下的所有文件
 * @param {string} path
 * @return {promise} resolve files || reject error
 */
let readdir = (path) => {
	return new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {
			err ? reject(err) : resolve(files)
		})
	})
}

/**
* 将data写入文件
* @param {string} path 路径
* @param {data} data
* @return {promise} resolve path || reject error
*/
let writeFile = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            err ? reject(err) : resolve(path)
        })
    })
}

/**
* 获取文件属性
* @param {string} path
* @return {promise} resolve stats || reject error
*/
let stat = (path) => {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            err ? reject(err) : resolve(stats)
        })
    })
}


//文档类
class Document {
	constructor(path) {
		this.path = path
		this.name = basename(path)
	}
	//存在性判断
    exists() {
        return exists(this.path)
    }
    //异步获取文件信息
    stat() {
        return stat(this.path)
    }
    //输出基本数据
    json() {
        return JSON.stringify(this)
    }
    //将基本数据保存在path路径的文件中
    saveTo(path) {
        if (isAbsolute(path)) {
            return writeFile(path, this.json())
        }
        return writeFile(resolve(this.path, path), this.json())
    }
}

//文件类，继承自文档类
class File extends Document {
	constructor(path) {
		super(path) //必须先调用超类构造方法
		this.type = 'file' //type 为 file
		this.extname = extname(path) //新增扩展名
	}
	//写入数据
	write(data = '') {
		return writeFile(this.path, data)
	}
	//其他文件特有方法如 read unlink 等
}


//文件夹类，继承自文档类
class Directory extends Document {
	constructor(path) {
		super(path) //必须先调用超类构造方法
		this.type = 'directory'
	}
	//读取当前文件夹
	readdir() {
		return readdir(this.path) //读取目录
		.then((files) => { //拿到文件名列表
			let promiseList = files.map((file) => {
				let subPath = resolve(this.path, file) //拼接为绝对路径
				return stat(subPath) //获取文件信息
				.then((stats) => {
					//根据文件信息，归类为Directory或File类型
					return stats.isDirectory() ?
					new Directory(subPath) :
					new File(subPath)
				})
			})
			return Promise.all(promiseList)
		})
		.then((children) => { //拿到children数组
			this.children = children //保存children属性
			return children //返回children
		})
	}
	//深度读取文件目录
	readdirs() {
		return this.readdir() //读取当前文件夹
		.then((children) => { //拿到children
			let promiseList = []
			children.map((child) => {
				if (child instanceof Directory) { //是文件夹实例，继续深度读取文件目录
					promiseList.push(child.readdirs())
				}
			})
			return Promise.all(promiseList) //等待所有子元素深度读取目录完毕
		})
		.then(() => this) //返回this
	}
	//其他文件夹特有方法如 addFile removeFile addDir remveDir 等
}

let cwd = process.cwd()

new Directory(cwd)
.readdirs()
.then((tree) => {
	tree.saveTo('tree.json') //让它自己保存在tree.json里
})
.catch(console.error.bind(console)) //输出错误日志
```

因为当前 JavaScript 引擎对 ES6 的支持度还不够，所以上述代码不能直接运行。可以通过以下两种方式来验证代码能不能跑起来。

第一种，先 `npm install -g bable` 全局安装 babel 工具，再以 `babel-node tree.js`的方式取代 `node tree.js` 来运行上述代码。

第二种，将上述代码黏贴到 `https://babeljs.io/repl/`，拿到编译为 ES5 的代码，将代码保存在 `tree.js` 文件中，以 ES5 的形式执行。

## 结语

以上就是我知道的一些用 JavaScript 处理树形结构的几种方法，希望看过后对你有帮助。