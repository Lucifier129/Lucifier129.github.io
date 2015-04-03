define(function (require, exports, module) {
var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var NewTodo = React.createClass({displayName: "NewTodo",

	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "todos"), 
				React.createElement("input", {id: "new-todo", placeholder: "What needs to be done?", autofocus: true})
			)
			)
	}
})

module.exports = NewTodo
});