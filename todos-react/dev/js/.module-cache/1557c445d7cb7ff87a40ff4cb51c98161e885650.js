define(function (require, exports, module) {
var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

var View = {
	NewTodo: NewTodo,
	Main: Main,
	Filters: Filters
}

module.exports = View
});