define(function (require, exports, module) {
	var View = require('./view/view')
	var Model = require('./model')

	function APP(View, Model) {
		this.View = View
		this.Model = Model
	}

	App.prototype = {
		init: function() {
			this.model = new this.Model('todos-react')
		},
		addTodo: function(newTodo) {
			this.model.addTodo(newTodo)
			this.render()
		},
		onhashchange: function(hash) {
			
		},
		render: function() {
			React.render(
				<NewTodo addTodo={this.addTodo} />,
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
	}

});