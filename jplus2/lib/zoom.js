//移动端自适应缩放方案
;(function(win, undefined) {
	var doc = win.document
	var docEl = doc.documentElement
	var metaVp = doc.querySelector('meta[name="viewport"]')
	var designWidth = parseFloat(docEl.getAttribute('data-design-width'), 10)
	var noMetaVp = !metaVp
	var timer
	var scale
	var dpr

	if (noMetaVp) {
		metaVp = doc.createElement('meta')
		metaVp.setAttribute('name', 'viewport')
	}

	var isAndroid = win.navigator.appVersion.match(/android/gi)
	var isIPhone = win.navigator.appVersion.match(/iphone/gi)
	var devicePixelRatio = win.devicePixelRatio
	if (isIPhone) {
		// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
		if (devicePixelRatio >= 3) {
			dpr = 3
		} else if (devicePixelRatio >= 2) {
			dpr = 2
		} else {
			dpr = 1
		}
	} else {
		// 其他设备下，仍旧使用1倍的方案
		dpr = 1
	}
	scale = 1 / dpr

	metaVp.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')


	docEl.setAttribute('data-dpr', dpr);
	docEl.classList.add('dpr' + dpr)

	if (noMetaVp) {
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaVp);
		} else {
			var wrap = doc.createElement('div');
			wrap.appendChild(metaVp);
			doc.write(wrap.innerHTML);
		}
	}

	function setRootFontSize() {
		var width = docEl.getBoundingClientRect().width
		if (width / dpr > designWidth) {
			width = designWidth * dpr
		}
		var rem = width / designWidth * 100
		docEl.style.fontSize = rem + 'px'
	}

	win.addEventListener('resize', function() {
		clearTimeout(timer)
		timer = setTimeout(setRootFontSize, 300)
	}, false)

	win.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			clearTimeout(timer)
			timer = setTimeout(setRootFontSize, 300)
		}
	}, false)

	setRootFontSize()

}(window));