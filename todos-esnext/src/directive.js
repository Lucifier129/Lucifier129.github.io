import { find, each, attr, into, addClass, removeClass, equal } from './helper'
import * as component from 'component'

export default {
	todoCount(count) {
		if (count::equal(0)) {
			''::into(this)
		} else if (count::equal(1)) {
			'1 item left'::into(this)
		} else if (count > 1) {
			`${ count } items left`::into(this)
		}
	},
	clearCompleted(amount) {
		if (amount::equal(0)) {
			''::into(this)
		} else if (amount >= 1) {
			`Clear completed (${ amount })`::into(this)
		}
	},
	filters(activeFilters) {
		this
			::find('a')
			::each(link => {
				if (link::attr('href')::equal(`#${ activeFilters }`)) {
					link::addClass('selected')
				} else {
					link::removeClass('selected')
				}
		})
	},
	toggleAll(checked) {
		this.checked = !!checked
	},
	todoList(data) {
		component.todos(data)::into(this)
	}
}