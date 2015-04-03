var React = require('react')

var ENTER_KEY = 13
var ESCAPE_KEY = 27

var Todo = React.createClass({

	getInitialState: function() {
		return {
			title: this.props.title,
			time: this.props.time,
			completed: this.props.completed,
			onEdit: false
		}
	},
	getClassName: function() {
		var className = ['view']
		if (this.state.completed) {
			className.push('completed')
		}
		if (this.state.onEdit) {
			className.push('edit')
		}
		return className.join(' ')
	},

	handleBlur: function(e) {
		var newTitle = e.target.value.trim()
		var newState = {
			onEdit: false
		}
		if (newTitle && newTitle !== this.state.title) {
			newState.title = newTitle
			newState.time = new Date().toLocaleString()
			this.updateTodo({
				title: newTitle,
				time: time
			})
		}
		this.setState(newState)
	},

	handleKeyup: function(e) {
		var keyCode = e.keyCode
		if (keyCode === ENTER_KEY ||  keyCode === ESCAPE_KEY) {
			this.handleBlur(e)
		}
	},

	handleDblclick: function() {
		var editor = this.refs.editor.getDOMNode()
		editor.value = this.state.title
		editor.focus()
		this.setState({
			onEdit: true
		})
	},

	removeTodo: function() {
		this.props.removeTodo(this.props.id)
	},

	toggleTodo: function(e) {
		var options = {
			completed: e.target.checked
		}
		this.setState(options)
		this.updateTodo(options)
	},

	updateTodo: function(options) {
		this.props.updateTodo({
			id: this.props.id,
			title: options.title || this.state.title,
			time: options.time || this.state.time,
			completed: options.completed || this.state.completed
		})
	},

	render: function() {
		return (
			<li className={this.getClassName()}>
				<div>
					<input className="toggle" type="checkbox" onChange={this.toggleTodo} {this.state.completed ? 'checked' : ''} />
					<label onDoubleClick={this.handleDblclick}>{this.state.title}</label>
					<button className="destroy" onClick={this.removeTodo}></button>
				</div>
				<input className="edit" onBlur={this.handleBlur} onKeyup={this.props.editorKeyup} ref="editor" />
			</li>
			)
	}
})

module.exports = Todo