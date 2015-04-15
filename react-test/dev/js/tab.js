define(function (require, exports, mdoule) {
	var React = require('react')

	var Tab = React.createClass({displayName: "Tab",
		getInitialState: function() {
			return {
				index: 0
			}
		},
		handleClick: function(e) {
			var target = e.target
			this.setState({
				index: target.dataset.index
			})
		},
		render: function() {
			var index = this.state.index
			return (
				React.createElement("div", {className: "tab"}, 
					React.createElement("ul", {className: "tab-list"}, 
					
						this.props.tabList.map(function(item, i) {
							var className = i == index ? 'cur' : ''
							return (
								React.createElement("li", {className: className, onClick: this.handleClick, "data-index": i}, item)
								)
						}.bind(this))
					
					), 
					React.createElement("div", {className: "tab-main"}, 
						React.createElement("h3", null, this.props.dataList[index].title), 
						React.createElement("p", null, this.props.dataList[index].content)
					)
				)
				)
		}
	})


	exports.init = function() {
		var data = {
			tabList: [1,2,3,4, 5],
			dataList: [{
				title: 01,
				content: 01
			},{
				title: 02,
				content: 02
			},{
				title: 03,
				content: 03
			},{
				title: 04,
				content: 04
			},{
				title: 05,
				content: 05
			}]
		}

		React.render(
			React.createElement(Tab, React.__spread({},  data)),
			document.getElementById('container')
			)
	}
})