;(function(win, undefined) {
	var doc = win.document;
	var docEl = doc.documentElement;
	var baseWidth = parseFloat(docEl.getAttribute('data-width'), 10);
	var dpr = 0;
	var tid;
	var formSetViewport = false

	var isAndroid = win.navigator.appVersion.match(/android/gi);
	var isIPhone = win.navigator.appVersion.match(/iphone/gi);
	var devicePixelRatio = win.devicePixelRatio;
	if (isIPhone) {
		// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
		if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
			dpr = 3;
		} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
			dpr = 2;
		} else {
			dpr = 1;
		}
	} else {
		// 其他设备下，仍旧使用1倍的方案
		dpr = 1;
	}

	docEl.setAttribute('data-dpr', dpr);

	function setRootFontSize() {
		var width = docEl.getBoundingClientRect().width;
		docEl.style.fontSize = 10 * dpr + 'px';
	}

	/*win.addEventListener('resize', function() {
		clearTimeout(tid);
		tid = setTimeout(setScale, 300);
	}, false);*/
	win.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			clearTimeout(tid);
			tid = setTimeout(setScale, 300);
		}
	}, false);

	setScale();

	function setViewport(scale) {
		var viewportMeta = doc.querySelector('meta[name="viewport"]')
		var content = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'
		if (!viewportMeta) {
			viewportMeta = doc.createElement('meta')
			viewportMeta.setAttribute('name', 'viewport')
			setTimeout(function() {
				doc.getElementsByTagName('head')[0].appendChild(viewportMeta)
				formSetViewport = false
			}, 4)
		}
		viewportMeta.setAttribute('content', content)
		formSetViewport = true
		console.log('setViewport')
	}

	function getWidth(elem) {
		return elem.getBoundingClientRect().width;
	}

	function setScale() {
		var docWidth = getWidth(docEl)
		var ratio =  (baseWidth) / docWidth * dpr
		console.log(docWidth, baseWidth, ratio)
		setViewport(ratio)
	}

}(window));