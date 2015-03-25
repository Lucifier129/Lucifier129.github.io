/**
 *app.js
 */
$(function() {

	//ajax配置
	var ajaxSettings = {
		//@url 请求handle
		url: '/classzt/MKTTopic_149/handler/Handler.ashx',
		//@method 请求方法
		type: 'post',
		dataType: 'json'
	}

	//验证表单
	function verify(form) {
		var $form = $(form)
		var $required = $form.find('input[required]')
		for (var i = 0, len = $required.length; i < len; i += 1) {
			if (!verify.check($required.get(i))) {
				return
			}
		}
		var data = verify.data
		var options = $.extend(ajaxSettings, {
			data: {
				username: data.name,
				cellphone: data.phone,
				userqq: data.email
			}
		})

		verify.popup('submit')

		$.ajax(options)
			.done(function(data) {
				//根据接口返回的数据字段可调整逻辑
				if (data.Msg !== 'noContent') {
					verify.popup('success')
				} else {
					verify.popup('error')
				}
			})
			.error(function() {
				console.log('error')
				verify.popup('error')
			})
	}

	verify.parttern = {
		name: /.{2,}/,
		phone: /^1\d{10}$/,
		email: /^[a-z0-9._%-]+@[qQ]{2}\.com$/
	}

	verify.data = {}

	verify.check = function(elem) {
		var $elem = $(elem)
		var type = $elem.attr('name').trim()
		var parttern = this.parttern[type]
		var val = $elem.val().trim()
		if (parttern && !parttern.test(val)) {
			this.popup(type)
			return false
		}
		this.data[type] = val
		return true
	}

	verify.popup = function(type) {
		var $tips = $('[data-tips="' + type + '"]')

		if ($tips.length <= 0) {
			return
		}
		$tips.addClass('active').siblings('.active').removeClass('active')
		$('.mask').show()
	}

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
			var headerHeight = $header.height()
			var scale = 1 / 3
			if (headerHeight * scale > diff) {
				$header.height(headerHeight - diff)
			} else {
				$header.height(headerHeight * (1 - scale))
				diff -= headerHeight * scale

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
	var swiper = new Swiper('.swiper-container', {
		direction: 'vertical'
	})



	var $goToForm = $('[data-role="goToForm"]')
	var $submit = $('.form-area .submit')
	var $mask = $('.mask')

	FastClick.attach($goToForm[0])
	FastClick.attach($submit[0])
	FastClick.attach($mask[0])


	$goToForm.on('click', function() {
		//在此埋点
		swiper.slidePrev()
	})

	$submit.on('click', function(e) {
		//在此埋点
		e.preventDefault()
		verify('.form-area')
	})

	$mask.on('click', function() {
		$(this).hide()
	})

	var $form = $('.form-area')
	var $page = $('.page:eq(0)')
	var trigger = false

	$form
		.on('focus', 'input', function(e) {
			if (!trigger) {
				e.preventDefault()
			} else {
				trigger = false
				return
			}
			var top = $form.offset().top
			if (top === 0) {
				return
			}
			$page.css({
				top: -top
			})
			var $this = $(this)
			
			setTimeout(function() {
				trigger = true
				$this.trigger('focus')
			}, 400)
			
		})
		.on('blur', 'input', function() {
			$page.css({
				top: 0
			})
		})


})