define(function (require, exports, module) {
/** @jsx React.DOM */

'use strict';

var RC = require('react-canvas');
var React = RC.React;
var ReactCanvas = RC.ReactCanvas;
var Item = require('./Item');
var articles = require('./data');

var Surface = ReactCanvas.Surface;
var ListView = ReactCanvas.ListView;

var App = React.createClass({displayName: "App",

  render: function () {
    var size = this.getSize();
    return (
      React.createElement(Surface, {top: 0, left: 0, width: size.width, height: size.height}, 
        React.createElement(ListView, {
          style: this.getListViewStyle(), 
          numberOfItemsGetter: this.getNumberOfItems, 
          itemHeightGetter: Item.getItemHeight, 
          itemGetter: this.renderItem})
      )
    );
  },

  renderItem: function (itemIndex, scrollTop) {
    var article = articles[itemIndex % articles.length];
      return (
      React.createElement(Item, {
        width: this.getSize().width, 
        height: Item.getItemHeight(), 
        imageUrl: article.imageUrl, 
        title: article.title, 
        excerpt: article.excerpt, 
        itemIndex: itemIndex})
    );
  },

  getSize: function () {
    return document.getElementById('main').getBoundingClientRect();
  },

  // ListView
  // ========

  getListViewStyle: function () {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  getNumberOfItems: function () {
    return 100;
  },

});

React.render(React.createElement(App, null), document.getElementById('main'));

});