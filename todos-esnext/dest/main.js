/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/dest/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _interopRequireWildcard = __webpack_require__(62)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	var _helper = __webpack_require__(11);

	var helper = _interopRequireWildcard(_helper);

	var _component = __webpack_require__(1);

	var _component2 = _interopRequireDefault(_component);

	var _directive = __webpack_require__(54);

	var _directive2 = _interopRequireDefault(_directive);

	var _method = __webpack_require__(55);

	var method = _interopRequireWildcard(_method);

	var _model = __webpack_require__(56);

	var _model2 = _interopRequireDefault(_model);

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var App = (function () {
		function App() {
			_classCallCheck(this, App);

			this.model = new _model2['default']('todo-esnext');
			this.listen();
		}

		_createClass(App, [{
			key: 'render',
			value: function render() {
				var _context;

				var activeFilter = '/' + location.hash.replace('#/', '');
				var data = this.model.getData(activeFilter);
				var directive = helper.directive;

				(_context = '#todoapp', directive).call(_context, data, _directive2['default']);
			}
		}, {
			key: 'listen',
			value: function listen() {
				var _context2;

				var pipe = helper.pipe;
				var watch = helper.watch;
				var on = helper.on;

				var render = this.render.bind(this);
				var onAction = (_context2 = [(_context2 = this.model).onAction.bind(_context2), render], pipe).call(_context2);
				var onAdd = method.onAdd;
				var onEdited = method.onEdited;
				var onEditing = method.onEditing;
				var onToggle = method.onToggle;
				var onRemove = method.onRemove;

				var events = {
					'change : #new-todo': function changeNewTodo(e) {
						var _context3;

						(_context3 = (_context3 = e.target, onAdd).bind(_context3), pipe).call(_context3, onAction)();
					},
					'change : #todo-list .edit': function changeTodoListEdit(e) {
						var _context4;

						(_context4 = (_context4 = e.target, onEdited).bind(_context4), pipe).call(_context4, onAction)();
					},
					'keyup : #new-todo': function keyupNewTodo(e) {
						if (e.keyCode === ENTER_KEY) {
							var _context5;

							(_context5 = (_context5 = e.target, onAdd).bind(_context5), pipe).call(_context5, onAction)();
						}
					},
					'dblclick : #todo-list label': function dblclickTodoListLabel(e) {
						var _context6;

						(_context6 = e.target, onEditing).call(_context6);
					},
					'keyup : #todo-list .edit': function keyupTodoListEdit(e) {
						var keyCode = e.keyCode;
						if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
							var _context7;

							(_context7 = e.target, onEdited).call(_context7);
						}
					},
					'change : #todo-list .toggle': function changeTodoListToggle(e) {
						var _context8;

						(_context8 = (_context8 = e.target, onToggle).bind(_context8), pipe).call(_context8, onAction)();
					},
					'click : #todo-list .destroy': function clickTodoListDestroy(e) {
						var _context9;

						(_context9 = (_context9 = e.target, onRemove).bind(_context9), pipe).call(_context9, onAction)();
					},
					'click : #clear-completed': function clickClearCompleted(e) {
						onAction({
							type: 'clear'
						});
					},
					'change : #toggle-all': function changeToggleAll(e) {
						onAction({
							type: 'toggleAll',
							completed: e.target.checked
						});
					}
				};

				watch.call(events);
				on.call(window, 'hashchange', render);
				on.call(window, 'DOMContentLoaded', render);
			}
		}]);

		return App;
	})();

	new App();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _todo2 = __webpack_require__(3);

	var _todo3 = _interopRequireDefault(_todo2);

	exports.todo = _todo3['default'];

	var _todos2 = __webpack_require__(4);

	var _todos3 = _interopRequireDefault(_todos2);

	exports.todos = _todos3['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports['default'] = function (data) {
		var completed = data.completed;
		var time = data.time;
		var id = data.id;
		var title = data.title;

		return '\n<li class="' + completed + '" data-id="' + id + '" data-helper="todo" title="' + time + '">\n\t<div class="view">\n\t\t<input class="toggle" type="checkbox" ' + (completed ? 'checked' : '') + '>\n\t\t\t\t<label>' + title + '</label>\n\t\t\t\t<button class="destroy"></button>\n\t</div>\n\t<input class="edit">\n</li>\n\t';
	};

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _componentTodo = __webpack_require__(3);

	var _componentTodo2 = _interopRequireDefault(_componentTodo);

	exports['default'] = function (data) {
		return '\n<ul id="todo-list">\n\t' + data.map(_componentTodo2['default']).join('') + '\n</ul>\n\t';
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _Object$defineProperty = __webpack_require__(6)["default"];

	exports["default"] = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;

	      _Object$defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(7), __esModule: true };

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}

	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}

	var $ = module.exports = __webpack_require__(9)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	exports.__esModule = true;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = __webpack_require__(12)['default'];

	var _Promise = __webpack_require__(32)['default'];

	var _Object$keys = __webpack_require__(47)['default'];

	var _Array$from = __webpack_require__(51)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var noop = function noop() {};

	//type helper
	var isArray = function isArray() {
	    return Array.isArray(this);
	};

	exports.isArray = isArray;
	var isFunction = function isFunction() {
	    return Object.prototype.toString.call(this) === '[object Function]';
	};

	exports.isFunction = isFunction;
	var isObject = function isObject() {
	    return Object.prototype.toString.call(this) === '[object Object]';
	};

	exports.isObject = isObject;
	var isString = function isString() {
	    return Object.prototype.toString.call(this) === '[object String]';
	};

	exports.isString = isString;
	var isNumber = function isNumber() {
	    return Object.prototype.toString.call(this) === '[object Number]';
	};

	exports.isNumber = isNumber;
	var isBoolean = function isBoolean() {
	    return Object.prototype.toString.call(this) === '[object Boolean]';
	};

	//function helper
	exports.isBoolean = isBoolean;
	var pipe = function pipe() {
	    var _this = this;

	    var next = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	    if (isFunction.call(this)) {
	        return function () {
	            return next(_this.apply(undefined, arguments));
	        };
	    } else if (isArray.call(this)) {
	        return this.reduce(function (prev, cur) {
	            return pipe.call(prev, cur);
	        });
	    }
	};

	exports.pipe = pipe;
	var then = function then(next) {
	    var _this2 = this;

	    if (isFunction.bind(this)) {
	        return function () {
	            return _Promise.resolve(_this2.apply(undefined, arguments)).then(next);
	        };
	    } else if (isArray.call(this)) {
	        return this.reduce(function (prev, cur) {
	            return then.call(prev, cur);
	        });
	    }
	};

	exports.then = then;
	var currying = function currying(first) {
	    var _this3 = this;

	    return function () {
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        _this3.apply(undefined, [first].concat(args));
	    };
	};

	exports.currying = currying;
	var uncurrying = function uncurrying() {
	    var _this4 = this;

	    return function (context) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	            args[_key2 - 1] = arguments[_key2];
	        }

	        _this4.apply.apply(_this4, [context].concat(args));
	    };
	};

	//object helper
	exports.uncurrying = uncurrying;
	var equal = function equal(obj) {
	    if (isString.call(this)) {
	        return String(this) === obj;
	    } else if (isNumber.call(this)) {
	        return Number(this) === obj;
	    } else if (isBoolean.call(this)) {
	        return Boolean(this) === obj;
	    }
	    return this === obj;
	};

	//srting helper
	exports.equal = equal;
	var elem = function elem() {
	    var context = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

	    return context.querySelector(this.toString());
	};

	exports.elem = elem;
	var elems = function elems() {
	    var context = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

	    return context.querySelectorAll(this.toString());
	};

	exports.elems = elems;
	var into = function into(dom) {
	    dom.innerHTML = this.toString();
	};

	exports.into = into;
	var directive = function directive(model, _directive) {
	    var _context;

	    var root = isString.call(this) ? elem.call(this) : this;

	    (_context = find.call(root, '[data-directive]'), each).call(_context, function (node) {
	        var handler = _directive[node.dataset.directive];
	        if (!handler) {
	            return;
	        }
	        if (isFunction.call(handler)) {
	            return handler.call(node, model[node.dataset.directive]);
	        }
	        _Object$keys(handler).forEach(function (key) {
	            var handle = handler[key];
	            var args = model[key];
	            handle.call(node, args);
	        });
	    });
	};

	exports.directive = directive;

	var _ref = (function () {

	    var eventStore = {};
	    var trigger = function trigger(e) {
	        var target = e.target;
	        var type = e.type;

	        var events = eventStore[type];
	        events.forEach(function (entry) {
	            var _context2;

	            var nodes = (_context2 = entry.selector, elems).call(_context2);
	            include.call(nodes, target) && entry.handle.call(target, e);
	        });
	    };
	    var watch = function watch(handle) {
	        var _this5 = this;

	        if (isObject.call(this)) {
	            return _Object$keys(this).forEach(function (key) {
	                return watch.call(key, _this5[key]);
	            });
	        }

	        var _toString$split$map = this.toString().split(':').map(function (str) {
	            return str.trim();
	        });

	        var _toString$split$map2 = _slicedToArray(_toString$split$map, 2);

	        var type = _toString$split$map2[0];
	        var selector = _toString$split$map2[1];

	        if (!eventStore[type]) {
	            eventStore[type] = [];
	            document.addEventListener(type, trigger, false);
	        }
	        eventStore[type].push({
	            selector: selector,
	            handle: handle
	        });
	    };
	    var unwatch = function unwatch(handle) {
	        var _this6 = this;

	        if (isObject.call(this)) {
	            return _Object$keys(this).forEach(function (key) {
	                return unwatch.call(key, _this6[key]);
	            });
	        }

	        var _toString$split = this.toString().split(':');

	        var _toString$split2 = _slicedToArray(_toString$split, 2);

	        var type = _toString$split2[0];
	        var selector = _toString$split2[1];

	        var store = eventStore[type];
	        if (!isArray.call(store)) {
	            return;
	        }
	        for (var i = store.length - 1; i >= 0; i--) {
	            var item = store[i];
	            if (item.selector === selector && item.handle === handle) {
	                store.splace(i, 1);
	            }
	        }
	    };

	    return { watch: watch, unwatch: unwatch };
	})();

	//number helper

	//dom helper
	var watch = _ref.watch;
	var unwatch = _ref.unwatch;
	exports.watch = watch;
	exports.unwatch = unwatch;
	var each = function each() {
	    var handle = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	    return _Array$from(this).forEach(handle);
	};

	exports.each = each;
	var map = function map() {
	    var handle = arguments.length <= 0 || arguments[0] === undefined ? noop : arguments[0];

	    return _Array$from(this).map(handle);
	};

	exports.map = map;
	var filter = function filter(handle) {
	    var elems = _Array$from(this);
	    return isFunction.call(handle) ? elems.filter(handle) : elems;
	};

	exports.filter = filter;
	var include = function include(node) {
	    return _Array$from(this).indexOf(node) !== -1;
	};

	exports.include = include;
	var find = function find(selector) {
	    return this.querySelectorAll(selector);
	};

	exports.find = find;
	var attr = function attr(attrName, value) {
	    if (value == null) {
	        return this.getAttribute(attrName);
	    } else {
	        this.setAttribute(attrName, value);
	    }
	};

	exports.attr = attr;
	var addClass = function addClass(className) {
	    this.classList.add(className);
	};

	exports.addClass = addClass;
	var removeClass = function removeClass(className) {
	    this.classList.remove(className);
	};

	exports.removeClass = removeClass;
	var on = function on(type) {
	    var handle = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	    var capture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    this.addEventListener(type, handle, capture);
	};

	exports.on = on;
	var off = function off(type) {
	    var handle = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];
	    var capture = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    this.removeEventListener(type, handle, capture);
	};

	exports.off = off;
	var html = function html(_html) {
	    this.innerHTML = _html;
	};
	exports.html = html;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _getIterator = __webpack_require__(13)["default"];

	var _isIterable = __webpack_require__(30)["default"];

	exports["default"] = (function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (_isIterable(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	})();

	exports.__esModule = true;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(27);
	__webpack_require__(29);
	module.exports = __webpack_require__(8).core.getIterator;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(16);
	var $           = __webpack_require__(8)
	  , Iterators   = __webpack_require__(19).Iterators
	  , ITERATOR    = __webpack_require__(21)('iterator')
	  , ArrayValues = Iterators.Array
	  , NL          = $.g.NodeList
	  , HTC         = $.g.HTMLCollection
	  , NLProto     = NL && NL.prototype
	  , HTCProto    = HTC && HTC.prototype;
	if($.FW){
	  if(NL && !(ITERATOR in NLProto))$.hide(NLProto, ITERATOR, ArrayValues);
	  if(HTC && !(ITERATOR in HTCProto))$.hide(HTCProto, ITERATOR, ArrayValues);
	}
	Iterators.NodeList = Iterators.HTMLCollection = ArrayValues;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , setUnscope = __webpack_require__(17)
	  , ITER       = __webpack_require__(18).safe('iter')
	  , $iter      = __webpack_require__(19)
	  , step       = $iter.step
	  , Iterators  = $iter.Iterators;

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	__webpack_require__(24)(Array, 'Array', function(iterated, kind){
	  $.set(this, ITER, {o: $.toObject(iterated), i: 0, k: kind});
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , kind  = iter.k
	    , index = iter.i++;
	  if(!O || index >= O.length){
	    iter.o = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	setUnscope('keys');
	setUnscope('values');
	setUnscope('entries');

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var sid = 0;
	function uid(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++sid + Math.random()).toString(36));
	}
	uid.safe = __webpack_require__(8).g.Symbol || uid;
	module.exports = uid;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $                 = __webpack_require__(8)
	  , cof               = __webpack_require__(20)
	  , classof           = cof.classof
	  , assert            = __webpack_require__(23)
	  , assertObject      = assert.obj
	  , SYMBOL_ITERATOR   = __webpack_require__(21)('iterator')
	  , FF_ITERATOR       = '@@iterator'
	  , Iterators         = __webpack_require__(22)('iterators')
	  , IteratorPrototype = {};
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	setIterator(IteratorPrototype, $.that);
	function setIterator(O, value){
	  $.hide(O, SYMBOL_ITERATOR, value);
	  // Add iterator for FF iterator protocol
	  if(FF_ITERATOR in [])$.hide(O, FF_ITERATOR, value);
	}

	module.exports = {
	  // Safari has buggy iterators w/o `next`
	  BUGGY: 'keys' in [] && !('next' in [].keys()),
	  Iterators: Iterators,
	  step: function(done, value){
	    return {value: value, done: !!done};
	  },
	  is: function(it){
	    var O      = Object(it)
	      , Symbol = $.g.Symbol;
	    return (Symbol && Symbol.iterator || FF_ITERATOR) in O
	      || SYMBOL_ITERATOR in O
	      || $.has(Iterators, classof(O));
	  },
	  get: function(it){
	    var Symbol = $.g.Symbol
	      , getIter;
	    if(it != undefined){
	      getIter = it[Symbol && Symbol.iterator || FF_ITERATOR]
	        || it[SYMBOL_ITERATOR]
	        || Iterators[classof(it)];
	    }
	    assert($.isFunction(getIter), it, ' is not iterable!');
	    return assertObject(getIter.call(it));
	  },
	  set: setIterator,
	  create: function(Constructor, NAME, next, proto){
	    Constructor.prototype = $.create(proto || IteratorPrototype, {next: $.desc(1, next)});
	    cof.set(Constructor, NAME + ' Iterator');
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(8)
	  , TAG      = __webpack_require__(21)('toStringTag')
	  , toString = {}.toString;
	function cof(it){
	  return toString.call(it).slice(8, -1);
	}
	cof.classof = function(it){
	  var O, T;
	  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T : cof(O);
	};
	cof.set = function(it, tag, stat){
	  if(it && !$.has(it = stat ? it : it.prototype, TAG))$.hide(it, TAG, tag);
	};
	module.exports = cof;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(8).g
	  , store  = __webpack_require__(22)('wks');
	module.exports = function(name){
	  return store[name] || (store[name] =
	    global.Symbol && global.Symbol[name] || __webpack_require__(18).safe('Symbol.' + name));
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var $      = __webpack_require__(8)
	  , SHARED = '__core-js_shared__'
	  , store  = $.g[SHARED] || ($.g[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	function assert(condition, msg1, msg2){
	  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
	}
	assert.def = $.assertDefined;
	assert.fn = function(it){
	  if(!$.isFunction(it))throw TypeError(it + ' is not a function!');
	  return it;
	};
	assert.obj = function(it){
	  if(!$.isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};
	assert.inst = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};
	module.exports = assert;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var $def            = __webpack_require__(25)
	  , $redef          = __webpack_require__(26)
	  , $               = __webpack_require__(8)
	  , cof             = __webpack_require__(20)
	  , $iter           = __webpack_require__(19)
	  , SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , FF_ITERATOR     = '@@iterator'
	  , KEYS            = 'keys'
	  , VALUES          = 'values'
	  , Iterators       = $iter.Iterators;
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCE){
	  $iter.create(Constructor, NAME, next);
	  function createMethod(kind){
	    function $$(that){
	      return new Constructor(that, kind);
	    }
	    switch(kind){
	      case KEYS: return function keys(){ return $$(this); };
	      case VALUES: return function values(){ return $$(this); };
	    } return function entries(){ return $$(this); };
	  }
	  var TAG      = NAME + ' Iterator'
	    , proto    = Base.prototype
	    , _native  = proto[SYMBOL_ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , _default = _native || createMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if(_native){
	    var IteratorPrototype = $.getProto(_default.call(new Base));
	    // Set @@toStringTag to native iterators
	    cof.set(IteratorPrototype, TAG, true);
	    // FF fix
	    if($.FW && $.has(proto, FF_ITERATOR))$iter.set(IteratorPrototype, $.that);
	  }
	  // Define iterator
	  if($.FW || FORCE)$iter.set(proto, _default);
	  // Plug for library
	  Iterators[NAME] = _default;
	  Iterators[TAG]  = $.that;
	  if(DEFAULT){
	    methods = {
	      keys:    IS_SET            ? _default : createMethod(KEYS),
	      values:  DEFAULT == VALUES ? _default : createMethod(VALUES),
	      entries: DEFAULT != VALUES ? _default : createMethod('entries')
	    };
	    if(FORCE)for(key in methods){
	      if(!(key in proto))$redef(proto, key, methods[key]);
	    } else $def($def.P + $def.F * $iter.BUGGY, NAME, methods);
	  }
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8).hide;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var set   = __webpack_require__(8).set
	  , $at   = __webpack_require__(28)(true)
	  , ITER  = __webpack_require__(18).safe('iter')
	  , $iter = __webpack_require__(19)
	  , step  = $iter.step;

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(24)(String, 'String', function(iterated){
	  set(this, ITER, {o: String(iterated), i: 0});
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var iter  = this[ITER]
	    , O     = iter.o
	    , index = iter.i
	    , point;
	  if(index >= O.length)return step(1);
	  point = $at(O, index);
	  iter.i += point.length;
	  return step(0, point);
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// true  -> String#at
	// false -> String#codePointAt
	var $ = __webpack_require__(8);
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String($.assertDefined(that))
	      , i = $.toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l
	      || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	        ? TO_STRING ? s.charAt(i) : a
	        : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(8).core
	  , $iter = __webpack_require__(19);
	core.isIterable  = $iter.is;
	core.getIterator = $iter.get;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(31), __esModule: true };

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(15);
	__webpack_require__(27);
	__webpack_require__(29);
	module.exports = __webpack_require__(8).core.isIterable;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(33), __esModule: true };

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(34);
	__webpack_require__(27);
	__webpack_require__(15);
	__webpack_require__(35);
	module.exports = __webpack_require__(8).core.Promise;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(20)
	  , tmp = {};
	tmp[__webpack_require__(21)('toStringTag')] = 'z';
	if(__webpack_require__(8).FW && cof(tmp) != 'z'){
	  __webpack_require__(26)(Object.prototype, 'toString', function toString(){
	    return '[object ' + cof.classof(this) + ']';
	  }, true);
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $        = __webpack_require__(8)
	  , ctx      = __webpack_require__(37)
	  , cof      = __webpack_require__(20)
	  , $def     = __webpack_require__(25)
	  , assert   = __webpack_require__(23)
	  , forOf    = __webpack_require__(38)
	  , setProto = __webpack_require__(40).set
	  , same     = __webpack_require__(36)
	  , species  = __webpack_require__(41)
	  , SPECIES  = __webpack_require__(21)('species')
	  , RECORD   = __webpack_require__(18).safe('record')
	  , PROMISE  = 'Promise'
	  , global   = $.g
	  , process  = global.process
	  , isNode   = cof(process) == 'process'
	  , asap     = process && process.nextTick || __webpack_require__(42).set
	  , P        = global[PROMISE]
	  , isFunction     = $.isFunction
	  , isObject       = $.isObject
	  , assertFunction = assert.fn
	  , assertObject   = assert.obj
	  , Wrapper;

	function testResolve(sub){
	  var test = new P(function(){});
	  if(sub)test.constructor = Object;
	  return P.resolve(test) === test;
	}

	var useNative = function(){
	  var works = false;
	  function P2(x){
	    var self = new P(x);
	    setProto(self, P2.prototype);
	    return self;
	  }
	  try {
	    works = isFunction(P) && isFunction(P.resolve) && testResolve();
	    setProto(P2, P);
	    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
	    // actual Firefox has broken subclass support, test that
	    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
	      works = false;
	    }
	    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
	    if(works && $.DESC){
	      var thenableThenGotten = false;
	      P.resolve($.setDesc({}, 'then', {
	        get: function(){ thenableThenGotten = true; }
	      }));
	      works = thenableThenGotten;
	    }
	  } catch(e){ works = false; }
	  return works;
	}();

	// helpers
	function isPromise(it){
	  return isObject(it) && (useNative ? cof.classof(it) == 'Promise' : RECORD in it);
	}
	function sameConstructor(a, b){
	  // library wrapper special case
	  if(!$.FW && a === P && b === Wrapper)return true;
	  return same(a, b);
	}
	function getConstructor(C){
	  var S = assertObject(C)[SPECIES];
	  return S != undefined ? S : C;
	}
	function isThenable(it){
	  var then;
	  if(isObject(it))then = it.then;
	  return isFunction(then) ? then : false;
	}
	function notify(record){
	  var chain = record.c;
	  // strange IE + webpack dev server bug - use .call(global)
	  if(chain.length)asap.call(global, function(){
	    var value = record.v
	      , ok    = record.s == 1
	      , i     = 0;
	    function run(react){
	      var cb = ok ? react.ok : react.fail
	        , ret, then;
	      try {
	        if(cb){
	          if(!ok)record.h = true;
	          ret = cb === true ? value : cb(value);
	          if(ret === react.P){
	            react.rej(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(ret)){
	            then.call(ret, react.res, react.rej);
	          } else react.res(ret);
	        } else react.rej(value);
	      } catch(err){
	        react.rej(err);
	      }
	    }
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    chain.length = 0;
	  });
	}
	function isUnhandled(promise){
	  var record = promise[RECORD]
	    , chain  = record.a || record.c
	    , i      = 0
	    , react;
	  if(record.h)return false;
	  while(chain.length > i){
	    react = chain[i++];
	    if(react.fail || !isUnhandled(react.P))return false;
	  } return true;
	}
	function $reject(value){
	  var record = this
	    , promise;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  record.v = value;
	  record.s = 2;
	  record.a = record.c.slice();
	  setTimeout(function(){
	    // strange IE + webpack dev server bug - use .call(global)
	    asap.call(global, function(){
	      if(isUnhandled(promise = record.p)){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(global.console && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      }
	      record.a = undefined;
	    });
	  }, 1);
	  notify(record);
	}
	function $resolve(value){
	  var record = this
	    , then;
	  if(record.d)return;
	  record.d = true;
	  record = record.r || record; // unwrap
	  try {
	    if(then = isThenable(value)){
	      // strange IE + webpack dev server bug - use .call(global)
	      asap.call(global, function(){
	        var wrapper = {r: record, d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      record.v = value;
	      record.s = 1;
	      notify(record);
	    }
	  } catch(e){
	    $reject.call({r: record, d: false}, e); // wrap
	  }
	}

	// constructor polyfill
	if(!useNative){
	  // 25.4.3.1 Promise(executor)
	  P = function Promise(executor){
	    assertFunction(executor);
	    var record = {
	      p: assert.inst(this, P, PROMISE),       // <- promise
	      c: [],                                  // <- awaiting reactions
	      a: undefined,                           // <- checked in isUnhandled reactions
	      s: 0,                                   // <- state
	      d: false,                               // <- done
	      v: undefined,                           // <- value
	      h: false                                // <- handled rejection
	    };
	    $.hide(this, RECORD, record);
	    try {
	      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
	    } catch(err){
	      $reject.call(record, err);
	    }
	  };
	  __webpack_require__(45)(P.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var S = assertObject(assertObject(this).constructor)[SPECIES];
	      var react = {
	        ok:   isFunction(onFulfilled) ? onFulfilled : true,
	        fail: isFunction(onRejected)  ? onRejected  : false
	      };
	      var promise = react.P = new (S != undefined ? S : P)(function(res, rej){
	        react.res = assertFunction(res);
	        react.rej = assertFunction(rej);
	      });
	      var record = this[RECORD];
	      record.c.push(react);
	      if(record.a)record.a.push(react);
	      if(record.s)notify(record);
	      return promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	}

	// export
	$def($def.G + $def.W + $def.F * !useNative, {Promise: P});
	cof.set(P, PROMISE);
	species(P);
	species(Wrapper = $.core[PROMISE]);

	// statics
	$def($def.S + $def.F * !useNative, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    return new (getConstructor(this))(function(res, rej){ rej(r); });
	  }
	});
	$def($def.S + $def.F * (!useNative || testResolve(true)), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    return isPromise(x) && sameConstructor(x.constructor, this)
	      ? x : new this(function(res){ res(x); });
	  }
	});
	$def($def.S + $def.F * !(useNative && __webpack_require__(46)(function(iter){
	  P.all(iter)['catch'](function(){});
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C      = getConstructor(this)
	      , values = [];
	    return new C(function(res, rej){
	      forOf(iterable, false, values.push, values);
	      var remaining = values.length
	        , results   = Array(remaining);
	      if(remaining)$.each.call(values, function(promise, index){
	        C.resolve(promise).then(function(value){
	          results[index] = value;
	          --remaining || res(results);
	        }, rej);
	      });
	      else res(results);
	    });
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C = getConstructor(this);
	    return new C(function(res, rej){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(res, rej);
	      });
	    });
	  }
	});

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// Optional / simple context binding
	var assertFunction = __webpack_require__(23).fn;
	module.exports = function(fn, that, length){
	  assertFunction(fn);
	  if(~length && that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  } return function(/* ...args */){
	      return fn.apply(that, arguments);
	    };
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var ctx  = __webpack_require__(37)
	  , get  = __webpack_require__(19).get
	  , call = __webpack_require__(39);
	module.exports = function(iterable, entries, fn, that){
	  var iterator = get(iterable)
	    , f        = ctx(fn, that, entries ? 2 : 1)
	    , step;
	  while(!(step = iterator.next()).done){
	    if(call(iterator, f, step.value, entries) === false){
	      return call.close(iterator);
	    }
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var assertObject = __webpack_require__(23).obj;
	function close(iterator){
	  var ret = iterator['return'];
	  if(ret !== undefined)assertObject(ret.call(iterator));
	}
	function call(iterator, fn, value, entries){
	  try {
	    return entries ? fn(assertObject(value)[0], value[1]) : fn(value);
	  } catch(e){
	    close(iterator);
	    throw e;
	  }
	}
	call.close = close;
	module.exports = call;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var $      = __webpack_require__(8)
	  , assert = __webpack_require__(23);
	function check(O, proto){
	  assert.obj(O);
	  assert(proto === null || $.isObject(proto), proto, ": can't set as prototype!");
	}
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} // eslint-disable-line
	    ? function(buggy, set){
	        try {
	          set = __webpack_require__(37)(Function.call, $.getDesc(Object.prototype, '__proto__').set, 2);
	          set({}, []);
	        } catch(e){ buggy = true; }
	        return function setPrototypeOf(O, proto){
	          check(O, proto);
	          if(buggy)O.__proto__ = proto;
	          else set(O, proto);
	          return O;
	        };
	      }()
	    : undefined),
	  check: check
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var $       = __webpack_require__(8)
	  , SPECIES = __webpack_require__(21)('species');
	module.exports = function(C){
	  if($.DESC && !(SPECIES in C))$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: $.that
	  });
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $      = __webpack_require__(8)
	  , ctx    = __webpack_require__(37)
	  , cof    = __webpack_require__(20)
	  , invoke = __webpack_require__(43)
	  , cel    = __webpack_require__(44)
	  , global             = $.g
	  , isFunction         = $.isFunction
	  , html               = $.html
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	function run(){
	  var id = +this;
	  if($.has(queue, id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	}
	function listner(event){
	  run.call(event.data);
	}
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!isFunction(setTask) || !isFunction(clearTask)){
	  setTask = function(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(isFunction(fn) ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(cof(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Modern browsers, skip implementation for WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is object
	  } else if(global.addEventListener && isFunction(global.postMessage) && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id, '*');
	    };
	    global.addEventListener('message', listner, false);
	  // WebWorkers
	  } else if(isFunction(MessageChannel)){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listner;
	    defer = ctx(port.postMessage, port, 1);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// Fast apply
	// http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
	                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(8)
	  , document = $.g.document
	  , isObject = $.isObject
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var $redef = __webpack_require__(26);
	module.exports = function(target, src){
	  for(var key in src)$redef(target, key, src[key]);
	  return target;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var SYMBOL_ITERATOR = __webpack_require__(21)('iterator')
	  , SAFE_CLOSING    = false;
	try {
	  var riter = [7][SYMBOL_ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	module.exports = function(exec){
	  if(!SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[SYMBOL_ITERATOR]();
	    iter.next = function(){ safe = true; };
	    arr[SYMBOL_ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(48), __esModule: true };

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(49);
	module.exports = __webpack_require__(8).core.Object.keys;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(8)
	  , $def     = __webpack_require__(25)
	  , isObject = $.isObject
	  , toObject = $.toObject;
	$.each.call(('freeze,seal,preventExtensions,isFrozen,isSealed,isExtensible,' +
	  'getOwnPropertyDescriptor,getPrototypeOf,keys,getOwnPropertyNames').split(',')
	, function(KEY, ID){
	  var fn     = ($.core.Object || {})[KEY] || Object[KEY]
	    , forced = 0
	    , method = {};
	  method[KEY] = ID == 0 ? function freeze(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 1 ? function seal(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 2 ? function preventExtensions(it){
	    return isObject(it) ? fn(it) : it;
	  } : ID == 3 ? function isFrozen(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 4 ? function isSealed(it){
	    return isObject(it) ? fn(it) : true;
	  } : ID == 5 ? function isExtensible(it){
	    return isObject(it) ? fn(it) : false;
	  } : ID == 6 ? function getOwnPropertyDescriptor(it, key){
	    return fn(toObject(it), key);
	  } : ID == 7 ? function getPrototypeOf(it){
	    return fn(Object($.assertDefined(it)));
	  } : ID == 8 ? function keys(it){
	    return fn(toObject(it));
	  } : __webpack_require__(50).get;
	  try {
	    fn('z');
	  } catch(e){
	    forced = 1;
	  }
	  $def($def.S + $def.F * forced, 'Object', method);
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var $ = __webpack_require__(8)
	  , toString = {}.toString
	  , getNames = $.getNames;

	var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	function getWindowNames(it){
	  try {
	    return getNames(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	}

	module.exports.get = function getOwnPropertyNames(it){
	  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
	  return getNames($.toObject(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(52), __esModule: true };

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(27);
	__webpack_require__(53);
	module.exports = __webpack_require__(8).core.Array.from;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $     = __webpack_require__(8)
	  , ctx   = __webpack_require__(37)
	  , $def  = __webpack_require__(25)
	  , $iter = __webpack_require__(19)
	  , call  = __webpack_require__(39);
	$def($def.S + $def.F * !__webpack_require__(46)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = Object($.assertDefined(arrayLike))
	      , mapfn   = arguments[1]
	      , mapping = mapfn !== undefined
	      , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
	      , index   = 0
	      , length, result, step, iterator;
	    if($iter.is(O)){
	      iterator = $iter.get(O);
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result   = new (typeof this == 'function' ? this : Array);
	      for(; !(step = iterator.next()).done; index++){
	        result[index] = mapping ? call(iterator, f, [step.value, index], true) : step.value;
	      }
	    } else {
	      // strange IE quirks mode bug -> use typeof instead of isFunction
	      result = new (typeof this == 'function' ? this : Array)(length = $.toLength(O.length));
	      for(; length > index; index++){
	        result[index] = mapping ? f(O[index], index) : O[index];
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(62)['default'];

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	var _helper = __webpack_require__(11);

	var _component = __webpack_require__(1);

	var component = _interopRequireWildcard(_component);

	exports['default'] = {
		todoCount: function todoCount(count) {
			if (_helper.equal.call(count, 0)) {
				var _context;

				(_context = '', _helper.into).call(_context, this);
			} else if (_helper.equal.call(count, 1)) {
				var _context2;

				(_context2 = '1 item left', _helper.into).call(_context2, this);
			} else if (count > 1) {
				var _context3;

				(_context3 = count + ' items left', _helper.into).call(_context3, this);
			}
		},
		clearCompleted: function clearCompleted(amount) {
			if (_helper.equal.call(amount, 0)) {
				var _context4;

				(_context4 = '', _helper.into).call(_context4, this);
			} else if (amount >= 1) {
				var _context5;

				(_context5 = 'Clear completed (' + amount + ')', _helper.into).call(_context5, this);
			}
		},
		filters: function filters(activeFilters) {
			var _context6;

			(_context6 = _helper.find.call(this, 'a'), _helper.each).call(_context6, function (link) {
				var _context7;

				if ((_context7 = _helper.attr.call(link, 'href'), _helper.equal).call(_context7, '#' + activeFilters)) {
					_helper.addClass.call(link, 'selected');
				} else {
					_helper.removeClass.call(link, 'selected');
				}
			});
		},
		toggleAll: function toggleAll(checked) {
			this.checked = !!checked;
		},
		todoList: function todoList(data) {
			var _context8;

			(_context8 = component.todos(data), _helper.into).call(_context8, this);
		}
	};
	module.exports = exports['default'];

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _helper = __webpack_require__(11);

	var onAdd = function onAdd() {
	    var value = this.value.trim();
	    if (!value || value === this.defaultValue) {
	        return;
	    }
	    this.value = '';
	    return {
	        type: 'add',
	        title: value
	    };
	};

	exports.onAdd = onAdd;
	var onEdited = function onEdited() {
	    var todoElem = this.parentNode;
	    var label = _helper.find.call(todoElem, 'label');
	    var value = this.value.trim();
	    var id = todoElem.dataset['id'];
	    todoElem.classList.remove('editing');
	    if (!value) {
	        return {
	            type: 'remove',
	            id: id
	        };
	    } else if (value !== label.textContent) {
	        label.textContent = value;
	        return {
	            type: 'update',
	            id: id,
	            title: value
	        };
	    }
	};

	exports.onEdited = onEdited;
	var blur = function blur() {
	    this.onblur = null;
	    onEdited.call(this);
	};

	var onEditing = function onEditing() {
	    var root = this.parentNode.parentNode;
	    var edit = _helper.find.call(root, '.edit')[0];
	    root.classList.add('editing');
	    edit.value = this.textContent;
	    edit.onblur = blur;
	    edit.focus();
	};

	exports.onEditing = onEditing;
	var onToggle = function onToggle() {
	    var todoElem = this.parentNode.parentNode;
	    return {
	        type: 'toggle',
	        id: todoElem.dataset.id,
	        completed: this.checked
	    };
	};

	exports.onToggle = onToggle;
	var onRemove = function onRemove() {
	    var elem = this.parentNode.parentNode;
	    return {
	        type: 'remove',
	        id: elem.dataset.id
	    };
	};
	exports.onRemove = onRemove;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = __webpack_require__(5)['default'];

	var _classCallCheck = __webpack_require__(10)['default'];

	var _Object$assign = __webpack_require__(57)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _helper = __webpack_require__(11);

	var Model = (function () {
	    function Model(name) {
	        _classCallCheck(this, Model);

	        this.name = name;
	        this.todos = JSON.parse(localStorage.getItem(this.name) || '[]');
	    }

	    _createClass(Model, [{
	        key: 'save',
	        value: function save() {
	            localStorage.setItem(this.name, JSON.stringify(this.todos));
	        }
	    }, {
	        key: 'onAction',
	        value: function onAction(action) {
	            if (!_helper.isObject.call(action)) {
	                return;
	            }
	            var hasChange = true;
	            switch (action.type) {
	                case 'add':
	                    this.addTodo(action.title);
	                    break;
	                case 'remove':
	                    this.removeTodo(action.id);
	                    break;
	                case 'update':
	                    this.updateTodo({
	                        id: action.id,
	                        title: action.title
	                    });
	                    break;
	                case 'toggle':
	                    this.updateTodo({
	                        id: action.id,
	                        completed: action.completed
	                    });
	                    break;
	                case 'clear':
	                    this.clearCompleted();
	                    break;
	                case 'toggleAll':
	                    this.toggleAll(action.completed);
	                    break;
	                default:
	                    hasChange = false;
	            }
	            hasChange && this.save();
	        }
	    }, {
	        key: 'addTodo',
	        value: function addTodo(title) {
	            var now = new Date();
	            var todo = {
	                id: now.getTime(),
	                title: title,
	                time: now.toLocaleDateString(),
	                completed: false
	            };
	            this.todos.push(todo);
	            return todo;
	        }
	    }, {
	        key: 'find',
	        value: function find(query) {
	            var result = [];
	            this.todos.forEach(function (todo) {
	                if (todo[query.name] == query.value) {
	                    result.push(todo);
	                }
	            });
	            return result;
	        }
	    }, {
	        key: 'getTodo',
	        value: function getTodo(id) {
	            return this.find({
	                name: 'id',
	                value: id
	            })[0];
	        }
	    }, {
	        key: 'removeTodo',
	        value: function removeTodo(id) {
	            var index = this.todos.indexOf(this.getTodo(id));
	            if (index >= 0) {
	                this.todos.splice(index, 1);
	            }
	        }
	    }, {
	        key: 'updateTodo',
	        value: function updateTodo(newTodo) {
	            var todo = this.getTodo(newTodo.id);
	            if (todo) {
	                _Object$assign(todo, newTodo);
	                return todo;
	            }
	        }
	    }, {
	        key: 'clearCompleted',
	        value: function clearCompleted() {
	            var todos = this.todos;
	            if (todos.length === 0) {
	                return false;
	            }
	            for (var i = todos.length - 1; i >= 0; i--) {
	                var todo = todos[i];
	                if (todo.completed) {
	                    todos.splice(i, 1);
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'toggleAll',
	        value: function toggleAll(state) {
	            var todos = this.todos;
	            if (todos.length === 0) {
	                return false;
	            }
	            todos.forEach(function (todo) {
	                todo.completed = state;
	            });
	            return true;
	        }
	    }, {
	        key: 'getData',
	        value: function getData(activeFilter) {
	            var mapping = {
	                '/': 'todos',
	                '/active': 'actives',
	                '/completed': 'completeds'
	            };
	            return {
	                filters: activeFilter,
	                toggleAll: this.isAllCompleted,
	                clearCompleted: this.completeds.length,
	                todoCount: this.actives.length,
	                todoList: this[mapping[activeFilter]]
	            };
	        }
	    }, {
	        key: 'completeds',
	        get: function get() {
	            return this.find({
	                name: 'completed',
	                value: true
	            });
	        }
	    }, {
	        key: 'actives',
	        get: function get() {
	            return this.find({
	                name: 'completed',
	                value: false
	            });
	        }
	    }, {
	        key: 'isAllCompleted',
	        get: function get() {
	            var isAllCompleted = true;
	            var todos = this.todos;
	            if (todos.length === 0) {
	                return false;
	            }
	            for (var i = todos.length - 1; i >= 0; i--) {
	                if (!todos[i].completed) {
	                    isAllCompleted = false;
	                    break;
	                }
	            }
	            return isAllCompleted;
	        }
	    }]);

	    return Model;
	})();

	exports['default'] = Model;
	module.exports = exports['default'];

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	module.exports = __webpack_require__(8).core.Object.assign;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(25);
	$def($def.S, 'Object', {assign: __webpack_require__(60)});

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(8)
	  , enumKeys = __webpack_require__(61);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 62 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ }
/******/ ]);