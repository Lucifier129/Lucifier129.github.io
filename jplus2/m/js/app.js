/**
 * app.js
 */

define(function(require, exports, module) {


	function GetData(url, callback) {
		this.url = url
		this.xhr = new XMLHttpRequest()
		this.callback = {}
		if (typeof callback === 'function') {
			this.callback['success'] = callback
		}
	}

	GetData.prototype.done = function() {
		this.xhr.open('GET', this.url, true)
		this.listen()
		this.xhr.send(null)
	}

	GetData.prototype.on = function(state, callback) {
		if (typeof state === 'string' && typeof callback === 'function') {
			this.callback[state] = callback
		}
		return this
	}

	GetData.prototype.listen = function() {
		var callback = this.callback
		this.xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				callback['success'](this.responseText)
			}
		}

		for (var key in callback) {
			if (callback.hasOwnProperty(key)) {
				this.xhr['on' + key] = callback[key]
			}
		}
		return this
	}

	exports.init = function() {
		/*$('.index-list').on('click', 'li', function() {
			var index= $(this).index() + 1
			var url = 'source/' + (index < 10 ? '0' + index : index) + '.md'
			var getData = new GetData(url)
			getData.on('success', function(data) {
				$('.markdown-body')
					.html(marked(data))
					.find('pre code')
					.each(function() {
						hljs.highlightBlock(this)
					})
			}).done()
		})*/

		$('#pageHome').on('click', 'li a', function(e) {
			e.preventDefault()
			var getData = new GetData(this.href)
			getData.on('success', function(data) {
				var $div = $('<div class="page markdown-body"></div>').html(marked(data))
				$div.find('pre code').each(function() {
					hljs.highlightBlock(this)
				})
				Mobilebone.transition($div.appendTo($('body')).get(0), $('#pageHome')[0])
			}).done()
		})
	}
})