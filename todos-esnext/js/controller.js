/**
 * controller.js
 */

var app = app || {};

(function(app) {

	var tools = app.tools
	var ENTER_KEY = 13
	var ESCAPE_KEY = 27

	function Controller(View, Model) {
		this.View = View
		this.Model = Model
	}

	Controller.prototype.init = function() {
		this.model = new this.Model('todos-simple')
		this.todoList = new this.View.TodoList('#todo-list')
		this.todoCount = new this.View.Counter('#todo-count', countActive)
		this.clearCompleted = new this.View.Counter('#clear-completed', countCompleted)
		this.footer = new this.View.Footer('#footer')
		this.toggleAll = new this.View.ToogleAll('#toggle-all')
		this.filters = new this.View.Filters('#filters')

		function countActive(count) {
			return count + ' item left'
		}

		function countCompleted(count) {
			return 'Clear completed (' + count + ')'
		}

		this.listen()

		return this
	}

	Controller.prototype.route = function(hash) {
		var mapping = {
			'/': 'getAll',
			'/active': 'getActive',
			'/completed': 'getCompleted'
		}

		if (!mapping.hasOwnProperty(hash)) {
			return
		}

		var data = {}

		for (var key in mapping) {
			if (mapping.hasOwnProperty(key)) {
				data[key] = this.model[mapping[key]]()
			}
		}

		var total = data['/'].length
		var activeAmount = data['/active'].length
		var completedAmount = data['/completed'].length

		this.todoList.render(data[hash])
		this.toggleAll.render(total, completedAmount)
		this.footer.render(total)
		this.todoCount.render(activeAmount)
		this.clearCompleted.render(completedAmount)
		this.filters.render(hash)
	}

	Controller.prototype.update = function() {
		var hash = '/' + location.hash.replace('#/', '')
		this.route(hash)
	}

	Controller.prototype.listen = function() {
		var that = this

		function newTodo(elem) {
			var value = elem.value.trim()
			if (!value || value === elem.defaultValue) {
				return
			}
			elem.value = ''
			var data = new Date()
			that.model.addTodo({
				id: data.getTime(),
				time: data.toLocaleString(),
				completed: false,
				title: value
			})
			that.update()
		}

		tools.$listen('change', '#new-todo', function() {
			newTodo(this)
		})

		tools.$listen('keyup', '#new-todo', function(e) {
			if (e.keyCode === ENTER_KEY) {
				newTodo(this)
			}
		})

		function editing(editor) {
			var todoElem = editor.parentNode
			var label = tools.$('label', todoElem)
			var value = editor.value.trim()
			var id = todoElem.dataset['id']
			if (!value) {
				that.model.removeTodo(id)
				that.update()
			} else if (value !== label.textContent) {
				var todo = that.model.getTodo(id)
				todo.title = label.textContent = value
			}
			todoElem.classList.remove('editing')
		}

		function blur() {
			this.onblur = null
			editing(this)
		}

		tools.$listen('dblclick', '#todo-list label', function() {
			var todoElem = this.parentNode.parentNode
			var label = tools.$('label', todoElem)
			var edit = tools.$('.edit', todoElem)

			todoElem.classList.add('editing')
			edit.value = label.textContent
			edit.onblur = blur
			edit.focus()
		})

		tools.$listen('change', '#todo-list .edit', function() {
			editing(this)
		})

		tools.$listen('keyup', '#todo-list .edit', function(e) {
			var keyCode = e.keyCode

			if (keyCode === ESCAPE_KEY || keyCode === ENTER_KEY) {
				editing(this)
			}
		})

		tools.$listen('change', '#todo-list .toggle', function() {
			var elem = this.parentNode.parentNode
			var todoElem = new that.View.TodoElem(elem)
			var id = todoElem.getId()
			var todo = that.model.getTodo(id)
			todo.completed = this.checked
			that.update()

		})

		tools.$listen('change', '#toggle-all', function() {
			var status = this.checked
			var todos = that.model.getAll()
			todos.forEach(function(todo) {
				todo['completed'] = status
			})
			that.update()
		})

		tools.$listen('click', '#todo-list .destroy', function() {
			var elem = this.parentNode.parentNode
			var todoElem = new that.View.TodoElem(elem)
			var id = todoElem.getId()
			that.model.removeTodo(id)
			that.update()
		})

		tools.$listen('click', '#clear-completed', function() {
			var todos = that.model.getAll()
			for (var i = todos.length - 1; i >= 0; i--) {
				if (todos[i].completed) {
					todos.splice(i, 1)
				}
			}
			that.update()
		})

		document.addEventListener('DOMContentLoaded', this.update.bind(this), false)
		window.addEventListener('hashchange', this.update.bind(this), false)
		window.addEventListener('beforeunload', this.model.save.bind(this.model), false)
	}

	app.Controller = Controller

}(app));