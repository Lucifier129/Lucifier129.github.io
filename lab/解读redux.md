# 解读redux

## 前言

[redux](https://github.com/rackt/redux) 是 facebook 提出的 flux 架构的一种优秀实现；而且不局限于为 react 提供数据状态处理。它是零依赖的，可以配合其他任何框架或者类库一起使用。要想配合 react ，还得引入 [react-redux](https://github.com/rackt/react-redux)。

redux 团队的野心比较大，并不想让 redux 局限于 react 生态链中的一环。他们让 redux 自身保持简洁以便适配各种场景，让社区发展出各种 `redux-*` 中间件或者插件，从而形成它自己的生态系统。

redux 的核心很简洁。这篇文章将专注于解读 redux 核心的设计思路，以 [Isomorphism-react-todomvc](https://github.com/Lucifier129/Isomorphism-react-todomvc) 这个项目为示例。它很可能是目前实现最完备的 react/redux todomvc demo，包含 react/redux 服务端渲染、路由filter、websocket同步等。

可以猛戳 [DEMO](http://isomorphism-react-todomvc.coding.io/) 地址。在控制台里能看到 `redux-logger` 中间件输出的 action 日志，它们清晰地反映了业务逻辑是怎样的 。如果有其他人在编辑 todolist，基于 websocket 服务端推送技术的支持，你也可以直接看到别人的操作过程。

## 理念与设计

### 为什么要有 action ？

每个 web 应用都至少对应一个数据结构，而导致这个数据结构状态更新的来源很丰富；光是用户对 view 的操作(dom 事件)就有几十种，此外还有 ajax 获取数据、路由/hash状态变化的记录和跟踪等。

来源丰富不是最可怕的，更可怕的是每个来源提供的数据结构并不统一。DOM 事件还好，前端可以自主控制与设计； ajax 获取的数据，其结构常常是服务端开发人员说了算，他们面对的业务场景跟前端并不相同，他们往往会为了自己的便利，给出在前端看来很随意的数据结构。

即便是最专业的服务端开发人员，给出最精准的 `restful` 数据，它也会包含 `meta` 数据，表明此次返回是否存在错误，如果存在错误，则提供错误信息。除非是 facebook 最近提出的 `graphql` + `relay` 模式，不然我们总得对各个来源的数据做一个前期处理。

我们得用专门的处理函数，在各个数据来源里筛选出我们真正需要的数据，不把那些无关紧要的、甚至是脏的数据污染了我们的全局数据对象。

这种对数据来源做萃取工作的函数，就叫 `action`。它叫这个名字，不是因为它「数据预处理」的功能，而是在 web 应用中所有的数据与状态的变化，几乎都来自「事件」。dom 事件，ajax 成功或失败事件，路由 change 事件， setTimeout 定时器事件，以及自定义事件。任意事件都可能产生需要合并到全局数据对象里的新数据或者线索。

action 跟 event (事件)并不等同。比如在表单的 `keyup` 事件中，我们只在 `e.keyCode` 等于回车键或者取消键时，才触发一类 `action`。dom 事件提供的数据是 event 对象，里面主要包含跟 dom 相关的数据，我们无法直接合并到全局数据对象里，我们只将感兴趣的部分传入 action 函数而已。

所以，是 event 响应函数里主动调用了 action 函数，并且传入它需要的数据。


### 为什么要有 reducer ?

action 仅仅是预处理，将脏数据筛选掉，它未必产生了可以直接合并到全局对象的数据与结构，它甚至可能只是提供了线索，表示「需要获取某某数据，但不在我这儿」。action 函数的设计，也为它「只提供线索」的做法提供了支持，action 函数必须返回一个带有 type 属性的 `plain object`。

```javascript
//actions.js
//添加 item 只需要一个 text 字符串数据
export function addItem(text) {
    return {
        type: 'ADD_ITEM',
        text
    }
}
//删除 item 只需要拿到它的 id
export function deleteItem(id) {
    return {
        type: 'DELETE_ITEM',
        id
    }
}

//删除所有已完成事项，不需要额外数据，只需要线索，线索就是 type
export function clearCompleted() {
    return {
        type: 'CLEAR_COMPLETED'
    }
}
```

如上所示，action 函数的设计理念如下：

- action 的参数用来筛掉脏数据，调用 action 函数的人，有义务只传入它需要的数据
- action 返回的 plain object 中包含属性为 type 的常量值
    * 表明这个对象里携带的其他数据应该被如何「再处理」
    * 或者不带其他数据，仅仅启示已有数据需要如何调整，或者需要主动获取哪些数据

`reducer` 就是迎接 action 函数返回的线索的「数据再处理函数」， action 是「预处理函数」。

因为 action 返回的数据有个固定的结构，所以 reducer 函数也有个固定结构。

```javascript
//reducer 接受两个参数，全局数据对象 state 以及 action 函数返回的 action 对象
//返回新的全局数据对象 new state
export default (state, action) => {
    switch (action.type) {
        case A:
        return handleA(state)
        case B:
        return handleB(state)
        case C:
        return handleC(state)
        default:
        return state //如果没有匹配上就直接返回原 state
    }
}
```

如上所示，每个 action.type 的 case (A/B/C)，都有一个专门对应的数据处理函数 (handleA/handleB/handleC)，处理完之后返回新的 state 即可。

reducer 只是一个`模式匹配`的东西，真正处理数据的函数，是额外在别的地方写的，在 reducer 中调用罢了。

reducer 为什么叫 reducer 呢？因为 action 对象各种各样，每种对应某个 case ，但最后都汇总到 state 对象中，从多到一，这是一个减少( reduce )的过程，所以完成这个过程的函数叫 `reducer`。

### 为什么要有 combineReducers ?

reducer 的第一个参数是全局 state 对象。你想想看，全局意味着什么？

state 对象的树形结构必定会随着 web 应用的复杂性而变得越来越深。当某个 `action.type` 所对应的 case 只是要修改 `state.a.b.c.d.e.f` 这个属性时，我的 `handleCase` 函数写起来就非常难看，我必须在这个函数的头部验证 state 对象有没有那个属性。

我们需要这种模式：

```javascript
//这个 reducer 的 state 属性不是全局 state 本身
//而是它的一个子代属性，比如 state.todos 这个对象
//返回的 new state 也会合并到 state.todos 属性中
export default (state, action) => {
    switch (action.type) {...}
}
```

如上所示，写起来是普通的 reducer ，但拿到的不是全局 `state`。

实现方法很简单，遍历一个「全是方法」的「函数储存对象」，返回新对象，这个新对象的 `key` 跟「函数储存对象」一样，它的 `value` 则是「函数储存对象」的同名方法接受 `(state[key], action)` 参数的返回值。

```javascript
var reducers = {
    todos: (state, action) { //预期此处的 state 参数是全局 state.todos 属性
        switch (action.type) {...} //返回的 new state 更新到全局 state.todos 属性中
    },
    activeFilter: (state, action) { //预期拿到 state.activeFilter 作为此处的 state
        switch (action.type) {...} //new state 更新到全局 state.activeFilter 属性中
    }
}

//返回一个 rootReducer 函数
//在内部将 reducers.todos 函数的返回值，挂到 state.todos 中
//在内部将 reducers.activeFilter 函数的返回值，挂到 state.activeFilter 中
var rootReducer = combineReducers(reducers) 
```

redux 的 combineReducers 源码如下：

```javascript
//combination 函数是 combineReducers(reducers) 的返回值，它是真正的 rootReducer
//finalReducers 是 combineReducers(reducers) 的 reducers 对象去掉非函数属性的产物
 //mapValue 把 finalReducers 对象里的函数，映射到相同 key 值的新对象中
function combination(state = defaultState, action) {
    var finalState = mapValues(finalReducers, (reducer, key) => {
      var newState = reducer(state[key], action); //这里调用子 reducer 
      if (typeof newState === 'undefined') {
        throw new Error(getErrorMessage(key, action));
      }
      return newState; //返回新的子 state
    });
    //...省略一些业务无关的代码
    return finalState; //返回新 state
 };
```

相信你也注意到了，`mapValue` 只是一级深度的映射，目前 `redux` 并没有提供简便的映射到 `state.a.b` 一级以上深度的 state 的方法。这是它目前的不足之处。

设想我们做一个移动端 webapp，有很多个 view 在单页中，比如 index 页，list 页，detail 页，redux 提供的「一级分解」一下子就让各个 view 消耗完了，如果还要分割每个 view 的 state ，看起来会很麻烦。

在这里提供几个解决思路：

第一个方案是 `superGetter/superSetter`， 
```javascript
export default (state, action) => {
    switch (action.type) {
        case A:
        let subState = superGetter(state, 'a.b.c') //根据 path 深度获取属性值
        return superSetter(state, 'a.b.c', handleA(subState)) //根据 path 深度设置属性
        default:
        state
    }
}
```

第二个方案是嵌套 `combineReducers` 。

```javascript

var todosReducers = {
    active: (state, action) => { //拿到全局 state.todos.active
        switch (action.type) {
            case A: //处理 A 场景
            return handleA(state)
            case B: //处理 B 场景
            return handleB(state)
            default:
            return state
        }
    },
    completed: (state, action) => { //拿到全局 state.todos.completed
        switch (action.type) {
            case C: //处理 C 场景
            return handleC(state)
            default:
            return state
        }
    }
}

var todosRootReducer = combineReducers(todosReducers)

var reducers = {
    todos: (state, action) => { //拿到全局 state.todos
        switch (action.type) {
            case A:
            case B:
            case C:
            // A B C 场景都传递给 todosRootReducer
            return todosRootReducer(state, action)
            case D:
            //...handle state
            default:
            return state
        }
    }
}

//rootReducer(state, action) 这里的 state 是真正的全局 state
var rootReducer = combineReducers(reducers)
```

需要注意的是，`redux` 的 `combineReducers(reducers)` 的返回值 rootReducers， 总是返回新的 state，它不是修改旧 state，而是创建空对象，然后将 key/value 往上面挂载。只有在 `reducers` 对象上的 key 才会被迁移。也就是说：

```javascript
var rootReducers = combineReducers({
    a() {
        //TODO
    },
    b() {
        //TODO
    },
    c() {
        //TODO
    }
})

// newState 只有 a/b/c 三个属性，没有 d 属性，因为 reducers 对象只有 a/b/c
var newState = rootReducers({
    a:1,
    b:2,
    c:3,
    d: 4
}, {
    type: 'TEST'
})

```

第三个方案更为激进，目前 `redux` 没有提供，需要修改其源码。这个模式是 `transformer` （转换器）

```javascript
//combineReducers 新增第二个参数 transformers
export default combineReducers(reducers, transformers) {
    //..一些预处理工作
    return function combination(state = defaultState, action) {
        var finalState = mapValues(finalReducers, (reducer, key) => {
            var transformer = transformers[action.type] //根据 action.type 来筛选
            var newState
            if (typeof transformer === 'function') {//如果有转换器
                //控制权交给转换器
                newState = transformer(state[key], action, reducer, key)
            } else {
                //否则采取默认模式
                newState = reducer(state[key], action);
            }
            if (typeof newState === 'undefined') {
                throw new Error(getErrorMessage(key, action));
            }
            return newState;
        });
        return finalState
    }
}
```

有了上面的修改，我们就可以针对 action.type 来选择全局 state 的更新路径了。

```javascript
var transformers = {
    'ACTION_TYPE1': (state, action, reducer) => {
        return {
            ...state,
            newProp: reducer(state.prop, action) //更新到 newProp 属性中去
        }
    },
    'ACTION_TYPE2': (state, action, reducer) => {
        return {
            ...state,
            otherProp: reducer(state.otherProp, action) //更新到 otherProp 属性中去
        }
    }
}

var rootReducers = combineReducers(reducers, transformers)
```

如上所示，有了 transformers，不必再嵌套 combineReducers。不过，换个角度看，这个模式只是将原本要在  handleA(state) 里要做的属性查询工作，搬到了 transfromer 中，让 handleA 可以直接处理它需要的 state 对象而已。

总的而言，`combineReducers` 不是一个必需品，它只是用来分发全局对象的属性到各个 `reducer` 中去，如果你觉得它太绕，你可以选择直接在每个 `handleCase` 函数中查询 state 属性，合成 newState 并返回即可。这时候，你只需要一个 reducers 函数，它的 `switch` 语句处理所有可能的 `action.type`；想想就是一个超长的函数。

### 为什么要有 createStore ？

既然 `redux` 建议只维护一个全局 state ，为什么要搞一个 `createStore` 函数呢？直接创建一个空对象，然后缓存起来，不断投入到 `reducer(state, action)` 更新状态不就行了？

这会儿该说到「函数式编程」里的几个概念了。「无副作用函数」与「不变值」。

上面提到的 action 跟 reducer 函数，都是普通的纯函数。对于 action 函数 来说，输入相同的参数无限次，它的返回值也相同。而有了「不变值」，我们得到的好处是，在 react component 的 shouldComponentUpdate(nextProps, nextState) 里，可以直接拿当前 props 跟 nextProps 做 `===` 对比，如果相等，说明不用更新，如果不相等，则更新到视图。

如果不是返回新 state，只是修改旧 state，我们就很难做到「回退/撤销」以及跟踪全局状态。对比两个数据是否同一，也无法用 `===`，而得用 `deepEqual` 深度遍历来对比值，很耗费性能。

另外， 上面提到的 action 函数，它只是返回一个 `plain object` 而已，除此之外，它什么也没做。是谁把它传递到 `reducers(state, action)` 调用？

`reducers|state|action` 这三个东西由谁来协调？

此时，`createStore(reducer, initialState)` 呼之欲出；它接受一个 reducer 函数跟 initialState 初始化的全局状态对象，返回几个「公共方法」：`dispatch|getState|subscribe`。这里我只列举了对我们有重要意义的三个，还剩两个不太重要，可自行参考 `redux` 文档。

`createStore` 做的事情在《Javascript 高级程序设计》一书里有讲解，很简明易懂。

```javascript
//此处为示意，不是 redux 的源码本身
export default createStore(reducer, initialState) {
    //闭包私有变量 
    let currentState = initialState
    let currentReducer = reducer
    let listeners = []
    
    //返回一个包含可访问闭包变量的公有方法
    return {
        getState() {
            return currentState //返回当前 state
        },
        subscribe(listener) {
            let index = listeners.length
            listeners.push(listener) //缓存 listener
            return () => listeners.splice(i, 1) //返回删除该 listener 的函数
        },
        dispatch(action) {
            //更新 currentState
            currentState = currentReducer(currentState, action)
            listeners.slice().forEach(listener => listener())
            return action //返回 action 对象
        }
    }
}
```

如上所示，`redux` 返璞归真的核心代码，没有什么原型继承、面向对象这类绕来绕去的事物。

`createStore` 的返回值是一个对象，通常我们保存在 `store` 这个变量名里。其实 store 是一个只有方法，没有数据属性的对象，用 `JSON.stringify` 去系列化它，得到的是空对象。真正的 `state` 包含在闭包中，通过公有方法 `getState` 来获取。

而 `dispatch` 方法，是 `store` 对象提供的更改 `currentState` 这个闭包变量的唯一建议途径。注意，我是说唯一建议，不是说唯一途径，因为 getSate 拿到的是 currentState 的对象引用，我们还是可以在外头改动它，虽然不建议。

`subscribe` 方法是一个简单的事件侦听方法，在 dispatch 里更新完 currentState 后调用，不管是什么 action 触发的更新他，它都会调用，并且没有任何参数，只是告诉你 `state` 更新了。这个方法在后面的提到的服务端同构应用之「镜像 store 」中有妙用。

至此， `createStore` 与 `store` 的全部重要内容都揭示了，它们就是如此简洁。

### 为什么要有 bindActionCreators ?

通过 `createStore` 我们拿到了 `store`， 通过 `store.dispatch(action)` 我们可以免去手动调用 `reducer` 的负担，只处理 `action` 就可以了，一切都很方便。只是，有两种意义上的 `action`，一种是 `action` 函数，另一种是 `action` 对象，`action` 函数接受参数并返回一个 `action` 对象。

`action` 函数是工厂模式，专门生产 `action` 对象。所以我们可以通过重新命名，更清晰的区别两者，`action` 函数就叫 `actionCreator`，它的返回值叫 `action`。

`store.dispatch(action)` 这里的 action 是一个对象，不是函数，它是 actionCreator 返回的，所以实际上要这样调用 `store.dispatch(actionCreator(...args))`，很麻烦是吧？

原本的 `reducer(state, action)` 模式，我们用 `createStore(reducer, initialState)` 转换成 `store.dispatch(action)`，现在发现还不够，怎么做？再封装一层呗，这就是函数式思想的体现，通过反复组合，将多参数模式，转化为单参数模式。

怎么组合？

对于单个 actionCreator ，我们可以轻易地 `bindActionCreator`。

```javascript
//将 actionCreator 跟 dispatch 绑定在一起
let bindActionCreator => (actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args));
}

//普通工厂函数，返回一个对象
let addItem = text => ({
    type: 'ADD_ITEM',
    text
})

//跟 store.dispatch 绑定起来，成为真正可以改变 currentState 的 action 函数
let addItem = bindActionCreator(addItem, store.dispatch)
```

对于多个 actionCreator，我们可以像 `reducers` 一样，组织成一个 `key/action` 的组合嘛。

```javascript
export default function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') { //如果是单个 actionCreator，绑定一词
    return bindActionCreator(actionCreators, dispatch);
  }
  //返回一个改造过的「函数组合」
  return mapValues(actionCreators, actionCreator =>
    bindActionCreator(actionCreator, dispatch)
  )
```

如上所示，我们用 `bindActionCreators` 得到了真正具有改变全局 state 能力的许多函数，剩下的事情，就是将这些函数分发到各个地方，由各个 `event` 自主调用即可（正如在「为什么需要 action ？」 一节里介绍的）。

### redux 工作流程是怎样的？

至此，我们来梳理一下，`actionCreator|reducer|combineReducers|createStore|bindActionCreators` 这些函数的书写与组合的过程以及顺序。

首先，我们要先设计一些「常量」，因为 action.type 通常是字符串常量。为了便于集中管理，以及利于压缩代码，我们最好将常量放在单独的文件夹里，根据类型的不同放置在不同的文件中。

以 [Isomorphism-react-todomvc] 为例，`constants` (中译：常量)文件夹里有如下文件：

```javascript
//ActionTypes.js 真正改动了数据的 actionType 在这里
export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const DELETE_ITEMS = 'DELETE_ITEMS'
export const UPDATE_ITEM = 'UPDATE_ITEM'
export const UPDATE_ITEMS = 'UPDATE_ITEMS'

//API.js 服务端接口统一放这里
export const API_TODOS = '/todos'

//SocketTypes.js websocket 也触发了某个 action 改变了 state，单独放这里
export const SERVER_UPDATE = 'SERVER_UPDATE'

//KeyCode.js 键盘的回车键与取消键对应的编码
export const ENTER_KEY = 13
export const ESCAPE_KEY = 27

//FilterTypes.js 只是筛选数据，没有改变 state 的过滤 action 的常量
export const FILTER_ITEMS = 'FILTER_ITEMS'
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_ACTIVE = 'SHOW_ACTIVE'
export const SHOW_COMPLETED = 'SHOW_COMPLETED'
```

我们的「常量设计」，可以清晰地反应我们整个 web 应用的业务架构设计；这方面没弄好，随着应用的复杂性增加，会越来越难以维护。当然，比设计常量更靠前的是，设计整个应用的 state 树的结构，这方面不同业务有不同的设计思路，这里无法多做介绍。

由于 todomvc 的业务逻辑很简单，所以它的 state 设计是这样的：

```javascript
let state = {
    todos: [{
        id: 123,
        text: 'todo item',
        status: false
    }],
    activeFilter: SHOW_ALL
}
```

有了常量，我们就可以写 `actionCreator` 了，它们被放置在 actions 文件夹里。

```javascript
//index.js
import * as types from '../constants/ActionTypes'

export function addItem(text) {
    return { type: types.ADD_ITEM, text }
}

export function deleteItem(id) {
    return { type: types.DELETE_ITEM, id }
}

export function updateItem(data) {
    return { type: types.UPDATE_ITEM, data }
}

export function deleteItems(query) {
    return { type: types.DELETE_ITEMS, query }
}

export function updateItems(data) {
    return { type: types.UPDATE_ITEMS, data }
}
```

action 是预处理，下一个环节是再处理函数 `reducer`，它们被放置在 `reducers` 文件夹里。

```javascript
//todos.js
import { ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, DELETE_ITEMS, UPDATE_ITEMS } from '../constants/ActionTypes'
import { SERVER_UPDATE } from '../constants/SocketTypes'

export default (state = [], action) => {
    switch (action.type) {
        case ADD_ITEM: //添加 item，放在数组第一个位置
            return [createItem(action.text), ...state]
        case DELETE_ITEM: //删除 item 就是根据 id 过滤掉
            return state.filter(item => item.id !== action.id)
        case UPDATE_ITEM: //更新item 由 updateItem helper 函数执行
            return updateItem(action.data, state)
        case UPDATE_ITEMS: //更新所有 item，就是每个就合并 action.data
            return state.map(item => Object.assign({}, item, action.data))
        case DELETE_ITEMS: //删除 item，过滤掉符合 action.query 对象描述的 item
            return filterItems(action.query, state)
        case SERVER_UPDATE: //服务端推送 action，整个替换掉 todos
            return action.state.todos
        default: //其他没匹配到的 action，返回原 state
            return state
    }
}

//filter.js
import { FILTER_ITEMS, SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/FilterTypes'

let hashToFilter = {
    '#/': SHOW_ALL,
    '#/active': SHOW_ACTIVE,
    '#/completed': SHOW_COMPLETED
}

export default (state = SHOW_ALL, action) => {
    switch (action.type) {
        case FILTER_ITEMS: //单纯的模式匹配，默认显示 SHOW_ALL
        return hashToFilter[action.active] || SHOW_ALL
        default:
        return state
    }
}
```

如上所示，`todos.js` 负责处理 `state.todos` 属性，`filter.js` 负责处理 `state.activeFilter` 属性，所以我们需要用 `combineReducers` 将它们组织起来。

```javascript
// reducers/index.js
import { combineReducers } from 'redux'
import list from './list'
import filter from './filter'
//只需要用到一级分解，真是万幸呢
export default combineReducers({
    todos: list,
    activeFilter: filter
})
```

目前我们有了 `actionCreators`（就是在 actions 文件夹下的 index.js 的模块输出） 以及 `rootReducer` 函数（就是上面`reducers/index.js`的模块输出），接下来，就是用 `createStore` 把 `rootReducer` 给吞掉。

```javascript
// ./store/index.js
import { createStore } from 'redux'
import rootReducers from '../reducers'
export default initialState => {
    return createStore(rootReducers, initialState)
}
```

我们调用 `createStore` 拿到 store 之后，就拿到了 `store.dispatch`，然后用 `bindActionCreators` 将 `actionCreators` 对象跟 `dispatch`，粘合在一起。

```javascript
let dispatchToProps = dispatch => bindActionCreators(actions, dispatch)
//分发给 component，让它从上到下不断分发 action
<View {...dispatchToProps(store.dispatch)} {...props} /> 
```

如果你用 `react-redux` ，你就用它提供的 `<Provider></Provider` + `connect` 组织单项数据流。

如果你只用 `redux`，你可以封装一个 `render` 函数，在 `store.subscribe` 事件回调里使用。如下所示：

```javascript
//app.js
let store = createStore(reducers, initialState)
let actions = bindActionCreators(actionCreators, store.dispatch)
let render = () => {
    React.render(
        <Root {...store.getState()} {...actions} >, //传 action，传 state 数据
        document.getElementById('container')
    )
}

store.subscribe(render) //当 state 变化时，重新渲染

```

如上所示，组织 `redux` 的流程莫过于：

- 设计全局 state 的数据结构
- 设计更改 state 数据的 actionTypes 常量以及其他跟视图展现相关的 actionTypes 常量
- 根据 actionTypes 常量，书写 actionCreator 。
- 根据各个 actionCreator 的返回值，涉及 reducer 做数据的最后处理
- 在有了 reducer 函数之后，createStore(reducer, initState) 得到 store 对象
- 用 bindActionCreators 函数将 actionCreators 和 store.dispatch 绑定起来，得到一组能修改全局状态的函数
- 分发各个状态修改函数到各个 DOM 事件中。

### 为什么需要 applyMiddlewares ？

`reducer(state, action)` 这个调用方式所反映的 `reducer` 跟 `action` 的关系很近，action 就是 reducer 的第二个参数嘛。然而，上面所示的 `redux` 流程上看，它们却隔着 `createStore|store.dispatch|bindActionCreators` 三个 API ，才最后汇集到一处。

当我们失去对 `reducer` 的直接控制权之后，这意味着我们的调试不方便了。原本我们可以像下面那样做：

```javascript
//我们可以这样：
cosnole.log(state, action) //调用之前
state = reducer(state, action)
cosnole.log(state, action) //调用之后

//虽然现在我们可以这样代替，但这里 action 是我们构造的
//dom 事件里触发的 action，被隐藏得很深，也无法从 store.subscribe 里侦听到，它不传参数
cosnole.log(store.getState(), action) //调用之前
store.dipatch(action)
cosnole.log(store.getState(), action) //调用之后
```

就算只是为了调试代码，打印出 action 日志，我们也值得设计解决方案。`applyMiddlewares` 就是一个有用的思路。它的原理很简单，在《JavaScript 高级程序设计》里也有提到，就是模块模式。

```javascript
export default function applyMiddleware(...middlewares) {
  return createStore => (reducer, initialState) => {
    var store = createStore(reducer, initialState);
    var dispatch = store.dispatch; //拿到真正的 dispatch
    //将最重要的两个方法 getState/dispatch 整合出来
    var middlewareAPI = {
      getState: store.getState,
      dispatch: action => dispatch(action)
    };
    //依次传递给 middleware，让它们有控制权
    var chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain, dispatch); // 再组合出新的 dispatch

    //返回新的 store 对象，其 dispatch 方法已经被传递了很多层
    //每一层都可以调用 dispatch，也可以调用 next 让下一层考虑调用 dipatch
    //最后一个 next 就是 store.dispatch 本身。
    return {
      ...store,
      dispatch
    };
  };
}
```

然后我们可以这样写中间件了。

```javascript
//redux-thunk
export default function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ? // action 居然是函数而不是 plain object？
      action(dispatch, getState) : //在中间件里消化掉，让该函数控制 dispatch 时机
      next(action); //否则调用 next 让其他中间件处理其他类型的 action
}
```

注意，在每个中间件里存在两个 `dispatch` 功能。一个是 `{ dispatch, getState }`，这是在 `middlewareAPI`对象里的 dispatch 方法，另一个是 `next`，它是 `chain` 链条的最后一环 `dispatch = compose(...chain, dispatch)`。

如果你不想在将 action 传递到在你之后的中间件里，你应该直接显式地调用 `dispatch`，不要调用 `next`。如果你发现这个 action 对象不包含你感兴趣的数据，是你要忽略的 action，这时应该传给 next，它可能是其他中间件的处理目标。

redux 的中间件模式，将 dispatch 的步骤拉长并且细化，使得我们可以处理更多类型的 action，比如带函数的，比如带 promise 的等等，我们可以在真正的 store.dispatch 调用之前，先把看似不合格的 action 对象消化掉，吐出 store.dispatch 能直接调用的数据结构即可。

除了这个 `rerdux-thunk` （上面的示例真是它的源码，不信请点击[这里](https://github.com/gaearon/redux-thunk/blob/master/src/index.js)）中间件之外，还可以写很多不同类型的，其中 [redux-logger](https://github.com/fcomb/redux-logger) 就是一开始说的对调试 redux 代码很必要的中间件。


## redux 服务端渲染怎么处理？

如果你现在(2015.08.24)去 redux 的[官方文档](http://rackt.github.io/redux/)里查阅，你会发现，`server rendering` 这一块还是不可点击的空白状态。然而，我们既然已经深入到源码层次，自己找出一条途径，也是可以的(只适用于 node.js)。

首先，一开始我们就说过，`redux` 是无依赖的，所以它可以直接用在 node.js 运行时里。关键在于 `react-redux` 的服务端渲染方式，它所提供的 `connect` 与 `Provider` 组合，扰乱了我们对 react component 的掌控与认知。

我目前的做法是，将跟 `redux` 有关的所谓的 `smart component` （智能组件），放到 `containers` 文件夹里，普通的 react component，放在 `components` 文件夹里，在客户端时，我们渲染 `containers` 里的 `redux` 组件。而在服务端，我们渲染 `conponents` 的普通组件，`redux` 组件要穿的参数，我们一一构造出来即可。

```javascript
//server side
let store = createStore(rootReducers, { todos: [] })

store.getComponent = () => {
    let props = stateToProps(store.getState())
    let actions = dispatchToProps(() => {}) //构造空函数给 actions，反正没有 dom 事件
    return React.renderToString(<View {...props} {...actions} />)
}
```

具体实现可以参考[ Isomorphism-react-todomvc ](https://github.com/Lucifier129/Isomorphism-react-todomvc)项目。


### 镜像 store 模式

这里介绍的所谓镜像 store 模式，并非 redux 官方文档里提到的，而是在实践过程中我所发现的有趣用法，大家看看就好，仅供参考，不要误以为是官方推荐模式即可。

思路很简单，既然每个 actionCreator 返回的都是 plain javascript object，它们都是可以被 `JSON.stirngify` 系列化的。也就是说可以 `post` 到服务端，如果服务端也有一个同样的 store，它 store.dispatch 一下，不就跟客户端一致了？

这样的话，我们只需要传更轻量的 `action` 数据，这种做法犹如 `graphql` 一般。另外，在服务端的 store.subscribe 中我们绑定一个 websocket.emit 函数，就可以把服务端根据 action 所做的数据更新同步到所有浏览器端了。

```javascript
//store
import { createStore } from 'redux'
import rootReducers from '../public/js/src/index/reducers'
let store = createStore(rootReducers, { todos: [] })
export default store

//router
router.post('/todos', (req, res) => {
    store.dispatch(req.body) //直接 dispatch action 更新 state
    res.json(Object.assign({}, ok, {
        data: req.body
    }))
})

// ./bin/www
let server = require('http').createServer(app);
let io = socketIO(server)
store.subscribe(() => io.emit('change', store.getState())) //服务端推送

// ./index.js
//浏览器端响应一个 dispatch
io().on('change', state => store.dispatch({
    type: SERVER_UPDATE,
    state
}))

// .//reducers/list.js
export default (state = [], action) => {
    switch (action.type) {
        //...other case
        case SERVER_UPDATE:
        return action.state.todos //将整个 todos 数据跟服务端同步起来
        default:
        return state
    }
}

// ./middleware/restful.js
import { API_TODOS } from '../constants/API'
import * as ActionTypes from '../constants/ActionTypes'

export default store => next => action => {
    if (action.type in ActionTypes) { //用中间件模式，筛选有修改数据作用的 action
        fetch(API_TODOS, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action) //打包发送到服务端
        })
    }
    //对 action 什么都不做，让浏览器端 action 继续传递
    return next(action) //可以不用等待服务端就更新视图
}
```

### 结尾

这篇文章写得长了，就此结尾罢。

总体而言，`redux` 是一个优秀的新技术，厉害到自己开辟新生态，不容小觑。它也有一些缺陷，比如不容易处理 state 的深度 path 路径问题，比如分发太多 action 到 react component 时，一层层验证 propTypes 的繁琐（虽然别的 flux 实现也有这个问题）等。

比起其他 flux 模式， redux 已然优越。推荐使用。