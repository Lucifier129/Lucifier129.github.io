define(function (require, exports, module) {
var React = require('react')
var Todos = require('./todos')
var actions = require('../actions')
var Main = React.createClass({
	handleChange: function(e) {
		actions.toggleAll(e.target.checked)
	},

	render: function() {
		return (
			<section id="main">
				<input id="toggle-all" type="checkbox" onChange={this.handleChange} checked={this.props.isAllCompleted} />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<Todos todos={this.props.todos} />
			</section>
			)
	}
})

module.exports = Main
});