var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

exports.init = function() {
	React.render(
		<NewTodo />,
		document.getElementById('header')
		)

	React.render(
		<Main />,
		document.getElementById('main')
		)

	React.render(
		<Filters />,
		document.getElementById('footer')
		)
}