/**
 * model.js
 */
export default class Model {
    constructor() {
        this.name = name
        Object.defineProperty(this, 'todos', {
            get() {
                return JSON.parse(localStorage.getItem(this.name) || '')
            },
            set(todos) {
                return localStorage.setItem(this.name, JSON.stringify(todos))
            }
        })
    }
    getTodos() {
        return this.todos
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
    getCompleted() {
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
    getActive() {
        return this.find({
            name: 'completed',
            value: false
        })
    }
    toggleAll(state) {
        let todos = this.getTodos()
        if (todos.length === 0) {
            return false
        }
        todos.forEach((todo) => {
            todo.completed = state
        })
        return true
    }
    isAllCompleted() {
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
    getData(hash) {
        let mapping = {
            '/': 'getTodos',
            '/active': 'getActive',
            '/completed': 'getCompleted'
        }
        return {
            hash: hash,
            isAllCompleted: this.isAllCompleted(),
            completedCount: this.getCompleted().length,
            todoCount: this.getActive().length,
            todos: this[mapping[hash]]()
        }
    }
}
