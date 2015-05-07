define(function (require, exports, module) {
var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({
	render: function() {
		var updateTodo = this.props.updateTodo
		var removeTodo = this.props.removeTodo
		return (
			<ul id="todo-list">
				{
					this.props.todos.map(function(todo) {
						return <Todo {...todo} updateTodo={updateTodo} removeTodo={removeTodo} />
					}.bind(this))
				}
			</ul>
			)
	}
})

module.exports = Todos
});