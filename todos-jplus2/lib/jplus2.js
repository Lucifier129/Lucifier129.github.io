/*
 * jplus
 * Author: Jade
 * Github:https://github.com/Lucifier129/jplus
 */
! function($, undefined) {

	//base
	var objProto = Object.prototype
	var arrProto = Array.prototype

	if (!arrProto.indexOf) {
		arrProto.indexOf = function(value) {
			for (var i = this.length - 1; i >= 0; i--) {
				if (this[i] === value) {
					return i
				}
			}
			return -1
		}
	}

	if (!String.prototype.trim) {
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
		String.prototype.trim = function() {
			return this.replace(rtrim, '')
		}
	}

	//反柯里化
	//接受一个函数
	//返回一个函数：1）首个参数作为原函数的this；2）其余参数传入原函数
	function unCurring(fn) {
		return function() {
			return Function.prototype.call.apply(fn, arguments)
		}
	}

	var toStr = unCurring(objProto.toString)
	var hasOwn = unCurring(objProto.hasOwnProperty)
	var slice = unCurring(arrProto.slice)
	var indexOf = unCurring(arrProto.indexOf)

	//返回一个检测输入的obj是否符合特定数据类型的函数
	function isType(type) {
		type = '[object ' + type + ']'
		return function(obj) {
			if (obj == null) {
				return obj
			} else {
				return toStr(obj) === type
			}
		}
	}

	var isObj = isType('Object')
	var isStr = isType('String')
	var isFn = isType('Function')
	var isNum = isType('Number')
	var isArr = Array.isArray || isType('Array')

	//简洁实现
	var each = function(obj, callback) {
		if (isArr(obj)) {
			for (var i = 0, len = obj.length; i < len; i += 1) {
				callback(obj[i], i)
			}
		} else if (isObj(obj)) {
			for (var key in obj) {
				if (hasOwn(obj, key)) {
					callback(obj[key], key)
				}
			}
		}
		return obj
	}

	//「面向过程对象」：函数是代码片段，包含一个特定过程，它也可以被视为一种对象
	//将函数参数保存在对象的属性中，将函数体放在done方法中
	//用法：
	//1）新增一个ParseChain过程对象，var parseChain = new ParseChain('a.b.c')
	//2）调用过程对象的done方法，parseChain.done() => ['a', 'b', 'c']
	function ParseChain(chain, separator) {
		this.chain = chain
		this.separator = separator
	}

	ParseChain.prototype.done = function() {
		var chain = this.chain
		var separator = this.separator
		if (isArr(chain)) {
			return chain
		} else if (isStr(chain)) {
			return this.convert(chain).split(separator || '.')
		} else {
			return []
		}
	}

	//将 'a.b.c[1][2]'转化成纯点操作符模式 = > 'a.b.c.1.2'
	ParseChain.prototype.convert = function(chain) {
		return chain.trim().replace(/\[\d+\]/g, function(propName) {
			return '.' + propName.replace(/\[|\]/g, '')
		})
	}


	//用法：
	//1）新增一个GET过程对象：var get = new Get({a:1}, 'a')
	//2)调用该过程对象的done方法，get.done() = > 1
	function Get(obj, propChain, separator) {
		this.obj = obj
		this.propChain = propChain
		this.separator = separator
	}

	Get.prototype.done = function(callback) {
		var result = this.obj
		var props = new ParseChain(this.propChain, this.separator).done()
		var prop
		if (isFn(callback)) {
			for (var i = 0, len = props.length; i < len; i += 1) {
				prop = props[i]
				callback(result, prop, i)
				result = result[prop]
				if (result === undefined) {
					break
				}
			}
		} else {
			for (var i = 0, len = props.length; i < len; i += 1) {
				result = result[props[i]]
				if (result === undefined) {
					break
				}
			}
		}
		return result
	}

	//用法：
	//1）新增一个Set过程对象： var obj = {a:b:{c:1}}; var set = new Set(obj, 'a.b.c', 2);
	//2)调用过程对象的done方法：set.done() => {a:b:{c:2}}
	function Set(obj, propChain, val) {
		this.obj = obj
		this.propChain = propChain
		this.val = val
	}

	Set.prototype.done = function() {
		var obj = this.obj
		var propChain = this.propChain
		var val = this.val

		if (isObj(propChain)) {
			each(propChain, function(value, chain) {
				new Set(obj, chain, value).done()
			})
			return obj
		}

		var props = new ParseChain(propChain).done()
		var len = props.length
		if (len === 1) {
			obj[props[0]] = val
		} else if (len > 1) {
			var lastIndex = len - 1
			var propName = props[lastIndex]
			var get = new Get(obj, props.slice(0, lastIndex))
			var targetObj = get.done(function(currentObj, currentPropName, index) {
				if (currentObj[currentPropName] == null) {
					var nextPropName = props[index + 1]
					currentObj[currentPropName] = /\D/.test(nextPropName) ? {} : []
				}
			})
			targetObj[propName] = val
		}

		return obj
	}

	//用法：
	//1）新增一个Call过程对象：var call = new Call(document, 'body.getAttribute', 'class')
	//2)调用过程对象的done方法： call.done() == document.body.getAttribute('class')
	function Call(obj, propChain, args, separator) {
		this.obj = obj
		this.propChain = propChain
		this.args = args
		this.separator = this.separator
	}

	Call.prototype.done = function() {
		var obj = this.obj
		var propChain = this.propChain
		var args = this.args

		if (isObj(propChain)) {
			each(propChain, function(args, chain) {
				new Call(obj, chain, args).done()
			})
			return
		}

		var props = new ParseChain(propChain, this.separator).done()
		var len = props.length
		var method = new Get(obj, props).done()
		if (!isFn(method)) {
			return
		}
		obj = new Get(obj, props.slice(0, len - 1)).done()

		return method.apply(obj, isArr(args) ? args : [args])

	}

	//将链式调用变成配置模式
	//$elem.css(styleObj).attr('href', url).animate(obj) => $elem.invoke({css:styleObj,attr:['href', url], animate: obj})
	$.fn.invoke = function(propChain, args) {
		new Call(this, propChain, args).done()
		return this
	}

	//检查数组的项的类型，如果是同一类型，返回true
	//@param {array} 数组
	//@returns {boolean} 布尔值
	function isSimilar(arr) {
		if (!isArr(arr)) {
			return false
		}
		var len = arr.length
		var type
		var i
		if (len > 1) {
			type = toStr(arr[0])
			for (i = len - 1; i > 0; i--) {
				if (toStr(arr[i]) !== type) {
					return false
				}
			}
		}
		return true
	}

	//解析形如css的指令表达式：propName1:value1;propName2:value2;
	function Parse(describe) {
		this.describe = describe
	}

	Parse.prototype.done = function() {
		var describe = this.describe
		var ret = {}
		if (!isStr(describe)) {
			return ret
		}
		var group = describe.trim().split(';')
		each(group, function(value, i) {
			value = value.trim().split(':')
			if (value.length < 2) {
				return
			}
			var propName = value[0].trim()
			var propChain = value[1].trim()
			if (propName && propChain) {
				if (!ret[propChain]) {
					ret[propChain] = []
				}
				if (ret[propChain].indexOf(propName) === -1) {
					ret[propChain].push(propName)
				}
			}
		})
		return ret
	}

	function DirectiveItem($elem, propList) {
		this.$elem = $elem
		this.propList = propList
	}

	//组织元素与指令为特定结构
	function Combine() {
		this.view = {}
	}

	Combine.prototype.done = function($elem, $directive) {
		var view = this.view
		each($directive, function(propList, propChain) {
			var $item = view[propChain]
			if (!isArr($item)) {
				$item = view[propChain] = []
			}
			$item.push(new DirectiveItem($elem, propList))
		})
	}

	//分析元素的指令并收集与组织
	function Collect(combine, $elem, directiveName) {
		this.combine = combine
		this.$elem = $elem
		this.directiveName = directiveName
	}

	Collect.prototype.done = function() {
		var parse = new Parse(this.$elem.attr(this.directiveName))
		this.combine.done(this.$elem, parse.done())
	}

	//根据特定指令名与作用域，扫描出特定结构的viewModel对象
	function Scan($scope, directiveName) {
		this.$scope = $scope
		this.directiveName = directiveName
	}

	Scan.prototype.done = function() {
		var $scope = this.$scope
		var allowScan = $scope.attr('noscan') == undefined
		if (!allowScan) {
			$scope.removeAttr('noscan')
		}
		var directiveName = this.directiveName
		var selector = '[' + directiveName + ']'
		var filter = '[noscan] ' + selector
		var $noScanElems = $scope.find(filter)
		var directiveCache = []
		//Zepto的$.fn.not性能堪忧，不如先删除属性，躲过属性选择器，再添加回去
		$noScanElems.each(function() {
			var $this = $(this)
			directiveCache.push($this.attr(directiveName))
			$this.removeAttr(directiveName)
		})
		var $elems = $scope.find(selector)
		each(directiveCache, function(directive, i) {
			$($noScanElems[i]).attr(directiveName, directive)
		})

		if (!allowScan) {
			$scope.attr('noscan', '')
		}
		var combine = new Combine()
		var index = indexOf($elems, $scope[0])
		//$scope 有可能存在于 $elems 中，因为Zepto的$.fn.find用的是querySelectorAll，没有处理是从自身开始查询的
		if (index === -1) {
			new Collect(combine, $scope, directiveName).done()
		}
		$elems.each(function() {
			new Collect(combine, $(this), directiveName).done()
		})
		return {
			$scope: $scope,
			view: combine.view
		}
	}

	//扫描视图，获取viewModel
	$.fn.scan = function(directiveName, ignoreScope) {
		directiveName = directiveName || $.directive.setter
		var viewModel = new Scan(this, directiveName, ignoreScope).done()
		return viewModel
	}

	//自我复制的元素类
	function ElemGene(elem) {
		this.elem = elem
	}

	//根据数量，复制元素的拷贝，如果有回调，每一份拷贝依次传入回调函数
	ElemGene.prototype.clone = function(amount, callback) {
		if (!isNum(amount)) {
			return this
		}
		var frag = document.createDocumentFragment()
		var elem = this.elem
		var copy
		if (isFn(callback)) {
			for (var i = amount - 1; i >= 0; i--) {
				copy = elem.cloneNode(true)
				frag.appendChild(copy)
				callback(copy, i)
			}
		} else {
			for (var i = amount - 1; i >= 0; i--) {
				copy = elem.cloneNode(true)
				frag.appendChild(copy)
			}
		}

		this.copies = frag
		return this
	}

	//将拷贝集合，插入到基因元素的后面
	ElemGene.prototype.insert = function() {
		if (!this.copies) {
			return this
		}
		var elem = this.elem
		var parent = elem.parentNode
		var next = elem.nextSibling
		if (next) {
			parent.insertBefore(this.copies, next)
		} else {
			parent.appendChild(this.copies)
		}
		this.copies = null
		return
	}

	//销毁元素类
	function Destory() {
		this.frag = document.createDocumentFragment()
	}

	//收集需要销毁的元素
	Destory.prototype.collect = function(elem) {
		this.frag.appendChild(elem)
	}

	//动手销毁
	Destory.prototype.done = function() {
		this.frag.innerHTML = ''
		this.frag = null
	}

	//根据viewModel，将dataModel同步到视图中
	function Sync(viewModel, dataModel) {
		this.viewModel = viewModel
		this.dataModel = dataModel
	}

	Sync.prototype.done = function() {
		var dataModel = this.dataModel
		var viewModel = this.viewModel
		var $scope = viewModel.$scope
		each(viewModel.view, function(directiveList, propChain) {
			var data = new Get(dataModel, propChain).done()
			if (data !== undefined) {
				new Match($scope, directiveList, data).done()
			}
		})
	}

	//匹配将数据更新到视图的方法系列
	function Match($scope, directiveList, data) {
		this.$scope = $scope
		this.directiveList = directiveList
		this.data = data
	}

	Match.prototype.done = function() {
		var $scope = this.$scope
		var directiveList = this.directiveList
		var data = this.data

		if (isSimilar(data)) {
			if (directiveList[0].$elem.attr('norepeat') == undefined) {
				var dataLen = data.length
				var listLen = directiveList.length
				if (dataLen > listLen) {
					var propList = directiveList[0].propList
					var elemGene = new ElemGene(directiveList[listLen - 1].$elem[0])
					elemGene.clone(dataLen - listLen, function(copy) {
						directiveList.push(new DirectiveItem($(copy), propList))
					})
					elemGene.insert()
				} else if (dataLen < listLen) {
					var destory = new Destory()
					for (var i = listLen - 1; i >= dataLen; i--) {
						destory.collect(directiveList[i].$elem[0])
					}
					directiveList.length = dataLen
					destory.done()
				}
			}
			each(directiveList, function(view, i) {
				new Assign($scope, view, data[i]).done()
			})
		} else {
			each(directiveList, function(view) {
				new Assign($scope, view, data).done()
			})
		}
	}

	//传递实例方法
	function Deliver($target, $source) {
		this.$target = $target
		this.$source = $source
	}

	Deliver.prototype.done = function() {
		var $target = this.$target
		var $source = this.$source
		var val
		for (var key in $source) {
			if (hasOwn($source, key)) {
				val = $source[key]
				if (isFn(val)) {
					$target[key] = val
				}
			}
		}
	}

	//根据view的propList，分派data的处理方式
	function Assign($scope, view, data) {
		this.$scope = $scope
		this.view = view
		this.data = data
	}

	Assign.prototype.done = function() {
		var $scope = this.$scope
		var data = this.data
		var view = this.view
		var $elem = view.$elem
		var elem = $elem[0]
		var propList = view.propList
		var hasDeliver

		each(propList, function(propName) {
			propName = propName.split('-')
			var part1 = propName[0]
			var part2 = propName.slice(1)
			var prop = new Get($scope, part1).done()

			//先查$scope及其原型链，注：$.fn为其原型之一
			if (isFn(prop)) {
				var dataCache = new DataCache($elem, data, part1)
				//字符串或数值类型的数据，如果跟上一次传入同名方法的一致，则忽略
				if (dataCache.isEqual()) {
					return
				}
				if ((part1 === 'refresh' || part1 === 'vm') && !hasDeliver) {
					new Deliver($elem, $scope).done()
					hasDeliver = true
				}
				prop.apply($elem, part2.concat(data))
			} else {

				//再查原生elem的原型链
				prop = new Get(elem, part1).done()
				if (isFn(prop)) {
					prop.apply(elem, part2.concat(data))
				} else {

					//全部都不是的时候，当做设置属性处理
					new Set(elem, part1, data).done()
				}
			}
		})
	}

	function DataCache($elem, data, methodName) {
		this.$elem = $elem
		this.data = data
		this.methodName = this.prefix + methodName
	}

	DataCache.prototype = {
		prefix: 'jplus_',
		isEqual: function() {
			var $elem = this.$elem
			var data = this.data
			//只考察和缓存string|number类型的数据，其余的当做不相等
			//约能覆盖80%的使用场景
			if (isStr(data) || isNum(data)) {
				var oldData = $elem.data(this.methodName)
				var isEqual = oldData === data
				if (!isEqual) {
					$elem.data(this.methodName, data)
				}
				return isEqual
			}
			return false
		}
	}


	//备用的指令名称
	$.directive = {
		getter: 'data-bind',
		setter: 'data-bind'
	}


	//扫描视图模型并更新视图数据
	$.fn.refresh = function(dataModel, directiveName) {
		if (this.length !== 1 || !isObj(dataModel)) {
			return this
		}

		//刷新视图时，扫描自身的指令；获取视图数据时，不扫描
		var viewModel = this.scan(directiveName || $.directive.setter)
		new Sync(viewModel, dataModel).done()
		return this
	}

	//根据视图模型，萃取数据
	function Extract(viewModel) {
		this.viewModel = viewModel
	}

	Extract.prototype.done = function() {
		var that = this
		var result = {}
		var hasValue
		each(this.viewModel.view, function(itemList, propChain) {
			var data = that.get(itemList)
			if (data !== undefined) {
				new Set(result, propChain, data).done()
				hasValue = true
			}
		})
		if (hasValue) {
			return result
		}
	}

	Extract.prototype.get = function(itemList) {
		var viewModel = this.viewModel
		var view = viewModel.view
		var $scope = viewModel.$scope
		var scope = $scope[0]
		var result = []

		each(itemList, function(item) {
			var $elem = item.$elem
			var elem = $elem[0]
			var propName = item.propList[0]
			propName = propName.split('-')
			var part1 = propName[0]
			var part2 = propName.slice(1)
			var prop = new Get($scope, part1).done()
			var hasDeliver
			var ret
			if (isFn(prop)) {
				if (part1 === 'refresh' || part1 === 'vm') {
					if (elem === scope) {
						return
					}
					if (!hasDeliver) {
						new Deliver($elem, $scope).done()
						hasDeliver = true
					}
				}
				ret = prop.apply($elem, part2)

				//不收集返回的this值
				ret = ret !== $elem ? ret : undefined
			} else {
				prop = new Get(elem, part1).done()
				if (isFn(prop)) {
					ret = prop.apply(elem, part2)
				} else {
					ret = prop
				}
			}

			//不收集undefined
			if (ret !== undefined) {
				result.push(ret)
			}
		})
		return result.length > 1 ? result : result[0]
	}

	//收集视图中的数据，根据source指定要收集的数据及其数据结构
	$.fn.collect = function(source, directiveName) {

		if (isStr(source)) {
			directiveName = source
			source = null
		}

		var viewModel = this.scan(directiveName || $.directive.getter)

		if (isObj(source)) {
			var oldView = viewModel.view
			var newView = {}
			each(source, function(newPropChian, oldPropChain) {
				if (hasOwn(oldView, oldPropChain)) {
					newView[newPropChian] = oldView[oldPropChain]
				}
			})
			viewModel.view = newView
		}

		return new Extract(viewModel).done()
	}

	//refresh + collect => vm
	$.fn.vm = function(dataModel) {
		return isObj(dataModel) ? this.refresh(dataModel) : this.collect()
	}

	$.Get = Get
	$.Set = Set
	$.Call = Call

}(window.jQuery || window.Zepto)