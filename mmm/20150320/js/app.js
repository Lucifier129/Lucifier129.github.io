/**
 *app.js
*/
$(function() {

	//根据高度重新布局
	function reflow() {
		var $page = $('.page')
		var winHeight = $(window).height()
		var curHeight = 0

		function addUp() {
			curHeight += $(this).outerHeight(true)
		}

		$page.eq(0).children().each(addUp)

		var diff = curHeight - winHeight

		if (diff > 0) {
			var $header = $('.page1-header')
			var headerHeightTwoThird = $header.height() * 2 / 3
			if (headerHeightTwoThird > diff) {
				$header.height(headerHeightTwoThird)
			} else {
				$header.height(headerHeightTwoThird)
				diff -= headerHeightTwoThird

				var $focusImg = $('.focus-img')
				var oldHeight = $focusImg.height()
				var oldWidth = $focusImg.width()
				var ratio = oldWidth / oldHeight
				var newHeight = $focusImg.height() - diff
				$focusImg.css({
					height: newHeight,
					width: newHeight * ratio
				})
			}
		}

		curHeight = 0

		$page.eq(1).children().each(addUp)

		diff = curHeight - winHeight

		if (diff > 0) {
			var selectors = ['.word01', '.word02', '[data-role="goToForm"]']
			var $elems = {}
			var marginTop = {}
			var total = 0
			$.each(selectors, function(i, selector) {
				var $elem = $(selector)
				$elems[selector] = $elem
				total += marginTop[selector] = parseFloat($elem.css('margin-top'), 10)
			})

			//如果高度实在不够分配，先干掉$tips
			if (total < diff) {
				var $tips = $('.tips')
				diff -= $tips.outerHeight(true)
				$tips.remove()
			}

			$.each($elems, function(selector) {
				var oldMarginTop = marginTop[selector]
				this.css({
					marginTop: oldMarginTop - diff * (oldMarginTop / total)
				})
			})
		}

		reflow = $.noop
	}

	reflow()

	//验证表单
	function verify(form) {
		var $form = $(form)
		var $required = $form.find('input[required]')
		for (var i =0, len = $required.length; i < len; i += 1) {
			if (!verify.check($required.get(i))) {
				return
			}
		}
		$form.submit()
	}

	verify.parttern = {
		name: /.{2,}/,
		phone: /^1\d{10}$/,
		email: /^[a-z0-9._%-]+@([a-z0-9-]+\.)+[a-z]{2,4}$/
	}

	verify.tips = {
		name: '姓名',
		phone: '手机号',
		email: '邮箱'
	}

	verify.check = function(elem) {
		var $elem = $(elem)
		var type = $elem .attr('name')
		var parttern = this.parttern[type]
		if (parttern && !parttern.test($elem.val())) {
			var tips = $elem.attr('placeholder')
			if (!tips) {
				tips =  this.tips[type] || '格式'
			}
			alert('请输入有效的' + tips)
			return false
		}
		return true
	}


	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical'
	})

	var $goToForm = $('[data-role="goToForm"]')
	var $submit = $('.form-area [type="submit"]')

	FastClick.attach($goToForm[0])
	FastClick.attach($submit[0])

	$goToForm.on('click', swiper.slidePrev.bind(swiper))

	$submit.on('click', function(e) {
		e.preventDefault()
		verify('.form-area')
	})



})