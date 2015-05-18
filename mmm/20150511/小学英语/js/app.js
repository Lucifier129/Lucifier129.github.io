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
        var src = options.src || 'li'
        this.on('mouseenter', src, function() {
            var that = this
            timer = setTimeout(function() {
                change.call(that)
            }, 100)
        }).on('mouseleave', src, function() {
            clearTimeout(timer)
        })
        this.find(src).eq(0).trigger('mouseenter')
    }
}(jQuery))

$(function() {
    //dom ready
    $('.left-side-content .height01 .tab-list').tab({
        target: '.left-side-content .height01 .the-content',
        src: 'a'
    })

})









