let noop = () => {}

//type helper
export let isArray = function() {
    return Array.isArray(this)
}

export let isFunction = function() {
    return Object.prototype.toString.call(this) === '[object Function]'
}

export let isObject = function() {
    return Object.prototype.toString.call(this) === '[object Object]'
}

export let isString = function() {
    return Object.prototype.toString.call(this) === '[object String]'
}

export let isNumber = function() {
    return Object.prototype.toString.call(this) === '[object Number]'
}

export let isBoolean = function() {
    return Object.prototype.toString.call(this) === '[object Boolean]'
}

//function helper
export let pipe = function(next = noop) {
    if (this::isFunction()) {
        return (...args) => {
            return next(this(...args))
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::pipe(cur))
    }

}

export let then = function(next) {
    if (this::isFunction) {
        return (...args) => {
            return Promise.resolve(this(...args)).then(next)
        }
    } else if (this::isArray()) {
        return this.reduce((prev, cur) => prev::then(cur))
    }
}

export let currying = function(first) {
    return (...args) => {
        this(first, ...args)
    }
}

export let uncurrying = function() {
    return (context, ...args) => {
        this.apply(context, ...args)
    }
}

//object helper
export let equal = function(obj) {
    if (this::isString()) {
        return String(this) === obj
    } else if (this::isNumber()) {
        return Number(this) === obj
    } else if (this::isBoolean()) {
        return Boolean(this) === obj
    }
    return this === obj
}

//srting helper
export let elem = function(context = document) {
    return context.querySelector(this.toString())
}

export let elems = function(context = document) {
    return context.querySelectorAll(this.toString())
}

export let into = function(dom) {
    dom.innerHTML = this.toString()
}

export let directive = function(model, directive) {
    let root = this::isString() ? this::elem() : this

    root
        ::find('[data-directive]')::each(node => {
            let handler = directive[node.dataset.directive]
            if (!handler) {
                return
            }
            if (handler::isFunction()) {
                return handler.call(node, model[node.dataset.directive])
            }
            Object.keys(handler).forEach(key => {
                let handle = handler[key]
                let args = model[key]
                handle.call(node, args)
            })
        })
}

export let { watch, unwatch } = (function() {

    let eventStore = {}
    let trigger = e => {
        let { target, type } = e
        let events = eventStore[type]
        events.forEach(entry => {
            let nodes = entry.selector::elems()
            nodes::include(target) && entry.handle.call(target, e)
        })
    }
    let watch = function (handle) {
        if (this::isObject()) {
            return Object.keys(this).forEach(key => key::watch(this[key]))
        }
        let [type, selector] = this.toString().split(':').map(str => str.trim())
        if (!eventStore[type]) {
            eventStore[type] = []
            document.addEventListener(type, trigger, false)
        }
        eventStore[type].push({
            selector: selector,
            handle: handle
        })
    }
    let unwatch = function (handle) {
        if (this::isObject()) {
            return Object.keys(this).forEach(key => key::unwatch(this[key]))
        }
        let [type, selector] = this.toString().split(':')
        let store = eventStore[type]
        if (!store::isArray()) {
            return
        }
        for (let i = store.length - 1; i >= 0; i--) {
            let item = store[i]
            if (item.selector === selector && item.handle === handle) {
                store.splace(i, 1)
            }
        }
    }

    return { watch, unwatch }
}())

//number helper

//dom helper
export let each = function(handle = noop) {
    return Array.from(this).forEach(handle)
}

export let map = function(handle = noop) {
    return Array.from(this).map(handle)
}

export let filter = function(handle) {
    let elems = Array.from(this)
    return handle::isFunction() ? elems.filter(handle) : elems
}

export let include = function(node) {
    return Array.from(this).indexOf(node) !== -1
}

export let find = function(selector) {
    return this.querySelectorAll(selector)
}

export let attr = function(attrName, value) {
    if (value == null) {
        return this.getAttribute(attrName)
    } else {
        this.setAttribute(attrName, value)
    }
}

export let addClass = function(className) {
    this.classList.add(className)
}

export let removeClass = function(className) {
    this.classList.remove(className)
}

export let on = function(type, handle = noop, capture = false) {
    this.addEventListener(type, handle, capture)
}

export let off = function(type, handle = noop, capture = false) {
    this.removeEventListener(type, handle, capture)
}

export let html = function(html) {
    this.innerHTML = html
}