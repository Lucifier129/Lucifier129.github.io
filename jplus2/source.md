# jplus 教程

作者：Jade

社交地址：[微博]、[Github]

## 目录
- 如何引用`jplus`
- 如何将数据同步到视图
- 如何将`jplus`用作模板引擎
- 如何渲染嵌套数据到视图
- 如何禁止父元素扫描自身的子元素
- 如何禁止数组数据改变元素数量
- 如何自定义指令
- 如何动态调用指令
- 如何从视图中获取数据
- 如何将`data-bind`拆分为`data-get`和`data-set`
- 如何获取视图模型
- 如何根据指定的html属性获取视图模型
- 如何指定视图中需要获取的数据

## 内容

### 如何引用`jplus`

作为`jQuery插件`引入

```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jplus.js"></script>
```

### 如何将数据同步到视图

首先：在`html`中使用`data-bind`属性，按照`css语法`书写`key:value;`
    
```html
<div id="scope">
    <p data-bind="attr-class:className">Hello <span data-bind="text:name"></span></p>
</div>
```

然后：在`javascript`中调用`jQuery`的`refresh`方法

```javascript
$('#scope').refresh({
    name: 'jplus.js',
    className: 'descri'
})
```

大功告成

<iframe width="100%" height="300" src="http://jsfiddle.net/Jade129/bsahr0t9/6/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


`html` 标签的`data-bind`属性中，`key`可以为如下内容

* `jQuery`实例的方法，即在实例化后，手动添加在该实例上的方法名
* `jQuery`的原型方法的名字，即`$.fn`上的方法名
* `jQuery`实例对应的`dom`元素的方法名与属性名

而`value`则对应数据对象的属性名。

`key`和`value`都支持点操作符和方括号操作符链式取值, 如下都是合法的
* `a.b.c.e.f`
* `a[0].b[1]`

注意事项：避免空指令。如果找不到对应的方法函数，数据将直接成为`dom元素`的属性


## 如何将`jplus`用作模板引擎

只要将数据打包成数组，`jplus`就会自动安排同等数量的元素对应；不够的`clone`出来，多余的`remove`掉

```html
<div id="scope">
    <ul>
        <li data-bind="text:list">写一些默认内容，待会儿就被覆盖</li>
    </ul>
</div>
```

```javascript
var list = []

for (var i = 0; i < 20; i += 1) {
    list[i] = '列表项目' + i
}

setInterval(function() {
    //随机长度
    var randomLen = Math.floor(Math.random() * list.length + 1)
    var curList = list.concat().sort(function() {
        //随机化排序
        return Math.random() - 0.5
    })
    
    curList.length = randomLen
    
    $('#scope').refresh({
        list: curList
    })
}, 800);
```

效果：

<iframe width="100%" height="300" src="//jsfiddle.net/Jade129/5zqv6o25/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

注意事项：
- 只有数据类型一致的数组，才作为模板数据
- 数据类型不同的数组，全部作为参数传入指令方法
- 传入空数组，对应的`dom元素`将全部删除
- 每次调用`refresh`方法，都会即时扫描视图，如果元素被删除，则无法收集指令
- 可以通过故意为数组追加`null`、`false`等强行将数据类型不一致化，达到传多个参数的目的

## 如何渲染嵌套数据到视图

将`refresh`作为指令，即可渲染嵌套数据

```html
<div id="scope">
    <ul>
        <li data-bind="refresh:classList">
            <h3 data-bind="text:classTitle"></h3>
            <ul>
                <li data-bind="text:content"></li>
            </ul>
        </li>
    </ul>
</div>
```

```javascript
var data = {
    classList:[{
        classTitle:'类名1',
        content:[1, 2, 3, 4, 5]
    },{
        classTitle:'类名2',
        content:[6, 7, 8, 9, 10]
    },{
        classTitle:'类名3',
        content:[11, 12, 13, 14, 15]
    },{
        classTitle:'类名4',
        content:[16, 17, 18, 19, 20]
    },{
        classTitle:'类名5',
        content:[21, 22, 23, 24, 25]
    }]
}

$('#scope').refresh(data)
```

效果：
<iframe width="100%" height="300" src="//jsfiddle.net/Jade129/gue3dr4z/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## 如何禁止父元素扫描自身的子元素

添加`noscan`属性后，只有该元素的`jQuery实例`调用`refresh`才能刷新视图

```html
/*添加noscan属性，视图私有化*/
<div noscan>
	<span data-bind="text:text"></span>
</div>
```

## 如何禁止数组数据改变元素数量

添加`norepeat`属性后，遇到数据类型一致的数组，数据比元素多时，忽略多余数据；元素比数据多时，忽略多余元素

```html
/*不论多少数据，都只更新现有的元素*/
<div norepeat>
	<li data-bind="text:text"></li>
</div>
```

## 如何从视图中获取数据

`jQuery`的`API设计`理念之一是：既是`getter`，也是`setter`

```javascript
$('body').html() // get HTML
$('body').html(content) // set HTML
$('body').attr('id') // get ID
$('body').attr('id', newID) // set ID
```

对于这类指令。当需要刷新视图时，`jplus`传入数据；当需要从视图中获取数据时，`jplus`不传参数或者只传必要的参数。

在上一个例子中，只需要调用`collect`方法，就从视图中获取了所需的数据。

<iframe width="100%" height="300" src="//jsfiddle.net/Jade129/ursm1j9n/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 如何自定义指令

所谓指令，在`jplus`中指写在`html`的`data-bind`属性中，格式类似`css语法`的`键值对`

```html
<ul id="scope">
    <li data-bind="text:msg; setTitle:title; setData-directive:directive"></li>
</ul>
```

```javascript
//插件写法，为原型添加方法，属于全局指令
$.fn.setTitle = function(title) {
    if (typeof title === 'undefined') {
        return this.attr('title')
    } else {
        this.attr('title', title)
    }
}

var $scope = $('#scope')

//实例特有方法，属于局域指令
$scope.setData = function(name, val) {
    if (!name) {
        return
    }
    if (typeof val === 'undefined') {
        return this.attr('data-' + name)
    } else {
        this.attr('data-' + name, val)
    }
}

$scope.refresh({
    msg: '一点测试文本，没有别的意思',
    title: '啊,title',
    directive: 'css-color:theColor;css-fontSize:size;'
})

//自定义指令，如果也按照getter && setter设计，也能获取数据
$('body').append(JSON.stringify($scope.collect()))

setTimeout(function() {
    
    //directive不会刷新到视图中，因为新的实例不具备setData方法
    //但是，它会成为dom.setData的属性值，这是需要注意的点
    $('#scope').refresh({
        msg: '我是原型方法，所以全局通用，新实例也能调用我',
        directive: 'new directive'
    })
    
    //从视图中获取数据，也可以获取属性的，所以directive值还是能从dom.setData中得到
    $('body')
        .append('<br><br><br>')
        .append(JSON.stringify($('#scope').collect()))
}, 3000)

```

效果：

<iframe width="100%" height="300" src="//jsfiddle.net/Jade129/9tg0q3jp/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 如何动态调用指令

`jplus`提供了`invoke`方法，提供动态用功能，有两种用法

```javascript
//单个调用
$scope.invoke('html', '<p>some text</p>')

//多个调用
$scope.invoke({
	html: '<p>some word</p>',
	css: ['color', '#999'], //多个参数打包成数组形式
	attr: ['title', 'a title']
})
```


```html
<div id="scope">
    <input type="text" data-bind="invoke:text" />
</div>
```

```javascript
var count = 0
var timer = setInterval(function() {
    var data = [{
            text: {
                'val': count - 1,
                'attr': ['title', count - 1]
            }
        },{
            text: {
                'css': ['font-size', count]
            }
        }]
    $('#scope').refresh(data[count % 2])
   count++
   if (count === 100) {
       clearInterval(timer)
   }
}, 300)
```

效果：

<iframe width="100%" height="300" src="//jsfiddle.net/Jade129/kd7qqvbs/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 如何将`data-bind`拆分为`data-get`和`data-set`

```javascript
//jplus 源码如下。修改属性值即可
$.directive = {
	getter: 'data-bind', //对应获取数据
	setter: 'data-bind' //对应刷新视图
}

//修改
$.directive.getter = 'data-get'
$.directive.setter = 'data-set'
```

[微博]:http://weibo.com/islucifier
[Github]:https://github.com/Lucifier129