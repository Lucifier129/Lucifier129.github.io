var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({

	checkTodos: function() {
		var todos = this.props.todos
		var allCompleted = true
		for (var i = todos.length - 1; i >= 0; i--) {
			if (!todos[i].completed) {
				allCompleted = false
				break
			}
		}
		return allCompleted
	},

	render: function() {
		return (
			<div>
				<input id="toggle-all" type="checkbox" {this.checkTodos() ? 'check' : ''} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<Todos todos={this.props.todos} />
			</div>
			)
	}
})

module.exports = Main