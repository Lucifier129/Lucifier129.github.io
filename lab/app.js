var Tree = require('./tree')
var cwd = new Tree(process.cwd(), 'root')

cwd.saveTo('tree.json')

cwd.get('./css').then(function(css) {
	css.saveTo('css.json')
})

cwd.get('./delay.html').then(function(delay) {
	delay.saveTo('delay.json')
})

cwd.get('./vendor').then(function(vendor) {
	return vendor.saveTo('vendor.json')
})

cwd.set('abce/asdfasdf/asdfasdfsadf/').then(function(path) {
	console.log(path)
})