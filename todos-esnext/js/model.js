/**
* model.js
*/
var app = app || {};

(function(app) {

	function Model(name) {
		this.name = name
		this.todos = localStorage.getItem(name)
		if (this.todos) {
			this.todos = JSON.parse(this.todos)
		} else {
			this.todos = []
		}
	}

	Model.prototype = {
		$find: function(query) {
			var result = []
			var todo
			this.todos.forEach(function(todo) {
				if (todo[query.name] == query.value) {
					result.push(todo)
				}
			})
			return result
		},
		getTodo: function(id) {
			return this.$find({
				name: 'id',
				value: id
			})[0]
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
		addTodo: function(todo) {
			this.todos.push(todo)
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

}(app));