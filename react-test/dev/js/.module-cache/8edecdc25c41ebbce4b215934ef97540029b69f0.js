define(function (require, exports, module) {
	var React = require('react')
	var $ = require('jquery')

	var Item = React.createClass({displayName: "Item",
		render: function() {
			return (
				React.createElement("div", {calssName: "waterfall-item"}, 
					React.createElement("img", {src: this.props.url}), 
					React.createElement("p", null, this.props.describe)
				)
				)
		}
	})

	var List = React.createClass({displayName: "List",
		render: function() {
			return (
				React.createElement("div", {className: "waterfall-list", style:  {width: this.props.width} }, 
				
					this.props.items.map(function(item) {
						return React.createElement(Item, React.__spread({},  item))
					})
				
				)
				)
		}
	})

	var Waterfall = React.createClass({displayName: "Waterfall",
		getInitialState: function() {
			return {
				width: 0
			}
		},

		componentDidMount: function() {
			var $parent = $(this.refs.waterfall.getDOMNode())
			var width = $parent.width()
			var dw = width / this.props.itemLength
			this.setState({
				width: dw
			})
		},
		assign: function() {
			var itemList = []
			var itemLength = this.props.itemLength
			var dataList = this.props.dataList
			for (var i = 0; i < itemLength; i += 1) {
				var item = itemList[itemLength % i] = itemList[itemLength % i] || []
				item.push(dataList[i])
			}
			return itemList
		},
		render: function() {
			return (
				React.createElement("div", {class: "waterfall", ref: "waterfall"}, 
					
						this.assign().map(function(items) {
							return React.createElement(List, {width: this.state.width, items: items})
						})
					
				)
				)
		}
	})


	var waterfall = {
		onScroll: function() {
			window.addEventListener('scroll', function() {
				this.scrolling()
			}.bind(this), false)
		},
		init: function() {

		}
	}

	module.exports = waterfall
})