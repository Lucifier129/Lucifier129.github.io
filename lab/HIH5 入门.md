# HiH5 入门

## HiH5 介绍

HIH5 是以 Backbone 为核心的移动端轻量级单页应用框架。提供良好的 API 封装，让用户只需要关心每个 VIEW 的渲染，其余的动作都交给框架完成。

HiH5 的用法非常简单易学。示例 [线上 demo 地址](http://lucifier129.github.io/hih5-demo/index.html), [Github 地址](https://github.com/Lucifier129/Lucifier129.github.io/tree/master/hih5-demo)

## 第一步，引入 HiH5

用 script 标签直接引入：

```html
<script src="hih5"></script>
```

或以 AMD 方式引入：

```javascript
define(['hih5'], function(App) {
  console.log(App)
})
```

## 第二步，模块与路由配置

HiH5 需要你提供配置数据，结构很简单，只有三个必须字段。

### 一个简单的配置示例

```javascript
window.global_config = {
    "router": {
        "root": '/',
        "pushState": false
    },
    "modules": [{
        "url": "",
        "controller": "index",
        "showLoading": true
    }, {
        "url": "list",
        "controller": "list",
        "showLoading": true
    }, {
        "url": "detail",
        "controller": "detail",
        "showLoading": false
    }
    ],
    loader: requirejs
}
```

### router

router 是一个对象。

- 当 pushState 字段为 true 时，路由模式为 history api，root 字段配置根路径；
- 为 false 时，为 hash 模式，不需要 root 字段，路径都在 # 号后面

### modules

modules 是一个数组，里面包含了每个模块的信息。每个模块都有两个必须的配置：`url` 与 `controller`


- 当 url 字段与当前浏览器的地址相匹配时，加载 controller 字段对应的模块
- controller 必须返回一个 App.Page 类

### loader

loader 是一个函数，用来加载 controller 。如果你用 requirejs， 直接传 requirejs 即可；如果你用 seajs ，则传 seajs.use。如果你用 webpack，则需要你自己书写一个兼容 requirejs api 的自定义 Loader。

## 第三步，选择一个模块加载器

单页应用代码量通常比较大，所以模块化是必需品。正如第二步所示，我们需要选择一个模块加载器，配置为 loader。这个案例使用的是 requirejs。

下面我们配置一下 path，跟 modules 的 controller 对应起来。

```javascript
requirejs.config({
    baseUrl: "js",
    paths: {
        'index': 'views/index',
        'detail': 'views/detail',
        'list': 'views/list'
    }
})

```

现在我们的目录结果大致如下：
- css
    * base.css
- js
    * config.js
    * views
        - index.js
        - list.js
        - detail.js
- lib
    * require.js
    * hih5.js
- index.html

css/base.css 是 hih5 框架依赖的基础布局样式表。

js/config.js 文件放 requirejs 跟 hih5 的配置，lib 文件夹放第三方库，hih5 也在其中。views 文件夹就是每个 controller 字段对应的 js 文件了。

index.html 的结构如下：

```html
<!DOCTYPE html>
<html>
<head>
    <title>HiH5 test</title>
    <link rel="stylesheet" href="./css/base.css">
</head>
<body>
<div id="header"></div>
<div id="container"></div>
<div id="footer"></div>
<script src="./lib/hih5.js"></script>
<script src="./lib/require.js"></script>
<script src="./js/config.js"></script>
<script>App.start(global_config)</script>
</body>
</html>
```
引入 hih5 框架， 引入模块加载器 require.js，引入配置文件 config.js，然后 `App.start(global_config)` 初始化路由器。

框架会将 views 插入 #container 元素中。#header 与 #footer 则是单页应用常用的头尾部件。

## 第四步，写你第一个 view

现在我们开始写 js/views/index.js 这个索引页的 controller 文件，最基本的结构如下：

```javascript
define(function(require, export, module) {
    // 返回 App.Page 继承了 Backbone.View，添加了丰富的生命周期方法，比如 onShow，在
    module.exports = App.Page.extend({
        onShow: function() {
            this.$el.html('index on show')
        }
    })
})
```

此时，web app 已经可以运作了。双击点开 index.html，你将看到 `index on show` 显示在屏幕上。打开 chrome 的开发者工具，查看 network，你会发现，requirejs 请求 js/views/index.js 文件然后正确地调用了它。

## 第五步，补充其他 view

在 js/views/list.js 文件里写一些内容，大致如下：

```javascript
define(function(require, exports, module) {
    module.exports = App.Page.extend({
        onShow: function() {
            this.$el.html('<a href="#/">首页</a>')
        }
    })
})
```

手动修改浏览器地址栏，添加一个 #list 的 hash 字段，js/views/list.js 将会被加载。

list.js 在 onShow 时插入了一个锚点链接，指向 index.js 的 url。如果你点击这个链接，会发现浏览器地址跳转到了 #/，js/views/index.js 输出的 Page 组件执行了 onShow 方法，屏幕上显示 index on show。

再按浏览器的后退和前进按钮，你会发现在 hih5 的帮助下，页面可以正常的前进后退，分别触发不同的 Page 的 onShow 方法。

hih5 的用法就是如此简单。

在 js/views/detail.js 文件里也输出一个 App.Page 类。

```javascript
define(function(require, exports, module) {
    var log = function(name) {
        return console.log.bind(console, name)
    }
    module.exports = App.Page.extend({
        onShow: function() {
            var html = '<h1>标题：Detail</h1>'
            html += '<p><a href="#/">首页</a></p>'
            html += '<p><a href="#/list">列表</a></p>'
            html += '<p><a href="#/detail">详情页</a></p>'
            this.$el.html(html)
        },
        //丰富的生命周期方法，用 Log 函数打印在控制台，检查它们的执行顺序与参数
        onRequest: log('onRequest'),
        onHide: log('onHide'),
        beforeMount: log('beforeMount'),
        afterMount: log('afterMount'),
        beforeUnmount: log('beforeUnmount'),
        afterUnmount: log('afterUnmount'),
        beforeIn: log('beforeIn'),
        afterIn: log('afterIn'),
        beforeOut: log('beforeOut'),
        afterOut: log('afterOut')
    })
})
```

hih5 参考 React 的生命周期理念，提供了精细的生命周期方法，以便你能精准地控制 view 的渲染时机。

打个比方说，onRequest 方法只在 url 改变时调用，浏览器的前进后退按钮不会触发它。网络请求的代码就可以放在 onRequest 当中，只在有必要时才发请求。

再比如说，某个 view 里面有倒计时抢购的模块。那么在 onShow 时加定时器，onHide 时解除定时器，避免无谓的计算。

你还可以选择在 beforIn 方法里渲染模板，并插入到 this.$el 元素中，当 view onShow 时，内容就已经有了。

## 第六步，如何为你的 view 绑定事件

App.Page 继承了 Backbone.View，拥有它的一切功能，所以只需要像使用 Backbone.View 那样绑定事件即可。

我们修改 js/views/index.js，演示绑定事件的功能：

```javascript
define(function(require, exports, module) {
    module.exports = App.Page.extend({
        initialize: function() {
            this.count = 100
        },
        events: {
            'click .square': 'swell'
        },
        swell: function(e) {
            this.count += 10
            this.$(e.currentTarget).css({
                width: this.count,
                height: this.count
            }).text(this.count)
        },
        afterMount: function() {
            var style = 'width:' + this.count + 'px;height:' + this.count + 'px;'
            this.$el.html('<div class="square" style="' + style + '"">' + this.count +'</div>')
        },
        onShow: function() {
            this.$el.find('.square').trigger('click')
        }
    })
})
```

afterMount 插入到页面之后，渲染了一个蓝色方块，点击它就会 swell (膨胀) 10 像素。然后在 onShow 方法里触发点击事件。

## 第七步，如何发 ajax 请求？

hih5 内置了 zepto 库，$ 符号也是全局变量之一。所以你可以直接使用 $.ajax 发请求。

不过，其实你有更好的选择，App.fetch ，参数跟 $.ajax 保持一致，但是返回的是 promise 对象。

你可这样写:

```javascript
var promise = App.fetch({ url: '/resfapi'})
promise
    .then(function(data) {}) //成功后调用
    .catch(function(error) {}) // 失败时调用

promise.xhr //能拿到 $.ajax 返回的对象
promise.xhr.abort() //终止此次请求
```

## 第八步，如何解决图片懒加载问题？

hih5 内置了轻量级图片懒加载库，所以不需要你处理任何事情。除了将图片的真实地址保存在 data-src 属性中。

此外，如果你想在 retina 屏幕中显示更高清的，你可以再添加一个 data-src-retina 属性保存你的高清图片地址。

即便是背景图片，也支持懒加载，只需要将背景图片的真实地址，保存在 data-src-bg 属性中。

需要注意的是，添加了 data-hidden 属性的标签，不会触发懒加载更新，有时你可能用得到它。

## 第九步，如何解决移动端点击延迟的问题？

hih5 内置了 fastclick 库，并且自动初始化，所以你不必担忧点击延迟问题。

## 第十步， 如何选择模板引擎？

hih5 内置了 underscore 的模板，以及轻量级 react-like 模板引擎 roit，它们都能以全局变量 _ 和 riot 直接引用。

当然，如果你有其他需求，可以选择自己的模板引擎，hih5 并不限定你必须使用哪个模板引擎。

## 第十一步，如何处理浏览器地址的前进、后退与跳转？

hih5 提供了 App.goBack() 提供后退能力（并触发路由事件）；App.goTo(url) 则可以前往指定 url（并触发路由事件），App.jump(url) 跳转到指定 url(不触发路由事件，直接刷新页面)。

## 其他问题

其他问题可以参考 hih5 的 api 文档说明，或者直接询问 hih5 框架的开发人员解惑。

## 结语

hih5 将繁复的路由匹配、模块化加载、点击延迟、图片懒加载等动作封装起来，让开发人员可以只关注自己的 view 层业务逻辑，技术栈也是经典的 Backbone、underscore 与 zepto，学习成本极低。如此简单易用的框架，值得尝试一下。