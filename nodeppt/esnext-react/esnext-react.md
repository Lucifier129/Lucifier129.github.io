title: 用 ES2015 一步步打造轻量级 ReactJs
speaker: Jade
transition: slide
[slide]
# 用 ES2015 一步步打造轻量级 ReactJs
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