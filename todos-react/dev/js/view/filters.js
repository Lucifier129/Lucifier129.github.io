define(function (require, exports, module) {
var React = require('react')

var Filters = React.createClass({displayName: "Filters",

	getClassName: function(name) {
		return this.props.hash === name ? 'selected' : ''
	},

	getTodoCount: function() {
		var count = this.props.todoCount
		var text = ''
		if (count > 0) {
			text += count + (count > 1 ? ' items left' : ' item left')
		}
		return text
	},

	getCompletedCount: function() {
		var count = this.props.completedCount
		return count > 0 ? 'Clear completed (' + count + ')' : ''
	},

	render: function() {
		return (
			React.createElement("footer", {id: "footer"}, 
				React.createElement("span", {id: "todo-count"}, this.getTodoCount()), 
				React.createElement("ul", {id: "filters"}, 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/", className: this.getClassName('/')}, "All")
					), 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/active", className: this.getClassName('/active')}, "Active")
					), 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/completed", className: this.getClassName('/completed')}, "Completed")
					)
				), 
				React.createElement("button", {id: "clear-completed", onClick: this.props.clearCompleted}, this.getCompletedCount())
			)
			)
	}
})

module.exports = Filters
});