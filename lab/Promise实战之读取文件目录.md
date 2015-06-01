# Promise实战之读取文件目录

读取某一目录下的所有文件信息，是`nodejs`的经典题目之一。看一下用`Promise`风格来写是怎样的。

我们的目标是写一个`Tree`类

- `Tree#readdir`：读取目录下的所有文件
- `Tree#stringify`: 输出`JSON`字符串的数据
- `Tree#saveTo(path)`: 以`JSON`格式保存数据到`path`路径
- `Tree`#get(path): 根据`path`返回子`tree`
- `Tree`#set(path): 根据`path`建立文件夹
－ `Tree`#add(file, data): 添加文件并写入数据


首先是将`fs.readdir`、`fs.stat`以及`fs.writeFile`包装成`Promise`版本

```javascript
var fs = require('fs')
var join = require('path').join
//获取Path路径下的所有文件files
var readdir = function(path) {
	return new Promise(function(resolve, reject) {
		fs.readdir(path, function(err, files) {
			err ? reject(err) : resolve(files)
		})
	})
}

//将data写入path路径的文件中
var writeFile = function(path, data) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(path, data, function(err) {
			err ? reject(err) : resolve()
		})
	})
}

//根据path判断是文件还是文件夹类型
var getPathType = function(path) {
	return new Promise(function(resolve, reject) {
		fs.stat(path, function(err, stats) {
			err ? reject(err) : resolve(stats.isDirectory() ? 'directory' : 'file');	
		})
	})
}
```

一个文件夹下，可能有很多文件，因此免不了要用`Promise.all`来批量处理`promiseList`，写一个`handlePromiseList`函数，帮助我们处理多种情形。

```javascript
var handlePromiseList = function(promiseList) {
	var len
	//不是数组，或者是空数组，返回[[value]]为null的promise
	if (!Array.isArray(promiseList) || !len = promiseList.length) {
		return Promise.resolve(null)
	} else if (len === 1) {
		//只有一个promise，返回它
		return promiseList[0]
	} else if (len > 1) {
		//有两个或两个以上的promise时，用Promise.all打包
		return Promise.all(promiseList)
	}
}
```

有了上面的工具函数，我们以面向对象的风格写一个`Tree`类。

```javascript
function Tree(path, name, type) {
	this.path = path
	this.name = name
	//默认为directory类型，除非type是非空字符串
	this.type = typeof type === 'string' && type ? type : 'directory'
}
```

我们将为`Tree`设计三个`实例方法`：

- `Tree#readdir`：读取目录下的所有文件
- `Tree#stringify`: 输出`JSON`字符串
- `Tree#saveTo(path)`: 以`JSON`格式保存数据到`path`路径

输出`JSON`字符串，利用`JSON.stringify`的三个特性：

- 忽略`原型`
- 忽略`方法`
- 忽略`enumerable`为`false`的属性

通过`JSON.stringify(tree)`就能拿到`JSON`格式的字符串。

下面先实现`readdir`实例方法

```javascript
Tree.prototype.readdir = function() {
	var path
}
```