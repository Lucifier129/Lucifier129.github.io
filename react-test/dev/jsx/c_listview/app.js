define(function (require, exports, module) {
	var RC = require('react-canvas')
	var React = RC.React
	var ReactCanvas = RC.ReactCanvas

	var Group = ReactCanvas.Group
	var Image = ReactCanvas.Image
	var Text = ReactCanvas.Text
	var Surface = ReactCanvas.Surface
	var ListView = ReactCanvas.ListView
	var FontFace = ReactCanvas.FontFace

	var Item = React.createClass({
		statics: {
			getItemHeight: function () {
				return 109
			}
		},
		render: function() {
			var textStyle = this.getTextStyle()
			var props = this.props
			var texts = Object.keys(textStyle).map(function(name, index) {
				var style = textStyle[name]
				if (!style.hasOwnProperty('fontFace')) {
					style.fontFace = FontFace('Arial, Lucida Grande, Verdana, Microsoft YaHei')
				}
				return <Text style={style}>{props[name]}</Text>
			})
			return (
				<Group style={this.getStyle()}>
					<Image src={this.props.imgUrl} style={this.getImgStyle()} />
					{texts}
				</Group>
				)
		},
		getTextStyle: function() {
			var leftTextWidth = this.props.width - 100
			return {
				starting: {
					top: 10,
					left: 10,
					zIndex: 2,
					width: 55,
					height: 20,
					backgroundColor: 'rgba(68,68,68,0.6)',
					color: '#fff',
					borderRaduis: 3,
					textAlign: 'center',
					fontSize: 12,
					lineHeight: 80
				},
				tripType: {
					top: 90,
					left: 10,
					width: 80,
					height: 20,
					backgroundColor: '#f67e79',
					color: '#fff',
					textAlign: 'center',
					fontSize: 12,
					lineHeight: 30
				},
				tripTitle: {
					top: 10,
					left: 100,
					width: leftTextWidth,
					height: 17,
					fontSize: 15,
					lineHeight: 17,
					color: '#000',
					fontFace: FontFace('Arial,"Lucida Grande",Verdana,"Microsoft YaHei",hei')
				},
				tripTag: {
					top: 44,
					left: 100,
					width: leftTextWidth,
					height: 18,
					color: '#787878',
					fontSize: 12,
					lineHeight: 18
				},
				tripFeatures: {
					top: 62,
					left: 100,
					width: leftTextWidth,
					height: 18,
					color: '#787878',
					fontSize: 12,
					lineHeight: 18
				},
				dfn: {
					top: 85,
					left: 100,
					width: 7,
					height: 14,
					color: '#ff7d13',
					fontSize: 12
				},
				price: {
					top: 80,
					left: 110,
					width:80,
					height: 24,
					color: '#ff7d13',
					fontSize: 19,
					lineHeight:24
				},
				otherInfo: {
					top: 85,
					left: 180,
					width:leftTextWidth - 100,
					height: 21,
					fontSize: 12,
					color: '#787878',
					lineHeight: 18
				}
			}

		},
		getStyle: function() {
			return {
				width: this.props.width,
				height: this.props.height,
				backgroundColor:'#fff',
				borderColor: '#eaeaea',
				borderBottomWidth: 1
			}
		},
		getImgStyle: function() {
			return {
				top: 10,
				left: 10,
				width: 80,
				height: 80,
				zIndex: 1
			}
		}
	})


	var List = React.createClass({
		render: function() {
			var size = this.size
			var listViewStyle = this.getListViewStyle()
			return (
				<Surface top={0} left={0} width={size.width} height={size.height - 48}>
					<ListView
						style={listViewStyle}
						numberOfItemsGetter={this.getNumberOfItems}
						itemHeightGetter={Item.getItemHeight}
						itemGetter={this.renderItem} />
				</Surface>
				)
		},
		renderItem: function(index, scrollTop) {
			return (
				<Item
					width={this.size.width}
					height={Item.getItemHeight()}
					{...this.props.data[index]}
					dfn={'¥'}
					itemIndex={index}/>
				)
		},
		getListViewStyle: function() {
			var size = this.size
			return {
				top: 0,
				left: 0,
				width: size.width,
				height: size.height - 96
			}
		},
		getNumberOfItems: function() {
			return this.props.data.length
		},
		size: document.getElementById('main').getBoundingClientRect()
	})


	var dataSource = require('./data')
	var data = dataSource.Data.ProductInfoList.map(function(ProductInfo) {
		var SEOProductInfo = ProductInfo.SEOProductInfo
		var result = {
			starting: SEOProductInfo.DepartCityName + '出发',
			tripTitle: SEOProductInfo.Name,
			tripType: SEOProductInfo.ProductPatternName,
			tripFeatures: '班期：' + SEOProductInfo.ScheduleDesc,
			price: SEOProductInfo.MinPrice + '',
			imgUrl: ProductInfo.ExtendProductInfo.Img,
			tripTag: ProductInfo.ExtendProductInfo.TagList.map(function(tagObj) {
				return tagObj.TagName
			}).join(' ')
		}
		var otherInfo = Math.round(SEOProductInfo.Comment) + '分 '
		otherInfo += ProductInfo.ExtendProductInfo.TravelPersonCount + '人出游'
		result.otherInfo = otherInfo
		return result
	})

	React.render(
		<List data={data} />,
		document.getElementById('main')
		)

})