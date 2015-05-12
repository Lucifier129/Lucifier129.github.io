define(function (require, exports, module) {
var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

var View = React.createClass({
	render: function() {
		return (<div>
					<NewTodo />
					<Main
						isAllCompleted={this.props.isAllCompleted}
						todos={this.props.todos} />
					<Filters
						hash={this.props.hash}
						completedCount={this.props.completedCount}
						todoCount={this.props.todoCount} />
				</div>)
	}
})


module.exports = View
});