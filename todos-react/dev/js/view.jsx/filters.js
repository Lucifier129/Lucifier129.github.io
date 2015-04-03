var React = require('react')

var Filters = React.createClass({
	getInitialState: function() {
		return {}
	},

	componentDidMount: function() {
		window.addEventListener('hashchange', this.checkHash.bind(this), false)
		this.checkHash()
	},

	checkHash: function(href) {
		var hash = '/' + location.hash.replace('#/', '')
		var newState = {}

		newState[hash] = true

		this.replaceState(newState)

		this.props.onhashchange(hash)
	},

	getClassName: function(name) {
		return this.state[name] ? 'selected' : ''
	},

	getTodoCount: function() {
		var count = this.props.todoCount
		return count > 0 ? count + ' item left' : ''
	},

	getCompletedCount: function() {
		var count = this.props.completedCount
		return count > 0 ? 'Clear completed (' + count + ')' : ''
	}

	clearCompleted: function() {
		this.props.clearCompleted()
	},

	render: function() {
		return (
			<div style={{display: this.props.display ? 'block' : 'none'}}>
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