define(function (require, exports, module) {
var React = require('react')

var Filters = React.createClass({displayName: "Filters",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("span", {id: "todo-count"}), 
				React.createElement("ul", {id: "filters"}, 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/", className: "selected"}, "All")
					), 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/active"}, "Active")
					), 
					React.createElement("li", null, 
						React.createElement("a", {href: "#/completed"}, "Completed")
					)
				), 
				React.createElement("button", {id: "clear-completed"})
			)
			)
	}
})

module.exports = Filters
});