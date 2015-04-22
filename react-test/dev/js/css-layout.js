define(function(require, exports, module) {
	var RC = require('react-canvas')
	var React = RC.React
	var ReactCanvas = RC.ReactCanvas

	var Group = ReactCanvas.Group
	var Image = ReactCanvas.Image
	var Text = ReactCanvas.Text
	var Surface = ReactCanvas.Surface
	var ListView = ReactCanvas.ListView
	var FontFace = ReactCanvas.FontFace

	var App = React.createClass({displayName: "App",

		componentDidMount: function() {
			window.addEventListener('resize', this.handleResize, true);
		},

		render: function() {
			var size = this.size;
			var textStyles = this.getTextStyles()
			return (
				React.createElement(Surface, {top: 0, left: 0, width: size.width, height: size.height, enableCSSLayout: true}, 
				  React.createElement(Group, {style: this.getPageStyle()}, 
				  	React.createElement(Group, {style: this.getImgAreaStyle()}, 
				  		React.createElement(Image, {src: this.props.imgUrl, style: this.getImageStyle(), fadeIn: true}), 
				  		React.createElement(Text, {style: textStyles.starting}, this.props.starting), 
				  		React.createElement(Text, {style: textStyles.tripType}, this.props.tripType)
				  	), 
				  	React.createElement(Group, {style: this.getDescribeStyle()}, 
				  		React.createElement(Text, {style: textStyles.tripTitle}, this.props.tripTitle), 
				  		React.createElement(Text, {style: textStyles.tripTag}, this.props.tripTags), 
				  		React.createElement(Text, {style: textStyles.tripFeature}, this.props.tripFeature), 
				  		React.createElement(Group, {style: {flex: 1, flexDirection: 'row'}}, 
					  		React.createElement(Text, {style: textStyles.dfn}, this.props.dfn), 
					  		React.createElement(Text, {style: textStyles.tripPrice}, this.props.tripPrice), 
					  		React.createElement(Text, {style: textStyles.tripInfo}, this.props.tripInfo)
				  		)
				  	)
				  )
				)
			);
		},

		// Styles
		// ======

		size: document.getElementById('main').getBoundingClientRect(),

		getTextStyles: function() {
			//React-Canvas 布局脆弱到一定境界了。
			return {
				starting: {
					position: 'absolute',
					top:10,
					left:10,
					zIndex: 2,
					width: 55,
					height: 20,
					fontSize: 12,
					lineHeight: 20,
					backgroundColor: 'rgba(68,68,68,0.6)',
					color: '#fff',
					textAlign: 'center'
				},
				tripType: {
					position: 'absolute',
					top: 90,
					left: 10,
					width: 80,
					height: 20,
					backgroundColor: '#f67e79',
					color: '#fff',
					textAlign: 'center',
					fontSize: 12,
					lineHeight: 20
				},
				tripTitle: {
					height: 34,
					fontSize: 15,
					lineHeight: 17,
					color: '#000',
					fontFace: FontFace('Arial,"Lucida Grande",Verdana,"Microsoft YaHei",hei')
				},
				tripTag: {
					height: 18,
					color: '#787878',
					fontSize: 12,
					lineHeight: 18
				},
				tripFeature: {
					height: 18,
					color: '#787878',
					fontSize: 12,
					lineHeight: 18
				},
				dfn: {
					width: 14,
					marginTop:5,
					color: '#ff7d13',
					fontSize: 12,
					lineHeight: 25
				},
				tripPrice: {
					width: 80,
					color: '#ff7d13',
					fontSize: 19,
					lineHeight: 25
				},
				tripInfo: {
					flex: 1,
					fontSize: 12,
					lineHeight: 25,
					color: '#787878'
				}
			}
		},

		getPageStyle: function() {
			var size = this.size;
			return {
				position: 'relative',
				marginTop: 10,
				width: size.width,
				height: 110,
				flexDirection: 'row'
			};
		},

		getImgAreaStyle: function() {
			return {
				position: 'relative',
				width: 100,
				height: 110
			};
		},

		getImageStyle: function() {
			return {
				position: 'absolute',
				left: 5,
				top: 5,
				width: 80,
				height: 80
			};
		},

		getDescribeStyle: function() {
			return {
				position: 'relative',
				flex: 1,
				height: 100,
				marginTop: 10,
				flexDirection: 'column'
			}
		}

	});

	var data = {
		imgUrl: 'http://dimg04.c-ctrip.com/images/t1/vacations/203000/202230/f66ee7a19bab455da69aec72e297258b_C_160_160_Q20.jpg',
		starting: '上海出发',
		tripType: '跟团游',
		tripTitle: 'TITLE',
		tripPrice: '7000',
		tripFeature: 'A B C D',
		tripTags: 'E F G H I',
		tripInfo: 'some infos',
		dfn: '¥'
	}


	var tag = {
		color: ['yellow', 'red', 'block', 'white'],
		type: ['官方标配', '套餐一'],
		memory: [16, 32],
		version: ['中国大陆', '美国', '日本']
	}

	var userChoice = {
		color: 'yellow',
		type: '官方标配',
		memory: 16,
		version: '中国大陆'
	}

	var productList = []



	React.render(React.createElement(App, React.__spread({},  data)), document.getElementById('main'));
})