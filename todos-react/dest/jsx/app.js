define(function (require, exports, module) {
	var View = require('./view/view')
	var Model = require('./model')
	var React = require('react')

	function APP(View, Model) {
		this.View = View
		this.Model = Model
	}

	APP.prototype = {
		init: function() {
			this.model = new this.Model('todos-react')
			window.addEventListener('hashchange', this.render.bind(this), false)
			window.addEventListener('unload', this.model.save.bind(this.model), false)
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
		addTodo: function(newTodo) {
			this.model.addTodo(newTodo)
			this.render()
		},
		toggleAll: function(completed) {
			this.model.setStateForAll(completed)
			this.render()
		},
		updateTodo: function(todo) {
			this.model.updateTodo(todo)
			this.render()
		},
		removeTodo: function(id) {
			this.model.removeTodo(id)
			this.render()
		},
		clearCompleted: function() {
			this.model.clearCompleted()
			this.render()
		},

		render: function() {
			var View = this.View

			var props = {
				//actions
				addTodo: this.addTodo.bind(this),
				updateTodo: this.updateTodo.bind(this),
				removeTodo: this.removeTodo.bind(this),
				clearCompleted: this.clearCompleted.bind(this),
				toggleAll: this.toggleAll.bind(this),
				//data
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

	module.exports = new APP(View, Model)

});