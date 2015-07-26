import { pipe, then, $helper } from './helper'


let data = {
	header: 'test_header',
	main: 'test_main',
	footer: 'test_footer'
}

let addClass = function(className) {
	this.classList.add(className)
}

let helper = {
	header: addClass,
	main: addClass,
	footer: addClass
}


'#todoapp'::$helper(data, helper)