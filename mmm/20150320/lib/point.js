//swipe.js

! function(global, undefined) {

	function calling(fn) {
		return function() {
			return Function.prototype.call.apply(fn, arguments)
		}
	}

	var objProto = Object.prototype
	var arrProto = Array.prototype

	var toStr = calling(objProto.toString)
	var hasOwn = calling(objProto.hasOwnProperty)

	var slice = calling(arrProto.slice)

	function isType(type) {
		return function(obj) {
			return toStr(obj) === '[object ' + type + ']'
		}
	}

	var isObj = isType('Object')
	var isStr = isType('String')
	var isFn = isType('Function')
	var isArr = Array.isArray || isType('Array')

	function each(obj, fn, context) {
		var len = obj && obj.length || {}

		if (len === +len && len) {
			for (var i = 0; i < len; i += 1) {
				if (fn.call(context || global, obj[i], i, obj) === false) {
					return obj
				}
			}
			return obj
		}

		for (var key in obj) {
			if (hasOwn(obj, key)) {
				if (fn.call(context || global, obj[key], key, obj) === false) {
					return obj
				}
			}
		}

		return obj
	}

	function extend() {
		var target = arguments[0]
		var deep

		if (typeof target === 'boolean') {
			deep = target
			target = arguments[1]
		}

		var sourceList = slice(arguments, deep ? 2 : 1)

		each(sourceList, function(source) {

			if (!isObj(source)) {
				return
			}

			each(source, function(value, key) {

				if (deep && isObj(value)) {
					var oldValue = target[key]

					target[key] = isObj(oldValue) ? oldValue : {}

					return extend(deep, target[key], value)
				}

				target[key] = value
			})
		})

		return target

	}

	var doc = global.document
	var supportTouch = 'ontouchstart' in doc
	var eType = supportTouch ? {
		start: 'touchstart',
		move: 'touchmove',
		end: 'touchend'
	} : {
		start: 'mousedown',
		move: 'mousemove',
		end: 'mouseup'
	}
	var getCoor = function(e) {
		getCoor = 'touches' in e ? function(e) {
			var touch = e.touches[0]
			return {
				x: touch.clientX,
				y: touch.clientY
			}
		} : function(e) {
			return {
				x: e.clientX,
				y: e.clientY
			}
		}
		return getCoor(e)
	}
	var _ = {
		on: doc.addEventListener ? function(elem, type, callback) {
			elem.addEventListener(type, callback, false)
		} : function(elem, type, callback) {
			elem.attachEvent('on' + type, callback)
		},
		off: doc.removeEventListener ? function(elem, type, callback) {
			elem.removeEventListener(type, callback)
		} : function(elem, type, callback) {
			elem.detachEvent('on' + type, callback)
		},
		getTime: window.performance ? function() {
			return performance.now()
		} : function() {
			return +new Date()
		},
		nextTick: window.setImmediate ? function(fn) {
			return setImmediate(fn)
		} : function(fn) {
			return setTimeout(fn)
		},
		preventDefault: function(e) {
			'preventDefault' in e ? e.preventDefault() : (e.returnValue = false)
		},
		noop: function() {}
	}

	function DocEvent(target) {
		this.target = target
	}

	DocEvent.prototype = {
		on: function() {
			var target = this.target
			this.MOVE = function(e) {
				target.move(e)
			}
			this.END = function(e) {
				target.end(e)
			}
			_.on(doc, eType.move, this.MOVE)
			_.on(doc, eType.end, this.END)
			return this
		},
		off: function() {
			_.off(doc, eType.move, this.MOVE)
			_.off(doc, eType.end, this.END)
			return this
		}
	}

	function Point(elem, callbacks) {
		this.elem = elem
		this.callbacks = callbacks || {}
		this.data = {
			start: {},
			move: {},
			end: {}
		}
		this.docEvent = new DocEvent(this)
		this.on()
	}

	Point.prototype = {
		vertical: 30,
		methods: 'up down left right tap longTap'.split(' '),
		invoke: function(type, e) {
			var callbacks = this.callbacks[type]
			var elem = this.elem
			if (isFn(callbacks)) {
				callbacks.call(elem, e, this.data[type])
			} else if (isArr(callbacks) || isObj(callbacks)) {
				var that = this
				var data = this.data[type]
				each(callbacks, function(callback) {
					callback.call(elem, e, data)
				})
			}
		},

		start: function(e) {
			var that = this
			var startData = getCoor(e)
			startData.timeStamp = _.getTime()
			this.data.start = this.data.move = startData
			this.getAngle = function(y, x) {
				var angle = Math.atan2(Math.abs(y), Math.abs(x)) * (180 / Math.PI)
				that.getAngle = function() {
					return angle
				}
				return angle
			}
			this.angle = 0
			this.shift = {
				x: 0,
				y: 0
			}
			this.duration = 0
			this.timer = setTimeout(function() {
				that.docEvent.on()
			}, 4)
			this.invoke('start', e)
		},
		move: function(e) {
			var that = this
			var startData = this.data.start
			var moveData = this.data.move = getCoor(e)
			moveData.timeStamp = _.getTime()
			this.angle = this.getAngle(moveData.y - startData.y, moveData.x - startData.x)
			this.duration = moveData.timeStamp - startData.timeStamp
			var shift = this.shift = {
				x: moveData.x - startData.x,
				y: moveData.y - startData.y
			}
			this.direction = {
				x: shift.x > 0 ? 'right' : 'left',
				y: shift.y > 0 ? 'down' : 'up'
			}

			this.invoke('move', e)
		},
		end: function(e) {
			clearTimeout(this.timer)
			this.docEvent.off()

			var that = this
			var startData = this.data.start
			var endData = this.data.end = extend({}, this.data.move)
			endData.timeStamp = _.getTime()

			var angle = this.angle = this.getAngle()
			var duration = this.duration = endData.timeStamp - startData.timeStamp
			var shift = this.shift = {
				x: endData.x - startData.x,
				y: endData.y - startData.y
			}
			var direction = this.direction = {
				x: shift.x > 0 ? 'right' : 'left',
				y: shift.y > 0 ? 'down' : 'up'
			}
			var minShift = Math.max(Math.abs(shift.x), Math.abs(shift.y))

			if (minShift <= 15) {
				this.isTap = duration < 200
				this.isLongTap = duration >= 200
			} else {
				this.isTap = false
				this.isLongTap = false
			}

			each(this.methods, function(methodName) {
				that.data[methodName] = endData
			})

			if (this.isLongTap) {
				this.invoke('longTap', e)
			} else if (this.isTap) {
				this.invoke('tap', e)
			} else if (minShift > 15) {
				this.invoke(direction[this.angle > this.vertical ? 'y' : 'x'], e)
			}
			this.invoke('end', e)
		},

		status: false,

		on: function(callbacks) {
			var that = this
			this.extend(callbacks)
			if (this.status) {
				return this
			}
			this.status = true
			this.START = function(e) {
				that.start(e)
			}
			_.on(this.elem, eType.start, this.START)
			return this
		},

		off: function() {
			if (!this.status) {
				return this
			}
			this.status = false
			_.off(this.elem, eType.START, this.START)
			return this
		},

		extend: function(callbacks) {
			extend(this.callbacks, isObj(callbacks) ? callbacks : {})
			return this
		},

		each: each
	}

	var style = document.createElement('div').style
	var prefixList = [ 'MozT', 'msT', 'OT','t', 'webkitT']
	var transform

	for (var i = prefixList.length - 1; i >= 0; i--) {
		transform = prefixList[i] + 'ransition'
		if (transform in style) {
			break
		}
	}

	style = null

	var method = {
		speed:400,
		className:'ease_out',
		styleAttr: transform,
		setX: function(elem, value) {
			elem.style[this.styleAttr] = 'translateX(' + value + 'px)'
		},
		setY: function(elem, value) {
			elem.style[this.styleAttr] = 'translateY(' + value + 'px)'
		},
		animateX: function(elem, value, callback) {
			elem.classList.add(this.className)
			this.setX(elem, value)
			setTimeout(callback, this.speed);
		},
		animateY: function(elem, value, callback) {
			elem.classList.add(this.className)
			this.setY(elem, value);
			setTimeout(callback, this.speed);
		},
		onAnimationEnd: function(elem, callback) {
			var that = this
			callback = callback || function(e) {
				var target = e.target
				target.classList.remove(that.className)
			}
			elem.addEventListener('amimationEnd', callback, false)
			elem.addEventListener('webkitAnimationEnd', callback, false)
		}
	}

	extend(Point, method)

	global.Point = Point



}(this);