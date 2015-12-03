let Backbone = require('backbone'),

    Router = Backbone.Router.extend({
    	initialize: function(app) {
    		this.app = app;
    	},
        routes: {
            '*filter': 'setFilter'
        },
        setFilter: function(filter) {
            this.app.collection.trigger('filter', filter);
        }
    });

module.exports = Router;

    

