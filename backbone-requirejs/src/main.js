/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        backboneLocalstorage: {
            deps: ['backbone'],
            exports: 'Store'
        }
    },
    paths: {
        jquery: '../node_modules/jquery/dist/jquery',
        underscore: '../node_modules/underscore/underscore',
        backbone: '../node_modules/backbone/backbone',
        backboneLocalstorage: '../node_modules/backbone.localstorage/backbone.localStorage',
        tpl: '../lib/tpl'
    }
});

require([
    'backbone',
    'collections/todos',
    'views/appView',
    'routes/router'
], function(Backbone, Todos, AppView, Workspace) {
    var todos = new Todos(),
        app = new AppView({
            collection: todos
        });

    new Workspace(app);
    Backbone.history.start();
});


