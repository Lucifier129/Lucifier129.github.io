/**
 * turn.js
 */
define(function(require, exports, module) {

	var $ = require('jquery')

	function int(obj) {
		return parseInt(obj, 10)
	}

	var status = {
		into: {
			addClass: ['in'],
			removeClass: ['out', 'reverse', 'hide']
		},
		out: {
			addClass: ['out'],
			removeClass: ['in', 'reverse']
		}
	}

	$.pageStatus = status

	function setStatus($elem, type, otherClass) {
		$.each(status[type] || {}, function(method, classList) {
			var classNames = classList.join(' ')
			$elem[method](classNames)
		})
		$elem.addClass(otherClass)
	}

	var count = 0

	function into(parent) {
		var index = this.attr('data-turn-index')
		if (typeof index === 'undefined') {
			index = count++
				this.attr('data-turn-index', index)
		} else {
			index = int(index)
		}

		$(parent).append(this)

		var $cur = this.siblings('.in')
		if (!$cur.length) {
			return setStatus(this, 'into')
		}

		var curIndex = int($cur.attr('data-turn-index')) || -1
		var reverse = index > curIndex ? null : 'reverse'
		setStatus(this, 'into', reverse)
		$cur.out(reverse)
	}

	$.fn.out = function(reverse) {
		return this.each(function() {
			animationEnd(this.parentNode)
			setStatus($(this), 'out', reverse)
		})
	}

	function animationEnd(elem) {
		if (!elem || !elem.nodeName || $(elem).data('amimation')) {
			return
		}
		elem.addEventListener('amimationEnd', hide, false)
		elem.addEventListener('webkitAnimationEnd', hide, false)
		$(elem).data('amimation', true)
	}

	function hide(e) {
		var $target = $(e.target)
		if ($target.hasClass('out')) {
			$target.addClass('hide')
		}
	}

	$.fn.into = function(parent) {
		return this.each(function() {
			into.call($(this), parent)
		})
	}
})