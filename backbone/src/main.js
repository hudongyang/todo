// 添加backbone.localStorage扩展
require('backbone.localStorage');

let AppView = require('./app'),
    Router = require('./router'),
    Todos = require('./todos'),

    todos = new Todos();

todos.fetch({reset: true});

let app = new AppView({
        collection: todos
    }).render(),

    router = new Router(app);

Backbone.history.start();