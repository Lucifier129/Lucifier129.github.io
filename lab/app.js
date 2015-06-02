var Tree = require('./tree')
var cwd = new Tree(process.cwd(), 'root')

cwd.saveTo('tree.json')

cwd.get('./css').then(function(css) {
	css.saveTo('css.json')
})

cwd.get('./delay.html').then(function(delay) {
	delay.saveTo('delay.json').then(function() {
		setTimeout(function() {
			cwd.get('./delay.json').then(function(delayJSON) {
				delayJSON.del()
			})
		}, 2000)
	})
})

cwd.get('./vendor').then(function(vendor) {
	return vendor.add('testadd.js').then(function() {
		setTimeout(function() {
			vendor.del('testadd.js')
		}, 3000)
	})
})

cwd.mkdir('./mkdir/a').then(function() {
	return cwd.del('mkdir/a')
}).catch(console.error.bind(console))

cwd.rename('Promise实战之读取文件目录.md', 'Promise实战之文件操作.md')