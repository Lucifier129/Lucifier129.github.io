/**
 * app.js
 */

define(function(require, exports, module) {

	exports.template = '<div class="page markdown-body"><div class="home">目录</div></div>'

	exports.render = function($elem, data) {
		$elem.append(marked(data))
		$elem.find('pre code').each(function() {
			hljs.highlightBlock(this)
		})
	}

	var data = require('../js/data')

	exports.renderIndex = function() {

		if (this.hasRenderIndex) {
			$('#pageHome').into()
			return
		}

		this.hasRenderIndex = true

		var template =

'<div id="pageHome" class="page in">\
	<ul class="c-wrap">\
		<li class="c-wrap" data-bind="vm:titleList" noscan>\
			<a class="c-inner" href="source/01.md" data-bind="attr-href:url;text:title"></a>\
		</li>\
	</ul>\
</div>'

		$(template).into($('#container')).refresh({
			titleList: data
		})
	}

	exports.route = function(hash) {
		if (hash === '/') {
			this.renderIndex()
		} else {
			var that = this
			hash = hash.slice(1)
			$.each(data, function() {
				if (this.url === hash) {
					that.getItem(hash)
				}
			})
		}
	}

	exports.init = function() {
		this.listen()
		$(window).trigger('hashchange')
		$('container').into()
	}


	exports.cache = {}
	exports.getItem = function(url) {
		var $target = this.cache[url]
		if ($target) {
			$target.into()
			return
		}
		$target = this.cache[url] = $(this.template).into($('#container'))

		var that = this
		$.ajax({
			url: url,
			method: 'GET',
			success: function(data) {
				that.render($target, data)
			}
		})
	}

	exports.listen = function() {
		var that = this

		$(window).on('hashchange', function() {
			var hash = '/' + location.hash.replace('#/', '')
			that.route(hash)
		})

		$('#container')
			.on('click', '.home', function() {
				location.hash = '/'
			})
			.on('click', '#pageHome li a', function(e) {
				e.preventDefault()
				location.hash = '/' + this.getAttribute("href")
			})
	}
})