var React = require('react')

var Todo = React.createClass({
	render: function() {
		return (
			<li>
				<div>
					<input className="toggle" type="checkbox" />
						<label></label>
						<button className="destroy"></button>
				</div>
				<input className="edit" />
			</li>
			)
	}
})

var Todos = React.createClass({
	render: function() {
		return (
			<ul id="todo-list">
				<Todo />
			</ul>
			)
	}
})

var Main = React.createClass({
	render: function() {
		return (
			<div>
				<input id="toggle-all" type="checkbox" />
				<label htmlFor="toggle-all">Mark all as complete</label>
				<Todos />
			</div>
			)
	}
})

var ENTER_KEY = 13
var ESCAPE_KEY = 27


var NewTodo = React.createClass({

	render: function() {
		return (
			<div>
				<h1>todos</h1>
				<input id="new-todo" placeholder="What needs to be done?" autofocus />
			</div>
			)
	}
})

var Filters = React.createClass({
	render: function() {
		return (
			<div>
				<span id="todo-count"></span>
				<ul id="filters">
					<li>
						<a href="#/" className="selected">All</a>
					</li>
					<li>
						<a href="#/active">Active</a>
					</li>
					<li>
						<a href="#/completed">Completed</a>
					</li>
				</ul>
				<button id="clear-completed"></button>
			</div>
			)
	}
})


exports.init = function() {
	React.render(
		<NewTodo />,
		document.getElementById('header')
		)

	React.render(
		<Main />,
		document.getElementById('main')
		)

	React.render(
		<Filters />,
		document.getElementById('footer')
		)
}

