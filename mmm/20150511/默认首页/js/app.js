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
        var type = options.type ? options.type + ' mouseenter' || 'mouseenter'
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

    $('.slideshow').each(function() {
        var slider = $(this).bxSlider({
            controls: false,
            touchEnabled: false,
            auto: true,
            autoHover: true,
            onSlideAfter: function() {
                slider.stopAuto()
                slider.startAuto()
            }
        })
        $(this).data('slider', slider)
    })

    $('.tab-slider').each(function() {
    	var slider = $(this).bxSlider({
	        slideWidth: 114,
	        minSlides: 3,
	        maxSlides: 30,
	        moveSlides: 3,
	        slideMargin: 12,
	        pager: false,
	        touchEnabled: false
	    })
	    $(this).data('slider', slider)
    })

    $('.tab-of-slider .tab-header').tab({
        target: '.tab-of-slider .tab-slider-content',
        callback: function($target) {
        	var slider = $target.find('.tab-slider').data('slider')
        	if (slider) {
        		slider.reloadSlider()
        	}
        }
    })

    $('.tab01 .tab-list').tab({
        target: '.tab01 .list01',
        src: 'a'
    })

    $('.tab02 .tab-list').tab({
        target: '.tab02 .list01',
        src: 'a'
    })

    $('.english-skill .tab-list').tab({
    	target: ['.english-skill .main-english-skill', '.english-skill .links-header .fr'],
    	src: 'a'
    })

    $('.learn-english .tab-list').tab({
        target: '.learn-english .main-learn-english',
        src: 'a',
        callback: function($target, selector) {
            var slider = $target.find('.slideshow').data('slider')
            if (slider) {
                slider.reloadSlider()
            }
        }
    })


})
