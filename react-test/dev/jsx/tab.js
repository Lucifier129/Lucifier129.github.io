define(function (require, exports, mdoule) {
	var React = require('react')

	var Tab = React.createClass({
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
				<div className="tab">
					<ul className="tab-list">
					{
						this.props.tabList.map(function(item, i) {
							var className = i == index ? 'cur' : ''
							return (
								<li className={className} onClick={this.handleClick} data-index={i}>{item}</li>
								)
						}.bind(this))
					}
					</ul>
					<div className="tab-main">
						<h3>{this.props.dataList[index].title}</h3>
						<p>{this.props.dataList[index].content}</p>
					</div>
				</div>
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
			<Tab {...data} />,
			document.getElementById('container')
			)
	}
})