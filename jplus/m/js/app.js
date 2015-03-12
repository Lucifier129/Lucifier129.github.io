/**
 * app.js
 */

define(function(require, exports, module) {

	var $ = require('jquery')
	var marked = require('marked')
	var hljs = require('highlight')
	var FastClick = require('fastclick')
	require('jplus')
	require('jquery-into')

	exports.template = '<div class="page markdown-body"></div>'

	exports.render = function($elem, data) {
		$('body, html').scrollTop(0)
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
			<a class="c-inner" data-bind="attr-href:url;text:title"></a>\
		</li>\
	</ul>\
</div>'

		$(template).into($('#container')).refresh({
			titleList: data
		})
	}

	exports.route = function(hash) {
		if (hash === '/') {
			$('.home').hide()
			this.renderIndex()
		} else {
			var that = this
			hash = hash.slice(1)
			$.each(data, function() {
				if (this.url === hash) {
					that.getItem(hash)
				}
			})
			$('.home').show()
		}
		if (history.length <= 1) {
			$('.back').hide()
		} else {
			$('.back').show()
		}
	}

	exports.init = function() {
		FastClick.attach(document.body)
		this.listen()
		$(window).trigger('hashchange')
	}


	exports.cache = {}
	exports.getItem = function(url) {
		var $target = this.cache[url]
		if ($target) {
			$target.into()
		} else {
			var that = this
			$target = this.cache[url] = $(this.template).into($('#container'))
			$.ajax({
				url: url,
				method: 'GET',
				success: function(data) {
					that.render($target, data)
				}
			})
		}
	}

	exports.listen = function() {
		var that = this

		$(window).on('hashchange', function(e) {
			e.preventDefault()
			var hash = '/' + location.hash.replace('#/', '')
			that.route(hash)
		})

		$('#container')
			.on('click', '#pageHome li a', function(e) {
				e.preventDefault()
				location.hash = '/' + this.getAttribute("href")
			})

		$('#header')
			.on('click', '.home', function() {
				location.hash = '/'
			})
			.on('click', '.back', function() {
				if (history.length > 1) {
					history.back()
				}
			})
	}
})