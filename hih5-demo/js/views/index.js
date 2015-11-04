define(function(require, exports, module) {
    module.exports = App.Page.extend({
    	initialize: function() {
    		this.count = 100
    	},
    	events: {
    		'click .square': 'swell'
    	},
    	swell: function(e) {
    		this.count += 10
    		this.$(e.currentTarget).css({
    			width: this.count,
    			height: this.count
    		}).text(this.count)
    	},
    	afterMount: function() {
    		var style = 'width:' + this.count + 'px;height:' + this.count + 'px;'
    		this.$el.html('<div class="square" style="' + style + '"">' + this.count +'</div>')
    	},
    	onShow: function() {
    		this.$el.find('.square').trigger('click')
    	}
    })
})