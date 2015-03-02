/**
* model.js
*/
$.app = $.app || {};

(function(app) {

	function Model(name) {
		var item = localStorage.getItem(name)
		this.todos = item ? JSON.parse(item) : []
		this.name = name
	}

	Model.prototype = {
		$find: function(query) {
			var result = []
			this.todos.forEach(function(todo) {
				if (todo[query.name] == query.value) {
					result.push(todo)
				}
			})
			return result
		},
		getTodo: function(id) {
			var todos = this.todos
			var todo
			for (var i = todos.length - 1; i >= 0; i--) {
				todo = todos[i]
				if (todo.id == id) {
					return todo
				}
			}
		},
		getAll: function() {
			return this.todos
		},
		getActive: function() {
			return this.$find({
				name: 'completed',
				value: false
			})
		},
		getCompleted: function() {
			return this.$find({
				name: 'completed',
				value: true
			})
		},
		addTodo: function(title) {
			var data = new Date()
			this.todos.push({
				id: data.getTime(),
				time: data.toLocaleString(),
				completed: false,
				title: title
			})
		},
		removeTodo: function(id) {
			var todo = this.getTodo(id)
			var index = this.todos.indexOf(todo)
			if (index >= 0) {
				this.todos.splice(index, 1)
			}
		},
		save: function() {
			localStorage.setItem(this.name, JSON.stringify(this.todos))
		}
	}

	app.Model = Model

}($.app));