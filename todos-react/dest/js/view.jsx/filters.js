var React = require('react')

var Filters = React.createClass({
	render: function() {
		return (
			<div>
				<span id="todo-count"></span>
				<ul id="filters">
					<li>
						<a href="#/" className="selected">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button id="clear-completed"></button>
			</div>
			)
	}
})

module.exports = Filters