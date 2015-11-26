define(function(require, exports, module) {
	var log = function(name) {
		return console.log.bind(console, name)
	}
    module.exports = App.Page.extend({
        onShow: function() {
            var html = '<h1>标题：Detail</h1>'
            html += '<p><a href="#/">首页</a></p>'
            html += '<p><a href="#/list">列表</a></p>'
            html += '<p><a href="#/detail">详情页</a></p>'
            this.$el.html(html)
        },
        onRequest: log('onRequest'),
        onHide: log('onHide'),
        beforeMount: log('beforeMount'),
        afterMount: log('afterMount'),
        beforeUnmount: log('beforeUnmount'),
        afterUnmount: log('afterUnmount'),
        beforeIn: log('beforeIn'),
        afterIn: log('afterIn'),
        beforeOut: log('beforeOut'),
        afterOut: log('afterOut')
    })
})
