/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/demos/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Demo = __webpack_require__(23);
	
	var _Demo2 = _interopRequireDefault(_Demo);
	
	_react2['default'].render(_react2['default'].createElement(_Demo2['default'], null), document.querySelector('#content'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	 * react-lite.js v0.15.2
	 * (c) 2016 Jade Gu
	 * Released under the MIT License.
	 */
	'use strict';
	
	var TRUE = true;
	var xlink = 'http://www.w3.org/1999/xlink';
	var xml = 'http://www.w3.org/XML/1998/namespace';
	
	var SVGNamespaceURI = 'http://www.w3.org/2000/svg';
	var COMPONENT_ID = 'liteid';
	
	var VELEMENT = 2;
	var VSTATELESS = 3;
	var VCOMPONENT = 4;
	var VCOMMENT = 5;
	
	var propAlias = {
		// svg attributes alias
		clipPath: 'clip-path',
		fillOpacity: 'fill-opacity',
		fontFamily: 'font-family',
		fontSize: 'font-size',
		markerEnd: 'marker-end',
		markerMid: 'marker-mid',
		markerStart: 'marker-start',
		stopColor: 'stop-color',
		stopOpacity: 'stop-opacity',
		strokeDasharray: 'stroke-dasharray',
		strokeLinecap: 'stroke-linecap',
		strokeOpacity: 'stroke-opacity',
		strokeWidth: 'stroke-width',
		textAnchor: 'text-anchor',
		xlinkActuate: 'xlink:actuate',
		xlinkArcrole: 'xlink:arcrole',
		xlinkHref: 'xlink:href',
		xlinkRole: 'xlink:role',
		xlinkShow: 'xlink:show',
		xlinkTitle: 'xlink:title',
		xlinkType: 'xlink:type',
		xmlBase: 'xml:base',
		xmlLang: 'xml:lang',
		xmlSpace: 'xml:space',
		// DOM attributes alias
		acceptCharset: 'accept-charset',
		className: 'class',
		htmlFor: 'for',
		httpEquiv: 'http-equiv',
		// DOM property alias
		autoCompconste: 'autocompconste',
		autoFocus: 'autofocus',
		autoPlay: 'autoplay',
		autoSave: 'autosave',
		hrefLang: 'hreflang',
		radioGroup: 'radiogroup',
		spellCheck: 'spellcheck',
		srcDoc: 'srcdoc',
		srcSet: 'srcset'
	};
	
	var attributesNS = {
		xlinkActuate: xlink,
		xlinkArcrole: xlink,
		xlinkHref: xlink,
		xlinkRole: xlink,
		xlinkShow: xlink,
		xlinkTitle: xlink,
		xlinkType: xlink,
		xmlBase: xml,
		xmlLang: xml,
		xmlSpace: xml
	};
	
	// those key must use be attributes
	var attrbutesConfigs = {
		children: TRUE,
		type: TRUE,
		clipPath: TRUE,
		cx: TRUE,
		cy: TRUE,
		d: TRUE,
		dx: TRUE,
		dy: TRUE,
		fill: TRUE,
		fillOpacity: TRUE,
		fontFamily: TRUE,
		fontSize: TRUE,
		fx: TRUE,
		fy: TRUE,
		gradientTransform: TRUE,
		gradientUnits: TRUE,
		markerEnd: TRUE,
		markerMid: TRUE,
		markerStart: TRUE,
		offset: TRUE,
		opacity: TRUE,
		patternContentUnits: TRUE,
		patternUnits: TRUE,
		points: TRUE,
		preserveAspectRatio: TRUE,
		r: TRUE,
		rx: TRUE,
		ry: TRUE,
		spreadMethod: TRUE,
		stopColor: TRUE,
		stopOpacity: TRUE,
		stroke: TRUE,
		strokeDasharray: TRUE,
		strokeLinecap: TRUE,
		strokeOpacity: TRUE,
		strokeWidth: TRUE,
		textAnchor: TRUE,
		transform: TRUE,
		version: TRUE,
		viewBox: TRUE,
		x1: TRUE,
		x2: TRUE,
		x: TRUE,
		xlinkActuate: TRUE,
		xlinkArcrole: TRUE,
		xlinkHref: TRUE,
		xlinkRole: TRUE,
		xlinkShow: TRUE,
		xlinkTitle: TRUE,
		xlinkType: TRUE,
		xmlBase: TRUE,
		xmlLang: TRUE,
		xmlSpace: TRUE,
		y1: TRUE,
		y2: TRUE,
		y: TRUE,
	
		/**
	  * Standard Properties
	  */
		allowFullScreen: TRUE,
		allowTransparency: TRUE,
		// capture: TRUE,
		charSet: TRUE,
		challenge: TRUE,
		classID: TRUE,
		cols: TRUE,
		contextMenu: TRUE,
		dateTime: TRUE,
		// disabled: TRUE,
		form: TRUE,
		formAction: TRUE,
		formEncType: TRUE,
		formMethod: TRUE,
		formTarget: TRUE,
		frameBorder: TRUE,
		height: TRUE,
		// hidden: TRUE,
		inputMode: TRUE,
		is: TRUE,
		keyParams: TRUE,
		keyType: TRUE,
		list: TRUE,
		manifest: TRUE,
		maxLength: TRUE,
		media: TRUE,
		minLength: TRUE,
		nonce: TRUE,
		role: TRUE,
		rows: TRUE,
		// seamless: TRUE,
		size: TRUE,
		sizes: TRUE,
		srcSet: TRUE,
		width: TRUE,
		wmode: TRUE,
		/**
	  * RDFa Properties
	  */
		about: TRUE,
		datatype: TRUE,
		inlist: TRUE,
		prefix: TRUE,
		// property is also supported for OpenGraph in meta tags.
		property: TRUE,
		resource: TRUE,
		'typeof': TRUE,
		vocab: TRUE,
		/**
	  * Non-standard Properties
	  */
		// autoCapitalize and autoCorrect are supported in Mobile Safari for
		// keyboard hints.
		autoCapitalize: TRUE,
		autoCorrect: TRUE,
		// itemProp, itemScope, itemType are for
		// Microdata support. See http://schema.org/docs/gs.html
		itemProp: TRUE,
		// itemScope: TRUE,
		itemType: TRUE,
		// itemID and itemRef are for Microdata support as well but
		// only specified in the the WHATWG spec document. See
		// https://html.spec.whatwg.org/multipage/microdata.html#microdata-dom-api
		itemID: TRUE,
		itemRef: TRUE,
		// IE-only attribute that specifies security restrictions on an iframe
		// as an alternative to the sandbox attribute on IE<10
		security: TRUE,
		// IE-only attribute that controls focus behavior
		unselectable: TRUE
	};
	
	var readOnlyProps = {
		nodeName: TRUE,
		nodeValue: TRUE,
		nodeType: TRUE,
		parentNode: TRUE,
		childNodes: TRUE,
		classList: TRUE,
		firstChild: TRUE,
		lastChild: TRUE,
		previousSibling: TRUE,
		previousElementSibling: TRUE,
		nextSibling: TRUE,
		nextElementSibling: TRUE,
		attributes: TRUE,
		ownerDocument: TRUE,
		namespaceURI: TRUE,
		localName: TRUE,
		baseURI: TRUE,
		prefix: TRUE,
		length: TRUE,
		specified: TRUE,
		tagName: TRUE,
		offsetTop: TRUE,
		offsetLeft: TRUE,
		offsetWidth: TRUE,
		offsetHeight: TRUE,
		offsetParent: TRUE,
		scrollWidth: TRUE,
		scrollHeight: TRUE,
		clientTop: TRUE,
		clientLeft: TRUE,
		clientWidth: TRUE,
		clientHeight: TRUE,
		x: TRUE,
		y: TRUE
	};
	
	var isUnitlessNumber = {
		animationIterationCount: TRUE,
		boxFlex: TRUE,
		boxFlexGroup: TRUE,
		boxOrdinalGroup: TRUE,
		columnCount: TRUE,
		flex: TRUE,
		flexGrow: TRUE,
		flexPositive: TRUE,
		flexShrink: TRUE,
		flexNegative: TRUE,
		flexOrder: TRUE,
		fontWeight: TRUE,
		lineClamp: TRUE,
		lineHeight: TRUE,
		opacity: TRUE,
		order: TRUE,
		orphans: TRUE,
		tabSize: TRUE,
		widows: TRUE,
		zIndex: TRUE,
		zoom: TRUE,
	
		// SVG-related properties
		fillOpacity: TRUE,
		stopOpacity: TRUE,
		strokeDashoffset: TRUE,
		strokeOpacity: TRUE,
		strokeWidth: TRUE
	};
	
	// use dom prop to compare new prop
	var shouldUseDOMProp = {
		value: TRUE,
		checked: TRUE
	};
	
	var eventNameAlias = {
		onDoubleClick: 'ondblclick'
	};
	
	var notBubbleEvents = {
		onmouseleave: TRUE,
		onmouseenter: TRUE,
		onload: TRUE,
		onunload: TRUE,
		onscroll: TRUE,
		onfocus: TRUE,
		onblur: TRUE,
		onrowexit: TRUE,
		onbeforeunload: TRUE,
		onstop: TRUE,
		ondragdrop: TRUE,
		ondragenter: TRUE,
		ondragexit: TRUE,
		ondraggesture: TRUE,
		ondragover: TRUE,
		oncontextmenu: TRUE
	};
	
	var isStr = function isStr(obj) {
		return typeof obj === 'string';
	};
	var isFn = function isFn(obj) {
		return typeof obj === 'function';
	};
	var isBln = function isBln(obj) {
		return typeof obj === 'boolean';
	};
	var isArr = Array.isArray;
	
	var noop = function noop() {};
	var identity = function identity(obj) {
		return obj;
	};
	
	var pipe = function pipe(fn1, fn2) {
		return function () {
			fn1.apply(this, arguments);
			return fn2.apply(this, arguments);
		};
	};
	
	var flattenChildren = function flattenChildren(list, iteratee, a, b) {
		var len = list.length;
		var i = -1;
	
		while (len--) {
			var item = list[++i];
			if (isArr(item)) {
				flattenChildren(item, iteratee, a, b);
			} else {
				iteratee(item, a, b);
			}
		}
	};
	
	var eachItem = function eachItem(list, iteratee) {
		for (var i = 0, len = list.length; i < len; i++) {
			iteratee(list[i], i);
		}
	};
	
	var mapValue = function mapValue(obj, iteratee) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				iteratee(obj[key], key);
			}
		}
	};
	
	var mapKey = function mapKey(oldObj, newObj, iteratee) {
		var keyMap = {};
		for (var key in oldObj) {
			if (oldObj.hasOwnProperty(key)) {
				keyMap[key] = true;
				iteratee(key);
			}
		}
		for (var key in newObj) {
			if (newObj.hasOwnProperty(key) && keyMap[key] !== true) {
				iteratee(key);
			}
		}
	};
	
	function extend(to, from) {
		if (!from) {
			return to;
		}
		var keys = Object.keys(from);
		var i = keys.length;
		while (i--) {
			if (from[keys[i]] !== undefined) {
				to[keys[i]] = from[keys[i]];
			}
		}
		return to;
	}
	
	var uid = 0;
	var getUid = function getUid() {
		return ++uid;
	};
	
	var EVENT_KEYS = /^on/i;
	var isInnerHTMLKey = function isInnerHTMLKey(key) {
		return key === 'dangerouslySetInnerHTML';
	};
	var isStyleKey = function isStyleKey(key) {
		return key === 'style';
	};
	
	var setProp = function setProp(elem, key, value) {
	
		if (key === 'children') {
			return;
		}
	
		var originalKey = key;
		key = propAlias[key] || key;
	
		if (EVENT_KEYS.test(key)) {
			addEvent(elem, key, value);
		} else if (isStyleKey(key)) {
			setStyle(elem, value);
		} else if (isInnerHTMLKey(key)) {
			value && value.__html != null && (elem.innerHTML = value.__html);
		} else if (key in elem && attrbutesConfigs[originalKey] !== true) {
			if (readOnlyProps[key] !== true) {
				if (key === 'title' && value == null) {
					value = '';
				}
				elem[key] = value;
			}
		} else {
			if (value == null) {
				elem.removeAttribute(key);
			} else if (attributesNS.hasOwnProperty(originalKey)) {
				elem.setAttributeNS(attributesNS[originalKey], key, value);
			} else {
				elem.setAttribute(key, value);
			}
		}
	};
	var setProps = function setProps(elem, props) {
		for (var key in props) {
			if (props.hasOwnProperty(key)) {
				setProp(elem, key, props[key]);
			}
		}
	};
	
	var removeProp = function removeProp(elem, key, oldValue) {
		if (key === 'children') {
			return;
		}
	
		key = propAlias[key] || key;
	
		if (EVENT_KEYS.test(key)) {
			removeEvent(elem, key);
		} else if (isStyleKey(key)) {
			removeStyle(elem, oldValue);
		} else if (isInnerHTMLKey(key)) {
			elem.innerHTML = '';
		} else if (!(key in elem) || attrbutesConfigs[key] === true) {
			elem.removeAttribute(key);
		} else if (isFn(oldValue)) {
			elem[key] = null;
		} else if (isStr(oldValue)) {
			elem[key] = '';
		} else if (isBln(oldValue)) {
			elem[key] = false;
		} else {
			try {
				delete elem[key];
			} catch (e) {
				//pass
			}
		}
	};
	
	var $props = null;
	var $newProps = null;
	var $elem = null;
	var $patchProps = function $patchProps(key) {
		if (key === 'children') {
			return;
		}
		var value = $newProps[key];
		var oldValue = shouldUseDOMProp[key] == true ? $elem[key] : $props[key];
		if (value === oldValue) {
			return;
		}
		if (value === undefined) {
			removeProp($elem, key, oldValue);
			return;
		}
		if (isStyleKey(key)) {
			patchStyle($elem, oldValue, value);
		} else if (isInnerHTMLKey(key)) {
			var oldHtml = oldValue && oldValue.__html;
			var html = value && value.__html;
			if (html != null && html !== oldHtml) {
				$elem.innerHTML = html;
			}
		} else {
			setProp($elem, key, value);
		}
	};
	
	var patchProps = function patchProps(elem, props, newProps) {
		$elem = elem;
		$props = props;
		$newProps = newProps;
		mapKey(props, newProps, $patchProps);
		$elem = $props = $newProps = null;
	};
	
	var removeStyle = function removeStyle(elem, style) {
		if (!style) {
			return;
		}
		var elemStyle = elem.style;
		for (var key in style) {
			if (style.hasOwnProperty(key)) {
				elemStyle[key] = '';
			}
		}
	};
	var setStyle = function setStyle(elem, style) {
		if (!style) {
			return;
		}
		var elemStyle = elem.style;
		for (var key in style) {
			if (style.hasOwnProperty(key)) {
				setStyleValue(elemStyle, key, style[key]);
			}
		}
	};
	
	var $elemStyle = null;
	var $style = null;
	var $newStyle = null;
	var $patchStyle = function $patchStyle(key) {
		var value = $newStyle[key];
		var oldValue = $style[key];
		if (value !== oldValue) {
			setStyleValue($elemStyle, key, value);
		}
	};
	
	var patchStyle = function patchStyle(elem, style, newStyle) {
		if (style === newStyle) {
			return;
		}
		if (!newStyle && style) {
			removeStyle(elem, style);
		} else if (newStyle && !style) {
			setStyle(elem, newStyle);
		} else {
			$elemStyle = elem.style;
			$style = style;
			$newStyle = newStyle;
			mapKey(style, newStyle, $patchStyle);
			$elemStyle = $style = $newStyle = null;
		}
	};
	
	var isUnitlessNumberWithPrefix = {};
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];
	var prefixKey = function prefixKey(prefix, key) {
		return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	};
	mapValue(isUnitlessNumber, function (_, prop) {
		eachItem(prefixes, function (prefix) {
			return isUnitlessNumberWithPrefix[prefixKey(prefix, prop)] = true;
		});
	});
	mapValue(isUnitlessNumberWithPrefix, function (value, key) {
		isUnitlessNumber[key] = value;
	});
	
	var RE_NUMBER = /^-?\d+(\.\d+)?$/;
	var setStyleValue = function setStyleValue(style, key, value) {
		if (!isUnitlessNumber[key] && RE_NUMBER.test(value)) {
			style[key] = value + 'px';
		} else {
			key = key === 'float' ? 'cssFloat' : key;
			value = value == null || isBln(value) ? '' : value;
			style[key] = value;
		}
	};
	
	if (!Object.freeze) {
		Object.freeze = identity;
	}
	
	var noop$1 = noop;
	var refs = null;
	
	var createVelem = function createVelem(type, props) {
		return {
			vtype: VELEMENT,
			type: type,
			props: props,
			refs: refs
		};
	};
	
	var createVstateless = function createVstateless(type, props) {
		return {
			vtype: VSTATELESS,
			id: getUid(),
			type: type,
			props: props
		};
	};
	
	var createVcomponent = function createVcomponent(type, props) {
		return {
			vtype: VCOMPONENT,
			id: getUid(),
			type: type,
			props: props,
			refs: refs
		};
	};
	
	var createVcomment = function createVcomment(comment) {
		return {
			vtype: VCOMMENT,
			comment: comment
		};
	};
	
	var initVnode = function initVnode(vnode, parentContext, namespaceURI) {
		var vtype = vnode.vtype;
	
		var node = null;
		if (!vtype) {
			node = document.createTextNode(vnode);
		} else if (vtype === VELEMENT) {
			node = initVelem(vnode, parentContext, namespaceURI);
		} else if (vtype === VCOMPONENT) {
			node = initVcomponent(vnode, parentContext, namespaceURI);
		} else if (vtype === VSTATELESS) {
			node = initVstateless(vnode, parentContext, namespaceURI);
		} else if (vtype === VCOMMENT) {
			node = document.createComment(vnode.comment);
		}
		return node;
	};
	
	var updateVnode = function updateVnode(vnode, newVnode, node, parentContext) {
		var newNode = node;
		var vtype = vnode.vtype;
	
		if (vtype === VELEMENT) {
			newNode = updateVelem(vnode, newVnode, node, parentContext);
		} else if (vtype === VCOMPONENT) {
			newNode = updateVcomponent(vnode, newVnode, node, parentContext);
		} else if (vtype === VSTATELESS) {
			newNode = updateVstateless(vnode, newVnode, node, parentContext);
		}
	
		return newNode;
	};
	
	var destroyVnode = function destroyVnode(vnode, node) {
		var vtype = vnode.vtype;
	
		if (vtype === VELEMENT) {
			destroyVelem(vnode, node);
		} else if (vtype === VCOMPONENT) {
			destroyVcomponent(vnode, node);
		} else if (vtype === VSTATELESS) {
			destroyVstateless(vnode, node);
		}
	};
	
	var initVelem = function initVelem(velem, parentContext, namespaceURI) {
		var type = velem.type;
		var props = velem.props;
	
		var node = null;
	
		if (type === 'svg' || namespaceURI === SVGNamespaceURI) {
			node = document.createElementNS(SVGNamespaceURI, type);
			namespaceURI = SVGNamespaceURI;
		} else {
			node = document.createElement(type);
		}
	
		initChildren(node, props.children, parentContext);
		setProps(node, props);
	
		if (velem.ref !== null) {
			attachRef(velem.refs, velem.ref, node);
		}
	
		return node;
	};
	
	var initChildren = function initChildren(node, children, parentContext) {
		node.vchildren = [];
		if (isArr(children)) {
			flattenChildren(children, collectVchild, node, parentContext);
		} else {
			collectVchild(children, node, parentContext);
		}
	};
	
	var updateChildren = function updateChildren(node, newChildren, parentContext) {
		var vchildren = node.vchildren;
		var childNodes = node.childNodes;
		var namespaceURI = node.namespaceURI;
	
		var newVchildren = node.vchildren = [];
		if (isArr(newChildren)) {
			flattenChildren(newChildren, collectNewVchild, newVchildren, vchildren);
		} else {
			collectNewVchild(newChildren, newVchildren, vchildren);
		}
	
		for (var i = 0, len = newVchildren.length; i < len; i++) {
			var newItem = newVchildren[i];
			var newVnode = newItem.vnode;
			var oldItem = newItem.prev;
			var newChildNode = null;
			if (oldItem) {
				newChildNode = oldItem.node;
				newItem.prev = null;
				if (oldItem.index !== newItem.index) {
					attachNode(node, newChildNode, childNodes[newItem.index], vchildren);
				}
				if (newVnode !== oldItem.vnode) {
					if (!newVnode.vtype) {
						// textNode
						newChildNode.nodeValue = newVnode;
					} else {
						newChildNode = updateVnode(oldItem.vnode, newVnode, newChildNode, parentContext);
					}
				}
			} else {
				newChildNode = initVnode(newVnode, parentContext, namespaceURI);
				attachNode(node, newChildNode, childNodes[newItem.index], vchildren);
			}
			newItem.node = newChildNode;
		}
	
		for (var i = 0, len = vchildren.length; i < len; i++) {
			var item = vchildren[i];
			destroyVnode(item.vnode, item.node);
			node.removeChild(item.node);
		}
	};
	
	var attachNode = function attachNode(node, newNode, existNode, vchildren) {
		if (!existNode) {
			node.appendChild(newNode);
		} else if (existNode !== newNode) {
			for (var i = 0, len = vchildren.length; i < len; i++) {
				var item = vchildren[i];
				if (item.node === existNode) {
					vchildren.splice(i, 1);
					destroyVnode(item.vnode, item.node);
					node.replaceChild(newNode, existNode);
					return;
				}
			}
			node.insertBefore(newNode, existNode);
		}
	};
	
	var collectVchild = function collectVchild(vchild, node, parentContext) {
		if (vchild == null || isBln(vchild)) {
			return false;
		}
		vchild = vchild.vtype ? vchild : '' + vchild;
	
		var childNode = initVnode(vchild, parentContext, node.namespaceURI);
		node.appendChild(childNode);
		node.vchildren.push({
			vnode: vchild,
			node: childNode,
			index: node.vchildren.length
		});
	};
	
	var collectNewVchild = function collectNewVchild(newVchild, newVchildren, vchildren) {
		if (newVchild == null || isBln(newVchild)) {
			return false;
		}
	
		var oldItem = null;
		newVchild = newVchild.vtype ? newVchild : '' + newVchild;
	
		var _newVchild = newVchild;
		var refs = _newVchild.refs;
		var type = _newVchild.type;
		var key = _newVchild.key;
	
		for (var i = 0, len = vchildren.length; i < len; i++) {
			var item = vchildren[i];
			var vnode = item.vnode;
			if (vnode === newVchild || vnode.refs === refs && vnode.type === type && vnode.key === key) {
				oldItem = item;
				vchildren.splice(i, 1);
				break;
			}
		}
	
		newVchildren.push({
			prev: oldItem,
			vnode: newVchild,
			index: newVchildren.length
		});
	};
	
	var updateVelem = function updateVelem(velem, newVelem, node, parentContext) {
		var props = velem.props;
	
		var newProps = newVelem.props;
		var oldHtml = props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html;
		var newChildren = newProps.children;
	
		if (oldHtml == null && node.vchildren.length) {
			updateChildren(node, newChildren, parentContext);
			patchProps(node, props, newProps);
		} else {
			// should patch props first, make sure innerHTML was cleared
			patchProps(node, props, newProps);
			initChildren(node, newChildren, parentContext);
		}
		if (velem.ref !== null) {
			if (newVelem.ref !== null) {
				attachRef(newVelem.refs, newVelem.ref, node);
			} else {
				detachRef(velem.refs, velem.ref);
			}
		} else {
			attachRef(newVelem.refs, newVelem.ref, node);
		}
		return node;
	};
	
	var destroyVelem = function destroyVelem(velem, node) {
		var props = velem.props;
		var vchildren = node.vchildren;
	
		for (var i = 0, len = vchildren.length; i < len; i++) {
			var item = vchildren[i];
			destroyVnode(item.vnode, item.node);
		}
	
		if (velem.ref !== null) {
			detachRef(velem.refs, velem.ref);
		}
		node.eventStore = node.vchildren = null;
		for (var key in props) {
			if (props.hasOwnProperty(key) && EVENT_KEYS.test(key)) {
				key = getEventName(key);
				if (notBubbleEvents[key] === true) {
					node[key] = null;
				}
			}
		}
	};
	
	var initVstateless = function initVstateless(vstateless, parentContext, namespaceURI) {
		var vnode = renderVstateless(vstateless, parentContext);
		var node = initVnode(vnode, parentContext, namespaceURI);
		node.cache = node.cache || {};
		node.cache[vstateless.id] = vnode;
		return node;
	};
	var updateVstateless = function updateVstateless(vstateless, newVstateless, node, parentContext) {
		var id = vstateless.id;
		var vnode = node.cache[id];
		delete node.cache[id];
		var newVnode = renderVstateless(newVstateless, parentContext);
		var newNode = compareTwoVnodes(vnode, newVnode, node, parentContext);
		newNode.cache = newNode.cache || {};
		newNode.cache[newVstateless.id] = newVnode;
		if (newNode !== node) {
			extend(newNode.cache, node.cache);
		}
		return newNode;
	};
	var destroyVstateless = function destroyVstateless(vstateless, node) {
		var id = vstateless.id;
		var vnode = node.cache[id];
		delete node.cache[id];
		destroyVnode(vnode, node);
	};
	
	var renderVstateless = function renderVstateless(vstateless, parentContext) {
		var factory = vstateless.type;
		var props = vstateless.props;
	
		var componentContext = getContextByTypes(parentContext, factory.contextTypes);
		var vnode = factory(props, componentContext);
		if (vnode && vnode.render) {
			vnode = vnode.render();
		}
		if (vnode === null || vnode === false) {
			vnode = createVcomment('react-empty: ' + getUid());
		} else if (!vnode || !vnode.vtype) {
			throw new Error('@' + factory.name + '#render:You may have returned undefined, an array or some other invalid object');
		}
		return vnode;
	};
	
	var initVcomponent = function initVcomponent(vcomponent, parentContext, namespaceURI) {
		var Component = vcomponent.type;
		var props = vcomponent.props;
		var id = vcomponent.id;
	
		var componentContext = getContextByTypes(parentContext, Component.contextTypes);
		var component = new Component(props, componentContext);
		var updater = component.$updater;
		var cache = component.$cache;
	
		cache.parentContext = parentContext;
		updater.isPending = true;
		component.props = component.props || props;
		component.context = component.context || componentContext;
		if (component.componentWillMount) {
			component.componentWillMount();
			component.state = updater.getState();
		}
		var vnode = renderComponent(component, parentContext);
		var node = initVnode(vnode, vnode.context, namespaceURI);
		node.cache = node.cache || {};
		node.cache[id] = component;
		cache.vnode = vnode;
		cache.node = node;
		cache.isMounted = true;
		pendingComponents.push(component);
		if (vcomponent.ref !== null) {
			attachRef(vcomponent.refs, vcomponent.ref, component);
		}
		return node;
	};
	var updateVcomponent = function updateVcomponent(vcomponent, newVcomponent, node, parentContext) {
		var id = vcomponent.id;
		var component = node.cache[id];
		var updater = component.$updater;
		var cache = component.$cache;
		var Component = newVcomponent.type;
		var nextProps = newVcomponent.props;
	
		var componentContext = getContextByTypes(parentContext, Component.contextTypes);
		delete node.cache[id];
		node.cache[newVcomponent.id] = component;
		cache.parentContext = parentContext;
		if (component.componentWillReceiveProps) {
			updater.isPending = true;
			component.componentWillReceiveProps(nextProps, componentContext);
			updater.isPending = false;
		}
		updater.emitUpdate(nextProps, componentContext);
		if (vcomponent.ref !== null) {
			if (newVcomponent.ref !== null) {
				attachRef(newVcomponent.refs, newVcomponent.ref, component);
			} else {
				detachRef(vcomponent.refs, vcomponent.ref);
			}
		} else {
			attachRef(newVcomponent.refs, newVcomponent.ref, component);
		}
		return cache.node;
	};
	var destroyVcomponent = function destroyVcomponent(vcomponent, node) {
		var id = vcomponent.id;
		var component = node.cache[id];
		var cache = component.$cache;
		delete node.cache[id];
		if (vcomponent.ref !== null) {
			detachRef(vcomponent.refs, vcomponent.ref);
		}
		component.setState = component.forceUpdate = noop$1;
		if (component.componentWillUnmount) {
			component.componentWillUnmount();
		}
		destroyVnode(cache.vnode, node);
		delete component.setState;
		cache.isMounted = false;
		cache.node = cache.parentContext = cache.vnode = component.refs = component.context = null;
	};
	
	var getContextByTypes = function getContextByTypes(curContext, contextTypes) {
		var context = {};
		if (!contextTypes || !curContext) {
			return context;
		}
		for (var key in contextTypes) {
			if (contextTypes.hasOwnProperty(key)) {
				context[key] = curContext[key];
			}
		}
		return context;
	};
	
	var renderComponent = function renderComponent(component, parentContext) {
		refs = component.refs;
		var vnode = component.render();
	
		if (vnode === null || vnode === false) {
			vnode = createVcomment('react-empty: ' + getUid());
		} else if (!vnode || !vnode.vtype) {
			throw new Error('@' + component.constructor.name + '#render:You may have returned undefined, an array or some other invalid object');
		}
	
		var curContext = refs = null;
		if (component.getChildContext) {
			curContext = component.getChildContext();
		}
		if (curContext) {
			curContext = extend(extend({}, parentContext), curContext);
		} else {
			curContext = parentContext;
		}
		vnode.context = curContext;
		return vnode;
	};
	
	var pendingComponents = [];
	var clearPendingComponents = function clearPendingComponents() {
		var components = pendingComponents;
		var len = components.length;
		if (!len) {
			return;
		}
		pendingComponents = [];
		var i = -1;
		while (len--) {
			var component = components[++i];
			var updater = component.$updater;
			if (component.componentDidMount) {
				component.componentDidMount();
			}
			updater.isPending = false;
			updater.emitUpdate();
		}
	};
	
	function compareTwoVnodes(vnode, newVnode, node, parentContext) {
		var newNode = node;
	
		if (newVnode == null) {
			// remove
			destroyVnode(vnode, node);
			node.parentNode.removeChild(node);
		} else if (vnode.type !== newVnode.type || newVnode.key !== vnode.key) {
			// replace
			destroyVnode(vnode, node);
			newNode = initVnode(newVnode, parentContext, node.namespaceURI);
			node.parentNode.replaceChild(newNode, node);
		} else if (vnode !== newVnode) {
			// same type and same key -> update
			newNode = updateVnode(vnode, newVnode, node, parentContext);
		}
	
		return newNode;
	}
	
	var getDOMNode = function getDOMNode() {
		return this;
	};
	
	var attachRef = function attachRef(refs, refKey, refValue) {
		if (!refs || refKey == null || !refValue) {
			return;
		}
		if (refValue.nodeName && !refValue.getDOMNode) {
			// support react v0.13 style: this.refs.myInput.getDOMNode()
			refValue.getDOMNode = getDOMNode;
		}
		if (isFn(refKey)) {
			refKey(refValue);
		} else {
			refs[refKey] = refValue;
		}
	};
	
	var detachRef = function detachRef(refs, refKey) {
		if (!refs || refKey == null) {
			return;
		}
		if (isFn(refKey)) {
			refKey(null);
		} else {
			delete refs[refKey];
		}
	};
	
	var updateQueue = {
		updaters: [],
		isPending: false,
		add: function add(updater) {
			this.updaters.push(updater);
		},
		batchUpdate: function batchUpdate() {
			if (this.isPending) {
				return;
			}
			this.isPending = true;
			/*
	   each updater.update may add new updater to updateQueue
	   clear them with a loop
	   event bubbles from bottom-level to top-level
	   reverse the updater order can merge some props and state and reduce the refresh times
	   see Updater.update method below to know why
	  */
			var updaters = this.updaters;
	
			var updater = undefined;
			while (updater = updaters.pop()) {
				updater.updateComponent();
			}
			this.isPending = false;
		}
	};
	
	function Updater(instance) {
		this.instance = instance;
		this.pendingStates = [];
		this.pendingCallbacks = [];
		this.isPending = false;
		this.nextProps = this.nextContext = null;
		this.clearCallbacks = this.clearCallbacks.bind(this);
	}
	
	Updater.prototype = {
		emitUpdate: function emitUpdate(nextProps, nextContext) {
			this.nextProps = nextProps;
			this.nextContext = nextContext;
			// receive nextProps!! should update immediately
			nextProps || !updateQueue.isPending ? this.updateComponent() : updateQueue.add(this);
		},
		updateComponent: function updateComponent() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var nextProps = this.nextProps;
			var nextContext = this.nextContext;
	
			if (nextProps || pendingStates.length > 0) {
				nextProps = nextProps || instance.props;
				nextContext = nextContext || instance.context;
				this.nextProps = this.nextContext = null;
				// merge the nextProps and nextState and update by one time
				shouldUpdate(instance, nextProps, this.getState(), nextContext, this.clearCallbacks);
			}
		},
		addState: function addState(nextState) {
			if (nextState) {
				this.pendingStates.push(nextState);
				if (!this.isPending) {
					this.emitUpdate();
				}
			}
		},
		replaceState: function replaceState(nextState) {
			var pendingStates = this.pendingStates;
	
			pendingStates.pop();
			// push special params to point out should replace state
			pendingStates.push([nextState]);
		},
		getState: function getState() {
			var instance = this.instance;
			var pendingStates = this.pendingStates;
			var state = instance.state;
			var props = instance.props;
	
			if (pendingStates.length) {
				state = extend({}, state);
				eachItem(pendingStates, function (nextState) {
					// replace state
					if (isArr(nextState)) {
						state = extend({}, nextState[0]);
						return;
					}
					if (isFn(nextState)) {
						nextState = nextState.call(instance, state, props);
					}
					extend(state, nextState);
				});
				pendingStates.length = 0;
			}
			return state;
		},
		clearCallbacks: function clearCallbacks() {
			var pendingCallbacks = this.pendingCallbacks;
			var instance = this.instance;
	
			if (pendingCallbacks.length > 0) {
				this.pendingCallbacks = [];
				eachItem(pendingCallbacks, function (callback) {
					return callback.call(instance);
				});
			}
		},
		addCallback: function addCallback(callback) {
			if (isFn(callback)) {
				this.pendingCallbacks.push(callback);
			}
		}
	};
	function Component(props, context) {
		this.$updater = new Updater(this);
		this.$cache = { isMounted: false };
		this.props = props;
		this.state = {};
		this.refs = {};
		this.context = context || {};
	}
	
	Component.prototype = {
		constructor: Component,
		// getChildContext: _.noop,
		// componentWillUpdate: _.noop,
		// componentDidUpdate: _.noop,
		// componentWillReceiveProps: _.noop,
		// componentWillMount: _.noop,
		// componentDidMount: _.noop,
		// componentWillUnmount: _.noop,
		// shouldComponentUpdate(nextProps, nextState) {
		// 	return true
		// },
		forceUpdate: function forceUpdate(callback) {
			var $updater = this.$updater;
			var $cache = this.$cache;
			var props = this.props;
			var state = this.state;
			var context = this.context;
	
			if ($updater.isPending || !$cache.isMounted) {
				return;
			}
			var nextProps = $cache.props || props;
			var nextState = $cache.state || state;
			var nextContext = $cache.context || {};
			var parentContext = $cache.parentContext;
			var node = $cache.node;
			var vnode = $cache.vnode;
			$cache.props = $cache.state = $cache.context = null;
			$updater.isPending = true;
			if (this.componentWillUpdate) {
				this.componentWillUpdate(nextProps, nextState, nextContext);
			}
			this.state = nextState;
			this.props = nextProps;
			this.context = nextContext;
			var newVnode = renderComponent(this, parentContext);
			var newNode = compareTwoVnodes(vnode, newVnode, node, newVnode.context);
			if (newNode !== node) {
				newNode.cache = newNode.cache || {};
				extend(newNode.cache, node.cache);
			}
			$cache.vnode = newVnode;
			$cache.node = newNode;
			clearPendingComponents();
			if (this.componentDidUpdate) {
				this.componentDidUpdate(props, state, context);
			}
			if (callback) {
				callback.call(this);
			}
			$updater.isPending = false;
			$updater.emitUpdate();
		},
		setState: function setState(nextState, callback) {
			var $updater = this.$updater;
	
			$updater.addCallback(callback);
			$updater.addState(nextState);
		},
		replaceState: function replaceState(nextState, callback) {
			var $updater = this.$updater;
	
			$updater.addCallback(callback);
			$updater.replaceState(nextState);
		},
		getDOMNode: function getDOMNode() {
			var node = this.$cache.node;
			return node && node.nodeName === '#comment' ? null : node;
		},
		isMounted: function isMounted() {
			return this.$cache.isMounted;
		}
	};
	
	var shouldUpdate = function shouldUpdate(component, nextProps, nextState, nextContext, callback) {
		var shouldComponentUpdate = true;
		if (component.shouldComponentUpdate) {
			shouldComponentUpdate = component.shouldComponentUpdate(nextProps, nextState, nextContext);
		}
		if (shouldComponentUpdate === false) {
			component.props = nextProps;
			component.state = nextState;
			component.context = nextContext || {};
			return;
		}
		var cache = component.$cache;
		cache.props = nextProps;
		cache.state = nextState;
		cache.context = nextContext || {};
		component.forceUpdate(callback);
	};
	
	var getEventName = function getEventName(key) {
		key = eventNameAlias[key] || key;
		return key.toLowerCase();
	};
	
	var eventTypes = {};
	var addEvent = function addEvent(elem, eventType, listener) {
		eventType = getEventName(eventType);
	
		if (notBubbleEvents[eventType] === true) {
			elem[eventType] = listener;
			return;
		}
	
		var eventStore = elem.eventStore || (elem.eventStore = {});
		eventStore[eventType] = listener;
	
		if (!eventTypes[eventType]) {
			// onclick -> click
			document.addEventListener(eventType.substr(2), dispatchEvent);
			eventTypes[eventType] = true;
		}
	
		var nodeName = elem.nodeName;
	
		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			addEvent(elem, 'oninput', listener);
		}
	};
	
	var removeEvent = function removeEvent(elem, eventType) {
		eventType = getEventName(eventType);
		if (notBubbleEvents[eventType] === true) {
			elem[eventType] = null;
			return;
		}
	
		var eventStore = elem.eventStore || (elem.eventStore = {});
		delete eventStore[eventType];
	
		var nodeName = elem.nodeName;
	
		if (eventType === 'onchange' && (nodeName === 'INPUT' || nodeName === 'TEXTAREA')) {
			delete eventStore['oninput'];
		}
	};
	
	var dispatchEvent = function dispatchEvent(event) {
		var target = event.target;
		var type = event.type;
	
		var eventType = 'on' + type;
		var syntheticEvent = undefined;
		updateQueue.isPending = true;
		while (target) {
			var _target = target;
			var eventStore = _target.eventStore;
	
			var listener = eventStore && eventStore[eventType];
			if (!listener) {
				target = target.parentNode;
				continue;
			}
			if (!syntheticEvent) {
				syntheticEvent = createSyntheticEvent(event);
			}
			syntheticEvent.currentTarget = target;
			listener.call(target, syntheticEvent);
			if (syntheticEvent.$cancalBubble) {
				break;
			}
			target = target.parentNode;
		}
		updateQueue.isPending = false;
		updateQueue.batchUpdate();
	};
	
	var createSyntheticEvent = function createSyntheticEvent(nativeEvent) {
		var syntheticEvent = {};
		var cancalBubble = function cancalBubble() {
			return syntheticEvent.$cancalBubble = true;
		};
		syntheticEvent.nativeEvent = nativeEvent;
		for (var key in nativeEvent) {
			if (typeof nativeEvent[key] !== 'function') {
				syntheticEvent[key] = nativeEvent[key];
			} else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
				syntheticEvent[key] = cancalBubble;
			} else {
				syntheticEvent[key] = nativeEvent[key].bind(nativeEvent);
			}
		}
		return syntheticEvent;
	};
	
	var pendingRendering = {};
	var vnodeStore = {};
	var renderTreeIntoContainer = function renderTreeIntoContainer(vnode, container, callback, parentContext) {
		if (!vnode.vtype) {
			throw new Error('cannot render ' + vnode + ' to container');
		}
		var id = container[COMPONENT_ID] || (container[COMPONENT_ID] = getUid());
		var argsCache = pendingRendering[id];
	
		// component lify cycle method maybe call root rendering
		// should bundle them and render by only one time
		if (argsCache) {
			if (argsCache === true) {
				pendingRendering[id] = argsCache = [vnode, callback, parentContext];
			} else {
				argsCache[0] = vnode;
				argsCache[2] = parentContext;
				if (callback) {
					argsCache[1] = argsCache[1] ? pipe(argsCache[1], callback) : callback;
				}
			}
			return;
		}
	
		pendingRendering[id] = true;
		var oldVnode = null;
		var rootNode = null;
		if (oldVnode = vnodeStore[id]) {
			rootNode = compareTwoVnodes(oldVnode, vnode, container.firstChild, parentContext);
		} else {
			rootNode = initVnode(vnode, parentContext, container.namespaceURI);
			var childNode = null;
			while (childNode = container.lastChild) {
				container.removeChild(childNode);
			}
			container.appendChild(rootNode);
		}
		vnodeStore[id] = vnode;
		var isPending = updateQueue.isPending;
		updateQueue.isPending = true;
		clearPendingComponents();
		argsCache = pendingRendering[id];
		delete pendingRendering[id];
	
		var result = null;
		if (isArr(argsCache)) {
			result = renderTreeIntoContainer(argsCache[0], container, argsCache[1], argsCache[2]);
		} else if (vnode.vtype === VELEMENT) {
			result = rootNode;
		} else if (vnode.vtype === VCOMPONENT) {
			result = rootNode.cache[vnode.id];
		}
	
		if (!isPending) {
			updateQueue.isPending = false;
			updateQueue.batchUpdate();
		}
	
		if (callback) {
			callback.call(result);
		}
	
		return result;
	};
	
	var render = function render(vnode, container, callback) {
		return renderTreeIntoContainer(vnode, container, callback);
	};
	
	var unstable_renderSubtreeIntoContainer = function unstable_renderSubtreeIntoContainer(parentComponent, subVnode, container, callback) {
		var context = parentComponent.vnode ? parentComponent.vnode.context : parentComponent.$cache.parentContext;
		return renderTreeIntoContainer(subVnode, container, callback, context);
	};
	
	var unmountComponentAtNode = function unmountComponentAtNode(container) {
		if (!container.nodeName) {
			throw new Error('expect node');
		}
		var id = container[COMPONENT_ID];
		var vnode = null;
		if (vnode = vnodeStore[id]) {
			destroyVnode(vnode, container.firstChild);
			container.removeChild(container.firstChild);
			delete vnodeStore[id];
			return true;
		}
		return false;
	};
	
	var findDOMNode = function findDOMNode(node) {
		if (node == null) {
			return null;
		}
		if (node.nodeName) {
			return node;
		}
		var component = node;
		// if component.node equal to false, component must be unmounted
		if (component.getDOMNode && component.$cache.isMounted) {
			return component.getDOMNode();
		}
		throw new Error('findDOMNode can not find Node');
	};
	
	var ReactDOM = Object.freeze({
		render: render,
		unstable_renderSubtreeIntoContainer: unstable_renderSubtreeIntoContainer,
		unmountComponentAtNode: unmountComponentAtNode,
		findDOMNode: findDOMNode
	});
	
	var isValidElement = function isValidElement(obj) {
		return obj != null && !!obj.vtype;
	};
	
	var cloneElement = function cloneElement(originElem, props) {
		for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
			children[_key - 2] = arguments[_key];
		}
	
		var type = originElem.type;
		var key = originElem.key;
		var ref = originElem.ref;
	
		var newProps = extend(extend({ key: key, ref: ref }, originElem.props), props);
		var vnode = createElement.apply(undefined, [type, newProps].concat(children));
		if (vnode.ref === originElem.ref) {
			vnode.refs = originElem.refs;
		}
		return vnode;
	};
	
	var createFactory = function createFactory(type) {
		var factory = function factory() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}
	
			return createElement.apply(undefined, [type].concat(args));
		};
		factory.type = type;
		return factory;
	};
	
	var createElement = function createElement(type, props, children) {
		var createVnode = null;
		var argsLen = arguments.length;
	
		if (argsLen > 3) {
			children = [children];
			for (var i = 3; i < argsLen; i++) {
				children[i - 2] = arguments[i];
			}
		}
	
		var varType = typeof type;
	
		if (varType === 'string') {
			createVnode = createVelem;
		} else if (varType === 'function') {
			if (type.prototype && typeof type.prototype.forceUpdate === 'function') {
				createVnode = createVcomponent;
			} else {
				createVnode = createVstateless;
			}
		} else {
			throw new Error('React.createElement: unexpect type [ ' + type + ' ]');
		}
	
		var key = null;
		var ref = null;
		var finalProps = {};
		var propValue = null;
		if (props != null) {
			for (var propKey in props) {
				if (!props.hasOwnProperty(propKey)) {
					continue;
				}
				if (propKey === 'key') {
					if (props.key !== undefined) {
						key = '' + props.key;
					}
				} else if (propKey === 'ref') {
					if (props.ref !== undefined) {
						ref = props.ref;
					}
				} else if ((propValue = props[propKey]) !== undefined) {
					finalProps[propKey] = propValue;
				}
			}
		}
	
		var defaultProps = type.defaultProps;
	
		if (defaultProps) {
			for (var propKey in defaultProps) {
				if (finalProps[propKey] === undefined) {
					finalProps[propKey] = defaultProps[propKey];
				}
			}
		}
	
		if (children !== undefined) {
			finalProps.children = children;
		}
	
		var vnode = createVnode(type, finalProps);
		vnode.key = key;
		vnode.ref = ref;
		return vnode;
	};
	
	var tagNames = 'a|abbr|address|area|article|aside|audio|b|base|bdi|bdo|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|data|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|main|map|mark|menu|menuitem|meta|meter|nav|noscript|object|ol|optgroup|option|output|p|param|picture|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|source|span|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|u|ul|var|video|wbr|circle|clipPath|defs|ellipse|g|image|line|linearGradient|mask|path|pattern|polygon|polyline|radialGradient|rect|stop|svg|text|tspan';
	var DOM = {};
	eachItem(tagNames.split('|'), function (tagName) {
		DOM[tagName] = createFactory(tagName);
	});
	
	var check = function check() {
		return check;
	};
	check.isRequired = check;
	var PropTypes = {
		"array": check,
		"bool": check,
		"func": check,
		"number": check,
		"object": check,
		"string": check,
		"any": check,
		"arrayOf": check,
		"element": check,
		"instanceOf": check,
		"node": check,
		"objectOf": check,
		"oneOf": check,
		"oneOfType": check,
		"shape": check
	};
	
	var only = function only(children) {
		if (isValidElement(children)) {
			return children;
		}
		throw new Error('expect only one child');
	};
	
	var forEach = function forEach(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var index = 0;
		if (isArr(children)) {
			flattenChildren(children, function (child) {
				iteratee.call(context, child, index++);
			});
		} else {
			iteratee.call(context, children, index);
		}
	};
	
	var map = function map(children, iteratee, context) {
		if (children == null) {
			return children;
		}
		var store = [];
		var keyMap = {};
		forEach(children, function (child, index) {
			var data = {};
			data.child = iteratee.call(context, child, index) || child;
			data.isEqual = data.child === child;
			var key = data.key = getKey(child, index);
			if (keyMap.hasOwnProperty(key)) {
				keyMap[key] += 1;
			} else {
				keyMap[key] = 0;
			}
			data.index = keyMap[key];
			store.push(data);
		});
		var result = [];
		eachItem(store, function (_ref) {
			var child = _ref.child;
			var key = _ref.key;
			var index = _ref.index;
			var isEqual = _ref.isEqual;
	
			if (child == null || isBln(child)) {
				return;
			}
			if (!isValidElement(child) || key == null) {
				result.push(child);
				return;
			}
			if (keyMap[key] !== 0) {
				key += ':' + index;
			}
			if (!isEqual) {
				key = escapeUserProvidedKey(child.key || '') + '/' + key;
			}
			child = cloneElement(child, { key: key });
			result.push(child);
		});
		return result;
	};
	
	var count = function count(children) {
		var count = 0;
		forEach(children, function () {
			count++;
		});
		return count;
	};
	
	var toArray = function toArray(children) {
		return map(children, identity) || [];
	};
	
	var getKey = function getKey(child, index) {
		var key = undefined;
		if (isValidElement(child) && isStr(child.key)) {
			key = '.$' + child.key;
		} else {
			key = '.' + index.toString(36);
		}
		return key;
	};
	
	var userProvidedKeyEscapeRegex = /\/(?!\/)/g;
	var escapeUserProvidedKey = function escapeUserProvidedKey(text) {
		return ('' + text).replace(userProvidedKeyEscapeRegex, '//');
	};
	
	var Children = Object.freeze({
		only: only,
		forEach: forEach,
		map: map,
		count: count,
		toArray: toArray
	});
	
	var eachMixin = function eachMixin(mixins, iteratee) {
		eachItem(mixins, function (mixin) {
			if (mixin) {
				if (isArr(mixin.mixins)) {
					eachMixin(mixin.mixins, iteratee);
				}
				iteratee(mixin);
			}
		});
	};
	
	var combineMixinToProto = function combineMixinToProto(proto, mixin) {
		mapValue(mixin, function (value, key) {
			if (key === 'getInitialState') {
				proto.$getInitialStates.push(value);
				return;
			}
			var curValue = proto[key];
			if (isFn(curValue) && isFn(value)) {
				proto[key] = pipe(curValue, value);
			} else {
				proto[key] = value;
			}
		});
	};
	
	var combineMixinToClass = function combineMixinToClass(Component, mixin) {
		extend(Component.propTypes, mixin.propTypes);
		extend(Component.contextTypes, mixin.contextTypes);
		extend(Component, mixin.statics);
		if (isFn(mixin.getDefaultProps)) {
			extend(Component.defaultProps, mixin.getDefaultProps());
		}
	};
	
	var bindContext = function bindContext(obj, source) {
		mapValue(source, function (value, key) {
			if (isFn(value)) {
				obj[key] = value.bind(obj);
			}
		});
	};
	
	var Facade = function Facade() {};
	Facade.prototype = Component.prototype;
	
	var getInitialState = function getInitialState() {
		var _this = this;
	
		var state = {};
		var setState = this.setState;
		this.setState = Facade;
		eachItem(this.$getInitialStates, function (getInitialState) {
			if (isFn(getInitialState)) {
				extend(state, getInitialState.call(_this));
			}
		});
		this.setState = setState;
		return state;
	};
	
	var createClass = function createClass(spec) {
		if (!isFn(spec.render)) {
			throw new Error('createClass: spec.render is not function');
		}
		var specMixins = spec.mixins || [];
		var mixins = specMixins.concat(spec);
		spec.mixins = null;
		function Klass(props, context) {
			Component.call(this, props, context);
			this.constructor = Klass;
			spec.autobind !== false && bindContext(this, Klass.prototype);
			this.state = this.getInitialState() || this.state;
		}
		Klass.displayName = spec.displayName;
		Klass.contextTypes = {};
		Klass.propTypes = {};
		Klass.defaultProps = {};
		var proto = Klass.prototype = new Facade();
		proto.$getInitialStates = [];
		eachMixin(mixins, function (mixin) {
			combineMixinToProto(proto, mixin);
			combineMixinToClass(Klass, mixin);
		});
		proto.getInitialState = getInitialState;
		spec.mixins = specMixins;
		return Klass;
	};
	
	var React = extend({
		version: '0.15.1',
		cloneElement: cloneElement,
		isValidElement: isValidElement,
		createElement: createElement,
		createFactory: createFactory,
		Component: Component,
		createClass: createClass,
		Children: Children,
		PropTypes: PropTypes,
		DOM: DOM
	}, ReactDOM);
	
	React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactDOM;
	
	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	
	// [stiffness, damping]
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = {
	  noWobble: [170, 26], // the default
	  gentle: [120, 14],
	  wobbly: [180, 12],
	  stiff: [210, 20]
	};
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = spring;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _presets = __webpack_require__(2);
	
	var _presets2 = _interopRequireDefault(_presets);
	
	function spring(val) {
	  var config = arguments.length <= 1 || arguments[1] === undefined ? _presets2['default'].noWobble : arguments[1];
	
	  return { val: val, config: config };
	}
	
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;
	
	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = configAnimation;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _performanceNow = __webpack_require__(4);
	
	var _performanceNow2 = _interopRequireDefault(_performanceNow);
	
	var _raf = __webpack_require__(17);
	
	var _raf2 = _interopRequireDefault(_raf);
	
	function configAnimation() {
	  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _config$timeStep = config.timeStep;
	  var timeStep = _config$timeStep === undefined ? 1 / 60 * 1000 : _config$timeStep;
	  var _config$timeScale = config.timeScale;
	  var timeScale = _config$timeScale === undefined ? 1 : _config$timeScale;
	  var _config$maxSteps = config.maxSteps;
	  var maxSteps = _config$maxSteps === undefined ? 10 : _config$maxSteps;
	  var _config$raf = config.raf;
	  var raf = _config$raf === undefined ? _raf2['default'] : _config$raf;
	  var _config$now = config.now;
	  var now = _config$now === undefined ? _performanceNow2['default'] : _config$now;
	
	  var animRunning = [];
	  var running = false;
	  var prevTime = 0;
	  var accumulatedTime = 0;
	
	  function loop() {
	    var currentTime = now();
	    var frameTime = currentTime - prevTime; // delta
	
	    prevTime = currentTime;
	    accumulatedTime += frameTime * timeScale;
	
	    if (accumulatedTime > timeStep * maxSteps) {
	      accumulatedTime = 0;
	    }
	
	    var frameNumber = Math.ceil(accumulatedTime / timeStep);
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i = animRunning[i];
	      var active = _animRunning$i.active;
	      var animationStep = _animRunning$i.animationStep;
	      var prevPrevState = _animRunning$i.prevState;
	      var prevNextState = animRunning[i].nextState;
	
	      if (!active) {
	        continue;
	      }
	
	      // Seems like because the TS sets destVals as enterVals for the first
	      // tick, we might render that value twice. We render it once, currValue is
	      // enterVal and destVal is enterVal. The next tick is faster than 16ms,
	      // so accumulatedTime (which would be about -16ms from the previous tick)
	      // is negative (-16ms + any number less than 16ms < 0). So we just render
	      // part ways towards the nextState, but that's enterVal still. We render
	      // say 75% between currValue (=== enterVal) and destValue (=== enterVal).
	      // So we render the same value a second time.
	      // The solution below is to recalculate the destination state even when
	      // you're moving partially towards it.
	      if (accumulatedTime <= 0) {
	        animRunning[i].nextState = animationStep(timeStep / 1000, prevPrevState);
	      } else {
	        for (var j = 0; j < frameNumber; j++) {
	          animRunning[i].nextState = animationStep(timeStep / 1000, prevNextState);
	          var _ref = [prevNextState, animRunning[i].nextState];
	          animRunning[i].prevState = _ref[0];
	          prevNextState = _ref[1];
	        }
	      }
	    }
	
	    accumulatedTime = accumulatedTime - frameNumber * timeStep;
	
	    // Render and filter in one iteration.
	    var alpha = 1 + accumulatedTime / timeStep;
	    for (var i = 0; i < animRunning.length; i++) {
	      var _animRunning$i2 = animRunning[i];
	      var animationRender = _animRunning$i2.animationRender;
	      var nextState = _animRunning$i2.nextState;
	      var prevState = _animRunning$i2.prevState;
	
	      // Might mutate animRunning........
	      animationRender(alpha, nextState, prevState);
	    }
	
	    animRunning = animRunning.filter(function (_ref2) {
	      var active = _ref2.active;
	      return active;
	    });
	
	    if (animRunning.length === 0) {
	      running = false;
	    } else {
	      raf(loop);
	    }
	  }
	
	  function start() {
	    if (!running) {
	      running = true;
	      prevTime = now();
	      accumulatedTime = 0;
	      raf(loop);
	    }
	  }
	
	  return function startAnimation(state, animationStep, animationRender) {
	    for (var i = 0; i < animRunning.length; i++) {
	      var val = animRunning[i];
	      if (val.animationStep === animationStep) {
	        val.active = true;
	        val.prevState = state;
	        start();
	        return val.stop;
	      }
	    }
	
	    var newAnim = {
	      animationStep: animationStep,
	      animationRender: animationRender,
	      prevState: state,
	      nextState: state,
	      active: true
	    };
	
	    newAnim.stop = function () {
	      return newAnim.active = false;
	    };
	    animRunning.push(newAnim);
	
	    start();
	
	    return newAnim.stop;
	  };
	}
	
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = components;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _noVelocity = __webpack_require__(10);
	
	var _noVelocity2 = _interopRequireDefault(_noVelocity);
	
	var _hasReachedStyle = __webpack_require__(8);
	
	var _hasReachedStyle2 = _interopRequireDefault(_hasReachedStyle);
	
	var _mergeDiff = __webpack_require__(9);
	
	var _mergeDiff2 = _interopRequireDefault(_mergeDiff);
	
	var _animationLoop = __webpack_require__(5);
	
	var _animationLoop2 = _interopRequireDefault(_animationLoop);
	
	var _zero = __webpack_require__(16);
	
	var _zero2 = _interopRequireDefault(_zero);
	
	var _updateTree = __webpack_require__(15);
	
	var _deprecatedSprings2 = __webpack_require__(7);
	
	var _deprecatedSprings3 = _interopRequireDefault(_deprecatedSprings2);
	
	var _stripStyle = __webpack_require__(14);
	
	var _stripStyle2 = _interopRequireDefault(_stripStyle);
	
	var startAnimation = _animationLoop2['default']();
	
	function mapObject(f, obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = f(obj[key], key);
	  }
	  return ret;
	}
	
	function everyObj(f, obj) {
	  for (var key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    if (!f(obj[key], key)) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function components(React) {
	  var PropTypes = React.PropTypes;
	
	  var Motion = React.createClass({
	    displayName: 'Motion',
	
	    propTypes: {
	      // TOOD: warn against putting a config in here
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `defaultValue` has been changed to `defaultStyle`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('Spring\'s `endValue` has been changed to `style`. Its format ' + 'received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: PropTypes.object,
	      style: PropTypes.object.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props = this.props;
	      var defaultStyle = _props.defaultStyle;
	      var style = _props.style;
	
	      var currentStyle = defaultStyle || style;
	      return {
	        currentStyle: currentStyle,
	        currentVelocity: mapObject(_zero2['default'], currentStyle)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyle = state.currentStyle;
	      var currentVelocity = state.currentVelocity;
	      var style = this.props.style;
	
	      var newCurrentStyle = _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocity, style);
	      var newCurrentVelocity = _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocity, style);
	
	      // TOOD: this isn't necessary anymore. It was used only against endValue func
	      if (_noVelocity2['default'](currentVelocity, newCurrentStyle) && _noVelocity2['default'](newCurrentVelocity, newCurrentStyle)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyle: newCurrentStyle,
	        currentVelocity: newCurrentVelocity
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      // Is smart enough to not start it twice
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // `this.hasUnmounted` might be true in the following condition:
	      // user does some checks in `style` and calls an owner handler
	      // owner sets state in the callback, triggering a re-render
	      // unmounts Motion
	      if (!this.hasUnmounted) {
	        this.setState({
	          currentStyle: _updateTree.interpolateValue(alpha, nextState.currentStyle, prevState.currentStyle),
	          currentVelocity: nextState.currentVelocity
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = _stripStyle2['default'](this.state.currentStyle);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var StaggeredMotion = React.createClass({
	    displayName: 'StaggeredMotion',
	
	    propTypes: {
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `StaggeredMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.arrayOf(PropTypes.object),
	      styles: PropTypes.func.isRequired,
	      children: PropTypes.func.isRequired
	    },
	
	    getInitialState: function getInitialState() {
	      var _props2 = this.props;
	      var styles = _props2.styles;
	      var defaultStyles = _props2.defaultStyles;
	
	      var currentStyles = defaultStyles ? defaultStyles : styles();
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: currentStyles.map(function (s) {
	          return mapObject(_zero2['default'], s);
	        })
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	
	      var styles = this.props.styles(currentStyles.map(_stripStyle2['default']));
	
	      var newCurrentStyles = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	      var newCurrentVelocities = currentStyles.map(function (currentStyle, i) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyle, currentVelocities[i], styles[i]);
	      });
	
	      // TODO: is this right?
	      if (currentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }) && newCurrentVelocities.every(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      })) {
	        this.stopAnimation();
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = nextState.currentStyles.map(function (style, i) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[i]);
	        });
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = this.state.currentStyles.map(_stripStyle2['default']);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var TransitionMotion = React.createClass({
	    displayName: 'TransitionMotion',
	
	    propTypes: {
	      defaultValue: function defaultValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `defaultValue` has been changed to ' + '`defaultStyles`. Its format received a few (easy to update!) ' + 'changes as well.');
	        }
	      },
	      endValue: function endValue(prop, propName) {
	        if (prop[propName]) {
	          return new Error('TransitionSpring\'s `endValue` has been changed to `styles`. ' + 'Its format received a few (easy to update!) changes as well.');
	        }
	      },
	      defaultStyle: function defaultStyle(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `defaultStyles`.');
	        }
	      },
	      style: function style(prop, propName) {
	        if (prop[propName]) {
	          return new Error('You forgot the "s" for `TransitionMotion`\'s `styles`.');
	        }
	      },
	      // TOOD: warn against putting configs in here
	      defaultStyles: PropTypes.objectOf(PropTypes.any),
	      styles: PropTypes.oneOfType([PropTypes.func, PropTypes.objectOf(PropTypes.any.isRequired)]).isRequired,
	      willLeave: PropTypes.oneOfType([PropTypes.func]),
	      // TOOD: warn against putting configs in here
	      willEnter: PropTypes.oneOfType([PropTypes.func]),
	      children: PropTypes.func.isRequired
	    },
	
	    getDefaultProps: function getDefaultProps() {
	      return {
	        willEnter: function willEnter(key, value) {
	          return value;
	        },
	        willLeave: function willLeave() {
	          return null;
	        }
	      };
	    },
	
	    getInitialState: function getInitialState() {
	      var _props3 = this.props;
	      var styles = _props3.styles;
	      var defaultStyles = _props3.defaultStyles;
	
	      var currentStyles = undefined;
	      if (defaultStyles == null) {
	        if (typeof styles === 'function') {
	          currentStyles = styles();
	        } else {
	          currentStyles = styles;
	        }
	      } else {
	        currentStyles = defaultStyles;
	      }
	      return {
	        currentStyles: currentStyles,
	        currentVelocities: mapObject(function (s) {
	          return mapObject(_zero2['default'], s);
	        }, currentStyles)
	      };
	    },
	
	    componentDidMount: function componentDidMount() {
	      this.startAnimating();
	    },
	
	    componentWillReceiveProps: function componentWillReceiveProps() {
	      this.startAnimating();
	    },
	
	    animationStep: function animationStep(timestep, state) {
	      var currentStyles = state.currentStyles;
	      var currentVelocities = state.currentVelocities;
	      var _props4 = this.props;
	      var styles = _props4.styles;
	      var willEnter = _props4.willEnter;
	      var willLeave = _props4.willLeave;
	
	      if (typeof styles === 'function') {
	        styles = styles(currentStyles);
	      }
	
	      // TODO: huh?
	      var mergedStyles = styles; // set mergedStyles to styles as the default
	      var hasNewKey = false;
	
	      mergedStyles = _mergeDiff2['default'](currentStyles, styles,
	      // TODO: stop allocating like crazy in this whole code path
	      function (key) {
	        var res = willLeave(key, currentStyles[key], styles, currentStyles, currentVelocities);
	        if (res == null) {
	          // For legacy reason. We won't allow returning null soon
	          // TODO: remove, after next release
	          return null;
	        }
	
	        if (_noVelocity2['default'](currentVelocities[key], currentStyles[key]) && _hasReachedStyle2['default'](currentStyles[key], res)) {
	          return null;
	        }
	        return res;
	      });
	
	      Object.keys(mergedStyles).filter(function (key) {
	        return !currentStyles.hasOwnProperty(key);
	      }).forEach(function (key) {
	        var _extends2, _extends3;
	
	        hasNewKey = true;
	        var enterStyle = willEnter(key, mergedStyles[key], styles, currentStyles, currentVelocities);
	
	        // We can mutate this here because mergeDiff returns a new Obj
	        mergedStyles[key] = enterStyle;
	
	        currentStyles = _extends({}, currentStyles, (_extends2 = {}, _extends2[key] = enterStyle, _extends2));
	        currentVelocities = _extends({}, currentVelocities, (_extends3 = {}, _extends3[key] = mapObject(_zero2['default'], enterStyle), _extends3));
	      });
	
	      var newCurrentStyles = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentStyle(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	      var newCurrentVelocities = mapObject(function (mergedStyle, key) {
	        return _updateTree.updateCurrentVelocity(timestep, currentStyles[key], currentVelocities[key], mergedStyle);
	      }, mergedStyles);
	
	      if (!hasNewKey && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, currentStyles[k]);
	      }, currentVelocities) && everyObj(function (v, k) {
	        return _noVelocity2['default'](v, newCurrentStyles[k]);
	      }, newCurrentVelocities)) {
	        // check explanation in `Motion.animationRender`
	        this.stopAnimation(); // Nasty side effects....
	      }
	
	      return {
	        currentStyles: newCurrentStyles,
	        currentVelocities: newCurrentVelocities
	      };
	    },
	
	    stopAnimation: null,
	
	    // used in animationRender
	    hasUnmounted: false,
	
	    componentWillUnmount: function componentWillUnmount() {
	      this.stopAnimation();
	      this.hasUnmounted = true;
	    },
	
	    startAnimating: function startAnimating() {
	      this.stopAnimation = startAnimation(this.state, this.animationStep, this.animationRender);
	    },
	
	    animationRender: function animationRender(alpha, nextState, prevState) {
	      // See comment in Motion.
	      if (!this.hasUnmounted) {
	        var currentStyles = mapObject(function (style, key) {
	          return _updateTree.interpolateValue(alpha, style, prevState.currentStyles[key]);
	        }, nextState.currentStyles);
	        this.setState({
	          currentStyles: currentStyles,
	          currentVelocities: nextState.currentVelocities
	        });
	      }
	    },
	
	    render: function render() {
	      var strippedStyle = mapObject(_stripStyle2['default'], this.state.currentStyles);
	      var renderedChildren = this.props.children(strippedStyle);
	      return renderedChildren && React.Children.only(renderedChildren);
	    }
	  });
	
	  var _deprecatedSprings = _deprecatedSprings3['default'](React);
	
	  var Spring = _deprecatedSprings.Spring;
	  var TransitionSpring = _deprecatedSprings.TransitionSpring;
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring, Motion: Motion, StaggeredMotion: StaggeredMotion, TransitionMotion: TransitionMotion };
	}
	
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = deprecatedSprings;
	var hasWarnedForSpring = {};
	var hasWarnedForTransitionSpring = {};
	
	function deprecatedSprings(React) {
	  var Spring = React.createClass({
	    displayName: 'Spring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForSpring[ownerName]) {
	          hasWarnedForSpring[ownerName] = true;
	          console.error('Spring (used in %srender) has now been renamed to Motion. ' + 'Please see the release note for the upgrade path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  var TransitionSpring = React.createClass({
	    displayName: 'TransitionSpring',
	
	    componentWillMount: function componentWillMount() {
	      if (false) {
	        var ownerName = this._reactInternalInstance._currentElement._owner && this._reactInternalInstance._currentElement._owner.getName();
	        if (!hasWarnedForTransitionSpring[ownerName]) {
	          hasWarnedForTransitionSpring[ownerName] = true;
	          console.error('TransitionSpring (used in %srender) has now been renamed to ' + 'TransitionMotion. Please see the release note for the upgrade ' + 'path. Thank you!', ownerName ? ownerName + '\'s ' : 'React.');
	        }
	      }
	    },
	
	    render: function render() {
	      return null;
	    }
	  });
	
	  return { Spring: Spring, TransitionSpring: TransitionSpring };
	}
	
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = hasReachedStyle;
	
	function hasReachedStyle(currentStyle, style) {
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    var currentValue = currentStyle[key];
	    var destValue = style[key];
	    if (destValue == null || !destValue.config) {
	      // not a spring config
	      continue;
	    }
	    if (currentValue.config && currentValue.val !== destValue.val) {
	      return false;
	    }
	    if (!currentValue.config && currentValue !== destValue.val) {
	      return false;
	    }
	  }
	
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	
	// this function is allocation-less thanks to babel, which transforms the tail
	// calls into loops
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = mergeDiff;
	function mergeDiffArr(_x, _x2, _x3, _x4, _x5, _x6, _x7) {
	  var _again = true;
	
	  _function: while (_again) {
	    var arrA = _x,
	        arrB = _x2,
	        collB = _x3,
	        indexA = _x4,
	        indexB = _x5,
	        onRemove = _x6,
	        accum = _x7;
	    endA = endB = keyA = keyB = fill = fill = undefined;
	    _again = false;
	
	    var endA = indexA === arrA.length;
	    var endB = indexB === arrB.length;
	    var keyA = arrA[indexA];
	    var keyB = arrB[indexB];
	    if (endA && endB) {
	      // returning null here, otherwise lint complains that we're not expecting
	      // a return value in subsequent calls. We know what we're doing.
	      return null;
	    }
	
	    if (endA) {
	      accum[keyB] = collB[keyB];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (endB) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (keyA === keyB) {
	      accum[keyA] = collB[keyA];
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB + 1;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    if (!collB.hasOwnProperty(keyA)) {
	      var fill = onRemove(keyA);
	      if (fill != null) {
	        accum[keyA] = fill;
	      }
	      _x = arrA;
	      _x2 = arrB;
	      _x3 = collB;
	      _x4 = indexA + 1;
	      _x5 = indexB;
	      _x6 = onRemove;
	      _x7 = accum;
	      _again = true;
	      continue _function;
	    }
	
	    _x = arrA;
	    _x2 = arrB;
	    _x3 = collB;
	    _x4 = indexA + 1;
	    _x5 = indexB;
	    _x6 = onRemove;
	    _x7 = accum;
	    _again = true;
	    continue _function;
	  }
	}
	
	function mergeDiff(a, b, onRemove) {
	  var ret = {};
	  // if anyone can make this work without allocating the arrays here, we'll
	  // give you a medal
	  mergeDiffArr(Object.keys(a), Object.keys(b), b, 0, 0, onRemove, ret);
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	
	// currentStyle keeps the info about whether a prop is configured as a spring
	// or if it's just a random prop that happens to be present on the style
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = noVelocity;
	
	function noVelocity(currentVelocity, currentStyle) {
	  for (var key in currentVelocity) {
	    if (!currentVelocity.hasOwnProperty(key)) {
	      continue;
	    }
	    if (currentStyle[key] != null && currentStyle[key].config && currentVelocity[key] !== 0) {
	      return false;
	    }
	  }
	  return true;
	}
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _components2 = __webpack_require__(6);
	
	var _components3 = _interopRequireDefault(_components2);
	
	var _reorderKeys = __webpack_require__(12);
	
	var _reorderKeys2 = _interopRequireDefault(_reorderKeys);
	
	var _components = _components3['default'](_react2['default']);
	
	var Spring = _components.Spring;
	var TransitionSpring = _components.TransitionSpring;
	var Motion = _components.Motion;
	var StaggeredMotion = _components.StaggeredMotion;
	var TransitionMotion = _components.TransitionMotion;
	exports.Spring = Spring;
	exports.TransitionSpring = TransitionSpring;
	exports.Motion = Motion;
	exports.StaggeredMotion = StaggeredMotion;
	exports.TransitionMotion = TransitionMotion;
	
	var _spring2 = __webpack_require__(3);
	
	var _spring3 = _interopRequireDefault(_spring2);
	
	exports.spring = _spring3['default'];
	
	var _presets2 = __webpack_require__(2);
	
	var _presets3 = _interopRequireDefault(_presets2);
	
	exports.presets = _presets3['default'];
	var utils = {
	  reorderKeys: _reorderKeys2['default']
	};
	exports.utils = utils;

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = reorderKeys;
	
	function reorderKeys(obj, f) {
	  var newKeys = f(Object.keys(obj));
	  var ret = {};
	  for (var i = 0; i < newKeys.length; i++) {
	    var key = newKeys[i];
	    ret[key] = obj[key];
	  }
	
	  return ret;
	}
	
	module.exports = exports["default"];

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = stepper;
	
	var errorMargin = 0.0001;
	
	function stepper(frameRate, x, v, destX, k, b) {
	  // Spring stiffness, in kg / s^2
	
	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);
	
	  // Damping, in kg / s
	  var Fdamper = -b * v;
	
	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;
	
	  var newV = v + a * frameRate;
	  var newX = x + newV * frameRate;
	
	  if (Math.abs(newV - v) < errorMargin && Math.abs(newX - x) < errorMargin) {
	    return [destX, 0];
	  }
	
	  return [newX, newV];
	}
	
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports) {

	
	// turn {x: {val: 1, config: [1, 2]}, y: 2} generated by
	// `{x: spring(1, [1, 2]), y: 2}` into {x: 1, y: 2}
	
	'use strict';
	
	exports.__esModule = true;
	exports['default'] = stripStyle;
	
	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = style[key] == null || style[key].val == null ? style[key] : style[key].val;
	  }
	  return ret;
	}
	
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.interpolateValue = interpolateValue;
	exports.updateCurrentStyle = updateCurrentStyle;
	exports.updateCurrentVelocity = updateCurrentVelocity;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _stepper = __webpack_require__(13);
	
	var _stepper2 = _interopRequireDefault(_stepper);
	
	var _spring = __webpack_require__(3);
	
	var _spring2 = _interopRequireDefault(_spring);
	
	// TODO: refactor common logic with updateCurrValue and updateCurrVelocity
	
	function interpolateValue(alpha, nextStyle, prevStyle) {
	  // might be used by a TransitionMotion, where prevStyle might not exist anymore
	  if (!prevStyle) {
	    return nextStyle;
	  }
	
	  var ret = {};
	  for (var key in nextStyle) {
	    if (!nextStyle.hasOwnProperty(key)) {
	      continue;
	    }
	
	    if (nextStyle[key] == null || !nextStyle[key].config) {
	      ret[key] = nextStyle[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var prevValue = prevStyle[key].config ? prevStyle[key].val : prevStyle[key];
	    ret[key] = _spring2['default'](nextStyle[key].val * alpha + prevValue * (1 - alpha), nextStyle[key].config);
	  }
	
	  return ret;
	}
	
	// TODO: refactor common logic with updateCurrentVelocity
	
	function updateCurrentStyle(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      ret[key] = style[key];
	      // not a spring config, not something we want to interpolate
	      continue;
	    }
	    var _style$key$config = style[key].config;
	    var k = _style$key$config[0];
	    var b = _style$key$config[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[0];
	    ret[key] = _spring2['default'](val, style[key].config);
	  }
	  return ret;
	}
	
	function updateCurrentVelocity(frameRate, currentStyle, currentVelocity, style) {
	  var ret = {};
	  for (var key in style) {
	    if (!style.hasOwnProperty(key)) {
	      continue;
	    }
	    if (style[key] == null || !style[key].config) {
	      // not a spring config, not something we want to interpolate
	      ret[key] = 0;
	      continue;
	    }
	    var _style$key$config2 = style[key].config;
	    var k = _style$key$config2[0];
	    var b = _style$key$config2[1];
	
	    var val = _stepper2['default'](frameRate,
	    // might have been a non-springed prop that just became one
	    currentStyle[key].val == null ? currentStyle[key] : currentStyle[key].val, currentVelocity[key], style[key].val, k, b)[1];
	    ret[key] = val;
	  }
	  return ret;
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	
	// used by the tree-walking updates and springs. Avoids some allocations
	"use strict";
	
	exports.__esModule = true;
	exports["default"] = zero;
	
	function zero() {
	  return 0;
	}
	
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var now = __webpack_require__(4)
	  , global = typeof window === 'undefined' ? {} : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = global['request' + suffix]
	  , caf = global['cancel' + suffix] || global['cancelRequest' + suffix]
	
	for(var i = 0; i < vendors.length && !raf; i++) {
	  raf = global[vendors[i] + 'Request' + suffix]
	  caf = global[vendors[i] + 'Cancel' + suffix]
	      || global[vendors[i] + 'CancelRequest' + suffix]
	}
	
	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id = 0
	    , queue = []
	    , frameDuration = 1000 / 60
	
	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = now()
	        , next = Math.max(0, frameDuration - (_now - last))
	      last = next + _now
	      setTimeout(function() {
	        var cp = queue.slice(0)
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last)
	            } catch(e) {
	              setTimeout(function() { throw e }, 0)
	            }
	          }
	        }
	      }, Math.round(next))
	    }
	    queue.push({
	      handle: ++id,
	      callback: callback,
	      cancelled: false
	    })
	    return id
	  }
	
	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true
	      }
	    }
	  }
	}
	
	module.exports = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(global, fn)
	}
	module.exports.cancel = function() {
	  caf.apply(global, arguments)
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	var isIterateeCall = __webpack_require__(20);
	
	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. If `end` is not specified it is
	 * set to `start` with `start` then set to `0`. If `end` is less than `start`
	 * a zero-length range is created unless a negative `step` is specified.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the new array of numbers.
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	function range(start, end, step) {
	  if (step && isIterateeCall(start, end, step)) {
	    end = step = undefined;
	  }
	  start = +start || 0;
	  step = step == null ? 1 : (+step || 0);
	
	  if (end == null) {
	    end = start;
	    start = 0;
	  } else {
	    end = +end || 0;
	  }
	  // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	  // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = start;
	    start += step;
	  }
	  return result;
	}
	
	module.exports = range;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern modularize exports="npm" -o ./`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;
	
	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    var other = object[index];
	    return value === value ? (value === other) : (other !== other);
	  }
	  return false;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 21 */,
/* 22 */,
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _srcReactMotion = __webpack_require__(11);
	
	var _lodashRange = __webpack_require__(19);
	
	var _lodashRange2 = _interopRequireDefault(_lodashRange);
	
	function reinsert(arr, from, to) {
	  var _arr = arr.slice(0);
	  var val = _arr[from];
	  _arr.splice(from, 1);
	  _arr.splice(to, 0, val);
	  return _arr;
	}
	
	function clamp(n, min, max) {
	  return Math.max(Math.min(n, max), min);
	}
	
	var allColors = ['#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A'];
	var count = 11;
	var width = 70;
	var height = 90;
	
	// indexed by visual position
	var layout = _lodashRange2['default'](count).map(function (n) {
	  var row = Math.floor(n / 3);
	  var col = n % 3;
	  return [width * col, height * row];
	});
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    return {
	      mouse: [0, 0],
	      delta: [0, 0], // difference between mouse and circle pos, for dragging
	      lastPress: null, // key of the last pressed component
	      isPressed: false,
	      order: _lodashRange2['default'](count) };
	  },
	
	  // index: visual position. value: component key/id
	  componentDidMount: function componentDidMount() {
	    window.addEventListener('touchmove', this.handleTouchMove);
	    window.addEventListener('touchend', this.handleMouseUp);
	    window.addEventListener('mousemove', this.handleMouseMove);
	    window.addEventListener('mouseup', this.handleMouseUp);
	  },
	
	  handleTouchStart: function handleTouchStart(key, pressLocation, e) {
	    this.handleMouseDown(key, pressLocation, e.touches[0]);
	  },
	
	  handleTouchMove: function handleTouchMove(e) {
	    e.preventDefault();
	    this.handleMouseMove(e.touches[0]);
	  },
	
	  handleMouseMove: function handleMouseMove(_ref) {
	    var pageX = _ref.pageX;
	    var pageY = _ref.pageY;
	    var _state = this.state;
	    var order = _state.order;
	    var lastPress = _state.lastPress;
	    var isPressed = _state.isPressed;
	    var _state$delta = _state.delta;
	    var dx = _state$delta[0];
	    var dy = _state$delta[1];
	
	    if (isPressed) {
	      var mouse = [pageX - dx, pageY - dy];
	      var col = clamp(Math.floor(mouse[0] / width), 0, 2);
	      var row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
	      var index = row * 3 + col;
	      var newOrder = reinsert(order, order.indexOf(lastPress), index);
	      this.setState({ mouse: mouse, order: newOrder });
	    }
	  },
	
	  handleMouseDown: function handleMouseDown(key, _ref2, _ref3) {
	    var pressX = _ref2[0];
	    var pressY = _ref2[1];
	    var pageX = _ref3.pageX;
	    var pageY = _ref3.pageY;
	
	    this.setState({
	      lastPress: key,
	      isPressed: true,
	      delta: [pageX - pressX, pageY - pressY],
	      mouse: [pressX, pressY]
	    });
	  },
	
	  handleMouseUp: function handleMouseUp() {
	    this.setState({ isPressed: false, delta: [0, 0] });
	  },
	
	  render: function render() {
	    var _this = this;
	
	    var _state2 = this.state;
	    var order = _state2.order;
	    var lastPress = _state2.lastPress;
	    var isPressed = _state2.isPressed;
	    var mouse = _state2.mouse;
	
	    return _react2['default'].createElement(
	      'div',
	      { className: 'demo2' },
	      order.map(function (_, key) {
	        var style = undefined;
	        var x = undefined;
	        var y = undefined;
	        var visualPosition = order.indexOf(key);
	        if (key === lastPress && isPressed) {
	          x = mouse[0];
	          y = mouse[1];
	
	          style = {
	            translateX: x,
	            translateY: y,
	            scale: _srcReactMotion.spring(1.2, [180, 10]),
	            boxShadow: _srcReactMotion.spring((x - (3 * width - 50) / 2) / 15, [180, 10])
	          };
	        } else {
	          var _layout$visualPosition = layout[visualPosition];
	          x = _layout$visualPosition[0];
	          y = _layout$visualPosition[1];
	
	          style = {
	            translateX: _srcReactMotion.spring(x, [120, 17]),
	            translateY: _srcReactMotion.spring(y, [120, 17]),
	            scale: _srcReactMotion.spring(1, [180, 10]),
	            boxShadow: _srcReactMotion.spring((x - (3 * width - 50) / 2) / 15, [180, 10])
	          };
	        }
	        return _react2['default'].createElement(
	          _srcReactMotion.Motion,
	          { key: key, style: style },
	          function (_ref4) {
	            var translateX = _ref4.translateX;
	            var translateY = _ref4.translateY;
	            var scale = _ref4.scale;
	            var boxShadow = _ref4.boxShadow;
	            return _react2['default'].createElement('div', {
	              onMouseDown: _this.handleMouseDown.bind(null, key, [x, y]),
	              onTouchStart: _this.handleTouchStart.bind(null, key, [x, y]),
	              className: 'demo2-ball',
	              style: {
	                backgroundColor: allColors[key],
	                WebkitTransform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')',
	                transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')',
	                zIndex: key === lastPress ? 99 : visualPosition,
	                boxShadow: boxShadow + 'px 5px 5px rgba(0,0,0,0.5)'
	              }
	            });
	          }
	        );
	      })
	    );
	  }
	});
	
	exports['default'] = Demo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=all.js.map