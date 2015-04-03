define(function (require, exports, module) {
var React = require('react')

var Todo = React.createClass({displayName: "Todo",
	render: function() {
		return (
			React.createElement("li", null, 
				React.createElement("div", null, 
					React.createElement("input", {className: "toggle", type: "checkbox"}), 
						React.createElement("label", null), 
						React.createElement("button", {className: "destroy"})
				), 
				React.createElement("input", {className: "edit"})
			)
			)
	}
})

module.exports = Todo
});