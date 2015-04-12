define(function (require, exports, module) {
	var React = require('react')
	var $ = require('jquery')

	var Item = React.createClass({
		render: function() {
			return (
				<div className="waterfall-item">
					{
						this.props.pics.map(function(pic) {
							return <img src={pic} />
						})
					}
					<p>{this.props.content}</p>
				</div>
				)
		}
	})

	var List = React.createClass({
		render: function() {
			return (
				<div className="waterfall-list" style={ {width: this.props.width} }>
				{
					this.props.items.map(function(item) {
						return <Item {...item} />
					})
				}
				</div>
				)
		}
	})

	var Waterfall = React.createClass({
		getInitialState: function() {
			return {
				width: 0
			}
		},

		componentDidMount: function() {
			this.reflow(this.props.itemLength)
		},
		reflow: function(itemLength) {
			var $parent = $(this.refs.waterfall.getDOMNode())
			var width = $parent.width()
			var dw = width / itemLength
			this.setState({
				width: dw
			})
		},
		componentWillReceiveProps: function(nextProps) {
			if (nextProps.itemLength !== this.props.itemLength) {
				this.reflow(nextProps.itemLength)
			}
		},
		assign: function() {
			var itemList = []
			var itemLength = this.props.itemLength
			var dataList = this.props.dataList
			for (var i = 0, len = dataList.length; i < len; i += 1) {
				var item = itemList[i % itemLength] = itemList[i % itemLength] || []
				item.push(dataList[i])
			}
			return itemList
		},
		render: function() {
			return (
				<div className="waterfall" ref="waterfall">
					{
						this.assign().map(function(items) {
							return <List width={this.state.width} items={items} />
						}.bind(this))
					}
				</div>
				)
		}
	})


	var waterfall = {
		page: 2,
		onAjax: false,
		lastMid:'',
		$loading: $('<div>加载中……</div>'),
		$end: $('<div>加载完毕</di>'),
		getData: function() {
			if (this.onAjax) {
				return
			}
			$('#container').append(this.$loading)
			this.onAjax = true
			$.ajax({
				url: 'http://photo.weibo.com/page/waterfall',
				type: 'get',
				dataType: 'jsonp',
				data: {
					ajwvr: 6,
					filter: 'wbphoto|||v6',
					page: this.page++,
					count: 20,
					module_id: 'profile_photo',
					oid: 1005052141100877,
					uid:'',
					lastMid:this.lastMid,
					lang: 'zh-cn',
					_t: 1
				},
				success: function(response) {
					this.$loading.remove()
					var data = response.data
					this.lastMid = data.lastMid
					if (+data.page === +data.pagesize) {
						$('#container').append(this.$end)
						$(window).off('scroll')
					}
					this.onAjax = false
					var dataList = this.convertData(data.html.join(''))
					this.dataList = this.dataList.concat(dataList)
					this.render()
				}.bind(this),
				error: function () {
					$('body').html('error')
				}
			})
		},

		convertData: function(html) {
			var $html = $('<div/>').html(html)
			var dataList = []
			$html.find('.WB_cardwrap').each(function() {
				var $this = $(this)
				var pics = []
				$this.find('.photoArea img.photo_pic').each(function() {
					pics.push(this.src)
				})
				dataList.push({
					pics: pics,
					content: $this.find('.box_plus .describe span').attr('title')
				})
			})
			return dataList
		},

		render: function() {
			var itemLength = +(location.hash.match(/list\=\d+/) || [''])[0].replace('list=', '')
			React.render(
				<Waterfall itemLength={itemLength || 2} dataList={this.dataList} />,
				document.getElementById('container')
				)
		},

		dataList: [],
		nearBottom: function() {
			this.getData()
			return this
		},
		onScroll: function() {
			$(window).on('scroll', function() {
				setTimeout(function() {
					var $win = $(window)
					var scrollTop = $win.scrollTop()
					var winHeight = $win.height()
					var docHeight = $(document).height()
					var diff = scrollTop + winHeight - docHeight
					if (Math.abs(diff) <= 50) {
						this.nearBottom()
					}
				}.bind(this), 0)
			}.bind(this))
			return this
		},
		init: function() {
			this.nearBottom().onScroll()

			$(window).on('hashchange', this.render.bind(this))
		}
	}

	module.exports = waterfall
})