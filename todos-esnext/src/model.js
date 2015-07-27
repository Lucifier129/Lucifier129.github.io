import { isObject } from './helper'

export default class Model {
    constructor(name) {
        this.name = name
        this.todos = JSON.parse(localStorage.getItem(this.name) || '[]')
    }
    save() {
        localStorage.setItem(this.name, JSON.stringify(this.todos))
    }
    onAction(action) {
        if (!action::isObject()) {
            return
        }
        let hasChange = true
        switch (action.type) {
            case 'add':
                this.addTodo(action.title)
                break
            case 'remove':
                this.removeTodo(action.id)
                break
            case 'update':
                this.updateTodo({
                    id: action.id,
                    title: action.title
                })
                break
            case 'toggle':
                this.updateTodo({
                    id: action.id,
                    completed: action.completed
                })
                break
            case 'clear':
                this.clearCompleted()
                break
            case 'toggleAll':
                this.toggleAll(action.completed)
                break
            default:
                hasChange = false
        }
        hasChange && this.save()
    }
    addTodo(title) {
        let now = new Date()
        let todo = {
            id: now.getTime(),
            title: title,
            time: now.toLocaleDateString(),
            completed: false
        }
        this.todos.push(todo)
        return todo
    }
    find(query) {
        let result = []
        this.todos.forEach((todo) => {
            if (todo[query.name] == query.value) {
                result.push(todo)
            }
        })
        return result
    }
    getTodo(id) {
        return this.find({
            name: 'id',
            value: id
        })[0]
    }
    removeTodo(id) {
        let index = this.todos.indexOf(this.getTodo(id))
        if (index >= 0) {
            this.todos.splice(index, 1)
        }
    }
    updateTodo(newTodo) {
        let todo = this.getTodo(newTodo.id)
        if (todo) {
            Object.assign(todo, newTodo)
            return todo
        }
    }
    get completeds() {
        return this.find({
            name: 'completed',
            value: true
        })
    }
    clearCompleted() {
        let todos = this.todos
        if (todos.length === 0) {
            return false
        }
        for (let i = todos.length - 1; i >= 0; i--) {
            let todo = todos[i]
            if (todo.completed) {
                todos.splice(i, 1)
            }
        }
        return true
    }
    get actives() {
        return this.find({
            name: 'completed',
            value: false
        })
    }
    toggleAll(state) {
        let todos = this.todos
        if (todos.length === 0) {
            return false
        }
        todos.forEach((todo) => {
            todo.completed = state
        })
        return true
    }
    get isAllCompleted() {
        let isAllCompleted = true
        let todos = this.todos
        if (todos.length === 0) {
            return false
        }
        for (let i = todos.length - 1; i >= 0; i--) {
            if (!todos[i].completed) {
                isAllCompleted = false
                break
            }
        }
        return isAllCompleted
    }
    getData(activeFilter) {
        let mapping = {
            '/': 'todos',
            '/active': 'actives',
            '/completed': 'completeds'
        }
        return {
            filters: activeFilter,
            toggleAll: this.isAllCompleted,
            clearCompleted: this.completeds.length,
            todoCount: this.actives.length,
            todoList: this[mapping[activeFilter]]
        }
    }
}
