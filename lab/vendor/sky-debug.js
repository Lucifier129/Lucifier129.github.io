//sky.js
;(function(global, undefined) {
//check type
var obj = {},
	toStr = obj.toString,
	isObject = function(obj) {
		return obj === null ? false : toStr.call(obj) === '[object Object]';
	},
	isFunction = function(obj) {
		return typeof obj === 'function';
	},
	isString = function(obj) {
		return typeof obj === 'string';
	},
	isArray = Array.isArray || function(obj) {
		return toStr.call(obj) === '[object Array]';
	},
	isNative = function(fn) {
		return /\[native code\]/.test('' + fn);
	};
//arr.js
var arr = [],
	push = arr.push;
//copy from jQuery
function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === "boolean") {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if (typeof target !== "object" && !isFunction(target)) {
		target = {};
	}

	for (; i < length; i++) {
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];

					} else {
						clone = src && isObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
}
//each
function each(object, callback) {
	var name, i = 0,
		length = object.length,
		isObj = length === undefined || isFunction(object);

	if (isObj) {
		for (name in object) {
			if (callback.call(object[name], name, object[name]) === false) {
				break;
			}
		}
	} else {
		for (; i < length;) {
			if (callback.call(object[i], i, object[i++]) === false) {
				break;
			}
		}
	}

	return object;
}
//observe.js
var doc = document,
	head = doc.head || doc.getElementsByTagName('head')[0],
	proto = {
		on: function(prop, callback) {
			var obj;
			if (isObject(prop)) {
				obj = prop;
				for (prop in obj) {
					if (!(prop in this)) {
						this[prop] = 1;
					}
					isFunction(obj[prop]) && defineProperty(this, prop, obj[prop]);
				}
			} else {
				defineProperty(this, prop, callback);
			}

			return this;
		}
	},
	defineProperty,
	createObj;

var def = {
    'defineProperty': isNative(Object.defineProperty) && isNative(Object.create) && Object.defineProperty,
    '__defineSetter__': isNative(Object.prototype.__defineSetter__) && Object.prototype.__defineSetter__,
    '__defineGetter__': isNative(Object.prototype.__defineGetter__) && Object.prototype.__defineGetter__
}

if (!def.defineProperty && def.__defineSetter__) {
    def.defineProperty = function(obj, propName, descriptor) {
        def.__defineGetter__.call(obj, propName, descriptor.get);
        def.__defineSetter__.call(obj, propName, descriptor.set);
    };
}

if (def.defineProperty) {
	defineProperty = function(obj, prop, callback) {
		var value = obj[prop];
		prop in obj && delete obj[prop];
		def.defineProperty(obj, prop, {
			set: function(v) {
				callback.call(this, prop, (value = v));
			},
			get: function() {
				return value;
			}
		});
	};
	createObj = function() {
		return Object.create(proto);
	};
} else if ('onpropertychange' in head) {
	defineProperty = function(elem, prop, callback) {
		var callbacks = elem.callbacks = elem.callbacks || {};
		callbacks[prop] = callback;
		if (!elem.onpropertychange) {
			elem.onpropertychange = function(e) {
				var prop = (e || window.event).propertyName;
				prop in callbacks && callbacks[prop].call(this, prop, this[prop]);
			};
		}
	};
	createObj = function() {
		var obj = head.appendChild(document.createComment('[objcet Object]'));
		obj.on = proto.on;
		return obj;
	};
}

function observe(obj) {
	return extend(createObj(), obj);
}
/*
 refer to sea.js
util-path.js - The utilities for operating path such as id, uri
*/

var DIRNAME_RE = /[^?#]*\//

var DOT_RE = /\/\.\//g
var DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//
var MULTI_SLASH_RE = /([^:/])\/+\//g

// Extract the directory portion of a path
// dirname("a/b/c.js?t=123#xx/zz") ==> "a/b/"
// ref: http://jsperf.com/regex-vs-split/2
function dirname(path) {
	return path.match(DIRNAME_RE)[0]
}

// Canonicalize a path
// realpath("http://test.com/a//./b/../c") ==> "http://test.com/a/c"
function realpath(path) {
	// /a/b/./c/./d ==> /a/b/c/d
	path = path.replace(DOT_RE, "/")

	/*
    @author wh1100717
    a//b/c ==> a/b/c
    a///b/////c ==> a/b/c
    DOUBLE_DOT_RE matches a/b/c//../d path correctly only if replace // with / first
  */
	path = path.replace(MULTI_SLASH_RE, "$1/")

	// a/b/c/../../d  ==>  a/b/../d  ==>  a/d
	while (path.match(DOUBLE_DOT_RE)) {
		path = path.replace(DOUBLE_DOT_RE, "/")
	}

	return path
}

// Normalize an id
// normalize("path/to/a") ==> "path/to/a.js"
// NOTICE: substring is faster than negative slice and RegExp
function normalize(path) {
	var last = path.length - 1
	var lastC = path.charCodeAt(last)

	// If the uri ends with `#`, just return it without '#'
	if (lastC === 35 /* "#" */ ) {
		return path.substring(0, last)
	}

	return (path.substring(last - 2) === ".js" ||
		path.indexOf("?") > 0 ||
		lastC === 47 /* "/" */ ) ? path : path + ".js"
}


var PATHS_RE = /^([^/:]+)(\/.+)$/
var VARS_RE = /{([^{]+)}/g

function parseAlias(id) {
	var alias = config.alias
	return alias && isString(alias[id]) ? alias[id] : id
}

function parsePaths(id) {
	var paths = config.paths
	var m

	if (paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]])) {
		id = paths[m[1]] + m[2]
	}

	return id
}

function parseVars(id) {
	var vars = config.vars

	if (vars && id.indexOf("{") > -1) {
		id = id.replace(VARS_RE, function(m, key) {
			return isString(vars[key]) ? vars[key] : m
		})
	}

	return id
}

function parseMap(uri) {
	var map = config.map
	var ret = uri

	if (map) {
		for (var i = 0, len = map.length; i < len; i++) {
			var rule = map[i]

			ret = isFunction(rule) ?
				(rule(uri) || uri) :
				uri.replace(rule[0], rule[1])

			// Only apply the first matched rule
			if (ret !== uri) break
		}
	}

	return ret
}


var ABSOLUTE_RE = /^\/\/.|:\//
var ROOT_DIR_RE = /^.*?\/\/.*?\//

function addBase(id, refUri) {
	var ret
	var first = id.charCodeAt(0)

	// Absolute
	if (ABSOLUTE_RE.test(id)) {
		ret = id
	}
	// Relative
	else if (first === 46 /* "." */ ) {
		ret = (refUri ? dirname(refUri) : config.cwd) + id
	}
	// Root
	else if (first === 47 /* "/" */ ) {
		var m = config.cwd.match(ROOT_DIR_RE)
		ret = m ? m[0] + id.substring(1) : id
	}
	// Top-level
	else {
		ret = config.base + id
	}

	// Add default protocol when uri begins with "//"
	if (ret.indexOf("//") === 0) {
		ret = location.protocol + ret
	}

	return realpath(ret)
}

function id2Uri(id, refUri) {
	if (!id) return ""

	id = parseAlias(id)
	id = parsePaths(id)
	id = parseAlias(id)
	id = parseVars(id)
	id = parseAlias(id)
	id = normalize(id)
	id = parseAlias(id)

	var uri = addBase(id, refUri)
	uri = parseAlias(uri)
	uri = parseMap(uri)

	return uri
}

// Check environment
var isWebWorker = typeof window === 'undefined' && typeof importScripts !== 'undefined' && isFunction(importScripts);

// Ignore about:xxx and blob:xxx
var IGNORE_LOCATION_RE = /^(about|blob):/;
var loaderDir;
// Sea.js's full path
var loaderPath;
// Location is read-only from web worker, should be ok though
var cwd = (!global.location.href || IGNORE_LOCATION_RE.test(global.location.href)) ? '' : dirname(global.location.href);

if (isWebWorker) {
	// Web worker doesn't create DOM object when loading scripts
	// Get sea.js's path by stack trace.
	var stack;
	try {
		var up = new Error();
		throw up;
	} catch (e) {
		// IE won't set Error.stack until thrown
		stack = e.stack.split('\n');
	}
	// First line is 'Error'
	stack.shift();

	var m;
	// Try match `url:row:col` from stack trace line. Known formats:
	// Chrome:  '    at http://localhost:8000/script/sea-worker-debug.js:294:25'
	// FireFox: '@http://localhost:8000/script/sea-worker-debug.js:1082:1'
	// IE11:    '   at Anonymous function (http://localhost:8000/script/sea-worker-debug.js:295:5)'
	// Don't care about older browsers since web worker is an HTML5 feature
	var TRACE_RE = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i
		// Try match `url` (Note: in IE there will be a tailing ')')
	var URL_RE = /(.*?):\d+:\d+\)?$/;
	// Find url of from stack trace.
	// Cannot simply read the first one because sometimes we will get:
	// Error
	//  at Error (native) <- Here's your problem
	//  at http://localhost:8000/_site/dist/sea.js:2:4334 <- What we want
	//  at http://localhost:8000/_site/dist/sea.js:2:8386
	//  at http://localhost:8000/_site/tests/specs/web-worker/worker.js:3:1
	while (stack.length > 0) {
		var top = stack.shift();
		m = TRACE_RE.exec(top);
		if (m != null) {
			break;
		}
	}
	var url;
	if (m != null) {
		// Remove line number and column number
		// No need to check, can't be wrong at this point
		var url = URL_RE.exec(m[1])[1];
	}
	// Set
	loaderPath = url
	// Set loaderDir
	loaderDir = dirname(url || cwd);
	// This happens with inline worker.
	// When entrance script's location.href is a blob url,
	// cwd will not be available.
	// Fall back to loaderDir.
	if (cwd === '') {
		cwd = loaderDir;
	}
} else {
	var scripts = doc.scripts
	var loaderScript = scripts[scripts.length - 1]

	function getScriptAbsoluteSrc(node) {
		return node.hasAttribute ? // non-IE6/7
			node.src :
			// see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
			node.getAttribute("src", 4)
	}
	loaderPath = getScriptAbsoluteSrc(loaderScript)
	// When `sea.js` is inline, set loaderDir to current working directory
	loaderDir = dirname(loaderPath || cwd)
}
//addScript

var oncompleted = {};

if ('onload' in doc.createElement('script')) {
	oncompleted.type = 'onload';
	oncompleted.handler = function() {
		this.callback();
		(config.debug ? this : head.removeChild(this)).onload = this.onerror = this.callback = null;
	};
} else {
	oncompleted.type = 'onreadystatechange';
	oncompleted.ready = /complete|loaded/;
	oncompleted.handler = function() {
		if (oncompleted.ready.test(this.readyState)) {
			this.callback();
			(config.debug ? this : head.removeChild(this)).onreadystatechange = this.onerror = this.callback = null;

		}
	};
}

oncompleted.onerror = function() {
	throw ('module unfound!');
}

function addScript(src, callback, charset) {
	var script = doc.createElement('script');
	script.charset = isFunction(charset) ? charset(src) : charset;
	script.callback = callback;
	script[oncompleted.type] = oncompleted.handler;
	script.onerror = oncompleted.onerror;
	script.async = true;
	script.src = src;
	head.appendChild(script);
}
//module.js
var module = observe({}),
	urlList = module.list = [],
	modules = module.cache = {},
	data = module.data = {},
	config = data.config = {},
	userTasks = module.userTasks = {},
	depsList = module.depsList = {},
	urlCache = module.urlCache = {};

module.loaded = true;
module.loader = loaderPath;
module.matchUri = id2Uri;
module.extend = extend;
module.each = each;
module.observe = observe;
module.use = function(id, callback) {
	if (!callback || !isFunction(callback)) {
		return modules[this.matchUri(id)].exports;
	}
	module.imports = [id, callback];
	return this;
};

config.charset = 'utf-8';
config.debug = false;
config.loader = loaderPath;
config.base = loaderDir;
config.cwd = cwd;


var loaded = true,
	storage;

function nextTick(fn) {
	setTimeout(fn, 4);
}

function pushTask(id, task) {
	(userTasks[id] = userTasks[id] || []).push(task);
}

function getCurrentScript() {
	//refer to avalon.js
	var loadScript, nodes, node, stack, src, i;
	if (loadScript = doc.currentScript) {
		return loadScript.src;
	}
	try {
		a.b.c();
	} catch (e) {
		stack = e.stack;
		if (!stack && window.opera) {
			stack = (String(e).match(/of linked script \S+/g) || []).join(" ");
		}
	}
	if (stack) {
		stack = stack.split(/[@ ]/g).pop();
		stack = stack[0] === "(" ? stack.slice(1, -1) : stack.replace(/\s/, "");
		stack = stack.replace(/(:\d+)?:\d+$/i, "");
		//In ie11's emulation, ie10's stack sometimes not match.
		if (stack !== module.loader) {
			return stack;
		}
	}

	nodes = (loaded ? doc : head).getElementsByTagName('script');

	for (i = nodes.length - 1; i >= 0; i--) {
		node = nodes[i];
		src = node.hasAttribute ? // non-IE6/7
		node.src :
		// see http://msdn.microsoft.com/en-us/library/ms536429(VS.85).aspx
		node.getAttribute('src', 4);
		if (node.readyState === 'interactive') {
			return src;
		} else if (!loadScript && src && src !== module.loader) {
			loadScript = src;
		}
	}
	return loadScript;
}


module.on({
	config: function(key, value) {
		value = isFunction(value) ? value() : value;
		if (!isObject(value)) {
			return;
		}
		extend(true, config, value);
		if ('preload' in value) {
			value = value.preload;
			if (isArray(value)) {
				push.apply(urlList, each(value, function(i, id) {
					value[i] = id2Uri(id);
				}));
			} else if (isString(value)) {
				urlList.push(id2Uri(value));
			}
			loaded && loadModule();
		}
	},
	imports: function(key, value) {
		var task, mods;

		switch (true) {
			case isObject(value):
				if (!('id' in value)) return;
				value = extend(true, {}, value);
				value.id = toArr(value.id);
				task = value;
				break;
			case isArray(value):
				if (!value[0]) return;
				value = value.concat();
				callback = value[1];
				task = {
					id: toArr(value[0])
				};
				callback && isFunction(callback) && (task.callback = callback);
				break;
			default:
				return;
		}

		mods = [];

		each(task.id, function(i, id) {
			var exp;
			task.id[i] = id = id2Uri(id);
			if (id in modules) {
				if ('exports' in (exp = modules[id])) {
					mods.push(exp.exports);
				} else {
					pushTask(id, task);
				}
			} else {
				urlList.push(id);
				task && pushTask(id, task);
			}
		});

		task.status = mods.length;
		mods.length === task.id.length && task.callback ?
			task.callback.apply(global, mods) :
			loaded && loadModule();
	},
	exports: function(key, value) {
		if (!storage) {
			var url = getCurrentScript();
			modules[url] = storage = {
				id: url,
				deps: [],
				loaded: [],
				cache: [],
				factory: function() {
					var mod = modules[url], exports;
					if ('exports' in mod) {
						return mod.exports;
					}
					exports = modules[url].cache;
					each(exports, function(i, obj) {
						isObject(obj) && 'exports' in obj && (exports[i] = obj.exports);
					});
					return exports.length === 1 ? exports[0] : exports;
				}
			};
			nextTick(checkStorage);
		}

		if (!isObject(value)) {
			value = {
				exports: isFunction(value) ? value() : value
			};
		} else if (!('factory' in value)) {
			value = 'exports' in value ? value : {
				exports: value
			};
		}

		if ('id' in value) {
			modules[value.id = id2Uri(value.id)] = value;
		} else {
			value.id = storage.id + '-' + storage.cache.length;
		}

		if ('deps' in value && value.deps.length) {
			(depsList[value.id] = depsList[value.id] || []).push(storage);
			storage.deps.push(value);
		} else {
			storage.loaded.push(value);
		}
		storage.cache.push(value);
	}
});

function getModuleFile(url) {
	url = id2Uri(url);
	if (url in urlCache) {
		loadModule();
	} else {
		urlCache[url] = true;
		loaded = false;
		addScript(url, loadModule, config.charset);
	}
}

function loadModule() {
	loaded = true;
	if (!storage && urlList.length) {
		getModuleFile(urlList.shift());
	}
}

function loadExports(obj) {
	var mods = [];
	each(obj.deps, function() {
		var exp = modules[this].exports;
		if (isArray(exp) && exp.length === 1 && this in urlCache) {
			return mods.push(exp[0]);
		}
		mods.push(exp);
	});

	obj.exports = obj.factory.apply(global, mods);
	if ('id' in obj) {
		checkId(obj.id);
	}
}

function checkId(id) {
	if (id in userTasks) {
		each(userTasks[id], checkTaskStatus);
		delete userTasks[id];
	}

	if (id in depsList) {
		each(depsList[id], checkModuleStatus);
		delete depsList[id];
	}
}

function checkTaskStatus() {
	(this.status += 1) === this.id.length && runTask(this);
}

function checkModuleStatus() {
	if ((this.status += 1) === this.deps.length || ('cache' in this && this.status === this.cache.length)) {
		loadExports(this);
	}
}

function checkDeps(i, obj) {
	var mods = [];
	storage.deps[i] = obj.id;
	obj.status = 0;
	each(obj.deps, function(i, id) {
		var mod;
		obj.deps[i] = id = id2Uri(id);
		if (obj.id === id || !(id in modules)) {
			(depsList[id] = depsList[id] || []).push(obj);
			urlList.push(id);
			return;
		}
		mod = modules[id];
		if (mod && 'exports' in mod) {
			mods.push(mod.exports);
			obj.status += 1;
		} else {
			(depsList[id] = depsList[id] || []).push(obj);
		}
	});

	if (obj.status === obj.deps.length) {
		obj.exports = obj.factory.apply(global, mods);
		checkId(obj.id);
	}
}

function checkLoaded(i, exp) {
	if (!('exports' in exp) && 'factory' in exp) {
		exp.exports = exp.factory();
	}
	checkId(exp.id);
}

function checkStorage() {
	storage.status = storage.loaded.length;
	each(storage.deps, checkDeps);
	each(storage.loaded, checkLoaded);
	storage.status === storage.cache.length && loadExports(storage);
	storage = null;
	loadModule();
}

function runTask(task) {
	var mods = [];
	each(task.id, function(i, id) {
		var mod = modules[id = id2Uri(id)].exports;
		if (isArray(mod) && mod.length === 1 && id in urlCache) {
			mods.push(mod[0]);
		} else {
			mods.push(mod);
		}
	});
	task.callback.apply(global, mods);
}


function toArr(arg) {
	return isArray(arg) ? arg.concat() : [arg];
}
//output

global.module = module;
global.exports = module.cache;

global.define = module.define = function(id, deps, factory) {
	var exports,
		argsLen = arguments.length;

	// define(factory)
	if (argsLen === 1) {
		factory = id
		id = undefined
	} else if (argsLen === 2) {
		factory = deps

		// define(deps, factory)
		if (isArray(id)) {
			deps = id
			id = undefined
		}
		// define(id, factory)
		else {
			deps = undefined
		}
	}

	if (isFunction(factory) &&  /require\(|\(require/.test(factory.toString())) {
		factory = (function(factory) {
			return function() {
				var args = arguments,
					mod = {
						require: {},
						exports: {}
					}
				each(deps, function(i, v) {
					mod.require[v] = args[i]
				})

				function require(key) {
					return mod.require[id2Uri(key)]
				}
				return factory(require, mod.exports, mod) || mod.exports
			}
		}(factory))
	}

	if (typeof factory !== 'function') {
		return module.exports = factory;
	}

	exports = {};
	id && (exports.id = id);
	deps && (exports.deps = deps);
	factory && (exports.factory = factory);
	module.exports = exports;
};

global.define.amd = {
	jQuery: true
};

}(this));