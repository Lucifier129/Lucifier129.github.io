//移动端自适应缩放方案
;(function(win, undefined) {
	var doc = win.document
	var docEl = doc.documentElement
	var metaVp = docEl.querySelector('meta[name="viewport"]')
	var noMetaVp = !metaVp

	if (noMetaVp) {
		metaVp = doc.createElement('meta')
		metaVp.setAttribute('name', 'viewport')
	}

	var isIPhone = win.navigator.appVersion.match(/iphone/gi)
	var devicePixelRatio = win.devicePixelRatio
	var dpr
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

	docEl.setAttribute('data-dpr', dpr)
	docEl.classList.add('dpr' + dpr)

	var scale = 1 / dpr
	metaVp.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')

	if (noMetaVp) {
		if (docEl.firstElementChild) {
			docEl.firstElementChild.appendChild(metaVp)
		} else {
			var wrap = doc.createElement('div')
			wrap.appendChild(metaVp)
			doc.write(wrap.innerHTML)
			wrap = null
		}
	}

	var designWidth = parseFloat(docEl.getAttribute('data-design-width'), 10)
	function setRootFontSize() {
		var width = docEl.getBoundingClientRect().width
		if (width / dpr > designWidth) {
			width = designWidth * dpr
		}
		var fontSize = width / designWidth * 100
		docEl.style.fontSize = fontSize + 'px'
	}

	var timer
	function done() {
		clearTimeout(timer)
		timer = setTimeout(setRootFontSize, 300)
	}

	win.addEventListener('resize', done, false)
	win.addEventListener('pageshow', function(e) {
		if (e.persisted) {
			done()
		}
	}, false)

	var timer1 = setInterval(function() {
        if (doc.body) {
            doc.body.style.fontSize = 12 * dpr + 'px'
            setRootFontSize()
            clearInterval(timer1)
        }
    }, 4)

}(window));