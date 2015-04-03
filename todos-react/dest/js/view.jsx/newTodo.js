var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var NewTodo = React.createClass({

	render: function() {
		return (
			<div>
				<h1>todos</h1>
				<input id="new-todo" placeholder="What needs to be done?" autofocus />
			</div>
			)
	}
})

module.exports = NewTodo