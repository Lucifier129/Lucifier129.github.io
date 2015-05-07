define(function (require, exports, module) {
var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({
	handleChange: function(e) {
		this.props.toggleAll(e.target.checked)
	},

	render: function() {
		return (
			<section id="main">
				<input id="toggle-all" type="checkbox" onChange={this.handleChange} checked={this.props.isAllCompleted} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<Todos todos={this.props.todos}
					updateTodo={this.props.updateTodo}
					removeTodo={this.props.removeTodo} />
			</section>
			)
	}
})

module.exports = Main
});