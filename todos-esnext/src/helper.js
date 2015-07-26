
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


//function helper
export let pipe = function(next) {
    return (...args) => {
        return next(this(...args))
    }
}
 
export let then = function(next) {
    return (...args) => {
        return Promise.resolve(this(...args)).then(next)
    }
}

//object helper


//array helper

//srting helper
export let elem = function(context = document) {
    return context.querySelector(this.toString())
}

export let elems = function(context = document) {
    return context.querySelectorAll(this.toString())
}

export let $on = function(handle = noop, capture = false) {
    let [type, selector] = this.toString().split(':')
    selector::elem().addEventListener(type, handle, capture)
}

export let $off = function(handle = noop, capture = false) {
    let [type, selector] = this.toString().split(':')
    selector::elem().removeEventListener(type, handle, capture)
}

export let $helper = function(model, helper) {
    this
    ::elem()
    .querySelectorAll('[data-helper]')
    ::each(node => {
        let handler = helper[node.dataset.helper]
        if (handler::isFunction()) {
            return handler.call(node, model[node.dataset.helper])
        }
        Object.keys(handler).forEach(key => {
            let handle = handler[key]
            let args = model[key]
            handle.call(node, args)
        })
    })
}

export let { $watch, $unwatch } = (function() {

    let eventStore = {}
    let trigger = e => {
        let { currentTarget, type } = e
        let events = eventStore[type]
        events.forEach(entry => {
            let elems = entry.selector::elems()
            let isMatch = elems::include(target)
            isMatch >= 0 && entry.handle.call(target, e)
        })
    }

    return {
        $watch(handle) {
            let [type, selector] = this.toString().split(':')
            if (!eventStore[type]) {
                eventStore[type] = []
                document.addEventListener(type, trigger, false)
            }
            eventStore[type].push({
                selector: selector,
                handle: handle
            })
        },
        $unwatch(handle) {
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
    }
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












