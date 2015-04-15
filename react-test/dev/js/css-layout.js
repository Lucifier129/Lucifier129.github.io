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
			var size = this.getSize();
			return (
				React.createElement(Surface, {top: 0, left: 0, width: size.width, height: size.height, enableCSSLayout: true}, 
				  React.createElement(Group, {style: this.getPageStyle()}, 
				    React.createElement(Text, {style: this.getTitleStyle()}, 
				      "Professor PuddinPop"
				    ), 
				    React.createElement(Group, {style: this.getImageGroupStyle()}, 
				      React.createElement(Image, {src: "img/01.jpg", style: this.getImageStyle(), fadeIn: true})
				    ), 
				    React.createElement(Text, {style: this.getExcerptStyle()}, 
				      "With these words the Witch fell down in a brown, melted, shapeless mass and began to spread over the clean boards of the kitchen floor.  Seeing that she had really melted away to nothing, Dorothy drew another bucket of water and threw it over the mess.  She then swept it all out the door.  After picking out the silver shoe, which was all that was left of the old woman, she cleaned and dried it with a cloth, and put it on her foot again.  Then, being at last free to do as she chose, she ran out to the courtyard to tell the Lion that the Wicked Witch of the West had come to an end, and that they were no longer prisoners in a strange land."
				    )
				  )
				  
				)
			);
		},

		// Styles
		// ======

		getSize: function() {
			return document.getElementById('main').getBoundingClientRect();
		},

		getPageStyle: function() {
			var size = this.getSize();
			return {
				position: 'relative',
				padding: 14,
				width: size.width,
				height: size.height,
				backgroundColor: '#f7f7f7',
				flexDirection: 'column'
			};
		},

		getImageGroupStyle: function() {
			return {
				position: 'relative',
				flex: 1,
				backgroundColor: '#eee'
			};
		},

		getImageStyle: function() {
			return {
				position: 'absolute',
				left: 0,
				top: 0,
				right: 0,
				bottom: 0
			};
		},

		getTitleStyle: function() {
			return {
				fontFace: FontFace('Georgia'),
				fontSize: 22,
				lineHeight: 0,
				height: 28,
				marginBottom: 10,
				color: '#333',
				textAlign: 'center'
			};
		},

		getExcerptStyle: function() {
			return {
				fontFace: FontFace('Georgia'),
				fontSize: 17,
				lineHeight: 25,
				marginTop: 15,
				flex: 1,
				color: '#333',
				backgroundColor: '#eaeaea'
			};
		},

		// Events
		// ======

		handleResize: function() {
			this.forceUpdate();
		}

	});

	React.render(React.createElement(App, null), document.getElementById('main'));
})