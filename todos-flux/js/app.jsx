var View = require('./component/view')
var Model = require('./model')
var React = require('react')
var todoDispatcher = require('./todoDispatcher')

function APP(View, Model) {
	this.View = View
	this.Model = Model
}

APP.prototype = {
	init: function() {
		this.model = new this.Model('todos-react')
		window.addEventListener('hashchange', this.render.bind(this), false)
		window.addEventListener('unload', this.model.save.bind(this.model), false)
		this.register()
		this.render()
	},

	getTodosByHash: function() {
		var hash = '/' + location.hash.replace('#/', '')
		var mapping = {
			'/': 'getAll',
			'/active': 'getActive',
			'/completed': 'getCompleted'
		}
		return this.model[mapping[hash]]()
	},
	register: function() {
		var model = this.model
		var that = this
		todoDispatcher.register(function(action) {
			switch (action.actionType) {
				case 'addTodo':
					model.addTodo(action.title)
					break
				case 'toggleAll':
					model.setStateForAll(action.completed)
					break
				case 'updateTodo':
					model.updateTodo(action.todo)
					break
				case 'removeTodo':
					model.removeTodo(action.id)
					break
				case 'clearCompleted':
					model.clearCompleted()
					break
			}
			console.log(action)
			that.render()
		})
	},

	render: function() {
		var View = this.View

		var props = {
			hash: '/' + location.hash.replace('#/', ''),
			completedCount: this.model.getCompleted().length,
			todoCount: this.model.getActive().length,
			todos: this.getTodosByHash()
		}

		React.render(
			<View {...props} />,
			document.getElementById('todoapp')
		)
	}
}

new APP(View, Model).init()