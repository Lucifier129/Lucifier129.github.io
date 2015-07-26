import template from './template'

let cache

export let todo = function(model) {
	let html = template(model)
	if (cache !== html) {
		this.innerHTML = html
		cache = html
	}
}