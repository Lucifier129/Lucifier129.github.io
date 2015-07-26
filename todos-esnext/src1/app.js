import { $, $all, $find, on, listen, html, isStr, isObj, isFn, isBln, isArr } from 'helper'
import * as component from 'component'
import Model from './model'

const ENTER_KEY = 13
const ESCAPE_KEY = 27

class App {
	constructor() {
		this.cache = {}
		this.model = new Model('todos-esnext')
		this.model.onchange = ::this.render
		this.listen()
	}

	render() {
		let hash = location.hash
		let mapping = {
			'#/': 'getAll',
			'#/active': 'getActive',
			'#/completed': 'getCompleted'
		}

		if (!mapping.hasOwnProperty(hash)) {
			return
		}

		let data = {}
		for (let key in mapping) {
			if (mapping.hasOwnProperty(key)) {
				data[key] = this.model[mapping[key]]()
			}
		}

		let total = data['#/'].length
		let activeAmount = data['#/active'].length
		let completedAmount = data['#/completed'].length

		let todoList = component.todos(data[hash])
		let footer = component.footer(activeAmount, completedAmount, hash)

		if (this.cache['#todo-list'] !== todoList) {
			'#todo-list'::html(todoList)
			this.cache['#todo-list'] = todoList
		}

		if (this.cache['#footer'] !== footer) {
			'#footer'::html(footer)
			this.cache['#footer'] = footer
		}

		'#toggle-all'::$().checked = total > 0 && completedAmount === total
	}
	listen() {
		let { model } = this
		let newTodo = function () {
			let value = this.value.trim()
			if (!value || value === this.defaultValue) {
				return
			}
			model.addTodo(value)
			this.value = ''
		}
		let editing = function () {
			let todoElem = this.parentNode
			let label = todoElem::$find('label')
			let value = this.value.trim()
			let id = todoElem.dataset['id']
			if (!value) {
				model.removeTodo(id)
			} else if (value !== label.textContent) {
				let todo = model.getTodo(id)
				todo.title = label.textContent = value
			}
			todoElem.classList.remove('editing')
		}
		let blur = function () {
			this.onblur = null
			this::editing()
		}
		let dblclick = e => {
			let todoElem = e.target.parentNode.parentNode
			let label = todoElem::$find('label')
			let edit = todoElem::$find('.edit')
			todoElem.classList.add('editing')
			edit.value = label.textContent
			edit.onblur = blur
			edit.focus()
		}
		let keyup = e => {
			let keyCode = e.keyCode
			if (keyCode === ESCAPE_KEY || keyCode === ENTER_KEY) {
				e.target::editing()
			}
		}
		let change = e => {
			let elem = e.target.parentNode.parentNode
			let todo = model.getTodo(elem.dataset.id)
			todo.completed = e.target.checked
			this.render()
		}
		let click = e => {
			let elem = e.target.parentNode.parentNode
			model.removeTodo(elem.dataset.id)
		}

		window::on('hashchange', ::this.render)
		window::on('DOMContentLoaded', ::this.render)
		window::on('unload', ::model.save)
		
		'change : #new-todo'::listen(e => e.target::newTodo())
		'change : #todo-list .edit'::listen(e => e.target::editing())
		'click : #clear-completed'::listen(e => model.clearCompleted())
		'keyup : #new-todo'::listen(e => e.keyCode === ENTER_KEY && e.target::newTodo())
		'change : #toggle-all'::listen(e => model.setStateForAll(e.target.checked))
		'dblclick : #todo-list label'::listen(dblclick)
		'keyup : #todo-list .edit'::listen(keyup)
		'change : #todo-list .toggle'::listen(change)
		'click : #todo-list .destroy'::listen(click)
	}
}

new App()