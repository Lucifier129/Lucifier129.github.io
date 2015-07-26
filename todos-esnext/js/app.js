/**
 * app.js
 */
var app = app || {};

(function (app) {
	app.todos = new app.Controller(app.View, app.Model).init()
}(app));