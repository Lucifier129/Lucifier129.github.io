/**
 * app.js
 */
define(function(require, exports, module) {
	$('.code').each(function() {
		var $this = $(this)
		var selector = $this.data('temp')
		$this.text($(selector).html())
		hljs.highlightBlock(this)
	})
	exports.init = function() {}
})