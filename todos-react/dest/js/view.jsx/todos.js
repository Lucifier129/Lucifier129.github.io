var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({
	render: function() {
		return (
			<ul id="todo-list">
				<Todo />
			</ul>
			)
	}
})

module.exports = Todos