/**
 * tools.js
 */
var app = app || {};

(function(app) {

	var tools = app.tools = {}

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

	! function (classType) {
		for (var key in classType) {
			if (classType.hasOwnProperty(key)) {
				tools[key] = isType(classType[key])
			}
		}
	}(classType)

	tools.$ = function(selector, context) {
		return (context || document).querySelector(selector)
	}

	tools.$all = function(selector, context) {
		return (context || document).querySelectorAll(selector)
	}

	tools.$on = function(elem, type, fn, capture) {
		elem.addEventListener(type, fn, capture)
	}

	tools.$listen = (function() {

		var eventStore = {}

		function trigger(e) {
			var target = e.target
			var type = e.type
			var events = eventStore[type]

			events.forEach(function(entry) {
				var elems = tools.$all(entry.selector)
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

}(app));