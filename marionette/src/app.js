define([
    'backbone',
    'marionette',
    'common',
    'routes/router',
    'collections/todos'
], function(Backbone, Mn, common, AppRouter, Todos) {
    var app = new Mn.Application();

    app.addRegions({
        header: '#header',
        main: '#main',
        footer: '#footer'
    });

    var todos = new Todos();
    todos.fetch();

    common.todos = todos;
    common.app = app;

    app.addInitializer(function() {
        var router = new AppRouter();
        router.controller.start(app);

        Backbone.history.start();
    });

    var filter = new Backbone.Model({
        name: 'all'
    });
    app.reqres.setHandler('filter', function() {
        return filter;
    });

    return app;
});
