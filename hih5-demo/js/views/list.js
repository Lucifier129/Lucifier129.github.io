define(function(require, exports, module) {
    module.exports = App.Page.extend({
    	onShow: function() {
    		this.$el.html('<a href="#/">首页</a>')
    	}
    })
})