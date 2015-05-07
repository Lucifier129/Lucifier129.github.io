define(function (require, exports, module) {
var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var NewTodo = React.createClass({displayName: "NewTodo",

	handleBlur: function(e) {
		var title = e.target.value.trim()
		if (title) {
			var now = new Date()
			this.props.addTodo({
				id: now.getTime(),
				time: now.toLocaleString(),
				title: title,
				completed: false
			})
			e.target.value = ''
		}
	},

	handleKeyup: function(e) {
		var keyCode = e.keyCode
		if (keyCode === ENTER_KEY || keyCode === ESCAPE_KEY) {
			this.handleBlur(e)
		}
	},

	render: function() {
		return (
			React.createElement("header", {id: "header"}, 
				React.createElement("h1", null, "todos"), 
				React.createElement("input", {
					id: "new-todo", 
					placeholder: "What needs to be done?", 
					onBlur: this.handleBlur, 
					onKeyUp: this.handleKeyup, 
					autofocus: true})
			)
			)
	}
})

module.exports = NewTodo
});