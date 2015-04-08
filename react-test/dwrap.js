//为某一目录下所有没有包裹define函数的js文件包裹define，忽略非js文件，包括文件夹
var fs = require('fs')
var path = require('path')

var wrapper = ['define(function (require, exports, module) {\n', '\n});']
var curPath = process.cwd()
var otherPath = process.argv[2]

if (otherPath) {
	curPath = path.join(curPath, otherPath)
}

fs.readdir(curPath, function(err, files) {
	if (err) {
		console.log(err)
	} else {
		files.forEach(function(filename) {
			if (path.extname(filename) !== '.js') {
				return
			}
			var filepath = path.join(curPath, filename)
			fs.readFile(filepath, function(err, data) {
				if (err) {
					return console.log(err)
				}
				if (/define\s*\(/g.test(data.toString())) {
					return
				}
				fs.writeFile(filepath, [wrapper[0], data, wrapper[1]].join(''))
				console.log(filepath, 'done')
			})
		})
	}
})