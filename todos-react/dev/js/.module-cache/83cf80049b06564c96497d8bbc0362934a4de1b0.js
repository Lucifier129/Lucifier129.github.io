define(function (require, exports, module) {
var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({displayName: "Main",
	handleChange: function(e) {
		var checked = e.target.checked
		var todos = this.props.todos
		for (var i = todos.length - 1; i >= 0; i--) {
			todos[i].completed = checked
		}
		this.props.updateTodos(todos)
	},

	render: function() {
		var toggleAll
		if (this.props.allCompleted) {
			toggleAll = React.createElement("input", {id: "toggle-all", type: "checkbox", checked: true, onChange: this.handleChange})
		} else {
			toggleAll = React.createElement("input", {id: "toggle-all", type: "checkbox", onChange: this.handleChange})
		}
		return (
			React.createElement("div", null, 
				toggleAll, 
				React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
				React.createElement(Todos, {todos: this.props.todos, 
					updateTodo: this.props.updateTodo, 
					removeTodo: this.props.removeTodo})
			)
			)
	}
})

module.exports = Main
});