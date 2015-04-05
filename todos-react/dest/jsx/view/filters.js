define(function (require, exports, module) {
var React = require('react')

var Filters = React.createClass({

	getClassName: function(name) {
		return this.props.hash === name ? 'selected' : ''
	},

	getTodoCount: function() {
		var count = this.props.todoCount
		return count > 0 ? count + ' item left' : ''
	},

	getCompletedCount: function() {
		var count = this.props.completedCount
		return count > 0 ? 'Clear completed (' + count + ')' : ''
	},

	clearCompleted: function() {
		this.props.clearCompleted()
	},

	render: function() {
		return (
			<div>
				<span id="todo-count">{this.getTodoCount()}</span>
				<ul id="filters">
					<li>
						<a href="#/" className={this.getClassName('/')}>All</a>
					</li>
					<li>
						<a href="#/active" className={this.getClassName('/active')}>Active</a>
					</li>
					<li>
						<a href="#/completed" className={this.getClassName('/completed')}>Completed</a>
					</li>
				</ul>
				<button id="clear-completed" onClick={this.clearCompleted}>{this.getCompletedCount()}</button>
			</div>
			)
	}
})

module.exports = Filters
});