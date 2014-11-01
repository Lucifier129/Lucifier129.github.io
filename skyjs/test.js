//sky.js加载器测试文件

module.exports = '来自 test.js 的测试文本0';

module.exports = '来自 test.js 的测试文本1';

module.exports = '来自 test.js 的测试文本2';

module.exports = '来自 test.js 的测试文本3';

module.exports = '来自 test.js 的测试文本4';

module.exports = function() {
	return {
		sayHi: function(msg) {
			console.log(msg);
		}
	};
};

//test3.js


module.exports = function() {
	return 'test3.js-export1';
};

module.exports = function() {
	return 'test3.js-export2';
};

module.exports = function() {
	return 'test3.js-export3';
};

module.exports = function() {
	return 'test3.js-export4';
};

module.exports = function() {
	return 'test3.js-export5';
};

module.exports = function() {
	return 'test3.js-export6';
};

module.exports = function() {
	return 'test3.js-export7';
};

module.exports = function() {
	return 'test3.js-export8';
};

module.exports = function() {
	return 'test3.js-export9';
};