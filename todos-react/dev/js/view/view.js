define(function (require, exports, module) {
var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

exports.init = function() {
	React.render(
		React.createElement(NewTodo, null),
		document.getElementById('header')
		)

	React.render(
		React.createElement(Main, null),
		document.getElementById('main')
		)

	React.render(
		React.createElement(Filters, null),
		document.getElementById('footer')
		)
}
});