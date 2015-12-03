let Backbone = require('backbone'),
	Todo = require('./todo');

module.exports = Backbone.Collection.extend({
	model: Todo,
	localStorage: new Backbone.LocalStorage('todos-backbone')
});