define(function (require, exports, module) {
var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

var View = React.createClass({displayName: "View",
	render: function() {
		return (React.createElement("div", null, 
					React.createElement(NewTodo, {addTodo: this.props.addTodo}), 
					React.createElement(Main, {
						isAllCompleted: this.props.isAllCompleted, 
						todos: this.props.todos, 
						toggleAll: this.props.toggleAll, 
						updateTodo: this.props.updateTodo, 
						removeTodo: this.props.removeTodo}), 
					React.createElement(Filters, {
						hash: this.props.hash, 
						clearCompleted: this.props.clearCompleted, 
						completedCount: this.props.completedCount, 
						todoCount: this.props.todoCount})
				))
	}
})


module.exports = View
});