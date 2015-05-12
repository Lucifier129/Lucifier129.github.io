define(function (require, exports, module) {
var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({
	render: function() {
		return (
			<ul id="todo-list">
				{
					this.props.todos.map(function(todo) {
						return <Todo {...todo} />
					}.bind(this))
				}
			</ul>
			)
	}
})

module.exports = Todos
});