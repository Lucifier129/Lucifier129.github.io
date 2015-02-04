/**
 * view.js
 */
var app = app || {};

(function(app) {

	var tools = app.tools

	var todoTemplate =
		'<li class="{{ completed }}" data-id="{{ id }}" title="{{ time }}">\
			<div class="view">\
				<input class="toggle" type="checkbox" {{ checked }}>\
				<label>{{ title }}</label>\
				<button class="destroy"></button>\
			</div>\
			<input class="edit">\
		</li>'

	function TodoList(id) {
		this.id = id
	}

	TodoList.prototype = {
		template: todoTemplate,
		complie: function(todo) {
			return this.template
				.replace('{{ id }}', todo.id || '')
				.replace('{{ completed }}', todo.completed ? 'completed' : '')
				.replace('{{ checked }}', todo.completed ? 'checked' : '')
				.replace('{{ title }}', todo.title || '')
				.replace('{{ time }}', todo.time || '')
		},
		render: function(todos) {
			var content = ''
			todos.forEach(function(todo) {
				content += this.complie(todo)
			}.bind(this))
			tools.$(this.id).innerHTML = content
		}
	}

	function TodoElem(elem) {
		this.elem = elem
	}

	TodoElem.prototype.getId = function() {
		return this.elem.dataset['id']
	}

	function Counter(id, callback) {
		this.id = id
		this.callback = callback
	}

	Counter.prototype.render = function(count) {
		var elem = tools.$(this.id)
		if (!count) {
			elem.style.display = 'none'
		} else {
			elem.textContent = this.callback(count)
			elem.style.display = 'block'
		}
	}

	function Footer(id) {
		this.id = id
	}

	Footer.prototype.render = function(total) {
		var elem = tools.$(this.id)
		if (!total) {
			elem.style.display = 'none'
		} else {
			if (elem.style.display === 'none') {
				elem.style.display = 'block'
			}
		}
	}

	function ToogleAll(id) {
		this.id = id
	}

	ToogleAll.prototype.render = function(all, completed) {
		var elem = tools.$(this.id)
		if (!all || all !== completed) {
			elem.removeAttribute('checked')
			elem.checked = false
		} else if (all === completed) {
			elem.setAttribute('checked', 'checked')
			elem.checked = true
		}
	}

	function Filters(id) {
		this.id = id
	}

	Filters.prototype.render = function(hash) {
		var selected = tools.$(this.id + ' .selected')
		selected.classList.remove('selected')
		var target = tools.$(this.id + ' [href="#' + hash + '"]')
		target.classList.add('selected')
	}

	app.View = {
		TodoList: TodoList,
		TodoElem: TodoElem,
		Counter: Counter,
		Footer: Footer,
		ToogleAll: ToogleAll,
		Filters: Filters
	}

}(app));