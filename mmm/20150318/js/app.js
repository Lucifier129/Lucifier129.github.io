$(function() {

	//根据屏幕高度分配margin
	function reflow() {
		var $page = $('.page')
		var $win = $(window)
		var win_height = $win.height()
		var cur_height = 0

		$page.eq(0).children().each(function() {
			cur_height += $(this).outerHeight(true)
		})

		var diff = (win_height - cur_height) / 2
		var $focus_img = $('.focus_img')

		//调整焦点图外边距
		$focus_img.css({
			marginTop: parseFloat($focus_img.css('marginTop'), 10) + diff / 2,
			marginBottom: parseFloat($focus_img.css('marginBottom'), 10) + diff / 2
		})

		cur_height = 0

		$page.eq(1).children().each(function() {
			cur_height += $(this).outerHeight(true)
		})

		var diff = (win_height - cur_height)
		//剩余高度
		var surplus_height = 0

		$('.copywriter .word').add('.word4').each(function() {
			var $this = $(this)
			var value = parseFloat($this.css('marginBottom'), 10) + diff / 4
			if (value < 0) {
				surplus_height -= value
				value = 0
			}
			$this.css({
				marginBottom: value
			})
		})

		//按比例缩小video
		if (surplus_height > 0) {
			var $video = $('div.video')
			var old_height = $video.height()
			var new_height = old_height - surplus_height
			var ratio = new_height / old_height
			$video.css({
				height: new_height,
				width: $video.width() * ratio
			})
		}
		reflow = $.noop
	}

	reflow()

	function addVideo() {
		var $video = $('video')
		$video
			.attr('src', $video.data('src'))
			.show().get(0).play()
	}

	//点击视频
	$('div.video').one('click', function() {
		$(this).find('img').hide()
		addVideo()
	})

	new Swiper('.swiper-container', {
		direction: 'vertical'
	})
})