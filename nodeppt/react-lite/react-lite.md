title: React-Lite: 专注 WEB 平台的高性能 React.js
speaker: 古映杰@ctrip
transition: slide
theme: dark
[slide]
# React-Lite: 专注 WEB 平台的高性能 React.js
## 分享者：古映杰@Ctrip

[slide]
# React-Lite 是什么？
基于 React API 单元测试的轻量版实现 React-Lite(v0.15.9 `25kb`)
<img src="/img/test.png" />

[slide]
# React-Lite 解决什么问题？
## 更小的体积，更强的性能 [js-repaint-perf](http://lucifier129.github.io/vdom-engine/examples/js-repaint-perf/)
- 高性能：`virtual-dom`
- 组件化：`React.Component` && `stateless Component`
- 可维护性: 单向数据流`flux/redux`
- 轻量(TODO): `mobile first`(React-Lite 25kb)
- SEO：服务端渲染 `React.renderToString`
- 多终端：`learn once, write anywhere`(React-Native)

[slide]
# React 为什么这么大？
## React v15.0.1 压缩后体积 140+ kb
## 当前所有 virtual-dom 实现中体积最大

<img src="/img/dove.jpg" />

[slide]
# 如何评价 React 源码？
## 一流的思想，三流的实现

- 设计错误
	* API 冗长
	* 初始化渲染使用 `renderToString` + `innerHTML`
- 工程化失控
	* 2013年的 issue：[react-mobile](https://github.com/facebook/react/issues/436)，[Why is React's filesize so big?](http://stackoverflow.com/questions/19807946/why-is-reacts-filesize-so-big-given-its-small-api)
	* 2016年 v15.0 版本的 `react-dom/react-server`，依然是两个空的 `placeholder` 包

[slide]
# React-Lite 为什么体积小？
## `just virtual-dom and component`

- 事件系统基于浏览器原生实现的 w3c 事件标准
- 砍掉 `renderToString`
- 置空 PropTypes 验证
- 只考虑 web 平台，无需在 react-native 里复用代码 

[slide]
# React-Lite 能做什么？
## 在 90% 以上的场景下完全替代 React

- works with `react-bootstrap`: [doc demo](http://react-lite-with-bootstrap.herokuapp.com/)
- works with `ant-design`: [demo](http://lucifier129.github.io/ant-design/)
- works with `react-router`: [examples](http://react-lite-with-react-router.coding.io/)
- works with `react-motion`: [demos](http://lucifier129.github.io/react-motion-with-react-lite/index.html)
- works with `react-d3-components`: [demos](http://lucifier129.github.io/react-d3-components-demos/)
- works with `react-d3`: [demos](http://lucifier129.github.io/react-d3-demos/)

[slide]
# 为什么要用 React-Lite ？

- 更小的体积
- 更快的性能
- 便捷的替换方式 [webpack alias](https://github.com/Lucifier129/react-lite)
- 安全又稳定（一旦出现不能及时修复的问题，可随时替换回原版 React)

[slide]
# React-Lite 的彩蛋
## 依赖 jQuery 兼容 IE6+ 浏览器
## 从 ES3 跃迁到 ES2015 

- vender: json2 + es5-shim + es5-sham + es6-promise + object-assign + requestAnimationFrame + jQuery + React-Lite = 160kb 左右
- [workflow](https://github.com/Lucifier129/fe-starter): webpack + babel6 + es3ify + eslint-airbnb-config + npm

[slide]
# 为什么要造轮子？
## 造轮子是学习和研究的最佳途径

- 了解底层机制的运作方式
- 掌握性能优化的基本思路
- 激发良性竞争
- 促进对现有工具的反思

[slide]
# 谁在用 React-Lite
## 首批吃螃蟹的勇士们

- 携程度假研发部，PC 新版融合填写页、团队游无线端h5(v6.15)部分页面
- 机票研发部部分 h5 页面
- 框架研发部 Lizard v3.0 集成 React-Lite (意向)
- 部分外国友人(npm 每个月 1000 以上的下载量)
- 以及在座的勇士们：）

[slide]
# Q&A 时间
<img src="/img/qa.jpg" />