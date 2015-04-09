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
				React.createElement("div", {className: "waterfall-list"}, 
				
					this.props.items.map(function(item) {
						return React.createElement(Item, React.__spread({},  item))
					})
				
				)
				)
		}
	})


	var Waterfall = React.createClass({displayName: "Waterfall",
		componentDidMount: function() {
			var $parent = $(this.refs.waterfall.getDOMNode())
			var width = $parent.width()
			var dw = width / this.props.itemLength
		},
		render: function() {
			var itemList = []
			var itemLength = this.props.itemLength
			var dataList = this.props.dataList
			for (var i = 0; i < itemLength; i += 1) {
				itemList[itemLength % i]
			}
			return (
				React.createElement("div", {class: "waterfall", ref: "waterfall"}
					
				)
				)
		}
	})

	module.exports = waterfall
})