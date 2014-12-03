#Javascript里有趣的函数技巧

##前言

在Javascript中函数被置于特殊的地位，它们既是可执行的代码片段，又属于对象，而且承担管理作用域的功能，更重要的是，函数还可以作为值在变量名之间传递。

一些前辈/牛人将函数的这些特性运用到了一定境界，设计出了一些有趣的函数方法。


##函数柯里化

下面是一种函数柯里化的原型方法：

```javascript
Function.prototype.curry = function() {
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function() {
      return fn.apply(this, args.concat(
        Array.prototype.slice.call(arguments)));
    };
  };

//用法示例:
function sum(a, b) {
	return a + b
}

var sum_has_a = sum.curry(10)

sum_has_a(11) // ==> 21

```

改成非原型方法的版本：

```javascript
function curry(fn) {
	if (typeof fn !=='function') {
		return
	}
	var slice = Array.prototype.slice
	var args = slice.call(arguments, 1)
	return function() {
		return fn.apply(this, args.concat(slice.call(arguments)))
	}
}
//数组的slice方法返回新数组，一个类数组对象进去，真数组对象则输出；这个类数组对象没有被修改

//用法示例:
function sum(a, b) {
	return a + b
}

var sum_has_a = curry(sum, 10)

sum_has_a(11) // ==> 21
````

上述的柯里化实现，本质上是一个`记忆+替身`的处理。记住一些参数，返回一个替身函数，替身函数调用时，内部拼接所记忆的参数与新参数给真身函数。

按(忘记是哪位)前辈的形象化说法，柯里化就是对砍头技术的命名；它拼接参数时，将所记忆的参数拼在最前面，新参数排后面。

替身函数就相当于真身函数的前几个参数被砍了的状态。

既然柯里化只是将已知参数与动态参数拼接起来的其中一种策略，那么很自然的可以联想到其他策略，比如：

>* 已知参数拼接在最后部分
>* 已知参数可以打散，分配到任意形参位置

##Partial

下面是一种`Partial`实现：

```javascript
Function.prototype.partial = function(){
    var fn = this, args = Array.prototype.slice.call(arguments);
    return function(){
      var arg = 0;
      for ( var i = 0; i < args.length && arg < arguments.length; i++ )
        if ( args[i] === undefined )
          args[i] = arguments[arg++];
      return fn.apply(this, args);
    };
  };

  function sum(a,b,c,d) {
    return a + b + c + d
  }

  var _sum = sum.partial(undefined, undefined,1, undefined)

  _sum(1,2,3) // ==>7
  _sum(2,2,3) // ==>7
  _sum() // ==>7
```

上述实现，由于直接修改了所保存的已知参数的数组，填充一次后便不再改变，所以之后的替身函数，不管传参与否，真身函数所接受的都只是第一次拼接好的参数数组。

这对于只求值一次的函数设计来说，无可厚非；但对于需要反复接受新参数做既定运算的需求；需要做一个小修改，如下：

```javascript
	Function.prototype.prefill = function() {
		var fn = this
		var _args = Array.prototype.slice.call(arguments)
		return function() {
			//得到新数组
			var args = _args.slice()
			var count = 0
			for (var i = 0, len = args.length, total = arguments.length; i < len && count < total; i += 1) {
				if (args[i] === undefined) {
					args[i] = arguments[count++]
				}
			}
			return fn.apply(this, args)
		}
	}
	function sum(a,b,c,d) {
		return a + b + c + d
	}
	var _
	var _sum = sum.prefill(_, _,1, _)

	_sum(1,2,3) //==> 7
	_sum() //== NaN
	_sum(4,5,6) //==> 16

```

`prefill`所保存的已知参数数组作为拷贝源，不参与直接运算；如此反复调用反复拼接。

`partial`与`prefill`都是先占位，后补充。占位时已经确定了实参个数，有时这不是我们想要的。

对一个实参数量不定的函数来说，如果想给它指定一个排在倒数第三个的已知参数，该怎么办呢？

```javascript
	//order指定索引，source提供参数
	Function.prototype.order = function(order, source) {
		var fn = this
		var max = Math.max.apply(Math, order)
		var min = Math.min.apply(Math, order)
		//根据order数组，确定最小实参数量
		var minLen = min < 0 ? max - min : max
		return function() {
			var len = order.length
			var total = len + arguments.length
			if (total < minLen) {
				throw new Error('参数个数还差' + (minLen - total) + '个')
			}
			var params = new Array(total)
			var args = Array.prototype.slice.call(arguments)
			var index
			//先根据order数组指定的索引，填充source数组里的值作为参数
			for (var i = 0; i < len; i += 1) {
				index = order[i]
				params[index < 0 ? index + total : index] = source[i]
			}
			//再拼接调用替身函数时传入的参数
			for (i = 0, len = params.length; i < len; i += 1) {
				if (params[i] === undefined) {
					params[i] = args.shift()
				}
			}
			return fn.apply(this, params)
		}
	}

	function test() {
		console.log(arguments)
	}

	var test_curry = test.order([0,1,2,3], [0,1,2,3])

	test_curry(4,5,6,7,8,9,0) //==> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

	var test_third_from_bottom = test.order([-3], ['I am the bottom third'])

	test_third_from_bottom(1,2,3,4,5,6,7,8,9,0) //==>  [1, 2, 3, 4, 5, 6, 7, 8, "I am the bottom third", 9, 0]

	var test_prefill = test.order([-2, -1, 0,3],  [-2, -1, 1,3])

	test_prefill(10,11,12,13,14,15,16) //==> [1, 10, 11, 3, 12, 13, 14, 15, 16, -2, -1]

```
如上，`order`方法能多样化的处理已知参数的分配情况，`curry`与`prefill`是其中的特殊情况。

请注意，这篇文章提供的方法，部分是我根据需求即兴写就，还没有经过大量实践的考验，有可能存在bug；使用时后果自负。

##反柯里化

既然柯里化是砍头，反柯里化就是接头咯。下面是其中一种接头实现：

```javascript
	//normal
	function antiCurry(fn) {
		return function() {
			return Function.prototype.call.apply(fn, arguments)
		}
	}
	//prototype method
	Function.prototype.antiCurry = function() {
		var fn = this
		return function() {
			return Function.prototype.call.apply(fn, arguments)
		}
	}

	var slice = antiCurry(Array.prototype.slice)
	var toString = antiCurry(Object.prototype.toString)

	function test() {
		console.log(toString(slice(arguments)))
	}

	test() //==> [object Array]

	//对call与apply进行反柯里化
	var call = antiCurry(Function.prototype.call)
	var apply = antiCurry(Function.prototype.apply)

	function say(msg) {
		console.log(msg || this.name)
	}

	var obj = {
		name: 'Jade'
	}

	//其实不过是把say.call(obj)换成了call(say, obj)
	//say.call时，say是call方法内部的this值，反柯里化后作为第一个参数
	call(say, obj) //==>Jade
	apply(say, obj) //==> Jade
	call(say, obj, 'asfd') //==>asfd
	apply(say, obj, ['asdfasdf']) //==>asdfasdf
```

乍看起来，这个反柯里化实现让人头晕目眩，又是`call`，又是`apply`的。此时要用解剖学的视角来审视，`Function.prototype.call`是一个方法，跟其他方法没什么差别，也可以被`call`和`apply`改变`this`值。

'fn.call'的本质是`函数也是对象`，`对象可以拥有方法`, `调用方法时，this值指向该对象`

`fn.call`是普通方法调用，而`(Function.prototype.call).apply(fn)`是借用式调用。借用式调用稀松平常，这会儿遭遇特殊情况罢了。

上述反柯里化的功能是将方法函数的this值拉到第一个参数位置。

原本要'Array.prototype.slice.call(context)'的情况，免除了`call`。


##结语

javascript的函数特性还可以衍生出更奇妙的用法，但是从实践层面出发，其中绝大多数价值不大。

比如上面所谓的`order`方法，貌似可以很灵活的分配参数。其实，从另一个角度来说，当你需要使用`order`时，很可能就是需要重新设计你的代码的时候。

一个好的代码组织策略，往往不需要脑经急转弯式的函数技巧。那些确实能帮助开发者更便利的工作的技巧，自然而然的会在业界传播开来。

不过这并不意味着了解这些东西就是错误；学习和运用一门语言到一定阶段，对其中的黑魔法产生兴趣有助于进阶。它能让你保持对这门语言的新鲜感与学习的激情，拓展认知广度和深度。只有这样，最后我们才能做到`我知道黑魔法与其他高深技巧可以选择，我却依然选择了朴素而坚韧的实现方法`。

纯粹模仿最佳实践，即便写出一模一样的代码，也有“我只会这一种实现”和“我有多种实现，但根据实际情况选择了这种“的差异。





