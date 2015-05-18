;(function($) {

    $.fn.tab = function(options) {
        if (!options || !options.target) {
            throw new Error('$.fn.tab need a param about target selector')
        }
        if (!$.isArray(options.target)) {
            var selectorList = [options.target]
        } else {
            var selectorList = options.target
        }
        var change = function() {
            var $this = $(this)
            var index = $this.index()
            $this
                .addClass('active')
                .siblings('.active').removeClass('active')
            $.each(selectorList, function(_, selector) {
                var $target = $(selector).hide().eq(index).show()
                if ($.isFunction(options.callback)) {
                    options.callback($target, index)
                }
            })
        }
        var timer
        var type = options.type ? options.type + ' mouseenter' : 'mouseenter'
        var src = options.src || 'li'
        this.on(type, src, function() {
            var that = this
            timer = setTimeout(function() {
                change.call(that)
            }, 100)
        }).on('mouseleave', src, function() {
            clearTimeout(timer)
        })
        this.find(src).eq(0).trigger(type)
    }
}(jQuery))

$(function() {
	//dom ready
	$('.left-side-content .height01 .tab-list').tab({
		target: '.left-side-content .height01 .the-content',
		src: 'a'
	})


	$('.img-player.fl .img-pager').tab({
		target: '.img-player.fl .img-inner a',
		src: 'span',
		type: 'click'
	})

	$('.img-player.fr .img-pager').tab({
		target: '.img-player.fr .img-inner a',
		src: 'span',
		type: 'click'
	})


	$('.img-player').each(function() {
		var $elem = $(this)
		var next = function() {
			var $children = $elem.find('.img-pager').children()
			var index = $elem.find('.img-pager .active').index()
			index = (index + 1) % $children.length
			$children.eq(index).trigger('click')
		}
		var timer
		function addTimer() {
			timer = setInterval(next, 3000)
		}
		$elem.on('mouseenter', '.img-pager', function() {
			clearInterval(timer)
		}).on('mouseleave', '.img-pager', addTimer)
		addTimer()
        next()
	})



})