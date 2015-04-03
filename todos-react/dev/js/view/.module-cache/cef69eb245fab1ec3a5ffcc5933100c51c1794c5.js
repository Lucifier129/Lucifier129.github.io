define(function (require, exports, module) {
var React = require('react')
var Todo = require('./todo')

var Todos = React.createClass({displayName: "Todos",
	render: function() {
		return (
			React.createElement("ul", {id: "todo-list"}, 
				React.createElement(Todo, null)
			)
			)
	}
})

module.exports = Todos
});