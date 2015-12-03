/*global define*/
define([
    'jquery',
    'backbone',
    'collections/todos',
    'common'
], function ($, Backbone, Todos, common) {
    'use strict';

    var TodoRouter = Backbone.Router.extend({
        initialize: function(app) {
            this.app = app;
        },
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function (param) {
            // Set the current filter to be used
            common.TodoFilter = param || '';

            // Trigger a collection filter event, causing hiding/unhiding
            // of the Todo view items
            this.app.collection.trigger('filter');
        }
    });

    return TodoRouter;
});
