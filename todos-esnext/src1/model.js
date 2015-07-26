/**
 * model.js
 */
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
    onchange: function() {},
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
    setStateForAll: function(completed) {
        var todos = this.todos
        for (var i = todos.length - 1; i >= 0; i--) {
            todos[i].completed = completed
        }
        this.onchange()
    },
    addTodo: function(title) {
        var now = new Date()
        this.todos.push({
            id: now.getTime(),
            time: now.toLocaleString(),
            title: title,
            completed: false
        })
        this.onchange()
    },
    removeTodo: function(id) {
        var todo = this.getTodo(id)
        var index = this.todos.indexOf(todo)
        if (index >= 0) {
            this.todos.splice(index, 1)
        }
        this.onchange()
    },
    updateTodo: function(todo) {
        var target = this.getTodo(todo.id)
        for (var key in todo) {
            if (todo.hasOwnProperty(key)) {
                target[key] = todo[key]
            }
        }
        this.onchange()
    },
    clearCompleted: function() {
        var todos = this.todos
        for (var i = todos.length - 1; i >= 0; i--) {
            var todo = todos[i]
            if (todo.completed) {
                todos.splice(i, 1)
            }
        }
        this.onchange()
    },
    isAllCompleted: function() {
        var isAllCompleted = true
        var todos = this.todos
        if (todos.length === 0) {
            return false
        }
        for (var i = todos.length - 1; i >= 0; i--) {
            if (!todos[i].completed) {
                isAllCompleted = false
                break
            }
        }
        return isAllCompleted
    },
    save: function() {
        localStorage.setItem(this.name, JSON.stringify(this.todos))
    }
}

export default Model
