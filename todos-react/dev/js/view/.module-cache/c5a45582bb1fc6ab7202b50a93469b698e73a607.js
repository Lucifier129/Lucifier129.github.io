define(function (require, exports, module) {
var React = require('react')
var Todos = require('./todos')
var Main = React.createClass({displayName: "Main",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("input", {id: "toggle-all", type: "checkbox"}), 
				React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
				React.createElement(Todos, null)
			)
			)
	}
})

module.exports = Main
});