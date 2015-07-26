let helper = {}

function isType(type) {
    type = '[object ' + type + ']'
    return function(obj) {
        return obj == null ? obj : Object.prototype.toString.call(obj) === type
    }
}

var classType = {
    'isObj': 'Object',
    'isArr': 'Array',
    'isStr': 'String',
    'isFn': 'Function',
    'isBln': 'Boolean',
    'isReg': 'RegExp'
}

! function(classType) {
    for (var key in classType) {
        if (classType.hasOwnProperty(key)) {
            helper[key] = isType(classType[key])
        }
    }
}(classType)

helper.$ = function(selector, context) {
    return (context || document).querySelector(selector)
}

helper.$all = function(selector, context) {
    return (context || document).querySelectorAll(selector)
}

helper.$on = function(elem, type, fn, capture) {
    elem.addEventListener(type, fn, capture)
}

helper.$listen = (function() {

    var eventStore = {}

    function trigger(e) {
        var target = e.target
        var type = e.type
        var events = eventStore[type]

        events.forEach(function(entry) {
            var elems = helper.$all(entry.selector)
            var isMatch = Array.prototype.indexOf.call(elems, target)
            if (isMatch >= 0) {
                entry.callback.call(target, e)
            }
        })
    }

    return function(type, selector, callback) {

        if (!this.isStr(type) || !this.isStr(selector) || !this.isFn(callback)) {
            return
        }

        if (!eventStore[type]) {
            eventStore[type] = []
            this.$on(document, type, trigger, false)
        }
        eventStore[type].push({
            selector: selector,
            callback: callback
        })
    }
}())

export let isStr = function() {
	return isStr(this)
}

export let isObj = function() {
	return isObj(this)
}

export let isArr = function() {
	return isArr(this)
}

export let isFn = function() {
	return isFn(this)
}

export let isBln = function() {
	return isBln(this)
}

export let isReg = function() {
	return isReg(this)
}

export let $ = function(context) {
	return helper.$(this.toString(), context)
}

export let $all = function() {
	return helper.$all(this.toString())
}

export let $find = function(selector) {
    return helper.$(selector, this)
}

export let on = function(type, callback) {
    return helper.$on(this, type, callback, false)
}

export let html = function(html) {
    helper.$(this.toString()).innerHTML = html
}

export let listen = function(callback) {
	let src = this.toString().split(':')
	return helper.$listen(src[0].trim(), src[1].trim(), callback)
}














