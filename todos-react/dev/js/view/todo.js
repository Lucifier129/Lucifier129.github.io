define(function (require, exports, module) {
var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var Todo = React.createClass({displayName: "Todo",

	getInitialState: function() {
		return {
			onEdit: false
		}
	},
	getClassName: function() {
		var className = []
		if (this.props.completed) {
			className.push('completed')
		}
		if (this.state.onEdit) {
			className.push('editing')
		}
		return className.join(' ')
	},

	handleBlur: function(e) {
		var newTitle = e.target.value.trim()
		this.setState({
			onEdit: false
		})
		if (newTitle && newTitle !== this.props.title) {
			this.updateTodo({
				title: newTitle,
				time: new Date().toLocaleString()
			})
		} else if (!newTitle) {
			this.removeTodo()
		}
	},

	handleKeyup: function(e) {
		var keyCode = e.keyCode
		if (keyCode === ENTER_KEY ||  keyCode === ESCAPE_KEY) {
			this.handleBlur(e)
		}
	},

	handleDblclick: function() {
		var editor = this.refs.editor.getDOMNode()
		editor.value = this.props.title
		this.setState({
			onEdit: true
		})
		setTimeout(editor.focus.bind(editor), 20)
	},

	removeTodo: function() {
		this.props.removeTodo(this.props.id)
	},

	toggleTodo: function(e) {
		this.updateTodo({
			completed: e.target.checked
		})
	},

	updateTodo: function(options) {
		this.props.updateTodo({
			id: this.props.id,
			title: options.title || this.props.title,
			time: options.time || this.props.time,
			completed: options.completed !== undefined ? options.completed : this.props.completed
		})
	},

	render: function() {
		return (
			React.createElement("li", {className: this.getClassName(), title: this.props.time}, 
				React.createElement("div", {className: "view"}, 
					React.createElement("input", {className: "toggle", type: "checkbox", onChange: this.toggleTodo, checked: this.props.completed}), 
					React.createElement("label", {onDoubleClick: this.handleDblclick}, this.props.title), 
					React.createElement("button", {className: "destroy", onClick: this.removeTodo})
				), 
				React.createElement("input", {className: "edit", onBlur: this.handleBlur, onKeyUp: this.handleKeyup, ref: "editor"})
			)
			)
	}
})

module.exports = Todo
});