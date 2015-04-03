var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({
	render: function() {
		return (
			<div>
				<input id="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<Todos />
			</div>
			)
	}
})

module.exports = Main