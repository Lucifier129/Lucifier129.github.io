/*==================================================
 Copyright 2014 Jade Gu
 http://weibo.com/islucifier
 Released under the MIT license
2014.10.06
 ==================================================*/
;(function($, undefined) {
	'use strict';
//arr
var arr = [],
	push = arr.push,
	slice = arr.slice;
//staticMethod
var toStr = Object.prototype.toString,
	isObject = function(obj) {
		return obj == null ? obj : toStr.call(obj) === '[object Object]';
	},
	isArray = Array.isArray || function(obj) {
		return toStr.call(obj) === '[object Array]';
	},
	isFunction = function(obj) {
		return toStr.call(obj) === '[object Function]';
	},
	isString = function(obj) {
		return toStr.call(obj) === '[object String]';
	},
	noop = function() {},
	trim = $.trim,
	each = $.each,
	extend = $.extend,
	inArray = $.inArray;
//inherit
var inherit = Object.create || function(proto) {
	var F = function() {};
	F.prototype = proto;
	return new F();
};
//parseAttr
var SEMICOLON_RE = /[^;]+/g,
	COLON_RE = /[^:]+/g,
	DASH_RE = /[^-]+/g;

function parseJsAttr(attrValue) {
	return arrToObj(attrToArr(attrValue));
}

function attrToArr(attrValue) {
	var ret = trim(attrValue).match(SEMICOLON_RE);
	return each(ret, function(i, value) {
		var item = ret[i] = trim(value).match(COLON_RE);
		item[0] = trim(item[0]);
		item[1] && (item[1] = trim(item[1]));
		if (item[0].indexOf('-') !== -1) {
			item[0] = trim(item[0]).match(DASH_RE);
		}

	});
}

function arrToObj(attrValueArr) {
	var ret = {};
	each(attrValueArr, function() {
		var item = this;

		switch (true) {
			case item.length === 1:
				ret[item[0]] = {};
				break;
			case isArray(item[0]):
				ret[item[1]] = {
					method: item[0][0],
					args: item[0].slice(1)
				};
				break;
			case item[0] in $.fn:
				ret[item[1]] = {
					method: item[0],
					args: arr
				};
				break;
			default:
				ret[item[0]] = {};
		}

	});
	return ret;
}
//scan
//requrie arr.js/inherit.js/parseAttr.js/staticMethod.js
function scan(node) {
	return new scan.init(node);
}

scan.init = function(node) {
	this[0] = node;
}

scan.fn = scan.init.prototype = scan.prototype = extend(inherit($.fn), {
	rescan: function() {
		return this.clean().collect();
	},
	collect: function(base) {
		var self = this;
		walkTheDOM(base || this[0], function(node) {
			return self.getAttr(node);
		});
		return this;
	},
	clean: function(deep) {
		var item,
			key;
		for (key in this) {
			if (this.hasOwnProperty(key)) {
				item = this[key];
				item.removeAttr && item.removeAttr('js');
				deep && delete this[key];
			}
		}
		return this;
	},
	getAttr: function(node) {
		if (/text/.test(node.nodeName)) return;
		var self = this,
			$node = $(node),
			jsAttrValue = $node.attr('js');

		if (jsAttrValue) {
			each(parseJsAttr(jsAttrValue), function(prop) {
				var instance = self.hasOwnProperty(prop) && self[prop];
				if (!instance) {
					instance = self[prop] = instantiation();
					extend(instance, this);
				}
				instance[instance.length++] = node;
			});
		}
		if ($node.attr('noscan') !== undefined && $node.attr('app') && node !== self[0]) return true;
	}
});

function walkTheDOM(node, func) {
	if (func(node)) return;
	node = node.firstChild;
	while (node) {
		walkTheDOM(node, func);
		node = node.nextSibling;
	}
}

function removeAttr(node) {
	$(node).removeAttr('js');
}

function instantiation() {
	var obj = inherit($.fn);
	obj.length = 0;
	return obj;
}

$.fn.getVM = function(rescan) {
	var vmodel;
	if (rescan || !(vmodel = this.data('vmodel'))) {
		vmodel = this.data('vmodel', scan(this[0]).collect()).data('vmodel');
	}
	return vmodel;
};
//refresh
//requrie scan.js
function isMultipleArgs(arr) {
	if (!isArray(arr)) return false;

	var len = arr.length,
		type,
		i;
	if (len > 1) {
		type = $.type(arr[0]);
		for (i = len - 1; i >= 0; i--) {
			if ($.type(arr[i]) !== type) return false;
		}
		return true;
	}
	return false;
}

//refre to http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
function deepCompare() {
	var i, l, leftChain, rightChain;

	function compare2Objects(x, y) {
		var p;

		if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') return true;
		if (x === y) return true;

		if ((typeof x === 'function' && typeof y === 'function') ||
			(x instanceof Date && y instanceof Date) ||
			(x instanceof RegExp && y instanceof RegExp) ||
			(x instanceof String && y instanceof String) ||
			(x instanceof Number && y instanceof Number)) {
			return x.toString() === y.toString();
		}

		if (!(x instanceof Object && y instanceof Object)) return false;

		if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) return false;


		if (x.constructor !== y.constructor) return false;

		if (x.prototype !== y.prototype) return false;

		if (inArray(x, leftChain) > -1 || inArray(y, rightChain) > -1) return false;

		for (p in y) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false;
			} else if (typeof y[p] !== typeof x[p]) {
				return false;
			}
		}

		for (p in x) {
			if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
				return false;
			} else if (typeof y[p] !== typeof x[p]) {
				return false;
			}

			switch (typeof(x[p])) {
				case 'object':
				case 'function':

					leftChain.push(x);
					rightChain.push(y);

					if (!compare2Objects(x[p], y[p])) return false;

					leftChain.pop();
					rightChain.pop();
					break;

				default:
					if (x[p] !== y[p]) return false;
					break;
			}
		}

		return true;
	}

	if (arguments.length < 1) return true;

	for (i = 1, l = arguments.length; i < l; i++) {

		leftChain = [];
		rightChain = [];
		if (!compare2Objects(arguments[0], arguments[i])) return false;
	}
	return true;
}

$.compare = deepCompare;

function MVVM(source) {
	isObject(source) && extend(this, source);
}

MVVM.prototype = {
	each: each,
	extend: function(source) {
		return extend(this, source).refresh();
	},
	refresh: function() {
		var self = this;
		self.each(self.model, function(prop, value) {
			if (!(prop in self.vmodel)) return;
			self.render(prop, value);
		});
		return self;
	},
	render: function(prop, value) {
		var model = this.model,
			oldModel = this.oldModel,
			vmodel = this.vmodel,
			target = vmodel[prop],
			method = target.method,
			args = target.args,
			$method = method in $.fn,
			isArr = isArray(value),
			multiple = isArr ? isMultipleArgs(value) : false,
			cloneArr,
			tpl,
			ret;


		if (deepCompare(target.oldValue, value)) return;
		target.oldValue = value;

		switch (true) {
			case $method && isArr && multiple:
				ret = [];
				cloneArr = [];
				tpl = target.eq(0);
				$method = $.fn[method];
				each(value, function(i) {
					var item = target.eq(i);
					if (!item.length) {
						item = tpl.clone();
						cloneArr.push(item[0]);
					}
					ret.push($method.apply(item, args.concat(this)));
				});

				if (cloneArr.length) {
					target.eq(-1).after(cloneArr);
					push.apply(target, cloneArr);
				}

				break;

			case $method:
				ret = $.fn[method].apply(target, args.concat(value));
				break;

			default:
				method = value;
				args = method.args || arr;
				args = isArray(args) ? args : [args];
				multiple = isMultipleArgs(args);

				each(target, function(i) {
					method.apply($(this), multiple ? args[i] : args);
				});
		}
		if (method === 'listen') {
			model[prop] = ret;
		}
	}
}

var mvvm = new MVVM();


$.fn.refresh = function(model, opt) {

	mvvm.extend({
		model: model,
		vmodel: this.getVM()
	});

	return this;
}
//observe.js
var doc = document,
    head = doc.getElementsByTagName('head')[0],
    comment = doc.createComment('Kill IE6/7/8'),
    NATIVE_RE = /\[native code\]/,
    UNDEFINED = 'undefined',
    defineSetter,
    ES5;

function nextTick(fn) {
    return setTimeout(fn, 4);
}

function randomStr() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}


var def = {
    'defineProperty': NATIVE_RE.test(Object.defineProperty) && NATIVE_RE.test(Object.create) && Object.defineProperty,
    '__defineSetter__': NATIVE_RE.test(Object.prototype.__defineSetter__) && Object.prototype.__defineSetter__,
    '__defineGetter__': NATIVE_RE.test(Object.prototype.__defineGetter__) && Object.prototype.__defineGetter__
}

if (!def.defineProperty && def.__defineSetter__) {
    def.defineProperty = function(obj, propName, descriptor) {
        def.__defineGetter__.call(obj, propName, descriptor.get);
        def.__defineSetter__.call(obj, propName, descriptor.set);
    };
}

if (def.defineProperty) {
    ES5 = true;
    defineSetter = function(obj, propName, setter) {
        var value = obj[propName] || UNDEFINED,
            status = true;

        var trigger = function() {
            setter.call(obj, value, propName, obj.$$oldValues[propName]);
            obj.$$oldValues[propName] = value;
            status = true;
            trigger = function() {
                var oldValue = obj.$$oldValues[propName];
                status = true;
                if (deepCompare(oldValue, value)) return;
                setter.call(obj, value, propName, oldValue);
                obj.$$oldValues[propName] = value;
            }
        }
        delete obj[propName];
        def.defineProperty(obj, propName, {
            get: function() {
                return value;
            },
            set: function(v) {
                value = v;
                if (!status) return;
                status = false;
                nextTick(trigger);
            }
        });
    };
} else if ('onpropertychange' in head) {
    defineSetter = function(obj, propName, setter) {
        var status;
        if (obj.onpropertychange) return;
        status = {};
        obj.onpropertychange = function(e) {
            var self = this,
                attrName = (e || window.event).propertyName;

            if (!(attrName in this.$$setters)) return;
            if (status[attrName] === undefined) {
                status[attrName] = true;
                setter.call(self, self[attrName], attrName, self.$$oldValues[attrName]);
                self.$$oldValues[attrName] = self[attrName];
                return;
            }
            if (!status[attrName]) return;

            status[attrName] = false;
            nextTick(function() {
                var oldValue = self.$$oldValues[attrName];
                status[attrName] = true;
                 if (deepCompare(oldValue, self[attrName])) return;
                setter.call(self, self[attrName], attrName, oldValue);
                self.$$oldValues[attrName] = self[attrName];
            });
        };
    };
}

function observeProp(obj, propName, setter) {
    var name = propName.split('.');
    propName = name[0];
    name = name[1];
    if (!(propName in obj.$$setters)) {
        obj.$$setters[propName] = {};
        defineSetter(obj, propName, function(value, key, oldValue) {
            var self = this;
            each(self.$$setters[key], function() {
                this.call(self, value, key, oldValue);
            });
        });
    }
    obj.$$setters[propName][name || 'observe' + randomStr()] = setter;
    return obj;
}

function checkPropName(propName) {
    if ($.ES5) return;
    if (propName in comment) {
        throw new Error(
            'If you want to support IE6/7/8. The property name [' + propName + '] can not be observed, ' +
            'because DOM has the same property name. ' +
            'You can use the [jQuery.ES5 = true] to ignore IE6/7/8.'
        );
    }
}



var observer = {
    $$proto: {
        add: function(propName, value) {
            this[propName] = value || UNDEFINED;
            this.$$oldValues[propName] = '$.observe' + randomStr();
            return this;
        },
        remove: function(propName) {
            delete this.$$oldValues[propName];
            if ('onpropertychange' in this && this.nodeName !== undefined) {
                this.removeAttribute(propName);
            } else {
                delete this[propName];
            }
            return this;
        },
        on: function() {
            var self = this,
                args = slice.call(arguments);

            if (args.length === 1) {
                args = args[0];
                if (isObject(args)) {
                    each(args, function(propName, setter) {
                        checkPropName(propName);
                        observeProp(self, propName, setter);
                    });
                } else if (isFunction(args)) {
                    self.each(function(propName) {
                        checkPropName(propName);
                        observeProp(self, propName, args);
                    });
                }
            } else if (args.length === 2 && isString(args[0]) && isFunction(args[1])) {
                checkPropName(args[0]);
                observeProp(self, args[0], args[1]);
            }

            return this;
        },
        off: function() {
            var self = this,
                args = slice.call(arguments);

            if (args.length === 0) {
                each(self.$$setters, function(key) {
                    self.$$setters[key] = {};
                });
            } else if (args.length >= 1) {
                each(args, function() {
                    var index = this.indexOf('.'),
                        propName,
                        name;
                    if (index === 0) {
                        name = this.substr(1);
                        each(self.$$setters, function() {
                            name in this && delete this[name];
                        });
                    } else if (index > 0) {
                        propName = this.substr(0, index);
                        name = this.substr(index + 1);
                        name in self.$$setters[propName] && delete self.$$setters[propName][name];
                    } else if (this in self.$$setters) {
                        self.$$setters[this] = {};
                    }
                });
            }
            return this;
        },
        each: function(callback) {
            var self = this;
            each(self.$$oldValues, function(key) {
                callback.call(self, key, self[key]);
            });
            return this;
        },
        extend: function() {
            return extend.apply(null, [this].concat(slice.call(arguments)));
        }
    },
    init: ES5 ? function(source) {
        var target = inherit(this.$$proto),
            oldValues = target.$$oldValues = {};
        target.$$setters = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                oldValues[key] = target[key] = source[key];
            }
        }
        return target;
    } : function(source) {
        var target = head.appendChild(doc.createComment('[object Object]')),
            oldValues = target.$$oldValues = {};
        extend(target, this.$$proto).$$setters = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                oldValues[key] = target[key] = source[key];
            }
        }
        return target;
    }
};



$.observe = function(source, setters) {
    var model;
    if (!isObject(source)) return null;
    model = observer.init(source);
    return isObject(setters) || isFunction(setters) ? model.on(setters) : model;
};
//plus.js
extend($.fn, {
	render: function(api) {
		if (!isObject(api)) return;
		var self = this,
			$fn = $.fn;
		each(api, function(key, value) {
			var $method = $fn[key];
			$method && $method[isArray(value) ? 'apply' : 'call'](self, value);
		});
		return this;
	},
	listen: function(model) {
		var self = this;
		self.refresh(model);
		return $.observe(model).on(function(value, key) {
			var o = {};
			o[key] = value;
			self.refresh(o);
		});
	}
});

$.define = function(name, callback) {
	var target = $(name),
		model;
	if (!target.length) return;
	model = {};
	model = callback(model) || model;
	return target.listen(model);
};


var $module = {
	vmodel: {},
	ready: function(callback) {
		var self = this;
		$(document).ready(function() {
			callback.call(self.$scan());
		});
		return this;
	},
	$scan: function() {
		var self = this;
		$('[app]').each(function() {
			var $this = $(this),
				appName = $this.attr('app'),
				status = false;
			self.vmodel[appName] = $this.getVM();
			self.on(appName + '.module', function(model, appName) {
				if (status || !isObject(model)) return;
				status = true;
				this[appName] = $this.listen(model);
				status = false;
			});
		});
		return this;
	}
};

$.module = extend($.observe({}), $module);

}(window.jQuery || window.Zepto));