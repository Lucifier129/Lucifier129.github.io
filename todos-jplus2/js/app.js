/**
 * app.js
 */
(function (app) {
	app.todos = new app.Presenter(app.View, app.Model).init()
}($.app));