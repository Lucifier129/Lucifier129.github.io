define(function (require, exports, module) {
var React = require('react')
var actions = require('../actions')

var Filters = React.createClass({

	getClassName: function(name) {
		return this.props.hash === name ? 'selected' : ''
	},

	getTodoCount: function() {
		var count = this.props.todoCount
		var text = ''
		if (count > 0) {
			text += count + (count > 1 ? ' items left' : ' item left')
		}
		return text
	},

	getCompletedCount: function() {
		var count = this.props.completedCount
		return count > 0 ? 'Clear completed (' + count + ')' : ''
	},

	render: function() {
		return (
			<footer id="footer">
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
				<button id="clear-completed" onClick={actions.clearCompleted}>{this.getCompletedCount()}</button>
			</footer>
			)
	}
})

module.exports = Filters
});