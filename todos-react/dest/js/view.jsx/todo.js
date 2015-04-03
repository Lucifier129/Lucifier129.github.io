var React = require('react')

var Todo = React.createClass({
	render: function() {
		return (
			<li>
				<div>
					<input className="toggle" type="checkbox" />
						<label></label>
						<button className="destroy"></button>
				</div>
				<input className="edit" />
			</li>
			)
	}
})

module.exports = Todo