export let link = (data, selected) => {
	return `<li><a href="${ data.href }" class="${ selected ? 'selected' : '' }">${ data.text }</a></li>`
}

export let activeCount = todoCount => {
	return todoCount
	? `<span id="todo-count">
	${ 
		todoCount > 1 
		? `${ todoCount } items left`
		: `1 item left` 
	}
	</span>`
	: ''
}

export let unactiveCount = completedCount => {
	return completedCount > 0 
	? `<button id="clear-completed">Clear completed (${ completedCount })</button>`
	: ''
}

export default (todoCount, completedCount, activeFilter) => {
	let data = [{
		href: '#/',
		text: 'All'
	}, {
		href: '#/active',
		text: 'Active'
	}, {
		href: '#/completed',
		text: 'Completed'
	}]
	return `
${ activeCount(todoCount) }
<ul id="filters">
${ data.map(item => link(item, activeFilter === item.href)).join('') }
</ul>
${ unactiveCount(completedCount) }
	`
}