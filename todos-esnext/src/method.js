import { find } from './helper'

export let onAdd = function() {
    let value = this.value.trim()
    if (!value || value === this.defaultValue) {
        return
    }
    this.value = ''
    return {
        type: 'add',
        title: value
    }
}

export let onEdited = function() {
    let todoElem = this.parentNode
    let label = todoElem::find('label')
    let value = this.value.trim()
    let id = todoElem.dataset['id']
    todoElem.classList.remove('editing')
    if (!value) {
        return {
            type: 'remove',
            id
        }
    } else if (value !== label.textContent) {
        label.textContent = value
        return {
            type: 'update',
            id,
            title: value
        }
    }
}

let blur = function() {
    this.onblur = null
    this::onEdited()
}

export let onEditing = function() {
    let root = this.parentNode.parentNode
    let edit = root::find('.edit')[0]
    root.classList.add('editing')
    edit.value = this.textContent
    edit.onblur = blur
    edit.focus()
}

export let onToggle = function() {
    let todoElem = this.parentNode.parentNode
    return {
        type: 'toggle',
        id: todoElem.dataset.id,
        completed: this.checked
    }
}

export let onRemove = function() {
    let elem = this.parentNode.parentNode
    return {
    	type: 'remove',
    	id: elem.dataset.id
    }
}
