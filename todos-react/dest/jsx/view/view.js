define(function (require, exports, module) {
var React = require('react')
var NewTodo = require('./newTodo')
var Main = require('./main')
var Filters = require('./filters')

var View = React.createClass({
	render: function() {
		return (<div>
					<NewTodo addTodo={this.props.addTodo} />
					<Main
						isAllCompleted={this.props.isAllCompleted}
						todos={this.props.todos}
						toggleAll={this.props.toggleAll}
						updateTodo={this.props.updateTodo}
						removeTodo={this.props.removeTodo} />
					<Filters
						hash={this.props.hash}
						clearCompleted={this.props.clearCompleted}
						completedCount={this.props.completedCount}
						todoCount={this.props.todoCount} />
				</div>)
	}
})


module.exports = View
});