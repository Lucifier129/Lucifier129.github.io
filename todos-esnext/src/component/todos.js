import todo from 'component/todo'

export default data => {
	return `
<ul id="todo-list">
	${ data.map(todo).join('') }
</ul>
	`
}