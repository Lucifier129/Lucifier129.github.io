$(function() {
	//根据屏幕高度分配margin
	var $win = $(window)
	var win_height = $win.height()
	var cur_height = 0

	$('.page:eq(0)').children().each(function() {
		cur_height += $(this).outerHeight(true)
	})

	var diff = (win_height - cur_height) / 2
	var $focus_img = $('.focus_img')

	$focus_img.css({
		marginTop: parseFloat($focus_img.css('marginTop'), 10) + diff / 2,
		marginBottom: parseFloat($focus_img.css('marginBottom'), 10) + diff / 2
	})

	cur_height = 0

	$('.page:eq(1)').children().each(function() {
		cur_height += $(this).outerHeight(true)
	})

	var diff = (win_height - cur_height)
	var total = 0

	$('.copywriter .word').add('.word4').each(function() {
		var $this = $(this)
		var value = parseFloat($this.css('marginBottom'), 10) + diff / 4
		if (value < 0) {
			total -= value
			value = 0
		}
		$this.css({
			marginBottom: value
		})
	})

	if (total > 0) {
		$('div.video').height($('div.video').height() - total)
	}
	

	//点击视频
	$('.second_page_header').on('click', '.video', function() {
		$(this).hide()
		$('video').addClass('video').show().get(0).play()
		$('.second_page_header').off('click')
	})

	new Swiper('.swiper-container', {
		direction: 'vertical'
	})
})