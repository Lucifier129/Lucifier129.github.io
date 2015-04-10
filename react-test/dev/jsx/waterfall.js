define(function (require, exports, module) {
	var React = require('react')
	var $ = require('jquery')

	var Item = React.createClass({
		getInitialState: function() {
			return {
				height: 0
			}
		},
		componentDidMount: function() {
			var $item = $(this.refs.item.getDOMNode())
			var $prev = $item.prev().prev()
			if ($prev.length === 0) {
				return
			}
			var top = $prev.position().top + $prev.height() + 10
			$item.css({
				top: top
			})

			var $parent = $item.parent()
			var height = $item.height()
			top += height
			if ($parent.height() < top) {
				$parent.height(top)
			}

			this.setState({
				height: $item.find('img').get(0).height + 'px'
			})

			console.log($item.index())
		},
		render: function() {
			return (
				<div className="waterfall-item" ref="item">
					<img src={this.props.url} />
					<p>{this.state.height}</p>
				</div>
				)
		}
	})


	var List = React.createClass({
		render: function() {
			return (
				<div className="waterfall-list">
					{
						this.props.urls.map(function(url) {
							return <Item url={url} />
						})
					}
				</div>
				)
		}
	})


	var waterfall = {
		urls: ['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg','img/05.jpg','img/06.jpg'],
		preload: function(urls, callback) {
			var count = 0
			var total = urls.length
			var div = document.createElement('div')
			div.style.display = 'none'
			document.body.appendChild(div)
			urls.forEach(function(url) {
				var img = new Image()
				img.onload = function() {
					count += 1
					if (count === total) {
						document.body.removeChild(div)
						callback()
					}
				}
				img.src = url
				div.appendChild(img)
			})
		},
		onScroll: function() {
			var urls = []
			urls = urls.concat(this.urls.concat(this.urls).sort(function() {
				return Math.random() - 0.5
			}))

			this.preload(urls, function() {
					React.render( < List urls = {urls}/>,
						document.getElementById('container')
					)
					window.addEventListener('scroll', function() {
							var $win = $(window);
							var scrollTop = $win.scrollTop();
							var winHeight = $win.height();
							var docHeight = $(document).height();
							var diff = scrollTop + winHeight - docHeight;
							if (Math.abs(diff) <= 50) {
								var newUrls = this.urls.sort(function() {
									return Math.random() - 0.5
								})
							this.preload(newUrls, function() {
								urls = urls.concat(newUrls)
								React.render( < List urls = {urls} />,
									document.getElementById('container')
								)
							})

						}
					}.bind(this), false)
			}.bind(this))



	},
		init: function() {
			this.onScroll()
		}
	}

	module.exports = waterfall
})