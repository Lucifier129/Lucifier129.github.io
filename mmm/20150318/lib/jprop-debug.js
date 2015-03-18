/*==================================================
 Copyright 2014 Jade Gu
 http://weibo.com/islucifier
 Released under the MIT license
2014.10.06
 ==================================================*/
;(function($, undefined) {
	'use strict';
//css3fix
var style = document.createElement('div').style,
	prefix = ['', '-webkit-', '-moz-', '-ms-', '-o-'],
	len = prefix.length,
	camelCase = $.camelCase;

$.css3fix = function(prop) {
	var i = 0, fixed;
	for (; i < len; i += 1) {
		fixed = camelCase(prefix[i] + prop);
		if (fixed in style) {
			return fixed;
		}
	}
	return false;
};
//swipe.js
var suportTouch = 'ontouchstart' in document,
	eventType = suportTouch ? {
		start: 'touchstart',
		move: 'touchmove',
		end: 'touchend'
	} : {
		start: 'mousedown',
		move: 'mousemove',
		end: 'mouseup'
	},
	getCoor = function(e) {
		getCoor = 'touches' in e ? function(e) {
			var touch = e.touches[0];
			return {
				x: touch.clientX,
				y: touch.clientY
			};
		} : function(e) {
			return {
				x: e.clientX,
				y: e.clientY
			};
		};
		return getCoor(e);
	},
	addEvent = document.addEventListener ? function(elem, type, callback) {
		elem.addEventListener(type, callback, false);
	} : function(elem, type, callback) {
		elem.attachEvent('on' + type, callback);
	},
	removeEvent = document.removeEventListener ? function(elem, type, callback) {
		elem.removeEventListener(type, callback);
	} : function(elem, type, callback) {
		elem.detachEvent('on' + type, callback);
	},
	setImmediate = typeof window.setImmediate === "function" ? function(fn) {
		window.setImmediate(fn);
	} : function(fn) {
		window.setTimeout(fn, 0);
	};


function Swipe(elem, callback) {
	this.elem = elem;
	this.callback = callback;
	this.data = {
		start: {},
		move: {}
	};
}

Swipe.prototype = {
	eventType: eventType,
	init: function() {
		return this.addSwipe();
	},
	addSwipe: function() {
		var self = this;
		this.START = function(e) {
			self.start.call(self, e);
		};
		addEvent(this.elem, this.eventType.start, this.START);
		return this;
	},
	removeSwipe: function() {
		removeEvent(this.elem, this.eventType.start, this.START);
		return this;
	},
	addEvent: function(eName, callback) {
		if (typeof eName === 'string' && $.isFunction(callback)) {
			this.callback[eName] = callback;
		}
		return this;
	},
	addDocEvent: function() {
		var self = this;
		this.MOVE = function(e) {
			self.move.call(self, e);
		};
		this.END = function(e) {
			self.end.call(self, e);
		};
		addEvent(document, this.eventType.move, this.MOVE);
		addEvent(document, this.eventType.end, this.END);
	},
	removeDocEvent: function() {
		removeEvent(document, this.eventType.move, this.MOVE);
		removeEvent(document, this.eventType.end, this.END);
	},
	preventDefault: function(e) {
		'preventDefault' in (e = e || window.event) ? e.preventDefault() : (e.returnValue = false);
	},
	start: function(e) {
		var self = this,
			elem = self.elem,
			data = self.data,
			callback = self.callback,
			client = getCoor(e);
		self.preventDefault(e);
		data.start.x = data.move.x = client.x;
		data.start.y = data.move.y = client.y;
		data.start.timeStamp = +new Date();
		data.start.begin = true;
		data.start.dir = function(y, x) {
			var dir = Math.atan2(Math.abs(y), Math.abs(x)) * (180 / Math.PI);
			data.start.dir = function() {
				return dir;
			};
			return dir;
		};
		'start' in callback && callback.start.call(elem, e, data.start);
		setImmediate(function() {
			self.addDocEvent();
		});
	},
	move: function(e) {
		var data = this.data,
			elem = this.elem,
			callback = this.callback,
			client = getCoor(e);
		this.preventDefault(e);
		data.move.dir = data.start.dir(client.y - data.start.y, client.x - data.start.x);
		data.move.x = client.x - data.move.x;
		data.move.y = client.y - data.move.y;
		'move' in callback && callback.move.call(elem, e, data.move);
		data.move.x = client.x;
		data.move.y = client.y;
	},
	end: function(e) {
		var data = this.data,
			elem = this.elem,
			callback = this.callback;
		this.preventDefault(e);
		this.removeDocEvent();
		data.start.begin = false;
		data.end = {
			x: data.move.x - data.start.x,
			y: data.move.y - data.start.y,
			t: +new Date() - data.start.timeStamp,
			dir: {},
			stop: false
		};
		if (data.end.t < 220 && Math.max(Math.abs(data.end.x), Math.abs(data.end.y)) > 10) {
			if (data.move.dir > 30) {
				data.end.dir[data.end.y > 0 ? 'down' : 'up'] = 1;
			} else {
				data.end.dir[data.end.x > 0 ? 'right' : 'left'] = 1;
			}
			for (var prop in data.end.dir) {
				if (prop in callback) {
					data.end.stop = true;
					callback[prop].call(elem, e, data.end);
				}
			}
			return;
		} else if (data.end.t < 200 && Math.max(Math.abs(data.end.x), Math.abs(data.end.y)) < 10) {
			if ('tap' in callback) {
				if (suportTouch) {
					var target = e.target;
					if (target.nodeName === 'A') {
						setTimeout(function() {
							target.click();
						}, 0);
					} else if (target.parentNode.nodeName === 'A') {
						setTimeout(function() {
							target.parentNode.click();
						}, 0);
					}
				}
				callback.tap.call(elem, e, data);
			}
			return;
		}
		if (!data.end.stop && 'end' in callback) {
			callback.end.call(elem, e, data.end, data.move);
		}
	}
};


$.fn.swipe = function(callback) {
	if (!callback || !$.isPlainObject(callback)) return this;
	return this.each(function() {
		$(this).data('swipe', new Swipe(this, callback).init());
	});
};
//swipeshow.js
var transform = $.css3fix('transform'),
	transition = $.css3fix('transition'),
	offsetMethod,
	styleElement;
if (transform && transition) {
	offsetMethod = {
		speed:400,
		className:'transi-for-swipeshow',
		setX: function(elem, value) {
			elem.style[transform] = 'translateX(' + value + 'px)';
		},
		setY: function(elem, value) {
			elem.style[transform] = 'translateY(' + value + 'px)';
		},
		animateX: function(elem, value, callback) {
			$(elem).addClass(offsetMethod.className);
			offsetMethod.setX(elem, value);
			setTimeout(callback, offsetMethod.speed);
		},
		animateY: function(elem, value, callback) {
			$(elem).addClass(offsetMethod.className);
			offsetMethod.setY(elem, value);
			setTimeout(callback, offsetMethod.speed);
		}
	};
	styleElement = document.createElement('style');
	styleElement.type = 'text/css';
	styleElement.innerHTML = '.transi-for-swipeshow { -webkit-transition: all .4s ease-out; -moz-transition: all .4s ease-out; transition: all .4s ease-out;}';
	document.getElementsByTagName('head')[0].appendChild(styleElement);
} else {
	offsetMethod = {
		speed:400,
		setX: function(elem, value) {
			elem.style.marginLeft = value + 'px';
		},
		setY: function(elem, value) {
			elem.style.marginTop = value + 'px';
		},
		animateX: function(elem, value, callback) {
			$(elem).animate({
				marginLeft: value
			}, offsetMethod.speed, callback);
		},
		animateY: function(elem, value, callback) {
			$(elem).animate({
				marginTop: value
			}, offsetMethod.speed, callback);
		}
	};
}

$.offsetMethod = offsetMethod;
$.fn.swipeshow = function(options) {
	var settings = {
		dir: 'x',
		className: 'cur',
		speed: 3000,
		auto: true,
		type: 'click'
	};
	$.extend(settings, options);
	settings.dir = settings.dir.toUpperCase();

	var self = this,
		setter = offsetMethod['set' + settings.dir],
		animate = offsetMethod['animate' + settings.dir],
		parent = self.parent(),
		children = self.children(),
		length = children.length,
		width = parent.width(),
		height = parent.height(),
		position = parent.css('position'),
		x_axis = /x/i.test(settings.dir),
		elem_arr = [],
		preventDefault = true,
		distance,
		clone;
	if (length <= 1) {
		return this;
	} else if (length === 2) {
		children.each(function() {
			self.append($(this).clone(true));
		});
		children = self.children();
		length = 4;
		clone = true;
	}

	children.each(function() {
		elem_arr.push($(this));
	});

	distance = x_axis ? width : height;
	options = settings.opts ? $(settings.opts).children() : null;

	parent.css({
		position: /absolute|fixed|relative/.test(position) ? parent.css('position') : 'relative',
		overflow: 'hidden'
	});

	children.css({
		'float': 'left',
		width: width,
		height: height
	});

	self.css({
		position: 'absolute',
		top: 0,
		left: 0,
		width: x_axis ? width * length : width,
		height: x_axis ? height : height * length
	}).on('click', 'a', function(e) {
		if (preventDefault) {
			e.preventDefault();
		} else {
			preventDefault = true;
		}
	});

	var index = 0,
		offset = 0,
		count = 0,
		elem = self[0],
		animated = true,
		timer = null,
		hover,
		opts_parent,
		handler = ({
			check: function(value) {
				var diff = value - index;
				if (value > index) {
					count -= diff;
					count = count < 0 ? count + length : count;
				} else if (value < index) {
					count = (count - diff) % length;
				}
				index = value;
				offset = index * distance;
				return this;
			},
			callback: function() {
				var set = false;
				if (index === 0) {
					index = -1;
					self.children().last().prependTo(self);
					set = true;
				} else if (index === 1 - length) {
					index = 2 - length;
					self.children().first().appendTo(self);
					set = true;
				}
				if (set) {
					offset = index * distance;
					setter(transition ? self.removeClass(offsetMethod.className)[0] : elem, offset);
				}
				animated = true;
			},
			slide: function() {
				animated = false;
				animate(elem, offset, this.callback);
				if (options) {
					if (clone) {
						options.removeClass(settings.className)
							.eq(count % 2).add(options.eq(count))
							.addClass(settings.className);
					} else {
						options.eq(count).addClass(settings.className)
							.siblings().removeClass(settings.className);
					}
				}
				settings.callback && settings.callback.call(self, clone ? count % 2 : count);
				return this;
			},
			normal: function() {
				if (!animated) {
					return;
				}
				handler.check(Math.round(offset / distance)).slide();
			},
			next: function() {
				if (!animated) {
					return this;
				}
				handler.check(index - 1).slide();
				return this;
			},
			prev: function() {
				if (!animated) {
					return;
				}
				handler.check(index + 1).slide();
			}
		}).check(0).slide();

	var dir = settings.dir.toLowerCase();
	self.swipe({
		tap: function() {
			preventDefault = false;
			handler.normal();
		},
		start: function() {
			if (!animated) {
				return;
			}
			self.removeClass(offsetMethod.className);
		},
		move: function(e, data) {
			if (!animated) {
				return;
			}
			offset += data[dir];
			setter(elem, offset);
		},
		end: handler.normal,
		up: x_axis ? handler.normal : handler.next,
		down: x_axis ? handler.normal : handler.prev,
		left: x_axis ? handler.next : handler.normal,
		right: x_axis ? handler.prev : handler.normal
	});

	if (options && settings.type) {
		opts_parent = options.parent().on(settings.type, options.get(0).nodeName.toLowerCase(), function() {
			if (!animated) {
				return;
			}
			handler.check(-elem_arr[$(this).index()].index()).slide();
		});
	}

	if (settings.auto) {
		hover = function(e) {
			e.preventDefault();
			e.type === 'mouseenter' ? clearTimeout(timer) : handler.loop();
		};
		handler.loop = function() {
			timer = setTimeout(function() {
				handler.next().loop();
			}, settings.speed);
		};
		parent.on('mouseenter mouseleave', hover).data('hover', true);
		opts_parent && !opts_parent.parent().data('hover') && opts_parent.on('mouseenter mouseleave', hover);
		handler.loop();
	}

	if (settings.next) {
		settings.next = $(settings.next);
		settings.next.on('click', handler.next);
		hover && (settings.next.parent().data('hover') || settings.next.on('mouseenter mouseleave', hover));

	}
	if (settings.prev) {
		settings.prev = $(settings.prev);
		settings.prev.on('click', handler.prev);
		hover && (settings.prev.parent().data('hover') || settings.prev.on('mouseenter mouseleave', hover));
	}
	return this;
};
}(window.jQuery || window.Zepto));