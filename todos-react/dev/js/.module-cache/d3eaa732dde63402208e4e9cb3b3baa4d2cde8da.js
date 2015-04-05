define(function (require, exports, module) {
var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({displayName: "Todos",
	render: function() {
		return (
			React.createElement("ul", {id: "todo-list"}, 
				
					this.props.todos.map(function(todo) {
						return React.createElement(Todo, React.__spread({},  todo, {updateTodo: this.props.updateTodo, removeTodo: this.props.removeTodo}))
					}.bind(this))
				
			)
			)
	}
})

module.exports = Todos
});