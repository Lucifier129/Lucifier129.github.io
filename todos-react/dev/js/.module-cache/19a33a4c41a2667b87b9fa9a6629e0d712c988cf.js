define(function (require, exports, module) {
var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({displayName: "Main",
	handleChange: function(e) {
		var checked = e.target.checked
		this.props.toggleAll(checked)
	},

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("input", {id: "toggle-all", type: "checkbox", onChange: this.handleChange, checked: this.props.isAllCompleted}), 
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