define([
    'marionette',
    'common',
    'collections/todos',
    'views/header',
    'views/todos',
    'views/footer'
], function(Mn, common, Todos, HeaderView, TodosView, FooterView) {
    return Mn.Controller.extend({
        filterItems: function(filter) {
            common.app.request('filter').set('name', filter);
            this.showFooter();
            common.todos.each(function(todo) {
                todo.trigger('visible');
            });
        },
        showTodos: function() {
            common.app.main.show(new TodosView({
                collection: common.todos
            }));
        },
        showFooter: function() {
            common.app.footer.show(new FooterView({
                model: new Backbone.Model({
                    remaining: common.todos.remaining().length,
                    completed: common.todos.completed().length
                })
            }));
        },
        start: function(app) {
            this.app = app;
            app.header.show(new HeaderView());
            this.showTodos();
            this.showFooter();
        }
    });
});