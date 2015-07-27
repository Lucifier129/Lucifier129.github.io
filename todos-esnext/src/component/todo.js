export default data => {
	let { completed, time, id, title } = data
	return `
<li class="${ completed }" data-id="${ id }" data-helper="todo" title="${ time }">
	<div class="view">
		<input class="toggle" type="checkbox" ${ completed ? 'checked' : '' }>
				<label>${ title }</label>
				<button class="destroy"></button>
	</div>
	<input class="edit">
</li>
	`
}