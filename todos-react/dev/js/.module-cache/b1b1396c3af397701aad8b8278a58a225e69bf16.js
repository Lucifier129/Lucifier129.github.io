define(function(require, exports, module) {
	var React = require('react')

	var Todo = React.createClass({
		displayName: "Todo",
		render: function() {
			return (
				React.createElement("li", null,
					React.createElement("div", null,
						React.createElement("input", {
							className: "toggle",
							type: "checkbox"
						}),
						React.createElement("label", null),
						React.createElement("button", {
							className: "destroy"
						})
					),
					React.createElement("input", {
						className: "edit"
					})
				)
			)
		}
	})

	var Todos = React.createClass({
		displayName: "Todos",
		render: function() {
			return (
				React.createElement("ul", {
						id: "todo-list"
					},
					React.createElement(Todo, null)
				)
			)
		}
	})

	var Main = React.createClass({
		displayName: "Main",
		render: function() {
			return (
				React.createElement("div", null,
					React.createElement("input", {
						id: "toggle-all",
						type: "checkbox"
					}),
					React.createElement("label", {
						htmlFor: "toggle-all"
					}, "Mark all as complete"),
					React.createElement(Todos, null)
				)
			)
		}
	})

	var ENTER_KEY = 13
	var ESCAPE_KEY = 27


	var NewTodo = React.createClass({
		displayName: "NewTodo",

		render: function() {
			return (
				React.createElement("div", null,
					React.createElement("h1", null, "todos"),
					React.createElement("input", {
						id: "new-todo",
						placeholder: "What needs to be done?",
						autofocus: true
					})
				)
			)
		}
	})

	var Filters = React.createClass({
		displayName: "Filters",
		render: function() {
			return (
				React.createElement("div", null,
					React.createElement("span", {
						id: "todo-count"
					}),
					React.createElement("ul", {
							id: "filters"
						},
						React.createElement("li", null,
							React.createElement("a", {
								href: "#/",
								className: "selected"
							}, "All")
						),
						React.createElement("li", null,
							React.createElement("a", {
								href: "#/active"
							}, "Active")
						),
						React.createElement("li", null,
							React.createElement("a", {
								href: "#/completed"
							}, "Completed")
						)
					),
					React.createElement("button", {
						id: "clear-completed"
					})
				)
			)
		}
	})


	exports.init = function() {
		React.render(
			React.createElement(NewTodo, null),
			document.getElementById('header')
		)

		React.render(
			React.createElement(Main, null),
			document.getElementById('main')
		)

		React.render(
			React.createElement(Filters, null),
			document.getElementById('footer')
		)
	}


})