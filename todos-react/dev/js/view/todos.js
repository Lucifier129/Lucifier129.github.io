define(function (require, exports, module) {
var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({displayName: "Todos",
	render: function() {
		var updateTodo = this.props.updateTodo
		var removeTodo = this.props.removeTodo
		return (
			React.createElement("ul", {id: "todo-list"}, 
				
					this.props.todos.map(function(todo) {
						return React.createElement(Todo, React.__spread({},  todo, {updateTodo: updateTodo, removeTodo: removeTodo}))
					}.bind(this))
				
			)
			)
	}
})

module.exports = Todos
});